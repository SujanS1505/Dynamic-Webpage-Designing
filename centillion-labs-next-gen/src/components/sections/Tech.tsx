import React from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';

const TECHNOLOGIES = [
    { name: 'AWS', isLarge: false },
    { name: 'GCP', isLarge: false },
    { name: 'Azure', isLarge: false },
    { name: 'Databricks', isLarge: false },
    { name: 'LangChain', isLarge: true },
    { name: 'Terraform', isLarge: false },
    { name: 'Vertex AI', isLarge: true },
    { name: 'Scala', isLarge: false },
    { name: 'Go', isLarge: false },
    { name: 'Bedrock AI', isLarge: false },
    { name: 'Palantir', isLarge: true },
    { name: 'Spark', isLarge: false },
    { name: 'Kafka', isLarge: false },
    { name: 'MLflow', isLarge: false },
    { name: 'Python', isLarge: false },
    { name: 'PyTorch', isLarge: false }
];

export const Tech: React.FC = () => {
    return (
        <AnimatedSection id="tech" className="section-padding">
            <div style={{ padding: '6rem 0', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                <h2 className="mono-text" style={{ color: 'var(--accent-primary)', marginBottom: '1rem', fontSize: '1.2rem' }}>05 TECHNOLOGIES</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '4rem' }}>The modern AI and cloud stack we work with every day.</p>

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1.5rem',
                    justifyContent: 'center'
                }}>
                    {TECHNOLOGIES.map((tech, idx) => (
                        <AnimatedItem key={tech.name} delay={0.05 * idx}>
                            <div
                                className="hover-border-accent"
                                style={{
                                    padding: tech.isLarge ? '1rem 2rem' : '0.8rem 1.5rem',
                                    fontSize: tech.isLarge ? '1.4rem' : '1.1rem',
                                    fontWeight: tech.isLarge ? 700 : 500,
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '30px',
                                    background: 'var(--bg-card)',
                                    color: tech.isLarge ? 'var(--accent-primary)' : 'var(--text-primary)',
                                    boxShadow: tech.isLarge ? '0 0 15px var(--accent-glow)' : 'none',
                                    backdropFilter: 'blur(12px)',
                                    transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                                    cursor: 'default'
                                }}
                            >
                                {tech.name}
                            </div>
                        </AnimatedItem>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};
