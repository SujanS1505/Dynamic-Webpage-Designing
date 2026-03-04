import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Clock, Calendar, Tag as TagIcon, Search, ChevronRight } from 'lucide-react';
import { PageLayout, PageHero, FadeIn, Sec, SectionHead, Wrap, Tag } from './PageLayout';

/* ─── Blog Data ─────────────────────────────────────────────── */
const FEATURED = {
    date: 'Feb 2026',
    readTime: '8 min read',
    tag: 'Generative AI',
    tagColor: '#00e5ff',
    title: 'Building Responsible Generative AI for the Enterprise',
    desc: 'A framework for encapsulating ethical guardrails, bias detection, and explainability into production LLM systems. How Centillion Labs approaches GenAI deployment without compromising on governance, auditability, or end-user trust.',
    author: 'Centillion Labs Team',
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&auto=format&fit=crop&q=80',
};

const ARTICLES = [
    {
        date: 'Jan 2026', readTime: '6 min read', tag: 'Data Engineering', tagColor: '#00bcd4',
        title: 'Data Mesh in 2026: From Theory to Production',
        desc: 'Lessons learned from deploying decentralised data ownership across five enterprise business units on Databricks. Governance, discovery, and the hidden ops cost nobody talks about.',
        author: 'Data Engineering Team',
    },
    {
        date: 'Dec 2025', readTime: '5 min read', tag: 'FinOps', tagColor: '#7c4dff',
        title: 'The Hidden Costs of Ignoring FinOps',
        desc: 'How engineering teams can bridge the gap between cloud infrastructure and finance using automated observability, tagging enforcement, and anomaly detection on AWS Cost Explorer.',
        author: 'Cloud Architecture Team',
    },
    {
        date: 'Nov 2025', readTime: '7 min read', tag: 'MLOps', tagColor: '#00e5ff',
        title: 'MLOps Pipelines That Actually Scale',
        desc: 'Moving beyond notebooks — a practical guide to feature stores, model registries, and automated retraining workflows using Kubeflow and MLflow in production.',
        author: 'ML Platform Team',
    },
    {
        date: 'Nov 2025', readTime: '4 min read', tag: 'Security', tagColor: '#ff6b6b',
        title: 'Red Team Exercises for AI Systems: What We Learned',
        desc: 'Six months of adversarial testing against production LLMs revealed attack surfaces most teams overlook. Prompt injection, model inversion, and data leakage in RAG pipelines.',
        author: 'Red Team',
    },
    {
        date: 'Oct 2025', readTime: '9 min read', tag: 'Architecture', tagColor: '#00bcd4',
        title: 'Designing Multi-Modal AI Architectures at Scale',
        desc: 'How to unify vision, language, and tabular models under a single inference API — patterns, pitfalls, and latency trade-offs from real deployments across retail and finance.',
        author: 'AI Architecture Team',
    },
    {
        date: 'Sep 2025', readTime: '5 min read', tag: 'Data Governance', tagColor: '#7c4dff',
        title: 'Data Ontology as a Competitive Moat',
        desc: 'Why the companies winning at AI are the ones investing in formal ontologies, knowledge graphs, and semantic layers — not just dumping data into vector databases.',
        author: 'Data Governance Team',
    },
];

const CATEGORIES = ['All', 'Generative AI', 'Data Engineering', 'MLOps', 'Architecture', 'Security', 'FinOps', 'Data Governance'];

const INSIGHTS = [
    { num: '47+', label: 'Articles Published' },
    { num: '12K+', label: 'Monthly Readers' },
    { num: '8', label: 'Topic Categories' },
    { num: '2020', label: 'Writing Since' },
];

