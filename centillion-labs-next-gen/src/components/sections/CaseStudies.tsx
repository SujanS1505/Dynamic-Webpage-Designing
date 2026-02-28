import React from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';
import { motion } from 'framer-motion';

const CASES = [
    { tag: 'Finance', title: 'FinOps Transformation for a Global Bank', desc: 'Reduced cloud spend by 40% using Databricks FinOps accelerators and automated cost-anomaly detection pipelines.', result: '↓ 40% Cloud Costs' },
    { tag: 'AI', title: 'Enterprise LLM via AristotleAI', desc: 'Deployed a finance-domain specific LLM serving 10,000+ internal users, reducing analyst productivity lag by 60%.', result: '↑ 60% Productivity' },
    { tag: 'Cloud', title: 'Multi-Cloud Data Mesh at Scale', desc: 'Designed and implemented a decentralized data mesh architecture across AWS and Azure spanning 5 business units.', result: '5 BUs Unified' }
];

export const CaseStudies: React.FC = () => {
    return (
        <AnimatedSection id="case-studies" className="section-padding">
            <div style={{ padding: '6rem 0', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 className="mono-text" style={{ color: 'var(--accent-primary)', marginBottom: '3rem', fontSize: '1.2rem', textAlign: 'center' }}>08 CASE STUDIES</h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2.5rem'
                }}>
                    {CASES.map((study, idx) => (
                        <AnimatedItem key={study.title} delay={0.1 * idx}>
                            <motion.div
                                whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
                                className="glass-panel"
                                style={{
                                    padding: '2.5rem',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '4px',
                                    height: '100%',
                                    background: 'var(--accent-primary)'
                                }} />

                                <span className="mono-text" style={{
                                    color: 'var(--accent-secondary)',
                                    border: '1px solid var(--accent-secondary)',
                                    padding: '0.2rem 0.8rem',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    alignSelf: 'flex-start',
                                    marginBottom: '1.5rem'
                                }}>{study.tag}</span>

                                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{study.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, flexGrow: 1, marginBottom: '2rem' }}>{study.desc}</p>

                                <div className="mono-text" style={{
                                    color: '#fff',
                                    background: 'rgba(255,255,255,0.05)',
                                    padding: '0.8rem',
                                    borderRadius: '8px',
                                    fontSize: '0.9rem',
                                    fontWeight: 700,
                                    border: '1px solid var(--border-color)',
                                    textAlign: 'center'
                                }}>
                                    {study.result}
                                </div>
                            </motion.div>
                        </AnimatedItem>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};
