
import { useState } from "react";
import { 
  BarChart3, 
  BookOpen, 
  Star, 
  TrendingUp, 
  Users, 
  BookText, 
  Heart, 
  MessagesSquare, 
  Eye
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { 
      title: "Total Stories", 
      value: "23", 
      change: "+5", 
      icon: BookText,
      description: "You have 23 stories published"
    },
    { 
      title: "Total Readers", 
      value: "14.5k", 
      change: "+12%", 
      icon: Eye,
      description: "14,532 people read your stories"
    },
    { 
      title: "Favorites", 
      value: "2.3k", 
      change: "+18%", 
      icon: Heart,
      description: "2,342 favorites across all stories"
    },
    { 
      title: "Comments", 
      value: "768", 
      change: "+7%", 
      icon: MessagesSquare,
      description: "768 comments on your publications"
    }
  ];

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

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Dashboard Header */}
      <div className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-indigo-900/20 hero-pattern"></div>
        <div className="container relative z-10 py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2">Author Dashboard</h1>
          <p className="text-muted-foreground max-w-2xl">
            Track your writing performance, manage your stories, and connect with your readers.
          </p>
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
              <Button size="sm">
                New Story
              </Button>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="dashboard-card overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{stat.title}</CardTitle>
                      <div className="p-1.5 rounded-full bg-muted">
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
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
                  <Button size="sm" variant="outline" className="w-full">Continue Writing</Button>
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
              <CardHeader>
                <CardTitle>Stories Management</CardTitle>
                <CardDescription>Manage your published and draft stories</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Stories content will be displayed here</p>
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
