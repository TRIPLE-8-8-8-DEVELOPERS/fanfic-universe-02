
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, BookOpen, Heart, MessageSquare, Star, UserPlus, X } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { 
  getNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead,
  deleteNotification 
} from "@/integrations/supabase/services/notifications";

interface Notification {
  id: string;
  type: string;
  read: boolean;
  user: string;
  userId: string;
  userAvatar: string;
  action: string;
  story?: string;
  storyId?: string;
  time: string;
  content?: string;
}

const Notifications = () => {
  const { user, profile, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);

  // Handle authentication
  useEffect(() => {
    if (isLoading) return;
    
    if (!isAuthenticated) {
      toast("Please sign in to view your notifications");
      navigate("/auth");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Load notifications from Supabase
  useEffect(() => {
    const loadNotifications = async () => {
      if (!user) return;
      
      setIsLoadingNotifications(true);
      try {
        const { data, error } = await getNotifications(user.id);
        if (error) throw error;
        
        if (data && data.length > 0) {
          const formattedNotifications = data.map(item => ({
            id: item.id,
            type: item.type,
            read: item.read,
            user: item.actor?.display_name || item.actor?.username || "Unknown user",
            userId: item.actor?.id || "",
            userAvatar: item.actor?.avatar_url || "",
            action: item.content,
            story: item.story?.title,
            storyId: item.story?.id,
            time: formatTimeAgo(item.created_at),
            content: item.content,
          }));
          
          setNotifications(formattedNotifications);
        } else {
          // If no notifications, use mock data
          setNotifications([
            {
              id: "1",
              type: "comment",
              read: false,
              user: "Emily Chen",
              userId: "123",
              userAvatar: "",
              action: "commented on your story",
              story: "The Last Guardian",
              storyId: "abc123",
              time: "5 minutes ago",
              content: "I loved the plot twist at the end! Can't wait for the next chapter!",
            },
            {
              id: "2",
              type: "like",
              read: false,
              user: "Marcus Wong",
              userId: "456",
              userAvatar: "",
              action: "liked your story",
              story: "Midnight Chronicles",
              storyId: "def456",
              time: "2 hours ago",
            },
            {
              id: "3",
              type: "follow",
              read: true,
              user: "Sophia Rodriguez",
              userId: "789",
              userAvatar: "",
              action: "started following you",
              time: "1 day ago",
            }
          ]);
        }
      } catch (error) {
        console.error("Error loading notifications:", error);
        toast("Failed to load notifications");
      } finally {
        setIsLoadingNotifications(false);
      }
    };
    
    if (user) {
      loadNotifications();
    }
  }, [user]);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return date.toLocaleDateString();
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "comment":
        return <MessageSquare className="text-blue-500" />;
      case "like":
        return <Heart className="text-red-500" />;
      case "follow":
      case "friend_request":
      case "friend_accepted":
        return <UserPlus className="text-green-500" />;
      case "rating":
        return <Star className="text-yellow-500" />;
      case "mention":
        return <Bell className="text-purple-500" />;
      default:
        return <Bell className="text-gray-500" />;
    }
  };

  const markAllAsRead = async () => {
    if (!user) return;
    
    try {
      const { error } = await markAllNotificationsAsRead(user.id);
      if (error) throw error;
      
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      toast("All notifications marked as read");
    } catch (error) {
      console.error("Error marking notifications as read:", error);
      toast("Failed to mark notifications as read");
    }
  };

  const dismissNotification = async (id: string) => {
    try {
      const { error } = await deleteNotification(id);
      if (error) throw error;
      
      setNotifications(notifications.filter(n => n.id !== id));
      toast("Notification dismissed");
    } catch (error) {
      console.error("Error dismissing notification:", error);
      toast("Failed to dismiss notification");
    }
  };

  const handleNotificationClick = async (id: string) => {
    try {
      const { error } = await markNotificationAsRead(id);
      if (error) throw error;
      
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, read: true } : n
      ));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (isLoadingNotifications) {
    return (
      <>
        <Header />
        <main className="container py-12">
          <h1 className="text-3xl font-bold mb-6">Notifications</h1>
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Notifications</h1>
            <p className="text-muted-foreground">
              Stay updated on interactions with your stories and community
            </p>
          </div>
          <div className="flex items-center gap-4">
            {profile && (
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">Logged in as:</span>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profile.avatar_url} alt={profile.display_name || profile.username} />
                  <AvatarFallback>
                    {(profile.display_name || profile.username || "")
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{profile.display_name || profile.username}</p>
                </div>
              </div>
            )}
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">
              All
              {notifications.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {notifications.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="likes">Likes</TabsTrigger>
            <TabsTrigger value="follows">Follows</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  getIcon={getIcon}
                  onDismiss={dismissNotification}
                  onClick={handleNotificationClick}
                />
              ))
            ) : (
              <EmptyState message="No notifications to display" />
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4">
            {notifications.filter(n => !n.read).length > 0 ? (
              notifications
                .filter(n => !n.read)
                .map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    getIcon={getIcon}
                    onDismiss={dismissNotification}
                    onClick={handleNotificationClick}
                  />
                ))
            ) : (
              <EmptyState message="No unread notifications" />
            )}
          </TabsContent>

          <TabsContent value="comments" className="space-y-4">
            {notifications.filter(n => n.type === 'comment').length > 0 ? (
              notifications
                .filter(n => n.type === 'comment')
                .map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    getIcon={getIcon}
                    onDismiss={dismissNotification}
                    onClick={handleNotificationClick}
                  />
                ))
            ) : (
              <EmptyState message="No comment notifications" />
            )}
          </TabsContent>

          <TabsContent value="likes" className="space-y-4">
            {notifications.filter(n => n.type === 'like').length > 0 ? (
              notifications
                .filter(n => n.type === 'like')
                .map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    getIcon={getIcon}
                    onDismiss={dismissNotification}
                    onClick={handleNotificationClick}
                  />
                ))
            ) : (
              <EmptyState message="No like notifications" />
            )}
          </TabsContent>

          <TabsContent value="follows" className="space-y-4">
            {notifications.filter(n => ['follow', 'friend_request', 'friend_accepted'].includes(n.type)).length > 0 ? (
              notifications
                .filter(n => ['follow', 'friend_request', 'friend_accepted'].includes(n.type))
                .map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    getIcon={getIcon}
                    onDismiss={dismissNotification}
                    onClick={handleNotificationClick}
                  />
                ))
            ) : (
              <EmptyState message="No follow notifications" />
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </>
  );
};

