import { useEffect, useRef, useState, useCallback } from 'react';
import {
    X, ArrowUpRight, Globe, Rss, Send, Zap,
    Home, Info, Layers, FolderOpen, Users, Building2, Smile, Mail,
    type LucideIcon,
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

/* ── Nav data ─────────────────────────────────────────────────── */
const NAV_LINKS: { label: string; href: string; num: string; desc: string; icon: LucideIcon }[] = [
    { label: 'Home',       href: '#home',       num: '01', desc: 'Welcome & overview',   icon: Home      },
    { label: 'About Us',   href: '#about',      num: '02', desc: 'Mission & values',     icon: Info      },
    { label: 'Services',   href: '#services',   num: '03', desc: 'What we offer',        icon: Layers    },
    { label: 'Portfolio',  href: '#portfolio',  num: '04', desc: 'Featured work',        icon: FolderOpen},
    { label: 'Team',       href: '#team',       num: '05', desc: 'Meet the experts',     icon: Users     },
    { label: 'Industries', href: '#industries', num: '06', desc: 'Sectors we serve',     icon: Building2 },
    { label: 'Life',       href: '#life',       num: '07', desc: 'Culture & people',     icon: Smile     },
    { label: 'Contact',    href: '#contact',    num: '08', desc: 'Start a conversation', icon: Mail      },
];

const SOCIAL_LINKS = [
    { icon: Globe, href: 'https://github.com',   label: 'Website'  },
    { icon: Rss,   href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Send,  href: 'https://twitter.com',  label: 'Twitter'  },
];

/* â”€â”€ Theme hook â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function useIsDark() {
    const [isDark, setIsDark] = useState(
        () => document.documentElement.getAttribute('data-theme') === 'dark'
    );
    useEffect(() => {
        const obs = new MutationObserver(() =>
            setIsDark(document.documentElement.getAttribute('data-theme') === 'dark')
        );
        obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => obs.disconnect();
    }, []);
    return isDark;
}

/* â”€â”€ Active section hook â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function useActiveSection(hrefs: string[]) {
    const [active, setActive] = useState<string>('');
    useEffect(() => {
        const ids = hrefs.map(h => h.replace('#', ''));
        const observers: IntersectionObserver[] = [];
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActive(`#${id}`); },
                { threshold: 0.3 }
            );
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach(o => o.disconnect());
    }, [hrefs]);
    return active;
}

/* â”€â”€ Node canvas â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
interface NodeCanvasProps { isDark: boolean }

function NodeCanvas({ isDark }: Readonly<NodeCanvasProps>) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d')!;
        let raf: number;

        const W = canvas.width  = canvas.offsetWidth;
        const H = canvas.height = canvas.offsetHeight;

        const nodes = Array.from({ length: 26 }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            r: Math.random() * 1.8 + 0.8,
            pulse: Math.random() * Math.PI * 2,
        }));

        const [r, g, b] = isDark ? [0, 229, 255] : [0, 150, 136];

        const draw = () => {
            ctx.clearRect(0, 0, W, H);

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < 130) {
                        const alpha = isDark
                            ? 0.18 * (1 - dist / 130)
                            : 0.22 * (1 - dist / 130);
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
                        ctx.lineWidth = 0.7;
                        ctx.stroke();
                    }
                }
            }

            nodes.forEach(n => {
                n.pulse += 0.025;
                const pulsedR = n.r * (1 + 0.25 * Math.sin(n.pulse));
                const alpha   = isDark ? 0.55 : 0.45;
                ctx.beginPath();
                ctx.arc(n.x, n.y, pulsedR, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
                ctx.fill();

                /* soft outer glow */
                const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pulsedR * 4);
                grd.addColorStop(0, `rgba(${r},${g},${b},0.12)`);
                grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
                ctx.beginPath();
                ctx.arc(n.x, n.y, pulsedR * 4, 0, Math.PI * 2);
                ctx.fillStyle = grd;
                ctx.fill();

                n.x += n.vx;
                n.y += n.vy;
                if (n.x < 0 || n.x > W) n.vx *= -1;
                if (n.y < 0 || n.y > H) n.vy *= -1;
            });

            raf = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(raf);
    }, [isDark]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                pointerEvents: 'none', opacity: 0.6,
            }}
        />
    );
}

