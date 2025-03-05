import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpenText, Save, Share2, EyeOff, Pencil, 
  Sparkles, Settings, ArrowRight, Zap, 
  Crown, Clock, Target, Volume2, VolumeX
} from "lucide-react";
import WritingEditor from "../components/writing/WritingEditor";
import AiAssistantPanel from "../components/writing/AiAssistantPanel";
import WritingSettings from "../components/writing/WritingSettings";
import PremiumFeatureAlert from "../components/writing/PremiumFeatureAlert";
import SubscriptionBanner from "../components/writing/SubscriptionBanner";
import MainSidebar from "../components/MainSidebar";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [activeTab, setActiveTab] = useState("compose");
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [savedStatus, setSavedStatus] = useState("saved"); // "saved", "saving", "unsaved"
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    const characters = content.length;
    const time = Math.ceil(words / 200);

    setWordCount(words);
    setCharacterCount(characters);
    setReadingTime(time);
  }, [content]);

  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (savedStatus === "unsaved") {
        handleSave();
      }
    }, 30000); // Auto save every 30 seconds if changes are unsaved

    return () => clearInterval(autoSaveInterval);
  }, [savedStatus]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    setSavedStatus("unsaved");
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    setSavedStatus("unsaved");
  };

  const handleSave = () => {
    setSavedStatus("saving");
    setTimeout(() => {
      setSavedStatus("saved");
      toast.success("Your story has been saved");
    }, 800);
  };

  const handleShare = () => {
    if (!isPremium) {
      setIsSubscriptionModalOpen(true);
      return;
    }
    toast.success("Sharing options opened");
  };

  const handleApplyAiSuggestion = (text: string) => {
    setContent(prevContent => prevContent + "\n\n" + text);
    setSavedStatus("unsaved");
    toast.success("AI suggestion applied to your story");
  };

  const handleExportDocument = () => {
    if (!isPremium) {
      setIsSubscriptionModalOpen(true);
      return;
    }
    toast.success("Exporting document");
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleSubscribe = () => {
    setIsPremium(true);
    setIsSubscriptionModalOpen(false);
    toast.success("Welcome to premium features!");
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen flex">
      <MainSidebar 
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        currentPath="/write"
      />

      <div className="flex-grow flex flex-col">
        <Header />

        <main className="flex-grow container mx-auto py-6 px-4">
          {!isPremium && (
            <SubscriptionBanner 
              onSubscribe={() => setIsSubscriptionModalOpen(true)}
            />
          )}

          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold tracking-tight">
              {title || "Untitled Story"}
            </h1>
            
            <div className="flex items-center space-x-2">
              <div className="text-sm text-muted-foreground">
                {savedStatus === "saved" && "All changes saved"}
                {savedStatus === "saving" && "Saving..."}
                {savedStatus === "unsaved" && "Unsaved changes"}
              </div>
              <Button
                onClick={handleSave}
                variant="outline"
                size="sm"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                size="sm"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="mb-4">
              <TabsTrigger value="compose" className="gap-1.5">
                <Pencil className="h-4 w-4" />
                Compose
              </TabsTrigger>
              <TabsTrigger value="ai-assist" className="gap-1.5">
                <Sparkles className="h-4 w-4" />
                AI Assistant
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-1.5">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="compose">
              <WritingEditor
                title={title}
                content={content}
                wordCount={wordCount}
                characterCount={characterCount}
                readingTime={readingTime}
                onTitleChange={handleTitleChange}
                onContentChange={handleContentChange}
                isPremium={isPremium}
                onExport={handleExportDocument}
              />
            </TabsContent>

            <TabsContent value="ai-assist">
              <AiAssistantPanel
                currentText={content}
                onSuggestionApply={handleApplyAiSuggestion}
                isPremium={isPremium}
                onUpgradeRequest={() => setIsSubscriptionModalOpen(true)}
              />
            </TabsContent>

            <TabsContent value="settings">
              <WritingSettings 
                isPremium={isPremium} 
                onUpgradeRequest={() => setIsSubscriptionModalOpen(true)} 
              />
            </TabsContent>
          </Tabs>
        </main>
        
        <Footer />

        <PremiumFeatureAlert
          isOpen={isSubscriptionModalOpen}
          onClose={() => setIsSubscriptionModalOpen(false)}
          onSubscribe={handleSubscribe}
        />
      </div>
    </div>
  );
};

export default Write;
