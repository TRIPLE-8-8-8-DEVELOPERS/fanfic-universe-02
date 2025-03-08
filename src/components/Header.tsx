
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Search, Bell, User, BookOpen, PenTool, LogOut, MessageSquare, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, profile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Error signing out");
    }
  };

  const getInitials = () => {
    if (profile?.display_name) {
      return profile.display_name.split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    
    return "U";
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b",
        isScrolled 
          ? "bg-background/90 backdrop-blur-md shadow-sm h-14" 
          : "bg-background/80 backdrop-blur-sm h-16"
      )}
    >
      <div className="container h-full mx-auto px-3 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <SidebarTrigger 
              className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-secondary/80"
            />
          </div>
          
          <Link to="/" className="flex items-center gap-2">
            <div className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 p-1.5 flex items-center justify-center">
              <BookOpen className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-gradient text-xl font-bold font-serif hidden xs:inline">FanVerse</span>
          </Link>
          
          <nav className="hidden md:flex items-center ml-6 space-x-1">
            <Link to="/browse">
              <Button variant="ghost" size="sm" className="text-sm font-medium hover:bg-secondary/80">
                Browse
              </Button>
            </Link>
            <Link to="/popular">
              <Button variant="ghost" size="sm" className="text-sm font-medium hover:bg-secondary/80">
                Popular
              </Button>
            </Link>
            <Link to="/communities">
              <Button variant="ghost" size="sm" className="text-sm font-medium hover:bg-secondary/80">
                Communities
              </Button>
            </Link>
            <Link to="/jobs">
              <Button variant="ghost" size="sm" className="text-sm font-medium hover:bg-secondary/80">
                Jobs
              </Button>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hidden sm:flex">
            <Search className="h-4 w-4" />
          </Button>
          
          {isAuthenticated ? (
            <>
              <Link to="/messages">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hidden sm:flex relative">
                  <MessageSquare className="h-4 w-4" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </Button>
              </Link>
              
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hidden sm:flex relative">
                <Bell className="h-4 w-4" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full"></span>
              </Button>
              
              <Link to="/write">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hidden sm:flex h-8 hover:bg-secondary/80"
                >
                  <PenTool className="h-4 w-4 mr-1.5" />
                  <span>Write</span>
                </Button>
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="h-8 w-8 p-0 rounded-full overflow-hidden border border-muted hover:border-primary transition-colors"
                  >
                    <Avatar className="h-full w-full">
                      <AvatarImage src={profile?.avatar_url} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 animate-fade-in dropdown-menu">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{profile?.display_name || "User"}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="dropdown-item">
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="dropdown-item">
                    <Link to="/reading-lists" className="cursor-pointer">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Reading Lists
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="dropdown-item">
                    <Link to="/write" className="cursor-pointer">
                      <PenTool className="mr-2 h-4 w-4" />
                      Write
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="dropdown-item cursor-pointer text-red-500 focus:text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/auth" className="hidden sm:block">
                <Button variant="ghost" size="sm" className="h-8 font-medium">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth?tab=signup" className="hidden sm:block">
                <Button 
                  size="sm" 
                  className="h-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
          
          <Button variant="ghost" size="icon" className="sm:hidden h-8 w-8 rounded-md" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="sm:hidden px-4 py-3 border-t bg-background/95 backdrop-blur-md animate-fade-in">
          <nav className="flex flex-col space-y-2">
            <Link to="/browse" className="flex items-center py-2 hover:text-primary" onClick={toggleMenu}>
              Browse
            </Link>
            <Link to="/popular" className="flex items-center py-2 hover:text-primary" onClick={toggleMenu}>
              Popular
            </Link>
            <Link to="/communities" className="flex items-center py-2 hover:text-primary" onClick={toggleMenu}>
              Communities
            </Link>
            <Link to="/jobs" className="flex items-center py-2 hover:text-primary" onClick={toggleMenu}>
              Jobs
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/write" className="flex items-center py-2 hover:text-primary" onClick={toggleMenu}>
                  <PenTool className="mr-2 h-4 w-4" />
                  Write
                </Link>
                <Link to="/reading-lists" className="flex items-center py-2 hover:text-primary" onClick={toggleMenu}>
                  <Bookmark className="mr-2 h-4 w-4" />
                  Reading Lists
                </Link>
                <Link to="/profile" className="flex items-center py-2 hover:text-primary" onClick={toggleMenu}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
                <button 
                  onClick={() => { handleSignOut(); toggleMenu(); }}
                  className="flex items-center py-2 text-red-500 hover:text-red-400 w-full text-left"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Link 
                  to="/auth" 
                  className="w-full flex justify-center py-2 px-4 border border-muted rounded-md hover:bg-secondary/80 transition-colors"
                  onClick={toggleMenu}
                >
                  Sign In
                </Link>
                <Link 
                  to="/auth?tab=signup" 
                  className="w-full flex justify-center py-2 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md hover:from-purple-700 hover:to-indigo-700 transition-colors"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
