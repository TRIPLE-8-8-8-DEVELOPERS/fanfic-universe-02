
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, User, Users, Calendar, Clock, Filter, Bookmark, Heart, Share2, ThumbsUp, Zap, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Mock data for live streams
const liveStreams = [
  {
    id: 1,
    title: "Writing my fantasy epic live - Chapter 15",
    author: {
      name: "ElvenScribe",
      avatar: "https://i.pravatar.cc/150?u=elvenscribe",
      followers: 4850
    },
    thumbnail: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZhbnRhc3l8ZW58MHx8MHx8fDA%3D",
    genre: "Fantasy",
    viewers: 432,
    duration: "01:45:22",
    live: true,
    tags: ["Epic", "Live Writing", "Dragon Tales"],
    featured: true
  },
  {
    id: 2,
    title: "Mystery plotting session - Working on clues",
    author: {
      name: "DetectiveNovelist",
      avatar: "https://i.pravatar.cc/150?u=detective",
      followers: 3200
    },
    thumbnail: "https://images.unsplash.com/photo-1532673492-1b3cdb05d51b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG15c3Rlcnl8ZW58MHx8MHx8fDA%3D",
    genre: "Mystery",
    viewers: 245,
    duration: "00:52:10",
    live: true,
    tags: ["Mystery", "Plot Development", "Suspense"],
    featured: false
  },
  {
    id: 3,
    title: "Romance writing workshop - Character dynamics",
    author: {
      name: "HeartfeltPages",
      avatar: "https://i.pravatar.cc/150?u=romance",
      followers: 5600
    },
    thumbnail: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9tYW5jZXxlbnwwfHwwfHx8MA%3D%3D",
    genre: "Romance",
    viewers: 678,
    duration: "01:23:15",
    live: true,
    tags: ["Romance", "Workshop", "Character Development"],
    featured: true
  },
  {
    id: 4,
    title: "Sci-fi worldbuilding - Designing alien civilizations",
    author: {
      name: "StarDreamer",
      avatar: "https://i.pravatar.cc/150?u=scifi",
      followers: 7820
    },
    thumbnail: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2NpZmklMjBwbGFuZXR8ZW58MHx8MHx8fDA%3D",
    genre: "Science Fiction",
    viewers: 512,
    duration: "02:05:33",
    live: true,
    tags: ["Sci-Fi", "Worldbuilding", "Aliens"],
    featured: false
  }
];

// Mock data for upcoming streams
const upcomingStreams = [
  {
    id: 5,
    title: "Horror writing marathon - Halloween special",
    author: {
      name: "MidnightScribe",
      avatar: "https://i.pravatar.cc/150?u=horror",
      followers: 3450
    },
    thumbnail: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhvcnJvcnxlbnwwfHwwfHx8MA%3D%3D",
    genre: "Horror",
    startTime: "Tomorrow, 8:00 PM",
    duration: "3 hours",
    tags: ["Horror", "Marathon", "Halloween"],
    interested: 289
  },
  {
    id: 6,
    title: "Young Adult novel drafting - Working on my debut",
    author: {
      name: "TeenFiction",
      avatar: "https://i.pravatar.cc/150?u=ya",
      followers: 2100
    },
    thumbnail: "https://images.unsplash.com/photo-1543187018-21e461e7529e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGVlbiUyMGZpY3Rpb258ZW58MHx8MHx8fDA%3D",
    genre: "Young Adult",
    startTime: "This Friday, 5:30 PM",
    duration: "2 hours",
    tags: ["YA", "Novel Writing", "Coming of Age"],
    interested: 176
  }
];

// Mock data for recorded streams
const recordedStreams = [
  {
    id: 7,
    title: "Historical fiction research techniques",
    author: {
      name: "HistoryPen",
      avatar: "https://i.pravatar.cc/150?u=history",
      followers: 4200
    },
    thumbnail: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGlzdG9yaWNhbHxlbnwwfHwwfHx8MA%3D",
    genre: "Historical Fiction",
    views: 3450,
    duration: "01:12:45",
    date: "2 days ago",
    tags: ["Historical", "Research", "Writing Tips"],
    likes: 342
  },
  {
    id: 8,
    title: "Poetry slam and feedback session",
    author: {
      name: "VerseMaster",
      avatar: "https://i.pravatar.cc/150?u=poetry",
      followers: 2800
    },
    thumbnail: "https://images.unsplash.com/photo-1470072768013-bf9532016c10?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cG9ldHJ5fGVufDB8fDB8fHww",
    genre: "Poetry",
    views: 1820,
    duration: "00:58:32",
    date: "1 week ago",
    tags: ["Poetry", "Slam", "Feedback"],
    likes: 215
  }
];

