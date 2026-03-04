import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { RoundedBox, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export type Ninja3DMode = 'patrol' | 'stealth' | 'rage';

type Props = {
  enabled: boolean;
  mode: Ninja3DMode;
  speed: number; // 0.5..3
};

function NinjaRig({ enabled, mode, speed }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const armLRef = useRef<THREE.Group>(null);
  const armRRef = useRef<THREE.Group>(null);
  const legLRef = useRef<THREE.Group>(null);
  const legRRef = useRef<THREE.Group>(null);
  const auraRef = useRef<THREE.Mesh>(null);

  const materials = useMemo(() => {
    const armor = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0b0b12'),
      metalness: 0.55,
      roughness: 0.3,
    });

    const cloth = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#12121c'),
      metalness: 0.15,
      roughness: 0.75,
    });

    const crimson = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#c0392b'),
      emissive: new THREE.Color('#6a0f00'),
      emissiveIntensity: 0.6,
      metalness: 0.2,
      roughness: 0.55,
    });

    const visor = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1b0a08'),
      emissive: new THREE.Color('#ff2d00'),
      emissiveIntensity: 1.2,
      metalness: 0.3,
      roughness: 0.35,
    });

    const blade = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#a8c8e8'),
      emissive: new THREE.Color('#2b6cff'),
      emissiveIntensity: 0.25,
      metalness: 0.9,
      roughness: 0.2,
    });

    const aura = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ff2d00'),
      emissive: new THREE.Color('#ff2d00'),
      emissiveIntensity: 0.9,
      transparent: true,
      opacity: 0.35,
      metalness: 0.0,
      roughness: 1.0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return { armor, cloth, crimson, visor, blade, aura };
  }, []);

  useFrame(({ clock }) => {
    if (!enabled) return;

    const t = clock.getElapsedTime();
    const s = Math.max(0.35, Math.min(3, speed));
    const run = t * 6.0 * s;
    const bob = Math.sin(t * 2.2 * s) * 0.06;

    const group = groupRef.current;
    if (!group) return;

    // Base idle
    group.position.y = bob;
    group.rotation.y = Math.sin(t * 0.6) * 0.08;

    // Limb motion
    const armL = armLRef.current;
    const armR = armRRef.current;
    const legL = legLRef.current;
    const legR = legRRef.current;

    const a = Math.sin(run) * 0.65;
    const b = Math.sin(run + Math.PI) * 0.65;

    if (armL && armR && legL && legR) {
      armL.rotation.x = a;
      armR.rotation.x = b;
      legL.rotation.x = b;
      legR.rotation.x = a;
    }

    // Head tracking-ish
    const head = headRef.current;
    if (head) {
      head.rotation.y = Math.sin(t * 0.9) * 0.12;
      head.rotation.x = Math.sin(t * 0.7) * 0.06;
    }

    // Aura
    const aura = auraRef.current;
    if (aura) {
      const pulse = 1 + Math.sin(t * 2.4) * 0.08;
      aura.scale.setScalar(pulse);
      aura.rotation.z = t * 0.6;
      const mat = aura.material as THREE.MeshStandardMaterial;
      if (mode === 'rage') {
        mat.opacity = 0.65;
        mat.emissiveIntensity = 1.7;
      } else if (mode === 'stealth') {
        mat.opacity = 0.08;
        mat.emissiveIntensity = 0.2;
      } else {
        mat.opacity = 0.35;
        mat.emissiveIntensity = 0.9;
      }
    }

    // Mode tweaks
    if (mode === 'stealth') {
      group.rotation.z = Math.sin(t * 1.2) * 0.02;
      group.position.x = Math.sin(t * 0.8) * 0.02;
    } else if (mode === 'rage') {
      group.position.x = (Math.random() - 0.5) * 0.03;
      group.position.y = bob + (Math.random() - 0.5) * 0.03;
      group.rotation.z = (Math.random() - 0.5) * 0.05;
    } else {
      group.rotation.z = Math.sin(t * 1.0) * 0.01;
      group.position.x = 0;
    }
  });

  const globalOpacity = mode === 'stealth' ? 0.35 : 1;
  const visorEmissive = mode === 'stealth' ? '#00ffcc' : mode === 'rage' ? '#ff8a00' : '#ff2d00';
  const visorIntensity = mode === 'stealth' ? 0.8 : mode === 'rage' ? 2.0 : 1.25;

  const visorMat = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1b0a08'),
      emissive: new THREE.Color(visorEmissive),
      emissiveIntensity: visorIntensity,
      metalness: 0.3,
      roughness: 0.35,
      transparent: globalOpacity < 1,
      opacity: globalOpacity,
    });
    return m;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visorEmissive, visorIntensity, globalOpacity]);

  const armorMat = useMemo(() => {
    const c = mode === 'rage' ? '#0b0708' : '#0b0b12';
    const m = materials.armor.clone();
    m.color = new THREE.Color(c);
    m.transparent = globalOpacity < 1;
    m.opacity = globalOpacity;
    return m;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, globalOpacity]);

  const clothMat = useMemo(() => {
    const m = materials.cloth.clone();
    m.transparent = globalOpacity < 1;
    m.opacity = globalOpacity;
    return m;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalOpacity]);

  const crimsonMat = useMemo(() => {
    const m = materials.crimson.clone();
    m.emissiveIntensity = mode === 'rage' ? 1.1 : 0.6;
    m.transparent = globalOpacity < 1;
    m.opacity = globalOpacity;
    return m;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, globalOpacity]);

  const bladeMat = useMemo(() => {
    const m = materials.blade.clone();
    m.emissiveIntensity = mode === 'rage' ? 0.5 : 0.25;
    m.transparent = globalOpacity < 1;
    m.opacity = globalOpacity;
    return m;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, globalOpacity]);

  return (
    <group ref={groupRef} position={[0, -0.15, 0]}>
      {/* Aura ring */}
      <mesh ref={auraRef} material={materials.aura} position={[0, 0.15, -0.15]}>
        <torusGeometry args={[0.8, 0.12, 24, 90]} />
      </mesh>

      {/* Katana */}
      <group position={[0.36, 0.1, -0.2]} rotation={[0, 0.2, -0.6]}>
        <mesh material={bladeMat}>
          <boxGeometry args={[0.05, 1.0, 0.06]} />
        </mesh>
        <mesh material={crimsonMat} position={[0, -0.46, 0]}>
          <boxGeometry args={[0.18, 0.06, 0.12]} />
        </mesh>
        <mesh material={clothMat} position={[0, -0.58, 0]}>
          <boxGeometry args={[0.08, 0.18, 0.08]} />
        </mesh>
      </group>

      {/* Torso */}
      <RoundedBox args={[0.58, 0.7, 0.36]} radius={0.12} smoothness={4} material={armorMat} />

      {/* Chest circuit */}
      <mesh position={[0, 0.08, 0.19]} material={visorMat}>
        <boxGeometry args={[0.06, 0.42, 0.02]} />
      </mesh>
      <mesh position={[0, 0.22, 0.19]} material={visorMat}>
        <boxGeometry args={[0.35, 0.03, 0.02]} />
      </mesh>

      {/* Head */}
      <group ref={headRef} position={[0, 0.62, 0.02]}>
        <mesh material={clothMat}>
          <sphereGeometry args={[0.34, 24, 24]} />
        </mesh>
        {/* visor */}
        <mesh material={visorMat} position={[0, 0.02, 0.26]}>
          <RoundedBox args={[0.56, 0.18, 0.08]} radius={0.06} smoothness={4} />
        </mesh>
        {/* headband */}
        <mesh material={crimsonMat} position={[0, 0.12, 0.22]}>
          <RoundedBox args={[0.62, 0.14, 0.09]} radius={0.06} smoothness={4} />
        </mesh>
        {/* scarf tail */}
        <mesh material={crimsonMat} position={[0.28, -0.16, -0.08]} rotation={[0.2, 0.4, 0.6]}>
          <boxGeometry args={[0.12, 0.42, 0.06]} />
        </mesh>
      </group>

      {/* Arms */}
      <group ref={armLRef} position={[-0.38, 0.18, 0]} rotation={[0.2, 0, 0.15]}>
        <mesh material={armorMat}>
          <cylinderGeometry args={[0.06, 0.08, 0.6, 16]} />
        </mesh>
        <mesh material={crimsonMat} position={[0, -0.28, 0]}>
          <cylinderGeometry args={[0.085, 0.085, 0.14, 16]} />
        </mesh>
      </group>
      <group ref={armRRef} position={[0.38, 0.18, 0]} rotation={[0.2, 0, -0.15]}>
        <mesh material={armorMat}>
          <cylinderGeometry args={[0.06, 0.08, 0.6, 16]} />
        </mesh>
        <mesh material={crimsonMat} position={[0, -0.28, 0]}>
          <cylinderGeometry args={[0.085, 0.085, 0.14, 16]} />
        </mesh>
      </group>

      {/* Legs */}
      <group ref={legLRef} position={[-0.16, -0.55, 0]} rotation={[0.2, 0, 0]}>
        <mesh material={armorMat}>
          <cylinderGeometry args={[0.08, 0.1, 0.7, 16]} />
        </mesh>
        <mesh material={crimsonMat} position={[0, -0.34, 0.06]}>
          <boxGeometry args={[0.22, 0.12, 0.28]} />
        </mesh>
      </group>
      <group ref={legRRef} position={[0.16, -0.55, 0]} rotation={[0.2, 0, 0]}>
        <mesh material={armorMat}>
          <cylinderGeometry args={[0.08, 0.1, 0.7, 16]} />
        </mesh>
        <mesh material={crimsonMat} position={[0, -0.34, 0.06]}>
          <boxGeometry args={[0.22, 0.12, 0.28]} />
        </mesh>
      </group>

      {/* Subtle particles */}
      {mode !== 'stealth' && (
        <Sparkles count={16} scale={[2, 2, 1]} size={1.4} speed={0.5} opacity={0.35} color={mode === 'rage' ? '#ff8a00' : '#ff2d00'} />
      )}
      {mode === 'stealth' && (
        <Sparkles count={10} scale={[2, 2, 1]} size={1.2} speed={0.35} opacity={0.25} color={'#00ffcc'} />
      )}
    </group>
  );
}

export function RedTeamNinja3D({ enabled, mode, speed }: Props) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true, preserveDrawingBuffer: false }}
      camera={{ position: [0, 0.2, 2.4], fov: 45 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 2]} intensity={1.1} color={mode === 'rage' ? '#ffb38a' : '#ffffff'} />
      <pointLight position={[-2, 0.5, 2]} intensity={0.7} color={mode === 'stealth' ? '#00ffcc' : '#ff2d00'} />

      <NinjaRig enabled={enabled} mode={mode} speed={speed} />

      <EffectComposer multisampling={0}>
        <Bloom intensity={mode === 'rage' ? 1.35 : mode === 'stealth' ? 0.55 : 0.95} luminanceThreshold={0.18} luminanceSmoothing={0.35} />
        <Noise opacity={0.035} />
        <Vignette eskil={false} offset={0.25} darkness={0.9} />
      </EffectComposer>
    </Canvas>
  );
}
