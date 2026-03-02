import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUp } from 'lucide-react';
import { Header } from '../components/layout/Header';
import React, { useEffect, useRef, useState } from 'react';

interface PageLayoutProps { children: React.ReactNode; }

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => setShowTop(v > 0.15));
    return unsub;
  }, [scrollYProgress]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', position: 'relative', overflowX: 'hidden' }}>
      {/* Scroll progress bar */}
      <motion.div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '2px', zIndex: 200,
        background: 'linear-gradient(90deg, var(--accent-primary), #00bcd4)',
        scaleX, transformOrigin: 'left',
      }} />

      {/* Ambient background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,229,255,0.06) 0%, transparent 70%),
          radial-gradient(ellipse 40% 40% at 90% 80%, rgba(0,150,136,0.04) 0%, transparent 70%),
          radial-gradient(ellipse 50% 50% at 10% 90%, rgba(0,188,212,0.04) 0%, transparent 70%)
        `
      }} />

      <Header />

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, type: 'spring', damping: 20 }}
        onClick={() => navigate('/')}
        style={{
          position: 'fixed', top: '5.5rem', left: '2rem', zIndex: 100,
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: 'var(--card-bg, rgba(255,255,255,0.08))',
          border: '1px solid var(--border-color)',
          borderRadius: '10px', padding: '0.5rem 1rem',
          color: 'var(--text-primary)', cursor: 'pointer',
          fontSize: '0.82rem', fontWeight: 500,
          backdropFilter: 'blur(10px)',
        }}
        whileHover={{ scale: 1.05, borderColor: 'var(--accent-primary)', x: -3 }}
        whileTap={{ scale: 0.96 }}
      >
        <ArrowLeft size={14} />
        Home
      </motion.button>

      {/* Back-to-top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100,
              width: 44, height: 44, borderRadius: '50%', border: '1px solid var(--accent-primary)',
              background: 'rgba(0,229,255,0.1)',
              color: 'var(--accent-primary)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(10px)',
            }}
            whileHover={{ scale: 1.1, background: 'rgba(0,229,255,0.2)' }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      <main style={{ position: 'relative', zIndex: 1, paddingTop: '6rem' }}>
        {children}
      </main>

      <footer style={{
        borderTop: '1px solid var(--border-color)',
        padding: '2.5rem clamp(1.5rem,6vw,3rem)',
        marginTop: '5rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '1rem',
        color: 'var(--text-secondary)', fontSize: '0.82rem',
      }}>
        <span className="mono-text" style={{ letterSpacing: '0.12em', color: 'var(--accent-primary)' }}>CENTILLION LABS</span>
        <span style={{ fontWeight: 300 }}>Eternal Data, Expansive Solutions.</span>
        <a href="mailto:connect@centillionlabs.com" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>connect@centillionlabs.com</a>
      </footer>
    </div>
  );
};

/* ─── FadeIn — supports stagger ─── */
export const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, direction = 'up', className, style }) => {
  const from = direction === 'left' ? { x: -30, y: 0 }
             : direction === 'right' ? { x: 30, y: 0 }
             : direction === 'none' ? { x: 0, y: 0 }
             : { x: 0, y: 28 };
  return (
    <motion.div
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

/* ─── Wrap — centred max-width container ─── */
export const Wrap: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; max?: number }> = ({ children, style, max = 1200 }) => (
  <div style={{ maxWidth: max, margin: '0 auto', width: '100%', ...style }}>
    {children}
  </div>
);

/* ─── Section ─── */
export const Sec: React.FC<{ children: React.ReactNode; pad?: string; style?: React.CSSProperties }> = ({
  children,
  pad = 'clamp(4rem,8vw,8rem) clamp(1.5rem,6vw,3rem)',
  style,
}) => (
  <section style={{ padding: pad, ...style }}>
    <Wrap>{children}</Wrap>
  </section>
);

/* ─── Section header label + headline ─── */
export const SectionHead: React.FC<{ tag: string; headline: string; sub?: string; centre?: boolean }> = ({
  tag, headline, sub, centre = false,
}) => (
  <FadeIn style={{ textAlign: centre ? 'center' : 'left', marginBottom: 'clamp(2rem,5vw,4rem)' }}>
    <div className="mono-text" style={{ fontSize: '0.72rem', letterSpacing: '0.22em', color: 'var(--accent-primary)', marginBottom: '0.9rem' }}>
      {tag}
    </div>
    <h2 style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 200, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: sub ? '1rem' : 0 }}>
      {headline}
    </h2>
    {sub && <p style={{ color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.8, maxWidth: centre ? '600px' : undefined, margin: centre ? '0 auto' : undefined, fontSize: '1rem' }}>{sub}</p>}
  </FadeIn>
);

