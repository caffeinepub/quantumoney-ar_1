import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { useCreateProposal } from '../hooks/useDao';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function DAOCreateProposalPage() {
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: profile } = useGetCallerUserProfile();
  const isRegistered = profile?.registered ?? false;
  const createProposal = useCreateProposal();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 pb-10 px-4 flex items-center justify-center">
        <div className="glass-card p-10 text-center max-w-md w-full">
          <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-yellow-400 font-cinzel mb-3">Login Necessário</h2>
          <p className="text-yellow-300/60 font-rajdhani text-sm mb-6">
            Precisas de estar autenticado para criar propostas.
          </p>
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Preenche todos os campos.');
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      await createProposal.mutateAsync({ title: title.trim(), description: description.trim() });
      navigate({ to: '/dao' });
    } catch (err: any) {
      setError(err?.message ?? 'Erro ao criar proposta.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate({ to: '/dao' })}
          className="flex items-center gap-2 text-yellow-400/60 hover:text-yellow-400 transition-colors mb-6 font-rajdhani text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao DAO
        </button>

        <h1 className="text-3xl font-bold text-yellow-400 font-cinzel tracking-wide mb-2">Nova Proposta</h1>
        <p className="text-yellow-300/60 text-sm font-rajdhani mb-8">
          Cria uma proposta para a comunidade votar.
        </p>

        <div className="glass-card p-6">
          <div className="bg-yellow-400/5 border border-yellow-400/20 p-3 mb-6">
            <p className="text-yellow-300/60 text-xs font-rajdhani">
              ℹ️ As propostas são simuladas internamente. A integração com o canister de governança está em desenvolvimento.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-yellow-300/60 text-xs font-rajdhani uppercase tracking-wider mb-2">
                Título *
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                maxLength={100}
                placeholder="Título da proposta..."
                className="w-full bg-transparent border border-yellow-400/50 text-yellow-400 px-3 py-2 text-sm font-rajdhani focus:outline-none focus:border-yellow-400"
              />
              <div className="text-right text-yellow-300/30 text-xs mt-1 font-rajdhani">{title.length}/100</div>
            </div>

            <div>
              <label className="block text-yellow-300/60 text-xs font-rajdhani uppercase tracking-wider mb-2">
                Descrição *
              </label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                maxLength={1000}
                rows={6}
                placeholder="Descreve a tua proposta em detalhe..."
                className="w-full bg-transparent border border-yellow-400/50 text-yellow-400 px-3 py-2 text-sm font-rajdhani focus:outline-none focus:border-yellow-400 resize-none"
              />
              <div className="text-right text-yellow-300/30 text-xs mt-1 font-rajdhani">{description.length}/1000</div>
            </div>

            {error && (
              <div className="border border-red-400/50 bg-red-400/5 p-3">
                <p className="text-red-400 text-sm font-rajdhani">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !description.trim()}
              className="w-full py-3 border-2 border-yellow-400 text-yellow-400 font-rajdhani font-bold uppercase tracking-wider hover:bg-yellow-400/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'A submeter...' : 'Submeter Proposta'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
