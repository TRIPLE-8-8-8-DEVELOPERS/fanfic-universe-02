import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sparkles, Brain, Wand, MessageSquare, RefreshCw, Zap, ArrowRight, 
  CheckCircle2, Lightbulb, Crown, Edit, BookOpen, Palette, 
  Sliders, Diff, PlayIcon, UserX, Star, Filter, History
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";

interface AiAssistantPanelProps {
  currentText: string;
  onSuggestionApply: (text: string) => void;
  isPremium: boolean;
  onUpgradeRequest: () => void;
}

const predefinedPrompts = [
  {
    title: "Continue Story",
    description: "Generate the next paragraph based on the current content",
    prompt: "Continue the story from where it left off",
    premium: false
  },
  {
    title: "Add Description",
    description: "Enhance scene or character description",
    prompt: "Add more vivid description to the current scene",
    premium: false
  },
  {
    title: "Create Dialogue",
    description: "Generate realistic conversation between characters",
    prompt: "Add dialogue between the characters in this scene",
    premium: false
  },
  {
    title: "Plot Twist",
    description: "Suggest an unexpected turn of events",
    prompt: "Introduce a surprising plot twist",
    premium: true
  },
  {
    title: "Improve Flow",
    description: "Enhance the writing flow and readability",
    prompt: "Revise this text to improve readability and flow",
    premium: true
  },
  {
    title: "Character Development",
    description: "Deepen a character's personality",
    prompt: "Add more depth and complexity to the main character",
    premium: true
  }
];

const advancedSettings = [
  { name: "creativity", label: "Creativity", min: 0, max: 100, default: 70 },
  { name: "detail", label: "Detail Level", min: 0, max: 100, default: 50 },
  { name: "tone", label: "Tone", options: ["Neutral", "Formal", "Casual", "Dramatic", "Humorous"] }
];

