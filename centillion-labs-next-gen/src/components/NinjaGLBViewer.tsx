import { useRef, useEffect, useMemo, useState, useCallback, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Sparkles } from '@react-three/drei';
import { Bloom, EffectComposer, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';

const MODEL_PATH = '/models/Ninja-3D.glb';

export type NinjaMode = 'patrol' | 'stealth' | 'rage';

// ─── CSS shadow ninja shown while the GLB is downloading ────────────────────
function NinjaCSSFallback() {
  return (
    <div className="rt-n-sprite" aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
      <div className="rt-n-arm bk" />
      <div className="rt-n-leg bk" />
      <div className="rt-n-torso" />
      <div className="rt-n-collar" />
      <div className="rt-n-head" />
      <div className="rt-n-band">
        <div className="rt-n-visor">
          <div className="rt-n-eye l" />
          <div className="rt-n-eye r" />
        </div>
      </div>
      <div className="rt-n-arm ft" />
      <div className="rt-n-weapon" />
      <div className="rt-n-leg ft" />
    </div>
  );
}

// ─── 3D Model (only mounts after Suspense resolves = model is loaded) ────────
function NinjaModel({
  mode,
  speed,
  onReady,
}: {
  mode: NinjaMode;
  speed: number;
  onReady: () => void;
}) {
  const { scene, animations } = useGLTF(MODEL_PATH);
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const normalizedRef = useRef(false);
  const baseYRef = useRef(0);

  // Deep-clone so each Canvas instance owns independent geometry/material state
  const clonedScene = useMemo(() => {
    const c = clone(scene);
    c.traverse((child: THREE.Object3D) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        if (Array.isArray(mesh.material)) {
          mesh.material = mesh.material.map((m: THREE.Material) => m.clone());
        } else {
          mesh.material = (mesh.material as THREE.Material).clone();
        }
      }
    });
    return c;
  }, [scene]);

  // Signal parent that model is ready (component mounted = Suspense resolved)
  useEffect(() => {
    onReady();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Wire up animation mixer to play the first clip
  useEffect(() => {
    if (!animations.length) return;
    const mixer = new THREE.AnimationMixer(clonedScene);
    mixerRef.current = mixer;
    mixer.clipAction(animations[0]).reset().play();
    return () => { mixer.stopAllAction(); };
  }, [clonedScene, animations]);

  // Mode-based material tints
  useEffect(() => {
    const emissiveColor =
      mode === 'rage' ? 0x3a0000 : mode === 'stealth' ? 0x002222 : 0x000000;
    const emissiveIntensity = mode === 'rage' ? 1.2 : mode === 'stealth' ? 0.3 : 0;

    clonedScene.traverse((child: any) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;

      mesh.frustumCulled = false;
      mesh.visible = true; // explicitly force visibility

      // DEBUG: log if it's a skinned mesh and has skeleton
      if ((mesh as THREE.SkinnedMesh).isSkinnedMesh) {
        const skinned = mesh as THREE.SkinnedMesh;
        if (!skinned.skeleton) console.warn('[NinjaGLBViewer] SkinnedMesh missing skeleton!', mesh.name);
      }

      const mats = (
        Array.isArray(mesh.material) ? mesh.material : [mesh.material]
      ) as THREE.MeshStandardMaterial[];
      for (const mat of mats) {
        if (!mat.isMeshStandardMaterial) {
          mat.transparent = false;
          mat.opacity = 1;
          continue;
        }
        mat.transparent = mode === 'stealth';
        mat.opacity = mode === 'stealth' ? 0.22 : 1;
        mat.emissive.set(emissiveColor);
        mat.emissiveIntensity = emissiveIntensity;
        mat.depthWrite = true;
        mat.needsUpdate = true;
      }
    });
  }, [mode, clonedScene]);

  useFrame(({ clock }, delta) => {
    if (mixerRef.current) {
      mixerRef.current.timeScale = speed;
      mixerRef.current.update(delta);
    }

    const group = groupRef.current;
    if (!group) return;

    if (!normalizedRef.current) {
      group.scale.setScalar(0.009);
      // start perfectly off-screen left
      group.position.set(-2.5, -0.85, 0);
      baseYRef.current = -0.85;
      normalizedRef.current = true;
    }

    const t = clock.getElapsedTime();

    // Constant running to the right (X+ direction)
    const runSpeed = 0.8 * speed; // pixels per second-ish
    group.position.x += runSpeed * delta;

    // Wrap around viewport edges (-2.5 to 2.5 is safely off-camera for the FOV)
    if (group.position.x > 2.5) {
      group.position.x = -2.5;
    }

    // The forward axis of the ninja model might differ.
    // Usually, to face +X (right), rotation.y is Math.PI / 2 or -Math.PI / 2
    // If Math.PI / 2 faced the wrong way (e.g. left or camera), we try -Math.PI / 2
    group.rotation.y = -Math.PI / 2;
    // Add a slight bobbing to mimic weight shifting during run
    group.position.y = baseYRef.current + Math.sin(t * 8.0 * speed) * 0.04;
  });

  return (
    <group ref={groupRef}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <primitive object={clonedScene as any} />
      {mode !== 'stealth' && (
        <Sparkles
          count={mode === 'rage' ? 20 : 8}
          scale={[1.5, 2.5, 1]}
          size={1.3}
          speed={0.4}
          opacity={mode === 'rage' ? 0.55 : 0.2}
          color={mode === 'rage' ? '#ff5500' : '#ff2d00'}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          position={[0, 0.6, 0] as any}
        />
      )}
    </group>
  );
}

interface Props {
  mode: NinjaMode;
  speed: number;
}

export function NinjaGLBViewer({ mode, speed }: Props) {
  const [modelReady, setModelReady] = useState(false);
  const handleReady = useCallback(() => setModelReady(true), []);

  const bloomIntensity = mode === 'rage' ? 1.4 : mode === 'stealth' ? 0.4 : 0.8;

  return (
    <>
      {/* CSS shadow ninja — visible instantly, hidden once 3D model is ready */}
      {!modelReady && <NinjaCSSFallback />}

      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        camera={{ fov: 48, near: 0.01, far: 100, position: [0, 0.1, 3.5] }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'transparent',
          pointerEvents: 'none',
          opacity: 1, // ensure it's always visible for debugging
        }}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <ambientLight intensity={0.7 as any} />
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <directionalLight
          position={[2, 4, 2] as any}
          intensity={1.1 as any}
          color={mode === 'rage' ? '#ff8866' : '#ffffff'}
        />
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <pointLight
          position={[-1, 0.5, 2] as any}
          intensity={0.9 as any}
          color={mode === 'stealth' ? '#00ffcc' : '#ff2d00'}
        />
        <Suspense fallback={null}>
          <NinjaModel mode={mode} speed={speed} onReady={handleReady} />
        </Suspense>
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={bloomIntensity}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.3}
          />
          <Noise opacity={0.025} />
        </EffectComposer>
      </Canvas>
    </>
  );
}

useGLTF.preload(MODEL_PATH);
