import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Menu } from 'lucide-react';
import { Header } from '../components/layout/Header';
import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', position: 'relative', overflowX: 'hidden' }}>
      {/* Animated background mesh */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,229,255,0.07) 0%, transparent 70%),
                     radial-gradient(ellipse 50% 40% at 90% 80%, rgba(0,150,136,0.05) 0%, transparent 70%)`
      }} />

      <Header />

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        onClick={() => navigate('/')}
        style={{
          position: 'fixed', top: '5.5rem', left: '2rem', zIndex: 100,
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: 'var(--card-bg, rgba(255,255,255,0.08))',
          border: '1px solid var(--border-color)',
          borderRadius: '10px', padding: '0.5rem 1rem',
          color: 'var(--text-primary)', cursor: 'pointer',
          fontSize: '0.85rem', fontWeight: 500,
          backdropFilter: 'blur(10px)',
          transition: 'all 0.2s',
        }}
        whileHover={{ scale: 1.04, borderColor: 'var(--accent-primary)' }}
        whileTap={{ scale: 0.97 }}
      >
        <ArrowLeft size={15} />
        Home
      </motion.button>

      <main style={{ position: 'relative', zIndex: 1, paddingTop: '6rem' }}>
        {children}
      </main>

      {/* Page footer */}
      <footer style={{
        borderTop: '1px solid var(--border-color)',
        padding: '2rem clamp(1rem,5vw,4rem)',
        marginTop: '4rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '1rem',
        color: 'var(--text-secondary)', fontSize: '0.85rem',
      }}>
        <span className="mono-text" style={{ letterSpacing: '0.1em', color: 'var(--accent-primary)' }}>CENTILLION LABS</span>
        <span>Eternal Data, Expansive Solutions.</span>
        <a href="mailto:connect@centillionlabs.com" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>
          connect@centillionlabs.com
        </a>
      </footer>
    </div>
  );
};

/* Shared animated section fade */
export const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }> = ({ children, delay = 0, className, style }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
    style={style}
  >
    {children}
  </motion.div>
);

/* Shared page hero */
export const PageHero: React.FC<{
  tag: string;
  headline: string;
  sub: string;
  accent?: string;
}> = ({ tag, headline, sub, accent = 'var(--accent-primary)' }) => (
  <section style={{
    padding: 'clamp(3rem,10vw,7rem) clamp(1.5rem,8vw,10rem) clamp(2rem,6vw,5rem)',
    position: 'relative', overflow: 'hidden',
  }}>
    {/* decorative line */}
    <motion.div
      initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        transformOrigin: 'left',
      }}
    />
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mono-text"
      style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: accent, marginBottom: '1.5rem' }}
    >
      {tag}
    </motion.div>
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      style={{
        fontSize: 'clamp(3rem,7vw,7rem)',
        fontWeight: 200,
        lineHeight: 1.05,
        color: 'var(--text-primary)',
        marginBottom: '1.5rem',
        letterSpacing: '-0.02em',
      }}
    >
      {headline}
    </motion.h1>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{
        fontSize: 'clamp(1rem,2.5vw,1.25rem)',
        color: 'var(--text-secondary)',
        maxWidth: '640px',
        lineHeight: 1.8,
        fontWeight: 300,
      }}
    >
      {sub}
    </motion.p>
  </section>
);

/* Stat card */
export const StatCard: React.FC<{ value: string; label: string; delay?: number }> = ({ value, label, delay = 0 }) => (
  <FadeIn delay={delay}>
    <div className="glass-panel card-pad" style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 200, color: 'var(--accent-primary)', lineHeight: 1, marginBottom: '0.5rem' }}>{value}</div>
      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 300, letterSpacing: '0.05em' }}>{label}</div>
    </div>
  </FadeIn>
);
