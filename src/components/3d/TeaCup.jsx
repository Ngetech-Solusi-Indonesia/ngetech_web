import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Torus } from '@react-three/drei';
import TeaLeaf from './TeaLeaf';

export default function TeaCup({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const groupRef = useRef();
  
  // Interactive rotation based on mouse movement
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.mouse.x * 0.3;
      groupRef.current.rotation.x = state.mouse.y * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Cup body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.5, 1.2, 32]} />
        <meshStandardMaterial
          color="#f0fdf4"
          roughness={0.2}
          metalness={0.1}
          transparent={true}
          opacity={0.9}
        />
      </mesh>
      
      {/* Cup rim */}
      <Torus 
        args={[0.6, 0.05, 16, 32]} 
        position={[0, 0.6, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          color="#e5e7eb"
          roughness={0.3}
          metalness={0.2}
        />
      </Torus>
      
      {/* Handle */}
      <Torus
        args={[0.25, 0.05, 16, 32, Math.PI]}
        position={[0.7, 0.2, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <meshStandardMaterial
          color="#f0fdf4"
          roughness={0.2}
          metalness={0.1}
        />
      </Torus>
      
      {/* Tea liquid inside cup */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.55, 0.48, 0.8, 32]} />
        <meshStandardMaterial
          color="#a18072"
          roughness={0.1}
          metalness={0.3}
          transparent={true}
          opacity={0.8}
        />
      </mesh>
      
      {/* Tea leaves floating */}
      <TeaLeaf position={[0.2, 0.5, 0.1]} scale={0.3} />
      <TeaLeaf position={[-0.15, 0.45, -0.1]} scale={0.25} />
      <TeaLeaf position={[0.1, 0.48, -0.2]} scale={0.28} />
    </group>
  );
}
