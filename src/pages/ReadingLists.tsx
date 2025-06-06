
import React, { useState } from "react";
import { Search, Plus, BookOpen, Heart, Share2, MoreHorizontal, ListFilter, GridIcon, LayoutList } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const ReadingLists = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  // Mock data for reading lists
  const myLists = [
    {
      id: 1,
      title: "Fantasy Favorites",
      description: "My collection of epic fantasy stories with intricate world-building",
      stories: 12,
      lastUpdated: "2 days ago",
      isPublic: true,
      coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    },
    {
      id: 2,
      title: "Sci-Fi Explorations",
      description: "Space adventures and futuristic technologies that blow my mind",
      stories: 8,
      lastUpdated: "1 week ago",
      isPublic: true,
      coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    },
    {
      id: 3,
      title: "Comfort Reads",
      description: "Stories I return to when I need something familiar and cozy",
      stories: 15,
      lastUpdated: "3 days ago",
      isPublic: false,
      coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    },
  ];

  const savedLists = [
    {
      id: 4,
      title: "Award Winners 2023",
      creator: "LiteraryScout",
      description: "Collection of stories that won major awards this year",
      stories: 24,
      lastUpdated: "5 days ago",
      likes: 342,
      coverImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    },
    {
      id: 5,
      title: "Hidden Gems",
      creator: "BookExplorer",
      description: "Underrated stories that deserve more attention",
      stories: 18,
      lastUpdated: "2 weeks ago",
      likes: 156,
      coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Reading Lists</h1>
            <p className="text-muted-foreground">
              Organize your favorite stories into curated reading lists
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search lists..."
                className="pl-9 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="flex items-center gap-2 rounded-full">
              <Plus className="h-4 w-4" />
              New List
            </Button>
          </div>
        </div>

        <Tabs defaultValue="my-lists" className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <TabsList className="rounded-full">
              <TabsTrigger value="my-lists" className="rounded-full">My Lists</TabsTrigger>
              <TabsTrigger value="saved" className="rounded-full">Saved Lists</TabsTrigger>
              <TabsTrigger value="discover" className="rounded-full">Discover</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className={`h-9 w-9 rounded-full ${viewMode === 'grid' ? 'bg-primary/10' : ''}`}
                onClick={() => setViewMode("grid")}
              >
                <GridIcon className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className={`h-9 w-9 rounded-full ${viewMode === 'list' ? 'bg-primary/10' : ''}`}
                onClick={() => setViewMode("list")}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="rounded-full hidden sm:flex">
                <ListFilter className="h-4 w-4 mr-2" /> Sort
              </Button>
            </div>
          </div>

          <TabsContent value="my-lists" className="space-y-6 mt-0">
            {viewMode === 'grid' ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {myLists.map((list) => (
                  <motion.div key={list.id} variants={itemVariants}>
                    <Card key={list.id} className="overflow-hidden dashboard-card h-full">
                      <div className="relative h-48">
                        <img
                          src={list.coverImage}
                          alt={list.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="font-bold text-white text-xl mb-1">{list.title}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                              {list.stories} stories
                            </Badge>
                            {!list.isPublic && (
                              <Badge variant="outline" className="bg-white/20 text-white border-white/40 hover:bg-white/30">
                                Private
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground line-clamp-2">{list.description}</p>
                      </CardContent>
                      <CardFooter className="px-4 pb-4 pt-0 flex justify-between">
                        <span className="text-xs text-muted-foreground">Updated {list.lastUpdated}</span>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="dropdown-menu">
                              <DropdownMenuItem className="dropdown-item">Edit</DropdownMenuItem>
                              <DropdownMenuItem className="dropdown-item">{list.isPublic ? "Make Private" : "Make Public"}</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive dropdown-item">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {myLists.map((list) => (
                  <motion.div key={list.id} variants={itemVariants}>
                    <Card className="dashboard-card">
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-48 h-40 sm:h-auto">
                          <img
                            src={list.coverImage}
                            alt={list.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-bold text-xl mb-1">{list.title}</h3>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary">
                                  {list.stories} stories
                                </Badge>
                                {!list.isPublic && (
                                  <Badge variant="outline">
                                    Private
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                <Share2 className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="dropdown-menu">
                                  <DropdownMenuItem className="dropdown-item">Edit</DropdownMenuItem>
                                  <DropdownMenuItem className="dropdown-item">{list.isPublic ? "Make Private" : "Make Public"}</DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive dropdown-item">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">{list.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Updated {list.lastUpdated}</span>
                            <Button variant="outline" size="sm" className="rounded-full">
                              View List
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="saved" className="space-y-6 mt-0">
            {viewMode === 'grid' ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {savedLists.map((list) => (
                  <motion.div key={list.id} variants={itemVariants}>
                    <Card key={list.id} className="overflow-hidden dashboard-card h-full">
                      <div className="relative h-48">
                        <img
                          src={list.coverImage}
                          alt={list.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <h3 className="font-bold text-white text-xl mb-1">{list.title}</h3>
                          <p className="text-sm text-white/80 mb-1">by {list.creator}</p>
                          <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                            {list.stories} stories
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground line-clamp-2">{list.description}</p>
                      </CardContent>
                      <CardFooter className="px-4 pb-4 pt-0 flex justify-between">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4 text-pink-500 fill-pink-500" />
                          <span className="text-xs text-muted-foreground">{list.likes}</span>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <BookOpen className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {savedLists.map((list) => (
                  <motion.div key={list.id} variants={itemVariants}>
                    <Card className="dashboard-card">
                      <div className="flex flex-col sm:flex-row">
                        <div className="w-full sm:w-48 h-40 sm:h-auto">
                          <img
                            src={list.coverImage}
                            alt={list.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-bold text-xl mb-1">{list.title}</h3>
                              <p className="text-sm text-muted-foreground mb-2">by {list.creator}</p>
                              <Badge variant="secondary">
                                {list.stories} stories
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                <Heart className="h-4 w-4 text-pink-500 fill-pink-500" />
                                <span className="text-xs text-muted-foreground">{list.likes}</span>
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">{list.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">Updated {list.lastUpdated}</span>
                            <Button variant="outline" size="sm" className="rounded-full">
                              <BookOpen className="h-4 w-4 mr-2" /> Read List
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="discover" className="space-y-6 mt-0">
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">Discover Reading Lists</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-4">
                Find curated reading lists from the community based on your preferences
              </p>
              <Button className="rounded-full">Browse Popular Lists</Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Dashboard Analytics Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6 font-serif">Your Reading Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="dashboard-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Stories Read</h3>
                  <Badge variant="outline" className="rounded-full">This Month</Badge>
                </div>
                <p className="dashboard-stat">42</p>
                <p className="dashboard-stat-label">+8 from last month</p>
              </CardContent>
            </Card>
            
            <Card className="dashboard-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Reading Lists</h3>
                  <Badge variant="outline" className="rounded-full">Total</Badge>
                </div>
                <p className="dashboard-stat">8</p>
                <p className="dashboard-stat-label">3 public, 5 private</p>
              </CardContent>
            </Card>
            
            <Card className="dashboard-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Favorite Genre</h3>
                  <Badge variant="outline" className="rounded-full">Based on Reading</Badge>
                </div>
                <p className="dashboard-stat">Fantasy</p>
                <p className="dashboard-stat-label">65% of your reading</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ReadingLists;
