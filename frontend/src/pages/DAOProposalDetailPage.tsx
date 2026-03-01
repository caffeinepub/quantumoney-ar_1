import React, { useState } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetProposal, useVoteOnProposal, useRevokeVote } from '../hooks/useDao';
import { ArrowLeft, ThumbsUp, ThumbsDown, Minus, AlertCircle } from 'lucide-react';

export default function DAOProposalDetailPage() {
  const navigate = useNavigate();
  const { proposalId } = useParams({ from: '/dao/$proposalId' });
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: proposal, isLoading } = useGetProposal(proposalId);
  const voteOnProposal = useVoteOnProposal();
  const revokeVote = useRevokeVote();
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (vote: 'yes' | 'no' | 'abstain') => {
    if (!isAuthenticated) return;
    setIsVoting(true);
    try {
      await voteOnProposal.mutateAsync({ proposalId, vote });
    } catch (err) {
      console.error('Vote error:', err);
    } finally {
      setIsVoting(false);
    }
  };

  const handleRevokeVote = async () => {
    if (!isAuthenticated) return;
    setIsVoting(true);
    try {
      await revokeVote.mutateAsync({ proposalId });
    } catch (err) {
      console.error('Revoke vote error:', err);
    } finally {
      setIsVoting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-yellow-400/50 font-rajdhani">A carregar proposta...</div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="min-h-screen pt-20 pb-10 px-4 flex items-center justify-center">
        <div className="glass-card p-10 text-center max-w-md w-full">
          <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-yellow-400 font-cinzel mb-3">Proposta não encontrada</h2>
          <button
            onClick={() => navigate({ to: '/dao' })}
            className="px-6 py-2 border border-yellow-400 text-yellow-400 font-rajdhani hover:bg-yellow-400/10 transition-all"
          >
            Voltar ao DAO
          </button>
        </div>
      </div>
    );
  }

  const totalVotes = (proposal.yesVotes ?? 0) + (proposal.noVotes ?? 0) + (proposal.abstainVotes ?? 0);
  const yesPercent = totalVotes > 0 ? Math.round(((proposal.yesVotes ?? 0) / totalVotes) * 100) : 0;
  const noPercent = totalVotes > 0 ? Math.round(((proposal.noVotes ?? 0) / totalVotes) * 100) : 0;

  const statusClass =
    proposal.status === 'active'
      ? 'border-yellow-400/50 text-yellow-400'
      : proposal.status === 'passed'
      ? 'border-green-400/50 text-green-400'
      : 'border-red-400/50 text-red-400';

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate({ to: '/dao' })}
          className="flex items-center gap-2 text-yellow-400/60 hover:text-yellow-400 transition-colors mb-6 font-rajdhani text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao DAO
        </button>

        {/* Proposal */}
        <div className="glass-card p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-rajdhani uppercase tracking-wider px-2 py-0.5 border ${statusClass}`}>
              {proposal.status}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-yellow-400 font-cinzel mb-4">{proposal.title}</h1>
          <p className="text-yellow-300/70 font-rajdhani leading-relaxed">{proposal.description}</p>
          {proposal.createdAt && (
            <p className="text-yellow-300/40 text-xs font-rajdhani mt-4">
              Criada em {new Date(Number(proposal.createdAt) / 1_000_000).toLocaleDateString('pt-PT')}
            </p>
          )}
        </div>

        {/* Vote counts */}
        <div className="glass-card p-6 mb-6">
          <h3 className="text-yellow-400 font-bold font-cinzel mb-4">Resultados da Votação</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center border border-green-400/30 p-3 bg-black/20">
              <div className="text-green-400 font-bold text-2xl font-cinzel">{proposal.yesVotes ?? 0}</div>
              <div className="text-green-400/60 text-xs font-rajdhani uppercase">A Favor</div>
            </div>
            <div className="text-center border border-red-400/30 p-3 bg-black/20">
              <div className="text-red-400 font-bold text-2xl font-cinzel">{proposal.noVotes ?? 0}</div>
              <div className="text-red-400/60 text-xs font-rajdhani uppercase">Contra</div>
            </div>
            <div className="text-center border border-yellow-400/30 p-3 bg-black/20">
              <div className="text-yellow-400 font-bold text-2xl font-cinzel">{proposal.abstainVotes ?? 0}</div>
              <div className="text-yellow-400/60 text-xs font-rajdhani uppercase">Abstenção</div>
            </div>
          </div>
          {totalVotes > 0 && (
            <div className="w-full h-2 bg-black/40 border border-yellow-400/20 flex overflow-hidden">
              <div className="h-full bg-green-400" style={{ width: `${yesPercent}%` }} />
              <div className="h-full bg-red-400" style={{ width: `${noPercent}%` }} />
              <div className="h-full bg-yellow-400/40" style={{ width: `${100 - yesPercent - noPercent}%` }} />
            </div>
          )}
        </div>

        {/* Voting */}
        {isAuthenticated && proposal.status === 'active' && (
          <div className="glass-card p-6">
            <h3 className="text-yellow-400 font-bold font-cinzel mb-4">O Teu Voto</h3>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => handleVote('yes')}
                disabled={isVoting || !!proposal.userVote}
                className="flex items-center gap-2 px-5 py-2 border border-green-400/50 text-green-400 font-rajdhani font-bold hover:bg-green-400/10 transition-all disabled:opacity-50 text-sm uppercase tracking-wider"
              >
                <ThumbsUp className="w-4 h-4" />
                A Favor
              </button>
              <button
                onClick={() => handleVote('no')}
                disabled={isVoting || !!proposal.userVote}
                className="flex items-center gap-2 px-5 py-2 border border-red-400/50 text-red-400 font-rajdhani font-bold hover:bg-red-400/10 transition-all disabled:opacity-50 text-sm uppercase tracking-wider"
              >
                <ThumbsDown className="w-4 h-4" />
                Contra
              </button>
              <button
                onClick={() => handleVote('abstain')}
                disabled={isVoting || !!proposal.userVote}
                className="flex items-center gap-2 px-5 py-2 border border-yellow-400/30 text-yellow-400/60 font-rajdhani font-bold hover:bg-yellow-400/5 transition-all disabled:opacity-50 text-sm uppercase tracking-wider"
              >
                <Minus className="w-4 h-4" />
                Abstenção
              </button>
              {proposal.userVote && (
                <button
                  onClick={handleRevokeVote}
                  disabled={isVoting}
                  className="px-5 py-2 border border-yellow-400/20 text-yellow-400/40 font-rajdhani text-sm hover:border-yellow-400/40 transition-all disabled:opacity-50"
                >
                  Revogar Voto
                </button>
              )}
            </div>
            {proposal.userVote && (
              <p className="text-yellow-300/50 text-xs font-rajdhani mt-3">
                O teu voto: <span className="text-yellow-400">{proposal.userVote}</span>
              </p>
            )}
          </div>
        )}

        {!isAuthenticated && (
          <div className="glass-card p-4 border-yellow-400/20">
            <p className="text-yellow-300/60 text-sm font-rajdhani flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-400" />
              Faz login para votar nesta proposta.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
