
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Book, User, Hash, SearchX, Users, Search as SearchIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import { searchAll, SearchResult } from "@/integrations/supabase/services/search";
import RecentSearches from "@/components/search/RecentSearches";
import TrendingSearches from "@/components/search/TrendingSearches";

interface QuickSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QuickSearchDialog = ({ open, onOpenChange }: QuickSearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    if (debouncedSearch && debouncedSearch.length >= 2) {
      performSearch();
    } else {
      setResults([]);
    }
  }, [debouncedSearch]);

  const performSearch = async () => {
    setIsLoading(true);
    try {
      const { results } = await searchAll({ 
        query: debouncedSearch, 
        limit: 5,
        types: ["story", "author", "tag"],
      });
      setResults(results);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    navigate(result.url);
    onOpenChange(false);
  };
  
  const handleFullSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      onOpenChange(false);
    }
  };
  
  const handleRecentSearchSelect = (term: string) => {
    navigate(`/search?q=${encodeURIComponent(term)}`);
    onOpenChange(false);
  };
  
  useEffect(() => {
    if (open) {
      // Reset search when opening the dialog
      setSearchQuery("");
      setResults([]);
    }
  }, [open]);

  const getResultIcon = (type: string) => {
    switch (type) {
      case "story":
        return <Book className="h-4 w-4 text-primary" />;
      case "author":
        return <User className="h-4 w-4 text-blue-500" />;
      case "community":
        return <Users className="h-4 w-4 text-green-500" />;
      case "tag":
        return <Hash className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Quick Search</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for anything..."
              className="pl-10 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleFullSearch();
                }
              }}
              autoFocus
            />
          </div>

          {!searchQuery && (
            <div className="space-y-4">
              <RecentSearches onSearchSelect={handleRecentSearchSelect} />
              <TrendingSearches />
            </div>
          )}

          {isLoading && (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted animate-pulse"></div>
                  <div className="space-y-1 flex-1">
                    <div className="h-4 bg-muted animate-pulse rounded"></div>
                    <div className="h-3 bg-muted animate-pulse rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && searchQuery && results.length === 0 && (
            <div className="text-center py-6">
              <SearchX className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                No results found for "{searchQuery}"
              </p>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-2">
              {results.map((result) => (
                <div
                  key={`${result.type}-${result.id}`}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-accent cursor-pointer"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    {getResultIcon(result.type)}
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-medium truncate">{result.title}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {result.description || `View ${result.type}`}
                    </p>
                  </div>
                </div>
              ))}

              <Separator className="my-2" />
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={handleFullSearch}
              >
                <SearchIcon className="mr-2 h-4 w-4" />
                View all results for "{searchQuery}"
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickSearchDialog;
