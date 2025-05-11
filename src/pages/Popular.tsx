
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StoryGrid from "../components/StoryGrid";
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import { 
  BookOpen, Filter, TrendingUp, Clock, 
  Calendar, Star, Sparkles, Award 
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import QuickSearchDialog from "@/components/search/QuickSearchDialog";

const Popular = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("week");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, we would fetch data from an API
    // This is mockup data for demonstration
    const fetchStories = async () => {
      // Simulate API request
      setTimeout(() => {
        setStories([
          {
            id: "1",
            title: "The Last Wizard",
            author: "MagicScribe",
            authorId: "user123",
            cover: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=500",
            genre: "Fantasy",
            excerpt: "In a world where magic is fading, one wizard stands against the darkness...",
            rating: 4.8,
            likes: 12453,
            reads: 45291,
            tags: ["Magic", "Adventure", "Mystery"]
          },
          {
            id: "2",
            title: "Starship Chronicles",
            author: "CosmicWriter",
            authorId: "user456",
            cover: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=500",
            genre: "Sci-Fi",
            excerpt: "The year is 2350. Humanity has spread across the stars, but an ancient threat looms...",
            rating: 4.6,
            likes: 9876,
            reads: 32145,
            tags: ["Space", "Adventure", "Aliens"]
          },
          {
            id: "3",
            title: "The Detective's Dilemma",
            author: "MysteryPen",
            authorId: "user789",
            cover: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=500",
            genre: "Mystery",
            excerpt: "When the city's most notorious criminal resurfaces, Detective Sarah must face her past...",
            rating: 4.7,
            likes: 8765,
            reads: 28976,
            tags: ["Crime", "Mystery", "Detective"]
          },
          {
            id: "4",
            title: "Love in Paris",
            author: "RomanticSoul",
            authorId: "user101",
            cover: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=500",
            genre: "Romance",
            excerpt: "Two strangers meet by chance on a rainy evening in Montmartre...",
            rating: 4.5,
            likes: 7654,
            reads: 23456,
            tags: ["Romance", "Paris", "Adventure"]
          },
          {
            id: "5",
            title: "The Haunted Mansion",
            author: "FrightWriter",
            authorId: "user202",
            cover: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=500",
            genre: "Horror",
            excerpt: "The old Blackwood estate has stood empty for decades, until now...",
            rating: 4.3,
            likes: 6543,
            reads: 19876,
            tags: ["Horror", "Haunted", "Mystery"]
          },
          {
            id: "6",
            title: "Dragon Kingdom",
            author: "DragonTamer",
            authorId: "user303",
            cover: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=500",
            genre: "Fantasy",
            excerpt: "The five dragon kingdoms have maintained peace for centuries, until the fire dragons broke the ancient pact...",
            rating: 4.9,
            likes: 15678,
            reads: 52345,
            tags: ["Dragons", "Fantasy", "Adventure"]
          },
          {
            id: "7",
            title: "Cyberpunk Nights",
            author: "NeonWriter",
            authorId: "user404",
            cover: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=500",
            genre: "Sci-Fi",
            excerpt: "In Neo Tokyo, information is power and hackers are the new royalty...",
            rating: 4.7,
            likes: 10987,
            reads: 38765,
            tags: ["Cyberpunk", "Future", "Dystopian"]
          },
          {
            id: "8",
            title: "The Lost Temple",
            author: "AdventureSeeker",
            authorId: "user505",
            cover: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=500",
            genre: "Adventure",
            excerpt: "Deep in the Amazon jungle lies a temple that hasn't been seen by human eyes for a thousand years...",
            rating: 4.8,
            likes: 9876,
            reads: 31245,
            tags: ["Adventure", "Archaeology", "Mystery"]
          }
        ]);
        setLoading(false);
      }, 1000);
    };

    fetchStories();
  }, [timeframe]);
  
  const getTopCategories = () => {
    return [
      { 
        name: "Fantasy", 
        count: 2456,
        icon: <Sparkles className="h-5 w-5 text-amber-500" />,
        color: "bg-amber-500/10 text-amber-600"
      },
      { 
        name: "Science Fiction", 
        count: 1873,
        icon: <Star className="h-5 w-5 text-cyan-500" />,
        color: "bg-cyan-500/10 text-cyan-600"
      },
      { 
        name: "Romance", 
        count: 1541,
        icon: <Award className="h-5 w-5 text-rose-500" />,
        color: "bg-rose-500/10 text-rose-600"
      },
      { 
        name: "Mystery", 
        count: 1327,
        icon: <Filter className="h-5 w-5 text-indigo-500" />,
        color: "bg-indigo-500/10 text-indigo-600"
      }
    ];
  };
  
  const getTopAuthors = () => {
    return [
      {
        name: "DragonTamer",
        avatar: "https://ui-avatars.com/api/?name=Dragon+Tamer&background=6366f1&color=fff",
        storiesCount: 32,
        followers: 12453
      },
      {
        name: "MagicScribe",
        avatar: "https://ui-avatars.com/api/?name=Magic+Scribe&background=8b5cf6&color=fff",
        storiesCount: 28,
        followers: 10987
      },
      {
        name: "AdventureSeeker",
        avatar: "https://ui-avatars.com/api/?name=Adventure+Seeker&background=ec4899&color=fff",
        storiesCount: 24,
        followers: 9876
      }
    ];
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Popular Stories</h1>
            <p className="text-muted-foreground">Discover the most read and loved stories on our platform</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-3">
            <Tabs value={timeframe} onValueChange={setTimeframe} className="w-full md:w-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="day" className="text-xs md:text-sm">Today</TabsTrigger>
                <TabsTrigger value="week" className="text-xs md:text-sm">This Week</TabsTrigger>
                <TabsTrigger value="month" className="text-xs md:text-sm">This Month</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden md:flex"
              onClick={() => setIsSearchOpen(true)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Advanced Search
            </Button>
          </div>
        </div>
        
        <Separator className="mb-8" />
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Featured Story with Statistics */}
            <div className="mb-12 bg-gradient-to-r from-purple-900/40 to-purple-800/20 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="bg-primary/10 text-primary font-semibold">
                      <Star className="h-3 w-3 mr-1" />
                      #1 Most Popular
                    </Badge>
                    <Badge variant="secondary">Fantasy</Badge>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold">{stories[0].title}</h2>
                  
                  <p className="text-muted-foreground">{stories[0].excerpt}</p>
                  
                  <div className="flex items-center gap-2">
                    <img 
                      src="https://ui-avatars.com/api/?name=Dragon+Tamer&background=6366f1&color=fff" 
                      alt="Author" 
                      className="w-8 h-8 rounded-full" 
                    />
                    <span>By {stories[0].author}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {stories[0].tags?.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="bg-muted/50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 mt-4">
                    <Button className="bg-primary hover:bg-primary/90">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Read Story
                    </Button>
                    <Button variant="outline">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      View Stats
                    </Button>
                  </div>
                </div>
                
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src={stories[0].cover} 
                    alt={stories[0].title}
                    className="object-cover w-full h-full transition-transform hover:scale-105 duration-700"
                  />
                  <div className="absolute bottom-0 left-0 right-0 grid grid-cols-3 divide-x bg-background/80 backdrop-blur-sm">
                    <div className="p-3 text-center">
                      <div className="text-lg font-bold">{(stories[0].rating * 100 / 5).toFixed(0)}%</div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                    <div className="p-3 text-center">
                      <div className="text-lg font-bold">{Math.floor(stories[0].likes / 1000)}K</div>
                      <div className="text-xs text-muted-foreground">Likes</div>
                    </div>
                    <div className="p-3 text-center">
                      <div className="text-lg font-bold">{Math.floor(stories[0].reads / 1000)}K</div>
                      <div className="text-xs text-muted-foreground">Reads</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Popular Categories */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold border-l-4 border-primary pl-3">Popular Categories</h3>
                <div className="space-y-3">
                  {getTopCategories().map((category, idx) => (
                    <div 
                      key={idx}
                      onClick={() => navigate(`/browse?category=${category.name}`)}
                      className="flex items-center justify-between p-3 rounded-lg border hover:border-primary/50 hover:shadow-sm cursor-pointer transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-md ${category.color}`}>
                          {category.icon}
                        </div>
                        <div>
                          <p className="font-medium">{category.name}</p>
                          <p className="text-xs text-muted-foreground">{category.count} stories</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <BookOpen className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Popular Authors */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold border-l-4 border-primary pl-3">Top Authors</h3>
                <div className="space-y-3">
                  {getTopAuthors().map((author, idx) => (
                    <div 
                      key={idx}
                      onClick={() => navigate(`/profile/${author.name}`)}
                      className="flex items-center justify-between p-3 rounded-lg border hover:border-primary/50 hover:shadow-sm cursor-pointer transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={author.avatar}
                          alt={author.name}
                          className="w-10 h-10 rounded-full border-2 border-primary/20"
                        />
                        <div>
                          <p className="font-medium">{author.name}</p>
                          <p className="text-xs text-muted-foreground">{author.storiesCount} stories • {author.followers} followers</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <User className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Stats Card */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold border-l-4 border-primary pl-3">Trending Stats</h3>
                <Card className="overflow-hidden">
                  <CardHeader className="bg-primary/10 pb-2">
                    <CardTitle className="text-lg">Top Performing Stories</CardTitle>
                    <CardDescription>Weekly reader engagement</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Fantasy</span>
                          <span className="font-medium">48%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: "48%" }}></div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Science Fiction</span>
                          <span className="font-medium">32%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: "32%" }}></div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Mystery</span>
                          <span className="font-medium">16%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: "16%" }}></div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Romance</span>
                          <span className="font-medium">14%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-rose-500 rounded-full" style={{ width: "14%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Button 
                  className="w-full" 
                  variant="outline" 
                  onClick={() => navigate('/trending')}
                >
                  View Detailed Analytics
                </Button>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <StoryGrid title="Most Popular Stories" stories={stories} />
              </div>
              
              <div className="text-center mt-12">
                <p className="text-muted-foreground mb-4">Looking for more great stories?</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    variant="outline" 
                    className="rounded-full"
                    onClick={() => navigate('/browse')}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Explore More Stories
                  </Button>
                  <Button 
                    className="rounded-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => navigate('/trending')}
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View Trending
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Quick Search Dialog */}
            <QuickSearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Popular;
