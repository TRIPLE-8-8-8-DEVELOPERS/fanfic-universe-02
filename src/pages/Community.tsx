
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  MessageSquare,
  Trophy,
  Star,
  Heart,
  Flame,
  Search,
  Filter,
  PenTool,
  Calendar,
  BookText,
  ThumbsUp,
  UserPlus,
  MoveRight,
  BookOpen,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock data for discussions
const discussionTopics = [
  {
    id: "disc1",
    title: "Character Development Techniques",
    author: "Eleanor Williams",
    authorId: "eleanor",
    authorAvatar: "https://i.pravatar.cc/150?img=29",
    category: "Writing Tips",
    tags: ["Character Development", "Writing Advice"],
    replies: 56,
    views: 1243,
    lastActive: "2 hours ago",
    content: "What techniques do you use to create memorable characters? I'm struggling with making my protagonist more three-dimensional...",
  },
  {
    id: "disc2",
    title: "The Future of the Marvel Cinematic Universe",
    author: "Alex Chen",
    authorId: "alex",
    authorAvatar: "https://i.pravatar.cc/150?img=12",
    category: "Fandoms",
    tags: ["Marvel", "MCU", "Theories"],
    replies: 89,
    views: 2157,
    lastActive: "5 hours ago",
    content: "After the events of the latest film, where do you think the MCU is headed? I have some theories about the multiverse...",
  },
  {
    id: "disc3",
    title: "Writing Romance Subplots: Dos and Don'ts",
    author: "Sofia Garcia",
    authorId: "sofia",
    authorAvatar: "https://i.pravatar.cc/150?img=16",
    category: "Writing Tips",
    tags: ["Romance", "Subplots", "Tips"],
    replies: 42,
    views: 982,
    lastActive: "1 day ago",
    content: "How do you write romance subplots that enhance the main story without feeling forced? I'm looking for advice on pacing...",
  },
  {
    id: "disc4",
    title: "Harry Potter: Unanswered Questions and Plot Holes",
    author: "Jamie Smith",
    authorId: "jamie",
    authorAvatar: "https://i.pravatar.cc/150?img=33",
    category: "Fandoms",
    tags: ["Harry Potter", "Analysis"],
    replies: 124,
    views: 3560,
    lastActive: "4 hours ago",
    content: "Let's discuss the unanswered questions and plot holes in the Harry Potter series. The one that always bothered me was...",
  },
];

// Mock data for writing contests
const writingContests = [
  {
    id: "contest1",
    title: "Summer Fantasy Challenge",
    description: "Write a fantasy short story under 5,000 words featuring a summer solstice celebration.",
    deadline: "August 15, 2023",
    prizes: "1st Place: $500, 2nd Place: $250, 3rd Place: $100",
    entries: 145,
    views: 3421,
    banner: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1684&q=80",
    status: "Open",
  },
  {
    id: "contest2",
    title: "Sci-Fi Microfiction Contest",
    description: "Create a sci-fi story in exactly 100 words that explores the theme of artificial intelligence.",
    deadline: "July 30, 2023",
    prizes: "1st Place: $300, 2nd Place: $150, 3rd Place: $75",
    entries: 287,
    views: 2938,
    banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80",
    status: "Open",
  },
  {
    id: "contest3",
    title: "Romance Writing Competition",
    description: "Submit a romantic short story under 7,500 words featuring unlikely love interests.",
    deadline: "June 15, 2023",
    prizes: "1st Place: $400, 2nd Place: $200, 3rd Place: $100",
    entries: 189,
    views: 2145,
    banner: "https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1710&q=80",
    status: "Closed",
  },
];

