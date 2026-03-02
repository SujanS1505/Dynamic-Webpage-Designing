import { motion } from 'framer-motion';
import { Megaphone, ShieldCheck, Lock, ShoppingCart, Link2 } from 'lucide-react';
import { PageLayout, PageHero, FadeIn } from './PageLayout';

const INDUSTRIES = [
  {
    id: 'adtech',
    icon: Megaphone,
    name: 'Advertising & Media',
    client: 'Taboola',
    clientDesc: "World's leading discovery & native advertising platform",
    color: '#00e5ff',
    description: 'Centillion powers data-driven advertising at global scale. For Taboola — the world\'s largest native advertising platform — we architect real-time analytics pipelines, event stream processing, and ML-driven personalization models that run at billions of requests per day.',
    solutions: [
      'Real-time clickstream analytics and event processing',
      'Recommendation model training & serving infrastructure',
      'Data Clean Room for privacy-preserving audience analytics',
      'Databricks-powered optimization for ad revenue',
      'FinOps and cloud cost optimization at planetary scale',
      'A/B experimentation frameworks for ad performance',
    ],
    techs: ['Spark', 'Databricks', 'GCP', 'Kafka', 'Scala', 'Data Clean Room'],
  },
  {
    id: 'insurance',
    icon: ShieldCheck,
    name: 'Insurance & Reinsurance',
    client: 'SwissRe',
    clientDesc: 'Global reinsurance and insurance leader',
    color: '#00bcd4',
    description: 'For SwissRe — a global reinsurance giant — Centillion brings cloud migration expertise, data governance frameworks, and AI-powered risk modeling. Our philosophy of Responsible AI and Ethical AI directly maps to the actuarial rigor demanded by the insurance sector.',
    solutions: [
      'Cloud migration (AWS / GCP / Azure) for legacy actuarial systems',
      'Data Mesh architecture for distributed risk data ownership',
      'Knowledge Graphs for complex relationship modeling',
      'Generative AI for document synthesis and underwriting assistance',
      'Post-quantum cryptography for long-term data security',
      'Sovereignty and regulatory compliance frameworks',
    ],
    techs: ['AWS', 'GCP', 'Terraform', 'Knowledge Graphs', 'Data Mesh', 'Responsible AI'],
  },
  {
    id: 'cybersecurity',
    icon: Lock,
    name: 'Cybersecurity & Supply Chain',
    client: 'Security Scorecard',
    clientDesc: 'Supply chain security intelligence platform',
    color: '#26a69a',
    description: 'Centillion partners with Security Scorecard to harden the modern cyber supply chain. Our expertise in Data Observability, Security as a Service, Multicloud DAM, and Post-quantum Cryptography gives security products the data backbone they need to operate at enterprise scale.',
    solutions: [
      'Security data pipelines at petabyte scale',
      'Multicloud Data Access Management (DAM)',
      'Post-quantum Cryptography implementation',
      'Differential Privacy for sensitive telemetry data',
      'Confidential Computing for secure data processing',
      'Homomorphic Encryption for privacy-preserving analytics',
    ],
    techs: ['Go', 'Scala', 'Post-quantum Crypto', 'Differential Privacy', 'Confidential Computing'],
  },
  {
    id: 'blockchain',
    icon: Link2,
    name: 'Blockchain & Web3',
    client: 'BlockChainSentry',
    clientDesc: 'Smart contract security platform',
    color: '#0097a7',
    description: 'For BlockChainSentry, Centillion applies its Go-based Claudius framework and distributed systems expertise to build high-performance smart contract auditing and on-chain data pipelines. etcd, Raft, and gRPC enable trustless coordination at the infrastructure layer.',
    solutions: [
      'Smart contract audit data pipeline architecture',
      'Go-based distributed system backends (Claudius framework)',
      'gRPC-based high-performance API layers',
      'etcd + Raft consensus for distributed state management',
      'On-chain event indexing and real-time analytics',
      'DevOps / CI-CD pipeline for blockchain node infrastructure',
    ],
    techs: ['Go', 'Claudius', 'gRPC', 'etcd', 'Raft', 'Terraform'],
  },
  {
    id: 'retail',
    icon: ShoppingCart,
    name: 'Retail & Grocery',
    client: 'EzOut',
    clientDesc: 'AI-powered checkout for grocers',
    color: '#007c91',
    description: 'Centillion helps retail players like EzOut boost revenue and profit margins through AristotleAI-powered demand forecasting, inventory optimization, and personalized retail language models. Our Retail LM is fine-tuned for grocery and retail-specific corpora.',
    solutions: [
      'Retail Language Model (Retail LM) — fine-tuned LLM',
      'Demand forecasting and inventory optimization',
      'Real-time recommendation & personalization engines',
      'In-store edge AI (Micro Models + Sensor Fusion)',
      'POS and operational data pipelines on GCP',
      'FinOps — reducing cloud costs for margin improvement',
    ],
    techs: ['AristotleAI', 'Retail LM', 'Vertex AI', 'Edge AI', 'Databricks', 'GCP'],
  },
];

