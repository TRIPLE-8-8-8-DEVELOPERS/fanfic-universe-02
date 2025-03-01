
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
  Film
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
  const { toast } = useToast();

  // Mock story data
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const storyData = {
        id: id,
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
      };
      
      setStory(storyData);
      setEditedContent(storyData.content);
      
      // Mock comments
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
    
    // Simulate viewers joining
    const interval = setInterval(() => {
      setLiveViewers(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    
    // Clean up interval
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
    setStory({...story, bookmarks: story.bookmarks + 1});
    toast({
      description: "Added to your bookmarks!",
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
      
      <main className="flex-grow pt-24">
        <div className="container py-8">
          {/* Story Header */}
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
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge>{story.genre}</Badge>
                  <Badge variant="outline">{story.status}</Badge>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-2 font-serif">
                  {story.title}
                </h1>
                
                <div className="flex items-center gap-2 mb-4">
                  <Link to={`/author/${story.authorId}`} className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={story.authorAvatar} />
                      <AvatarFallback>{story.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{story.author}</span>
                  </Link>
                  <span className="text-sm text-muted-foreground">
                    Published {story.published}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-lg">
                    <BookOpen className="h-5 w-5 text-blue-500 mb-1" />
                    <span className="text-sm font-medium">{story.wordCount}</span>
                    <span className="text-xs text-muted-foreground">Words</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-lg">
                    <Heart className="h-5 w-5 text-red-500 mb-1" />
                    <span className="text-sm font-medium">{story.likes}</span>
                    <span className="text-xs text-muted-foreground">Likes</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-green-500 mb-1" />
                    <span className="text-sm font-medium">{story.comments}</span>
                    <span className="text-xs text-muted-foreground">Comments</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-lg">
                    <Bookmark className="h-5 w-5 text-purple-500 mb-1" />
                    <span className="text-sm font-medium">{story.bookmarks}</span>
                    <span className="text-xs text-muted-foreground">Bookmarks</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {story.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button onClick={handleLike} variant="default" className="gap-2">
                    <Heart className="h-4 w-4" />
                    Like
                  </Button>
                  <Button onClick={handleBookmark} variant="outline" className="gap-2">
                    <Bookmark className="h-4 w-4" />
                    Bookmark
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">More</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <Award className="h-4 w-4 mr-2" />
                        Nominate for Award
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message Author
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
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
              <div className="bg-white rounded-lg shadow-sm border p-6">
                {/* Author Editor Tools */}
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
                    <DialogContent>
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
                
                {/* Live Streaming Indicator */}
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
                
                {/* Video Preview */}
                {videoUrl && (
                  <div className="mb-6 border rounded-lg overflow-hidden">
                    <video 
                      src={videoUrl} 
                      controls
                      poster={story.cover}
                      className="w-full h-auto max-h-[400px]"
                    ></video>
                    <div className="p-3 bg-slate-50">
                      <h3 className="font-medium text-sm">Story Companion Video</h3>
                      <p className="text-xs text-muted-foreground">
                        Visual elements to enhance your story experience
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Story Content */}
                <div className="prose max-w-none">
                  {isEditing ? (
                    <Textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="min-h-[300px] font-serif text-lg leading-relaxed"
                    />
                  ) : (
                    <div className="font-serif text-lg leading-relaxed whitespace-pre-line">
                      {story.content}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Comments Section */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Discussion</h2>
                
                <div className="mb-6">
                  <Textarea
                    placeholder="Share your thoughts on this story..."
                    className="mb-2"
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
                  {comments.map((comment) => (
                    <div key={comment.id} className="p-4 border rounded-lg">
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
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
                <h2 className="text-lg font-bold mb-4">About the Author</h2>
                
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={story.authorAvatar} />
                    <AvatarFallback>{story.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{story.author}</h3>
                    <p className="text-sm text-muted-foreground">
                      Fantasy Author
                    </p>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  Alexandra has been writing fantasy stories for over 5 years. Her works explore themes of magic, identity, and the balance between light and darkness.
                </p>
                
                <Button className="w-full mb-4" variant="outline">
                  Follow Author
                </Button>
                
                <Separator className="my-4" />
                
                <h3 className="font-medium mb-2">More by this Author</h3>
                
                <div className="space-y-3">
                  {[
                    {
                      title: "Echoes of Eternity",
                      cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
                    },
                    {
                      title: "The Dragon's Prophecy",
                      cover: "https://images.unsplash.com/photo-1507409613952-528e3e638014?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
                    },
                  ].map((story, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="h-12 w-8 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={story.cover} 
                          alt={story.title} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium line-clamp-1">{story.title}</h4>
                        <p className="text-xs text-muted-foreground">Fantasy • 15 min read</p>
                      </div>
                    </div>
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
