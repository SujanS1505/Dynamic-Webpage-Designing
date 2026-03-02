import { motion } from 'framer-motion';
import { Coffee, BookOpen, Rocket, Users, Zap, Globe2, Heart, Star } from 'lucide-react';
import { PageLayout, PageHero, FadeIn, StatCard } from './PageLayout';

const BENEFITS = [
  { icon: Rocket, title: 'Remote-First Culture', desc: 'Work from anywhere with flexible hours. We care about outcomes, not office time.' },
  { icon: BookOpen, title: 'Learning Budget', desc: 'Every engineer gets a generous annual budget for courses, conferences, and certifications.' },
  { icon: Coffee, title: 'Hack Days', desc: 'Monthly unstructured hack days to explore ambitious ideas, tools, and experiments.' },
  { icon: Zap, title: 'Cutting-Edge Stack', desc: 'Work with the latest LLMs, cloud services, and data tools — always on the frontier.' },
  { icon: Users, title: 'Mentorship Program', desc: 'Junior engineers are paired with senior mentors for structured growth and guidance.' },
  { icon: Globe2, title: 'Global Exposure', desc: 'Work on projects that span continents, industries, and technology stacks.' },
  { icon: Heart, title: 'Wellness First', desc: 'Wellness allowances, mental health days, and a culture that respects life outside work.' },
  { icon: Star, title: 'Equity Opportunities', desc: 'High-performing team members participate in equity programs aligned with company growth.' },
];

const EVENTS = [
  { title: 'AI Research Reading Club', freq: 'Weekly', desc: 'The team gathers every Friday to discuss recent AI papers, dissect results, and debate implications.' },
  { title: 'Data Architecture Reviews', freq: 'Bi-weekly', desc: 'Engineers present architecture decisions for peer review — candid feedback, no hierarchy.' },
  { title: 'Centillion Hack Month', desc: 'An entire month dedicated to experimental projects. Several products started here.', freq: 'Annually' },
  { title: 'Open Source Day', freq: 'Monthly', desc: 'A dedicated day to contribute to the open source community or release internal tools publicly.' },
];

const QUOTES = [
  { text: "Centillion is the only place I've worked where 'why' always matters more than 'what'. We are deeply thoughtful about what we build.", author: 'Arjun K., Senior Data Engineer' },
  { text: "The learning velocity here is unlike anything else. In 18 months, I've done work that would've taken 5 years elsewhere.", author: 'Priya V., ML Engineer' },
  { text: "We solve real problems for real enterprises. Every line of code I write has a direct, measurable impact on someone's business.", author: 'Santhosh R., AI Platform Engineer' },
];

export const LifePage: React.FC = () => {
  return (
    <PageLayout>
      <PageHero
        tag="// LIFE AT CENTILLION"
        headline={"Where Brilliant\nMinds Build\nthe Future."}
        sub="We've built a culture where curiosity is celebrated, craftsmanship is expected, and autonomy is earned. Here's what it means to be a part of the Centillion team."
      />

      {/* Stats */}
      <section style={{ padding: '0 clamp(1.5rem,8vw,10rem) clamp(2rem,6vw,5rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', maxWidth: '800px' }}>
          <StatCard value="4.9/5" label="Team Satisfaction" delay={0} />
          <StatCard value="92%" label="Retention Rate" delay={0.05} />
          <StatCard value="100%" label="Remote-Friendly" delay={0.1} />
          <StatCard value="60+" label="Engineers Worldwide" delay={0.15} />
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: 'clamp(3rem,8vw,7rem) clamp(1.5rem,8vw,10rem)' }}>
        <FadeIn>
          <div className="mono-text" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', marginBottom: '1rem' }}>// PERKS & BENEFITS</div>
          <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.5rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '3rem' }}>Built for Engineers Who Care.</h2>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px,100%), 1fr))', gap: '1.2rem' }}>
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <FadeIn key={b.title} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,229,255,0.1)' }}
                  className="glass-panel card-pad"
                  style={{ borderRadius: '14px', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: '10px', flexShrink: 0,
                    background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={18} style={{ color: 'var(--accent-primary)' }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.92rem', marginBottom: '0.3rem' }}>{b.title}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: 300, lineHeight: 1.6 }}>{b.desc}</div>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Events rhythm */}
      <section style={{ padding: '0 clamp(1.5rem,8vw,10rem) clamp(3rem,8vw,6rem)' }}>
        <FadeIn>
          <div className="mono-text" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', marginBottom: '1rem' }}>// CULTURE IN ACTION</div>
          <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.5rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '3rem' }}>How We Run.</h2>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px,100%), 1fr))', gap: '1.2rem', maxWidth: '1000px' }}>
          {EVENTS.map((evt, i) => (
            <FadeIn key={evt.title} delay={i * 0.07}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-panel card-pad"
                style={{ borderRadius: '14px', borderLeft: '3px solid var(--accent-primary)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                  <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem', flex: 1 }}>{evt.title}</h3>
                  <span className="mono-text" style={{ fontSize: '0.68rem', color: 'var(--accent-primary)', letterSpacing: '0.1em', flexShrink: 0, marginLeft: '0.5rem' }}>{evt.freq}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontWeight: 300, fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{evt.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Quotes */}
      <section style={{ padding: '0 clamp(1.5rem,8vw,10rem) clamp(3rem,8vw,7rem)' }}>
        <FadeIn>
          <div className="mono-text" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', marginBottom: '3rem' }}>// VOICES FROM THE TEAM</div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px,100%), 1fr))', gap: '1.5rem' }}>
          {QUOTES.map((q, i) => (
            <FadeIn key={q.author} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass-panel card-pad"
                style={{ borderRadius: '16px', position: 'relative', paddingTop: '2.5rem' }}
              >
                <div style={{
                  position: 'absolute', top: '1.5rem', left: '1.5rem',
                  fontSize: '3rem', lineHeight: 1, color: 'var(--accent-primary)', opacity: 0.3, fontFamily: 'Georgia, serif',
                }}>"</div>
                <p style={{ color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.8, fontSize: '0.92rem', fontStyle: 'italic', marginBottom: '1rem' }}>{q.text}</p>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 500 }}>— {q.author}</div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};
