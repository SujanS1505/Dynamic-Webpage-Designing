import { motion } from 'framer-motion';
import { Target, Zap, Globe2, ShieldCheck, TrendingUp, Award, Lightbulb, Heart } from 'lucide-react';
import { PageLayout, PageHero, FadeIn, StatCard } from './PageLayout';

const VALUES = [
  { icon: Lightbulb, title: 'Innovation First', desc: 'We push the boundaries of what data and AI can do, constantly exploring new paradigms and techniques.' },
  { icon: ShieldCheck, title: 'Data Integrity', desc: 'Every pipeline, every model, every insight is built on a foundation of trust, accuracy, and transparency.' },
  { icon: Globe2, title: 'Global Impact', desc: 'From Bangalore to New Jersey, we deliver solutions that scale across enterprises and geographies.' },
  { icon: Heart, title: 'People-Centric', desc: 'We believe great technology is built by great people. Our team is our most critical infrastructure.' },
  { icon: TrendingUp, title: 'Continuous Growth', desc: 'Learning never stops. We invest relentlessly in our skills, tools, and ways of thinking.' },
  { icon: Award, title: 'Excellence in Craft', desc: 'From architecture to code to communication — we hold every output to the highest standard.' },
];

const TIMELINE = [
  { year: '2018', title: 'Founded', desc: 'Centillion Labs was established in Bangalore with a vision to make enterprise data intelligent.' },
  { year: '2019', title: 'First Enterprise Client', desc: 'Secured our first major engagement with a Fortune 500 banking client — a RAG pipeline that cut hallucinations by 70%.' },
  { year: '2020', title: 'Secure AI Launch', desc: 'Launched our flagship AI platform featuring GMail Synthesizer and domain-specific LLMs for Finance and Retail.' },
  { year: '2021', title: 'US Expansion', desc: 'Opened our New Jersey office, serving US-based enterprises with AI-native data infrastructure.' },
  { year: '2022', title: 'Plato & Claudius', desc: 'Released our Data Clean Room architecture (Plato) and enterprise AI Agent (Claudius) to the market.' },
  { year: '2024', title: 'Global Scale', desc: 'Today, serving clients across 4 continents with a team of 60+ data and AI engineers.' },
];

export const AboutPage: React.FC = () => {
  return (
    <PageLayout>
      <PageHero
        tag="// OUR STORY"
        headline={"Built on\nData.\nDriven by\nPurpose."}
        sub="Centillion Labs was founded on the belief that every enterprise deserves intelligent, trustworthy data infrastructure. We are not just a services firm — we are your long-term data partner."
      />

      {/* Stats */}
      <section style={{ padding: '0 clamp(1.5rem,8vw,10rem) clamp(2rem,6vw,5rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.5rem', maxWidth: '900px' }}>
          <StatCard value="60+" label="Engineers & Specialists" delay={0} />
          <StatCard value="4" label="Continents Served" delay={0.05} />
          <StatCard value="120+" label="Projects Delivered" delay={0.1} />
          <StatCard value="7+" label="Years of Excellence" delay={0.15} />
        </div>
      </section>

      {/* Mission section */}
      <section style={{ padding: 'clamp(3rem,8vw,7rem) clamp(1.5rem,8vw,10rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem,6vw,6rem)', alignItems: 'center', maxWidth: '1200px' }}>
          <FadeIn>
            <div>
              <div className="mono-text" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', marginBottom: '1rem' }}>// MISSION</div>
              <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', fontWeight: 200, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
                Eternal Data,<br />Expansive Solutions.
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontWeight: 300, fontSize: '1.05rem' }}>
                Our mission is to transform how enterprises harness data — making it not just accessible, but predictive, secure, and deeply intelligent. We architect data platforms that outlast trends and outperform expectations.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: Target, text: 'Build AI systems with measurable, lasting business impact.' },
                { icon: Zap, text: 'Deliver production-grade solutions, not just proof of concepts.' },
                { icon: Globe2, text: 'Partner with enterprises globally to make data their most powerful asset.' },
              ].map(({ icon: Icon, text }) => (
                <motion.div
                  key={text}
                  whileHover={{ x: 6 }}
                  className="glass-panel"
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.2rem 1.5rem', borderRadius: '12px' }}
                >
                  <Icon size={18} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }} />
                  <p style={{ color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.7, margin: 0 }}>{text}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: 'clamp(2rem,6vw,5rem) clamp(1.5rem,8vw,10rem)' }}>
        <FadeIn>
          <div className="mono-text" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', marginBottom: '1rem' }}>// JOURNEY</div>
          <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.5rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '3rem' }}>Our Timeline</h2>
        </FadeIn>
        <div style={{ position: 'relative', maxWidth: '800px' }}>
          {/* vertical line */}
          <motion.div
            initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', left: '80px', top: 0, bottom: 0, width: '1px',
              background: 'linear-gradient(180deg, var(--accent-primary), transparent)',
              transformOrigin: 'top',
            }}
          />
          {TIMELINE.map((item, i) => (
            <FadeIn key={item.year} delay={i * 0.07}>
              <div style={{ display: 'grid', gridTemplateColumns: '80px auto', gap: '2rem', marginBottom: '2.5rem', alignItems: 'flex-start' }}>
                <div style={{ textAlign: 'right', paddingRight: '1.5rem', position: 'relative' }}>
                  <span className="mono-text" style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 600 }}>{item.year}</span>
                  {/* dot */}
                  <div style={{
                    position: 'absolute', right: '-5px', top: '50%', transform: 'translateY(-50%)',
                    width: 9, height: 9, borderRadius: '50%',
                    background: 'var(--accent-primary)',
                    boxShadow: '0 0 8px var(--accent-primary)',
                  }} />
                </div>
                <motion.div whileHover={{ x: 4 }} className="glass-panel card-pad" style={{ borderRadius: '12px' }}>
                  <h3 style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.4rem', fontSize: '1rem' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.7, fontSize: '0.9rem', margin: 0 }}>{item.desc}</p>
                </motion.div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: 'clamp(2rem,6vw,5rem) clamp(1.5rem,8vw,10rem)' }}>
        <FadeIn>
          <div className="mono-text" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', marginBottom: '1rem' }}>// PRINCIPLES</div>
          <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.5rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '3rem' }}>What We Stand For</h2>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px,100%), 1fr))', gap: '1.5rem' }}>
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <FadeIn key={v.title} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,229,255,0.1)' }}
                  className="glass-panel card-pad"
                  style={{ borderRadius: '16px', height: '100%' }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: '12px',
                    background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.2rem',
                  }}>
                    <Icon size={20} style={{ color: 'var(--accent-primary)' }} />
                  </div>
                  <h3 style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.6rem', fontSize: '1rem' }}>{v.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.7, fontSize: '0.9rem', margin: 0 }}>{v.desc}</p>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </section>
    </PageLayout>
  );
};
