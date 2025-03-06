
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, CreditCard, ShoppingCart, CheckCircle2, Shield, Lock, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const MarketplaceCheckout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    saveInfo: false,
  });

  // Mock function to handle data from URL state
  useEffect(() => {
    if (location.state?.cartItems) {
      setCartItems(location.state.cartItems);
      calculateTotals(location.state.cartItems);
    } else {
      // Demo data if no items were passed
      const demoItems = [
        {
          id: 1,
          title: "Fantasy Novel Blueprint",
          price: 14.99,
          image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=500&h=350&fit=crop"
        },
        {
          id: 4,
          title: "Fantasy Map Creator Pro",
          price: 24.99,
          image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=500&h=350&fit=crop"
        }
      ];
      setCartItems(demoItems);
      calculateTotals(demoItems);
    }
  }, [location.state]);

  const calculateTotals = (items: any[]) => {
    const itemSubtotal = items.reduce((sum, item) => sum + item.price, 0);
    setSubtotal(itemSubtotal);
    setTotal(itemSubtotal - discount);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({ ...formData, saveInfo: checked });
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "WELCOME10") {
      const discountAmount = subtotal * 0.1;
      setDiscount(discountAmount);
      setTotal(subtotal - discountAmount);
      toast.success("Promo code applied: 10% discount");
    } else {
      toast.error("Invalid promo code");
    }
  };

  const handlePlaceOrder = () => {
    // Form validation
    if (!formData.name || !formData.email || !formData.cardNumber || !formData.expiry || !formData.cvc) {
      toast.error("Please fill out all required fields");
      return;
    }

    setIsProcessing(true);
    
    // Simulating API call
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Order placed successfully!");
      
      // Redirect to confirmation page
      navigate("/marketplace/success", { 
        state: { 
          orderNumber: Math.floor(Math.random() * 1000000),
          items: cartItems,
          total: total
        } 
      });
    }, 2000);
  };

  const removeItem = (id: number) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    calculateTotals(updatedItems);
  };

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
        
        <h1 className="text-3xl font-serif font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Your Cart ({cartItems.length} items)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.length > 0 ? (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-muted-foreground text-sm">Digital Product</p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${item.price.toFixed(2)}</div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs text-red-500 hover:text-red-700 p-0 h-auto"
                            onClick={() => removeItem(item.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">Your cart is empty</p>
                    <Button 
                      className="mt-4" 
                      onClick={() => navigate("/marketplace")}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                )}
              </CardContent>
              {cartItems.length > 0 && (
                <CardFooter className="flex-col items-start">
                  <div className="w-full flex items-center space-x-2">
                    <Input 
                      placeholder="Promo code" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="max-w-xs"
                    />
                    <Button onClick={applyPromoCode} variant="outline">
                      Apply
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Try code "WELCOME10" for 10% off
                  </div>
                </CardFooter>
              )}
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="john.doe@example.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <RadioGroup defaultValue="card" onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Credit/Debit Card
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  {paymentMethod === "card" && (
                    <div className="space-y-4 pt-2">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input 
                          id="cardNumber" 
                          name="cardNumber" 
                          placeholder="1234 5678 9012 3456" 
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input 
                            id="expiry" 
                            name="expiry" 
                            placeholder="MM/YY" 
                            value={formData.expiry}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input 
                            id="cvc" 
                            name="cvc" 
                            placeholder="123" 
                            value={formData.cvc}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 pt-2">
                        <Checkbox 
                          id="saveInfo" 
                          checked={formData.saveInfo}
                          onCheckedChange={handleCheckboxChange}
                        />
                        <Label htmlFor="saveInfo" className="text-sm">
                          Save payment information for future purchases
                        </Label>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <Button 
                  className="w-full mt-6" 
                  size="lg"
                  disabled={cartItems.length === 0 || isProcessing}
                  onClick={handlePlaceOrder}
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-center text-sm">
                    <Shield className="h-4 w-4 mr-2 text-primary" />
                    <span>Secure transaction</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Lock className="h-4 w-4 mr-2 text-primary" />
                    <span>Your data is protected</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-primary" />
                    <span>30-day satisfaction guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MarketplaceCheckout;
