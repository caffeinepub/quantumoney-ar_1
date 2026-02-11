import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function QuantumParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      // Spread particles in a sphere
      const radius = Math.random() * 50 + 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);

      // Gold/amber color palette
      const colorChoice = Math.random();
      if (colorChoice < 0.5) {
        colors[i] = 1.0; // R
        colors[i + 1] = 0.84; // G
        colors[i + 2] = 0.0; // B (gold)
      } else if (colorChoice < 0.8) {
        colors[i] = 1.0;
        colors[i + 1] = 0.65;
        colors[i + 2] = 0.0; // amber
      } else {
        colors[i] = 0.5;
        colors[i + 1] = 0.3;
        colors[i + 2] = 0.8; // quantum violet
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    return geometry;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;

    const time = state.clock.getElapsedTime();

    // Gentle rotation
    particlesRef.current.rotation.y = time * 0.05;
    particlesRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;

    // Subtle parallax based on mouse position
    particlesRef.current.position.x = mouseRef.current.x * 2;
    particlesRef.current.position.y = mouseRef.current.y * 2;
  });

  // Track mouse movement
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });
  }

  return (
    <points ref={particlesRef} geometry={particlesGeometry}>
      <pointsMaterial
        size={0.15}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function QuantumField() {
  const fieldRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!fieldRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Gentle pulsing
    fieldRef.current.scale.setScalar(1 + Math.sin(time * 0.5) * 0.1);
    fieldRef.current.rotation.z = time * 0.02;
  });

  return (
    <mesh ref={fieldRef} position={[0, 0, -20]}>
      <torusGeometry args={[15, 0.5, 16, 100]} />
      <meshBasicMaterial
        color="#d4af37"
        transparent
        opacity={0.15}
        wireframe
      />
    </mesh>
  );
}

export default function QuantumUniverseScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Ambient lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#d4af37" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b7dd8" />

        {/* Background stars */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />

        {/* Quantum particles */}
        <QuantumParticles />

        {/* Quantum field ring */}
        <QuantumField />

        {/* Subtle orbit controls for depth perception */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.2}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
