import React, { useState } from 'react';
import { 
  Search, 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  Info,
  Paperclip,
  Smile,
  MessageCircle
} from 'lucide-react';
import { mockProfiles } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface MockMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface MockConversation {
  id: string;
  participantId: string;
  lastMessage: MockMessage;
  unreadCount: number;
}

export const MessagesPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock conversations
  const mockConversations: MockConversation[] = [
    {
      id: '1',
      participantId: '1',
      lastMessage: {
        id: '1',
        senderId: '1',
        content: 'Hey! I loved your latest track. Would you be interested in collaborating on a remix?',
        timestamp: '2024-06-18T10:30:00Z',
        isRead: false
      },
      unreadCount: 2
    },
    {
      id: '2',
      participantId: '8',
      lastMessage: {
        id: '2',
        senderId: user?.id || '',
        content: 'Sounds great! When can we schedule a call to discuss the project details?',
        timestamp: '2024-06-18T09:15:00Z',
        isRead: true
      },
      unreadCount: 0
    },
    {
      id: '3',
      participantId: '4',
      lastMessage: {
        id: '3',
        senderId: '4',
        content: 'Thanks for reaching out! I am definitely interested in working together.',
        timestamp: '2024-06-17T16:45:00Z',
        isRead: true
      },
      unreadCount: 0
    }
  ];

  // Mock messages for selected conversation
  const mockMessages: MockMessage[] = [
    {
      id: '1',
      senderId: '1',
      content: 'Hey! I loved your latest track. Would you be interested in collaborating on a remix?',
      timestamp: '2024-06-18T10:30:00Z',
      isRead: true
    },
    {
      id: '2',
      senderId: user?.id || '',
      content: 'Thank you so much! I would love to collaborate. What did you have in mind?',
      timestamp: '2024-06-18T10:35:00Z',
      isRead: true
    },
    {
      id: '3',
      senderId: '1',
      content: 'I was thinking we could create an electronic remix of your folk track "Whispered Dreams". I think it could really add a new dimension to the song.',
      timestamp: '2024-06-18T10:40:00Z',
      isRead: false
    }
  ];

  const getParticipantProfile = (participantId: string) => {
    return mockProfiles.find(p => p.userId === participantId);
  };

  const filteredConversations = mockConversations.filter(conversation => {
    if (!searchQuery) return true;
    const participant = getParticipantProfile(conversation.participantId);
    return participant?.fullName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const selectedConversationData = mockConversations.find(c => c.id === selectedConversation);
  const selectedParticipant = selectedConversationData ? getParticipantProfile(selectedConversationData.participantId) : null;

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message via API
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="h-screen bg-background flex">
      {/* Conversations List */}
      <div className="w-80 border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <h2 className="text-xl font-display font-bold mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 input-music"
            />
          </div>
        </div>

        {/* Conversations */}
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {filteredConversations.map((conversation) => {
              const participant = getParticipantProfile(conversation.participantId);
              if (!participant) return null;

              return (
                <div
                  key={conversation.id}
                  className={cn(
                    "p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted",
                    selectedConversation === conversation.id && "bg-primary/10 border border-primary/20"
                  )}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={participant.profilePictureUrl} alt={participant.fullName} />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                          {participant.fullName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-bold">
                            {conversation.unreadCount}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm truncate">{participant.fullName}</p>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(conversation.lastMessage.timestamp)}
                        </span>
                      </div>
                      <p className={cn(
                        "text-sm truncate",
                        conversation.unreadCount > 0 ? "font-medium text-foreground" : "text-muted-foreground"
                      )}>
                        {conversation.lastMessage.senderId === user?.id ? 'You: ' : ''}
                        {conversation.lastMessage.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation && selectedParticipant ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedParticipant.profilePictureUrl} alt={selectedParticipant.fullName} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                    {selectedParticipant.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedParticipant.fullName}</h3>
                  <p className="text-sm text-muted-foreground">Online</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Video className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Info className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {mockMessages.map((message) => {
                  const isOwn = message.senderId === user?.id;
                  return (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        isOwn ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
                          isOwn
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        )}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={cn(
                          "text-xs mt-1",
                          isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                        )}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="ghost">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="input-music pr-10"
                  />
                  <Button size="sm" variant="ghost" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
                <Button size="sm" className="btn-primary" onClick={handleSendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          /* No conversation selected */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
