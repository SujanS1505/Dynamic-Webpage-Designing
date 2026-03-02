import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { onClose: () => void }

export const RedTeamPage: React.FC<Props> = ({ onClose }) => {
    const [loaded, setLoaded] = useState(false);

    /* Lock body scroll while overlay is open */
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = prev; };
    }, []);

    /* Close on Escape key */
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    return (
        <AnimatePresence>
            <motion.div
                key="redteam-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    background: '#0a0a0a',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* ── Top bar with back button ── */}
                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    zIndex: 10001,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                }}>
                    <motion.button
                        whileHover={{ scale: 1.05, x: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onClose}
                        style={{
                            background: 'rgba(0,0,0,0.75)',
                            backdropFilter: 'blur(12px)',
                            border: '1.5px solid rgba(232,65,24,0.5)',
                            color: '#ff6655',
                            padding: '0.5rem 1.1rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.78rem',
                            fontFamily: 'Barlow Condensed, sans-serif',
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            boxShadow: '0 0 20px rgba(232,65,24,0.2)',
                        }}
                    >
                        ← BACK TO SITE
                    </motion.button>
                </div>

                {/* ── Loading shimmer ── */}
                {!loaded && (
                    <div style={{
                        position: 'absolute', inset: 0, zIndex: 10000,
                        background: '#0a0a0a',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexDirection: 'column', gap: '1.5rem',
                    }}>
                        <div style={{
                            width: 48, height: 48,
                            border: '3px solid rgba(232,65,24,0.2)',
                            borderTop: '3px solid #e84118',
                            borderRadius: '50%',
                            animation: 'rt-spin 0.8s linear infinite',
                        }} />
                        <span style={{
                            fontFamily: 'Barlow Condensed, sans-serif',
                            fontSize: '0.8rem',
                            letterSpacing: '0.2em',
                            color: 'rgba(255,255,255,0.3)',
                        }}>
                            LOADING RED TEAM...
                        </span>
                        <style>{`@keyframes rt-spin { to { transform: rotate(360deg); } }`}</style>
                    </div>
                )}

                {/* ── Full-screen iframe ── */}
                <iframe
                    src="/red-team.html"
                    title="Centillion Red Team"
                    onLoad={() => setLoaded(true)}
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        opacity: loaded ? 1 : 0,
                        transition: 'opacity 0.4s ease',
                        flex: 1,
                    }}
                    allow="fullscreen"
                />
            </motion.div>
        </AnimatePresence>
    );
};
