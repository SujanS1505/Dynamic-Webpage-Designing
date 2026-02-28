import { Canvas } from '@react-three/fiber';
import { Hypercube } from './Hypercube';
import { SparkleAura } from './SparkleAura';
import { Environment } from '@react-three/drei';

export const HypercubeScene: React.FC = () => {
    return (
        <div style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0 }}>
            <Canvas camera={{ position: [0, 15, 40], fov: 30 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 20, 10]} intensity={1} />

                {/* The complex nested rotating hypercube */}
                <Hypercube cubes={6} baseColor="#1de9b6" edgeColor="#00bfa5" />

                {/* The flowing cyan particle core */}
                <SparkleAura count={600} color="#00e5ff" bounds={15} />

                {/* Global environment to add subtle reflections */}
                <Environment preset="city" />
            </Canvas>
        </div>
    );
};
