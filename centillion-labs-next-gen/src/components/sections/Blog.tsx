import React from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';

const ARTICLES = [
    { date: 'Feb 2026', tag: 'AI', title: 'Building Responsible Generative AI for the Enterprise', desc: 'A framework for encapsulating ethical guardrails, bias detection, and explainability into production LLM systems.' },
    { date: 'Jan 2026', tag: 'Data', title: 'Data Mesh in 2026: From Theory to Production', desc: 'Lessons learned from deploying decentralized data ownership across five enterprise business units on Databricks.' },
    { date: 'Dec 2025', tag: 'Cloud', title: 'The Hidden Costs of Ignoring FinOps', desc: 'How engineering teams can bridge the gap between cloud infrastructure and finance using automated observability.' }
];

export const Blog: React.FC = () => {
    return (
        <AnimatedSection id="blog">
            <div style={{ padding: '6rem 0', maxWidth: '1200px', margin: '0 auto', marginBottom: '8rem' }}>
                <AnimatedItem>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '4rem' }}>
                        Insights.
                    </h2>
                </AnimatedItem>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '4rem'
                }}>
                    {ARTICLES.map((article, idx) => (
                        <AnimatedItem key={article.title} delay={0.1 * idx}>
                            <article
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    borderTop: '1px solid var(--border-color)',
                                    paddingTop: '2rem',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-primary)')}
                                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                    <span className="mono-text" style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{article.date}</span>
                                    <span className="mono-text" style={{ color: 'var(--text-primary)', fontSize: '0.8rem' }}>{article.tag}</span>
                                </div>

                                <h3 style={{ fontSize: '1.6rem', fontWeight: 300, marginBottom: '1rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>{article.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontWeight: 300, flexGrow: 1, marginBottom: '2rem' }}>{article.desc}</p>

                                <span className="mono-text hover-text-accent" style={{
                                    color: 'var(--text-primary)',
                                    fontSize: '0.85rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    transition: 'color 0.3s'
                                }}>
                                    Read ↗
                                </span>
                            </article>
                        </AnimatedItem>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};
