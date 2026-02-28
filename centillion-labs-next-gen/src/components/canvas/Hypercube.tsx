import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';

interface HypercubeProps {
    cubes?: number;
    baseColor?: string;
    edgeColor?: string;
}

export const Hypercube: React.FC<HypercubeProps> = ({
    cubes = 5,
    baseColor = '#1de9b6',
    edgeColor = '#00bfa5'
}) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.getElapsedTime();

        // Base rotation
        groupRef.current.rotation.y = time * 0.1;
        groupRef.current.rotation.z = time * 0.05;

        // Breathing scale effect
        const scale = 1 + Math.sin(time * 0.5) * 0.03;
        groupRef.current.scale.setScalar(scale);

        // Mouse interaction tilt
        const { y } = state.mouse;
        const targetX = (Math.PI / 4) + y * 0.2;
        groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
    });

    return (
        <group ref={groupRef} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            {Array.from({ length: cubes }).map((_, i) => {
                const size = (i + 1) * 1.5;
                const opacity = 0.15 + (i * 0.05);

                return (
                    <mesh key={i}>
                        <boxGeometry args={[size, size, size]} />
                        <meshPhysicalMaterial
                            color={baseColor}
                            transparent
                            opacity={opacity}
                            roughness={0.1}
                            transmission={0.5}
                            thickness={0.5}
                            side={THREE.DoubleSide}
                            depthWrite={false}
                        />
                        <Edges
                            linewidth={2}
                            scale={1}
                            threshold={15}
                            color={edgeColor}
                            transparent
                            opacity={0.8}
                        />
                    </mesh>
                );
            })}
        </group>
    );
};
