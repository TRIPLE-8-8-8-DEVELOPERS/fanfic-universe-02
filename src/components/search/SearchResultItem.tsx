
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Book, User, Users, Hash, Star, Calendar, Tag } from "lucide-react";
import { SearchResult } from "@/integrations/supabase/services/search";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface SearchResultItemProps {
  result: SearchResult;
  query?: string;
}

const SearchResultItem = ({ result, query }: SearchResultItemProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = () => {
    navigate(result.url);
  };
  
  const TypeIcon = () => {
    switch (result.type) {
      case 'story':
        return <Book className="h-4 w-4 text-primary" />;
      case 'author':
        return <User className="h-4 w-4 text-blue-500" />;
      case 'community':
        return <Users className="h-4 w-4 text-green-500" />;
      case 'tag':
        return <Hash className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };
  
  const TypeLabel = () => {
    switch (result.type) {
      case 'story':
        return "Story";
      case 'author':
        return "Author";
      case 'community':
        return "Community";
      case 'tag':
        return "Tag";
      default:
        return "";
    }
  };

  // Function to highlight the search query within text
  const highlightQuery = (text: string) => {
    if (!query || !text) return text;
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? 
            <span key={i} className="bg-primary/20 text-primary font-medium">{part}</span> : 
            part
        )}
      </>
    );
  };
  
  return (
    <div
      className={cn(
        "flex gap-4 p-4 border rounded-lg transition-all duration-300 cursor-pointer",
        isHovered ? "bg-accent/70 border-primary/40 shadow-md" : "hover:bg-accent/50"
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {result.imageUrl ? (
        <img
          src={result.imageUrl}
          alt={result.title}
          className="h-16 w-16 object-cover rounded"
        />
      ) : (
        <div className="h-16 w-16 rounded bg-muted flex items-center justify-center">
          <TypeIcon />
        </div>
      )}
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <TypeIcon />
          <span className="text-xs text-muted-foreground"><TypeLabel /></span>
          
          {result.popularity !== undefined && result.popularity > 20 && (
            <Badge variant="outline" className="ml-auto flex items-center gap-1">
              <Star className="h-3 w-3 text-amber-500" />
              <span>Popular</span>
            </Badge>
          )}
          
          {result.createdAt && (
            <span className="text-xs text-muted-foreground ml-auto flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {format(new Date(result.createdAt), 'MMM d, yyyy')}
            </span>
          )}
        </div>
        
        <h3 className="font-medium mb-1">{query ? highlightQuery(result.title) : result.title}</h3>
        
        {result.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {query ? highlightQuery(result.description) : result.description}
          </p>
        )}
        
        <div className="flex flex-wrap items-center mt-2 gap-2">
          {result.author && (
            <span className="text-xs text-muted-foreground">
              By {result.author}
            </span>
          )}
          
          {result.tags && result.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {result.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs py-0">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
              {result.tags.length > 3 && (
                <Badge variant="outline" className="text-xs py-0">
                  +{result.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultItem;
