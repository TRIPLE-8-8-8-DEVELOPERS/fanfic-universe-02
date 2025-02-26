
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  PenTool,
  BookOpen,
  FileText,
  Settings,
  CloudUpload,
  BarChart,
  Eye,
  ArrowRight,
  Plus,
  HelpCircle,
  Zap,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock drafts data
const drafts = [
  {
    id: "draft1",
    title: "The Crimson Crown",
    lastEdited: "2 hours ago",
    wordCount: 5362,
    chapters: 3,
    status: "In Progress",
    coverUrl: "https://images.unsplash.com/photo-1629392554711-1b60d72ff7e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1856&q=80",
  },
  {
    id: "draft2",
    title: "Stardust Memories",
    lastEdited: "Yesterday",
    wordCount: 12841,
    chapters: 7,
    status: "In Progress",
    coverUrl: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1778&q=80",
  },
  {
    id: "draft3",
    title: "Whispers of the Deep",
    lastEdited: "May 15, 2023",
    wordCount: 3124,
    chapters: 2,
    status: "Draft",
    coverUrl: "https://images.unsplash.com/photo-1551244072-5d12893278ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80",
  },
];

// Mock published stories data
const published = [
  {
    id: "pub1",
    title: "The Last Starfighter",
    lastEdited: "June 12, 2023",
    wordCount: 24590,
    chapters: 12,
    status: "Complete",
    reads: 5243,
    likes: 623,
    comments: 89,
    coverUrl: "https://images.unsplash.com/photo-1581822261290-991b38693d1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  },
  {
    id: "pub2",
    title: "Chronicles of the Fae Court",
    lastEdited: "February 3, 2023",
    wordCount: 19752,
    chapters: 9,
    status: "In Progress",
    reads: 3789,
    likes: 421,
    comments: 65,
    coverUrl: "https://images.unsplash.com/photo-1520034475321-cbe63696469a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
  },
];

const Write = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-24">
        <div className="container py-8">
          {/* Dashboard Header */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
              Writer's Dashboard
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Manage your stories, track your progress, and engage with your audience. Your creative journey starts here.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-5">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="bg-primary text-primary-foreground h-full">
                  <CardHeader className="pb-2">
                    <PenTool className="h-8 w-8 mb-2" />
                    <CardTitle>Start a New Story</CardTitle>
                    <CardDescription className="text-primary-foreground/80">
                      Begin your creative journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-primary-foreground/70">
                      Create a new story from scratch or use a template to get started quickly.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="secondary" 
                      className="w-full rounded-full"
                    >
                      Create New Story <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <Zap className="h-8 w-8 mb-2 text-yellow-500" />
                    <CardTitle>AI Writing Assistant</CardTitle>
                    <CardDescription>
                      Boost your creativity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Get help with plot ideas, character development, and overcoming writer's block.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full rounded-full">
                      Launch Assistant <Sparkles className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <HelpCircle className="h-8 w-8 mb-2 text-blue-500" />
                    <CardTitle>Writing Resources</CardTitle>
                    <CardDescription>
                      Improve your craft
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Access tutorials, guides, and community tips to enhance your writing skills.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full rounded-full">
                      Explore Resources <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Your Stories Tabs */}
          <div>
            <h2 className="text-xl font-bold mb-5">Your Stories</h2>
            <Tabs defaultValue="drafts">
              <TabsList className="rounded-full mb-6">
                <TabsTrigger value="drafts" className="rounded-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Drafts
                </TabsTrigger>
                <TabsTrigger value="published" className="rounded-full">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Published
                </TabsTrigger>
                <TabsTrigger value="stats" className="rounded-full">
                  <BarChart className="h-4 w-4 mr-2" />
                  Stats
                </TabsTrigger>
                <TabsTrigger value="settings" className="rounded-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="drafts" className="m-0 space-y-6">
                {drafts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {drafts.map((draft) => (
                      <StoryCard
                        key={draft.id}
                        story={draft}
                        type="draft"
                        isExpanded={expandedCard === draft.id}
                        toggleExpand={() =>
                          setExpandedCard(
                            expandedCard === draft.id ? null : draft.id
                          )
                        }
                      />
                    ))}
                    <div className="flex items-center justify-center rounded-xl h-full min-h-[300px] border-2 border-dashed border-muted">
                      <Button variant="outline" className="rounded-full">
                        <Plus className="mr-2 h-4 w-4" /> Create New Draft
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-12 text-center bg-muted rounded-xl">
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-background flex items-center justify-center">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">No drafts yet</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-6">
                      Start writing your first story or create a new draft to see it here.
                    </p>
                    <Button className="rounded-full px-8">
                      <Plus className="mr-2 h-4 w-4" /> Create New Story
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="published" className="m-0 space-y-6">
                {published.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {published.map((pub) => (
                      <StoryCard
                        key={pub.id}
                        story={pub}
                        type="published"
                        isExpanded={expandedCard === pub.id}
                        toggleExpand={() =>
                          setExpandedCard(
                            expandedCard === pub.id ? null : pub.id
                          )
                        }
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center bg-muted rounded-xl">
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-background flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">No published stories</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-6">
                      When you publish your stories, they'll appear here for your readers to enjoy.
                    </p>
                    <Button className="rounded-full px-8">Publish a Draft</Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="stats" className="m-0">
                <div className="p-12 text-center bg-muted rounded-xl">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-background flex items-center justify-center">
                    <BarChart className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Story Analytics</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    Track your story's performance, reader demographics, and engagement analytics.
                  </p>
                  <Button variant="outline" className="rounded-full px-8">
                    Coming Soon
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="m-0">
                <div className="p-12 text-center bg-muted rounded-xl">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-background flex items-center justify-center">
                    <Settings className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Writer Settings</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    Customize your writing environment, notification preferences, and publishing options.
                  </p>
                  <Button variant="outline" className="rounded-full px-8">
                    Manage Settings
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

interface StoryCardProps {
  story: any;
  type: "draft" | "published";
  isExpanded: boolean;
  toggleExpand: () => void;
}

const StoryCard = ({ story, type, isExpanded, toggleExpand }: StoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative overflow-hidden rounded-xl border bg-background shadow-sm"
    >
      {/* Story Cover Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={story.coverUrl}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-white font-bold text-lg mb-1">{story.title}</h3>
          <div className="text-white/70 text-sm flex items-center">
            <span>Last edited: {story.lastEdited}</span>
          </div>
        </div>
      </div>

      {/* Story Details */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-secondary">
            {story.status}
          </span>
          <span className="text-xs text-muted-foreground">
            {story.wordCount.toLocaleString()} words • {story.chapters} chapters
          </span>
        </div>

        {type === "published" && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="text-center p-2 bg-secondary rounded-md">
              <div className="font-medium">{story.reads.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Reads</div>
            </div>
            <div className="text-center p-2 bg-secondary rounded-md">
              <div className="font-medium">{story.likes.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Likes</div>
            </div>
            <div className="text-center p-2 bg-secondary rounded-md">
              <div className="font-medium">{story.comments.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Comments</div>
            </div>
          </div>
        )}

        <div className="flex flex-col space-y-2">
          <Button className="rounded-full px-4">
            <PenTool className="mr-2 h-4 w-4" /> Continue Writing
          </Button>
          {type === "draft" ? (
            <Button variant="outline" className="rounded-full px-4">
              <CloudUpload className="mr-2 h-4 w-4" /> Publish
            </Button>
          ) : (
            <Button variant="outline" className="rounded-full px-4">
              <Eye className="mr-2 h-4 w-4" /> View Story
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Write;
