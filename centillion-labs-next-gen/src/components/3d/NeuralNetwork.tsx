import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';

// ─── Formulas embedded inside the cube, revealed on scroll ───────────────────
// Positions are in cube-local space — all strictly inside (cube face = ±3.5)
const CUBE_FORMULAS = [
    { text: 'Attn = softmax(QKᵀ/√d)V', label: 'Transformer Attention', threshold: 0.06, pos: [-1.8, 2.0, 1.2] as [number, number, number] },
    { text: 'θ_t+1 = θ_t − η ∇L(θ_t)', label: 'Gradient Descent', threshold: 0.12, pos: [2.1, 1.5, -1.0] as [number, number, number] },
    { text: 'L = −Σ y_i log ŷ_i', label: 'Cross-Entropy Loss', threshold: 0.18, pos: [0.8, -2.0, 1.5] as [number, number, number] },
    { text: '∂L/∂W = δ (aˡ⁻¹)ᵀ', label: 'Backpropagation', threshold: 0.24, pos: [-2.1, -1.2, 0.9] as [number, number, number] },
    { text: 'min_G max_D E[log D] + E[log(1−D(G))]', label: 'GAN Objective', threshold: 0.30, pos: [1.5, 2.0, -1.8] as [number, number, number] },
    { text: 'D_KL(P‖Q) = Σ P log(P/Q)', label: 'KL Divergence', threshold: 0.36, pos: [-2.0, 1.8, 1.5] as [number, number, number] },
    { text: 'L_{VAE} = −E[log P] + D_KL(Q‖P)', label: 'VAE Loss (ELBO)', threshold: 0.42, pos: [0.5, -2.1, -2.0] as [number, number, number] },
    { text: 'q(x_t|x_0) = N(x_t; √ᾱ_t x_0, (1−ᾱ_t)I)', label: 'Diffusion Forward', threshold: 0.48, pos: [2.1, -1.5, 0.5] as [number, number, number] },
    { text: 'θ ← θ − α m_t / (√v_t + ε)', label: 'Adam Optimizer', threshold: 0.54, pos: [-1.0, 2.0, -2.1] as [number, number, number] },
    { text: 'y = γ(x − μ)/√(σ² + ε) + β', label: 'Layer Normalization', threshold: 0.59, pos: [-2.1, -2.0, -0.8] as [number, number, number] },
    { text: 'f_t = σ(W_f [h_{t-1}, x_t] + b_f)', label: 'LSTM Forget Gate', threshold: 0.64, pos: [2.0, 2.1, 1.8] as [number, number, number] },
    { text: 'ReLU(x) = max(0, x)', label: 'ReLU Activation', threshold: 0.69, pos: [-1.5, -2.0, 2.1] as [number, number, number] },
    { text: 'P(y|x) = e^{x_y} / Σ e^{x_i}', label: 'Softmax Function', threshold: 0.74, pos: [2.1, 0.2, 2.0] as [number, number, number] },
    { text: 'Q ← Q + α[r + γ max Q\' − Q]', label: 'Q-Learning Update', threshold: 0.80, pos: [-2.1, 2.1, -1.5] as [number, number, number] },
    { text: 'L_q = −log(e^{q·k_+} / Σ e^{q·k_i})', label: 'Contrastive Loss', threshold: 0.86, pos: [1.2, -1.8, -2.1] as [number, number, number] },
] as const;

