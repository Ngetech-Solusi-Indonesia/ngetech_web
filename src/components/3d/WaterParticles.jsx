import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function WaterParticles({ count = 1000 }) {
  const points = useRef();
  
  // Generate random positions for particles
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10; // x
      positions[i * 3 + 1] = Math.random() * 10; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
    }
    
    return positions;
  }, [count]);

  // Animate particles falling
  useFrame((state) => {
    if (points.current) {
      const positions = points.current.geometry.attributes.position.array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Move particle down
        positions[i3 + 1] -= 0.01;
        
        // Reset particle to top when it falls below
        if (positions[i3 + 1] < -5) {
          positions[i3 + 1] = 5;
        }
      }
      
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#87ceeb"
        transparent={true}
        opacity={0.6}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
