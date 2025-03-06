
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart, Star, ChevronLeft, Share, Bookmark, 
  Check, Download, BookOpen, MessageSquare, Heart, Clock,
  User, Mail, ArrowRight, AlertTriangle
} from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample mock data - in a real app, this would come from an API
const mockProducts = [
  {
    id: 1,
    slug: "fantasy-novel-blueprint",
    title: "Fantasy Novel Blueprint",
    description: "A comprehensive story template for epic fantasy novels with character archetypes, world-building frameworks, and plot structures.",
    fullDescription: "The Fantasy Novel Blueprint is your complete guide to crafting immersive fantasy worlds and compelling stories. This comprehensive template includes everything you need to create your own epic fantasy novel, from character development worksheets to world-building frameworks and plot structure guidelines.\n\nThis digital product includes:\n- 20 character archetype templates\n- 15 world-building worksheets\n- 10 plot structure frameworks\n- 5 magic system design guides\n- Bonus: 3 sample chapters with annotations",
    price: 14.99,
    rating: 4.7,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506466010722-395aa2bef877?w=800&h=600&fit=crop"
    ],
    category: "Novel Templates",
    bestseller: true,
    features: [
      "Instant digital download",
      "Compatible with Word, Google Docs, and Scrivener",
      "Lifetime access to future updates",
      "30-day satisfaction guarantee"
    ],
    authorName: "Elena Richards",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    authorBio: "Fantasy author with 15+ years of experience and 12 published novels",
    published: "2023-04-15",
    downloads: 2845,
    fileFormat: "PDF, DOCX, EPUB",
    fileSize: "24.5 MB",
    customerReviews: [
      {
        name: "Michael K.",
        avatar: "M",
        date: "2023-06-12",
        rating: 5,
        comment: "This blueprint saved me months of planning. The character development worksheets are especially useful for creating believable protagonists and antagonists."
      },
      {
        name: "Sarah J.",
        avatar: "S",
        date: "2023-05-28",
        rating: 4,
        comment: "Great resource for first-time fantasy writers. The world-building frameworks helped me create a coherent magic system and political structure for my novel."
      },
      {
        name: "David T.",
        avatar: "D",
        date: "2023-04-30",
        rating: 5,
        comment: "Excellent value for the price. The sample chapters with annotations were incredibly helpful for understanding how to apply the concepts in practice."
      }
    ],
    relatedProducts: [2, 3, 5]
  },
  {
    id: 4,
    slug: "fantasy-map-creator-pro",
    title: "Fantasy Map Creator Pro",
    description: "Design stunning fantasy world maps with hundreds of custom assets, terrain options, and easy export tools.",
    fullDescription: "Fantasy Map Creator Pro is a powerful tool designed specifically for fantasy authors, game designers, and worldbuilders who want to create professional-quality maps without needing any design skills. With hundreds of custom assets, intuitive terrain generation tools, and flexible export options, you can bring your imaginary worlds to life in minutes.\n\nThis digital product includes:\n- Desktop application for Windows and Mac\n- 500+ custom fantasy-themed assets\n- 20 terrain generation presets\n- Multi-layer editing system\n- High-resolution export options\n- Commercial usage license",
    price: 24.99,
    rating: 4.9,
    reviews: 342,
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1591022123397-f8b0acb3dd10?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1659783554222-24bb64cd9c00?w=800&h=600&fit=crop"
    ],
    category: "World Building",
    bestseller: true,
    features: [
      "One-time purchase, lifetime access",
      "Regular free updates with new assets",
      "Export maps in PNG, JPG, PDF, and SVG formats",
      "Commercial usage rights included",
      "24/7 technical support"
    ],
    authorName: "Cartography Studios",
    authorImage: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=200&h=200&fit=crop",
    authorBio: "Digital tool creators specializing in resources for writers and worldbuilders",
    published: "2023-01-10",
    downloads: 5782,
    fileFormat: "EXE, DMG",
    fileSize: "156 MB",
    customerReviews: [
      {
        name: "Robert M.",
        avatar: "R",
        date: "2023-07-15",
        rating: 5,
        comment: "As a fantasy author, this tool has become indispensable for my creative process. The maps look professional and the interface is incredibly intuitive."
      },
      {
        name: "Jennifer L.",
        avatar: "J",
        date: "2023-06-02",
        rating: 5,
        comment: "Worth every penny! I've tried other map creators but this one offers the best balance of features and ease of use. The asset library is extensive."
      },
      {
        name: "Thomas B.",
        avatar: "T",
        date: "2023-04-18",
        rating: 4,
        comment: "Great tool overall. The only reason I'm not giving 5 stars is that it can be a bit resource-intensive on older computers."
      }
    ],
    relatedProducts: [1, 5, 7]
  }
];

