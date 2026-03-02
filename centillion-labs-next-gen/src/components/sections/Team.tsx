import React from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';

const TEAM = [
    { name: 'Mohanapriya', role: 'CEO & Cofounder', desc: 'Leading the vision for democratized AI and cloud-native solutions.' },
    { name: 'Chinnasamy', role: 'CTO & Cofounder', desc: 'Architecting high-performance data systems and advanced AI ontologies.' },
];

export const Team: React.FC = () => {
    return (
        <AnimatedSection id="team">
            <div className="sec">
                <AnimatedItem>
                    <h2 style={{
                        fontSize: 'clamp(3rem, 5vw, 5rem)',
                        fontWeight: 200,
                        color: 'var(--text-primary)',
                        marginBottom: '4rem',
                        letterSpacing: '-0.02em'
                    }}>
                        Leadership
                    </h2>
                </AnimatedItem>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
                    gap: 'clamp(1.5rem, 3vw, 2.5rem)'
                }}>
                    {TEAM.map((member, idx) => (
                        <AnimatedItem key={member.name} delay={0.1 * idx}>
                            <div
                                className="glass-panel card-pad"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: '2.5rem',
                                    height: '100%'
                                }}
                            >
                                <span className="mono-text" style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', marginBottom: '1rem', letterSpacing: '0.1em' }}>{member.role}</span>
                                <h3 style={{ fontSize: '1.8rem', fontWeight: 300, marginBottom: '1rem', color: 'var(--text-primary)' }}>{member.name}</h3>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 300, lineHeight: 1.6 }}>{member.desc}</p>
                            </div>
                        </AnimatedItem>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

