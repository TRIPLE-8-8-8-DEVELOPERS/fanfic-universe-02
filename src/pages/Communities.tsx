
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Bell, 
  BookOpen, 
  Calendar, 
  Edit, 
  Heart, 
  MessageCircle, 
  MoreHorizontal, 
  Play, 
  Plus, 
  Search, 
  Settings, 
  Share2, 
  Star, 
  Trash2, 
  Users,
  Flame // Added Flame instead of Fire
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Community {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  profileImage: string;
  members: number;
  posts: number;
  category: string;
  isJoined: boolean;
  isModerated?: boolean;
  latestActivity?: string;
  featured?: boolean;
  tags?: string[];
  events?: {
    id: string;
    title: string;
    date: string;
    participants: number;
  }[];
  discussions?: {
    id: string;
    title: string;
    author: {
      name: string;
      avatar: string;
    };
    replies: number;
    likes: number;
    lastActivity: string;
  }[];
}

interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  community: {
    id: string;
    name: string;
  };
  content: string;
  contentType: 'text' | 'image' | 'story' | 'poll';
  storyPreview?: {
    title: string;
    coverImage: string;
    excerpt: string;
  };
  images?: string[];
  likes: number;
  comments: number;
  timestamp: string;
  isLiked: boolean;
}

const Communities = () => {
  const [selectedTab, setSelectedTab] = useState("discover");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [newCommunityOpen, setNewCommunityOpen] = useState(false);
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [communityCategory, setCommunityCategory] = useState("Fantasy");
  const [communityTags, setCommunityTags] = useState("");
  const { toast } = useToast();
  
  const categories = [
    "all", "Fantasy", "Sci-Fi", "Romance", "Mystery", "Horror", "Historical", "YA", "Adventure"
  ];
  
  // Mock data for communities
  const communities: Community[] = [
    {
      id: "c1",
      name: "Fantasy Worldbuilders",
      description: "A community dedicated to creating rich fantasy worlds with unique magic systems and intricate lore.",
      coverImage: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      profileImage: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGZhbnRhc3l8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      members: 3754,
      posts: 12890,
      category: "Fantasy",
      isJoined: true,
      isModerated: true,
      latestActivity: "5 minutes ago",
      featured: true,
      tags: ["worldbuilding", "magic-systems", "fantasy", "creative-writing"],
      events: [
        {
          id: "e1",
          title: "Magic System Workshop",
          date: "2023-11-15",
          participants: 124
        },
        {
          id: "e2",
          title: "Collaborative World Building Challenge",
          date: "2023-12-01",
          participants: 87
        }
      ],
      discussions: [
        {
          id: "d1",
          title: "How do you balance magic systems?",
          author: {
            name: "Marcus Lee",
            avatar: "https://i.pravatar.cc/150?img=33"
          },
          replies: 24,
          likes: 38,
          lastActivity: "2 hours ago"
        },
        {
          id: "d2",
          title: "Creating believable cultures in fantasy worlds",
          author: {
            name: "Elena Wright",
            avatar: "https://i.pravatar.cc/150?img=23"
          },
          replies: 18,
          likes: 29,
          lastActivity: "1 day ago"
        },
        {
          id: "d3",
          title: "Geography and climate in world building",
          author: {
            name: "James Wilson",
            avatar: "https://i.pravatar.cc/150?img=12"
          },
          replies: 15,
          likes: 21,
          lastActivity: "3 days ago"
        }
      ]
    },
    {
      id: "c2",
      name: "Sci-Fi Horizons",
      description: "Explore the frontiers of science fiction storytelling, from near-future tech to far-flung space operas.",
      coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1772&q=80",
      profileImage: "https://images.unsplash.com/photo-1614728894747-a83170bcd339?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c2NpJTIwZml8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      members: 2851,
      posts: 8732,
      category: "Sci-Fi",
      isJoined: false,
      latestActivity: "20 minutes ago",
      tags: ["scifi", "space-opera", "cyberpunk", "future-tech"]
    },
    {
      id: "c3",
      name: "Mystery Writers Collective",
      description: "For authors crafting compelling mysteries, thrillers, and suspense stories.",
      coverImage: "https://images.unsplash.com/photo-1588514727390-91fd5ebaef81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG15c3Rlcnl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      profileImage: "https://images.unsplash.com/photo-1453873623425-04e3213d56e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG15c3Rlcnl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      members: 1985,
      posts: 5467,
      category: "Mystery",
      isJoined: true,
      latestActivity: "1 hour ago",
      tags: ["mystery", "thriller", "crime-fiction", "detective"]
    },
    {
      id: "c4",
      name: "Romance Readers & Writers",
      description: "A welcoming space for fans and creators of all romance subgenres.",
      coverImage: "https://images.unsplash.com/photo-1501901609772-df0848060b33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGxvdmV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      profileImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHJvbWFuY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      members: 4210,
      posts: 14352,
      category: "Romance",
      isJoined: false,
      featured: true,
      latestActivity: "15 minutes ago",
      tags: ["romance", "love-stories", "contemporary", "historical-romance"]
    },
    {
      id: "c5",
      name: "Historical Fiction Society",
      description: "Bringing the past to life through meticulously researched and compelling fiction.",
      coverImage: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGlzdG9yeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      profileImage: "https://images.unsplash.com/photo-1599689018005-24eaef5ab307?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGhpc3Rvcnl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      members: 1732,
      posts: 4821,
      category: "Historical",
      isJoined: false,
      latestActivity: "3 hours ago",
      tags: ["historical-fiction", "research", "period-drama", "history"]
    },
    {
      id: "c6",
      name: "YA Fiction Enthusiasts",
      description: "Celebrating stories that capture the complexities and excitement of young adult experiences.",
      coverImage: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZGFya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      profileImage: "https://images.unsplash.com/photo-1541781774-95d1c04456ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dGVlbiUyMGJvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      members: 2975,
      posts: 7648,
      category: "YA",
      isJoined: true,
      latestActivity: "45 minutes ago",
      tags: ["young-adult", "coming-of-age", "teen-fiction", "ya-fantasy"]
    }
  ];
  
  // Mock feed posts
  const feedPosts: Post[] = [
    {
      id: "p1",
      author: {
        id: "user1",
        name: "Elena Wright",
        avatar: "https://i.pravatar.cc/150?img=23"
      },
      community: {
        id: "c1",
        name: "Fantasy Worldbuilders"
      },
      content: "Just finished mapping out the political systems for my new fantasy world! It's set in a world where magic is tied to the seasonal cycles. Each kingdom represents a season and has unique powers tied to their respective season. Would love feedback on how to balance their political influences.",
      contentType: 'text',
      likes: 45,
      comments: 12,
      timestamp: "2 hours ago",
      isLiked: true
    },
    {
      id: "p2",
      author: {
        id: "user2",
        name: "Marcus Lee",
        avatar: "https://i.pravatar.cc/150?img=33"
      },
      community: {
        id: "c1",
        name: "Fantasy Worldbuilders"
      },
      content: "Excited to share a preview of my latest story with the community!",
      contentType: 'story',
      storyPreview: {
        title: "The Arcane Seasons",
        coverImage: "https://images.unsplash.com/photo-1578353022142-09264585d2fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8ZmFudGFzeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
        excerpt: "When the Summer Kingdom's eternal sun began to dim, Lira knew the ancient prophecy was finally unfolding. As the royal astronomer, it was her duty to warn the court, but as the daughter of a Winter Kingdom spy, her loyalties were divided..."
      },
      likes: 78,
      comments: 23,
      timestamp: "5 hours ago",
      isLiked: false
    },
    {
      id: "p3",
      author: {
        id: "user3",
        name: "Sophia Morgan",
        avatar: "https://i.pravatar.cc/150?img=5"
      },
      community: {
        id: "c3",
        name: "Mystery Writers Collective"
      },
      content: "What's your favorite red herring technique? I'm working on a mystery where the detective is unknowingly following clues planted by their partner. Looking for subtle ways to misdirect the reader without feeling cheap when the twist is revealed.",
      contentType: 'text',
      likes: 34,
      comments: 41,
      timestamp: "1 day ago",
      isLiked: true
    },
    {
      id: "p4",
      author: {
        id: "user4",
        name: "James Wilson",
        avatar: "https://i.pravatar.cc/150?img=12"
      },
      community: {
        id: "c1",
        name: "Fantasy Worldbuilders"
      },
      content: "Some concept art I've been working on for my desert-based magic system. The magic in this world is tied to ancient glyphs that absorb and redirect sandstorm energy!",
      contentType: 'image',
      images: [
        "https://images.unsplash.com/photo-1566808587896-c2117d6aa7bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGRlc2VydCUyMGZhbnRhc3l8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1591239921606-cb18fc14b8c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Z2x5cGhzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
      ],
      likes: 56,
      comments: 14,
      timestamp: "2 days ago",
      isLiked: false
    }
  ];
  
  const filteredCommunities = communities.filter(community => {
    // Filter by search query
    const matchesSearch = searchQuery === "" || 
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category
    const matchesCategory = selectedCategory === "all" || community.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const joinedCommunities = communities.filter(community => community.isJoined);
  
  const handleCreateCommunity = () => {
    if (!communityName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a name for your community.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Community Created",
      description: `"${communityName}" has been created successfully.`,
    });
    
    setNewCommunityOpen(false);
    setCommunityName("");
    setCommunityDescription("");
    setCommunityCategory("Fantasy");
    setCommunityTags("");
  };
  
  const handleJoinCommunity = (communityId: string, isJoined: boolean) => {
    const communityName = communities.find(c => c.id === communityId)?.name;
    
    if (isJoined) {
      toast({
        title: "Left Community",
        description: `You have left the "${communityName}" community.`,
      });
    } else {
      toast({
        title: "Joined Community",
        description: `You have joined the "${communityName}" community!`,
      });
    }
  };
  
  const handleLikePost = (postId: string, isLiked: boolean) => {
    toast({
      title: isLiked ? "Post Unliked" : "Post Liked",
      description: isLiked ? "You have removed your like from this post." : "You have liked this post.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold font-serif bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Communities
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with like-minded readers and writers. Share ideas, get feedback, and collaborate on stories in genre-specific communities.
            </p>
          </motion.div>
          
          <div className="flex justify-between items-center mb-6">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full max-w-md">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="discover" className="text-sm flex gap-1 items-center">
                  <Search className="h-4 w-4" />
                  Discover
                </TabsTrigger>
                <TabsTrigger value="my-communities" className="text-sm flex gap-1 items-center">
                  <Users className="h-4 w-4" />
                  My Communities
                </TabsTrigger>
                <TabsTrigger value="feed" className="text-sm flex gap-1 items-center">
                  <MessageCircle className="h-4 w-4" />
                  Feed
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Dialog open={newCommunityOpen} onOpenChange={setNewCommunityOpen}>
              <DialogTrigger asChild>
                <Button variant="default" className="bg-blue-600 hover:bg-blue-700 rounded-full">
                  <Plus className="mr-2 h-4 w-4" />
                  New Community
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Create a new community</DialogTitle>
                  <DialogDescription>
                    Build a space for writers and readers who share your interests.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="community-name">Community Name</Label>
                    <Input
                      id="community-name"
                      value={communityName}
                      onChange={(e) => setCommunityName(e.target.value)}
                      placeholder="e.g. Fantasy Worldbuilders"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="community-description">Description</Label>
                    <Textarea
                      id="community-description"
                      value={communityDescription}
                      onChange={(e) => setCommunityDescription(e.target.value)}
                      placeholder="What is your community about?"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="community-category">Primary Category</Label>
                    <select
                      id="community-category"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={communityCategory}
                      onChange={(e) => setCommunityCategory(e.target.value)}
                    >
                      {categories.filter(c => c !== "all").map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="community-tags">
                      Tags (separate with commas)
                    </Label>
                    <Input
                      id="community-tags"
                      value={communityTags}
                      onChange={(e) => setCommunityTags(e.target.value)}
                      placeholder="e.g. fantasy, magic-systems, worldbuilding"
                    />
                    <p className="text-xs text-muted-foreground">
                      Tags help users find your community when searching for specific topics.
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setNewCommunityOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreateCommunity}>Create Community</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <TabsContent value="discover" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search communities..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`rounded-full ${
                      selectedCategory === category
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "hover:bg-blue-50 hover:text-blue-700"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === "all" ? "All Categories" : category}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Featured Communities */}
            {selectedCategory === "all" && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">Featured Communities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {communities
                    .filter(community => community.featured)
                    .map((community) => (
                      <motion.div
                        key={community.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="overflow-hidden border-blue-100 hover:shadow-md transition-shadow">
                          <div className="relative h-48">
                            <img 
                              src={community.coverImage} 
                              alt={community.name} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                              <div className="absolute bottom-0 left-0 p-4 flex items-end">
                                <div className="mr-4">
                                  <img 
                                    src={community.profileImage} 
                                    alt={community.name} 
                                    className="h-16 w-16 rounded-full border-4 border-white"
                                  />
                                </div>
                                <div className="text-white">
                                  <h3 className="font-bold text-xl">{community.name}</h3>
                                  <div className="flex items-center text-sm text-white/80">
                                    <Users className="h-4 w-4 mr-1" />
                                    <span>{community.members.toLocaleString()} members</span>
                                    <span className="mx-2">•</span>
                                    <Badge variant="outline" className="text-white border-white/40 bg-white/10 backdrop-blur-sm">
                                      {community.category}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="absolute top-3 left-3">
                              <Badge className="bg-blue-600 text-white border-transparent">
                                Featured
                              </Badge>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <p className="text-muted-foreground text-sm mb-4">
                              {community.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {community.tags?.slice(0, 3).map((tag) => (
                                <Badge 
                                  key={tag} 
                                  variant="outline"
                                  className="bg-blue-50 text-blue-700 border-blue-200"
                                >
                                  #{tag}
                                </Badge>
                              ))}
                              {(community.tags?.length || 0) > 3 && (
                                <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                                  +{community.tags!.length - 3} more
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div className="text-sm text-muted-foreground">
                                <span>Last activity: {community.latestActivity}</span>
                              </div>
                              <Button
                                variant={community.isJoined ? "outline" : "default"}
                                className={
                                  community.isJoined
                                    ? "border-blue-200 text-blue-700 hover:bg-blue-50"
                                    : "bg-blue-600 hover:bg-blue-700"
                                }
                                onClick={() => handleJoinCommunity(community.id, community.isJoined)}
                              >
                                {community.isJoined ? "Joined" : "Join Community"}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                </div>
              </div>
            )}
            
            {/* All Communities */}
            <div>
              <h2 className="text-2xl font-bold mb-6">
                {selectedCategory === "all" ? "Browse Communities" : `${selectedCategory} Communities`}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCommunities.map((community) => (
                  <motion.div
                    key={community.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden border-blue-100 hover:shadow-md transition-shadow h-full">
                      <div className="relative h-32">
                        <img 
                          src={community.coverImage} 
                          alt={community.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-3 text-white">
                          <Badge variant="outline" className="text-white border-white/40 bg-white/10 backdrop-blur-sm">
                            {community.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardContent className="p-4 pt-6 relative">
                        <div className="absolute -top-8 left-4">
                          <img 
                            src={community.profileImage} 
                            alt={community.name} 
                            className="h-14 w-14 rounded-full border-4 border-white"
                          />
                        </div>
                        
                        <div className="pt-2">
                          <h3 className="font-bold text-lg mb-1 flex items-center justify-between">
                            <span>{community.name}</span>
                            {community.isModerated && (
                              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs">
                                Moderated
                              </Badge>
                            )}
                          </h3>
                          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                            {community.description}
                          </p>
                          
                          <div className="flex justify-between text-sm mb-4">
                            <span className="flex items-center text-muted-foreground">
                              <Users className="h-4 w-4 mr-1" />
                              {community.members.toLocaleString()}
                            </span>
                            <span className="flex items-center text-muted-foreground">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              {community.posts.toLocaleString()}
                            </span>
                            <span className="flex items-center text-muted-foreground">
                              <Clock className="h-4 w-4 mr-1" />
                              {community.latestActivity}
                            </span>
                          </div>
                        </div>
                        
                        <Button
                          className={`w-full ${
                            community.isJoined
                              ? "bg-transparent border border-blue-200 text-blue-700 hover:bg-blue-50"
                              : "bg-blue-600 hover:bg-blue-700"
                          }`}
                          onClick={() => handleJoinCommunity(community.id, community.isJoined)}
                        >
                          {community.isJoined ? "Joined" : "Join Community"}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="my-communities" className="space-y-6">
            {joinedCommunities.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {joinedCommunities.map((community) => (
                  <motion.div
                    key={community.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden border-blue-100 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                          <img 
                            src={community.coverImage} 
                            alt={community.name} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r" />
                          <div className="absolute bottom-0 left-0 p-4 md:p-6 flex items-end">
                            <div className="mr-4">
                              <img 
                                src={community.profileImage} 
                                alt={community.name} 
                                className="h-16 w-16 rounded-full border-4 border-white"
                              />
                            </div>
                            <div className="text-white">
                              <h3 className="font-bold text-xl">{community.name}</h3>
                              <div className="flex items-center text-sm text-white/80">
                                <Users className="h-4 w-4 mr-1" />
                                <span>{community.members.toLocaleString()} members</span>
                                <span className="mx-2">•</span>
                                <Badge variant="outline" className="text-white border-white/40 bg-white/10 backdrop-blur-sm">
                                  {community.category}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6 flex-1">
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              <div className="flex justify-between mb-4">
                                <div className="text-sm text-muted-foreground">
                                  <span>Last activity: {community.latestActivity}</span>
                                </div>
                                <Button
                                  variant="outline"
                                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                                  onClick={() => handleJoinCommunity(community.id, true)}
                                >
                                  Leave Community
                                </Button>
                              </div>
                              
                              {community.events && community.events.length > 0 && (
                                <div className="mb-4">
                                  <h4 className="font-medium text-blue-700 mb-2 flex items-center">
                                    <Calendar className="h-4 w-4 mr-1.5" />
                                    Upcoming Events
                                  </h4>
                                  <div className="space-y-2">
                                    {community.events.map((event) => (
                                      <div 
                                        key={event.id}
                                        className="p-2 rounded-md bg-blue-50 border border-blue-100"
                                      >
                                        <div className="flex justify-between items-start">
                                          <div>
                                            <h5 className="font-medium text-blue-800">{event.title}</h5>
                                            <p className="text-xs text-blue-600">{event.date} • {event.participants} participants</p>
                                          </div>
                                          <Button variant="ghost" size="sm" className="h-8 text-blue-700 hover:bg-blue-100">
                                            Join
                                          </Button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {community.discussions && community.discussions.length > 0 && (
                                <div>
                                  <h4 className="font-medium text-blue-700 mb-2 flex items-center">
                                    <MessageCircle className="h-4 w-4 mr-1.5" />
                                    Active Discussions
                                  </h4>
                                  <div className="space-y-2">
                                    {community.discussions.map((discussion) => (
                                      <div 
                                        key={discussion.id}
                                        className="p-2 rounded-md border border-gray-100 hover:bg-gray-50 transition-colors"
                                      >
                                        <div className="flex justify-between">
                                          <div className="flex gap-2">
                                            <Avatar className="h-8 w-8">
                                              <AvatarImage src={discussion.author.avatar} />
                                              <AvatarFallback>{discussion.author.name.substring(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                              <h5 className="font-medium text-sm line-clamp-1">{discussion.title}</h5>
                                              <p className="text-xs text-muted-foreground">
                                                {discussion.author.name} • {discussion.lastActivity}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span className="flex items-center">
                                              <MessageCircle className="h-3 w-3 mr-1" />
                                              {discussion.replies}
                                            </span>
                                            <span className="flex items-center">
                                              <Heart className="h-3 w-3 mr-1" />
                                              {discussion.likes}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex justify-between items-center mt-4 pt-4 border-t">
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="rounded-full border-blue-200 text-blue-700">
                                  <Bell className="h-4 w-4 mr-1.5" />
                                  Notifications
                                </Button>
                                <Button variant="outline" size="sm" className="rounded-full border-blue-200 text-blue-700">
                                  <Settings className="h-4 w-4 mr-1.5" />
                                  Settings
                                </Button>
                              </div>
                              <Button className="rounded-full bg-blue-600 hover:bg-blue-700">
                                <Play className="h-4 w-4 mr-1.5" />
                                Visit Community
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-blue-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">You haven't joined any communities yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Communities are great places to connect with other writers and readers who share your interests.
                </p>
                <Button 
                  className="rounded-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => setSelectedTab("discover")}
                >
                  Discover Communities
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="feed" className="space-y-6">
            {joinedCommunities.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {feedPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden border-blue-100 hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={post.author.avatar} />
                              <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{post.author.name}</p>
                              <p className="text-xs text-muted-foreground flex items-center">
                                <span>in</span>
                                <Link to="#" className="font-medium text-blue-600 hover:underline ml-1">{post.community.name}</Link>
                                <span className="mx-1">•</span>
                                <span>{post.timestamp}</span>
                              </p>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]">
                              <DropdownMenuItem>
                                <Bell className="mr-2 h-4 w-4" />
                                <span>Follow Author</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="mr-2 h-4 w-4" />
                                <span>Share Post</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Report Post</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-2">
                        {post.contentType === 'text' && (
                          <p className="text-sm mb-4">{post.content}</p>
                        )}
                        
                        {post.contentType === 'story' && post.storyPreview && (
                          <div className="border rounded-md overflow-hidden mb-4">
                            <div className="relative h-40">
                              <img 
                                src={post.storyPreview.coverImage} 
                                alt={post.storyPreview.title} 
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                                <div className="p-4 text-white">
                                  <Badge className="bg-blue-600 text-white border-none mb-2">
                                    Story Preview
                                  </Badge>
                                  <h3 className="font-bold text-xl">{post.storyPreview.title}</h3>
                                </div>
                              </div>
                            </div>
                            <div className="p-4 bg-blue-50 border-t">
                              <p className="text-sm italic text-blue-800">"{post.storyPreview.excerpt}"</p>
                              <div className="flex justify-between items-center mt-3">
                                <p className="text-xs text-muted-foreground">{post.content}</p>
                                <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700">
                                  Read Full Story
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {post.contentType === 'image' && post.images && (
                          <div className="mb-4">
                            <p className="text-sm mb-3">{post.content}</p>
                            <div className={`grid ${post.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-2`}>
                              {post.images.map((image, index) => (
                                <div key={index} className="rounded-md overflow-hidden">
                                  <img 
                                    src={image} 
                                    alt={`Image ${index + 1}`}
                                    className="w-full h-48 object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center pt-2">
                          <div className="flex gap-3">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className={`h-8 gap-1.5 ${post.isLiked ? 'text-red-600' : 'text-muted-foreground'}`}
                              onClick={() => handleLikePost(post.id, post.isLiked)}
                            >
                              <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                              <span>{post.likes}</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 gap-1.5 text-muted-foreground"
                            >
                              <MessageCircle className="h-4 w-4" />
                              <span>{post.comments}</span>
                            </Button>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-muted-foreground">
                            <Share2 className="h-4 w-4" />
                            <span>Share</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-blue-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Your community feed is empty</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Join communities to see posts from other members and participate in discussions.
                </p>
                <Button 
                  className="rounded-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => setSelectedTab("discover")}
                >
                  Discover Communities
                </Button>
              </div>
            )}
          </TabsContent>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Communities;
