import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { PageLayout, PageHero, FadeIn } from './PageLayout';

const PRODUCTS = [
  {
    id: 'plato',
    name: 'Plato',
    tag: 'DATA CLEAN ROOM',
    category: 'Data Infrastructure',
    color: '#00e5ff',
    headline: 'Data Clean Room Architecture for the privacy-first enterprise.',
    desc: 'Plato architects Data Clean Room Architecture for all marketing needs — enabling privacy-preserving collaboration and analytics without ever exposing raw data. Centillion helps organizations adopt Differential Privacy, Sovereign Data Strategies, and Homomorphic Encryption so data remains confidential while still being analytically valuable.',
    features: [
      'Data Clean Room Architecture & Design',
      'Cloud Management Console',
      'Differential Privacy pipelines',
      'Sovereign Data Strategies',
      'Homomorphic Encryption',
      'Privacy-preserving marketing analytics',
      'Confidential Computing integration',
      'Regulatory compliance support',
    ],
    stack: ['GCP', 'Terraform', 'Differential Privacy', 'Databricks', 'BigQuery'],
  },
  {
    id: 'aristotle',
    name: 'AristotleAI',
    tag: 'GENERATIVE AI PLATFORM',
    category: 'AI & Machine Learning',
    color: '#00bcd4',
    headline: 'Your complete Generative AI platform — from POC to production.',
    desc: 'AristotleAI seamlessly blends expert guidance and technical proficiency to craft impactful architecture use cases. From GenAI workshops to enterprise-deployed LLMs — Vertex AI, Bedrock, and custom Home Brewn models — AristotleAI covers every stage of the generative AI lifecycle.',
    features: [
      'GMail Synthesizer Craft',
      'Finance Language Model (Finance LM)',
      'Retail Language Model (Retail LM)',
      'Home Brewn LLM Model (custom LLM)',
      'Vertex AI integration & deployment',
      'Amazon Bedrock AI orchestration',
      'ARISTOTLEAI Workshops & Preparedness',
      'Responsible AI governance layer',
    ],
    stack: ['Vertex AI', 'AWS Bedrock', 'Python', 'LangChain', 'GCP', 'Custom LLMs'],
  },
  {
    id: 'claudius',
    name: 'Claudius',
    tag: 'ABSTRACT GO FRAMEWORK',
    category: 'Backend Framework',
    color: '#26a69a',
    headline: 'An abstract, generic framework built in Go — engineered for the distributed age.',
    desc: 'Claudius is Centillion\'s flagship Go-based framework featuring Goroutines, Channels, Concurrency Patterns, gRPC, etcd, and Raft. Its Scala companion module extends the framework with Monoids, Monads, Functional Elegance, robust Data Transformation utilities, and full Scala Compatibility.',
    features: [
      'Go — Goroutines & channel-based concurrency',
      'gRPC service definitions and client generation',
      'etcd distributed key-value coordination',
      'Raft consensus algorithm implementation',
      'Scala — Monoids & Monads',
      'Functional Elegance design patterns',
      'Data Transformation utilities',
      'Scala ↔ Go interoperability layer',
    ],
    stack: ['Go', 'Scala', 'gRPC', 'etcd', 'Raft', 'Protobuf'],
  },
  {
    id: 'hexacube',
    name: 'Hexacube',
    tag: 'ENTERPRISE AI SUITE',
    category: 'AI & Machine Learning',
    color: '#0097a7',
    headline: 'Centillion\'s enterprise AI engine — Finance, Retail, and beyond.',
    desc: 'Hexacube brings together Centillion\'s domain-specific language models and cloud AI capabilities into a unified enterprise suite. Finance and Retail language models are pre-trained on domain-specific corpora and ready for deployment on Vertex AI — with custom Home Brewn LLM options for full data sovereignty.',
    features: [
      'Finance Language Model (Finance LM)',
      'Retail Language Model (Retail LM)',
      'Home Brewn LLM — custom model training',
      'Vertex AI deployment target',
      'Multi-modal model orchestration',
      'Domain-specific fine-tuning',
      'A/B model testing pipeline',
      'Inference monitoring & observability',
    ],
    stack: ['Vertex AI', 'GCP', 'Python', 'Custom LLMs', 'Databricks', 'BigQuery'],
  },
];

