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
import { Badge } from "@/components/ui/badge";
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
  const [isPublic, setIsPublic] = useState(false);
  const [genre, setGenre] = useState("");
  const [writingMode, setWritingMode] = useState("compose");
  const [aiAssistantVisible, setAiAssistantVisible] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("Arial, sans-serif");
  const [theme, setTheme] = useState("light");
  const [speechSynthesisEnabled, setSpeechSynthesisEnabled] = useState(false);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [speechRate, setSpeechRate] = useState(1);
  const [speechPitch, setSpeechPitch] = useState(1);
  const [collaborationMode, setCollaborationMode] = useState(false);
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timerDuration, setTimerDuration] = useState(30);
  const [timerProgress, setTimerProgress] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [targetWordCount, setTargetWordCount] = useState(1000);
  const [progress, setProgress] = useState(0);
  const [isDistractionFreeMode, setIsDistractionFreeMode] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [musicVolume, setMusicVolume] = useState(50);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isGrammarCheckEnabled, setIsGrammarCheckEnabled] = useState(true);
  const [grammarSuggestions, setGrammarSuggestions] = useState<string[]>([]);
  const [isSpellCheckEnabled, setIsSpellCheckEnabled] = useState(true);
  const [spellCheckSuggestions, setSpellCheckSuggestions] = useState<string[]>([]);
  const [isStorySummaryVisible, setIsStorySummaryVisible] = useState(false);
  const [storySummary, setStorySummary] = useState("");
  const [isCharacterListVisible, setIsCharacterListVisible] = useState(false);
  const [characterList, setCharacterList] = useState<string[]>([]);
  const [isSettingListVisible, setIsSettingListVisible] = useState(false);
  const [settingList, setSettingList] = useState<string[]>([]);
  const [isObjectListVisible, setIsObjectListVisible] = useState(false);
  const [objectList, setObjectList] = useState<string[]>([]);
  const [isEventListVisible, setIsEventListVisible] = useState(false);
  const [eventList, setEventList] = useState<string[]>([]);
  const [isConflictListVisible, setIsConflictListVisible] = useState(false);
  const [conflictList, setConflictList] = useState<string[]>([]);
  const [isThemeListVisible, setIsThemeListVisible] = useState(false);
  const [themeList, setThemeList] = useState<string[]>([]);
  const [isSymbolListVisible, setIsSymbolListVisible] = useState(false);
  const [symbolList, setSymbolList] = useState<string[]>([]);
  const [isMoodListVisible, setIsMoodListVisible] = useState(false);
  const [moodList, setMoodList] = useState<string[]>([]);
  const [isPOVListVisible, setIsPOVListVisible] = useState(false);
  const [povList, setPOVList] = useState<string[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    const characters = content.length;
    const time = Math.ceil(words / 200);

    setWordCount(words);
    setCharacterCount(characters);
    setReadingTime(time);

    const newProgress = targetWordCount > 0 ? Math.min((words / targetWordCount) * 100, 100) : 0;
    setProgress(newProgress);
  }, [content, targetWordCount]);

  useEffect(() => {
    speechSynthesisRef.current = window.speechSynthesis;

    const voices = speechSynthesisRef.current.getVoices();
    if (voices.length > 0) {
      setVoice(voices[0]);
    }

    speechSynthesisRef.current.onvoiceschanged = () => {
      const updatedVoices = speechSynthesisRef.current?.getVoices();
      if (updatedVoices && updatedVoices.length > 0) {
        setVoice(updatedVoices[0]);
      }
    };

    return () => {
      speechSynthesisRef.current?.cancel();
    };
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      setIsDarkMode(storedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (timerEnabled && isTimerRunning) {
      setTimerProgress(0);
      const startTime = Date.now();
      const endTime = startTime + timerDuration * 60 * 1000;

      intervalId = setInterval(() => {
        const now = Date.now();
        const remainingTime = endTime - now;

        if (remainingTime <= 0) {
          clearInterval(intervalId);
          setIsTimerRunning(false);
          setTimerProgress(100);
          toast.success("Time's up!");
        } else {
          const progress = ((timerDuration * 60 * 1000 - remainingTime) / (timerDuration * 60 * 1000)) * 100;
          setTimerProgress(progress);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isTimerRunning, timerDuration, timerEnabled]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleGenreChange = (value: string) => {
    setGenre(value);
  };

  const handleVisibilityChange = (checked: boolean) => {
    setIsPublic(checked);
  };

  const handleWritingModeChange = (mode: string) => {
    setWritingMode(mode);
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(parseInt(e.target.value));
  };

  const handleFontFamilyChange = (value: string) => {
    setFontFamily(value);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    setIsDarkMode(newTheme === "dark");
  };

  const handleSpeechSynthesisToggle = () => {
    setSpeechSynthesisEnabled(!speechSynthesisEnabled);
  };

  const handleVoiceChange = (value: string) => {
    const selectedVoice = speechSynthesisRef.current?.getVoices().find((v) => v.name === value);
    if (selectedVoice) {
      setVoice(selectedVoice);
    }
  };

  const handleSpeechRateChange = (value: number[]) => {
    setSpeechRate(value[0] / 100);
  };

  const handleSpeechPitchChange = (value: number[]) => {
    setSpeechPitch(value[0] / 100);
  };

  const handleCollaborationModeToggle = () => {
    setCollaborationMode(!collaborationMode);
  };

  const handleCollaboratorAdd = () => {
    const newCollaborator = prompt("Enter collaborator's email:");
    if (newCollaborator) {
      setCollaborators([...collaborators, newCollaborator]);
    }
  };

  const handleTimerToggle = () => {
    setTimerEnabled(!timerEnabled);
    setIsTimerRunning(false);
    setTimerProgress(0);
  };

  const handleTimerDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimerDuration(parseInt(e.target.value));
  };

  const handleTimerStartStop = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleTargetWordCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetWordCount(parseInt(e.target.value));
  };

  const handleDistractionFreeModeToggle = () => {
    setIsDistractionFreeMode(!isDistractionFreeMode);
  };

  const handleMusicToggle = () => {
    setMusicEnabled(!musicEnabled);
  };

  const handleMusicVolumeChange = (value: number[]) => {
    setMusicVolume(value[0]);
  };

  const handleAutoSaveToggle = () => {
    setAutoSaveEnabled(!autoSaveEnabled);
  };

  const handleAiSuggestionRequest = async () => {
    setIsAiGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setAiSuggestions(["Suggestion 1", "Suggestion 2", "Suggestion 3"]);
    setIsAiGenerating(false);
  };

  const handleGrammarCheckToggle = () => {
    setIsGrammarCheckEnabled(!isGrammarCheckEnabled);
  };

  const handleSpellCheckToggle = () => {
    setIsSpellCheckEnabled(!isSpellCheckEnabled);
  };

  const handleStorySummaryToggle = () => {
    setIsStorySummaryVisible(!isStorySummaryVisible);
  };

  const handleCharacterListToggle = () => {
    setIsCharacterListVisible(!isCharacterListVisible);
  };

  const handleSettingListToggle = () => {
    setIsSettingListVisible(!isSettingListVisible);
  };

  const handleObjectListToggle = () => {
    setIsObjectListVisible(!isObjectListVisible);
  };

  const handleEventListToggle = () => {
    setIsEventListVisible(!isEventListVisible);
  };

  const handleConflictListToggle = () => {
    setIsConflictListVisible(!isConflictListVisible);
  };

  const handleThemeListToggle = () => {
    setIsThemeListVisible(!isThemeListVisible);
  };

  const handleSymbolListToggle = () => {
    setIsSymbolListVisible(!isSymbolListVisible);
  };

  const handleMoodListToggle = () => {
    setIsMoodListVisible(!isMoodListVisible);
  };

  const handlePOVListToggle = () => {
    setIsPOVListVisible(!isPOVListVisible);
  };

  const handleApplyAiSuggestion = (text: string) => {
    setContent(prevContent => prevContent + "\n\n" + text);
    toast.success("AI suggestion applied to your story");
  };

  const speakText = () => {
    if (!speechSynthesisEnabled || !speechSynthesisRef.current || !voice) return;

    const utterance = new SpeechSynthesisUtterance(content);
    utterance.voice = voice;
    utterance.rate = speechRate;
    utterance.pitch = speechPitch;

    speechSynthesisRef.current.cancel();
    speechSynthesisRef.current.speak(utterance);
  };

  const stopText = () => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel();
    }
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen">
      <Header />

      <div className="container mx-auto py-8 px-4">
        <Tabs defaultValue="compose" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="compose" onClick={() => handleWritingModeChange("compose")}>
              <Pencil className="mr-2 h-4 w-4" />
              Compose
            </TabsTrigger>
            <TabsTrigger value="ai-assist" onClick={() => handleWritingModeChange("ai-assist")}>
              <Sparkles className="mr-2 h-4 w-4" />
              AI Assist
            </TabsTrigger>
            <TabsTrigger value="settings" onClick={() => handleWritingModeChange("settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="compose">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <Label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Title
                  </Label>
                  <Input
                    type="text"
                    id="title"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    value={title}
                    onChange={handleTitleChange}
                  />
                </div>

                <div className="mb-4">
                  <Label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Content
                  </Label>
                  <Textarea
                    id="content"
                    ref={textareaRef}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${isDistractionFreeMode ? "text-2xl" : ""}`}
                    value={content}
                    onChange={handleContentChange}
                    style={{
                      fontSize: `${fontSize}px`,
                      fontFamily: fontFamily,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <BookOpenText className="mr-2 inline-block h-5 w-5 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
                        </TooltipTrigger>
                        <TooltipContent>
                          View Story
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Save className="mr-2 inline-block h-5 w-5 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Save Story
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Share2 className="mr-2 inline-block h-5 w-5 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Share Story
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Trash2 className="mr-2 inline-block h-5 w-5 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Delete Story
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Badge variant="outline">Words: {wordCount}</Badge>
                    <Badge variant="outline">Characters: {characterCount}</Badge>
                    <Badge variant="outline">Reading Time: {readingTime} min</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-assist">
            <Card>
              <CardContent className="p-6">
                <AIWritingAssistant 
                  currentText={content} 
                  onSuggestionApply={handleApplyAiSuggestion} 
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="visibility">Visibility</Label>
                      <Switch id="visibility" checked={isPublic} onCheckedChange={handleVisibilityChange} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Make your story public or keep it private.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="genre">Genre</Label>
                    <Select onValueChange={handleGenreChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fantasy">Fantasy</SelectItem>
                        <SelectItem value="science-fiction">Science Fiction</SelectItem>
                        <SelectItem value="mystery">Mystery</SelectItem>
                        <SelectItem value="romance">Romance</SelectItem>
                        <SelectItem value="thriller">Thriller</SelectItem>
                        <SelectItem value="horror">Horror</SelectItem>
                        <SelectItem value="historical-fiction">Historical Fiction</SelectItem>
                        <SelectItem value="contemporary">Contemporary</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Choose a genre for your story.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="font-size">Font Size ({fontSize}px)</Label>
                    <Slider
                      id="font-size"
                      defaultValue={[fontSize]}
                      min={12}
                      max={30}
                      step={1}
                      onValueChange={(value) => handleFontSizeChange({ target: { value: value[0].toString() } } as any)}
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Adjust the font size of the text.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="font-family">Font Family</Label>
                    <Select onValueChange={handleFontFamilyChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a font" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                        <SelectItem value="Times New Roman, serif">Times New Roman</SelectItem>
                        <SelectItem value="Courier New, monospace">Courier New</SelectItem>
                        <SelectItem value="Georgia, serif">Georgia</SelectItem>
                        <SelectItem value="Verdana, sans-serif">Verdana</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Choose a font family for the text.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="theme">Theme</Label>
                    <Select onValueChange={handleThemeChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Choose a theme for the editor.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="speech-synthesis">Speech Synthesis</Label>
                      <Switch id="speech-synthesis" checked={speechSynthesisEnabled} onCheckedChange={handleSpeechSynthesisToggle} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enable or disable text-to-speech.
                    </p>
                  </div>

                  {speechSynthesisEnabled && (
                    <div>
                      <Label htmlFor="voice">Voice</Label>
                      <Select onValueChange={handleVoiceChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a voice" />
                        </SelectTrigger>
                        <SelectContent>
                          {speechSynthesisRef.current?.getVoices().map((v) => (
                            <SelectItem key={v.name} value={v.name}>
                              {v.name} ({v.lang})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Choose a voice for text-to-speech.
                      </p>
                    </div>
                  )}

                  {speechSynthesisEnabled && (
                    <div>
                      <Label htmlFor="speech-rate">Speech Rate ({speechRate * 100}%)</Label>
                      <Slider
                        id="speech-rate"
                        defaultValue={[speechRate * 100]}
                        min={50}
                        max={200}
                        step={1}
                        onValueChange={handleSpeechRateChange}
                      />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Adjust the speech rate.
                      </p>
                    </div>
                  )}

                  {speechSynthesisEnabled && (
                    <div>
                      <Label htmlFor="speech-pitch">Speech Pitch ({speechPitch * 100}%)</Label>
                      <Slider
                        id="speech-pitch"
                        defaultValue={[speechPitch * 100]}
                        min={50}
                        max={200}
                        step={1}
                        onValueChange={handleSpeechPitchChange}
                      />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Adjust the speech pitch.
                      </p>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="collaboration-mode">Collaboration Mode</Label>
                      <Switch id="collaboration-mode" checked={collaborationMode} onCheckedChange={handleCollaborationModeToggle} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enable or disable collaboration mode.
                    </p>
                  </div>

                  {collaborationMode && (
                    <div>
                      <Button onClick={handleCollaboratorAdd}>Add Collaborator</Button>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Add collaborators to work on the story together.
                      </p>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="timer">Timer ({timerDuration} min)</Label>
                      <Switch id="timer" checked={timerEnabled} onCheckedChange={handleTimerToggle} />
                    </div>
                  </div>

                  {timerEnabled && (
                    <div>
                      <Input
                        type="number"
                        id="timer-duration"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        value={timerDuration.toString()}
                        onChange={handleTimerDurationChange}
                      />
                      <Button onClick={handleTimerStartStop}>
                        {isTimerRunning ? "Stop Timer" : "Start Timer"}
                      </Button>
                      <Progress value={timerProgress} />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="target-word-count">Target Word Count ({targetWordCount})</Label>
                    <Input
                      type="number"
                      id="target-word-count"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      value={targetWordCount.toString()}
                      onChange={handleTargetWordCountChange}
                    />
                    <Progress value={progress} />
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="distraction-free-mode">Distraction-Free Mode</Label>
                      <Switch id="distraction-free-mode" checked={isDistractionFreeMode} onCheckedChange={handleDistractionFreeModeToggle} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Hide all unnecessary elements for a cleaner writing experience.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="music">Music</Label>
                      <Switch id="music" checked={musicEnabled} onCheckedChange={handleMusicToggle} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enable or disable background music.
                    </p>
                  </div>

                  {musicEnabled && (
                    <div>
                      <Label htmlFor="music-volume">Music Volume ({musicVolume}%)</Label>
                      <Slider
                        id="music-volume"
                        defaultValue={[musicVolume]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={handleMusicVolumeChange}
                      />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Adjust the music volume.
                      </p>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-save">Auto-Save</Label>
                      <Switch id="auto-save" checked={autoSaveEnabled} onCheckedChange={handleAutoSaveToggle} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Automatically save your story periodically.
                    </p>
                  </div>

                  <div>
                    <Button disabled={isAiGenerating} onClick={handleAiSuggestionRequest}>
                      {isAiGenerating ? "Generating..." : "Get AI Suggestions"}
                    </Button>
                    {aiSuggestions.length > 0 && (
                      <ul>
                        {aiSuggestions.map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="grammar-check">Grammar Check</Label>
                      <Switch id="grammar-check" checked={isGrammarCheckEnabled} onCheckedChange={handleGrammarCheckToggle} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enable or disable grammar check.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="spell-check">Spell Check</Label>
                      <Switch id="spell-check" checked={isSpellCheckEnabled} onCheckedChange={handleSpellCheckToggle} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enable or disable spell check.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="story-summary">Story Summary</Label>
                      <Switch id="story-summary" checked={isStorySummaryVisible} onCheckedChange={handleStorySummaryToggle} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Show or hide the story summary.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="character-list">Character List</Label>
                      <Switch id="character-list" checked={isCharacterListVisible} onCheckedChange={handleCharacterListToggle} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Show or hide the character list.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="setting-list">Setting List</Label>
                      <Switch id="setting-list" checked={isSettingListVisible} onCheckedChange={handleSettingListToggle} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Show or hide the setting list.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="object-list">Object List</Label>
                      <Switch id="object-list" checked={isObjectListVisible} onCheckedChange={handleObjectListToggle} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Show or hide the object list.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="event-list">Event List</Label>
                      <Switch id="event-list" checked={isEventListVisible} onCheckedChange={handleEventListToggle} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Show or hide the event list.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="conflict-list">Conflict List</Label>
                      <Switch id="conflict-list" checked={isConflictListVisible} onCheckedChange={handleConflictListToggle} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Show or hide the conflict list.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="theme-list">Theme List</Label>
                      <Switch id="theme-list" checked={isThemeListVisible} onCheckedChange={handleThemeListToggle} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Show or hide the theme list.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="symbol-list">Symbol List</Label>
                      <Switch id="symbol-list" checked={isSymbolListVisible} onCheckedChange={handleSymbolListToggle} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Show or hide the symbol list.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="mood-list">Mood List</Label>
                      <Switch id="mood-list" checked={isMoodListVisible} onCheckedChange={handleMoodListToggle} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Show or hide the mood list.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="pov-list">POV List</Label>
                      <Switch id="pov-list" checked={isPOVListVisible} onCheckedChange={handlePOVListToggle} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Show or hide the POV list.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Write;
