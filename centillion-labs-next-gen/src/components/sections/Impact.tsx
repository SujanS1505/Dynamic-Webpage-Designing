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
            <div style={{ padding: '8rem 0', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '4rem',
                    borderTop: '1px solid var(--border-color)',
                    borderBottom: '1px solid var(--border-color)',
                    padding: '4rem 0'
                }}>
                    {STATS.map((stat, idx) => (
                        <AnimatedItem key={stat.label} delay={0.1 * idx}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                                    fontWeight: 200,
                                    color: 'var(--text-primary)',
                                    lineHeight: 1,
                                    letterSpacing: '-0.04em'
                                }}>
                                    <Counter target={stat.target} />
                                    <span style={{ color: 'var(--accent-primary)' }}>{stat.suffix}</span>
                                </div>
                                <p className="mono-text" style={{
                                    color: 'var(--text-secondary)',
                                    marginTop: '1.5rem',
                                    fontSize: '0.85rem',
                                    letterSpacing: '0.1em'
                                }}>
                                    {stat.label.toUpperCase()}
                                </p>
                            </div>
                        </AnimatedItem>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};
