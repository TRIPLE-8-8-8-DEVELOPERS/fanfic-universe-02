
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Download, ArrowRight, ShoppingCart, BookOpen } from "lucide-react";

const MarketplaceSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderDetails = location.state || { 
    orderNumber: Math.floor(Math.random() * 1000000),
    items: [],
    total: 0
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // If no order details, redirect to marketplace
    if (!location.state) {
      setTimeout(() => {
        navigate("/marketplace");
      }, 5000);
    }
  }, [location.state, navigate]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4 mt-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <CardTitle className="text-3xl">Thank You For Your Purchase!</CardTitle>
            <CardDescription>
              Your order has been successfully placed and is being processed.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-secondary/30 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="font-medium">{orderDetails.orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{formatDate(new Date())}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="font-medium">${orderDetails.total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p className="font-medium">Credit Card</p>
                </div>
              </div>
            </div>
            
            {orderDetails.items && orderDetails.items.length > 0 ? (
              <div className="space-y-4">
                <h3 className="font-medium">Order Items</h3>
                {orderDetails.items.map((item: any, index: number) => (
                  <div key={index} className="flex items-center space-x-4 border-b pb-4 last:border-0">
                    <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">Digital Product</p>
                    </div>
                    <div className="text-right">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-3.5 w-3.5" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No items in your order</p>
              </div>
            )}
            
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-sm space-y-2">
              <p className="font-medium">What happens next?</p>
              <p>
                You'll receive an email confirmation with your order details and download links.
                Digital products are available for immediate download from your account dashboard.
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row items-center gap-3 justify-between">
            <Button 
              variant="outline" 
              onClick={() => navigate("/marketplace")}
              className="w-full sm:w-auto gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Continue Shopping
            </Button>
            
            <Button 
              onClick={() => navigate("/profile")}
              className="w-full sm:w-auto gap-2"
            >
              <BookOpen className="h-4 w-4" />
              My Purchases
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default MarketplaceSuccess;
