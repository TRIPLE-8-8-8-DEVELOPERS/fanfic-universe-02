
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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

const Messages = () => {
  const { conversationId } = useParams();
  const [activeConversation, setActiveConversation] = useState(
    conversationId ? findConversationById(conversationId) : null
  );
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [showConversation, setShowConversation] = useState(!!conversationId);
  const { toast } = useToast();

  // Filter conversations based on search query
  const filteredConversations = mockConversations.filter(
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
      const conversation = findConversationById(conversationId);
      setActiveConversation(conversation);
      setShowConversation(true);
    } else {
      setShowConversation(false);
    }
  }, [conversationId]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    // In a real app, this would send the message to an API
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully.",
    });
    
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
          <h1 className="text-3xl font-bold mb-6">Messages</h1>

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
