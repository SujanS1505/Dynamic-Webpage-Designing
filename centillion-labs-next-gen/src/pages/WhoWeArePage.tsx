import { motion } from 'framer-motion';
import { Code2, Database, Brain, Cloud, GitBranch, Lock, BarChart3, Cpu } from 'lucide-react';
import { PageLayout, PageHero, FadeIn } from './PageLayout';

const PILLARS = [
  { icon: Brain, title: 'AI-Native Thinking', desc: 'We don\'t bolt ML onto existing systems. Our solutions are architected from the ground up with AI as the core.' },
  { icon: Database, title: 'Data-First Architecture', desc: 'Every engagement starts with data. Clean, governed, high-quality data is the prerequisite for everything we build.' },
  { icon: Code2, title: 'Engineering Depth', desc: 'From PySpark to Kubernetes to custom Rust utilities — we go deep when problems demand it.' },
  { icon: Cloud, title: 'Cloud-Native Scale', desc: 'GCP, AWS, Azure — we build systems that scale elastically and cost-effectively across all major clouds.' },
  { icon: Lock, title: 'Security by Design', desc: 'Privacy-preserving architectures, data clean rooms, and enterprise-grade security are never afterthoughts.' },
  { icon: BarChart3, title: 'Outcome Obsession', desc: 'We measure success by business impact, not by lines of code or hours billed.' },
];

const EXPERTISE = [
  { label: 'Generative AI & LLMs', pct: 95 },
  { label: 'Data Engineering & Pipelines', pct: 98 },
  { label: 'ML Engineering & MLOps', pct: 92 },
  { label: 'Cloud Infrastructure (AWS/GCP/Azure)', pct: 90 },
  { label: 'Real-time Analytics & Streaming', pct: 88 },
  { label: 'Privacy & Data Governance', pct: 85 },
];

const TECH_ICONS = [
  { icon: Cpu, label: 'LLMs' }, { icon: Database, label: 'Spark' }, { icon: Cloud, label: 'Kubernetes' },
  { icon: GitBranch, label: 'MLflow' }, { icon: Lock, label: 'Vault' }, { icon: BarChart3, label: 'dbt' },
  { icon: Brain, label: 'PyTorch' }, { icon: Code2, label: 'Rust' },
];

export const WhoWeArePage: React.FC = () => {
  return (
    <PageLayout>
      <PageHero
        tag="// IDENTITY"
        headline={"Engineers\nof the\nIntelligent\nEnterprise."}
        sub="We are a collective of data engineers, ML scientists, cloud architects, and AI specialists who share one obsession: building systems that work flawlessly at enterprise scale."
      />

      {/* Pillars */}
      <section style={{ padding: '0 clamp(1.5rem,8vw,10rem) clamp(2rem,6vw,5rem)' }}>
        <FadeIn>
          <div className="mono-text" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', marginBottom: '1rem' }}>// WHAT DEFINES US</div>
          <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.5rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '3rem' }}>Our Six Pillars</h2>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px,100%), 1fr))', gap: '1.5rem' }}>
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <FadeIn key={p.title} delay={i * 0.07}>
                <motion.div
                  whileHover={{ scale: 1.02, borderColor: 'var(--accent-primary)' }}
                  className="glass-panel card-pad"
                  style={{ borderRadius: '16px', border: '1px solid var(--border-color)', transition: 'border-color 0.3s', height: '100%' }}
                >
                  <motion.div
                    whileHover={{ rotate: 5 }}
                    style={{
                      width: 48, height: 48, borderRadius: '14px',
                      background: 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,150,136,0.08))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '1.2rem', border: '1px solid rgba(0,229,255,0.2)',
                    }}
                  >
                    <Icon size={22} style={{ color: 'var(--accent-primary)' }} />
                  </motion.div>
                  <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.6rem', fontSize: '1rem' }}>{p.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.7, fontSize: '0.9rem', margin: 0 }}>{p.desc}</p>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Expertise bars */}
      <section style={{ padding: 'clamp(3rem,8vw,7rem) clamp(1.5rem,8vw,10rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem,6vw,8rem)', alignItems: 'center', maxWidth: '1200px' }}>
          <FadeIn>
            <div>
              <div className="mono-text" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', marginBottom: '1rem' }}>// DEPTH OF EXPERTISE</div>
              <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 200, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: '0.8rem' }}>What We Know,<br />Deeply.</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300 }}>
                Our team maintains mastery across the full data and AI stack — from raw ingestion to production model serving.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              {EXPERTISE.map((e, i) => (
                <div key={e.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 300 }}>{e.label}</span>
                    <span className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--accent-primary)' }}>{e.pct}%</span>
                  </div>
                  <div style={{ height: '4px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${e.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary, #00bcd4))', borderRadius: '4px' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Tech grid */}
      <section style={{ padding: '0 clamp(1.5rem,8vw,10rem) clamp(3rem,8vw,6rem)' }}>
        <FadeIn>
          <div className="mono-text" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', marginBottom: '2.5rem' }}>// TECHNOLOGIES WE MASTER</div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '1rem' }}>
          {TECH_ICONS.map(({ icon: Icon, label }, i) => (
            <FadeIn key={label} delay={i * 0.04}>
              <motion.div
                whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(0,229,255,0.15)' }}
                className="glass-panel"
                style={{
                  padding: '1.5rem 1rem', textAlign: 'center', borderRadius: '14px',
                  border: '1px solid var(--border-color)', cursor: 'default',
                }}
              >
                <Icon size={24} style={{ color: 'var(--accent-primary)', marginBottom: '0.6rem' }} />
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 300 }}>{label}</div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};
