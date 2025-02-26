
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Calendar, 
  Clock, 
  Users, 
  BookOpen, 
  PenTool, 
  Star,
  CheckCircle,
  Clock3,
  Timer,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock active contests data
const activeContests = [
  {
    id: "contest1",
    title: "Summer Fantasy Challenge",
    description: "Write a fantasy short story under 5,000 words featuring a summer solstice celebration.",
    deadline: "August 15, 2023",
    daysLeft: 12,
    prizes: [
      { place: "1st", award: "$500 + Featured Publication" },
      { place: "2nd", award: "$250" },
      { place: "3rd", award: "$100" },
    ],
    entries: 145,
    views: 3421,
    banner: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1684&q=80",
    category: "Short Story",
    wordLimit: "5,000 words",
    judges: [
      { name: "Eleanor Williams", avatar: "https://i.pravatar.cc/150?img=29" },
      { name: "Marcus Reed", avatar: "https://i.pravatar.cc/150?img=12" },
    ],
  },
  {
    id: "contest2",
    title: "Sci-Fi Microfiction Contest",
    description: "Create a sci-fi story in exactly 100 words that explores the theme of artificial intelligence.",
    deadline: "July 30, 2023",
    daysLeft: 5,
    prizes: [
      { place: "1st", award: "$300 + Publication" },
      { place: "2nd", award: "$150" },
      { place: "3rd", award: "$75" },
    ],
    entries: 287,
    views: 2938,
    banner: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80",
    category: "Microfiction",
    wordLimit: "Exactly 100 words",
    judges: [
      { name: "Sofia Garcia", avatar: "https://i.pravatar.cc/150?img=16" },
      { name: "James Holden", avatar: "https://i.pravatar.cc/150?img=11" },
    ],
  },
  {
    id: "contest3",
    title: "Character Monologue Challenge",
    description: "Write a compelling monologue that reveals a character's hidden depths. Any genre welcome.",
    deadline: "August 22, 2023",
    daysLeft: 19,
    prizes: [
      { place: "1st", award: "$400 + Feedback from Published Author" },
      { place: "2nd", award: "$200" },
      { place: "3rd", award: "$100" },
    ],
    entries: 112,
    views: 1876,
    banner: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
    category: "Character Study",
    wordLimit: "1,000 words",
    judges: [
      { name: "Leo Zhang", avatar: "https://i.pravatar.cc/150?img=61" },
      { name: "Amara Khan", avatar: "https://i.pravatar.cc/150?img=41" },
    ],
  },
];

// Mock past contests data
const pastContests = [
  {
    id: "past1",
    title: "Romance Writing Competition",
    description: "Submit a romantic short story under 7,500 words featuring unlikely love interests.",
    deadline: "June 15, 2023",
    prizes: [
      { place: "1st", award: "$400 + Publication" },
      { place: "2nd", award: "$200" },
      { place: "3rd", award: "$100" },
    ],
    entries: 189,
    views: 2145,
    banner: "https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1710&q=80",
    category: "Short Story",
    winner: {
      name: "Sofia Garcia",
      avatar: "https://i.pravatar.cc/150?img=16",
      story: "The Librarian and the Thief",
    },
  },
  {
    id: "past2",
    title: "Horror Flash Fiction",
    description: "Create a terrifying story in under 1,000 words that will keep readers up at night.",
    deadline: "April 30, 2023",
    prizes: [
      { place: "1st", award: "$350 + Featured on Homepage" },
      { place: "2nd", award: "$175" },
      { place: "3rd", award: "$75" },
    ],
    entries: 231,
    views: 2876,
    banner: "https://images.unsplash.com/photo-1535443274868-756b0f070b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    category: "Flash Fiction",
    winner: {
      name: "James Holden",
      avatar: "https://i.pravatar.cc/150?img=11",
      story: "What Waits in the Cellar",
    },
  },
];

// Mock your submissions data
const yourSubmissions = [
  {
    id: "sub1",
    contestId: "contest1",
    contestTitle: "Summer Fantasy Challenge",
    submissionTitle: "The Longest Day",
    status: "Draft",
    lastEdited: "July 15, 2023",
    progress: 45,
    wordCount: 2250,
    wordLimit: 5000,
  },
  {
    id: "sub2",
    contestId: "past2",
    contestTitle: "Horror Flash Fiction",
    submissionTitle: "Shadows in the Mist",
    status: "Submitted",
    submissionDate: "April 28, 2023",
    progress: 100,
    wordCount: 986,
    wordLimit: 1000,
    result: {
      rank: 7,
      feedback: "Strong atmosphere and tension throughout. Consider developing the protagonist's backstory a bit more in future works.",
    },
  },
];

