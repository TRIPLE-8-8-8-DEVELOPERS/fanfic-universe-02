import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  BookOpen, Sparkles, TrendingUp, ThumbsUp, PlusCircle, Crown,
  Award, BookOpenCheck, Lightbulb, Feather, Eye, MessagesSquare,
  ArrowRight, Rocket, TrendingUp as TrendingUpIcon, Heart, Clock,
  Bookmark, Share2, Users, Star, PenTool, BadgeCheck, Gift,
  Megaphone, Calendar, ArrowLeft
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import FeaturedStory from "../components/FeaturedStory";
import StoryGrid from "../components/StoryGrid";
import AIWritingAssistant from "../components/AIWritingAssistant";
import PremiumFeatureShowcase from "../components/PremiumFeatureShowcase";
import PremiumFeatureAlert from "../components/writing/PremiumFeatureAlert";
import { Carousel } from "@/components/ui/carousel";
import WritingPrompt from "../components/WritingPrompt";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

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
  reads: 5680,
  editorCommentary: "A gripping tale that beautifully explores the interplay of light and shadow, both literally and metaphorically. Emma Richards masterfully unveils the mysteries of her enchanting world, keeping readers on the edge of their seats."
};

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

const topAuthors = [
  { 
    id: "author1", 
    name: "Jennifer Lee", 
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    stories: 24,
    followers: 8700,
    verified: true
  },
  { 
    id: "author2", 
    name: "Marcus Williams", 
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    stories: 17,
    followers: 5200,
    verified: true
  },
  { 
    id: "author3", 
    name: "Sophia Chen", 
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    stories: 31,
    followers: 12400,
    verified: true
  },
  { 
    id: "author4", 
    name: "Ethan Parker", 
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    stories: 15,
    followers: 4300,
    verified: false
  },
  { 
    id: "author5", 
    name: "Amara Johnson", 
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    stories: 28,
    followers: 9100,
    verified: true
  }
];

const writingPrompts = [
  "A character discovers a hidden door in their home that wasn't there before...",
  "Two strangers keep meeting in their dreams, but have never met in real life...",
  "A world where people's memories can be transferred into objects...",
  "Someone receives a mysterious letter from their future self...",
  "In a society where emotions are regulated by law..."
];

const upcomingEvents = [
  {
    id: "event1",
    title: "Summer Writing Challenge",
    date: "Jun 15 - Jul 15",
    description: "Write a complete short story in 30 days and win prizes!",
    participants: 325
  },
  {
    id: "event2",
    title: "Fantasy World Building Workshop",
    date: "May 28",
    description: "Learn how to create immersive fantasy worlds with author J.R. Martin",
    participants: 189
  },
  {
    id: "event3",
    title: "Character Development Masterclass",
    date: "Jun 5",
    description: "Transform flat characters into memorable personalities",
    participants: 204
  }
];

const communityHighlights = [
  {
    id: "highlight-1",
    title: "Top Contributor: Alex Johnson",
    description: "Alex has written 50+ stories this month!",
    icon: <BadgeCheck />,
  },
  {
    id: "highlight-2",
    title: "Most Liked Story: 'Eternal Dawn'",
    description: "Lucas Wright's story received 1200 likes!",
    icon: <Star />,
  },
  {
    id: "highlight-3",
    title: "Community Growth",
    description: "Over 500 new members joined this week!",
    icon: <Users />,
  },
];

const newBanners = [
  {
    id: "banner-1",
    title: "Summer Writing Contest",
    description: "Participate in our summer contest and win exciting prizes!",
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    link: "/contests",
  },
  {
    id: "banner-2",
    title: "Exclusive Premium Features",
    description: "Unlock advanced tools and features with Premium!",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
    link: "/premium",
  },
];

const newStories = [
  {
    id: "new-1",
    title: "The Forgotten Kingdom",
    author: "Anna Bell",
    cover: "https://images.unsplash.com/photo-1528744598421-b7d5b2a2d8e3",
    genre: "Fantasy",
    excerpt: "A young prince discovers a hidden kingdom lost to time...",
    rating: 4.9,
    likes: 1340,
    reads: 6200,
  },
  {
    id: "new-2",
    title: "Echoes of the Past",
    author: "Brian Carter",
    cover: "https://images.unsplash.com/photo-1534081333815-ae5019106622",
    genre: "Historical",
    excerpt: "A historian unravels the secrets of an ancient artifact...",
    rating: 4.8,
    likes: 1280,
    reads: 5900,
  },
];

