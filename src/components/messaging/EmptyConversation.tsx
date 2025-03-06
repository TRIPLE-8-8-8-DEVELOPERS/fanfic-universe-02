
import { MessageSquare } from "lucide-react";

const EmptyConversation = () => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <MessageSquare size={24} className="text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No conversation selected</h3>
      <p className="text-muted-foreground max-w-sm">
        Select a conversation from the sidebar or start a new conversation to chat with other writers.
      </p>
    </div>
  );
};

export default EmptyConversation;
