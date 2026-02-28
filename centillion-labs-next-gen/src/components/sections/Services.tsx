import React from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';
import { motion } from 'framer-motion';

const SERVICES = [
    {
        id: 'SRV-001',
        title: 'Generative AI Workshops',
        desc: 'Seamlessly blend expert guidance & technical proficiency to craft impactful use cases for architecture development, ensuring clients are well-equipped to embrace revolutionary capabilities.'
    },
    {
        id: 'SRV-002',
        title: 'Data-driven Excellence',
        desc: 'Terraform experts in IaC. Edge AI with Micro Models and Sensor fusion. Palantir Consultants. Data Clean Room Architecture. Data Team as a Service.'
    },
    {
        id: 'SRV-003',
        title: 'FinOps',
        desc: 'Get a comprehensive overview of your Databricks usage. Effectively monitor, analyze, and optimize performance while reducing costs. Bridge gaps between engineering and finance.'
    },
    {
        id: 'SRV-004',
        title: 'Databricks Mesh',
        desc: 'Accelerate Data Mesh adoption with Databricks. Leverage cutting-edge accelerators to implement decentralized data ownership, empowering teams to manage data as a product.'
    }
];

export const Services: React.FC = () => {
    return (
        <AnimatedSection id="services">
            <div style={{ padding: '6rem 0', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 className="mono-text" style={{ color: 'var(--accent-primary)', marginBottom: '3rem', fontSize: '1.2rem' }}>02 SERVICES</h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {SERVICES.map((srv, idx) => (
                        <AnimatedItem key={srv.id} delay={0.1 * idx}>
                            <motion.div
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="glass-panel"
                                style={{
                                    padding: '2rem',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    cursor: 'pointer',
                                    borderTop: '3px solid var(--accent-primary)'
                                }}
                            >
                                <span className="mono-text" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1rem' }}>[{srv.id}]</span>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{srv.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, flexGrow: 1 }}>{srv.desc}</p>
                            </motion.div>
                        </AnimatedItem>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};