const MarketplaceProduct = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [reviewName, setReviewName] = useState("");
  const [reviewEmail, setReviewEmail] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    // In a real app, this would be an API call
    setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.slug === slug);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.gallery[0]);
      }
      setLoading(false);
    }, 500);
  }, [slug]);

  const handleAddToCart = () => {
    setInCart(true);
    toast.success(`${product.title} added to cart!`);
  };

  const handleBuyNow = () => {
    navigate("/marketplace/checkout", { 
      state: { 
        cartItems: [product]
      } 
    });
  };

  const handleToggleWishlist = () => {
    setInWishlist(!inWishlist);
    toast.success(inWishlist 
      ? `${product.title} removed from wishlist` 
      : `${product.title} added to wishlist`
    );
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewEmail || !reviewComment) {
      toast.error("Please fill out all required fields");
      return;
    }
    
    toast.success("Thank you for your review! It will be published after moderation.");
    setReviewName("");
    setReviewEmail("");
    setReviewComment("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col dark:bg-gray-900">
        <Header />
        <main className="flex-1 container mx-auto py-8 px-4 mt-16">
          <div className="animate-pulse space-y-6">
            <div className="h-6 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="space-y-4">
                <div className="h-8 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-6 w-1/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 rounded mt-8"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col dark:bg-gray-900">
        <Header />
        <main className="flex-1 container mx-auto py-8 px-4 mt-16">
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => navigate("/marketplace")}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Marketplace
          </Button>
          
          <Card className="max-w-xl mx-auto p-6 text-center">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="h-12 w-12 text-amber-500" />
            </div>
            <h1 className="text-2xl font-medium mb-2">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/marketplace")}>
              Return to Marketplace
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4 mt-16">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate("/marketplace")}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Marketplace
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-4">
            <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <img 
                src={selectedImage} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {product.bestseller && (
                <Badge className="absolute top-4 right-4 bg-yellow-500 hover:bg-yellow-600">
                  Bestseller
                </Badge>
              )}
            </div>
            
            <div className="flex overflow-auto gap-4 pb-2">
              {product.gallery.map((image: string, i: number) => (
                <button 
                  key={i}
                  onClick={() => setSelectedImage(image)}
                  className={`relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                    selectedImage === image 
                      ? 'border-primary' 
                      : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.title} thumbnail ${i+1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <div className="flex gap-2 mb-2">
                <Badge variant="outline">{product.category}</Badge>
                {product.bestseller && (
                  <Badge className="bg-yellow-500 hover:bg-yellow-600">
                    Bestseller
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-medium">{product.rating}</span>
                  <span className="text-muted-foreground ml-1">({product.reviews} reviews)</span>
                </div>
                <Separator orientation="vertical" className="h-5" />
                <div className="flex items-center text-sm text-muted-foreground">
                  <Download className="h-4 w-4 mr-1" />
                  {product.downloads.toLocaleString()} downloads
                </div>
              </div>
              
              <p className="text-lg mb-4">
                {product.fullDescription.split('\n\n')[0]}
              </p>
              
              <div className="text-3xl font-bold mb-6">${product.price}</div>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <Button
                  size="lg"
                  onClick={handleBuyNow}
                  className="gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Buy Now
                </Button>
                
                <Button
                  variant={inCart ? "secondary" : "outline"}
                  size="lg"
                  onClick={handleAddToCart}
                  className="gap-2"
                  disabled={inCart}
                >
                  {inCart ? (
                    <>
                      <Check className="h-5 w-5" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5" />
                      Add to Cart
                    </>
                  )}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleToggleWishlist}
                  className={inWishlist ? "text-red-500 hover:text-red-600" : ""}
                >
                  <Heart className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                >
                  <Share className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium">Includes:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={product.authorImage} alt={product.authorName} />
                    <AvatarFallback>{product.authorName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{product.authorName}</div>
                    <p className="text-sm text-muted-foreground">{product.authorBio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Published</p>
                <p className="font-medium flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {new Date(product.published).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">File Format</p>
                <p className="font-medium flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  {product.fileFormat}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">File Size</p>
                <p className="font-medium">{product.fileSize}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Category</p>
                <p className="font-medium">{product.category}</p>
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="mb-6">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="related">Related Products</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="space-y-6">
            {product.fullDescription.split('\n\n').map((paragraph: string, i: number) => (
              <p key={i} className="text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </TabsContent>
          
          <TabsContent value="reviews" className="space-y-10">
            <div className="space-y-6">
              <h3 className="text-xl font-medium">Customer Reviews</h3>
              
              <div className="space-y-8">
                {product.customerReviews.map((review: any, i: number) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>{review.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{review.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < review.rating 
                              ? "fill-yellow-400 text-yellow-400" 
                              : "text-gray-300 dark:text-gray-600"
                          }`} 
                        />
                      ))}
                    </div>
                    
                    <p className="text-muted-foreground">{review.comment}</p>
                    
                    {i < product.customerReviews.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-secondary/30 rounded-lg p-6">
              <h3 className="text-xl font-medium mb-4">Write a Review</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <User className="h-5 w-5 mr-2 text-muted-foreground" />
                      <Input 
                        id="name" 
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                      <Input 
                        id="email" 
                        type="email"
                        value={reviewEmail}
                        onChange={(e) => setReviewEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setReviewRating(rating)}
                        className="p-1"
                      >
                        <Star 
                          className={`h-6 w-6 ${
                            rating <= reviewRating 
                              ? "fill-yellow-400 text-yellow-400" 
                              : "text-gray-300 dark:text-gray-600"
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="comment" className="block text-sm font-medium">
                    Your Review <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <MessageSquare className="h-5 w-5 mr-2 text-muted-foreground mt-2" />
                    <Textarea 
                      id="comment" 
                      rows={4}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit">Submit Review</Button>
              </form>
            </div>
          </TabsContent>
          
          <TabsContent value="related">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProducts
                .filter(p => product.relatedProducts.includes(p.id))
                .map(relatedProduct => (
                  <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-md transition-shadow story-card-hover">
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                      {relatedProduct.bestseller && (
                        <Badge className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600">
                          Bestseller
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between mb-2">
                        <Badge variant="outline">{relatedProduct.category}</Badge>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm">{relatedProduct.rating}</span>
                        </div>
                      </div>
                      <h3 className="font-medium mb-1 hover:text-primary transition-colors cursor-pointer">
                        {relatedProduct.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {relatedProduct.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">${relatedProduct.price}</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/marketplace/product/${relatedProduct.slug}`)}
                          className="gap-1"
                        >
                          View Details
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default MarketplaceProduct;
