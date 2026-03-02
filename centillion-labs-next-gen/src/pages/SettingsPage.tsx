import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor, Bell, Globe2, Palette, Shield, Eye } from 'lucide-react';
import { PageLayout, PageHero, FadeIn } from './PageLayout';

function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    const saved = localStorage.getItem('centillion-theme');
    return (saved as 'light' | 'dark' | 'system') || 'system';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') {
      const sys = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.setAttribute('data-theme', sys);
    } else {
      root.setAttribute('data-theme', theme);
    }
    localStorage.setItem('centillion-theme', theme);
  }, [theme]);

  return [theme, setTheme] as const;
}

const Toggle: React.FC<{ on: boolean; onToggle: () => void; color?: string }> = ({ on, onToggle, color = 'var(--accent-primary)' }) => (
  <motion.button
    onClick={onToggle}
    animate={{ backgroundColor: on ? color : 'var(--border-color)' }}
    style={{
      width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
      padding: '2px', display: 'flex', alignItems: 'center', position: 'relative',
      flexShrink: 0,
    }}
  >
    <motion.div
      animate={{ x: on ? 20 : 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff' }}
    />
  </motion.button>
);

const SettingRow: React.FC<{ icon: React.ReactNode; label: string; desc: string; control: React.ReactNode }> = ({ icon, label, desc, control }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
    padding: '1.2rem 1.5rem', borderBottom: '1px solid var(--border-color)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
      <div style={{
        width: 38, height: 38, borderRadius: '10px',
        background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.92rem' }}>{label}</div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 300, marginTop: '2px' }}>{desc}</div>
      </div>
    </div>
    <div style={{ flexShrink: 0 }}>{control}</div>
  </div>
);

export const SettingsPage: React.FC = () => {
  const [theme, setTheme] = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [lang, setLang] = useState('en');

  return (
    <PageLayout>
      <PageHero
        tag="// PREFERENCES"
        headline={"Settings."}
        sub="Customize your Centillion Labs experience — from visual themes to accessibility preferences."
      />

      <section style={{ padding: '0 clamp(1.5rem,8vw,10rem) clamp(3rem,8vw,7rem)' }}>
        <div style={{ maxWidth: '720px', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

          {/* Appearance */}
          <FadeIn>
            <div>
              <div className="mono-text" style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', marginBottom: '1rem' }}>// APPEARANCE</div>
              <div className="glass-panel" style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1rem', fontWeight: 300 }}>Theme</div>
                  <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                    {[
                      { value: 'light' as const, icon: <Sun size={16} />, label: 'Light' },
                      { value: 'dark' as const, icon: <Moon size={16} />, label: 'Dark' },
                      { value: 'system' as const, icon: <Monitor size={16} />, label: 'System' },
                    ].map(opt => (
                      <motion.button
                        key={opt.value}
                        onClick={() => setTheme(opt.value)}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.5rem',
                          padding: '0.6rem 1.2rem', borderRadius: '10px', border: '1px solid',
                          borderColor: theme === opt.value ? 'var(--accent-primary)' : 'var(--border-color)',
                          background: theme === opt.value ? 'rgba(0,229,255,0.1)' : 'transparent',
                          color: theme === opt.value ? 'var(--accent-primary)' : 'var(--text-secondary)',
                          fontSize: '0.85rem', cursor: 'pointer', fontWeight: theme === opt.value ? 600 : 300,
                          transition: 'all 0.2s',
                        }}
                      >
                        {opt.icon}{opt.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <SettingRow
                  icon={<Palette size={16} style={{ color: 'var(--accent-primary)' }} />}
                  label="High Contrast"
                  desc="Increase contrast for better readability"
                  control={<Toggle on={highContrast} onToggle={() => setHighContrast(v => !v)} />}
                />
                <SettingRow
                  icon={<Eye size={16} style={{ color: 'var(--accent-primary)' }} />}
                  label="Reduce Motion"
                  desc="Minimize animations across the site"
                  control={<Toggle on={reducedMotion} onToggle={() => setReducedMotion(v => !v)} />}
                />
              </div>
            </div>
          </FadeIn>

          {/* Notifications */}
          <FadeIn delay={0.1}>
            <div>
              <div className="mono-text" style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', marginBottom: '1rem' }}>// NOTIFICATIONS</div>
              <div className="glass-panel" style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                <SettingRow
                  icon={<Bell size={16} style={{ color: 'var(--accent-primary)' }} />}
                  label="Product Updates"
                  desc="Receive notifications about new features and releases"
                  control={<Toggle on={notifications} onToggle={() => setNotifications(v => !v)} />}
                />
              </div>
            </div>
          </FadeIn>

          {/* Language */}
          <FadeIn delay={0.15}>
            <div>
              <div className="mono-text" style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', marginBottom: '1rem' }}>// LANGUAGE & REGION</div>
              <div className="glass-panel" style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                <SettingRow
                  icon={<Globe2 size={16} style={{ color: 'var(--accent-primary)' }} />}
                  label="Language"
                  desc="Select your preferred display language"
                  control={
                    <select
                      value={lang}
                      onChange={e => setLang(e.target.value)}
                      style={{
                        background: 'var(--card-bg, rgba(255,255,255,0.06))',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px', padding: '0.4rem 0.8rem',
                        color: 'var(--text-primary)', fontSize: '0.85rem', cursor: 'pointer',
                      }}
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="ta">Tamil</option>
                      <option value="de">Deutsch</option>
                    </select>
                  }
                />
              </div>
            </div>
          </FadeIn>

          {/* Privacy */}
          <FadeIn delay={0.2}>
            <div>
              <div className="mono-text" style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', marginBottom: '1rem' }}>// PRIVACY</div>
              <div className="glass-panel" style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                <SettingRow
                  icon={<Shield size={16} style={{ color: 'var(--accent-primary)' }} />}
                  label="Usage Analytics"
                  desc="Help us improve by sharing anonymized usage data"
                  control={<Toggle on={analytics} onToggle={() => setAnalytics(v => !v)} />}
                />
              </div>
            </div>
          </FadeIn>

          {/* Save */}
          <FadeIn delay={0.25}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { /* preferences auto-saved via state */ }}
                style={{
                  background: 'var(--accent-primary)', color: '#000',
                  border: 'none', padding: '0.8rem 2rem', borderRadius: '10px',
                  fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer', letterSpacing: '0.05em',
                }}
              >
                PREFERENCES SAVED
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setNotifications(true); setReducedMotion(false); setHighContrast(false); setAnalytics(true); setLang('en'); setTheme('system'); }}
                style={{
                  background: 'transparent', color: 'var(--text-secondary)',
                  border: '1px solid var(--border-color)', padding: '0.8rem 2rem', borderRadius: '10px',
                  fontWeight: 400, fontSize: '0.88rem', cursor: 'pointer',
                }}
              >
                Reset Defaults
              </motion.button>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageLayout>
  );
};
