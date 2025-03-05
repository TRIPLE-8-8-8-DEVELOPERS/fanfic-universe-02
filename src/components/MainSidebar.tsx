
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  BookOpen, ChevronRight, BookText, Users, Award, 
  TrendingUp, Layout, MessageCircle, Trophy, BookOpenCheck,
  Video, Heart, Star, Bookmark, UserRound, Clock,
  Sparkles, BarChart2, Globe, Eye, Search, Home, LineChart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface MainSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  currentPath?: string;
}

const MainSidebar = ({ 
  collapsed, 
  setCollapsed,
  currentPath = '/'
}: MainSidebarProps) => {
  
  // Navigation categories and items
  const navigationItems = [
    {
      category: "Discover",
      items: [
        { icon: Home, label: "Home", path: "/" },
        { icon: Search, label: "Explore", path: "/explore" },
        { icon: BookOpen, label: "Browse Stories", path: "/browse" },
        { icon: Star, label: "Popular Fandoms", path: "/fandoms" },
        { icon: Award, label: "Featured Authors", path: "/authors" },
        { icon: TrendingUp, label: "Trending", path: "/trending" },
        { icon: BarChart2, label: "Popular", path: "/popular" },
      ]
    },
    {
      category: "Community",
      items: [
        { icon: Users, label: "Communities", path: "/communities" },
        { icon: MessageCircle, label: "Forums", path: "/forums" },
        { icon: Trophy, label: "Writing Contests", path: "/contests" },
        { icon: BookOpenCheck, label: "Reading Clubs", path: "/reading-clubs" },
        { icon: Video, label: "Watch Streams", path: "/watch-streams" },
      ]
    },
    {
      category: "Personal",
      items: [
        { icon: Bookmark, label: "Reading Lists", path: "/reading-lists" },
        { icon: BookText, label: "My Stories", path: "/write" },
        { icon: LineChart, label: "Dashboard", path: "/dashboard" },
        { icon: UserRound, label: "Profile", path: "/profile" },
        { icon: Clock, label: "Recent Updates", path: "/updates" },
      ]
    }
  ];

  return (
    <div 
      className={cn(
        "h-screen border-r bg-background transition-all duration-300 flex flex-col relative flex-shrink-0",
        collapsed ? "w-16" : "w-72"
      )}
    >
      <div className="h-14 border-b flex items-center justify-between p-4">
        {!collapsed && (
          <Link to="/" className="font-serif text-xl font-bold">
            FAN<span className="text-gradient">VERSE</span>
          </Link>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "h-8 w-8", 
            collapsed && "ml-auto"
          )} 
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronRight 
            className={cn(
              "h-4 w-4 transition-transform", 
              !collapsed && "rotate-180"
            )} 
          />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {navigationItems.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-6">
              {!collapsed && (
                <h4 className="text-sm font-medium text-muted-foreground px-3 mb-2">
                  {category.category}
                </h4>
              )}
              <div className="space-y-1">
                {category.items.map((item, itemIndex) => {
                  const isActive = currentPath === item.path;
                  
                  return (
                    <Button
                      key={itemIndex}
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start",
                        collapsed && "justify-center p-2"
                      )}
                      asChild
                    >
                      <Link to={item.path}>
                        <item.icon className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
                        {!collapsed && <span>{item.label}</span>}
                        
                        {!collapsed && item.label === "Watch Streams" && (
                          <Badge variant="outline" className="ml-auto py-0 px-1.5 h-5 bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/30">
                            <span className="mr-1 h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span>
                            Live
                          </Badge>
                        )}
                        
                        {!collapsed && item.label === "Writing Contests" && (
                          <Badge variant="outline" className="ml-auto py-0 px-1.5 h-5 bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/30">
                            New
                          </Badge>
                        )}
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
          
          {/* Featured section */}
          {!collapsed && (
            <div className="mb-6 px-3">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center">
                    <Sparkles className="h-4 w-4 text-amber-500 mr-2" />
                    <h3 className="text-sm font-semibold">Premium Features</h3>
                  </div>
                </div>
                <div className="p-0 pt-3">
                  <p className="text-xs text-muted-foreground mb-3">
                    Unlock advanced writing tools, unlimited stories, and AI assistance.
                  </p>
                  <Button size="sm" className="w-full text-xs h-8 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                    Upgrade Now
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      {/* Footer links */}
      {!collapsed && (
        <div className="border-t p-3">
          <div className="flex items-center justify-center space-x-3 text-xs text-muted-foreground">
            <a href="/about" className="hover:underline">About</a>
            <a href="/support" className="hover:underline">Support</a>
            <a href="/privacy" className="hover:underline">Privacy</a>
            <a href="/terms" className="hover:underline">Terms</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainSidebar;
