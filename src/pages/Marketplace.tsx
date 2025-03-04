import { useState } from "react";
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
import { ShoppingCart, Search, Book, Tag, Star, BookOpen, Sparkles, DollarSign, Lightbulb, ShieldCheck, Award, ArrowUpRight, Check, UsersIcon } from "lucide-react";
import { toast } from "sonner";

const Marketplace = () => {
  const [cart, setCart] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const addToCart = (id: number) => {
    if (!cart.includes(id)) {
      setCart([...cart, id]);
      toast.success("Added to cart!");
    } else {
      toast.info("Item already in cart");
    }
  };

  const openProductDetails = (product: any) => {
    setSelectedProduct(product);
    setDialogOpen(true);
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 p-4 md:p-6 max-w-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <h1 className="text-4xl font-serif font-bold mb-2">Creator Marketplace</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Discover premium tools, templates, and services to elevate your storytelling and writing process.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input className="pl-10 min-w-[240px]" placeholder="Search marketplace..." />
              </div>
              
              <Button variant="outline" className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                <span>Cart ({cart.length})</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-1 space-y-6">
              <div>
                <h2 className="font-medium mb-3">Categories</h2>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <Book className="h-4 w-4 mr-2" />
                    All Categories
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Tag className="h-4 w-4 mr-2" />
                    Templates
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Tools
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Resources
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <ShieldCheck className="h-4 w-4 mr-2" />
                    Services
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h2 className="font-medium mb-3">Price Range</h2>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    All Prices
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Free
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    Under $10
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    $10 - $25
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    $25+
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h2 className="font-medium mb-3">Rating</h2>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
                    4.5 & up
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
                    4.0 & up
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
                    3.5 & up
                  </Button>
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

            <div className="md:col-span-3">
              <Tabs defaultValue="all" className="w-full">
                <div className="flex justify-between items-center mb-6">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="templates">Templates</TabsTrigger>
                    <TabsTrigger value="tools">Tools</TabsTrigger>
                    <TabsTrigger value="services">Services</TabsTrigger>
                    <TabsTrigger value="free">Free</TabsTrigger>
                  </TabsList>
                  
                  <Select defaultValue="popular">
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
                
                <TabsContent value="all" className="space-y-10 mt-0">
                  <section>
                    <h2 className="text-2xl font-serif font-bold mb-6">Featured Templates</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {premiumTemplates.map((template) => (
                        <Card key={template.id} className="overflow-hidden hover:shadow-md transition-shadow story-card-hover">
                          <div className="relative h-40 overflow-hidden">
                            <img 
                              src={template.image} 
                              alt={template.title}
                              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                            />
                            {template.bestseller && (
                              <Badge className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600">
                                Bestseller
                              </Badge>
                            )}
                          </div>
                          <CardHeader className="pb-2">
                            <div className="flex justify-between">
                              <Badge variant="outline">{template.category}</Badge>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="ml-1 text-sm">{template.rating}</span>
                                <span className="text-xs text-muted-foreground ml-1">({template.reviews})</span>
                              </div>
                            </div>
                            <CardTitle className="mt-2 text-xl cursor-pointer hover:text-primary transition-colors" onClick={() => openProductDetails(template)}>
                              {template.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-muted-foreground line-clamp-2">{template.description}</p>
                          </CardContent>
                          <CardFooter className="flex justify-between items-center pt-2">
                            <span className="font-bold">${template.price}</span>
                            <Button onClick={() => addToCart(template.id)}>
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add to Cart
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </section>
                  
                  <section>
                    <h2 className="text-2xl font-serif font-bold mb-6">Digital Tools</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {digitalGoods.map((tool) => (
                        <Card key={tool.id} className="overflow-hidden hover:shadow-md transition-shadow story-card-hover">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 h-40 md:h-auto">
                              <img 
                                src={tool.image} 
                                alt={tool.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="md:w-2/3 flex flex-col">
                              <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <Badge variant="outline">{tool.category}</Badge>
                                    {tool.bestseller && (
                                      <Badge className="ml-2 bg-yellow-500 hover:bg-yellow-600">
                                        Bestseller
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="ml-1 text-sm">{tool.rating}</span>
                                    <span className="text-xs text-muted-foreground ml-1">({tool.reviews})</span>
                                  </div>
                                </div>
                                <CardTitle className="mt-2 text-xl cursor-pointer hover:text-primary transition-colors" onClick={() => openProductDetails(tool)}>
                                  {tool.title}
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="pb-2 flex-grow">
                                <p className="text-muted-foreground line-clamp-2">{tool.description}</p>
                              </CardContent>
                              <CardFooter className="flex justify-between items-center pt-2">
                                <span className="font-bold">${tool.price}</span>
                                <Button onClick={() => addToCart(tool.id)}>Add to Cart</Button>
                              </CardFooter>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </section>
                  
                  <section>
                    <h2 className="text-2xl font-serif font-bold mb-6">Creative Services</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {premiumServices.map((service) => (
                        <Card key={service.id} className="hover:shadow-md transition-shadow story-card-hover">
                          <CardHeader>
                            <Badge variant="outline">{service.category}</Badge>
                            <CardTitle className="mt-2 text-xl">{service.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground mb-4 line-clamp-3">{service.description}</p>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="ml-1 text-sm">{service.rating}</span>
                              <span className="text-xs text-muted-foreground ml-1">({service.reviews} reviews)</span>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between items-center">
                            <span className="font-bold">${service.price}</span>
                            <Button variant="outline" onClick={() => openProductDetails(service)}>
                              View Details
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </section>
                  
                  <section>
                    <h2 className="text-2xl font-serif font-bold mb-6">Free Resources</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {freeResources.map((resource) => (
                        <Card key={resource.id} className="hover:shadow-md transition-shadow story-card-hover">
                          <CardHeader>
                            <Badge variant="outline">{resource.category}</Badge>
                            <CardTitle className="mt-2 text-xl">{resource.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground mb-4">{resource.description}</p>
                            <div className="text-sm text-muted-foreground">
                              {resource.downloads.toLocaleString()} downloads
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button className="w-full">
                              Download Free
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </section>
                </TabsContent>
                
                <TabsContent value="templates" className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {premiumTemplates.map((template) => (
                      <Card key={template.id} className="overflow-hidden hover:shadow-md transition-shadow story-card-hover">
                        <div className="relative h-40 overflow-hidden">
                          <img 
                            src={template.image} 
                            alt={template.title}
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                          />
                          {template.bestseller && (
                            <Badge className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600">
                              Bestseller
                            </Badge>
                          )}
                        </div>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <Badge variant="outline">{template.category}</Badge>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="ml-1 text-sm">{template.rating}</span>
                              <span className="text-xs text-muted-foreground ml-1">({template.reviews})</span>
                            </div>
                          </div>
                          <CardTitle className="mt-2 text-xl cursor-pointer hover:text-primary transition-colors" onClick={() => openProductDetails(template)}>
                            {template.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <p className="text-muted-foreground line-clamp-2">{template.description}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center pt-2">
                          <span className="font-bold">${template.price}</span>
                          <Button onClick={() => addToCart(template.id)}>Add to Cart</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="tools" className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {digitalGoods.map((tool) => (
                      <Card key={tool.id} className="overflow-hidden hover:shadow-md transition-shadow story-card-hover">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 h-40 md:h-auto">
                            <img 
                              src={tool.image} 
                              alt={tool.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="md:w-2/3 flex flex-col">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <Badge variant="outline">{tool.category}</Badge>
                                  {tool.bestseller && (
                                    <Badge className="ml-2 bg-yellow-500 hover:bg-yellow-600">
                                      Bestseller
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="ml-1 text-sm">{tool.rating}</span>
                                  <span className="text-xs text-muted-foreground ml-1">({tool.reviews})</span>
                                </div>
                              </div>
                              <CardTitle className="mt-2 text-xl cursor-pointer hover:text-primary transition-colors" onClick={() => openProductDetails(tool)}>
                                {tool.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="pb-2 flex-grow">
                              <p className="text-muted-foreground line-clamp-2">{tool.description}</p>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center pt-2">
                              <span className="font-bold">${tool.price}</span>
                              <Button onClick={() => addToCart(tool.id)}>Add to Cart</Button>
                            </CardFooter>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="services" className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {premiumServices.map((service) => (
                      <Card key={service.id} className="hover:shadow-md transition-shadow story-card-hover">
                        <CardHeader>
                          <Badge variant="outline">{service.category}</Badge>
                          <CardTitle className="mt-2 text-xl">{service.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4 line-clamp-3">{service.description}</p>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm">{service.rating}</span>
                            <span className="text-xs text-muted-foreground ml-1">({service.reviews} reviews)</span>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                          <span className="font-bold">${service.price}</span>
                          <Button variant="outline" onClick={() => openProductDetails(service)}>
                            View Details
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="free" className="mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {freeResources.map((resource) => (
                      <Card key={resource.id} className="hover:shadow-md transition-shadow story-card-hover">
                        <CardHeader>
                          <Badge variant="outline">{resource.category}</Badge>
                          <CardTitle className="mt-2 text-xl">{resource.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">{resource.description}</p>
                          <div className="text-sm text-muted-foreground">
                            {resource.downloads.toLocaleString()} downloads
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">
                            Download Free
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <section className="bg-primary/10 border border-primary/20 rounded-xl p-8 mb-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="md:w-2/3">
                <h2 className="text-2xl font-serif font-bold mb-3">Become a Marketplace Creator</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Share your expertise with the FANVERSE community. Sell templates, tools, or offer creative services and earn income while helping other writers.
                </p>
                <div className="flex flex-wrap gap-6 mt-6">
                  <div className="flex items-start">
                    <DollarSign className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Earn Income</h3>
                      <p className="text-sm text-muted-foreground">Monetize your creative expertise</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Award className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Build Reputation</h3>
                      <p className="text-sm text-muted-foreground">Establish yourself as an expert</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <UsersIcon className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Join Community</h3>
                      <p className="text-sm text-muted-foreground">Connect with creators worldwide</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Button size="lg" className="gap-2">
                  Apply to Become a Creator
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {selectedProduct && (
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedProduct.title}</DialogTitle>
              <DialogDescription>
                {selectedProduct.category}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {selectedProduct.image && (
                <div>
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.title}
                    className="w-full rounded-md"
                  />
                </div>
              )}
              
              <div>
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-lg font-medium">{selectedProduct.rating}</span>
                  <span className="text-sm text-muted-foreground ml-1">({selectedProduct.reviews} reviews)</span>
                </div>
                
                <p className="mb-6">{selectedProduct.description}</p>
                
                <div className="flex justify-between items-center mb-6">
                  <span className="text-2xl font-bold">${selectedProduct.price}</span>
                  <Button onClick={() => {
                    addToCart(selectedProduct.id);
                    setDialogOpen(false);
                  }}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
                
                <Separator className="mb-6" />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Features:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Instant digital download</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Compatible with popular writing software</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>Lifetime access to future updates</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span>30-day satisfaction guarantee</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <DialogFooter className="sm:justify-between">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Close
              </Button>
              <Button variant="default" onClick={() => {
                addToCart(selectedProduct.id);
                setDialogOpen(false);
              }}>
                Add to Cart
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Marketplace;
