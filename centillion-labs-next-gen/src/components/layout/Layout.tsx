import { Header } from './Header';
import { NeuralScene } from '../3d/NeuralScene';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { setLenis } from '../../lenisStore';

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
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 0.9,
            touchMultiplier: 1.5,
            infinite: false,
        });

        setLenis(lenis);

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            setLenis(null);
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
                    overflowX: 'hidden',
                }}
            >
                {children}
            </main>

            <footer style={{
                padding: 'clamp(3rem,8vw,6rem) clamp(1rem,5vw,2rem)',
                borderTop: '1px solid var(--border-color)',
                marginTop: 'clamp(4rem,10vw,10rem)',
                color: 'var(--text-secondary)'
            }}>
                <div className="footer-grid" style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 'clamp(2rem,5vw,4rem)',
                    textAlign: 'left'
                }}>
                    <div>
                        <span className="mono-text" style={{ fontSize: '1.2rem', fontWeight: 300, color: 'var(--text-primary)', letterSpacing: '0.2em', display: 'block', marginBottom: '1.5rem' }}>CENTILLION</span>
                        <p style={{ fontWeight: 300, lineHeight: 1.6 }}>Eternal Data, <br />Expansive Solutions.</p>
                    </div>
                    <div>
                        <span className="mono-text" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', display: 'block', marginBottom: '1rem', letterSpacing: '0.1em' }}>BANGALORE</span>
                        <p style={{ fontWeight: 300, lineHeight: 1.6 }}>1084, 8th A Main, Sector 7, <br />HSR Layout, Bangalore, India.</p>
                    </div>
                    <div>
                        <span className="mono-text" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', display: 'block', marginBottom: '1rem', letterSpacing: '0.1em' }}>NEW JERSEY</span>
                        <p style={{ fontWeight: 300, lineHeight: 1.6 }}>PO 4321, River Edge, <br />NJ 07661, USA.</p>
                    </div>
                    <div>
                        <span className="mono-text" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', display: 'block', marginBottom: '1rem', letterSpacing: '0.1em' }}>CONNECT</span>
                        <p style={{ fontWeight: 300, lineHeight: 1.6 }}>connect@centillionlabs.com</p>
                    </div>
                </div>
                <div style={{ marginTop: '6rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                    <p className="mono-text" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>© {new Date().getFullYear()} CENTILLION LABS. ALL RIGHTS RESERVED.</p>
                </div>
            </footer>

        </div>
    );
};