/* ─── Sub-components ─────────────────────────────────────────── */
function FeaturedCard({ post }: Readonly<{ post: typeof FEATURED }>) {
    return (
        <FadeIn>
            <motion.article
                className="glass-panel"
                whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(0,229,255,0.1)' }}
                style={{
                    borderRadius: '20px', overflow: 'hidden', cursor: 'pointer',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
                    position: 'relative',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
            >
                {/* Image */}
                <div style={{ position: 'relative', overflow: 'hidden', minHeight: '280px' }}>
                    <img
                        src={post.img}
                        alt={post.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(135deg, rgba(0,0,0,0.2), rgba(0,229,255,0.05))',
                    }} />
                    {/* Featured badge */}
                    <div style={{
                        position: 'absolute', top: '1.2rem', left: '1.2rem',
                        background: 'rgba(0,229,255,0.15)',
                        border: '1px solid rgba(0,229,255,0.4)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '20px', padding: '0.3rem 0.9rem',
                    }}>
                        <span className="mono-text" style={{ fontSize: '0.7rem', letterSpacing: '0.14em', color: '#00e5ff' }}>
                            ★ FEATURED
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div style={{ padding: 'clamp(2rem,4vw,3rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                        <Tag label={post.tag} color={post.tagColor} />
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                            <Calendar size={12} /> {post.date}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                            <Clock size={12} /> {post.readTime}
                        </span>
                    </div>

                    <h2 style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: '1rem' }}>
                        {post.title}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300, marginBottom: '2rem', flexGrow: 1 }}>
                        {post.desc}
                    </p>

                    <motion.span
                        className="mono-text"
                        style={{
                            color: 'var(--accent-primary)', fontSize: '0.85rem',
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                        }}
                        whileHover={{ gap: '0.9rem' }}
                    >
                        Read Article <ArrowUpRight size={14} />
                    </motion.span>
                </div>
            </motion.article>
        </FadeIn>
    );
}

