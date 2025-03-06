
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ChevronLeft, MoreVertical, Phone, Video, User, Flag, Bell, Trash2 } from "lucide-react";
import { ConversationType } from "@/types/messaging";

interface ConversationHeaderProps {
  conversation: ConversationType;
  onBack: () => void;
  isMobileView: boolean;
}

const ConversationHeader = ({ 
  conversation, 
  onBack,
  isMobileView 
}: ConversationHeaderProps) => {
  return (
    <div className="p-4 border-b flex items-center gap-3">
      {isMobileView && (
        <Button
          variant="ghost"
          size="icon"
          className="mr-1"
          onClick={onBack}
        >
          <ChevronLeft size={20} />
        </Button>
      )}

      <Avatar className="h-10 w-10">
        <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
        <AvatarFallback>
          {conversation.user.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>

      <div className="flex-grow">
        <h3 className="font-semibold">{conversation.user.name}</h3>
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          {conversation.user.isOnline ? (
            <>
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span>
              <span>Online</span>
            </>
          ) : (
            <>Last seen {conversation.user.lastSeen}</>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Phone size={18} />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Video size={18} />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreVertical size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <User size={16} className="mr-2" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell size={16} className="mr-2" />
              Mute Conversation
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Flag size={16} className="mr-2" />
              Report
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 size={16} className="mr-2" />
              Delete Conversation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ConversationHeader;
