
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import {
  PenTool,
  BookOpen,
  FileText,
  Settings,
  CloudUpload,
  BarChart,
  Eye,
  ArrowRight,
  Plus,
  HelpCircle,
  Zap,
  Sparkles,
  MoreHorizontal,
  Save,
  Calendar,
  ImageIcon,
  Tag,
  Book,
  Clock,
  CheckCircle,
  ChevronRight,
  PlusCircle,
  X,
  Type,
  Wand2,
  Lightbulb,
  Briefcase,
  BrainCircuit,
  MessageSquare,
  RefreshCw,
  CircleAlert,
  Edit2,
  ThumbsUp,
  Copy,
  SortDesc,
  UserPlus,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";

// Mock drafts data
const drafts = [
  {
    id: "draft1",
    title: "The Crimson Crown",
    lastEdited: "2 hours ago",
    wordCount: 5362,
    chapters: 3,
    status: "In Progress",
    coverUrl: "https://images.unsplash.com/photo-1629392554711-1b60d72ff7e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1856&q=80",
  },
  {
    id: "draft2",
    title: "Stardust Memories",
    lastEdited: "Yesterday",
    wordCount: 12841,
    chapters: 7,
    status: "In Progress",
    coverUrl: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1778&q=80",
  },
  {
    id: "draft3",
    title: "Whispers of the Deep",
    lastEdited: "May 15, 2023",
    wordCount: 3124,
    chapters: 2,
    status: "Draft",
    coverUrl: "https://images.unsplash.com/photo-1551244072-5d12893278ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
  },
];

// Mock published stories data
const published = [
  {
    id: "pub1",
    title: "The Last Starfighter",
    lastEdited: "June 12, 2023",
    wordCount: 24590,
    chapters: 12,
    status: "Complete",
    reads: 5243,
    likes: 623,
    comments: 89,
    coverUrl: "https://images.unsplash.com/photo-1581822261290-991b38693d1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: "pub2",
    title: "Chronicles of the Fae Court",
    lastEdited: "February 3, 2023",
    wordCount: 19752,
    chapters: 9,
    status: "In Progress",
    reads: 3789,
    likes: 421,
    comments: 65,
    coverUrl: "https://images.unsplash.com/photo-1520034475321-cbe63696469a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  },
];

// Mock data for writing prompts
const writingPrompts = [
  "A character discovers an ancient artifact that grants a mysterious power, but at a terrible cost.",
  "Two rival families are forced to work together when their children fall in love.",
  "A forgotten prophecy begins to unfold in a small town where strange occurrences have become commonplace.",
  "A professional thief is hired to steal back an item they regret selling years ago.",
  "Someone wakes up with the ability to hear other people's thoughts, but only when they're thinking about secrets.",
  "A journey through an enchanted forest leads to an unexpected discovery.",
  "After moving into a new house, someone begins receiving letters addressed to the previous owner.",
  "A character struggles with the moral implications of their newfound abilities.",
  "A forbidden romance blossoms between members of warring magical academies.",
  "Someone discovers their favorite fictional character has somehow entered the real world."
];

// Mock data for AI Assistant suggestions
const aiSuggestions = {
  characterNames: [
    "Elara Nightshade", "Thorne Blackwood", "Cassiopeia Drake", "Orion Frost", 
    "Lyra Starling", "Jasper Thornfield", "Seraphina Vale", "Gideon Cross"
  ],
  settings: [
    "A floating city among the clouds", "An underwater metropolis", 
    "A hidden village within an ancient forest", "A space station at the edge of the galaxy", 
    "A magical academy in a repurposed castle", "A cyberpunk megacity"
  ],
  plotTwists: [
    "The mentor figure was the villain all along",
    "The magical artifact is actually sentient and has its own agenda",
    "The protagonist discovers they are related to their enemy",
    "What seemed like magic is revealed to be advanced technology",
    "The entire adventure has been a simulation or test"
  ]
};

// Writer stats data
const writerStats = {
  storiesPublished: 5,
  totalWordCount: 126843,
  totalReads: 14682,
  totalLikes: 2187,
  totalComments: 453,
  averageRating: 4.7,
  mostActiveDay: "Saturday",
  writingStreak: 12,
  dailyAverage: 843,
  monthlyTrend: [420, 560, 780, 650, 900, 1200, 840, 960, 1100, 1300, 1100, 1400, 1200, 1500]
};

// Writing community challenges
const writingChallenges = [
  {
    title: "Summer Fantasy Fest",
    description: "Write a fantasy short story incorporating summer themes and magical elements.",
    deadline: "August 15, 2023",
    wordLimit: "3,000-5,000 words",
    prize: "Featured on homepage and exclusive badge",
    participants: 342
  },
  {
    title: "Five Sentence Fiction",
    description: "Craft a complete story in exactly five sentences. Theme: Transformation.",
    deadline: "July 25, 2023",
    wordLimit: "Five sentences only",
    prize: "Special profile flair and anthology inclusion",
    participants: 528
  },
  {
    title: "Character Deep Dive",
    description: "Create a character profile and sample scene that showcases complex character development.",
    deadline: "August 30, 2023",
    wordLimit: "2,000-4,000 words",
    prize: "Professional feedback from published authors",
    participants: 215
  }
];

// AI writing models
const aiWritingModels = [
  { id: "creative", name: "Creative Muse", description: "Best for fiction, creative writing, and generating imaginative content." },
  { id: "academic", name: "Academic Scholar", description: "Ideal for essays, research papers, and formal writing." },
  { id: "concise", name: "Clarity Concise", description: "Optimized for clear, straightforward, and brief content." },
  { id: "descriptive", name: "Vivid Descriptor", description: "Specializes in rich, detailed descriptions of scenes, characters, and settings." }
];

const Write = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [showNewStoryDialog, setShowNewStoryDialog] = useState(false);
  const [showAiAssistantDialog, setShowAiAssistantDialog] = useState(false);
  const [activeAiTab, setActiveAiTab] = useState("inspire");
  const [aiModelSelection, setAiModelSelection] = useState("creative");
  const [aiQueryInput, setAiQueryInput] = useState("");
  const [isGeneratingAiResponse, setIsGeneratingAiResponse] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [creativityLevel, setCreativityLevel] = useState([0.7]);
  const [wordCountTarget, setWordCountTarget] = useState(1000);
  const [isAiResponseLiked, setIsAiResponseLiked] = useState(false);
  const [showChallengeDialog, setShowChallengeDialog] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [isCoWritingEnabled, setIsCoWritingEnabled] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      title: "",
      summary: "",
      fandom: "",
      genre: "",
      tags: "",
      contentWarnings: "",
      ageRating: "",
      coverImage: "",
    },
  });

  const handleCreateStory = (data) => {
    console.log("Creating new story:", data);
    toast({
      title: "Story Created!",
      description: `"${data.title}" has been created. You can now start writing.`,
    });
    setShowNewStoryDialog(false);
    // In a real application, we would navigate to the story editor here
  };

  const handleGenerateAiResponse = () => {
    setIsGeneratingAiResponse(true);
    
    // Simulate AI response generation
    setTimeout(() => {
      let response = "";
      
      if (activeAiTab === "inspire") {
        response = `Here's an interesting plot development for your consideration:
        
As ${selectedPrompt ? selectedPrompt : "your story"} progresses, consider introducing a character who appears to be an ally but gradually reveals subtle clues that they have hidden motives. Their betrayal could come at a critical moment, forcing the protagonist to reassess everything they believed to be true.

This character could have a compelling backstory that explains their duplicity - perhaps they were wronged in the past by someone connected to the protagonist, or they're under external pressure from a more powerful entity.

If you'd like to explore this direction, I can help you craft the subtle foreshadowing elements that will make the eventual reveal feel both surprising and inevitable to your readers.`;
      } else if (activeAiTab === "develop") {
        response = `Based on your setting description, here are some worldbuilding elements that could enrich your story:

1. **Social Structure**: Consider a society divided into three tiers based on their relationship with magic. The elite who can harness powerful magic, the middle class who possess minor magical abilities, and those without any magical affinity who form the working class.

2. **Environmental Features**: The floating islands could have unique ecosystems that influence the culture - perhaps rare magical plants grow only on certain islands, creating trade routes and political tensions.

3. **Historical Conflict**: A past cataclysm that caused the world to shatter into floating islands could provide rich backstory and ruins to explore.

4. **Technology & Magic Integration**: How do people travel between islands? Perhaps magical airships or teleportation circles that only certain individuals can activate.

5. **Seasonal Changes**: Consider how seasons might affect a world of floating islands - perhaps some islands migrate with the seasons, creating a constantly changing map.`;
      } else if (activeAiTab === "refine") {
        response = `I've analyzed your dialogue passage, and here's a revised version with more distinct character voices:

"I don't understand why we're even discussing this." Helena paced the length of the room, her fingers drumming against her thigh. "The Council made their decision. It's final."

Tomas leaned back in his chair, a half-smile playing on his lips. "Final? In my experience, nothing's ever truly final. Rules bend for the right person."

"That's exactly the kind of thinking that—" Helena stopped herself, exhaling slowly. "Look, I've worked too hard to jeopardize everything on one of your hunches."

"Not a hunch." Tomas stood, unfurling an ancient map across the table. "Evidence. The kind that would make even your precious Council reconsider."

Helena's eyes narrowed as she studied the markings. "Where did you get this?"

"Let's just say," Tomas replied, his voice dropping to a whisper, "I have friends in low places who see everything."

This revision gives Helena a more formal, rule-following voice with clipped sentences, while Tomas speaks more casually with a hint of mischief, highlighting their different personalities and approaches.`;
      } else if (activeAiTab === "overcome") {
        response = `It sounds like you're experiencing a common challenge with transitioning between key scenes. Here are some approaches to help bridge that gap:

1. **Time Skip with Context**: "Three days later, the dust from the battle had finally settled. As Mira surveyed the damaged eastern wall..."

2. **Thematic Transition**: End the battle scene focusing on an emotion or image, then begin the next scene with a parallel or contrasting emotion/image that shows the passage of time.

3. **Interlude Perspective**: Insert a brief section from another character's viewpoint that covers the intermediate period.

4. **Environmental Shift**: Use changing weather or environment to signal time passing - from battlefield smoke to clear skies of recovery.

5. **Practical Activity**: Show characters engaged in post-battle activities (treating wounds, repairing structures, debriefing) to naturally move time forward.

The key is to give readers just enough information about what happened during the gap without getting bogged down in unnecessary details.`;
      }
      
      setAiResponse(response);
      setIsGeneratingAiResponse(false);
    }, 1500);
  };

  const handleCopyAiResponse = () => {
    navigator.clipboard.writeText(aiResponse);
    toast({
      title: "Copied to clipboard",
      description: "The AI suggestion has been copied to your clipboard."
    });
  };

  const handleJoinChallenge = () => {
    toast({
      title: "Challenge Joined!",
      description: `You've successfully joined the "${selectedChallenge?.title}" writing challenge.`,
    });
    setShowChallengeDialog(false);
  };

  const handleInviteCoWriter = (email) => {
    toast({
      title: "Invitation Sent",
      description: `We've sent a co-writing invitation to ${email}.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        <div className="container py-8">
          {/* Dashboard Header */}
          <div className="mb-10">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
              <h1 className="text-3xl md:text-4xl font-bold font-serif">
                Writer's Dashboard
              </h1>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  className="rounded-full"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Preferences
                </Button>
                <Button 
                  variant="outline" 
                  className="rounded-full text-green-600 border-green-600 hover:bg-green-100 hover:text-green-700"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Auto-Save Enabled
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Manage your stories, track your progress, and engage with your audience. Your creative journey starts here.
            </p>
            
            {/* Writing streak banner */}
            <div className="mt-6 p-4 bg-primary/10 rounded-xl flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary rounded-full p-2">
                  <Calendar className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium">Current writing streak: <span className="text-primary font-bold">{writerStats.writingStreak} days</span></p>
                  <p className="text-sm text-muted-foreground">Keep it up! You're building great writing habits.</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="rounded-full text-sm h-9 bg-background">
                  <Clock className="mr-1 h-4 w-4" />
                  Set Reminder
                </Button>
                <Button className="rounded-full text-sm h-9">
                  <PenTool className="mr-1 h-4 w-4" />
                  Write Now
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-5">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="bg-primary text-primary-foreground h-full">
                  <CardHeader className="pb-2">
                    <PenTool className="h-8 w-8 mb-2" />
                    <CardTitle>Start a New Story</CardTitle>
                    <CardDescription className="text-primary-foreground/80">
                      Begin your creative journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-primary-foreground/70">
                      Create a new story from scratch or use a template to get started quickly.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="secondary" 
                      className="w-full rounded-full"
                      onClick={() => setShowNewStoryDialog(true)}
                    >
                      Create New Story <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <Zap className="h-8 w-8 mb-2 text-yellow-500" />
                    <CardTitle>AI Writing Assistant</CardTitle>
                    <CardDescription>
                      Boost your creativity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Get help with plot ideas, character development, and overcoming writer's block.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full rounded-full"
                      onClick={() => setShowAiAssistantDialog(true)}
                    >
                      Launch Assistant <Sparkles className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <HelpCircle className="h-8 w-8 mb-2 text-blue-500" />
                    <CardTitle>Writing Resources</CardTitle>
                    <CardDescription>
                      Improve your craft
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Access tutorials, guides, and community tips to enhance your writing skills.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full rounded-full"
                      onClick={() => {
                        toast({
                          title: "Resources Library",
                          description: "Redirecting you to our writing resources library..."
                        });
                      }}
                    >
                      Explore Resources <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Writing Inspiration Section */}
          <div className="mb-10">
            <div className="flex flex-wrap justify-between items-center mb-5">
              <h2 className="text-xl font-bold">Writing Inspiration</h2>
              <Button variant="ghost" size="sm" className="text-sm" onClick={() => setSelectedPrompt("")}>
                <RefreshCw className="h-3.5 w-3.5 mr-1" /> Refresh Prompts
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-3">Today's Writing Prompts</h3>
                <ScrollArea className="h-[180px] w-full rounded-md border p-4">
                  <div className="space-y-3">
                    {writingPrompts.map((prompt, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedPrompt === prompt
                            ? "bg-primary/10 border border-primary/50"
                            : "bg-secondary hover:bg-secondary/80"
                        }`}
                        onClick={() => setSelectedPrompt(prompt)}
                      >
                        <p className="text-sm">{prompt}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="mt-3 flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs h-8" 
                    onClick={() => {
                      toast({
                        title: "Prompt Saved",
                        description: "This prompt has been saved to your collection."
                      });
                    }}
                    disabled={!selectedPrompt}
                  >
                    Save Prompt
                  </Button>
                  <Button 
                    size="sm" 
                    className="text-xs h-8" 
                    onClick={() => {
                      if (selectedPrompt) {
                        setAiQueryInput(selectedPrompt);
                        setShowAiAssistantDialog(true);
                        setActiveAiTab("inspire");
                      } else {
                        toast({
                          title: "No Prompt Selected",
                          description: "Please select a prompt first.",
                          variant: "destructive"
                        });
                      }
                    }}
                    disabled={!selectedPrompt}
                  >
                    Develop With AI <Sparkles className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Writing Challenges</h3>
                <ScrollArea className="h-[180px] w-full rounded-md border p-4">
                  <div className="space-y-3">
                    {writingChallenges.map((challenge, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg border transition-colors hover:border-primary cursor-pointer"
                        onClick={() => {
                          setSelectedChallenge(challenge);
                          setShowChallengeDialog(true);
                        }}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-sm">{challenge.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {challenge.participants} participants
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{challenge.description}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>Deadline: {challenge.deadline}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="mt-3 flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs h-8"
                    onClick={() => {
                      toast({
                        title: "All Challenges",
                        description: "Viewing all active writing challenges..."
                      });
                    }}
                  >
                    View All Challenges <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Your Stories Tabs */}
          <div>
            <h2 className="text-xl font-bold mb-5">Your Stories</h2>
            <Tabs defaultValue="drafts">
              <TabsList className="rounded-full mb-6">
                <TabsTrigger value="drafts" className="rounded-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Drafts
                </TabsTrigger>
                <TabsTrigger value="published" className="rounded-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Published
                </TabsTrigger>
                <TabsTrigger value="stats" className="rounded-full">
                  <BarChart className="h-4 w-4 mr-2" />
                  Stats
                </TabsTrigger>
                <TabsTrigger value="settings" className="rounded-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="drafts" className="m-0 space-y-6">
                {drafts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {drafts.map((draft) => (
                      <StoryCard
                        key={draft.id}
                        story={draft}
                        type="draft"
                        isExpanded={expandedCard === draft.id}
                        toggleExpand={() =>
                          setExpandedCard(
                            expandedCard === draft.id ? null : draft.id
                          )
                        }
                        onContinueWriting={() => {
                          toast({
                            title: "Opening Editor",
                            description: `Opening "${draft.title}" for editing...`
                          });
                        }}
                        onViewStory={() => {
                          toast({
                            title: "Preview Mode",
                            description: `Previewing "${draft.title}"...`
                          });
                        }}
                        onPublish={() => {
                          toast({
                            title: "Publishing Options",
                            description: `Preparing to publish "${draft.title}"...`
                          });
                        }}
                        onDelete={() => {
                          toast({
                            title: "Confirm Deletion",
                            description: `Are you sure you want to delete "${draft.title}"?`,
                            variant: "destructive"
                          });
                        }}
                        onInviteCoWriter={(story) => {
                          setIsCoWritingEnabled(true);
                          toast({
                            title: "Co-Writing Setup",
                            description: `Setting up co-writing for "${story.title}"...`
                          });
                        }}
                      />
                    ))}
                    <div className="flex items-center justify-center rounded-xl h-full min-h-[300px] border-2 border-dashed border-muted">
                      <Button 
                        variant="outline" 
                        className="rounded-full"
                        onClick={() => setShowNewStoryDialog(true)}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Create New Draft
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-12 text-center bg-muted rounded-xl">
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-background flex items-center justify-center">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">No drafts yet</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-6">
                      Start writing your first story or create a new draft to see it here.
                    </p>
                    <Button 
                      className="rounded-full px-8"
                      onClick={() => setShowNewStoryDialog(true)}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Create New Story
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="published" className="m-0 space-y-6">
                {published.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {published.map((pub) => (
                      <StoryCard
                        key={pub.id}
                        story={pub}
                        type="published"
                        isExpanded={expandedCard === pub.id}
                        toggleExpand={() =>
                          setExpandedCard(
                            expandedCard === pub.id ? null : pub.id
                          )
                        }
                        onContinueWriting={() => {
                          toast({
                            title: "Opening Editor",
                            description: `Opening "${pub.title}" for editing...`
                          });
                        }}
                        onViewStory={() => {
                          toast({
                            title: "View Story",
                            description: `Viewing "${pub.title}"...`
                          });
                        }}
                        onPublish={() => {
                          toast({
                            title: "Publishing Updates",
                            description: `Updating publication settings for "${pub.title}"...`
                          });
                        }}
                        onDelete={() => {
                          toast({
                            title: "Confirm Unpublish",
                            description: `Are you sure you want to unpublish "${pub.title}"?`,
                            variant: "destructive"
                          });
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center bg-muted rounded-xl">
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-background flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">No published stories</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-6">
                      When you publish your stories, they'll appear here for your readers to enjoy.
                    </p>
                    <Button className="rounded-full px-8">Publish a Draft</Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="stats" className="m-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Writing Activity</CardTitle>
                        <CardDescription>Words written per day, last 14 days</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[200px] w-full bg-secondary/50 rounded-md relative">
                          {/* Simplified chart representation */}
                          <div className="absolute inset-0 flex items-end px-2 pb-2">
                            {writerStats.monthlyTrend.map((value, index) => (
                              <div 
                                key={index} 
                                className="flex-1 mx-0.5"
                                style={{ height: `${(value / Math.max(...writerStats.monthlyTrend)) * 100}%` }}
                              >
                                <div className="w-full bg-primary rounded-t-sm h-full"></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          Your daily average: {writerStats.dailyAverage} words
                        </div>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Reader Engagement</CardTitle>
                        <CardDescription>How readers are interacting with your stories</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="bg-secondary/50 p-4 rounded-md text-center">
                            <div className="text-3xl font-bold mb-1">{writerStats.totalReads.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">Total Reads</div>
                          </div>
                          <div className="bg-secondary/50 p-4 rounded-md text-center">
                            <div className="text-3xl font-bold mb-1">{writerStats.totalLikes.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">Total Likes</div>
                          </div>
                          <div className="bg-secondary/50 p-4 rounded-md text-center">
                            <div className="text-3xl font-bold mb-1">{writerStats.totalComments.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">Total Comments</div>
                          </div>
                        </div>
                        <div className="mt-4 p-3 bg-primary/10 rounded-md">
                          <h4 className="font-medium mb-2">Reader Insights</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <div className="mt-1 min-w-4"><ChevronRight className="h-3 w-3 text-primary" /></div>
                              <p>Most engaged demographic: 18-24 year olds</p>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="mt-1 min-w-4"><ChevronRight className="h-3 w-3 text-primary" /></div>
                              <p>Peak reading time: 8-10pm on weekdays</p>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="mt-1 min-w-4"><ChevronRight className="h-3 w-3 text-primary" /></div>
                              <p>Most popular chapter: "The Revelation" in "The Last Starfighter"</p>
                            </li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Writer Stats</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="text-muted-foreground">Stories Published</span>
                          <span className="font-medium">{writerStats.storiesPublished}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="text-muted-foreground">Total Word Count</span>
                          <span className="font-medium">{writerStats.totalWordCount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="text-muted-foreground">Average Rating</span>
                          <span className="font-medium flex items-center">
                            {writerStats.averageRating}
                            <Star className="h-4 w-4 text-yellow-500 ml-1 fill-yellow-500" />
                          </span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span className="text-muted-foreground">Most Active Day</span>
                          <span className="font-medium">{writerStats.mostActiveDay}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Writing Streak</span>
                          <span className="font-medium text-green-600">{writerStats.writingStreak} days</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          variant="outline" 
                          className="w-full rounded-full"
                          onClick={() => {
                            toast({
                              title: "Detailed Analytics",
                              description: "Opening detailed writing analytics dashboard..."
                            });
                          }}
                        >
                          View Full Analytics
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Reading Habits</CardTitle>
                        <CardDescription>Based on your reading history</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Fantasy</span>
                              <span>45%</span>
                            </div>
                            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                              <div className="bg-primary h-full" style={{ width: "45%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Sci-Fi</span>
                              <span>30%</span>
                            </div>
                            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                              <div className="bg-primary h-full" style={{ width: "30%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Mystery</span>
                              <span>15%</span>
                            </div>
                            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                              <div className="bg-primary h-full" style={{ width: "15%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Romance</span>
                              <span>10%</span>
                            </div>
                            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                              <div className="bg-primary h-full" style={{ width: "10%" }}></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="m-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Writer Settings</CardTitle>
                        <CardDescription>Customize your writing environment and preferences</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-3">
                          <h3 className="font-medium">Editor Preferences</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="font-size">Font Size</Label>
                              <Select defaultValue="medium">
                                <SelectTrigger id="font-size">
                                  <SelectValue placeholder="Select font size" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="small">Small</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="large">Large</SelectItem>
                                  <SelectItem value="xlarge">Extra Large</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="font-family">Font Family</Label>
                              <Select defaultValue="serif">
                                <SelectTrigger id="font-family">
                                  <SelectValue placeholder="Select font family" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="serif">Serif</SelectItem>
                                  <SelectItem value="sans-serif">Sans Serif</SelectItem>
                                  <SelectItem value="monospace">Monospace</SelectItem>
                                  <SelectItem value="cursive">Cursive</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="spellcheck" className="cursor-pointer">Spell Check</Label>
                              <Switch id="spellcheck" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label htmlFor="autosave" className="cursor-pointer">Auto Save</Label>
                              <Switch id="autosave" defaultChecked />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="focus-mode" className="cursor-pointer">Focus Mode</Label>
                              <Switch id="focus-mode" />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label htmlFor="word-count" className="cursor-pointer">Show Word Count</Label>
                              <Switch id="word-count" defaultChecked />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h3 className="font-medium">AI Assistant Settings</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="ai-model">Preferred AI Model</Label>
                              <Select defaultValue="creative">
                                <SelectTrigger id="ai-model">
                                  <SelectValue placeholder="Select AI model" />
                                </SelectTrigger>
                                <SelectContent>
                                  {aiWritingModels.map(model => (
                                    <SelectItem key={model.id} value={model.id}>{model.name}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <Label htmlFor="creativity">Creativity Level</Label>
                                <span className="text-sm text-muted-foreground">{Math.round(creativityLevel[0] * 100)}%</span>
                              </div>
                              <Slider 
                                id="creativity" 
                                min={0} 
                                max={1} 
                                step={0.1} 
                                value={creativityLevel} 
                                onValueChange={setCreativityLevel} 
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="grammar-suggestions" className="cursor-pointer">Grammar Suggestions</Label>
                              <Switch id="grammar-suggestions" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label htmlFor="style-suggestions" className="cursor-pointer">Style Suggestions</Label>
                              <Switch id="style-suggestions" defaultChecked />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="auto-complete" className="cursor-pointer">AI Auto-Complete</Label>
                            <Switch id="auto-complete" />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h3 className="font-medium">Publishing Preferences</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="comments-enabled" className="cursor-pointer">Enable Comments</Label>
                              <Switch id="comments-enabled" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label htmlFor="anonymous-stats" className="cursor-pointer">Share Anonymous Stats</Label>
                              <Switch id="anonymous-stats" defaultChecked />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="auto-publish" className="cursor-pointer">Auto-Publish Scheduled Chapters</Label>
                            <Switch id="auto-publish" defaultChecked />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end gap-2">
                        <Button 
                          variant="outline"
                          onClick={() => {
                            toast({
                              title: "Settings Reset",
                              description: "All settings have been reset to defaults."
                            });
                          }}
                        >
                          Reset to Defaults
                        </Button>
                        <Button
                          onClick={() => {
                            toast({
                              title: "Settings Saved",
                              description: "Your writer preferences have been updated."
                            });
                          }}
                        >
                          Save Changes
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Writer Profile</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-center mb-4">
                          <Avatar className="h-24 w-24">
                            <AvatarImage src="https://i.pravatar.cc/150?img=32" alt="Profile picture" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="text-center">
                          <h3 className="font-bold text-lg">Jane Doe</h3>
                          <p className="text-muted-foreground text-sm">Fantasy & Sci-Fi Writer</p>
                        </div>
                        <div className="flex justify-center gap-2 pt-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Profile Editor",
                                description: "Opening profile editor..."
                              });
                            }}
                          >
                            Edit Profile
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Public Profile",
                                description: "Viewing your public profile..."
                              });
                            }}
                          >
                            View Public Profile
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Writing Goal</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label>Daily Word Count Target</Label>
                            <span className="text-sm font-medium">{wordCountTarget} words</span>
                          </div>
                          <Slider
                            min={100}
                            max={5000}
                            step={100}
                            value={[wordCountTarget]}
                            onValueChange={(value) => setWordCountTarget(value[0])}
                          />
                          <p className="text-xs text-muted-foreground">
                            Setting a daily word count goal helps build a consistent writing habit.
                          </p>
                        </div>

                        <div className="pt-2">
                          <Button 
                            className="w-full"
                            onClick={() => {
                              toast({
                                title: "Goal Updated",
                                description: `Your daily writing goal has been set to ${wordCountTarget} words.`
                              });
                            }}
                          >
                            Save Goal
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Co-Writing</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Enable Co-Writing</p>
                            <p className="text-sm text-muted-foreground">Collaborate with other writers</p>
                          </div>
                          <Switch 
                            checked={isCoWritingEnabled} 
                            onCheckedChange={setIsCoWritingEnabled} 
                          />
                        </div>
                        
                        {isCoWritingEnabled && (
                          <div className="pt-2 space-y-3">
                            <div>
                              <Label htmlFor="cowriter-email">Invite Co-Writer</Label>
                              <div className="flex gap-2 mt-1">
                                <Input 
                                  id="cowriter-email" 
                                  placeholder="Enter email address" 
                                  type="email" 
                                />
                                <Button 
                                  size="sm" 
                                  onClick={() => handleInviteCoWriter(document.getElementById('cowriter-email').value)}
                                >
                                  <UserPlus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Co-Writer Permissions</Label>
                              <Select defaultValue="edit">
                                <SelectTrigger>
                                  <SelectValue placeholder="Select permissions" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="view">View Only</SelectItem>
                                  <SelectItem value="comment">Comment Only</SelectItem>
                                  <SelectItem value="edit">Edit Content</SelectItem>
                                  <SelectItem value="full">Full Access</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />

      {/* New Story Dialog */}
      <Dialog open={showNewStoryDialog} onOpenChange={setShowNewStoryDialog}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Create New Story</DialogTitle>
            <DialogDescription>
              Fill in the details below to create your new story. You can edit these details later.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateStory)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Story Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter title" {...field} />
                        </FormControl>
                        <FormDescription>
                          Make it catchy and descriptive
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Summary</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Brief description of your story"
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This will appear on your story listing
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fandom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fandom (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Harry Potter" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="genre"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Genre</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select genre" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="fantasy">Fantasy</SelectItem>
                              <SelectItem value="sci-fi">Science Fiction</SelectItem>
                              <SelectItem value="romance">Romance</SelectItem>
                              <SelectItem value="mystery">Mystery</SelectItem>
                              <SelectItem value="horror">Horror</SelectItem>
                              <SelectItem value="adventure">Adventure</SelectItem>
                              <SelectItem value="historical">Historical</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., magic, friendship, coming-of-age" {...field} />
                        </FormControl>
                        <FormDescription>
                          Separate tags with commas
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="contentWarnings"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content Warnings (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., violence, language" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="ageRating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age Rating</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select rating" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general">General Audiences</SelectItem>
                              <SelectItem value="teen">Teen and Up</SelectItem>
                              <SelectItem value="mature">Mature</SelectItem>
                              <SelectItem value="explicit">Explicit</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="coverImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover Image (Optional)</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input 
                              type="file" 
                              className="hidden" 
                              id="cover-image-upload"
                              accept="image/*" 
                              onChange={(e) => {
                                // In a real app, this would handle the file upload
                                field.onChange(e.target.files ? e.target.files[0]?.name : "");
                              }}
                            />
                            <Input 
                              placeholder="No file chosen" 
                              value={field.value} 
                              readOnly 
                              className="flex-grow"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => document.getElementById("cover-image-upload").click()}
                            >
                              <ImageIcon className="h-4 w-4 mr-2" />
                              Browse
                            </Button>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Recommended size: 1200 x 800 pixels
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowNewStoryDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Create Story</Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* AI Writing Assistant Dialog */}
      <Dialog open={showAiAssistantDialog} onOpenChange={setShowAiAssistantDialog}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              AI Writing Assistant
            </DialogTitle>
            <DialogDescription>
              Get help with your writing, from plot ideas to character development and more.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-3 md:col-span-1 border-r pr-4">
              <div className="space-y-3">
                <div 
                  className={`p-3 rounded-lg cursor-pointer transition-colors flex items-center gap-2 ${activeAiTab === "inspire" ? "bg-primary/10 border border-primary/30" : "hover:bg-secondary"}`}
                  onClick={() => setActiveAiTab("inspire")}
                >
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  <div>
                    <h3 className="font-medium text-sm">Inspire Me</h3>
                    <p className="text-xs text-muted-foreground">Plot ideas & twists</p>
                  </div>
                </div>
                
                <div 
                  className={`p-3 rounded-lg cursor-pointer transition-colors flex items-center gap-2 ${activeAiTab === "develop" ? "bg-primary/10 border border-primary/30" : "hover:bg-secondary"}`}
                  onClick={() => setActiveAiTab("develop")}
                >
                  <Briefcase className="h-4 w-4 text-blue-500" />
                  <div>
                    <h3 className="font-medium text-sm">Develop</h3>
                    <p className="text-xs text-muted-foreground">Characters & worldbuilding</p>
                  </div>
                </div>
                
                <div 
                  className={`p-3 rounded-lg cursor-pointer transition-colors flex items-center gap-2 ${activeAiTab === "refine" ? "bg-primary/10 border border-primary/30" : "hover:bg-secondary"}`}
                  onClick={() => setActiveAiTab("refine")}
                >
                  <Edit2 className="h-4 w-4 text-green-500" />
                  <div>
                    <h3 className="font-medium text-sm">Refine</h3>
                    <p className="text-xs text-muted-foreground">Writing style & dialogue</p>
                  </div>
                </div>
                
                <div 
                  className={`p-3 rounded-lg cursor-pointer transition-colors flex items-center gap-2 ${activeAiTab === "overcome" ? "bg-primary/10 border border-primary/30" : "hover:bg-secondary"}`}
                  onClick={() => setActiveAiTab("overcome")}
                >
                  <BrainCircuit className="h-4 w-4 text-purple-500" />
                  <div>
                    <h3 className="font-medium text-sm">Overcome Blocks</h3>
                    <p className="text-xs text-muted-foreground">Writer's block help</p>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <h3 className="font-medium text-sm">AI Model Settings</h3>
                <div className="space-y-2">
                  <Label htmlFor="ai-model-select">Model</Label>
                  <Select
                    value={aiModelSelection}
                    onValueChange={setAiModelSelection}
                  >
                    <SelectTrigger id="ai-model-select">
                      <SelectValue placeholder="Select AI model" />
                    </SelectTrigger>
                    <SelectContent>
                      {aiWritingModels.map(model => (
                        <SelectItem key={model.id} value={model.id}>{model.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">{aiWritingModels.find(m => m.id === aiModelSelection)?.description}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="creativity-slider">Creativity</Label>
                    <span className="text-xs text-muted-foreground">{Math.round(creativityLevel[0] * 100)}%</span>
                  </div>
                  <Slider 
                    id="creativity-slider" 
                    min={0} 
                    max={1} 
                    step={0.1} 
                    value={creativityLevel} 
                    onValueChange={setCreativityLevel} 
                  />
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <h3 className="font-medium text-sm">Inspiration</h3>
                <ScrollArea className="h-[100px]">
                  <div className="space-y-1.5">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="justify-start w-full text-left h-auto py-1.5"
                        >
                          <Type className="h-3.5 w-3.5 mr-2" />
                          <span className="truncate">Character Names</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-2">
                        <div className="space-y-1">
                          {aiSuggestions.characterNames.map((name, i) => (
                            <Button 
                              key={i} 
                              variant="ghost" 
                              size="sm" 
                              className="w-full justify-start text-sm h-auto py-1"
                              onClick={() => {
                                setAiQueryInput(`Help me develop a character named ${name}`);
                                setActiveAiTab("develop");
                              }}
                            >
                              {name}
                            </Button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                    
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="justify-start w-full text-left h-auto py-1.5"
                        >
                          <Globe className="h-3.5 w-3.5 mr-2" />
                          <span className="truncate">Settings & Worlds</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[250px] p-2">
                        <div className="space-y-1">
                          {aiSuggestions.settings.map((setting, i) => (
                            <Button 
                              key={i} 
                              variant="ghost" 
                              size="sm" 
                              className="w-full justify-start text-sm h-auto py-1"
                              onClick={() => {
                                setAiQueryInput(`Help me develop a setting: ${setting}`);
                                setActiveAiTab("develop");
                              }}
                            >
                              {setting}
                            </Button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                    
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="justify-start w-full text-left h-auto py-1.5"
                        >
                          <Wand2 className="h-3.5 w-3.5 mr-2" />
                          <span className="truncate">Plot Twists</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-2">
                        <div className="space-y-1">
                          {aiSuggestions.plotTwists.map((twist, i) => (
                            <Button 
                              key={i} 
                              variant="ghost" 
                              size="sm" 
                              className="w-full justify-start text-sm h-auto py-1"
                              onClick={() => {
                                setAiQueryInput(`Help me incorporate this plot twist: ${twist}`);
                                setActiveAiTab("inspire");
                              }}
                            >
                              {twist}
                            </Button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </ScrollArea>
              </div>
            </div>
            
            <div className="col-span-3 md:col-span-2 space-y-4">
              {/* Assistant Prompt Input */}
              <div className="space-y-3">
                <Label htmlFor="ai-query-input">
                  {activeAiTab === "inspire" && "What kind of inspiration are you looking for?"}
                  {activeAiTab === "develop" && "What would you like to develop?"}
                  {activeAiTab === "refine" && "What would you like help refining?"}
                  {activeAiTab === "overcome" && "What writing challenge are you facing?"}
                </Label>
                <Textarea 
                  id="ai-query-input" 
                  placeholder={
                    activeAiTab === "inspire" 
                      ? "e.g., I need ideas for a plot twist in my fantasy story" 
                      : activeAiTab === "develop"
                      ? "e.g., Help me develop the backstory for my protagonist" 
                      : activeAiTab === "refine"
                      ? "e.g., Can you help make this dialogue more natural?" 
                      : "e.g., I'm stuck on how to transition between scenes"
                  }
                  value={aiQueryInput}
                  onChange={(e) => setAiQueryInput(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-end">
                  <Button 
                    onClick={handleGenerateAiResponse}
                    disabled={!aiQueryInput.trim() || isGeneratingAiResponse}
                  >
                    {isGeneratingAiResponse ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Suggestions
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              {/* AI Response */}
              {aiResponse && (
                <div className="rounded-lg border p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          <Sparkles className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">AI Assistant</p>
                        <p className="text-xs text-muted-foreground">
                          Using {aiWritingModels.find(m => m.id === aiModelSelection)?.name} model
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => setIsAiResponseLiked(!isAiResponseLiked)}
                      >
                        <ThumbsUp 
                          className={`h-4 w-4 ${isAiResponseLiked ? "fill-primary text-primary" : ""}`} 
                        />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={handleCopyAiResponse}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => setAiResponse("")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-secondary/50 rounded-md p-4 whitespace-pre-line">
                    {aiResponse}
                  </div>
                  
                  <div className="flex flex-wrap justify-between gap-2 pt-2">
                    <Button
                      variant="outline" 
                      size="sm" 
                      className="h-8"
                      onClick={() => {
                        setAiQueryInput(`Can you provide more details for: ${aiQueryInput}`);
                        handleGenerateAiResponse();
                      }}
                    >
                      <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                      More Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8"
                      onClick={() => {
                        setAiQueryInput(`Give me a different approach for: ${aiQueryInput}`);
                        handleGenerateAiResponse();
                      }}
                    >
                      <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                      Different Approach
                    </Button>
                    <Button 
                      size="sm" 
                      className="h-8"
                      onClick={() => {
                        toast({
                          title: "Applied to Story",
                          description: "The AI suggestion has been applied to your story."
                        });
                        setShowAiAssistantDialog(false);
                      }}
                    >
                      <Check className="h-3.5 w-3.5 mr-1.5" />
                      Apply to Story
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Writing Challenge Dialog */}
      {selectedChallenge && (
        <Dialog open={showChallengeDialog} onOpenChange={setShowChallengeDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedChallenge.title}</DialogTitle>
              <DialogDescription>
                Join this community writing challenge to test your skills and connect with other writers.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Challenge Description</h3>
                <p className="text-muted-foreground">{selectedChallenge.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Deadline</h4>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="h-4 w-4 mr-1.5 text-primary" />
                    {selectedChallenge.deadline}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Word Limit</h4>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <FileText className="h-4 w-4 mr-1.5 text-primary" />
                    {selectedChallenge.wordLimit}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Prize</h4>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Award className="h-4 w-4 mr-1.5 text-yellow-500" />
                    {selectedChallenge.prize}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Participants</h4>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Users className="h-4 w-4 mr-1.5 text-primary" />
                    {selectedChallenge.participants} writers
                  </p>
                </div>
              </div>
              
              <div className="p-4 bg-secondary/50 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center">
                  <CircleAlert className="h-4 w-4 mr-1.5 text-primary" />
                  Challenge Rules
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-1.5">
                    <div className="mt-1 min-w-4">
                      <ChevronRight className="h-3 w-3 text-primary" />
                    </div>
                    <p>Your submission must adhere to the word limit and theme.</p>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <div className="mt-1 min-w-4">
                      <ChevronRight className="h-3 w-3 text-primary" />
                    </div>
                    <p>All submissions must be original work created for this challenge.</p>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <div className="mt-1 min-w-4">
                      <ChevronRight className="h-3 w-3 text-primary" />
                    </div>
                    <p>Multiple entries are not allowed. Submit your best work!</p>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <div className="mt-1 min-w-4">
                      <ChevronRight className="h-3 w-3 text-primary" />
                    </div>
                    <p>By entering, you agree to receive community feedback on your work.</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowChallengeDialog(false)}>
                Maybe Later
              </Button>
              <Button onClick={handleJoinChallenge}>
                Join Challenge
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

// Adding Award icon that's used in the code but wasn't imported
import { Award, Check } from "lucide-react";

interface StoryCardProps {
  story: any;
  type: "draft" | "published";
  isExpanded: boolean;
  toggleExpand: () => void;
  onContinueWriting: () => void;
  onViewStory: () => void;
  onPublish: () => void;
  onDelete: () => void;
  onInviteCoWriter?: (story: any) => void;
}

const StoryCard = ({ 
  story, 
  type, 
  isExpanded, 
  toggleExpand, 
  onContinueWriting,
  onViewStory,
  onPublish,
  onDelete,
  onInviteCoWriter
}: StoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative overflow-hidden rounded-xl border bg-background shadow-sm"
    >
      {/* Story Cover Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={story.coverUrl}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-white font-bold text-lg mb-1">{story.title}</h3>
          <div className="text-white/70 text-sm flex items-center">
            <span>Last edited: {story.lastEdited}</span>
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 bg-black/30 hover:bg-black/50 text-white">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem onClick={onContinueWriting}>
                <PenTool className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onViewStory}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </DropdownMenuItem>
              {type === "draft" ? (
                <DropdownMenuItem onClick={onPublish}>
                  <CloudUpload className="mr-2 h-4 w-4" />
                  Publish
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={onPublish}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
              )}
              <DropdownMenuItem 
                className="text-destructive focus:text-destructive"
                onClick={onDelete}
              >
                <Trash className="mr-2 h-4 w-4" />
                {type === "draft" ? "Delete" : "Unpublish"}
              </DropdownMenuItem>
              {type === "draft" && onInviteCoWriter && (
                <DropdownMenuItem onClick={() => onInviteCoWriter(story)}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Co-Writer
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Story Details */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-secondary">
            {story.status}
          </span>
          <span className="text-xs text-muted-foreground">
            {story.wordCount.toLocaleString()} words • {story.chapters} chapters
          </span>
        </div>

        {type === "published" && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="text-center p-2 bg-secondary rounded-md">
              <div className="font-medium">{story.reads.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Reads</div>
            </div>
            <div className="text-center p-2 bg-secondary rounded-md">
              <div className="font-medium">{story.likes.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Likes</div>
            </div>
            <div className="text-center p-2 bg-secondary rounded-md">
              <div className="font-medium">{story.comments.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Comments</div>
            </div>
          </div>
        )}

        <div className="flex flex-col space-y-2">
          <Button 
            className="rounded-full px-4"
            onClick={onContinueWriting}
          >
            <PenTool className="mr-2 h-4 w-4" /> Continue Writing
          </Button>
          {type === "draft" ? (
            <Button 
              variant="outline" 
              className="rounded-full px-4"
              onClick={onPublish}
            >
              <CloudUpload className="mr-2 h-4 w-4" /> Publish
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="rounded-full px-4"
              onClick={onViewStory}
            >
              <Eye className="mr-2 h-4 w-4" /> View Story
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Missing Trash icon import
import { Trash } from "lucide-react";

export default Write;
