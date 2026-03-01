import { useEffect, useState } from 'react';
import { useActor } from '../hooks/useActor';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { useQueryClient } from '@tanstack/react-query';

// Camera hook loaded via dynamic approach to avoid module resolution issues
function useBrowserCamera() {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = { current: null as HTMLVideoElement | null };

  async function startCamera() {
    setIsLoading(true);
    setError(null);
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      setStream(s);
      setIsActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
        videoRef.current.play();
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Erro ao aceder à câmara';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }

  function stopCamera() {
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      setStream(null);
    }
    setIsActive(false);
  }

  return { isActive, isLoading, error, startCamera, stopCamera, videoRef };
}

export default function ARGamePage() {
  const { identity } = useInternetIdentity();
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const { data: profile } = useGetCallerUserProfile();

  const { isActive, isLoading, error, startCamera, stopCamera, videoRef } = useBrowserCamera();

  const [lockMsg, setLockMsg] = useState('');
  const [captureMsg, setCaptureMsg] = useState('');
  const [isLocking, setIsLocking] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [coinLocked, setCoinLocked] = useState(false);
  const [isSupported, setIsSupported] = useState<boolean | null>(null);

  useEffect(() => {
    const supported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    setIsSupported(supported);
    if (supported) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Attach stream to video element once ref is set
  useEffect(() => {
    if (videoRef.current && isActive) {
      // stream already attached in startCamera
    }
  }, [isActive, videoRef]);

  async function handleLockUnlock() {
    if (!actor || !identity) {
      setLockMsg('⚠️ Faz login para bloquear/desbloquear moedas.');
      return;
    }
    setIsLocking(true);
    setLockMsg('');
    try {
      const currentProfile = profile;
      if (!currentProfile) {
        setLockMsg('⚠️ Perfil não encontrado.');
        return;
      }
      if (!coinLocked) {
        const updatedProfile = {
          ...currentProfile,
          availableTokens: currentProfile.availableTokens > 0n ? currentProfile.availableTokens - 1n : 0n,
          plantedTokens: currentProfile.plantedTokens + 1n,
          xp: currentProfile.xp + 10n,
        };
        await actor.saveCallerUserProfile(updatedProfile);
        await queryClient.invalidateQueries({ queryKey: ['callerUserProfile'] });
        setCoinLocked(true);
        setLockMsg('✅ 1 QMY bloqueado com sucesso! +10 XP');
      } else {
        const updatedProfile = {
          ...currentProfile,
          availableTokens: currentProfile.availableTokens + 1n,
          plantedTokens: currentProfile.plantedTokens > 0n ? currentProfile.plantedTokens - 1n : 0n,
        };
        await actor.saveCallerUserProfile(updatedProfile);
        await queryClient.invalidateQueries({ queryKey: ['callerUserProfile'] });
        setCoinLocked(false);
        setLockMsg('✅ 1 QMY desbloqueado com sucesso!');
      }
    } catch (e) {
      console.error(e);
      setLockMsg('❌ Erro ao processar. Tenta novamente.');
    } finally {
      setIsLocking(false);
      setTimeout(() => setLockMsg(''), 4000);
    }
  }

  async function handleCaptureMonster() {
    if (!actor || !identity) {
      setCaptureMsg('⚠️ Faz login para capturar monstros.');
      return;
    }
    setIsCapturing(true);
    setCaptureMsg('');
    try {
      const currentProfile = profile;
      if (!currentProfile) {
        setCaptureMsg('⚠️ Perfil não encontrado.');
        return;
      }

      const monsters = [
        { name: 'BTC Dragon', energyBoost: 50n, spawnFrequency: 1n },
        { name: 'ETH Phoenix', energyBoost: 40n, spawnFrequency: 2n },
        { name: 'ICP Guardian', energyBoost: 35n, spawnFrequency: 3n },
        { name: 'SOL Specter', energyBoost: 30n, spawnFrequency: 4n },
        { name: 'DOGE Pup', energyBoost: 20n, spawnFrequency: 5n },
      ];
      const randomMonster = monsters[Math.floor(Math.random() * monsters.length)];
      const newCapture = {
        monster: randomMonster,
        captureTime: BigInt(Date.now()) * 1_000_000n,
      };

      const updatedProfile = {
        ...currentProfile,
        capturedMonsters: [...currentProfile.capturedMonsters, newCapture],
        xp: currentProfile.xp + 25n,
        bonusTokens: currentProfile.bonusTokens + randomMonster.energyBoost,
      };
      await actor.saveCallerUserProfile(updatedProfile);
      await queryClient.invalidateQueries({ queryKey: ['callerUserProfile'] });
      setCaptureMsg(`✅ ${randomMonster.name} capturado! +25 XP +${randomMonster.energyBoost} bónus`);
    } catch (e) {
      console.error(e);
      setCaptureMsg('❌ Erro ao capturar monstro. Tenta novamente.');
    } finally {
      setIsCapturing(false);
      setTimeout(() => setCaptureMsg(''), 5000);
    }
  }

  if (isSupported === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="luxury-glass-card p-8 text-center max-w-sm">
          <div className="text-5xl mb-4">📵</div>
          <h2 className="font-cinzel text-qmy-gold text-xl font-bold mb-3">Câmara Não Suportada</h2>
          <p className="text-qmy-gold/70 font-rajdhani text-sm">
            O teu dispositivo ou browser não suporta acesso à câmara. Usa um dispositivo móvel moderno.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-black overflow-hidden" style={{ height: '100dvh' }}>
      {/* Camera preview */}
      <video
        ref={videoRef as React.RefObject<HTMLVideoElement>}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
        autoPlay
      />

      {/* AR Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-4 w-12 h-12 border-t-2 border-l-2 border-qmy-gold/70" />
        <div className="absolute top-20 right-4 w-12 h-12 border-t-2 border-r-2 border-qmy-gold/70" />
        <div className="absolute bottom-32 left-4 w-12 h-12 border-b-2 border-l-2 border-qmy-gold/70" />
        <div className="absolute bottom-32 right-4 w-12 h-12 border-b-2 border-r-2 border-qmy-gold/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 border-2 border-qmy-gold/50 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-6 bg-qmy-gold/50" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-1 bg-qmy-gold/50" />
          </div>
        </div>
      </div>

      {/* Top HUD */}
      <div className="absolute top-0 left-0 right-0 pt-16 px-4 pb-3 bg-gradient-to-b from-black/70 to-transparent pointer-events-none">
        <div className="flex justify-between items-center">
          <div className="luxury-glass-card px-3 py-1 text-xs font-rajdhani text-qmy-gold">
            🎮 AR Mode
          </div>
          <div className="luxury-glass-card px-3 py-1 text-xs font-rajdhani text-qmy-gold">
            QMY: {profile ? Number(profile.availableTokens) : '—'} | XP: {profile ? Number(profile.xp) : '—'}
          </div>
        </div>
      </div>

      {/* Camera status */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
          <div className="luxury-glass-card p-6 text-center">
            <div className="w-10 h-10 border-2 border-qmy-gold border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-qmy-gold font-rajdhani">A iniciar câmara...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute top-24 left-4 right-4 z-10">
          <div className="luxury-glass-card p-4 border-red-500/50">
            <p className="text-red-400 font-rajdhani text-sm">⚠️ {error}</p>
            <p className="text-qmy-gold/50 text-xs font-rajdhani mt-1">
              Verifica as permissões de câmara nas definições do browser.
            </p>
          </div>
        </div>
      )}

      {/* Messages */}
      {(lockMsg || captureMsg) && (
        <div className="absolute top-24 left-4 right-4 z-20 space-y-2">
          {lockMsg && (
            <div className="luxury-glass-card p-3 text-center">
              <p className="text-qmy-gold font-rajdhani text-sm">{lockMsg}</p>
            </div>
          )}
          {captureMsg && (
            <div className="luxury-glass-card p-3 text-center">
              <p className="text-qmy-gold font-rajdhani text-sm">{captureMsg}</p>
            </div>
          )}
        </div>
      )}

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 pb-8 px-4 bg-gradient-to-t from-black/80 to-transparent">
        {!identity && (
          <div className="text-center mb-3">
            <p className="text-qmy-gold/60 text-xs font-rajdhani">Faz login para interagir com moedas e monstros</p>
          </div>
        )}

        <div className="flex items-center justify-center gap-4">
          {/* Lock/Unlock QMY */}
          <button
            className={`luxury-glass-card px-5 py-3 text-sm font-rajdhani font-bold border transition-colors ${
              coinLocked
                ? 'border-yellow-500/70 text-yellow-400 hover:bg-yellow-500/20'
                : 'border-qmy-gold/70 text-qmy-gold hover:bg-qmy-gold/20'
            } disabled:opacity-50`}
            onClick={handleLockUnlock}
            disabled={isLocking || !isActive}
          >
            {isLocking ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                A processar...
              </span>
            ) : coinLocked ? (
              '🔓 Desbloquear QMY'
            ) : (
              '🔒 Bloquear QMY'
            )}
          </button>

          {/* Capture button */}
          <button
            className="w-16 h-16 rounded-full border-4 border-qmy-gold bg-qmy-gold/20 flex items-center justify-center hover:bg-qmy-gold/40 transition-colors disabled:opacity-50"
            disabled={!isActive || isLoading}
            title="Capturar foto"
          >
            <div className="w-10 h-10 rounded-full bg-qmy-gold/60" />
          </button>

          {/* Capture Monster */}
          <button
            className="luxury-glass-card px-5 py-3 text-sm font-rajdhani font-bold border border-purple-500/70 text-purple-400 hover:bg-purple-500/20 transition-colors disabled:opacity-50"
            onClick={handleCaptureMonster}
            disabled={isCapturing || !isActive}
          >
            {isCapturing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                A capturar...
              </span>
            ) : (
              '🐉 Capturar Monstro'
            )}
          </button>
        </div>

        <div className="flex justify-center mt-3 gap-3">
          {!isActive && !isLoading && (
            <button
              className="text-qmy-gold/60 text-xs font-rajdhani hover:text-qmy-gold"
              onClick={() => startCamera()}
            >
              📷 Iniciar Câmara
            </button>
          )}
          {isActive && (
            <button
              className="text-qmy-gold/40 text-xs font-rajdhani hover:text-qmy-gold/60"
              onClick={() => stopCamera()}
            >
              ⏹ Parar Câmara
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
