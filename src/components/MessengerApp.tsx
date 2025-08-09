import { useState } from "react";
import { ConversationSidebar } from "./ConversationSidebar";
import { ChatWindow } from "./ChatWindow";
import { ThemeToggle } from "./ThemeToggle";

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  isOnline: boolean;
  unreadCount: number;
  isTyping?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
  isRead?: boolean;
}

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Wilson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b3cc?w=400&h=400&fit=crop&crop=face",
    lastMessage: "Hey! How's your day going?",
    lastMessageTime: "2 min",
    isOnline: true,
    unreadCount: 2,
  },
  {
    id: "2",
    name: "John Martinez",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    lastMessage: "Let's catch up soon!",
    lastMessageTime: "5 min",
    isOnline: true,
    unreadCount: 0,
    isTyping: true,
  },
  {
    id: "3",
    name: "Emma Thompson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    lastMessage: "Thanks for your help!",
    lastMessageTime: "1 hr",
    isOnline: false,
    unreadCount: 0,
  },
  {
    id: "4",
    name: "Dev Team",
    avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop&crop=face",
    lastMessage: "Mike: The new update is ready 🚀",
    lastMessageTime: "3 hr",
    isOnline: true,
    unreadCount: 5,
  },
];

const mockMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      senderId: "1",
      content: "Hey there! How are you doing?",
      timestamp: "10:30 AM",
      type: "text",
      isRead: true,
    },
    {
      id: "m2",
      senderId: "me",
      content: "Hi Sarah! I'm doing great, thanks for asking. How about you?",
      timestamp: "10:32 AM",
      type: "text",
      isRead: true,
    },
    {
      id: "m3",
      senderId: "1",
      content: "I'm wonderful! Just finished a great project. Want to celebrate later?",
      timestamp: "10:35 AM",
      type: "text",
      isRead: true,
    },
    {
      id: "m4",
      senderId: "1",
      content: "Hey! How's your day going?",
      timestamp: "10:42 AM",
      type: "text",
      isRead: false,
    },
  ],
  "2": [
    {
      id: "m5",
      senderId: "2",
      content: "Good morning! Ready for today's meeting?",
      timestamp: "9:15 AM",
      type: "text",
      isRead: true,
    },
    {
      id: "m6",
      senderId: "me",
      content: "Absolutely! I've prepared the presentation slides.",
      timestamp: "9:18 AM",
      type: "text",
      isRead: true,
    },
    {
      id: "m7",
      senderId: "2",
      content: "Let's catch up soon!",
      timestamp: "10:40 AM",
      type: "text",
      isRead: false,
    },
  ],
};

export const MessengerApp = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(mockContacts[0]);
  const [messages, setMessages] = useState(mockMessages);

  const handleSendMessage = (content: string) => {
    if (!selectedContact) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: "me",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: "text",
      isRead: true,
    };

    setMessages(prev => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMessage],
    }));
  };

  return (
    <div className="flex h-screen bg-chat-background">
      {/* Sidebar */}
      <div className="w-80 border-r border-border bg-chat-sidebar">
        <ConversationSidebar
          contacts={mockContacts}
          selectedContact={selectedContact}
          onSelectContact={setSelectedContact}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>
        
        {selectedContact ? (
          <ChatWindow
            contact={selectedContact}
            messages={messages[selectedContact.id] || []}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-chat-background">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">Choose a contact from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};