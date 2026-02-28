import React from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';
import { motion } from 'framer-motion';

const TEAM = [
    { role: 'AI Research Lead', desc: 'Ontology & LLM Architecture', color: 'var(--accent-primary)' },
    { role: 'Cloud Architect', desc: 'AWS, GCP & Data Mesh Expert', color: '#7c4dff' },
    { role: 'Generative AI Engineer', desc: 'Fine-tuning & RAG Pipelines', color: '#ff6d00' },
    { role: 'FinOps Specialist', desc: 'Databricks Cost Optimization', color: '#00e5ff' }
];

export const Team: React.FC = () => {
    return (
        <AnimatedSection id="team">
            <div style={{ padding: '6rem 0', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                <h2 className="mono-text" style={{ color: 'var(--accent-primary)', marginBottom: '1rem', fontSize: '1.2rem' }}>06 TEAM</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '4rem' }}>
                    The minds behind Centillion Labs — builders at the intersection of AI, data, and cloud.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem'
                }}>
                    {TEAM.map((member, idx) => (
                        <AnimatedItem key={member.role} delay={0.1 * idx}>
                            <motion.div
                                whileHover={{ y: -10 }}
                                className="glass-panel"
                                style={{
                                    padding: '3rem 2rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    background: 'var(--bg-card)'
                                }}
                            >
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: `radial-gradient(circle at center, ${member.color}40 0%, transparent 70%)`,
                                    border: `1px solid ${member.color}60`,
                                    marginBottom: '1.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative'
                                }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: member.color, opacity: 0.8 }} />
                                </div>

                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{member.role}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{member.desc}</p>
                            </motion.div>
                        </AnimatedItem>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};
