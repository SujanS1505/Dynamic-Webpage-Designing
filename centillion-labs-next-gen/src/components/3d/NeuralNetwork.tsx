import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';

// ─── Formulas embedded inside the cube, revealed on scroll ───────────────────
// Positions are in cube-local space — all strictly inside (cube face = ±3.5)
const CUBE_FORMULAS = [
    { text: 'ζ(s) = Σ 1/nˢ',               label: 'Riemann Hypothesis',       threshold: 0.06, pos: [-1.8,  2.0,  1.2] as [number,number,number] },
    { text: 'eⁱᵖⁱ + 1 = 0',                label: "Euler's Identity",          threshold: 0.12, pos: [ 2.1,  1.5, -1.0] as [number,number,number] },
    { text: 'P(H|E) ∝ P(E|H)·P(H)',        label: "Bayes' Theorem",            threshold: 0.18, pos: [ 0.8, -2.0,  1.5] as [number,number,number] },
    { text: 'θ ← θ − α ∇J(θ)',             label: 'Gradient Descent',          threshold: 0.24, pos: [-2.1, -1.2,  0.9] as [number,number,number] },
    { text: 'Attn = softmax(QKᵀ/√d)V',     label: 'Transformer Attention',     threshold: 0.30, pos: [ 1.5,  2.0, -1.8] as [number,number,number] },
    { text: 'L = −Σ yᵢ log ŷᵢ',           label: 'Cross-Entropy Loss',        threshold: 0.36, pos: [-2.0,  1.8,  1.5] as [number,number,number] },
    { text: '∂L/∂W = δ (aˡ⁻¹)ᵀ',          label: 'Backpropagation',           threshold: 0.42, pos: [ 0.5, -2.1, -2.0] as [number,number,number] },
    { text: 'D_KL(P‖Q) = Σ P log(P/Q)',   label: 'KL Divergence',             threshold: 0.48, pos: [ 2.1, -1.5,  0.5] as [number,number,number] },
    { text: 'H(X) = −Σ p log₂ p',         label: 'Shannon Entropy',           threshold: 0.54, pos: [-1.0,  2.0, -2.1] as [number,number,number] },
    { text: 'f̂(ξ) = ∫ f(x) e^{−2πixξ}dx', label: 'Fourier Transform',         threshold: 0.59, pos: [-2.1, -2.0, -0.8] as [number,number,number] },
    { text: '∇·E = ρ/ε₀',                  label: "Maxwell's Eq.",             threshold: 0.64, pos: [ 2.0,  2.1,  1.8] as [number,number,number] },
    { text: 'σ(x) = 1/(1+e^{−x})',         label: 'Sigmoid',                   threshold: 0.69, pos: [-1.5, -2.0,  2.1] as [number,number,number] },
    { text: 'Var(X) = E[X²]−(EX)²',       label: 'Variance',                  threshold: 0.74, pos: [ 2.1,  0.2,  2.0] as [number,number,number] },
    { text: 'F(s) = ∫₀^∞ f(t)e^{−st}dt',  label: 'Laplace Transform',         threshold: 0.80, pos: [-2.1,  2.1, -1.5] as [number,number,number] },
    { text: 'E = mc²',                      label: 'Mass-Energy Equivalence',   threshold: 0.86, pos: [ 1.2, -1.8, -2.1] as [number,number,number] },
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
    const scrollY    = useRef(0);
    const [scrollFrac, setScrollFrac] = useState(0);   // drives JSX fillOpacity via React reconciler
    const lineMatRef = useRef<THREE.LineBasicMaterial>(null!);
    const dotRefs    = useRef<THREE.Mesh[]>([]);

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

        const handleScroll = () => {
            const total = document.body.scrollHeight - window.innerHeight;
            const frac = total > 0 ? window.scrollY / total : 0;
            scrollY.current = frac;
            setScrollFrac(frac);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
            window.removeEventListener('scroll', handleScroll);
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

            let trailPoint = new THREE.Vector3(999, 999, 999);
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
