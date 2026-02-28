import React from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';

export const About: React.FC = () => {
    return (
        <AnimatedSection id="about">
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                paddingTop: '4rem',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '4rem',
                    alignItems: 'center'
                }}>
                    <AnimatedItem>
                        <h2 style={{
                            fontSize: 'clamp(3rem, 5vw, 5rem)',
                            fontWeight: 200,
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em',
                            color: 'var(--text-primary)'
                        }}>
                            Our Approach.
                        </h2>
                        <p className="mono-text" style={{
                            color: 'var(--accent-primary)',
                            marginTop: '1.5rem',
                            letterSpacing: '0.1em',
                            fontSize: '0.9rem'
                        }}>
                            AI ONTOLOGY COMPANY
                        </p>
                    </AnimatedItem>

                    <AnimatedItem delay={0.2}>
                        <p style={{
                            fontSize: '1.2rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.8,
                            fontWeight: 300,
                            marginBottom: '2rem'
                        }}>
                            Over the years, our core team has amassed a wealth of experience, aiding countless clients in migrating to the realms of AWS, GCP, and Azure.
                        </p>
                        <p style={{
                            fontSize: '1.2rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.8,
                            fontWeight: 300
                        }}>
                            We are Data Observability specialists identifying code, configuration, schema, data, metadata, and technology drift in application, data, control and infrastructure planes.
                        </p>
                    </AnimatedItem>
                </div>
            </div>
        </AnimatedSection>
    );
};
