
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchX, Filter, Book, User, Hash, Users, Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/ui/pagination";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useDebounce } from "@/hooks/use-debounce";
import { 
  searchAll, 
  SearchResult, 
  SearchResultType, 
  SearchParams 
} from "@/integrations/supabase/services/search";
import SearchResultItem from "@/components/search/SearchResultItem";
import SearchFilters from "@/components/search/SearchFilters";
import TrendingSearches from "@/components/search/TrendingSearches";
import RecentSearches, { addRecentSearch } from "@/components/search/RecentSearches";

const RESULTS_PER_PAGE = 10;

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';
  const initialType = (queryParams.get('type') as SearchResultType) || 'all';
  const initialSort = queryParams.get('sort') || 'relevance';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchType, setSearchType] = useState<SearchResultType>(initialType);
  const [sortBy, setSortBy] = useState(initialSort);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  
  // Debounce search for better performance
  const debouncedSearch = useDebounce(searchQuery, 500);
  
  const updateUrlParams = (query: string, type: SearchResultType, page: number, sort: string) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (type !== 'all') params.set('type', type);
    if (page > 0) params.set('page', page.toString());
    if (sort !== 'relevance') params.set('sort', sort);
    
    navigate({
      pathname: '/search',
      search: params.toString()
    }, { replace: true });
  };
  
  const performSearch = async () => {
    if (!searchQuery || searchQuery.length < 2) {
      setResults([]);
      setTotalResults(0);
      return;
    }

    // Add to recent searches
    addRecentSearch(searchQuery);
    
    setIsLoading(true);
    
    try {
      const searchParams: SearchParams = {
        query: searchQuery,
        types: searchType === 'all' ? ['story', 'author', 'community', 'tag'] : [searchType],
        limit: RESULTS_PER_PAGE,
        page: currentPage,
        sortBy: sortBy as 'relevance' | 'date' | 'popularity'
      };
      
      const { results, total } = await searchAll(searchParams);
      setResults(results);
      setTotalResults(total);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Initial search effect
  useEffect(() => {
    // Get page from URL or default to 0
    const pageParam = queryParams.get('page');
    const page = pageParam ? parseInt(pageParam, 10) : 0;
    setCurrentPage(page);
    
    // Get sort from URL or default to 'relevance'
    const sortParam = queryParams.get('sort');
    if (sortParam) {
      setSortBy(sortParam);
    }
    
    // Perform initial search if query exists
    if (initialQuery) {
      performSearch();
    }
  }, [location.search]);
  
  // Effect for debounced search
  useEffect(() => {
    if (debouncedSearch) {
      performSearch();
    }
  }, [debouncedSearch, searchType, currentPage, sortBy]);
  
  const handleSearch = () => {
    setCurrentPage(0);
    updateUrlParams(searchQuery, searchType, 0, sortBy);
    performSearch();
  };
  
  const handleTypeChange = (type: SearchResultType) => {
    setSearchType(type);
    setCurrentPage(0);
    updateUrlParams(searchQuery, type, 0, sortBy);
  };
  
  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    updateUrlParams(searchQuery, searchType, currentPage, sort);
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateUrlParams(searchQuery, searchType, page, sortBy);
  };
  
  // Generate page numbers for pagination
  const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);
  const pageNumbers = [];
  
  for (let i = 0; i < totalPages; i++) {
    if (
      i === 0 || // First page
      i === totalPages - 1 || // Last page
      (i >= currentPage - 2 && i <= currentPage + 2) // 2 pages before and after current
    ) {
      pageNumbers.push(i);
    } else if (pageNumbers[pageNumbers.length - 1] !== null) {
      pageNumbers.push(null); // For ellipsis
    }
  }
  
  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command/Ctrl + K for quick search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const inputElement = document.getElementById('search-input');
        if (inputElement) {
          inputElement.focus();
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 px-4">
        <div className="container max-w-5xl py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Search FanVerse</h1>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Input
                id="search-input"
                type="search"
                placeholder="Search for stories, authors, communities, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pr-10 w-full"
              />
              <div className="absolute right-3 top-2.5 text-muted-foreground">
                <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
            </div>
            <Button onClick={handleSearch} className="w-full md:w-auto">
              <SearchIcon className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
          
          {!searchQuery && (
            <div className="space-y-6 mb-8">
              <TrendingSearches />
              <RecentSearches />
            </div>
          )}
          
          <SearchFilters 
            searchType={searchType} 
            onSearchTypeChange={handleTypeChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />
          
          <div className="min-h-[40vh] mt-6">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <Skeleton className="h-16 w-16 rounded" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : results.length > 0 ? (
              <div>
                <div className="text-sm text-muted-foreground mb-4">
                  Found {totalResults} results for "{searchQuery}"
                </div>
                <div className="space-y-6">
                  {results.map((result) => (
                    <SearchResultItem 
                      key={`${result.type}-${result.id}`} 
                      result={result} 
                      query={searchQuery}
                    />
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <Pagination>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                      >
                        Previous
                      </Button>
                      
                      {pageNumbers.map((page, index) => 
                        page === null ? (
                          <span key={`ellipsis-${index}`} className="px-2">...</span>
                        ) : (
                          <Button
                            key={`page-${page}`}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(page as number)}
                          >
                            {(page as number) + 1}
                          </Button>
                        )
                      )}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages - 1}
                      >
                        Next
                      </Button>
                    </Pagination>
                  </div>
                )}
              </div>
            ) : searchQuery ? (
              <div className="text-center py-12">
                <SearchX className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  We couldn't find any matches for "{searchQuery}"
                </p>
                <div className="mt-6">
                  <p className="text-sm text-muted-foreground mb-2">Try:</p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    <li>Checking your spelling</li>
                    <li>Using fewer keywords</li>
                    <li>Using more general terms</li>
                    <li>Searching in a different category</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">Start searching</h3>
                <p className="text-muted-foreground">
                  Enter a search term above to find stories, authors, communities, and tags
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;
