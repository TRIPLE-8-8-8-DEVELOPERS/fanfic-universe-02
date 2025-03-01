import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Bell, User, BookOpen, PenTool, BookMarked, Sparkles, Star, Clock, Compass, Heart, TrendingUp, FileText, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(3);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const location = useLocation();
  const navigate = useNavigate();

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
    setSearchOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleThemeChange = (value: string) => {
    setTheme(value as 'light' | 'dark' | 'system');
    document.documentElement.classList.toggle('dark', value === 'dark');
  };

  const primaryNavLinks = [
    { name: 'Browse', path: '/browse', icon: BookOpen },
    { name: 'Write', path: '/write', icon: PenTool },
    { name: 'Explore', path: '/explore', icon: Compass }
  ];

  const moreNavLinks = [
    { name: 'Reading Lists', path: '/reading-lists', icon: BookMarked },
    { name: 'Trending', path: '/trending', icon: TrendingUp },
    { name: 'Contests', path: '/contests', icon: Trophy, badge: 'New' },
    { name: 'Communities', path: '/communities', icon: Heart }
  ];

  const quickLinks = [
    { name: 'Continue Reading', description: 'Resume where you left off', path: '/story/last-read', icon: Clock },
    { name: 'New Releases', description: 'Fresh stories from your favorite authors', path: '/new-releases', icon: Sparkles },
    { name: 'Top Picks', description: 'Curated by our editors', path: '/top-picks', icon: Star },
  ];

  const notificationItems = [
    { title: 'New comment on your story', time: '2 minutes ago', type: 'comment' },
    { title: 'ChapterMaster liked your story', time: '1 hour ago', type: 'like' },
    { title: 'Writing contest ending soon', time: '5 hours ago', type: 'alert' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
    }
  };

  const handleNavLinkClick = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-sm py-3' 
          : 'bg-background py-5'
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link 
          to="/" 
          className="font-serif text-2xl font-bold text-primary transition-all hover:opacity-80 relative group"
        >
          FanFic
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Universe</span>
          <motion.span 
            className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-blue-600 to-purple-600" 
            initial={{ width: "0%" }}
            animate={{ width: isActive('/') ? "100%" : "0%" }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-2">
          {primaryNavLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-colors relative ${
                isActive(link.path) 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
              }`}
            >
              <link.icon size={16} />
              {link.name}
              {isActive(link.path) && (
                <motion.span 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                  layoutId="navIndicator"
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="rounded-full flex items-center gap-1 h-9 px-3">
                <span className="text-sm">More</span>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2 z-[100] dropdown-menu">
              {moreNavLinks.map((link) => (
                <DropdownMenuItem key={link.name} asChild>
                  <Link to={link.path} className="flex items-center gap-2 cursor-pointer w-full dropdown-item">
                    <link.icon size={16} />
                    <span>{link.name}</span>
                    {link.badge && (
                      <Badge variant="outline" className="ml-auto bg-blue-50 text-blue-700 border-blue-200 text-[10px] px-1.5 py-0 h-4">
                        {link.badge}
                      </Badge>
                    )}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <AnimatePresence>
          {searchOpen && (
            <motion.form 
              className="absolute inset-x-0 top-0 bg-white dark:bg-black shadow-md py-3 px-4 flex items-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSearch}
            >
              <Search size={18} className="text-muted-foreground mr-2" />
              <input 
                type="text" 
                placeholder="Search stories, authors, genres..." 
                className="flex-1 bg-transparent border-none outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <Button type="button" variant="ghost" size="icon" className="rounded-full" onClick={() => setSearchOpen(false)}>
                <X size={18} />
              </Button>
              <Button type="submit" variant="ghost" size="sm" className="ml-2">
                Search
              </Button>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="hidden md:flex items-center gap-1">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setSearchOpen(true)}>
            <Search size={18} />
          </Button>

          <div className="border rounded-full p-1 mx-1">
            <Tabs defaultValue={theme} onValueChange={handleThemeChange}>
              <TabsList className="h-7 p-0.5 bg-transparent">
                <TabsTrigger value="light" className="h-6 w-6 p-0 rounded-full data-[state=active]:bg-blue-100">
                  <Sun size={14} className="text-blue-700" />
                </TabsTrigger>
                <TabsTrigger value="dark" className="h-6 w-6 p-0 rounded-full data-[state=active]:bg-blue-100">
                  <Moon size={14} className="text-blue-700" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <Bell size={18} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    {notifications}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 z-[100] dropdown-menu">
              <DropdownMenuLabel className="flex justify-between items-center">
                <span>Notifications</span>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs text-blue-600 hover:text-blue-700">
                  Mark all as read
                </Button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notificationItems.map((item, index) => (
                <DropdownMenuItem key={index} className="flex flex-col items-start p-3 cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700 focus:bg-blue-50 dark:focus:bg-gray-700 text-gray-800 dark:text-gray-200">
                  <div className="flex w-full">
                    <div className="mr-3 mt-0.5">
                      {item.type === 'comment' && <MessageSquare size={16} className="text-blue-500" />}
                      {item.type === 'like' && <Heart size={16} className="text-red-500" />}
                      {item.type === 'alert' && <Zap size={16} className="text-amber-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/notifications" className="flex justify-center cursor-pointer py-2 text-sm text-blue-600 hover:text-blue-700">
                  View all notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 p-0">
                <Avatar className="h-8 w-8 border-2 border-primary/20">
                  <AvatarImage src="https://i.pravatar.cc/100" />
                  <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 z-[100] dropdown-menu">
              <div className="p-2">
                <div className="flex items-center gap-3 p-2">
                  <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/100" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Jane Doe</p>
                    <p className="text-xs text-muted-foreground">@janedoe</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1 mt-2">
                  <div className="p-2 rounded-lg bg-primary/5 text-center">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">12</p>
                    <p className="text-xs text-muted-foreground">Stories</p>
                  </div>
                  <div className="p-2 rounded-lg bg-primary/5 text-center">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">1.2k</p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator />
              <div className="p-2">
                <p className="text-xs font-medium text-muted-foreground px-2 py-1.5">Quick Links</p>
                {quickLinks.map((link, i) => (
                  <DropdownMenuItem key={i} asChild>
                    <Link to={link.path} className="cursor-pointer text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <div className="flex items-start gap-2">
                        <link.icon size={16} className="mt-0.5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">{link.name}</p>
                          <p className="text-xs text-muted-foreground">{link.description}</p>
                        </div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <User size={16} className="mr-2" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard" className="cursor-pointer text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <FileText size={16} className="mr-2" />
                  My Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Settings size={16} className="mr-2" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                <LogOut size={16} className="mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/sign-in">
            <Button variant="default" className="rounded-full px-6 ml-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600">
              Sign In
            </Button>
          </Link>
        </div>

        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden rounded-full"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="absolute top-full left-0 right-0 bg-white dark:bg-black shadow-lg p-4 md:hidden z-[90]"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 p-4 border-b">
                <Avatar>
                  <AvatarImage src="https://i.pravatar.cc/100" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Jane Doe</p>
                  <p className="text-xs text-muted-foreground">@janedoe</p>
                </div>
                <Link to="/profile">
                  <Button variant="outline" size="sm" className="h-8 rounded-full">Profile</Button>
                </Link>
              </div>
              
              <div className="py-3 border-b">
                <form onSubmit={handleSearch} className="flex items-center bg-muted/40 rounded-lg p-2 mb-3">
                  <Search size={16} className="text-muted-foreground ml-1 mr-2" />
                  <input 
                    type="text" 
                    placeholder="Search stories, authors, genres..." 
                    className="flex-1 bg-transparent border-none outline-none text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button type="submit" variant="ghost" size="sm" className="text-xs">
                    Search
                  </Button>
                </form>
                <nav className="flex flex-col space-y-1">
                  {primaryNavLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`flex items-center gap-2 text-base font-medium transition-colors p-2 rounded-md ${
                        isActive(link.path) 
                          ? 'text-primary bg-primary/10' 
                          : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      <link.icon size={18} />
                      {link.name}
                    </Link>
                  ))}
                  {moreNavLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="flex items-center gap-2 text-base font-medium text-muted-foreground hover:text-primary transition-colors p-2 rounded-md"
                    >
                      <link.icon size={18} />
                      {link.name}
                      {link.badge && (
                        <Badge variant="outline" className="ml-auto bg-blue-50 text-blue-700 border-blue-200 text-[10px]">
                          {link.badge}
                        </Badge>
                      )}
                    </Link>
                  ))}
                </nav>
              </div>
              
              <div className="pt-4">
                <Link to="/sign-in">
                  <Button className="w-full rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600" size="lg">Sign In</Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;

const Sun = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2"></path>
    <path d="M12 20v2"></path>
    <path d="m4.93 4.93 1.41 1.41"></path>
    <path d="m17.66 17.66 1.41 1.41"></path>
    <path d="M2 12h2"></path>
    <path d="M20 12h2"></path>
    <path d="m6.34 17.66-1.41 1.41"></path>
    <path d="m19.07 4.93-1.41 1.41"></path>
  </svg>
);

const Moon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
  </svg>
);

const Settings = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const Trophy = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 9H4.5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <path d="M18 9h1.5a2 2 0 0 0 0-5H18"></path>
    <path d="M4 22h16"></path>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
  </svg>
);

const LogOut = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

const MessageSquare = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);
