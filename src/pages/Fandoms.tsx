
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Users, Star, BookOpen, TrendingUp, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock popular fandoms data
const popularFandoms = [
  {
    id: "f1",
    name: "Marvel Universe",
    description: "Stories set in the Marvel Comics universe featuring superheroes like Spider-Man, Iron Man, and more.",
    members: 58954,
    stories: 12543,
    banner: "https://images.unsplash.com/photo-1635863138275-d9b33299680d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80",
    icon: "https://i.imgur.com/1tVQyRk.png",
    tags: ["Superheroes", "Action", "Comics"],
    featuredAuthors: [
      { name: "Marcus Reed", avatar: "https://i.pravatar.cc/150?img=12" },
      { name: "Eleanor Williams", avatar: "https://i.pravatar.cc/150?img=29" },
      { name: "Noah Adams", avatar: "https://i.pravatar.cc/150?img=59" },
    ],
  },
  {
    id: "f2",
    name: "Harry Potter",
    description: "Adventures set in the magical world created by J.K. Rowling, featuring wizards, magical creatures, and Hogwarts School.",
    members: 45123,
    stories: 9871,
    banner: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
    icon: "https://i.imgur.com/Z1V8LZ0.png",
    tags: ["Magic", "Fantasy", "Wizards"],
    featuredAuthors: [
      { name: "Sofia Garcia", avatar: "https://i.pravatar.cc/150?img=16" },
      { name: "James Holden", avatar: "https://i.pravatar.cc/150?img=11" },
      { name: "Amara Khan", avatar: "https://i.pravatar.cc/150?img=41" },
    ],
  },
  {
    id: "f3",
    name: "Star Wars",
    description: "Stories set in the epic space opera created by George Lucas, featuring Jedi, the Force, and intergalactic conflicts.",
    members: 39875,
    stories: 7845,
    banner: "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
    icon: "https://i.imgur.com/8RKS3tU.png",
    tags: ["Sci-Fi", "Space", "Adventure"],
    featuredAuthors: [
      { name: "Leo Zhang", avatar: "https://i.pravatar.cc/150?img=61" },
      { name: "Micah Chen", avatar: "https://i.pravatar.cc/150?img=14" },
      { name: "Ivy Bennett", avatar: "https://i.pravatar.cc/150?img=32" },
    ],
  },
  {
    id: "f4",
    name: "Game of Thrones",
    description: "Fan fiction set in the world of Westeros and beyond, based on George R.R. Martin's epic fantasy series.",
    members: 36542,
    stories: 6321,
    banner: "https://images.unsplash.com/photo-1599595344943-2c99544561be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    icon: "https://i.imgur.com/4Z9V1Bv.png",
    tags: ["Fantasy", "Medieval", "Politics"],
    featuredAuthors: [
      { name: "Eleanor Williams", avatar: "https://i.pravatar.cc/150?img=29" },
      { name: "Marcus Reed", avatar: "https://i.pravatar.cc/150?img=12" },
      { name: "Sofia Garcia", avatar: "https://i.pravatar.cc/150?img=16" },
    ],
  },
];

// Mock trending fandoms data
const trendingFandoms = [
  {
    id: "f5",
    name: "Stranger Things",
    description: "Stories inspired by the Netflix series featuring supernatural mysteries in the town of Hawkins.",
    members: 28954,
    stories: 5243,
    banner: "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    icon: "https://i.imgur.com/cTdgUTX.png",
    tags: ["Horror", "Supernatural", "80s"],
    featuredAuthors: [
      { name: "Ivy Bennett", avatar: "https://i.pravatar.cc/150?img=32" },
      { name: "Noah Adams", avatar: "https://i.pravatar.cc/150?img=59" },
      { name: "Amara Khan", avatar: "https://i.pravatar.cc/150?img=41" },
    ],
  },
  {
    id: "f6",
    name: "The Last of Us",
    description: "Post-apocalyptic adventures based on the critically acclaimed video game series.",
    members: 21532,
    stories: 3891,
    banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    icon: "https://i.imgur.com/Xt5LkL5.png",
    tags: ["Post-Apocalyptic", "Survival", "Drama"],
    featuredAuthors: [
      { name: "James Holden", avatar: "https://i.pravatar.cc/150?img=11" },
      { name: "Leo Zhang", avatar: "https://i.pravatar.cc/150?img=61" },
      { name: "Micah Chen", avatar: "https://i.pravatar.cc/150?img=14" },
    ],
  },
  {
    id: "f7",
    name: "Avatar: The Last Airbender",
    description: "Stories set in the world of bending elements, following the animated series and its characters.",
    members: 25687,
    stories: 4512,
    banner: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
    icon: "https://i.imgur.com/7bXeM2G.png",
    tags: ["Animation", "Fantasy", "Adventure"],
    featuredAuthors: [
      { name: "Amara Khan", avatar: "https://i.pravatar.cc/150?img=41" },
      { name: "Sofia Garcia", avatar: "https://i.pravatar.cc/150?img=16" },
      { name: "Noah Adams", avatar: "https://i.pravatar.cc/150?img=59" },
    ],
  },
  {
    id: "f8",
    name: "Percy Jackson",
    description: "Adventures inspired by Rick Riordan's world of modern demigods and Greek mythology.",
    members: 19856,
    stories: 3524,
    banner: "https://images.unsplash.com/photo-1564399579975-2b397576f837?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
    icon: "https://i.imgur.com/wZe6wvv.png",
    tags: ["Mythology", "Young Adult", "Adventure"],
    featuredAuthors: [
      { name: "Eleanor Williams", avatar: "https://i.pravatar.cc/150?img=29" },
      { name: "Marcus Reed", avatar: "https://i.pravatar.cc/150?img=12" },
      { name: "Ivy Bennett", avatar: "https://i.pravatar.cc/150?img=32" },
    ],
  },
];

