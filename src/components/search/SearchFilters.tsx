
import { useState } from "react";
import { SearchResultType } from "@/integrations/supabase/services/search";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Book, Calendar, Filter, Hash, TrendingUp, User, Users } from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface SearchFiltersProps {
  searchType: SearchResultType;
  onSearchTypeChange: (type: SearchResultType) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const SearchFilters = ({ 
  searchType, 
  onSearchTypeChange, 
  sortBy, 
  onSortChange 
}: SearchFiltersProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Tabs 
          value={searchType} 
          onValueChange={(value) => onSearchTypeChange(value as SearchResultType)}
          className="overflow-x-auto pb-2 w-full"
        >
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
        </Tabs>

        <div className="hidden md:flex gap-2">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>Relevance</span>
              </SelectItem>
              <SelectItem value="date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Date</span>
              </SelectItem>
              <SelectItem value="popularity" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>Popularity</span>
              </SelectItem>
            </SelectContent>
          </Select>

          <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Advanced Filters</h4>
                <Separator />
                
                <div className="space-y-2">
                  <h5 className="text-sm font-medium">Content Type</h5>
                  <div className="flex flex-wrap gap-2">
                    {searchType === 'story' && (
                      <>
                        <Button size="sm" variant="outline" className="text-xs">
                          Fantasy
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          Sci-Fi
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          Romance
                        </Button>
                      </>
                    )}
                    {searchType === 'author' && (
                      <>
                        <Button size="sm" variant="outline" className="text-xs">
                          Popular Authors
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          New Authors
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                
                <Separator />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsFiltersOpen(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={() => setIsFiltersOpen(false)}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Mobile sort button */}
        <div className="md:hidden">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="popularity">Popularity</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
