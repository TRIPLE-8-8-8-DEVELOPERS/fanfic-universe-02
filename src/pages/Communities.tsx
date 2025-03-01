
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Search, 
  Star, 
  BookOpen, 
  MessageSquare, 
  TrendingUp, 
  Filter, 
  PlusCircle 
} from "lucide-react";

interface Community {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  memberCount: number;
  storyCount: number;
  discussionCount: number;
  isPopular: boolean;
  isFeatured: boolean;
  isOfficial: boolean;
  isNew: boolean;
  tags: string[];
  avatar: string;
}

const Communities = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // In a real app, we would fetch data from an API
    // This is mockup data for demonstration
    const fetchCommunities = async () => {
      // Simulate API request
      setTimeout(() => {
        setCommunities([
          {
            id: "1",
            name: "Fantasy Worldbuilders",
            description: "A community dedicated to creating and sharing detailed fantasy worlds, magic systems, and cultures",
            coverImage: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?auto=format&fit=crop&q=80&w=500",
            memberCount: 12500,
            storyCount: 1843,
            discussionCount: 756,
            isPopular: true,
            isFeatured: true,
            isOfficial: false,
            isNew: false,
            tags: ["Fantasy", "Worldbuilding", "Magic"],
            avatar: "https://images.unsplash.com/photo-1481819613568-3701cbc70156?auto=format&fit=crop&q=80&w=100"
          },
          {
            id: "2",
            name: "Sci-Fi Explorers",
            description: "Discuss futuristic technology, space travel, and alien civilizations in your science fiction stories",
            coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=500",
            memberCount: 9870,
            storyCount: 1256,
            discussionCount: 543,
            isPopular: true,
            isFeatured: false,
            isOfficial: false,
            isNew: false,
            tags: ["Science Fiction", "Space", "Technology"],
            avatar: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=100"
          },
          {
            id: "3",
            name: "Mystery Writers Society",
            description: "Share techniques for crafting the perfect mystery, from clues to red herrings to shocking reveals",
            coverImage: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&q=80&w=500",
            memberCount: 7650,
            storyCount: 982,
            discussionCount: 412,
            isPopular: false,
            isFeatured: true,
            isOfficial: false,
            isNew: false,
            tags: ["Mystery", "Thriller", "Crime"],
            avatar: "https://images.unsplash.com/photo-1545167496-61b1982e3d9d?auto=format&fit=crop&q=80&w=100"
          },
          {
            id: "4",
            name: "Romance Readers & Writers",
            description: "For those who love crafting and reading heartfelt love stories across all time periods and settings",
            coverImage: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=500",
            memberCount: 11200,
            storyCount: 2145,
            discussionCount: 875,
            isPopular: true,
            isFeatured: false,
            isOfficial: true,
            isNew: false,
            tags: ["Romance", "Love", "Relationships"],
            avatar: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&q=80&w=100"
          },
          {
            id: "5",
            name: "Historical Fiction Hub",
            description: "Dive into different time periods and discuss how to authentically represent historical settings",
            coverImage: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=500",
            memberCount: 6830,
            storyCount: 742,
            discussionCount: 389,
            isPopular: false,
            isFeatured: false,
            isOfficial: false,
            isNew: false,
            tags: ["Historical", "History", "Period Piece"],
            avatar: "https://images.unsplash.com/photo-1551009175-15bdf9dcb580?auto=format&fit=crop&q=80&w=100"
          },
          {
            id: "6",
            name: "Horror Writers Asylum",
            description: "Share your darkest creations and learn how to craft truly spine-chilling horror stories",
            coverImage: "https://images.unsplash.com/photo-1544653221-2bdf717a5e98?auto=format&fit=crop&q=80&w=500",
            memberCount: 8450,
            storyCount: 1123,
            discussionCount: 678,
            isPopular: true,
            isFeatured: false,
            isOfficial: false,
            isNew: false,
            tags: ["Horror", "Supernatural", "Thriller"],
            avatar: "https://images.unsplash.com/photo-1509557965875-b88c97052f43?auto=format&fit=crop&q=80&w=100"
          },
          {
            id: "7",
            name: "Young Adult Literature",
            description: "Connect with writers and readers passionate about YA fiction across all genres",
            coverImage: "https://images.unsplash.com/photo-1531901599634-8228da1a8e65?auto=format&fit=crop&q=80&w=500",
            memberCount: 10320,
            storyCount: 1875,
            discussionCount: 723,
            isPopular: false,
            isFeatured: true,
            isOfficial: true,
            isNew: false,
            tags: ["Young Adult", "Teen", "Coming of Age"],
            avatar: "https://images.unsplash.com/photo-1511575449290-79132dc785c0?auto=format&fit=crop&q=80&w=100"
          },
          {
            id: "8",
            name: "Poetry Corner",
            description: "For poets and poetry enthusiasts to share their work and discuss poetic forms and techniques",
            coverImage: "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?auto=format&fit=crop&q=80&w=500",
            memberCount: 5670,
            storyCount: 2435,
            discussionCount: 412,
            isPopular: false,
            isFeatured: false,
            isOfficial: false,
            isNew: true,
            tags: ["Poetry", "Verse", "Lyrical"],
            avatar: "https://images.unsplash.com/photo-1516641051054-9df6a1aae031?auto=format&fit=crop&q=80&w=100"
          },
          {
            id: "9",
            name: "Adventure Tales",
            description: "Share stories of epic journeys, quests, and explorations across fantastic worlds",
            coverImage: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&q=80&w=500",
            memberCount: 7840,
            storyCount: 987,
            discussionCount: 345,
            isPopular: false,
            isFeatured: false,
            isOfficial: false,
            isNew: true,
            tags: ["Adventure", "Action", "Quest"],
            avatar: "https://images.unsplash.com/photo-1581003794798-6ed1ad59c9e3?auto=format&fit=crop&q=80&w=100"
          }
        ]);
        setLoading(false);
      }, 1000);
    };

    fetchCommunities();
  }, []);

  // Filter communities based on search and filter
  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (filter === "all") return matchesSearch;
    if (filter === "popular") return matchesSearch && community.isPopular;
    if (filter === "featured") return matchesSearch && community.isFeatured;
    if (filter === "official") return matchesSearch && community.isOfficial;
    if (filter === "new") return matchesSearch && community.isNew;
    
    return matchesSearch;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality is already implemented through the filteredCommunities
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold font-serif text-foreground mb-2">
            <Users className="inline-block mr-2 text-primary" size={32} />
            Writing Communities
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join communities of writers and readers who share your interests. Get feedback, participate in discussions, and find inspiration for your next story.
          </p>
        </motion.div>
        
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input 
                type="text" 
                placeholder="Search communities..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setFilter('all')}
          >
            All Communities
          </Button>
          <Button 
            variant={filter === 'popular' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setFilter('popular')}
          >
            <TrendingUp className="mr-1 h-4 w-4" />
            Popular
          </Button>
          <Button 
            variant={filter === 'featured' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setFilter('featured')}
          >
            <Star className="mr-1 h-4 w-4" />
            Featured
          </Button>
          <Button 
            variant={filter === 'official' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setFilter('official')}
          >
            Official
          </Button>
          <Button 
            variant={filter === 'new' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setFilter('new')}
          >
            New
          </Button>
        </div>
        
        <Separator className="mb-8" />
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommunities.map((community) => (
                <motion.div
                  key={community.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card text-card-foreground rounded-xl overflow-hidden shadow-md"
                >
                  <div className="relative h-40">
                    <img 
                      src={community.coverImage} 
                      alt={community.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                      <Avatar className="h-10 w-10 border-2 border-white">
                        <AvatarImage src={community.avatar} />
                        <AvatarFallback>{community.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white">{community.name}</h3>
                          {community.isOfficial && (
                            <Badge variant="outline" className="bg-blue-500/80 text-white border-transparent">
                              Official
                            </Badge>
                          )}
                          {community.isNew && (
                            <Badge variant="outline" className="bg-green-500/80 text-white border-transparent">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-white/80">{community.memberCount.toLocaleString()} members</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground mb-4">{community.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {community.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-secondary/50">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between text-xs text-muted-foreground mb-4">
                      <span className="flex items-center">
                        <BookOpen className="mr-1 h-4 w-4 text-primary" />
                        {community.storyCount} stories
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="mr-1 h-4 w-4 text-primary" />
                        {community.discussionCount} discussions
                      </span>
                    </div>
                    
                    <Link to={`/community/${community.id}`}>
                      <Button className="w-full">Join Community</Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
              
              {/* Create Community Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-card/50 border-2 border-dashed border-primary/30 rounded-xl overflow-hidden h-full flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:bg-card/70 transition-colors"
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <PlusCircle size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Create a Community</h3>
                <p className="text-muted-foreground mb-6">Start your own community around your favorite writing topics</p>
                <Button>Get Started</Button>
              </motion.div>
            </div>
            
            {filteredCommunities.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">No communities found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
                <Button onClick={() => {setSearchQuery(''); setFilter('all');}}>
                  Clear Filters
                </Button>
              </div>
            )}
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Communities;
