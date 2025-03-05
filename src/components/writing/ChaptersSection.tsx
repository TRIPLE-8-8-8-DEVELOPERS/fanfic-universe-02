
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, ChevronDown, ChevronUp, Edit, FilePlus, Trash2 } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface Chapter {
  id: string;
  title: string;
  content: string;
  wordCount: number;
}

interface ChaptersSectionProps {
  isPremium: boolean;
  onChapterSelect: (chapterId: string) => void;
  currentChapterId: string;
}

const ChaptersSection = ({ isPremium, onChapterSelect, currentChapterId }: ChaptersSectionProps) => {
  const [chapters, setChapters] = useState<Chapter[]>([
    { id: "1", title: "Chapter 1: The Beginning", content: "", wordCount: 0 },
    { id: "2", title: "Chapter 2: The Journey", content: "", wordCount: 0 },
  ]);
  const [isAddingChapter, setIsAddingChapter] = useState(false);
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [isReordering, setIsReordering] = useState(false);

  const handleAddChapter = () => {
    if (!newChapterTitle.trim()) {
      toast.error("Please enter a chapter title");
      return;
    }

    const newChapter: Chapter = {
      id: (chapters.length + 1).toString(),
      title: newChapterTitle,
      content: "",
      wordCount: 0
    };

    setChapters([...chapters, newChapter]);
    setNewChapterTitle("");
    setIsAddingChapter(false);
    toast.success("Chapter added successfully");
  };

  const handleDeleteChapter = (id: string) => {
    if (chapters.length <= 1) {
      toast.error("Your story must have at least one chapter");
      return;
    }
    
    setChapters(chapters.filter(chapter => chapter.id !== id));
    toast.success("Chapter deleted");
    
    // If the current chapter is deleted, select the first one
    if (id === currentChapterId) {
      onChapterSelect(chapters[0].id);
    }
  };

  const moveChapter = (id: string, direction: 'up' | 'down') => {
    const index = chapters.findIndex(chapter => chapter.id === id);
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === chapters.length - 1)) {
      return;
    }

    const newChapters = [...chapters];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newChapters[index], newChapters[newIndex]] = [newChapters[newIndex], newChapters[index]];
    
    setChapters(newChapters);
  };

  return (
    <div className="border rounded-lg p-4 bg-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Chapters</h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsReordering(!isReordering)}
            className="text-xs"
          >
            {isReordering ? "Done" : "Reorder"}
          </Button>
          <Dialog open={isAddingChapter} onOpenChange={setIsAddingChapter}>
            <DialogTrigger asChild>
              <Button size="sm" className="text-xs">
                <FilePlus className="h-3.5 w-3.5 mr-1" />
                Add Chapter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Chapter</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <Input
                  placeholder="Chapter title"
                  value={newChapterTitle}
                  onChange={(e) => setNewChapterTitle(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingChapter(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddChapter}>
                  Add Chapter
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-2">
          {chapters.map((chapter) => (
            <div 
              key={chapter.id}
              className={`flex items-center justify-between p-2 rounded-md transition-colors ${
                currentChapterId === chapter.id 
                  ? "bg-primary/10 border border-primary/30" 
                  : "hover:bg-muted"
              }`}
            >
              <div 
                className="flex-1 cursor-pointer overflow-hidden" 
                onClick={() => onChapterSelect(chapter.id)}
              >
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate font-medium">{chapter.title}</span>
                </div>
                <div className="text-xs text-muted-foreground pl-6">
                  {chapter.wordCount} words
                </div>
              </div>
              
              {isReordering ? (
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={() => moveChapter(chapter.id, 'up')}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={() => moveChapter(chapter.id, 'down')}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={() => {}}
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 text-destructive" 
                    onClick={() => handleDeleteChapter(chapter.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChaptersSection;
