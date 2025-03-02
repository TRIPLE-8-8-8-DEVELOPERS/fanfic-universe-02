
import { useState, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AIWritingAssistant from "../components/AIWritingAssistant";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { BookOpenText, Save, Share2, EyeOff, BookMarked, MagicWand, MessageSquare, Tag, Pencil, ArrowRight, Image, Copy, Check, Trash2, Globe, BookOpen, UploadCloud, Clock, Settings } from "lucide-react";

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [viewMode, setViewMode] = useState("edit");
  const [savedDrafts, setSavedDrafts] = useState([
    { id: 1, title: "The Last Guardian", excerpt: "In a world where magic is fading...", date: "2 days ago" },
    { id: 2, title: "Beyond the Stars", excerpt: "Captain Elara never expected to find...", date: "1 week ago" },
  ]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);

  const wordCounter = (text: string) => {
    const words = text.trim().split(/\s+/);
    return text.trim() === "" ? 0 : words.length;
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setWordCount(wordCounter(e.target.value));
  };

  const handleAddTag = () => {
    if (currentTag.trim() !== "" && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
      if (tagInputRef.current) {
        tagInputRef.current.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const saveAsDraft = () => {
    toast.success("Story saved as draft");
  };

  const publishStory = () => {
    if (!title.trim()) {
      toast.error("Please add a title to your story");
      return;
    }
    
    if (!content.trim()) {
      toast.error("Please add content to your story");
      return;
    }
    
    if (!category) {
      toast.error("Please select a category");
      return;
    }
    
    toast.success("Story published successfully!");
  };

  const toggleAIAssistant = () => {
    setAiAssistantOpen(!aiAssistantOpen);
  };

  const generateSuggestion = (type: string) => {
    let suggestion = "";
    
    switch(type) {
      case "title":
        suggestion = "The Chronicles of the Forgotten Realm";
        break;
      case "opening":
        suggestion = "The clock struck midnight as Emma stood at the edge of the forbidden forest, her heart pounding against her ribs. She knew what awaited her beyond those twisted trees, yet she had no choice but to proceed.";
        break;
      case "description":
        suggestion = "A young woman discovers an ancient artifact that grants her the ability to see glimpses of possible futures. As she navigates through a world of political intrigue and hidden magic, she must decide whether to use her newfound power for personal gain or to prevent an impending catastrophe.";
        break;
      default:
        suggestion = "";
    }
    
    if (type === "title") {
      setTitle(suggestion);
    } else {
      setContent(content + "\n\n" + suggestion);
      setWordCount(wordCounter(content + "\n\n" + suggestion));
    }
    
    toast.success(`Generated ${type} suggestion!`);
  };

  const fandoms = [
    "Fantasy", "Sci-Fi", "Mystery", "Romance", 
    "Adventure", "Horror", "Historical", "Thriller",
    "Anime", "Comics", "Movies", "TV Shows", 
    "Books", "Games", "Original Works"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 p-4 md:p-6 max-w-full">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="editor" className="w-full">
            <TabsList className="mb-6 w-full sm:w-auto grid grid-cols-3 sm:flex sm:flex-row">
              <TabsTrigger value="editor" className="flex items-center gap-2">
                <Pencil className="h-4 w-4" />
                <span className="hidden sm:inline">Editor</span>
              </TabsTrigger>
              <TabsTrigger value="drafts" className="flex items-center gap-2">
                <BookMarked className="h-4 w-4" />
                <span className="hidden sm:inline">My Drafts</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="space-y-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-2/3 space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-serif font-bold">Create Your Story</h2>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => saveAsDraft()}>
                            <Save className="h-4 w-4 mr-2" />
                            Save Draft
                          </Button>
                          <Button size="sm" onClick={() => publishStory()}>
                            <Globe className="h-4 w-4 mr-2" />
                            Publish
                          </Button>
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="flex justify-between mb-2">
                          <Label htmlFor="title">Story Title</Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" onClick={() => generateSuggestion("title")}>
                                  <MagicWand className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Generate title suggestion</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <Input
                          id="title"
                          placeholder="Enter your story title..."
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="mb-4"
                        />

                        <div className="flex items-center justify-between mb-2">
                          <div className="flex gap-4">
                            <Button 
                              variant={viewMode === "edit" ? "default" : "outline"} 
                              size="sm" 
                              onClick={() => setViewMode("edit")}
                              className="mr-2"
                            >
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button 
                              variant={viewMode === "preview" ? "default" : "outline"} 
                              size="sm" 
                              onClick={() => setViewMode("preview")}
                            >
                              <BookOpen className="h-4 w-4 mr-2" />
                              Preview
                            </Button>
                          </div>
                          <div className="flex gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="sm" onClick={() => generateSuggestion("opening")}>
                                    <MagicWand className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Generate opening paragraph</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="sm" onClick={toggleAIAssistant}>
                                    <BookOpenText className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>AI Writing Assistant</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>

                        {viewMode === "edit" ? (
                          <Textarea
                            ref={editorRef}
                            placeholder="Begin your masterpiece here..."
                            value={content}
                            onChange={handleContentChange}
                            className="min-h-[300px] font-sans"
                          />
                        ) : (
                          <div className="min-h-[300px] p-4 border rounded-md bg-card overflow-y-auto prose dark:prose-invert max-w-none">
                            {content ? (
                              <div>
                                {content.split('\n').map((paragraph, index) => (
                                  <p key={index}>{paragraph}</p>
                                ))}
                              </div>
                            ) : (
                              <p className="text-muted-foreground italic">Preview will appear here...</p>
                            )}
                          </div>
                        )}

                        <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                          <div>
                            <span>{wordCount} {wordCount === 1 ? 'word' : 'words'}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Auto-saved 2 minutes ago</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium mb-4">Chapter Management</h3>
                      <div className="space-y-2">
                        <div className="bg-secondary/50 p-3 rounded-md flex justify-between items-center">
                          <div>
                            <span className="font-medium">Chapter 1: The Beginning</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Add New Chapter
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:w-1/3 space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium mb-4">Story Details</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {fandoms.map(fandom => (
                                <SelectItem key={fandom} value={fandom}>{fandom}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="tags">Tags</Label>
                          <div className="flex gap-2 mb-2">
                            <Input
                              ref={tagInputRef}
                              id="tags"
                              placeholder="Add tags..."
                              value={currentTag}
                              onChange={(e) => setCurrentTag(e.target.value)}
                              onKeyDown={handleKeyDown}
                            />
                            <Button variant="outline" size="sm" onClick={handleAddTag}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mt-2">
                            {tags.map(tag => (
                              <div key={tag} className="bg-secondary rounded-full px-3 py-1 text-sm flex items-center">
                                <span>{tag}</span>
                                <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-2" onClick={() => removeTag(tag)}>
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                            {tags.length === 0 && (
                              <p className="text-xs text-muted-foreground">No tags yet. Tags help readers find your story.</p>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="description">Short Description</Label>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-muted-foreground">Max 250 characters</span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="sm" onClick={() => generateSuggestion("description")}>
                                    <MagicWand className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Generate description</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <Textarea
                            id="description"
                            placeholder="Brief description of your story..."
                            className="h-24"
                          />
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="private-mode"
                            checked={isPrivate}
                            onCheckedChange={setIsPrivate}
                          />
                          <Label htmlFor="private-mode" className="flex items-center cursor-pointer">
                            <EyeOff className="h-4 w-4 mr-2" />
                            Private Story
                          </Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium mb-4">Cover Image</h3>
                      <div className="border-2 border-dashed rounded-md p-8 text-center">
                        <UploadCloud className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">Drag & drop a cover image or</p>
                        <Button variant="outline" size="sm">
                          <Image className="h-4 w-4 mr-2" />
                          Choose Image
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Recommended size: 1200 x 800 pixels</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium mb-4">Publishing Options</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Switch id="comments" defaultChecked />
                          <Label htmlFor="comments" className="flex items-center cursor-pointer">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Allow Comments
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch id="mature-content" />
                          <Label htmlFor="mature-content">Mature Content</Label>
                        </div>
                        
                        <div>
                          <Label htmlFor="visibility">Visibility</Label>
                          <Select defaultValue="public">
                            <SelectTrigger>
                              <SelectValue placeholder="Select visibility" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">Public - Anyone can view</SelectItem>
                              <SelectItem value="unlisted">Unlisted - Only accessible via link</SelectItem>
                              <SelectItem value="private">Private - Only you can view</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Dialog open={aiAssistantOpen} onOpenChange={setAiAssistantOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>AI Writing Assistant</DialogTitle>
                    <DialogDescription>
                      Get help with writing, ideas, and structure from our AI assistant.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <AIWritingAssistant />
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setAiAssistantOpen(false)}>Close</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TabsContent>

            <TabsContent value="drafts">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-serif font-bold mb-6">My Drafts</h2>
                  <div className="space-y-4">
                    {savedDrafts.map(draft => (
                      <div key={draft.id} className="border rounded-lg p-4 hover:border-primary transition-colors">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{draft.title}</h3>
                          <span className="text-xs text-muted-foreground">{draft.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{draft.excerpt}</p>
                        <div className="flex justify-end mt-3">
                          <Button variant="ghost" size="sm">
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    {savedDrafts.length === 0 && (
                      <div className="text-center py-12">
                        <BookMarked className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="font-medium text-lg mb-2">No drafts yet</h3>
                        <p className="text-muted-foreground mb-4">Start writing and your drafts will appear here</p>
                        <Button>
                          <Pencil className="h-4 w-4 mr-2" />
                          Create New Story
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-serif font-bold mb-6">Editor Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Interface Preferences</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="font-size">Font Size</Label>
                          <Select defaultValue="medium">
                            <SelectTrigger id="font-size">
                              <SelectValue placeholder="Select font size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="small">Small</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="large">Large</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="font-family">Font Family</Label>
                          <Select defaultValue="sans">
                            <SelectTrigger id="font-family">
                              <SelectValue placeholder="Select font family" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sans">Sans-serif</SelectItem>
                              <SelectItem value="serif">Serif</SelectItem>
                              <SelectItem value="mono">Monospace</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">Autosave</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch id="autosave" defaultChecked />
                          <Label htmlFor="autosave">Enable autosave</Label>
                        </div>
                        <Select defaultValue="2">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Autosave interval" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Every minute</SelectItem>
                            <SelectItem value="2">Every 2 minutes</SelectItem>
                            <SelectItem value="5">Every 5 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-medium mb-4">AI Assistant Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Switch id="ai-suggestions" defaultChecked />
                          <Label htmlFor="ai-suggestions">AI writing suggestions</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="grammar-check" defaultChecked />
                          <Label htmlFor="grammar-check">Grammar and spell checking</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="plagiarism" />
                          <Label htmlFor="plagiarism">Plagiarism detection</Label>
                        </div>
                      </div>
                    </div>

                    <Alert>
                      <AlertDescription>
                        Editor settings are saved per browser. If you use multiple devices, you'll need to set your preferences on each one.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Write;