const AiAssistantPanel = ({ 
  currentText,
  onSuggestionApply,
  isPremium,
  onUpgradeRequest 
}: AiAssistantPanelProps) => {
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [selectedTone, setSelectedTone] = useState("Neutral");
  const [creativity, setCreativity] = useState(70);
  const [detailLevel, setDetailLevel] = useState(50);
  const [generationHistory, setGenerationHistory] = useState<{prompt: string, response: string}[]>([]);
  
  // Mock function to simulate AI generation
  const generateAISuggestion = (prompt: string) => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const result = currentText.length < 10 
        ? "The sun dipped below the horizon, painting the sky in shades of amber and violet. Sarah stood at the edge of the cliff, watching as the last light of day caressed the restless waves below. The letter in her hand felt heavy, its contents weighing on her heart more than she could bear."
        : "The mansion loomed ahead, its Victorian architecture a stark silhouette against the twilight sky. Windows like vacant eyes seemed to track Sarah's approach, and she couldn't shake the feeling that the house itself was somehow... aware. A chill that had nothing to do with the evening breeze crawled up her spine as she ascended the crumbling steps to the porch.";
      
      setAiSuggestion(result);
      setIsGenerating(false);
      setGenerationHistory(prev => [...prev, {prompt, response: result}]);
    }, 2000);
  };
  
  const handlePromptSelect = (prompt: string, isPremiumFeature: boolean) => {
    if (isPremiumFeature && !isPremium) {
      onUpgradeRequest();
      return;
    }
    
    setSelectedPrompt(prompt);
    generateAISuggestion(prompt);
  };
  
  const handleCustomPromptSubmit = () => {
    if (!customPrompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    
    generateAISuggestion(customPrompt);
  };
  
  const handleApplySuggestion = () => {
    onSuggestionApply(aiSuggestion);
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          AI Writing Assistant
          {!isPremium && (
            <Button 
              size="sm" 
              variant="outline"
              className="ml-auto gap-1 text-xs border-amber-300 text-amber-700"
              onClick={onUpgradeRequest}
            >
              <Crown className="h-3 w-3 text-amber-500" />
              Upgrade for Premium Features
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="prompts" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="prompts" className="flex items-center gap-1">
              <Lightbulb className="h-4 w-4" />
              Prompts
            </TabsTrigger>
            <TabsTrigger value="custom" className="flex items-center gap-1">
              <Edit className="h-4 w-4" />
              Custom
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-1" disabled={!isPremium}>
              <Sliders className="h-4 w-4" />
              Advanced
              {!isPremium && <Crown className="h-3 w-3 ml-1 text-amber-500" />}
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-1" disabled={!isPremium}>
              <History className="h-4 w-4" />
              History
              {!isPremium && <Crown className="h-3 w-3 ml-1 text-amber-500" />}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="prompts">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {predefinedPrompts.map((prompt, index) => (
                <div 
                  key={index}
                  className={`p-3 border rounded-lg cursor-pointer transition-all hover:bg-purple-50 dark:hover:bg-purple-950/20 group ${
                    selectedPrompt === prompt.prompt ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-950/20' : ''
                  } ${prompt.premium && !isPremium ? 'opacity-60' : ''}`}
                  onClick={() => handlePromptSelect(prompt.prompt, prompt.premium)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-sm">{prompt.title}</h4>
                    {prompt.premium && (
                      <Crown className="h-3 w-3 text-amber-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{prompt.description}</p>
                  
                  {prompt.premium && !isPremium && (
                    <div className="mt-2 text-xs text-amber-600 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300">
                      Premium feature
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="custom">
            <div className="space-y-4">
              <Textarea 
                placeholder="Describe what you'd like the AI to help you with..."
                className="min-h-[100px]"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
              />
              <Button 
                onClick={handleCustomPromptSubmit}
                disabled={!customPrompt.trim() || isGenerating}
                className="gap-2"
              >
                {isGenerating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Wand className="h-4 w-4" />}
                {isGenerating ? "Generating..." : "Generate Suggestion"}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="advanced">
            {isPremium ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Creativity ({creativity}%)</Label>
                  <Slider 
                    value={[creativity]} 
                    max={100} 
                    step={1} 
                    onValueChange={(values) => setCreativity(values[0])} 
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Conservative</span>
                    <span>Balanced</span>
                    <span>Creative</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Detail Level ({detailLevel}%)</Label>
                  <Slider 
                    value={[detailLevel]} 
                    max={100} 
                    step={1} 
                    onValueChange={(values) => setDetailLevel(values[0])} 
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Concise</span>
                    <span>Balanced</span>
                    <span>Detailed</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Tone</Label>
                  <RadioGroup value={selectedTone} onValueChange={setSelectedTone}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {["Neutral", "Formal", "Casual", "Dramatic", "Humorous"].map((tone) => (
                        <div key={tone} className="flex items-center space-x-2">
                          <RadioGroupItem value={tone} id={`tone-${tone.toLowerCase()}`} />
                          <Label htmlFor={`tone-${tone.toLowerCase()}`}>{tone}</Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
                
                <Button className="w-full gap-2">
                  <PlayIcon className="h-4 w-4" />
                  Generate with Advanced Settings
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Crown className="h-12 w-12 text-amber-500 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Premium Feature</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  Unlock advanced AI controls with a premium subscription to fine-tune your writing assistant.
                </p>
                <Button onClick={onUpgradeRequest} className="gap-2">
                  <Zap className="h-4 w-4" />
                  Upgrade to Premium
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="history">
            {isPremium ? (
              <div className="space-y-4">
                {generationHistory.length > 0 ? (
                  generationHistory.map((item, index) => (
                    <div key={index} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <Brain className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">{item.prompt}</p>
                          <p className="text-sm mt-1 line-clamp-2">{item.response}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => onSuggestionApply(item.response)}>
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <History className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No generation history yet</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Crown className="h-12 w-12 text-amber-500 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Premium Feature</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  Keep track of your AI generation history and reuse previous suggestions with a premium subscription.
                </p>
                <Button onClick={onUpgradeRequest} className="gap-2">
                  <Zap className="h-4 w-4" />
                  Upgrade to Premium
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 border rounded-lg p-3 bg-slate-50 dark:bg-slate-900">
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
                  onClick={() => generateAISuggestion(selectedPrompt || customPrompt)}
                  disabled={isGenerating}
                >
                  <RefreshCw className={`h-3 w-3 ${isGenerating ? 'animate-spin' : ''}`} />
                  Regenerate
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 gap-1 text-xs"
                  onClick={handleApplySuggestion}
                  disabled={isGenerating || !aiSuggestion}
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
      </CardContent>
      
      <CardFooter className="flex justify-between pt-0">
        <div className="text-xs text-muted-foreground">
          <Zap className="h-3 w-3 inline mr-1" />
          AI suggestions are meant as inspiration and may need editing
        </div>
        <Button 
          onClick={handleApplySuggestion}
          disabled={!aiSuggestion || isGenerating}
          className="gap-1"
        >
          <ArrowRight className="h-4 w-4" />
          Apply to Story
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AiAssistantPanel;
