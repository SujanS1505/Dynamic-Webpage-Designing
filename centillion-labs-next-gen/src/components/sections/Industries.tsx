import React from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';

const INDUSTRIES = [
    { icon: '💰', title: 'Finance & Banking', desc: 'Predictive analytics, risk modeling, and FinOps automation for modern financial institutions.' },
    { icon: '🏥', title: 'Healthcare', desc: 'Responsible AI for clinical diagnostics, patient data observability, and HIPAA-compliant LLMs.' },
    { icon: '🛒', title: 'Retail & E-Commerce', desc: 'Recommendation engines, demand forecasting, and personalized AI-driven customer experiences.' },
    { icon: '🚀', title: 'Technology', desc: 'Data mesh adoption, platform engineering, and developer-first generative AI integrations.' },
    { icon: '🏭', title: 'Manufacturing', desc: 'Edge AI, sensor fusion, and anomaly detection for intelligent industrial operations.' },
    { icon: '⚡', title: 'Energy & Utilities', desc: 'Predictive maintenance, consumption forecasting, and AI-powered grid optimization.' }
];

export const Industries: React.FC = () => {
    return (
        <AnimatedSection id="industries">
            <div style={{ padding: '6rem 0', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 className="mono-text" style={{ color: 'var(--accent-primary)', marginBottom: '1rem', fontSize: '1.2rem', textAlign: 'center' }}>07 INDUSTRIES</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '4rem', textAlign: 'center' }}>
                    We partner with leaders across high-impact sectors.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {INDUSTRIES.map((ind, idx) => (
                        <AnimatedItem key={ind.title} delay={0.05 * idx}>
                            <div
                                style={{
                                    padding: '2rem',
                                    borderLeft: '2px solid var(--border-color)',
                                    transition: 'border-color 0.3s'
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-primary)')}
                                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
                            >
                                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{ind.icon}</div>
                                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{ind.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ind.desc}</p>
                            </div>
                        </AnimatedItem>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};
