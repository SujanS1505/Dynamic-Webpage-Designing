import React from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';

const PRODUCTS = [
    { icon: '01', title: 'AristotleAI', desc: 'Transform and manipulate data with ease. Built in Scala, Aristotle seamlessly integrates with existing Scala-based projects. Features: GMail Synthesizer Craft, Finance & Retail Language Models.' },
    { icon: '02', title: 'Plato & Claudius', desc: 'Comprehensive Cloud Management and Cloud Modernization platforms. Abstract Generic Frameworks Written in Go Language emphasizing Functional Elegance (Monoids and Monads).' },
    { icon: '03', title: 'Hexacube', desc: 'Home Brewn LLM Models tailored for enterprise. Deep integrations with Vertex AI and Bedrock AI to power advanced predictive and generative pipelines securely.' }
];

export const Portfolio: React.FC = () => {
    return (
        <AnimatedSection id="portfolio">
            <div style={{ padding: '6rem 0', maxWidth: '1200px', margin: '0 auto' }}>
                <AnimatedItem>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '4rem' }}>
                        Products.
                    </h2>
                </AnimatedItem>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem' }}>
                    {PRODUCTS.map((prod, idx) => (
                        <AnimatedItem key={prod.title} delay={0.1 * idx}>
                            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <div className="mono-text" style={{ fontSize: '1.5rem', color: 'var(--accent-primary)', marginBottom: '1.5rem', fontWeight: 300 }}>
                                    {prod.icon}
                                </div>
                                <h3 style={{ fontSize: '1.8rem', fontWeight: 300, marginBottom: '1rem', color: 'var(--text-primary)' }}>{prod.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300, flexGrow: 1, marginBottom: '2rem' }}>{prod.desc}</p>
                                <a href="#" className="hover-text-accent" style={{
                                    textDecoration: 'none',
                                    color: 'var(--text-primary)',
                                    fontWeight: 300,
                                    fontSize: '0.9rem',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    transition: 'color 0.3s'
                                }}>
                                    Explore ↗
                                </a>
                            </div>
                        </AnimatedItem>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};
