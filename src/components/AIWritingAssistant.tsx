
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { 
  Sparkles, Brain, Wand, MessageSquare, ThumbsUp, RefreshCw, Zap, 
  ArrowRight, CheckCircle2, Lightbulb, Crown, Rocket, Star
} from "lucide-react";

export interface AIWritingAssistantProps {
  currentText: string;
  onSuggestionApply: (text: string) => void;
  isPremium?: boolean;
  onUpgradeRequest?: () => void;
}

export const AIWritingAssistant = ({ 
  currentText = "", 
  onSuggestionApply, 
  isPremium = false,
  onUpgradeRequest = () => {} 
}: AIWritingAssistantProps) => {
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const { toast } = useToast();
  
  // Predefined writing prompts
  const writingPrompts = [
    {
      title: "Continue Story",
      description: "Generate the next paragraph based on the current content",
      prompt: "Continue the story from where it left off"
    },
    {
      title: "Add Description", 
      description: "Enhance scene or character description",
      prompt: "Add more vivid description to the current scene"
    },
    {
      title: "Create Dialogue",
      description: "Generate realistic conversation between characters",
      prompt: "Add dialogue between the characters in this scene"
    },
    {
      title: "Plot Twist",
      description: "Suggest an unexpected turn of events",
      prompt: "Introduce a surprising plot twist"
    },
    {
      title: "Improve Flow",
      description: "Enhance the writing flow and readability",
      prompt: "Revise this text to improve readability and flow"
    }
  ];
  
  // Mock function to simulate AI generation
  const generateAISuggestion = (prompt: string, context: string) => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let result = "";
      
      if (prompt.includes("Continue")) {
        result = context + "\n\nThe moonlight cast long shadows across the abandoned courtyard. Sarah hesitated, her hand trembling slightly as she reached for the rusted door handle. A cold breeze whispered through the ancient trees, carrying whispers of secrets long forgotten. She knew that once she stepped through this threshold, nothing would ever be the same.";
      } else if (prompt.includes("Description")) {
        result = "The ancient manor loomed against the twilight sky, its weathered stone façade telling stories of centuries past. Ivy crawled up its walls like gnarled fingers, while cracked windows reflected the dying light in fractured patterns. The air around it felt heavy, thick with the weight of unspoken histories and lingering regrets.";
      } else if (prompt.includes("Dialogue")) {
        result = "\"You can't be serious about going in there,\" Alex whispered, his voice barely audible over the howling wind.\n\n\"I don't have a choice,\" Sarah replied, her eyes never leaving the imposing doorway. \"The answers I need are inside.\"\n\n\"Some answers aren't worth the price you'll pay to find them,\" he warned, placing a gentle hand on her shoulder. \"Some doors aren't meant to be opened.\"";
      } else if (prompt.includes("Plot Twist")) {
        result = "As she pushed the door open, the interior wasn't the abandoned ruin she expected. Instead, bright modern lights illuminated a high-tech facility, with screens displaying her name, photo, and the words 'Subject has arrived.' Everything she believed about her past had been an elaborate setup, leading her to this very moment.";
      } else {
        result = "The night air grew cold as shadows stretched across the ancient grounds. Sarah approached the manor with cautious determination, each step bringing her closer to answers she'd sought for years. The building's façade, weathered by time and neglect, seemed to watch her with hollow eyes. She knew the risks, but some truths were worth the danger.";
      }
      
      setAiSuggestion(result);
      setIsGenerating(false);
    }, 2000);
  };
  
  const handlePromptSelect = (prompt: string) => {
    setSelectedPrompt(prompt);
    generateAISuggestion(prompt, currentText);
  };
  
  const handleApplySuggestion = () => {
    onSuggestionApply(aiSuggestion);
    toast({
      title: "AI suggestion applied",
      description: "The generated content has been added to your story.",
    });
  };
  
  return (
    <div className="relative">
      <div className="gradient-border card-3d">
        <Card className="border-0 overflow-hidden shadow-lg">
          <CardHeader className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-white" />
                <CardTitle className="text-xl font-bold">AI Writing Assistant</CardTitle>
              </div>
              <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                <Star className="h-3 w-3 mr-1 text-amber-300" />
                BETA
              </Badge>
            </div>
            <CardDescription className="text-purple-100 mt-2">
              Get instant writing suggestions powered by artificial intelligence
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-3">
            <Tabs defaultValue="prompts" className="mt-4">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="prompts" className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Quick Suggestions
                </TabsTrigger>
                <TabsTrigger value="custom" className="flex items-center gap-2">
                  <Wand className="h-4 w-4" />
                  Custom Prompt
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="prompts" className="py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {writingPrompts.slice(0, 4).map((prompt, index) => (
                    <div 
                      key={index}
                      className={`p-3 border rounded-lg cursor-pointer transition-all hover:bg-purple-50 dark:hover:bg-purple-900/20 hover-lift ${selectedPrompt === prompt.prompt ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20' : ''}`}
                      onClick={() => handlePromptSelect(prompt.prompt)}
                    >
                      <h4 className="font-medium text-sm">{prompt.title}</h4>
                      <p className="text-xs text-muted-foreground">{prompt.description}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="custom" className="py-4">
                <div className="space-y-4">
                  <Textarea 
                    placeholder="Describe what you'd like the AI to help you with..."
                    className="min-h-[100px]"
                    onChange={(e) => setSelectedPrompt(e.target.value)}
                  />
                  <Button 
                    onClick={() => generateAISuggestion(selectedPrompt, currentText)}
                    disabled={!selectedPrompt || isGenerating}
                    className="gap-2 w-full"
                  >
                    {isGenerating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Rocket className="h-4 w-4" />}
                    {isGenerating ? "Generating..." : "Generate Suggestion"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full mt-4 gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                  <Sparkles className="h-4 w-4" />
                  Open Full AI Assistant
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    AI Writing Assistant
                  </DialogTitle>
                  <DialogDescription>
                    Use AI to help you write, edit, or enhance your story.
                  </DialogDescription>
                </DialogHeader>
                
                <Tabs defaultValue="prompts" className="mt-4">
                  <TabsList className="grid grid-cols-2">
                    <TabsTrigger value="prompts" className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      Writing Prompts
                    </TabsTrigger>
                    <TabsTrigger value="custom" className="flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      Custom Prompt
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="prompts" className="py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                      {writingPrompts.map((prompt, index) => (
                        <div 
                          key={index}
                          className={`p-3 border rounded-lg cursor-pointer transition-all hover:bg-purple-50 ${selectedPrompt === prompt.prompt ? 'ring-2 ring-purple-500 bg-purple-50' : ''}`}
                          onClick={() => handlePromptSelect(prompt.prompt)}
                        >
                          <h4 className="font-medium text-sm">{prompt.title}</h4>
                          <p className="text-xs text-muted-foreground">{prompt.description}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="custom" className="py-4">
                    <div className="space-y-4">
                      <Textarea 
                        placeholder="Describe what you'd like the AI to help you with..."
                        className="min-h-[100px]"
                        onChange={(e) => setSelectedPrompt(e.target.value)}
                      />
                      <Button 
                        onClick={() => generateAISuggestion(selectedPrompt, currentText)}
                        disabled={!selectedPrompt || isGenerating}
                        className="gap-2"
                      >
                        {isGenerating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Wand className="h-4 w-4" />}
                        {isGenerating ? "Generating..." : "Generate Suggestion"}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-4 border rounded-lg p-3 bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-slate-700 dark:text-slate-200 flex items-center gap-1">
                      <MessageSquare className="h-4 w-4 text-purple-500" />
                      AI Suggestion
                    </h4>
                    {aiSuggestion && (
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 gap-1 text-xs"
                          onClick={() => generateAISuggestion(selectedPrompt, currentText)}
                        >
                          <RefreshCw className="h-3 w-3" />
                          Regenerate
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 gap-1 text-xs"
                          onClick={handleApplySuggestion}
                        >
                          <CheckCircle2 className="h-3 w-3" />
                          Apply
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="min-h-[150px] max-h-[300px] overflow-y-auto rounded border bg-white dark:bg-slate-800 p-3 text-sm">
                    {isGenerating ? (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                        Generating suggestion...
                      </div>
                    ) : aiSuggestion ? (
                      <div>{aiSuggestion}</div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        Select a prompt to generate a suggestion
                      </div>
                    )}
                  </div>
                </div>
                
                <DialogFooter className="gap-2">
                  <div className="text-xs text-muted-foreground">
                    <Zap className="h-3 w-3 inline mr-1" />
                    AI suggestions are meant as inspiration and may need editing.
                  </div>
                  <div className="flex gap-2">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button 
                      onClick={handleApplySuggestion}
                      disabled={!aiSuggestion || isGenerating}
                      className="gap-1"
                    >
                      <ArrowRight className="h-4 w-4" />
                      Apply to Story
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            {!isPremium && (
              <div className="mt-4 p-3 border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900/50 rounded-lg">
                <div className="flex items-start">
                  <Crown className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-amber-800 dark:text-amber-400">Upgrade to Premium</h4>
                    <p className="text-xs text-amber-700 dark:text-amber-500 mt-1">
                      Get advanced AI capabilities, unlimited generations, and more premium features.
                    </p>
                    <Button 
                      size="sm" 
                      className="mt-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                      onClick={onUpgradeRequest}
                    >
                      Upgrade Now
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Floating animated sparkles */}
      <div className="absolute -top-2 -right-2 z-10 animate-float">
        <div className="relative h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-white" />
          <div className="absolute inset-0 rounded-full bg-purple-500 opacity-30 animate-pulse" style={{ animationDuration: '2s' }}></div>
        </div>
      </div>
      <div className="absolute -bottom-3 -left-3 z-10 animate-float" style={{ animationDelay: '1s' }}>
        <div className="relative h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center">
          <Lightbulb className="h-3 w-3 text-white" />
          <div className="absolute inset-0 rounded-full bg-indigo-500 opacity-30 animate-pulse" style={{ animationDuration: '3s' }}></div>
        </div>
      </div>
    </div>
  );
};

// Adding Card components since they're used in this file
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default AIWritingAssistant;
