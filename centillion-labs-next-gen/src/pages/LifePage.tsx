import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Zap, ShieldCheck, Globe2, Mail, ExternalLink } from 'lucide-react';
import { PageLayout, PageHero, FadeIn } from './PageLayout';

const OPENINGS = [
  {
    title: 'Data Engineer',
    type: 'Full-time',
    location: 'Remote (India / Global)',
    color: '#00e5ff',
    desc: "Join Centillion's engineering core. Work on high-throughput data pipelines, event stream processing, and batch analytics at enterprise scale. You'll be part of a small, cross-functional team that ships autonomously.",
    skills: ['PySpark', 'Apache Spark', 'Scala', 'Databricks', 'GCP / AWS', 'Data Mesh'],
    highlights: [
      'Build and maintain distributed data pipelines at petabyte scale',
      'Collaborate with Data Architects on Data Mesh implementation',
      "Contribute to Centillion's AristotleAI data layer",
      'Work with Cloud teams on GCP / Databricks optimization',
    ],
  },
  {
    title: 'Technical Manager',
    type: 'Full-time',
    location: 'Remote (India / US)',
    color: '#00bcd4',
    desc: "Lead cross-functional teams that own full delivery — from architecture to deployment. You'll champion Centillion's AI-CoE culture, drive DevOps practices, and act as a bridge between strategy and execution.",
    skills: ['Technical Leadership', 'Cloud Strategy', 'Agile/DevOps', 'AI-CoE Culture', 'Stakeholder Management'],
    highlights: [
      'Drive team autonomy and full delivery ownership',
      'Define and maintain engineering standards across projects',
      'Engage with C-suite clients as a trusted technical advisor',
      'Champion cloud cost optimization and architecture best practices',
    ],
  },
  {
    title: 'Data Architect',
    type: 'Full-time',
    location: 'Remote (India / US / Global)',
    color: '#26a69a',
    desc: "Design and govern enterprise data architectures for Centillion's global clients. Expertise in NoSQL, data stewardship, and semantic modeling is key. You'll set the standards that our engineering teams execute against.",
    skills: ['NoSQL / NewSQL', 'Data Steward', 'Data Governance', 'Knowledge Graphs', 'Ontology Design', 'Data Clean Room'],
    highlights: [
      'Design scalable data models for complex enterprise domains',
      'Implement Data Mesh patterns with decentralized ownership',
      'Build Knowledge Graph architectures for semantic search',
      'Define data governance and stewardship frameworks',
    ],
  },
  {
    title: 'Backend Engineer',
    type: 'Full-time',
    location: 'Remote (India / US / Global)',
    color: '#0097a7',
    desc: "Build the high-performance backend systems that Centillion's products run on. Mastery of Go and microservices is essential. You'll contribute to the Claudius framework and client-facing APIs.",
    skills: ['Golang', 'Microservices', 'gRPC', 'etcd', 'Raft', 'Kubernetes'],
    highlights: [
      "Contribute to Claudius — Centillion's open Go framework",
      'Build gRPC-based service meshes for enterprise clients',
      'Design distributed systems using etcd and Raft consensus',
      'Optimize performance and reliability at scale',
    ],
  },
];

const CULTURE_PILLARS = [
  { icon: Zap, title: 'AI-CoE Culture', desc: 'Small, autonomous, cross-functional teams that own end-to-end delivery — engineering, data, and AI in one unit.' },
  { icon: ShieldCheck, title: 'Responsible AI', desc: "Every engineer contributes to Centillion's mission of Ethical AI. Human supervision and transparency are non-negotiable." },
  { icon: Globe2, title: 'Remote-first & Global', desc: 'India HQ in Bangalore. US presence in New Jersey. Fully distributed team working across time zones.' },
  { icon: Briefcase, title: 'Elite Work, Real Impact', desc: 'Work with the elite 3% of tech talent on enterprise problems that matter — serving clients like Taboola, SwissRe, and Security Scorecard.' },
];

