import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Database, FolderOpen, Shield, Filter } from 'lucide-react';
import { PageLayout, PageHero, FadeIn } from './PageLayout';

const PROJECTS = [
  {
    id: 'secure-ai',
    category: 'AI Platform',
    icon: Bot,
    title: 'Secure AI',
    client: 'Enterprise, Finance & Retail',
    year: '2023',
    headline: 'A generative AI platform that makes LLMs safe for enterprise.',
    desc: 'Secure AI combines a GMail Synthesizer, domain-tuned Finance and Retail Language Models, and seamless Vertex AI/Bedrock integration into a unified platform. Enterprises can deploy production-grade generative AI with full auditability.',
    tech: ['LLMs', 'Vertex AI', 'AWS Bedrock', 'LangChain', 'FastAPI', 'GCP'],
    impact: ['3x faster response accuracy', 'Zero PII leakage', 'Enterprise SSO ready'],
    color: '#00e5ff',
  },
  {
    id: 'plato',
    category: 'Data Product',
    icon: Shield,
    title: 'Plato — Data Clean Room',
    client: 'Marketing & Retail ecosystems',
    year: '2022',
    headline: 'Privacy-preserving data collaboration at scale.',
    desc: 'Plato implements a specialized Data Clean Room Architecture that allows organizations to collaborate on sensitive data without exposing raw records. Ideal for privacy-preserving marketing analytics and secure third-party data enrichment.',
    tech: ['PySpark', 'Delta Lake', 'Multi-party Computation', 'Terraform', 'BigQuery', 'dbt'],
    impact: ['GDPR & CCPA compliant', '10x faster collaboration', 'Zero raw data exposure'],
    color: '#00bcd4',
  },
  {
    id: 'claudius',
    category: 'AI Agent',
    icon: Bot,
    title: 'Claudius — Enterprise AI Agent',
    client: 'Multi-sector enterprise',
    year: '2023',
    headline: 'An AI agent that automates complex enterprise workflows.',
    desc: 'Claudius is an advanced AI orchestration agent for intelligent automation across enterprise ecosystems. It handles structural data processing, cross-system workflows, and can be trained on proprietary business logic.',
    tech: ['LangGraph', 'OpenAI', 'Anthropic', 'Redis', 'FastAPI', 'PostgreSQL'],
    impact: ['85% task automation rate', 'Multi-system orchestration', 'Self-healing workflows'],
    color: '#26a69a',
  },
  {
    id: 'rag',
    category: 'Case Study',
    icon: Database,
    title: 'Reducing Hallucination — RAG Pipeline',
    client: 'Fortune 500 Banking Client',
    year: '2022',
    headline: 'Cutting LLM hallucination by 70% in production banking.',
    desc: 'A Fortune 500 banking client needed a reliable AI assistant for compliance queries. We engineered a Retrieval-Augmented Generation (RAG) pipeline with document chunking strategies, re-ranking, and confidence scoring that dramatically improved factual fidelity.',
    tech: ['FAISS', 'Pinecone', 'OpenAI GPT-4', 'LangChain', 'Python', 'AWS Lambda'],
    impact: ['70% hallucination reduction', 'Passed compliance audit', 'Sub-1s response time'],
    color: '#0097a7',
  },
  {
    id: 'backstage',
    category: 'Internal Tool',
    icon: FolderOpen,
    title: 'Centillion Backstage',
    client: 'Internal Platform',
    year: '2024',
    headline: 'Internal developer portal for managing AI/data services.',
    desc: 'Built on Backstage.io, Centillion Backstage is our internal developer portal that catalogs all data services, AI models, and infrastructure components. It enforces service ownership, documentation standards, and automated quality gates.',
    tech: ['Backstage.io', 'TypeScript', 'GitHub Actions', 'Kubernetes', 'Prometheus', 'Grafana'],
    impact: ['100% service cataloged', '60% faster onboarding', 'Unified observability'],
    color: '#00838f',
  },
];

const CATEGORIES = ['All', 'AI Platform', 'Data Product', 'AI Agent', 'Case Study', 'Internal Tool'];

