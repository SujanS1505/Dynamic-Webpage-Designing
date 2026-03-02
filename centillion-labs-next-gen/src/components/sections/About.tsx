import React from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';

const SPECIALIZATIONS = [
    { title: 'Red Teaming', desc: 'Centillion Red Team works around the clock — adversarially testing LLMs, probing inference pipelines, and hardening AI systems before threats do.' },
    { title: 'Go Lang', desc: 'Concurrency patterns, gRPC, and performance-critical systems.' },
    { title: 'Scala', desc: 'Spark core, functional design patterns, and big data processing.' },
    { title: 'Modern Data Mesh', desc: 'Data Mesh, Knowledge Graphs, and Synthetic Data solutions.' },
];

export const About: React.FC = () => {
    return (
        <AnimatedSection id="about">
            <div className="sec" style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'clamp(3rem, 8vw, 6rem)',
                    width: '100%',
                }}>
                    <div className="split-grid">
                        <AnimatedItem>
                            <h2 style={{
                                fontSize: 'clamp(3rem, 5vw, 5rem)',
                                fontWeight: 200,
                                lineHeight: 1.1,
                                letterSpacing: '-0.02em',
                                color: 'var(--text-primary)'
                            }}>
                                Our Vision.
                            </h2>
                            <p className="mono-text" style={{
                                color: 'var(--accent-primary)',
                                marginTop: '1.5rem',
                                letterSpacing: '0.1em',
                                fontSize: '0.9rem'
                            }}>
                                COLLECTIVE EXPERTISE
                            </p>
                        </AnimatedItem>

                        <AnimatedItem delay={0.2}>
                            <p style={{
                                fontSize: '1.5rem',
                                color: 'var(--text-secondary)',
                                lineHeight: 1.6,
                                fontWeight: 300
                            }}>
                                We focus on resolving intricate challenges through collective industry expertise. As cloud-native experts and democratized AI providers, we bridge the gap between complex infrastructure and optimal business outcomes.
                            </p>
                        </AnimatedItem>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))',
                        gap: 'clamp(1rem, 3vw, 2rem)'
                    }}>
                        {SPECIALIZATIONS.map((spec, index) => (
                            <AnimatedItem key={spec.title} delay={0.1 * index}>
                                <div className="glass-panel card-pad" style={{ padding: '2.5rem', height: '100%' }}>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 300 }}>{spec.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 300 }}>{spec.desc}</p>
                                </div>
                            </AnimatedItem>
                        ))}
                    </div>
                </div>
            </div>

        </AnimatedSection>
    );
};
