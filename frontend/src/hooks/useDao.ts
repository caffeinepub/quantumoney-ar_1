import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';

export interface DAOProposal {
  id: string;
  title: string;
  description: string;
  author: string;
  authorName: string;
  createdAt: bigint;
  status: string;
  yesVotes: number;
  noVotes: number;
  abstainVotes: number;
  totalVotes: number;
  userVote?: string;
}

// Simulated in-memory storage (will be replaced with canister calls)
let proposalsStore: DAOProposal[] = [];
let votesStore: Map<string, Map<string, string>> = new Map(); // proposalId -> (principal -> vote)

export function useGetProposals() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<DAOProposal[]>({
    queryKey: ['daoProposals'],
    queryFn: async () => {
      // Simulated: return proposals with vote counts
      const userPrincipal = identity?.getPrincipal().toString();
      
      return proposalsStore.map(proposal => {
        const proposalVotes = votesStore.get(proposal.id) || new Map();
        let yesVotes = 0;
        let noVotes = 0;
        let abstainVotes = 0;
        
        proposalVotes.forEach(vote => {
          if (vote === 'yes') yesVotes++;
          else if (vote === 'no') noVotes++;
          else if (vote === 'abstain') abstainVotes++;
        });

        const userVote = userPrincipal ? proposalVotes.get(userPrincipal) : undefined;

        return {
          ...proposal,
          yesVotes,
          noVotes,
          abstainVotes,
          totalVotes: yesVotes + noVotes + abstainVotes,
          userVote,
        };
      });
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetProposal(proposalId: string) {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  return useQuery<DAOProposal | null>({
    queryKey: ['daoProposal', proposalId],
    queryFn: async () => {
      const proposal = proposalsStore.find(p => p.id === proposalId);
      if (!proposal) return null;

      const userPrincipal = identity?.getPrincipal().toString();
      const proposalVotes = votesStore.get(proposalId) || new Map();
      
      let yesVotes = 0;
      let noVotes = 0;
      let abstainVotes = 0;
      
      proposalVotes.forEach(vote => {
        if (vote === 'yes') yesVotes++;
        else if (vote === 'no') noVotes++;
        else if (vote === 'abstain') abstainVotes++;
      });

      const userVote = userPrincipal ? proposalVotes.get(userPrincipal) : undefined;

      return {
        ...proposal,
        yesVotes,
        noVotes,
        abstainVotes,
        totalVotes: yesVotes + noVotes + abstainVotes,
        userVote,
      };
    },
    enabled: !!actor && !actorFetching && !!proposalId,
  });
}

export function useCreateProposal() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, description }: { title: string; description: string }) => {
      if (!actor) throw new Error('Actor not available');
      if (!identity) throw new Error('Not authenticated');

      const userProfile = await actor.getCallerUserProfile();
      if (!userProfile || !userProfile.registered) {
        throw new Error('User must be registered to create proposals');
      }

      // Simulated: create proposal
      const newProposal: DAOProposal = {
        id: `proposal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title,
        description,
        author: identity.getPrincipal().toString(),
        authorName: userProfile.nickname,
        createdAt: BigInt(Date.now() * 1_000_000),
        status: 'active',
        yesVotes: 0,
        noVotes: 0,
        abstainVotes: 0,
        totalVotes: 0,
      };

      proposalsStore.push(newProposal);
      return newProposal;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['daoProposals'] });
    },
  });
}

export function useVoteOnProposal() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ proposalId, vote }: { proposalId: string; vote: 'yes' | 'no' | 'abstain' }) => {
      if (!actor) throw new Error('Actor not available');
      if (!identity) throw new Error('Not authenticated');

      const userProfile = await actor.getCallerUserProfile();
      if (!userProfile || !userProfile.registered) {
        throw new Error('User must be registered to vote');
      }

      const userPrincipal = identity.getPrincipal().toString();

      // Simulated: record vote
      if (!votesStore.has(proposalId)) {
        votesStore.set(proposalId, new Map());
      }
      votesStore.get(proposalId)!.set(userPrincipal, vote);

      return { proposalId, vote };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['daoProposals'] });
      queryClient.invalidateQueries({ queryKey: ['daoProposal', data.proposalId] });
    },
  });
}

export function useRevokeVote() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (proposalId: string) => {
      if (!actor) throw new Error('Actor not available');
      if (!identity) throw new Error('Not authenticated');

      const userPrincipal = identity.getPrincipal().toString();

      // Simulated: remove vote
      const proposalVotes = votesStore.get(proposalId);
      if (proposalVotes) {
        proposalVotes.delete(userPrincipal);
      }

      return proposalId;
    },
    onSuccess: (proposalId) => {
      queryClient.invalidateQueries({ queryKey: ['daoProposals'] });
      queryClient.invalidateQueries({ queryKey: ['daoProposal', proposalId] });
    },
  });
}
