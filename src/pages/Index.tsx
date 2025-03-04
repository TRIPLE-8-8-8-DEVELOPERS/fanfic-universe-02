
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FeaturedStory from "../components/FeaturedStory";
import StoryGrid from "../components/StoryGrid";
import AIWritingAssistant from "../components/AIWritingAssistant";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Sparkles, TrendingUp, ThumbsUp, PlusCircle, Crown } from "lucide-react";
import PremiumFeatureShowcase from "../components/PremiumFeatureShowcase";
import PremiumFeatureAlert from "../components/writing/PremiumFeatureAlert";

// Sample featured story data
const featuredStoryData = {
  id: "featured-1",
  title: "The Shadow Beyond",
  author: "Emma Richards",
  authorId: "emma123",
  cover: "/placeholder.svg",
  genre: "Fantasy",
  excerpt: "In a world where shadows hold secrets, one woman discovers the truth behind the veil...",
  rating: 4.8,
  likes: 1243,
  comments: 356, // Adding the missing comments property
  reads: 5680
};

// Sample stories for different categories
const trendingStories = [
  {
    id: "trending-1",
    title: "The Last Horizon",
    author: "Michael Chen",
    authorId: "mchen",
    cover: "/placeholder.svg",
    genre: "Sci-Fi",
    excerpt: "The colony ship Artemis nears its destination after 300 years in space...",
    rating: 4.7,
    likes: 985,
    reads: 4300
  },
  // ... more trending stories
];

const popularStories = [
  {
    id: "popular-1",
    title: "Whispers in the Dark",
    author: "Sarah Johnson",
    authorId: "sjohnson",
    cover: "/placeholder.svg",
    genre: "Mystery",
    excerpt: "Detective Anna Moore finds herself pursuing a killer who leaves cryptic messages...",
    rating: 4.9,
    likes: 1587,
    reads: 7230
  },
  // ... more popular stories
];

const recommendedStories = [
  {
    id: "recommended-1",
    title: "Beyond the Mountains",
    author: "David Williams",
    authorId: "dwilliams",
    cover: "/placeholder.svg",
    genre: "Adventure",
    excerpt: "After losing everything, Marcus sets out on a journey that will test his limits...",
    rating: 4.6,
    likes: 845,
    reads: 3890
  },
  // ... more recommended stories
];

const Index = () => {
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const handleSubscribe = () => {
    setIsPremium(true);
    setIsSubscriptionModalOpen(false);
  };

  const openSubscriptionModal = () => {
    setIsSubscriptionModalOpen(true);
  };

  return (
    <div className="dark:bg-gray-900 min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <section className="mb-12">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Where Stories Come to Life
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Discover, create, and share captivating stories with a community of passionate writers and readers.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link to="/write">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Write a Story
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/explore">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Explore Stories
                  </Link>
                </Button>
                {!isPremium && (
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-950/20 flex items-center gap-2"
                    onClick={openSubscriptionModal}
                  >
                    <Crown className="h-5 w-5 text-amber-500" />
                    Try Premium
                  </Button>
                )}
              </div>
            </div>
            <div className="w-full lg:w-2/5 mt-8 lg:mt-0">
              <AIWritingAssistant 
                currentText=""
                onSuggestionApply={() => {}}
                isPremium={isPremium} 
                onUpgradeRequest={openSubscriptionModal}
              />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-8">
            Featured Story
          </h2>
          <FeaturedStory {...featuredStoryData} />
        </section>

        <Tabs defaultValue="trending" className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold tracking-tight">
              Discover Stories
            </h2>
            <TabsList>
              <TabsTrigger value="trending" className="gap-1">
                <TrendingUp className="h-4 w-4" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="popular" className="gap-1">
                <ThumbsUp className="h-4 w-4" />
                Popular
              </TabsTrigger>
              <TabsTrigger value="recommended" className="gap-1">
                <Sparkles className="h-4 w-4" />
                For You
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="trending">
            <StoryGrid 
              title="Trending Stories" 
              description="Stories gaining popularity right now" 
              stories={trendingStories} 
            />
          </TabsContent>
          
          <TabsContent value="popular">
            <StoryGrid 
              title="Popular Stories" 
              description="Readers' all-time favorites" 
              stories={popularStories} 
            />
          </TabsContent>
          
          <TabsContent value="recommended">
            <StoryGrid 
              title="Recommended For You" 
              description="Personalized recommendations based on your reading history" 
              stories={recommendedStories} 
            />
          </TabsContent>
        </Tabs>
        
        <section className="mb-12">
          <PremiumFeatureShowcase onSubscribe={openSubscriptionModal} />
        </section>
      </main>
      
      <Footer />
      
      {/* Premium Feature Alert Modal */}
      <PremiumFeatureAlert
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        onSubscribe={handleSubscribe}
      />
    </div>
  );
};

export default Index;
