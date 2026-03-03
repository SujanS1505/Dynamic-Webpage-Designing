import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────────────────
   Logo3D — Holographic 3D interactive logo
   • CSS 3D cube faces (perspective transform)
   • Mouse-tracked tilt with spring physics
   • Breathing neon glow / prismatic rainbow shift on hover
   • Floating idle animation
──────────────────────────────────────────────────────────────────────────────── */

interface Logo3DProps {
    size?: number;
}

export const Logo3D: React.FC<Logo3DProps> = ({ size = 38 }) => {
    const wrapRef = useRef<HTMLButtonElement>(null);
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);

    // Spring-damped mouse rotation
    const rawX = useSpring(0, { stiffness: 180, damping: 22 });
    const rawY = useSpring(0, { stiffness: 180, damping: 22 });

    // Map spring values → css rotate strings
    const rotateX = useTransform(rawY, (v) => `${v}deg`);
    const rotateY = useTransform(rawX, (v) => `${v}deg`);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const el = wrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        rawX.set(dx * 28);
        rawY.set(-dy * 22);
    }, [rawX, rawY]);

    const handleMouseLeave = useCallback(() => {
        rawX.set(0);
        rawY.set(0);
        setHovered(false);
    }, [rawX, rawY]);

    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            el.removeEventListener('mousemove', handleMouseMove);
            el.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [handleMouseMove, handleMouseLeave]);

    // Click burst
    const handleClick = () => {
        setClicked(true);
        setTimeout(() => setClicked(false), 600);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
    };

    const half = size / 2;
    const glowColor = hovered ? '#39ff14' : '#00e5ff';

    let outerGlowBox: string;
    if (clicked) {
        outerGlowBox = `0 0 0 8px ${glowColor}44, 0 0 60px 20px ${glowColor}88`;
    } else if (hovered) {
        outerGlowBox = `0 0 32px 8px ${glowColor}55`;
    } else {
        outerGlowBox = `0 0 18px 4px ${glowColor}55`;
    }

    let outerScale: number;
    if (clicked) {
        outerScale = 1.18;
    } else if (hovered) {
        outerScale = 1.06;
    } else {
        outerScale = 1;
    }

    return (
        <button
            ref={wrapRef}
            type="button"
            onMouseEnter={() => setHovered(true)}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            aria-label="Centillion logo"
            style={{
                position: 'relative',
                width: size + 24,
                height: size + 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                outline: 'none',
                background: 'none',
                border: 'none',
                padding: 0,
            }}
        >
            {/* ── Outer glow ring ── */}
            <motion.div
                animate={{ boxShadow: outerGlowBox, scale: outerScale }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    pointerEvents: 'none',
                }}
            />

            {/* ── Perspective container (enables 3D children) ── */}
            <div style={{ perspective: 500, perspectiveOrigin: '50% 50%' }}>
                {/* ── Cube wrapper – receives spring tilt ── */}
                <motion.div
                    style={{
                        width: size,
                        height: size,
                        position: 'relative',
                        transformStyle: 'preserve-3d',
                        rotateX,
                        rotateY,
                    }}
                    animate={
                        clicked
                            ? { scale: 1.15 }
                            : { scale: 1 }
                    }
                    transition={{ duration: 0.3 }}
                >
                    {/* ── Idle floating bobble ── */}
                    <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%' }}
                    >
                        {/* ── Front face — main logo img ── */}
                        <CubeFace
                            transform={`translateZ(${half * 0.55}px)`}
                            opacity={1}
                            size={size}
                            glowColor={glowColor}
                            hovered={hovered}
                        >
                            <img
                                src="/logo.png"
                                alt="Centillion"
                                draggable={false}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    filter: hovered
                                        ? `drop-shadow(0 0 10px ${glowColor}) drop-shadow(0 0 22px #a855f7aa) saturate(1.6) brightness(1.15)`
                                        : `drop-shadow(0 0 7px ${glowColor}99) saturate(1.2)`,
                                    transition: 'filter 0.4s ease',
                                    userSelect: 'none',
                                }}
                            />
                            {/* Holographic shimmer overlay */}
                            <HoloShimmer active={hovered} size={size} />
                        </CubeFace>

                        {/* ── Top face — reflects teal ── */}
                        <CubeFace
                            transform={`rotateX(90deg) translateZ(${half * 0.55}px)`}
                            opacity={hovered ? 0.55 : 0.3}
                            size={size}
                            glowColor={glowColor}
                            hovered={hovered}
                            isSide
                        >
                            <div style={{
                                width: '100%', height: '100%',
                                background: `linear-gradient(135deg, ${glowColor}44, #a855f722)`,
                                borderRadius: 6,
                            }} />
                        </CubeFace>

                        {/* ── Bottom face ── */}
                        <CubeFace
                            transform={`rotateX(-90deg) translateZ(${half * 0.55}px)`}
                            opacity={hovered ? 0.4 : 0.2}
                            size={size}
                            glowColor={glowColor}
                            hovered={hovered}
                            isSide
                        >
                            <div style={{
                                width: '100%', height: '100%',
                                background: `linear-gradient(315deg, #a855f733, ${glowColor}22)`,
                                borderRadius: 6,
                            }} />
                        </CubeFace>

                        {/* ── Right face ── */}
                        <CubeFace
                            transform={`rotateY(90deg) translateZ(${half * 0.55}px)`}
                            opacity={hovered ? 0.5 : 0.25}
                            size={size}
                            glowColor={glowColor}
                            hovered={hovered}
                            isSide
                        >
                            <div style={{
                                width: '100%', height: '100%',
                                background: `linear-gradient(180deg, ${glowColor}33, transparent)`,
                                borderRadius: 6,
                            }} />
                        </CubeFace>

                        {/* ── Left face ── */}
                        <CubeFace
                            transform={`rotateY(-90deg) translateZ(${half * 0.55}px)`}
                            opacity={hovered ? 0.5 : 0.25}
                            size={size}
                            glowColor={glowColor}
                            hovered={hovered}
                            isSide
                        >
                            <div style={{
                                width: '100%', height: '100%',
                                background: `linear-gradient(180deg, transparent, ${glowColor}33)`,
                                borderRadius: 6,
                            }} />
                        </CubeFace>
                    </motion.div>
                </motion.div>
            </div>
        </button>
    );
};

