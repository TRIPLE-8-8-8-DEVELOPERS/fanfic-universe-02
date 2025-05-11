
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Book, User, Hash, Users, Sparkles } from "lucide-react";
import { 
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { 
  searchAll, 
  SearchResult
} from "@/integrations/supabase/services/search";
import { useDebounce } from "@/hooks/use-debounce";

export interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchCommand = ({ open, onOpenChange }: SearchCommandProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const performSearch = async () => {
      if (debouncedQuery.length < 2) {
        setResults([]);
        return;
      }
      
      setIsLoading(true);
      
      try {
        // Limited quick search results
        const { results } = await searchAll({ 
          query: debouncedQuery, 
          limit: 5,
          types: ['story', 'author', 'tag']
        });
        
        setResults(results);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    performSearch();
  }, [debouncedQuery]);
  
  const handleSelect = (value: string) => {
    if (value.startsWith('/')) {
      navigate(value);
    } else {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
    onOpenChange(false);
    setQuery("");
  };
  
  // Group results by type
  const groupedResults: Record<string, SearchResult[]> = {
    story: [],
    author: [],
    tag: [],
  };
  
  results.forEach((result) => {
    if (groupedResults[result.type]) {
      groupedResults[result.type].push(result);
    }
  });
  
  const handleSearchAll = () => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
    onOpenChange(false);
    setQuery("");
  };
  
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <Command shouldFilter={false}>
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <CommandInput 
            placeholder="Search for anything..." 
            value={query}
            onValueChange={setQuery}
            className="h-11"
          />
        </div>
        <CommandList>
          {query.length < 2 ? (
            <>
              <CommandEmpty>Start typing to search...</CommandEmpty>
              <CommandGroup heading="Quick Links">
                <CommandItem onSelect={() => handleSelect("/explore")}>
                  <Sparkles className="mr-2 h-4 w-4 text-primary" />
                  <span>Explore</span>
                </CommandItem>
                <CommandItem onSelect={() => handleSelect("/trending")}>
                  <Sparkles className="mr-2 h-4 w-4 text-amber-500" />
                  <span>Trending</span>
                </CommandItem>
                <CommandItem onSelect={() => handleSelect("/popular")}>
                  <Sparkles className="mr-2 h-4 w-4 text-blue-500" />
                  <span>Popular</span>
                </CommandItem>
              </CommandGroup>
            </>
          ) : isLoading ? (
            <CommandEmpty>Searching...</CommandEmpty>
          ) : results.length === 0 ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : (
            <>
              {groupedResults.story.length > 0 && (
                <CommandGroup heading="Stories">
                  {groupedResults.story.map((result) => (
                    <CommandItem key={`story-${result.id}`} onSelect={() => handleSelect(result.url)}>
                      <Book className="mr-2 h-4 w-4 text-primary" />
                      <span>{result.title}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              
              {groupedResults.author.length > 0 && (
                <CommandGroup heading="Authors">
                  {groupedResults.author.map((result) => (
                    <CommandItem key={`author-${result.id}`} onSelect={() => handleSelect(result.url)}>
                      <User className="mr-2 h-4 w-4 text-blue-500" />
                      <span>{result.title}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              
              {groupedResults.tag.length > 0 && (
                <CommandGroup heading="Tags">
                  {groupedResults.tag.map((result) => (
                    <CommandItem key={`tag-${result.id}`} onSelect={() => handleSelect(result.url)}>
                      <Hash className="mr-2 h-4 w-4 text-amber-500" />
                      <span>{result.title}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              
              <CommandSeparator />
              <CommandGroup>
                <CommandItem onSelect={handleSearchAll}>
                  <Search className="mr-2 h-4 w-4" />
                  <span>Search for "{query}"</span>
                </CommandItem>
              </CommandGroup>
            </>
          )}
        </CommandList>
      </Command>
    </CommandDialog>
  );
};

export default SearchCommand;
