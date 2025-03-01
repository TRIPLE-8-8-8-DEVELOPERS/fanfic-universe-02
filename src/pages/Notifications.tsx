
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, BookOpen, Heart, MessageSquare, Star, UserPlus, X } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "comment",
      read: false,
      user: "Emily Chen",
      action: "commented on your story",
      story: "The Last Guardian",
      time: "5 minutes ago",
      content: "I loved the plot twist at the end! Can't wait for the next chapter!",
    },
    {
      id: 2,
      type: "like",
      read: false,
      user: "Marcus Wong",
      action: "liked your story",
      story: "Midnight Chronicles",
      time: "2 hours ago",
    },
    {
      id: 3,
      type: "follow",
      read: true,
      user: "Sophia Rodriguez",
      action: "started following you",
      time: "1 day ago",
    },
    {
      id: 4,
      type: "comment",
      read: true,
      user: "David Kim",
      action: "replied to your comment on",
      story: "The Forgotten Realm",
      time: "2 days ago",
      content: "You made an excellent point about the character development!",
    },
    {
      id: 5,
      type: "mention",
      read: true,
      user: "Aisha Patel",
      action: "mentioned you in a comment on",
      story: "Beyond the Stars",
      time: "3 days ago",
      content: "I think @username would enjoy this chapter as well!",
    },
  ]);

  const getIcon = (type) => {
    switch (type) {
      case "comment":
        return <MessageSquare className="text-blue-500" />;
      case "like":
        return <Heart className="text-red-500" />;
      case "follow":
        return <UserPlus className="text-green-500" />;
      case "mention":
        return <Bell className="text-purple-500" />;
      default:
        return <Bell className="text-gray-500" />;
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const dismissNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

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
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
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
                  />
                ))
            ) : (
              <EmptyState message="No like notifications" />
            )}
          </TabsContent>

          <TabsContent value="follows" className="space-y-4">
            {notifications.filter(n => n.type === 'follow').length > 0 ? (
              notifications
                .filter(n => n.type === 'follow')
                .map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    getIcon={getIcon}
                    onDismiss={dismissNotification}
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

const NotificationCard = ({ notification, getIcon, onDismiss }) => {
  return (
    <Card className={notification.read ? "" : "bg-muted/30 border-l-4 border-l-primary"}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="mt-1 p-2 bg-background rounded-full border">
            {getIcon(notification.type)}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start gap-2">
              <div>
                <p className="font-medium">
                  <Link to="/profile" className="text-primary hover:underline">
                    {notification.user}
                  </Link>{" "}
                  {notification.action}{" "}
                  {notification.story && (
                    <Link to="/story/1" className="text-primary hover:underline">
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
                onClick={() => onDismiss(notification.id)}
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

const EmptyState = ({ message }) => {
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