/* ── Reusable cube face ──────────────────────────────────────────────────── */
function CubeFace({
    transform, opacity, size, glowColor, hovered, isSide = false, children,
}: Readonly<{
    transform: string;
    opacity: number;
    size: number;
    glowColor: string;
    hovered: boolean;
    isSide?: boolean;
    children: React.ReactNode;
}>) {
    return (
        <motion.div
            animate={{ opacity }}
            transition={{ duration: 0.4 }}
            style={{
                position: 'absolute',
                inset: 0,
                width: size,
                height: size,
                transform,
                backfaceVisibility: isSide ? 'hidden' : 'visible',
                border: `1px solid ${glowColor}${hovered ? '66' : '33'}`,
                borderRadius: 8,
                overflow: 'hidden',
                boxShadow: hovered
                    ? `inset 0 0 14px ${glowColor}33`
                    : `inset 0 0 6px ${glowColor}18`,
                transition: 'border-color 0.4s, box-shadow 0.4s',
            }}
        >
            {children}
        </motion.div>
    );
}

/* ── Holographic shimmer overlay ────────────────────────────────────────── */
function HoloShimmer({ active, size }: Readonly<{ active: boolean; size: number }>) {
    return (
        <motion.div
            animate={{ x: active ? ['-100%', '160%'] : '-100%' }}
            transition={active
                ? { duration: 1.1, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6 }
                : { duration: 0.3 }}
            style={{
                position: 'absolute',
                inset: 0,
                width: size * 0.5,
                height: '100%',
                background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.45) 50%, rgba(168,85,247,0.25) 60%, transparent 70%)',
                pointerEvents: 'none',
                borderRadius: 6,
            }}
        />
    );
}

