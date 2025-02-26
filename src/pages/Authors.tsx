
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Award, UserPlus, BookOpen, MessageSquare, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock featured authors data
const featuredAuthors = [
  {
    id: "author1",
    name: "Eleanor Williams",
    username: "@eleanorwrites",
    avatar: "https://i.pravatar.cc/150?img=29",
    bio: "Award-winning fantasy author with a passion for world-building and character-driven narratives.",
    followers: 24567,
    stories: 18,
    badges: ["Top Writer", "Contest Winner"],
    featuredStory: {
      title: "The Dragon's Prophecy",
      cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1684&q=80",
      rating: 4.8,
    },
  },
  {
    id: "author2",
    name: "Marcus Reed",
    username: "@marcusreed",
    avatar: "https://i.pravatar.cc/150?img=12",
    bio: "Sci-fi enthusiast exploring the philosophical implications of technology through speculative fiction.",
    followers: 19823,
    stories: 12,
    badges: ["Rising Star"],
    featuredStory: {
      title: "Echoes of Eternity",
      cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      rating: 4.9,
    },
  },
  {
    id: "author3",
    name: "Sofia Garcia",
    username: "@sofiagarcia",
    avatar: "https://i.pravatar.cc/150?img=16",
    bio: "Romance writer with a focus on historical settings and cross-cultural relationships.",
    followers: 31245,
    stories: 24,
    badges: ["Veteran Writer", "Community Favorite"],
    featuredStory: {
      title: "Midnight in Paris",
      cover: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1746&q=80",
      rating: 4.7,
    },
  },
];

// Mock rising stars data
const risingStars = [
  {
    id: "rising1",
    name: "Leo Zhang",
    username: "@leozhang",
    avatar: "https://i.pravatar.cc/150?img=61",
    bio: "Tech consultant by day, cyberpunk author by night. Exploring the intersection of humanity and technology.",
    followers: 5823,
    stories: 6,
    badges: ["New Talent"],
    featuredStory: {
      title: "Cybernetic Heart",
      cover: "https://images.unsplash.com/photo-1601574465779-76d6dbb88557?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80",
      rating: 4.6,
    },
  },
  {
    id: "rising2",
    name: "Amara Khan",
    username: "@amarakhan",
    avatar: "https://i.pravatar.cc/150?img=41",
    bio: "Fantasy writer specializing in stories inspired by South Asian mythology and folklore.",
    followers: 7452,
    stories: 8,
    badges: ["Rising Star"],
    featuredStory: {
      title: "Beyond the Veil",
      cover: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
      rating: 4.7,
    },
  },
  {
    id: "rising3",
    name: "Noah Adams",
    username: "@noahadams",
    avatar: "https://i.pravatar.cc/150?img=59",
    bio: "Coming-of-age storyteller with a knack for capturing the essence of teenage experiences.",
    followers: 6129,
    stories: 5,
    badges: ["Promising Writer"],
    featuredStory: {
      title: "The Last Summer",
      cover: "https://images.unsplash.com/photo-1519834584767-7d2e1ba230d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      rating: 4.8,
    },
  },
];

const awardWinners = [
  {
    id: "award1",
    name: "James Holden",
    username: "@jamesholden",
    avatar: "https://i.pravatar.cc/150?img=11",
    bio: "Mystery and detective fiction writer known for intricate plots and surprising twists.",
    followers: 15687,
    stories: 14,
    badges: ["Award Winner", "Mystery Master"],
    featuredStory: {
      title: "The Silent Detective",
      cover: "https://images.unsplash.com/photo-1509475826633-fed577a2c71b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
      rating: 4.5,
    },
  },
  {
    id: "award2",
    name: "Ivy Bennett",
    username: "@ivybennett",
    avatar: "https://i.pravatar.cc/150?img=32",
    bio: "Horror genre specialist with a talent for psychological terror and atmospheric storytelling.",
    followers: 12983,
    stories: 11,
    badges: ["Horror Master", "Contest Winner"],
    featuredStory: {
      title: "Whispers in the Woods",
      cover: "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      rating: 4.5,
    },
  },
  {
    id: "award3",
    name: "Micah Chen",
    username: "@micahchen",
    avatar: "https://i.pravatar.cc/150?img=14",
    bio: "Science fiction author specializing in near-future scenarios and their social implications.",
    followers: 18256,
    stories: 10,
    badges: ["Sci-Fi Excellence Award"],
    featuredStory: {
      title: "Starlight Academy",
      cover: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1727&q=80",
      rating: 4.6,
    },
  },
];

const Authors = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        <div className="container py-8">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
              Featured Authors
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Discover talented writers from our community. Follow your favorites and explore their unique stories and worlds.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xl mb-10">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for authors by name or username"
              className="pl-10 rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Authors Tabs */}
          <Tabs defaultValue="featured" className="space-y-8">
            <TabsList className="rounded-full">
              <TabsTrigger value="featured" className="rounded-full">
                <Star className="h-4 w-4 mr-2" />
                Featured
              </TabsTrigger>
              <TabsTrigger value="rising" className="rounded-full">
                <Award className="h-4 w-4 mr-2" />
                Rising Stars
              </TabsTrigger>
              <TabsTrigger value="award" className="rounded-full">
                <Trophy className="h-4 w-4 mr-2" />
                Award Winners
              </TabsTrigger>
            </TabsList>

            <TabsContent value="featured" className="m-0">
              {renderAuthorGrid(featuredAuthors)}
            </TabsContent>

            <TabsContent value="rising" className="m-0">
              {renderAuthorGrid(risingStars)}
            </TabsContent>

            <TabsContent value="award" className="m-0">
              {renderAuthorGrid(awardWinners)}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const renderAuthorGrid = (authors) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {authors.map((author, index) => (
      <motion.div
        key={author.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="border rounded-xl overflow-hidden bg-background"
      >
        {/* Featured Story Cover */}
        <div className="relative h-40">
          <img
            src={author.featuredStory.cover}
            alt={author.featuredStory.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        </div>

        {/* Author Info */}
        <div className="relative px-6 pt-0 pb-6">
          <div className="flex flex-col items-center -mt-12 mb-4">
            <Avatar className="h-20 w-20 border-4 border-background">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="mt-3 text-lg font-bold text-center">{author.name}</h3>
            <p className="text-sm text-muted-foreground">{author.username}</p>
            
            <div className="flex flex-wrap gap-2 mt-2 justify-center">
              {author.badges.map((badge) => (
                <Badge key={badge} variant="secondary" className="rounded-full text-xs">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>

          <p className="text-muted-foreground text-sm text-center mb-4 line-clamp-2">
            {author.bio}
          </p>

          <div className="flex justify-center gap-8 mb-4 text-sm">
            <div className="text-center">
              <p className="font-medium">{author.stories}</p>
              <p className="text-muted-foreground">Stories</p>
            </div>
            <div className="text-center">
              <p className="font-medium">{author.followers.toLocaleString()}</p>
              <p className="text-muted-foreground">Followers</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button className="rounded-full">
              <UserPlus className="mr-2 h-4 w-4" /> Follow
            </Button>
            <Link to={`/author/${author.id}`}>
              <Button variant="outline" className="w-full rounded-full">
                View Profile
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

export default Authors;
