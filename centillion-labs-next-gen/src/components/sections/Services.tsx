import React from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';

const SERVICES = [
    {
        title: 'Data Engineering & Advanced Analytics',
        desc: 'Building robust data pipelines and leveraging advanced analytics to drive business intelligence.',
        type: 'DATA ARCHITECTURE'
    },
    {
        title: 'Machine Learning & AI',
        desc: 'Custom ML models and AI solutions tailored to solve complex business challenges with precision.',
        type: 'INTELLIGENT SYSTEMS'
    },
    {
        title: 'GenAI & Responsible AI',
        desc: 'Harnessing the power of Generative AI while ensuring ethical standards and responsible implementation.',
        type: 'MODERN AI'
    },
    {
        title: 'DevOps & Infrastructure',
        desc: 'Cloud-native infrastructure, CI/CD pipelines, and automated deployment strategies.',
        type: 'OPERATIONS'
    },
    {
        title: 'Kubernetes & Scalability',
        desc: 'Container orchestration and scalable microservices architectures for high-availability systems.',
        type: 'CLOUD NATIVE'
    },
    {
        title: 'CTO as a Service',
        desc: 'Strategic technical leadership to help startups and enterprises navigate their technology roadmap.',
        type: 'STRATEGY'
    }
];

export const Services: React.FC = () => {
    return (
        <AnimatedSection id="services">
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '10rem 2rem',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <AnimatedItem>
                    <h2 style={{
                        fontSize: 'clamp(3rem, 5vw, 5rem)',
                        fontWeight: 200,
                        lineHeight: 1.1,
                        letterSpacing: '-0.02em',
                        color: 'var(--text-primary)',
                        marginBottom: '4rem'
                    }}>
                        Services.
                    </h2>
                </AnimatedItem>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem'
                }}>
                    {SERVICES.map((srv, idx) => (
                        <AnimatedItem key={srv.title} delay={0.1 * idx}>
                            <div className="glass-panel" style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 2fr',
                                gap: '2rem',
                                padding: '3rem',
                                transition: 'all 0.3s ease'
                            }}>
                                <div>
                                    <span className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', letterSpacing: '0.1em', display: 'block', marginBottom: '1rem' }}>{srv.type}</span>
                                    <h3 style={{ fontSize: '2rem', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.2 }}>{srv.title}</h3>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontWeight: 300 }}>
                                        {srv.desc}
                                    </p>
                                </div>
                            </div>
                        </AnimatedItem>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

