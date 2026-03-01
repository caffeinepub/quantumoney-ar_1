import React, { useState } from 'react';
import { useActor } from '../hooks/useActor';
import { useQueryClient } from '@tanstack/react-query';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { User, Loader2 } from 'lucide-react';

export default function ProfileSetupModal() {
  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [nickname, setNickname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !identity || !nickname.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await actor.saveCallerUserProfile({
        nickname: nickname.trim(),
        photoUrl: undefined,
        energy: BigInt(100),
        availableTokens: BigInt(100),
        plantedTokens: BigInt(0),
        bonusTokens: BigInt(900),
        xp: BigInt(100),
        level: BigInt(1),
        registered: true,
        capturedMonsters: [],
      });
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    } catch (err: any) {
      setError(err?.message || 'Erro ao criar perfil. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div className="luxury-glass-card w-full max-w-md p-8 border border-primary/30 rounded">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-cinzel text-primary font-bold text-2xl mb-2">Bem-vindo!</h2>
          <p className="text-muted-foreground text-sm">
            Configure o seu perfil para começar a jogar.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">
              Nome de Utilizador
            </label>
            <input
              type="text"
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              placeholder="O teu nome..."
              maxLength={50}
              required
              className="w-full bg-background border border-primary/30 rounded px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
          </div>

          {error && (
            <p className="text-destructive text-sm">{error}</p>
          )}

          <div className="bg-primary/5 border border-primary/20 rounded p-4 text-sm text-muted-foreground">
            <p className="font-medium text-primary mb-1">Bónus de Boas-Vindas</p>
            <ul className="space-y-1 text-xs">
              <li>• 100 QMY desbloqueados</li>
              <li>• 900 QMY em vesting</li>
              <li>• 100 XP iniciais</li>
              <li>• 100% de energia</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !nickname.trim()}
            className="w-full py-3 bg-primary text-primary-foreground font-cinzel font-bold rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                A criar perfil...
              </>
            ) : (
              'Criar Perfil'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
