import { motion } from 'framer-motion';
import { Linkedin, Users, Building2 } from 'lucide-react';
import { PageLayout, PageHero, FadeIn } from './PageLayout';

const LEADERS = [
  {
    name: 'Mohanapriya',
    role: 'CEO & Co-Founder',
    desc: 'Visionary leader driving Centillion\'s mission as an AI Ontology Company. Championing Responsible AI, Ethical AI, and data-driven transformation for enterprise clients worldwide. Her leadership bridges deep technical expertise with strategic business acumen.',
    linkedin: 'https://www.linkedin.com/in/mohanapriya-appusamy-590a75340/',
    color: '#00e5ff',
    initial: 'M',
    expertise: ['Responsible AI', 'AI Strategy', 'Data Ontology', 'Business Development'],
  },
  {
    name: 'Chinnasamy',
    role: 'CTO & Co-Founder',
    desc: 'Technical architect behind Centillion\'s full product suite — AristotleAI, Plato, Claudius, and Hexacube. Deep expertise across Go, Scala, Cloud, and Generative AI. Leads the engineering culture that delivers elite results for enterprise clients in 24–48 hours.',
    linkedin: 'https://www.linkedin.com/company/96900585',
    color: '#00bcd4',
    initial: 'C',
    expertise: ['Go & Scala Architecture', 'Generative AI', 'Cloud Engineering', 'Data Engineering'],
  },
];

const CLIENTS = [
  { name: 'Taboola', desc: "World's leading discovery & native advertising platform", sector: 'Advertising & Media' },
  { name: 'SwissRe', desc: 'Global insurance & reinsurance leader', sector: 'Insurance' },
  { name: 'Security Scorecard', desc: 'Secure your supply chain', sector: 'Cybersecurity' },
  { name: 'BlockChainSentry', desc: 'Secure your smart contract', sector: 'Blockchain / Web3' },
  { name: 'EzOut', desc: 'Boosts revenue and profit margins for grocers', sector: 'Retail & Grocery' },
];

export const TeamPage: React.FC = () => {
  return (
    <PageLayout>
      <PageHero
        tag="// LEADERSHIP"
        headline={"The Minds\nBehind\nCentillion."}
        sub="Co-founded by two technology practitioners who have dedicated their careers to responsible AI, cloud transformation, and data excellence — serving enterprise clients across the globe."
      />

      {/* Leadership */}
      <section style={{ padding: '0 clamp(1.5rem,8vw,10rem) clamp(3rem,8vw,7rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px,100%), 1fr))', gap: '2rem', maxWidth: '900px' }}>
          {LEADERS.map((leader, i) => (
            <FadeIn key={leader.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6, boxShadow: `0 24px 60px ${leader.color}18` }}
                className="glass-panel card-pad"
                style={{ borderRadius: '20px', border: `1px solid ${leader.color}28`, position: 'relative', overflow: 'hidden' }}
              >
                {/* ambient bg */}
                <div style={{
                  position: 'absolute', top: '-60px', right: '-60px',
                  width: '180px', height: '180px', borderRadius: '50%',
                  background: `radial-gradient(circle, ${leader.color}14, transparent 70%)`,
                  pointerEvents: 'none',
                }} />

                {/* Avatar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <motion.div
                    whileHover={{ rotate: 5 }}
                    style={{
                      width: 72, height: 72, borderRadius: '20px', flexShrink: 0,
                      background: `linear-gradient(135deg, ${leader.color}30, ${leader.color}08)`,
                      border: `2px solid ${leader.color}44`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.8rem', fontWeight: 200, color: leader.color,
                    }}
                  >
                    {leader.initial}
                  </motion.div>
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{leader.name}</h2>
                    <div className="mono-text" style={{ fontSize: '0.75rem', color: leader.color, letterSpacing: '0.12em' }}>{leader.role}</div>
                  </div>
                </div>

                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300, fontSize: '0.9rem', marginBottom: '1.5rem' }}>{leader.desc}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                  {leader.expertise.map(e => (
                    <span key={e} style={{
                      background: `${leader.color}10`, border: `1px solid ${leader.color}28`,
                      color: leader.color, fontSize: '0.72rem', padding: '0.25rem 0.7rem', borderRadius: '6px',
                    }}>{e}</span>
                  ))}
                </div>

                <motion.a
                  href={leader.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                    background: `${leader.color}14`, border: `1px solid ${leader.color}33`,
                    color: leader.color, padding: '0.6rem 1.2rem', borderRadius: '10px',
                    fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.05em', textDecoration: 'none',
                  }}
                >
                  <Linkedin size={15} /> CONNECT ON LINKEDIN
                </motion.a>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Culture Stats */}
      <section style={{ padding: '0 clamp(1.5rem,8vw,10rem) clamp(2rem,6vw,5rem)' }}>
        <FadeIn>
          <div className="mono-text" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', marginBottom: '3rem' }}>// HOW WE OPERATE</div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px,100%), 1fr))', gap: '1.2rem', maxWidth: '900px' }}>
          {[
            { val: 'Elite 3%', sub: 'of Tech Talent', desc: 'Centillion collaborates with the elite 3% of tech experts worldwide.' },
            { val: '24–48h', sub: 'Engagement Start', desc: 'Connect with world-class engineers within 24 to 48 hours.' },
            { val: 'AI-CoE', sub: 'Culture', desc: 'Small, cross-functional, autonomous teams with full ownership.' },
            { val: 'Global', sub: 'Remote-first', desc: 'India HQ (Bangalore) and US presence (River Edge, NJ).' },
          ].map((s, i) => (
            <FadeIn key={s.val} delay={i * 0.07}>
              <motion.div whileHover={{ y: -4 }} className="glass-panel card-pad" style={{ borderRadius: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(1.4rem,3vw,1.8rem)', fontWeight: 200, color: 'var(--accent-primary)', marginBottom: '0.25rem' }}>{s.val}</div>
                <div className="mono-text" style={{ fontSize: '0.7rem', color: 'var(--text-primary)', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>{s.sub}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.6 }}>{s.desc}</div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Clients */}
      <section style={{ padding: 'clamp(3rem,8vw,6rem) clamp(1.5rem,8vw,10rem)' }}>
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <Users size={18} style={{ color: 'var(--accent-primary)' }} />
            <div className="mono-text" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-primary)' }}>// CLIENTS WE SERVE</div>
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '2.5rem' }}>Enterprise Partners</h2>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px,100%), 1fr))', gap: '1.2rem' }}>
          {CLIENTS.map((c, i) => (
            <FadeIn key={c.name} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,229,255,0.08)' }}
                className="glass-panel card-pad"
                style={{ borderRadius: '14px', position: 'relative' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '10px', flexShrink: 0,
                    background: 'rgba(0,229,255,0.07)', border: '1px solid rgba(0,229,255,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Building2 size={18} style={{ color: 'var(--accent-primary)' }} />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem', fontSize: '1rem' }}>{c.name}</h3>
                    <div className="mono-text" style={{ fontSize: '0.68rem', color: 'var(--accent-primary)', letterSpacing: '0.12em', marginBottom: '0.4rem' }}>{c.sector}</div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 300, margin: 0, lineHeight: 1.6 }}>{c.desc}</p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};
