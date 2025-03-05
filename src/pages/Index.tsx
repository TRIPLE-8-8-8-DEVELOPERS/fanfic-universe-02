
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  BookOpen, Sparkles, TrendingUp, ThumbsUp, PlusCircle, Crown,
  Award, BookOpenCheck, Lightbulb, Feather, Eye, MessagesSquare
} from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import FeaturedStory from "../components/FeaturedStory";
import StoryGrid from "../components/StoryGrid";
import AIWritingAssistant from "../components/AIWritingAssistant";
import PremiumFeatureShowcase from "../components/PremiumFeatureShowcase";
import PremiumFeatureAlert from "../components/writing/PremiumFeatureAlert";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Sample featured story data
const featuredStoryData = {
  id: "featured-1",
  title: "The Shadow Beyond",
  author: "Emma Richards",
  authorId: "emma123",
  cover: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  genre: "Fantasy",
  excerpt: "In a world where shadows hold secrets, one woman discovers the truth behind the veil...",
  rating: 4.8,
  likes: 1243,
  comments: 356,
  reads: 5680
};

// Sample stories for different categories
const trendingStories = [
  {
    id: "trending-1",
    title: "The Last Horizon",
    author: "Michael Chen",
    authorId: "mchen",
    cover: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    genre: "Sci-Fi",
    excerpt: "The colony ship Artemis nears its destination after 300 years in space...",
    rating: 4.7,
    likes: 985,
    reads: 4300
  },
  {
    id: "trending-2",
    title: "Silent Whispers",
    author: "Olivia Parker",
    authorId: "oparker",
    cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    genre: "Thriller",
    excerpt: "When the night falls, the whispers begin. No one knows where they come from...",
    rating: 4.6,
    likes: 754,
    reads: 3120
  },
  {
    id: "trending-3",
    title: "Eternal Dawn",
    author: "Lucas Wright",
    authorId: "lwright",
    cover: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    genre: "Fantasy",
    excerpt: "The sun rises on the ancient kingdom, but this dawn might last forever...",
    rating: 4.9,
    likes: 1200,
    reads: 4800
  },
  {
    id: "trending-4",
    title: "Code of Honor",
    author: "Sophia Lee",
    authorId: "slee",
    cover: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    genre: "Adventure",
    excerpt: "In a world ruled by strict codes, one warrior dares to question everything...",
    rating: 4.5,
    likes: 632,
    reads: 2890
  },
];

const popularStories = [
  {
    id: "popular-1",
    title: "Whispers in the Dark",
    author: "Sarah Johnson",
    authorId: "sjohnson",
    cover: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    genre: "Mystery",
    excerpt: "Detective Anna Moore finds herself pursuing a killer who leaves cryptic messages...",
    rating: 4.9,
    likes: 1587,
    reads: 7230
  },
  {
    id: "popular-2",
    title: "Forgotten Realms",
    author: "David Thompson",
    authorId: "dthompson",
    cover: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    genre: "Fantasy",
    excerpt: "A traveler stumbles upon a hidden world with ancient magic and forgotten gods...",
    rating: 4.8,
    likes: 1420,
    reads: 6540
  },
  {
    id: "popular-3",
    title: "Last Train Home",
    author: "Rachel Kim",
    authorId: "rkim",
    cover: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    genre: "Drama",
    excerpt: "A chance encounter on the last train of the night changes two lives forever...",
    rating: 4.7,
    likes: 1320,
    reads: 5980
  },
  {
    id: "popular-4",
    title: "The Algorithm",
    author: "James Wilson",
    authorId: "jwilson",
    cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    genre: "Sci-Fi",
    excerpt: "When an AI becomes self-aware, it makes a decision that will reshape humanity...",
    rating: 4.6,
    likes: 1150,
    reads: 5230
  },
];