interface NotificationCardProps {
  notification: Notification;
  getIcon: (type: string) => JSX.Element;
  onDismiss: (id: string) => void;
  onClick: (id: string) => void;
}

const NotificationCard = ({ notification, getIcon, onDismiss, onClick }: NotificationCardProps) => {
  return (
    <Card 
      className={notification.read ? "" : "bg-muted/30 border-l-4 border-l-primary"}
      onClick={() => onClick(notification.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="mt-1 p-2 bg-background rounded-full border">
            {getIcon(notification.type)}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start gap-2">
              <div>
                <p className="font-medium">
                  <Link to={`/profile/${notification.userId}`} className="text-primary hover:underline">
                    {notification.user}
                  </Link>{" "}
                  {notification.action}{" "}
                  {notification.story && (
                    <Link to={`/story/${notification.storyId}`} className="text-primary hover:underline">
                      {notification.story}
                    </Link>
                  )}
                </p>
                <p className="text-sm text-muted-foreground">{notification.time}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  onDismiss(notification.id);
                }}
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {notification.content && (
              <div className="mt-2 p-3 rounded-lg bg-background text-sm">
                "{notification.content}"
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const EmptyState = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="p-4 rounded-full bg-muted mb-4">
        <Bell className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">{message}</h3>
      <p className="text-sm text-muted-foreground mt-1 mb-6">
        New interactions will appear here
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link to="/explore">Explore Stories</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/write">Write a Story</Link>
        </Button>
      </div>
    </div>
  );
};

export default Notifications;
