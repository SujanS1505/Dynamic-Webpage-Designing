import React from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';

const SERVICES = [
    {
        title: 'Generative AI Solutions',
        desc: 'We develop custom solutions that harness the capabilities of ML and AI to address specific challenges.',
        type: 'CUSTOM SOLUTIONS'
    },
    {
        title: 'Responsible AI',
        desc: 'Centillion values and encapsulates ResponsibleAI and EthicalAI. Our mission is to create AI applications that enhance user experiences, rather than displacing them.',
        type: 'ETHICS & COMPLIANCE'
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
                paddingTop: '4rem',
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
                        Horizons.
                    </h2>
                </AnimatedItem>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3rem'
                }}>
                    {SERVICES.map((srv, idx) => (
                        <AnimatedItem key={srv.title} delay={0.1 * idx}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '2rem',
                                borderTop: '1px solid var(--border-color)',
                                paddingTop: '2rem',
                                transition: 'border-color 0.3s'
                            }}>
                                <div>
                                    <h3 style={{ fontSize: '2rem', fontWeight: 300, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{srv.title}</h3>
                                    <span className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', letterSpacing: '0.1em' }}>{srv.type}</span>
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
