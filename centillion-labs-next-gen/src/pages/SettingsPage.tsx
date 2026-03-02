import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Globe, BellRing, BarChart2, Check } from 'lucide-react';
import { PageLayout, PageHero, FadeIn, Sec, SectionHead } from './PageLayout';

const ACCENT_COLORS = [
  { label: 'Cyan', value: '#00e5ff' },
  { label: 'Teal', value: '#009688' },
  { label: 'Blue', value: '#2979ff' },
  { label: 'Purple', value: '#7c4dff' },
  { label: 'Green', value: '#00e676' },
];

const LANGS = ['English', 'Hindi (हिन्दी)', 'Tamil (தமிழ்)'];

interface ToggleProps { on: boolean; onChange: () => void; color?: string }
const Toggle: React.FC<ToggleProps> = ({ on, onChange, color = 'var(--accent-primary)' }) => (
  <motion.button onClick={onChange} animate={{ backgroundColor: on ? color : 'rgba(255,255,255,0.08)' }}
    style={{ width: 48, height: 26, borderRadius: 13, border: `1px solid ${on ? color + '66' : 'var(--border-color)'}`, cursor: 'pointer', position: 'relative', transition: 'border-color 0.2s', flexShrink: 0 }}>
    <motion.div animate={{ x: on ? 24 : 2 }} transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      style={{ position: 'absolute', top: 2, left: 0, width: 20, height: 20, borderRadius: '50%', background: on ? '#000' : 'var(--text-secondary)', boxShadow: '0 1px 3px rgba(0,0,0,0.4)' }} />
  </motion.button>
);

export const SettingsPage: React.FC = () => {
  const [accentColor, setAccentColor] = useState('#00e5ff');
  const [dark, setDark] = useState(() => document.documentElement.getAttribute('data-theme') === 'dark');
  const [compact, setCompact] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [lang, setLang] = useState('English');

  const applyTheme = (toDark: boolean) => {
    document.documentElement.setAttribute('data-theme', toDark ? 'dark' : 'light');
    setDark(toDark);
  };

  const applyAccent = (c: string) => {
    document.documentElement.style.setProperty('--accent-primary', c);
    setAccentColor(c);
  };

  return (
    <PageLayout>
      <PageHero
        tag="// PREFERENCES"
        headline={"App\nSettings."}
        sub="Personalise your Centillion Labs experience — themes, colours, notifications, language, and privacy."
      />

      {/* Appearance */}
      <Sec>
        <SectionHead tag="// APPEARANCE" headline="Personalise Your View" sub="Choose the look that feels right for you." />

        {/* Accent colour */}
        <FadeIn>
          <div className="glass-panel card-pad" style={{ borderRadius: '18px', marginBottom: '1.5rem' }}>
            <div className="mono-text" style={{ fontSize: '0.68rem', letterSpacing: '0.15em', color: 'var(--accent-primary)', marginBottom: '1rem' }}>ACCENT COLOUR</div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {ACCENT_COLORS.map(c => (
                <motion.button key={c.value} onClick={() => applyAccent(c.value)} whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.94 }}
                  title={c.label}
                  style={{ width: 40, height: 40, borderRadius: '50%', background: c.value, border: accentColor === c.value ? '3px solid var(--text-primary)' : '3px solid transparent', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 2px 12px ${c.value}50` }}>
                  {accentColor === c.value && <Check size={14} style={{ color: '#000', fontWeight: 800 }} />}
                </motion.button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Theme + compact toggles */}
        <FadeIn delay={0.05}>
          <div className="glass-panel card-pad" style={{ borderRadius: '18px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="mono-text" style={{ fontSize: '0.68rem', letterSpacing: '0.15em', color: 'var(--accent-primary)', marginBottom: '0.25rem' }}>DISPLAY</div>
            {[
              { icon: dark ? Moon : Sun, label: 'Dark Mode', sub: 'Switch between light and dark interface', on: dark, toggle: () => applyTheme(!dark) },
              { icon: BarChart2, label: 'Compact Mode', sub: 'Reduce padding and spacing for dense layouts', on: compact, toggle: () => setCompact(!compact) },
            ].map(row => {
              const Icon = row.icon;
              return (
                <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'rgba(0,229,255,0.06)', border: '1px solid rgba(0,229,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={18} style={{ color: 'var(--accent-primary)' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{row.label}</div>
                    <div style={{ fontWeight: 300, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{row.sub}</div>
                  </div>
                  <Toggle on={row.on} onChange={row.toggle} />
                </div>
              );
            })}
          </div>
        </FadeIn>
      </Sec>

      {/* Language */}
      <Sec>
        <SectionHead tag="// LANGUAGE" headline="Choose Your Language" />
        <FadeIn>
          <div className="glass-panel card-pad" style={{ borderRadius: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <Globe size={18} style={{ color: 'var(--accent-primary)' }} />
              <div className="mono-text" style={{ fontSize: '0.68rem', letterSpacing: '0.15em', color: 'var(--accent-primary)' }}>DISPLAY LANGUAGE</div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {LANGS.map(l => (
                <motion.button key={l} onClick={() => setLang(l)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  style={{ padding: '0.55rem 1.3rem', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '0.82rem', fontWeight: lang === l ? 600 : 400, background: lang === l ? 'var(--accent-primary)' : 'rgba(0,229,255,0.07)', color: lang === l ? '#000' : 'var(--text-secondary)', transition: 'all 0.2s' }}>
                  {l}
                </motion.button>
              ))}
            </div>
          </div>
        </FadeIn>
      </Sec>

      {/* Notifications & Privacy */}
      <Sec>
        <SectionHead tag="// NOTIFICATIONS & PRIVACY" headline="Control & Privacy" />
        <FadeIn>
          <div className="glass-panel card-pad" style={{ borderRadius: '18px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              { icon: BellRing, label: 'Product Notifications', sub: 'Receive updates about new Centillion products and releases.', on: notifications, toggle: () => setNotifications(!notifications) },
              { icon: BarChart2, label: 'Usage Analytics', sub: 'Share anonymous usage data to help us improve the platform.', on: analytics, toggle: () => setAnalytics(!analytics) },
            ].map(row => {
              const Icon = row.icon;
              return (
                <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'rgba(0,229,255,0.06)', border: '1px solid rgba(0,229,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={18} style={{ color: 'var(--accent-primary)' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{row.label}</div>
                    <div style={{ fontWeight: 300, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{row.sub}</div>
                  </div>
                  <Toggle on={row.on} onChange={row.toggle} />
                </div>
              );
            })}
          </div>
        </FadeIn>
      </Sec>

      {/* Centillion branding note */}
      <Sec>
        <FadeIn>
          <div style={{ textAlign: 'center', padding: '2rem 0 1rem' }}>
            <div className="mono-text" style={{ fontSize: '0.65rem', letterSpacing: '0.18em', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>CENTILLION LABS</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 300 }}>© 2024 Centillion Labs Inc. · connect@centillionlabs.com</p>
          </div>
        </FadeIn>
      </Sec>
    </PageLayout>
  );
};
