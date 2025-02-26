
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, SortDesc, ArrowDownAZ, TrendingUp, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoryCard from "@/components/StoryCard";

// Mock data
const mockStories = [
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
    title: "Cybernetic Heart",
    author: "Leo Zhang",
    authorId: "leo",
    cover: "https://images.unsplash.com/photo-1601574465779-76d6dbb88557?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
    genre: "Sci-Fi",
    excerpt: "In a world where human emotions are considered obsolete, engineer Maya creates an AI that can feel - with consequences she never imagined.",
    rating: 4.6,
    likes: 8532,
    reads: 61298,
  },
  {
    id: "8",
    title: "The Last Summer",
    author: "Noah Adams",
    authorId: "noah",
    cover: "https://images.unsplash.com/photo-1519834584767-7d2e1ba230d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
    genre: "Coming of Age",
    excerpt: "Four friends make a pact to make their last summer before college the most memorable one yet, not knowing how it would change their lives forever.",
    rating: 4.8,
    likes: 11234,
    reads: 75682,
  },
];

const genres = [
  "All Genres",
  "Fantasy",
  "Sci-Fi",
  "Romance",
  "Mystery",
  "Horror",
  "Adventure",
  "Coming of Age",
  "Historical",
  "Thriller",
  "Comedy",
  "Drama",
];

const fandoms = [
  "Marvel",
  "Star Wars",
  "Harry Potter",
  "Game of Thrones",
  "Lord of the Rings",
  "Doctor Who",
  "Stranger Things",
  "DC Comics",
  "Anime",
  "K-Pop",
  "Star Trek",
  "Percy Jackson",
];

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [stories, setStories] = useState(mockStories);

  const filteredStories = stories.filter((story) => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         story.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === "All Genres" || story.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        <div className="container py-8">
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
              Browse Stories
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Discover thousands of stories across all your favorite genres and fandoms. Use the filters below to find your next favorite read.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-10 space-y-6">
            <div className="relative max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by title, author, or keyword"
                className="pl-10 rounded-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <h3 className="mb-3 font-medium">Popular Genres</h3>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <Badge
                    key={genre}
                    variant={selectedGenre === genre ? "default" : "outline"}
                    className="rounded-full cursor-pointer px-3 py-1"
                    onClick={() => setSelectedGenre(genre)}
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-medium">Popular Fandoms</h3>
              <div className="flex flex-wrap gap-2">
                {fandoms.map((fandom) => (
                  <Badge
                    key={fandom}
                    variant="outline"
                    className="rounded-full cursor-pointer px-3 py-1 hover:bg-primary hover:text-primary-foreground"
                  >
                    {fandom}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Browse Tabs */}
          <Tabs defaultValue="newest" className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <TabsList className="rounded-full">
                <TabsTrigger value="newest" className="rounded-full">
                  <Clock className="h-4 w-4 mr-2" />
                  Newest
                </TabsTrigger>
                <TabsTrigger value="trending" className="rounded-full">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Trending
                </TabsTrigger>
                <TabsTrigger value="top-rated" className="rounded-full">
                  <SortDesc className="h-4 w-4 mr-2" />
                  Top Rated
                </TabsTrigger>
                <TabsTrigger value="alphabetical" className="rounded-full">
                  <ArrowDownAZ className="h-4 w-4 mr-2" />
                  A-Z
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Button variant="outline" className="rounded-full" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>

            <TabsContent value="newest" className="m-0">
              {filteredStories.length === 0 ? (
                <div className="py-20 text-center bg-muted rounded-xl">
                  <h3 className="text-xl font-bold mb-2">No stories found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    Try adjusting your search or filter criteria to find more stories.
                  </p>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedGenre("All Genres");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredStories.map((story, index) => (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <StoryCard {...story} />
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="trending" className="m-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredStories
                  .sort((a, b) => b.reads - a.reads)
                  .map((story, index) => (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <StoryCard {...story} />
                    </motion.div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="top-rated" className="m-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredStories
                  .sort((a, b) => b.rating - a.rating)
                  .map((story, index) => (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <StoryCard {...story} />
                    </motion.div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="alphabetical" className="m-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredStories
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map((story, index) => (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <StoryCard {...story} />
                    </motion.div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Load More Button */}
          <div className="mt-10 flex justify-center">
            <Button variant="outline" className="rounded-full px-8">
              Load More Stories
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Browse;
