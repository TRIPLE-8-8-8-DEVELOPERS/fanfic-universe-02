
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, PenTool, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeaturedStory from "@/components/FeaturedStory";
import StoryGrid from "@/components/StoryGrid";

// Mock data
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

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="container mb-16">
            <FeaturedStory {...featuredStory} />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-secondary">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-4 font-serif"
              >
                Discover the World of Fan Fiction
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-muted-foreground text-lg"
              >
                Immerse yourself in captivating stories, connect with fellow fans, and unleash your creativity.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: BookOpen,
                  title: "Read",
                  description: "Explore thousands of stories across all your favorite fandoms, from sci-fi to romance.",
                  cta: "Browse Stories",
                  link: "/browse",
                },
                {
                  icon: PenTool,
                  title: "Write",
                  description: "Create and share your own stories with our easy-to-use writing tools and supportive community.",
                  cta: "Start Writing",
                  link: "/write",
                },
                {
                  icon: Users,
                  title: "Connect",
                  description: "Join discussions, participate in challenges, and connect with like-minded fans and creators.",
                  cta: "Join Community",
                  link: "/community",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                  className="bg-background rounded-xl p-8 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6">{feature.description}</p>
                  <Link to={feature.link}>
                    <Button variant="outline" className="rounded-full">
                      {feature.cta}
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Stories */}
        <StoryGrid
          title="Trending This Week"
          description="The stories everyone's talking about right now"
          stories={trendingStories}
        />

        {/* Popular Stories */}
        <StoryGrid
          title="Reader Favorites"
          description="The most beloved stories in our community"
          stories={popularStories}
        />

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-4 font-serif"
              >
                Ready to Share Your Story?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-primary-foreground/80 text-lg mb-8"
              >
                Join our community of writers and readers today. It's free and takes just a minute to get started.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Link to="/sign-up">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="rounded-full px-8"
                  >
                    Create Account
                  </Button>
                </Link>
                <Link to="/write">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full px-8 border-white/20 hover:bg-white/10"
                  >
                    Start Writing
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
