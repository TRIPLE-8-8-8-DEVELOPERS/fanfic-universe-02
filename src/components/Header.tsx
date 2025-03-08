
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Search, Bell, User, BookOpen, PenTool, LogOut } from "lucide-react";
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
import { useToast } from "@/components/ui/use-toast";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
      });
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error signing out",
        variant: "destructive",
      });
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
    <header className="fixed w-full bg-background/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="md:hidden mr-2">
              <SidebarTrigger />
            </div>
            <Link to="/" className="text-xl font-bold mr-8">
              FanVerse
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link to="/browse" className="text-sm font-medium hover:text-primary">
                Browse
              </Link>
              <Link to="/popular" className="text-sm font-medium hover:text-primary">
                Popular
              </Link>
              <Link to="/communities" className="text-sm font-medium hover:text-primary">
                Communities
              </Link>
              <Link to="/jobs" className="text-sm font-medium hover:text-primary">
                Jobs
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <Bell className="h-5 w-5" />
                </Button>
                
                <Link to="/write">
                  <Button variant="ghost" size="sm" className="hidden md:flex">
                    <PenTool className="h-4 w-4 mr-2" />
                    Write
                  </Button>
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={profile?.avatar_url} />
                        <AvatarFallback>{getInitials()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{profile?.username || user?.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/reading-lists" className="cursor-pointer">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Reading Lists
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/write" className="cursor-pointer">
                        <PenTool className="mr-2 h-4 w-4" />
                        Write
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/auth" className="hidden md:block">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth?tab=signup" className="hidden md:block">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
            
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/browse" className="text-sm font-medium hover:text-primary" onClick={toggleMenu}>
                Browse
              </Link>
              <Link to="/popular" className="text-sm font-medium hover:text-primary" onClick={toggleMenu}>
                Popular
              </Link>
              <Link to="/communities" className="text-sm font-medium hover:text-primary" onClick={toggleMenu}>
                Communities
              </Link>
              <Link to="/jobs" className="text-sm font-medium hover:text-primary" onClick={toggleMenu}>
                Jobs
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/write" className="text-sm font-medium hover:text-primary" onClick={toggleMenu}>
                    Write
                  </Link>
                  <Link to="/reading-lists" className="text-sm font-medium hover:text-primary" onClick={toggleMenu}>
                    Reading Lists
                  </Link>
                  <Link to="/profile" className="text-sm font-medium hover:text-primary" onClick={toggleMenu}>
                    Profile
                  </Link>
                  <Button variant="ghost" className="justify-start px-0" onClick={() => { handleSignOut(); toggleMenu(); }}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth" className="text-sm font-medium hover:text-primary" onClick={toggleMenu}>
                    Sign In
                  </Link>
                  <Link to="/auth?tab=signup" onClick={toggleMenu}>
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
