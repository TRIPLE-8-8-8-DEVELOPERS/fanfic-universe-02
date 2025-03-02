
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Heart, 
  Share2, 
  MessageSquare, 
  Bookmark, 
  ThumbsUp, 
  Award, 
  ChevronLeft, 
  Play,
  Pencil,
  Save,
  Video,
  Sparkles,
  Users,
  Film,
  Star,
  Headphones,
  Clock,
  Eye,
  BookMarked,
  BarChart3,
  BookOpenText,
  Plus,
  Bookmark as BookmarkIcon,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { toast, useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIWritingAssistant from "@/components/AIWritingAssistant";
import VideoUploader from "@/components/VideoUploader";
import { Progress } from "@/components/ui/progress";

const Story = () => {
  const { id } = useParams();
  const [story, setStory] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [showVideoUploader, setShowVideoUploader] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [isLiveStreaming, setIsLiveStreaming] = useState(false);
  const [liveViewers, setLiveViewers] = useState(0);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [readProgress, setReadProgress] = useState(0);
  const [fontSettings, setFontSettings] = useState({ size: "base", family: "serif" });
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState("story");
  const [relatedStories, setRelatedStories] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setTimeout(() => {
      // More story data
      const allStories = [
        {
          id: "1",
          title: "The Midnight Chronicles",
          author: "Alexandra Rivers",
          authorId: "author1",
          authorAvatar: "https://i.pravatar.cc/150?img=1",
          cover: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          genre: "Fantasy",
          content: `In a world where darkness falls at midnight and doesn't lift until noon the next day, a young witch discovers she can manipulate the shadows.

The village of Nighthaven lay nestled in the valley, surrounded by ancient pine forests that whispered secrets to those who knew how to listen. For as long as anyone could remember, true darkness claimed these lands for twelve hours each day – a phenomenon locals simply called "The Midnight."

Elara knew no other way of life. Each day, as the sun approached the horizon, the villagers would secure their homes, light their enchanted lanterns, and wait. They feared what lurked in The Midnight – creatures that fed on shadow and preyed on those foolish enough to wander outside the protection of their homes.

But Elara was different. While others cowered, she felt a strange pull toward the darkness, a connection she couldn't explain. On her eighteenth birthday, as The Midnight fell once again over Nighthaven, she stood at her bedroom window and raised her hand. To her astonishment, the shadows outside seemed to ripple in response to her movement.

"Impossible," she whispered, but curiosity overpowered fear. Night after night, she practiced in secret, learning to bend and shape the darkness like clay in her hands. She discovered she could craft shadowy beings – birds that flew at her command, wolves that prowled beside her, shields that protected her from the night creatures.

What she didn't know was that her newfound powers had attracted attention. The Council of Light had been watching, and they had plans for the first shadow weaver in a thousand years.`,
          published: "October 15, 2023",
          chapters: 1,
          status: "In Progress",
          wordCount: 256,
          readTime: "5 min",
          likes: 1254,
          comments: 147,
          bookmarks: 327,
          views: 5621,
          tags: ["fantasy", "magic", "supernatural", "young-adult"],
          rating: 4.8,
        },
        {
          id: "2",
          title: "Cybernetic Dreams",
          author: "Marcus Zhang",
          authorId: "author2",
          authorAvatar: "https://i.pravatar.cc/150?img=8",
          cover: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          genre: "Sci-Fi",
          content: `Nova City gleamed like a silver serpent under the perpetual night sky, its neon lights reflecting off the rain-slicked streets. In this city where human and machine had begun to merge, Detective Rin Nakamura stood out as one of the few who remained fully organic.

"Another one," she muttered, kneeling beside the body. The victim—a young man barely in his twenties—stared upward with vacant eyes, the neural port at the base of his skull still glowing with faint blue light.

"That's the third this month," her partner, Officer Chen said, his own cybernetic eye whirring as it captured the scene. "Same MO as the others. Brain completely wiped, no signs of struggle."

Rin nodded, pulling a transparent evidence bag from her coat. Inside was a small chip, no larger than her thumbnail, inscribed with a symbol she'd come to know intimately over the past few months: a butterfly with digital wings.

"The Monarch," Chen whispered, his human eye widening.

The Monarch was a ghost in the system, a hacker who had managed to remain invisible despite leaving a trail of empty-minded victims across the city. Some believed The Monarch was offering transcendence—uploading human consciousness to some digital utopia. Others thought it was simply a serial killer with advanced tech.

As Rin secured the scene, her comm-link chimed. A message appeared in her retinal display, sent through channels that should have been impossible to access.

"Looking in all the wrong places, Detective. The butterfly effect isn't about who dies, but what's born from their data."

The message vanished as quickly as it had appeared, leaving no trace in the system. Rin's heart raced. For the first time in this investigation, The Monarch had reached out directly.

The game had changed.`,
          published: "December 10, 2023",
          chapters: 3,
          status: "In Progress",
          wordCount: 276,
          readTime: "6 min",
          likes: 987,
          comments: 102,
          bookmarks: 219,
          views: 3845,
          tags: ["sci-fi", "cyberpunk", "mystery", "detective"],
          rating: 4.7,
        },
        {
          id: "3",
          title: "Whispers in the Hallway",
          author: "Sophia Kelly",
          authorId: "author3",
          authorAvatar: "https://i.pravatar.cc/150?img=5",
          cover: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          genre: "Horror",
          content: `Rosewood Preparatory Academy had stood for over a century, its gothic architecture looming over the small town of Millfield. Generations of elite families had sent their children to its hallowed halls, but few knew of the secrets buried within its walls.

Emma Chen certainly didn't when she accepted the scholarship. As the first student from her public school to ever attend Rosewood, she was prepared for the sidelong glances and whispered comments. What she wasn't prepared for were the actual whispers—the ones that seemed to emanate from the very walls of the old East Wing dormitory.

It began on her third night. A soft, indistinct murmuring that seemed to travel through the heating vents. Emma initially dismissed it as the sounds of other students, until she realized the whispers came only at 3:17 AM, exactly, every night.

"He's watching you sleep," the voice finally said clearly one night, jolting Emma from her slumber. Her roommate, Becca, slept soundly in the bed across the room, undisturbed.

The next day, Emma casually asked other students about the East Wing.

"Oh, you're in *that* building," said Liam, a senior whose family had attended Rosewood for generations. "You might want to change rooms."

"Why?" Emma pressed.

Liam's expression darkened. "There was a headmaster in the 1950s who had... inappropriate interests in his female students. They say he used to use the passageways between the walls to spy on the girls in the East Wing. Eventually, one of them caught him."

Emma felt a chill run down her spine. "What happened to him?"

"They say the girls took matters into their own hands. The official record says he resigned and moved away, but no one ever saw him leave the grounds."

That night, at exactly 3:17 AM, Emma was ready. When the whispers began, she whispered back: "I know what happened to you."

The silence that followed was deeper than any she'd experienced. Then, slowly, a section of her wall began to move.`,
          published: "November 5, 2023",
          chapters: 2,
          status: "Complete",
          wordCount: 297,
          readTime: "6 min",
          likes: 1542,
          comments: 231,
          bookmarks: 412,
          views: 6723,
          tags: ["horror", "paranormal", "mystery", "young-adult"],
          rating: 4.9,
        },
        {
          id: "4",
          title: "The Last Lighthouse Keeper",
          author: "Thomas Morgan",
          authorId: "author4",
          authorAvatar: "https://i.pravatar.cc/150?img=3",
          cover: "https://images.unsplash.com/photo-1491466424936-e304919aada7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          genre: "Drama",
          content: `The Harrington Point Lighthouse had guided ships along the treacherous North Atlantic coast for nearly two centuries. Harold Fisher had been its keeper for almost fifty years, the last of a dying breed in an age of automation.

"They're shutting us down next month," Harold told his only regular visitor, a local teenager named Caleb who helped with maintenance in exchange for Harold's stories of the sea. "Putting in one of those computerized systems."

Caleb looked up from the brass fitting he was polishing. "What will you do?"

Harold stared out at the churning gray waters. At seventy-two, his life had been the lighthouse and the lighthouse had been his life.

"Suppose I'll move into town," he said, though the thought of leaving the isolated point filled him with dread. The mainland represented everything he'd escaped: noise, crowds, and memories of Margaret, his wife who'd died thirty years ago.

That night, a late season nor'easter hit with surprising fury. As rain lashed the circular windows of the lamp room, Harold spotted a distress flare through his binoculars – a small fishing boat being pushed toward the razor-sharp rocks that had claimed countless vessels before the lighthouse was built.

Harold rushed to the radio, but the storm had knocked out communications. The automated system was already partially installed, but not yet operational. Only the old lamp would do, but it needed to be lit manually.

As he climbed the spiral stairs to the top, pain shot through his left arm and chest. Harold clutched the railing, knowing exactly what was happening. The doctor had warned him his heart couldn't take much stress.

"Not now," he growled, pulling himself up step by agonizing step.

The pain intensified as he reached the lamp room and began the familiar ritual of lighting the massive Fresnel lens. His vision blurred, but his hands remembered what to do.

As the powerful beam cut through the storm darkness, Harold collapsed to the floor. Through the window, he could see the fishing boat changing course, moving away from the rocks.

"One last save," he whispered, a smile crossing his face as the lighthouse continued its steady, saving rotation above him.`,
          published: "January 20, 2024",
          chapters: 1,
          status: "Complete",
          wordCount: 310,
          readTime: "6 min",
          likes: 876,
          comments: 98,
          bookmarks: 182,
          views: 2934,
          tags: ["drama", "historical", "emotional", "maritime"],
          rating: 4.6,
        },
        {
          id: "5",
          title: "Algorithms of the Heart",
          author: "Aisha Patel",
          authorId: "author5",
          authorAvatar: "https://i.pravatar.cc/150?img=2",
          cover: "https://images.unsplash.com/photo-1625296048730-aec1c86e6632?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          genre: "Romance",
          content: `Dr. Maya Sharma's dating algorithm was nearly perfect. As one of Silicon Valley's most promising AI researchers, she had applied her expertise to solving her own perpetually single status, creating an app that had matched thousands of happy couples.

Everyone except herself.

"Your algorithm set me up with my fiancé," her colleague Zoe said, flashing her engagement ring as they shared lunch in the company courtyard. "How is it you haven't found someone?"

Maya shrugged. "I keep tweaking the parameters. Nothing feels right."

The truth was more complicated. Every match the algorithm suggested for her was theoretically perfect—shared values, complementary personalities, aligned goals—but in person, Maya felt nothing. No spark, no connection, just awkward conversation and early nights.

That evening, while debugging a new feature for the app, Maya discovered an anomaly in the code—a subtle pattern that appeared whenever the algorithm processed her own profile. Curious, she traced it to its source: a section of code she hadn't written.

"What the hell?" she muttered, digging deeper.

Someone had modified her algorithm, specifically when it came to her own matches. The code was brilliant, elegant even, accounting for factors she hadn't considered. But who would do this?

"Late night?" a voice asked.

Maya startled, turning to find Daniel Park, the new senior developer who'd transferred from the New York office a month ago.

"I found something weird in the matching code," she said, too focused on the puzzle to be annoyed by the interruption.

Daniel leaned over her shoulder, his coffee cup in hand. "Mind if I look?"

As they worked side by side through the night, Maya discovered two things: First, Daniel was the one who had modified her algorithm, believing he was fixing a bug. Second, the reason her algorithm never found her a match was because it was looking for someone who didn't exist—a perfect statistical composite of traits.

"Algorithms can't account for everything," Daniel said as dawn broke over the campus. "Some connections defy logic."

When their hands accidentally touched while reaching for the same keyboard, Maya felt something her algorithm had never predicted: possibility.`,
          published: "February 14, 2024",
          chapters: 1,
          status: "Complete",
          wordCount: 285,
          readTime: "6 min",
          likes: 2103,
          comments: 276,
          bookmarks: 509,
          views: 7821,
          tags: ["romance", "contemporary", "technology", "workplace"],
          rating: 4.9,
        }
      ];

      const currentStory = allStories.find(story => story.id === id) || allStories[0];
      setStory(currentStory);
      setEditedContent(currentStory.content);
      
      // Set related stories (excluding current story)
      const relatedStoryList = allStories
        .filter(story => story.id !== currentStory.id)
        .slice(0, 3);
      setRelatedStories(relatedStoryList);
      
      const mockComments = [
        {
          id: "c1",
          user: "Marcus Chen",
          avatar: "https://i.pravatar.cc/150?img=3",
          content: "I love how you've set up this world with the extended darkness. The concept of shadow manipulation is fascinating!",
          timestamp: "3 days ago",
          likes: 24
        },
        {
          id: "c2",
          user: "Sophia Morgan",
          avatar: "https://i.pravatar.cc/150?img=5",
          content: "The descriptions are so vivid. I can really picture Nighthaven and feel the atmosphere.",
          timestamp: "2 days ago",
          likes: 15
        },
        {
          id: "c3",
          user: "Julian Black",
          avatar: "https://i.pravatar.cc/150?img=8",
          content: "Can't wait to learn more about the Council of Light! Will there be a new chapter soon?",
          timestamp: "1 day ago",
          likes: 9
        }
      ];
      
      setComments(mockComments);

      // Simulate random read progress
      setReadProgress(Math.floor(Math.random() * 100));
    }, 1000);
  }, [id]);
  
  const handleSaveContent = () => {
    setStory({...story, content: editedContent});
    setIsEditing(false);
    toast({
      title: "Changes saved",
      description: "Your story has been updated successfully.",
    });
  };
  
  const handleAISuggestion = (suggestion: string) => {
    setEditedContent(isEditing ? editedContent + "\n\n" + suggestion : suggestion);
    if (!isEditing) {
      setIsEditing(true);
    }
  };
  
  const handleVideoUpload = (url: string) => {
    setVideoUrl(url);
    setShowVideoUploader(false);
    toast({
      title: "Video added",
      description: "Your video has been added to the story.",
    });
  };
  
  const startLiveStream = () => {
    setIsLiveStreaming(true);
    toast({
      title: "Live stream started",
      description: "Your audience can now join your stream.",
    });
    
    const interval = setInterval(() => {
      setLiveViewers(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    
    setTimeout(() => clearInterval(interval), 30000);
  };
  
  const stopLiveStream = () => {
    setIsLiveStreaming(false);
    toast({
      title: "Live stream ended",
      description: `Stream ended with ${liveViewers} viewers.`,
    });
    setLiveViewers(0);
  };
  
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: `c${comments.length + 1}`,
      user: "You",
      avatar: "https://i.pravatar.cc/150?img=37",
      content: newComment,
      timestamp: "Just now",
      likes: 0
    };
    
    setComments([comment, ...comments]);
    setNewComment("");
    
    toast({
      title: "Comment added",
      description: "Your comment has been published.",
    });
  };
  
  const handleLike = () => {
    setStory({...story, likes: story.likes + 1});
    toast({
      description: "Story liked!",
    });
  };
  
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    if (!isBookmarked) {
      setStory({...story, bookmarks: story.bookmarks + 1});
      toast({
        description: "Added to your bookmarks!",
      });
    } else {
      setStory({...story, bookmarks: story.bookmarks - 1});
      toast({
        description: "Removed from your bookmarks!",
      });
    }
  };

  const toggleAudioPlayback = () => {
    setIsAudioPlaying(!isAudioPlaying);
    toast({
      description: isAudioPlaying ? "Audio paused" : "Audio playback started",
    });
  };

  const changeFontSize = (size: string) => {
    setFontSettings({...fontSettings, size});
    toast({
      description: `Font size changed to ${size}`,
    });
  };

  const changeFontFamily = (family: string) => {
    setFontSettings({...fontSettings, family});
    toast({
      description: `Font family changed to ${family}`,
    });
  };
  
  if (!story) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center p-8">
            <div className="h-8 bg-slate-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/4 mb-12"></div>
            <div className="h-64 bg-slate-200 rounded w-full max-w-3xl mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-full max-w-3xl mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-full max-w-3xl mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-full max-w-3xl"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16 md:pt-20 bg-background">
        <div className="container py-8 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              to="/browse"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Browse
            </Link>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 lg:w-1/4">
                <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-md">
                  <img
                    src={story.cover}
                    alt={story.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Reading progress */}
                <div className="mt-4">
                  <div className="flex justify-between items-center text-sm text-muted-foreground mb-1">
                    <span>Reading Progress</span>
                    <span>{readProgress}%</span>
                  </div>
                  <Progress value={readProgress} className="h-1.5" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-primary/80 hover:bg-primary">{story.genre}</Badge>
                  <Badge variant="outline" className="text-foreground border-primary/30">{story.status}</Badge>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-2 font-serif text-foreground">
                  {story.title}
                </h1>
                
                <div className="flex items-center gap-2 mb-4">
                  <Link to={`/author/${story.authorId}`} className="flex items-center gap-2 group">
                    <Avatar className="h-6 w-6 border-2 border-primary/20">
                      <AvatarImage src={story.authorAvatar} />
                      <AvatarFallback>{story.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">{story.author}</span>
                  </Link>
                  <span className="text-sm text-muted-foreground">
                    Published {story.published}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="flex flex-col items-center justify-center p-3 bg-card rounded-lg border border-border">
                    <BookOpen className="h-5 w-5 text-blue-500 mb-1" />
                    <span className="text-sm font-medium">{story.wordCount}</span>
                    <span className="text-xs text-muted-foreground">Words</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-card rounded-lg border border-border">
                    <Heart className="h-5 w-5 text-red-500 mb-1" />
                    <span className="text-sm font-medium">{story.likes}</span>
                    <span className="text-xs text-muted-foreground">Likes</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-card rounded-lg border border-border">
                    <MessageSquare className="h-5 w-5 text-green-500 mb-1" />
                    <span className="text-sm font-medium">{story.comments}</span>
                    <span className="text-xs text-muted-foreground">Comments</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-card rounded-lg border border-border">
                    <BookmarkIcon className="h-5 w-5 text-purple-500 mb-1" />
                    <span className="text-sm font-medium">{story.bookmarks}</span>
                    <span className="text-xs text-muted-foreground">Bookmarks</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {story.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs text-foreground hover:bg-muted">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button onClick={handleLike} variant="default" className="gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white">
                    <Heart className="h-4 w-4" />
                    Like
                  </Button>
                  <Button 
                    onClick={handleBookmark} 
                    variant={isBookmarked ? "default" : "outline"} 
                    className={`gap-2 ${isBookmarked ? "bg-purple-500 hover:bg-purple-600 text-white" : ""}`}
                  >
                    <Bookmark className="h-4 w-4" />
                    {isBookmarked ? "Bookmarked" : "Bookmark"}
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">More</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 text-foreground bg-card">
                      <DropdownMenuItem onClick={toggleAudioPlayback} className="cursor-pointer">
                        <Headphones className="h-4 w-4 mr-2" />
                        {isAudioPlaying ? "Pause Audio Narration" : "Listen to Audio Narration"}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Award className="h-4 w-4 mr-2" />
                        Nominate for Award
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message Author
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit Story
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="story" className="text-sm">Story</TabsTrigger>
                  <TabsTrigger value="comments" className="text-sm">Comments ({comments.length})</TabsTrigger>
                  <TabsTrigger value="related" className="text-sm">Related Stories</TabsTrigger>
                </TabsList>
                
                <TabsContent value="story" className="mt-0">
                  <div className="bg-card rounded-lg shadow-sm border p-6">
                    <div className="mb-6 flex flex-wrap gap-2">
                      {!isEditing ? (
                        <Button 
                          variant="outline" 
                          className="gap-2"
                          onClick={() => setIsEditing(true)}
                        >
                          <Pencil className="h-4 w-4" />
                          Edit Story
                        </Button>
                      ) : (
                        <Button 
                          variant="default" 
                          className="gap-2"
                          onClick={handleSaveContent}
                        >
                          <Save className="h-4 w-4" />
                          Save Changes
                        </Button>
                      )}
                      
                      <AIWritingAssistant 
                        currentText={isEditing ? editedContent : story.content}
                        onSuggestionApply={handleAISuggestion}
                      />
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="gap-2">
                            <Video className="h-4 w-4" />
                            Add Video
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-card text-card-foreground">
                          <DialogHeader>
                            <DialogTitle>Add Video to Story</DialogTitle>
                            <DialogDescription>
                              Upload a video to enhance your storytelling.
                            </DialogDescription>
                          </DialogHeader>
                          <VideoUploader onVideoUploaded={handleVideoUpload} />
                          <DialogFooter></DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      {!isLiveStreaming ? (
                        <Button 
                          variant="outline" 
                          className="gap-2 bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                          onClick={startLiveStream}
                        >
                          <Play className="h-4 w-4" />
                          Start Live Stream
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          className="gap-2 bg-red-600 text-white hover:bg-red-700"
                          onClick={stopLiveStream}
                        >
                          <Users className="h-4 w-4" />
                          {liveViewers} Watching - End Stream
                        </Button>
                      )}
                    </div>
                    
                    {/* Font settings toolbar */}
                    <div className="flex items-center justify-between mb-4 bg-muted/30 rounded-md p-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Text Size:</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => changeFontSize('sm')}
                          className={`h-7 px-2 ${fontSettings.size === 'sm' ? 'bg-muted' : ''}`}
                        >
                          Small
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => changeFontSize('base')}
                          className={`h-7 px-2 ${fontSettings.size === 'base' ? 'bg-muted' : ''}`}
                        >
                          Medium
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => changeFontSize('lg')}
                          className={`h-7 px-2 ${fontSettings.size === 'lg' ? 'bg-muted' : ''}`}
                        >
                          Large
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Font:</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => changeFontFamily('serif')}
                          className={`h-7 px-2 font-serif ${fontSettings.family === 'serif' ? 'bg-muted' : ''}`}
                        >
                          Serif
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => changeFontFamily('sans')}
                          className={`h-7 px-2 font-sans ${fontSettings.family === 'sans' ? 'bg-muted' : ''}`}
                        >
                          Sans
                        </Button>
                      </div>
                    </div>
                    
                    {isAudioPlaying && (
                      <div className="mb-6 p-3 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Headphones className="h-5 w-5 text-primary" />
                          <div>
                            <div className="text-sm font-medium">Audio Narration</div>
                            <div className="text-xs text-muted-foreground">AI-generated voice narration</div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={toggleAudioPlayback}>Pause</Button>
                      </div>
                    )}
                    
                    {isLiveStreaming && (
                      <div className="mb-6 p-4 border border-red-200 rounded-lg bg-red-50">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Film className="h-6 w-6 text-red-600" />
                            <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full animate-pulse"></span>
                          </div>
                          <div>
                            <h3 className="font-medium text-red-700">Live Reading in Progress</h3>
                            <p className="text-sm text-red-600">
                              {liveViewers} viewers are watching you read your story.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {videoUrl && (
                      <div className="mb-6 border rounded-lg overflow-hidden">
                        <video 
                          src={videoUrl} 
                          controls
                          poster={story.cover}
                          className="w-full h-auto max-h-[400px]"
                        ></video>
                        <div className="p-3 bg-muted/30">
                          <h3 className="font-medium text-sm">Story Companion Video</h3>
                          <p className="text-xs text-muted-foreground">
                            Visual elements to enhance your story experience
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                      {isEditing ? (
                        <Textarea
                          value={editedContent}
                          onChange={(e) => setEditedContent(e.target.value)}
                          className={`min-h-[300px] font-${fontSettings.family} text-${fontSettings.size} leading-relaxed`}
                        />
                      ) : (
                        <div className={`font-${fontSettings.family} text-${fontSettings.size} leading-relaxed whitespace-pre-line text-foreground`}>
                          {story.content}
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="comments" className="mt-0">
                  <div className="bg-card rounded-lg shadow-sm border p-6">
                    <h2 className="text-2xl font-bold mb-4">Discussion</h2>
                    
                    <div className="mb-6">
                      <Textarea
                        placeholder="Share your thoughts on this story..."
                        className="mb-2 bg-background border-border"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                      <Button 
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                      >
                        Post Comment
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {comments.length === 0 ? (
                        <div className="p-8 text-center">
                          <MessageSquare className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
                        </div>
                      ) : (
                        comments.map((comment) => (
                          <div key={comment.id} className="p-4 border rounded-lg bg-background">
                            <div className="flex items-start gap-3">
                              <Avatar>
                                <AvatarImage src={comment.avatar} />
                                <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">{comment.user}</h4>
                                  <span className="text-xs text-muted-foreground">
                                    {comment.timestamp}
                                  </span>
                                </div>
                                <p className="text-sm mt-1">{comment.content}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                                    <ThumbsUp className="h-3 w-3" />
                                    Like {comment.likes > 0 && `(${comment.likes})`}
                                  </Button>
                                  <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                                    <MessageSquare className="h-3 w-3" />
                                    Reply
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="related" className="mt-0">
                  <div className="bg-card rounded-lg shadow-sm border p-6">
                    <h2 className="text-2xl font-bold mb-4">Related Stories</h2>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                      {relatedStories.map((relatedStory) => (
                        <Link to={`/story/${relatedStory.id}`} key={relatedStory.id}>
                          <div className="group border rounded-lg overflow-hidden flex flex-col h-full hover:border-primary transition-colors bg-card">
                            <div className="aspect-video w-full overflow-hidden">
                              <img 
                                src={relatedStory.cover} 
                                alt={relatedStory.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="p-4 flex-1 flex flex-col">
                              <Badge className="self-start mb-2">{relatedStory.genre}</Badge>
                              <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{relatedStory.title}</h3>
                              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                {relatedStory.content.split('\n')[0]}
                              </p>
                              <div className="flex items-center gap-2 mt-auto text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" /> {relatedStory.views}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" /> {relatedStory.readTime}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Star className="h-3 w-3 text-yellow-500" /> {relatedStory.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                      
                      <Link to="/browse" className="border rounded-lg overflow-hidden flex flex-col h-full border-dashed border-muted hover:border-primary transition-colors">
                        <div className="flex items-center justify-center h-full p-8">
                          <div className="text-center">
                            <Plus className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                            <h3 className="font-medium mb-2">Discover More Stories</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Find more stories like this in our vast collection
                            </p>
                            <Button>
                              Browse Library <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg shadow-sm border p-6 sticky top-24">
                <h2 className="text-lg font-bold mb-4">About the Author</h2>
                
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarImage src={story.authorAvatar} />
                    <AvatarFallback>{story.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{story.author}</h3>
                    <p className="text-sm text-muted-foreground">
                      {story.genre} Author
                    </p>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {story.author} has been writing {story.genre.toLowerCase()} stories for over 5 years. Their works explore themes of magic, identity, and the balance between light and darkness.
                </p>
                
                <Button className="w-full mb-4" variant="outline">
                  Follow Author
                </Button>
                
                <Separator className="my-4" />
                
                <h3 className="font-medium mb-3">Author Stats</h3>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
                    <BookOpenText className="h-5 w-5 text-primary mb-1" />
                    <span className="text-sm font-bold">24</span>
                    <span className="text-xs text-muted-foreground">Stories</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
                    <Users className="h-5 w-5 text-blue-500 mb-1" />
                    <span className="text-sm font-bold">5.2K</span>
                    <span className="text-xs text-muted-foreground">Followers</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
                    <BarChart3 className="h-5 w-5 text-green-500 mb-1" />
                    <span className="text-sm font-bold">187K</span>
                    <span className="text-xs text-muted-foreground">Total Views</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-lg">
                    <Star className="h-5 w-5 text-yellow-500 mb-1" />
                    <span className="text-sm font-bold">4.8</span>
                    <span className="text-xs text-muted-foreground">Avg Rating</span>
                  </div>
                </div>
                
                <h3 className="font-medium mb-3">More by this Author</h3>
                
                <div className="space-y-3">
                  {relatedStories.slice(0, 2).map((story) => (
                    <Link to={`/story/${story.id}`} key={story.id} className="group">
                      <div className="flex items-center gap-3">
                        <div className="h-14 w-10 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={story.cover} 
                            alt={story.title} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium line-clamp-1 group-hover:text-primary transition-colors">{story.title}</h4>
                          <p className="text-xs text-muted-foreground flex items-center">
                            {story.genre} • {story.readTime} read
                            <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <h3 className="font-medium mb-3">Story Stats</h3>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Published:</span>
                    <span>{story.published}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Chapters:</span>
                    <span>{story.chapters}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Words:</span>
                    <span>{story.wordCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reading time:</span>
                    <span>{story.readTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating:</span>
                    <span className="flex items-center">
                      {story.rating}
                      <Star className="h-3 w-3 text-yellow-500 ml-1" />
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Views:</span>
                    <span>{story.views}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Story;
