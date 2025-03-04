
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
import { toast } from "sonner";

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

  // Calculate word count, character count, and reading time whenever content changes
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    const characters = content.length;
    const time = Math.ceil(words / 200);

    setWordCount(words);
    setCharacterCount(characters);
    setReadingTime(time);
  }, [content]);

  // Auto-save simulation
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
    // Simulate save operation
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
    <div className="dark:bg-gray-900 dark:text-white min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto py-6 px-4">
        {/* Premium Banner */}
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
            <button
              onClick={handleSave}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
          </div>
        </div>

        <Tabs defaultValue="compose" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="mb-6 bg-muted/50">
            <TabsTrigger value="compose" className="data-[state=active]:bg-background">
              <Pencil className="h-4 w-4 mr-2" />
              Compose
            </TabsTrigger>
            <TabsTrigger value="ai-assist" className="data-[state=active]:bg-background">
              <Sparkles className="h-4 w-4 mr-2" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-background">
              <Settings className="h-4 w-4 mr-2" />
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

      {/* Premium Feature Alert Modal */}
      <PremiumFeatureAlert
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        onSubscribe={handleSubscribe}
      />
    </div>
  );
};

export default Write;
