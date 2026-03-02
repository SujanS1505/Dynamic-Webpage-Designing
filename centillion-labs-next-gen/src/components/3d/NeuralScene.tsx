import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Sparkles } from '@react-three/drei';
import { NeuralNetwork } from './NeuralNetwork';

export const NeuralScene: React.FC = () => {
    const [isLight, setIsLight] = React.useState(false);

    React.useEffect(() => {
        const checkTheme = () => {
            setIsLight(document.documentElement.getAttribute('data-theme') === 'light');
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    const primaryColor = isLight ? '#009688' : '#00e5ff';
    const secondaryColor = isLight ? '#00796b' : '#7c4dff';

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, background: 'var(--bg-gradient)' }}>
            <Canvas
                camera={{ position: [0, 0, 16], fov: 45 }}
                dpr={[1, 2]}
                gl={{ powerPreference: "high-performance", antialias: false }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={2} color={primaryColor} />
                <pointLight position={[-10, -10, -10]} intensity={1} color={secondaryColor} />
                <Suspense fallback={null}>
                    <NeuralNetwork />
                    <Sparkles count={400} scale={20} size={1.5} speed={0.1} opacity={0.15} color={primaryColor} />
                    <EffectComposer multisampling={0}>
                        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} mipmapBlur intensity={1.5} />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>

    );
};
