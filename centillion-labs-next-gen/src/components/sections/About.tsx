import React from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';

export const About: React.FC = () => {
    return (
        <AnimatedSection id="about" className="section-padding">
            <div style={{ padding: '6rem 0', maxWidth: '1000px', margin: '0 auto' }}>
                <h2 className="mono-text" style={{ color: 'var(--accent-primary)', marginBottom: '3rem', fontSize: '1.2rem' }}>01 ABOUT US</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

                    <AnimatedItem delay={0.1}>
                        <div className="glass-panel" style={{ padding: '2.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)' }}>AI Ontology Company</h3>
                                <span className="mono-text" style={{ color: 'var(--accent-secondary)', fontSize: '0.85rem' }}>Who we are</span>
                            </div>
                            <p style={{ color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '1.5rem' }}>Cloud Migration & Data Observability</p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                                Over the years, our core team has amassed a wealth of experience, aiding countless clients in migrating to the realms of AWS, GCP, and Azure. We are Data Observability specialists identifying code, configuration, schema, data, metadata, and technology drift in application, data, control and infrastructure planes.
                            </p>
                        </div>
                    </AnimatedItem>

                    <AnimatedItem delay={0.2}>
                        <div className="glass-panel" style={{ padding: '2.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)' }}>Generative AI Solutions</h3>
                                <span className="mono-text" style={{ color: 'var(--accent-secondary)', fontSize: '0.85rem' }}>Custom Solutions</span>
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                                We develop custom solutions that harness the capabilities of ML and AI to address specific challenges. Centillion values and encapsulates ResponsibleAI and EthicalAI. Our mission is to create AI applications that enhance user experiences, rather than displacing them.
                            </p>
                        </div>
                    </AnimatedItem>
                </div>
            </div>
        </AnimatedSection>
    );
};
