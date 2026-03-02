import React from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';

const CASES = [
    { tag: 'AI PRODUCT', title: 'AristotleAI', desc: 'A generative AI platform featuring GMail Synthesizer, Finance/Retail Language Models, and seamless Vertex AI/Bedrock integration.', result: 'Explore AI' },
    { tag: 'DATA PRODUCT', title: 'Plato', desc: 'Specialized Data Clean Room Architecture designed for privacy-preserving marketing and secure data collaboration.', result: 'Learn Privacy' },
    { tag: 'AI AGENT', title: 'Claudius', desc: 'Advanced AI/Data tool for intelligent automation and structural data processing across diverse enterprise ecosystems.', result: 'View Agent' },
    { tag: 'CASE STUDY', title: 'Reducing Hallucination – RAG', desc: 'A deep dive comparative study on Retrieval-Augmented Generation to minimize AI inaccuracies in production environments.', result: 'Read Study' },
    { tag: 'INTERNAL TOOL', title: 'Centillion-Backstage', desc: 'Insights into our high-performance Developer Portal designed for streamlined cloud-native development workflows.', result: 'View Portal' }
];

export const CaseStudies: React.FC = () => {
    return (
        <AnimatedSection id="portfolio" className="section-padding">
            <div className="sec">
                <AnimatedItem>
                    <h2 style={{
                        fontSize: 'clamp(3rem, 5vw, 5rem)',
                        fontWeight: 200,
                        color: 'var(--text-primary)',
                        marginBottom: '4rem',
                        letterSpacing: '-0.02em'
                    }}>
                        Portfolio & Insights.
                    </h2>
                </AnimatedItem>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
                    gap: '2.5rem'
                }}>
                    {CASES.map((study, idx) => (
                        <AnimatedItem key={study.title} delay={0.1 * idx}>
                            <div className="glass-panel card-pad" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
                                    cursor: 'pointer',
                                    fontWeight: 500
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

