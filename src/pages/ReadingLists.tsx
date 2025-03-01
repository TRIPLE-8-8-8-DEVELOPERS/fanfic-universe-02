
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  BookMarked, 
  ChevronRight, 
  Clock, 
  Edit2, 
  Folder, 
  FolderPlus, 
  Heart, 
  MoreHorizontal, 
  Plus, 
  Share2, 
  Star, 
  Trash2, 
  UserPlus 
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ReadingList {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  stories: number;
  isPublic: boolean;
  lastUpdated: string;
  likes: number;
  collaborators?: {
    id: string;
    name: string;
    avatar: string;
  }[];
}

interface CollaborativeList {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  stories: number;
  owner: {
    id: string;
    name: string;
    avatar: string;
  };
  collaborators: {
    id: string;
    name: string;
    avatar: string;
  }[];
  lastUpdated: string;
}

const ReadingLists = () => {
  const [activeTab, setActiveTab] = useState("my-lists");
  const [newListOpen, setNewListOpen] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const [newListDescription, setNewListDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const { toast } = useToast();

  const myLists: ReadingList[] = [
    {
      id: "1",
      title: "Fantasy Essentials",
      description: "My collection of must-read fantasy novels and series",
      coverImage: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      stories: 12,
      isPublic: true,
      lastUpdated: "2023-09-15",
      likes: 34
    },
    {
      id: "2",
      title: "Mystery Thrillers",
      description: "Suspenseful stories that keep you guessing",
      coverImage: "https://images.unsplash.com/photo-1588514727390-91fd5ebaef81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG15c3Rlcnl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      stories: 8,
      isPublic: true,
      lastUpdated: "2023-10-02",
      likes: 17
    },
    {
      id: "3",
      title: "Stories to Read Later",
      description: "Saved for rainy days",
      coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      stories: 23,
      isPublic: false,
      lastUpdated: "2023-10-12",
      likes: 0
    },
    {
      id: "4",
      title: "Historical Fiction Favorites",
      description: "Stories set in fascinating historical periods",
      coverImage: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGlzdG9yeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      stories: 6,
      isPublic: true,
      lastUpdated: "2023-08-28",
      likes: 9,
      collaborators: [
        {
          id: "user1",
          name: "Alex Johnson",
          avatar: "https://i.pravatar.cc/150?img=33"
        },
        {
          id: "user2",
          name: "Maria Garcia",
          avatar: "https://i.pravatar.cc/150?img=25"
        }
      ]
    }
  ];

  const sharedLists: CollaborativeList[] = [
    {
      id: "5",
      title: "Science Fiction Masterpieces",
      description: "Collaborative curation of the best sci-fi stories",
      coverImage: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNwYWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      stories: 15,
      owner: {
        id: "user3",
        name: "Thomas Reed",
        avatar: "https://i.pravatar.cc/150?img=68"
      },
      collaborators: [
        {
          id: "currentUser",
          name: "You",
          avatar: "https://i.pravatar.cc/150?img=37"
        },
        {
          id: "user4",
          name: "Emily Chen",
          avatar: "https://i.pravatar.cc/150?img=47"
        }
      ],
      lastUpdated: "2023-10-05"
    },
    {
      id: "6",
      title: "Book Club Selections",
      description: "Stories we're reading for our monthly book club",
      coverImage: "https://images.unsplash.com/photo-1517770413964-df8ca61194a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Ym9vayUyMGNsdWJ8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
      stories: 7,
      owner: {
        id: "user5",
        name: "James Wilson",
        avatar: "https://i.pravatar.cc/150?img=52"
      },
      collaborators: [
        {
          id: "currentUser",
          name: "You",
          avatar: "https://i.pravatar.cc/150?img=37"
        },
        {
          id: "user6",
          name: "Sophia Kim",
          avatar: "https://i.pravatar.cc/150?img=44"
        },
        {
          id: "user7",
          name: "Daniel Martinez",
          avatar: "https://i.pravatar.cc/150?img=12"
        }
      ],
      lastUpdated: "2023-10-10"
    }
  ];

  const featuredLists = [
    {
      id: "7",
      title: "Editor's Choice: Fantasy",
      description: "Top fantasy stories selected by our editors",
      coverImage: "https://images.unsplash.com/photo-1578353022142-09264585d2fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8ZmFudGFzeXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      stories: 10,
      curator: {
        id: "editor1",
        name: "Elena Wright",
        avatar: "https://i.pravatar.cc/150?img=23"
      },
      likes: 128
    },
    {
      id: "8",
      title: "Rising Stars",
      description: "Compelling works from emerging authors",
      coverImage: "https://images.unsplash.com/photo-1492446190781-58ac4285911d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3RhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      stories: 12,
      curator: {
        id: "editor2",
        name: "Marcus Johnson",
        avatar: "https://i.pravatar.cc/150?img=41"
      },
      likes: 87
    },
    {
      id: "9",
      title: "Extraordinary Worlds",
      description: "Stories with exceptional worldbuilding",
      coverImage: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZmFudGFzeSUyMGxhbmRzY2FwZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      stories: 15,
      curator: {
        id: "editor3",
        name: "Nora Chen",
        avatar: "https://i.pravatar.cc/150?img=26"
      },
      likes: 211
    }
  ];

  const handleCreateList = () => {
    if (!newListTitle.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a title for your reading list.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Reading List Created",
      description: `"${newListTitle}" has been created successfully.`,
    });
    
    setNewListOpen(false);
    setNewListTitle("");
    setNewListDescription("");
    setIsPublic(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold font-serif bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Reading Lists
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Organize your favorite stories into curated collections. Create personalized reading lists or collaborate with friends.
            </p>
          </motion.div>
          
          <div className="flex justify-between items-center mb-6">
            <Tabs defaultValue="my-lists" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="my-lists" className="text-sm">My Lists</TabsTrigger>
                <TabsTrigger value="shared" className="text-sm">Shared With Me</TabsTrigger>
                <TabsTrigger value="featured" className="text-sm">Featured</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Dialog open={newListOpen} onOpenChange={setNewListOpen}>
              <DialogTrigger asChild>
                <Button variant="default" className="bg-blue-600 hover:bg-blue-700 rounded-full">
                  <FolderPlus className="mr-2 h-4 w-4" />
                  New List
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-background text-foreground">
                <DialogHeader>
                  <DialogTitle>Create a new reading list</DialogTitle>
                  <DialogDescription>
                    Organize stories you love into curated collections.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="list-title">List Title</Label>
                    <Input
                      id="list-title"
                      value={newListTitle}
                      onChange={(e) => setNewListTitle(e.target.value)}
                      placeholder="e.g. My Fantasy Favorites"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="list-description">Description (optional)</Label>
                    <Input
                      id="list-description"
                      value={newListDescription}
                      onChange={(e) => setNewListDescription(e.target.value)}
                      placeholder="A brief description of your list"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="list-public"
                      checked={isPublic}
                      onChange={(e) => setIsPublic(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <Label htmlFor="list-public">Make this list public</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setNewListOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreateList}>Create List</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="mt-6">
            {activeTab === "my-lists" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myLists.map((list) => (
                  <motion.div
                    key={list.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link to={`/reading-list/${list.id}`} className="block h-full">
                      <Card className="overflow-hidden h-full hover:shadow-md transition-shadow border-blue-100 bg-card text-card-foreground">
                        <div className="relative h-40">
                          <img 
                            src={list.coverImage} 
                            alt={list.title} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                            <div className="p-4 text-white">
                              <h3 className="font-bold text-lg">{list.title}</h3>
                              <p className="text-sm text-white/80 line-clamp-1">{list.description}</p>
                            </div>
                          </div>
                          {!list.isPublic && (
                            <div className="absolute top-2 right-2">
                              <Badge variant="outline" className="bg-black/50 text-white border-transparent backdrop-blur-sm">
                                Private
                              </Badge>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <BookMarked className="h-4 w-4 mr-1 text-blue-500" />
                              {list.stories} stories
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-blue-500" />
                              Updated {list.lastUpdated}
                            </span>
                          </div>
                          
                          {list.collaborators && (
                            <div className="mt-3">
                              <p className="text-xs text-muted-foreground mb-1">Collaborators:</p>
                              <div className="flex -space-x-2">
                                {list.collaborators.map((collaborator) => (
                                  <Avatar key={collaborator.id} className="h-6 w-6 border-2 border-white">
                                    <AvatarImage src={collaborator.avatar} />
                                    <AvatarFallback>{collaborator.name.substring(0, 2)}</AvatarFallback>
                                  </Avatar>
                                ))}
                                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs border-2 border-white">
                                  <Plus size={12} />
                                </div>
                              </div>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                              <Heart className="h-4 w-4" />
                            </Button>
                            {list.likes > 0 && <span className="text-sm text-muted-foreground">{list.likes}</span>}
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px] dropdown-menu">
                              <DropdownMenuItem className="dropdown-item">
                                <Edit2 className="mr-2 h-4 w-4" />
                                <span>Edit List</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="dropdown-item">
                                <Share2 className="mr-2 h-4 w-4" />
                                <span>Share List</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="dropdown-item">
                                <UserPlus className="mr-2 h-4 w-4" />
                                <span>Add Collaborators</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600 dropdown-item">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete List</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </CardFooter>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
                
                {/* Add List Card */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Card 
                    className="h-full border-dashed border-2 border-blue-200 bg-blue-50/50 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center text-center cursor-pointer text-foreground"
                    onClick={() => setNewListOpen(true)}
                  >
                    <CardContent className="p-6 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                        <FolderPlus className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="font-medium text-lg text-blue-700 mb-2">Create a New List</h3>
                      <p className="text-sm text-muted-foreground">
                        Organize your favorite stories into custom collections
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            )}
            
            {activeTab === "shared" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sharedLists.map((list) => (
                  <motion.div
                    key={list.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link to={`/reading-list/${list.id}`} className="block h-full">
                      <Card className="overflow-hidden h-full hover:shadow-md transition-shadow border-blue-100 bg-card text-card-foreground">
                        <div className="relative h-40">
                          <img 
                            src={list.coverImage} 
                            alt={list.title} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                            <div className="p-4 text-white">
                              <h3 className="font-bold text-lg">{list.title}</h3>
                              <p className="text-sm text-white/80 line-clamp-1">{list.description}</p>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={list.owner.avatar} />
                              <AvatarFallback>{list.owner.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-foreground">
                              Created by <span className="font-medium">{list.owner.name}</span>
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <BookMarked className="h-4 w-4 mr-1 text-blue-500" />
                              {list.stories} stories
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-blue-500" />
                              Updated {list.lastUpdated}
                            </span>
                          </div>
                          
                          <div className="mt-3">
                            <p className="text-xs text-muted-foreground mb-1">Collaborators:</p>
                            <div className="flex -space-x-2">
                              {list.collaborators.map((collaborator) => (
                                <Avatar key={collaborator.id} className="h-6 w-6 border-2 border-white">
                                  <AvatarImage src={collaborator.avatar} />
                                  <AvatarFallback>{collaborator.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-end">
                          <Button variant="outline" size="sm" className="rounded-full">
                            <ChevronRight className="h-4 w-4" />
                            <span>View List</span>
                          </Button>
                        </CardFooter>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
                
                {sharedLists.length === 0 && (
                  <div className="text-center py-12 col-span-full">
                    <div className="mb-4 bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                      <Folder className="h-8 w-8 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-medium mb-2 text-foreground">No shared lists yet</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mb-6">
                      When someone shares a reading list with you, it will appear here.
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === "featured" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredLists.map((list) => (
                  <motion.div
                    key={list.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link to={`/reading-list/${list.id}`} className="block h-full">
                      <Card className="overflow-hidden h-full hover:shadow-md transition-shadow border-blue-100 bg-card text-card-foreground">
                        <div className="relative h-40">
                          <img 
                            src={list.coverImage} 
                            alt={list.title} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                            <div className="p-4 text-white">
                              <Badge variant="outline" className="bg-blue-500/80 text-white border-transparent backdrop-blur-sm mb-2">
                                Featured List
                              </Badge>
                              <h3 className="font-bold text-lg">{list.title}</h3>
                              <p className="text-sm text-white/80 line-clamp-1">{list.description}</p>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={list.curator.avatar} />
                              <AvatarFallback>{list.curator.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-foreground">
                              Curated by <span className="font-medium">{list.curator.name}</span>
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <BookMarked className="h-4 w-4 mr-1 text-blue-500" />
                              {list.stories} stories
                            </span>
                            <span className="flex items-center">
                              <Heart className="h-4 w-4 mr-1 text-red-500" />
                              {list.likes} likes
                            </span>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between">
                          <Button variant="ghost" size="sm" className="text-blue-600">
                            <Star className="h-4 w-4 mr-1.5" />
                            Save to My Lists
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReadingLists;
