import React from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';

const INDUSTRIES = [
    {
        title: 'Banking & Finance',
        desc: 'Personalized financial guidance, automated fraud detection, and predictive risk modeling for the modern financial landscape.'
    },
    {
        title: 'Healthcare',
        desc: 'Precision medicine, advanced medical imaging analysis, and HIPAA-compliant AI solutions for improved patient outcomes.'
    },
    {
        title: 'Insurance',
        desc: 'AI-driven risk assessment, claims automation, and personalized policy recommendations to streamline insurance operations.'
    },
    {
        title: 'Manufacturing',
        desc: 'IoT-driven smart manufacturing, Digital Twin technology, and predictive maintenance for operational excellence.'
    },
    {
        title: 'Retail',
        desc: 'Hyper-personalized marketing, blockchain-enabled supply chain visibility, and intelligent inventory management.'
    }
];

export const Industries: React.FC = () => {
    return (
        <AnimatedSection id="industries">
            <div style={{ padding: '10rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <AnimatedItem>
                    <h2 style={{
                        fontSize: 'clamp(3rem, 5vw, 5rem)',
                        fontWeight: 200,
                        color: 'var(--text-primary)',
                        marginBottom: '4rem',
                        letterSpacing: '-0.02em'
                    }}>
                        Industries.
                    </h2>
                </AnimatedItem>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {INDUSTRIES.map((ind, idx) => (
                        <AnimatedItem key={ind.title} delay={0.1 * idx}>
                            <div
                                style={{
                                    padding: '3rem 0',
                                    borderTop: '1px solid var(--border-color)',
                                    display: 'grid',
                                    gridTemplateColumns: '1.2fr 2fr',
                                    gap: '2rem',
                                    alignItems: 'center'
                                }}
                            >
                                <h3 style={{ fontSize: '2rem', fontWeight: 300, color: 'var(--text-primary)' }}>{ind.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontWeight: 300, fontSize: '1.2rem' }}>{ind.desc}</p>
                            </div>
                        </AnimatedItem>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

