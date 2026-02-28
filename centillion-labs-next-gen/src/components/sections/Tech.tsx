import React from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';

const TECHNOLOGIES = [
    'AWS', 'GCP', 'Azure', 'Databricks', 'LangChain', 'Terraform',
    'Vertex AI', 'Scala', 'Go', 'Bedrock AI', 'Palantir', 'Spark',
    'Kafka', 'MLflow', 'Python', 'PyTorch'
];

export const Tech: React.FC = () => {
    return (
        <AnimatedSection id="tech" className="section-padding">
            <div style={{ padding: '6rem 0', maxWidth: '1200px', margin: '0 auto' }}>
                <AnimatedItem>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        Ecosystem.
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', fontWeight: 300, marginBottom: '4rem' }}>
                        The modern AI and cloud stack we work with every day.
                    </p>
                </AnimatedItem>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: '2rem'
                }}>
                    {TECHNOLOGIES.map((tech, idx) => (
                        <AnimatedItem key={tech} delay={0.02 * idx}>
                            <div
                                style={{
                                    padding: '1.5rem 0',
                                    fontSize: '1.2rem',
                                    fontWeight: 300,
                                    borderBottom: '1px solid var(--border-color)',
                                    color: 'var(--text-primary)',
                                    transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                                    cursor: 'default'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                                    e.currentTarget.style.color = 'var(--accent-primary)';
                                    e.currentTarget.style.paddingLeft = '1.5rem';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border-color)';
                                    e.currentTarget.style.color = 'var(--text-primary)';
                                    e.currentTarget.style.paddingLeft = '0';
                                }}
                            >
                                {tech}
                            </div>
                        </AnimatedItem>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};
