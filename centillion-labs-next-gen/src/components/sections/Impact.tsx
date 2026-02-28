import React, { useEffect, useState, useRef } from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';
import { useInView } from 'framer-motion';

const STATS = [
    { target: 50, suffix: '+', label: 'Clients Served' },
    { target: 12, suffix: '+', label: 'Countries' },
    { target: 100, suffix: 'TB', label: 'Data Processed' },
    { target: 98, suffix: '%', label: 'Client Satisfaction' }
];

const Counter: React.FC<{ target: number }> = ({ target }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const duration = 2000;
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;

            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    setCount(target);
                    clearInterval(timer);
                } else {
                    setCount(Math.ceil(start));
                }
            }, stepTime);

            return () => clearInterval(timer);
        }
    }, [isInView, target]);

    return <span ref={ref}>{count}</span>;
};

export const Impact: React.FC = () => {
    return (
        <AnimatedSection id="stats" className="section-padding">
            <div style={{ padding: '6rem 0', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 className="mono-text" style={{ color: 'var(--accent-primary)', marginBottom: '3rem', fontSize: '1.2rem', textAlign: 'center' }}>04 IMPACT</h2>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                    gap: '3rem'
                }}>
                    {STATS.map((stat, idx) => (
                        <AnimatedItem key={stat.label} delay={0.1 * idx}>
                            <div style={{ textAlign: 'center' }}>
                                <div className="glow-text" style={{
                                    fontSize: '4.5rem',
                                    fontWeight: 800,
                                    color: 'var(--text-primary)',
                                    lineHeight: 1
                                }}>
                                    <Counter target={stat.target} />
                                    <span style={{ color: 'var(--accent-primary)' }}>{stat.suffix}</span>
                                </div>
                                <p className="mono-text" style={{
                                    color: 'var(--text-secondary)',
                                    marginTop: '1rem',
                                    fontSize: '0.9rem',
                                    letterSpacing: '0.1em'
                                }}>
                                    {stat.label}
                                </p>
                            </div>
                        </AnimatedItem>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};
