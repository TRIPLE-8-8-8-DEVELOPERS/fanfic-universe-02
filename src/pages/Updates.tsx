
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, BookOpen, Star, Heart, MessageSquare, PenTool, Plus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock updates data
const recentStories = [
  {
    id: "update1",
    type: "new_story",
    timestamp: "2 hours ago",
    author: {
      id: "author1",
      name: "Eleanor Williams",
      avatar: "https://i.pravatar.cc/150?img=29",
    },
    story: {
      id: "story1",
      title: "The Dragon's Symphony",
      cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1684&q=80",
      excerpt: "When the ancient melodies of dragon song begin to echo across the realm, an unlikely hero must embrace her destiny.",
      genre: "Fantasy",
    },
  },
  {
    id: "update2",
    type: "new_chapter",
    timestamp: "5 hours ago",
    author: {
      id: "author2",
      name: "Marcus Reed",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    story: {
      id: "story2",
      title: "Echoes of Eternity",
      cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      chapter: "Chapter 15: The Immortal's Dilemma",
      excerpt: "As the council of gods deliberates, Thorne discovers a terrible truth about his own origins that changes everything.",
      genre: "Fantasy",
    },
  },
  {
    id: "update3",
    type: "new_story",
    timestamp: "Yesterday",
    author: {
      id: "author3",
      name: "Sofia Garcia",
      avatar: "https://i.pravatar.cc/150?img=16",
    },
    story: {
      id: "story3",
      title: "Whispers in Venice",
      cover: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1746&q=80",
      excerpt: "When American art historian Clara accepts a mysterious invitation to Venice, she becomes entangled in a centuries-old romance.",
      genre: "Romance",
    },
  },
  {
    id: "update4",
    type: "new_chapter",
    timestamp: "Yesterday",
    author: {
      id: "author4",
      name: "James Holden",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    story: {
      id: "story4",
      title: "The Silent Detective",
      cover: "https://images.unsplash.com/photo-1509475826633-fed577a2c71b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
      chapter: "Chapter 8: The Vanishing Witness",
      excerpt: "A key witness disappears hours before they're set to testify, and Detective Morgan suspects an inside job.",
      genre: "Mystery",
    },
  },
];

const popularUpdates = [
  {
    id: "popular1",
    type: "new_chapter",
    timestamp: "2 days ago",
    author: {
      id: "author2",
      name: "Marcus Reed",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    story: {
      id: "story2",
      title: "Echoes of Eternity",
      cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      chapter: "Chapter 14: The Divine Assembly",
      excerpt: "The immortal beings gather for the first time in millennia, as the balance between realms hangs by a thread.",
      genre: "Fantasy",
      stats: {
        likes: 1432,
        comments: 215,
        reads: 7865,
      },
    },
  },
  {
    id: "popular2",
    type: "new_story",
    timestamp: "3 days ago",
    author: {
      id: "author5",
      name: "Leo Zhang",
      avatar: "https://i.pravatar.cc/150?img=61",
    },
    story: {
      id: "story5",
      title: "Cybernetic Heart",
      cover: "https://images.unsplash.com/photo-1601574465779-76d6dbb88557?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      excerpt: "In a world where emotions are obsolete, engineer Maya creates an AI that can feel - with consequences she never imagined.",
      genre: "Sci-Fi",
      stats: {
        likes: 982,
        comments: 146,
        reads: 5342,
      },
    },
  },
  {
    id: "popular3",
    type: "new_chapter",
    timestamp: "4 days ago",
    author: {
      id: "author1",
      name: "Eleanor Williams",
      avatar: "https://i.pravatar.cc/150?img=29",
    },
    story: {
      id: "story6",
      title: "The Dragon's Prophecy",
      cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1684&q=80",
      chapter: "Chapter 22: The Fire Within",
      excerpt: "As Lyra unlocks her dormant powers, the ancient dragons recognize her as one of their own.",
      genre: "Fantasy",
      stats: {
        likes: 2431,
        comments: 375,
        reads: 12654,
      },
    },
  },
];

const followingUpdates = [
  {
    id: "following1",
    type: "new_chapter",
    timestamp: "1 day ago",
    author: {
      id: "author3",
      name: "Sofia Garcia",
      avatar: "https://i.pravatar.cc/150?img=16",
    },
    story: {
      id: "story7",
      title: "Midnight in Paris",
      cover: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1746&q=80",
      chapter: "Chapter 7: The Lost Generation",
      excerpt: "Claire finds herself at a gathering of the greatest literary minds of the 1920s, but her presence has not gone unnoticed.",
      genre: "Romance",
    },
  },
  {
    id: "following2",
    type: "new_story",
    timestamp: "3 days ago",
    author: {
      id: "author1",
      name: "Eleanor Williams",
      avatar: "https://i.pravatar.cc/150?img=29",
    },
    story: {
      id: "story8",
      title: "Shadow's Edge",
      cover: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
      excerpt: "At the boundary between light and darkness, a guardian must choose between duty and desire.",
      genre: "Fantasy",
    },
  },
];

const Updates = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        <div className="container py-8">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
              Recent Updates
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Stay up-to-date with the latest stories and chapters from your favorite authors and fandoms.
            </p>
          </div>

          {/* Updates Tabs */}
          <Tabs defaultValue="recent" className="space-y-8">
            <TabsList className="rounded-full">
              <TabsTrigger value="recent" className="rounded-full">
                <Clock className="h-4 w-4 mr-2" />
                Recent
              </TabsTrigger>
              <TabsTrigger value="popular" className="rounded-full">
                <Star className="h-4 w-4 mr-2" />
                Popular
              </TabsTrigger>
              <TabsTrigger value="following" className="rounded-full">
                <Heart className="h-4 w-4 mr-2" />
                Following
              </TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="m-0">
              <div className="space-y-6">
                {recentStories.map((update, index) => (
                  <UpdateItem key={update.id} update={update} index={index} />
                ))}
                <div className="flex justify-center mt-8">
                  <Button variant="outline" className="rounded-full">
                    Load More Updates
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="popular" className="m-0">
              <div className="space-y-6">
                {popularUpdates.map((update, index) => (
                  <UpdateItem key={update.id} update={update} index={index} showStats />
                ))}
                <div className="flex justify-center mt-8">
                  <Button variant="outline" className="rounded-full">
                    Load More Updates
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="following" className="m-0">
              {followingUpdates.length > 0 ? (
                <div className="space-y-6">
                  {followingUpdates.map((update, index) => (
                    <UpdateItem key={update.id} update={update} index={index} />
                  ))}
                  <div className="flex justify-center mt-8">
                    <Button variant="outline" className="rounded-full">
                      Load More Updates
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-12 text-center bg-muted rounded-xl">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-background flex items-center justify-center">
                    <Heart className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No updates from followed authors</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    Follow your favorite authors to see their latest updates here.
                  </p>
                  <Link to="/authors">
                    <Button className="rounded-full px-8">
                      <Plus className="mr-2 h-4 w-4" /> Follow Authors
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const UpdateItem = ({ update, index, showStats = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border rounded-xl overflow-hidden flex flex-col md:flex-row"
    >
      {/* Story Cover */}
      <div className="relative md:w-1/4 h-48 md:h-auto">
        <img
          src={update.story.cover}
          alt={update.story.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent md:bg-gradient-to-t"></div>
        <div className="absolute top-4 left-4">
          <Badge className={update.type === "new_story" ? "bg-green-500" : "bg-blue-500"}>
            {update.type === "new_story" ? "New Story" : "New Chapter"}
          </Badge>
        </div>
      </div>

      {/* Update Info */}
      <div className="p-6 flex-1">
        <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{update.timestamp}</span>
          <span className="mx-1">•</span>
          <Badge variant="outline" className="rounded-full">
            {update.story.genre}
          </Badge>
        </div>

        <Link to={`/story/${update.story.id}`}>
          <h3 className="text-xl font-bold hover:text-primary transition-colors mb-1">
            {update.story.title}
            {update.type === "new_chapter" && (
              <span className="text-muted-foreground font-normal text-base ml-2">
                {update.story.chapter}
              </span>
            )}
          </h3>
        </Link>

        <p className="text-muted-foreground mb-4 line-clamp-2">
          {update.story.excerpt}
        </p>

        <div className="flex justify-between items-center">
          <Link to={`/author/${update.author.id}`} className="flex items-center gap-2 group">
            <Avatar className="h-8 w-8">
              <AvatarImage src={update.author.avatar} alt={update.author.name} />
              <AvatarFallback>{update.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm group-hover:text-primary transition-colors">
              By {update.author.name}
            </span>
          </Link>

          {showStats && update.story.stats && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Heart className="h-4 w-4 mr-1" />
                <span>{update.story.stats.likes.toLocaleString()}</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>{update.story.stats.comments.toLocaleString()}</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                <span>{update.story.stats.reads.toLocaleString()}</span>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="outline" className="rounded-full" size="sm">
              <BookOpen className="h-4 w-4 mr-2" /> Read
            </Button>
            {update.type === "new_story" && (
              <Button variant="outline" className="rounded-full" size="sm">
                <PenTool className="h-4 w-4 mr-2" /> Write Fan Fiction
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Updates;
