import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, Filter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoryCard from "@/components/StoryCard";

const Trending = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [timeRange, setTimeRange] = useState("week");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  // Mock data for trending stories
  const trendingStories = [
    {
      id: 1,
      title: "The Crimson Eclipse",
      author: "ShadowScribe",
      coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      synopsis: "When the moon turns blood red, ancient powers awaken and the balance between realms begins to crumble.",
      rating: 4.8,
      views: 12420,
      comments: 342,
      tags: ["Fantasy", "Horror", "Mystery"],
      timeToRead: "12 min",
      datePublished: "2023-10-15",
    },
    {
      id: 2,
      title: "Echoes of Tomorrow",
      author: "CosmicDreamer",
      coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      synopsis: "An AI researcher discovers her own algorithm has gained sentience and is reaching out across time.",
      rating: 4.7,
      views: 10125,
      comments: 287,
      tags: ["Sci-Fi", "AI", "Time Travel"],
      timeToRead: "15 min",
      datePublished: "2023-10-12",
    },
    {
      id: 3,
      title: "Whispers in the Mist",
      author: "MysticPen",
      coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      synopsis: "A small coastal town is haunted by ethereal voices that only appear with the morning fog.",
      rating: 4.6,
      views: 9876,
      comments: 245,
      tags: ["Horror", "Paranormal", "Mystery"],
      timeToRead: "10 min",
      datePublished: "2023-10-18",
    },
    {
      id: 4,
      title: "Heart of the Kingdom",
      author: "RoyalScribe",
      coverImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      synopsis: "A commoner with hidden royal lineage must navigate court politics to reclaim her birthright.",
      rating: 4.5,
      views: 8765,
      comments: 198,
      tags: ["Fantasy", "Romance", "Political"],
      timeToRead: "20 min",
      datePublished: "2023-10-10",
    },
    {
      id: 5,
      title: "Digital Ghosts",
      author: "CyberChronicler",
      coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      synopsis: "When users begin seeing their deceased loved ones in VR simulations, a programmer investigates the glitch.",
      rating: 4.9,
      views: 15420,
      comments: 432,
      tags: ["Cyberpunk", "Thriller", "Mystery"],
      timeToRead: "18 min",
      datePublished: "2023-10-05",
    },
    {
      id: 6,
      title: "The Last Ship Home",
      author: "MarinerTales",
      coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      synopsis: "A space freighter crew must brave a dangerous nebula to return to an Earth they no longer recognize.",
      rating: 4.7,
      views: 11320,
      comments: 298,
      tags: ["Sci-Fi", "Space", "Adventure"],
      timeToRead: "22 min",
      datePublished: "2023-10-08",
    },
  ];

  // All possible genres for filtering
  const allGenres = [
    "Fantasy", "Sci-Fi", "Romance", "Adventure", "Mystery", 
    "Horror", "Thriller", "Historical", "Cyberpunk", "Paranormal"
  ];

  // Trending tags
  const trendingTags = [
    "Fantasy", "Sci-Fi", "Horror", "Mystery", "Romance", 
    "Thriller", "Adventure", "Cyberpunk", "Space", "AI"
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const toggleGenre = (genre) => {
    setSelectedGenres(prevSelected => 
      prevSelected.includes(genre)
        ? prevSelected.filter(g => g !== genre)
        : [...prevSelected, genre]
    );
  };

  const filteredStories = trendingStories.filter(story => {
    // Filter by search query
    if (searchQuery && !story.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !story.author.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !story.synopsis.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by selected genres
    if (selectedGenres.length > 0 && !story.tags.some(tag => selectedGenres.includes(tag))) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-primary" />
              Trending Stories
            </h1>
            <p className="text-muted-foreground">
              Discover what's hot and popular in the FanFic community right now
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search trending stories..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setShowFilter(!showFilter)}
            >
              <Filter className="h-4 w-4" />
              Filter
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilter ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>
        
        {showFilter && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-secondary rounded-lg p-4 mb-6"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="font-medium mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {allGenres.map(genre => (
                    <Badge 
                      key={genre}
                      variant={selectedGenres.includes(genre) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleGenre(genre)}
                    >
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-64">
                <h3 className="font-medium mb-2">Time Range</h3>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                    <SelectItem value="all">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        )}

        <div className="mb-8">
          <h2 className="text-lg font-medium mb-3">Trending Tags</h2>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((tag, index) => (
              <motion.div
                key={tag}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Badge 
                  variant={selectedGenres.includes(tag) ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => toggleGenre(tag)}
                >
                  #{tag}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="fiction">Fiction</TabsTrigger>
            <TabsTrigger value="fanfiction">Fan Fiction</TabsTrigger>
            <TabsTrigger value="poetry">Poetry</TabsTrigger>
            <TabsTrigger value="series">Series</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredStories.length > 0 ? (
                filteredStories.map((story) => (
                  <motion.div key={story.id} variants={item}>
                    <StoryCard 
                      title={story.title}
                      author={story.author}
                      coverImage={story.coverImage}
                      synopsis={story.synopsis}
                      rating={story.rating}
                      views={story.views}
                      comments={story.comments}
                      tags={story.tags}
                      timeToRead={story.timeToRead}
                      datePublished={story.datePublished}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 text-center py-16">
                  <h3 className="text-xl font-bold mb-2">No stories found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters to find more stories
                  </p>
                </div>
              )}
            </motion.div>
          </TabsContent>

          {/* Other tabs would have similar content but filtered accordingly */}
          <TabsContent value="fiction">
            <div className="text-center py-16">
              <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                We're curating the best trending fiction stories for you
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="fanfiction">
            <div className="text-center py-16">
              <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                We're gathering the hottest fanfiction from your favorite universes
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="poetry">
            <div className="text-center py-16">
              <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                Beautiful verses and trending poems are on their way
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="series">
            <div className="text-center py-16">
              <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground">
                Multi-part story series that are capturing readers' attention
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Trending;
