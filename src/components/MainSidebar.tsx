
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
import { Separator } from "@/components/ui/separator";
import RecommendedStories from "./RecommendedStories";
import ActivityFeed from "./ActivityFeed";
import WritingPrompt from "./WritingPrompt";
import ReadingChallenge from "./ReadingChallenge";
import SidebarWeather from "./SidebarWeather";
import { useTheme } from "next-themes";

interface MainSidebarProps {
  currentPath?: string;
}

const MainSidebar = ({ currentPath = '/' }: MainSidebarProps) => {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();
  
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
        "h-full border-r bg-gradient-to-b from-background to-background/95 transition-all duration-300 flex flex-col relative flex-shrink-0 shadow-md dark:border-r-gray-800",
        collapsed ? "w-0 md:w-16 opacity-0 md:opacity-100" : "w-72",
        isMobile && !collapsed ? "fixed z-50 shadow-xl" : ""
      )}
    >
      <div className="h-14 border-b flex items-center justify-between p-4 bg-gradient-to-r from-purple-50/10 to-blue-50/10 dark:from-purple-950/30 dark:to-blue-950/30">
        {!collapsed && (
          <Link to="/" className="font-serif text-xl font-bold flex items-center">
            <div className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 p-1 mr-2 shadow-md">
              <BookOpen className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent hover:from-purple-500 hover:to-indigo-500 transition-colors">FanVerse</span>
          </Link>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "h-8 w-8 rounded-full hover:bg-primary/10 hover:scale-105 transition-all", 
            collapsed && "ml-auto"
          )} 
          onClick={toggleSidebar}
        >
          <ChevronRight 
            className={cn(
              "h-4 w-4 transition-transform text-indigo-500", 
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
                <h4 className="text-sm font-medium text-muted-foreground px-4 mb-2 text-indigo-300 dark:text-indigo-400 tracking-wide">
                  {category.category}
                </h4>
              )}
              <div className="space-y-1 px-1">
                {category.items.map((item, itemIndex) => {
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Button
                      key={itemIndex}
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start rounded-xl transition-all hover:translate-x-1",
                        collapsed && "justify-center p-2",
                        isActive ? 
                          "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400 border-l-2 border-indigo-500" : 
                          "hover:bg-gradient-to-r hover:from-indigo-500/5 hover:to-purple-500/5"
                      )}
                      asChild
                      onClick={() => isMobile && toggleSidebar()}
                    >
                      <Link to={item.path}>
                        <item.icon className={cn(
                          "h-4 w-4", 
                          collapsed ? "mr-0" : "mr-2",
                          isActive ? "text-indigo-600 dark:text-indigo-400" : "text-muted-foreground"
                        )} />
                        {!collapsed && <span className={isActive ? "font-medium" : ""}>{item.label}</span>}
                        
                        {!collapsed && item.label === "Watch Streams" && (
                          <Badge variant="outline" className="ml-auto py-0 px-1.5 h-5 bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/30 animate-pulse">
                            <span className="mr-1 h-1.5 w-1.5 rounded-full bg-red-500"></span>
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
          
          {/* Theme toggle */}
          {!collapsed && (
            <div className="mb-4 px-3">
              <div className="rounded-lg border border-border p-2 flex items-center justify-between">
                <span className="text-sm font-medium">Dark Mode</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 w-14 rounded-md relative"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  <div className={cn(
                    "absolute h-5 w-5 rounded-full transition-all",
                    theme === "dark" ? "bg-indigo-500 right-1.5" : "bg-slate-400 left-1.5"
                  )}></div>
                </Button>
              </div>
            </div>
          )}
          
          {/* Weather widget with enhanced styling */}
          {!collapsed && <SidebarWeather />}
          
          {/* Writing Prompt with enhanced styling */}
          {!collapsed && <WritingPrompt />}
          
          {/* Enhanced Premium Feature section with improved styling */}
          {!collapsed && (
            <div className="mb-6 px-3">
              <div className="rounded-xl border bg-gradient-to-br from-amber-50/50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/20 p-4 hover:shadow-lg transition-all duration-300 border-amber-200/50 dark:border-amber-700/30">
                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center">
                    <Sparkles className="h-4 w-4 text-amber-500 mr-2" />
                    <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-400">Premium Features</h3>
                  </div>
                </div>
                <div className="p-0 pt-3">
                  <p className="text-xs text-muted-foreground mb-3 text-amber-700 dark:text-amber-300">
                    Unlock advanced writing tools, unlimited stories, and AI assistance.
                  </p>
                  <Button size="sm" className="w-full text-xs h-8 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-sm hover:shadow transition-all hover:scale-[1.02]">
                    Upgrade Now
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Reading Challenge with enhanced styling */}
          {!collapsed && <ReadingChallenge />}
          
          {/* Separator for visual organization */}
          {!collapsed && <Separator className="my-4 mx-3 bg-gradient-to-r from-transparent via-indigo-200/30 dark:via-indigo-700/30 to-transparent" />}
          
          {/* Recommended Stories with enhanced styling */}
          {!collapsed && <RecommendedStories />}
          
          {/* Activity Feed with enhanced styling */}
          {!collapsed && <ActivityFeed />}
        </div>
      </ScrollArea>
      
      {/* Footer links with improved styling */}
      {!collapsed && (
        <div className="border-t p-3 bg-gradient-to-r from-purple-50/10 to-blue-50/10 dark:from-purple-950/20 dark:to-blue-950/20">
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline transition-colors">About</Link>
            <Link to="/support" className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline transition-colors">Support</Link>
            <Link to="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline transition-colors">Privacy</Link>
            <Link to="/settings" className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline transition-colors">Settings</Link>
          </div>
        </div>
      )}

      {/* Mobile overlay to close sidebar when opened - enhanced styling */}
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
