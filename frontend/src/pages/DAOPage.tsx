import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { useGetProposals } from '../hooks/useDao';
import { Plus, Vote, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function DAOPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: profile } = useGetCallerUserProfile();
  const isRegistered = profile?.registered ?? false;
  const { data: proposals, isLoading: isLoadingProposals } = useGetProposals();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'passed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-400" />;
      default: return <AlertCircle className="w-4 h-4 text-yellow-400/50" />;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-yellow-400 font-cinzel tracking-wide">DAO Governance</h1>
            <p className="text-yellow-300/60 text-sm font-rajdhani mt-1">
              Propostas e votações da comunidade Quantumoney
            </p>
          </div>
          {isAuthenticated && isRegistered && (
            <button
              onClick={() => navigate({ to: '/dao/create' })}
              className="flex items-center gap-2 px-4 py-2 border border-yellow-400 text-yellow-400 font-rajdhani font-bold hover:bg-yellow-400/10 transition-all text-sm uppercase tracking-wider"
            >
              <Plus className="w-4 h-4" />
              Nova Proposta
            </button>
          )}
        </div>

        {/* Auth warning */}
        {!isAuthenticated && (
          <div className="glass-card p-4 mb-6 border-yellow-400/30">
            <p className="text-yellow-300/70 text-sm font-rajdhani flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-400" />
              Faz login para criar propostas e votar.
            </p>
          </div>
        )}

        {/* Proposals */}
        {isLoadingProposals ? (
          <div className="text-center py-12">
            <div className="text-yellow-400/50 font-rajdhani">A carregar propostas...</div>
          </div>
        ) : proposals && proposals.length > 0 ? (
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <div
                key={proposal.id}
                className="glass-card p-5 cursor-pointer hover:border-yellow-400/60 transition-all"
                onClick={() => navigate({ to: '/dao/$proposalId', params: { proposalId: proposal.id } })}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(proposal.status)}
                      <span className="text-yellow-300/50 text-xs font-rajdhani uppercase tracking-wider">
                        {proposal.status}
                      </span>
                    </div>
                    <h3 className="text-yellow-400 font-bold font-cinzel text-lg mb-2">{proposal.title}</h3>
                    <p className="text-yellow-300/60 text-sm font-rajdhani line-clamp-2">{proposal.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex gap-3 text-xs font-rajdhani">
                      <span className="text-green-400">✓ {proposal.yesVotes ?? 0}</span>
                      <span className="text-red-400">✗ {proposal.noVotes ?? 0}</span>
                    </div>
                    <div className="text-yellow-300/40 text-xs mt-1">
                      {proposal.createdAt
                        ? new Date(Number(proposal.createdAt) / 1_000_000).toLocaleDateString('pt-PT')
                        : ''}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center">
            <Vote className="w-12 h-12 text-yellow-400/30 mx-auto mb-4" />
            <h3 className="text-yellow-400 font-cinzel font-bold text-xl mb-2">Sem Propostas</h3>
            <p className="text-yellow-300/50 font-rajdhani text-sm">
              Ainda não existem propostas. Sê o primeiro a criar uma!
            </p>
            {isAuthenticated && isRegistered && (
              <button
                onClick={() => navigate({ to: '/dao/create' })}
                className="mt-6 px-6 py-2 border border-yellow-400 text-yellow-400 font-rajdhani font-bold hover:bg-yellow-400/10 transition-all text-sm uppercase tracking-wider"
              >
                Criar Proposta
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