export const IndustriesPage: React.FC = () => {
  return (
    <PageLayout>
      <PageHero
        tag="// INDUSTRIES"
        headline={"Sectors We\nTransform."}
        sub="From native advertising to global reinsurance, Centillion delivers bespoke AI and data solutions across the industries that are shaping the digital economy."
      />

      <section style={{ padding: '0 clamp(1.5rem,8vw,10rem) clamp(3rem,8vw,7rem)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {INDUSTRIES.map((ind, i) => {
            const Icon = ind.icon;
            const isEven = i % 2 === 0;
            return (
              <FadeIn key={ind.id} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -3, boxShadow: `0 20px 50px ${ind.color}14` }}
                  className="glass-panel card-pad"
                  style={{ borderRadius: '22px', border: `1px solid ${ind.color}28`, overflow: 'hidden', transition: 'box-shadow 0.3s' }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px,100%), 1fr))', gap: '2.5rem', alignItems: 'flex-start' }}>
                    {/* Left */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{
                          width: 52, height: 52, borderRadius: '16px',
                          background: `linear-gradient(135deg, ${ind.color}20, ${ind.color}06)`,
                          border: `1px solid ${ind.color}33`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}>
                          <Icon size={24} style={{ color: ind.color }} />
                        </div>
                        <div>
                          <div className="mono-text" style={{ fontSize: '0.68rem', letterSpacing: '0.15em', color: ind.color, marginBottom: '0.2rem' }}>INDUSTRY</div>
                          <h2 style={{ fontSize: 'clamp(1.1rem,2.5vw,1.5rem)', fontWeight: 500, color: 'var(--text-primary)', margin: 0 }}>{ind.name}</h2>
                        </div>
                      </div>

                      {/* Client badge */}
                      <div style={{
                        display: 'inline-flex', alignItems: 'flex-start', flexDirection: 'column', gap: '0.2rem',
                        background: `${ind.color}0d`, border: `1px solid ${ind.color}2a`,
                        borderRadius: '10px', padding: '0.7rem 1rem', marginBottom: '1.2rem',
                      }}>
                        <span className="mono-text" style={{ fontSize: '0.65rem', color: ind.color, letterSpacing: '0.12em' }}>CLIENT ↓</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{ind.client}</span>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 300 }}>{ind.clientDesc}</span>
                      </div>

                      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300, fontSize: '0.9rem', marginBottom: '1.2rem' }}>{ind.description}</p>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {ind.techs.map(t => (
                          <span key={t} style={{ background: `${ind.color}0e`, border: `1px solid ${ind.color}28`, color: ind.color, fontSize: '0.72rem', padding: '0.25rem 0.65rem', borderRadius: '6px' }}>{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Right — solutions */}
                    <div>
                      <div className="mono-text" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: ind.color, marginBottom: '1rem' }}>CENTILLION SOLUTIONS</div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                        {ind.solutions.map((s, si) => (
                          <motion.li
                            key={s}
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: si * 0.05 }}
                            style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--text-secondary)', fontWeight: 300, fontSize: '0.88rem', lineHeight: 1.6 }}
                          >
                            <span style={{ color: ind.color, flexShrink: 0, fontWeight: 600 }}>▸</span>
                            {s}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </section>
    </PageLayout>
  );
};
