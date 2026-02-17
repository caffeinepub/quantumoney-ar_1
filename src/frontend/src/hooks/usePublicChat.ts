import { useState, useEffect } from 'react';

interface LocalChatMessage {
  authorName: string;
  content: string;
  timestamp: number;
  id: string;
}

export function usePublicChat() {
  const [messages, setMessages] = useState<LocalChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);

  const sendMessage = async (authorName: string, content: string) => {
    setIsSending(true);
    
    await new Promise(resolve => setTimeout(resolve, 300));

    const newMessage: LocalChatMessage = {
      authorName,
      content,
      timestamp: Date.now(),
      id: `${Date.now()}_${Math.random()}`,
    };

    setMessages(prev => [...prev, newMessage]);
    
    setIsSending(false);
  };

  return {
    messages,
    isLoading: false,
    isSending,
    sendMessage,
    loadMore: () => {},
    hasMore: false,
    isLoadingMore: false,
  };
}
