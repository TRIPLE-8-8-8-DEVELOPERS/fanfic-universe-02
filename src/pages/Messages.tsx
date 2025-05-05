
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Search, MoreHorizontal, Phone, Video, Info, ChevronLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MessageList from "@/components/messaging/MessageList";
import ConversationHeader from "@/components/messaging/ConversationHeader";
import EmptyConversation from "@/components/messaging/EmptyConversation";
import { useToast } from "@/hooks/use-toast";
import { mockConversations, findConversationById } from "@/data/mockMessagingData";
import { useAuth } from "@/contexts/AuthContext";
import { ConversationType } from "@/types/messaging";
import { getConversations, sendMessage, markMessagesAsRead } from "@/integrations/supabase/services/messages";

const Messages = () => {
  const { conversationId } = useParams();
  const { user, profile, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [activeConversation, setActiveConversation] = useState<ConversationType | null>(
    conversationId ? findConversationById(conversationId) : null
  );
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [showConversation, setShowConversation] = useState(!!conversationId);
  const { toast } = useToast();

  // Handle authentication
  useEffect(() => {
    if (isLoading) return;
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "You need to sign in to access messages",
      });
      navigate("/auth");
    }
  }, [isAuthenticated, isLoading, navigate, toast]);

  // Load real conversations from Supabase
  useEffect(() => {
    const loadConversations = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await getConversations(user.id);
        if (error) throw error;
        
        if (data && data.length > 0) {
          setConversations(data);
        } else {
          // Fallback to mock data if no real conversations exist
          setConversations(mockConversations);
        }
      } catch (error) {
        console.error("Error loading conversations:", error);
        toast({
          title: "Error",
          description: "Failed to load conversations",
        });
        // Fallback to mock data
        setConversations(mockConversations);
      }
    };
    
    if (user) {
      loadConversations();
    }
  }, [user, toast]);

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update active conversation when URL param changes
  useEffect(() => {
    if (conversationId) {
      // First try to find in real conversations
      let conversation = conversations.find(c => c.id === conversationId);
      
      // If not found, try mock data
      if (!conversation) {
        conversation = findConversationById(conversationId);
      }
      
      setActiveConversation(conversation);
      setShowConversation(true);
      
      // Mark messages as read
      if (user && conversation) {
        markMessagesAsRead(user.id, conversationId);
      }
    } else {
      setShowConversation(false);
    }
  }, [conversationId, conversations, user]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!messageText.trim() || !user || !activeConversation) return;
    
    // In a real app with Supabase
    if (user) {
      try {
        const { error } = await sendMessage(user.id, activeConversation.id, messageText);
        if (error) throw error;
        
        // Update the conversation list
        const updatedConversations = conversations.map(conv => {
          if (conv.id === activeConversation.id) {
            return {
              ...conv,
              lastMessage: messageText,
              time: new Date().toLocaleString(),
              messages: [
                ...conv.messages,
                {
                  id: Date.now().toString(),
                  content: messageText,
                  timestamp: new Date().toISOString(),
                  isSelf: true,
                  read: false
                }
              ]
            };
          }
          return conv;
        });
        
        setConversations(updatedConversations);
        setActiveConversation(prevConv => {
          if (!prevConv) return null;
          
          return {
            ...prevConv,
            lastMessage: messageText,
            time: new Date().toLocaleString(),
            messages: [
              ...prevConv.messages,
              {
                id: Date.now().toString(),
                content: messageText,
                timestamp: new Date().toISOString(),
                isSelf: true,
                read: false
              }
            ]
          };
        });
        
        toast({
          title: "Message sent",
          description: "Your message has been sent successfully.",
        });
      } catch (error) {
        console.error("Error sending message:", error);
        toast({
          title: "Error",
          description: "Failed to send message",
        });
      }
    }
    
    setMessageText("");
  };

  // Handle key press in message input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow pt-20">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Messages</h1>
            {profile && (
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">Logged in as:</span>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profile.avatar_url} alt={profile.display_name || profile.username} />
                  <AvatarFallback>
                    {(profile.display_name || profile.username || "")
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{profile.display_name || profile.username}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-6 bg-card rounded-xl shadow-sm overflow-hidden border">
            {/* Conversations sidebar - hidden on mobile when a conversation is open */}
            <div 
              className={`${
                isMobileView && showConversation ? "hidden" : "flex flex-col"
              } w-full md:w-1/3 lg:w-1/4 border-r`}
            >
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search messages..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <Tabs defaultValue="all" className="w-full">
                <div className="px-4 pt-4">
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="all">All Messages</TabsTrigger>
                    <TabsTrigger value="unread">Unread</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="all" className="mt-2">
                  <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
                    {filteredConversations.length > 0 ? (
                      filteredConversations.map((conversation) => (
                        <Link
                          key={conversation.id}
                          to={`/messages/${conversation.id}`}
                          className={`flex items-center gap-3 p-4 hover:bg-muted transition-colors ${
                            activeConversation?.id === conversation.id
                              ? "bg-muted"
                              : ""
                          } ${conversation.unread ? "font-medium" : ""}`}
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                            <AvatarFallback>
                              {conversation.user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-grow min-w-0">
                            <div className="flex justify-between items-baseline">
                              <span className="truncate">{conversation.user.name}</span>
                              <span className="text-xs text-muted-foreground shrink-0">
                                {conversation.time}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {conversation.lastMessage}
                            </p>
                          </div>
                          {conversation.unread && (
                            <span className="w-2.5 h-2.5 bg-primary rounded-full shrink-0" />
                          )}
                        </Link>
                      ))
                    ) : (
                      <div className="p-8 text-center text-muted-foreground">
                        No conversations found
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="unread" className="mt-2">
                  <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
                    {filteredConversations.filter(c => c.unread).length > 0 ? (
                      filteredConversations
                        .filter((conversation) => conversation.unread)
                        .map((conversation) => (
                          <Link
                            key={conversation.id}
                            to={`/messages/${conversation.id}`}
                            className={`flex items-center gap-3 p-4 hover:bg-muted transition-colors ${
                              activeConversation?.id === conversation.id
                                ? "bg-muted"
                                : ""
                            } font-medium`}
                          >
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                              <AvatarFallback>
                                {conversation.user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-grow min-w-0">
                              <div className="flex justify-between items-baseline">
                                <span className="truncate">{conversation.user.name}</span>
                                <span className="text-xs text-muted-foreground shrink-0">
                                  {conversation.time}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground truncate">
                                {conversation.lastMessage}
                              </p>
                            </div>
                            <span className="w-2.5 h-2.5 bg-primary rounded-full shrink-0" />
                          </Link>
                        ))
                    ) : (
                      <div className="p-8 text-center text-muted-foreground">
                        No unread messages
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Conversation area */}
            <div 
              className={`${
                isMobileView && !showConversation ? "hidden" : "flex flex-col"
              } flex-grow bg-background`}
            >
              {activeConversation ? (
                <>
                  <ConversationHeader 
                    conversation={activeConversation}
                    onBack={() => setShowConversation(false)}
                    isMobileView={isMobileView} 
                  />
                  
                  <MessageList conversation={activeConversation} />
                  
                  <div className="p-4 border-t mt-auto">
                    <div className="flex items-end gap-2">
                      <Textarea
                        placeholder="Type a message..."
                        className="min-h-[60px] resize-none"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={handleKeyPress}
                      />
                      <Button 
                        size="icon" 
                        className="rounded-full h-10 w-10 shrink-0"
                        onClick={handleSendMessage}
                        disabled={!messageText.trim()}
                      >
                        <Send size={18} />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <EmptyConversation />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Messages;
