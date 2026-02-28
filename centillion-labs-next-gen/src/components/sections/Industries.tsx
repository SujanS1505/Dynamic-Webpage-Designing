import React from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';

const INDUSTRIES = [
    { title: 'Finance & Banking', desc: 'Predictive analytics, risk modeling, and FinOps automation for modern financial institutions.' },
    { title: 'Healthcare', desc: 'Responsible AI for clinical diagnostics, patient data observability, and HIPAA-compliant LLMs.' },
    { title: 'Retail & E-Commerce', desc: 'Recommendation engines, demand forecasting, and personalized AI-driven customer experiences.' },
    { title: 'Technology', desc: 'Data mesh adoption, platform engineering, and developer-first generative AI integrations.' }
];

export const Industries: React.FC = () => {
    return (
        <AnimatedSection id="industries">
            <div style={{ padding: '6rem 0', maxWidth: '1200px', margin: '0 auto' }}>
                <AnimatedItem>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '4rem' }}>
                        Verticals.
                    </h2>
                </AnimatedItem>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {INDUSTRIES.map((ind, idx) => (
                        <AnimatedItem key={ind.title} delay={0.05 * idx}>
                            <div
                                style={{
                                    padding: '2rem 1rem',
                                    borderTop: '1px solid var(--border-color)',
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                    gap: '2rem',
                                    alignItems: 'center',
                                    transition: 'background 0.3s'
                                }}
                                className="hover-bg-subtle"
                                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                            >
                                <h3 style={{ fontSize: '1.8rem', fontWeight: 300, color: 'var(--text-primary)' }}>{ind.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontWeight: 300, fontSize: '1.1rem' }}>{ind.desc}</p>
                            </div>
                        </AnimatedItem>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};