const specialAnnouncements = [
  {
    id: "announcement-1",
    title: "New Writing Contest!",
    description: "Participate in our summer writing contest and win exciting prizes!",
    link: "/contests",
  },
  {
    id: "announcement-2",
    title: "Platform Update",
    description: "Check out the new features we've added to enhance your experience!",
    link: "/updates",
  },
];

const editorsPicks = [
  {
    id: "editors-1",
    title: "The Silent Forest",
    author: "Liam Harper",
    authorId: "liamharper",
    cover: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    genre: "Mystery",
    excerpt: "A detective unravels the secrets of a haunted forest...",
    rating: 4.9,
    likes: 1400,
    reads: 6200,
  },
  {
    id: "editors-2",
    title: "The Clockmaker's Secret",
    author: "Isabella Green",
    authorId: "igreen",
    cover: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    genre: "Historical",
    excerpt: "A clockmaker's invention changes the course of history...",
    rating: 4.8,
    likes: 1280,
    reads: 5900,
  },
];

const topRatedStories = [
  {
    id: "toprated-1",
    title: "The Eternal Flame",
    author: "Sophia Brown",
    authorId: "sophiabrown",
    cover: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    genre: "Romance",
    excerpt: "A love story that defies time...",
    rating: 5.0,
    likes: 2000,
    reads: 8000,
  },
  {
    id: "toprated-2",
    title: "The Last Voyage",
    author: "Michael Scott",
    authorId: "mscott",
    cover: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    genre: "Adventure",
    excerpt: "An epic journey across uncharted waters...",
    rating: 4.9,
    likes: 1800,
    reads: 7500,
  },
];

const userTestimonials = [
  {
    id: "testimonial-1",
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    feedback: "Fanverse has completely transformed my writing journey. The community is amazing!",
  },
  {
    id: "testimonial-2",
    name: "Sophia Lee",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    feedback: "I found my favorite stories and made lifelong friends here. Highly recommend!",
  },
];

// Ensure `newArrivals` and `fanFavorites` are defined
const newArrivals = [
  {
    id: "arrival-1",
    title: "The Forgotten Kingdom",
    author: "Emily Carter",
    authorId: "author-1",
    cover: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    genre: "Fantasy",
    excerpt: "A tale of a lost kingdom rediscovered.",
    rating: 4.8,
    likes: 1200,
    reads: 5000,
  },
  {
    id: "arrival-2",
    title: "Shadows of the Past",
    author: "Daniel Moore",
    authorId: "author-2",
    cover: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    genre: "Thriller",
    excerpt: "Unraveling secrets buried in the past.",
    rating: 4.5,
    likes: 950,
    reads: 4200,
  },
  {
    id: "arrival-3",
    title: "Echoes of Eternity",
    author: "Liam Harper",
    authorId: "author-5",
    cover: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    genre: "Sci-Fi",
    excerpt: "A journey through the fabric of time and space.",
    rating: 4.7,
    likes: 980,
    reads: 4500,
  },
  {
    id: "arrival-4",
    title: "Beneath the Waves",
    author: "Sophia Green",
    authorId: "author-6",
    cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    genre: "Adventure",
    excerpt: "Exploring the mysteries of the deep ocean.",
    rating: 4.6,
    likes: 870,
    reads: 3900,
  },
];

const fanFavorites = [
  {
    id: "favorite-1",
    title: "The Eternal Flame",
    author: "Sophia Brown",
    authorId: "author-3",
    cover: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    genre: "Romance",
    excerpt: "A love story that defies time.",
    rating: 4.9,
    likes: 1500,
    reads: 6000,
  },
  {
    id: "favorite-2",
    title: "The Last Voyage",
    author: "Michael Scott",
    authorId: "author-4",
    cover: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    genre: "Adventure",
    excerpt: "An epic journey across uncharted waters.",
    rating: 4.7,
    likes: 1100,
    reads: 4800,
  },
  {
    id: "favorite-3",
    title: "Winds of Change",
    author: "Emma White",
    authorId: "author-7",
    cover: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    genre: "Drama",
    excerpt: "A tale of resilience and transformation.",
    rating: 4.8,
    likes: 1400,
    reads: 5200,
  },
  {
    id: "favorite-4",
    title: "Starlight Serenade",
    author: "James Black",
    authorId: "author-8",
    cover: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    genre: "Romance",
    excerpt: "A love story written in the stars.",
    rating: 4.9,
    likes: 1600,
    reads: 6100,
  },
];

