import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Brain, Cloud, Server, TrendingUp, ArrowRight, ChevronDown } from 'lucide-react';
import { PageLayout, PageHero, FadeIn } from './PageLayout';

const SERVICES = [
  {
    id: 'data',
    icon: Database,
    title: 'Data Engineering & Advanced Analytics',
    tag: 'FOUNDATION',
    color: '#00e5ff',
    headline: 'Build the data backbone your AI depends on.',
    desc: 'We design and engineer scalable data platforms — from ingestion to transformation to serving. Whether it\'s streaming pipelines, lakehouse architectures, or real-time analytics, we make your data reliable, fast, and accessible.',
    features: [
      'Apache Spark & Flink pipelines at petabyte scale',
      'Delta Lake, Iceberg, and Hudi lakehouse architectures',
      'Real-time streaming with Kafka & Kinesis',
      'dbt-powered transformation layers',
      'Data quality monitoring and observability',
      'Unified batch and streaming (Lambda/Kappa architecture)',
    ],
    kpis: ['10x faster data delivery', '99.9% pipeline reliability', 'Sub-second query response'],
  },
  {
    id: 'ml',
    icon: Brain,
    title: 'Machine Learning & Generative AI',
    tag: 'INTELLIGENCE',
    color: '#00bcd4',
    headline: 'Deploy AI that actually works in production.',
    desc: 'From fine-tuning LLMs to building RAG systems that minimize hallucinations, we engineer AI solutions that generate real business value — not just demo results. We handle the full MLOps lifecycle from experimentation to production.',
    features: [
      'LLM fine-tuning on domain-specific data',
      'RAG pipelines with hallucination reduction',
      'Custom ML model training and evaluation',
      'MLflow, Vertex AI, and SageMaker orchestration',
      'Feature stores and model registries',
      'Responsible AI and bias auditing',
    ],
    kpis: ['70% hallucination reduction', '3x model iteration speed', 'Production-grade reliability'],
  },
  {
    id: 'devops',
    icon: Server,
    title: 'DevOps & Infrastructure Automation',
    tag: 'OPERATIONS',
    color: '#26a69a',
    headline: 'Infrastructure that scales with your ambition.',
    desc: 'We build the DevOps and infrastructure foundations that make AI and data systems deployable, maintainable, and secure. From CI/CD to IaC, we eliminate operational friction and unlock team velocity.',
    features: [
      'Infrastructure as Code (Terraform, Pulumi)',
      'CI/CD pipelines for data and ML workflows',
      'GitOps and automated deployment strategies',
      'Observability stacks (Prometheus, Grafana, OpenTelemetry)',
      'Multi-cloud and hybrid cloud architectures',
      'Secret management and security automation',
    ],
    kpis: ['80% deployment automation', 'Zero-downtime deployments', '5x faster release cycles'],
  },
  {
    id: 'k8s',
    icon: Cloud,
    title: 'Kubernetes & Cloud Scalability',
    tag: 'SCALE',
    color: '#0097a7',
    headline: 'Scale to millions without architectural rebuilds.',
    desc: 'We architect Kubernetes-native platforms that handle enterprise-scale workloads. From service mesh to autoscaling strategies, we ensure your systems grow gracefully and efficiently.',
    features: [
      'Kubernetes cluster design and hardening',
      'Helm chart creation and management',
      'Istio service mesh implementation',
      'Horizontal and vertical pod autoscaling',
      'GPU workload orchestration for ML',
      'Multi-tenant namespace strategies',
    ],
    kpis: ['Auto-scale to 10x load spikes', '60% infrastructure cost reduction', '99.99% uptime SLA'],
  },
  {
    id: 'cto',
    icon: TrendingUp,
    title: 'CTO as a Service',
    tag: 'LEADERSHIP',
    color: '#00838f',
    headline: 'Strategic technical leadership, on demand.',
    desc: 'For startups and scale-ups that need executive-level technical leadership without the full-time cost, we provide fractional CTO capabilities — from technology roadmap design to team building and venture preparation.',
    features: [
      'Technology roadmap design and execution',
      'Engineering team structure and hiring',
      'Technical due diligence support for fundraising',
      'Build vs. buy decision frameworks',
      'Vendor evaluation and architecture reviews',
      'Board-level technology communication',
    ],
    kpis: ['2x faster go-to-market', 'Fundraise-ready tech stack', 'Strategic clarity from day one'],
  },
];

export const ServicesPage: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <PageLayout>
      <PageHero
        tag="// CAPABILITIES"
        headline={"Our\nServices."}
        sub="Five integrated disciplines that form a complete data and AI capability. Select any service to explore its scope, features, and outcomes."
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
                  {/* Header */}
                  <motion.button
                    onClick={() => setActive(isOpen ? null : svc.id)}
                    style={{
                      width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.75rem 2rem',
                      textAlign: 'left',
                    }}
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

                  {/* Expanded content */}
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
                              <h3 style={{ fontSize: '1.3rem', fontWeight: 300, color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.3 }}>{svc.headline}</h3>
                              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.5rem', fontSize: '0.95rem' }}>{svc.desc}</p>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                                {svc.kpis.map(k => (
                                  <span key={k} style={{
                                    background: `${svc.color}14`, border: `1px solid ${svc.color}33`,
                                    color: svc.color, fontSize: '0.78rem', padding: '0.3rem 0.8rem', borderRadius: '20px',
                                    fontWeight: 500,
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

      {/* CTA */}
      <section style={{ padding: 'clamp(3rem,8vw,7rem) clamp(1.5rem,8vw,10rem)', textAlign: 'center' }}>
        <FadeIn>
          <div className="glass-panel card-pad" style={{ maxWidth: '600px', margin: '0 auto', borderRadius: '20px', padding: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Ready to build something exceptional?
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7, fontWeight: 300 }}>
              Tell us your data challenge. We'll design the architecture.
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
              <TrendingUp size={16} />
              LET'S BUILD TOGETHER
            </motion.a>
          </div>
        </FadeIn>
      </section>
    </PageLayout>
  );
};
