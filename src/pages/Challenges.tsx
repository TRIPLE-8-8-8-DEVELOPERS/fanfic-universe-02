
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Clock, Users, CheckCircle, Flame, Calendar, ArrowRight } from "lucide-react";

const Challenges = () => {
  const [joinedChallenges, setJoinedChallenges] = useState<number[]>([]);

  const toggleJoinChallenge = (id: number) => {
    if (joinedChallenges.includes(id)) {
      setJoinedChallenges(joinedChallenges.filter(challengeId => challengeId !== id));
    } else {
      setJoinedChallenges([...joinedChallenges, id]);
    }
  };

  const featuredChallenges = [
    {
      id: 1,
      title: "NaNoWriMo Challenge",
      description: "Write a 50,000-word novel during November. Join thousands of writers in this global event!",
      participants: 12489,
      deadline: "Nov 30, 2024",
      category: "Novel Writing",
      prize: "Publishing Contract",
      progress: 32,
      badge: "Featured",
      badgeColor: "bg-yellow-500",
    },
    {
      id: 2,
      title: "Flash Fiction Contest",
      description: "Craft a complete story in just 500 words or less. Challenge yourself to create impact with fewer words.",
      participants: 5231,
      deadline: "Oct 15, 2024",
      category: "Flash Fiction",
      prize: "$500",
      progress: 75,
      badge: "Popular",
      badgeColor: "bg-purple-500",
    },
    {
      id: 3,
      title: "Fantasy Worldbuilding",
      description: "Create a unique fantasy world with detailed lore, geography, and political systems.",
      participants: 3188,
      deadline: "Dec 20, 2024",
      category: "Worldbuilding",
      prize: "Mentorship",
      progress: 10,
      badge: "New",
      badgeColor: "bg-green-500",
    },
  ];

  const weeklyChallenges = [
    {
      id: 4,
      title: "Mystery Prompt Challenge",
      description: "Write a mystery story based on this week's prompt: 'The forgotten key'",
      participants: 487,
      deadline: "7 days left",
      category: "Mystery",
      prize: "Featured Story",
    },
    {
      id: 5,
      title: "Character Development",
      description: "Create a compelling character profile with backstory, motivations, and flaws",
      participants: 352,
      deadline: "5 days left",
      category: "Character Creation",
      prize: "Reader's Choice Award",
    },
    {
      id: 6,
      title: "Poetry Challenge",
      description: "Write a sonnet about an unexpected friendship between unlikely allies",
      participants: 219,
      deadline: "3 days left",
      category: "Poetry",
      prize: "Community Spotlight",
    },
  ];

  const monthlyChallenges = [
    {
      id: 7,
      title: "Historical Fiction",
      description: "Transport readers to ancient Rome with an engaging historical fiction piece",
      participants: 687,
      deadline: "Oct 31, 2024",
      category: "Historical Fiction",
      prize: "$250 + Publication",
    },
    {
      id: 8,
      title: "Sci-Fi Short Story",
      description: "Write a science fiction story exploring the ethical implications of AI",
      participants: 845,
      deadline: "Oct 31, 2024",
      category: "Science Fiction",
      prize: "Pro Membership",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 p-4 md:p-6 max-w-full">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-serif font-bold mb-4">Writing Challenges</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Push your creative boundaries, improve your writing skills, and connect with other writers through our curated writing challenges.
            </p>
          </div>

          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-serif font-bold mb-6 flex items-center">
                <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
                Featured Challenges
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredChallenges.map((challenge) => (
                  <Card key={challenge.id} className="hover:shadow-md transition-shadow story-card-hover">
                    <CardHeader>
                      <div className="flex justify-between">
                        <Badge className={`${challenge.badgeColor} hover:${challenge.badgeColor}`}>
                          {challenge.badge}
                        </Badge>
                        <Badge variant="outline" className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {challenge.participants.toLocaleString()}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl mt-2">{challenge.title}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {challenge.category}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{challenge.description}</p>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            Deadline: {challenge.deadline}
                          </span>
                          <span className="font-medium">
                            Prize: {challenge.prize}
                          </span>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{challenge.progress}%</span>
                          </div>
                          <Progress value={challenge.progress} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        variant={joinedChallenges.includes(challenge.id) ? "secondary" : "default"}
                        onClick={() => toggleJoinChallenge(challenge.id)}
                      >
                        {joinedChallenges.includes(challenge.id) ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Joined
                          </>
                        ) : (
                          <>
                            <Flame className="h-4 w-4 mr-2" />
                            Join Challenge
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <Tabs defaultValue="weekly">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-serif font-bold flex items-center">
                    <Calendar className="h-6 w-6 mr-2 text-purple-500" />
                    Time-Based Challenges
                  </h2>
                  <TabsList>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="weekly" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {weeklyChallenges.map((challenge) => (
                      <Card key={challenge.id} className="hover:shadow-md transition-shadow story-card-hover">
                        <CardHeader>
                          <CardTitle className="text-xl">{challenge.title}</CardTitle>
                          <CardDescription className="text-muted-foreground">
                            {challenge.category}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="mb-4">{challenge.description}</p>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {challenge.deadline}
                            </span>
                            <span className="text-muted-foreground flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {challenge.participants}
                            </span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            className="w-full" 
                            variant={joinedChallenges.includes(challenge.id) ? "secondary" : "default"}
                            onClick={() => toggleJoinChallenge(challenge.id)}
                          >
                            {joinedChallenges.includes(challenge.id) ? "Joined" : "Join Challenge"}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="monthly" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {monthlyChallenges.map((challenge) => (
                      <Card key={challenge.id} className="hover:shadow-md transition-shadow story-card-hover">
                        <CardHeader>
                          <CardTitle className="text-xl">{challenge.title}</CardTitle>
                          <CardDescription className="text-muted-foreground">
                            {challenge.category}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="mb-4">{challenge.description}</p>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {challenge.deadline}
                            </span>
                            <span className="text-muted-foreground flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {challenge.participants}
                            </span>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <div>
                            <span className="font-medium">Prize: {challenge.prize}</span>
                          </div>
                          <Button 
                            variant={joinedChallenges.includes(challenge.id) ? "secondary" : "default"}
                            onClick={() => toggleJoinChallenge(challenge.id)}
                          >
                            {joinedChallenges.includes(challenge.id) ? "Joined" : "Join"}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </section>

            <section className="bg-card-gradient rounded-xl p-8 text-center">
              <h2 className="text-2xl font-serif font-bold mb-3">Create Your Own Challenge</h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Have a unique writing challenge idea? Create your own and invite the community to participate!
              </p>
              <Button size="lg">
                Start a Challenge <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Challenges;
