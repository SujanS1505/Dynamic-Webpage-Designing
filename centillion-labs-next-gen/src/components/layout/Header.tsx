import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

const NAV_LINKS = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Team', href: '#team' },
    { label: 'Industries', href: '#industries' },
    { label: 'Life', href: '#life' },
    { label: 'Contact', href: '#contact' }
];



export const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
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
                padding: scrolled ? '0.75rem 2rem' : '1.5rem 2rem',
                borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
                backdropFilter: scrolled ? 'blur(12px)' : 'none'
            }}
        >


            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifySelf: 'start' }}>
                <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}>
                    <img
                        src="/logo.png"
                        alt="Centillion Logo"
                        style={{
                            height: '32px',
                            width: 'auto',
                            filter: 'drop-shadow(0px 4px 10px rgba(0, 229, 255, 0.4))',
                            transform: 'perspective(400px) rotateY(-5deg)',
                            transition: 'transform 0.4s ease'
                        }}
                    />
                    <span className="mono-text" style={{ fontSize: '1.2rem', fontWeight: 300, letterSpacing: '0.12em', display: 'inline-block' }}>CENTILLION</span>
                </a>
            </div>

            <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center', justifySelf: 'center' }} className="hidden md:flex">
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
                            transition: 'color 0.2s ease'
                        }}
                    >
                        {link.label}
                    </motion.a>
                ))}
            </nav>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', justifySelf: 'end' }}>
                <ThemeToggle />
                <a
                    href="#contact"
                    style={{
                        background: 'var(--accent-primary)',
                        color: 'var(--bg-dark)',
                        padding: '0.6rem 1.2rem',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '0.85rem'
                    }}
                    className="mono-text hidden md:block"
                >
                    LET'S TALK
                </a>
                <button
                    className="md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="glass-panel"
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            width: '100%',
                            padding: '2rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.5rem',
                            borderTop: 'none',
                            borderRadius: '0 0 12px 12px'
                        }}
                    >
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                style={{
                                    textDecoration: 'none',
                                    color: 'var(--text-primary)',
                                    fontSize: '1.1rem',
                                    fontWeight: 500
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};
