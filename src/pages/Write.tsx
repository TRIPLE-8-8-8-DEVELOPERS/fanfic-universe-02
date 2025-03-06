import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpenText, Save, Share2, EyeOff, Pencil, 
  Sparkles, Settings, ArrowRight, Zap, 
  Crown, Clock, Target, Volume2, VolumeX, BookOpen, ChevronDown
} from "lucide-react";
import WritingEditor from "../components/writing/WritingEditor";
import AiAssistantPanel from "../components/writing/AiAssistantPanel";
import WritingSettings from "../components/writing/WritingSettings";
import PremiumFeatureAlert from "../components/writing/PremiumFeatureAlert";
import SubscriptionBanner from "../components/writing/SubscriptionBanner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  
  const [chapters, setChapters] = useState([
    { id: 1, title: "Introduction", wordCount: 1250, status: "published" },
    { id: 2, title: "The Beginning", wordCount: 2100, status: "draft" },
    { id: 3, title: "Rising Action", wordCount: 1875, status: "draft" },
    { id: 4, title: "Conflict", wordCount: 0, status: "outline" },
  ]);
  const [activeChapter, setActiveChapter] = useState(1);

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

  const handleAddChapter = () => {
    const newChapter = {
      id: chapters.length + 1,
      title: `Chapter ${chapters.length + 1}`,
      wordCount: 0,
      status: "outline"
    };
    setChapters([...chapters, newChapter]);
    toast.success("New chapter added");
  };

  const handleSelectChapter = (chapterId: number) => {
    setActiveChapter(chapterId);
    const selectedChapter = chapters.find(chapter => chapter.id === chapterId);
    if (selectedChapter) {
      toast.info(`Switched to ${selectedChapter.title}`);
    }
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto py-6 px-4 mt-16">
        {!isPremium && (
          <SubscriptionBanner 
            onSubscribe={() => setIsSubscriptionModalOpen(true)}
          />
        )}

        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between mb-2">
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

          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="sm" className="h-8 gap-1">
              <BookOpen className="h-4 w-4" />
              Chapters
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  Chapter {activeChapter}: {chapters.find(c => c.id === activeChapter)?.title}
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {chapters.map((chapter) => (
                  <DropdownMenuItem 
                    key={chapter.id}
                    onClick={() => handleSelectChapter(chapter.id)}
                    className="flex justify-between"
                  >
                    <span>
                      {chapter.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {chapter.wordCount} words
                    </span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem onClick={handleAddChapter}>
                  + Add new chapter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
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
                </div>
                
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Chapters</CardTitle>
                      <CardDescription>Organize your story</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ScrollArea className="h-[300px]">
                        <div className="p-4 pt-0">
                          {chapters.map((chapter) => (
                            <div
                              key={chapter.id}
                              className={`
                                py-2 px-3 mb-2 rounded-md cursor-pointer flex justify-between items-center
                                ${chapter.id === activeChapter ? 'bg-secondary text-secondary-foreground' : 'hover:bg-secondary/20'}
                              `}
                              onClick={() => handleSelectChapter(chapter.id)}
                            >
                              <div>
                                <div className="font-medium">{chapter.title}</div>
                                <div className="text-xs text-muted-foreground">
                                  {chapter.wordCount} words · {chapter.status}
                                </div>
                              </div>
                            </div>
                          ))}
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full mt-2"
                            onClick={handleAddChapter}
                          >
                            + Add Chapter
                          </Button>
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>
              </div>
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
        </div>
      </main>
      
      <Footer />

      <PremiumFeatureAlert
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        onSubscribe={handleSubscribe}
      />
    </div>
  );
};

export default Write;
