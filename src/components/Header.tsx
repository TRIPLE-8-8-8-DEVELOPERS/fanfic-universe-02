
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Bell, User, BookOpen, PenTool } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Browse', path: '/browse', icon: BookOpen },
    { name: 'Write', path: '/write', icon: PenTool },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="font-serif text-2xl font-bold text-primary transition-all hover:opacity-80"
        >
          FanFic<span className="text-gradient">Universe</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <link.icon size={16} />
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell size={18} />
          </Button>
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User size={18} />
            </Button>
          </Link>
          <Link to="/sign-in">
            <Button variant="default" className="rounded-full px-6">
              Sign In
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden rounded-full"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-black shadow-lg p-4 md:hidden slide-in">
            <nav className="flex flex-col space-y-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="flex items-center gap-2 text-base font-medium text-muted-foreground hover:text-primary transition-colors p-2"
                >
                  <link.icon size={18} />
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border mt-2">
                <Link to="/sign-in">
                  <Button className="w-full rounded-full" size="lg">Sign In</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
