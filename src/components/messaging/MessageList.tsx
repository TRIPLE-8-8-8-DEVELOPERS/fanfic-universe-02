
import { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ConversationType } from "@/types/messaging";

interface MessageListProps {
  conversation: ConversationType;
}

const MessageList = ({ conversation }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when conversation changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  // Group messages by date
  const groupedMessages: { [key: string]: typeof conversation.messages } = {};
  
  conversation.messages.forEach(message => {
    const date = new Date(message.timestamp).toLocaleDateString();
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });

  return (
    <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-4">
      {Object.entries(groupedMessages).map(([date, messages]) => (
        <div key={date} className="flex flex-col gap-3">
          <div className="flex justify-center">
            <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">
              {date === new Date().toLocaleDateString() ? "Today" : date}
            </span>
          </div>

          {messages.map((message, index) => (
            <div 
              key={index}
              className={`flex gap-3 ${
                message.isSelf ? "flex-row-reverse" : ""
              }`}
            >
              {!message.isSelf && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                  <AvatarFallback>
                    {conversation.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              )}

              <div 
                className={`max-w-[75%] ${
                  message.isSelf 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-secondary-foreground"
                } rounded-lg px-4 py-2`}
              >
                <p>{message.content}</p>
                <div 
                  className={`text-xs mt-1 ${
                    message.isSelf 
                      ? "text-primary-foreground/70" 
                      : "text-secondary-foreground/70"
                  }`}
                >
                  {new Date(message.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                  {message.isSelf && (
                    message.read 
                      ? " · Read" 
                      : " · Delivered"
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
