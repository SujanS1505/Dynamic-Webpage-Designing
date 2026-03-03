import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Database, Cloud, Server, TrendingUp, DollarSign, ChevronDown, ArrowRight } from 'lucide-react';
import { PageLayout, PageHero, FadeIn, Sec, SectionHead, Tag } from './PageLayout';

const SVCS = [
  {
    id: 'golang', icon: Code2, color: '#00e5ff', tag: 'BACKEND ENGINEERING',
    title: 'Go Lang', headline: 'Specialized experts in Golang-driven software and API development.',
    desc: "Goroutines, Channels, Concurrency Patterns, gRPC, etcd, and Raft. We build high-performance, scalable backend systems using Go's powerful concurrency model and ecosystem.",
    features: ['Goroutines & Channel-based concurrency', 'gRPC API development', 'etcd & Raft consensus systems', 'High-performance microservices', 'Go-based abstract frameworks (Claudius)', 'API gateway & middleware'],
    kpis: ['High concurrency', 'Low latency APIs', 'Distributed systems'],
  },
  {
    id: 'scala', icon: Server, color: '#00bcd4', tag: 'DATA ENGINEERING',
    title: 'Scala', headline: "We leverage Scala's elegance and Spark's power.",
    desc: 'Designing distributed applications through functional design patterns. Monoids and Monads enable concise, expressive code. Our Aristotle framework is built in Scala.',
    features: ['Distributed Spark with functional patterns', 'Monoid & Monad abstract frameworks', 'Apache Spark at petabyte scale', 'Scala data transformation pipelines', 'Databricks and GCP integration', 'PySpark and Scala hybrid teams'],
    kpis: ['Petabyte-scale Spark', 'Functional elegance', 'Databricks ready'],
  },
  {
    id: 'cloud', icon: Cloud, color: '#26a69a', tag: 'CLOUD ADVISORY',
    title: 'Cloud Consultants', headline: "Maximizing your data's potential with Databricks and GCP.",
    desc: 'Data Integration, Real-time Analytics, and Warehousing. Our cloud consultants have deep expertise across AWS, GCP, and Azure — enabling organizations to migrate, optimize, and scale cloud-native infrastructure.',
    features: ['Databricks Data Integration & Analytics', 'Google Cloud Platform consulting', 'AWS, GCP, Azure multi-cloud strategies', 'Cloud data warehousing (BigQuery, Snowflake)', 'Real-time streaming analytics', 'FinOps for cloud workloads'],
    kpis: ['AWS · GCP · Azure', 'Real-time analytics', 'Cost optimized'],
  },
  {
    id: 'data', icon: Database, color: '#0097a7', tag: 'DATA MANAGEMENT',
    title: 'Data Solutions', headline: 'Data Management, Strategy, Governance, Mesh, Knowledge Graphs.',
    desc: 'Generative AI and Synthetic Data for sustainable growth. From strategy through governance — including Data Clean Room architectures for privacy-preserving analytics.',
    features: ['Data Strategy & Governance frameworks', 'Data Mesh architecture', 'Knowledge Graph design', 'Generative AI integration', 'Synthetic Data — Differential Privacy', 'Data Observability across all planes'],
    kpis: ['Data Mesh', 'Knowledge Graphs', 'Synthetic Data'],
  },
  {
    id: 'devops', icon: TrendingUp, color: '#00838f', tag: 'DEVOPS & INFRASTRUCTURE',
    title: 'DevOps & AI Agile', headline: 'Empower clients to cultivate an AI-CoE and DevOps culture.',
    desc: 'Foster small, cross-functional autonomous teams. CI/CD orchestration, monitoring, and security audits at enterprise scale.',
    features: ['Jenkins, Spinnaker, GitLab, ArgoCD, Tekton', 'Terraform & CloudFormation IaC', 'Prometheus, Grafana, OpenCensus, Jaeger', 'Security audits & Multicloud DAM', 'Post-quantum Cryptography', 'Confidential Computing'],
    kpis: ['AI-CoE culture', 'Full CI/CD', 'Post-quantum ready'],
  },
  {
    id: 'finops', icon: DollarSign, color: '#007c91', tag: 'CLOUD FINANCIAL OPS',
    title: 'FinOps & Databricks Mesh', headline: 'Comprehensive Databricks oversight and Data Mesh adoption.',
    desc: 'FinOps ensures financial accountability in cloud computing by bridging gaps between engineering and finance. Accelerate Data Mesh with Databricks accelerators.',
    features: ['Databricks cost monitoring & optimization', 'FinOps cloud financial governance', 'Data Mesh with Databricks accelerators', 'Decentralized data ownership', 'High data quality enforcement', 'Engineering & finance alignment'],
    kpis: ['Cloud cost reduction', 'Databricks FinOps', 'Data Mesh ready'],
  },
];

