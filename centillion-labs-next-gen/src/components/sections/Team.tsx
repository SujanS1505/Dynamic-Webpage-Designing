import React from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';

const TEAM = [
    { role: 'AI Research Lead', desc: 'Ontology & LLM Architecture' },
    { role: 'Cloud Architect', desc: 'AWS, GCP & Data Mesh Expert' },
    { role: 'Generative AI Engineer', desc: 'Fine-tuning & RAG Pipelines' },
    { role: 'FinOps Specialist', desc: 'Databricks Cost Optimization' }
];

export const Team: React.FC = () => {
    return (
        <AnimatedSection id="team">
            <div style={{ padding: '6rem 0', maxWidth: '1200px', margin: '0 auto' }}>
                <AnimatedItem>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '4rem' }}>
                        Expertise.
                    </h2>
                </AnimatedItem>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '4rem'
                }}>
                    {TEAM.map((member, idx) => (
                        <AnimatedItem key={member.role} delay={0.1 * idx}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderTop: '1px solid var(--border-color)',
                                    paddingTop: '2rem'
                                }}
                            >
                                <h3 style={{ fontSize: '1.4rem', fontWeight: 300, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{member.role}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 300 }}>{member.desc}</p>
                            </div>
                        </AnimatedItem>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};
