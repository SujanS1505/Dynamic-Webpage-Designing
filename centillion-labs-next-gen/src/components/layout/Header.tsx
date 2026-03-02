import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { Sidebar } from './Sidebar';

const NAV_LINKS = [
    { label: 'Home',       href: '#home'       },
    { label: 'About Us',   href: '#about'      },
    { label: 'Services',   href: '#services'   },
    { label: 'Portfolio',  href: '#portfolio'  },
    { label: 'Team',       href: '#team'       },
    { label: 'Industries', href: '#industries' },
    { label: 'Life',       href: '#life'       },
    { label: 'Contact',    href: '#contact'    },
];

export const Header: React.FC = () => {
    const [scrolled, setScrolled]       = useState(false);
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
                className={`fixed top-0 left-0 w-full z-[var(--z-nav)] transition-all duration-300 ${
                    scrolled ? 'glass-panel shadow-lg' : 'bg-transparent'
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifySelf: 'start' }}>
                    <a
                        href="#home"
                        style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}
                    >
                        <img
                            src="/logo.png"
                            alt="Centillion Logo"
                            style={{
                                height: '32px', width: 'auto',
                                filter: 'drop-shadow(0px 4px 10px rgba(0, 229, 255, 0.4))',
                                transform: 'perspective(400px) rotateY(-5deg)',
                                transition: 'transform 0.4s ease',
                            }}
                        />
                        <span
                            className="mono-text header-wordmark"
                            style={{ fontSize: 'clamp(0.9rem, 3vw, 1.2rem)', fontWeight: 300, letterSpacing: '0.12em', display: 'inline-block' }}
                        >
                            CENTILLION
                        </span>
                    </a>
                </div>

                {/* ── Desktop nav ── */}
                <nav
                    style={{ display: 'flex', gap: '2rem', alignItems: 'center', justifySelf: 'center' }}
                    className="hidden md:flex"
                >
                    {NAV_LINKS.map((link) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            whileHover={{ y: -2, color: 'var(--accent-primary)' }}
                            style={{
                                textDecoration: 'none',
                                color: 'var(--text-primary)',
                                fontSize: '0.95rem',
                                fontWeight: 300,
                                letterSpacing: '0.02em',
                                transition: 'color 0.2s ease',
                            }}
                        >
                            {link.label}
                        </motion.a>
                    ))}
                </nav>

                {/* ── Right actions ── */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', justifySelf: 'end' }}>
                    <ThemeToggle />

                    {/* Desktop CTA */}
                    <a
                        href="#contact"
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
