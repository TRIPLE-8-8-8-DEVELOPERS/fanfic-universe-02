import { useState, useEffect } from "react";
import { 
  BarChart3, 
  BookOpen, 
  Star, 
  TrendingUp, 
  Users, 
  BookText, 
  Heart, 
  MessagesSquare, 
  Eye,
  Search,
  Pencil,
  Filter,
  Clock,
  PenSquare,
  BookMarked,
  BookOpenCheck,
  Sparkles,
  BellRing
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { getUserStories } from "@/integrations/supabase/services/stories";
import { useQuery } from "@tanstack/react-query";
import StoryCard from "@/components/StoryCard";
import { Spinner } from "@/components/ui/spinner";
import { showReadingProgressNotification } from "@/components/reading/ReadingProgressNotification";
import { useReadingTimer } from "@/hooks/use-reading-time";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  // Simulate a reading milestone achieved (for demonstration)
  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        showReadingProgressNotification({
          type: 'milestone',
          storyTitle: 'The Last Guardian',
          progressValue: 50
        });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const stats = [
    { 
      title: "Total Stories", 
      value: "23", 
      change: "+5", 
      icon: BookText,
      description: "You have 23 stories published",
      color: "blue"
    },
    { 
      title: "Total Readers", 
      value: "14.5k", 
      change: "+12%", 
      icon: Eye,
      description: "14,532 people read your stories",
      color: "green"
    },
    { 
      title: "Favorites", 
      value: "2.3k", 
      change: "+18%", 
      icon: Heart,
      description: "2,342 favorites across all stories",
      color: "red"
    },
    { 
      title: "Reading Time", 
      value: "768h", 
      change: "+7%", 
      icon: Clock,
      description: "Total time readers spent on your stories",
      color: "amber"
    }
  ];

  // Fetch user stories
  const { data: userStories, isLoading, error } = useQuery({
    queryKey: ['userStories', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await getUserStories(user.id);
      if (error) {
        console.error("Error fetching user stories:", error);
        toast("Failed to load your stories");
        return [];
      }
      return data || [];
    },
    enabled: !!user
  });

  // Filter stories based on search term
  const filteredStories = userStories ? userStories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  // Navigate to write page
  const handleNewStory = () => {
    navigate('/write');
  };

  // Demo reading features
  const { startTracking, stopTracking } = useReadingTimer("demo-story-id", 60);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Dashboard Header */}
      <div className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 hero-pattern"></div>
        <div className="container relative z-10 py-8 md:py-12">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2">Author Dashboard</h1>
              <p className="text-muted-foreground max-w-2xl">
                Track your writing performance, manage your stories, and connect with your readers.
              </p>
            </div>
            
            <Button 
              size="lg" 
              className="rounded-full px-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md hover-lift"
              onClick={handleNewStory}
            >
              <Pencil className="h-5 w-5 mr-2" />
              Start Writing Now
            </Button>
          </div>
        </div>
      </div>

      {/* Featured "Write" Button Section */}
      <div className="container mt-6">
        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Ready to Write Your Next Masterpiece?</h2>
              <p className="text-muted-foreground mb-4">
                Start creating your next story, continue working on drafts, or get AI assistance with your writing.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  size="lg"
                  onClick={handleNewStory}
                >
                  <PenSquare className="h-5 w-5 mr-2" />
                  Create New Story
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate('/write')}>
                  <BookText className="h-5 w-5 mr-2" />
                  Continue Draft
                </Button>
                <Button variant="secondary" size="lg" onClick={() => navigate('/write')}>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Get AI Assistance
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -top-6 -right-6">
                  <Sparkles className="h-12 w-12 text-indigo-500 opacity-40" />
                </div>
                <Pencil className="h-32 w-32 text-indigo-500/50" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="container py-8">
        <Tabs 
          defaultValue="overview" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <TabsList className="grid grid-cols-4 md:w-auto w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="stories">Stories</TabsTrigger>
              <TabsTrigger value="readers">Readers</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <div className="hidden md:flex space-x-2">
              <Button variant="outline" size="sm">
                Export Data
              </Button>
              <Button size="sm" onClick={handleNewStory}>
                <Pencil className="h-4 w-4 mr-2" /> New Story
              </Button>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="dashboard-card overflow-hidden hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{stat.title}</CardTitle>
                      <div className={`p-1.5 rounded-full bg-${stat.color}-500/10`}>
                        <stat.icon className={`h-4 w-4 text-${stat.color}-500`} />
                      </div>
                    </div>
                    <CardDescription>{stat.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change} from last month
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Reading Tracking Demo */}
            <Card className="border-2 border-indigo-500/20 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpenCheck className="h-5 w-5 mr-2 text-indigo-500" />
                  Reading Progress Features
                </CardTitle>
                <CardDescription>
                  Track reader engagement with your stories using our new reading progress features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center mb-2">
                      <BookMarked className="h-5 w-5 mr-2 text-indigo-500" />
                      <h3 className="font-medium">Reading Progress Tracking</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Track how far readers have progressed in your stories
                    </p>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 mr-2 text-indigo-500" />
                      <h3 className="font-medium">Reading Time Analytics</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Measure how much time readers spend on each chapter
                    </p>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center mb-2">
                      <BellRing className="h-5 w-5 mr-2 text-indigo-500" />
                      <h3 className="font-medium">Progress Notifications</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Celebrate milestones with custom notifications
                    </p>
                  </div>
                </div>
                <div className="flex justify-center space-x-4 pt-2">
                  <Button variant="outline" onClick={() => {
                    startTracking();
                    toast("Started tracking reading time");
                  }}>
                    Start Demo
                  </Button>
                  <Button variant="outline" onClick={() => {
                    stopTracking();
                    showReadingProgressNotification({
                      type: 'chapter_complete',
                      storyTitle: 'Demo Story'
                    });
                  }}>
                    Complete Chapter
                  </Button>
                  <Button variant="outline" onClick={() => {
                    showReadingProgressNotification({
                      type: 'book_complete',
                      storyTitle: 'Demo Story'
                    });
                  }}>
                    Complete Book
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Search Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Search Your Stories
                </CardTitle>
                <CardDescription>
                  Find stories by title, content, or tags
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search your stories..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>

                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <Spinner size="lg" />
                  </div>
                ) : error ? (
                  <div className="py-8 text-center">
                    <p className="text-destructive">Failed to load stories. Please try again later.</p>
                  </div>
                ) : filteredStories.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">
                      {searchTerm ? "No stories match your search" : "You haven't created any stories yet"}
                    </p>
                    <Button 
                      className="mt-4"
                      onClick={handleNewStory}
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Create Your First Story
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredStories.slice(0, 4).map((story) => (
                      <div key={story.id} className="border rounded p-3 flex flex-col space-y-2">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{story.title}</h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${story.is_published ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                            {story.is_published ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {story.summary || "No summary provided"}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-xs text-muted-foreground">
                            {new Date(story.created_at).toLocaleDateString()}
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/write?id=${story.id}`)}>
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              {filteredStories.length > 4 && (
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full" onClick={() => setActiveTab("stories")}>
                    View All Stories
                  </Button>
                </CardFooter>
              )}
            </Card>

            {/* Engagement Summary & Top Stories */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Activity Feed */}
              <Card className="dashboard-card lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest interactions with your stories</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[280px] pr-4">
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start space-x-4 pb-4 last:pb-0 border-b last:border-0">
                          <div className={`w-2 h-2 mt-2 rounded-full bg-gradient-to-r ${randomGradients[index % randomGradients.length]}`}></div>
                          <div>
                            <p className="text-sm font-medium">{activity.action}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">View All Activity</Button>
                </CardFooter>
              </Card>

              {/* Top Stories */}
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle>Top Stories</CardTitle>
                  <CardDescription>Your most popular stories</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[280px] pr-4">
                    <div className="space-y-4">
                      {topStories.map((story, index) => (
                        <div key={index} className="p-3 rounded-md bg-muted/50 hover:bg-muted transition-colors">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-medium text-sm">{story.title}</h4>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              {story.genre}
                            </span>
                          </div>
                          <div className="flex space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {story.reads}
                            </div>
                            <div className="flex items-center">
                              <Heart className="h-3 w-3 mr-1" />
                              {story.likes}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">View All Stories</Button>
                </CardFooter>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="dashboard-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Draft Stories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">You have 3 stories in draft mode ready to be published.</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="outline" className="w-full" onClick={handleNewStory}>Continue Writing</Button>
                </CardFooter>
              </Card>
              <Card className="dashboard-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Community Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Weekly challenge: "Write a story that takes place entirely at night."</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" className="w-full">Join Challenge</Button>
                </CardFooter>
              </Card>
              <Card className="dashboard-card">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Growth Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Discover 5 ways to increase engagement with your stories.</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="outline" className="w-full">View Tips</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stories" className="space-y-8">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                <div>
                  <CardTitle>Stories Management</CardTitle>
                  <CardDescription>Manage your published and draft stories</CardDescription>
                </div>
                <Button onClick={handleNewStory}>
                  <Pencil className="h-4 w-4 mr-2" />
                  New Story
                </Button>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <Spinner size="lg" />
                  </div>
                ) : error ? (
                  <div className="py-8 text-center">
                    <p className="text-destructive">Failed to load stories. Please try again later.</p>
                  </div>
                ) : filteredStories.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground mb-4">
                      {searchTerm ? "No stories match your search" : "You haven't created any stories yet"}
                    </p>
                    {!searchTerm && (
                      <Button onClick={handleNewStory}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Create Your First Story
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex gap-2 mb-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search your stories..."
                          className="pl-10"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredStories.map((story) => (
                        <div key={story.id} className="border rounded overflow-hidden group">
                          <div className="aspect-video bg-muted relative">
                            {story.cover_image ? (
                              <img 
                                src={story.cover_image} 
                                alt={story.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                <BookText className="h-10 w-10" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                              <div className="flex space-x-2">
                                <Button variant="secondary" size="sm" onClick={() => navigate(`/write?id=${story.id}`)}>
                                  Edit
                                </Button>
                                <Button variant="secondary" size="sm" onClick={() => navigate(`/story/${story.id}`)}>
                                  Preview
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="p-3">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-medium">{story.title}</h4>
                              <span className={`px-2 py-0.5 rounded-full text-xs ${story.is_published ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                                {story.is_published ? 'Published' : 'Draft'}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                              {story.summary || "No summary provided"}
                            </p>
                            <div className="text-xs text-muted-foreground mt-2">
                              {new Date(story.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="readers" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Reader Demographics</CardTitle>
                <CardDescription>Understand who's reading your content</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Reader demographics will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>Detailed insights about your stories' performance</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Analytics content will be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
const topStories = [
  { title: "The Last Guardian", reads: "5.2k", likes: "1.2k", genre: "Fantasy" },
  { title: "Beyond the Stars", reads: "3.8k", likes: "890", genre: "Sci-Fi" },
  { title: "Whispers in the Dark", reads: "2.9k", likes: "756", genre: "Horror" },
  { title: "Hearts Entwined", reads: "2.1k", likes: "620", genre: "Romance" },
  { title: "The Secret Society", reads: "1.8k", likes: "512", genre: "Mystery" }
];

const recentActivity = [
  { action: "New comment on 'The Last Guardian'", time: "10 minutes ago" },
  { action: "Story 'Beyond the Stars' reached 3.8k reads", time: "2 hours ago" },
  { action: "New follower: Sarah Williams", time: "4 hours ago" },
  { action: "Your story was featured in 'Weekly Picks'", time: "Yesterday" },
  { action: "New rating on 'Whispers in the Dark'", time: "2 days ago" }
];

const randomGradients = [
  "from-indigo-500 to-purple-500",
  "from-blue-500 to-cyan-500", 
  "from-emerald-500 to-green-500",
  "from-orange-500 to-amber-500",
  "from-pink-500 to-rose-500"
];
