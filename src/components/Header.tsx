import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  BookOpen,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  Settings,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { getUnreadNotificationCount } from "@/integrations/supabase/services/notifications";
import { getUnreadMessageCount } from "@/integrations/supabase/services/messages";
import SearchCommand from "@/components/SearchCommand";

const Header: React.FC = () => {
  const { user, profile, isAuthenticated, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    // Get notification count
    const fetchNotificationCount = async () => {
      try {
        const { count, error } = await getUnreadNotificationCount(user.id);
        if (!error && count !== null) {
          setUnreadNotifications(count);
        }
      } catch (error) {
        console.error("Error fetching notification count:", error);
      }
    };

    // Get message count
    const fetchMessageCount = async () => {
      try {
        const { count, error } = await getUnreadMessageCount(user.id);
        if (!error && count !== null) {
          setUnreadMessages(count);
        }
      } catch (error) {
        console.error("Error fetching message count:", error);
      }
    };

    fetchNotificationCount();
    fetchMessageCount();

    // Set up realtime subscriptions
    const notificationsChannel = supabase
      .channel('notifications-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications'
        },
        (payload) => {
          fetchNotificationCount();
        }
      )
      .subscribe();

    const messagesChannel = supabase
      .channel('messages-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages'
        },
        (payload) => {
          fetchMessageCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(notificationsChannel);
      supabase.removeChannel(messagesChannel);
    };
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Add a toggle button to hide the header
  const toggleHeaderVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {isVisible && (
        <header className="fixed top-0 left-0 w-full bg-background border-b z-50">
          <div className="container flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-4 md:gap-6">
              <Link to="/" className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl hidden md:block">FANVERSE</span>
              </Link>

              <nav className="hidden md:flex items-center gap-6">
                <Link to="/" className="text-base font-medium hover:text-primary">
                  Home
                </Link>
                <Link to="/explore" className="text-base font-medium hover:text-primary">
                  Explore
                </Link>
                <Link to="/trending" className="text-base font-medium hover:text-primary">
                  Trending
                </Link>
                <Link to="/communities" className="text-base font-medium hover:text-primary">
                  Communities
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="relative hidden md:flex"
                aria-label="Search"
              >
                <Search className="h-[1.2rem] w-[1.2rem]" />
                <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 text-[10px] font-medium opacity-50 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>

              {/* Mobile search button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="md:hidden"
                aria-label="Search"
              >
                <Search className="h-[1.2rem] w-[1.2rem]" />
              </Button>

              {/* Search command dialog */}
              <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />

              {isAuthenticated ? (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden md:flex relative"
                    asChild
                    aria-label="Messages"
                  >
                    <Link to="/messages">
                      <MessageSquare className="h-[1.2rem] w-[1.2rem]" />
                      {unreadMessages > 0 && (
                        <Badge
                          variant="destructive"
                          className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs"
                        >
                          {unreadMessages > 9 ? '9+' : unreadMessages}
                        </Badge>
                      )}
                    </Link>
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden md:flex relative"
                    asChild
                    aria-label="Notifications"
                  >
                    <Link to="/notifications">
                      <Bell className="h-[1.2rem] w-[1.2rem]" />
                      {unreadNotifications > 0 && (
                        <Badge
                          variant="destructive"
                          className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs"
                        >
                          {unreadNotifications > 9 ? '9+' : unreadNotifications}
                        </Badge>
                      )}
                    </Link>
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={profile?.avatar_url}
                            alt={profile?.username || "User"}
                          />
                          <AvatarFallback>
                            {profile?.username?.[0]?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      {profile && (
                        <>
                          <div className="flex items-center justify-start gap-2 p-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage 
                                src={profile.avatar_url} 
                                alt={profile.username} 
                              />
                              <AvatarFallback>
                                {profile.username?.[0]?.toUpperCase() || "U"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col space-y-1 leading-none">
                              <p className="font-medium">
                                {profile.display_name || profile.username}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                @{profile.username}
                              </p>
                            </div>
                          </div>
                          <DropdownMenuSeparator />
                        </>
                      )}
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/friends" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          <span>Friends</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/write" className="cursor-pointer">
                          <BookOpen className="mr-2 h-4 w-4" />
                          <span>Write</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard" className="cursor-pointer">
                          <BookOpen className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/settings" className="cursor-pointer">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Button variant="ghost" asChild>
                    <Link to="/auth?mode=login">Sign in</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/auth?mode=register">Get Started</Link>
                  </Button>
                </div>
              )}

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleHeaderVisibility}
                aria-label="Toggle Header Visibility"
              >
                {isVisible ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t px-4 py-4 bg-background">
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className="px-4 py-2 hover:bg-muted rounded-md"
                  onClick={toggleMobileMenu}
                >
                  Home
                </Link>
                <Link
                  to="/explore"
                  className="px-4 py-2 hover:bg-muted rounded-md"
                  onClick={toggleMobileMenu}
                >
                  Explore
                </Link>
                <Link
                  to="/trending"
                  className="px-4 py-2 hover:bg-muted rounded-md"
                  onClick={toggleMobileMenu}
                >
                  Trending
                </Link>
                <Link
                  to="/communities"
                  className="px-4 py-2 hover:bg-muted rounded-md"
                  onClick={toggleMobileMenu}
                >
                  Communities
                </Link>
                <Link
                  to="/search"
                  className="px-4 py-2 hover:bg-muted rounded-md"
                  onClick={toggleMobileMenu}
                >
                  Search
                </Link>
                {isAuthenticated ? (
                  <>
                    <div className="pt-2 border-t">
                      <Link
                        to="/messages"
                        className="flex items-center px-4 py-2 hover:bg-muted rounded-md"
                        onClick={toggleMobileMenu}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Messages
                        {unreadMessages > 0 && (
                          <Badge variant="destructive" className="ml-2">
                            {unreadMessages}
                          </Badge>
                        )}
                      </Link>
                      <Link
                        to="/notifications"
                        className="flex items-center px-4 py-2 hover:bg-muted rounded-md"
                        onClick={toggleMobileMenu}
                      >
                        <Bell className="h-4 w-4 mr-2" />
                        Notifications
                        {unreadNotifications > 0 && (
                          <Badge variant="destructive" className="ml-2">
                            {unreadNotifications}
                          </Badge>
                        )}
                      </Link>
                      <Link
                        to="/friends"
                        className="flex items-center px-4 py-2 hover:bg-muted rounded-md"
                        onClick={toggleMobileMenu}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Friends
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 hover:bg-muted rounded-md"
                        onClick={toggleMobileMenu}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      <Link
                        to="/write"
                        className="flex items-center px-4 py-2 hover:bg-muted rounded-md"
                        onClick={toggleMobileMenu}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Write
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 hover:bg-muted rounded-md"
                        onClick={toggleMobileMenu}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          handleSignOut();
                          toggleMobileMenu();
                        }}
                        className="flex w-full items-center px-4 py-2 hover:bg-muted rounded-md"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Log out
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="pt-2 border-t space-y-2">
                    <Button asChild className="w-full">
                      <Link to="/auth?mode=login" onClick={toggleMobileMenu}>
                        Sign in
                      </Link>
                    </Button>
                    <Button asChild variant="secondary" className="w-full">
                      <Link to="/auth?mode=register" onClick={toggleMobileMenu}>
                        Get Started
                      </Link>
                    </Button>
                  </div>
                )}
              </nav>
            </div>
          )}
        </header>
      )}
      {!isVisible && (
        <button
          onClick={toggleHeaderVisibility}
          className="fixed top-2 right-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-full shadow-lg hover:from-purple-600 hover:to-indigo-600 hover:shadow-xl transition-all duration-300 z-50"
        >
          Dashboard
        </button>
      )}
    </>
  );
};

export default Header;
