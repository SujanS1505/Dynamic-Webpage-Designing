import { Header } from './Header';
import { NeuralScene } from '../3d/NeuralScene';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import Lenis from 'lenis';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div style={{ position: 'relative', width: '100vw' }}>
            {/* Minimalist Scroll Indicator */}
            <div className="hidden md:block" style={{
                position: 'fixed', top: '30vh', right: '2rem', width: '1px', height: '40vh',
                background: 'var(--border-color)', zIndex: 100, transformOrigin: 'top'
            }}>
                <motion.div style={{
                    width: '100%', height: '100%', background: 'var(--accent-primary)',
                    scaleY, transformOrigin: 'top', boxShadow: '0 0 10px var(--accent-glow)'
                }} />
            </div>

            <Header />

            <NeuralScene />

            <main
                style={{
                    position: 'relative',
                    zIndex: 'var(--z-content)',
                    width: '100%',
                    maxWidth: '1440px',
                    margin: '0 auto',
                    padding: '0 2rem'
                }}
            >
                {children}
            </main>

            <footer style={{
                padding: '4rem 2rem',
                borderTop: '1px solid var(--border-color)',
                marginTop: '6rem',
                textAlign: 'center',
                color: 'var(--text-muted)'
            }}>
                <p className="mono-text" style={{ fontSize: '0.8rem' }}>© {new Date().getFullYear()} CENTILLION LABS. BUILT WITH INTELLIGENCE.</p>
            </footer>
        </div>
    );
};
