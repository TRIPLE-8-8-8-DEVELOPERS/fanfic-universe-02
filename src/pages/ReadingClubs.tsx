
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  BookOpen, 
  Users, 
  Calendar, 
  MessageCircle, 
  Clock,
  UserPlus,
  Star,
  Filter,
  ArrowRight,
  Globe,
  Bookmark
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock reading clubs data
const popularClubs = [
  {
    id: "club1",
    name: "Fantasy Realms",
    description: "A reading club dedicated to fantasy literature, from classic epics to modern series.",
    members: 1243,
    posts: 587,
    currentBook: "The Name of the Wind by Patrick Rothfuss",
    meetupSchedule: "Every Sunday at 7PM EST",
    image: "https://images.unsplash.com/photo-1509021406889-65da89c25ba7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    founder: {
      name: "Eleanor Williams",
      avatar: "https://i.pravatar.cc/150?img=29",
    },
    tags: ["Fantasy", "Epic", "Magic Systems", "World Building"],
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
    founder: {
      name: "Marcus Reed",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    tags: ["Science Fiction", "Space", "Technology", "Futurism"],
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
    founder: {
      name: "James Holden",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    tags: ["Mystery", "Thriller", "Crime", "Detective"],
  },
];

const newClubs = [
  {
    id: "new1",
    name: "Historical Fiction Chronicles",
    description: "Journey through time with novels set in different historical periods and cultures.",
    members: 356,
    posts: 143,
    currentBook: "The Pillars of the Earth by Ken Follett",
    meetupSchedule: "Monthly on first Friday at 7PM EST",
    image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1774&q=80",
    founder: {
      name: "Sofia Garcia",
      avatar: "https://i.pravatar.cc/150?img=16",
    },
    tags: ["Historical", "Fiction", "History", "Period Piece"],
    isNew: true,
  },
  {
    id: "new2",
    name: "Literary Classics Society",
    description: "Exploring timeless literary works that have shaped modern literature and thought.",
    members: 278,
    posts: 96,
    currentBook: "Pride and Prejudice by Jane Austen",
    meetupSchedule: "Biweekly on Sundays at 4PM EST",
    image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    founder: {
      name: "Amara Khan",
      avatar: "https://i.pravatar.cc/150?img=41",
    },
    tags: ["Classics", "Literature", "Analysis", "Traditional"],
    isNew: true,
  },
  {
    id: "new3",
    name: "YA Fiction Enthusiasts",
    description: "Celebrating young adult fiction across all genres and discussing themes relevant to young readers.",
    members: 412,
    posts: 187,
    currentBook: "Six of Crows by Leigh Bardugo",
    meetupSchedule: "Weekly on Tuesdays at 7PM EST",
    image: "https://images.unsplash.com/photo-1528818618341-2b1314ce922d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    founder: {
      name: "Noah Adams",
      avatar: "https://i.pravatar.cc/150?img=59",
    },
    tags: ["Young Adult", "Coming of Age", "Fantasy", "Contemporary"],
    isNew: true,
  },
];

const yourClubs = [
  {
    id: "your1",
    name: "Fantasy Realms",
    description: "A reading club dedicated to fantasy literature, from classic epics to modern series.",
    currentBook: "The Name of the Wind by Patrick Rothfuss",
    nextMeeting: "Sunday, July 23, 7PM EST",
    image: "https://images.unsplash.com/photo-1509021406889-65da89c25ba7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    unreadPosts: 7,
    role: "Member",
  },
  {
    id: "your2",
    name: "YA Fiction Enthusiasts",
    description: "Celebrating young adult fiction across all genres and discussing themes relevant to young readers.",
    currentBook: "Six of Crows by Leigh Bardugo",
    nextMeeting: "Tuesday, July 18, 7PM EST",
    image: "https://images.unsplash.com/photo-1528818618341-2b1314ce922d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    unreadPosts: 12,
    role: "Moderator",
    hasPolls: true,
  },
];

