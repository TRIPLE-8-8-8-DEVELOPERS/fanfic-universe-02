
import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UserPlus, X, Check, MessageSquare, User } from "lucide-react";
import { 
  acceptFriendRequest, 
  rejectFriendRequest,
  sendFriendRequest 
} from "@/integrations/supabase/services/friends";
import { createFriendAcceptedNotification, createFriendRequestNotification } from "@/integrations/supabase/services/notifications";
import { useAuth } from "@/contexts/AuthContext";

interface FriendItemProps {
  id?: string;
  userId: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  isPending?: boolean;
  isSentRequest?: boolean;
  isSearch?: boolean;
  onAccept?: () => void;
  onReject?: () => void;
}

const FriendItem = ({
  id,
  userId,
  username,
  displayName,
  avatarUrl,
  isPending = false,
  isSentRequest = false,
  isSearch = false,
  onAccept,
  onReject
}: FriendItemProps) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleAccept = async () => {
    if (!id) return;
    
    setIsLoading(true);
    try {
      const { error } = await acceptFriendRequest(id);
      if (error) throw error;
      
      // Create notification for the sender
      await createFriendAcceptedNotification(userId, user?.id || '');
      
      toast.success("Friend request accepted");
      if (onAccept) onAccept();
    } catch (error) {
      console.error("Error accepting friend request:", error);
      toast.error("Failed to accept friend request");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReject = async () => {
    if (!id) return;
    
    setIsLoading(true);
    try {
      const { error } = await rejectFriendRequest(id);
      if (error) throw error;
      
      toast.success("Friend request rejected");
      if (onReject) onReject();
    } catch (error) {
      console.error("Error rejecting friend request:", error);
      toast.error("Failed to reject friend request");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSendRequest = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await sendFriendRequest(user.id, userId);
      if (error) throw error;
      
      // Create notification for the receiver
      await createFriendRequestNotification(userId, user.id);
      
      toast.success("Friend request sent");
    } catch (error) {
      console.error("Error sending friend request:", error);
      toast.error("Failed to send friend request");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatarUrl} alt={displayName || username} />
          <AvatarFallback>
            {(displayName || username).split(" ").map(n => n[0]).join("").toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{displayName || username}</h3>
          <p className="text-sm text-muted-foreground">@{username}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {isPending && (
          <>
            <Button 
              size="sm" 
              onClick={handleAccept}
              disabled={isLoading}
            >
              <Check className="h-4 w-4 mr-1" />
              Accept
            </Button>
            <Button 
              size="sm"
              variant="outline"
              onClick={handleReject}
              disabled={isLoading}
            >
              <X className="h-4 w-4 mr-1" />
              Decline
            </Button>
          </>
        )}
        
        {isSentRequest && (
          <Button 
            size="sm"
            variant="outline"
            disabled
          >
            <UserPlus className="h-4 w-4 mr-1" />
            Request Sent
          </Button>
        )}
        
        {isSearch && !isPending && !isSentRequest && (
          <Button 
            size="sm"
            onClick={handleSendRequest}
            disabled={isLoading}
          >
            <UserPlus className="h-4 w-4 mr-1" />
            Add Friend
          </Button>
        )}
        
        {!isPending && !isSearch && (
          <>
            <Button 
              size="sm"
              variant="outline"
              asChild
            >
              <Link to={`/messages/${userId}`}>
                <MessageSquare className="h-4 w-4 mr-1" />
                Message
              </Link>
            </Button>
            <Button 
              size="sm"
              variant="outline"
              asChild
            >
              <Link to={`/profile/${username}`}>
                <User className="h-4 w-4 mr-1" />
                Profile
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default FriendItem;
