
import React from 'react';
import { BookmarkCheck, Bookmark, Award, Badge } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ReadingProgressNotificationProps {
  type: 'milestone' | 'chapter_complete' | 'book_complete';
  storyTitle: string;
  progressValue?: number;
}

export const showReadingProgressNotification = ({
  type,
  storyTitle,
  progressValue = 0
}: ReadingProgressNotificationProps) => {
  switch (type) {
    case 'milestone':
      toast.success(
        <div className="flex items-center">
          <div className="bg-primary/20 p-2 rounded-full mr-3">
            <BookmarkCheck className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium">Reading Milestone</p>
            <p className="text-sm text-muted-foreground">
              {progressValue}% through "{storyTitle}"
            </p>
          </div>
        </div>
      );
      break;
    
    case 'chapter_complete':
      toast.success(
        <div className="flex items-center">
          <div className="bg-green-500/20 p-2 rounded-full mr-3">
            <Bookmark className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <p className="font-medium">Chapter Complete!</p>
            <p className="text-sm text-muted-foreground">
              Keep reading "{storyTitle}"
            </p>
          </div>
        </div>
      );
      break;
    
    case 'book_complete':
      toast(
        <div className="flex items-center">
          <div className="bg-amber-500/20 p-2 rounded-full mr-3">
            <Award className="h-5 w-5 text-amber-500" />
          </div>
          <div>
            <p className="font-medium">Congratulations!</p>
            <p className="text-sm text-muted-foreground">
              You finished reading "{storyTitle}"
            </p>
          </div>
        </div>
      );
      break;
  }
};
