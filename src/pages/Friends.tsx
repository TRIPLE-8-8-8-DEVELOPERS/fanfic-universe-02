
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, Users } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FriendItem from "@/components/FriendItem";
import { toast } from "sonner";
import { 
  getFriendRequests,
  getSentFriendRequests,
  getFriends
} from "@/integrations/supabase/services/friends";
import { supabase } from "@/integrations/supabase/client";

interface Friend {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  avatarUrl: string;
}

interface FriendRequest {
  id: string;
  senderId: string;
  senderName: string;
  senderUsername: string;
  senderAvatar: string;
  status: string;
  createdAt: string;
}

const Friends = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [friends, setFriends] = useState<Friend[]>([]);
  const [pendingRequests, setPendingRequests] = useState<FriendRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<FriendRequest[]>([]);
  const [searchResults, setSearchResults] = useState<Friend[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  useEffect(() => {
    if (isLoading) return;
    
    if (!isAuthenticated) {
      toast.error("You must be logged in to view this page");
      navigate("/auth");
      return;
    }
    
    loadFriends();
    loadFriendRequests();
    loadSentRequests();
  }, [isAuthenticated, isLoading, navigate]);
  
  const loadFriends = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await getFriends(user.id);
      if (error) throw error;
      
      setFriends(data || []);
    } catch (error) {
      console.error("Error loading friends:", error);
      toast.error("Failed to load friends");
    }
  };
  
  const loadFriendRequests = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await getFriendRequests(user.id);
      if (error) throw error;
      
      const requests = (data || []).map(request => ({
        id: request.id,
        senderId: request.sender_id,
        senderName: request.profiles.display_name || request.profiles.username,
        senderUsername: request.profiles.username,
        senderAvatar: request.profiles.avatar_url,
        status: request.status,
        createdAt: request.created_at
      }));
      
      setPendingRequests(requests);
    } catch (error) {
      console.error("Error loading friend requests:", error);
      toast.error("Failed to load friend requests");
    }
  };
  
  const loadSentRequests = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await getSentFriendRequests(user.id);
      if (error) throw error;
      
      const requests = (data || []).map(request => ({
        id: request.id,
        senderId: request.receiver_id,
        senderName: request.profiles.display_name || request.profiles.username,
        senderUsername: request.profiles.username,
        senderAvatar: request.profiles.avatar_url,
        status: request.status,
        createdAt: request.created_at
      }));
      
      setSentRequests(requests);
    } catch (error) {
      console.error("Error loading sent requests:", error);
      toast.error("Failed to load sent requests");
    }
  };
  
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, display_name, avatar_url')
        .or(`username.ilike.%${searchQuery}%,display_name.ilike.%${searchQuery}%`)
        .limit(10);
      
      if (error) throw error;
      
      // Filter out current user and existing friends
      const filtered = (data || [])
        .filter(profile => profile.id !== user?.id)
        .filter(profile => !friends.some(friend => friend.userId === profile.id))
        .map(profile => ({
          id: '',
          userId: profile.id,
          username: profile.username,
          displayName: profile.display_name || profile.username,
          avatarUrl: profile.avatar_url
        }));
      
      setSearchResults(filtered);
    } catch (error) {
      console.error("Error searching users:", error);
      toast.error("Failed to search users");
    } finally {
      setIsSearching(false);
    }
  };
  
  const handleRequestAccepted = () => {
    loadFriendRequests();
    loadFriends();
  };
  
  const handleRequestRejected = () => {
    loadFriendRequests();
  };
  
  // Fixed the click method error by changing document.querySelector('[data-value="add"]')?.click()
  // to use a ref and programmatic navigation instead
  const navigateToAddFriends = () => {
    const addTab = document.querySelector('[data-value="add"]') as HTMLElement;
    if (addTab) {
      addTab.dispatchEvent(new Event('click', { bubbles: true }));
    }
  };

  return (
    <>
      <Header />
      <main className="container py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Friends</h1>
          <p className="text-muted-foreground">
            Connect with other users and manage your friend requests
          </p>
        </div>
        
        <Tabs defaultValue="friends" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="friends">
              <Users className="h-4 w-4 mr-2" />
              All Friends
              {friends.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {friends.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="pending">
              <UserPlus className="h-4 w-4 mr-2" />
              Requests
              {pendingRequests.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {pendingRequests.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="add">
              <Search className="h-4 w-4 mr-2" />
              Add Friends
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="friends" className="space-y-4">
            {friends.length > 0 ? (
              <div className="border rounded-lg overflow-hidden">
                {friends.map(friend => (
                  <FriendItem
                    key={friend.userId}
                    userId={friend.userId}
                    username={friend.username}
                    displayName={friend.displayName}
                    avatarUrl={friend.avatarUrl}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <UserPlus className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No friends yet</h3>
                <p className="text-muted-foreground mb-6">
                  Search for users to add them as friends
                </p>
                <Button onClick={navigateToAddFriends}>
                  Find Friends
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-4">
            {pendingRequests.length > 0 ? (
              <>
                <h3 className="text-lg font-medium mb-2">Friend Requests</h3>
                <div className="border rounded-lg overflow-hidden">
                  {pendingRequests.map(request => (
                    <FriendItem
                      key={request.id}
                      id={request.id}
                      userId={request.senderId}
                      username={request.senderUsername}
                      displayName={request.senderName}
                      avatarUrl={request.senderAvatar}
                      isPending={true}
                      onAccept={handleRequestAccepted}
                      onReject={handleRequestRejected}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No pending friend requests</p>
              </div>
            )}
            
            {sentRequests.length > 0 && (
              <>
                <h3 className="text-lg font-medium mt-8 mb-2">Sent Requests</h3>
                <div className="border rounded-lg overflow-hidden">
                  {sentRequests
                    .filter(request => request.status === 'pending')
                    .map(request => (
                      <FriendItem
                        key={request.id}
                        userId={request.senderId}
                        username={request.senderUsername}
                        displayName={request.senderName}
                        avatarUrl={request.senderAvatar}
                        isSentRequest={true}
                      />
                    ))}
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="add" className="space-y-6">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by username or name..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} disabled={isSearching}>
                Search
              </Button>
            </div>
            
            {searchResults.length > 0 ? (
              <div className="border rounded-lg overflow-hidden">
                {searchResults.map(result => (
                  <FriendItem
                    key={result.userId}
                    userId={result.userId}
                    username={result.username}
                    displayName={result.displayName}
                    avatarUrl={result.avatarUrl}
                    isSearch={true}
                  />
                ))}
              </div>
            ) : (
              searchQuery && !isSearching && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No users found matching "{searchQuery}"</p>
                </div>
              )
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </>
  );
};

export default Friends;