export const NeuralNetwork: React.FC = () => {
    const groupRef = useRef<THREE.Group>(null);
    const linesRef = useRef<THREE.LineSegments>(null);
    const pointsRef = useRef<THREE.Points>(null);

    const particleCount = 250;
    const maxDistance = 2.8;

    const [themeColor, setThemeColor] = useState('#00e5ff');

    useEffect(() => {
        const updateColor = () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            setThemeColor(isDark ? '#00e5ff' : '#003344');
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

    // Scroll-driven formula transition
    const scrollY = useRef(0);
    const [scrollFrac, setScrollFrac] = useState(0);   // drives JSX fillOpacity via React reconciler
    const lineMatRef = useRef<THREE.LineBasicMaterial>(null!);
    const dotRefs = useRef<THREE.Mesh[]>([]);

    useEffect(() => {
        let lastMoveTime = Date.now();

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

        const handleScroll = () => {
            const total = document.body.scrollHeight - window.innerHeight;
            const frac = total > 0 ? window.scrollY / total : 0;
            scrollY.current = frac;
            setScrollFrac(frac);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [camera]);

    const [positions, linesData, sourceTargets] = useMemo<[Float32Array, Uint16Array, Float32Array[]]>(() => {
        const shapeConfigs = [
            // 0: Smoothed Cube (Organic but evenly distributed)
            (i: number) => {
                const s = 7;
                const pointsPerFace = Math.ceil(particleCount / 6);
                const faceIndex = Math.floor(i / pointsPerFace);
                const localIdx = i % pointsPerFace;

                // Distribute evenly to avoid clumps & empty corners (the "crushed" look)
                const gridSize = Math.ceil(Math.sqrt(pointsPerFace));
                const gx = localIdx % gridSize;
                const gy = Math.floor(localIdx / gridSize);

                // Small jitter keeps it looking organic but stays within face bounds
                const jx = (Math.random() - 0.5) * 0.6;
                const jy = (Math.random() - 0.5) * 0.6;

                // Map to [-s/2, s/2] and clamp so corners are accurately represented
                const pxRaw = (gridSize > 1) ? ((gx + jx) / (gridSize - 1)) * s - (s / 2) : 0;
                const pyRaw = (gridSize > 1) ? ((gy + jy) / (gridSize - 1)) * s - (s / 2) : 0;

                const px = Math.max(-s / 2, Math.min(s / 2, pxRaw));
                const py = Math.max(-s / 2, Math.min(s / 2, pyRaw));
                const pz = s / 2; // Exactly on the face plane — no depth offset

                // Position on the corresponding face
                switch (faceIndex) {
                    case 0: return [px, py, pz]; // Front
                    case 1: return [px, py, -pz]; // Back
                    case 2: return [px, pz, py]; // Top
                    case 3: return [px, -pz, py]; // Bottom
                    case 4: return [pz, px, py]; // Right
                    case 5: default: return [-pz, px, py]; // Left
                }
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

    // Pre-allocate line position buffer to avoid GC pressure
    const linePosBuffer = useMemo(() => new Float32Array(linesData.length * 3), [linesData]);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
        }

        // ── Dot float animation (opacity driven by scrollY ref, not state) ──
        CUBE_FORMULAS.forEach((f, i) => {
            const op = Math.min(Math.max((scrollY.current - f.threshold) / 0.06, 0), 1);
            if (dotRefs.current[i]) {
                dotRefs.current[i].position.y = Math.sin(state.clock.elapsedTime * 0.3 + i * 0.75) * 0.18;
                (dotRefs.current[i].material as THREE.MeshBasicMaterial).opacity = op;
            }
        });

        if (pointsRef.current && linesRef.current) {
            // Always target cube shape — no scroll deformation
            const target = sourceTargets[0];
            const curPos = positions;

            const trailPoint = new THREE.Vector3(999, 999, 999);
            if (isMouseMoving.current && groupRef.current) {
                const raycaster = new THREE.Raycaster();
                raycaster.setFromCamera(mousePos.current, state.camera);
                const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
                raycaster.ray.intersectPlane(plane, trailPoint);
                groupRef.current.worldToLocal(trailPoint);
            }

            for (let i = 0; i < particleCount * 3; i++) {
                const stepTarget = target[i];

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

                const force = (stepTarget - curPos[i]) * 0.08;
                velocities.current[i] += force;
                velocities.current[i] *= 0.82;
                curPos[i] += velocities.current[i];
            }

            pointsRef.current.geometry.attributes.position.needsUpdate = true;

            const lineIndices = linesData;
            for (let i = 0; i < lineIndices.length; i++) {
                const pIdx = lineIndices[i] * 3;
                const offset = i * 3;
                linePosBuffer[offset] = curPos[pIdx];
                linePosBuffer[offset + 1] = curPos[pIdx + 1];
                linePosBuffer[offset + 2] = curPos[pIdx + 2];
            }

            const lineGeom = linesRef.current.geometry;
            if (!lineGeom.attributes.position) {
                lineGeom.setAttribute('position', new THREE.BufferAttribute(linePosBuffer, 3));
            } else {
                lineGeom.attributes.position.needsUpdate = true;
            }
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
                    ref={lineMatRef}
                    color={themeColor}
                    transparent
                    opacity={0.15}
                />
            </lineSegments>

            {/* ── Math formulas embedded inside the cube ─────────────────── */}
            {CUBE_FORMULAS.map((f, i) => {
                // Compute opacity directly from React state — guaranteed correct via reconciler
                const fOp = Math.min(Math.max((scrollFrac - f.threshold) / 0.06, 0), 1);
                return (
                    <Billboard key={f.label} position={f.pos} follow={true}>
                        {/* Glowing anchor dot */}
                        <mesh ref={(el) => { if (el) dotRefs.current[i] = el; }}>
                            <sphereGeometry args={[0.07, 8, 8]} />
                            <meshBasicMaterial color={themeColor} transparent opacity={0} />
                        </mesh>

                        {/* Formula text */}
                        <Text
                            fontSize={0.17}
                            color={themeColor}
                            anchorX="center"
                            anchorY="bottom"
                            position={[0, 0.14, 0]}
                            maxWidth={3.8}
                            textAlign="center"
                            outlineWidth={0.007}
                            outlineColor="#000000"
                            outlineOpacity={fOp * 0.25}
                            fillOpacity={fOp}
                        >
                            {f.text}
                        </Text>

                        {/* Label beneath formula */}
                        <Text
                            fontSize={0.09}
                            color={themeColor}
                            anchorX="center"
                            anchorY="top"
                            position={[0, -0.05, 0]}
                            maxWidth={3.8}
                            textAlign="center"
                            fillOpacity={fOp * 0.25}
                        >
                            {f.label}
                        </Text>
                    </Billboard>
                );
            })}
        </group>
    );
};
