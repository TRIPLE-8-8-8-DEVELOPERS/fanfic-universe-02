
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, MessageSquare, BookOpen, PenTool, Award, Star, Users, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoryCard from "@/components/StoryCard";

// Mock user data
const user = {
  id: "user1",
  name: "Alex Morgan",
  username: "@alexmorgan",
  avatar: "https://i.pravatar.cc/150?img=11",
  bio: "Fantasy and sci-fi enthusiast. Writer by day, reader by night. Currently working on my epic space opera series.",
  location: "Seattle, WA",
  joined: "March 2021",
  followers: 1243,
  following: 356,
  stats: {
    stories: 12,
    likes: 3452,
    comments: 872,
    reads: 68432,
  },
  badges: [
    { name: "Prolific Writer", description: "Published 10+ stories" },
    { name: "Rising Star", description: "Gained 1000+ followers" },
    { name: "Storyteller", description: "5 stories with 10k+ reads" },
  ],
};

// Mock user's stories
const userStories = [
  {
    id: "101",
    title: "The Last Starfighter",
    author: user.name,
    authorId: user.id,
    cover: "https://images.unsplash.com/photo-1581822261290-991b38693d1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    genre: "Sci-Fi",
    excerpt: "When teenager Kyle Richards discovers an arcade game is actually a recruitment tool for an interstellar defense force, he must become the hero he was born to be.",
    rating: 4.7,
    likes: 2184,
    reads: 24590,
  },
  {
    id: "102",
    title: "Whispers in the Void",
    author: user.name,
    authorId: user.id,
    cover: "https://images.unsplash.com/photo-1505506874110-6a7a69069a08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    genre: "Horror",
    excerpt: "Something ancient and malevolent has awakened in the small town of Maplewood, and only librarian Sarah Hayes knows the truth buried in forgotten texts.",
    rating: 4.9,
    likes: 3421,
    reads: 31290,
  },
  {
    id: "103",
    title: "Chronicles of the Fae Court",
    author: user.name,
    authorId: user.id,
    cover: "https://images.unsplash.com/photo-1520034475321-cbe63696469a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    genre: "Fantasy",
    excerpt: "When Ivy discovers her true heritage as half-fae, she is thrust into the dangerous politics of the Faerie Court where beauty hides treachery and power comes at a terrible price.",
    rating: 4.6,
    likes: 1865,
    reads: 19752,
  },
  {
    id: "104",
    title: "The Memory Collector",
    author: user.name,
    authorId: user.id,
    cover: "https://images.unsplash.com/photo-1543005472-1b1d37fa4eae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
    genre: "Thriller",
    excerpt: "Neuroscientist Dr. Maya Rivera develops technology to extract and store human memories, but when a high-profile client is murdered, she becomes the prime suspect.",
    rating: 4.8,
    likes: 2754,
    reads: 28431,
  },
];

// Mock reading list
const readingList = [
  {
    id: "201",
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
  {
    id: "202",
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
    id: "203",
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
    id: "204",
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
];

const Profile = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        {/* Profile Header */}
        <section className="bg-secondary py-12">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar and Follow Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="md:sticky md:top-32"
              >
                <div className="flex flex-col items-center">
                  <Avatar className="h-28 w-28 md:h-32 md:w-32 mb-4">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex gap-2 mb-4">
                    <Button className="rounded-full px-6">Follow</Button>
                    <Link to="/messages/conv1">
                      <Button variant="outline" className="rounded-full" size="icon">
                        <MessageCircle size={18} />
                      </Button>
                    </Link>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-center">
                    <div>
                      <div className="font-bold">{user.followers}</div>
                      <div className="text-muted-foreground">Followers</div>
                    </div>
                    <div>
                      <div className="font-bold">{user.following}</div>
                      <div className="text-muted-foreground">Following</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Profile Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1"
              >
                <h1 className="text-3xl font-bold mb-1">{user.name}</h1>
                <p className="text-muted-foreground mb-4">{user.username}</p>
                <p className="mb-4">{user.bio}</p>

                <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-muted-foreground mb-6">
                  {user.location && (
                    <div className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {user.location}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Joined {user.joined}
                  </div>
                </div>

                {/* Author Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="bg-background rounded-lg p-4 text-center">
                    <PenTool className="h-5 w-5 mx-auto mb-1 text-primary" />
                    <div className="text-2xl font-bold">{user.stats.stories}</div>
                    <div className="text-xs text-muted-foreground">Stories</div>
                  </div>
                  <div className="bg-background rounded-lg p-4 text-center">
                    <Heart className="h-5 w-5 mx-auto mb-1 text-red-400" />
                    <div className="text-2xl font-bold">{user.stats.likes.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Likes</div>
                  </div>
                  <div className="bg-background rounded-lg p-4 text-center">
                    <MessageSquare className="h-5 w-5 mx-auto mb-1 text-primary" />
                    <div className="text-2xl font-bold">{user.stats.comments.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Comments</div>
                  </div>
                  <div className="bg-background rounded-lg p-4 text-center">
                    <BookOpen className="h-5 w-5 mx-auto mb-1 text-primary" />
                    <div className="text-2xl font-bold">{user.stats.reads.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Reads</div>
                  </div>
                </div>

                {/* Badges */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Badges</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.badges.map((badge) => (
                      <div
                        key={badge.name}
                        className="group relative inline-block"
                      >
                        <Badge className="flex items-center gap-1.5 py-1.5">
                          <Award className="h-3.5 w-3.5" /> {badge.name}
                        </Badge>
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground text-xs rounded-md p-2 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity w-48 text-center z-50">
                          {badge.description}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-popover"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Profile Tabs */}
        <section className="py-12">
          <div className="container">
            <Tabs defaultValue="stories" className="w-full">
              <TabsList className="w-full justify-start mb-8 rounded-full">
                <TabsTrigger value="stories" className="rounded-full">
                  My Stories
                </TabsTrigger>
                <TabsTrigger value="reading-list" className="rounded-full">
                  Reading List
                </TabsTrigger>
                <TabsTrigger value="favorites" className="rounded-full">
                  Favorites
                </TabsTrigger>
                <TabsTrigger value="activity" className="rounded-full">
                  Activity
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stories" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {userStories.map((story, index) => (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <StoryCard {...story} />
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reading-list" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {readingList.map((story, index) => (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <StoryCard {...story} />
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="favorites" className="mt-0">
                <div className="p-12 text-center bg-muted rounded-lg">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-background flex items-center justify-center">
                    <Heart className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No favorites yet</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    When you find stories you love, heart them to add them to your favorites collection.
                  </p>
                  <Link to="/browse">
                    <Button className="rounded-full px-8">Browse Stories</Button>
                  </Link>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="mt-0">
                <div className="p-12 text-center bg-muted rounded-lg">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-background flex items-center justify-center">
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No recent activity</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    Your activity feed shows your interactions with stories and other writers in the community.
                  </p>
                  <Link to="/community">
                    <Button className="rounded-full px-8">Explore Community</Button>
                  </Link>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
