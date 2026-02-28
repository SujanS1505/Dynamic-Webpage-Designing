import React from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';

const CASES = [
    { tag: 'Finance', title: 'FinOps Transformation', desc: 'Reduced cloud spend by 40% using Databricks FinOps accelerators and automated cost pipelines.', result: '↓ 40% Costs' },
    { tag: 'AI', title: 'Enterprise LLM Rollout', desc: 'Deployed a domain specific LLM serving 10,000+ users, reducing analyst lag by 60%.', result: '↑ 60% Speed' },
    { tag: 'Cloud', title: 'Data Mesh at Scale', desc: 'Decentralized data architecture across AWS and Azure spanning 5 business units.', result: '5 BUs Unified' }
];

export const CaseStudies: React.FC = () => {
    return (
        <AnimatedSection id="case-studies" className="section-padding">
            <div style={{ padding: '6rem 0', maxWidth: '1200px', margin: '0 auto' }}>
                <AnimatedItem>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '4rem' }}>
                        Impact Delivered.
                    </h2>
                </AnimatedItem>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '4rem'
                }}>
                    {CASES.map((study, idx) => (
                        <AnimatedItem key={study.title} delay={0.1 * idx}>
                            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', paddingLeft: '1.5rem', borderLeft: '1px solid var(--border-color)' }}>
                                <span className="mono-text" style={{
                                    color: 'var(--accent-primary)',
                                    fontSize: '0.8rem',
                                    letterSpacing: '0.1em',
                                    marginBottom: '1rem'
                                }}>{study.tag.toUpperCase()}</span>

                                <h3 style={{ fontSize: '1.8rem', fontWeight: 300, marginBottom: '1rem', color: 'var(--text-primary)' }}>{study.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontWeight: 300, flexGrow: 1, marginBottom: '2rem' }}>{study.desc}</p>

                                <div className="mono-text" style={{
                                    color: 'var(--text-primary)',
                                    fontSize: '0.9rem',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    transition: 'opacity 0.3s'
                                }}>
                                    {study.result} ↗
                                </div>
                            </div>
                        </AnimatedItem>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};
