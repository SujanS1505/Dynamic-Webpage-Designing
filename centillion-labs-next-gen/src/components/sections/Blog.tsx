import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';

const ARTICLES = [
    { date: 'Feb 2026', tag: 'Generative AI', title: 'Building Responsible Generative AI for the Enterprise', desc: 'A framework for encapsulating ethical guardrails, bias detection, and explainability into production LLM systems.' },
    { date: 'Jan 2026', tag: 'Data Engineering', title: 'Data Mesh in 2026: From Theory to Production', desc: 'Lessons learned from deploying decentralized data ownership across five enterprise business units on Databricks.' },
    { date: 'Dec 2025', tag: 'FinOps', title: 'The Hidden Costs of Ignoring FinOps', desc: 'How engineering teams can bridge the gap between cloud infrastructure and finance using automated observability.' }
];

export const Blog: React.FC = () => {
    const navigate = useNavigate();

    return (
        <AnimatedSection id="blog">
            <div className="sec-sm">
                <AnimatedItem>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 200, color: 'var(--text-primary)' }}>
                            Insights.
                        </h2>
                        <button
                            onClick={() => navigate('/blog')}
                            className="mono-text"
                            style={{
                                background: 'none', border: '1px solid var(--border-color)',
                                borderRadius: '8px', padding: '0.5rem 1.2rem',
                                color: 'var(--accent-primary)', cursor: 'pointer',
                                fontSize: '0.78rem', letterSpacing: '0.1em',
                                transition: 'border-color 0.2s, background 0.2s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.background = 'rgba(0,229,255,0.06)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.background = 'none'; }}
                        >
                            VIEW ALL ↗
                        </button>
                    </div>
                </AnimatedItem>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
                    gap: '2rem'
                }}>
                    {ARTICLES.map((article, idx) => (
                        <AnimatedItem key={article.title} delay={0.1 * idx}>
                            <button
                                className="glass-panel"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                    width: '100%',
                                    padding: '2.5rem',
                                    cursor: 'pointer',
                                    transition: 'border-color 0.3s',
                                    textAlign: 'left',
                                    background: 'none',
                                    fontFamily: 'inherit',
                                }}
                                onClick={() => navigate('/blog')}
                                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-primary)')}
                                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                    <span className="mono-text" style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{article.date}</span>
                                    <span className="mono-text" style={{ color: 'var(--accent-primary)', fontSize: '0.8rem' }}>{article.tag}</span>
                                </div>

                                <h3 style={{ fontSize: '1.6rem', fontWeight: 300, marginBottom: '1rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>{article.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontWeight: 300, flexGrow: 1, marginBottom: '2rem' }}>{article.desc}</p>

                                <span className="mono-text hover-text-accent" style={{
                                    color: 'var(--accent-primary)',
                                    fontSize: '0.85rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    transition: 'color 0.3s'
                                }}>
                                    Read ↗
                                </span>
                            </button>
                        </AnimatedItem>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};
