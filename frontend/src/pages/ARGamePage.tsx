import { useEffect, useRef, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useActor } from '../hooks/useActor';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetMapMarkers } from '../hooks/useMapMarkers';
import { useSharedLocation } from '../hooks/useSharedLocation';
import { calculateDistance } from '../utils/distance';
import { Variant_coin_monster } from '../backend';
import { useQueryClient } from '@tanstack/react-query';

// ─── 3D Coin Component ────────────────────────────────────────────────────────
interface CoinProps {
  position: [number, number, number];
  distance: number;
  onCollect: () => void;
}

function QMYCoin({ position, distance, onCollect }: CoinProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Distance-based scale: close = big, far = small
  const scale = Math.max(0.15, Math.min(1.0, 1.0 - distance / 250));
  // Distance-based brightness
  const emissiveIntensity = Math.max(0.1, Math.min(1.5, 1.5 - distance / 150));
  // Distance-based opacity
  const opacity = Math.max(0.3, Math.min(1.0, 1.0 - distance / 300));

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Main coin body */}
      <mesh ref={meshRef} onClick={onCollect}>
        <cylinderGeometry args={[0.5, 0.5, 0.08, 32]} />
        <meshStandardMaterial
          color="#FFD700"
          metalness={0.9}
          roughness={0.1}
          emissive="#FF8C00"
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={opacity}
        />
      </mesh>
      {/* Coin rim */}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.5, 0.04, 8, 32]} />
        <meshStandardMaterial
          color="#B8860B"
          metalness={1.0}
          roughness={0.05}
          emissive="#8B6914"
          emissiveIntensity={emissiveIntensity * 0.5}
        />
      </mesh>
      {/* Q letter on coin face */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 0.35, 32]} />
        <meshStandardMaterial
          color="#8B6914"
          metalness={0.8}
          roughness={0.2}
          emissive="#5C4A00"
          emissiveIntensity={emissiveIntensity * 0.3}
        />
      </mesh>
    </group>
  );
}

// ─── AR Scene ─────────────────────────────────────────────────────────────────
interface ARCoin {
  id: string;
  latitude: number;
  longitude: number;
  description: string;
  distance: number;
  screenX: number;
  screenY: number;
}

interface ARSceneProps {
  coins: ARCoin[];
  onCollect: (coin: ARCoin) => void;
}

function ARScene({ coins, onCollect }: ARSceneProps) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 5, 5]} intensity={2} color="#FFD700" />
      <pointLight position={[0, -5, -5]} intensity={0.5} color="#FF8C00" />
      {coins.map((coin) => {
        // Map screen position to 3D space (-3 to 3 range)
        const x = ((coin.screenX / window.innerWidth) - 0.5) * 6;
        const y = ((0.5 - coin.screenY / window.innerHeight) * 4);
        const z = -2 - (coin.distance / 100);
        return (
          <QMYCoin
            key={coin.id}
            position={[x, y, z]}
            distance={coin.distance}
            onCollect={() => onCollect(coin)}
          />
        );
      })}
    </>
  );
}

