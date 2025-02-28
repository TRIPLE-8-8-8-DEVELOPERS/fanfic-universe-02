
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  AreaChart, 
  ArrowUp, 
  BookOpen, 
  ChevronDown, 
  Clock, 
  Filter, 
  Flame, // Replaced Fire with Flame which is available in lucide-react
  Heart, 
  LineChart, 
  PieChart, 
  Star, 
  TrendingUp, 
  Users 
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RPieChart,
  Pie,
  Cell,
  LineChart as RLineChart,
  Line
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoryCard from "@/components/StoryCard";
import { useToast } from "@/components/ui/use-toast";

interface Story {
  id: string;
  title: string;
  author: string;
  authorId: string;
  cover: string;
  genre: string;
  excerpt: string;
  rating: number;
  likes: number;
  reads: number;
  trendingRank?: number;
  changeDirection?: 'up' | 'down' | 'stable';
  changePercent?: number;
  published?: string;
  comments?: number;
}

interface TrendingCategory {
  id: string;
  name: string;
  icon: any;
  count: number;
  percentChange: number;
  color: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Trending = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("weekly");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedTab, setSelectedTab] = useState("stories");
  const { toast } = useToast();
  
  // Mock trending data for demonstration
  const trendingStories: Story[] = [
    {
      id: "story1",
      title: "The Midnight Chronicles",
      author: "Alexandra Rivers",
      authorId: "author1",
      cover: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      genre: "Fantasy",
      excerpt: "In a world where darkness falls at midnight and doesn't lift until noon the next day, a young witch discovers she can manipulate the shadows.",
      rating: 4.8,
      likes: 1254,
      reads: 5621,
      trendingRank: 1,
      changeDirection: 'up',
      changePercent: 32,
      published: "3 days ago",
      comments: 147
    },
    {
      id: "story2",
      title: "Echoes of Tomorrow",
      author: "Marcus Chen",
      authorId: "author2",
      cover: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1772&q=80",
      genre: "Sci-Fi",
      excerpt: "A scientist creates a device that can hear echoes of sounds from the future, but what he hears threatens the fabric of time itself.",
      rating: 4.7,
      likes: 987,
      reads: 4329,
      trendingRank: 2,
      changeDirection: 'up',
      changePercent: 18,
      published: "1 week ago",
      comments: 89
    },
    {
      id: "story3",
      title: "The Last Detective",
      author: "Sophia Morgan",
      authorId: "author3",
      cover: "https://images.unsplash.com/photo-1588514727390-91fd5ebaef81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG15c3Rlcnl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      genre: "Mystery",
      excerpt: "In a world where crimes are solved by AI, the last human detective is called in when the AI systems themselves become victims.",
      rating: 4.6,
      likes: 856,
      reads: 3978,
      trendingRank: 3,
      changeDirection: 'down',
      changePercent: 5,
      published: "2 weeks ago",
      comments: 112
    },
    {
      id: "story4",
      title: "Heartstrings",
      author: "Daniel Jackson",
      authorId: "author4",
      cover: "https://images.unsplash.com/photo-1501901609772-df0848060b33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGxvdmV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      genre: "Romance",
      excerpt: "A musician who can hear the emotions of others in musical notes meets someone whose feelings are a symphony he can't decode.",
      rating: 4.5,
      likes: 721,
      reads: 3254,
      trendingRank: 4,
      changeDirection: 'up',
      changePercent: 12,
      published: "5 days ago",
      comments: 78
    },
    {
      id: "story5",
      title: "Shadow Academy",
      author: "Emma Wright",
      authorId: "author5",
      cover: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZGFya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      genre: "YA Fantasy",
      excerpt: "A school for gifted teenagers harbors a dark secret beneath its prestigious facade, and one student is determined to expose it.",
      rating: 4.4,
      likes: 654,
      reads: 2987,
      trendingRank: 5,
      changeDirection: 'up',
      changePercent: 8,
      published: "1 week ago",
      comments: 93
    },
    {
      id: "story6",
      title: "The Inheritance of Memory",
      author: "Robert James",
      authorId: "author6",
      cover: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGlzdG9yeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      genre: "Historical Fiction",
      excerpt: "Following the discovery of an ancient journal, a historian uncovers a family secret that rewrites the history of the 18th century.",
      rating: 4.3,
      likes: 587,
      reads: 2543,
      trendingRank: 6,
      changeDirection: 'stable',
      changePercent: 0,
      published: "3 weeks ago",
      comments: 65
    }
  ];
  
  const trendingAuthors = [
    {
      id: "author1",
      name: "Alexandra Rivers",
      avatar: "https://i.pravatar.cc/150?img=1",
      genre: "Fantasy",
      followers: 12500,
      stories: 24,
      changeDirection: 'up',
      changePercent: 25,
      latestStory: "The Midnight Chronicles"
    },
    {
      id: "author7",
      name: "Julian Black",
      avatar: "https://i.pravatar.cc/150?img=8",
      genre: "Horror",
      followers: 9800,
      stories: 18,
      changeDirection: 'up',
      changePercent: 20,
      latestStory: "Whispers in the Dark"
    },
    {
      id: "author2",
      name: "Marcus Chen",
      avatar: "https://i.pravatar.cc/150?img=3",
      genre: "Sci-Fi",
      followers: 8900,
      stories: 15,
      changeDirection: 'up',
      changePercent: 15,
      latestStory: "Echoes of Tomorrow"
    },
    {
      id: "author3",
      name: "Sophia Morgan",
      avatar: "https://i.pravatar.cc/150?img=5",
      genre: "Mystery",
      followers: 7600,
      stories: 12,
      changeDirection: 'down',
      changePercent: 3,
      latestStory: "The Last Detective"
    },
    {
      id: "author8",
      name: "Olivia Chen",
      avatar: "https://i.pravatar.cc/150?img=9",
      genre: "Contemporary",
      followers: 6900,
      stories: 9,
      changeDirection: 'up',
      changePercent: 10,
      latestStory: "City of Glass"
    }
  ];
  
  const trendingCategories: TrendingCategory[] = [
    { id: "cat1", name: "Fantasy", icon: Flame, count: 1245, percentChange: 15, color: "#0088FE" }, // Changed from Fire to Flame
    { id: "cat2", name: "Science Fiction", icon: Star, count: 982, percentChange: 8, color: "#00C49F" },
    { id: "cat3", name: "Mystery", icon: Heart, count: 876, percentChange: 5, color: "#FFBB28" },
    { id: "cat4", name: "Romance", icon: Heart, count: 754, percentChange: 12, color: "#FF8042" },
    { id: "cat5", name: "Horror", icon: Flame, count: 543, percentChange: 20, color: "#8884d8" }, // Changed from Fire to Flame
    { id: "cat6", name: "Young Adult", icon: Users, count: 432, percentChange: 7, color: "#82ca9d" }
  ];
  
  // Chart data
  const genreDistributionData = trendingCategories.map(cat => ({
    name: cat.name,
    value: cat.count,
    color: cat.color
  }));
  
  const readerGrowthData = [
    { name: 'Jan', Fantasy: 400, 'Sci-Fi': 240, Mystery: 180, Romance: 220 },
    { name: 'Feb', Fantasy: 430, 'Sci-Fi': 300, Mystery: 230, Romance: 260 },
    { name: 'Mar', Fantasy: 450, 'Sci-Fi': 320, Mystery: 280, Romance: 290 },
    { name: 'Apr', Fantasy: 470, 'Sci-Fi': 290, Mystery: 290, Romance: 320 },
    { name: 'May', Fantasy: 540, 'Sci-Fi': 350, Mystery: 300, Romance: 340 },
    { name: 'Jun', Fantasy: 580, 'Sci-Fi': 390, Mystery: 320, Romance: 360 },
    { name: 'Jul', Fantasy: 620, 'Sci-Fi': 420, Mystery: 380, Romance: 390 },
  ];
  
  const popularityData = [
    { name: 'Week 1', likes: 240, reads: 1200, comments: 120 },
    { name: 'Week 2', likes: 300, reads: 1600, comments: 180 },
    { name: 'Week 3', likes: 350, reads: 2000, comments: 220 },
    { name: 'Week 4', likes: 420, reads: 2400, comments: 260 },
    { name: 'Week 5', likes: 500, reads: 2800, comments: 320 },
    { name: 'Week 6', likes: 580, reads: 3400, comments: 380 },
  ];
  
  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe);
    toast({
      title: "Timeframe Changed",
      description: `Viewing trending content from the ${timeframe} timeframe.`,
    });
  };
  
  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    if (genre !== "all") {
      toast({
        title: "Filter Applied",
        description: `Showing trending content in the ${genre} genre.`,
      });
    } else {
      toast({
        title: "Filter Removed",
        description: "Showing trending content across all genres.",
      });
    }
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
              Trending Now
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover what's popular in the FanFicUniverse community. Stay updated with the hottest stories, authors, and genres.
            </p>
          </motion.div>
          
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <Tabs 
              value={selectedTab} 
              onValueChange={setSelectedTab}
              className="w-full md:w-auto flex-1"
            >
              <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
                <TabsTrigger value="stories" className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>Stories</span>
                </TabsTrigger>
                <TabsTrigger value="authors" className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>Authors</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-1">
                  <LineChart className="h-4 w-4" />
                  <span>Analytics</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex flex-wrap gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-1">
                    <Clock className="h-4 w-4" />
                    <span className="capitalize">{selectedTimeframe}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[180px]">
                  <DropdownMenuItem onClick={() => handleTimeframeChange("daily")}>
                    Daily
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleTimeframeChange("weekly")}>
                    Weekly
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleTimeframeChange("monthly")}>
                    Monthly
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleTimeframeChange("yearly")}>
                    Yearly
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-1">
                    <Filter className="h-4 w-4" />
                    <span>{selectedGenre === "all" ? "All Genres" : selectedGenre}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[180px]">
                  <DropdownMenuItem onClick={() => handleGenreChange("all")}>
                    All Genres
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleGenreChange("Fantasy")}>
                    Fantasy
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleGenreChange("Sci-Fi")}>
                    Science Fiction
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleGenreChange("Mystery")}>
                    Mystery
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleGenreChange("Romance")}>
                    Romance
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleGenreChange("Horror")}>
                    Horror
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Stories Tab Content */}
          <TabsContent value="stories" className="space-y-8">
            {/* Trending Categories */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {trendingCategories.map((category) => (
                <Card 
                  key={category.id} 
                  className="overflow-hidden border-blue-100 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleGenreChange(category.name)}
                >
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-3 mt-2"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <category.icon 
                        className="h-6 w-6" 
                        style={{ color: category.color }} 
                      />
                    </div>
                    <h3 className="font-medium text-sm mb-1">{category.name}</h3>
                    <p className="text-2xl font-bold mb-1">{category.count}</p>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        category.percentChange > 0 
                          ? 'bg-green-50 text-green-700 border-green-200' 
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}
                    >
                      {category.percentChange > 0 ? (
                        <ArrowUp className="h-3 w-3 mr-1" />
                      ) : (
                        <ChevronDown className="h-3 w-3 mr-1" />
                      )}
                      {category.percentChange}%
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Hot Stories List */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Top Trending Stories</h2>
                <Link to="/browse" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingStories
                  .filter(story => selectedGenre === "all" || story.genre === selectedGenre)
                  .map((story) => (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link to={`/story/${story.id}`} className="block h-full">
                        <Card className="overflow-hidden h-full hover:shadow-md transition-shadow border-blue-100 relative">
                          {/* Trending Rank Badge */}
                          <div className="absolute top-3 left-3 z-10">
                            <Badge className="bg-blue-600 text-white border-none font-bold">
                              #{story.trendingRank}
                            </Badge>
                          </div>
                          
                          {/* Change Direction Indicator */}
                          <div className="absolute top-3 right-3 z-10">
                            <Badge 
                              variant="outline" 
                              className={`
                                ${story.changeDirection === 'up' ? 'bg-green-100 border-green-200 text-green-700' : ''}
                                ${story.changeDirection === 'down' ? 'bg-red-100 border-red-200 text-red-700' : ''}
                                ${story.changeDirection === 'stable' ? 'bg-gray-100 border-gray-200 text-gray-700' : ''}
                              `}
                            >
                              {story.changeDirection === 'up' && <ArrowUp className="h-3 w-3 mr-1" />}
                              {story.changeDirection === 'down' && <ChevronDown className="h-3 w-3 mr-1" />}
                              {story.changeDirection === 'up' ? '+' : ''}{story.changePercent}%
                            </Badge>
                          </div>
                          
                          <div className="relative h-40">
                            <img 
                              src={story.cover} 
                              alt={story.title} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                              <div className="p-4 text-white">
                                <Badge variant="outline" className="bg-black/50 text-white border-transparent backdrop-blur-sm mb-2">
                                  {story.genre}
                                </Badge>
                                <h3 className="font-bold text-lg">{story.title}</h3>
                                <p className="text-sm text-white/80">by {story.author}</p>
                              </div>
                            </div>
                          </div>
                          
                          <CardContent className="p-4">
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                              {story.excerpt}
                            </p>
                            <div className="grid grid-cols-3 gap-2 text-sm">
                              <div className="flex flex-col items-center p-2 bg-blue-50 rounded-md">
                                <Star className="h-4 w-4 text-yellow-500 mb-1" />
                                <span className="font-medium">{story.rating}</span>
                                <span className="text-xs text-muted-foreground">Rating</span>
                              </div>
                              <div className="flex flex-col items-center p-2 bg-red-50 rounded-md">
                                <Heart className="h-4 w-4 text-red-500 mb-1" />
                                <span className="font-medium">{story.likes}</span>
                                <span className="text-xs text-muted-foreground">Likes</span>
                              </div>
                              <div className="flex flex-col items-center p-2 bg-green-50 rounded-md">
                                <BookOpen className="h-4 w-4 text-green-500 mb-1" />
                                <span className="font-medium">{story.reads}</span>
                                <span className="text-xs text-muted-foreground">Reads</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Authors Tab Content */}
          <TabsContent value="authors" className="space-y-8">
            <div className="grid grid-cols-1 gap-4">
              {trendingAuthors.map((author, index) => (
                <motion.div
                  key={author.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden border-blue-100 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <Avatar className="h-16 w-16 border-2 border-blue-100">
                            <AvatarImage src={author.avatar} />
                            <AvatarFallback>{author.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="absolute -top-1 -left-1">
                            <Badge className="bg-blue-600 text-white border-none">
                              #{index + 1}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold text-lg">{author.name}</h3>
                            <Badge 
                              variant="outline" 
                              className={`
                                ${author.changeDirection === 'up' ? 'bg-green-100 border-green-200 text-green-700' : ''}
                                ${author.changeDirection === 'down' ? 'bg-red-100 border-red-200 text-red-700' : ''}
                              `}
                            >
                              {author.changeDirection === 'up' && <ArrowUp className="h-3 w-3 mr-1" />}
                              {author.changeDirection === 'down' && <ChevronDown className="h-3 w-3 mr-1" />}
                              {author.changeDirection === 'up' ? '+' : ''}{author.changePercent}%
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-1 mb-2">
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {author.genre}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              Latest: {author.latestStory}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mt-3">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                <Users className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-xl font-bold">{author.followers.toLocaleString()}</p>
                                <p className="text-xs text-muted-foreground">Followers</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
                                <BookOpen className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-xl font-bold">{author.stories}</p>
                                <p className="text-xs text-muted-foreground">Stories</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <Link to={`/author/${author.id}`}>
                          <Button className="bg-blue-600 hover:bg-blue-700 rounded-full">
                            View Profile
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          {/* Analytics Tab Content */}
          <TabsContent value="analytics" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Genre Distribution */}
              <Card className="border-blue-100">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <PieChart className="h-5 w-5 mr-2 text-blue-600" />
                    Genre Distribution
                  </CardTitle>
                  <CardDescription>
                    Popularity of genres based on story count
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RPieChart>
                        <Pie
                          data={genreDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {genreDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} stories`, 'Count']} />
                      </RPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Reader Growth */}
              <Card className="border-blue-100">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <LineChart className="h-5 w-5 mr-2 text-blue-600" />
                    Reader Growth by Genre
                  </CardTitle>
                  <CardDescription>
                    Monthly reader trends across top genres
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RLineChart
                        data={readerGrowthData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Fantasy" stroke="#0088FE" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="Sci-Fi" stroke="#00C49F" />
                        <Line type="monotone" dataKey="Mystery" stroke="#FFBB28" />
                        <Line type="monotone" dataKey="Romance" stroke="#FF8042" />
                      </RLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Engagement Metrics */}
              <Card className="border-blue-100 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <AreaChart className="h-5 w-5 mr-2 text-blue-600" />
                    Story Engagement Metrics
                  </CardTitle>
                  <CardDescription>
                    Weekly engagement trends for trending stories
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={popularityData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="likes" fill="#8884d8" name="Likes" />
                        <Bar dataKey="reads" fill="#82ca9d" name="Reads" />
                        <Bar dataKey="comments" fill="#ffc658" name="Comments" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <h3 className="text-xl font-bold text-blue-800 mb-2">Trending Insights</h3>
              <p className="text-blue-700 mb-4">
                Key observations from this {selectedTimeframe} data:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-blue-800">Fantasy Dominance</h4>
                      <p className="text-sm text-blue-600">
                        Fantasy remains the most popular genre with 15% growth since last {selectedTimeframe}.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-blue-800">Rising Authors</h4>
                      <p className="text-sm text-blue-600">
                        New authors are gaining traction faster, with a 25% increase in follower growth rate.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-blue-800">Engagement Boost</h4>
                      <p className="text-sm text-blue-600">
                        Reader comments have increased by 32%, indicating higher community engagement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Trending;
