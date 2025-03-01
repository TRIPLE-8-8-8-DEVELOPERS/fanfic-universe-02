
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StoryGrid from "../components/StoryGrid";
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import { TrendingUp, Filter, Calendar, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Trending = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeFrame, setTimeFrame] = useState("This Week");

  useEffect(() => {
    // In a real app, we would fetch data from an API
    // This is mockup data for demonstration
    const fetchStories = async () => {
      // Simulate API request
      setTimeout(() => {
        setStories([
          {
            id: "1",
            title: "The Last Dragon Rider",
            author: "DragonMaster",
            authorId: "user123",
            cover: "https://images.unsplash.com/photo-1546198633-9a6c69202c7d?auto=format&fit=crop&q=80&w=500",
            genre: "Fantasy",
            excerpt: "When the last dragon appears after centuries of absence, a young farm girl discovers her destiny...",
            rating: 4.9,
            likes: 18754,
            reads: 67291
          },
          {
            id: "2",
            title: "Quantum Paradox",
            author: "ScienceWhiz",
            authorId: "user456",
            cover: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=500",
            genre: "Sci-Fi",
            excerpt: "A quantum physicist discovers a way to communicate with parallel universes, with devastating consequences...",
            rating: 4.8,
            likes: 15876,
            reads: 58145
          },
          {
            id: "3",
            title: "The Midnight Detective",
            author: "MysteryPro",
            authorId: "user789",
            cover: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&q=80&w=500",
            genre: "Mystery",
            excerpt: "In a city that never sleeps, Detective Morgan hunts a killer who only strikes at midnight...",
            rating: 4.7,
            likes: 12765,
            reads: 42976
          },
          {
            id: "4",
            title: "Whispers of the Heart",
            author: "RomanceQueen",
            authorId: "user101",
            cover: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&q=80&w=500",
            genre: "Romance",
            excerpt: "Two strangers with broken hearts find healing in the most unexpected places...",
            rating: 4.6,
            likes: 11654,
            reads: 38456
          },
          {
            id: "5",
            title: "The Haunted Manor",
            author: "GhostHunter",
            authorId: "user202",
            cover: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?auto=format&fit=crop&q=80&w=500",
            genre: "Horror",
            excerpt: "When the Blake family moves into their dream home, they discover they're not the only residents...",
            rating: 4.5,
            likes: 9843,
            reads: 29876
          },
          {
            id: "6",
            title: "Rising Phoenix",
            author: "FantasyWriter",
            authorId: "user303",
            cover: "https://images.unsplash.com/photo-1515847049296-a281d6401047?auto=format&fit=crop&q=80&w=500",
            genre: "Fantasy",
            excerpt: "From the ashes of a fallen kingdom, a hero rises with the power of the ancient phoenix...",
            rating: 4.9,
            likes: 19678,
            reads: 72345
          },
          {
            id: "7",
            title: "Neon Shadows",
            author: "CyberPunk",
            authorId: "user404",
            cover: "https://images.unsplash.com/photo-1560780552-ba54683cb263?auto=format&fit=crop&q=80&w=500",
            genre: "Sci-Fi",
            excerpt: "In a world dominated by corporations and technology, one hacker fights to expose the truth...",
            rating: 4.7,
            likes: 14987,
            reads: 53765
          },
          {
            id: "8",
            title: "The Ancient Map",
            author: "AdventureSeeker",
            authorId: "user505",
            cover: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=500",
            genre: "Adventure",
            excerpt: "When an archaeologist discovers a map hidden in an ancient artifact, a race against time begins...",
            rating: 4.8,
            likes: 13876,
            reads: 48245
          }
        ]);
        setLoading(false);
      }, 1000);
    };

    fetchStories();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              <TrendingUp className="inline-block mr-2 text-primary" size={32} />
              Trending Stories
            </h1>
            <p className="text-muted-foreground">Discover what readers can't put down right now</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  {timeFrame}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="dropdown-menu bg-white w-48">
                <DropdownMenuItem className="dropdown-item" onClick={() => setTimeFrame("Today")}>Today</DropdownMenuItem>
                <DropdownMenuItem className="dropdown-item" onClick={() => setTimeFrame("This Week")}>This Week</DropdownMenuItem>
                <DropdownMenuItem className="dropdown-item" onClick={() => setTimeFrame("This Month")}>This Month</DropdownMenuItem>
                <DropdownMenuItem className="dropdown-item" onClick={() => setTimeFrame("All Time")}>All Time</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </motion.div>
        
        <Separator className="mb-8" />
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Trending {timeFrame}</h2>
                <div className="grid grid-cols-1 gap-6">
                  <StoryGrid title="Hot Right Now" stories={stories.slice(0, 4)} />
                </div>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Rising Fast</h2>
                <div className="grid grid-cols-1 gap-6">
                  <StoryGrid title="Gaining Popularity" stories={stories.slice(4, 8)} />
                </div>
              </div>
              
              <div className="text-center mt-8">
                <p className="text-muted-foreground mb-4">Want to see what's trending in specific genres?</p>
                <Button className="rounded-full bg-primary hover:bg-primary/90">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Explore Trending by Genre
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Trending;
