
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchX, Filter, Book, User, Hash, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination } from "@/components/ui/pagination";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  searchAll, 
  SearchResult, 
  SearchResultType, 
  SearchParams 
} from "@/integrations/supabase/services/search";

const RESULTS_PER_PAGE = 10;

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';
  const initialType = queryParams.get('type') as SearchResultType || 'story';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchType, setSearchType] = useState(initialType);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  
  const updateUrlParams = (query: string, type: SearchResultType, page: number) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (type !== 'story') params.set('type', type);
    if (page > 0) params.set('page', page.toString());
    
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
    
    setIsLoading(true);
    
    try {
      const searchParams: SearchParams = {
        query: searchQuery,
        types: searchType === 'all' ? ['story', 'author', 'community', 'tag'] : [searchType],
        limit: RESULTS_PER_PAGE,
        page: currentPage
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
  
  useEffect(() => {
    // Get page from URL or default to 0
    const pageParam = queryParams.get('page');
    const page = pageParam ? parseInt(pageParam, 10) : 0;
    setCurrentPage(page);
    
    // Perform initial search if query exists
    if (initialQuery) {
      performSearch();
    }
  }, [location.search]);
  
  const handleSearch = () => {
    setCurrentPage(0);
    updateUrlParams(searchQuery, searchType, 0);
    performSearch();
  };
  
  const handleTypeChange = (type: string) => {
    const newType = type as SearchResultType;
    setSearchType(newType);
    setCurrentPage(0);
    updateUrlParams(searchQuery, newType, 0);
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateUrlParams(searchQuery, searchType, page);
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 px-4">
        <div className="container max-w-5xl py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Search FanVerse</h1>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Input
                type="search"
                placeholder="Search for stories, authors, communities, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pr-10 w-full"
              />
            </div>
            <Button onClick={handleSearch} className="w-full md:w-auto">
              Search
            </Button>
          </div>
          
          <Tabs 
            value={searchType} 
            onValueChange={handleTypeChange} 
            className="space-y-6"
          >
            <div className="overflow-x-auto pb-2">
              <TabsList className="w-full md:w-auto">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>All</span>
                </TabsTrigger>
                <TabsTrigger value="story" className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  <span>Stories</span>
                </TabsTrigger>
                <TabsTrigger value="author" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Authors</span>
                </TabsTrigger>
                <TabsTrigger value="community" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Communities</span>
                </TabsTrigger>
                <TabsTrigger value="tag" className="flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  <span>Tags</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="min-h-[40vh]">
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
                      <SearchResultItem key={`${result.type}-${result.id}`} result={result} />
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
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface SearchResultItemProps {
  result: SearchResult;
}

const SearchResultItem = ({ result }: SearchResultItemProps) => {
  const navigate = useNavigate();
  
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
  
  return (
    <div
      className="flex gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
      onClick={handleClick}
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
        </div>
        <h3 className="font-medium mb-1">{result.title}</h3>
        {result.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{result.description}</p>
        )}
        {result.author && (
          <p className="text-xs text-muted-foreground mt-1">By {result.author}</p>
        )}
      </div>
    </div>
  );
};

export default Search;
