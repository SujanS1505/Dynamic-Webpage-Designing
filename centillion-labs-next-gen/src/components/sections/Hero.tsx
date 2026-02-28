import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
    return (
        <section
            id="home"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                paddingTop: '6rem' // account for nav
            }}
        >
            <div style={{ textAlign: 'center', maxWidth: '800px', zIndex: 10 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span
                        className="mono-text"
                        style={{
                            color: 'var(--accent-primary)',
                            fontSize: '0.9rem',
                            letterSpacing: '0.2em',
                            display: 'block',
                            marginBottom: '1.5rem'
                        }}
                    >
                        AI ENGINEERING & ENTERPRISE SOLUTIONS
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        marginBottom: '2rem',
                        letterSpacing: '-0.03em'
                    }}
                >
                    I build intelligence that stays <br />
                    <span style={{ color: 'var(--accent-secondary)' }}>where it belongs.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    style={{
                        fontSize: '1.1rem',
                        color: 'var(--text-secondary)',
                        maxWidth: '600px',
                        margin: '0 auto 3rem',
                        lineHeight: 1.8
                    }}
                >
                    Deploying world-class AI solutions, data engineering, and FinOps platforms natively into your proprietary cloud infrastructure.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}
                >
                    <a href="#services" style={{
                        background: 'var(--accent-primary)',
                        color: 'var(--bg-dark)',
                        padding: '1rem 2rem',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        fontWeight: 700,
                        fontSize: '0.9rem'
                    }} className="mono-text">
                        EXPLORE PLATFORMS
                    </a>
                    <a href="#case-studies" style={{
                        background: 'transparent',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        padding: '1rem 2rem',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        transition: 'border-color 0.3s'
                    }} className="mono-text hover-border-accent">
                        VIEW CASE STUDIES
                    </a>
                </motion.div>
            </div>
        </section>
    );
};