// ─── Main AR Page ─────────────────────────────────────────────────────────────
export default function ARGamePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  const [collectedCoins, setCollectedCoins] = useState<Set<string>>(new Set());
  const [xpGained, setXpGained] = useState(0);
  const [showXpToast, setShowXpToast] = useState(false);
  const [lastXp, setLastXp] = useState(0);

  const { actor } = useActor();
  const { identity } = useInternetIdentity();
  const { location: userLocation } = useSharedLocation();
  const { data: markers } = useGetMapMarkers();
  const queryClient = useQueryClient();

  const isHttps = window.location.protocol === 'https:' || window.location.hostname === 'localhost';

  // Start camera
  const startCamera = useCallback(async () => {
    if (!isHttps) {
      setCameraError('HTTPS é obrigatório para aceder à câmara. Por favor, acede via HTTPS.');
      return;
    }
    setIsStarting(true);
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err: any) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError('Permissão de câmara negada. Por favor, permite o acesso à câmara nas definições do browser.');
      } else if (err.name === 'NotFoundError') {
        setCameraError('Nenhuma câmara encontrada neste dispositivo.');
      } else if (err.name === 'NotSupportedError') {
        setCameraError('A câmara não é suportada neste browser.');
      } else {
        setCameraError(`Erro ao iniciar câmara: ${err.message}`);
      }
    } finally {
      setIsStarting(false);
    }
  }, [isHttps]);

  // Stop camera on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  // Compute AR coins from map markers + user location
  const arCoins: ARCoin[] = [];
  if (markers && userLocation) {
    markers
      .filter(m => m.markerType === Variant_coin_monster.coin || (m.markerType as any) === 'coin')
      .filter(m => !collectedCoins.has(m.id))
      .forEach((marker) => {
        const dist = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          marker.latitude,
          marker.longitude
        );
        // Only show coins within 500m
        if (dist <= 500) {
          // Compute bearing to coin
          const dLon = (marker.longitude - userLocation.longitude) * (Math.PI / 180);
          const lat1 = userLocation.latitude * (Math.PI / 180);
          const lat2 = marker.latitude * (Math.PI / 180);
          const y = Math.sin(dLon) * Math.cos(lat2);
          const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
          const bearing = Math.atan2(y, x);

          // Map bearing to screen X position
          const screenX = (window.innerWidth / 2) + Math.sin(bearing) * (window.innerWidth / 3);
          const screenY = window.innerHeight / 2 + (dist / 500) * (window.innerHeight / 4);

          arCoins.push({
            id: marker.id,
            latitude: marker.latitude,
            longitude: marker.longitude,
            description: marker.description,
            distance: dist,
            screenX,
            screenY,
          });
        }
      });
  }

  // Collect coin
  const handleCollect = useCallback(async (coin: ARCoin) => {
    if (!actor || !identity) return;
    const xpReward = Math.round(coin.distance);
    try {
      // Get current profile and update XP
      const profile = await actor.getCallerUserProfile();
      if (profile) {
        const updatedProfile = {
          ...profile,
          xp: profile.xp + BigInt(xpReward),
          availableTokens: profile.availableTokens + BigInt(1),
        };
        await actor.saveCallerUserProfile(updatedProfile);
        setCollectedCoins(prev => new Set([...prev, coin.id]));
        setXpGained(prev => prev + xpReward);
        setLastXp(xpReward);
        setShowXpToast(true);
        setTimeout(() => setShowXpToast(false), 3000);
        queryClient.invalidateQueries({ queryKey: ['callerUserProfile'] });
      }
    } catch (err) {
      console.error('Failed to collect coin:', err);
    }
  }, [actor, identity, queryClient]);

  const principalId = identity?.getPrincipal().toString();

  return (
    <div className="fixed inset-0 bg-black" style={{ top: 0 }}>
      {/* Camera feed as background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
        autoPlay
      />

      {/* Dark overlay when camera not active */}
      {!cameraActive && (
        <div className="absolute inset-0 bg-black flex flex-col items-center justify-center gap-6 px-6">
          <div className="text-center">
            <h1 className="text-qmy-gold font-cinzel font-bold text-2xl tracking-wider mb-2">
              QUANTUMONEY AR
            </h1>
            <p className="text-qmy-gold/60 font-rajdhani text-sm">
              Modo de Realidade Aumentada
            </p>
          </div>

          {cameraError ? (
            <div className="bg-red-900/80 border border-red-500 rounded p-4 max-w-sm text-center">
              <p className="text-red-300 font-rajdhani text-sm">{cameraError}</p>
              {!isHttps && (
                <p className="text-red-400/70 font-rajdhani text-xs mt-2">
                  URL atual: {window.location.protocol}//{window.location.host}
                </p>
              )}
            </div>
          ) : (
            <div className="bg-black/80 border border-qmy-gold/40 rounded p-4 max-w-sm text-center">
              <p className="text-qmy-gold/70 font-rajdhani text-sm mb-3">
                Ativa a câmara para ver as moedas QMY em realidade aumentada.
              </p>
              {!identity && (
                <p className="text-yellow-400/70 font-rajdhani text-xs mb-3">
                  ⚠️ Faz login para recolher moedas e ganhar XP.
                </p>
              )}
            </div>
          )}

          {!isHttps ? (
            <div className="bg-yellow-900/60 border border-yellow-500/50 rounded p-3 max-w-sm text-center">
              <p className="text-yellow-300 font-rajdhani text-xs">
                ⚠️ HTTPS necessário para aceder à câmara
              </p>
            </div>
          ) : (
            <button
              onClick={startCamera}
              disabled={isStarting}
              className="px-8 py-3 bg-qmy-gold text-black font-cinzel font-bold text-sm tracking-wider hover:bg-qmy-gold/80 transition-colors disabled:opacity-50"
            >
              {isStarting ? 'A iniciar câmara...' : '📷 ATIVAR CÂMARA AR'}
            </button>
          )}
        </div>
      )}

      {/* 3D Canvas overlay */}
      {cameraActive && (
        <div className="absolute inset-0 pointer-events-none">
          <Canvas
            style={{ background: 'transparent' }}
            camera={{ position: [0, 0, 5], fov: 75 }}
            gl={{ alpha: true, antialias: true }}
          >
            <ARScene
              coins={arCoins}
              onCollect={(coin) => {
                // Re-enable pointer events for collection
                handleCollect(coin);
              }}
            />
          </Canvas>
        </div>
      )}

      {/* Coin click targets (HTML overlay for better touch) */}
      {cameraActive && arCoins.map((coin) => {
        const scale = Math.max(0.15, Math.min(1.0, 1.0 - coin.distance / 250));
        const size = Math.round(60 * scale);
        const opacity = Math.max(0.3, Math.min(1.0, 1.0 - coin.distance / 300));
        return (
          <button
            key={coin.id}
            onClick={() => handleCollect(coin)}
            style={{
              position: 'absolute',
              left: coin.screenX - size / 2,
              top: coin.screenY - size / 2,
              width: size,
              height: size,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(255,215,0,${opacity}) 0%, rgba(184,134,11,${opacity * 0.7}) 70%, transparent 100%)`,
              border: `2px solid rgba(255,215,0,${opacity})`,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: `${Math.round(size * 0.4)}px`,
              fontWeight: 'bold',
              color: `rgba(139,105,20,${opacity})`,
              boxShadow: `0 0 ${Math.round(size * 0.5)}px rgba(255,215,0,${opacity * 0.5})`,
              zIndex: 10,
            }}
            title={`${coin.description} — ${Math.round(coin.distance)}m — Toca para recolher (+${Math.round(coin.distance)} XP)`}
          >
            Q
          </button>
        );
      })}

      {/* HUD overlay */}
      {cameraActive && (
        <div className="absolute top-0 left-0 right-0 pt-16 px-4 pointer-events-none">
          <div className="flex items-start justify-between mt-2">
            {/* Left: stats */}
            <div className="bg-black/70 border border-qmy-gold/40 px-3 py-2 rounded">
              <p className="text-qmy-gold font-rajdhani text-xs font-bold">
                XP GANHO: +{xpGained}
              </p>
              {principalId && (
                <p className="text-qmy-gold/50 font-rajdhani text-[10px] mt-0.5">
                  {principalId.slice(0, 12)}...
                </p>
              )}
            </div>
            {/* Right: coin count */}
            <div className="bg-black/70 border border-qmy-gold/40 px-3 py-2 rounded">
              <p className="text-qmy-gold font-rajdhani text-xs">
                🪙 {arCoins.length} moedas próximas
              </p>
              {userLocation && (
                <p className="text-qmy-gold/50 font-rajdhani text-[10px] mt-0.5">
                  GPS: {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* No location warning */}
      {cameraActive && !userLocation && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-yellow-900/80 border border-yellow-500/50 px-4 py-2 rounded text-center pointer-events-none">
          <p className="text-yellow-300 font-rajdhani text-xs">
            📍 A aguardar GPS... As moedas aparecerão quando a localização estiver disponível.
          </p>
        </div>
      )}

      {/* No markers warning */}
      {cameraActive && userLocation && arCoins.length === 0 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/80 border border-qmy-gold/30 px-4 py-2 rounded text-center pointer-events-none">
          <p className="text-qmy-gold/60 font-rajdhani text-xs">
            Nenhuma moeda QMY nos 500m à volta. Explora o mapa para encontrar moedas!
          </p>
        </div>
      )}

      {/* XP Toast */}
      {showXpToast && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50">
          <div className="bg-qmy-gold text-black font-cinzel font-bold text-xl px-6 py-3 rounded shadow-lg animate-bounce">
            +{lastXp} XP
          </div>
        </div>
      )}

      {/* Stop camera button */}
      {cameraActive && (
        <button
          onClick={() => {
            if (streamRef.current) {
              streamRef.current.getTracks().forEach(t => t.stop());
              streamRef.current = null;
            }
            setCameraActive(false);
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/80 border border-qmy-gold/50 text-qmy-gold font-rajdhani text-sm px-6 py-2 hover:bg-qmy-gold/10 transition-colors z-20"
        >
          ✕ Fechar Câmara
        </button>
      )}
    </div>
  );
}
