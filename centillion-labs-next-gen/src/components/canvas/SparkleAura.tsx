import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SparkleAuraProps {
    count?: number;
    color?: string;
    bounds?: number;
}

export const SparkleAura: React.FC<SparkleAuraProps> = ({
    count = 400,
    color = '#00e5ff',
    bounds = 6
}) => {
    const pointsRef = useRef<THREE.Points>(null);

    // Initialize positions and velocities
    const { positions, velocities } = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const vel = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 2;
            const y = (Math.random() - 0.5) * 2;
            const z = (Math.random() - 0.5) * 2;
            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;
            vel.push(new THREE.Vector3(x, y, z).normalize().multiplyScalar(Math.random() * 0.04 + 0.01));
        }
        return { positions: pos, velocities: vel };
    }, [count]);

    useFrame(() => {
        if (!pointsRef.current) return;
        const geometry = pointsRef.current.geometry;
        const posAttribute = geometry.attributes.position as THREE.BufferAttribute;
        const posArray = posAttribute.array;

        for (let i = 0; i < count; i++) {
            let x = posArray[i * 3];
            let y = posArray[i * 3 + 1];
            let z = posArray[i * 3 + 2];

            const vel = velocities[i];
            x += vel.x;
            y += vel.y;
            z += vel.z;

            // Reset particle if it flows out of bounds
            const dist = Math.sqrt(x * x + y * y + z * z);
            if (dist > bounds) {
                x = (Math.random() - 0.5) * 1;
                y = (Math.random() - 0.5) * 1;
                z = (Math.random() - 0.5) * 1;
                velocities[i] = new THREE.Vector3(x, y, z).normalize().multiplyScalar(Math.random() * 0.04 + 0.01);
            }

            posArray[i * 3] = x;
            posArray[i * 3 + 1] = y;
            posArray[i * 3 + 2] = z;
        }
        posAttribute.needsUpdate = true;

        // Add slow rotation to the entire particle cloud
        pointsRef.current.rotation.y += 0.001;
        pointsRef.current.rotation.x += 0.0005;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                color={color}
                size={0.15}
                transparent
                opacity={0.8}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
};
