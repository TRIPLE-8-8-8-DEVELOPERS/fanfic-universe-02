
import React, { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface ReadingProgressTrackerProps {
  storyId: string;
  totalWords: number;
  totalChapters: number;
}

const ReadingProgressTracker: React.FC<ReadingProgressTrackerProps> = ({
  storyId,
  totalWords,
  totalChapters,
}) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState(0);
  const [chaptersRead, setChaptersRead] = useState(0);
  const [estimatedReadingTime, setEstimatedReadingTime] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    if (!user || !storyId) return;

    // Fetch reading progress from database
    const fetchReadingProgress = async () => {
      const { data, error } = await supabase
        .from('reading_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('story_id', storyId)
        .single();

      if (data) {
        setProgress(data.progress_percentage || 0);
        setChaptersRead(data.chapters_read || 0);
        setTimeSpent(data.time_spent_seconds || 0);
      }
    };

    fetchReadingProgress();

    // Calculate estimated reading time (using average reading speed of 250 words per minute)
    setEstimatedReadingTime(Math.ceil(totalWords / 250));
  }, [user, storyId, totalWords]);

  // Format time as minutes or hours and minutes
  const formatTime = (timeInMinutes: number) => {
    if (timeInMinutes < 60) {
      return `${timeInMinutes} min`;
    }
    
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    
    if (minutes === 0) {
      return `${hours} hr`;
    }
    
    return `${hours} hr ${minutes} min`;
  };

  // Format time spent
  const formatTimeSpent = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    return formatTime(minutes);
  };

  return (
    <div className="bg-card p-4 rounded-lg border shadow-sm">
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Reading Progress</h3>
            <Badge variant="outline">{progress}% Complete</Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Chapters</p>
              <p className="font-medium">{chaptersRead} of {totalChapters}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Est. Reading Time</p>
              <p className="font-medium">{formatTime(estimatedReadingTime)}</p>
            </div>
          </div>
          
          {timeSpent > 0 && (
            <div className="flex items-center gap-2 col-span-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Time Spent Reading</p>
                <p className="font-medium">{formatTimeSpent(timeSpent)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadingProgressTracker;
