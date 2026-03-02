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
            <div className="sec">
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

                <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    {INDUSTRIES.map((ind, idx) => (
                        <AnimatedItem key={ind.title} delay={0.1 * idx}>
                            <div
                                className="row-grid-wide"
                                style={{
                                    padding: 'clamp(1.5rem, 4vw, 2.5rem) clamp(1.5rem, 4vw, 2.5rem)',
                                    borderTop: idx === 0 ? 'none' : '1px solid var(--border-color)',
                                }}
                            >
                                <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', fontWeight: 300, color: 'var(--text-primary)' }}>{ind.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontWeight: 300, fontSize: 'clamp(0.95rem, 2vw, 1.2rem)' }}>{ind.desc}</p>
                            </div>
                        </AnimatedItem>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

