
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80 px-4 py-8">
      <div className="text-center max-w-md w-full bg-card/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-border/50 animate-fade-in">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent">404</h1>
        <p className="text-xl text-foreground mb-6">Oops! This page seems to be lost in the multiverse</p>
        <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Button asChild size="lg" className="w-full sm:w-auto px-8 gap-2 bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-700 text-white shadow-md">
          <Link to="/">
            <Home className="h-4 w-4" />
            <span>Return to Home</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
