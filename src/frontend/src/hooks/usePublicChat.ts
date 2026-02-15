import { useState, useCallback } from 'react';

export interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: number;
}

export function usePublicChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const sendMessage = useCallback((sender: string, content: string) => {
    const newMessage: ChatMessage = {
      id: `${Date.now()}-${Math.random()}`,
      sender,
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const getMessages = useCallback(() => {
    return messages;
  }, [messages]);

  return {
    messages,
    sendMessage,
    getMessages,
  };
}
