
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, Heart, MessageSquare, Award, User, BookOpen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type ActivityType = "like" | "comment" | "follow" | "publish" | "milestone";

interface Activity {
  id: string;
  type: ActivityType;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  target?: {
    id: string;
    title: string;
    type: "story" | "comment" | "user";
  };
  timestamp: Date;
  message?: string;
}

const ActivityFeed = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulated API call
    const fetchActivities = async () => {
      // Add a small delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      setActivities([
        {
          id: "1",
          type: "like",
          user: { id: "u1", name: "ElvenScribe", avatar: "" },
          target: { id: "s1", title: "The Dragon's Apprentice", type: "story" },
          timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
        },
        {
          id: "2",
          type: "comment",
          user: { id: "u2", name: "CosmicWriter", avatar: "" },
          target: { id: "s2", title: "Starship Odyssey", type: "story" },
          timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
          message: "This was such a thrilling chapter!"
        },
        {
          id: "3",
          type: "follow",
          user: { id: "u3", name: "MysticPen", avatar: "" },
          timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
        },
        {
          id: "4",
          type: "publish",
          user: { id: "u4", name: "WindWhisperer", avatar: "" },
          target: { id: "s4", title: "Echoes of Atlantis", type: "story" },
          timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
        },
        {
          id: "5",
          type: "milestone",
          user: { id: "u5", name: "DragonTamer", avatar: "" },
          target: { id: "s5", title: "The Lost Kingdom", type: "story" },
          timestamp: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
          message: "reached 1,000 readers!"
        }
      ]);
      
      setIsLoading(false);
    };
    
    fetchActivities();
  }, []);
  
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };
  
  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case "like": return <Heart className="h-3 w-3 text-red-500" />;
      case "comment": return <MessageSquare className="h-3 w-3 text-blue-500" />;
      case "follow": return <User className="h-3 w-3 text-green-500" />;
      case "publish": return <BookOpen className="h-3 w-3 text-purple-500" />;
      case "milestone": return <Award className="h-3 w-3 text-amber-500" />;
    }
  };
  
  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case "like":
        return <>liked <Link to={`/story/${activity.target?.id}`} className="font-medium hover:underline">{activity.target?.title}</Link></>;
      case "comment":
        return <>commented on <Link to={`/story/${activity.target?.id}`} className="font-medium hover:underline">{activity.target?.title}</Link></>;
      case "follow":
        return <>started following you</>;
      case "publish":
        return <>published <Link to={`/story/${activity.target?.id}`} className="font-medium hover:underline">{activity.target?.title}</Link></>;
      case "milestone":
        return <><Link to={`/story/${activity.target?.id}`} className="font-medium hover:underline">{activity.target?.title}</Link> {activity.message}</>;
    }
  };
  
  if (isLoading) {
    return (
      <div className="p-3 space-y-4">
        <div className="h-4 bg-muted/50 rounded w-1/2 animate-pulse"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-2">
            <div className="h-6 w-6 rounded-full bg-muted/50 animate-pulse"></div>
            <div className="space-y-1 flex-1">
              <div className="h-3 bg-muted/50 rounded w-full animate-pulse"></div>
              <div className="h-2 bg-muted/50 rounded w-1/4 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="p-3 space-y-4">
      <h4 className="text-sm font-medium text-muted-foreground flex items-center">
        <Clock className="h-3.5 w-3.5 mr-1.5" />
        Recent Activity
      </h4>
      <div className="space-y-4">
        {activities.map(activity => (
          <div key={activity.id} className="flex gap-2">
            <Link to={`/profile/${activity.user.id}`}>
              <Avatar className="h-6 w-6">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback className="text-[10px]">
                  {activity.user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className="space-y-1 flex-1">
              <p className="text-xs">
                <Link to={`/profile/${activity.user.id}`} className="font-medium hover:underline">{activity.user.name}</Link>{" "}
                {getActivityText(activity)}
              </p>
              {activity.message && activity.type === "comment" && (
                <p className="text-xs text-muted-foreground italic line-clamp-1">{`"${activity.message}"`}</p>
              )}
              <div className="flex items-center gap-1">
                {getActivityIcon(activity.type)}
                <span className="text-[10px] text-muted-foreground">{getTimeAgo(activity.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
