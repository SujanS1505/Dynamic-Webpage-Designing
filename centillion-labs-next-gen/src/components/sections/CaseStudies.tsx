import React from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';

const CASES = [
    { tag: 'AI RESEARCH', title: 'Comparative Analysis of LLM Model', desc: '"Unlock insights in our comparative study. Download the PDF to explore the world of large language models." — Published November 2023.', result: 'Download PDF', href: 'https://www.centillionlabs.com/comparative-llm' },
    { tag: 'CASE STUDY', title: 'Reducing Hallucination – RAG', desc: 'A deep dive comparative study on Retrieval-Augmented Generation to minimize AI inaccuracies in production environments.', result: 'Read Study', href: '#' },
    { tag: 'INTERNAL TOOL', title: 'Centillion-Backstage', desc: 'Insights into our high-performance Developer Portal designed for streamlined cloud-native development workflows.', result: 'View Portal', href: '#' },
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
                        Centillion Case Studies
                    </h2>
                </AnimatedItem>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
                    gap: '1.5rem',
                }}>
                    {CASES.map((study, idx) => (
                        <AnimatedItem key={study.title} delay={0.1 * idx}>
                            <div className="glass-panel card-pad" style={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                padding: '2.5rem',
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
                                <a
                                    href={study.href}
                                    target={study.href !== '#' ? '_blank' : undefined}
                                    rel="noopener noreferrer"
                                    className="mono-text hover-text-accent"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        fontSize: '0.82rem',
                                        fontWeight: 400,
                                        color: 'var(--text-secondary)',
                                        letterSpacing: '0.08em',
                                        textDecoration: 'none',
                                        transition: 'color 0.3s',
                                        marginTop: 'auto',
                                    }}
                                >
                                    {study.result} ↗
                                </a>
                            </div>
                        </AnimatedItem>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};
