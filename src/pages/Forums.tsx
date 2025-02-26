
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  Search,
  Filter,
  PenTool,
  Clock,
  TrendingUp,
  Bookmark,
  User,
  Users,
  Tag,
  Eye,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock forum categories
const forumCategories = [
  {
    id: "cat1",
    name: "Writing Discussions",
    description: "Discussions about writing techniques, character development, worldbuilding, and more.",
    topics: 3254,
    posts: 25431,
    icon: PenTool,
  },
  {
    id: "cat2",
    name: "Fandom Discussions",
    description: "Talk about your favorite fandoms, series, characters, and theories.",
    topics: 5241,
    posts: 42653,
    icon: Users,
  },
  {
    id: "cat3",
    name: "Feedback & Critiques",
    description: "Get and give constructive feedback on your stories and writing.",
    topics: 1852,
    posts: 13976,
    icon: MessageSquare,
  },
  {
    id: "cat4",
    name: "General Discussion",
    description: "Off-topic conversations and community discussions.",
    topics: 2943,
    posts: 31567,
    icon: MessageSquare,
  },
];

// Mock recent topics
const recentTopics = [
  {
    id: "topic1",
    title: "Character Development Techniques",
    category: "Writing Discussions",
    author: {
      id: "author1",
      name: "Eleanor Williams",
      avatar: "https://i.pravatar.cc/150?img=29",
    },
    replies: 42,
    views: 1243,
    lastReply: {
      author: {
        id: "author2",
        name: "Marcus Reed",
        avatar: "https://i.pravatar.cc/150?img=12",
      },
      timestamp: "2 hours ago",
    },
    tags: ["Writing Tips", "Character Development"],
    excerpt: "What techniques do you use to create memorable characters? I'm struggling with making my protagonist more three-dimensional and would love some advice.",
  },
  {
    id: "topic2",
    title: "The Future of the Marvel Cinematic Universe",
    category: "Fandom Discussions",
    author: {
      id: "author3",
      name: "Sofia Garcia",
      avatar: "https://i.pravatar.cc/150?img=16",
    },
    replies: 76,
    views: 2543,
    lastReply: {
      author: {
        id: "author4",
        name: "James Holden",
        avatar: "https://i.pravatar.cc/150?img=11",
      },
      timestamp: "45 minutes ago",
    },
    tags: ["Marvel", "MCU", "Theories"],
    excerpt: "After the events of the latest film, where do you think the MCU is headed? I have some theories about the multiverse that I'd like to discuss.",
  },
  {
    id: "topic3",
    title: "Feedback on my Harry Potter Fanfic",
    category: "Feedback & Critiques",
    author: {
      id: "author5",
      name: "Leo Zhang",
      avatar: "https://i.pravatar.cc/150?img=61",
    },
    replies: 15,
    views: 432,
    lastReply: {
      author: {
        id: "author1",
        name: "Eleanor Williams",
        avatar: "https://i.pravatar.cc/150?img=29",
      },
      timestamp: "3 hours ago",
    },
    tags: ["Harry Potter", "Feedback Request"],
    excerpt: "I've written a post-Hogwarts story focusing on Neville Longbottom becoming the Herbology professor. Would appreciate some constructive criticism!",
  },
  {
    id: "topic4",
    title: "Writing Romance Subplots: Dos and Don'ts",
    category: "Writing Discussions",
    author: {
      id: "author6",
      name: "Amara Khan",
      avatar: "https://i.pravatar.cc/150?img=41",
    },
    replies: 38,
    views: 1876,
    lastReply: {
      author: {
        id: "author3",
        name: "Sofia Garcia",
        avatar: "https://i.pravatar.cc/150?img=16",
      },
      timestamp: "5 hours ago",
    },
    tags: ["Romance", "Writing Tips", "Subplots"],
    excerpt: "How do you write romance subplots that enhance the main story without feeling forced? I'm looking for advice on pacing and character chemistry.",
  },
];