// Genre filter options
const genres = [
  "All Genres",
  "Fantasy",
  "Science Fiction",
  "Mystery",
  "Romance",
  "Horror", 
  "Historical Fiction",
  "Young Adult",
  "Poetry"
];

const WatchStreams = () => {
  const [activeTab, setActiveTab] = useState("live");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filterStreams = (streams) => {
    return streams.filter(stream => {
      const matchesGenre = selectedGenre === "All Genres" || stream.genre === selectedGenre;
      const matchesSearch = searchQuery === "" || 
        stream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stream.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stream.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesGenre && matchesSearch;
    });
  };

  const filteredLiveStreams = filterStreams(liveStreams);
  const filteredUpcomingStreams = filterStreams(upcomingStreams);
  const filteredRecordedStreams = filterStreams(recordedStreams);

  // Fade in animation for content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Writer Streams</h1>
              <p className="text-muted-foreground">Watch authors create stories live, learn from tutorials, or join interactive workshops</p>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="default" className="gap-2">
                <Zap size={16} />
                Go Live
              </Button>
              <Button variant="outline" className="gap-2">
                <Calendar size={16} />
                Schedule Stream
              </Button>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-card rounded-xl p-4 mb-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex-1 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    placeholder="Search streams, authors, or tags..."
                    className="pl-10 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium">Genre:</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {genres.map((genre) => (
                    <Badge 
                      key={genre}
                      variant={selectedGenre === genre ? "default" : "outline"} 
                      className={`cursor-pointer ${selectedGenre === genre ? '' : 'hover:bg-muted'}`}
                      onClick={() => setSelectedGenre(genre)}
                    >
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tab navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full md:w-auto grid-cols-3 mb-2">
              <TabsTrigger value="live" className="gap-2">
                <Zap size={16} className="text-red-500" />
                <span>Live Now</span>
                <Badge variant="outline" className="ml-1 bg-red-50 text-red-600 border-red-100">
                  {filteredLiveStreams.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="gap-2">
                <Calendar size={16} />
                <span>Upcoming</span>
                <Badge variant="outline" className="ml-1">
                  {filteredUpcomingStreams.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="recorded" className="gap-2">
                <Play size={16} /> 
                <span>Recorded</span>
                <Badge variant="outline" className="ml-1">
                  {filteredRecordedStreams.length}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Featured stream */}
          {activeTab === "live" && filteredLiveStreams.some(stream => stream.featured) && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Featured Stream</h2>
              {filteredLiveStreams.filter(stream => stream.featured).slice(0, 1).map(stream => (
                <div key={stream.id} className="relative rounded-xl overflow-hidden">
                  <div className="aspect-video relative overflow-hidden rounded-xl">
                    <img 
                      src={stream.thumbnail} 
                      alt={stream.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6">
                      <Badge variant="outline" className="mb-2 w-fit bg-red-500/90 text-white border-none backdrop-blur-sm">
                        LIVE NOW
                      </Badge>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{stream.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar className="h-8 w-8 border-2 border-white/20">
                          <AvatarImage src={stream.author.avatar} />
                          <AvatarFallback>{stream.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white font-medium">{stream.author.name}</p>
                          <p className="text-xs text-white/70">{stream.author.followers.toLocaleString()} followers</p>
                        </div>
                      </div>
                      <div className="flex gap-3 flex-wrap">
                        <Badge variant="outline" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
                          <Users size={14} className="mr-1" /> {stream.viewers} watching
                        </Badge>
                        <Badge variant="outline" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
                          <Clock size={14} className="mr-1" /> {stream.duration}
                        </Badge>
                        <Badge variant="outline" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
                          {stream.genre}
                        </Badge>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button className="gap-2 bg-primary text-white">
                          <Play size={16} />
                          Watch Now
                        </Button>
                        <Button variant="outline" className="gap-2 bg-white/10 text-white border-white/20 hover:bg-white/20">
                          <Bookmark size={16} />
                          Save for Later
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stream grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="aspect-video bg-muted"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-muted"></div>
                      <div>
                        <div className="h-3 bg-muted rounded w-24 mb-1"></div>
                        <div className="h-2 bg-muted rounded w-16"></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-6 bg-muted rounded w-16"></div>
                      <div className="h-6 bg-muted rounded w-16"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {activeTab === "live" && filteredLiveStreams.map(stream => (
                <motion.div key={stream.id} variants={itemVariants}>
                  <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                    <div className="relative">
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={stream.thumbnail} 
                          alt={stream.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        />
                      </div>
                      <Badge 
                        variant="outline" 
                        className="absolute top-2 right-2 bg-red-500 text-white border-none animate-pulse"
                      >
                        LIVE
                      </Badge>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                        {stream.duration}
                      </div>
                    </div>
                    <CardContent className="p-4 flex-1 flex flex-col">
                      <h3 className="font-semibold mb-1 line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                        {stream.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={stream.author.avatar} />
                          <AvatarFallback>{stream.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{stream.author.name}</p>
                          <p className="text-xs text-muted-foreground">{stream.author.followers.toLocaleString()} followers</p>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap mb-3 mt-auto">
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-none text-xs">
                          <Users size={12} className="mr-1" /> {stream.viewers}
                        </Badge>
                        <Badge variant="secondary" className="bg-muted text-xs">
                          {stream.genre}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {stream.tags.map((tag, i) => (
                          <span key={i} className="text-xs text-muted-foreground hover:text-primary cursor-pointer">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {activeTab === "upcoming" && filteredUpcomingStreams.map(stream => (
                <motion.div key={stream.id} variants={itemVariants}>
                  <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                    <div className="relative">
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={stream.thumbnail} 
                          alt={stream.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300 filter brightness-90"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="text-white" size={14} />
                          <span className="text-white text-sm font-medium">{stream.startTime}</span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4 flex-1 flex flex-col">
                      <h3 className="font-semibold mb-1 line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                        {stream.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={stream.author.avatar} />
                          <AvatarFallback>{stream.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{stream.author.name}</p>
                          <p className="text-xs text-muted-foreground">{stream.author.followers.toLocaleString()} followers</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mb-3 mt-auto">
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                          <Clock size={12} className="mr-1" /> {stream.duration}
                        </Badge>
                        <Badge variant="secondary">
                          {stream.genre}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-1">
                          {stream.tags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="text-xs text-muted-foreground hover:text-primary cursor-pointer">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                          <Users size={12} className="mr-1" /> {stream.interested} interested
                        </Badge>
                      </div>
                      <Separator className="my-3" />
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 h-9">Remind Me</Button>
                        <Button variant="default" className="flex-1 h-9">Interested</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {activeTab === "recorded" && filteredRecordedStreams.map(stream => (
                <motion.div key={stream.id} variants={itemVariants}>
                  <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                    <div className="relative">
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={stream.thumbnail} 
                          alt={stream.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                        {stream.duration}
                      </div>
                      <Button variant="ghost" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center p-0 group">
                        <Play size={24} className="text-white group-hover:scale-110 transition-transform" />
                      </Button>
                    </div>
                    <CardContent className="p-4 flex-1 flex flex-col">
                      <h3 className="font-semibold mb-1 line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                        {stream.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={stream.author.avatar} />
                          <AvatarFallback>{stream.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{stream.author.name}</p>
                          <p className="text-xs text-muted-foreground">{stream.author.followers.toLocaleString()} followers</p>
                        </div>
                      </div>
                      <div className="flex justify-between mb-3">
                        <Badge variant="secondary" className="bg-muted">
                          {stream.genre}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          {stream.date} • {stream.views.toLocaleString()} views
                        </div>
                      </div>
                      <div className="flex gap-2 mt-auto">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <ThumbsUp size={16} className="mr-1" /> {stream.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Share2 size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2 ml-auto">
                          <Bookmark size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {(activeTab === "live" && filteredLiveStreams.length === 0) || 
           (activeTab === "upcoming" && filteredUpcomingStreams.length === 0) || 
           (activeTab === "recorded" && filteredRecordedStreams.length === 0) ? (
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Search size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No streams found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We couldn't find any streams matching your current filters. Try adjusting your search or check back later.
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSelectedGenre("All Genres");
                  setSearchQuery("");
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : null}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WatchStreams;
