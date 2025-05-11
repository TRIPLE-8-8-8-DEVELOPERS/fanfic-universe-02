
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTrendingSearchTerms } from "@/integrations/supabase/services/search";

const TrendingSearches = () => {
  const [trendingTerms, setTrendingTerms] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadTrendingTerms = async () => {
      try {
        const terms = await getTrendingSearchTerms();
        setTrendingTerms(terms);
      } catch (error) {
        console.error("Error loading trending search terms:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTrendingTerms();
  }, []);
  
  const handleSearch = (term: string) => {
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };
  
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-2">
        <div className="h-4 bg-muted/50 rounded w-1/3"></div>
        <div className="flex flex-wrap gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 bg-muted/50 rounded w-20"></div>
          ))}
        </div>
      </div>
    );
  }
  
  if (trendingTerms.length === 0) {
    return null;
  }
  
  return (
    <div className="space-y-2">
      <h3 className="text-sm text-muted-foreground flex items-center">
        <TrendingUp className="h-4 w-4 mr-1" />
        Trending Searches
      </h3>
      <div className="flex flex-wrap gap-2">
        {trendingTerms.map((term, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="rounded-full text-xs hover:bg-primary/5 hover:text-primary transition-colors"
            onClick={() => handleSearch(term)}
          >
            {term}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TrendingSearches;
