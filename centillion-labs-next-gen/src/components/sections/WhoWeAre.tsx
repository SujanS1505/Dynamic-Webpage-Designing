import React, { useState } from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';

/* ─── Data ─────────────────────────────────────────────────── */

const COLLECTIVE_ITEMS = [
    'Over the years, our core team has amassed a wealth of experience, aiding countless clients in migrating to the realms of AWS, GCP, and Azure.',
    'Data Observability specialists to identify code, configuration, schema, data, metadata, technology drift in application, data, control and infrastructure plane.',
    'Developed custom solutions that harness the capabilities of ML and AI to address specific challenges.',
];

const DATA_DRIVEN_ITEMS = [
    {
        title: 'Terraform',
        desc: 'IaC code experts — Terraform experts in Terraform design and development.',
    },
    {
        title: 'Edge AI',
        desc: 'Featuring Micro Models. Sensor fusion. Continuous delivery. Autonomous decision-making. Anywhere deployment.',
    },
    {
        title: 'Palantir Consultants',
        desc: 'Our consultants are highly experienced in Palantir Foundry, Workshop, Quiver, Contour, Repository, Pyspark, Scala.',
    },
    {
        title: 'Data Clean Room',
        desc: 'Architects in Centillion adopt Data Clean Room Architecture for all the marketing needs of the customer.',
    },
    {
        title: 'Data Team as Service',
        desc: 'Fill talent gaps at any level of your organization and get ongoing support from our highly specialized team of data experts, including CDOs, CTOs, data engineers, data architects, project managers, and business analysts.',
    },
];



/* ─── Sub-components ────────────────────────────────────────── */

const CheckItem: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => (
    <AnimatedItem delay={delay}>
        <div style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start', marginBottom: '1.1rem' }}>
            <span style={{
                color: 'var(--accent-primary)',
                fontSize: '1rem',
                marginTop: '0.15rem',
                flexShrink: 0,
                filter: 'drop-shadow(0 0 6px var(--accent-primary))',
            }}>✓</span>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 300, lineHeight: 1.65, margin: 0 }}>
                {text}
            </p>
        </div>
    </AnimatedItem>
);

const SectionDivider = () => (
    <div style={{
        width: '100%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(99,179,237,0.25), transparent)',
        margin: 'clamp(2.5rem, 6vw, 5rem) 0',
    }} />
);

/* ─── Photo placeholder ──────────────────────────────────────── */
const PhotoPlaceholder: React.FC<{ label?: string; minHeight?: string }> = ({
    label = 'Photo coming soon',
    minHeight = '320px',
}) => (
    <div style={{
        minHeight,
        borderRadius: '1rem',
        border: '1px dashed rgba(255,255,255,0.15)',
        background: 'rgba(255,255,255,0.02)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        color: 'rgba(255,255,255,0.2)',
    }}>
        {/* simple image-frame icon drawn with pure CSS */}
        <div style={{
            width: '2.5rem',
            height: '2.5rem',
            border: '2px solid rgba(255,255,255,0.15)',
            borderRadius: '0.4rem',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div style={{
                width: '1rem',
                height: '0.7rem',
                border: '1.5px solid rgba(255,255,255,0.2)',
                borderRadius: '50%',
                position: 'absolute',
                top: '0.35rem',
                left: '0.35rem',
            }} />
            <div style={{
                position: 'absolute',
                bottom: '0.3rem',
                left: 0,
                right: 0,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                gap: 0,
            }}>
                {[0.6, 1, 0.75, 0.9, 0.5].map((h, i) => (
                    <div key={i} style={{
                        width: '0.3rem',
                        height: `${h * 0.7}rem`,
                        background: 'rgba(255,255,255,0.15)',
                        margin: '0 1px',
                        borderRadius: '1px 1px 0 0',
                    }} />
                ))}
            </div>
        </div>
        <span style={{ fontSize: '0.72rem', letterSpacing: '0.1em', fontFamily: 'monospace' }}>
            {label}
        </span>
    </div>
);

/* ─── Accordion item for Data-Driven section ─────────────────── */
const AccordionItem: React.FC<{ title: string; desc: string; index: number }> = ({ title, desc, index }) => {
    const [open, setOpen] = useState(false);
    return (
        <AnimatedItem delay={0.08 * index}>
            <div style={{
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                paddingBottom: '0.1rem',
                marginBottom: '0.1rem',
            }}>
                <button
                    onClick={() => setOpen(o => !o)}
                    style={{
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1.1rem 0',
                        gap: '1rem',
                    }}
                >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{
                            color: 'var(--accent-primary)',
                            fontSize: '0.85rem',
                            filter: 'drop-shadow(0 0 5px var(--accent-primary))',
                        }}>✓</span>
                        <span style={{
                            color: 'var(--text-primary)',
                            fontSize: '1.05rem',
                            fontWeight: 400,
                            letterSpacing: '0.01em',
                        }}>{title}</span>
                    </span>
                    <span style={{
                        color: 'var(--accent-primary)',
                        fontSize: '1.1rem',
                        transition: 'transform 0.3s ease',
                        display: 'inline-block',
                        transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}>+</span>
                </button>
                <div style={{
                    maxHeight: open ? '200px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.35s ease',
                }}>
                    <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.95rem',
                        fontWeight: 300,
                        lineHeight: 1.7,
                        padding: '0 0 1.2rem 2rem',
                        margin: 0,
                    }}>{desc}</p>
                </div>
            </div>
        </AnimatedItem>
    );
};

