
import { Link, useLocation } from "react-router-dom";
import { 
  BookOpen, ChevronRight, BookText, Users, Award, 
  TrendingUp, Layout, MessageCircle, Trophy, BookOpenCheck,
  Video, Heart, Star, Bookmark, UserRound, Clock,
  Sparkles, BarChart2, Globe, Eye, Search, Home, LineChart,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainSidebarProps {
  currentPath?: string;
}

const MainSidebar = ({ currentPath = '/' }: MainSidebarProps) => {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Navigation categories and items with corrected paths
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
        { icon: Briefcase, label: "Job Opportunities", path: "/jobs", badge: "New" },
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

  // Hide sidebar on mobile by default
  if (isMobile && state !== "collapsed" && location.pathname !== "/") {
    toggleSidebar();
  }

  return (
    <div 
      className={cn(
        "h-screen border-r bg-background transition-all duration-300 flex flex-col relative flex-shrink-0",
        collapsed ? "w-0 md:w-16 opacity-0 md:opacity-100" : "w-72",
        isMobile && !collapsed ? "fixed z-50 shadow-xl" : ""
      )}
    >
      <div className="h-14 border-b flex items-center justify-between p-4">
        {!collapsed && (
          <Link to="/" className="font-serif text-xl font-bold flex items-center">
            <div className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 p-1 mr-2">
              <BookOpen className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-gradient">FanVerse</span>
          </Link>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "h-8 w-8 rounded-full hover:bg-primary/10", 
            collapsed && "ml-auto"
          )} 
          onClick={toggleSidebar}
        >
          <ChevronRight 
            className={cn(
              "h-4 w-4 transition-transform", 
              !collapsed && "rotate-180"
            )} 
          />
        </Button>
      </div>

      <ScrollArea className="flex-1 pt-2">
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
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Button
                      key={itemIndex}
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start",
                        collapsed && "justify-center p-2",
                        isActive && "bg-primary/10 text-primary"
                      )}
                      asChild
                      onClick={() => isMobile && toggleSidebar()}
                    >
                      <Link to={item.path}>
                        <item.icon className={cn(
                          "h-4 w-4", 
                          collapsed ? "mr-0" : "mr-2",
                          isActive && "text-primary"
                        )} />
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
                        
                        {!collapsed && item.badge === "New" && (
                          <Badge variant="outline" className="ml-auto py-0 px-1.5 h-5 bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800/30">
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
          
          {/* Featured section with improved mobile styling */}
          {!collapsed && (
            <div className="mb-6 px-3">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 hover:shadow-md transition-shadow">
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
                  <Button size="sm" className="w-full text-xs h-8 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-sm hover:shadow">
                    Upgrade Now
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      {/* Footer links with improved styling */}
      {!collapsed && (
        <div className="border-t p-3">
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <Link to="/about" className="hover:text-primary hover:underline transition-colors">About</Link>
            <Link to="/support" className="hover:text-primary hover:underline transition-colors">Support</Link>
            <Link to="/privacy" className="hover:text-primary hover:underline transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-primary hover:underline transition-colors">Terms</Link>
          </div>
        </div>
      )}

      {/* Mobile overlay to close sidebar when opened - improved styling */}
      {isMobile && !collapsed && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default MainSidebar;