/* ─── Page hero ─── */
export const PageHero: React.FC<{ tag: string; headline: string; sub: string; accent?: string }> = ({
  tag, headline, sub, accent = 'var(--accent-primary)',
}) => {
  const words = headline.split('\n');
  return (
    <section style={{
      padding: 'clamp(4rem,10vw,9rem) clamp(1.5rem,6vw,3rem) clamp(3rem,7vw,6rem)',
      position: 'relative', overflow: 'hidden',
    }}>
      <Wrap>
        {/* decorative animated line */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            transformOrigin: 'left',
          }}
        />

        {/* Decorative large number */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 0.04 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            position: 'absolute', right: 'clamp(1rem, 5vw, 4rem)', top: '50%', transform: 'translateY(-50%)',
            fontSize: 'clamp(6rem, 18vw, 18rem)', fontWeight: 800, color: 'var(--accent-primary)',
            lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
          }}
        >
          CL
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mono-text"
          style={{ fontSize: '0.72rem', letterSpacing: '0.22em', color: accent, marginBottom: '1.5rem' }}
        >
          {tag}
        </motion.div>

        <div style={{ overflow: 'hidden' }}>
          {words.map((word, i) => (
            <motion.h1
              key={i}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.08 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: 'clamp(3rem,7vw,8rem)',
                fontWeight: 200,
                lineHeight: 1.0,
                color: 'var(--text-primary)',
                letterSpacing: '-0.03em',
                display: 'block',
              }}
            >
              {word}
            </motion.h1>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.3 }}
          style={{
            fontSize: 'clamp(1rem,2vw,1.2rem)',
            color: 'var(--text-secondary)',
            maxWidth: '580px',
            lineHeight: 1.9,
            fontWeight: 300,
            marginTop: '2rem',
          }}
        >
          {sub}
        </motion.p>
      </Wrap>
    </section>
  );
};

/* ─── Animated stat number ─── */
export const StatCard: React.FC<{ value: string; label: string; delay?: number }> = ({ value, label, delay = 0 }) => (
  <FadeIn delay={delay}>
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 12px 36px rgba(0,229,255,0.12)' }}
      className="glass-panel card-pad"
      style={{ textAlign: 'center', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}
    >
      {/* shimmer bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--accent-primary), transparent)' }} />
      <div style={{ fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 200, color: 'var(--accent-primary)', lineHeight: 1, marginBottom: '0.5rem' }}>{value}</div>
      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 300, letterSpacing: '0.06em' }}>{label}</div>
    </motion.div>
  </FadeIn>
);

/* ─── Tag badge ─── */
export const Tag: React.FC<{ label: string; color?: string }> = ({ label, color = 'var(--accent-primary)' }) => (
  <span style={{
    background: `color-mix(in srgb, ${color} 10%, transparent)`,
    border: `1px solid color-mix(in srgb, ${color} 25%, transparent)`,
    color, fontSize: '0.72rem', padding: '0.25rem 0.7rem',
    borderRadius: '20px', fontWeight: 500, letterSpacing: '0.04em',
    display: 'inline-block',
  }}>
    {label}
  </span>
);

/* ─── Animated progress bar ─── */
export const ProgressBar: React.FC<{ label: string; pct: number; delay?: number; color?: string }> = ({
  label, pct, delay = 0, color = 'var(--accent-primary)',
}) => (
  <div style={{ marginBottom: '1.2rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 300 }}>{label}</span>
      <span className="mono-text" style={{ fontSize: '0.78rem', color }}>{pct}%</span>
    </div>
    <div style={{ height: '3px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ height: '100%', background: `linear-gradient(90deg, ${color}, color-mix(in srgb, ${color} 60%, #00bcd4))`, borderRadius: '4px' }}
      />
    </div>
  </div>
);
