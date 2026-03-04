import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RedTeamPage } from '../pages/RedTeamPage';

const AUTO_CLOSE_MS = 6000;

export const RedTeamFlash: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showPage, setShowPage] = useState(false);
    const [paused, setPaused] = useState(false);
    const rafRef = useRef<number | null>(null);
    const startRef = useRef<number | null>(null);
    const pausedProgressRef = useRef<number>(0);

    /* Slight delay before showing — feels intentional, not jarring */
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(t);
    }, []);

    /* Progress bar + auto-close (pauseable) */
    useEffect(() => {
        if (!visible) return;
        if (paused) {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            return;
        }
        const alreadyDone = pausedProgressRef.current;
        const remainMs = AUTO_CLOSE_MS * (1 - alreadyDone / 100);
        startRef.current = null;
        const tick = (now: number) => {
            if (!startRef.current) startRef.current = now;
            const elapsed = now - startRef.current;
            const pct = Math.min(alreadyDone + (elapsed / remainMs) * (100 - alreadyDone), 100);
            setProgress(pct);
            pausedProgressRef.current = pct;
            if (pct < 100) {
                rafRef.current = requestAnimationFrame(tick);
            } else {
                setVisible(false);
            }
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, [visible, paused]);

    /* Escape to dismiss */
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setVisible(false); };
        window.addEventListener('keydown', h);
        return () => window.removeEventListener('keydown', h);
    }, []);

    return (
        <>
            {showPage && <RedTeamPage onClose={() => setShowPage(false)} />}
            <AnimatePresence>
                {visible && (
                    <motion.div
                        key="rt-popup"
                        initial={{ opacity: 0, y: 24, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.95 }}
                        transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            position: 'fixed',
                            bottom: '2rem',
                            right: '2rem',
                            zIndex: 9998,
                            width: 'clamp(280px, 90vw, 340px)',
                            background: 'linear-gradient(145deg, #0f0505 0%, #160808 100%)',
                            border: '1px solid rgba(232, 65, 24, 0.28)',
                            borderRadius: '12px',
                            boxShadow: '0 8px 48px rgba(0,0,0,0.55), 0 0 30px rgba(232,65,24,0.1)',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Scanline texture */}
                        <div style={{
                            position: 'absolute', inset: 0, pointerEvents: 'none',
                            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(232,65,24,0.025) 3px, rgba(232,65,24,0.025) 4px)',
                        }} />

                        {/* Card body */}
                        <div style={{ position: 'relative', padding: '1.4rem 1.4rem 1.2rem' }}>

                            {/* Top row: badge + dismiss */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <motion.div
                                        animate={{ opacity: [1, 0.25, 1] }}
                                        transition={{ duration: 1.1, repeat: Infinity }}
                                        style={{
                                            width: 7, height: 7, borderRadius: '50%',
                                            background: '#e84118',
                                            boxShadow: '0 0 8px #e84118',
                                            flexShrink: 0,
                                        }}
                                    />
                                    <span style={{
                                        fontFamily: 'JetBrains Mono, monospace',
                                        fontSize: '0.6rem',
                                        fontWeight: 700,
                                        letterSpacing: '0.22em',
                                        color: '#e84118',
                                        textTransform: 'uppercase',
                                    }}>
                                        Red Team
                                    </span>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.15, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setVisible(false)}
                                    aria-label="Dismiss"
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: 'rgba(255,255,255,0.3)',
                                        cursor: 'pointer',
                                        fontSize: '1.1rem',
                                        lineHeight: 1,
                                        padding: '0.1rem 0.3rem',
                                        transition: 'color 0.2s',
                                        borderRadius: '4px',
                                    }}
                                >
                                    ×
                                </motion.button>
                            </div>

                            {/* Headline */}
                            <p style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                color: '#ffffff',
                                margin: '0 0 0.5rem',
                                lineHeight: 1.35,
                                letterSpacing: '-0.01em',
                            }}>
                                Secure Inference.{' '}
                                <span style={{ color: 'rgba(232,65,24,0.85)' }}>Secure Future.</span>
                            </p>

                            {/* Body */}
                            <p style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '0.78rem',
                                fontWeight: 400,
                                color: 'rgba(255,255,255,0.48)',
                                margin: '0 0 1rem',
                                lineHeight: 1.65,
                            }}>
                                Centillion Red Team works around the clock — adversarially testing LLMs, probing inference pipelines, and hardening AI systems before threats do.
                            </p>

                            {/* Tagline */}
                            <p style={{
                                fontFamily: 'JetBrains Mono, monospace',
                                fontSize: '0.6rem',
                                color: 'rgba(232,65,24,0.45)',
                                letterSpacing: '0.16em',
                                textTransform: 'uppercase',
                                margin: '0 0 1rem',
                            }}>
                                City Sleeps. Centillion Red Team Doesn't.
                            </p>

                            {/* CTA button */}
                            <motion.button
                                whileHover={{ scale: 1.03, boxShadow: '0 0 24px rgba(232,65,24,0.45)' }}
                                whileTap={{ scale: 0.97 }}
                                onHoverStart={() => setPaused(true)}
                                onHoverEnd={() => setPaused(false)}
                                onClick={() => { setVisible(false); setShowPage(true); }}
                                style={{
                                    width: '100%',
                                    background: 'linear-gradient(135deg, #e84118, #c42800)',
                                    border: 'none',
                                    borderRadius: '6px',
                                    color: '#fff',
                                    fontFamily: 'JetBrains Mono, monospace',
                                    fontSize: '0.68rem',
                                    fontWeight: 700,
                                    letterSpacing: '0.14em',
                                    textTransform: 'uppercase',
                                    padding: '0.65rem 1rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    boxShadow: '0 4px 16px rgba(232,65,24,0.3)',
                                    transition: 'box-shadow 0.2s',
                                }}
                            >
                                <span style={{ fontSize: '0.8rem' }}>&#128737;&#65039;</span>
                                Explore Red Team
                                <span style={{ opacity: 0.7 }}>→</span>
                            </motion.button>
                        </div>

                        {/* Auto-close progress bar at bottom */}
                        <div style={{ position: 'relative', height: 2, background: 'rgba(255,255,255,0.05)' }}>
                            <div style={{
                                height: '100%',
                                width: `${progress}%`,
                                background: 'linear-gradient(90deg, rgba(232,65,24,0.4), #e84118)',
                                boxShadow: '0 0 6px rgba(232,65,24,0.5)',
                            }} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
