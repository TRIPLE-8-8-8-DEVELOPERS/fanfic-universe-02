import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Search, Filter, Flame, Clock, ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoryCard from "@/components/StoryCard";

// Mock data for trending stories
const trendingStories = [
  {
    id: "1",
    title: "The Dragon's Prophecy",
    author: "Eleanor Williams",
    authorId: "eleanor",
    cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1684&q=80",
    genre: "Fantasy",
    excerpt: "When the ancient prophecy of the Dragon's Return begins to unfold, Lyra finds herself at the center of a thousand-year-old mystery that could either save her kingdom or destroy it completely.",
    rating: 4.8,
    likes: 12503,
    reads: 89752,
  },
  {
    id: "2",
    title: "Starlight Academy",
    author: "Micah Chen",
    authorId: "micah",
    cover: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1727&q=80",
    genre: "Sci-Fi",
    excerpt: "At Starlight Academy, the elite school for psychically gifted teenagers, Eli discovers abilities beyond imagination - and a conspiracy that threatens the universe.",
    rating: 4.6,
    likes: 8754,
    reads: 65201,
  },
  {
    id: "3",
    title: "Midnight in Paris",
    author: "Sofia Garcia",
    authorId: "sofia",
    cover: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1746&q=80",
    genre: "Romance",
    excerpt: "When aspiring writer Claire visits Paris, a mysterious encounter sends her back in time to the 1920s, where she meets her literary heroes and an unexpected love.",
    rating: 4.7,
    likes: 10982,
    reads: 72543,
  },
  {
    id: "4",
    title: "The Silent Detective",
    author: "James Holden",
    authorId: "james",
    cover: "https://images.unsplash.com/photo-1509475826633-fed577a2c71b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
    genre: "Mystery",
    excerpt: "Detective Sarah Morgan has never failed to solve a case, but when a series of impossible crimes strikes the city, she faces her most challenging mystery yet.",
    rating: 4.5,
    likes: 7632,
    reads: 59842,
  },
  {
    id: "5",
    title: "Echoes of Eternity",
    author: "Marcus Reed",
    authorId: "marcus",
    cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    genre: "Fantasy",
    excerpt: "When immortal beings start dying mysteriously, the balance between realms begins to crumble, and only one forgotten god holds the key to salvation.",
    rating: 4.9,
    likes: 14302,
    reads: 93754,
  },
  {
    id: "6",
    title: "Beyond the Veil",
    author: "Amara Khan",
    authorId: "amara",
    cover: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
    genre: "Fantasy",
    excerpt: "When the veil between worlds thins, Aria discovers she can see and communicate with spirits - a gift that makes her both valuable and hunted.",
    rating: 4.7,
    likes: 9865,
    reads: 68421,
  },
  {
    id: "7",
    title: "The Alchemist's Apprentice",
    author: "Isabelle Rossi",
    authorId: "isabelle",
    cover: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1773&q=80",
    genre: "Fantasy",
    excerpt: "In a world where alchemy is both science and magic, young Elias becomes the apprentice of a legendary alchemist, only to uncover a secret that could shatter the foundations of their society.",
    rating: 4.6,
    likes: 8901,
    reads: 63289,
  },
  {
    id: "8",
    title: "Cyberpunk Dreams",
    author: "Kenji Tanaka",
    authorId: "kenji",
    cover: "https://images.unsplash.com/photo-1603481588278-c360dda996ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    genre: "Sci-Fi",
    excerpt: "In the neon-lit streets of Neo-Tokyo, a hacker known as 'Zero' discovers a conspiracy that reaches the highest levels of corporate power, forcing him to fight for his survival and the future of the city.",
    rating: 4.8,
    likes: 11234,
    reads: 78901,
  },
  {
    id: "9",
    title: "Love in the Time of Algorithms",
    author: "Aisha Patel",
    authorId: "aisha",
    cover: "https://images.unsplash.com/photo-1543123820-c5238a576449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    genre: "Romance",
    excerpt: "When Maya signs up for a new dating app that uses advanced algorithms to find the perfect match, she never expects to fall for the app's mysterious creator.",
    rating: 4.5,
    likes: 7654,
    reads: 54321,
  },
  {
    id: "10",
    title: "The Last Starfarer",
    author: "Javier Rodriguez",
    authorId: "javier",
    cover: "https://images.unsplash.com/photo-1560762429-c96d4b89e1fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    genre: "Sci-Fi",
    excerpt: "Centuries after humanity abandoned Earth, a lone starfarer discovers a signal from the lost planet, leading him on a perilous journey to uncover the truth behind our origins.",
    rating: 4.7,
    likes: 9210,
    reads: 67890,
  },
  {
    id: "11",
    title: "The Haunting of Blackwood Manor",
    author: "Emily Carter",
    authorId: "emily",
    cover: "https://images.unsplash.com/photo-1571175443883-4156534f69ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    genre: "Horror",
    excerpt: "When Sarah inherits her grandmother's estate, Blackwood Manor, she soon discovers that the house is haunted by a dark presence that seeks to claim her soul.",
    rating: 4.4,
    likes: 6543,
    reads: 43210,
  },
  {
    id: "12",
    title: "The Secret Life of Garden Gnomes",
    author: "Thomas Green",
    authorId: "thomas",
    cover: "https://images.unsplash.com/photo-1542779283-744953f17a05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    genre: "Fantasy",
    excerpt: "Discover the hidden world of garden gnomes, where they wage a secret war against squirrels, slugs, and other garden pests, all while trying to maintain their cheerful facade.",
    rating: 4.6,
    likes: 8765,
    reads: 56789,
  },
  {
    id: "13",
    title: "The City of Shifting Sands",
    author: "Layla Hassan",
    authorId: "layla",
    cover: "https://images.unsplash.com/photo-1547754343-996904c99266?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    genre: "Adventure",
    excerpt: "Join young archaeologist Zara on a thrilling expedition to uncover the secrets of a lost city buried beneath the shifting sands of the Sahara Desert.",
    rating: 4.5,
    likes: 7890,
    reads: 65432,
  },
  {
    id: "14",
    title: "The Witch's Familiar",
    author: "Oliver Blackwood",
    authorId: "oliver",
    cover: "https://images.unsplash.com/photo-1507524884996-ff0a59049778?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    genre: "Fantasy",
    excerpt: "In a world where witches are feared and hunted, a young boy named Toby discovers he is the chosen familiar of a powerful witch, destined to protect her from the forces of darkness.",
    rating: 4.7,
    likes: 9012,
    reads: 76543,
  },
  {
    id: "15",
    title: "The Quantum Paradox",
    author: "Dr. Aris Thorne",
    authorId: "aris",
    cover: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    genre: "Sci-Fi",
    excerpt: "When a team of scientists creates a machine that can travel through time, they accidentally unleash a quantum paradox that threatens to unravel the fabric of reality.",
    rating: 4.8,
    likes: 10123,
    reads: 87654,
  },
  {
   id: "16",
    title: "The Shadow Thief",
    author: "Seraphina Moon",
    authorId: "seraphina",
    cover: "https://images.unsplash.com/photo-1533622059548-b6617e3915b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80",
    genre: "Mystery",
    excerpt: "In the dark alleys of Victorian London, a mysterious thief known as 'The Shadow' is stealing priceless artifacts, leaving Inspector Davies to solve the case before it's too late.",
    rating: 4.6,
    likes: 8234,
    reads: 61234,
  },
  {
    id: "17",
    title: "The Dragon Rider's Daughter",
    author: "Anya Petrova",
    authorId: "anya",
    cover: "https://images.unsplash.com/photo-1677495494971-253f7b467899?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    genre: "Fantasy",
    excerpt: "Elara, the daughter of a legendary dragon rider, must embark on a perilous quest to save her father and protect the last dragon eggs from falling into the wrong hands.",
    rating: 4.9,
    likes: 11456,
    reads: 92345,
  },
  {
    id: "18",
    title: "Echoes from the Void",
    author: "Ethan Cole",
    authorId: "ethan",
    cover: "https://images.unsplash.com/photo-1616133284399-d40149907145?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    genre: "Horror",
    excerpt: "When a group of deep-space explorers stumbles upon a derelict spaceship, they soon realize that they are not alone, and something sinister is lurking in the shadows.",
    rating: 4.4,
    likes: 6789,
    reads: 54321,
  },
];