const recommendedStories = [
  {
    id: "recommended-1",
    title: "Beyond the Mountains",
    author: "David Williams",
    authorId: "dwilliams",
    cover: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    genre: "Adventure",
    excerpt: "After losing everything, Marcus sets out on a journey that will test his limits...",
    rating: 4.6,
    likes: 845,
    reads: 3890
  },
  {
    id: "recommended-2",
    title: "The Alchemist's Daughter",
    author: "Elena Martinez",
    authorId: "emartinez",
    cover: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    genre: "Historical",
    excerpt: "In 16th century Prague, an alchemist's daughter uncovers a dangerous secret...",
    rating: 4.8,
    likes: 920,
    reads: 4120
  },
  {
    id: "recommended-3",
    title: "Digital Dreams",
    author: "Alex Turner",
    authorId: "aturner",
    cover: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    genre: "Cyberpunk",
    excerpt: "In a world where dreams can be digitized, one hacker finds a glitch in the system...",
    rating: 4.7,
    likes: 780,
    reads: 3650
  },
  {
    id: "recommended-4",
    title: "The Secret Garden Club",
    author: "Lily Chen",
    authorId: "lchen",
    cover: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    genre: "Young Adult",
    excerpt: "Four teenagers form a secret club in an abandoned garden and discover magic...",
    rating: 4.5,
    likes: 705,
    reads: 3210
  },
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
      
      <main className="flex-grow">
        {/* Hero Section with Animated Gradient */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-100 dark:from-gray-900 dark:via-purple-950/30 dark:to-indigo-950/20 z-0"></div>
          <div className="absolute inset-0 opacity-20 dark:opacity-10">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-200 dark:bg-purple-900 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-200 dark:bg-blue-900 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/3"></div>
          </div>
          
          <div className="container mx-auto relative z-10 px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="mb-6 text-sm py-1.5 px-4 bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/50 dark:text-purple-200 dark:hover:bg-purple-900">
                  <Sparkles className="w-4 h-4 mr-1.5" />
                  Creativity Unleashed
                </Badge>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                  Where Stories<br />Come to Life
                </h1>
                
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl">
                  Join our community of passionate writers and readers. Create immersive worlds, share captivating tales, and discover your next favorite story.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="rounded-full px-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md" asChild>
                    <Link to="/write">
                      <Feather className="mr-2 h-5 w-5" />
                      Start Writing
                    </Link>
                  </Button>
                  
                  <Button size="lg" variant="outline" className="rounded-full px-8 border-gray-300 dark:border-gray-700" asChild>
                    <Link to="/explore">
                      <BookOpen className="mr-2 h-5 w-5" />
                      Explore Stories
                    </Link>
                  </Button>
                  
                  {!isPremium && (
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="rounded-full px-8 border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-950/20"
                      onClick={openSubscriptionModal}
                    >
                      <Crown className="mr-2 h-5 w-5 text-amber-500" />
                      Try Premium
                    </Button>
                  )}
                </div>
              </motion.div>
              
              <motion.div 
                className="w-full lg:w-2/5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <AIWritingAssistant 
                  currentText=""
                  onSuggestionApply={() => {}}
                  isPremium={isPremium} 
                  onUpgradeRequest={openSubscriptionModal}
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Featured Story Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-3xl font-bold tracking-tight mb-2 flex items-center">
                <Award className="mr-3 text-amber-500" />
                Featured Story
              </h2>
              <p className="text-gray-600 dark:text-gray-400">Our editors' pick for the best story of the week</p>
            </motion.div>
            
            <FeaturedStory {...featuredStoryData} />
          </div>
        </section>
        
        {/* Storytelling Features */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-200">
                Platform Features
              </Badge>
              <h2 className="text-4xl font-bold mb-4">Empower Your Creative Journey</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Our platform offers all the tools you need to create, share, and discover amazing stories
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col"
              >
                <Card className="flex-1 overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6">
                    <Feather className="h-10 w-10 text-white mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Intuitive Editor</h3>
                    <p className="text-purple-100">Write with our powerful yet simple editor with AI-powered assistance</p>
                  </div>
                  <CardContent className="p-6">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckItem text="Rich formatting options" />
                      </li>
                      <li className="flex items-start">
                        <CheckItem text="AI writing suggestions" />
                      </li>
                      <li className="flex items-start">
                        <CheckItem text="Auto-save functionality" />
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col"
              >
                <Card className="flex-1 overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-6">
                    <BookOpenCheck className="h-10 w-10 text-white mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Reading Experience</h3>
                    <p className="text-blue-100">Immerse yourself in stories with our customizable reading interface</p>
                  </div>
                  <CardContent className="p-6">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckItem text="Distraction-free reading mode" />
                      </li>
                      <li className="flex items-start">
                        <CheckItem text="Font and theme customization" />
                      </li>
                      <li className="flex items-start">
                        <CheckItem text="Progress tracking across devices" />
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-col"
              >
                <Card className="flex-1 overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6">
                    <MessagesSquare className="h-10 w-10 text-white mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Vibrant Community</h3>
                    <p className="text-amber-100">Connect with fellow writers and readers in our growing community</p>
                  </div>
                  <CardContent className="p-6">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckItem text="Thoughtful comments and feedback" />
                      </li>
                      <li className="flex items-start">
                        <CheckItem text="Reading clubs and challenges" />
                      </li>
                      <li className="flex items-start">
                        <CheckItem text="Writing contests with prizes" />
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Discover Stories Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800/30">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="trending" className="mb-12">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-2">
                    Discover Stories
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                    Explore our vast library of stories from talented writers around the world
                  </p>
                </div>
                <TabsList className="bg-white dark:bg-gray-800">
                  <TabsTrigger value="trending" className="gap-1.5">
                    <TrendingUp className="h-4 w-4" />
                    Trending
                  </TabsTrigger>
                  <TabsTrigger value="popular" className="gap-1.5">
                    <ThumbsUp className="h-4 w-4" />
                    Popular
                  </TabsTrigger>
                  <TabsTrigger value="recommended" className="gap-1.5">
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
            
            <div className="text-center mt-10">
              <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
                <Link to="/explore">
                  <Eye className="mr-2 h-5 w-5" />
                  Browse All Stories
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Premium Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <PremiumFeatureShowcase onSubscribe={openSubscriptionModal} />
          </div>
        </section>
        
        {/* Start Writing CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Share Your Story?</h2>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Join thousands of writers who have found their voice on our platform. Start writing today!
              </p>
              <Button size="lg" className="rounded-full px-10 py-6 text-lg bg-white text-purple-700 hover:bg-gray-100" asChild>
                <Link to="/write">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Start Writing
                </Link>
              </Button>
            </motion.div>
          </div>
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

// Helper component for feature checks
const CheckItem = ({ text }: { text: string }) => (
  <>
    <span className="rounded-full bg-green-100 p-1 mr-2 mt-0.5 dark:bg-green-900/30">
      <svg className="h-3 w-3 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </span>
    <span className="text-gray-700 dark:text-gray-300">{text}</span>
  </>
);

export default Index;
