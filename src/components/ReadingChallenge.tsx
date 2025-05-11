
import { useState, useEffect } from "react";
import { Trophy, BookOpen, Calendar, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ReadingStats {
  booksRead: number;
  target: number;
  daysLeft: number;
  streak: number;
  todayMinutes: number;
  dailyTarget: number;
}

const ReadingChallenge = () => {
  const [stats, setStats] = useState<ReadingStats>({
    booksRead: 12,
    target: 50,
    daysLeft: 167,
    streak: 7,
    todayMinutes: 15,
    dailyTarget: 30
  });
  
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="p-3 space-y-3">
        <div className="h-4 bg-muted/50 rounded w-3/5 animate-pulse"></div>
        <div className="h-3 bg-muted/50 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-muted/50 rounded w-4/5 animate-pulse"></div>
        <div className="h-5 bg-muted/50 rounded w-full animate-pulse"></div>
      </div>
    );
  }
  
  const progressPercentage = Math.round((stats.booksRead / stats.target) * 100);
  const dailyProgressPercentage = Math.round((stats.todayMinutes / stats.dailyTarget) * 100);
  
  return (
    <div className="p-3 space-y-3">
      <h4 className="text-sm font-medium text-muted-foreground flex items-center">
        <Trophy className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
        2025 Reading Challenge
      </h4>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium">{stats.booksRead} of {stats.target} books</span>
          </div>
          <div className="text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 inline mr-1" />
            {stats.daysLeft} days left
          </div>
        </div>
        
        <div className="space-y-1">
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{progressPercentage}% complete</span>
            <span>{stats.target - stats.booksRead} books to go</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-md px-2 py-1 text-xs flex items-center">
            <CheckCircle className="h-3 w-3 mr-1" />
            {stats.streak} day streak
          </div>
        </div>
        
        <div className="mt-2">
          <div className="flex items-center justify-between text-xs">
            <span>Today's reading</span>
            <span className="font-medium">{stats.todayMinutes}/{stats.dailyTarget} minutes</span>
          </div>
          <Progress value={dailyProgressPercentage} className="h-1.5 mt-1" />
        </div>
      </div>
    </div>
  );
};

export default ReadingChallenge;
