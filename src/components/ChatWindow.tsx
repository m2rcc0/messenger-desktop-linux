import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Contact, Message } from "./MessengerApp";

interface ChatWindowProps {
  contact: Contact;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export const ChatWindow = ({ contact, messages, onSendMessage }: ChatWindowProps) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  const formatTime = (timestamp: string) => {
    return timestamp;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center p-4 border-b border-border bg-card">
        <div className="relative">
          <img
            src={contact.avatar}
            alt={contact.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          {contact.isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-online border-2 border-background rounded-full" />
          )}
        </div>
        
        <div className="ml-3 flex-1">
          <h2 className="font-semibold text-foreground">{contact.name}</h2>
          <p className="text-xs text-muted-foreground">
            {contact.isOnline ? "Active now" : "Last seen recently"}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </Button>
          <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </Button>
          <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const isOwn = message.senderId === "me";
          const showAvatar = !isOwn && (index === 0 || messages[index - 1]?.senderId !== message.senderId);
          
          return (
            <div
              key={message.id}
              className={cn(
                "flex items-end space-x-2",
                isOwn ? "justify-end" : "justify-start"
              )}
            >
              {!isOwn && (
                <div className="w-6 h-6">
                  {showAvatar && (
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  )}
                </div>
              )}
              
              <div
                className={cn(
                  "max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-message",
                  isOwn
                    ? "bg-gradient-message text-message-sent-foreground"
                    : "bg-message-received text-message-received-foreground"
                )}
              >
                <p className="text-sm">{message.content}</p>
                <div className="flex items-center justify-end mt-1">
                  <span className={cn(
                    "text-xs opacity-70",
                    isOwn ? "text-message-sent-foreground" : "text-message-received-foreground"
                  )}>
                    {formatTime(message.timestamp)}
                  </span>
                  {isOwn && message.isRead && (
                    <svg className="w-3 h-3 ml-1 opacity-70" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {contact.isTyping && (
          <div className="flex items-end space-x-2">
            <img
              src={contact.avatar}
              alt={contact.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <div className="bg-message-received text-message-received-foreground px-4 py-2 rounded-2xl shadow-message">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-typing rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-typing rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-typing rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border bg-card">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <Button type="button" size="sm" variant="ghost" className="w-8 h-8 p-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Button>
          
          <Button type="button" size="sm" variant="ghost" className="w-8 h-8 p-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </Button>
          
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Message ${contact.name}...`}
              className="pr-12"
            />
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </Button>
          </div>
          
          <Button
            type="submit"
            size="sm"
            disabled={!newMessage.trim()}
            className="bg-primary hover:bg-primary-hover text-primary-foreground"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </Button>
        </form>
      </div>
    </div>
  );
};