const Fandoms = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        <div className="container py-8">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
              Popular Fandoms
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Explore stories from your favorite universes and connect with fellow fans. Dive into rich worlds of fan-created content.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xl mb-10">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search fandoms"
              className="pl-10 rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Fandoms Tabs */}
          <Tabs defaultValue="popular" className="space-y-8">
            <TabsList className="rounded-full">
              <TabsTrigger value="popular" className="rounded-full">
                <Star className="h-4 w-4 mr-2" />
                Popular
              </TabsTrigger>
              <TabsTrigger value="trending" className="rounded-full">
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="my-fandoms" className="rounded-full">
                <Heart className="h-4 w-4 mr-2" />
                My Fandoms
              </TabsTrigger>
            </TabsList>

            <TabsContent value="popular" className="m-0">
              {renderFandomGrid(popularFandoms)}
            </TabsContent>

            <TabsContent value="trending" className="m-0">
              {renderFandomGrid(trendingFandoms)}
            </TabsContent>

            <TabsContent value="my-fandoms" className="m-0">
              <div className="p-12 text-center bg-muted rounded-xl">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-background flex items-center justify-center">
                  <Heart className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">No followed fandoms yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Follow your favorite fandoms to see them here and get updates on new stories and discussions.
                </p>
                <Button className="rounded-full px-8">
                  Explore Fandoms
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Featured Crossovers */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Popular Crossovers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Marvel / DC",
                  description: "Superhero crossover adventures featuring characters from both universes",
                  stories: 2543,
                  image: "https://images.unsplash.com/photo-1635863138275-d9b33299680d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80",
                },
                {
                  title: "Harry Potter / Fantastic Beasts",
                  description: "Magical stories combining both of J.K. Rowling's wizarding worlds",
                  stories: 1845,
                  image: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
                },
                {
                  title: "Star Wars / Star Trek",
                  description: "Epic space adventures combining these iconic sci-fi universes",
                  stories: 1267,
                  image: "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
                },
              ].map((crossover, index) => (
                <Card key={crossover.title} className="overflow-hidden">
                  <div className="relative h-40">
                    <img
                      src={crossover.image}
                      alt={crossover.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-xl font-bold text-white">
                        {crossover.title}
                      </h3>
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      {crossover.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">
                        <BookOpen className="inline h-4 w-4 mr-1" />
                        {crossover.stories} stories
                      </span>
                      <Button variant="outline" size="sm" className="rounded-full">
                        Explore
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const renderFandomGrid = (fandoms) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {fandoms.map((fandom, index) => (
      <motion.div
        key={fandom.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="border rounded-xl overflow-hidden bg-background"
      >
        {/* Fandom Banner */}
        <div className="relative h-48">
          <img
            src={fandom.banner}
            alt={fandom.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4 flex items-center gap-3">
            <img
              src={fandom.icon}
              alt={`${fandom.name} icon`}
              className="w-12 h-12 rounded-full border-2 border-white/50"
            />
            <div>
              <h3 className="text-xl font-bold text-white">{fandom.name}</h3>
              <div className="flex items-center gap-3 text-white/80 text-sm">
                <span>
                  <Users className="inline h-3.5 w-3.5 mr-1" />
                  {fandom.members.toLocaleString()} members
                </span>
                <span>
                  <BookOpen className="inline h-3.5 w-3.5 mr-1" />
                  {fandom.stories.toLocaleString()} stories
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Fandom Info */}
        <div className="p-4">
          <p className="text-muted-foreground text-sm mb-4">
            {fandom.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {fandom.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="rounded-full">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm font-medium mb-1">Featured Authors</p>
              <div className="flex -space-x-2">
                {fandom.featuredAuthors.map((author, i) => (
                  <Avatar key={i} className="border-2 border-background w-8 h-8">
                    <AvatarImage src={author.avatar} alt={author.name} />
                    <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
                  +{fandom.members - 3}
                </div>
              </div>
            </div>

            <Link to={`/fandoms/${fandom.id}`}>
              <Button className="rounded-full">
                View Fandom
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

export default Fandoms;
