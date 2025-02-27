
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

// Import missing components
import { Award, Check, Star, Globe2, Sparkles, Wand2, Brain, Lightbulb, Zap, MessageSquare, RefreshCw, Edit2, Settings, Copy, Cloud, BookOpen, PenTool, FileText, Plus } from "lucide-react";

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

  return (
    <div className="container py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold font-serif bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">Write Your Story</h1>
        <p className="text-muted-foreground">
          Unleash your creativity and share your stories with the world.
        </p>
      </motion.div>

      {/* Quick action buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <Button 
          onClick={() => setShowStyleOptions(!showStyleOptions)}
          variant="outline"
          className="rounded-full text-blue-600 border-blue-600 hover:bg-blue-50"
        >
          <Settings className="mr-2 h-4 w-4" />
          Writing Environment
        </Button>
        <Button 
          onClick={() => setShowAiDialog(true)}
          className="rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white"
        >
          <Brain className="mr-2 h-4 w-4" />
          AI Writing Assistant
        </Button>
        <Button 
          variant="outline"
          className="rounded-full"
          onClick={handleSaveDraft}
        >
          <Cloud className="mr-2 h-4 w-4" />
          Save Draft
        </Button>
      </div>

      {/* Style options */}
      {showStyleOptions && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mb-8 border-blue-200 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-600">Customize Your Writing Environment</CardTitle>
              <CardDescription>
                Personalize your writing space for optimal creativity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-blue-700 mb-2 block">Font Style</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {fontStyles.map((style) => (
                      <Button
                        key={style.id}
                        variant={fontStyle === style.id ? "default" : "outline"}
                        className={`justify-start ${fontStyle === style.id ? "bg-blue-600" : ""} ${style.class}`}
                        onClick={() => setFontStyle(style.id)}
                      >
                        {style.name}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-blue-700 mb-2 block">Background Color</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {backgroundColors.map((bg) => (
                      <Button
                        key={bg.id}
                        variant={backgroundColor === bg.id ? "default" : "outline"}
                        className={`justify-start ${backgroundColor === bg.id ? "bg-blue-600" : ""}`}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Writing Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className={getCardClasses()}>
            <CardHeader className="pb-2 border-b border-blue-100">
              <CardTitle className="text-blue-600">Story Details</CardTitle>
              <CardDescription>
                Enter your story details below to get started.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 pt-6">
              <div className="grid gap-2">
                <Label htmlFor="title" className="text-blue-700">Title</Label>
                <Input
                  type="text"
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Enter your story title"
                  className="border-blue-200 focus-visible:ring-blue-400"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="genre" className="text-blue-700">Genre</Label>
                <select
                  id="genre"
                  className="flex h-10 w-full rounded-md border border-blue-200 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
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
                  <Label htmlFor="story" className="text-blue-700">Story</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 gap-1 text-muted-foreground hover:text-blue-600">
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
                              <Sparkles className="h-3.5 w-3.5 mr-2 text-blue-500" />
                              <span className="text-sm">{prompt.title}</span>
                            </Button>
                          ))}
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-1 justify-center"
                            onClick={() => setShowAiDialog(true)}
                          >
                            <Brain className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
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
                  className={getTextareaClasses()}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground flex items-center">
                  <FileText className="h-4 w-4 mr-1.5 text-blue-500" />
                  Word Count: {wordCount}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSaveDraft}
                  className="border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                >
                  Save Draft
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t border-blue-100 pt-4">
              <Button 
                variant="outline" 
                onClick={handleStartNewStory}
                className="border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Start New Story
              </Button>
              <Button 
                onClick={handlePublish}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isPublished ? "Update Story" : "Publish Story"}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Writing Challenges */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-blue-200 shadow-lg">
            <CardHeader className="pb-2 border-b border-blue-100">
              <CardTitle className="text-blue-600">Writing Challenges</CardTitle>
              <CardDescription>
                Participate in writing challenges to inspire your creativity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[450px] pr-4">
                <div className="space-y-4 pt-4">
                  {challenges.map((challenge, index) => (
                    <Card key={index} className="overflow-hidden border-blue-100 hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-transparent">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg text-blue-700">{challenge.title}</CardTitle>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                            {challenge.participants} Writers
                          </Badge>
                        </div>
                        <CardDescription>{challenge.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="grid gap-2 text-sm pt-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground flex items-center">
                            <Award className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
                            Prize:
                          </span>
                          <span className="font-medium text-blue-600">{challenge.prize}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Deadline:</span>
                          <span>{challenge.deadline}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Word Limit:</span>
                          <span>{challenge.wordLimit} words</span>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                          onClick={() => handleJoinChallenge(challenge)}
                        >
                          <Star className="mr-2 h-4 w-4" fill="white" />
                          Join Challenge
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Selected Challenge Details */}
      {selectedChallenge && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-transparent">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-700 flex items-center">
                <Award className="h-5 w-5 mr-2 text-blue-500" />
                Selected Challenge
              </CardTitle>
              <CardDescription>
                Details for the "{selectedChallenge.title}" challenge.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 pt-4">
              <div className="grid gap-2">
                <Label className="text-blue-700">Description</Label>
                <p className="text-muted-foreground">
                  {selectedChallenge.description}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label className="text-blue-700">Deadline</Label>
                  <p className="text-muted-foreground">
                    {selectedChallenge.deadline}
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label className="text-blue-700">Word Limit</Label>
                  <p className="text-muted-foreground">
                    {selectedChallenge.wordLimit}
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label className="text-blue-700">Participants</Label>
                  <p className="text-muted-foreground">
                    {selectedChallenge.participants}
                  </p>
                </div>
              </div>
              <div className="grid gap-2">
                <Label className="text-blue-700">Prize</Label>
                <p className="text-blue-600 font-medium flex items-center">
                  <Star className="h-4 w-4 mr-1.5 text-yellow-500" fill="gold" />
                  {selectedChallenge.prize}
                </p>
              </div>
              <div className="flex justify-end pt-2">
                <Button 
                  variant="outline" 
                  className="mr-2 text-blue-600 border-blue-300"
                  onClick={() => setSelectedChallenge(null)}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Begin Writing Challenge
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* AI Writing Assistant Dialog */}
      <Dialog open={showAiDialog} onOpenChange={setShowAiDialog}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="text-blue-600 flex items-center">
              <Brain className="h-5 w-5 mr-2 text-blue-500" />
              AI Writing Assistant
            </DialogTitle>
            <DialogDescription>
              Get AI-powered help with your writing. Generate ideas, improve your prose, and overcome writer's block.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue={activeAiTab} onValueChange={setActiveAiTab} className="mt-2">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="inspire" className="flex items-center gap-1">
                <Lightbulb className="h-4 w-4" /> 
                <span>Ideas</span>
              </TabsTrigger>
              <TabsTrigger value="improve" className="flex items-center gap-1">
                <Edit2 className="h-4 w-4" />
                <span>Improve</span>
              </TabsTrigger>
              <TabsTrigger value="continue" className="flex items-center gap-1">
                <PenTool className="h-4 w-4" />
                <span>Continue</span>
              </TabsTrigger>
              <TabsTrigger value="help" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>General Help</span>
              </TabsTrigger>
            </TabsList>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-3 md:col-span-1">
                  <Label className="text-blue-700 mb-2 block">AI Model</Label>
                  <select
                    id="ai-model"
                    className="flex h-10 w-full rounded-md border border-blue-200 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
                    value={aiModel}
                    onChange={(e) => setAiModel(e.target.value)}
                  >
                    {aiModels.map(model => (
                      <option key={model.id} value={model.id}>{model.name}</option>
                    ))}
                  </select>
                  <p className="text-xs text-muted-foreground mt-1">
                    {aiModels.find(m => m.id === aiModel)?.description}
                  </p>

                  <div className="mt-4">
                    <div className="flex justify-between mb-1">
                      <Label className="text-blue-700">Creativity Level</Label>
                      <span className="text-xs text-muted-foreground">{Math.round(creativityLevel[0] * 100)}%</span>
                    </div>
                    <Slider
                      min={0}
                      max={1}
                      step={0.1}
                      value={creativityLevel}
                      onValueChange={setCreativityLevel}
                      className="py-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Focused</span>
                      <span>Balanced</span>
                      <span>Creative</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div>
                    <p className="text-sm font-medium text-blue-700 mb-1.5">Popular Prompts</p>
                    <ScrollArea className="h-[120px]">
                      <div className="space-y-1.5">
                        {aiPrompts.map((prompt, i) => (
                          <Button 
                            key={i} 
                            variant="ghost" 
                            size="sm" 
                            className="justify-start w-full h-auto py-1.5 text-left"
                            onClick={() => handleUseAiPrompt(prompt)}
                          >
                            <Sparkles className="h-3.5 w-3.5 mr-2 text-blue-500" />
                            <span className="text-sm truncate">{prompt.title}</span>
                          </Button>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
                
                <div className="col-span-3 md:col-span-2 space-y-4">
                  <div>
                    <Label className="text-blue-700 mb-2 block">
                      {activeAiTab === "inspire" && "What kind of ideas are you looking for?"}
                      {activeAiTab === "improve" && "What would you like to improve?"}
                      {activeAiTab === "continue" && "How should the AI continue your story?"}
                      {activeAiTab === "help" && "What do you need help with?"}
                    </Label>
                    <Textarea
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder={
                        activeAiTab === "inspire" 
                          ? "e.g., A fantasy story about a magical library with sentient books" 
                          : activeAiTab === "improve"
                          ? "e.g., Help me improve the dialogue in my story to sound more natural" 
                          : activeAiTab === "continue"
                          ? "e.g., Continue the story with a surprising twist" 
                          : "e.g., Help me overcome writer's block for my mystery novel"
                      }
                      className="min-h-[100px] border-blue-200"
                    />
                  </div>

                  {aiResponse && (
                    <div className="p-4 rounded-md border border-blue-200 bg-blue-50 space-y-3">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-blue-700 flex items-center">
                          <Brain className="h-4 w-4 mr-1.5 text-blue-600" />
                          AI Response
                        </h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 text-blue-600 hover:bg-blue-100"
                          onClick={() => {
                            navigator.clipboard.writeText(aiResponse);
                            toast({
                              title: "Copied",
                              description: "AI response copied to clipboard"
                            });
                          }}
                        >
                          <Copy className="h-3.5 w-3.5 mr-1.5" />
                          Copy
                        </Button>
                      </div>
                      <ScrollArea className="h-[200px]">
                        <div className="whitespace-pre-line text-sm">
                          {aiResponse}
                        </div>
                      </ScrollArea>
                    </div>
                  )}

                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      variant="outline"
                      className="border-blue-300"
                      onClick={() => setShowAiDialog(false)}
                    >
                      Cancel
                    </Button>
                    {aiResponse ? (
                      <Button
                        onClick={handleUseAiContent}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Use This Content
                      </Button>
                    ) : (
                      <Button
                        onClick={handleGenerateAiContent}
                        disabled={!aiPrompt.trim() || isGenerating}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Generate Content
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Write;
