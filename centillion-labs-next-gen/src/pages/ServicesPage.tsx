import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Database, Cloud, Server, TrendingUp, DollarSign, ChevronDown, ArrowRight } from 'lucide-react';
import { PageLayout, PageHero, FadeIn } from './PageLayout';

const SERVICES = [
  {
    id: 'golang',
    icon: Code2,
    title: 'Go Lang',
    tag: 'BACKEND ENGINEERING',
    color: '#00e5ff',
    headline: 'Specialized experts in Golang-driven software and API development.',
    desc: 'Goroutines, Channels, Concurrency Patterns, gRPC, etcd, and Raft. We build high-performance, scalable backend systems using Go\'s powerful concurrency model and ecosystem.',
    features: [
      'Goroutines & Channel-based concurrency patterns',
      'gRPC API development and service mesh integration',
      'etcd & Raft consensus-based distributed systems',
      'High-performance microservices in Go',
      'Go-based abstract generic frameworks (Claudius)',
      'API gateway and middleware development',
    ],
    kpis: ['High concurrency', 'Low latency APIs', 'Distributed systems'],
  },
  {
    id: 'scala',
    icon: Server,
    title: 'Scala',
    tag: 'DATA ENGINEERING',
    color: '#00bcd4',
    headline: 'We leverage Scala\'s elegance and Spark\'s processing power.',
    desc: 'Designing distributed applications through functional design patterns. Monoids and Monads enable concise, expressive code that\'s both powerful and maintainable — including our Aristotle framework built in Scala.',
    features: [
      'Distributed Spark applications with functional patterns',
      'Monoid & Monad-based abstract functional frameworks',
      'Apache Spark at petabyte scale',
      'Scala-based data transformation pipelines',
      'Integration with Databricks and GCP',
      'PySpark and Scala hybrid teams',
    ],
    kpis: ['Petabyte-scale Spark', 'Functional elegance', 'Databricks ready'],
  },
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud Consultants',
    tag: 'CLOUD ADVISORY',
    color: '#26a69a',
    headline: 'Maximizing your data\'s potential with Databricks and Google Cloud Platform.',
    desc: 'Data Integration, Real-time Analytics, and Warehousing. Our cloud consultants have deep expertise across AWS, GCP, and Azure — enabling organizations to migrate, optimize, and scale cloud-native infrastructure.',
    features: [
      'Databricks Data Integration & Real-time Analytics',
      'Google Cloud Platform consulting & architecture',
      'AWS, GCP, Azure multi-cloud strategies',
      'Cloud data warehousing (BigQuery, Snowflake, Redshift)',
      'Real-time streaming analytics pipelines',
      'Cost optimization (FinOps) for cloud workloads',
    ],
    kpis: ['AWS · GCP · Azure', 'Real-time analytics', 'Cost optimized'],
  },
  {
    id: 'data',
    icon: Database,
    title: 'Data Solutions',
    tag: 'DATA MANAGEMENT',
    color: '#0097a7',
    headline: 'Data Management, Strategy & Governance, Data Mesh, and Knowledge Graphs.',
    desc: 'Generative AI, and Synthetic Data for sustainable growth. Centillion provides end-to-end data solutions — from strategy through to governance, including cutting-edge Data Clean Room architectures for privacy-preserving analytics.',
    features: [
      'Data Strategy & Governance frameworks',
      'Data Mesh architecture and implementation',
      'Knowledge Graph design and deployment',
      'Generative AI integration into data workflows',
      'Synthetic Data — Differential Privacy pipelines',
      'Data Observability across all planes',
    ],
    kpis: ['Data Mesh', 'Knowledge Graphs', 'Synthetic Data'],
  },
  {
    id: 'devops',
    icon: TrendingUp,
    title: 'DevOps & AI Agile Practice',
    tag: 'DEVOPS & INFRASTRUCTURE',
    color: '#00838f',
    headline: 'Empower our clients to cultivate an AI-CoE and DevOps culture.',
    desc: 'Foster small, cross-functional teams that operate independently and assume responsibility for enhancing end-user experiences. CI/CD orchestration, monitoring, and security audits at enterprise scale.',
    features: [
      'CI/CD pipelines with Jenkins, Spinnaker, GitLab, ArgoCD, Tekton',
      'Terraform & CloudFormation IaC automation',
      'Monitoring with Prometheus, Grafana, OpenCensus, Jaeger',
      'Security audits, Multicloud DAM, DataSecurity as a Service',
      'Post-quantum Cryptography implementation',
      'Confidential Computing & Homomorphic Encryption',
    ],
    kpis: ['AI-CoE culture', 'Full CI/CD', 'Post-quantum ready'],
  },
  {
    id: 'finops',
    icon: DollarSign,
    title: 'FinOps & Databricks Mesh',
    tag: 'CLOUD FINANCIAL OPS',
    color: '#007c91',
    headline: 'Comprehensive Databricks usage oversight and Data Mesh adoption.',
    desc: 'FinOps ensures financial accountability in cloud computing by bridging gaps between engineering and finance teams. Accelerate Data Mesh adoption with Databricks — leveraging cutting-edge accelerators for decentralized data ownership.',
    features: [
      'Databricks cost monitoring, analysis, and optimization',
      'FinOps cloud financial governance framework',
      'Data Mesh with Databricks accelerators',
      'Decentralized data ownership empowerment',
      'High data quality standards enforcement',
      'Engineering and finance team alignment',
    ],
    kpis: ['Cloud cost reduction', 'Databricks FinOps', 'Data Mesh ready'],
  },
];