export const ServicesPage: React.FC = () => {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <PageLayout>
      <PageHero
        tag="// CAPABILITIES"
        headline={"Our\nServices."}
        sub="Your ultimate hub for cloud services, data management, advanced analytics, and infrastructure solutions. Collaborate with the Elite 3% of Tech Experts within 24–48 hours."
      />

      <Sec>
        <SectionHead tag="// SERVICE AREAS" headline="What We Deliver" sub="Six practice areas. One mission: turn data into durable enterprise advantage." />

        {/* Quick-select strip */}
        <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {SVCS.map(s => (
            <motion.button
              key={s.id}
              onClick={() => setOpen(open === s.id ? null : s.id)}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              style={{
                padding: '0.45rem 1.1rem', borderRadius: '20px', border: 'none', cursor: 'pointer',
                background: open === s.id ? s.color : `${s.color}14`,
                color: open === s.id ? '#000' : s.color,
                fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.04em', transition: 'all 0.2s',
              }}
            >
              {s.title}
            </motion.button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {SVCS.map((svc, i) => {
            const Icon = svc.icon;
            const isOpen = open === svc.id;
            return (
              <FadeIn key={svc.id} delay={i * 0.05}>
                <motion.div
                  layout
                  className="glass-panel"
                  style={{ borderRadius: '18px', border: `1px solid ${isOpen ? svc.color + '44' : 'var(--border-color)'}`, overflow: 'hidden', transition: 'border-color 0.3s' }}
                >
                  <motion.button
                    onClick={() => setOpen(isOpen ? null : svc.id)}
                    style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.75rem 2rem', textAlign: 'left' }}
                    whileHover={{ backgroundColor: `${svc.color}06` }}
                  >
                    <div style={{
                      width: 50, height: 50, borderRadius: '14px', flexShrink: 0,
                      background: `linear-gradient(135deg, ${svc.color}20, ${svc.color}06)`,
                      border: `1px solid ${svc.color}2a`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={22} style={{ color: svc.color }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="mono-text" style={{ fontSize: '0.67rem', letterSpacing: '0.16em', color: svc.color, marginBottom: '0.3rem' }}>{svc.tag}</div>
                      <div style={{ fontSize: 'clamp(1rem,2vw,1.25rem)', fontWeight: 500, color: 'var(--text-primary)' }}>{svc.title}</div>
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown size={20} style={{ color: 'var(--text-secondary)' }} />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: '0 2rem 2rem', borderTop: `1px solid ${svc.color}1a` }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '2.5rem', paddingTop: '2rem' }}>
                            <div>
                              <h3 style={{ fontSize: '1rem', fontWeight: 300, color: 'var(--text-primary)', marginBottom: '0.8rem', lineHeight: 1.5 }}>{svc.headline}</h3>
                              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontWeight: 300, marginBottom: '1.5rem', fontSize: '0.92rem' }}>{svc.desc}</p>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {svc.kpis.map(k => <Tag key={k} label={k} color={svc.color} />)}
                              </div>
                            </div>
                            <div>
                              <div className="mono-text" style={{ fontSize: '0.67rem', letterSpacing: '0.15em', color: svc.color, marginBottom: '1rem' }}>CAPABILITIES</div>
                              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                                {svc.features.map(f => (
                                  <motion.li key={f} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem', color: 'var(--text-secondary)', fontWeight: 300, fontSize: '0.9rem' }}>
                                    <ArrowRight size={13} style={{ color: svc.color, flexShrink: 0, marginTop: '4px' }} />{f}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
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

      {/* Standards */}
      <Sec>
        <SectionHead tag="// CENTILLION STANDARDS" headline="We Embrace All Regulatory Data Protection Standards" centre />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px,100%), 1fr))', gap: '1rem' }}>
          {['Ontology AI', 'Data Observability', 'Regulatory Compliance', 'Ethical AI & Responsible AI', 'Post-quantum Cryptography', 'Sovereign Data Strategies'].map((s, i) => (
            <FadeIn key={s} delay={i * 0.05}>
              <motion.div whileHover={{ y: -3 }} className="glass-panel card-pad" style={{ borderRadius: '12px', borderLeft: '3px solid var(--accent-primary)', fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 400 }}>{s}</motion.div>
            </FadeIn>
          ))}
        </div>
      </Sec>

      {/* CTA */}
      <Sec>
        <FadeIn>
          <motion.div whileHover={{ boxShadow: '0 24px 60px rgba(0,229,255,0.1)' }} className="glass-panel card-pad" style={{ maxWidth: '560px', margin: '0 auto', borderRadius: '22px', padding: '3.5rem', textAlign: 'center', borderTop: '2px solid var(--accent-primary)' }}>
            <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '1rem' }}>Grappling with Cloud, Data, or AI?</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.8, fontWeight: 300 }}>Collaborate with us. We'll design the architecture, build the platform, and deliver results.</p>
            <motion.a href="mailto:connect@centillionlabs.com" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-primary)', color: '#000', padding: '0.9rem 2rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none', letterSpacing: '0.06em' }}>
              PING US →
            </motion.a>
          </motion.div>
        </FadeIn>
      </Sec>
    </PageLayout>
  );
};
