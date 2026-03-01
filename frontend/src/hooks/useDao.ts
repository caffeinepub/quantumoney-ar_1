import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface DAOProposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  status: 'active' | 'passed' | 'rejected' | 'expired';
  yesVotes: number;
  noVotes: number;
  abstainVotes: number;
  createdAt: bigint;
  userVote?: 'yes' | 'no' | 'abstain' | null;
}

// In-memory store for proposals (until Governance canister endpoints are exposed via backend actor)
let proposalsStore: DAOProposal[] = [];
let proposalIdCounter = 1;

export function useGetProposals() {
  return useQuery<DAOProposal[]>({
    queryKey: ['daoProposals'],
    queryFn: async () => [...proposalsStore],
  });
}

export function useGetProposal(id: string) {
  return useQuery<DAOProposal | null>({
    queryKey: ['daoProposal', id],
    queryFn: async () => proposalsStore.find(p => p.id === id) ?? null,
    enabled: !!id,
  });
}

export function useCreateProposal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, description }: { title: string; description: string }) => {
      const newProposal: DAOProposal = {
        id: String(proposalIdCounter++),
        title,
        description,
        proposer: 'current-user',
        status: 'active',
        yesVotes: 0,
        noVotes: 0,
        abstainVotes: 0,
        createdAt: BigInt(Date.now() * 1_000_000),
        userVote: null,
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ proposalId, vote }: { proposalId: string; vote: 'yes' | 'no' | 'abstain' }) => {
      const proposal = proposalsStore.find(p => p.id === proposalId);
      if (!proposal) throw new Error('Proposal not found');
      if (proposal.userVote) throw new Error('Already voted');

      if (vote === 'yes') proposal.yesVotes += 1;
      else if (vote === 'no') proposal.noVotes += 1;
      else proposal.abstainVotes += 1;
      proposal.userVote = vote;

      return proposal;
    },
    onSuccess: (_, { proposalId }) => {
      queryClient.invalidateQueries({ queryKey: ['daoProposals'] });
      queryClient.invalidateQueries({ queryKey: ['daoProposal', proposalId] });
    },
  });
}

export function useRevokeVote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ proposalId }: { proposalId: string }) => {
      const proposal = proposalsStore.find(p => p.id === proposalId);
      if (!proposal) throw new Error('Proposal not found');
      if (!proposal.userVote) throw new Error('No vote to revoke');

      if (proposal.userVote === 'yes') proposal.yesVotes -= 1;
      else if (proposal.userVote === 'no') proposal.noVotes -= 1;
      else proposal.abstainVotes -= 1;
      proposal.userVote = null;

      return proposal;
    },
    onSuccess: (_, { proposalId }) => {
      queryClient.invalidateQueries({ queryKey: ['daoProposals'] });
      queryClient.invalidateQueries({ queryKey: ['daoProposal', proposalId] });
    },
  });
}
