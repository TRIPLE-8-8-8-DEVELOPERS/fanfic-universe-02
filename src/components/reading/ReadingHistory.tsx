
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/AuthContext';
import { getReadingHistory } from '@/integrations/supabase/services/reading-progress';
import { formatDistanceToNow } from 'date-fns';

interface ReadingHistoryItem {
  id: string;
  story_id: string;
  progress_percentage: number;
  updated_at: string;
  story: {
    id: string;
    title: string;
    cover_image: string;
    author: {
      username: string;
      display_name: string;
      avatar_url: string;
    }
  }
}

interface ReadingHistoryProps {
  limit?: number;
  className?: string;
}

const ReadingHistory: React.FC<ReadingHistoryProps> = ({ 
  limit = 5,
  className = ""
}) => {
  const { user } = useAuth();
  const [history, setHistory] = useState<ReadingHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await getReadingHistory(user.id, limit);
        
        if (error) throw error;
        if (data) {
          setHistory(data as ReadingHistoryItem[]);
        }
      } catch (error) {
        console.error('Error fetching reading history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [user, limit]);

  if (isLoading) {
    return (
      <div className={`space-y-2 ${className}`}>
        <h2 className="text-xl font-semibold">Continue Reading</h2>
        <div className="grid gap-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse bg-muted">
              <CardContent className="p-4 h-24"></CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className={`space-y-2 ${className}`}>
        <h2 className="text-xl font-semibold">Continue Reading</h2>
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            <BookOpen className="mx-auto h-8 w-8 mb-2" />
            <p>Your reading history will appear here.</p>
            <Button asChild variant="link" className="mt-2">
              <Link to="/explore">Explore stories</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <h2 className="text-xl font-semibold">Continue Reading</h2>
      <ScrollArea className="h-[360px] pr-4">
        <div className="grid gap-3">
          {history.map((item) => (
            <Card key={item.id}>
              <Link to={`/story/${item.story_id}`}>
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div 
                      className="h-16 w-12 rounded bg-cover bg-center" 
                      style={{ 
                        backgroundImage: `url(${item.story.cover_image || '/placeholder.svg'})` 
                      }}
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{item.story.title}</h3>
                      
                      <div className="flex items-center gap-1 mt-1">
                        <Avatar className="h-4 w-4">
                          <AvatarImage 
                            src={item.story.author.avatar_url} 
                            alt={item.story.author.username} 
                          />
                          <AvatarFallback>
                            {item.story.author.username[0]?.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-muted-foreground">
                          {item.story.author.display_name || item.story.author.username}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{formatDistanceToNow(new Date(item.updated_at), { addSuffix: true })}</span>
                        </div>
                        <span>{item.progress_percentage}% complete</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </ScrollArea>
      
      <CardFooter className="px-0 pt-2">
        <Button variant="outline" size="sm" asChild className="w-full">
          <Link to="/reading-lists">View All Reading History</Link>
        </Button>
      </CardFooter>
    </div>
  );
};

export default ReadingHistory;