export const PortfolioPage: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<string | null>(null);
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter);
  const selectedItem = PROJECTS.find(p => p.id === selected);

  return (
    <PageLayout>
      <PageHero
        tag="// OUR WORK"
        headline={"Products &\nCase Studies."}
        sub="Explore our portfolio of AI platforms, data products, and enterprise case studies — each one solving a real, high-stakes business problem."
      />

      {/* Filter */}
      <section style={{ padding: '0 clamp(1.5rem,8vw,10rem) 2rem' }}>
        <FadeIn>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center' }}>
            <Filter size={14} style={{ color: 'var(--text-secondary)' }} />
            {CATEGORIES.map(cat => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  padding: '0.4rem 1rem', borderRadius: '20px', border: '1px solid',
                  borderColor: filter === cat ? 'var(--accent-primary)' : 'var(--border-color)',
                  background: filter === cat ? 'rgba(0,229,255,0.1)' : 'transparent',
                  color: filter === cat ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s', fontWeight: filter === cat ? 600 : 300,
                }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Grid */}
      <section style={{ padding: '0 clamp(1.5rem,8vw,10rem) clamp(3rem,8vw,6rem)' }}>
        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px,100%), 1fr))', gap: '1.5rem' }}>
          <AnimatePresence>
            {filtered.map((proj, i) => {
              const Icon = proj.icon;
              return (
                <motion.div
                  key={proj.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  onClick={() => setSelected(proj.id)}
                  whileHover={{ y: -5, boxShadow: `0 20px 50px ${proj.color}22` }}
                  className="glass-panel card-pad"
                  style={{
                    borderRadius: '16px', cursor: 'pointer',
                    border: `1px solid ${proj.color}22`,
                    transition: 'border-color 0.3s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: '12px',
                      background: `${proj.color}18`, border: `1px solid ${proj.color}33`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={20} style={{ color: proj.color }} />
                    </div>
                    <span className="mono-text" style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>{proj.year}</span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: proj.color, fontWeight: 500, letterSpacing: '0.08em', display: 'block', marginBottom: '0.4rem' }}>
                    {proj.category.toUpperCase()}
                  </span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.7rem' }}>{proj.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.7, fontSize: '0.9rem', marginBottom: '1.2rem' }}>
                    {proj.headline}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {proj.tech.slice(0, 3).map(t => (
                      <span key={t} style={{
                        background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)',
                        color: 'var(--text-secondary)', fontSize: '0.72rem', padding: '0.2rem 0.6rem', borderRadius: '6px',
                      }}>{t}</span>
                    ))}
                    {proj.tech.length > 3 && <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>+{proj.tech.length - 3}</span>}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 500,
              background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 30 }}
              onClick={e => e.stopPropagation()}
              className="glass-panel"
              style={{
                maxWidth: '700px', width: '100%', borderRadius: '20px',
                border: `1px solid ${selectedItem.color}33`,
                padding: 'clamp(1.5rem,4vw,2.5rem)', maxHeight: '85vh', overflowY: 'auto',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: selectedItem.color, fontWeight: 600, letterSpacing: '0.1em' }}>{selectedItem.category.toUpperCase()}</span>
                  <h2 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)', fontWeight: 300, color: 'var(--text-primary)', marginTop: '0.3rem' }}>{selectedItem.title}</h2>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.4rem', lineHeight: 1 }}>×</button>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.5rem' }}>{selectedItem.desc}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <div className="mono-text" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: selectedItem.color, marginBottom: '0.8rem' }}>TECH STACK</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {selectedItem.tech.map(t => (
                      <span key={t} style={{ background: `${selectedItem.color}12`, border: `1px solid ${selectedItem.color}30`, color: selectedItem.color, fontSize: '0.78rem', padding: '0.3rem 0.7rem', borderRadius: '8px' }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mono-text" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: selectedItem.color, marginBottom: '0.8rem' }}>IMPACT</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {selectedItem.impact.map(item => (
                      <li key={item} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', gap: '0.5rem', fontWeight: 300 }}>
                        <span style={{ color: selectedItem.color }}>↗</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};
