import React from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';

const LIFE_GALLERY = [
    { title: 'Global Collaboration', desc: 'Syncing across time zones to solve the world\'s toughest data problems.' },
    { title: 'Culture & Celebration', desc: 'Celebrating our diverse heritage with ethnic wear and cultural festivities.' },
    { title: 'Innovation Sprints', desc: 'Rapid prototyping of AI agents and cloud-native tools in a high-energy environment.' }
];

export const LifeAtCentillion: React.FC = () => {
    return (
        <AnimatedSection id="life">
            <div className="sec">
                <AnimatedItem>
                    <h2 style={{
                        fontSize: 'clamp(3rem, 5vw, 5rem)',
                        fontWeight: 200,
                        color: 'var(--text-primary)',
                        marginBottom: '1rem',
                        letterSpacing: '-0.02em'
                    }}>
                        Life @ Centillion.
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', fontWeight: 300, marginBottom: '4rem', maxWidth: '700px' }}>
                        Beyond the code and the cloud, we are a community of thinkers, creators, and innovators.
                    </p>
                </AnimatedItem>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
                    gap: '2.5rem'
                }}>
                    {LIFE_GALLERY.map((item, idx) => (
                        <AnimatedItem key={item.title} delay={0.1 * idx}>
                            <div className="glass-panel" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '-20px',
                                    right: '-20px',
                                    width: '100px',
                                    height: '100px',
                                    background: 'var(--accent-glow)',
                                    borderRadius: '50%',
                                    filter: 'blur(40px)',
                                    opacity: 0.3
                                }}></div>
                                <h3 style={{ fontSize: '1.8rem', fontWeight: 300, marginBottom: '1.5rem', position: 'relative' }}>{item.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontWeight: 300, fontSize: '1.1rem', position: 'relative' }}>
                                    {item.desc}
                                </p>
                            </div>
                        </AnimatedItem>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};
