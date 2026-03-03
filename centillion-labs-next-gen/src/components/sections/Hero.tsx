import React from 'react';
import { motion } from 'framer-motion';

const PARTNERS = [
    { name: 'AWS', img: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg', height: 40 },
    { name: 'Google Cloud', img: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg', height: 40 },
    { name: 'Databricks', img: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Databricks_Logo.png', height: 35 },
    { name: 'Azure', img: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg', height: 35 }
];

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
                overflow: 'hidden'
            }}
        >
            <div style={{ textAlign: 'center', maxWidth: '1000px', zIndex: 10, padding: '0 2rem' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: '1rem' }}
                >
                    <span className="mono-text" style={{
                        fontSize: '0.9rem',
                        color: 'var(--accent-primary)',
                        letterSpacing: '0.3em',
                        display: 'block',
                        marginBottom: '1rem'
                    }}>
                        AI ONTOLOGY COMPANY
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        fontSize: 'clamp(3rem, 8vw, 6rem)',
                        fontWeight: 200,
                        lineHeight: 1.1,
                        marginBottom: '1.5rem',
                        letterSpacing: '-0.04em',
                        color: 'var(--text-primary)'
                    }}
                >
                    AI Ontologists, <br />
                    <span style={{ color: 'var(--accent-primary)' }}>Data Ethicists</span> & Architects
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        fontSize: '1.25rem',
                        fontWeight: 300,
                        color: 'var(--text-secondary)',
                        maxWidth: '800px',
                        margin: '0 auto 3rem',
                        lineHeight: 1.6,
                        letterSpacing: '0.01em'
                    }}
                >
                    Cloud-native experts and democratized AI providers focused on leveraging cloud for optimal business outcomes. Start your generative AI journey today with Centillion.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '2rem'
                    }}
                >
                    <div className="hero-cta-row" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <a href="#contact" className="glass-panel" style={{
                            padding: '1rem 2.5rem',
                            textDecoration: 'none',
                            color: 'var(--text-primary)',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            borderRadius: '100px',
                            transition: 'all 0.3s ease',
                            border: '1px solid var(--accent-primary)'
                        }}>
                            Get Started
                        </a>
                        <a href="#services" style={{
                            padding: '1rem 2.5rem',
                            textDecoration: 'none',
                            color: 'var(--text-secondary)',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            transition: 'all 0.3s ease'
                        }}>
                            Learn More →
                        </a>
                    </div>

                    <div style={{ marginTop: '5rem', width: '100%' }}>
                        <p className="mono-text" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '2rem', letterSpacing: '0.2em' }}>
                            TRUSTED BY INDUSTRY LEADERS
                        </p>
                        <div className="hero-partner-row" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '3.5rem',
                            flexWrap: 'wrap',
                            opacity: 0.85
                        }}>
                            {PARTNERS.map(partner => (
                                <img
                                    key={partner.name}
                                    src={partner.img}
                                    alt={partner.name}
                                    style={{
                                        height: partner.height + 'px',
                                        objectFit: 'contain',
                                        filter: 'drop-shadow(0px 0px 4px rgba(255,255,255,0.4))', // Helps visibility on dark mode without changing colors
                                        transition: 'transform 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

