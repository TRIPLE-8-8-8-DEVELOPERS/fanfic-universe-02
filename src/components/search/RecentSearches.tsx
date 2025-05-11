
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const RECENT_SEARCHES_KEY = 'recent_searches';
const MAX_RECENT_SEARCHES = 5;

export const addRecentSearch = (query: string): void => {
  if (!query || query.length < 2) return;
  
  try {
    // Get existing searches
    const existingSearchesJson = localStorage.getItem(RECENT_SEARCHES_KEY);
    const existingSearches = existingSearchesJson ? JSON.parse(existingSearchesJson) : [];
    
    // Remove if already exists (to move it to the front)
    const filteredSearches = existingSearches.filter((s: string) => s.toLowerCase() !== query.toLowerCase());
    
    // Add to front of array
    const newSearches = [query, ...filteredSearches].slice(0, MAX_RECENT_SEARCHES);
    
    // Save back to localStorage
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(newSearches));
  } catch (error) {
    console.error('Error saving recent search:', error);
  }
};

export const clearRecentSearches = (): void => {
  localStorage.removeItem(RECENT_SEARCHES_KEY);
};

interface RecentSearchesProps {
  onSearchSelect?: (term: string) => void;
}

const RecentSearches = ({ onSearchSelect }: RecentSearchesProps) => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    try {
      const searchesJson = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (searchesJson) {
        setRecentSearches(JSON.parse(searchesJson));
      }
    } catch (error) {
      console.error('Error loading recent searches:', error);
    }
  }, []);
  
  const handleSearch = (term: string) => {
    if (onSearchSelect) {
      onSearchSelect(term);
    } else {
      navigate(`/search?q=${encodeURIComponent(term)}`);
    }
  };
  
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearRecentSearches();
    setRecentSearches([]);
  };
  
  const handleRemove = (e: React.MouseEvent, term: string) => {
    e.stopPropagation();
    
    try {
      const newSearches = recentSearches.filter(s => s !== term);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(newSearches));
      setRecentSearches(newSearches);
    } catch (error) {
      console.error('Error removing recent search:', error);
    }
  };
  
  if (recentSearches.length === 0) {
    return null;
  }
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-muted-foreground flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          Recent Searches
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 text-xs"
          onClick={handleClear}
        >
          Clear all
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {recentSearches.map((term, index) => (
          <div 
            key={index}
            className="group flex items-center bg-accent/50 hover:bg-accent rounded-full px-3 py-1 text-xs cursor-pointer"
            onClick={() => handleSearch(term)}
          >
            <span>{term}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 ml-1 opacity-50 group-hover:opacity-100"
              onClick={(e) => handleRemove(e, term)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
