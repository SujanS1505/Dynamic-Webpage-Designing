import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
    return (
        <section
            id="home"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
            }}
        >
            <div style={{ textAlign: 'center', maxWidth: '1000px', zIndex: 10, marginTop: '10vh' }}>
                <motion.h1
                    initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        fontSize: 'clamp(4rem, 10vw, 8.5rem)',
                        fontWeight: 200,
                        lineHeight: 1,
                        marginBottom: '1.5rem',
                        letterSpacing: '-0.04em',
                        color: 'var(--text-primary)'
                    }}
                >
                    One Vision
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        fontSize: '1.2rem',
                        fontWeight: 300,
                        color: 'var(--text-secondary)',
                        maxWidth: '700px',
                        margin: '0 auto 4rem',
                        lineHeight: 1.6,
                        letterSpacing: '0.01em'
                    }}
                >
                    Centillion Labs focuses on modern strategic horizons: Generative AI, Cloud Architecture, Data Mesh, and FinOps.<br /><br />
                    Each stands as a pillar of future resilience; from sovereign digital infrastructure to the next frontier of intelligent systems.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <a href="#about" style={{
                        width: '40px',
                        height: '60px',
                        border: '1px solid var(--border-color)',
                        borderRadius: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        color: 'var(--text-secondary)',
                        transition: 'border-color 0.3s, color 0.3s'
                    }} className="hover-border-accent">
                        ↓
                    </a>
                </motion.div>
            </div>
        </section>
    );
};
