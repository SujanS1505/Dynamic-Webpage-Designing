import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const NeuralNetwork: React.FC = () => {
    const groupRef = useRef<THREE.Group>(null);
    const linesRef = useRef<THREE.LineSegments>(null);
    const pointsRef = useRef<THREE.Points>(null);

    const particleCount = 250;
    const maxDistance = 2.8;

    const [themeColor, setThemeColor] = React.useState('#00e5ff');

    React.useEffect(() => {
        const updateColor = () => {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            setThemeColor(isLight ? '#009688' : '#00e5ff');
        };

        updateColor();
        const observer = new MutationObserver(updateColor);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    const [positions, linesData] = useMemo(() => {

        const pos = new Float32Array(particleCount * 3);
        const pts: THREE.Vector3[] = [];
        for (let i = 0; i < particleCount; i++) {
            const theta = Math.random() * 2 * Math.PI;
            const phi = Math.acos((Math.random() * 2) - 1);
            const r = 4 + Math.random() * 2.5; // radius between 4 and 6.5

            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.sin(phi) * Math.sin(theta);
            const z = r * Math.cos(phi);

            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;
            pts.push(new THREE.Vector3(x, y, z));
        }

        // Generate lines
        const linePositions = [];
        for (let i = 0; i < particleCount; i++) {
            for (let j = i + 1; j < particleCount; j++) {
                const dist = pts[i].distanceTo(pts[j]);
                if (dist < maxDistance) {
                    linePositions.push(
                        pts[i].x, pts[i].y, pts[i].z,
                        pts[j].x, pts[j].y, pts[j].z
                    );
                }
            }
        }

        return [pos, new Float32Array(linePositions)];
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.08}
                    color={themeColor}
                    transparent
                    opacity={0.8}
                    sizeAttenuation
                />
            </points>
            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[linesData, 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    color={themeColor}
                    transparent
                    opacity={0.15}
                />
            </lineSegments>
        </group>
    );
};
