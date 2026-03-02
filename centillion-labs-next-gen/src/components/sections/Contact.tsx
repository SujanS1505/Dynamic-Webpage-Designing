import React from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';

export const Contact: React.FC = () => {
    return (
        <AnimatedSection id="contact">
            <div className="sec">
                <div className="glass-panel" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px,100%), 1fr))', gap: 'clamp(2.5rem, 8vw, 6rem)', padding: 'clamp(2rem, 5vw, 4rem)' }}>
                    <AnimatedItem>
                        <h2 style={{
                            fontSize: 'clamp(3rem, 5vw, 5rem)',
                            fontWeight: 200,
                            color: 'var(--text-primary)',
                            marginBottom: '2rem',
                            letterSpacing: '-0.02em'
                        }}>
                            Let's Connect.
                        </h2>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontWeight: 300, marginBottom: '3rem', lineHeight: 1.6 }}>
                            Ready to start your generative AI journey or optimize your cloud-native infrastructure? Reach out to our team of experts.
                        </p>
                        <a href="mailto:connect@centillionlabs.com" className="glass-panel" style={{
                            padding: '1rem 2.5rem',
                            textDecoration: 'none',
                            color: 'var(--text-primary)',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            borderRadius: '100px',
                            display: 'inline-block'
                        }}>
                            connect@centillionlabs.com
                        </a>
                    </AnimatedItem>

                    <AnimatedItem delay={0.2}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            <div>
                                <span className="mono-text" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', display: 'block', marginBottom: '1rem', letterSpacing: '0.1em' }}>INDIA OFFICE</span>
                                <p style={{ fontSize: '1.2rem', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.5 }}>
                                    1084, 8th A Main, Sector 7, <br />
                                    HSR Layout, Bangalore.
                                </p>
                            </div>
                            <div>
                                <span className="mono-text" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', display: 'block', marginBottom: '1rem', letterSpacing: '0.1em' }}>US OFFICE</span>
                                <p style={{ fontSize: '1.2rem', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.5 }}>
                                    PO 4321, River Edge, <br />
                                    NJ 07661.
                                </p>
                            </div>
                        </div>
                    </AnimatedItem>
                </div>
            </div>
        </AnimatedSection>
    );
};