/* ─── Main Component ─────────────────────────────────────────── */

export const WhoWeAre: React.FC = () => {
    return (
        <AnimatedSection id="who-we-are">
            <div className="sec">
                {/* ── Header ── */}
                <AnimatedItem>
                    <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 7vw, 6rem)' }}>
                        <p className="mono-text" style={{
                            color: 'var(--accent-primary)',
                            letterSpacing: '0.2em',
                            fontSize: '0.8rem',
                            marginBottom: '1.2rem',
                        }}>
                            CENTILLION IDENTITY
                        </p>
                        <h2 style={{
                            fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
                            fontWeight: 200,
                            letterSpacing: '-0.02em',
                            lineHeight: 1.1,
                            color: 'var(--text-primary)',
                        }}>
                            Who Are We
                        </h2>
                        <div style={{
                            width: '3rem',
                            height: '2px',
                            background: 'var(--accent-primary)',
                            margin: '1.5rem auto',
                            boxShadow: '0 0 12px var(--accent-primary)',
                        }} />
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '1.15rem',
                            fontWeight: 300,
                            letterSpacing: '0.05em',
                        }}>
                            Visionaries.&nbsp; Technology Leaders.&nbsp; Devoted Architects.&nbsp; Advocates of Open Source.
                        </p>
                    </div>
                </AnimatedItem>

                {/* ── Section 1: Collective Expertise ── */}
                <div className="split-grid" style={{ alignItems: 'center', gap: 'clamp(2rem, 5vw, 5rem)' }}>
                    {/* Left: photo placeholder */}
                    <AnimatedItem>
                        <PhotoPlaceholder label="CENTILLION — ROLE BASED ORGANIZATION" minHeight="340px" />
                    </AnimatedItem>

                    {/* Right: bullet points */}
                    <div>
                        <AnimatedItem delay={0.1}>
                            <h3 style={{
                                fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                                fontWeight: 300,
                                color: 'var(--text-primary)',
                                lineHeight: 1.35,
                                marginBottom: '1.8rem',
                            }}>
                                Leverage collective industry expertise to excel in solving &amp; tackling intricate challenges for our valued clients
                            </h3>
                        </AnimatedItem>
                        {COLLECTIVE_ITEMS.map((item, i) => (
                            <CheckItem key={i} text={item} delay={0.15 + i * 0.1} />
                        ))}
                    </div>
                </div>

                <SectionDivider />

                {/* ── Section 2: Generative AI ── */}
                <div className="split-grid" style={{ alignItems: 'center', gap: 'clamp(2rem, 5vw, 5rem)' }}>
                    <div>
                        <AnimatedItem>
                            <h3 style={{
                                fontSize: 'clamp(1.4rem, 2.8vw, 2rem)',
                                fontWeight: 300,
                                color: 'var(--text-primary)',
                                lineHeight: 1.3,
                                marginBottom: '1.2rem',
                            }}>
                                Harness the Potential of Generative AI
                            </h3>
                        </AnimatedItem>
                        <AnimatedItem delay={0.1}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 300, lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                Centillion values and encapsulates <strong style={{ color: 'var(--accent-primary)', fontWeight: 400 }}>ResponsibleAI</strong> and <strong style={{ color: 'var(--accent-primary)', fontWeight: 400 }}>EthicalAI</strong>.
                                Our mission is to create AI applications that enhance user experiences, rather than displacing them. As we advance, our dedication to human supervision, transparency, and open communication with our clients and the broader community remains unwavering.
                            </p>
                        </AnimatedItem>
                        <CheckItem text="Generative AI Workshops &amp; Preparedness" delay={0.2} />
                        <AnimatedItem delay={0.3}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: 300, lineHeight: 1.7, marginTop: '1rem' }}>
                                Seamlessly blend expert guidance &amp; technical proficiency to craft impactful use cases for architecture development, ensuring our clients are well-equipped to embrace revolutionary capabilities of Generative AI solutions.
                            </p>
                        </AnimatedItem>
                    </div>

                    {/* Right: photo placeholder */}
                    <AnimatedItem delay={0.15}>
                        <PhotoPlaceholder label="CENTILLION DATA ARCHITECTURE" minHeight="320px" />
                    </AnimatedItem>
                </div>

                <SectionDivider />

                {/* ── Section 3: Data-Driven Excellence ── */}
                <div className="split-grid" style={{ alignItems: 'center', gap: 'clamp(2rem, 5vw, 5rem)' }}>
                    {/* Left: photo placeholder */}
                    <AnimatedItem>
                        <PhotoPlaceholder label="PARTNER ECOSYSTEM" minHeight="320px" />
                    </AnimatedItem>

                    {/* Right: accordion */}
                    <div>
                        <AnimatedItem>
                            <h3 style={{
                                fontSize: 'clamp(1.4rem, 2.8vw, 2rem)',
                                fontWeight: 300,
                                color: 'var(--text-primary)',
                                lineHeight: 1.3,
                                marginBottom: '2rem',
                            }}>
                                Data-driven Excellence with Centillion
                            </h3>
                        </AnimatedItem>
                        {DATA_DRIVEN_ITEMS.map((item, i) => (
                            <AccordionItem key={item.title} title={item.title} desc={item.desc} index={i} />
                        ))}
                    </div>
                </div>


            </div>
        </AnimatedSection>
    );
};