const featuredStories = [
  featuredStoryData,
  {
    id: "featured-2",
    title: "Whispers of the Forest",
    author: "Lila Summers",
    authorId: "lila123",
    cover: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    genre: "Mystery",
    excerpt: "A haunting melody leads a young girl into the heart of an ancient forest...",
    rating: 4.7,
    likes: 980,
    comments: 200,
    reads: 4500,
    editorCommentary: "A beautifully written mystery that keeps you guessing until the very end. Lila Summers crafts a world that is as enchanting as it is eerie."
  },
  {
    id: "featured-3",
    title: "The Clockmaker's Secret",
    author: "Ethan Clarke",
    authorId: "ethan456",
    cover: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    genre: "Steampunk",
    excerpt: "In a city powered by clockwork, one man holds the key to its survival...",
    rating: 4.8,
    likes: 1200,
    comments: 300,
    reads: 5000,
    editorCommentary: "Ethan Clarke's steampunk adventure is a masterclass in world-building and storytelling. A must-read for fans of the genre."
  },
  {
    id: "featured-4",
    title: "Echoes of Eternity",
    author: "Sophia Bennett",
    authorId: "sophia789",
    cover: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    genre: "Fantasy",
    excerpt: "A young mage discovers a hidden power that could change the fate of her world...",
    rating: 4.9,
    likes: 1500,
    comments: 250,
    reads: 5200,
    editorCommentary: "Sophia Bennett weaves a tale of magic and destiny that captivates from the first page."
  },
  {
    id: "featured-5",
    title: "Beneath the Waves",
    author: "Liam Harper",
    authorId: "liam123",
    cover: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    genre: "Adventure",
    excerpt: "An underwater expedition uncovers secrets long buried...",
    rating: 4.7,
    likes: 1100,
    comments: 180,
    reads: 4800,
    editorCommentary: "Liam Harper's adventure story is a thrilling dive into the unknown."
  },
  {
    id: "featured-6",
    title: "Shadows of the Past",
    author: "Isabella Cruz",
    authorId: "isabella456",
    cover: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    genre: "Thriller",
    excerpt: "A detective must confront her own past to solve a chilling case...",
    rating: 4.8,
    likes: 1300,
    comments: 220,
    reads: 4900,
    editorCommentary: "Isabella Cruz delivers a gripping thriller that keeps you on the edge of your seat."
  },
  {
    id: "featured-7",
    title: "The Forgotten Kingdom",
    author: "Oliver Stone",
    authorId: "oliver789",
    cover: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    genre: "Historical Fiction",
    excerpt: "A historian uncovers the truth about a lost civilization...",
    rating: 4.6,
    likes: 1000,
    comments: 150,
    reads: 4600,
    editorCommentary: "Oliver Stone's historical fiction is both enlightening and entertaining."
  },
  {
    id: "featured-8",
    title: "Celestial Dreams",
    author: "Emily Rose",
    authorId: "emily123",
    cover: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    genre: "Sci-Fi",
    excerpt: "A journey through the stars reveals the true meaning of home...",
    rating: 4.9,
    likes: 1600,
    comments: 300,
    reads: 5500,
    editorCommentary: "Emily Rose's sci-fi epic is a beautifully written exploration of humanity and the cosmos."
  }
];

