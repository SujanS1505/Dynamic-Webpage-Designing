import React from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';

const CASES = [
    { tag: 'AI PRODUCT', title: 'Secure AI', desc: 'A generative AI platform featuring GMail Synthesizer, Finance/Retail Language Models, and seamless Vertex AI/Bedrock integration.', result: 'Explore AI' },
    { tag: 'DATA PRODUCT', title: 'Plato', desc: 'Specialized Data Clean Room Architecture designed for privacy-preserving marketing and secure data collaboration.', result: 'Learn Privacy' },
    { tag: 'AI AGENT', title: 'Claudius', desc: 'Advanced AI/Data tool for intelligent automation and structural data processing across diverse enterprise ecosystems.', result: 'View Agent' },
    { tag: 'CASE STUDY', title: 'Reducing Hallucination – RAG', desc: 'A deep dive comparative study on Retrieval-Augmented Generation to minimize AI inaccuracies in production environments.', result: 'Read Study' },
    { tag: 'INTERNAL TOOL', title: 'Centillion-Backstage', desc: 'Insights into our high-performance Developer Portal designed for streamlined cloud-native development workflows.', result: 'View Portal' },
];

export const CaseStudies: React.FC = () => {
    return (
        <AnimatedSection id="portfolio" className="section-padding">
            <div className="sec">
                <AnimatedItem>
                    <p className="mono-text" style={{
                        color: 'var(--accent-primary)',
                        fontSize: '0.8rem',
                        letterSpacing: '0.2em',
                        marginBottom: '1.5rem',
                    }}>
                        WHAT WE'VE BUILT
                    </p>
                    <h2 style={{
                        fontSize: 'clamp(3rem, 5vw, 5rem)',
                        fontWeight: 200,
                        color: 'var(--text-primary)',
                        marginBottom: '4rem',
                        letterSpacing: '-0.02em',
                    }}>
                        Portfolio
                    </h2>
                </AnimatedItem>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
                    gap: '1.5rem',
                }}>
                    {CASES.map((study, idx) => (
                        <AnimatedItem key={study.title} delay={0.1 * idx}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                padding: '2.5rem',
                                borderRadius: '16px',
                                border: '1px solid var(--border-color)',
                                background: 'var(--glass-bg)',
                                backdropFilter: 'blur(12px)',
                                WebkitBackdropFilter: 'blur(12px)',
                            }}>
                                {/* Tag */}
                                <span className="mono-text" style={{
                                    display: 'block',
                                    color: 'var(--accent-primary)',
                                    fontSize: '0.75rem',
                                    letterSpacing: '0.15em',
                                    marginBottom: '1.5rem',
                                }}>
                                    {study.tag}
                                </span>

                                {/* Title */}
                                <h3 style={{
                                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                                    fontWeight: 300,
                                    marginBottom: '1.25rem',
                                    color: 'var(--text-primary)',
                                    lineHeight: 1.25,
                                }}>
                                    {study.title}
                                </h3>

                                {/* Description */}
                                <p style={{
                                    color: 'var(--text-secondary)',
                                    lineHeight: 1.7,
                                    fontWeight: 300,
                                    fontSize: '1rem',
                                    flexGrow: 1,
                                    marginBottom: '2rem',
                                }}>
                                    {study.desc}
                                </p>

                                {/* CTA */}
                                <span className="mono-text" style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    fontSize: '0.82rem',
                                    fontWeight: 400,
                                    color: 'var(--text-secondary)',
                                    letterSpacing: '0.08em',
                                }}>
                                    {study.result} ↗
                                </span>
                            </div>
                        </AnimatedItem>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};
