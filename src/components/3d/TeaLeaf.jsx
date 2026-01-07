import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

export default function TeaLeaf({ position = [0, 0, 0], scale = 1 }) {
  const leafRef = useRef();
  
  // Gentle floating animation
  useFrame((state) => {
    if (leafRef.current) {
      leafRef.current.rotation.y += 0.005;
      leafRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={leafRef} position={position} scale={scale}>
      {/* Leaf body - flattened sphere */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial
          color="#22c55e"
          roughness={0.4}
          metalness={0.1}
          flatShading
        />
      </mesh>
      
      {/* Leaf vein/stem */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
        <meshStandardMaterial
          color="#15803d"
          roughness={0.6}
        />
      </mesh>
    </group>
  );
}
