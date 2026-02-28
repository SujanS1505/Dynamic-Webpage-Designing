import React from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';
import { motion } from 'framer-motion';

const ARTICLES = [
    { date: 'Feb 2026', tag: 'AI', title: 'Building Responsible Generative AI for the Enterprise', desc: 'A framework for encapsulating ethical guardrails, bias detection, and explainability into production LLM systems.' },
    { date: 'Jan 2026', tag: 'Data', title: 'Data Mesh in 2026: From Theory to Production', desc: 'Lessons learned from deploying decentralized data ownership across five enterprise business units on Databricks.' },
    { date: 'Dec 2025', tag: 'Cloud', title: 'The Hidden Costs of Ignoring FinOps', desc: 'How engineering teams can bridge the gap between cloud infrastructure and finance using automated observability.' }
];

export const Blog: React.FC = () => {
    return (
        <AnimatedSection id="blog">
            <div style={{ padding: '6rem 0', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 className="mono-text" style={{ color: 'var(--accent-primary)', marginBottom: '1rem', fontSize: '1.2rem', textAlign: 'center' }}>09 INSIGHTS</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '4rem', textAlign: 'center' }}>
                    Thinking and writing at the intersection of AI, data, and cloud engineering.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '2.5rem'
                }}>
                    {ARTICLES.map((article, idx) => (
                        <AnimatedItem key={article.title} delay={0.1 * idx}>
                            <motion.article
                                whileHover={{ y: -8 }}
                                className="glass-panel"
                                style={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border-color)',
                                    overflow: 'hidden'
                                }}
                            >
                                <div style={{
                                    padding: '1.5rem',
                                    borderBottom: '1px solid var(--border-color)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <span className="mono-text" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{article.date}</span>
                                    <span className="mono-text" style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 600 }}>{article.tag}</span>
                                </div>

                                <div style={{ padding: '2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>{article.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, flexGrow: 1, marginBottom: '2rem' }}>{article.desc}</p>

                                    <a href="#" className="hover-text-accent" style={{
                                        color: 'var(--text-primary)',
                                        textDecoration: 'none',
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        transition: 'color 0.3s'
                                    }}>
                                        Read More <span>→</span>
                                    </a>
                                </div>
                            </motion.article>
                        </AnimatedItem>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};
