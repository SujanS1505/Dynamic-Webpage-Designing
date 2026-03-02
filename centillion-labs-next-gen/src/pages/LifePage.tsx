import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, BarChart2, Layers, Code2, ChevronDown, Lightbulb, GitBranch, Users, Sparkles } from 'lucide-react';
import { PageLayout, PageHero, FadeIn, Sec, SectionHead, Tag } from './PageLayout';

const ROLES = [
  {
    id: 'de', icon: Database, title: 'Data Engineer', color: '#00e5ff',
    type: 'Full-time', location: 'Bangalore, India',
    summary: 'Build and maintain data pipelines at petabyte scale. Join the team behind our GenAI platform and Plato.',
    desc: "We are looking for a Data Engineer who thrives at the intersection of distributed computing and enterprise data systems. You'll design, build, and optimize Apache Spark-based pipelines on Databricks and GCP, working closely with our AI and Platform teams.",
    skills: ['PySpark', 'Apache Spark', 'Scala', 'Databricks', 'GCP', 'BigQuery', 'Airflow', 'Data Mesh'],
    nice: ['Knowledge Graphs', 'dbt', 'Kafka', 'Terraform'],
  },
  {
    id: 'tm', icon: BarChart2, title: 'Technical Manager', color: '#00bcd4',
    type: 'Full-time', location: 'Bangalore / Remote',
    summary: 'Lead a high-performance cross-functional engineering team. Shape technical strategy and delivery.',
    desc: "The Technical Manager bridges engineering excellence and strategic delivery. You'll lead squads across cloud, data, and AI streams — setting technical direction, ensuring quality, and growing the next generation of Centillion engineers.",
    skills: ['Leadership', 'Cloud Strategy', 'Agile Delivery', 'AWS/GCP/Azure', 'Team Building', 'Architecture Review'],
    nice: ['AI/ML background', 'FinOps', 'Data strategy', 'Go or Scala'],
  },
  {
    id: 'da', icon: Layers, title: 'Data Architect', color: '#26a69a',
    type: 'Full-time', location: 'Bangalore, India',
    summary: 'Architect the data foundations for next-generation enterprise platforms and AI products.',
    desc: "As a Data Architect, you'll define standards, govern data assets, and design the logical and physical models that underpin Centillion's product suite. Deep expertise in NoSQL, Knowledge Graphs, and Data Mesh is essential.",
    skills: ['NoSQL (Cassandra, MongoDB)', 'Data Stewardship', 'Knowledge Graphs', 'Data Mesh', 'Data Governance', 'Ontology Design'],
    nice: ['Graph databases (Neo4j)', 'dbt', 'Synthetic Data', 'Differential Privacy'],
  },
  {
    id: 'be', icon: Code2, title: 'Backend Engineer', color: '#0097a7',
    type: 'Full-time', location: 'Bangalore / Remote',
    summary: "Build the distributed backend systems that power Claudius and Centillion's enterprise APIs.",
    desc: "We need a Go engineer who lives and breathes distributed systems. You'll extend the Claudius framework — implementing new concurrency patterns, optimizing gRPC services, and working with etcd and Raft for consensus-critical systems.",
    skills: ['Golang', 'Microservices', 'gRPC', 'etcd', 'Kubernetes', 'Raft', 'Protobuf', 'Docker'],
    nice: ['Scala', 'Kafka', 'Terraform', 'Service mesh (Istio)'],
  },
];

const PILLARS = [
  { icon: Lightbulb, title: 'Innovation First', desc: "We challenge the status quo. Every sprint is an opportunity to architect something genuinely new." },
  { icon: GitBranch, title: 'Ship with Purpose', desc: 'We build products used by global enterprises. Quality, governance, and performance are non-negotiable.' },
  { icon: Users, title: 'Small, Empowered Teams', desc: 'Autonomous pods with full ownership. No bureaucracy. Maximum impact.' },
  { icon: Sparkles, title: 'Continuous Growth', desc: "Conferences, knowledge-shares, open-source contributions, and domain sabbaticals — learning is part of the job." },
];