const Contests = () => {
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        <div className="container py-8">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
              Writing Contests
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Challenge yourself, win prizes, and gain recognition. Our writing contests are a great way to push your creative boundaries and showcase your talent.
            </p>
          </div>

          {/* Contests Tabs */}
          <Tabs defaultValue="active" className="space-y-8">
            <TabsList className="rounded-full">
              <TabsTrigger value="active" className="rounded-full">
                <Clock className="h-4 w-4 mr-2" />
                Active Contests
              </TabsTrigger>
              <TabsTrigger value="past" className="rounded-full">
                <Trophy className="h-4 w-4 mr-2" />
                Past Contests
              </TabsTrigger>
              <TabsTrigger value="your" className="rounded-full">
                <PenTool className="h-4 w-4 mr-2" />
                Your Submissions
              </TabsTrigger>
              <TabsTrigger value="calendar" className="rounded-full">
                <Calendar className="h-4 w-4 mr-2" />
                Contest Calendar
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="m-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeContests.map((contest, index) => (
                  <ContestCard key={contest.id} contest={contest} index={index} />
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

            <TabsContent value="past" className="m-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {pastContests.map((contest, index) => (
                  <PastContestCard key={contest.id} contest={contest} index={index} />
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <Button variant="outline" className="rounded-full">
                  View All Past Contests
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="your" className="m-0">
              {yourSubmissions.length > 0 ? (
                <div className="space-y-6">
                  {yourSubmissions.map((submission, index) => (
                    <SubmissionCard key={submission.id} submission={submission} index={index} />
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center bg-muted rounded-xl">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-background flex items-center justify-center">
                    <PenTool className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No submissions yet</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    You haven't submitted any entries to our writing contests. Challenge yourself and participate today!
                  </p>
                  <Button className="rounded-full px-8">
                    Browse Active Contests
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="calendar" className="m-0">
              <div className="p-12 text-center bg-muted rounded-xl">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-background flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Contest Calendar</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Plan your writing schedule with our upcoming contests calendar. Never miss a deadline again!
                </p>
                <Button variant="outline" className="rounded-full px-8">
                  Coming Soon
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Featured Winners */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">
              Featured Contest Winners
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  author: "Eleanor Williams",
                  avatar: "https://i.pravatar.cc/150?img=29",
                  story: "The Dragon's Prophecy",
                  contest: "Fantasy Writing Challenge 2023",
                  excerpt: "The ancient dragon unfurled its wings, casting a shadow over the entire village. But Elara stood firm, the prophecy's words echoing in her mind...",
                },
                {
                  author: "Marcus Reed",
                  avatar: "https://i.pravatar.cc/150?img=12",
                  story: "Quantum Dreams",
                  contest: "Sci-Fi Spectacular Contest",
                  excerpt: "Every night when David fell asleep, his consciousness transported to a parallel universe - one where quantum theory wasn't just a theory...",
                },
                {
                  author: "Sofia Garcia",
                  avatar: "https://i.pravatar.cc/150?img=16",
                  story: "The Librarian and the Thief",
                  contest: "Romance Writing Competition",
                  excerpt: "She had spent her life surrounded by stories of love, but never expected to find it with the man who tried to steal her most precious book...",
                },
              ].map((winner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="border rounded-xl overflow-hidden"
                >
                  <div className="p-6">
                    <Badge className="mb-2">Contest Winner</Badge>
                    <h3 className="text-lg font-bold mb-1">{winner.story}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Winner of the {winner.contest}
                    </p>
                    <p className="text-muted-foreground text-sm mb-4 italic">
                      "{winner.excerpt}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={winner.avatar} alt={winner.author} />
                          <AvatarFallback>{winner.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{winner.author}</p>
                          <p className="text-sm text-muted-foreground">Author</p>
                        </div>
                      </div>
                      <Button variant="outline" className="rounded-full">
                        Read Story
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Tips for Success */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">
              Tips for Contest Success
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Read the Guidelines Carefully",
                  description: "Pay close attention to word limits, theme requirements, and formatting guidelines. Submissions that don't follow the rules may be disqualified.",
                  icon: CheckCircle,
                },
                {
                  title: "Start Early",
                  description: "Give yourself plenty of time to write, revise, and polish your work. Last-minute submissions often miss opportunities for improvement.",
                  icon: Clock3,
                },
                {
                  title: "Get Feedback",
                  description: "Share your draft with trusted readers who can provide constructive criticism before you submit your final entry.",
                  icon: MessageSquare,
                },
                {
                  title: "Keep it Fresh",
                  description: "Judges read many submissions, so look for unique angles and fresh perspectives on the contest theme to make your work stand out.",
                  icon: Star,
                },
              ].map((tip, index) => (
                <div key={index} className="border rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 rounded-full p-3">
                      <tip.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">{tip.title}</h3>
                      <p className="text-muted-foreground">{tip.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const ContestCard = ({ contest, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
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
          <Badge className="mb-2 bg-green-500">Active</Badge>
          <h3 className="text-white text-xl font-bold">{contest.title}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-muted-foreground mb-4">{contest.description}</p>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Deadline:</span>
            <span className="font-medium">{contest.deadline}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Time Left:</span>
            <span className="font-medium text-orange-500">{contest.daysLeft} days</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Category:</span>
            <span className="font-medium">{contest.category}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Word Limit:</span>
            <span className="font-medium">{contest.wordLimit}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Entries:</span>
            <span className="font-medium">{contest.entries.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-secondary p-3 rounded-lg mb-4">
          <p className="text-sm font-medium mb-1">Prizes:</p>
          <ul className="text-sm space-y-1">
            {contest.prizes.map((prize, i) => (
              <li key={i}>
                <span className="font-medium">{prize.place}:</span> {prize.award}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium mb-1">Judges:</p>
          <div className="flex -space-x-2">
            {contest.judges.map((judge, i) => (
              <Avatar key={i} className="border-2 border-background">
                <AvatarImage src={judge.avatar} alt={judge.name} />
                <AvatarFallback>{judge.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>

        <Link to={`/contests/${contest.id}`}>
          <Button className="w-full rounded-full">
            Enter Contest
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

const PastContestCard = ({ contest, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
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
          <Badge variant="outline" className="mb-2 bg-gray-800 text-white">Completed</Badge>
          <h3 className="text-white text-xl font-bold">{contest.title}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-muted-foreground mb-4">{contest.description}</p>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Deadline was:</span>
            <span className="font-medium">{contest.deadline}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Category:</span>
            <span className="font-medium">{contest.category}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Entries:</span>
            <span className="font-medium">{contest.entries.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-secondary p-3 rounded-lg mb-4">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={contest.winner.avatar} alt={contest.winner.name} />
              <AvatarFallback>{contest.winner.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{contest.winner.name}</p>
              <p className="text-xs text-muted-foreground">Winner with "{contest.winner.story}"</p>
            </div>
          </div>
        </div>

        <Link to={`/contests/${contest.id}/results`}>
          <Button variant="outline" className="w-full rounded-full">
            View Results
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

const SubmissionCard = ({ submission, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border rounded-xl p-5 bg-card"
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <Badge className={submission.status === "Draft" ? "bg-yellow-500" : "bg-green-500"}>
            {submission.status}
          </Badge>
          <h3 className="text-lg font-bold mt-2">{submission.submissionTitle}</h3>
          <p className="text-muted-foreground text-sm mb-4">
            For "{submission.contestTitle}"
          </p>

          <div className="space-y-2 mb-4">
            {submission.status === "Draft" ? (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Edited:</span>
                <span>{submission.lastEdited}</span>
              </div>
            ) : (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Submitted:</span>
                <span>{submission.submissionDate}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Word Count:</span>
              <span>
                {submission.wordCount.toLocaleString()} / {submission.wordLimit.toLocaleString()} words
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress:</span>
                <span>{submission.progress}%</span>
              </div>
              <Progress value={submission.progress} className="h-2" />
            </div>
          </div>

          {submission.result && (
            <div className="bg-secondary p-3 rounded-lg mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Final Rank:</span>
                <span>{submission.result.rank === 1 ? "1st Place 🏆" : (
                  submission.result.rank === 2 ? "2nd Place 🥈" : (
                    submission.result.rank === 3 ? "3rd Place 🥉" : `${submission.result.rank}th Place`
                  )
                )}</span>
              </div>
              <p className="text-sm">
                <span className="font-medium">Feedback: </span>
                {submission.result.feedback}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-row md:flex-col gap-2 justify-end">
          {submission.status === "Draft" ? (
            <>
              <Button className="rounded-full">
                <PenTool className="mr-2 h-4 w-4" /> Continue Writing
              </Button>
              <Button variant="outline" className="rounded-full">
                Submit Final
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="rounded-full">
                <BookOpen className="mr-2 h-4 w-4" /> View Submission
              </Button>
              {!submission.result && (
                <Button variant="outline" className="rounded-full">
                  <Timer className="mr-2 h-4 w-4" /> Awaiting Results
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Contests;
