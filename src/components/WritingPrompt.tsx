
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
  
  const getGenreColors = (genre: string) => {
    switch(genre) {
      case "Science Fiction":
        return "bg-cyan-100 dark:bg-cyan-900/40 text-cyan-800 dark:text-cyan-300";
      case "Fantasy":
        return "bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300";
      case "Mystery":
        return "bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300";
      case "Horror":
        return "bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300";
      case "Romance/Comedy":
        return "bg-pink-100 dark:bg-pink-900/40 text-pink-800 dark:text-pink-300";
      default:
        return "bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300";
    }
  };
  
  const getCardGradient = (genre: string) => {
    switch(genre) {
      case "Science Fiction":
        return "from-cyan-50 to-blue-50 dark:from-cyan-950/20 dark:to-blue-950/20 border-cyan-100 dark:border-cyan-900/30";
      case "Fantasy":
        return "from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 border-purple-100 dark:border-purple-900/30";
      case "Mystery":
        return "from-blue-50 to-slate-50 dark:from-blue-950/20 dark:to-slate-950/20 border-blue-100 dark:border-blue-900/30";
      case "Horror":
        return "from-red-50 to-slate-50 dark:from-red-950/20 dark:to-slate-950/20 border-red-100 dark:border-red-900/30";
      case "Romance/Comedy":
        return "from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 border-pink-100 dark:border-pink-900/30";
      default:
        return "from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border-purple-100 dark:border-purple-900/50";
    }
  };
  
  return (
    <div className="p-3">
      <div className={`rounded-xl bg-gradient-to-br ${getCardGradient(currentPrompt.genre)} p-3 border space-y-3 hover:shadow-md transition-all duration-300`}>
        <h4 className="text-sm font-medium flex items-center text-purple-900 dark:text-purple-300">
          <Sparkles className="h-3.5 w-3.5 mr-1.5 text-purple-600 dark:text-purple-400 animate-pulse-slow" />
          Daily Writing Prompt
        </h4>
        
        <p className="text-xs text-slate-700 dark:text-slate-300 italic border-l-2 border-purple-300 dark:border-purple-700 pl-2">
          "{currentPrompt.text}"
        </p>
        
        <div className="flex justify-between items-center">
          <span className={`text-xs px-2 py-0.5 rounded-full ${getGenreColors(currentPrompt.genre)}`}>
            {currentPrompt.genre}
          </span>
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-7 text-xs px-2 hover:bg-purple-100 dark:hover:bg-purple-900/40"
              onClick={getRandomPrompt}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "New Prompt"}
            </Button>
            
            <Button 
              size="sm" 
              variant="default" 
              className="h-7 text-xs bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:shadow transition-all hover:scale-[1.02]"
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
