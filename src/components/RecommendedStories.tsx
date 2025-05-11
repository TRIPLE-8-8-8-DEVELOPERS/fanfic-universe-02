
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Story {
  id: string;
  title: string;
  coverUrl?: string;
  author: string;
  rating: number;
  tags: string[];
}

const RecommendedStories = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // This would typically be an API call to get personalized recommendations
    const fetchRecommendedStories = async () => {
      // Simulated API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock data
      setStories([
        {
          id: "1",
          title: "The Dragon's Apprentice",
          author: "ElvenScribe",
          rating: 4.8,
          tags: ["Fantasy", "Magic"]
        },
        {
          id: "2",
          title: "Starship Odyssey",
          author: "CosmicWriter",
          rating: 4.7,
          tags: ["Sci-Fi", "Space"]
        },
        {
          id: "3",
          title: "Whispers in the Wind",
          author: "MysticPen",
          rating: 4.5,
          tags: ["Romance", "Mystery"]
        }
      ]);
      
      setIsLoading(false);
    };
    
    fetchRecommendedStories();
  }, []);
  
  if (isLoading) {
    return (
      <div className="p-3 space-y-3">
        <div className="h-4 bg-muted/50 rounded w-3/4 animate-pulse"></div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 bg-muted/50 rounded w-full animate-pulse"></div>
            <div className="h-3 bg-muted/50 rounded w-2/3 animate-pulse"></div>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="p-3 space-y-3">
      <h4 className="text-sm font-medium text-muted-foreground flex items-center">
        <BookOpen className="h-3.5 w-3.5 mr-1.5" />
        Recommended for You
      </h4>
      <div className="space-y-3">
        {stories.map(story => (
          <Link
            key={story.id}
            to={`/story/${story.id}`}
            className="block group"
          >
            <div className="space-y-1">
              <div className="text-sm font-medium line-clamp-1 group-hover:text-primary transition-colors">
                {story.title}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  by {story.author}
                </span>
                <div className="flex items-center text-amber-500">
                  <Star className="h-3 w-3 fill-amber-500 mr-0.5" />
                  <span className="text-xs">{story.rating}</span>
                </div>
              </div>
              <div className="flex gap-1 flex-wrap">
                {story.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="px-1 py-0 text-[10px]">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendedStories;
