import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useState } from 'react';
import type { ChatMessage } from '@/backend';

const MESSAGES_PER_PAGE = 20;
const REFETCH_INTERVAL = 5000;

export function usePublicChat() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [offset, setOffset] = useState(0);

  const { data: messages = [], isLoading } = useQuery<ChatMessage[]>({
    queryKey: ['chat-messages', offset],
    queryFn: async () => {
      if (!actor) return [];
      const msgs = await actor.getMessages(BigInt(MESSAGES_PER_PAGE), BigInt(offset));
      return msgs.reverse();
    },
    enabled: !!actor,
    refetchInterval: REFETCH_INTERVAL,
  });

  const { data: totalCount = 0 } = useQuery<number>({
    queryKey: ['chat-total-count'],
    queryFn: async () => {
      if (!actor) return 0;
      const count = await actor.getTotalMessagesCount();
      return Number(count);
    },
    enabled: !!actor,
    refetchInterval: REFETCH_INTERVAL,
  });

  const sendMutation = useMutation({
    mutationFn: async ({ authorName, content }: { authorName: string; content: string }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.sendMessage(authorName, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-messages'] });
      queryClient.invalidateQueries({ queryKey: ['chat-total-count'] });
    },
  });

  const loadMore = () => {
    setOffset((prev) => prev + MESSAGES_PER_PAGE);
  };

  const hasMore = offset + messages.length < totalCount;

  return {
    messages,
    isLoading,
    isSending: sendMutation.isPending,
    sendMessage: (authorName: string, content: string) =>
      sendMutation.mutateAsync({ authorName, content }),
    loadMore,
    hasMore,
    isLoadingMore: isLoading && offset > 0,
  };
}
