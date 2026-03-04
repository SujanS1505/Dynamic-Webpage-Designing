import React from 'react';
import { AnimatedSection, AnimatedItem } from '../layout/AnimatedSection';

const TECHNOLOGIES = [
    { name: 'AWS', img: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
    { name: 'GCP', img: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg' },
    { name: 'Azure', img: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg' },
    { name: 'Databricks', img: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Databricks_Logo.png' },
    { name: 'LangChain', img: 'https://avatars.githubusercontent.com/u/126733545?s=96&v=4' },
    { name: 'Terraform', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg' },
    { name: 'Vertex AI', img: 'https://www.gstatic.com/images/branding/product/2x/vertex_ai_48dp.png' },
    { name: 'Scala', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scala/scala-original.svg' },
    { name: 'Go', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg' },
    { name: 'Bedrock AI', img: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
    { name: 'Palantir', img: 'https://logo.clearbit.com/palantir.com' },
    { name: 'Spark', img: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Apache_Spark_logo.svg' },
    { name: 'Kafka', img: 'https://cdn.simpleicons.org/apachekafka/white' },
    { name: 'MLflow', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' }, // generic ML fallback
    { name: 'Python', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
    { name: 'PyTorch', img: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg' }
];

export const Tech: React.FC = () => {
    return (
        <AnimatedSection id="tech" className="section-padding">
            <div className="sec-sm">
                <AnimatedItem>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        Ecosystem.
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', fontWeight: 300, marginBottom: '4rem' }}>
                        The modern AI and cloud stack we work with every day.
                    </p>
                </AnimatedItem>

                <div className="glass-panel" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(180px, 100%), 1fr))',
                    gap: '2rem',
                    padding: '2.5rem'
                }}>
                    {TECHNOLOGIES.map((tech, idx) => (
                        <AnimatedItem key={tech.name} delay={0.02 * idx}>
                            <div
                                style={{
                                    padding: '1.2rem 0',
                                    fontSize: '1.1rem',
                                    fontWeight: 400,
                                    borderBottom: '1px solid var(--border-color)',
                                    color: 'var(--text-primary)',
                                    transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    cursor: 'default'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                                    e.currentTarget.style.color = 'var(--accent-primary)';
                                    e.currentTarget.style.paddingLeft = '1rem';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--border-color)';
                                    e.currentTarget.style.color = 'var(--text-primary)';
                                    e.currentTarget.style.paddingLeft = '0';
                                }}
                            >
                                <img
                                    src={tech.img}
                                    alt={tech.name}
                                    style={{
                                        width: '24px',
                                        height: '24px',
                                        objectFit: 'contain',
                                        filter: 'drop-shadow(0px 0px 2px rgba(255,255,255,0.2))'
                                    }}
                                    onError={(e) => {
                                        const el = e.currentTarget;
                                        el.style.display = 'none';
                                        const placeholder = document.createElement('span');
                                        placeholder.textContent = tech.name.charAt(0);
                                        placeholder.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:6px;background:rgba(0,229,255,0.12);border:1px solid rgba(0,229,255,0.25);color:var(--accent-primary);font-size:0.75rem;font-weight:600;flex-shrink:0;';
                                        el.parentNode?.insertBefore(placeholder, el);
                                    }}
                                />
                                {tech.name}
                            </div>
                        </AnimatedItem>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};