function ArticleCard({ article, delay = 0 }: Readonly<{ article: typeof ARTICLES[0]; delay?: number }>) {
    return (
        <FadeIn delay={delay}>
            <motion.article
                className="glass-panel"
                whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(0,229,255,0.1)' }}
                style={{
                    padding: '2rem', borderRadius: '16px', cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', height: '100%',
                    transition: 'border-color 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = article.tagColor)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '')}
            >
                {/* Top accent line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay }}
                    style={{
                        height: '2px',
                        background: `linear-gradient(90deg, ${article.tagColor}, transparent)`,
                        borderRadius: '2px',
                        marginBottom: '1.5rem',
                        transformOrigin: 'left',
                    }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <Tag label={article.tag} color={article.tagColor} />
                    <span className="mono-text" style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{article.date}</span>
                </div>

                <h3 style={{ fontSize: 'clamp(1rem, 1.6vw, 1.25rem)', fontWeight: 400, color: 'var(--text-primary)', lineHeight: 1.4, marginBottom: '0.9rem', flexGrow: 1 }}>
                    {article.title}
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, fontWeight: 300, marginBottom: '1.5rem' }}>
                    {article.desc}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                        <Clock size={11} /> {article.readTime}
                    </span>
                    <motion.span
                        className="mono-text"
                        style={{ color: article.tagColor, fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                        whileHover={{ gap: '0.7rem' }}
                    >
                        Read <ChevronRight size={13} />
                    </motion.span>
                </div>
            </motion.article>
        </FadeIn>
    );
}

/* ─── Page ───────────────────────────────────────────────────── */
export const BlogPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredArticles = ARTICLES.filter(a => {
        const matchesCategory = activeCategory === 'All' || a.tag === activeCategory;
        const matchesSearch = searchQuery === '' ||
            a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <PageLayout backLabel="Blog">
            <PageHero
                tag="// INSIGHTS & BLOG"
                headline={"Ideas Worth\nSharing."}
                sub="Deep dives, engineering notes, and perspectives from the Centillion Labs team — covering AI, data engineering, cloud architecture, and beyond."
            />

            {/* Stats */}
            <Sec pad="0 clamp(1.5rem,6vw,3rem) clamp(2rem,4vw,4rem)">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.2rem' }}>
                    {INSIGHTS.map((s, i) => (
                        <FadeIn key={s.label} delay={i * 0.06}>
                            <motion.div
                                whileHover={{ y: -4, boxShadow: '0 12px 36px rgba(0,229,255,0.12)' }}
                                className="glass-panel card-pad"
                                style={{ textAlign: 'center', borderRadius: '14px', position: 'relative', overflow: 'hidden' }}
                            >
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--accent-primary), transparent)' }} />
                                <div style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 200, color: 'var(--accent-primary)', lineHeight: 1, marginBottom: '0.4rem' }}>{s.num}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 300, letterSpacing: '0.05em' }}>{s.label}</div>
                            </motion.div>
                        </FadeIn>
                    ))}
                </div>
            </Sec>

            {/* Featured post */}
            <Sec>
                <SectionHead tag="// FEATURED" headline="Editor's Pick." />
                <FeaturedCard post={FEATURED} />
            </Sec>

            {/* Search + Filter */}
            <Sec pad="0 clamp(1.5rem,6vw,3rem) clamp(2rem,4vw,3rem)">
                <Wrap>
                    <FadeIn>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '2rem' }}>
                            {/* Search */}
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '0.6rem',
                                background: 'var(--card-bg, rgba(255,255,255,0.04))',
                                border: '1px solid var(--border-color)', borderRadius: '10px',
                                padding: '0.6rem 1rem', flexGrow: 1, maxWidth: '320px',
                            }}>
                                <Search size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                                <input
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="Search articles…"
                                    style={{
                                        background: 'none', border: 'none', outline: 'none',
                                        color: 'var(--text-primary)', fontSize: '0.875rem',
                                        width: '100%', fontFamily: 'inherit',
                                    }}
                                />
                            </div>

                            {/* Category chips */}
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {CATEGORIES.map(cat => (
                                    <motion.button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.96 }}
                                        style={{
                                            padding: '0.4rem 1rem', borderRadius: '20px', cursor: 'pointer',
                                            fontSize: '0.78rem', fontWeight: 500, fontFamily: 'inherit',
                                            border: '1px solid',
                                            borderColor: activeCategory === cat ? 'var(--accent-primary)' : 'var(--border-color)',
                                            background: activeCategory === cat ? 'rgba(0,229,255,0.1)' : 'transparent',
                                            color: activeCategory === cat ? 'var(--accent-primary)' : 'var(--text-secondary)',
                                            transition: 'all 0.2s',
                                        }}
                                    >
                                        {cat}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </FadeIn>
                </Wrap>
            </Sec>

            {/* Article grid */}
            <Sec pad="0 clamp(1.5rem,6vw,3rem) clamp(4rem,8vw,8rem)">
                <SectionHead
                    tag="// ALL ARTICLES"
                    headline="Latest Thinking."
                    sub="Engineering insights, architecture decisions, and real-world lessons from the field."
                />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory + searchQuery}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
                            gap: '1.5rem',
                        }}
                    >
                        {filteredArticles.length > 0 ? (
                            filteredArticles.map((article, idx) => (
                                <ArticleCard key={article.title} article={article} delay={idx * 0.06} />
                            ))
                        ) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                                <TagIcon size={32} style={{ marginBottom: '1rem', opacity: 0.35 }} />
                                <p style={{ fontWeight: 300 }}>No articles found for <strong>"{searchQuery || activeCategory}"</strong></p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </Sec>

            {/* Newsletter CTA */}
            <Sec>
                <FadeIn>
                    <div
                        className="glass-panel"
                        style={{
                            padding: 'clamp(2.5rem,6vw,5rem)',
                            borderRadius: '24px',
                            textAlign: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Background glow */}
                        <div style={{
                            position: 'absolute', inset: 0, pointerEvents: 'none',
                            background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,229,255,0.05) 0%, transparent 70%)',
                        }} />

                        <div className="mono-text" style={{ fontSize: '0.72rem', letterSpacing: '0.22em', color: 'var(--accent-primary)', marginBottom: '1rem' }}>
                            {'// STAY UPDATED'}
                        </div>
                        <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.5rem)', fontWeight: 200, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: '1rem' }}>
                            Get insights in your inbox.
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.8, maxWidth: '480px', margin: '0 auto 2.5rem' }}>
                            We publish new articles on AI, data engineering, and cloud architecture every two weeks. No noise, no spam — just engineering that matters.
                        </p>

                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                style={{
                                    padding: '0.75rem 1.25rem', borderRadius: '10px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid var(--border-color)',
                                    color: 'var(--text-primary)', fontSize: '0.9rem',
                                    outline: 'none', fontFamily: 'inherit',
                                    minWidth: '220px',
                                }}
                                onFocus={e => (e.target.style.borderColor = 'var(--accent-primary)')}
                                onBlur={e => (e.target.style.borderColor = '')}
                            />
                            <motion.button
                                whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(0,229,255,0.25)' }}
                                whileTap={{ scale: 0.97 }}
                                style={{
                                    padding: '0.75rem 1.75rem', borderRadius: '10px',
                                    background: 'rgba(0,229,255,0.1)',
                                    border: '1px solid var(--accent-primary)',
                                    color: 'var(--accent-primary)', cursor: 'pointer',
                                    fontSize: '0.82rem', fontWeight: 500,
                                    letterSpacing: '0.08em', fontFamily: 'inherit',
                                }}
                            >
                                SUBSCRIBE ↗
                            </motion.button>
                        </div>
                    </div>
                </FadeIn>
            </Sec>
        </PageLayout>
    );
};
