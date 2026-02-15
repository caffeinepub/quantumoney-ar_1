import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

export default function QuantumUniverseScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
}
