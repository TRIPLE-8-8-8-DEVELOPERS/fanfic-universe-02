
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Compass, TrendingUp, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoryGrid from "@/components/StoryGrid";

// Mock data
const trendingStories = [
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
];

const newStories = [
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
  {
    id: "9",
    title: "Whispers in the Woods",
    author: "Ivy Bennett",
    authorId: "ivy",
    cover: "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    genre: "Horror",
    excerpt: "When hiking guide Finn takes a group deep into the ancient forest, they discover that the local legends about the woods might not be legends after all.",
    rating: 4.5,
    likes: 7965,
    reads: 58741,
  },
];

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        <div className="container py-8">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
              Explore Stories
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Discover new worlds, characters, and adventures. Find your next favorite story from our curated collections.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xl mb-10">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by title, author, or keywords"
              className="pl-10 rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Explore Tabs */}
          <Tabs defaultValue="discover" className="space-y-8">
            <TabsList className="rounded-full">
              <TabsTrigger value="discover" className="rounded-full">
                <Compass className="h-4 w-4 mr-2" />
                Discover
              </TabsTrigger>
              <TabsTrigger value="trending" className="rounded-full">
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending Now
              </TabsTrigger>
              <TabsTrigger value="new" className="rounded-full">
                <BookOpen className="h-4 w-4 mr-2" />
                New Releases
              </TabsTrigger>
            </TabsList>

            <TabsContent value="discover" className="m-0">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Discover Stories</h2>
                <Button variant="outline" className="rounded-full" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Featured Categories */}
                {[
                  {
                    title: "Fantasy Epics",
                    description: "Immerse yourself in magical worlds and epic adventures",
                    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1684&q=80",
                    link: "/browse?genre=fantasy",
                  },
                  {
                    title: "Sci-Fi Adventures",
                    description: "Explore futuristic worlds and technological wonders",
                    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80",
                    link: "/browse?genre=sci-fi",
                  },
                  {
                    title: "Romance Tales",
                    description: "Fall in love with heartwarming stories of connection",
                    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
                    link: "/browse?genre=romance",
                  },
                ].map((category, index) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group relative h-60 rounded-xl overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-black/50 z-10"></div>
                    <img
                      src={category.image}
                      alt={category.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                      <p className="text-white/80 text-sm mb-4">{category.description}</p>
                      <Link to={category.link}>
                        <Button variant="secondary" size="sm" className="rounded-full">
                          Explore
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Mix of stories */}
              <StoryGrid
                title="Editor's Picks"
                description="Hand-selected stories our editors love"
                stories={[...trendingStories, ...newStories].slice(0, 4)}
              />
            </TabsContent>

            <TabsContent value="trending" className="m-0">
              <StoryGrid
                title="Trending This Week"
                description="The stories everyone's talking about right now"
                stories={trendingStories}
              />
            </TabsContent>

            <TabsContent value="new" className="m-0">
              <StoryGrid
                title="Fresh Stories"
                description="Recently published works to discover"
                stories={newStories}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Explore;
