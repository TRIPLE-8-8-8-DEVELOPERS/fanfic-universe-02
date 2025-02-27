
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

// Import missing components
import { Award, Check, Star, Globe2 } from "lucide-react";

interface Challenge {
  title: string;
  description: string;
  deadline: string;
  wordLimit: string;
  prize: string;
  participants: number;
}

const Write = () => {
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [genre, setGenre] = useState("Fantasy");
  const [wordCount, setWordCount] = useState(0);
  const [isPublished, setIsPublished] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const { toast } = useToast();

  const challenges = [
    {
      title: "Fantasy World-Building Challenge",
      description:
        "Create a new fantasy world with unique creatures, cultures, and magic systems.",
      deadline: "2023-12-31",
      wordLimit: "5000",
      prize: "Publication in our annual anthology",
      participants: 125,
    },
    {
      title: "Sci-Fi Short Story Contest",
      description:
        "Write a short story set in a futuristic world with advanced technology and complex social issues.",
      deadline: "2024-01-15",
      wordLimit: "3000",
      prize: "$500 cash prize",
      participants: 87,
    },
    {
      title: "Romance Writing Prompt",
      description:
        "Explore the theme of second chances in a heartwarming romance story.",
      deadline: "2024-02-29",
      wordLimit: "4000",
      prize: "Featured on our website",
      participants: 54,
    },
  ];

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleStoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setStory(text);
    setWordCount(text.trim().split(/\s+/).length);
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value);
  };

  const handlePublish = () => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please provide a title for your story.",
        variant: "destructive",
      });
      return;
    }

    if (!story.trim()) {
      toast({
        title: "Error",
        description: "Please write some content for your story.",
        variant: "destructive",
      });
      return;
    }

    setIsPublished(true);
    toast({
      title: "Success!",
      description: "Your story has been published successfully!",
    });
  };

  const handleStartNewStory = () => {
    setTitle("");
    setStory("");
    setGenre("Fantasy");
    setWordCount(0);
    setIsPublished(false);
    toast({
      title: "New Story",
      description: "Start writing your new masterpiece!",
    });
  };

  const handleJoinChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    toast({
      title: "Challenge Joined",
      description: `You've joined the "${challenge.title}" challenge. Good luck!`,
    });
  };

  const handleSaveDraft = () => {
    if (!title.trim() && !story.trim()) {
      toast({
        title: "Error",
        description: "Please add some content before saving.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Draft Saved",
      description: "Your story has been saved as a draft.",
    });
  };

  return (
    <div className="container py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold font-serif">Write Your Story</h1>
        <p className="text-muted-foreground">
          Unleash your creativity and share your stories with the world.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Writing Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Story Details</CardTitle>
              <CardDescription>
                Enter your story details below to get started.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Enter your story title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="genre">Genre</Label>
                <select
                  id="genre"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={genre}
                  onChange={handleGenreChange}
                >
                  <option value="Fantasy">Fantasy</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Romance">Romance</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Horror">Horror</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="story">Story</Label>
                <Textarea
                  id="story"
                  value={story}
                  onChange={handleStoryChange}
                  placeholder="Start writing your story here..."
                  className="min-h-[300px]"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Word Count: {wordCount}
                </span>
                <Button variant="outline" size="sm" onClick={handleSaveDraft}>
                  Save Draft
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleStartNewStory}>
                Start New Story
              </Button>
              <Button onClick={handlePublish}>
                {isPublished ? "Update Story" : "Publish Story"}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Writing Challenges */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Writing Challenges</CardTitle>
              <CardDescription>
                Participate in writing challenges to inspire your creativity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {challenges.map((challenge, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{challenge.title}</CardTitle>
                          <Badge variant="secondary">
                            {challenge.participants} Writers
                          </Badge>
                        </div>
                        <CardDescription>{challenge.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="grid gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Deadline:</span>
                          <span>{challenge.deadline}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Word Limit:</span>
                          <span>{challenge.wordLimit} words</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Prize:</span>
                          <span className="text-primary">{challenge.prize}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="w-full"
                          onClick={() => handleJoinChallenge(challenge)}
                        >
                          Join Challenge
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Selected Challenge Details */}
      {selectedChallenge && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Selected Challenge</CardTitle>
              <CardDescription>
                Details for the "{selectedChallenge.title}" challenge.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label>Description</Label>
                <p className="text-muted-foreground">
                  {selectedChallenge.description}
                </p>
              </div>
              <div className="grid gap-2">
                <Label>Deadline</Label>
                <p className="text-muted-foreground">
                  {selectedChallenge.deadline}
                </p>
              </div>
              <div className="grid gap-2">
                <Label>Word Limit</Label>
                <p className="text-muted-foreground">
                  {selectedChallenge.wordLimit}
                </p>
              </div>
              <div className="grid gap-2">
                <Label>Prize</Label>
                <p className="text-muted-foreground">{selectedChallenge.prize}</p>
              </div>
              <div className="grid gap-2">
                <Label>Participants</Label>
                <p className="text-muted-foreground">
                  {selectedChallenge.participants}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default Write;
