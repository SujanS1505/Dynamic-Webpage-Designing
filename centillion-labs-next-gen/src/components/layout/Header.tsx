import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { Sidebar } from './Sidebar';

import logoImg from '../../assets/centillion_logo.png';



export const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 w-full z-[var(--z-nav)] transition-all duration-300 ${scrolled ? 'glass-panel shadow-lg' : 'bg-transparent'
                    }`}
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto 1fr',
                    alignItems: 'center',
                    padding: scrolled
                        ? `0.75rem clamp(1rem, 4vw, 2rem)`
                        : `1.5rem clamp(1rem, 4vw, 2rem)`,
                    borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
                    backdropFilter: scrolled ? 'blur(12px)' : 'none',
                }}
            >
                {/* ── Logo ── */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifySelf: 'start' }}>
                    <a
                        href="#home"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none', color: 'inherit' }}
                    >
                        <img
                            src={logoImg}
                            alt="Centillion Labs"
                            className="header-logo-img"
                            style={{ width: 64, height: 'auto', objectFit: 'contain' }}
                        />
                        <motion.span
                            className="mono-text header-wordmark"
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            style={{
                                fontSize: 'clamp(0.85rem, 2.5vw, 1.1rem)',
                                fontWeight: 400,
                                letterSpacing: '0.22em',
                                display: 'inline-block',
                                background: 'linear-gradient(90deg, var(--accent-primary, #00e5ff) 0%, #a855f7 50%, var(--accent-primary, #00e5ff) 100%)',
                                backgroundSize: '200% auto',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                animation: 'logoGradientShift 4s linear infinite',
                            }}
                        >
                            CENTILLION LABS
                        </motion.span>
                    </a>
                </div>

                {/* ── Desktop nav (Empty) ── */}
                <div
                    style={{ display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center' }}
                    className="hidden md:flex"
                />

                {/* ── Right actions ── */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', justifySelf: 'end' }}>
                    <ThemeToggle />

                    {/* Desktop CTA */}
                    <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=connect@centillionlabs.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            background: 'var(--accent-primary)',
                            color: 'var(--bg-dark)',
                            padding: '0.6rem 1.2rem',
                            borderRadius: '4px',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                        }}
                        className="mono-text hidden md:block"
                    >
                        LET'S TALK
                    </a>

                    {/* Hamburger – always visible */}
                    <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Open navigation menu"
                        style={{
                            background: 'rgba(0,229,255,0.06)',
                            border: '1px solid rgba(0,229,255,0.22)',
                            borderRadius: '8px',
                            width: 42, height: 42,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer',
                            padding: 0,
                            transition: 'background 0.25s, border-color 0.25s, box-shadow 0.25s',
                            boxShadow: sidebarOpen ? '0 0 16px rgba(0,229,255,0.25)' : 'none',
                        }}
                    >
                        <HamburgerLines open={sidebarOpen} />
                    </motion.button>
                </div>
            </motion.header>

            {/* ── Sidebar (rendered outside header to avoid stacking-context issues) ── */}
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </>
    );
};

/* ── Animated three-line hamburger icon ────────────────────────── */
function HamburgerLines({ open }: Readonly<{ open: boolean }>) {
    return (
        <span style={{ width: 18, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{
                display: 'block', width: '100%', height: 1.5, borderRadius: 2,
                background: 'var(--accent-primary, #00e5ff)',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform: open ? 'translateY(5.5px) rotate(45deg)' : 'none',
            }} />
            <span style={{
                display: 'block', height: 1.5, borderRadius: 2,
                background: 'var(--accent-primary, #00e5ff)',
                transition: 'transform 0.3s ease, opacity 0.3s ease, width 0.3s ease',
                width: open ? '100%' : '70%',
                opacity: open ? 0 : 1,
            }} />
            <span style={{
                display: 'block', height: 1.5, borderRadius: 2,
                background: 'var(--accent-primary, #00e5ff)',
                transition: 'transform 0.3s ease, opacity 0.3s ease, width 0.3s ease',
                width: open ? '100%' : '85%',
                transform: open ? 'translateY(-5.5px) rotate(-45deg)' : 'none',
            }} />
        </span>
    );
}