export const LifePage: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <PageLayout>
      <PageHero
        tag="// CAREERS"
        headline={"Life at\nCentillion."}
        sub="Work with the Elite 3%. We are a team of AI engineers, data architects, cloud consultants, and distributed systems experts — on a mission to make enterprise data work harder and smarter."
      />

      {/* Culture */}
      <Sec>
        <SectionHead tag="// CULTURE & VALUES" headline="What It Feels Like to Work Here" sub="We're building more than software — we're cultivating a culture of craft." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(230px,100%), 1fr))', gap: '1.25rem' }}>
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <FadeIn key={p.title} delay={i * 0.07}>
                <motion.div whileHover={{ y: -5 }} className="glass-panel card-pad" style={{ borderRadius: '18px', borderTop: '2px solid var(--accent-primary)' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <Icon size={20} style={{ color: 'var(--accent-primary)' }} />
                  </div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{p.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300 }}>{p.desc}</p>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </Sec>

      {/* Open Roles */}
      <Sec>
        <SectionHead tag="// OPEN POSITIONS" headline="Join the 3%" sub="We hire for curiosity, depth, and drive. If you are exceptional, there's always room for you." />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {ROLES.map((role, i) => {
            const Icon = role.icon;
            const isOpen = expanded === role.id;
            return (
              <FadeIn key={role.id} delay={i * 0.05}>
                <motion.div layout className="glass-panel" style={{ borderRadius: '18px', border: `1px solid ${isOpen ? role.color + '44' : 'var(--border-color)'}`, overflow: 'hidden', transition: 'border-color 0.3s' }}>
                  <motion.button onClick={() => setExpanded(isOpen ? null : role.id)} whileHover={{ backgroundColor: `${role.color}06` }}
                    style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.5rem 2rem', textAlign: 'left' }}>
                    <div style={{ width: 46, height: 46, borderRadius: '12px', background: `${role.color}14`, border: `1px solid ${role.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={20} style={{ color: role.color }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.15rem' }}>{role.title}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', gap: '1rem' }}>
                        <span className="mono-text" style={{ letterSpacing: '0.1em', color: role.color }}>{role.type}</span>
                        <span>{role.location}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', display: 'none', maxWidth: '300px' } as React.CSSProperties}>{role.summary}</div>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown size={18} style={{ color: 'var(--text-secondary)' }} />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: 'hidden' }}>
                        <div style={{ padding: '0 2rem 2rem', borderTop: `1px solid ${role.color}18` }}>
                          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontWeight: 300, fontSize: '0.9rem', padding: '1.5rem 0 1.25rem', borderBottom: `1px dashed ${role.color}18` }}>{role.desc}</p>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px,100%), 1fr))', gap: '1.5rem', paddingTop: '1.25rem' }}>
                            <div>
                              <div className="mono-text" style={{ fontSize: '0.66rem', letterSpacing: '0.15em', color: role.color, marginBottom: '0.8rem' }}>REQUIRED SKILLS</div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                {role.skills.map(s => <Tag key={s} label={s} color={role.color} />)}
                              </div>
                            </div>
                            <div>
                              <div className="mono-text" style={{ fontSize: '0.66rem', letterSpacing: '0.15em', color: role.color, marginBottom: '0.8rem' }}>NICE TO HAVE</div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                {role.nice.map(s => <Tag key={s} label={s} color="var(--text-secondary)" />)}
                              </div>
                            </div>
                          </div>
                          <div style={{ marginTop: '1.5rem' }}>
                            <motion.a href={`mailto:connect@centillionlabs.com?subject=Application: ${role.title}`} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: role.color, color: '#000', padding: '0.7rem 1.6rem', borderRadius: '9px', fontWeight: 700, fontSize: '0.82rem', textDecoration: 'none', letterSpacing: '0.07em' }}>
                              APPLY NOW →
                            </motion.a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </Sec>

      {/* General CTA */}
      <Sec>
        <FadeIn>
          <motion.div whileHover={{ boxShadow: '0 24px 60px rgba(0,229,255,0.1)' }} className="glass-panel card-pad" style={{ maxWidth: '560px', margin: '0 auto', borderRadius: '22px', textAlign: 'center', borderTop: '2px solid var(--accent-primary)' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '1rem' }}>Don't See Your Role?</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.75rem', fontWeight: 300 }}>We're always open to exceptional individuals. Send us a note and we'll consider how your expertise fits our mission.</p>
            <motion.a href="mailto:connect@centillionlabs.com?subject=General Application" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-primary)', color: '#000', padding: '0.9rem 2rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none', letterSpacing: '0.06em' }}>
              INTRODUCE YOURSELF →
            </motion.a>
          </motion.div>
        </FadeIn>
      </Sec>
    </PageLayout>
  );
};
