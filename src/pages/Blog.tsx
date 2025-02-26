
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Calendar, Clock, Bookmark, Tag, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock blog posts
const featuredPosts = [
  {
    id: "blog1",
    title: "The Rise of Fan Fiction: From Margins to Mainstream",
    excerpt: "How fan fiction evolved from an underground subculture to a recognized literary practice influencing mainstream media and publishing.",
    author: {
      name: "Sofia Garcia",
      avatar: "https://i.pravatar.cc/150?img=16",
      role: "Creative Director",
    },
    date: "June 15, 2023",
    readTime: "8 min read",
    categories: ["Culture", "Industry Insights"],
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: "blog2",
    title: "Copyright and Fan Works: Navigating the Legal Landscape",
    excerpt: "A comprehensive guide to understanding copyright, fair use, and best practices for fan fiction writers in today's complex legal environment.",
    author: {
      name: "Marcus Reed",
      avatar: "https://i.pravatar.cc/150?img=11",
      role: "CTO",
    },
    date: "May 28, 2023",
    readTime: "12 min read",
    categories: ["Legal", "Writing Advice"],
    image: "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
  },
];

const recentPosts = [
  {
    id: "blog3",
    title: "Worldbuilding 101: Extending Canon While Staying True to Source Material",
    excerpt: "Learn how to develop rich, detailed worlds that expand upon existing universes while maintaining consistency with established canon.",
    author: {
      name: "Eleanor Williams",
      avatar: "https://i.pravatar.cc/150?img=29",
      role: "Community Director",
    },
    date: "July 10, 2023",
    readTime: "10 min read",
    categories: ["Writing Advice", "Craft"],
    image: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: "blog4",
    title: "From Fan to Pro: Authors Who Started in Fan Fiction",
    excerpt: "Inspiring stories of professional authors who got their start writing fan fiction, and how the skills they developed helped launch their careers.",
    author: {
      name: "Alex Chen",
      avatar: "https://i.pravatar.cc/150?img=12",
      role: "Founder & CEO",
    },
    date: "July 5, 2023",
    readTime: "7 min read",
    categories: ["Success Stories", "Industry Insights"],
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1773&q=80",
  },
  {
    id: "blog5",
    title: "The Psychology of Fandoms: Why We Connect Through Shared Stories",
    excerpt: "Exploring the psychological and social factors that draw us to fandoms and how these communities shape our identities and relationships.",
    author: {
      name: "Sofia Garcia",
      avatar: "https://i.pravatar.cc/150?img=16",
      role: "Creative Director",
    },
    date: "June 28, 2023",
    readTime: "9 min read",
    categories: ["Psychology", "Culture"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: "blog6",
    title: "Platform Updates: New Features Coming to FanFic Universe",
    excerpt: "A preview of exciting new tools and features coming to our platform in the next quarter, based on community feedback and requests.",
    author: {
      name: "Marcus Reed",
      avatar: "https://i.pravatar.cc/150?img=11",
      role: "CTO",
    },
    date: "June 20, 2023",
    readTime: "5 min read",
    categories: ["Platform News", "Updates"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  },
];

// Categories
const categories = [
  { name: "Writing Advice", count: 24 },
  { name: "Industry Insights", count: 18 },
  { name: "Culture", count: 15 },
  { name: "Platform News", count: 12 },
  { name: "Success Stories", count: 10 },
  { name: "Craft", count: 9 },
  { name: "Legal", count: 7 },
  { name: "Psychology", count: 6 },
  { name: "Updates", count: 5 },
];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        <div className="container py-8">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
              FanFic Universe Blog
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Insights, updates, and resources for fan fiction writers and readers. Join us as we explore the world of fan-created content.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xl mb-10">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles"
              className="pl-10 rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Blog Tabs */}
          <Tabs defaultValue="featured" className="space-y-8">
            <TabsList className="rounded-full">
              <TabsTrigger value="featured" className="rounded-full">
                <Star className="h-4 w-4 mr-2" />
                Featured
              </TabsTrigger>
              <TabsTrigger value="recent" className="rounded-full">
                <Clock className="h-4 w-4 mr-2" />
                Recent Posts
              </TabsTrigger>
              <TabsTrigger value="popular" className="rounded-full">
                <TrendingUp className="h-4 w-4 mr-2" />
                Popular
              </TabsTrigger>
              <TabsTrigger value="bookmarked" className="rounded-full">
                <Bookmark className="h-4 w-4 mr-2" />
                Bookmarked
              </TabsTrigger>
            </TabsList>

            <TabsContent value="featured" className="m-0">
              {/* Featured Posts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                {featuredPosts.map((post, index) => (
                  <FeaturedPostCard key={post.id} post={post} index={index} />
                ))}
              </div>

              {/* Recent Posts Grid */}
              <h2 className="text-2xl font-bold mb-6">Recent Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentPosts.map((post, index) => (
                  <PostCard key={post.id} post={post} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recent" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...recentPosts, ...featuredPosts].map((post, index) => (
                  <PostCard key={post.id} post={post} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="popular" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...featuredPosts, ...recentPosts.slice(0, 4)].map((post, index) => (
                  <PostCard key={post.id} post={post} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="bookmarked" className="m-0">
              <div className="p-12 text-center bg-muted rounded-xl">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-background flex items-center justify-center">
                  <Bookmark className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">No bookmarked articles</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Save your favorite articles to read later by clicking the bookmark icon.
                </p>
                <Button className="rounded-full px-8">
                  Browse Articles
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Categories and Newsletter Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-16">
            {/* Categories */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex justify-between items-center p-3 hover:bg-secondary rounded-lg transition-colors"
                  >
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{category.name}</span>
                    </div>
                    <Badge variant="outline" className="rounded-full">
                      {category.count}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-2 bg-muted rounded-xl p-8">
              <h3 className="text-xl font-bold mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-muted-foreground mb-4">
                Stay updated with the latest articles, writing tips, and platform news.
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="rounded-full"
                />
                <Button className="rounded-full px-6">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const FeaturedPostCard = ({ post, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border rounded-xl overflow-hidden group"
    >
      <div className="relative h-64">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute top-4 left-4">
          <Badge className="bg-primary">Featured</Badge>
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.categories.map((category) => (
            <Badge key={category} variant="outline" className="rounded-full">
              {category}
            </Badge>
          ))}
        </div>
        <Link to={`/blog/${post.id}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="text-muted-foreground mb-4">
          {post.excerpt}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.author.name}</p>
              <p className="text-xs text-muted-foreground">{post.author.role}</p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground flex items-center gap-3">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PostCard = ({ post, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border rounded-xl overflow-hidden group"
    >
      <div className="relative h-48">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.categories.map((category) => (
            <Badge key={category} variant="outline" className="rounded-full text-xs">
              {category}
            </Badge>
          ))}
        </div>
        <Link to={`/blog/${post.id}`}>
          <h3 className="text-lg font-bold mb-2 hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="text-sm font-medium">{post.author.name}</p>
          </div>
          <div className="text-xs text-muted-foreground">
            {post.date}
          </div>
        </div>
      </div>
      <div className="px-5 pb-5 pt-0">
        <Link to={`/blog/${post.id}`}>
          <Button variant="ghost" className="p-0 h-auto text-primary font-medium text-sm hover:bg-transparent hover:text-primary/80">
            Read More <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default Blog;
