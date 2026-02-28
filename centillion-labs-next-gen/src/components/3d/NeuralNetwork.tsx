import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const NeuralNetwork: React.FC = () => {
    const groupRef = useRef<THREE.Group>(null);
    const linesRef = useRef<THREE.LineSegments>(null);
    const pointsRef = useRef<THREE.Points>(null);

    const particleCount = 250;
    const maxDistance = 2.8;

    const [themeColor, setThemeColor] = useState('#00e5ff');

    useEffect(() => {
        const updateColor = () => {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            setThemeColor(isLight ? '#003344' : '#00e5ff');
        };

        updateColor();
        const observer = new MutationObserver(updateColor);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    const currentPositions = useRef<Float32Array>(new Float32Array(particleCount * 3));
    const velocities = useRef<Float32Array>(new Float32Array(particleCount * 3));
    const targetPositions = useRef<Float32Array[]>([]);

    // Mouse trailing
    const mousePos = useRef(new THREE.Vector2(0, 0));
    const mouseVelocity = useRef(new THREE.Vector2(0, 0));
    const isMouseMoving = useRef(false);
    const { camera } = useThree();

    // Determine current section node target to snap cursor repulsion back
    const scrollY = useRef(0);
    useEffect(() => {
        let lastMoveTime = Date.now();
        const handleScroll = () => { scrollY.current = window.scrollY / (document.body.scrollHeight - window.innerHeight); };

        const handleMouseMove = (e: MouseEvent) => {
            const mx = (e.clientX / window.innerWidth) * 2 - 1;
            const my = -(e.clientY / window.innerHeight) * 2 + 1;

            mouseVelocity.current.x = mx - mousePos.current.x;
            mouseVelocity.current.y = my - mousePos.current.y;
            mousePos.current.set(mx, my);

            isMouseMoving.current = true;
            lastMoveTime = Date.now();

            setTimeout(() => {
                if (Date.now() - lastMoveTime >= 50) {
                    isMouseMoving.current = false;
                }
            }, 100);
        };

        const handleClick = (e: MouseEvent) => {
            const mouse = new THREE.Vector2(
                (e.clientX / window.innerWidth) * 2 - 1,
                -(e.clientY / window.innerHeight) * 2 + 1
            );

            const raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);

            // Create a plane at Z=0 to intersect with
            const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
            const intersectPoint = new THREE.Vector3();
            raycaster.ray.intersectPlane(plane, intersectPoint);

            if (intersectPoint && groupRef.current) {
                // Apply explosive radial velocity from click point
                const curPos = currentPositions.current;
                // Convert intersection to local group space
                groupRef.current.worldToLocal(intersectPoint);

                for (let i = 0; i < particleCount; i++) {
                    const px = curPos[i * 3];
                    const py = curPos[i * 3 + 1];
                    const pz = curPos[i * 3 + 2];

                    const dx = px - intersectPoint.x;
                    const dy = py - intersectPoint.y;
                    const dz = pz - intersectPoint.z;

                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                    const maxDist = 8;

                    if (dist < maxDist) {
                        const force = (1 - dist / maxDist) * 2.5; // Explosion strength
                        velocities.current[i * 3] += (dx / dist) * force;
                        velocities.current[i * 3 + 1] += (dy / dist) * force;
                        velocities.current[i * 3 + 2] += (dz / dist) * force;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
        };
    }, [camera]);

    const [positions, linesData, sourceTargets] = useMemo<[Float32Array, Uint16Array, Float32Array[]]>(() => {
        const shapeConfigs = [
            // 0: Cube
            () => {
                const s = 7;
                const d = Math.floor(Math.random() * 3);
                const v = Math.random() > 0.5 ? s / 2 : -s / 2;
                const r1 = (Math.random() - 0.5) * s;
                const r2 = (Math.random() - 0.5) * s;
                return [
                    d === 0 ? v : d === 1 ? r1 : r2,
                    d === 1 ? v : d === 2 ? r1 : r2,
                    d === 2 ? v : d === 0 ? r1 : r2,
                ];
            },
            // 1: Sphere
            () => {
                const theta = Math.random() * 2 * Math.PI;
                const phi = Math.acos((Math.random() * 2) - 1);
                const r = 4 + Math.random() * 2.5;
                return [r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)];
            },
            // 1: Double Helix
            (i: number) => {
                const t = (i / particleCount) * Math.PI * 4;
                const r = 2.5 + Math.random() * 0.5;
                const offset = i % 2 === 0 ? 0 : Math.PI;
                return [r * Math.cos(t + offset), (t - Math.PI * 2) * 1.5, r * Math.sin(t + offset)];
            },
            // 2: Torus
            () => {
                const u = Math.random() * Math.PI * 2;
                const v = Math.random() * Math.PI * 2;
                const r1 = 5;
                const r2 = 1.5 + Math.random() * 0.5;
                return [(r1 + r2 * Math.cos(v)) * Math.cos(u), r2 * Math.sin(v), (r1 + r2 * Math.cos(v)) * Math.sin(u)];
            },
            // 3: Airplane / Arrow Shape (Infracorp reference)
            (i: number) => {
                const t = i / particleCount;
                const spread = Math.random() * 0.5 - 0.25;
                if (t < 0.4) { return [0, t * 10 - 5, spread * 2]; } // Fuselage
                if (t < 0.7) { const x = (t - 0.4) * 8; return [x * (Math.random() > 0.5 ? 1 : -1), t * 10 - 6, spread]; } // Wings
                return [spread * 2, -5 + Math.random() * 1.5, spread]; // Tail
            }
        ];

        shapeConfigs.forEach(generator => {
            const pos = new Float32Array(particleCount * 3);
            for (let i = 0; i < particleCount; i++) {
                const [x, y, z] = generator(i);
                pos[i * 3] = x;
                pos[i * 3 + 1] = y;
                pos[i * 3 + 2] = z;
            }
            targetPositions.current.push(pos);
        });

        // Initialize current positions to shape 0
        currentPositions.current.set(targetPositions.current[0]);

        // Generate static lines (synapses)
        const pts: THREE.Vector3[] = [];
        for (let i = 0; i < particleCount; i++) {
            pts.push(new THREE.Vector3(targetPositions.current[0][i * 3], targetPositions.current[0][i * 3 + 1], targetPositions.current[0][i * 3 + 2]));
        }
        const linePositions = [];
        for (let i = 0; i < particleCount; i++) {
            for (let j = i + 1; j < particleCount; j++) {
                if (pts[i].distanceTo(pts[j]) < maxDistance) {
                    linePositions.push(i, j); // Store indices, not raw coords for dynamic updates
                }
            }
        }

        return [currentPositions.current, new Uint16Array(linePositions), targetPositions.current] as [Float32Array, Uint16Array, Float32Array[]];
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
        }

        if (pointsRef.current && linesRef.current) {
            const scroll = scrollY.current;
            const targetShapeCount = 5;
            // Determine which 2 shapes to interpolate between based on scroll 0 -> 1
            const rawIndex = scroll * (targetShapeCount - 1);
            const index1 = Math.floor(rawIndex);
            const index2 = Math.min(index1 + 1, targetShapeCount - 1);
            const lerpFactor = rawIndex - index1;

            const t1 = sourceTargets[index1];
            const t2 = sourceTargets[index2];
            const curPos = positions;

            // Apply water trail logic
            const raycaster = new THREE.Raycaster();
            let trailPoint = new THREE.Vector3(999, 999, 999);

            if (isMouseMoving.current && groupRef.current) {
                raycaster.setFromCamera(mousePos.current, state.camera);
                const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
                raycaster.ray.intersectPlane(plane, trailPoint);
                groupRef.current.worldToLocal(trailPoint);
            }

            // Apply velocity physics (water ripple) and spring back to target
            for (let i = 0; i < particleCount * 3; i++) {
                const stepTarget = t1[i] + (t2[i] - t1[i]) * lerpFactor;

                // Trail continuous repulsion
                if (i % 3 === 0 && isMouseMoving.current) {
                    const dx = curPos[i] - trailPoint.x;
                    const dy = curPos[i + 1] - trailPoint.y;
                    const dz = curPos[i + 2] - trailPoint.z;
                    const distSq = dx * dx + dy * dy + dz * dz;
                    const trMaxDistSq = 6;

                    if (distSq < trMaxDistSq) {
                        const force = (1 - distSq / trMaxDistSq) * 0.12;
                        velocities.current[i] += dx * force;
                        velocities.current[i + 1] += dy * force;
                        velocities.current[i + 2] += dz * force;
                    }
                }

                // Spring physics towards target
                const force = (stepTarget - curPos[i]) * 0.1; // Spring stiffness
                velocities.current[i] += force;
                velocities.current[i] *= 0.85; // Damping (friction)

                curPos[i] += velocities.current[i];
            }

            pointsRef.current.geometry.attributes.position.needsUpdate = true;

            // Recompute lines based on new point coords mapping (using index map)
            const lineGeom = linesRef.current.geometry;
            const lineIndices = linesData;
            const linePosData = new Float32Array(lineIndices.length * 3);

            for (let i = 0; i < lineIndices.length; i++) {
                const pIdx = lineIndices[i] * 3;
                linePosData[i * 3] = curPos[pIdx];
                linePosData[i * 3 + 1] = curPos[pIdx + 1];
                linePosData[i * 3 + 2] = curPos[pIdx + 2];
            }

            lineGeom.setAttribute('position', new THREE.BufferAttribute(linePosData, 3));
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
                    {/* The line geometry is injected dynamically in useFrame */}
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
