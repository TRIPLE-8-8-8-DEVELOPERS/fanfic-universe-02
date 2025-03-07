<lov-code>
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  ShoppingCart, Search, Book, Tag, Star, BookOpen, Sparkles, DollarSign, 
  Lightbulb, ShieldCheck, Award, ArrowUpRight, Check, UsersIcon, Clock, 
  TrendingUp, Zap, Gift, Heart, HeartOff, Filter, Bookmark, Share2,
  Flame, EyeIcon, Percent, ThumbsUp
} from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const Marketplace = () => {
  const [cart, setCart] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [showDeals, setShowDeals] = useState(false);
  const [compareItems, setCompareItems] = useState<number[]>([]);
  const [compareDialogOpen, setCompareDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [currentPriceRange, setCurrentPriceRange] = useState("all");
  const [currentRating, setCurrentRating] = useState("all");
  const [showRecommended, setShowRecommended] = useState(true);
  const [flashSaleActive, setFlashSaleActive] = useState(true);
  const [flashSaleTimeLeft, setFlashSaleTimeLeft] = useState(3600); // 1 hour in seconds
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState("popular");
  const [giftWrapItems, setGiftWrapItems] = useState<number[]>([]);
  const [showGiftOptionsDialog, setShowGiftOptionsDialog] = useState(false);
  const [selectedGiftItem, setSelectedGiftItem] = useState<number | null>(null);
  const [previewingItems, setPreviewingItems] = useState<number[]>([]);

  // Format flash sale countdown
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Flash sale countdown timer
  useEffect(() => {
    if (flashSaleActive && flashSaleTimeLeft > 0) {
      const timer = setTimeout(() => {
        setFlashSaleTimeLeft(flashSaleTimeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (flashSaleTimeLeft === 0) {
      setFlashSaleActive(false);
    }
  }, [flashSaleActive, flashSaleTimeLeft]);

  const addToCart = (id: number) => {
    if (!cart.includes(id)) {
      setCart([...cart, id]);
      toast.success("Added to cart!");
    } else {
      toast.info("Item already in cart");
    }
  };

  const toggleWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(itemId => itemId !== id));
      toast.success("Removed from wishlist");
    } else {
      setWishlist([...wishlist, id]);
      toast.success("Added to wishlist!");
    }
  };

  const toggleCompare = (id: number) => {
    if (compareItems.includes(id)) {
      setCompareItems(compareItems.filter(itemId => itemId !== id));
    } else {
      if (compareItems.length >= 3) {
        toast.error("You can only compare up to 3 items at once");
        return;
      }
      setCompareItems([...compareItems, id]);
      toast.success("Added to comparison!");
    }
  };

  const toggleGiftWrap = (id: number) => {
    if (giftWrapItems.includes(id)) {
      setGiftWrapItems(giftWrapItems.filter(itemId => itemId !== id));
    } else {
      setGiftWrapItems([...giftWrapItems, id]);
    }
  };

  const shareProduct = (product: any) => {
    // Simulate sharing
    toast.success(`Shared ${product.title} with your network!`);
  };

  const handleQuickPreview = (id: number) => {
    // Add to previewing items
    if (!previewingItems.includes(id)) {
      setPreviewingItems([...previewingItems, id]);
    }
    
    // Find the product
    const product = [...premiumTemplates, ...digitalGoods, ...premiumServices].find(p => p.id === id);
    if (product) {
      setSelectedProduct(product);
      setDialogOpen(true);
    }
  };

  const openProductDetails = (product: any) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const openGiftOptions = (id: number) => {
    setSelectedGiftItem(id);
    setShowGiftOptionsDialog(true);
  };

  const calculateDiscountedPrice = (originalPrice: number) => {
    // Apply flash sale discount (30% off)
    if (flashSaleActive) {
      return (originalPrice * 0.7).toFixed(2);
    }
    return originalPrice.toFixed(2);
  };

  const filteredProducts = () => {
    const allProducts = [...premiumTemplates, ...digitalGoods, ...premiumServices];
    
    return allProducts.filter(product => {
      // Filter by search
      const matchesSearch = searchQuery.trim() === "" || 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by category
      const matchesCategory = currentCategory === "all" || product.category.toLowerCase() === currentCategory;
      
      // Filter by price range
      let matchesPrice = true;
      if (currentPriceRange === "free") {
        matchesPrice = product.price === 0;
      } else if (currentPriceRange === "under10") {
        matchesPrice = product.price < 10;
      } else if (currentPriceRange === "10to25") {
        matchesPrice = product.price >= 10 && product.price <= 25;
      } else if (currentPriceRange === "over25") {
        matchesPrice = product.price > 25;
      }
      
      // Filter by rating
      let matchesRating = true;
      if (currentRating === "4.5plus") {
        matchesRating = product.rating >= 4.5;
      } else if (currentRating === "4plus") {
        matchesRating = product.rating >= 4.0;
      } else if (currentRating === "3.5plus") {
        matchesRating = product.rating >= 3.5;
      }
      
      // Filter by deals
      const matchesDeals = !showDeals || (flashSaleActive && product.price > 0);
      
      return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesDeals;
    });
  };

  const sortProducts = (products: any[]) => {
    switch (sortOrder) {
      case "newest":
        // In a real app, you'd sort by date
        return [...products].sort((a, b) => b.id - a.id);
      case "price-low":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...products].sort((a, b) => b.price - a.price);
      case "rating":
        return [...products].sort((a, b) => b.rating - a.rating);
      default: // popular
        return [...products].sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }
  };

  // Get recommended products based on user behavior (this would be more sophisticated in a real app)
  const getRecommendedProducts = () => {
    return [...premiumTemplates, ...digitalGoods].sort(() => 0.5 - Math.random()).slice(0, 3);
  };

  const premiumTemplates = [
    {
      id: 1,
      title: "Fantasy Novel Blueprint",
      description: "A comprehensive story template for epic fantasy novels with character archetypes, world-building frameworks, and plot structures.",
      price: 14.99,
      rating: 4.7,
      reviews: 134,
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=500&h=350&fit=crop",
      category: "Novel Templates",
      bestseller: true,
    },
    {
      id: 2,
      title: "Mystery Plot Generator",
      description: "Generate complex murder mysteries with interconnected clues, red herrings, and multiple suspects.",
      price: 9.99,
      rating: 4.5,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=500&h=350&fit=crop",
      category: "Plot Tools",
    },
    {
      id: 3,
      title: "Character Development Suite",
      description: "Create multi-dimensional characters with detailed backstories, motivations, flaws, and character arcs.",
      price: 12.99,
      rating: 4.8,
      reviews: 217,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=350&fit=crop",
      category: "Character Tools",
      bestseller: true,
    },
  ];

  const digitalGoods = [
    {
      id: 4,
      title: "Fantasy Map Creator Pro",
      description: "Design stunning fantasy world maps with hundreds of custom assets, terrain options, and easy export tools.",
      price: 24.99,
      rating: 4.9,
      reviews: 342,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=500&h=350&fit=crop",
      category: "World Building",
      bestseller: true,
    },
    {
      id: 5,
      title: "Genre Trope Encyclopedia",
      description: "Comprehensive digital guide to tropes across 20+ genres with examples and subversion techniques.",
      price: 7.99,
      rating: 4.4,
      reviews: 76,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=500&h=350&fit=crop",
      category: "Writing Resources",
    },
  ];

  const premiumServices = [
    {
      id: 6,
      title: "Professional Manuscript Review",
      description: "Get comprehensive feedback on your manuscript from experienced editors specialized in your genre.",
      price: 149.99,
      rating: 4.9,
      reviews: 124,
      category: "Editing Services",
    },
    {
      id: 7,
      title: "Cover Design Package",
      description: "Custom cover design created by professional designers specialized in book covers.",
      price: 99.99,
      rating: 4.7,
      reviews: 215,
      category: "Design Services",
    },
    {
      id: 8,
      title: "Marketing Strategy Session",
      description: "One-hour consultation with a book marketing expert to develop a promotional strategy for your book.",
      price: 79.99,
      rating: 4.6,
      reviews: 83,
      category: "Marketing Services",
    },
  ];

  const freeResources = [
    {
      id: 9,
      title: "Story Structure Guide",
      description: "Learn the basics of three-act structure, hero's journey, and other popular storytelling frameworks.",
      downloads: 12483,
      category: "Writing Guides",
    },
    {
      id: 10,
      title: "Character Profile Template",
      description: "A simple but effective template for developing your story's characters.",
      downloads: 9547,
      category: "Character Development",
    },
    {
      id: 11,
      title: "Dialogue Writing Tips",
      description: "Techniques for writing natural, engaging dialogue that advances your story.",
      downloads: 7125,
      category: "Writing Techniques",
    },
  ];

  // New flash sale items
  const flashSaleItems = [
    {
      id: 12,
      title: "Character Arc Planner",
      description: "Map out compelling character transformations from beginning to end with this professional planning tool.",
      originalPrice: 19.99,
      price: 13.99,
      discount: 30,
      rating: 4.8,
      reviews: 78,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=350&fit=crop",
      category: "Character Tools",
    },
    {
      id: 13,
      title: "Story Structure Masterclass",
      description: "Video course on advanced story structures used by bestselling authors across multiple genres.",
      originalPrice: 49.99,
      price: 34.99,
      discount: 30,
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=500&h=350&fit=crop",
      category: "Courses",
    },
    {
      id: 14,
      title: "Publishing Toolkit Bundle",
      description: "Complete set of templates, checklists and guides for self-publishing your work professionally.",
      originalPrice: 29.99,
      price: 20.99,
      discount: 30,
      rating: 4.7,
      reviews: 92,
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=500&h=350&fit=crop",
      category: "Publishing Tools",
    }
  ];

  // Determine recently viewed products (would typically be from user session/history)
  const recentlyViewedProducts = previewingItems.map(id => 
    [...premiumTemplates, ...digitalGoods, ...premiumServices, ...flashSaleItems].find(item => item.id === id)
  ).filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 p-4 md:p-6 max-w-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-4xl font-serif font-bold mb-2">Creator Marketplace</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Discover premium tools, templates, and services to elevate your storytelling and writing process.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  className="pl-10 min-w-[240px]" 
                  placeholder="Search marketplace..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 relative">
                      <Heart className={`h-4 w-4 ${wishlist.length > 0 ? "text-red-500 fill-red-500" : ""}`} />
                      {wishlist.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {wishlist.length}
                        </span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Wishlist</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2 relative"
                      onClick={() => compareItems.length > 0 && setCompareDialogOpen(true)}
                      disabled={compareItems.length === 0}
                    >
                      <Zap className="h-4 w-4" />
                      {compareItems.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {compareItems.length}
                        </span>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Compare Items</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 relative">
                      <ShoppingCart className="h-4 w-4" />
                      {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {cart.length}
                        </span>
                      )}
                      <span className="hidden sm:inline">Cart</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your Cart</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Flash Sale Banner */}
          {flashSaleActive && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 animate-pulse">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center">
                  <Flame className="h-6 w-6 text-red-500 mr-2" />
                  <div>
                    <h2 className="font-bold text-lg flex items-center">
                      Flash Sale! <span className="text-red-500 ml-2">30% OFF</span>
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Limited time offer on selected items
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Ends in:</div>
                    <div className="font-mono font-bold text-red-500">{formatTime(flashSaleTimeLeft)}</div>
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => window.scrollTo({top: document.getElementById('flash-sale')?.offsetTop, behavior: 'smooth'})}>
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Recently Viewed */}
          {recentlyViewedProducts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-medium mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                Recently Viewed
              </h2>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {recentlyViewedProducts.map((product: any) => (
                  <div 
                    key={`recent-${product.id}`} 
                    className="min-w-[200px] w-[200px] rounded-md border p-3 hover:shadow-md transition-shadow cursor-pointer flex flex-col"
                    onClick={() => openProductDetails(product)}
                  >
                    {product.image && (
                      <div className="h-24 overflow-hidden rounded-md mb-2">
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <h3 className="font-medium text-sm line-clamp-1">{product.title}</h3>
                    <div className="flex items-center mt-auto pt-2">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-xs">{product.rating}</span>
                      <span className="ml-auto font-medium text-sm">${product.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showRecommended && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                  Recommended For You
                </h2>
                <Button variant="ghost" size="sm" onClick={() => setShowRecommended(false)}>
                  Hide
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {getRecommendedProducts().map((product) => (
                  <Card key={`rec-${product.id}`} className="overflow-hidden hover:shadow-md transition-shadow">
                    {product.image && (
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <Badge variant="outline">{product.category}</Badge>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm">{product.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="mt-2 text-xl cursor-pointer hover:text-primary transition-colors" onClick={() => openProductDetails(product)}>
                        {product.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-muted-foreground line-clamp-2">{product.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center pt-2">
                      <span className="font-bold">${product.price}</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="p-0 h-8 w-8" onClick={() => toggleWishlist(product.id)}>
                          <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                        </Button>
                        <Button onClick={() => addToCart(product.id)}>
                          Add to Cart
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-1 space-y-6">
              <div className="flex justify-between items-center md:hidden mb-4">
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
                <div>
                  <h2 className="font-medium mb-3">Categories</h2>
                  <div className="space-y-2">
                    <Button 
                      variant={currentCategory === "all" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setCurrentCategory("all")}
                    >
                      <Book className="h-4 w-4 mr-2" />
                      All Categories
                    </Button>
                    <Button 
                      variant={currentCategory === "templates" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setCurrentCategory("templates")}
                    >
                      <Tag className="h-4 w-4 mr-2" />
                      Templates
                    </Button>
                    <Button 
                      variant={currentCategory === "tools" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setCurrentCategory("tools")}
                    >
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Tools
                    </Button>
                    <Button 
                      variant={currentCategory === "resources" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setCurrentCategory("resources")}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Resources
                    </Button>
                    <Button 
                      variant={currentCategory === "services" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setCurrentCategory("services")}
                    >
                      <ShieldCheck className="h-4 w-4 mr-2" />
                      Services
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h2 className="font-medium mb-3">Price Range</h2>
                  <div className="space-y-2">
                    <Button 
                      variant={currentPriceRange === "all" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setCurrentPriceRange("all")}
                    >
                      All Prices
                    </Button>
                    <Button 
                      variant={currentPriceRange === "free" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setCurrentPriceRange("free")}
                    >
                      Free
                    </Button>
                    <Button 
                      variant={currentPriceRange === "under10" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setCurrentPriceRange("under10")}
                    >
                      Under $10
                    </Button>
                    <Button 
                      variant={currentPriceRange === "10to25" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setCurrentPriceRange("10to25")}
                    >
                      $10 - $25
                    </Button>
                    <Button 
                      variant={currentPriceRange === "over25" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setCurrentPriceRange("over25")}
                    >
                      $25+
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h2 className="font-medium mb-3">Rating</h2>
                  <div className="space-y-2">
                    <Button 
                      variant={currentRating === "all" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setCurrentRating("all")}
                    >
                      <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
                      All Ratings
                    </Button>
                    <Button 
                      variant={currentRating === "4.5plus" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setCurrentRating("4.5plus")}
                    >
                      <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
                      4.5 & up
                    </Button>
                    <Button 
                      variant={currentRating === "4plus" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setCurrentRating("4plus")}
                    >
                      <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
                      4.0 & up
                    </Button>
                    <Button 
                      variant={currentRating === "3.5plus" ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setCurrentRating("3.5plus")}
                    >
                      <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
                      3.5 & up
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h2 className="font-medium mb-3">Special Offers</h2>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="deals-only" 
                      checked={showDeals} 
                      onCheckedChange={setShowDeals} 
                    />
                    <Label htmlFor="deals-only" className="cursor-pointer">Show deals only</Label>
                  </div>
                </div>
                
                <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
                  <h3 className="font-medium mb-3 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-primary" />
                    Become a Creator
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Have skills or resources to share? Join our marketplace as a creator and earn income from your expertise.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="hidden md:flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground mr-2">
                    {filteredProducts().length} {filteredProducts().length === 1 ? 'result' : 'results'}
                  </span>
                </div>
                
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    