/* â”€â”€ Decorative orb â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
function DecorativeOrb() {
    return (
        <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.75, 0.5] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            style={{
                position: 'absolute', bottom: '-60px', right: '-60px',
                width: 220, height: 220, borderRadius: '50%',
                background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 68%)',
                opacity: 0.12,
                pointerEvents: 'none',
                filter: 'blur(30px)',
            }}
        />
    );
}

/* â”€â”€ Sidebar  â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
interface SidebarProps { open: boolean; onClose: () => void }

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
    const isDark = useIsDark();
    const sectionHrefs = NAV_LINKS.map(l => l.href);
    const activeSection = useActiveSection(sectionHrefs);

    const [hoveredIdx, setHoveredIdx]         = useState<number | null>(null);
    const [clickedIdx, setClickedIdx]         = useState<number | null>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);

    /* â”€â”€ Mouse-tracking glow â”€â”€ */
    const mouseYRaw   = useMotionValue(300);
    const glowY       = useTransform(mouseYRaw, v => `${v}px`);
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = sidebarRef.current?.getBoundingClientRect();
        if (rect) mouseYRaw.set(e.clientY - rect.top);
    }, [mouseYRaw]);

    /* â”€â”€ Subtle 3-D tilt tracking â”€â”€ */
    const tiltX = useMotionValue(0);
    const tiltY = useMotionValue(0);
    const springTX = useSpring(tiltX, { stiffness: 140, damping: 22 });
    const springTY = useSpring(tiltY, { stiffness: 140, damping: 22 });
    const rotateX  = useTransform(springTX, [-1, 1], [1.5, -1.5]);
    const rotateY  = useTransform(springTY, [-1, 1], [-1.5, 1.5]);

    const handleTilt = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = sidebarRef.current?.getBoundingClientRect();
        if (!rect) return;
        tiltX.set(((e.clientY - rect.top)  / rect.height - 0.5) * 2);
        tiltY.set(((e.clientX - rect.left) / rect.width  - 0.5) * 2);
    }, [tiltX, tiltY]);

    const resetTilt = useCallback(() => { tiltX.set(0); tiltY.set(0); }, [tiltX, tiltY]);

    /* â”€â”€ Swipe-to-close â”€â”€ */
    const touchStartX = useRef(0);
    const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
    const handleTouchEnd   = (e: React.TouchEvent) => {
        if (e.changedTouches[0].clientX - touchStartX.current > 72) onClose();
    };

    /* â”€â”€ Keyboard close â”€â”€ */
    useEffect(() => {
        const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        globalThis.addEventListener('keydown', h);
        return () => globalThis.removeEventListener('keydown', h);
    }, [onClose]);

    /* â”€â”€ Body scroll lock â”€â”€ */
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    /* â”€â”€ Click ripple â”€â”€ */
    const handleNavClick = (i: number) => {
        setClickedIdx(i);
        setTimeout(() => setClickedIdx(null), 400);
        onClose();
    };

    /* â”€â”€ Variants â”€â”€ */
    const backdropV = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
    const panelV = {
        hidden:  { x: '100%', opacity: 0.7, scale: 0.97 },
        visible: { x: '0%',   opacity: 1,   scale: 1,
                   transition: { type: 'spring' as const, stiffness: 340, damping: 34 } },
        exit:    { x: '100%', opacity: 0,   scale: 0.97,
                   transition: { type: 'spring' as const, stiffness: 300, damping: 30 } },
    };
    const containerV = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.055, delayChildren: 0.2 } },
    };
    const itemV = {
        hidden:  { x: 50, opacity: 0 },
        visible: { x: 0,  opacity: 1, transition: { type: 'spring' as const, stiffness: 280, damping: 24 } },
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* backdrop */}
                    <motion.div
                        key="sb-backdrop"
                        variants={backdropV} initial="hidden" animate="visible" exit="hidden"
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 200,
                            background: 'var(--sb-backdrop)',
                            backdropFilter: 'blur(8px) saturate(0.8)',
                        }}
                    />

                    {/* panel */}
                    <motion.div
                        key="sb-panel"
                        ref={sidebarRef}
                        variants={panelV} initial="hidden" animate="visible" exit="exit"
                        onMouseMove={(e) => { handleMouseMove(e); handleTilt(e); }}
                        onMouseLeave={resetTilt}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        style={{
                            position: 'fixed', top: 0, right: 0,
                            width: 'min(440px, 94vw)', height: '100dvh',
                            zIndex: 201, display: 'flex', flexDirection: 'column',
                            overflow: 'hidden',
                            background: 'var(--sb-bg)',
                            borderLeft: '1px solid var(--sb-border)',
                            boxShadow: isDark
                                ? '-20px 0 80px rgba(0,0,0,0.55), -4px 0 16px rgba(0,229,255,0.06)'
                                : '-20px 0 80px rgba(0,0,0,0.12), -4px 0 16px rgba(0,150,136,0.06)',
                            rotateX, rotateY,
                            perspective: 1200,
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        {/* canvas */}
                        <NodeCanvas isDark={isDark} />

                        {/* decorative orb */}
                        <DecorativeOrb />

                        {/* mouse-tracked radial glow */}
                        <motion.div style={{
                            position: 'absolute', left: 0, right: 0,
                            top: glowY, height: '300px', pointerEvents: 'none',
                            background: `radial-gradient(ellipse 65% 180px at 65% 50%, var(--sb-glow) 0%, transparent 70%)`,
                            transform: 'translateY(-50%)',
                        }} />

                        {/* left edge accent */}
                        <motion.div
                            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                            transition={{ delay: 0.28, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                position: 'absolute', top: 0, left: 0,
                                width: 3, height: '100%',
                                background: 'var(--sb-accent-bar)',
                                transformOrigin: 'top',
                                borderRadius: '0 2px 2px 0',
                            }}
                        />

                        {/* active-section marker dot on left edge */}
                        {activeSection && (() => {
                            const idx = NAV_LINKS.findIndex(l => l.href === activeSection);
                            if (idx < 0) return null;
                            const pct = (idx / (NAV_LINKS.length - 1)) * 72 + 14;
                            return (
                                <motion.div
                                    layoutId="sb-active-dot"
                                    style={{
                                        position: 'absolute', left: 6, zIndex: 10,
                                        top: `${pct}%`, transform: 'translateY(-50%)',
                                        width: 7, height: 7, borderRadius: '50%',
                                        background: 'var(--accent-primary)',
                                        boxShadow: '0 0 10px var(--accent-primary)',
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                                />
                            );
                        })()}

                        {/* â”€â”€ header â”€â”€ */}
                        <div style={{
                            position: 'relative', zIndex: 2,
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '1.5rem 1.75rem 1rem',
                            borderBottom: '1px solid var(--sb-divider)',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                                <div>
                                    <p className="mono-text" style={{
                                        fontSize: '0.65rem', letterSpacing: '0.28em',
                                        color: 'var(--accent-primary)',
                                    }}>Navigation</p>
                                    <p style={{
                                        fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.06em',
                                        color: 'var(--sb-text-h)', marginTop: '1px',
                                    }}>CENTILLION</p>
                                </div>
                                {/* section count badge */}
                                <motion.span
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.55, type: 'spring', stiffness: 300 }}
                                    style={{
                                        background: 'var(--sb-badge-bg)',
                                        color: 'var(--sb-badge-color)',
                                        borderRadius: '20px', padding: '2px 9px',
                                        fontSize: '0.65rem', fontWeight: 700,
                                        letterSpacing: '0.05em',
                                        alignSelf: 'flex-start', marginTop: '2px',
                                    }}
                                >
                                    {NAV_LINKS.length} sections
                                </motion.span>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                style={{
                                    background: 'var(--sb-close-bg)',
                                    border: '1px solid var(--sb-close-border)',
                                    borderRadius: '50%', width: 40, height: 40,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'var(--sb-close-color)', cursor: 'pointer',
                                    flexShrink: 0,
                                    transition: 'background 0.2s, color 0.2s',
                                }}
                            >
                                <X size={17} />
                            </motion.button>
                        </div>

                        {/* ── nav links ── */}
                        <motion.nav
                            variants={containerV} initial="hidden" animate="visible"
                            style={{
                                position: 'relative', zIndex: 2,
                                flex: 1, padding: '0.5rem 1.1rem',
                                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                                gap: 0, overflowY: 'auto',
                            }}
                        >
                            {NAV_LINKS.map((link, i) => {
                                const isHovered = hoveredIdx === i;
                                const isActive  = activeSection === link.href;
                                const isClicked = clickedIdx === i;
                                const NavIcon   = link.icon;
                                return (
                                    <motion.div key={link.href} variants={itemV}>
                                        <motion.a
                                            href={link.href}
                                            onClick={() => handleNavClick(i)}
                                            onHoverStart={() => setHoveredIdx(i)}
                                            onHoverEnd={() => setHoveredIdx(null)}
                                            style={{
                                                display: 'flex', alignItems: 'center',
                                                gap: '0.65rem', textDecoration: 'none',
                                                padding: '0.48rem 0.65rem',
                                                borderRadius: '9px', position: 'relative',
                                                overflow: 'hidden',
                                                background: isActive || isHovered
                                                    ? 'var(--sb-item-hover)'
                                                    : 'transparent',
                                                transition: 'background 0.22s',
                                            }}
                                        >
                                            {/* ripple */}
                                            <AnimatePresence>
                                                {isClicked && (
                                                    <motion.span
                                                        initial={{ scale: 0, opacity: 0.35 }}
                                                        animate={{ scale: 5, opacity: 0 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.42 }}
                                                        style={{
                                                            position: 'absolute', top: '50%', left: '2.8rem',
                                                            width: 32, height: 32, borderRadius: '50%',
                                                            background: 'var(--accent-primary)',
                                                            transform: 'translate(-50%, -50%)',
                                                            pointerEvents: 'none',
                                                        }}
                                                    />
                                                )}
                                            </AnimatePresence>

                                            {/* active left pill */}
                                            {isActive && (
                                                <motion.span
                                                    layoutId="sb-nav-active"
                                                    style={{
                                                        position: 'absolute', left: 0, top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        width: 3, height: '55%', borderRadius: '0 3px 3px 0',
                                                        background: 'var(--accent-primary)',
                                                    }}
                                                />
                                            )}

                                            {/* icon box */}
                                            <motion.div
                                                animate={{
                                                    background: isActive || isHovered
                                                        ? 'var(--sb-badge-bg)'
                                                        : 'transparent',
                                                    color: isActive || isHovered
                                                        ? 'var(--accent-primary)'
                                                        : 'var(--sb-text-num)',
                                                }}
                                                transition={{ duration: 0.2 }}
                                                style={{
                                                    width: 30, height: 30, borderRadius: '7px',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    flexShrink: 0,
                                                    border: isActive || isHovered
                                                        ? '1px solid var(--sb-border)'
                                                        : '1px solid transparent',
                                                    transition: 'border-color 0.2s',
                                                }}
                                            >
                                                <NavIcon size={14} strokeWidth={1.8} />
                                            </motion.div>

                                            {/* text block */}
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <motion.span
                                                    animate={{ x: isHovered ? 4 : 0 }}
                                                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                                                    style={{
                                                        display: 'block',
                                                        fontSize: '0.92rem', fontWeight: 600,
                                                        letterSpacing: '-0.01em', lineHeight: 1.2,
                                                        color: isActive || isHovered
                                                            ? 'var(--sb-text-h)'
                                                            : 'var(--sb-text-primary)',
                                                        transition: 'color 0.22s',
                                                    }}
                                                >
                                                    {link.label}
                                                </motion.span>
                                                <motion.span
                                                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 3 }}
                                                    transition={{ duration: 0.16 }}
                                                    style={{
                                                        display: 'block',
                                                        fontSize: '0.66rem', color: 'var(--sb-text-desc)',
                                                        marginTop: '1px', lineHeight: 1,
                                                    }}
                                                >
                                                    {link.desc}
                                                </motion.span>
                                            </div>

                                            {/* arrow */}
                                            <motion.div
                                                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -8 }}
                                                transition={{ duration: 0.16 }}
                                                style={{ color: 'var(--accent-primary)', flexShrink: 0 }}
                                            >
                                                <ArrowUpRight size={13} />
                                            </motion.div>

                                            {/* bottom line */}
                                            <motion.span
                                                animate={{ scaleX: isHovered ? 1 : 0 }}
                                                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                                                style={{
                                                    position: 'absolute', bottom: 0,
                                                    left: '2.9rem', right: '2.2rem',
                                                    height: '1px', transformOrigin: 'left',
                                                    background: 'linear-gradient(90deg, var(--accent-primary), transparent)',
                                                }}
                                            />
                                        </motion.a>
                                    </motion.div>
                                );
                            })}
                        </motion.nav>

                        {/* â”€â”€ footer â”€â”€ */}
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.75, duration: 0.5 }}
                            style={{
                                position: 'relative', zIndex: 2,
                                padding: '1rem 1.75rem 1.75rem',
                                borderTop: '1px solid var(--sb-divider)',
                            }}
                        >
                            {/* CTA with animated gradient border */}
                            <div style={{
                                position: 'relative',
                                borderRadius: '10px', padding: '1.5px',
                                background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-primary))',
                                backgroundSize: '200% 100%',
                                animation: 'sbCtaBorder 3s linear infinite',
                                marginBottom: '1.1rem',
                            }}>
                                <a
                                    href="#contact"
                                    onClick={onClose}
                                    className="sidebar-cta"
                                    style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        gap: '0.5rem', textDecoration: 'none',
                                        background: isDark ? '#0a141c' : '#f5f8fb',
                                        color: 'var(--accent-primary)',
                                        fontWeight: 700, fontSize: '0.82rem',
                                        padding: '0.8rem 1.2rem',
                                        borderRadius: '9px',
                                        letterSpacing: '0.07em',
                                        transition: 'background 0.2s, transform 0.2s',
                                    }}
                                >
                                    <Zap size={14} />
                                    <span className="mono-text">LET'S BUILD TOGETHER</span>
                                    <ArrowUpRight size={14} />
                                </a>
                            </div>

                            {/* social row */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', gap: '0.6rem' }}>
                                    {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                                        <motion.a
                                            key={label}
                                            href={href}
                                            target="_blank" rel="noopener noreferrer"
                                            whileHover={{ y: -3 }}
                                            className="sb-social"
                                            title={label}
                                            style={{
                                                width: 34, height: 34, borderRadius: '50%',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                border: '1px solid var(--sb-border)',
                                                color: 'var(--sb-text-desc)',
                                                textDecoration: 'none',
                                                transition: 'all 0.2s',
                                            }}
                                        >
                                            <Icon size={14} />
                                        </motion.a>
                                    ))}
                                </div>

                                <p className="mono-text" style={{
                                    fontSize: '0.6rem', letterSpacing: '0.14em',
                                    color: 'var(--sb-label-muted)',
                                }}>
                                    AI Â· ETHICS Â· ARCH
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