// Mock data for reading clubs
const readingClubs = [
  {
    id: "club1",
    name: "Fantasy Realms",
    description: "A reading club dedicated to fantasy literature, from classic epics to modern series.",
    members: 1243,
    posts: 587,
    currentBook: "The Name of the Wind by Patrick Rothfuss",
    meetupSchedule: "Every Sunday at 7PM EST",
    image: "https://images.unsplash.com/photo-1509021406889-65da89c25ba7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: "club2",
    name: "Sci-Fi Explorers",
    description: "Exploring the vast universe of science fiction literature, from hard sci-fi to space opera.",
    members: 968,
    posts: 432,
    currentBook: "Project Hail Mary by Andy Weir",
    meetupSchedule: "Biweekly on Wednesdays at 8PM EST",
    image: "https://images.unsplash.com/photo-1538370965046-79c0d6907d47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
  },
  {
    id: "club3",
    name: "Mystery Detectives",
    description: "For fans of mysteries, thrillers, and detective fiction. We solve the case together!",
    members: 754,
    posts: 321,
    currentBook: "The Silent Patient by Alex Michaelides",
    meetupSchedule: "Every other Saturday at 6PM EST",
    image: "https://images.unsplash.com/photo-1587573088b27e44d7c5b9cbb906ff46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  },
];

// Mock data for active authors
const activeAuthors = [
  {
    id: "author1",
    name: "Eleanor Williams",
    avatar: "https://i.pravatar.cc/150?img=29",
    stories: 12,
    followers: 3421,
    badge: "Top Writer",
  },
  {
    id: "author2",
    name: "Marcus Reed",
    avatar: "https://i.pravatar.cc/150?img=12",
    stories: 8,
    followers: 2956,
    badge: "Rising Star",
  },
  {
    id: "author3",
    name: "Sofia Garcia",
    avatar: "https://i.pravatar.cc/150?img=16",
    stories: 15,
    followers: 4102,
    badge: "Veteran",
  },
  {
    id: "author4",
    name: "James Holden",
    avatar: "https://i.pravatar.cc/150?img=11",
    stories: 6,
    followers: 1897,
    badge: "Contest Winner",
  },
];

const Community = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        <div className="container py-8">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
              FanFic Universe Community
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Connect with fellow writers and readers, join discussions, participate in contests, and discover reading clubs. Our community is where stories come alive.
            </p>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-primary text-primary-foreground rounded-xl p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium text-lg">Active Members</h3>
                <Users className="h-6 w-6" />
              </div>
              <p className="text-3xl font-bold mb-1">32,541</p>
              <p className="text-sm text-primary-foreground/70">
                +1,243 this month
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-secondary rounded-xl p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium text-lg">Forum Topics</h3>
                <MessageSquare className="h-6 w-6" />
              </div>
              <p className="text-3xl font-bold mb-1">8,752</p>
              <p className="text-sm text-muted-foreground">
                +324 this month
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-secondary rounded-xl p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium text-lg">Active Contests</h3>
                <Trophy className="h-6 w-6" />
              </div>
              <p className="text-3xl font-bold mb-1">12</p>
              <p className="text-sm text-muted-foreground">
                2 ending soon
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-secondary rounded-xl p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium text-lg">Reading Clubs</h3>
                <BookOpen className="h-6 w-6" />
              </div>
              <p className="text-3xl font-bold mb-1">27</p>
              <p className="text-sm text-muted-foreground">
                8 meeting this week
              </p>
            </motion.div>
          </div>

          {/* Community Tabs */}
          <Tabs defaultValue="discussions" className="space-y-8">
            <TabsList className="rounded-full">
              <TabsTrigger value="discussions" className="rounded-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                Discussions
              </TabsTrigger>
              <TabsTrigger value="contests" className="rounded-full">
                <Trophy className="h-4 w-4 mr-2" />
                Writing Contests
              </TabsTrigger>
              <TabsTrigger value="clubs" className="rounded-full">
                <Users className="h-4 w-4 mr-2" />
                Reading Clubs
              </TabsTrigger>
              <TabsTrigger value="authors" className="rounded-full">
                <Star className="h-4 w-4 mr-2" />
                Active Authors
              </TabsTrigger>
            </TabsList>

            {/* Discussions Tab */}
            <TabsContent value="discussions" className="m-0">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Forum Discussions</h2>
                <div className="flex items-center gap-2">
                  <div className="relative w-60">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search discussions"
                      className="pl-10 rounded-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="rounded-full" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button className="rounded-full">
                    <PenTool className="h-4 w-4 mr-2" />
                    New Topic
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                {discussionTopics.map((topic) => (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border rounded-xl p-4 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={topic.authorAvatar} alt={topic.author} />
                        <AvatarFallback>
                          {topic.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <Badge variant="outline" className="rounded-full">
                            {topic.category}
                          </Badge>
                          {topic.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="rounded-full text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Link to={`/community/discussion/${topic.id}`}>
                          <h3 className="text-lg font-bold hover:text-primary transition-colors">
                            {topic.title}
                          </h3>
                        </Link>
                        <p className="text-muted-foreground mt-1 line-clamp-2">
                          {topic.content}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                          <Link to={`/author/${topic.authorId}`} className="hover:text-primary transition-colors">
                            By {topic.author}
                          </Link>
                          <span>{topic.replies} replies</span>
                          <span>{topic.views} views</span>
                          <span>Last active {topic.lastActive}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <Button variant="outline" className="rounded-full">
                  Load More Discussions
                </Button>
              </div>
            </TabsContent>

            {/* Contests Tab */}
            <TabsContent value="contests" className="m-0">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Writing Contests</h2>
                <Button className="rounded-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Contest Calendar
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {writingContests.map((contest) => (
                  <motion.div
                    key={contest.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border rounded-xl overflow-hidden group"
                  >
                    <div className="relative h-48">
                      <img
                        src={contest.banner}
                        alt={contest.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <Badge
                          className={`mb-2 ${
                            contest.status === "Open"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {contest.status}
                        </Badge>
                        <h3 className="text-white text-xl font-bold">
                          {contest.title}
                        </h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-muted-foreground mb-4">
                        {contest.description}
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Deadline:</span>
                          <span className="font-medium">{contest.deadline}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Entries:</span>
                          <span className="font-medium">
                            {contest.entries.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Views:</span>
                          <span className="font-medium">
                            {contest.views.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="bg-secondary p-3 rounded-lg mb-4">
                        <p className="text-sm font-medium mb-1">Prizes:</p>
                        <p className="text-sm">{contest.prizes}</p>
                      </div>
                      <Button
                        disabled={contest.status !== "Open"}
                        className="w-full rounded-full"
                      >
                        {contest.status === "Open"
                          ? "Submit Your Entry"
                          : "Contest Closed"}
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 p-8 rounded-xl bg-muted text-center">
                <h3 className="text-xl font-bold mb-2">Want to host a contest?</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                  If you have an idea for a writing challenge or contest, we'd love to hear from you. Community-hosted contests are a great way to engage with other writers.
                </p>
                <Button className="rounded-full px-8">Propose a Contest</Button>
              </div>
            </TabsContent>

            {/* Reading Clubs Tab */}
            <TabsContent value="clubs" className="m-0">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Reading Clubs</h2>
                <Button className="rounded-full">
                  <Users className="h-4 w-4 mr-2" />
                  Create a Club
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {readingClubs.map((club) => (
                  <motion.div
                    key={club.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border rounded-xl overflow-hidden group"
                  >
                    <div className="relative h-40">
                      <img
                        src={club.image}
                        alt={club.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-white text-xl font-bold">
                          {club.name}
                        </h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {club.description}
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Members:</span>
                          <span className="font-medium">
                            {club.members.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Posts:</span>
                          <span className="font-medium">
                            {club.posts.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="bg-secondary p-3 rounded-lg mb-4">
                        <p className="text-sm font-medium mb-1">
                          Current Book:
                        </p>
                        <p className="text-sm">{club.currentBook}</p>
                      </div>
                      <div className="bg-secondary p-3 rounded-lg mb-4">
                        <p className="text-sm font-medium mb-1">
                          Meet-up Schedule:
                        </p>
                        <p className="text-sm">{club.meetupSchedule}</p>
                      </div>
                      <Button className="w-full rounded-full">
                        Join Club
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="rounded-full">
                  Explore All Clubs
                </Button>
              </div>
            </TabsContent>

            {/* Active Authors Tab */}
            <TabsContent value="authors" className="m-0">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Active Authors</h2>
                <div className="relative w-60">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search authors"
                    className="pl-10 rounded-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {activeAuthors.map((author) => (
                  <motion.div
                    key={author.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5 }}
                    className="border rounded-xl p-5 text-center"
                  >
                    <div className="mb-4">
                      <Avatar className="h-20 w-20 mx-auto">
                        <AvatarImage src={author.avatar} alt={author.name} />
                        <AvatarFallback>
                          {author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <Badge className="mt-2 mx-auto rounded-full px-3 py-1">
                        {author.badge}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold mb-1">
                      {author.name}
                    </h3>
                    <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div>
                        <span className="font-medium">{author.stories}</span> stories
                      </div>
                      <div>
                        <span className="font-medium">{author.followers.toLocaleString()}</span> followers
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button className="rounded-full">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Follow
                      </Button>
                      <Link to={`/author/${author.id}`}>
                        <Button variant="outline" className="w-full rounded-full">
                          Profile
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="rounded-full">
                  View All Authors
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Featured Community Events */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">
              Upcoming Community Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <Badge className="mb-2 bg-primary">Featured</Badge>
                    <Badge variant="outline">July 20, 2023</Badge>
                  </div>
                  <CardTitle>Character Building Workshop</CardTitle>
                  <CardDescription>
                    Online Workshop with Award-Winning Author Sarah Peterson
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Learn techniques for creating compelling, three-dimensional characters that readers will remember long after they finish your story.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full rounded-full">
                    Register Now
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <Badge className="mb-2 bg-secondary">Free</Badge>
                    <Badge variant="outline">August 5, 2023</Badge>
                  </div>
                  <CardTitle>Fantasy Worldbuilding Panel</CardTitle>
                  <CardDescription>
                    Live Panel Discussion with Genre Experts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Join our panel of fantasy authors as they discuss the art and craft of creating immersive, believable fantasy worlds for your stories.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full rounded-full">
                    Add to Calendar
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <Badge className="mb-2 bg-emerald-600">New</Badge>
                    <Badge variant="outline">August 12-15, 2023</Badge>
                  </div>
                  <CardTitle>Summer Writing Sprint</CardTitle>
                  <CardDescription>
                    Community Challenge
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Challenge yourself to write 10,000 words in 4 days. Join hundreds of other writers in this supportive community event with daily check-ins.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full rounded-full">
                    Join Challenge
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* Community Testimonials */}
          <section className="mt-16 mb-8">
            <h2 className="text-2xl font-bold mb-10 text-center">
              What Our Community Is Saying
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-secondary rounded-xl">
                <div className="flex items-center mb-3">
                  <ThumbsUp className="text-primary h-4 w-4 mr-1" />
                  <ThumbsUp className="text-primary h-4 w-4 mr-1" />
                  <ThumbsUp className="text-primary h-4 w-4 mr-1" />
                  <ThumbsUp className="text-primary h-4 w-4 mr-1" />
                  <ThumbsUp className="text-primary h-4 w-4" />
                </div>
                <p className="italic mb-4 text-muted-foreground">
                  "The writing contests pushed me to improve my craft and try new genres. I've grown so much as a writer since joining this community!"
                </p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src="https://i.pravatar.cc/150?img=5" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Jessica D.</p>
                    <p className="text-sm text-muted-foreground">Member since 2022</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-secondary rounded-xl">
                <div className="flex items-center mb-3">
                  <ThumbsUp className="text-primary h-4 w-4 mr-1" />
                  <ThumbsUp className="text-primary h-4 w-4 mr-1" />
                  <ThumbsUp className="text-primary h-4 w-4 mr-1" />
                  <ThumbsUp className="text-primary h-4 w-4 mr-1" />
                  <ThumbsUp className="text-primary h-4 w-4" />
                </div>
                <p className="italic mb-4 text-muted-foreground">
                  "I was struggling with writer's block until I joined the Fantasy Realms reading club. The discussions and support rekindled my creativity!"
                </p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src="https://i.pravatar.cc/150?img=8" />
                    <AvatarFallback>MT</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Michael T.</p>
                    <p className="text-sm text-muted-foreground">Member since 2021</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-secondary rounded-xl">
                <div className="flex items-center mb-3">
                  <ThumbsUp className="text-primary h-4 w-4 mr-1" />
                  <ThumbsUp className="text-primary h-4 w-4 mr-1" />
                  <ThumbsUp className="text-primary h-4 w-4 mr-1" />
                  <ThumbsUp className="text-primary h-4 w-4 mr-1" />
                  <ThumbsUp className="text-primary h-4 w-4" />
                </div>
                <p className="italic mb-4 text-muted-foreground">
                  "The feedback I received on the forums transformed my writing. This is more than just a website - it's a supportive family of fellow creators."
                </p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src="https://i.pravatar.cc/150?img=23" />
                    <AvatarFallback>AK</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Aisha K.</p>
                    <p className="text-sm text-muted-foreground">Member since 2020</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Community CTA */}
          <section className="mt-16 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 font-serif">
                Join Our Growing Community Today
              </h2>
              <p className="text-muted-foreground mb-8">
                Connect with fellow fans, share your stories, participate in events, and become part of something special. Our community is waiting for you.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/sign-up">
                  <Button size="lg" className="rounded-full px-8">
                    Create Account
                  </Button>
                </Link>
                <Link to="/community/guidelines">
                  <Button variant="outline" size="lg" className="rounded-full px-8">
                    Community Guidelines <MoveRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Community;