const ReadingClubs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        <div className="container py-8">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
              Reading Clubs
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Join a community of readers passionate about the same books and genres as you. Discover new perspectives, engage in meaningful discussions, and make friends with similar literary interests.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-10">
            <div className="relative max-w-xl flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for reading clubs by name, book, or topic"
                className="pl-10 rounded-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="rounded-full">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button className="rounded-full">
              <BookOpen className="h-4 w-4 mr-2" />
              Create Club
            </Button>
          </div>

          {/* Clubs Tabs */}
          <Tabs defaultValue="popular" className="space-y-8">
            <TabsList className="rounded-full">
              <TabsTrigger value="popular" className="rounded-full">
                <Star className="h-4 w-4 mr-2" />
                Popular Clubs
              </TabsTrigger>
              <TabsTrigger value="new" className="rounded-full">
                <BookOpen className="h-4 w-4 mr-2" />
                New Clubs
              </TabsTrigger>
              <TabsTrigger value="your" className="rounded-full">
                <Bookmark className="h-4 w-4 mr-2" />
                Your Clubs
              </TabsTrigger>
              <TabsTrigger value="genres" className="rounded-full">
                <Globe className="h-4 w-4 mr-2" />
                By Genre
              </TabsTrigger>
            </TabsList>

            <TabsContent value="popular" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {popularClubs.map((club, index) => (
                  <ClubCard key={club.id} club={club} index={index} />
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="rounded-full">
                  View All Popular Clubs
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="new" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {newClubs.map((club, index) => (
                  <ClubCard key={club.id} club={club} index={index} />
                ))}
              </div>
              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="rounded-full">
                  View More New Clubs
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="your" className="m-0">
              {yourClubs.length > 0 ? (
                <div className="space-y-6">
                  {yourClubs.map((club, index) => (
                    <YourClubCard key={club.id} club={club} index={index} />
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center bg-muted rounded-xl">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-background flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">You haven't joined any clubs yet</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    Join a reading club to discuss your favorite books with fellow enthusiasts and discover new reads!
                  </p>
                  <Button className="rounded-full px-8">
                    Browse Popular Clubs
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="genres" className="m-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[
                  { name: "Fantasy", count: 42, icon: BookOpen },
                  { name: "Science Fiction", count: 37, icon: BookOpen },
                  { name: "Mystery", count: 29, icon: BookOpen },
                  { name: "Romance", count: 31, icon: BookOpen },
                  { name: "Historical Fiction", count: 25, icon: BookOpen },
                  { name: "Young Adult", count: 46, icon: BookOpen },
                  { name: "Horror", count: 18, icon: BookOpen },
                  { name: "Classics", count: 22, icon: BookOpen },
                  { name: "Non-Fiction", count: 33, icon: BookOpen },
                  { name: "Poetry", count: 15, icon: BookOpen },
                  { name: "Biography", count: 19, icon: BookOpen },
                  { name: "Thriller", count: 27, icon: BookOpen },
                ].map((genre, index) => (
                  <motion.div
                    key={genre.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border rounded-xl p-6 hover:border-primary transition-colors"
                  >
                    <Link to={`/reading-clubs/genre/${genre.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <genre.icon className="h-5 w-5 text-primary" />
                          <h3 className="font-medium">{genre.name}</h3>
                        </div>
                        <Badge variant="outline" className="rounded-full">
                          {genre.count}
                        </Badge>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Featured Club */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Featured Club of the Month</h2>
            <div className="relative rounded-xl overflow-hidden">
              <div className="absolute inset-0">
                <img 
                  src="https://images.unsplash.com/photo-1513001900722-370f803f498d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                  alt="Fantasy Book Club" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
              </div>
              <div className="relative p-8 md:p-12 md:w-2/3 text-white">
                <Badge className="bg-primary text-primary-foreground mb-3">Featured Club</Badge>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">Contemporary Literature Society</h3>
                <p className="mb-4 text-gray-200">
                  Delving into the works of modern literary giants and exploring the themes that define our current era. Join us for thoughtful discussions on today's most impactful books.
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>1,892 members</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>Currently reading: "Crossroads" by Jonathan Franzen</span>
                  </div>
                </div>
                <Button className="rounded-full">
                  Join This Club
                </Button>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-center">How Reading Clubs Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Join a Club</h3>
                <p className="text-muted-foreground">
                  Browse clubs by genre or popularity and join the ones that match your reading interests. You can be a member of multiple clubs.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Participate in Discussions</h3>
                <p className="text-muted-foreground">
                  Each club reads one book at a time with a set schedule. Share your thoughts, ask questions, and engage with other members.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Attend Virtual Meetups</h3>
                <p className="text-muted-foreground">
                  Join scheduled video meetups to discuss the current book in real-time with fellow club members and sometimes special guests.
                </p>
              </div>
            </div>
            <div className="mt-10 text-center">
              <Button className="rounded-full px-8">
                Start Your Own Club <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const ClubCard = ({ club, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border rounded-xl overflow-hidden group"
    >
      <div className="relative h-48">
        <img
          src={club.image}
          alt={club.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        {club.isNew && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-green-500">New</Badge>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2">{club.name}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {club.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Members:</span>
            <span className="font-medium">{club.members.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Current Book:</span>
            <span className="font-medium line-clamp-1 text-right max-w-[70%]">{club.currentBook}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Meet-ups:</span>
            <span className="font-medium">{club.meetupSchedule}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {club.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="rounded-full text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={club.founder.avatar} alt={club.founder.name} />
              <AvatarFallback>{club.founder.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs text-muted-foreground">Founded by</p>
              <p className="text-sm font-medium">{club.founder.name}</p>
            </div>
          </div>
          <Button className="rounded-full h-9">
            <UserPlus className="h-4 w-4 mr-1" />
            Join
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const YourClubCard = ({ club, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border rounded-xl p-5 bg-card"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-48 h-32 rounded-md overflow-hidden">
          <img
            src={club.image}
            alt={club.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-bold">{club.name}</h3>
              <p className="text-muted-foreground text-sm mb-3">
                {club.description}
              </p>
            </div>
            <Badge 
              variant={club.role === "Moderator" ? "default" : "outline"} 
              className="rounded-full"
            >
              {club.role}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Current Book:</p>
              <p className="font-medium">{club.currentBook}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Next Meeting:</p>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-primary" />
                <p className="font-medium">{club.nextMeeting}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button className="rounded-full">
              <MessageCircle className="h-4 w-4 mr-2" />
              Discussion Board 
              {club.unreadPosts > 0 && (
                <Badge className="ml-2 bg-red-500 h-5 min-w-5 px-1 flex items-center justify-center rounded-full">{club.unreadPosts}</Badge>
              )}
            </Button>
            <Button variant="outline" className="rounded-full">
              <BookOpen className="h-4 w-4 mr-2" />
              Reading Progress
            </Button>
            {club.hasPolls && (
              <Button variant="outline" className="rounded-full">
                <Star className="h-4 w-4 mr-2" />
                Book Polls
                <Badge className="ml-2 bg-primary h-5 min-w-5 px-1 flex items-center justify-center rounded-full">1</Badge>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReadingClubs;
