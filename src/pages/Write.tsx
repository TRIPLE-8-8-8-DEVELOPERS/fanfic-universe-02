
import { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AIWritingAssistant from "../components/AIWritingAssistant";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { 
  BookOpenText, Save, Share2, EyeOff, BookMarked, MessageSquare, Tag, Pencil, 
  ArrowRight, Image, Trash2, Globe, BookOpen, UploadCloud, Clock, Settings, 
  Sparkles, Volume2, VolumeX, Users, Timer, Target, Wand2, Music, PlusCircle,
  Cloud, CloudOff, Palette, Copy, FileText, Zap, Gamepad2, XCircle, BellRing,
  Layers, CalendarClock, MoreHorizontal, ChevronDown, Check
} from "lucide-react";

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [viewMode, setViewMode] = useState("edit");
  const [savedDrafts, setSavedDrafts] = useState([
    { id: 1, title: "The Last Guardian", excerpt: "In a world where magic is fading...", date: "2 days ago" },
    { id: 2, title: "Beyond the Stars", excerpt: "Captain Elara never expected to find...", date: "1 week ago" },
  ]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [writingGoal, setWritingGoal] = useState(1000);
  const [goalProgress, setGoalProgress] = useState(0);
  const [writingTimer, setWritingTimer] = useState(25); // 25 minutes by default
  const [timerActive, setTimerActive] = useState(false);
  const [timerRemaining, setTimerRemaining] = useState(25 * 60); // in seconds
  const [soundEffects, setSoundEffects] = useState(true);
  const [collaborators, setCollaborators] = useState([
    { id: 1, name: "Alex Johnson", avatar: "https://i.pravatar.cc/150?img=1", role: "Editor" },
    { id: 2, name: "Taylor Smith", avatar: "https://i.pravatar.cc/150?img=2", role: "Reviewer" }
  ]);
  const [isAutoSaveEnabled, setIsAutoSaveEnabled] = useState(true);
  const [lastSaved, setLastSaved] = useState("2 minutes ago");
  const [writingMetrics, setWritingMetrics] = useState({
    sessionsToday: 2,
    totalWordCount: 4250,
    avgWordsPerSession: 580,
    longestStreak: 7 // days
  });
  const [moodBoard, setMoodBoard] = useState([
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1620503374956-c942862f0372?w=400&h=300&fit=crop"
  ]);
  const [focusMode, setFocusMode] = useState(false);
  const [chapters, setChapters] = useState([
    { id: 1, title: "Chapter 1: The Beginning", wordCount: 1250, status: "completed" }
  ]);
  const [researchNotes, setResearchNotes] = useState("");
  const [outline, setOutline] = useState("");
  const [gameMode, setGameMode] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [wordSprintActive, setWordSprintActive] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [versionHistory, setVersionHistory] = useState([
    { id: 1, timestamp: "Today, 2:30 PM", wordCount: 450, changes: "Added character descriptions" },
    { id: 2, timestamp: "Yesterday, 3:45 PM", wordCount: 320, changes: "Revised opening scene" }
  ]);
  const [writingPrompts, setWritingPrompts] = useState([
    "A character discovers an old letter that changes everything they believed about their past.",
    "Two rival authors find themselves trapped in an elevator during a power outage.",
    "Write a scene where your protagonist confronts their greatest fear.",
    "A mysterious package arrives with no return address. What's inside changes your character's life."
  ]);
  const [currentPrompt, setCurrentPrompt] = useState("");
  
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);
  const timerIntervalRef = useRef<number | null>(null);

  // Update word and character counts whenever content changes
  useEffect(() => {
    const words = wordCounter(content);
    setWordCount(words);
    setCharacterCount(content.length);
    setGoalProgress(Math.min(Math.round((words / writingGoal) * 100), 100));
    
    // Simulate game mode scoring
    if (gameMode && words > 0) {
      const newScore = Math.floor(words / 10) * 5 + (content.split('.').length * 2);
      setGameScore(newScore);
    }
  }, [content, writingGoal, gameMode]);

  // Timer effect
  useEffect(() => {
    if (timerActive && timerRemaining > 0) {
      timerIntervalRef.current = window.setInterval(() => {
        setTimerRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current!);
            setTimerActive(false);
            if (notificationsEnabled) {
              toast.success("Writing session complete! Take a break.");
              if (soundEffects) {
                playSound("timer");
              }
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [timerActive, timerRemaining, notificationsEnabled, soundEffects]);

  // Auto save effect
  useEffect(() => {
    if (isAutoSaveEnabled && (title.trim() !== "" || content.trim() !== "")) {
      const autoSaveInterval = setInterval(() => {
        simulateAutoSave();
      }, 120000); // Auto save every 2 minutes
      
      return () => clearInterval(autoSaveInterval);
    }
  }, [isAutoSaveEnabled, title, content]);

  const simulateAutoSave = () => {
    // In a real app, this would save to a database
    setLastSaved("just now");
    setTimeout(() => setLastSaved("1 minute ago"), 60000);
  };

  const playSound = (soundType: string) => {
    if (!soundEffects) return;
    
    // In a real app, these would be actual sound effects
    console.log(`Playing ${soundType} sound effect`);
    // This is a simulation - in reality you'd play actual sounds
    const sounds: { [key: string]: string } = {
      keypress: "tap.mp3",
      delete: "erase.mp3",
      save: "success.mp3",
      notification: "ding.mp3",
      achievement: "levelup.mp3",
      timer: "alarm.mp3"
    };
    console.log(`Sound file: ${sounds[soundType]}`);
  };

  const wordCounter = (text: string) => {
    const words = text.trim().split(/\s+/);
    return text.trim() === "" ? 0 : words.length;
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (soundEffects && e.target.value.length > content.length) {
      playSound("keypress");
    } else if (soundEffects && e.target.value.length < content.length) {
      playSound("delete");
    }
  };

  const handleAddTag = () => {
    if (currentTag.trim() !== "" && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
      if (tagInputRef.current) {
        tagInputRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const saveAsDraft = () => {
    if (title.trim() === "") {
      toast.error("Please add a title before saving");
      return;
    }
    
    simulateAutoSave();
    toast.success("Story saved as draft");
    if (soundEffects) {
      playSound("save");
    }
    
    // In a real app, this would save to a database
    const newDraft = {
      id: savedDrafts.length + 1,
      title: title,
      excerpt: content.substring(0, 100) + (content.length > 100 ? "..." : ""),
      date: "just now"
    };
    
    setSavedDrafts([newDraft, ...savedDrafts]);
  };

  const publishStory = () => {
    if (!title.trim()) {
      toast.error("Please add a title to your story");
      return;
    }
    
    if (!content.trim()) {
      toast.error("Please add content to your story");
      return;
    }
    
    if (!category) {
      toast.error("Please select a category");
      return;
    }
    
    toast.success("Story published successfully!");
    if (soundEffects) {
      playSound("achievement");
    }
  };

  const toggleAIAssistant = () => {
    setAiAssistantOpen(!aiAssistantOpen);
  };

  const generateSuggestion = (type: string) => {
    let suggestion = "";
    
    switch(type) {
      case "title":
        suggestion = "The Chronicles of the Forgotten Realm";
        break;
      case "opening":
        suggestion = "The clock struck midnight as Emma stood at the edge of the forbidden forest, her heart pounding against her ribs. She knew what awaited her beyond those twisted trees, yet she had no choice but to proceed.";
        break;
      case "description":
        suggestion = "A young woman discovers an ancient artifact that grants her the ability to see glimpses of possible futures. As she navigates through a world of political intrigue and hidden magic, she must decide whether to use her newfound power for personal gain or to prevent an impending catastrophe.";
        break;
      default:
        suggestion = "";
    }
    
    if (type === "title") {
      setTitle(suggestion);
    } else {
      setContent(content + "\n\n" + suggestion);
    }
    
    toast.success(`Generated ${type} suggestion!`);
    if (soundEffects) {
      playSound("notification");
    }
  };

  const handleApplySuggestion = (suggestion: string) => {
    setContent(content + " " + suggestion);
    toast.success("Applied AI suggestion to your writing");
  };

  const startTimer = () => {
    setTimerActive(true);
    setTimerRemaining(writingTimer * 60);
    toast.info(`${writingTimer} minute writing session started!`);
    if (soundEffects) {
      playSound("notification");
    }
  };

  const stopTimer = () => {
    setTimerActive(false);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    toast.info("Writing session paused");
  };

  const resetTimer = () => {
    setTimerActive(false);
    setTimerRemaining(writingTimer * 60);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const addChapter = () => {
    const newChapter = {
      id: chapters.length + 1,
      title: `Chapter ${chapters.length + 1}: New Chapter`,
      wordCount: 0,
      status: "in_progress"
    };
    setChapters([...chapters, newChapter]);
    toast.success("New chapter added");
  };

  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
    toast.info(focusMode ? "Focus mode disabled" : "Focus mode enabled");
  };

  const toggleGameMode = () => {
    setGameMode(!gameMode);
    toast.info(gameMode ? "Game mode disabled" : "Game mode enabled! Earn points as you write.");
  };

  const addToMoodBoard = (imageUrl: string) => {
    setMoodBoard([...moodBoard, imageUrl]);
    toast.success("Image added to mood board");
  };

  const removeFromMoodBoard = (imageUrl: string) => {
    setMoodBoard(moodBoard.filter(img => img !== imageUrl));
  };

  const startWordSprint = () => {
    setWordSprintActive(true);
    toast.info("Word sprint started! Write as much as you can in 5 minutes.");
    setTimeout(() => {
      setWordSprintActive(false);
      const newWords = wordCounter(content) - wordCount;
      toast.success(`Word sprint complete! You wrote ${newWords} words.`);
      if (soundEffects) {
        playSound("achievement");
      }
    }, 5 * 60 * 1000);
  };

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * writingPrompts.length);
    setCurrentPrompt(writingPrompts[randomIndex]);
    toast.info("New writing prompt selected");
  };

  const fandoms = [
    "Fantasy", "Sci-Fi", "Mystery", "Romance", 
    "Adventure", "Horror", "Historical", "Thriller",
    "Anime", "Comics", "Movies", "TV Shows", 
    "Books", "Games", "Original Works"
  ];

  return (
    <div className={`min-h-screen flex flex-col ${focusMode ? 'bg-gray-950' : ''}`}>
      {!focusMode && <Header />}
      
      <main className={`flex-1 p-4 md:p-6 max-w-full ${focusMode ? 'pt-8' : ''}`}>
        <div className="max-w-7xl mx-auto">
          {focusMode && (
            <div className="flex justify-between items-center mb-6">
              <Button variant="ghost" onClick={toggleFocusMode} className="text-gray-400 hover:text-white">
                <XCircle className="h-5 w-5 mr-2" />
                Exit Focus Mode
              </Button>
              <div className="flex items-center space-x-3">
                <span className="text-gray-400">{wordCount} words</span>
                <span className="text-gray-400">{formatTime(timerRemaining)}</span>
              </div>
            </div>
          )}
          
          {!focusMode && (
            <Tabs defaultValue="editor" className="w-full">
              <TabsList className="mb-6 w-full sm:w-auto grid grid-cols-3 sm:flex sm:flex-row">
                <TabsTrigger value="editor" className="flex items-center gap-2">
                  <Pencil className="h-4 w-4" />
                  <span className="hidden sm:inline">Editor</span>
                </TabsTrigger>
                <TabsTrigger value="drafts" className="flex items-center gap-2">
                  <BookMarked className="h-4 w-4" />
                  <span className="hidden sm:inline">My Drafts</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                </TabsTrigger>
                <TabsTrigger value="stats" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="hidden sm:inline">Stats & Metrics</span>
                </TabsTrigger>
                <TabsTrigger value="tools" className="flex items-center gap-2">
                  <Wand2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Writing Tools</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="editor" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-serif font-bold">Write Your Story</h1>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={toggleFocusMode}>
                      {focusMode ? <BookOpen className="h-4 w-4 mr-2" /> : <BookOpen className="h-4 w-4 mr-2" />}
                      Focus Mode
                    </Button>
                    <Button variant="outline" size="sm" onClick={toggleGameMode}>
                      <Gamepad2 className="h-4 w-4 mr-2" />
                      {gameMode ? "Disable Game" : "Game Mode"}
                    </Button>
                  </div>
                </div>
                
                {gameMode && (
                  <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-bold mb-1">Writer's Quest</h3>
                          <p className="text-sm opacity-90">Write to earn points and unlock achievements!</p>
                        </div>
                        <div className="bg-white/20 rounded-lg px-4 py-2 text-center">
                          <p className="text-xs">SCORE</p>
                          <p className="text-2xl font-bold">{gameScore}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Level 1</span>
                          <span>Level 2 (500 pts)</span>
                        </div>
                        <Progress value={(gameScore / 500) * 100} className="h-2 bg-white/30" />
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-2/3 space-y-6">
                    {wordSprintActive && (
                      <Alert className="bg-amber-500/10 border-amber-500/20">
                        <AlertDescription className="flex items-center">
                          <Zap className="h-4 w-4 mr-2 text-amber-500" />
                          <span>Word sprint in progress! Keep writing as much as you can.</span>
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    {currentPrompt && (
                      <Alert className="bg-blue-500/10 border-blue-500/20">
                        <AlertDescription className="flex items-center">
                          <Sparkles className="h-4 w-4 mr-2 text-blue-500" />
                          <span className="font-medium">Writing Prompt:</span>
                          <span className="ml-2">{currentPrompt}</span>
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="text-2xl font-serif font-bold">Create Your Story</h2>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => saveAsDraft()}>
                              <Save className="h-4 w-4 mr-2" />
                              Save Draft
                            </Button>
                            <Button size="sm" onClick={() => publishStory()}>
                              <Globe className="h-4 w-4 mr-2" />
                              Publish
                            </Button>
                          </div>
                        </div>

                        <div className="mb-6">
                          <div className="flex justify-between mb-2">
                            <Label htmlFor="title">Story Title</Label>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="sm" onClick={() => generateSuggestion("title")}>
                                    <Wand2 className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Generate title suggestion</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <Input
                            id="title"
                            placeholder="Enter your story title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mb-4"
                          />

                          <div className="flex items-center justify-between mb-2">
                            <div className="flex gap-4">
                              <Button 
                                variant={viewMode === "edit" ? "default" : "outline"} 
                                size="sm" 
                                onClick={() => setViewMode("edit")}
                                className="mr-2"
                              >
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              <Button 
                                variant={viewMode === "preview" ? "default" : "outline"} 
                                size="sm" 
                                onClick={() => setViewMode("preview")}
                              >
                                <BookOpen className="h-4 w-4 mr-2" />
                                Preview
                              </Button>
                            </div>
                            <div className="flex gap-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" onClick={() => generateSuggestion("opening")}>
                                      <Wand2 className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Generate opening paragraph</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" onClick={toggleAIAssistant}>
                                      <BookOpenText className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>AI Writing Assistant</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>

                          {viewMode === "edit" ? (
                            <Textarea
                              ref={editorRef}
                              placeholder="Begin your masterpiece here..."
                              value={content}
                              onChange={handleContentChange}
                              className="min-h-[300px] font-sans"
                            />
                          ) : (
                            <div className="min-h-[300px] p-4 border rounded-md bg-card overflow-y-auto prose dark:prose-invert max-w-none">
                              {content ? (
                                <div>
                                  {content.split('\n').map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-muted-foreground italic">Preview will appear here...</p>
                              )}
                            </div>
                          )}

                          <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                            <div className="flex space-x-4">
                              <span>{wordCount} {wordCount === 1 ? 'word' : 'words'}</span>
                              <span>{characterCount} characters</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>Auto-saved {lastSaved}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <div className="flex justify-between items-center mb-1 text-xs">
                              <span>Writing Goal: {writingGoal} words</span>
                              <span>{goalProgress}% Complete</span>
                            </div>
                            <Progress value={goalProgress} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="text-lg font-medium mb-4 flex items-center">
                            <Timer className="h-4 w-4 mr-2" />
                            Writing Timer
                          </h3>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="timerLength" className="block mb-2">Session Length (minutes)</Label>
                              <div className="flex items-center gap-4">
                                <Slider 
                                  id="timerLength"
                                  min={5} 
                                  max={60} 
                                  step={5} 
                                  value={[writingTimer]}
                                  onValueChange={(value) => setWritingTimer(value[0])}
                                  disabled={timerActive}
                                  className="flex-1"
                                />
                                <span className="text-lg font-medium min-w-[40px] text-center">{writingTimer}</span>
                              </div>
                            </div>
                            
                            <div className="bg-secondary/30 p-4 rounded-lg flex items-center justify-center">
                              <div className="text-3xl font-mono font-bold">{formatTime(timerRemaining)}</div>
                            </div>
                            
                            <div className="flex justify-between gap-2">
                              {!timerActive ? (
                                <Button onClick={startTimer} className="flex-1">Start Session</Button>
                              ) : (
                                <Button onClick={stopTimer} variant="outline" className="flex-1">Pause</Button>
                              )}
                              <Button onClick={resetTimer} variant="outline" className="flex-1">Reset</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <h3 className="text-lg font-medium mb-4 flex items-center">
                            <Target className="h-4 w-4 mr-2" />
                            Writing Prompts
                          </h3>
                          <div className="space-y-4">
                            <div className="bg-secondary/30 p-4 rounded-lg">
                              <p className="italic">{currentPrompt || "Click the button below to get a writing prompt."}</p>
                            </div>
                            
                            <div className="flex justify-between">
                              <Button onClick={getRandomPrompt}>
                                <Sparkles className="h-4 w-4 mr-2" />
                                Random Prompt
                              </Button>
                              <Button variant="outline" onClick={() => startWordSprint()}>
                                <Zap className="h-4 w-4 mr-2" />
                                5-Min Sprint
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-medium mb-4 flex items-center">
                          <Layers className="h-4 w-4 mr-2" />
                          Chapter Management
                        </h3>
                        <div className="space-y-2">
                          {chapters.map((chapter) => (
                            <div key={chapter.id} className="bg-secondary/50 p-3 rounded-md flex justify-between items-center">
                              <div>
                                <span className="font-medium">{chapter.title}</span>
                                <div className="flex items-center mt-1">
                                  <span className="text-xs text-muted-foreground mr-2">{chapter.wordCount} words</span>
                                  <Badge variant={chapter.status === "completed" ? "default" : "outline"} className="text-[10px]">
                                    {chapter.status === "completed" ? "Completed" : "In Progress"}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm">
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                          <Button variant="outline" className="w-full" onClick={addChapter}>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add New Chapter
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="lg:w-1/3 space-y-6">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-medium mb-4 flex items-center">
                          <CalendarClock className="h-4 w-4 mr-2" />
                          Story Schedule
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                              <span>First Draft</span>
                            </div>
                            <span className="text-sm text-muted-foreground">June 15, 2023</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                              <span>Revisions</span>
                            </div>
                            <span className="text-sm text-muted-foreground">June 30, 2023</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                              <span>Publication</span>
                            </div>
                            <span className="text-sm text-muted-foreground">July 15, 2023</span>
                          </div>
                          <Button variant="outline" size="sm" className="w-full">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Milestone
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-medium mb-4 flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          Collaborators
                        </h3>
                        <div className="space-y-3">
                          {collaborators.map(collaborator => (
                            <div key={collaborator.id} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <img 
                                  src={collaborator.avatar} 
                                  alt={collaborator.name} 
                                  className="w-8 h-8 rounded-full mr-3"
                                />
                                <div>
                                  <p className="text-sm font-medium">{collaborator.name}</p>
                                  <p className="text-xs text-muted-foreground">{collaborator.role}</p>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button variant="outline" size="sm" className="w-full">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Invite Collaborator
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-medium mb-4">Story Details</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="category">Category</Label>
                            <Select value={category} onValueChange={setCategory}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                              <SelectContent>
                                {fandoms.map(fandom => (
                                  <SelectItem key={fandom} value={fandom}>{fandom}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="tags">Tags</Label>
                            <div className="flex gap-2 mb-2">
                              <Input
                                ref={tagInputRef}
                                id="tags"
                                placeholder="Add tags..."
                                value={currentTag}
                                onChange={(e) => setCurrentTag(e.target.value)}
                                onKeyDown={handleKeyDown}
                              />
                              <Button variant="outline" size="sm" onClick={handleAddTag}>
                                <PlusCircle className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-2">
                              {tags.map(tag => (
                                <div key={tag} className="bg-secondary rounded-full px-3 py-1 text-sm flex items-center">
                                  <span>{tag}</span>
                                  <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-2" onClick={() => removeTag(tag)}>
                                    <XCircle className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                              {tags.length === 0 && (
                                <p className="text-xs text-muted-foreground">No tags yet. Tags help readers find your story.</p>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="description">Short Description</Label>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs text-muted-foreground">Max 250 characters</span>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" onClick={() => generateSuggestion("description")}>
                                      <Wand2 className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Generate description</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <Textarea
                              id="description"
                              placeholder="Brief description of your story..."
                              className="h-24"
                            />
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="private-mode"
                              checked={isPrivate}
                              onCheckedChange={setIsPrivate}
                            />
                            <Label htmlFor="private-mode" className="flex items-center cursor-pointer">
                              <EyeOff className="h-4 w-4 mr-2" />
                              Private Story
                            </Label>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium flex items-center">
                            <Palette className="h-4 w-4 mr-2" />
                            Mood Board
                          </h3>
                          <Button variant="outline" size="sm">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Image
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {moodBoard.map((image, index) => (
                            <div key={index} className="relative group">
                              <img 
                                src={image}
                                alt={`Mood ${index + 1}`}
                                className="rounded-md w-full h-24 object-cover"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 h-6 w-6 bg-black/50 hover:bg-black/70"
                                onClick={() => removeFromMoodBoard(image)}
                              >
                                <XCircle className="h-4 w-4 text-white" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-medium mb-4">Cover Image</h3>
                        <div className="border-2 border-dashed rounded-md p-8 text-center">
                          <UploadCloud className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground mb-2">Drag & drop a cover image or</p>
                          <Button variant="outline" size="sm">
                            <Image className="h-4 w-4 mr-2" />
                            Choose Image
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Recommended size: 1200 x 800 pixels</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Dialog open={aiAssistantOpen} onOpenChange={setAiAssistantOpen}>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>AI Writing Assistant</DialogTitle>
                      <DialogDescription>
                        Get help with writing, ideas, and structure from our AI assistant.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <AIWritingAssistant 
                        currentText={content}
                        onSuggestionApply={handleApplySuggestion}
                      />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setAiAssistantOpen(false)}>Close</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TabsContent>

              <TabsContent value="drafts">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-serif font-bold mb-6">My Drafts</h2>
                    <div className="space-y-4">
                      {savedDrafts.map(draft => (
                        <div key={draft.id} className="border rounded-lg p-4 hover:border-primary transition-colors">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{draft.title}</h3>
                            <span className="text-xs text-muted-foreground">{draft.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{draft.excerpt}</p>
                          <div className="flex justify-end mt-3">
                            <Button variant="ghost" size="sm">
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      {savedDrafts.length === 0 && (
                        <div className="text-center py-12">
                          <BookMarked className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="font-medium text-lg mb-2">No drafts yet</h3>
                          <p className="text-muted-foreground mb-4">Start writing and your drafts will appear here</p>
                          <Button>
                            <Pencil className="h-4 w-4 mr-2" />
                            Create New Story
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tools">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-serif font-bold mb-6">Writing Tools</h2>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                        <div className="flex items-center mb-2">
                          <Wand2 className="h-5 w-5 mr-2 text-blue-500" />
                          <h3 className="text-lg font-medium">Plot Generator</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Generate unique story plots with customizable genres and themes.</p>
                        <Button variant="outline" size="sm">Open Tool</Button>
                      </div>
                      
                      <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                        <div className="flex items-center mb-2">
                          <Users className="h-5 w-5 mr-2 text-green-500" />
                          <h3 className="text-lg font-medium">Character Creator</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Create detailed character profiles with backstories and traits.</p>
                        <Button variant="outline" size="sm">Open Tool</Button>
                      </div>
                      
                      <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                        <div className="flex items-center mb-2">
                          <BookOpen className="h-5 w-5 mr-2 text-amber-500" />
                          <h3 className="text-lg font-medium">Name Generator</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Generate character names from different cultures and time periods.</p>
                        <Button variant="outline" size="sm">Open Tool</Button>
                      </div>
                      
                      <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                        <div className="flex items-center mb-2">
                          <Layers className="h-5 w-5 mr-2 text-purple-500" />
                          <h3 className="text-lg font-medium">World Builder</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Create detailed fictional worlds with maps, cultures, and histories.</p>
                        <Button variant="outline" size="sm">Open Tool</Button>
                      </div>
                      
                      <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                        <div className="flex items-center mb-2">
                          <Music className="h-5 w-5 mr-2 text-red-500" />
                          <h3 className="text-lg font-medium">Writing Soundtracks</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Curated background music to enhance your writing experience.</p>
                        <Button variant="outline" size="sm">Open Tool</Button>
                      </div>
                      
                      <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                        <div className="flex items-center mb-2">
                          <Target className="h-5 w-5 mr-2 text-indigo-500" />
                          <h3 className="text-lg font-medium">Writing Challenges</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Daily and weekly writing challenges to boost your creativity.</p>
                        <Button variant="outline" size="sm">Open Tool</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="stats">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-serif font-bold mb-6">Writing Statistics</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      <div className="border rounded-lg p-4 bg-secondary/20">
                        <p className="text-sm text-muted-foreground">Total Words</p>
                        <h4 className="text-2xl font-bold mt-1">{writingMetrics.totalWordCount}</h4>
                        <p className="text-xs text-muted-foreground mt-1">+250 from yesterday</p>
                      </div>
                      
                      <div className="border rounded-lg p-4 bg-secondary/20">
                        <p className="text-sm text-muted-foreground">Writing Sessions</p>
                        <h4 className="text-2xl font-bold mt-1">{writingMetrics.sessionsToday}</h4>
                        <p className="text-xs text-muted-foreground mt-1">Today</p>
                      </div>
                      
                      <div className="border rounded-lg p-4 bg-secondary/20">
                        <p className="text-sm text-muted-foreground">Avg. Words/Session</p>
                        <h4 className="text-2xl font-bold mt-1">{writingMetrics.avgWordsPerSession}</h4>
                        <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
                      </div>
                      
                      <div className="border rounded-lg p-4 bg-secondary/20">
                        <p className="text-sm text-muted-foreground">Longest Streak</p>
                        <h4 className="text-2xl font-bold mt-1">{writingMetrics.longestStreak} days</h4>
                        <p className="text-xs text-muted-foreground mt-1">Current streak: 3 days</p>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-medium mb-4">Weekly Writing Activity</h3>
                      <div className="h-60 bg-secondary/20 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Writing activity chart will appear here</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Recent Achievements</h3>
                      <div className="space-y-3">
                        <div className="flex items-center p-3 border rounded-lg bg-secondary/10">
                          <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-2 rounded-full mr-3">
                            <Zap className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">1,000 Words Written!</h4>
                            <p className="text-sm text-muted-foreground">You've written 1,000 words with FANVERSE.</p>
                          </div>
                          <Check className="ml-auto h-5 w-5 text-green-500" />
                        </div>
                        
                        <div className="flex items-center p-3 border rounded-lg bg-secondary/10">
                          <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-full mr-3">
                            <CalendarClock className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">3-Day Streak</h4>
                            <p className="text-sm text-muted-foreground">You've written 3 days in a row.</p>
                          </div>
                          <Check className="ml-auto h-5 w-5 text-green-500" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-serif font-bold mb-6">Editor Settings</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Interface Preferences</h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <Label htmlFor="font-size">Font Size</Label>
                            <Select defaultValue="medium">
                              <SelectTrigger id="font-size">
                                <SelectValue placeholder="Select font size" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="small">Small</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="large">Large</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="font-family">Font Family</Label>
                            <Select defaultValue="sans">
                              <SelectTrigger id="font-family">
                                <SelectValue placeholder="Select font family" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sans">Sans-serif</SelectItem>
                                <SelectItem value="serif">Serif</SelectItem>
                                <SelectItem value="mono">Monospace</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-4">Autosave</h3>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Switch id="autosave" checked={isAutoSaveEnabled} onCheckedChange={setIsAutoSaveEnabled} />
                            <Label htmlFor="autosave">Enable autosave</Label>
                          </div>
                          <Select defaultValue="2">
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Autosave interval" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Every minute</SelectItem>
                              <SelectItem value="2">Every 2 minutes</SelectItem>
                              <SelectItem value="5">Every 5 minutes</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-4">Sound Effects</h3>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="sound-effects" 
                            checked={soundEffects}
                            onCheckedChange={setSoundEffects}
                          />
                          <Label htmlFor="sound-effects" className="flex items-center">
                            {soundEffects ? (
                              <Volume2 className="h-4 w-4 mr-2" />
                            ) : (
                              <VolumeX className="h-4 w-4 mr-2" />
                            )}
                            {soundEffects ? "Sound effects enabled" : "Sound effects disabled"}
                          </Label>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-4">Notifications</h3>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            id="notifications" 
                            checked={notificationsEnabled}
                            onCheckedChange={setNotificationsEnabled}
                          />
                          <Label htmlFor="notifications" className="flex items-center">
                            <BellRing className="h-4 w-4 mr-2" />
                            Enable notifications
                          </Label>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-4">AI Assistant Settings</h3>
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Switch id="ai-suggestions" defaultChecked />
                            <Label htmlFor="ai-suggestions">AI writing suggestions</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="grammar-check" defaultChecked />
                            <Label htmlFor="grammar-check">Grammar and spell checking</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="plagiarism" />
                            <Label htmlFor="plagiarism">Plagiarism detection</Label>
                          </div>
                        </div>
                      </div>

                      <Alert>
                        <AlertDescription>
                          Editor settings are saved per browser. If you use multiple devices, you'll need to set your preferences on each one.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
      
      {!focusMode && <Footer />}
    </div>
  );
};

export default Write;