const CATEGORIES = ['All', 'AI & Machine Learning', 'Data Infrastructure', 'Backend Framework'];

export const PortfolioPage: React.FC = () => {
  const [selected, setSelected] = useState<typeof PRODUCTS[0] | null>(null);
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  return (
    <PageLayout>
      <PageHero
        tag="// PRODUCTS"
        headline={"Centillion\nProduct Suite."}
        sub="Four flagship products — each solving a distinct layer of the modern data stack. From privacy-preserving analytics to production-ready LLMs, our products are deployed at enterprise scale."
      />

      {/* Filter */}
      <section style={{ padding: '0 clamp(1.5rem,8vw,10rem) 2.5rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '0.5rem 1.2rem', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 500,
                background: filter === cat ? 'var(--accent-primary)' : 'rgba(0,229,255,0.07)',
                color: filter === cat ? '#000' : 'var(--text-secondary)',
                letterSpacing: '0.04em',
                transition: 'all 0.2s',
              }}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '0 clamp(1.5rem,8vw,10rem) clamp(3rem,8vw,7rem)' }}>
        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px,100%), 1fr))', gap: '1.5rem' }}>
          <AnimatePresence>
            {filtered.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.07}>
                <motion.div
                  layout
                  whileHover={{ y: -6, boxShadow: `0 20px 50px ${p.color}22` }}
                  onClick={() => setSelected(p)}
                  className="glass-panel card-pad"
                  style={{ borderRadius: '18px', border: `1px solid ${p.color}28`, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                >
                  {/* glow orb */}
                  <div style={{
                    position: 'absolute', top: '-40px', right: '-40px',
                    width: '120px', height: '120px', borderRadius: '50%',
                    background: `radial-gradient(circle, ${p.color}18, transparent 70%)`,
                    pointerEvents: 'none',
                  }} />

                  <div className="mono-text" style={{ fontSize: '0.7rem', letterSpacing: '0.18em', color: p.color, marginBottom: '0.8rem' }}>{p.tag}</div>
                  <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '0.8rem' }}>{p.name}</h2>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300, fontSize: '0.9rem', marginBottom: '1.5rem' }}>{p.headline}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                    {p.stack.map(s => (
                      <span key={s} style={{ background: `${p.color}10`, border: `1px solid ${p.color}2a`, color: p.color, fontSize: '0.72rem', padding: '0.25rem 0.6rem', borderRadius: '6px' }}>{s}</span>
                    ))}
                  </div>
                  <motion.span
                    whileHover={{ x: 3 }}
                    style={{ fontSize: '0.82rem', color: p.color, fontWeight: 500, letterSpacing: '0.05em' }}
                  >
                    EXPLORE →
                  </motion.span>
                </motion.div>
              </FadeIn>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backdropFilter: 'blur(6px)' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 24 }}
              transition={{ type: 'spring', damping: 22, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="glass-panel card-pad"
              style={{ borderRadius: '22px', maxWidth: '640px', width: '100%', maxHeight: '80vh', overflowY: 'auto', border: `1px solid ${selected.color}44`, position: 'relative' }}
            >
              <button
                onClick={() => setSelected(null)}
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer', width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} style={{ color: 'var(--text-secondary)' }} />
              </button>

              <div className="mono-text" style={{ fontSize: '0.7rem', letterSpacing: '0.18em', color: selected.color, marginBottom: '0.6rem' }}>{selected.tag}</div>
              <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '1rem' }}>{selected.name}</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300, marginBottom: '1.5rem' }}>{selected.desc}</p>
              <div className="mono-text" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: selected.color, marginBottom: '1rem' }}>FEATURES</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.6rem', marginBottom: '1.5rem' }}>
                {selected.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 300 }}>
                    <span style={{ color: selected.color, flexShrink: 0 }}>▸</span>{f}
                  </div>
                ))}
              </div>
              <div className="mono-text" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: selected.color, marginBottom: '0.8rem' }}>STACK</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {selected.stack.map(s => (
                  <span key={s} style={{ background: `${selected.color}14`, border: `1px solid ${selected.color}33`, color: selected.color, fontSize: '0.78rem', padding: '0.3rem 0.8rem', borderRadius: '8px' }}>{s}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};
