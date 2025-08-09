import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Contact } from "./MessengerApp";

interface ConversationSidebarProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  onSelectContact: (contact: Contact) => void;
}

export const ConversationSidebar = ({
  contacts,
  selectedContact,
  onSelectContact,
}: ConversationSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-foreground">Messenger</h1>
          <Button size="sm" variant="ghost" className="w-8 h-8 p-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => onSelectContact(contact)}
            className={cn(
              "flex items-center p-3 hover:bg-sidebar-accent cursor-pointer transition-colors",
              selectedContact?.id === contact.id && "bg-sidebar-accent"
            )}
          >
            {/* Avatar */}
            <div className="relative">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {contact.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-online border-2 border-background rounded-full" />
              )}
            </div>

            {/* Content */}
            <div className="ml-3 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground truncate">{contact.name}</h3>
                <span className="text-xs text-muted-foreground">{contact.lastMessageTime}</span>
              </div>
              
              <div className="flex items-center justify-between mt-1">
                <p className={cn(
                  "text-sm truncate",
                  contact.unreadCount > 0 ? "text-foreground font-medium" : "text-muted-foreground"
                )}>
                  {contact.isTyping ? (
                    <span className="text-primary italic">typing...</span>
                  ) : (
                    contact.lastMessage
                  )}
                </p>
                
                {contact.unreadCount > 0 && (
                  <Badge variant="default" className="ml-2 bg-primary text-primary-foreground">
                    {contact.unreadCount}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};