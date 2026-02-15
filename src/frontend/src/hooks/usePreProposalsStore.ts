import { useState, useEffect } from 'react';
import { useInternetIdentity } from './useInternetIdentity';

interface PreProposal {
  id: string;
  title: string;
  description: string;
  author: string;
  createdAt: number;
}

const STORAGE_KEY = 'quantumoney_pre_proposals';

export function usePreProposalsStore() {
  const { identity } = useInternetIdentity();
  const [proposals, setProposals] = useState<PreProposal[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(proposals));
    } catch (error) {
      console.error('Failed to save proposals:', error);
    }
  }, [proposals]);

  const createProposal = (title: string, description: string) => {
    if (!identity) {
      throw new Error('Not authenticated');
    }

    const newProposal: PreProposal = {
      id: `prop-${Date.now()}`,
      title,
      description,
      author: identity.getPrincipal().toString(),
      createdAt: Date.now(),
    };

    setProposals((prev) => [newProposal, ...prev]);
  };

  const getProposal = (id: string): PreProposal | undefined => {
    return proposals.find((p) => p.id === id);
  };

  return {
    proposals,
    createProposal,
    getProposal,
  };
}
