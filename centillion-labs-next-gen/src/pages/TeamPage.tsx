import { motion } from 'framer-motion';
import { Linkedin, Users, Globe, Award, Heart } from 'lucide-react';
import { PageLayout, PageHero, FadeIn, Sec, SectionHead, StatCard, Tag } from './PageLayout';

const LEADERS = [
  {
    name: 'Mohanapriya', role: 'CEO & Co-Founder', color: '#00e5ff',
    initials: 'MA', linkedin: 'https://www.linkedin.com/in/mohanapriya-appusamy-590a75340/',
    bio: "Mohanapriya is the driving force behind Centillion Labs' strategic vision. With deep expertise in enterprise data architecture and AI strategy, she has guided the company from inception to delivering custom AI solutions for industry leaders including Taboola, SwissRe, and Security Scorecard.",
    tags: ['Data Strategy', 'AI Vision', 'Enterprise Architecture', 'Client Relationships'],
  },
  {
    name: 'Chinnasamy', role: 'CTO & Co-Founder', color: '#00bcd4',
    initials: 'CS', linkedin: 'https://www.linkedin.com/company/96900585',
    bio: 'Chinnasamy is the technical heart of Centillion Labs. An architect of distributed systems and GenAI platforms, he leads the engineering teams behind Claudius, AristotleAI, Plato, and Hexacube — with deep proficiency across Go, Scala, Spark, and cloud-native infrastructure.',
    tags: ['Go / Scala', 'Distributed Systems', 'GenAI', 'Cloud Architecture'],
  },
];

const CLIENTS = [
  { name: 'Taboola', sector: 'Advertising & Media', color: '#00e5ff', desc: 'Native advertising & real-time analytics at web scale.' },
  { name: 'SwissRe', sector: 'Insurance / Reinsurance', color: '#00bcd4', desc: 'Cloud migration, Data Mesh, and Responsible AI.' },
  { name: 'Security Scorecard', sector: 'Cybersecurity', color: '#26a69a', desc: 'Post-quantum cryptography and Multicloud DAM.' },
  { name: 'BlockChainSentry', sector: 'Blockchain / Web3', color: '#0097a7', desc: 'Claudius Go framework: gRPC, etcd, Raft.' },
  { name: 'EzOut', sector: 'Retail / Grocery', color: '#007c91', desc: 'Retail LM, Edge AI, and Databricks at the shelf.' },
];

const STATS = [
  { value: '5+', label: 'industry clients' },
  { value: '4', label: 'flagship products' },
  { value: '9+', label: 'technology domains' },
  { value: '24h', label: 'onboarding SLA' },
];

const container = { visible: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };

export const TeamPage: React.FC = () => (
  <PageLayout>
    <PageHero
      tag="// LEADERSHIP"
      headline={"Our\nTeam."}
      sub="Led by seasoned practitioners across AI, data engineering, and cloud — and trusted by a growing roster of enterprise clients across five industries."
    />

    {/* Stats strip */}
    <Sec>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(180px,100%), 1fr))', gap: '1.5rem', marginBottom: '1rem' }}>
        {STATS.map((s, i) => <FadeIn key={s.label} delay={i * 0.06}><StatCard value={s.value} label={s.label} /></FadeIn>)}
      </div>
    </Sec>

    {/* Founders */}
    <Sec>
      <SectionHead tag="// FOUNDERS" headline="The Minds Behind Centillion" sub="Two founders. A shared passion for turning data complexity into enterprise clarity." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px,100%), 1fr))', gap: '2rem' }}>
        {LEADERS.map((l, i) => (
          <FadeIn key={l.name} delay={i * 0.1} direction={i % 2 === 0 ? 'left' : 'right'}>
            <motion.div whileHover={{ y: -6, boxShadow: `0 24px 56px ${l.color}18` }} className="glass-panel card-pad" style={{ borderRadius: '22px', border: `1px solid ${l.color}22`, position: 'relative', overflow: 'hidden' }}>
              {/* decorative glow */}
              <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '130px', height: '130px', borderRadius: '50%', background: `radial-gradient(circle, ${l.color}18, transparent 70%)`, pointerEvents: 'none' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: `linear-gradient(135deg, ${l.color}30, ${l.color}08)`, border: `2px solid ${l.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 600, color: l.color, letterSpacing: '0.05em', flexShrink: 0 }}>
                  {l.initials}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{l.name}</h3>
                  <div className="mono-text" style={{ fontSize: '0.68rem', letterSpacing: '0.14em', color: l.color }}>{l.role}</div>
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontWeight: 300, fontSize: '0.9rem', marginBottom: '1.5rem' }}>{l.bio}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.5rem' }}>
                {l.tags.map(t => <Tag key={t} label={t} color={l.color} />)}
              </div>

              <motion.a href={l.linkedin} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.55rem 1.2rem', borderRadius: '8px', background: `${l.color}14`, border: `1px solid ${l.color}2a`, color: l.color, fontWeight: 600, fontSize: '0.8rem', textDecoration: 'none', letterSpacing: '0.06em' }}>
                <Linkedin size={14} /> LINKEDIN
              </motion.a>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </Sec>

    {/* Culture values */}
    <Sec>
      <SectionHead tag="// CULTURE" headline="What Drives Us" centre />
      <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px,100%), 1fr))', gap: '1.25rem' }}>
        {[
          { icon: Users, label: 'Collaborative Agile', desc: 'Small, autonomous, cross-functional pods.' },
          { icon: Globe, label: 'Global Reach', desc: 'Bangalore HQ. New Jersey US presence.' },
          { icon: Award, label: 'Elite 3% Standard', desc: 'We hire and partner with the best in every domain.' },
          { icon: Heart, label: 'Responsible AI', desc: 'Ethics, equity, and privacy baked in from day one.' },
        ].map(c => {
          const Icon = c.icon;
          return (
            <motion.div key={c.label} variants={item} whileHover={{ y: -4 }} className="glass-panel card-pad" style={{ borderRadius: '16px', textAlign: 'center' }}>
              <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <Icon size={20} style={{ color: 'var(--accent-primary)' }} />
              </div>
              <div style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>{c.label}</div>
              <div style={{ fontWeight: 300, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{c.desc}</div>
            </motion.div>
          );
        })}
      </motion.div>
    </Sec>

    {/* Clients */}
    <Sec>
      <SectionHead tag="// OUR CLIENTS" headline="Trusted by Industry Leaders" sub="We partner with enterprises that demand precision, performance, and trust." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {CLIENTS.map((c, i) => (
          <FadeIn key={c.name} delay={i * 0.06}>
            <motion.div whileHover={{ x: 6 }} className="glass-panel" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', alignItems: 'center', gap: '1.5rem', padding: '1.25rem 1.75rem', borderRadius: '14px', borderLeft: `3px solid ${c.color}` }}>
              <div>
                <div style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)' }}>{c.name}</div>
                <div className="mono-text" style={{ fontSize: '0.65rem', letterSpacing: '0.14em', color: c.color, marginTop: '0.15rem' }}>{c.sector}</div>
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 300 }}>{c.desc}</div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </Sec>
  </PageLayout>
);
