<lov-code>
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  BookOpen, 
  PenTool, 
  Users, 
  Mail, 
  ArrowRight, 
  Zap, 
  Play, 
  Tv, 
  Radio, 
  Clock, 
  TrendingUp,
  Heart,
  ThumbsUp
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeaturedStory from "@/components/FeaturedStory";
import StoryGrid from "@/components/StoryGrid";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import VideoUploader from "@/components/VideoUploader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const featuredStory = {
  id: "1",
  title: "The Dragon's Prophecy",
  author: "Eleanor Williams",
  authorId: "eleanor",
  cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1684&q=80",
  genre: "Fantasy",
  excerpt: "When the ancient prophecy of the Dragon's Return begins to unfold, Lyra finds herself at the center of a thousand-year-old mystery that could either save her kingdom or destroy it completely.",
  rating: 4.8,
  likes: 12503,
  comments: 2842,
  reads: 89752,
};

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

const popularStories = [
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

const liveStreams = [
  {
    id: "stream1",
    title: "Writing Fantasy Worlds with Eleanor Williams",
    author: "Eleanor Williams",
    authorId: "eleanor",
    thumbnail: "https://images.unsplash.com/photo-1492551557933-34265f7af79e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    viewers: 1342,
    isLive: true,
    startTime: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
  },
  {
    id: "stream2",
    title: "Sci-Fi Character Development Workshop",
    author: "Micah Chen",
    authorId: "micah",
    thumbnail: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    viewers: 856,
    isLive: true,
    startTime: new Date(Date.now() - 20 * 60 * 1000).toISOString(), // 20 minutes ago
  },
  {
    id: "stream3",
    title: "Romance Writing: Creating Chemistry Between Characters",
    author: "Sofia Garcia",
    authorId: "sofia",
    thumbnail: "https://images.unsplash.com/photo-1513001900722-370f803f498d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    viewers: 721,
    isLive: true,
    startTime: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 minutes ago
  },
];

const upcomingStreams = [
  {
    id: "upcoming1",
    title: "Mystery Writing Masterclass",
    author: "James Holden",
    authorId: "james",
    thumbnail: "https://images.unsplash.com/photo-1551029506-0807df4e2031?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1891&q=80",
    scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    registeredViewers: 342,
  },
  {
    id: "upcoming2",
    title: "World-Building for Epic Fantasy Series",
    author: "Marcus Reed",
    authorId: "marcus",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
    scheduledTime: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(), // 5 hours from now
    registeredViewers: 523,
  },
];

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type NewsletterForm = z.infer<typeof newsletterSchema>;

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("live");
  const [videoInput, setVideoInput] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);
  
  const form = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    setIsLoaded(true);
    
    // Parallax effect for hero section
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY;
        heroRef.current.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = (data: NewsletterForm) => {
    console.log("Subscribing email:", data.email);
    toast.success("Thanks for subscribing to our newsletter!");
    form.reset();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`Searching for: ${searchQuery}`);
      console.log("Search query:", searchQuery);
    }
  };

  const formatStreamTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const calculateStreamDuration = (isoString: string) => {
    const startTime = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - startTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins}m`;
    } else {
      const hours = Math.floor(diffMins / 60);
      const mins = diffMins % 60;
      return `${hours}h ${mins}m`;
    }
  };

  const handleVideoUpload = (url: string) => {
    console.log("Video uploaded:", url);
    toast.success("Your video has been uploaded and is being processed!");
    setVideoInput(url);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section with video background and parallax effect */}
        <div 
          ref={heroRef}
          className="relative h-[80vh] bg-cover bg-center bg-fixed flex items-center justify-center overflow-hidden"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1684&q=80)', 
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-black/50"></div>
          
          <div className="container relative z-10 text-white max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 font-serif leading-tight">
                <span className="text-blue-300">Immerse Yourself</span> in <br />
                Stories That Move You
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Read, Write, Watch, and Connect with Fan Fiction Like Never Before
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mb-12"
            >
              <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Discover stories, authors, or live streams..."
                  className="flex-grow rounded-full pl-5 pr-12 py-7 border-blue-300/30 bg-white/10 backdrop-blur-md text-white placeholder:text-blue-100/70 focus-visible:ring-blue-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  type="submit" 
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-blue-500 hover:bg-blue-600"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </form>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link to="/browse">
                <Button
                  variant="default"
                  size="lg"
                  className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <BookOpen className="mr-2 h-5 w-5" /> Browse Stories
                </Button>
              </Link>
              <Link to="/live">
                <Button
                  variant="secondary"
                  size="lg"
                  className="rounded-full px-8 bg-blue-500/20 hover:bg-blue-500/30 text-white border border-blue-400/30"
                >
                  <Tv className="mr-2 h-5 w-5" /> Watch Streams
                </Button>
              </Link>
              <Link to="/write">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 border-blue-400/50 hover:bg-blue-400/10 text-white"
                >
                  <PenTool className="mr-2 h-5 w-5" /> Start Writing
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Featured streaming section */}
        <section className="py-16 bg-gradient-to-b from-blue-900 to-blue-950">
          <div className="container">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-white">
                <Tv className="inline-block mr-2 mb-1" /> Live Story Streams
              </h2>
              <p className="text-lg text-blue-200 max-w-2xl mx-auto">
                Watch authors craft stories in real-time, join writing workshops, and participate in interactive storytelling sessions
              </p>
            </div>

            <Tabs defaultValue="live" className="mb-16">
              <TabsList className="mb-8 bg-blue-800/30 p-1 border border-blue-700/50 mx-auto w-fit">
                <TabsTrigger 
                  value="live" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-200"
                  onClick={() => setActiveTab("live")}
                >
                  <Zap className="h-4 w-4 mr-2" /> Live Now
                </TabsTrigger>
                <TabsTrigger 
                  value="upcoming" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-200"
                  onClick={() => setActiveTab("upcoming")}
                >
                  <Clock className="h-4 w-4 mr-2" /> Coming Soon
                </TabsTrigger>
                <TabsTrigger 
                  value="your-stream" 
                  className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-200"
                  onClick={() => setActiveTab("your-stream")}
                >
                  <Play className="h-4 w-4 mr-2" /> Create Stream
                </TabsTrigger>
              </TabsList>

              <TabsContent value="live" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {liveStreams.map((stream) => (
                    <motion.div
                      key={stream.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="group relative rounded-xl overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
                      <img 
                        src={stream.thumbnail} 
                        alt={stream.title} 
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3 z-20">
                        <Badge className="bg-red-600 text-white font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                          <span className="animate-pulse w-2 h-2 bg-white rounded-full inline-block"></span>
                          LIVE
                        </Badge>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                        <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2">{stream.title}</h3>
                        <p className="text-blue-200 text-sm mb-2">by {stream.author}</p>
                        <div className="flex justify-between items-center text-sm text-blue-100">
                          <span className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" /> {stream.viewers.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" /> {calculateStreamDuration(stream.startTime)}
                          </span>
                        </div>
                      </div>
                      <Link 
                        to={`/stream/${stream.id}`} 
                        className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 rounded-full">
                          <Play className="mr-2 h-4 w-4" /> Watch Now
                        </Button>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Link to="/streams">
                    <Button variant="outline" className="rounded-full border-blue-500/50 text-blue-200 hover:bg-blue-800/30">
                      View All Live Streams <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </TabsContent>

              <TabsContent value="upcoming" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {upcomingStreams.map((stream) => (
                    <motion.div
                      key={stream.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="bg-blue-800/20 backdrop-blur-md border border-blue-700/30 rounded-xl overflow-hidden"
                    >
                      <img 
                        src={stream.thumbnail} 
                        alt={stream.title} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-white mb-1">{stream.title}</h3>
                        <p className="text-blue-200 text-sm mb-3">by {stream.author}</p>
                        <div className="flex justify-between items-center text-sm text-blue-100 mb-4">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" /> {formatStreamTime(stream.scheduledTime)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" /> {stream.registeredViewers} interested
                          </span>
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-full">
                          Set Reminder
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Link to="/streams/upcoming">
                    <Button variant="outline" className="rounded-full border-blue-500/50 text-blue-200 hover:bg-blue-800/30">
                      View All Upcoming Streams <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </TabsContent>

              <TabsContent value="your-stream" className="mt-0">
                <Card className="bg-blue-800/20 backdrop-blur-md border border-blue-700/30">
                  <CardContent className="pt-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold text-white mb-2">Create Your Own Stream</h3>
                      <p className="text-blue-200">Share your writing process live with your fans and followers</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-lg font-medium text-white mb-4">Upload Cover Image or Video</h4>
                        <VideoUploader onVideoUploaded={handleVideoUpload} />
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-blue-200 mb-1">Stream Title</label>
                          <Input 
                            placeholder="Enter a catchy title for your stream" 
                            className="bg-blue-900/50 border-blue-700/50 text-white placeholder:text-blue-300/50"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-blue-200 mb-1">Description</label>
                          <textarea 
                            rows={4}
                            placeholder="What will you be sharing in this stream?" 
                            className="w-full rounded-md bg-blue-900/50 border-blue-700/50 text-white placeholder:text-blue-300/50 p-3"
                          ></textarea>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-blue-200 mb-1">When would you like to start?</label>
                          <div className="flex gap-3">
                            <Button 
                              variant="outline" 
                              className="flex-1 bg-blue-600/30 border-blue-500/50 text-white hover:bg-blue-600/50"
                            >
                              <Zap className="mr-2 h-4 w-4" /> Start Now
                            </Button>
                            <Button 
                              variant="outline" 
                              className="flex-1 bg-blue-900/50 border-blue-700/50 text-white hover:bg-blue-800"
                            >
                              <Clock className="mr-2 h-4 w-4" /> Schedule
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="pt-16 pb-16 md:pt-24 md:pb-24 bg-gradient-to-b from-blue-950 to-slate-900">
          <div className="container mb-16">
            <div className="mb-8 text-center">
              <Badge variant="outline" className="mb-4 text-blue-300 border-blue-500/50 px-4 py-1 text-sm">
                <TrendingUp className="mr-2 h-4 w-4" /> Featured Story
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-white">
                Spotlight on Excellence
              </h2>
              <p className="text-lg text-blue-200 max-w-2xl mx-auto">
                Dive into our editors' pick of the week - a story that's captivating readers across the platform
              </p>
            </div>
            <FeaturedStory {...featuredStory} />
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-slate-900 to-blue-950">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-4 font-serif text-white"
              >
                Discover the World of Fan Fiction
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-blue-200 text-lg"
              >
                Immerse yourself in captivating stories, connect with fellow fans, and
