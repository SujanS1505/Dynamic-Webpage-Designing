import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

const NAV_LINKS = [
    { label: 'Home ↗', href: '#home' },
    { label: 'Horizons ↗', href: '#services' },
    { label: 'Our Approach ↗', href: '#about' },
    { label: 'Team ↗', href: '#team' },
    { label: 'Contacts & Partnerships ↗', href: '#contact' }
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
            className={`fixed top-0 left-0 w-full z-[var(--z-nav)] transition-all duration-300 ${scrolled ? 'py-4 glass-panel border-x-0 border-t-0 rounded-none' : 'py-6 bg-transparent'
                }`}
            style={{
                paddingLeft: '2rem',
                paddingRight: '2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'inherit' }}>
                    <img
                        src="/logo.png"
                        alt="Centillion Logo"
                        style={{
                            height: '34px',
                            width: 'auto',
                            filter: 'drop-shadow(0px 6px 14px rgba(0, 229, 255, 0.5)) drop-shadow(0px 0px 6px rgba(0, 229, 255, 0.7))',
                            transform: 'perspective(400px) rotateX(8deg) rotateY(-12deg) scale(1.1)',
                            transition: 'transform 0.4s ease, filter 0.4s ease'
                        }}
                    />
                    <span className="mono-text" style={{ fontSize: '1.2rem', fontWeight: 300, letterSpacing: '0.2em' }}>C E N T I L L I O N</span>
                </a>
            </div>

            <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="hidden md:flex">
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
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
