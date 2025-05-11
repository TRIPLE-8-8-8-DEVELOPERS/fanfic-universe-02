
import { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Prompt {
  id: string;
  text: string;
  genre: string;
}

const WritingPrompt = () => {
  const navigate = useNavigate();
  const [currentPrompt, setCurrentPrompt] = useState<Prompt>({
    id: "1",
    text: "A character discovers an ancient artifact that allows them to communicate with their parallel selves in other universes.",
    genre: "Science Fiction"
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const prompts: Prompt[] = [
    {
      id: "1",
      text: "A character discovers an ancient artifact that allows them to communicate with their parallel selves in other universes.",
      genre: "Science Fiction"
    },
    {
      id: "2",
      text: "A young wizard's first day at magic school goes disastrously wrong when they accidentally cast a forbidden spell.",
      genre: "Fantasy"
    },
    {
      id: "3",
      text: "Two rival detectives are forced to work together to solve a series of impossible crimes.",
      genre: "Mystery"
    },
    {
      id: "4",
      text: "A haunted house refuses to let its new owners renovate, revealing its dark secrets one room at a time.",
      genre: "Horror"
    },
    {
      id: "5",
      text: "A famous celebrity and their lookalike accidentally swap lives during a chance encounter.",
      genre: "Romance/Comedy"
    }
  ];
  
  const getRandomPrompt = () => {
    setIsLoading(true);
    const previousPromptId = currentPrompt.id;
    
    // Ensure we don't get the same prompt twice
    let newPrompt;
    do {
      newPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    } while (newPrompt.id === previousPromptId && prompts.length > 1);
    
    // Simulate API delay for getting a new prompt
    setTimeout(() => {
      setCurrentPrompt(newPrompt);
      setIsLoading(false);
    }, 500);
  };
  
  const startWriting = () => {
    toast.success("Creating new story with prompt");
    navigate("/write");
  };
  
  return (
    <div className="p-3">
      <div className="rounded-md bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 p-3 border border-purple-100 dark:border-purple-900/50 space-y-3">
        <h4 className="text-sm font-medium flex items-center text-purple-900 dark:text-purple-300">
          <Sparkles className="h-3.5 w-3.5 mr-1.5 text-purple-600 dark:text-purple-400" />
          Daily Writing Prompt
        </h4>
        
        <p className="text-xs text-slate-700 dark:text-slate-300 italic">
          "{currentPrompt.text}"
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300">
            {currentPrompt.genre}
          </span>
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-7 text-xs px-2"
              onClick={getRandomPrompt}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "New Prompt"}
            </Button>
            
            <Button 
              size="sm" 
              variant="default" 
              className="h-7 text-xs bg-purple-600 hover:bg-purple-700"
              onClick={startWriting}
            >
              Write <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingPrompt;
