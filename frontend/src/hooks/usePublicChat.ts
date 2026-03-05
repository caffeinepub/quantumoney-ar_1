import { useGetChatMessages, useSendChatMessage } from './useQueries';

// Re-export the real backend-connected chat hooks
export { useGetChatMessages as useGetMessages, useSendChatMessage as useSendMessage };

export function usePublicChat() {
  const { data: messages = [], isLoading, error } = useGetChatMessages();
  const sendMutation = useSendChatMessage();

  const sendMessage = async (content: string) => {
    await sendMutation.mutateAsync(content);
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    isSending: sendMutation.isPending,
  };
}
