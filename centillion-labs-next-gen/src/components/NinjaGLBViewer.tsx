import { useRef, useEffect, useMemo, useCallback, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Sparkles } from '@react-three/drei';
import { Bloom, EffectComposer, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';

const MODEL_RUN = '/models/Ninja_in_place_run.glb';
const MODEL_FIGHT = '/models/Fight_Idle.glb';
const MODEL_JUMP = '/models/Jumping.glb';
const MODEL_MARTELO = '/models/Martelo_2.glb';

export type NinjaMode = 'patrol' | 'stealth' | 'rage';
export type NinjaAction = 'run' | 'fight' | 'jump' | 'martelo';

// ─── CSS shadow ninja shown while the GLB is downloading ────────────────────


// ─── 3D Model (only mounts after Suspense resolves = model is loaded) ────────
function NinjaModel({
  mode,
  action,
  speed,
  onReady,
}: {
  mode: NinjaMode;
  action: NinjaAction;
  speed: number;
  onReady: () => void;
}) {
  const modelPath =
    action === 'fight' ? MODEL_FIGHT :
      action === 'jump' ? MODEL_JUMP :
        action === 'martelo' ? MODEL_MARTELO :
          MODEL_RUN;
  const { scene, animations } = useGLTF(modelPath);
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

  // Signal parent that model is ready
  useEffect(() => {
    onReady();
  }, [onReady]);

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
      group.scale.setScalar(0.012);
      // start perfectly off-screen left
      // lowering Y from -0.85 to -1.35 to bring feet closer to container bottom
      group.position.set(0, -1.35, 0);
      baseYRef.current = -1.35;
      normalizedRef.current = true;
    }

    const t = clock.getElapsedTime();

    // The ninja container automatically traverses the screen using CSS.
    // The 3D model just needs to stay perfectly centered in its canvas.
    // We disable manual X-translation so it never gets cropped by its frame.
    group.position.x = 0;

    // Always face forward exactly perpendicular to the camera (90 degrees / pi/2)
    // EXCEPT when fighting/martelo/jump, then face the camera fully (0 rotation)
    const isStationaryEmote = action === 'fight' || action === 'martelo' || action === 'jump';
    group.rotation.y = isStationaryEmote ? 0 : Math.PI / 2;
    // Add a slight bobbing to mimic weight shifting
    group.position.y = baseYRef.current + Math.sin(t * (action === 'run' ? 8.0 : 3.0) * speed) * (action === 'run' ? 0.04 : 0.02);
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
  action?: NinjaAction;
  speed: number;
}

export function NinjaGLBViewer({ mode, action = 'run', speed }: Props) {
  const handleReady = useCallback(() => { }, []);

  const bloomIntensity = mode === 'rage' ? 1.4 : mode === 'stealth' ? 0.4 : 0.8;

  return (
    <>
      {/* We removed the CSS fallback to ensure only the 3D model is ever shown. */}


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
          <NinjaModel mode={mode} action={action} speed={speed} onReady={handleReady} />
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

useGLTF.preload(MODEL_RUN);
useGLTF.preload(MODEL_FIGHT);
useGLTF.preload(MODEL_JUMP);
useGLTF.preload(MODEL_MARTELO);
