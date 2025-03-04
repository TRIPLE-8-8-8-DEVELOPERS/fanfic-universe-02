
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  BookOpenText, Save, FileText, 
  Clock, Target, Crown, 
  Download, FileDown, Printer, EyeOff
} from "lucide-react";
import { toast } from "sonner";

interface WritingEditorProps {
  title: string;
  content: string;
  wordCount: number;
  characterCount: number;
  readingTime: number;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  isPremium: boolean;
  onExport: () => void;
}

const WritingEditor = ({
  title,
  content,
  wordCount,
  characterCount,
  readingTime,
  onTitleChange,
  onContentChange,
  isPremium,
  onExport
}: WritingEditorProps) => {
  const [isDistractFree, setIsDistractFree] = useState(false);
  
  const toggleDistractFreeMode = () => {
    setIsDistractFree(!isDistractFree);
    toast(isDistractFree ? "Exited distraction-free mode" : "Entered distraction-free mode");
  };

  return (
    <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${isDistractFree ? 'p-0 border-0 shadow-none' : 'p-6'}`}>
      <div className={`${isDistractFree ? 'sr-only' : 'mb-6 flex justify-between items-center'}`}>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={toggleDistractFreeMode}>
            <EyeOff className="h-4 w-4 mr-2" />
            {isDistractFree ? "Exit Focus Mode" : "Focus Mode"}
          </Button>
          
          <Button variant="ghost" size="sm">
            <BookOpenText className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
        
        <div className="flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <FileDown className="h-4 w-4 mr-2" />
                Export
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48">
              <div className="flex flex-col gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onExport}
                  className="justify-start"
                  disabled={!isPremium}
                >
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                  {!isPremium && <Crown className="h-3 w-3 ml-2 text-amber-500" />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onExport}
                  className="justify-start"
                  disabled={!isPremium}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  DOCX
                  {!isPremium && <Crown className="h-3 w-3 ml-2 text-amber-500" />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onExport}
                  className="justify-start"
                  disabled={!isPremium}
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                  {!isPremium && <Crown className="h-3 w-3 ml-2 text-amber-500" />}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Your story title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className={`text-lg font-medium ${isDistractFree ? 'border-0 text-xl shadow-none bg-transparent px-0 focus-visible:ring-0' : ''}`}
        />
        
        <Textarea
          placeholder="Start writing your story..."
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className={`min-h-[60vh] ${isDistractFree ? 'border-0 text-lg shadow-none bg-transparent px-0 focus-visible:ring-0' : ''}`}
        />
      </div>
      
      <div className={`${isDistractFree ? 'opacity-0 hover:opacity-80 transition-opacity fixed bottom-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-md border' : 'mt-4 flex items-center justify-end gap-3'}`}>
        <Badge variant="outline" className="flex gap-1 items-center">
          <FileText className="h-3 w-3" />
          {wordCount} words
        </Badge>
        <Badge variant="outline" className="flex gap-1 items-center">
          <Target className="h-3 w-3" />
          {characterCount} chars
        </Badge>
        <Badge variant="outline" className="flex gap-1 items-center">
          <Clock className="h-3 w-3" />
          {readingTime} min read
        </Badge>
      </div>
    </div>
  );
};

export default WritingEditor;
