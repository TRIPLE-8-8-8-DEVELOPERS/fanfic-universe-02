
import { useState } from "react";
import { 
  Bookmark, 
  BookOpenText, 
  ChevronRight, 
  FileText, 
  History, 
  Home, 
  MessageCircle, 
  Pencil, 
  Search, 
  Settings, 
  Share2,
  Sparkles, 
  UserRound, 
  Volume2, 
  VolumeX
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import ChaptersSection from "./ChaptersSection";

interface WritingSidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  isPremium: boolean;
  currentTab: string;
  onTabChange: (tab: string) => void;
  onOpenSubscription: () => void;
}

const WritingSidebar = ({ 
  collapsed, 
  setCollapsed,
  isPremium,
  currentTab,
  onTabChange,
  onOpenSubscription
}: WritingSidebarProps) => {
  const [currentChapterId, setCurrentChapterId] = useState("1");
  const [textToSpeechEnabled, setTextToSpeechEnabled] = useState(false);
  
  const handleTextToSpeech = () => {
    if (!isPremium) {
      onOpenSubscription();
      return;
    }
    setTextToSpeechEnabled(!textToSpeechEnabled);
    toast.success(textToSpeechEnabled ? "Text-to-speech disabled" : "Text-to-speech enabled");
  };

  const navItems = [
    { icon: Pencil, label: "Compose", id: "compose" },
    { icon: Sparkles, label: "AI Assistant", id: "ai-assist" },
    { icon: Settings, label: "Settings", id: "settings" },
  ];

  const quickTools = [
    { icon: BookOpenText, label: "Preview", onClick: () => toast.success("Preview mode opened") },
    { icon: Share2, label: "Share", onClick: () => isPremium ? toast.success("Sharing options opened") : onOpenSubscription() },
    { icon: textToSpeechEnabled ? VolumeX : Volume2, label: textToSpeechEnabled ? "Stop Reading" : "Read Aloud", onClick: handleTextToSpeech },
    { icon: History, label: "Version History", onClick: () => isPremium ? toast.success("Version history opened") : onOpenSubscription() },
  ];

  return (
    <div 
      className={cn(
        "h-screen border-r bg-background transition-all duration-300 flex flex-col",
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
          {/* Main Navigation */}
          <div className="space-y-1 mb-6">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentTab === item.id ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  collapsed && "justify-center p-2"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <item.icon className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
                {!collapsed && <span>{item.label}</span>}
              </Button>
            ))}
          </div>

          {/* Quick Tools */}
          <div className="mb-6">
            {!collapsed && <h4 className="text-sm font-medium px-3 mb-2">Quick Tools</h4>}
            <div className="space-y-1">
              {quickTools.map((tool, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    collapsed && "justify-center p-2"
                  )}
                  onClick={tool.onClick}
                >
                  <tool.icon className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
                  {!collapsed && <span>{tool.label}</span>}
                  {!isPremium && tool.label !== "Preview" && !collapsed && (
                    <span className="ml-auto text-amber-500 text-xs">PRO</span>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Chapters Section */}
          {!collapsed && currentTab === "compose" && (
            <div className="mb-6">
              <ChaptersSection 
                isPremium={isPremium}
                onChapterSelect={setCurrentChapterId}
                currentChapterId={currentChapterId}
              />
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer Navigation */}
      <div className="border-t p-2">
        <div className="space-y-1">
          <Link to="/">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                collapsed && "justify-center p-2"
              )}
            >
              <Home className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
              {!collapsed && <span>Home</span>}
            </Button>
          </Link>
          <Link to="/explore">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                collapsed && "justify-center p-2"
              )}
            >
              <Search className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
              {!collapsed && <span>Explore</span>}
            </Button>
          </Link>
          <Link to="/reading-lists">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                collapsed && "justify-center p-2"
              )}
            >
              <Bookmark className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
              {!collapsed && <span>Reading Lists</span>}
            </Button>
          </Link>
          <Link to="/profile">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                collapsed && "justify-center p-2"
              )}
            >
              <UserRound className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
              {!collapsed && <span>Profile</span>}
            </Button>
          </Link>
          <Link to="/forums">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                collapsed && "justify-center p-2"
              )}
            >
              <MessageCircle className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
              {!collapsed && <span>Forums</span>}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WritingSidebar;
