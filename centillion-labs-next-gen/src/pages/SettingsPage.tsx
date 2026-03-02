import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Bell, BellOff, Globe2, Terminal, Palette } from 'lucide-react';
import { PageLayout, PageHero, FadeIn } from './PageLayout';

interface ToggleProps {
  value: boolean;
  onChange: (v: boolean) => void;
  color?: string;
}

const Toggle: React.FC<ToggleProps> = ({ value, onChange, color = 'var(--accent-primary)' }) => (
  <motion.button
    role="switch"
    aria-checked={value}
    onClick={() => onChange(!value)}
    style={{
      width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer', padding: 3,
      background: value ? color : 'var(--border-color)', display: 'flex', alignItems: 'center',
      transition: 'background 0.2s',
    }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.div
      animate={{ x: value ? 20 : 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff' }}
    />
  </motion.button>
);

export const SettingsPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [accentIdx, setAccentIdx] = useState(0);
  const [lang, setLang] = useState('en');

  const accents = [
    { name: 'Cyan', color: '#00e5ff' },
    { name: 'Teal', color: '#00bcd4' },
    { name: 'Lime', color: '#b2ff59' },
    { name: 'Amber', color: '#ffca28' },
    { name: 'Rose', color: '#ef5350' },
  ];

  const GROUPS = [
    {
      label: '// APPEARANCE',
      icon: Palette,
      items: [
        {
          label: 'Dark Mode',
          desc: 'Use dark interface — optimized for Centillion\'s visual identity.',
          control: <Toggle value={darkMode} onChange={setDarkMode} />,
          icon: darkMode ? Moon : Sun,
        },
        {
          label: 'Compact Mode',
          desc: 'Reduce spacing to fit more content on screen.',
          control: <Toggle value={compactMode} onChange={setCompactMode} />,
          icon: Terminal,
        },
      ],
    },
    {
      label: '// NOTIFICATIONS',
      icon: Bell,
      items: [
        {
          label: 'Enable Notifications',
          desc: 'Receive updates about new Centillion products, case studies, and platform changes.',
          control: <Toggle value={notifications} onChange={setNotifications} />,
          icon: notifications ? Bell : BellOff,
        },
      ],
    },
    {
      label: '// PRIVACY',
      icon: Globe2,
      items: [
        {
          label: 'Usage Analytics',
          desc: 'In keeping with Centillion\'s Responsible AI principles, analytics are off by default and fully anonymized when enabled.',
          control: <Toggle value={analytics} onChange={setAnalytics} color="#26a69a" />,
          icon: Globe2,
        },
      ],
    },
  ];

  return (
    <PageLayout>
      <PageHero
        tag="// SETTINGS"
        headline={"Preferences."}
        sub="Customize your Centillion Labs experience. All preferences are stored locally — in alignment with our commitment to data privacy and user sovereignty."
      />

      <section style={{ padding: '0 clamp(1.5rem,8vw,10rem) clamp(2rem,6vw,5rem)' }}>
        <div style={{ maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          {/* Accent */}
          <FadeIn>
            <div className="glass-panel card-pad" style={{ borderRadius: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Palette size={16} style={{ color: 'var(--accent-primary)' }} />
                <span className="mono-text" style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--accent-primary)' }}>// ACCENT COLOR</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {accents.map((a, i) => (
                  <motion.button
                    key={a.name}
                    onClick={() => setAccentIdx(i)}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.9 }}
                    title={a.name}
                    style={{
                      width: 36, height: 36, borderRadius: '50%', border: 'none', cursor: 'pointer',
                      background: a.color,
                      boxShadow: accentIdx === i ? `0 0 0 3px var(--bg-primary), 0 0 0 5px ${a.color}` : 'none',
                      transition: 'box-shadow 0.2s',
                    }}
                  />
                ))}
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 300, marginTop: '1rem', marginBottom: 0 }}>
                Selected: <span style={{ color: accents[accentIdx].color }}>{accents[accentIdx].name}</span>
              </p>
            </div>
          </FadeIn>

          {/* Toggle groups */}
          {GROUPS.map((group, gi) => (
            <FadeIn key={group.label} delay={gi * 0.07}>
              <div className="glass-panel card-pad" style={{ borderRadius: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <group.icon size={16} style={{ color: 'var(--accent-primary)' }} />
                  <span className="mono-text" style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--accent-primary)' }}>{group.label}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {group.items.map(item => {
                    const ItemIcon = item.icon;
                    return (
                      <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
                          <ItemIcon size={16} style={{ color: 'var(--text-secondary)', flexShrink: 0, marginTop: '2px' }} />
                          <div>
                            <div style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{item.label}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.5 }}>{item.desc}</div>
                          </div>
                        </div>
                        {item.control}
                      </div>
                    );
                  })}
                </div>
              </div>
            </FadeIn>
          ))}

          {/* Language */}
          <FadeIn delay={0.3}>
            <div className="glass-panel card-pad" style={{ borderRadius: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <Globe2 size={16} style={{ color: 'var(--accent-primary)' }} />
                <span className="mono-text" style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--accent-primary)' }}>// LANGUAGE</span>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {[{ code: 'en', label: 'English' }, { code: 'hi', label: 'हिन्दी' }, { code: 'ta', label: 'தமிழ்' }].map(l => (
                  <motion.button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    style={{
                      padding: '0.5rem 1.1rem', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '0.84rem', fontWeight: 500,
                      background: lang === l.code ? 'var(--accent-primary)' : 'rgba(0,229,255,0.07)',
                      color: lang === l.code ? '#000' : 'var(--text-secondary)',
                      transition: 'all 0.2s',
                    }}
                  >
                    {l.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Branding note */}
          <FadeIn delay={0.4}>
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <span className="mono-text" style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', letterSpacing: '0.12em' }}>
                CENTILLION LABS · "ETERNAL DATA, EXPANSIVE SOLUTIONS"
              </span>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 300, marginTop: '0.4rem' }}>
                connect@centillionlabs.com
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </PageLayout>
  );
};
