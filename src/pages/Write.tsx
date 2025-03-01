
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

// Import VideoUploader component
import VideoUploader from "@/components/VideoUploader";

// Import Header and Footer components
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Import icons
import { 
  Award, 
  Check, 
  Star, 
  Globe2, 
  Sparkles, 
  Wand2, 
  Brain, 
  Lightbulb, 
  Zap, 
  MessageSquare, 
  RefreshCw, 
  Edit2, 
  Settings, 
  Copy, 
  Cloud, 
  BookOpen, 
  PenTool, 
  FileText, 
  Plus, 
  Video, 
  Camera, 
  BookMarked, 
  Palette, 
  Music, 
  ImagePlus, 
  Type, 
  Smile, 
  Heart, 
  Medal,
  Clock as ClockIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Users as UsersIcon,
  LogOut
} from "lucide-react";

interface Challenge {
  title: string;
  description: string;
  deadline: string;
  wordLimit: string;
  prize: string;
  participants: number;
}

interface AiPrompt {
  title: string;
  prompt: string;
  category: string;
}

const Write = () => {
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [genre, setGenre] = useState("Fantasy");
  const [wordCount, setWordCount] = useState(0);
  const [isPublished, setIsPublished] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [showAiDialog, setShowAiDialog] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiModel, setAiModel] = useState("creative");
  const [creativityLevel, setCreativityLevel] = useState([0.7]);
  const [activeAiTab, setActiveAiTab] = useState("inspire");
  const [showStyleOptions, setShowStyleOptions] = useState(false);
  const [fontStyle, setFontStyle] = useState("default");
  const [backgroundColor, setBackgroundColor] = useState("default");
  const [showVideoUploader, setShowVideoUploader] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [showContentTools, setShowContentTools] = useState(false);
  const [activeTab, setActiveTab] = useState("write");
  const { toast } = useToast();

  const challenges = [
    {
      title: "Fantasy World-Building Challenge",
      description:
        "Create a new fantasy world with unique creatures, cultures, and magic systems.",
      deadline: "2023-12-31",
      wordLimit: "5000",
      prize: "Publication in our annual anthology",
      participants: 125,
    },
    {
      title: "Sci-Fi Short Story Contest",
      description:
        "Write a short story set in a futuristic world with advanced technology and complex social issues.",
      deadline: "2024-01-15",
      wordLimit: "3000",
      prize: "$500 cash prize",
      participants: 87,
    },
    {
      title: "Romance Writing Prompt",
      description:
        "Explore the theme of second chances in a heartwarming romance story.",
      deadline: "2024-02-29",
      wordLimit: "4000",
      prize: "Featured on our website",
      participants: 54,
    },
  ];

  const aiPrompts: AiPrompt[] = [
    {
      title: "Character Development",
      prompt: "Create a complex character with a unique backstory, motivations, and flaws.",
      category: "character"
    },
    {
      title: "Plot Twist",
      prompt: "Generate an unexpected plot twist that will surprise readers.",
      category: "plot"
    },
    {
      title: "Fantasy Setting",
      prompt: "Describe a magical fantasy world with unique systems of magic and geography.",
      category: "setting"
    },
    {
      title: "Dialogue Enhancement",
      prompt: "Improve dialogue to sound more natural and reveal character traits.",
      category: "writing"
    },
    {
      title: "Emotional Scene",
      prompt: "Write an emotionally powerful scene that will resonate with readers.",
      category: "scene"
    },
    {
      title: "Mystery Clues",
      prompt: "Create subtle clues and red herrings for a mystery subplot.",
      category: "plot"
    },
  ];

  // AI model options
  const aiModels = [
    { id: "creative", name: "Creative Explorer", description: "Best for generating imaginative content and story ideas" },
    { id: "narrative", name: "Narrative Expert", description: "Specialized in coherent storytelling and plot development" },
    { id: "descriptive", name: "Descriptive Muse", description: "Excellent for vivid descriptions and setting details" },
    { id: "dialogue", name: "Dialogue Master", description: "Creates natural, engaging character conversations" },
  ];
  
  // Font style options
  const fontStyles = [
    { id: "default", name: "Default", class: "font-sans" },
    { id: "serif", name: "Serif", class: "font-serif" },
    { id: "modern", name: "Modern", class: "font-sans tracking-tight" },
    { id: "creative", name: "Creative", class: "font-serif italic" },
  ];
  
  // Background color options
  const backgroundColors = [
    { id: "default", name: "Default", class: "bg-background" },
    { id: "warm", name: "Warm Cream", class: "bg-amber-50" },
    { id: "cool", name: "Cool Blue", class: "bg-blue-50" },
    { id: "mint", name: "Soft Mint", class: "bg-green-50" },
  ];

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleStoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setStory(text);
    setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value);
  };

  const handlePublish = () => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please provide a title for your story.",
        variant: "destructive",
      });
      return;
    }

    if (!story.trim()) {
      toast({
        title: "Error",
        description: "Please write some content for your story.",
        variant: "destructive",
      });
      return;
    }

    setIsPublished(true);
    toast({
      title: "Success!",
      description: "Your story has been published successfully!",
    });
  };

  const handleStartNewStory = () => {
    setTitle("");
    setStory("");
    setGenre("Fantasy");
    setWordCount(0);
    setIsPublished(false);
    toast({
      title: "New Story",
      description: "Start writing your new masterpiece!",
    });
  };

  const handleJoinChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    toast({
      title: "Challenge Joined",
      description: `You've joined the "${challenge.title}" challenge. Good luck!`,
    });
  };

  const handleSaveDraft = () => {
    if (!title.trim() && !story.trim()) {
      toast({
        title: "Error",
        description: "Please add some content before saving.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Draft Saved",
      description: "Your story has been saved as a draft.",
    });
  };

  const handleGenerateAiContent = () => {
    if (!aiPrompt.trim()) {
      toast({
        title: "Error",
        description: "Please provide a prompt for the AI.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI response generation
    setTimeout(() => {
      const creativity = creativityLevel[0];
      let generatedContent = "";
      
      // Generate different responses based on the selected AI tab and model
      if (activeAiTab === "inspire") {
        generatedContent = `Here's a story idea inspired by your prompt:\n\n`;
        
        if (aiModel === "creative") {
          generatedContent += `In a world where dreams physically manifest during sleep, a young librarian discovers she can enter other people's dream manifestations. She begins using this ability to help people overcome nightmares, until she encounters a dream thief who's stealing people's most precious dream-memories. As she investigates, she realizes the thief may be connected to her own forgotten past and a mysterious dream that keeps recurring every full moon.\n\nKey themes could include memory, identity, and the fine line between helping others and invading their privacy.`;
        } else {
          generatedContent += `A reclusive clockmaker discovers an ancient timepiece that allows glimpses 24 hours into the future. Initially using it for small personal gains, the clockmaker soon realizes the moral implications when witnessing a tragic event that could be prevented. Each attempt to change the future creates increasingly complicated consequences, forcing difficult ethical choices about responsibility and destiny.\n\nThis story could explore themes of fate versus free will, and the burden of knowledge.`;
        }
      } else if (activeAiTab === "improve") {
        generatedContent = `Here are some suggestions to enhance your current writing:\n\n`;
        generatedContent += `1. Consider deepening the emotional stakes for your protagonist. What internal conflicts can mirror the external ones?\n\n`;
        generatedContent += `2. The setting descriptions could be more sensory - what does this world smell like? What unique sounds define this environment?\n\n`;
        generatedContent += `3. Your dialogue flows naturally, but could reveal more character through distinct speech patterns for each person.\n\n`;
        generatedContent += `4. The pacing in the middle section could be tightened by combining several shorter scenes into one more impactful moment.\n\n`;
        generatedContent += `5. Consider adding a subtle subplot that connects thematically to your main story, enriching the overall narrative.`;
      } else if (activeAiTab === "continue") {
        const lastSentence = story.split('.').slice(-2)[0];
        generatedContent = `Continuing from "${lastSentence || 'your story'}"...\n\n`;
        
        if (genre === "Fantasy") {
          generatedContent += `The ancient symbols on the cavern wall began to glow with an eerie blue light, casting shadows that seemed to move of their own accord. Elara stepped back, her hand instinctively reaching for the amulet around her neck. It was warm to the touch, almost vibrating with energy that matched the pulsing of the symbols. "This is it," she whispered, her voice echoing in the chamber. "The gateway described in the prophecy." Behind her, Marcus shifted uncomfortably, his hand resting on his sword hilt. "Are you certain we should be doing this? The elders warned that some doors are sealed for a reason." Elara turned to face him, her expression resolute despite the doubt flickering in her eyes. "We don't have a choice anymore. Not with what's coming."`;
        } else if (genre === "Sci-Fi") {
          generatedContent += `The spacecraft's warning systems blared as the quantum fluctuations intensified around them. "Captain, the temporal shields are failing," reported Officer Chen, fingers flying across the holographic interface. "We've got maybe three minutes before we're pulled into the anomaly." Captain Reyes studied the swirling distortion visible through the viewscreen, its impossible colors defying conventional physics. "Reroute power from life support on decks 7 through 12," she ordered. "And prepare the experimental jump drive." Her first officer turned sharply. "The jump drive? But it's never been tested in these conditions." "And we may not survive to regret it," Reyes replied grimly, "but it's our only chance to make it home."`;
        } else {
          generatedContent += `The cafe fell silent as they locked eyes across the room, years of unspoken words hanging in the air between them. Time seemed to slow, the ambient noise fading to a distant hum as Alex took a hesitant step forward. This wasn't how it was supposed to happen—not here, not now, not when everything had finally started making sense again. "I didn't know you were back in town," Alex said, voice barely above a whisper. Morgan's smile didn't quite reach their eyes. "I wasn't planning to stay. But then again, I never seem to plan anything right when it comes to you." The words carried no accusation, just a weary acceptance that made Alex's chest tighten with a familiar ache.`;
        }
      } else {
        generatedContent = `Based on your request for assistance with "${aiPrompt}", here are some creative suggestions:\n\n`;
        generatedContent += `Consider approaching this from multiple perspectives to add depth. What if you explored this theme through the lens of someone who has entirely different life experiences than your protagonist?\n\n`;
        generatedContent += `You might also experiment with structure - perhaps a non-linear narrative could enhance the emotional impact of your story, revealing key information at strategic moments.\n\n`;
        generatedContent += `Don't forget that settings can become characters in themselves. How might the environment actively influence the events rather than just providing a backdrop?`;
      }
      
      // Adjust output based on creativity level
      if (creativity < 0.4) {
        generatedContent = generatedContent.split('\n\n').slice(0, 2).join('\n\n');
      } else if (creativity > 0.8) {
        generatedContent += `\n\n(Additional creative element: Consider incorporating an unexpected element like a mysterious object that appears at key moments but isn't explained until the final revelation.)`;
      }
      
      setAiResponse(generatedContent);
      setIsGenerating(false);
    }, 1500); // Simulate processing time
  };

  const handleUseAiContent = () => {
    setStory(story ? `${story}\n\n${aiResponse}` : aiResponse);
    const newWordCount = (story + aiResponse).trim().split(/\s+/).length;
    setWordCount(newWordCount);
    setShowAiDialog(false);
    
    toast({
      title: "AI Content Added",
      description: "The generated content has been added to your story.",
    });
  };

  const handleUseAiPrompt = (prompt: AiPrompt) => {
    setAiPrompt(prompt.prompt);
    setActiveAiTab(prompt.category === "character" || prompt.category === "setting" ? "inspire" : 
                  prompt.category === "writing" ? "improve" : "continue");
  };

  const getTextareaClasses = () => {
    const currentFontStyle = fontStyles.find(f => f.id === fontStyle)?.class || fontStyles[0].class;
    return `min-h-[300px] transition-colors ${currentFontStyle}`;
  };

  const getCardClasses = () => {
    const currentBgColor = backgroundColors.find(b => b.id === backgroundColor)?.class || backgroundColors[0].class;
    return `transition-colors ${currentBgColor}`;
  };

  const handleVideoUploaded = (videoUrl: string) => {
    setVideoUrl(videoUrl);
    setShowVideoUploader(false);
    toast({
      title: "Video Successfully Attached",
      description: "Your video has been attached to your story.",
    });
  };

  const getGradientForGenre = () => {
    switch(genre) {
      case "Fantasy":
        return "bg-gradient-to-r from-purple-500 to-indigo-500";
      case "Sci-Fi":
        return "bg-gradient-to-r from-blue-500 to-cyan-500";
      case "Romance":
        return "bg-gradient-to-r from-pink-400 to-red-400";
      case "Mystery":
        return "bg-gradient-to-r from-slate-700 to-slate-500";
      case "Horror":
        return "bg-gradient-to-r from-gray-900 to-red-900";
      case "Adventure":
        return "bg-gradient-to-r from-amber-500 to-orange-500";
      case "Historical":
        return "bg-gradient-to-r from-amber-700 to-yellow-600";
      case "Thriller":
        return "bg-gradient-to-r from-red-600 to-gray-800";
      default:
        return "bg-gradient-to-r from-blue-600 to-blue-400";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <div className="container py-16 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold font-serif bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">Craft Your Masterpiece</h1>
          <p className="text-xl text-muted-foreground mt-2 max-w-2xl mx-auto">
            Unleash your creativity with our powerful writing studio. Blend words, videos, and AI assistance to create engaging stories.
          </p>
        </motion.div>

        {/* Main tabs for the writing experience */}
        <Tabs 
          defaultValue="write" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-8"
        >
          <div className="flex justify-center">
            <TabsList className="grid grid-cols-3 w-[400px] h-12 rounded-full p-1 bg-gray-100">
              <TabsTrigger value="write" className="rounded-full data-[state=active]:bg-white data-[state=active]:text-violet-700 data-[state=active]:shadow-md transition-all">
                <PenTool className="mr-2 h-4 w-4" />
                Write
              </TabsTrigger>
              <TabsTrigger value="media" className="rounded-full data-[state=active]:bg-white data-[state=active]:text-violet-700 data-[state=active]:shadow-md transition-all">
                <Camera className="mr-2 h-4 w-4" />
                Media
              </TabsTrigger>
              <TabsTrigger value="publish" className="rounded-full data-[state=active]:bg-white data-[state=active]:text-violet-700 data-[state=active]:shadow-md transition-all">
                <BookMarked className="mr-2 h-4 w-4" />
                Publish
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="write" className="mt-6">
            {/* Quick action buttons - Write Tab */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button 
                onClick={() => setShowStyleOptions(!showStyleOptions)}
                variant="outline"
                className="rounded-full text-violet-600 border-violet-200 hover:bg-violet-50 hover:border-violet-300 shadow-sm"
              >
                <Palette className="mr-2 h-4 w-4" />
                Writing Environment
              </Button>
              <Button 
                onClick={() => setShowAiDialog(true)}
                className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 text-white hover:from-violet-700 hover:to-indigo-600 shadow-md"
              >
                <Brain className="mr-2 h-4 w-4" />
                AI Writing Assistant
              </Button>
              <Button 
                variant="outline"
                className="rounded-full border-violet-200 hover:bg-violet-50 hover:border-violet-300 shadow-sm"
                onClick={handleSaveDraft}
              >
                <Cloud className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button 
                variant="outline"
                className="rounded-full border-violet-200 hover:bg-violet-50 hover:border-violet-300 shadow-sm"
                onClick={() => setShowContentTools(!showContentTools)}
              >
                <Type className="mr-2 h-4 w-4" />
                Content Tools
              </Button>
            </div>

            {/* Content tools panel */}
            {showContentTools && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="mb-8 border-indigo-200 bg-gradient-to-r from-indigo-50 to-violet-50 shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-indigo-700">Content Enhancement Tools</CardTitle>
                    <CardDescription>
                      Add special elements to make your story stand out
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <Button variant="outline" className="flex-col h-24 gap-2 bg-white/80 hover:bg-white border-indigo-100 hover:border-indigo-300 shadow-sm">
                        <Heart className="h-6 w-6 text-pink-500" />
                        <span className="text-sm">Romance Scene</span>
                      </Button>
                      <Button variant="outline" className="flex-col h-24 gap-2 bg-white/80 hover:bg-white border-indigo-100 hover:border-indigo-300 shadow-sm">
                        <Zap className="h-6 w-6 text-amber-500" />
                        <span className="text-sm">Action Sequence</span>
                      </Button>
                      <Button variant="outline" className="flex-col h-24 gap-2 bg-white/80 hover:bg-white border-indigo-100 hover:border-indigo-300 shadow-sm">
                        <MessageSquare className="h-6 w-6 text-blue-500" />
                        <span className="text-sm">Dialogue Generator</span>
                      </Button>
                      <Button variant="outline" className="flex-col h-24 gap-2 bg-white/80 hover:bg-white border-indigo-100 hover:border-indigo-300 shadow-sm">
                        <ImagePlus className="h-6 w-6 text-emerald-500" />
                        <span className="text-sm">Scene Description</span>
                      </Button>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline" className="bg-white hover:bg-blue-50 border-blue-200 text-blue-700 cursor-pointer">
                        #character-development
                      </Badge>
                      <Badge variant="outline" className="bg-white hover:bg-green-50 border-green-200 text-green-700 cursor-pointer">
                        #world-building
                      </Badge>
                      <Badge variant="outline" className="bg-white hover:bg-purple-50 border-purple-200 text-purple-700 cursor-pointer">
                        #plot-twist
                      </Badge>
                      <Badge variant="outline" className="bg-white hover:bg-red-50 border-red-200 text-red-700 cursor-pointer">
                        #conflict
                      </Badge>
                      <Badge variant="outline" className="bg-white hover:bg-amber-50 border-amber-200 text-amber-700 cursor-pointer">
                        #resolution
                      </Badge>
                      <Badge variant="outline" className="bg-white hover:bg-pink-50 border-pink-200 text-pink-700 cursor-pointer">
                        #romance
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Style options */}
            {showStyleOptions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="mb-8 border-violet-200 bg-gradient-to-r from-violet-50 to-indigo-50 shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-violet-700">Customize Your Writing Environment</CardTitle>
                    <CardDescription>
                      Personalize your writing space for optimal creativity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-violet-700 mb-2 block">Font Style</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {fontStyles.map((style) => (
                            <Button
                              key={style.id}
                              variant={fontStyle === style.id ? "default" : "outline"}
                              className={`justify-start ${fontStyle === style.id ? "bg-violet-600" : "bg-white"} ${style.class}`}
                              onClick={() => setFontStyle(style.id)}
                            >
                              {style.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label className="text-violet-700 mb-2 block">Background Color</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {backgroundColors.map((bg) => (
                            <Button
                              key={bg.id}
                              variant={backgroundColor === bg.id ? "default" : "outline"}
                              className={`justify-start ${backgroundColor === bg.id ? "bg-violet-600" : "bg-white"}`}
                              onClick={() => setBackgroundColor(bg.id)}
                            >
                              <div className={`w-4 h-4 rounded mr-2 ${bg.class} border`}></div>
                              {bg.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Writing Form - Expanded to 2 columns */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="md:col-span-2"
              >
                <Card className={`${getCardClasses()} shadow-lg`}>
                  <CardHeader className={`pb-2 border-b border-violet-100 ${getGradientForGenre()} text-white`}>
                    <CardTitle>Story Canvas</CardTitle>
                    <CardDescription className="text-white/80">
                      Bring your imagination to life with words.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 pt-6">
                    <div className="grid gap-2">
                      <Label htmlFor="title" className="text-violet-700">Title</Label>
                      <Input
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="Enter your story title"
                        className="border-violet-200 focus-visible:ring-violet-400 text-lg"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="genre" className="text-violet-700">Genre</Label>
                      <select
                        id="genre"
                        className="flex h-10 w-full rounded-md border border-violet-200 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2"
                        value={genre}
                        onChange={handleGenreChange}
                      >
                        <option value="Fantasy">Fantasy</option>
                        <option value="Sci-Fi">Science Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Horror">Horror</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Historical">Historical Fiction</option>
                        <option value="Thriller">Thriller</option>
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="story" className="text-violet-700">Story</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-7 gap-1 text-muted-foreground hover:text-violet-600">
                              <Wand2 className="h-3.5 w-3.5" />
                              <span className="text-xs">AI Help</span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80">
                            <div className="space-y-2">
                              <h3 className="font-medium text-sm">AI Writing Assistance</h3>
                              <p className="text-xs text-muted-foreground">
                                Choose a prompt to get AI help with your story:
                              </p>
                              <div className="grid gap-1.5 pt-1">
                                {aiPrompts.slice(0, 4).map((prompt, i) => (
                                  <Button 
                                    key={i} 
                                    variant="ghost" 
                                    size="sm" 
                                    className="justify-start h-auto py-1.5 text-left"
                                    onClick={() => {
                                      handleUseAiPrompt(prompt);
                                      setShowAiDialog(true);
                                    }}
                                  >
                                    <Sparkles className="h-3.5 w-3.5 mr-2 text-violet-500" />
                                    <span className="text-sm">{prompt.title}</span>
                                  </Button>
                                ))}
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="mt-1 justify-center"
                                  onClick={() => setShowAiDialog(true)}
                                >
                                  <Brain className="h-3.5 w-3.5 mr-1.5 text-violet-500" />
                                  Open AI Assistant
                                </Button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <Textarea
                        id="story"
                        value={story}
                        onChange={handleStoryChange}
                        placeholder="Start writing your story here..."
                        className={`${getTextareaClasses()} min-h-[400px] border-violet-200 focus-visible:ring-violet-400`}
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground flex items-center">
                        <FileText className="h-4 w-4 mr-1.5 text-violet-500" />
                        Word Count: {wordCount}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleSaveDraft}
                        className="border-violet-300 hover:bg-violet-50 hover:text-violet-700"
                      >
                        Save Draft
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-4 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs flex-1 border-violet-200 hover:bg-violet-50"
                      onClick={() => setShowVideoUploader(true)}
                    >
                      <Video className="h-3.5 w-3.5 mr-1.5 text-violet-500" />
                      Add Video
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs flex-1 border-violet-200 hover:bg-violet-50"
                    >
                      <ImagePlus className="h-3.5 w-3.5 mr-1.5 text-violet-500" />
                      Add Image
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs flex-1 border-violet-200 hover:bg-violet-50"
                    >
                      <Music className="h-3.5 w-3.5 mr-1.5 text-violet-500" />
                      Add Audio
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* Sidebar - Writing aids */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Writing Statistics Card */}
                <Card className="mb-6 border-indigo-200 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-indigo-700">Writing Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground flex items-center">
                          <FileText className="h-4 w-4 mr-1.5 text-indigo-500" />
                          Word Count
                        </span>
                        <span className="font-medium">{wordCount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1.5 text-indigo-500" />
                          Estimated Reading Time
                        </span>
                        <span className="font-medium">{Math.ceil(wordCount / 250)} min</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground flex items-center">
                          <BookOpen className="h-4 w-4 mr-1.5 text-indigo-500" />
                          Pages
                        </span>
                        <span className="font-medium">{Math.ceil(wordCount / 500)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-indigo-100">
                      <h4 className="text-sm font-medium mb-3 text-indigo-700">Writing Style</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Descriptive</span>
                            <span>65%</span>
                          </div>
                          <div className="h-1.5 bg-indigo-100 rounded-full">
                            <div className="h-full w-[65%] bg-indigo-500 rounded-full"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Dialogue</span>
                            <span>40%</span>
                          </div>
                          <div className="h-1.5 bg-indigo-100 rounded-full">
                            <div className="h-full w-[40%] bg-indigo-500 rounded-full"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Action</span>
                            <span>35%</span>
                          </div>
                          <div className="h-1.5 bg-indigo-100 rounded-full">
                            <div className="h-full w-[35%] bg-indigo-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Current Challenge Card */}
                {selectedChallenge ? (
                  <Card className="mb-6 border-amber-200 shadow-sm bg-gradient-to-r from-amber-50 to-orange-50">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg text-amber-700">Active Challenge</CardTitle>
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
                          <Medal className="h-3.5 w-3.5 mr-1 text-amber-500" />
                          <span>In Progress</span>
                        </Badge>
                      </div>
                      <CardDescription className="text-amber-800">
                        Push yourself to complete this challenge
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-bold text-amber-800">{selectedChallenge.title}</h3>
                      <p className="text-sm mt-1 text-amber-700">{selectedChallenge.description}</p>
                      
                      <div className="mt-4 grid gap-3">
                        <div className="flex items-center text-sm">
                          <ClockIcon className="h-4 w-4 mr-2 text-amber-500" />
                          <span className="text-amber-700">Deadline: {selectedChallenge.deadline}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <FileText className="h-4 w-4 mr-2 text-amber-500" />
                          <span className="text-amber-700">Word Limit: {selectedChallenge.wordLimit}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Award className="h-4 w-4 mr-2 text-amber-500" />
                          <span className="text-amber-700">Prize: {selectedChallenge.prize}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <UsersIcon className="h-4 w-4 mr-2 text-amber-500" />
                          <span className="text-amber-700">{selectedChallenge.participants} participants</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-between">
                        <Button variant="outline" size="sm" className="text-xs border-amber-300 hover:bg-amber-100 text-amber-700">
                          View Details
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setSelectedChallenge(null)}
                          className="text-xs border-amber-300 hover:bg-amber-100 text-amber-700"
                        >
                          <LogOut className="h-3.5 w-3.5 mr-1" />
                          Leave Challenge
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="mb-6 border-violet-200 shadow-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-violet-700">Writing Challenges</CardTitle>
                      <CardDescription>
                        Join challenges to boost your creativity
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-0">
                      <ScrollArea className="h-[280px]">
                        <div className="px-6">
                          {challenges.map((challenge, i) => (
                            <div key={i} className="mb-4 pb-4 border-b border-violet-100 last:border-0 last:mb-0 last:pb-0">
                              <div className="flex justify-between">
                                <h3 className="font-medium text-violet-800">{challenge.title}</h3>
                                <Badge variant="outline" className="bg-violet-50 border-violet-200 text-violet-700">
                                  {challenge.participants} writers
                                </Badge>
                              </div>
                              <p className="text-sm mt-1 text-muted-foreground">{challenge.description}</p>
                              <div className="mt-3 flex justify-between items-center">
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <ClockIcon className="h-3.5 w-3.5 mr-1 text-violet-400" />
                                  <span>Ends: {challenge.deadline}</span>
                                </div>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="h-7 text-xs border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                                  onClick={() => handleJoinChallenge(challenge)}
                                >
                                  Join
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                )}

                {/* Share Story Card */}
                <Card className="border-indigo-200 shadow-sm bg-gradient-to-r from-indigo-50 to-purple-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-indigo-700">Share Your Progress</CardTitle>
                    <CardDescription>
                      Get feedback from other writers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-3 mb-4">
                      <Button variant="outline" size="sm" className="flex-1 bg-white border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700">
                        <TwitterIcon className="h-4 w-4 mr-1.5 text-blue-400" />
                        Twitter
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-white border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700">
                        <FacebookIcon className="h-4 w-4 mr-1.5 text-blue-600" />
                        Facebook
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-white border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700">
                        <InstagramIcon className="h-4 w-4 mr-1.5 text-pink-500" />
                        Instagram
                      </Button>
                    </div>
                  
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="public-profile" />
                        <Label htmlFor="public-profile" className="text-sm">Make story public for feedback</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="notify-followers" />
                        <Label htmlFor="notify-followers" className="text-sm">Notify followers when published</Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="media" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="border-teal-200 shadow-lg">
                  <CardHeader className="pb-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
                    <CardTitle>Media Integration</CardTitle>
                    <CardDescription className="text-white/80">
                      Enhance your story with rich media content
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {videoUrl ? (
                      <div className="space-y-4">
                        <div className="aspect-video bg-black rounded-md overflow-hidden">
                          <video 
                            src={videoUrl} 
                            controls 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">Your Story Video</h3>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs border-teal-200 hover:bg-teal-50"
                              onClick={() => setShowVideoUploader(true)}
                            >
                              <RefreshCw className="h-3.5 w-3.5 mr-1.5 text-teal-500" />
                              Replace
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs border-teal-200 hover:bg-teal-50 text-red-500 hover:text-red-600"
                              onClick={() => setVideoUrl("")}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-teal-200 rounded-md">
                        <Video className="h-12 w-12 text-teal-300 mb-4" />
                        <h3 className="text-lg font-medium text-teal-700 mb-2">Add Video to Your Story</h3>
                        <p className="text-center text-muted-foreground mb-6 max-w-md">
                          Enhance your narrative with video content. Upload a video trailer, reading, or companion clip for your story.
                        </p>
                        <Button 
                          onClick={() => setShowVideoUploader(true)}
                          className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600"
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Upload Video
                        </Button>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div className="flex flex-col items-center justify-center py-8 px-4 border-2 border-dashed border-teal-200 rounded-md bg-teal-50/50">
                        <ImagePlus className="h-8 w-8 text-teal-400 mb-3" />
                        <h3 className="text-base font-medium text-teal-700 mb-2">Add Images</h3>
                        <p className="text-center text-sm text-muted-foreground mb-4">
                          Include character portraits, setting images, or inspirational visuals
                        </p>
                        <Button 
                          variant="outline"
                          className="text-xs border-teal-200 hover:bg-teal-100 text-teal-700"
                        >
                          Upload Images
                        </Button>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center py-8 px-4 border-2 border-dashed border-teal-200 rounded-md bg-teal-50/50">
                        <Music className="h-8 w-8 text-teal-400 mb-3" />
                        <h3 className="text-base font-medium text-teal-700 mb-2">Add Audio</h3>
                        <p className="text-center text-sm text-muted-foreground mb-4">
                          Include background music, sound effects, or audio narration
                        </p>
                        <Button 
                          variant="outline"
                          className="text-xs border-teal-200 hover:bg-teal-100 text-teal-700"
                        >
                          Upload Audio
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="border-teal-200 shadow-sm mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-teal-700">Media Guidelines</CardTitle>
                    <CardDescription>Best practices for engaging content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-teal-500 shrink-0 mt-0.5" />
                        <span className="text-sm">Keep videos under 2 minutes for better engagement</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-teal-500 shrink-0 mt-0.5" />
                        <span className="text-sm">Use high-quality images (at least 1200x800px)</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-teal-500 shrink-0 mt-0.5" />
                        <span className="text-sm">Ensure you have rights to all media you upload</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-teal-500 shrink-0 mt-0.5" />
                        <span className="text-sm">Audio clips should be clear and properly equalized</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-teal-500 shrink-0 mt-0.5" />
                        <span className="text-sm">Consider using media that enhances mood and setting</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-teal-200 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-teal-700">Media Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-muted-foreground">Storage Used</span>
                          <span className="text-sm font-medium">23 MB / 1 GB</span>
                        </div>
                        <div className="h-2 bg-teal-100 rounded-full">
                          <div className="h-full w-[2.3%] bg-teal-500 rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="pt-2 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground flex items-center">
                            <Video className="h-4 w-4 mr-1.5 text-teal-500" />
                            Videos
                          </span>
                          <span className="font-medium">{videoUrl ? "1" : "0"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground flex items-center">
                            <ImagePlus className="h-4 w-4 mr-1.5 text-teal-500" />
                            Images
                          </span>
                          <span className="font-medium">0</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground flex items-center">
                            <Music className="h-4 w-4 mr-1.5 text-teal-500" />
                            Audio Files
                          </span>
                          <span className="font-medium">0</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="publish" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="border-violet-200 shadow-lg">
                  <CardHeader className="pb-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white">
                    <CardTitle>Publish Your Story</CardTitle>
                    <CardDescription className="text-white/80">
                      Share your work with readers around the world
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid gap-6">
                      <div className="space-y-2">
                        <h3 className="font-medium text-lg text-violet-800">Story Preview</h3>
                        <Card className="border-violet-100 overflow-hidden">
                          <div className="bg-violet-50 p-4 border-b border-violet-100">
                            <h4 className="text-lg font-bold text-violet-800">{title || "Untitled Story"}</h4>
                            <div className="flex items-center mt-1">
                              <Badge variant="outline" className="mr-2 border-violet-200 text-violet-600">
                                {genre}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {wordCount} words • {Math.ceil(wordCount / 250)} min read
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="prose max-w-none text-muted-foreground">
                              {story ? (
                                <p className="line-clamp-3">{story}</p>
                              ) : (
                                <p className="italic text-muted-foreground">No content yet. Start writing your story!</p>
                              )}
                            </div>
                          </div>
                          {videoUrl && (
                            <div className="px-4 pb-4">
                              <div className="aspect-video bg-black rounded-md overflow-hidden">
                                <video 
                                  src={videoUrl} 
                                  controls 
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            </div>
                          )}
                        </Card>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-medium text-lg text-violet-800">Publishing Options</h3>
                        <Card className="border-violet-100">
                          <CardContent className="pt-6">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Switch id="public-story" />
                                  <Label htmlFor="public-story">Make story public</Label>
                                </div>
                                <Badge variant="outline" className="bg-violet-50 border-violet-200 text-violet-600">
                                  Recommended
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch id="comments" defaultChecked />
                                <Label htmlFor="comments">Allow comments</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch id="discoverable" defaultChecked />
                                <Label htmlFor="discoverable">Discoverable in search</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch id="mature-content" />
                                <Label htmlFor="mature-content">Mature content (18+)</Label>
                              </div>
                              
                              <Separator className="my-2" />
                              
                              <div className="space-y-2">
                                <Label htmlFor="tags" className="text-sm">Tags (up to 5)</Label>
                                <Input 
                                  id="tags" 
                                  placeholder="Add tags separated by commas" 
                                  className="border-violet-200"
                                />
                                <p className="text-xs text-muted-foreground">
                                  Popular tags: fantasy, romance, sci-fi, thriller, mystery
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="flex gap-4 pt-2">
                        {isPublished ? (
                          <>
                            <Button 
                              className="bg-green-600 hover:bg-green-700 text-white"
                              disabled
                            >
                              <Check className="mr-2 h-4 w-4" />
                              Published
                            </Button>
                            <Button 
                              variant="outline" 
                              className="border-violet-200 hover:bg-violet-50"
                              onClick={handleStartNewStory}
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Start New Story
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button 
                              className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                              onClick={handlePublish}
                              disabled={!title.trim() || !story.trim()}
                            >
                              <BookMarked className="mr-2 h-4 w-4" />
                              Publish Story
                            </Button>
                            <Button 
                              variant="outline" 
                              className="flex-1 border-violet-200 hover:bg-violet-50"
                              onClick={handleSaveDraft}
                            >
                              <Cloud className="mr-2 h-4 w-4" />
                              Save as Draft
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="border-violet-200 shadow-sm mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-violet-700">Publishing Checklist</CardTitle>
                    <CardDescription>Ensure your story is ready</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className={`h-5 w-5 rounded-full flex items-center justify-center mr-2 shrink-0 mt-0.5 ${title.trim() ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                          {title.trim() ? <Check className="h-3.5 w-3.5" /> : '1'}
                        </div>
                        <span className={`text-sm ${title.trim() ? 'text-green-600' : 'text-muted-foreground'}`}>Add a compelling title</span>
                      </li>
                      <li className="flex items-start">
                        <div className={`h-5 w-5 rounded-full flex items-center justify-center mr-2 shrink-0 mt-0.5 ${story.trim() ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                          {story.trim() ? <Check className="h-3.5 w-3.5" /> : '2'}
                        </div>
                        <span className={`text-sm ${story.trim() ? 'text-green-600' : 'text-muted-foreground'}`}>Write your story content</span>
                      </li>
                      <li className="flex items-start">
                        <div className={`h-5 w-5 rounded-full flex items-center justify-center mr-2 shrink-0 mt-0.5 ${videoUrl ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                          {videoUrl ? <Check className="h-3.5 w-3.5" /> : '3'}
                        </div>
                        <span className={`text-sm ${videoUrl ? 'text-green-600' : 'text-muted-foreground'}`}>Add media (optional)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-5 w-5 rounded-full flex items-center justify-center mr-2 bg-gray-100 text-gray-400 shrink-0 mt-0.5">
                          4
                        </div>
                        <span className="text-sm text-muted-foreground">Set publishing options</span>
                      </li>
                      <li className="flex items-start">
                        <div className={`h-5 w-5 rounded-full flex items-center justify-center mr-2 shrink-0 mt-0.5 ${isPublished ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                          {isPublished ? <Check className="h-3.5 w-3.5" /> : '5'}
                        </div>
                        <span className={`text-sm ${isPublished ? 'text-green-600' : 'text-muted-foreground'}`}>Publish your story</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-violet-200 shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg text-violet-700">Publishing Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Lightbulb className="h-5 w-5 mr-2 text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-sm">Use a captivating title that hints at your story's theme or main conflict.</p>
                      </div>
                      <div className="flex items-start">
                        <Lightbulb className="h-5 w-5 mr-2 text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-sm">Add relevant tags to help readers discover your story based on interests.</p>
                      </div>
                      <div className="flex items-start">
                        <Lightbulb className="h-5 w-5 mr-2 text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-sm">Consider including a brief introduction or hook at the beginning of your story.</p>
                      </div>
                      <div className="flex items-start">
                        <Lightbulb className="h-5 w-5 mr-2 text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-sm">Share your published story on social media to reach more readers.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
      
      {/* AI Dialog */}
      <Dialog open={showAiDialog} onOpenChange={setShowAiDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>AI Writing Assistant</DialogTitle>
            <DialogDescription>
              Get help with your story using our AI assistant
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue={activeAiTab} value={activeAiTab} onValueChange={setActiveAiTab}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="inspire">
                <Sparkles className="mr-2 h-4 w-4" />
                Inspire Me
              </TabsTrigger>
              <TabsTrigger value="improve">
                <Edit2 className="mr-2 h-4 w-4" />
                Improve Writing
              </TabsTrigger>
              <TabsTrigger value="continue">
                <ArrowRight className="mr-2 h-4 w-4" />
                Continue Story
              </TabsTrigger>
              <TabsTrigger value="custom">
                <Settings className="mr-2 h-4 w-4" />
                Custom
              </TabsTrigger>
            </TabsList>
            
            <div className="space-y-4 mb-4">
              <div>
                <Label htmlFor="aiPrompt" className="text-sm">
                  {activeAiTab === "inspire" ? "What kind of idea would you like?" :
                   activeAiTab === "improve" ? "What aspect of your writing would you like to improve?" :
                   activeAiTab === "continue" ? "How should the story continue?" :
                   "What would you like help with?"}
                </Label>
                <Textarea
                  id="aiPrompt"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder={
                    activeAiTab === "inspire" ? "A fantasy story about a librarian who can enter books..." :
                    activeAiTab === "improve" ? "Help me make my dialogue more natural and engaging..." :
                    activeAiTab === "continue" ? "Continue my story with an unexpected plot twist..." :
                    "Help me with..."
                  }
                  className="mt-1"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm mb-2 block">AI Model</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {aiModels.slice(0, 2).map((model) => (
                      <Button
                        key={model.id}
                        variant={aiModel === model.id ? "default" : "outline"}
                        className={`justify-start h-auto py-2 ${aiModel === model.id ? "bg-violet-600" : ""}`}
                        onClick={() => setAiModel(model.id)}
                      >
                        <Brain className="h-4 w-4 mr-2" />
                        <div className="text-left">
                          <div className="text-sm font-medium">{model.name}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {aiModels.slice(2).map((model) => (
                      <Button
                        key={model.id}
                        variant={aiModel === model.id ? "default" : "outline"}
                        className={`justify-start h-auto py-2 ${aiModel === model.id ? "bg-violet-600" : ""}`}
                        onClick={() => setAiModel(model.id)}
                      >
                        <Brain className="h-4 w-4 mr-2" />
                        <div className="text-left">
                          <div className="text-sm font-medium">{model.name}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm">Creativity Level</Label>
                    <span className="text-sm text-muted-foreground">
                      {creativityLevel[0] < 0.3 ? "Conservative" : 
                       creativityLevel[0] < 0.7 ? "Balanced" : "Experimental"}
                    </span>
                  </div>
                  <Slider
                    value={creativityLevel}
                    onValueChange={setCreativityLevel}
                    max={1}
                    step={0.1}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">Factual</span>
                    <span className="text-xs text-muted-foreground">Creative</span>
                  </div>
                  
                  <div className="mt-4">
                    <Label className="text-sm mb-2 block">Quick Prompts</Label>
                    <ScrollArea className="h-[100px]">
                      <div className="space-y-1">
                        {aiPrompts.map((prompt, i) => (
                          <Button 
                            key={i} 
                            variant="ghost" 
                            size="sm" 
                            className="w-full justify-start h-auto py-1.5 text-left"
                            onClick={() => handleUseAiPrompt(prompt)}
                          >
                            <Sparkles className="h-3.5 w-3.5 mr-2 text-violet-500" />
                            <span className="text-sm">{prompt.title}</span>
                          </Button>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 rounded-md mb-4">
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">AI Response</h3>
                {aiResponse && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 gap-1 text-muted-foreground hover:text-violet-600"
                    onClick={() => {
                      navigator.clipboard.writeText(aiResponse);
                      toast({
                        title: "Copied to clipboard",
                        duration: 2000,
                      });
                    }}
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span className="text-xs">Copy</span>
                  </Button>
                )}
              </div>
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <RefreshCw className="h-8 w-8 text-violet-500 animate-spin mb-4" />
                  <p className="text-muted-foreground">
                    Generating creative content...
                  </p>
                </div>
              ) : aiResponse ? (
                <ScrollArea className="h-[200px]">
                  <div className="whitespace-pre-line text-sm">
                    {aiResponse}
                  </div>
                </ScrollArea>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 px-4 border border-dashed border-slate-200 rounded-md text-center">
                  <Brain className="h-8 w-8 text-slate-300 mb-2" />
                  <p className="text-muted-foreground text-sm mb-1">
                    AI responses will appear here
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Enter a prompt and click "Generate" to get started
                  </p>
                </div>
              )}
            </div>
          </Tabs>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAiDialog(false)}
            >
              Cancel
            </Button>
            {aiResponse ? (
              <Button 
                onClick={handleUseAiContent}
                className="bg-violet-600 hover:bg-violet-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add to Story
              </Button>
            ) : (
              <Button 
                onClick={handleGenerateAiContent}
                disabled={isGenerating || !aiPrompt.trim()}
                className="bg-violet-600 hover:bg-violet-700"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Generate
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Video Uploader Dialog */}
      {showVideoUploader && (
        <Dialog open={showVideoUploader} onOpenChange={setShowVideoUploader}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Video</DialogTitle>
              <DialogDescription>
                Add a video to enhance your story
              </DialogDescription>
            </DialogHeader>
            <VideoUploader onVideoUploaded={handleVideoUploaded} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Write;
