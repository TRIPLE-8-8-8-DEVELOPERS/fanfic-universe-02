
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StoryGrid from "../components/StoryGrid";
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import { BookOpen, Filter, TrendingUp } from "lucide-react";

const Popular = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

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
            reads: 45291
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
            reads: 32145
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
            reads: 28976
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
            reads: 23456
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
            reads: 19876
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
            reads: 52345
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
            reads: 38765
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
            reads: 31245
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Popular Stories</h1>
            <p className="text-muted-foreground">Discover the most read and loved stories on our platform</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-3">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="border-primary/50 text-primary">
              <TrendingUp className="mr-2 h-4 w-4" />
              Sort by Popularity
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
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <StoryGrid title="Most Popular Stories" stories={stories} />
              </div>
              
              <div className="text-center mt-12">
                <p className="text-muted-foreground mb-4">Looking for more great stories?</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="outline" className="rounded-full">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Explore More Stories
                  </Button>
                  <Button className="rounded-full bg-purple-600 hover:bg-purple-700">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View Trending
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Popular;