export const ServicesPage: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <PageLayout>
      <PageHero
        tag="// CAPABILITIES"
        headline={"Our\nServices."}
        sub="Embrace the future with Centillion Labs: your ultimate hub for cloud services, data management, advanced analytics, and infrastructure solutions. Collaborate with the Elite 3% of Tech Experts within 24–48 hours."
      />

      <section style={{ padding: '0 clamp(1.5rem,8vw,10rem) clamp(2rem,6vw,6rem)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '1100px' }}>
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            const isOpen = active === svc.id;
            return (
              <FadeIn key={svc.id} delay={i * 0.06}>
                <motion.div
                  layout
                  className="glass-panel"
                  style={{ borderRadius: '16px', border: `1px solid ${isOpen ? svc.color + '44' : 'var(--border-color)'}`, overflow: 'hidden', transition: 'border-color 0.3s' }}
                >
                  <motion.button
                    onClick={() => setActive(isOpen ? null : svc.id)}
                    style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.75rem 2rem', textAlign: 'left' }}
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                  >
                    <div style={{
                      width: 48, height: 48, borderRadius: '14px', flexShrink: 0,
                      background: `linear-gradient(135deg, ${svc.color}22, ${svc.color}0a)`,
                      border: `1px solid ${svc.color}33`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={22} style={{ color: svc.color }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="mono-text" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: svc.color, marginBottom: '0.3rem' }}>{svc.tag}</div>
                      <div style={{ fontSize: 'clamp(0.95rem,2vw,1.2rem)', fontWeight: 500, color: 'var(--text-primary)' }}>{svc.title}</div>
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown size={20} style={{ color: 'var(--text-secondary)' }} />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: '0 2rem 2rem', borderTop: `1px solid ${svc.color}22` }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px,100%), 1fr))', gap: '2.5rem', paddingTop: '2rem' }}>
                            <div>
                              <h3 style={{ fontSize: '1.1rem', fontWeight: 300, color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.4 }}>{svc.headline}</h3>
                              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.5rem', fontSize: '0.95rem' }}>{svc.desc}</p>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                                {svc.kpis.map(k => (
                                  <span key={k} style={{
                                    background: `${svc.color}14`, border: `1px solid ${svc.color}33`,
                                    color: svc.color, fontSize: '0.78rem', padding: '0.3rem 0.8rem', borderRadius: '20px', fontWeight: 500,
                                  }}>{k}</span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <div className="mono-text" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: svc.color, marginBottom: '1rem' }}>CAPABILITIES</div>
                              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                {svc.features.map(f => (
                                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem', color: 'var(--text-secondary)', fontWeight: 300, fontSize: '0.9rem' }}>
                                    <ArrowRight size={14} style={{ color: svc.color, flexShrink: 0, marginTop: '3px' }} />
                                    {f}
                                  </li>
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
      </section>

      {/* Standards */}
      <section style={{ padding: 'clamp(3rem,8vw,6rem) clamp(1.5rem,8vw,10rem)' }}>
        <FadeIn>
          <div className="mono-text" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', marginBottom: '1rem' }}>// CENTILLION STANDARDS</div>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '2.5rem' }}>We Embrace All Regulatory Data Protection Standards</h2>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px,100%), 1fr))', gap: '1rem', maxWidth: '900px' }}>
          {['Ontology AI', 'Data Observability', 'Regulatory Compliance', 'Ethical AI & Responsible AI', 'Post-quantum Cryptography', 'Sovereign Data Strategies'].map((s, i) => (
            <FadeIn key={s} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -3 }}
                className="glass-panel card-pad"
                style={{ borderRadius: '12px', borderLeft: '3px solid var(--accent-primary)', fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 400 }}
              >
                {s}
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 clamp(1.5rem,8vw,10rem) clamp(3rem,8vw,7rem)', textAlign: 'center' }}>
        <FadeIn>
          <div className="glass-panel card-pad" style={{ maxWidth: '600px', margin: '0 auto', borderRadius: '20px', padding: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Grappling with Cloud, Data, or AI?
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7, fontWeight: 300 }}>
              Collaborate with us. We'll design the architecture, build the platform, and deliver results.
            </p>
            <motion.a
              href="mailto:connect@centillionlabs.com"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'var(--accent-primary)', color: '#000',
                padding: '0.9rem 2rem', borderRadius: '10px',
                fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none',
                letterSpacing: '0.05em',
              }}
            >
              PING US
            </motion.a>
          </div>
        </FadeIn>
      </section>
    </PageLayout>
  );
};