// Filter categories
const categories = [
  "All Categories",
  "Fantasy",
  "Sci-Fi",
  "Romance",
  "Mystery",
  "Horror",
  "Adventure",
  "Coming of Age",
];

// Time periods
const timePeriods = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "This Year", value: "year" },
  { label: "All Time", value: "all" },
];

const Trending = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [stories, setStories] = useState(trendingStories);
  const [activeTimePeriod, setActiveTimePeriod] = useState("week");

  // Filter stories based on search term and category
  const filteredStories = stories.filter((story) => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || story.genre === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Animated container variants
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
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      
      <main className="flex-grow w-full">
        <div className="container content-container py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 font-serif flex items-center gap-2 text-center">
                <TrendingUp className="h-8 w-8 text-primary" />
                Trending Stories
              </h1>
              <p className="text-muted-foreground">
                Discover what's hot and happening in the fan fiction community right now
              </p>
            </div>
            
            <div className="w-full md:w-auto flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search trending stories..."
                  className="pl-9 rounded-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button className="rounded-full">
                <Filter className="h-4 w-4 mr-2" /> Filters
              </Button>
            </div>
          </div>

        {/* Time period selection */}
        <div className="mb-8">
          <h3 className="mb-3 font-medium font-bold">Trending in:</h3>
          <div className="flex flex-wrap gap-2">
            {timePeriods.map((period) => (
              <Badge
                key={period.value}
                variant={activeTimePeriod === period.value ? "default" : "outline"}
                className="rounded-full cursor-pointer px-3 py-1"
                onClick={() => setActiveTimePeriod(period.value)}
              >
                {period.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h3 className="mb-3 font-medium font-bold">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="rounded-full cursor-pointer px-3 py-1"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Trending Tabs */}
        <Tabs defaultValue="rising" className="mt-8">
          <TabsList className="mb-6 rounded-full w-full sm:w-auto justify-start overflow-x-auto">
            <TabsTrigger value="rising" className="rounded-full">
              <Flame className="h-4 w-4 mr-2" /> Rising Fast
            </TabsTrigger>
            <TabsTrigger value="most-read" className="rounded-full">
              <Clock className="h-4 w-4 mr-2" /> Most Read
            </TabsTrigger>
            <TabsTrigger value="highest-rated" className="rounded-full">
              <ArrowUpRight className="h-4 w-4 mr-2" /> Highest Rated
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rising" className="m-0">
            {filteredStories.length === 0 ? (
              <div className="py-20 text-center bg-muted rounded-xl">
                <h3 className="text-xl font-bold mb-2 text-center">No stories found</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Try adjusting your search or filter criteria to find more stories.
                </p>
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All Categories");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredStories.map((story) => (
                  <motion.div key={story.id} variants={itemVariants}>
                    <StoryCard
                      id={story.id}
                      title={story.title}
                      author={story.author}
                      authorId={story.authorId}
                      cover={story.cover}
                      genre={story.genre}
                      excerpt={story.excerpt}
                      rating={story.rating}
                      likes={story.likes}
                      reads={story.reads}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="most-read" className="m-0">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredStories
                .sort((a, b) => b.reads - a.reads)
                .map((story) => (
                  <motion.div key={story.id} variants={itemVariants}>
                    <StoryCard
                      id={story.id}
                      title={story.title}
                      author={story.author}
                      authorId={story.authorId}
                      cover={story.cover}
                      genre={story.genre}
                      excerpt={story.excerpt}
                      rating={story.rating}
                      likes={story.likes}
                      reads={story.reads}
                    />
                  </motion.div>
                ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="highest-rated" className="m-0">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredStories
                .sort((a, b) => b.rating - a.rating)
                .map((story) => (
                  <motion.div key={story.id} variants={itemVariants}>
                    <StoryCard
                      id={story.id}
                      title={story.title}
                      author={story.author}
                      authorId={story.authorId}
                      cover={story.cover}
                      genre={story.genre}
                      excerpt={story.excerpt}
                      rating={story.rating}
                      likes={story.likes}
                      reads={story.reads}
                    />
                  </motion.div>
                ))}
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Load More Button */}
        <div className="mt-10 flex justify-center">
          <Button variant="outline" className="rounded-full px-8">
            Load More Stories
          </Button>
        </div>

          {/* Stats Cards - Dashboard Element */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="dashboard-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium font-bold">Total Reads</h3>
                  <Badge variant="outline" className="rounded-full">This Week</Badge>
                </div>
                <p className="dashboard-stat">457,892</p>
                <p className="dashboard-stat-label">+12.5% from last week</p>
              </CardContent>
            </Card>
            
            <Card className="dashboard-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium font-bold">New Stories</h3>
                  <Badge variant="outline" className="rounded-full">This Week</Badge>
                </div>
                <p className="dashboard-stat">1,245</p>
                <p className="dashboard-stat-label">+8.3% from last week</p>
              </CardContent>
            </Card>
            
            <Card className="dashboard-card">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium font-bold">Active Users</h3>
                  <Badge variant="outline" className="rounded-full">Now</Badge>
                </div>
                <p className="dashboard-stat">12,678</p>
                <p className="dashboard-stat-label">+15.2% from yesterday</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Trending;