const Index = () => {
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [activePrompt, setActivePrompt] = useState(0);
  const controls = useAnimation();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePrompt((prev) => (prev + 1) % writingPrompts.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    controls.start({
      y: [20, 0],
      opacity: [0, 1],
      transition: { duration: 0.5 }
    });
  }, [activePrompt, controls]);

  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      emblaApi?.scrollNext();
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(autoSlideInterval);
  }, [emblaApi]);

  const handleSubscribe = () => {
    setIsPremium(true);
    setIsSubscriptionModalOpen(false);
    toast.success("Welcome to FANVERSE Premium! Enjoy all features.");
  };

  const openSubscriptionModal = () => {
    setIsSubscriptionModalOpen(true);
  };

  const handleStartWriting = () => {
    toast.success("Opening the writing editor. Let your creativity flow!");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        
        <main className="flex-1 overflow-auto">
          <section className="relative py-20 md:py-32 overflow-hidden hero-pattern">
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
                  <Badge className="mb-6 text-sm py-1.5 px-4 bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/50 dark:text-purple-200 dark:hover:bg-purple-900 flex items-center w-fit">
                    <Sparkles className="w-4 h-4 mr-1.5" />
                    Creativity Unleashed
                  </Badge>
                  
                  <motion.h1
                    className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight mb-6 text-gradient"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    FANVERSE
                  </motion.h1>
                  
                  <motion.p
                    className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Join our community of passionate writers and readers. Create immersive worlds, share captivating tales, and discover your next favorite story.
                  </motion.p>
                  
                  <div className="flex flex-wrap gap-4">
                    <Button size="lg" className="rounded-full px-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md hover-lift" asChild onClick={handleStartWriting}>
                      <Link to="/write">
                        <Feather className="mr-2 h-5 w-5" />
                        Start Writing
                      </Link>
                    </Button>
                    
                    <Button size="lg" variant="outline" className="rounded-full px-8 border-gray-300 dark:border-gray-700 hover-lift" asChild>
                      <Link to="/browse">
                        <BookOpen className="mr-2 h-5 w-5" />
                        Explore Stories
                      </Link>
                    </Button>
                    
                    {!isPremium && (
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="rounded-full px-8 border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-950/20 hover-lift"
                        onClick={openSubscriptionModal}
                      >
                        <Crown className="mr-2 h-5 w-5 text-amber-500" />
                        Try Premium
                      </Button>
                    )}
                  </div>
                  
                  <div className="mt-10 max-w-lg">
                    <div className="flex items-center mb-3">
                      <Lightbulb className="h-5 w-5 text-amber-500 mr-2" />
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Daily Writing Prompt</h3>
                    </div>
                    <motion.div 
                      className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                      key={activePrompt}
                      initial={{ opacity: 0, y: 20 }}
                      animate={controls}
                    >
                      <p className="text-gray-700 dark:text-gray-300 italic">{writingPrompts[activePrompt]}</p>
                      <Button variant="link" size="sm" className="mt-2 p-0 h-auto" asChild>
                        <Link to="/write" className="flex items-center">
                          Write now <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </motion.div>
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
          
          <section className="py-10 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col items-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <PenTool className="h-8 w-8 text-purple-500 mb-3" />
                  <span className="text-3xl font-bold">250K+</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Stories Written</span>
                </div>
                <div className="flex flex-col items-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Users className="h-8 w-8 text-blue-500 mb-3" />
                  <span className="text-3xl font-bold">1.2M+</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Active Users</span>
                </div>
                <div className="flex flex-col items-center p-6 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                  <Heart className="h-8 w-8 text-pink-500 mb-3" />
                  <span className="text-3xl font-bold">15M+</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Story Likes</span>
                </div>
                <div className="flex flex-col items-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <BookOpen className="h-8 w-8 text-green-500 mb-3" />
                  <span className="text-3xl font-bold">45M+</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Reading Hours</span>
                </div>
              </div>
            </div>
          </section>
          
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
                  Featured Stories
                </h2>
                <p className="text-gray-600 dark:text-gray-400">Our editors' picks for the best stories of the week</p>
              </motion.div>
              
              <div className="embla" ref={emblaRef}>
                <div className="embla__container flex">
                  {featuredStories.map((story) => (
                    <div className="embla__slide flex-shrink-0 w-full" key={story.id}>
                      <FeaturedStory {...story} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="embla__buttons">
                <button onClick={() => emblaApi?.scrollPrev()} className="embla__button embla__button--prev">
                  <ArrowLeft />
                </button>
                <button onClick={() => emblaApi?.scrollNext()} className="embla__button embla__button--next">
                  <ArrowRight />
                </button>
              </div>
            </div>
          </section>
          
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold tracking-tight mb-2 flex items-center">
                  <Star className="mr-3 text-amber-500" />
                  Top Authors
                </h2>
                <p className="text-gray-600 dark:text-gray-400">Discover talented writers making waves in our community</p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {topAuthors.map((author) => (
                  <Card key={author.id} className="hover-lift border-glow overflow-hidden">
                    <CardContent className="p-0">
                      <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/20 p-6 text-center">
                        <Avatar className="h-20 w-20 mx-auto border-4 border-white dark:border-gray-800 shadow-lg">
                          <AvatarImage src={author.avatar} alt={author.name} />
                          <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h3 className="mt-4 font-semibold flex items-center justify-center">
                          {author.name}
                          {author.verified && (
                            <BadgeCheck className="h-4 w-4 text-blue-500 ml-1" />
                          )}
                        </h3>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {author.stories} stories
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {author.followers.toLocaleString()} followers
                        </div>
                        <Button variant="outline" size="sm" className="mt-4 w-full">
                          Follow
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Button variant="outline" className="rounded-full" asChild>
                  <Link to="/authors">
                    View All Authors <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
          
          <section className="py-16 bg-gray-50 dark:bg-gray-800/30">
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
                  <Card className="flex-1 overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow hover-lift">
                    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-6">
                      <Feather className="h-10 w-10 text-white mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">Intuitive Editor</h3>
                      <p className="text-purple-100">Write with our powerful yet simple editor with AI-powered assistance</p>
                    </div>
                    <CardContent className="p-6">
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          Rich formatting options
                        </li>
                        <li className="flex items-start">
                          AI writing suggestions
                        </li>
                        <li className="flex items-start">
                          Auto-save functionality
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
                  <Card className="flex-1 overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow hover-lift">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-6">
                      <BookOpenCheck className="h-10 w-10 text-white mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">Reading Experience</h3>
                      <p className="text-blue-100">Immerse yourself in stories with our customizable reading interface</p>
                    </div>
                    <CardContent className="p-6">
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          Distraction-free reading mode
                        </li>
                        <li className="flex items-start">
                          Font and theme customization
                        </li>
                        <li className="flex items-start">
                          Progress tracking across devices
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
                  <Card className="flex-1 overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow hover-lift">
                    <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6">
                      <MessagesSquare className="h-10 w-10 text-white mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">Vibrant Community</h3>
                      <p className="text-amber-100">Connect with fellow writers and readers in our growing community</p>
                    </div>
                    <CardContent className="p-6">
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          Thoughtful comments and feedback
                        </li>
                        <li className="flex items-start">
                          Reading clubs and challenges
                        </li>
                        <li className="flex items-start">
                          Writing contests with prizes
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </section>
          
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold tracking-tight mb-2 flex items-center">
                  <Calendar className="mr-3 text-purple-500" />
                  Upcoming Events
                </h2>
                <p className="text-gray-600 dark:text-gray-400">Join these exciting events to improve your skills and connect with other writers</p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="hover-lift overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
                    <CardHeader>
                      <CardTitle>{event.title}</CardTitle>
                      <CardDescription>
                        <span className="font-medium text-purple-600 dark:text-purple-400">{event.date}</span> • {event.participants} participants
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{event.description}</p>
                      <Button variant="outline" size="sm" className="mt-4 w-full">
                        Remind Me
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 text-center">
                <h3 className="text-xl font-semibold mb-2">Have an event idea?</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Submit your proposal for a community event, workshop, or challenge</p>
                <Button>
                  <Gift className="mr-2 h-4 w-4" />
                  Submit Event Idea
                </Button>
              </div>
            </div>
          </section>
          
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold tracking-tight mb-2 flex items-center">
                  <Megaphone className="mr-3 text-purple-500" />
                  Special Announcements
                </h2>
                <p className="text-gray-600 dark:text-gray-400">Stay updated with the latest news and events</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {specialAnnouncements.map((announcement) => (
                  <div key={announcement.id} className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-2">{announcement.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{announcement.description}</p>
                    <Button variant="link" asChild>
                      <Link to={announcement.link}>Learn More</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold tracking-tight mb-2 flex items-center">
                  <BookOpen className="mr-3 text-blue-500" />
                  New Arrivals
                </h2>
                <p className="text-gray-600 dark:text-gray-400">Discover the latest stories added to our platform</p>
              </motion.div>

              <StoryGrid title="New Arrivals" stories={newArrivals} />
            </div>
          </section>
          
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
                  <Heart className="mr-3 text-pink-500" />
                  Fan Favorites
                </h2>
                <p className="text-gray-600 dark:text-gray-400">Check out the stories our community loves the most</p>
              </motion.div>

              <StoryGrid title="Fan Favorites" stories={fanFavorites} />
            </div>
          </section>
          
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
                <Button size="lg" className="rounded-full px-10 py-6 text-lg bg-white text-purple-700 hover:bg-gray-100 hover-lift" asChild>
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
        
        <PremiumFeatureAlert
          isOpen={isSubscriptionModalOpen}
          onClose={() => setIsSubscriptionModalOpen(false)}
          onSubscribe={handleSubscribe}
        />
      </div>
    </div>
  );
};

export default Index;