// Mock popular topics
const popularTopics = [
  {
    id: "topic5",
    title: "Harry Potter: Unanswered Questions and Plot Holes",
    category: "Fandom Discussions",
    author: {
      id: "author7",
      name: "Noah Adams",
      avatar: "https://i.pravatar.cc/150?img=59",
    },
    replies: 124,
    views: 4532,
    lastReply: {
      author: {
        id: "author1",
        name: "Eleanor Williams",
        avatar: "https://i.pravatar.cc/150?img=29",
      },
      timestamp: "1 hour ago",
    },
    tags: ["Harry Potter", "Analysis", "Discussion"],
    excerpt: "Let's discuss the unanswered questions and plot holes in the Harry Potter series. The one that always bothered me was...",
  },
  {
    id: "topic6",
    title: "Worldbuilding Resources and Techniques",
    category: "Writing Discussions",
    author: {
      id: "author2",
      name: "Marcus Reed",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    replies: 87,
    views: 3248,
    lastReply: {
      author: {
        id: "author6",
        name: "Amara Khan",
        avatar: "https://i.pravatar.cc/150?img=41",
      },
      timestamp: "30 minutes ago",
    },
    tags: ["Worldbuilding", "Writing Resources", "Fantasy"],
    excerpt: "I'm compiling a list of the best worldbuilding resources and techniques. What tools, websites, or methods do you use to create detailed worlds?",
  },
];

const Forums = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        <div className="container py-8">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
              Community Forums
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Join the conversation, share your thoughts, and connect with fellow fans and writers in our active community forums.
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex justify-between items-center mb-10">
            <div className="relative max-w-xl flex-1 mr-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search forum topics"
                className="pl-10 rounded-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="rounded-full">
              <PenTool className="mr-2 h-4 w-4" />
              New Topic
            </Button>
          </div>

          {/* Forum Categories */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Forum Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {forumCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="border rounded-xl p-5 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <Link to={`/forums/${category.id}`}>
                        <h3 className="text-lg font-bold hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                      </Link>
                      <p className="text-muted-foreground text-sm mb-3">
                        {category.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{category.topics.toLocaleString()} topics</span>
                        <span>{category.posts.toLocaleString()} posts</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Topics Tabs */}
          <Tabs defaultValue="recent" className="space-y-8">
            <div className="flex justify-between items-center mb-6">
              <TabsList className="rounded-full">
                <TabsTrigger value="recent" className="rounded-full">
                  <Clock className="h-4 w-4 mr-2" />
                  Recent Topics
                </TabsTrigger>
                <TabsTrigger value="popular" className="rounded-full">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Popular Topics
                </TabsTrigger>
                <TabsTrigger value="bookmarked" className="rounded-full">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Bookmarked
                </TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <Button variant="outline" className="rounded-full" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            <TabsContent value="recent" className="m-0">
              <div className="space-y-4">
                {recentTopics.map((topic) => (
                  <ForumTopicItem key={topic.id} topic={topic} />
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <Button variant="outline" className="rounded-full">
                  Load More Topics
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="popular" className="m-0">
              <div className="space-y-4">
                {popularTopics.map((topic) => (
                  <ForumTopicItem key={topic.id} topic={topic} />
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <Button variant="outline" className="rounded-full">
                  Load More Topics
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="bookmarked" className="m-0">
              <div className="p-12 text-center bg-muted rounded-xl">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-background flex items-center justify-center">
                  <Bookmark className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">No bookmarked topics</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Bookmark topics that interest you to easily find them later.
                </p>
                <Button className="rounded-full px-8">
                  Browse Forums
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Forum Stats */}
          <section className="mt-16 border-t pt-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-secondary rounded-xl p-5 text-center">
                <h3 className="text-lg font-medium mb-1">Topics</h3>
                <p className="text-3xl font-bold">12,543</p>
              </div>
              <div className="bg-secondary rounded-xl p-5 text-center">
                <h3 className="text-lg font-medium mb-1">Posts</h3>
                <p className="text-3xl font-bold">124,876</p>
              </div>
              <div className="bg-secondary rounded-xl p-5 text-center">
                <h3 className="text-lg font-medium mb-1">Members</h3>
                <p className="text-3xl font-bold">32,541</p>
              </div>
              <div className="bg-secondary rounded-xl p-5 text-center">
                <h3 className="text-lg font-medium mb-1">Online Now</h3>
                <p className="text-3xl font-bold">1,243</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const ForumTopicItem = ({ topic }) => {
  return (
    <div className="border rounded-xl p-4 hover:bg-secondary/50 transition-colors">
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <div className="md:w-10/12 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1.5 text-sm">
            <Badge variant="outline">{topic.category}</Badge>
            {topic.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="rounded-full text-xs flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>
          <Link to={`/forums/topic/${topic.id}`}>
            <h3 className="text-lg font-bold hover:text-primary transition-colors">
              {topic.title}
            </h3>
          </Link>
          <p className="text-muted-foreground mt-1 text-sm mb-3 line-clamp-2">
            {topic.excerpt}
          </p>

          <div className="flex items-center text-sm text-muted-foreground">
            <Link to={`/author/${topic.author.id}`} className="flex items-center hover:text-primary transition-colors">
              <User className="h-3.5 w-3.5 mr-1" />
              {topic.author.name}
            </Link>
            <span className="mx-2">•</span>
            <div className="flex items-center">
              <MessageSquare className="h-3.5 w-3.5 mr-1" />
              {topic.replies} replies
            </div>
            <span className="mx-2">•</span>
            <div className="flex items-center">
              <Eye className="h-3.5 w-3.5 mr-1" />
              {topic.views} views
            </div>
          </div>
        </div>

        <div className="md:w-2/12 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start text-right">
          <div className="text-sm text-muted-foreground mb-0 md:mb-2">
            Last reply {topic.lastReply.timestamp}
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right text-sm hidden md:block">
              <span className="text-muted-foreground">by </span>
              <Link to={`/author/${topic.lastReply.author.id}`} className="hover:text-primary transition-colors">
                {topic.lastReply.author.name}
              </Link>
            </div>
            <Avatar className="h-8 w-8">
              <AvatarImage src={topic.lastReply.author.avatar} alt={topic.lastReply.author.name} />
              <AvatarFallback>{topic.lastReply.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forums;
