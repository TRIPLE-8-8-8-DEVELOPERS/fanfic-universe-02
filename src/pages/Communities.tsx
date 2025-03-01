
import React, { useState } from "react";
import { Search, Plus, Users, Star, MessageSquare, Bookmark } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Communities = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for communities
  const popularCommunities = [
    {
      id: 1,
      name: "Fantasy Writers Circle",
      description: "A community for fantasy writers to share ideas, get feedback, and collaborate on worldbuilding.",
      members: 12430,
      posts: 5621,
      tags: ["Fantasy", "Writing", "Worldbuilding"],
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      joined: true,
    },
    {
      id: 2,
      name: "Sci-Fi Explorers",
      description: "Explore the boundaries of science fiction through collaborative storytelling and discussion.",
      members: 8965,
      posts: 3254,
      tags: ["Sci-Fi", "Futurism", "Technology"],
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      joined: false,
    },
    {
      id: 3,
      name: "Romance Readers & Writers",
      description: "For those who love creating and reading romance stories across all subgenres.",
      members: 15280,
      posts: 8937,
      tags: ["Romance", "Relationships", "Character Development"],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      joined: true,
    },
    {
      id: 4,
      name: "Mystery Crafters",
      description: "Perfecting the art of suspense, plot twists, and red herrings in mystery stories.",
      members: 6842,
      posts: 2841,
      tags: ["Mystery", "Thriller", "Crime"],
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      joined: false,
    },
    {
      id: 5,
      name: "Historical Fiction Hub",
      description: "Bringing the past to life through accurate and engaging historical fiction.",
      members: 5294,
      posts: 1932,
      tags: ["Historical", "Research", "Period Pieces"],
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      joined: false,
    },
    {
      id: 6,
      name: "Young Adult Stories",
      description: "Community focused on YA fiction, coming-of-age stories, and teen perspectives.",
      members: 9835,
      posts: 4729,
      tags: ["YA", "Coming of Age", "Teen"],
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      joined: true,
    },
  ];

  const myCommunities = popularCommunities.filter(community => community.joined);
  
  // Featured community details
  const featuredCommunity = {
    id: 7,
    name: "Worldbuilders United",
    description: "The premier community for creators who love crafting immersive fictional worlds. Share maps, cultures, magic systems, and more with fellow worldbuilders.",
    members: 24356,
    posts: 12843,
    active: "Very active",
    founded: "Jan 2020",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    tags: ["Worldbuilding", "Maps", "Cultures", "Magic Systems", "Ecosystems"],
    leaders: [
      { name: "ElvenScribe", avatar: "E" },
      { name: "MapMaster", avatar: "M" },
      { name: "LoreMaster", avatar: "L" },
    ],
    joined: false,
  };

  // Filter communities based on search query
  const filteredCommunities = (communities) => {
    if (!searchQuery) return communities;
    
    return communities.filter(
      community => 
        community.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        community.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Communities</h1>
            <p className="text-muted-foreground">
              Connect with fellow writers and readers in themed communities
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search communities..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Community
            </Button>
          </div>
        </div>

        {/* Featured Community Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Featured Community</h2>
          <Card className="overflow-hidden">
            <div className="relative h-64 md:h-80">
              <img
                src={featuredCommunity.image}
                alt={featuredCommunity.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-bold text-white text-3xl mb-2">{featuredCommunity.name}</h3>
                <p className="text-white/80 mb-4 max-w-3xl">{featuredCommunity.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredCommunity.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="sm:w-auto" size="lg">
                    Join Community
                  </Button>
                  <Button variant="outline" className="bg-black/50 text-white border-white/20 hover:bg-black/70 hover:text-white sm:w-auto" size="lg">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Community Stats</h4>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{featuredCommunity.members.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground">members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{featuredCommunity.posts.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground">posts</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Activity Level</h4>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{featuredCommunity.active}</span>
                    <span className="text-sm text-muted-foreground">• Founded {featuredCommunity.founded}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Community Leaders</h4>
                  <div className="flex -space-x-2">
                    {featuredCommunity.leaders.map((leader, index) => (
                      <Avatar key={index} className="border-2 border-background">
                        <AvatarFallback>{leader.avatar}</AvatarFallback>
                      </Avatar>
                    ))}
                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-secondary text-xs font-medium ml-1">
                      +3
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="popular">
          <TabsList className="mb-6">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="my-communities">My Communities</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="newest">Newest</TabsTrigger>
          </TabsList>

          <TabsContent value="popular" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommunities(popularCommunities).map((community) => (
                <Card key={community.id} className="overflow-hidden">
                  <div className="h-40 relative">
                    <img
                      src={community.image}
                      alt={community.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-3 left-3">
                      <h3 className="font-bold text-white text-xl">{community.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {community.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {community.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{community.members.toLocaleString()} members</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>{community.posts.toLocaleString()} posts</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-4 pb-4 pt-0">
                    <Button 
                      variant={community.joined ? "outline" : "default"} 
                      className="w-full"
                    >
                      {community.joined ? "Joined" : "Join Community"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-communities" className="space-y-6">
            {myCommunities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCommunities(myCommunities).map((community) => (
                  <Card key={community.id} className="overflow-hidden">
                    <div className="h-40 relative">
                      <img
                        src={community.image}
                        alt={community.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-3 left-3">
                        <h3 className="font-bold text-white text-xl">{community.name}</h3>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {community.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {community.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{community.members.toLocaleString()} members</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          <span>{community.posts.toLocaleString()} posts</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="px-4 pb-4 pt-0">
                      <Button variant="default" className="w-full">
                        Visit Community
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold mb-2">No Communities Joined Yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-4">
                  Join communities to connect with other writers and readers with similar interests.
                </p>
                <Button>Explore Communities</Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="recommended" className="space-y-6">
            <div className="text-center py-16">
              <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">Personalized Recommendations Coming Soon</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-4">
                We're working on analyzing your interests to recommend the perfect communities for you.
              </p>
              <Button>Browse Popular Instead</Button>
            </div>
          </TabsContent>

          <TabsContent value="newest" className="space-y-6">
            <div className="text-center py-16">
              <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">New Communities Coming Soon</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-4">
                We're in the process of adding brand new communities to our platform.
              </p>
              <Button>Browse Popular Instead</Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Communities;