export const LifePage: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <PageLayout>
      <PageHero
        tag="// CAREERS"
        headline={"Life at\nCentillion."}
        sub="Join a team of Data Ontologists, AI Engineers, and Cloud Architects. We are advocates of Open Source, Responsible AI, and the belief that elite engineers can change the world — 24 to 48 hours at a time."
      />

      {/* Culture Pillars */}
      <section style={{ padding: '0 clamp(1.5rem,8vw,10rem) clamp(3rem,8vw,6rem)' }}>
        <FadeIn>
          <div className="mono-text" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', marginBottom: '1rem' }}>// OUR CULTURE</div>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '2rem' }}>Why Engineers Choose Centillion</h2>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px,100%), 1fr))', gap: '1.2rem' }}>
          {CULTURE_PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <FadeIn key={p.title} delay={i * 0.06}>
                <motion.div whileHover={{ y: -4 }} className="glass-panel card-pad" style={{ borderRadius: '16px' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '12px',
                    background: 'rgba(0,229,255,0.07)', border: '1px solid rgba(0,229,255,0.18)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem',
                  }}>
                    <Icon size={20} style={{ color: 'var(--accent-primary)' }} />
                  </div>
                  <h3 style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>{p.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.7, fontSize: '0.88rem', margin: 0 }}>{p.desc}</p>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Open Positions */}
      <section style={{ padding: '0 clamp(1.5rem,8vw,10rem) clamp(3rem,8vw,6rem)' }}>
        <FadeIn>
          <div className="mono-text" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', marginBottom: '1rem' }}>// OPEN POSITIONS</div>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '2.5rem' }}>Join the Team</h2>
        </FadeIn>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: '900px' }}>
          {OPENINGS.map((job, i) => (
            <FadeIn key={job.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ x: 4 }}
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="glass-panel card-pad"
                style={{ borderRadius: '16px', cursor: 'pointer', border: `1px solid ${expanded === i ? job.color + '44' : 'var(--border-color)'}`, transition: 'border-color 0.3s' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                      <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1rem', margin: 0 }}>{job.title}</h3>
                      <span style={{ background: `${job.color}12`, border: `1px solid ${job.color}2a`, color: job.color, fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '6px', fontWeight: 500 }}>{job.type}</span>
                    </div>
                    <div className="mono-text" style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '0.08em' }}>{job.location}</div>
                  </div>
                  <motion.div animate={{ rotate: expanded === i ? 45 : 0 }} transition={{ duration: 0.2 }}>
                    <ExternalLink size={16} style={{ color: 'var(--text-secondary)' }} />
                  </motion.div>
                </div>

                {expanded === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{ overflow: 'hidden', marginTop: '1.5rem', borderTop: `1px solid ${job.color}1a`, paddingTop: '1.5rem' }}
                  >
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300, fontSize: '0.9rem', marginBottom: '1.5rem' }}>{job.desc}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: '1.5rem' }}>
                      <div>
                        <div className="mono-text" style={{ fontSize: '0.68rem', letterSpacing: '0.15em', color: job.color, marginBottom: '0.8rem' }}>KEY SKILLS</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                          {job.skills.map(s => (
                            <span key={s} style={{ background: `${job.color}0e`, border: `1px solid ${job.color}28`, color: job.color, fontSize: '0.72rem', padding: '0.25rem 0.65rem', borderRadius: '6px' }}>{s}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="mono-text" style={{ fontSize: '0.68rem', letterSpacing: '0.15em', color: job.color, marginBottom: '0.8rem' }}>RESPONSIBILITIES</div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {job.highlights.map(h => (
                            <li key={h} style={{ display: 'flex', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.6 }}>
                              <span style={{ color: job.color, flexShrink: 0 }}>▸</span>{h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <motion.a
                      href="mailto:connect@centillionlabs.com"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem',
                        background: job.color, color: '#000', padding: '0.7rem 1.5rem', borderRadius: '10px',
                        fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.06em', textDecoration: 'none',
                      }}
                    >
                      <Mail size={14} /> APPLY NOW
                    </motion.a>
                  </motion.div>
                )}
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section style={{ padding: '0 clamp(1.5rem,8vw,10rem) clamp(3rem,8vw,7rem)', textAlign: 'center' }}>
        <FadeIn>
          <div className="glass-panel card-pad" style={{ maxWidth: '600px', margin: '0 auto', borderRadius: '22px', padding: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '0.8rem' }}>Don't see the right role?</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300, marginBottom: '2rem', fontSize: '0.95rem' }}>
              We're always looking for extraordinary engineers. Reach out at <strong style={{ color: 'var(--accent-primary)' }}>connect@centillionlabs.com</strong> with your profile.
            </p>
            <motion.a
              href="mailto:connect@centillionlabs.com"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'var(--accent-primary)', color: '#000',
                padding: '0.9rem 2rem', borderRadius: '10px',
                fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.05em', textDecoration: 'none',
              }}
            >
              <Mail size={16} /> GET IN TOUCH
            </motion.a>
          </div>
        </FadeIn>
      </section>
    </PageLayout>
  );
};
