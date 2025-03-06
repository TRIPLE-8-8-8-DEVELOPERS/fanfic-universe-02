
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Book, Tag, Lightbulb, BookOpen, 
  ShieldCheck, Star, X, FilterX 
} from "lucide-react";

interface MarketplaceFiltersProps {
  onFilterChange: (filters: any) => void;
  onClearFilters: () => void;
  activeFilters: string[];
}

const MarketplaceFilters = ({ 
  onFilterChange, 
  onClearFilters,
  activeFilters 
}: MarketplaceFiltersProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number[]>([0, 150]);
  const [minRating, setMinRating] = useState<number>(0);

  const handleCategorySelect = (category: string) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
    onFilterChange({ 
      category: newCategory,
      priceRange: priceRange,
      minRating: minRating
    });
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    onFilterChange({ 
      category: selectedCategory,
      priceRange: value,
      minRating: minRating
    });
  };

  const handleRatingChange = (rating: number) => {
    setMinRating(rating);
    onFilterChange({ 
      category: selectedCategory,
      priceRange: priceRange,
      minRating: rating
    });
  };

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setPriceRange([0, 150]);
    setMinRating(0);
    onClearFilters();
  };

  return (
    <div className="space-y-6">
      {activeFilters.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Active Filters</h3>
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-8 px-2 text-xs">
              <FilterX className="h-3.5 w-3.5 mr-1" />
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                {filter}
                <button className="ml-1 hover:text-primary">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="font-medium mb-3">Categories</h2>
        <div className="space-y-2">
          <Button 
            variant={selectedCategory === "all" ? "secondary" : "ghost"} 
            className="w-full justify-start"
            onClick={() => handleCategorySelect("all")}
          >
            <Book className="h-4 w-4 mr-2" />
            All Categories
          </Button>
          <Button 
            variant={selectedCategory === "templates" ? "secondary" : "ghost"} 
            className="w-full justify-start"
            onClick={() => handleCategorySelect("templates")}
          >
            <Tag className="h-4 w-4 mr-2" />
            Templates
          </Button>
          <Button 
            variant={selectedCategory === "tools" ? "secondary" : "ghost"} 
            className="w-full justify-start"
            onClick={() => handleCategorySelect("tools")}
          >
            <Lightbulb className="h-4 w-4 mr-2" />
            Tools
          </Button>
          <Button 
            variant={selectedCategory === "resources" ? "secondary" : "ghost"} 
            className="w-full justify-start"
            onClick={() => handleCategorySelect("resources")}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Resources
          </Button>
          <Button 
            variant={selectedCategory === "services" ? "secondary" : "ghost"} 
            className="w-full justify-start"
            onClick={() => handleCategorySelect("services")}
          >
            <ShieldCheck className="h-4 w-4 mr-2" />
            Services
          </Button>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h2 className="font-medium mb-3">Price Range</h2>
        <div className="space-y-6">
          <Slider 
            defaultValue={[0, 150]} 
            max={150} 
            step={1}
            value={priceRange}
            onValueChange={handlePriceChange}
          />
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">${priceRange[0]}</span>
            <span className="text-sm text-muted-foreground">${priceRange[1]}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange([Number(e.target.value), priceRange[1]])}
              className="h-8"
            />
            <span>to</span>
            <Input
              type="number"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange([priceRange[0], Number(e.target.value)])}
              className="h-8"
            />
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h2 className="font-medium mb-3">Rating</h2>
        <div className="space-y-2">
          <Button 
            variant={minRating === 4.5 ? "secondary" : "ghost"} 
            className="w-full justify-start"
            onClick={() => handleRatingChange(4.5)}
          >
            <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
            4.5 & up
          </Button>
          <Button 
            variant={minRating === 4.0 ? "secondary" : "ghost"} 
            className="w-full justify-start"
            onClick={() => handleRatingChange(4.0)}
          >
            <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
            4.0 & up
          </Button>
          <Button 
            variant={minRating === 3.5 ? "secondary" : "ghost"} 
            className="w-full justify-start"
            onClick={() => handleRatingChange(3.5)}
          >
            <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
            3.5 & up
          </Button>
          <Button 
            variant={minRating === 0 ? "secondary" : "ghost"} 
            className="w-full justify-start"
            onClick={() => handleRatingChange(0)}
          >
            All ratings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceFilters;
