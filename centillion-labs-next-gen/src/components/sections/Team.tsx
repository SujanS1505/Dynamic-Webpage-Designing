import React from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';

const TEAM = [
    { name: 'Mohanapriya', role: 'CEO & Cofounder', desc: 'Leading the vision for democratized AI and cloud-native solutions.' },
    { name: 'Chinnasamy', role: 'CTO & Cofounder', desc: 'Architecting high-performance data systems and advanced AI ontologies.' },
    { name: 'AI Research Lead', role: 'Expertise', desc: 'Focusing on Ontology & LLM Architecture for complex business needs.' },
    { name: 'Cloud Architects', role: 'Expertise', desc: 'Specialists in AWS, GCP, Azure, and Modern Data Mesh implementations.' }
];

export const Team: React.FC = () => {
    return (
        <AnimatedSection id="team">
            <div style={{ padding: '10rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
                <AnimatedItem>
                    <h2 style={{
                        fontSize: 'clamp(3rem, 5vw, 5rem)',
                        fontWeight: 200,
                        color: 'var(--text-primary)',
                        marginBottom: '4rem',
                        letterSpacing: '-0.02em'
                    }}>
                        Leadership & Expertise.
                    </h2>
                </AnimatedItem>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2.5rem'
                }}>
                    {TEAM.map((member, idx) => (
                        <AnimatedItem key={member.name} delay={0.1 * idx}>
                            <div
                                className="glass-panel"
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

