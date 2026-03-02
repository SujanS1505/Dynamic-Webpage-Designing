import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartPulse, Landmark, Shield, Factory, ShoppingCart, ArrowRight } from 'lucide-react';
import { PageLayout, PageHero, FadeIn } from './PageLayout';

const INDUSTRIES = [
  {
    id: 'healthcare',
    icon: HeartPulse,
    title: 'Healthcare & Life Sciences',
    color: '#00e5ff',
    summary: 'AI-powered clinical intelligence and patient data platforms.',
    challenges: ['Fragmented EHR data across systems', 'HIPAA compliance at scale', 'Predictive patient outcomes', 'Drug discovery acceleration'],
    solutions: ['Unified patient data lakehouse', 'Privacy-preserving federated ML', 'Clinical NLP for unstructured records', 'Real-time patient risk scoring'],
    useCases: ['Hospital readmission prediction (saved 30% costs)', 'Drug interaction audit engine', 'Predictive ICU staffing model'],
  },
  {
    id: 'finance',
    icon: Landmark,
    title: 'Banking & Financial Services',
    color: '#00bcd4',
    summary: 'Real-time fraud detection, risk analytics, and GenAI for banking.',
    challenges: ['Real-time fraud at scale', 'Regulatory reporting complexity', 'LLM hallucination risk in finance', 'Customer churn analytics'],
    solutions: ['Streaming fraud detection with sub-50ms latency', 'RAG pipelines with 70% hallucination reduction', 'Automated regulatory report generation', 'Customer 360 data platform'],
    useCases: ['$12M fraud prevented annually (Fortune 500 bank)', 'Automated regulatory reports across 40+ jurisdictions', '98% accuracy customer risk scoring'],
  },
  {
    id: 'insurance',
    icon: Shield,
    title: 'Insurance',
    color: '#26a69a',
    summary: 'Underwriting intelligence and claims automation powered by ML.',
    challenges: ['Manual claims processing bottlenecks', 'Underwriting accuracy at scale', 'Document extraction from unstructured forms', 'Risk model drift detection'],
    solutions: ['Automated claims triage and routing', 'ML-powered underwriting scoring', 'Document extraction and classification', 'Real-time risk model monitoring'],
    useCases: ['60% reduction in claims processing time', 'AI underwriting model with 91% accuracy', 'Zero-touch document ingestion pipeline'],
  },
  {
    id: 'manufacturing',
    icon: Factory,
    title: 'Manufacturing & Supply Chain',
    color: '#0097a7',
    summary: 'Predictive maintenance, quality analytics, and supply chain intelligence.',
    challenges: ['Unplanned equipment downtime', 'Quality defect detection in production', 'Supply chain demand volatility', 'Sensor data at factory scale'],
    solutions: ['IoT predictive maintenance platform', 'Computer vision quality control', 'Demand forecasting with ML', 'Real-time OEE analytics dashboards'],
    useCases: ['40% reduction in unplanned downtime', '2.3% quality defect rate improvement', 'Supply chain forecast accuracy +25%'],
  },
  {
    id: 'retail',
    icon: ShoppingCart,
    title: 'Retail & E-Commerce',
    color: '#00838f',
    summary: 'Personalization, demand forecasting, and customer intelligence platforms.',
    challenges: ['Personalization at millions of users', 'Inventory optimization complexity', 'Customer churn prediction', 'Pricing strategy analytics'],
    solutions: ['Real-time recommendation engine', 'Demand forecasting with seasonal adjustments', 'Customer lifetime value modeling', 'Dynamic pricing ML models'],
    useCases: ['18% revenue lift from personalization engine', '35% inventory waste reduction', 'Customer churn reduced by 22%'],
  },
];

export const IndustriesPage: React.FC = () => {
  const [active, setActive] = useState(INDUSTRIES[0].id);
  const selected = INDUSTRIES.find(i => i.id === active)!;

  return (
    <PageLayout>
      <PageHero
        tag="// SECTORS WE SERVE"
        headline={"Industries\nWe Transform."}
        sub="Deep domain expertise meets engineering excellence. We've delivered mission-critical AI and data systems across five industries — and understand the unique challenges in each."
      />

      <section style={{ padding: '0 clamp(1.5rem,8vw,10rem) clamp(3rem,8vw,7rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 1fr) 3fr', gap: '2rem', maxWidth: '1200px' }}>
          {/* Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {INDUSTRIES.map((ind, i) => {
              const Icon = ind.icon;
              const isActive = active === ind.id;
              return (
                <FadeIn key={ind.id} delay={i * 0.06}>
                  <motion.button
                    onClick={() => setActive(ind.id)}
                    whileHover={{ x: 4 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.8rem',
                      padding: '0.85rem 1rem', borderRadius: '12px', border: 'none',
                      background: isActive ? `${ind.color}18` : 'transparent',
                      cursor: 'pointer', textAlign: 'left', width: '100%',
                      borderLeft: `3px solid ${isActive ? ind.color : 'transparent'}`,
                      transition: 'all 0.2s',
                    }}
                  >
                    <Icon size={18} style={{ color: isActive ? ind.color : 'var(--text-secondary)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.9rem', fontWeight: isActive ? 600 : 300, color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', transition: 'all 0.2s' }}>
                      {ind.title.split(' ')[0]}
                    </span>
                  </motion.button>
                </FadeIn>
              );
            })}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="glass-panel card-pad" style={{ borderRadius: '20px', border: `1px solid ${selected.color}33`, padding: 'clamp(1.5rem,4vw,2.5rem)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  {(() => { const Icon = selected.icon; return (
                    <div style={{
                      width: 52, height: 52, borderRadius: '15px',
                      background: `${selected.color}18`, border: `1px solid ${selected.color}33`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={26} style={{ color: selected.color }} />
                    </div>
                  ); })()}
                  <div>
                    <h2 style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: 'clamp(1.1rem,2.5vw,1.5rem)' }}>{selected.title}</h2>
                    <p style={{ color: 'var(--text-secondary)', fontWeight: 300, fontSize: '0.9rem', marginTop: '0.2rem' }}>{selected.summary}</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px,100%), 1fr))', gap: '1.5rem' }}>
                  <div>
                    <div className="mono-text" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: selected.color, marginBottom: '0.8rem' }}>CHALLENGES WE SOLVE</div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {selected.challenges.map(c => (
                        <li key={c} style={{ display: 'flex', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.5 }}>
                          <span style={{ color: selected.color, flexShrink: 0 }}>—</span>{c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="mono-text" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: selected.color, marginBottom: '0.8rem' }}>OUR SOLUTIONS</div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {selected.solutions.map(s => (
                        <li key={s} style={{ display: 'flex', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.5, alignItems: 'flex-start' }}>
                          <ArrowRight size={13} style={{ color: selected.color, flexShrink: 0, marginTop: 2 }} />{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: `1px solid ${selected.color}22` }}>
                  <div className="mono-text" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: selected.color, marginBottom: '0.8rem' }}>PROVEN RESULTS</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem' }}>
                    {selected.useCases.map(uc => (
                      <span key={uc} style={{
                        background: `${selected.color}12`, border: `1px solid ${selected.color}30`,
                        color: selected.color, fontSize: '0.8rem', padding: '0.4rem 1rem', borderRadius: '20px', fontWeight: 400,
                      }}>{uc}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </PageLayout>
  );
};
