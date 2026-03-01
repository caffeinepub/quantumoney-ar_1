import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface CoinData {
  id: number;
  position: [number, number, number];
  rotationSpeed: [number, number, number];
  floatSpeed: number;
  floatAmplitude: number;
  floatOffset: number;
  driftSpeed: [number, number];
  scale: number;
}

function QMYCoin({ data }: { data: CoinData }) {
  const groupRef = useRef<THREE.Group>(null);
  const initialY = data.position[1];

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;

    // Gentle floating up/down
    groupRef.current.position.y =
      initialY + Math.sin(t * data.floatSpeed + data.floatOffset) * data.floatAmplitude;

    // Slow drift in X and Z
    groupRef.current.position.x =
      data.position[0] + Math.sin(t * data.driftSpeed[0] + data.floatOffset) * 0.8;
    groupRef.current.position.z =
      data.position[2] + Math.cos(t * data.driftSpeed[1] + data.floatOffset) * 0.5;

    // Gentle rotation
    groupRef.current.rotation.y += data.rotationSpeed[1];
    groupRef.current.rotation.x =
      Math.sin(t * 0.3 + data.floatOffset) * 0.15;
  });

  // Gold metallic material
  const goldMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#FFD700'),
        metalness: 0.85,
        roughness: 0.15,
        envMapIntensity: 1.2,
      }),
    []
  );

  const edgeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#B8860B'),
        metalness: 0.9,
        roughness: 0.2,
      }),
    []
  );

  return (
    <group ref={groupRef} position={data.position} scale={data.scale}>
      {/* Coin body — cylinder */}
      <mesh rotation={[Math.PI / 2, 0, 0]} material={goldMaterial} castShadow>
        <cylinderGeometry args={[1, 1, 0.18, 64]} />
      </mesh>

      {/* Coin edge ring (slightly darker gold) */}
      <mesh rotation={[Math.PI / 2, 0, 0]} material={edgeMaterial}>
        <torusGeometry args={[1, 0.09, 16, 64]} />
      </mesh>

      {/* Front face: QMY text */}
      <Text
        position={[0, 0, 0.11]}
        fontSize={0.38}
        color="#1A0A00"
        anchorX="center"
        anchorY="middle"
        fontWeight={700}
        letterSpacing={0.05}
      >
        QMY
      </Text>

      {/* Front face: decorative ring emboss */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[0.72, 0.025, 8, 64]} />
        <meshStandardMaterial color="#B8860B" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Back face: Q symbol */}
      <Text
        position={[0, 0, -0.11]}
        rotation={[0, Math.PI, 0]}
        fontSize={0.42}
        color="#1A0A00"
        anchorX="center"
        anchorY="middle"
        fontWeight={700}
      >
        ✦
      </Text>
    </group>
  );
}

function CoinsScene() {
  const coins = useMemo<CoinData[]>(() => {
    const configs: CoinData[] = [
      {
        id: 0,
        position: [-3.5, 1.2, -2],
        rotationSpeed: [0, 0.008, 0],
        floatSpeed: 0.6,
        floatAmplitude: 0.4,
        floatOffset: 0,
        driftSpeed: [0.15, 0.12],
        scale: 0.55,
      },
      {
        id: 1,
        position: [3.2, -0.8, -3],
        rotationSpeed: [0, 0.012, 0],
        floatSpeed: 0.5,
        floatAmplitude: 0.5,
        floatOffset: 1.2,
        driftSpeed: [0.18, 0.14],
        scale: 0.7,
      },
      {
        id: 2,
        position: [0.5, 2.5, -4],
        rotationSpeed: [0, 0.007, 0],
        floatSpeed: 0.7,
        floatAmplitude: 0.35,
        floatOffset: 2.4,
        driftSpeed: [0.13, 0.16],
        scale: 0.45,
      },
      {
        id: 3,
        position: [-2.0, -1.5, -1.5],
        rotationSpeed: [0, 0.01, 0],
        floatSpeed: 0.55,
        floatAmplitude: 0.45,
        floatOffset: 3.6,
        driftSpeed: [0.2, 0.11],
        scale: 0.6,
      },
      {
        id: 4,
        position: [2.8, 1.8, -2.5],
        rotationSpeed: [0, 0.009, 0],
        floatSpeed: 0.65,
        floatAmplitude: 0.38,
        floatOffset: 4.8,
        driftSpeed: [0.16, 0.19],
        scale: 0.5,
      },
      {
        id: 5,
        position: [-1.0, 0.2, -5],
        rotationSpeed: [0, 0.011, 0],
        floatSpeed: 0.45,
        floatAmplitude: 0.55,
        floatOffset: 0.8,
        driftSpeed: [0.14, 0.13],
        scale: 0.8,
      },
      {
        id: 6,
        position: [1.5, -2.2, -3.5],
        rotationSpeed: [0, 0.006, 0],
        floatSpeed: 0.75,
        floatAmplitude: 0.3,
        floatOffset: 5.5,
        driftSpeed: [0.17, 0.15],
        scale: 0.42,
      },
    ];
    return configs;
  }, []);

  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.4} color="#FFD700" />

      {/* Key light — warm gold */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={2.5}
        color="#FFE066"
        castShadow
      />

      {/* Fill light — cool blue for contrast */}
      <directionalLight
        position={[-5, -3, -5]}
        intensity={0.8}
        color="#4466FF"
      />

      {/* Rim light */}
      <pointLight position={[0, 0, 6]} intensity={1.5} color="#FFD700" />

      {coins.map(coin => (
        <QMYCoin key={coin.id} data={coin} />
      ))}
    </>
  );
}

export default function FloatingQMYCoins() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 15 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
        dpr={[1, 2]}
      >
        <CoinsScene />
      </Canvas>
    </div>
  );
}
