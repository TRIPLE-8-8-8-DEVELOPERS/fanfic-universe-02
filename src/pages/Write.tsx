
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
import { Award, Check, Star, Globe2, Sparkles, Wand2, Brain, Lightbulb, Zap, MessageSquare, RefreshCw, Edit2, Settings, Copy, Cloud, BookOpen, PenTool, FileText, Plus, Video, Camera, BookMarked, Palette, Music, ImagePlus, Type, Smile, Heart, Medal } from "lucide-react";

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

                    {/* Video preview area */}
                    {videoUrl && (
                      <div className="mt-4 border rounded-lg overflow-hidden shadow-md">
                        <div className="bg-gray-800 text-white text-xs py-1 px-3 flex items-center">
                          <Video className="h-3 w-3 mr-1.5" />
                          Attached Video
                        </div>
                        <video
                          src={videoUrl}
                          controls
                          className="w-full h-auto max-h-[200px]"
                        />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-violet-100 pt-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleStartNewStory} 
                      className="border-violet-200 hover:bg-violet-50"
                    >
                      <Plus className="h-4 w-4 mr-1.5" />
                      New Story
                    </Button>
                    <Button 
                      onClick={handlePublish}
                      className="bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-700 hover:to-indigo-600 text-white shadow-md"
                    >
                      <BookMarked className="h-4 w-4 mr-1.5" />
                      Publish Story
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* Sidebar with Writing Resources */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="shadow-md mb-6 border-violet-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-medium">Writing Challenges</CardTitle>
                    <CardDescription>Join a challenge to boost your creativity</CardDescription>
                  </CardHeader>
                  <CardContent className="px-6 pb-4">
                    <ScrollArea className="h-60 rounded-md">
                      {challenges.map((challenge, index) => (
                        <div 
                          key={index} 
                          className="mb-4 pb-4 border-b last:border-0 border-violet-100"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-medium text-violet-800">{challenge.title}</h4>
                            <Badge variant="outline" className="bg-violet-50 text-violet-700 border-violet-200">
                              {challenge.participants} participants
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{challenge.description}</p>
                          <div className="flex justify-between text-xs text-muted-foreground mb-2.5">
                            <span>Deadline: {challenge.deadline}</span>
                            <span>Word Limit: {challenge.wordLimit}</span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full border-violet-200 hover:bg-violet-50 hover:text-violet-700"
                            onClick={() => handleJoinChallenge(challenge)}
                          >
                            <Award className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
                            Join Challenge
                          </Button>
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-indigo-200">
                  <CardHeader className="pb-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-t-lg">
                    <CardTitle className="text-lg font-medium">Media Resources</CardTitle>
                    <CardDescription className="text-indigo-100">
                      Enhance your story with rich media
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-5">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                      onClick={() => setShowVideoUploader(true)}
                    >
                      <Video className="h-4 w-4 mr-2 text-indigo-500" />
                      Attach a Video
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                      <Music className="h-4 w-4 mr-2 text-blue-500" />
                      Add Background Music
                    </Button>
                    <Button variant="outline" className="w-full justify-start border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700">
                      <ImagePlus className="h-4 w-4 mr-2 text-emerald-500" />
                      Insert Images
                    </Button>
                    <Separator className="my-4" />
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Writing Statistics</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Word Goal:</span>
                          <span className="font-medium">5,000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Current:</span>
                          <span className="font-medium">{wordCount}</span>
                        </div>
                        <div className="h-2 rounded-full bg-gray-100 mt-1">
                          <div 
                            className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" 
                            style={{ width: `${Math.min(100, (wordCount / 5000) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="media" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-lg border-purple-200">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                  <CardTitle>Video Upload</CardTitle>
                  <CardDescription className="text-purple-100">
                    Add a video to enhance your story
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="bg-purple-50 border border-dashed border-purple-200 rounded-lg p-10 text-center">
                    {videoUrl ? (
                      <div className="space-y-4">
                        <video 
                          src={videoUrl} 
                          controls 
                          className="w-full h-auto rounded shadow-md mx-auto"
                        />
                        <Button 
                          variant="outline" 
                          className="border-purple-200 hover:bg-purple-50"
                          onClick={() => setVideoUrl("")}
                        >
                          Remove Video
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-purple-400 flex flex-col items-center">
                          <Video className="h-12 w-12 mb-2" />
                          <h3 className="text-lg font-medium text-purple-700">Upload Video</h3>
                          <p className="text-sm text-purple-600 max-w-sm">
                            Share a video to accompany your story. Great for character introductions, 
                            setting demonstrations, or author commentary.
                          </p>
                        </div>
                        <Button
                          onClick={() => setShowVideoUploader(true)}
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                        >
                          <Camera className="h-4 w-4 mr-2" /> 
                          Upload Video
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="shadow-md border-blue-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-medium">Audio Elements</CardTitle>
                    <CardDescription>Add atmospheric audio to your story</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="h-24 flex-col border-blue-100 hover:bg-blue-50 hover:border-blue-300">
                        <Music className="h-8 w-8 mb-2 text-blue-500" />
                        Background Music
                      </Button>
                      <Button variant="outline" className="h-24 flex-col border-blue-100 hover:bg-blue-50 hover:border-blue-300">
                        <Zap className="h-8 w-8 mb-2 text-blue-500" />
                        Sound Effects
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-emerald-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-medium">Visual Elements</CardTitle>
                    <CardDescription>Enhance your story with images</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="h-24 flex-col border-emerald-100 hover:bg-emerald-50 hover:border-emerald-300">
                        <ImagePlus className="h-8 w-8 mb-2 text-emerald-500" />
                        Story Imagery
                      </Button>
                      <Button variant="outline" className="h-24 flex-col border-emerald-100 hover:bg-emerald-50 hover:border-emerald-300">
                        <Palette className="h-8 w-8 mb-2 text-emerald-500" />
                        Cover Design
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-8">
              <Card className="shadow-md border-amber-200">
                <CardHeader>
                  <CardTitle>Live Streaming</CardTitle>
                  <CardDescription>Share your writing process with your audience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-amber-50 border border-dashed border-amber-200 rounded-lg p-6 text-center">
                    <div className="text-amber-700 flex flex-col items-center">
                      <Globe2 className="h-12 w-12 mb-3 text-amber-500" />
                      <h3 className="text-lg font-medium">Start a Writing Stream</h3>
                      <p className="text-sm max-w-md mx-auto mt-2 text-amber-600">
                        Share your creative process in real-time. Let your audience watch you craft your story,
                        get instant feedback, and build your community.
                      </p>
                      <Button className="mt-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                        <Globe2 className="h-4 w-4 mr-2" />
                        Start Streaming
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="publish" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-lg border-indigo-200">
                <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
                  <CardTitle>Publish Your Story</CardTitle>
                  <CardDescription className="text-indigo-100">
                    Share your work with the world
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-2">
                      <Label htmlFor="tags" className="text-indigo-700">Tags</Label>
                      <Input 
                        id="tags" 
                        placeholder="fantasy, adventure, magic (comma separated)" 
                        className="border-indigo-200"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <Label htmlFor="summary" className="text-indigo-700">Story Summary</Label>
                      <Textarea 
                        id="summary" 
                        placeholder="Write a brief summary to attract readers..." 
                        className="h-24 border-indigo-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-indigo-700">Publishing Options</Label>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm border-indigo-100">
                          <div className="space-y-0.5">
                            <Label htmlFor="public" className="text-base">Public</Label>
                            <p className="text-xs text-muted-foreground">
                              Visible to everyone on the platform
                            </p>
                          </div>
                          <Switch id="public" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm border-indigo-100">
                          <div className="space-y-0.5">
                            <Label htmlFor="comments" className="text-base">Allow Comments</Label>
                            <p className="text-xs text-muted-foreground">
                              Let readers leave feedback on your story
                            </p>
                          </div>
                          <Switch id="comments" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 border-indigo-100">
                  <div className="w-full space-y-4">
                    <Button
                      className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white hover:from-indigo-700 hover:to-blue-600"
                      onClick={handlePublish}
                    >
                      <BookMarked className="h-4 w-4 mr-2" />
                      Publish Now
                    </Button>
                    <Button variant="outline" className="w-full border-indigo-200 hover:bg-indigo-50">
                      <Clock className="h-4 w-4 mr-2" />
                      Schedule for Later
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              <div className="space-y-6">
                <Card className="shadow-md border-pink-200">
                  <CardHeader className="pb-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-t-lg">
                    <CardTitle className="text-lg font-medium">Sharing Options</CardTitle>
                    <CardDescription className="text-pink-100">
                      Expand your story's reach
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-5 space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      <Button className="flex-col h-20 gap-1 bg-blue-500 hover:bg-blue-600">
                        <Twitter className="h-5 w-5" />
                        <span className="text-xs">Twitter</span>
                      </Button>
                      <Button className="flex-col h-20 gap-1 bg-blue-600 hover:bg-blue-700">
                        <Facebook className="h-5 w-5" />
                        <span className="text-xs">Facebook</span>
                      </Button>
                      <Button className="flex-col h-20 gap-1 bg-pink-600 hover:bg-pink-700">
                        <Instagram className="h-5 w-5" />
                        <span className="text-xs">Instagram</span>
                      </Button>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Direct Link</Label>
                      <div className="flex space-x-2">
                        <Input 
                          value="https://storyteller.io/s/your-unique-story-link" 
                          readOnly 
                          className="bg-gray-50 text-sm"
                        />
                        <Button variant="outline" size="icon" className="shrink-0">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-cyan-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-medium">Community Features</CardTitle>
                    <CardDescription>Connect your story with communities</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="justify-start border-cyan-100 hover:bg-cyan-50">
                        <Users className="h-4 w-4 mr-2 text-cyan-500" />
                        Writing Circles
                      </Button>
                      <Button variant="outline" className="justify-start border-cyan-100 hover:bg-cyan-50">
                        <BookOpen className="h-4 w-4 mr-2 text-cyan-500" />
                        Reading Lists
                      </Button>
                      <Button variant="outline" className="justify-start border-cyan-100 hover:bg-cyan-50">
                        <Medal className="h-4 w-4 mr-2 text-cyan-500" />
                        Contests
                      </Button>
                      <Button variant="outline" className="justify-start border-cyan-100 hover:bg-cyan-50">
                        <Star className="h-4 w-4 mr-2 text-cyan-500" />
                        Featured Stories
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
      
      {/* AI Writing Assistant Dialog */}
      <Dialog open={showAiDialog} onOpenChange={setShowAiDialog}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl">
              <Brain className="mr-2 h-5 w-5 text-violet-500" />
              AI Writing Assistant
            </DialogTitle>
            <DialogDescription>
              Get help with your writing using our AI-powered assistant.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={activeAiTab} onValueChange={setActiveAiTab} className="mt-2">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="inspire">
                <Lightbulb className="mr-2 h-4 w-4" />
                Inspire
              </TabsTrigger>
              <TabsTrigger value="improve">
                <RefreshCw className="mr-2 h-4 w-4" />
                Improve
              </TabsTrigger>
              <TabsTrigger value="continue">
                <Edit2 className="mr-2 h-4 w-4" />
                Continue
              </TabsTrigger>
              <TabsTrigger value="custom">
                <Settings className="mr-2 h-4 w-4" />
                Custom
              </TabsTrigger>
            </TabsList>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="ai-model" className="text-sm font-medium">
                    AI Model
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    Select the best AI model for your needs
                  </span>
                </div>
                <select
                  id="ai-model"
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                  value={aiModel}
                  onChange={(e) => setAiModel(e.target.value)}
                >
                  {aiModels.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name} - {model.description}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="creativity" className="text-sm font-medium">
                    Creativity Level: {Math.round(creativityLevel[0] * 100)}%
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    Higher values = more creative but less predictable
                  </span>
                </div>
                <Slider
                  id="creativity"
                  value={creativityLevel}
                  min={0.1}
                  max={1}
                  step={0.1}
                  onValueChange={setCreativityLevel}
                  className="py-2"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ai-prompt" className="text-sm font-medium">
                  {activeAiTab === "inspire" ? "What kind of story idea do you need?" :
                   activeAiTab === "improve" ? "What aspect of your writing would you like to improve?" :
                   activeAiTab === "continue" ? "How would you like the story to continue?" :
                   "What would you like help with?"}
                </Label>
                <Textarea
                  id="ai-prompt"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder={activeAiTab === "inspire" ? "E.g., A fantasy story about a librarian who can see people's memories when they touch books" :
                               activeAiTab === "improve" ? "E.g., I need help making my dialogue sound more natural" :
                               activeAiTab === "continue" ? "E.g., Continue from where I left off, but add a twist" :
                               "E.g., Help me create a detailed description of a futuristic city"}
                  className="h-20"
                />
              </div>
              
              {aiPrompt && !isGenerating && !aiResponse && (
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleGenerateAiContent}
                    className="bg-violet-600 hover:bg-violet-700 text-white shadow-sm"
                  >
                    <Brain className="mr-2 h-4 w-4" />
                    Generate Content
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setAiPrompt("")}
                    className="border-violet-200 hover:bg-violet-50"
                  >
                    Clear Prompt
                  </Button>
                </div>
              )}
              
              {isGenerating && (
                <div className="flex flex-col items-center justify-center py-6 space-y-4">
                  <div className="animate-pulse flex flex-col items-center">
                    <Brain className="h-12 w-12 text-violet-400 mb-4" />
                    <p className="text-center text-muted-foreground">AI is generating content for you...</p>
                  </div>
                </div>
              )}
              
              {aiResponse && !isGenerating && (
                <div className="space-y-4">
                  <div className="border rounded-md bg-muted/20 p-4">
                    <ScrollArea className="h-[200px] w-full rounded-md">
                      <div className="whitespace-pre-wrap text-sm p-2">
                        {aiResponse}
                      </div>
                    </ScrollArea>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      onClick={handleUseAiContent}
                      className="bg-violet-600 hover:bg-violet-700 text-white shadow-sm"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Use This Content
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setAiResponse("");
                        setAiPrompt("");
                      }}
                      className="border-violet-200 hover:bg-violet-50"
                    >
                      Start Over
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={handleGenerateAiContent}
                      className="border-violet-200 hover:bg-violet-50 ml-auto"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Regenerate
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>
      
      {/* Video uploader dialog */}
      {showVideoUploader && (
        <Dialog open={showVideoUploader} onOpenChange={setShowVideoUploader}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Video</DialogTitle>
              <DialogDescription>
                Add a video to enhance your story.
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
