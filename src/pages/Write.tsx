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

// Import missing components
import { Award, Check, Star, Globe2, Award as LucideAward } from "lucide-react";

// Add type for the selectedChallenge
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
    setIsPublished(true);
    alert("Your story has been published!");
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
                  className="min-h-[200px]"
                />
              </div>
              <div className="text-right">
                <span className="text-sm text-muted-foreground">
                  Word Count: {wordCount}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto rounded-full" onClick={handlePublish}>
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
              <Table>
                <TableCaption>
                  A list of available writing challenges to inspire your
                  creativity.
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Challenge</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Prize</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {challenges.map((challenge, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <Button
                          variant="link"
                          onClick={() => setSelectedChallenge(challenge)}
                        >
                          {challenge.title}
                        </Button>
                      </TableCell>
                      <TableCell>{challenge.deadline}</TableCell>
                      <TableCell>{challenge.prize}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
