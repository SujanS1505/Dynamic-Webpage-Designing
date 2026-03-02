import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { PageLayout, PageHero, FadeIn, Sec, SectionHead, Tag, Wrap } from './PageLayout';

const PRODUCTS = [
  {
    id: 'plato', name: 'Plato', tag: 'DATA CLEAN ROOM', category: 'Data Infrastructure', color: '#00e5ff', num: '01',
    headline: 'Data Clean Room Architecture for the privacy-first enterprise.',
    desc: "Plato architects Data Clean Room Architecture for all marketing needs — enabling privacy-preserving collaboration without exposing raw data. Centillion helps adopt Differential Privacy, Sovereign Data Strategies, and Homomorphic Encryption.",
    features: ['Data Clean Room Design', 'Cloud Management Console', 'Differential Privacy pipelines', 'Sovereign Data Strategies', 'Homomorphic Encryption', 'Privacy-preserving marketing analytics', 'Confidential Computing', 'Regulatory compliance'],
    stack: ['GCP', 'Terraform', 'Differential Privacy', 'Databricks', 'BigQuery'],
  },
  {
    id: 'claudius', name: 'Claudius', tag: 'ABSTRACT GO FRAMEWORK', category: 'Backend Framework', color: '#26a69a', num: '03',
    headline: 'An abstract, generic framework built in Go — engineered for the distributed age.',
    desc: "Claudius is Centillion's flagship Go-based framework — Goroutines, Channels, gRPC, etcd, Raft. Its Scala companion extends the framework with Monoids, Monads, Functional Elegance, Data Transformation, and Scala Compatibility.",
    features: ['Goroutines & channel-based concurrency', 'gRPC service definitions', 'etcd distributed key-value', 'Raft consensus algorithm', 'Scala Monoids & Monads', 'Functional Elegance patterns', 'Data Transformation utilities', 'Scala ↔ Go interoperability'],
    stack: ['Go', 'Scala', 'gRPC', 'etcd', 'Raft', 'Protobuf'],
  },
  {
    id: 'hexacube', name: 'Hexacube', tag: 'ENTERPRISE AI SUITE', category: 'AI & Machine Learning', color: '#0097a7', num: '04',
    headline: "Centillion's enterprise AI engine — Finance, Retail, and beyond.",
    desc: "Hexacube brings together Centillion's domain-specific language models and cloud AI capabilities into a unified enterprise suite. Finance and Retail LMs are pre-trained on domain-specific corpora, ready for Vertex AI.",
    features: ['Finance Language Model', 'Retail Language Model', 'Home Brewn LLM training', 'Vertex AI deployment', 'Multi-modal model orchestration', 'Domain-specific fine-tuning', 'A/B model testing', 'Inference monitoring'],
    stack: ['Vertex AI', 'GCP', 'Python', 'Custom LLMs', 'Databricks', 'BigQuery'],
  },
];

const CATS = ['All', 'AI & Machine Learning', 'Data Infrastructure', 'Backend Framework'];

export const PortfolioPage: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [active, setActive] = useState<typeof PRODUCTS[0] | null>(null);

  const shown = filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  return (
    <PageLayout>
      <PageHero
        tag="// PRODUCTS"
        headline={"Centillion\nProduct Suite."}
        sub="Four flagship products — each solving a distinct layer of the modern data stack. From privacy-preserving analytics to production-ready LLMs, deployed at enterprise scale."
      />

      <Sec>
        <SectionHead tag="// PRODUCT OVERVIEW" headline="Built for Enterprise" sub="Click any product to explore its full feature set." />

        {/* Filter */}
        <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {CATS.map(cat => (
            <motion.button
              key={cat} onClick={() => setFilter(cat)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
              style={{ padding: '0.5rem 1.3rem', borderRadius: '20px', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, transition: 'all 0.2s', background: filter === cat ? 'var(--accent-primary)' : 'rgba(0,229,255,0.08)', color: filter === cat ? '#000' : 'var(--text-secondary)' }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(310px,100%), 1fr))', gap: '1.5rem' }}>
          <AnimatePresence>
            {shown.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.07}>
                <motion.div
                  layout whileHover={{ y: -8, boxShadow: `0 24px 56px ${p.color}1a` }} onClick={() => setActive(p)}
                  className="glass-panel card-pad"
                  style={{ borderRadius: '20px', border: `1px solid ${p.color}22`, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                >
                  {/* glow orb */}
                  <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '140px', height: '140px', borderRadius: '50%', background: `radial-gradient(circle, ${p.color}14, transparent 70%)`, pointerEvents: 'none' }} />
                  {/* number */}
                  <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', fontSize: '4rem', fontWeight: 800, color: p.color, opacity: 0.06, lineHeight: 1, pointerEvents: 'none' }}>{p.num}</div>

                  <div className="mono-text" style={{ fontSize: '0.68rem', letterSpacing: '0.18em', color: p.color, marginBottom: '0.8rem' }}>{p.tag}</div>
                  <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '0.8rem' }}>{p.name}</h2>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300, fontSize: '0.9rem', marginBottom: '1.5rem' }}>{p.headline}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                    {p.stack.map(s => <Tag key={s} label={s} color={p.color} />)}
                  </div>
                  <motion.span whileHover={{ x: 4 }} style={{ fontSize: '0.8rem', color: p.color, fontWeight: 600, letterSpacing: '0.06em' }}>EXPLORE →</motion.span>
                </motion.div>
              </FadeIn>
            ))}
          </AnimatePresence>
        </motion.div>
      </Sec>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 28 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.88, opacity: 0, y: 28 }}
              transition={{ type: 'spring', damping: 22, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              className="glass-panel card-pad"
              style={{ borderRadius: '24px', maxWidth: '660px', width: '100%', maxHeight: '82vh', overflowY: 'auto', border: `1px solid ${active.color}44`, position: 'relative' }}
            >
              <button onClick={() => setActive(null)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.08)', border: 'none', cursor: 'pointer', width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={16} style={{ color: 'var(--text-secondary)' }} />
              </button>
              <div className="mono-text" style={{ fontSize: '0.68rem', letterSpacing: '0.18em', color: active.color, marginBottom: '0.5rem' }}>{active.tag}</div>
              <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '1rem' }}>{active.name}</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontWeight: 300, marginBottom: '1.5rem', fontSize: '0.95rem' }}>{active.desc}</p>
              <div className="mono-text" style={{ fontSize: '0.68rem', letterSpacing: '0.15em', color: active.color, marginBottom: '1rem' }}>FEATURES</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.6rem', marginBottom: '1.5rem' }}>
                {active.features.map(f => <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 300 }}><span style={{ color: active.color }}>▸</span>{f}</div>)}
              </div>
              <div className="mono-text" style={{ fontSize: '0.68rem', letterSpacing: '0.15em', color: active.color, marginBottom: '0.8rem' }}>STACK</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {active.stack.map(s => <Tag key={s} label={s} color={active.color} />)}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};
