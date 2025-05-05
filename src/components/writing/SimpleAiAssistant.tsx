
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MessageSquareText, RefreshCw, ArrowRight, Sparkles, 
  CheckCircle2, Lightbulb, Send
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface SimpleAiAssistantProps {
  currentText: string;
  onSuggestionApply: (text: string) => void;
}

const SimpleAiAssistant = ({ currentText, onSuggestionApply }: SimpleAiAssistantProps) => {
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const predefinedPrompts = [
    {
      id: 1,
      title: "Continue Story",
      prompt: "Continue the story from where it left off"
    },
    {
      id: 2,
      title: "Add Description",
      prompt: "Add more vivid description to the current scene"
    },
    {
      id: 3,
      title: "Create Dialogue",
      prompt: "Add dialogue between the characters in this scene"
    },
    {
      id: 4,
      title: "Suggest Plot Ideas",
      prompt: "Suggest some plot ideas for this story"
    }
  ];
  
  // Mock function to simulate AI generation
  const generateAISuggestion = (prompt: string) => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let result = "";
      
      // Generate different responses based on prompt
      if (prompt.includes("Continue")) {
        result = "The air grew still as Sarah approached the old manor. Each step seemed to echo in the silence, warning her to turn back. But she had come too far to retreat now. The answers she sought were waiting behind those weathered doors, even if they weren't the answers she wanted to hear.";
      } else if (prompt.includes("Description")) {
        result = "The ancient oak door stood before her, its surface marred by decades of rain and neglect. Iron hinges, now rusted to a deep crimson, clung desperately to the frame. Spider webs draped the corners like delicate lace curtains, catching the fading sunlight in their intricate patterns. The smell of damp wood and forgotten memories hung heavy in the air.";
      } else if (prompt.includes("Dialogue")) {
        result = "\"You don't have to go in there,\" Alex said, his voice barely above a whisper.\n\n\"Yes, I do,\" Sarah replied, her fingers tightening around the old brass key. \"My grandfather's letter was clear. Whatever happened to my mother, the truth is inside.\"\n\n\"Some truths are better left buried,\" he warned, placing a gentle hand on her shoulder.\n\n\"Not this one,\" she said, shrugging off his touch. \"I've lived with questions my entire life. I need answers, even if they hurt.\"";
      } else if (prompt.includes("Plot")) {
        result = "Consider these plot developments:\n\n1. Sarah discovers her grandfather's journal revealing he was investigating supernatural occurrences at the manor before his disappearance.\n\n2. The manor contains a hidden room that only appears during specific lunar phases, and tonight happens to be one of them.\n\n3. Alex isn't who he claims to be - he's been sent to prevent Sarah from discovering a family secret that connects to larger conspiracy.\n\n4. The manor itself seems to respond to Sarah's presence, as if it recognizes her bloodline.";
      } else {
        // Generic response for custom prompts
        result = "The story could develop in several interesting directions from here. Consider exploring the character's inner motivations more deeply, or introducing an unexpected element that challenges their assumptions. Perhaps an object from their past resurfaces with new significance, or a minor character returns with crucial information that changes everything.";
      }
      
      setAiSuggestion(result);
      setIsGenerating(false);
    }, 1500);
  };
  
  const handlePromptSelect = (prompt: string) => {
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
    if (!aiSuggestion) return;
    
    onSuggestionApply(aiSuggestion);
    toast.success("AI suggestion added to your story");
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-blue-500" />
          Free AI Writing Assistant
          <Badge variant="outline" className="ml-auto text-xs">Free</Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {predefinedPrompts.map((item) => (
            <Button
              key={item.id}
              variant="outline"
              size="sm"
              className="justify-start font-normal text-xs h-auto py-2"
              onClick={() => handlePromptSelect(item.prompt)}
            >
              <Lightbulb className="h-3 w-3 mr-2 text-blue-500" />
              {item.title}
            </Button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Textarea 
            placeholder="Ask AI for writing help..."
            className="min-h-[60px] text-sm"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
          />
          <Button 
            className="shrink-0" 
            size="sm"
            onClick={handleCustomPromptSubmit}
            disabled={isGenerating || !customPrompt.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="border rounded-md p-3 bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium flex items-center">
              <MessageSquareText className="h-3 w-3 mr-1 text-blue-500" />
              AI Suggestion
            </p>
            {aiSuggestion && (
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 px-2 text-xs"
                  onClick={() => generateAISuggestion(customPrompt)}
                  disabled={isGenerating}
                >
                  <RefreshCw className={`h-3 w-3 ${isGenerating ? 'animate-spin' : ''}`} />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-6 px-2 text-xs"
                  onClick={handleApplySuggestion}
                >
                  <CheckCircle2 className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
          
          <div className="h-[100px] overflow-y-auto rounded border bg-white dark:bg-slate-800 p-3 text-xs">
            {isGenerating ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                Generating suggestion...
              </div>
            ) : aiSuggestion ? (
              <div>{aiSuggestion}</div>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Select a prompt or write your own to get a suggestion
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          onClick={handleApplySuggestion}
          disabled={!aiSuggestion || isGenerating}
          className="w-full gap-1 text-sm"
          variant="default"
        >
          <ArrowRight className="h-3 w-3" />
          Add to Story
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SimpleAiAssistant;
