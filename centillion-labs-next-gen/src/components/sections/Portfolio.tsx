import React from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';

const PRODUCTS = [
    {
        icon: 'A',
        title: 'AristotleAI',
        desc: 'Transform and manipulate data with ease. Built in Scala, Aristotle seamlessly integrates with existing Scala-based projects. Features: GMail Synthesizer Craft, Finance & Retail Language Models.'
    },
    {
        icon: 'P',
        title: 'Plato & Claudius',
        desc: 'Comprehensive Cloud Management and Cloud Modernization platforms. Abstract Generic Frameworks Written in Go Language emphasizing Functional Elegance (Monoids and Monads).'
    },
    {
        icon: 'H',
        title: 'Hexacube',
        desc: 'Home Brewn LLM Models tailored for enterprise. Deep integrations with Vertex AI and Bedrock AI to power advanced predictive and generative pipelines securely.'
    }
];

export const Portfolio: React.FC = () => {
    return (
        <AnimatedSection id="portfolio">
            <div style={{ padding: '6rem 0', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 className="mono-text" style={{ color: 'var(--accent-primary)', marginBottom: '3rem', fontSize: '1.2rem' }}>03 PRODUCTS</h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2.5rem'
                }}>
                    {PRODUCTS.map((prod, idx) => (
                        <AnimatedItem key={prod.title} delay={0.2 * idx}>
                            <div
                                className="glass-panel"
                                style={{
                                    padding: '3rem 2rem',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    background: 'linear-gradient(180deg, var(--bg-card) 0%, rgba(0,0,0,0) 100%)',
                                    borderTop: 'none',
                                    borderBottom: 'none'
                                }}
                            >
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '50%',
                                    background: 'var(--accent-glow)',
                                    border: '1px solid var(--accent-primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.8rem',
                                    fontWeight: 800,
                                    color: 'var(--accent-primary)',
                                    marginBottom: '2rem',
                                    boxShadow: '0 0 20px var(--accent-glow)'
                                }}>
                                    {prod.icon}
                                </div>

                                <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{prod.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, flexGrow: 1, marginBottom: '2rem' }}>{prod.desc}</p>

                                <a href="#" className="hover-border-accent mono-text" style={{
                                    padding: '0.8rem 1.5rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '30px',
                                    textDecoration: 'none',
                                    color: 'var(--text-primary)',
                                    transition: 'all 0.3s',
                                    fontSize: '0.85rem'
                                }}>
                                    Explore Product →
                                </a>
                            </div>
                        </AnimatedItem>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};
