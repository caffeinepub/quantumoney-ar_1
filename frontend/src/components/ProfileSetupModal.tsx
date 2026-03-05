import { useState, useRef } from 'react';
import { useActor } from '../hooks/useActor';
import { useQueryClient } from '@tanstack/react-query';
import { ExternalBlob } from '../backend';

interface ProfileSetupModalProps {
  onClose: () => void;
}

export default function ProfileSetupModal({ onClose }: ProfileSetupModalProps) {
  const [nickname, setNickname] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bonusReceived, setBonusReceived] = useState<{ qmy: number; xp: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) {
      setError('Por favor, insere um nickname.');
      return;
    }
    if (!actor) {
      setError('Backend não disponível. Tenta novamente.');
      return;
    }
    setIsSubmitting(true);
    setError(null);

    try {
      let photoBlob: ExternalBlob | null = null;
      if (photoFile) {
        const bytes = new Uint8Array(await photoFile.arrayBuffer());
        photoBlob = ExternalBlob.fromBytes(bytes);
      }

      // Save profile
      await actor.updateProfile(nickname.trim(), photoBlob);

      // Claim welcome bonus (backend enforces one-time only)
      try {
        const [qmy, xp] = await actor.claimWelcomeBonus();
        setBonusReceived({ qmy: Number(qmy), xp: Number(xp) });
      } catch {
        // Bonus already claimed or not eligible — ignore
      }

      queryClient.invalidateQueries({ queryKey: ['callerUserProfile'] });

      // If bonus was received, show it briefly then close
      if (!bonusReceived) {
        setTimeout(() => onClose(), 2000);
      }
    } catch (err: any) {
      setError(err?.message || 'Erro ao criar perfil. Tenta novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show bonus screen
  if (bonusReceived) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 px-4">
        <div className="bg-black border-2 border-qmy-gold w-full max-w-sm p-8 text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-qmy-gold font-cinzel font-bold text-xl mb-2">
            Bónus de Boas-Vindas!
          </h2>
          <p className="text-qmy-gold/70 font-rajdhani text-sm mb-6">
            Recebeste o teu bónus de primeiro login:
          </p>
          <div className="flex justify-center gap-6 mb-6">
            <div className="bg-qmy-gold/10 border border-qmy-gold/40 px-4 py-3 rounded">
              <p className="text-qmy-gold font-cinzel font-bold text-2xl">{bonusReceived.qmy.toLocaleString()}</p>
              <p className="text-qmy-gold/60 font-rajdhani text-xs">QMY</p>
            </div>
            <div className="bg-qmy-gold/10 border border-qmy-gold/40 px-4 py-3 rounded">
              <p className="text-qmy-gold font-cinzel font-bold text-2xl">{bonusReceived.xp}</p>
              <p className="text-qmy-gold/60 font-rajdhani text-xs">XP</p>
            </div>
          </div>
          <p className="text-qmy-gold/50 font-rajdhani text-xs mb-4">
            Este bónus é entregue apenas uma vez por utilizador e está guardado na blockchain.
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 bg-qmy-gold text-black font-cinzel font-bold text-sm tracking-wider hover:bg-qmy-gold/80 transition-colors"
          >
            ENTRAR NO JOGO
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 px-4">
      <div className="bg-black border-2 border-qmy-gold w-full max-w-sm p-6">
        <h2 className="text-qmy-gold font-cinzel font-bold text-xl text-center mb-1 tracking-wider">
          CRIAR PERFIL
        </h2>
        <p className="text-qmy-gold/60 font-rajdhani text-sm text-center mb-6">
          Configura o teu perfil para começar a jogar
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Photo */}
          <div className="flex flex-col items-center gap-2">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-20 h-20 rounded-full border-2 border-qmy-gold/50 flex items-center justify-center cursor-pointer overflow-hidden bg-qmy-gold/5 hover:border-qmy-gold transition-colors"
            >
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl">👤</span>
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-qmy-gold/60 font-rajdhani text-xs hover:text-qmy-gold transition-colors"
            >
              {photoPreview ? 'Alterar foto' : 'Adicionar foto (opcional)'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>

          {/* Nickname */}
          <div>
            <label className="block text-qmy-gold/70 font-rajdhani text-xs mb-1 uppercase tracking-wider">
              Nickname *
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="O teu nome no jogo"
              maxLength={30}
              className="w-full bg-black border border-qmy-gold/40 text-qmy-gold font-rajdhani px-3 py-2 text-sm focus:outline-none focus:border-qmy-gold placeholder-qmy-gold/30"
            />
          </div>

          {error && (
            <p className="text-red-400 font-rajdhani text-xs text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !nickname.trim()}
            className="w-full py-3 bg-qmy-gold text-black font-cinzel font-bold text-sm tracking-wider hover:bg-qmy-gold/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'A criar perfil...' : 'CRIAR PERFIL'}
          </button>
        </form>

        <p className="text-qmy-gold/30 font-rajdhani text-[10px] text-center mt-4">
          Ao criar o teu perfil receberás 1.000 QMY + 100 XP de bónus de boas-vindas.
        </p>
      </div>
    </div>
  );
}
