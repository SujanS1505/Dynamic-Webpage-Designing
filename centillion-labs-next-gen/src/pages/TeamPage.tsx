import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Mail, Code2, Database, Brain, Cloud, BarChart3, Server } from 'lucide-react';
import { PageLayout, PageHero, FadeIn } from './PageLayout';

const TEAM = [
  {
    name: 'Mohanapriya',
    role: 'Co-Founder & Chief Data Scientist',
    specialty: 'ML Engineering · LLMs · Data Architecture',
    bio: 'Leading Centillion\'s AI and machine learning strategy with deep expertise in generative AI, graph neural networks, and enterprise ML platforms. Previously led data science initiatives at top FinTech companies.',
    skills: ['LLM Fine-Tuning', 'MLOps', 'PyTorch', 'Vertex AI', 'Feature Engineering'],
    icon: Brain,
    color: '#00e5ff',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Chinnasamy',
    role: 'Co-Founder & Chief Technology Officer',
    specialty: 'Data Engineering · Cloud · DevOps',
    bio: 'Architect of Centillion\'s most ambitious data platforms. Expert in distributed systems, lakehouse architecture, and scalable cloud-native infrastructure across AWS, GCP, and Azure.',
    skills: ['Apache Spark', 'Kubernetes', 'Terraform', 'Kafka', 'Delta Lake'],
    icon: Cloud,
    color: '#00bcd4',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Arjun Krishnan',
    role: 'Senior Data Engineer',
    specialty: 'Pipelines · Streaming · dbt',
    bio: 'Specializes in real-time data pipelines and transformation layers. Has built petabyte-scale streaming architectures for BFSI clients using Kafka, Flink, and Delta Lake.',
    skills: ['Kafka', 'Apache Flink', 'dbt', 'Airflow', 'BigQuery'],
    icon: Database,
    color: '#26a69a',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Priya Venkatesh',
    role: 'ML Engineer',
    specialty: 'RAG · NLP · Deployment',
    bio: 'Expert in NLP and retrieval-augmented generation. Designed the RAG pipeline that reduced hallucinations by 70% in production banking environments. Passionate about model evaluation and reliability.',
    skills: ['RAG', 'LangChain', 'FAISS', 'Hugging Face', 'FastAPI'],
    icon: Brain,
    color: '#00e5ff',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Ravi Kumar',
    role: 'Backend & DevOps Engineer',
    specialty: 'CI/CD · Kubernetes · IaC',
    bio: 'Infrastructure architect with deep expertise in cloud-native deployments. Has designed zero-downtime deployment pipelines for enterprise Kubernetes workloads across multi-cloud environments.',
    skills: ['Kubernetes', 'Helm', 'GitHub Actions', 'Pulumi', 'Prometheus'],
    icon: Server,
    color: '#0097a7',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Divya Srinivasan',
    role: 'Data Analyst & Visualization Lead',
    specialty: 'Analytics · Dashboards · Insights',
    bio: 'Translates complex data into clear business narratives. Expert in building executive-level dashboards and self-serve analytics platforms that empower non-technical stakeholders.',
    skills: ['Looker', 'Tableau', 'Python', 'dbt', 'BigQuery'],
    icon: BarChart3,
    color: '#26a69a',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Santhosh Raj',
    role: 'AI Platform Engineer',
    specialty: 'LLM APIs · Agents · MLflow',
    bio: 'Builder of intelligent AI agents and LLM-powered applications. Contributed to the Claudius agent framework and Secure AI platform, specializing in prompt engineering and agent orchestration.',
    skills: ['LangGraph', 'OpenAI', 'MLflow', 'Redis', 'Docker'],
    icon: Code2,
    color: '#00bcd4',
    linkedin: 'https://linkedin.com',
  },
];

export const TeamPage: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <PageLayout>
      <PageHero
        tag="// THE TEAM"
        headline={"The Minds\nBehind\nCentillion."}
        sub="A team of engineers, scientists, and architects who bring curiosity, rigor, and craft to every engagement. Meet the people who make impossible data problems solvable."
      />

      {/* Team grid */}
      <section style={{ padding: '0 clamp(1.5rem,8vw,10rem) clamp(3rem,8vw,7rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px,100%), 1fr))', gap: '1.5rem' }}>
          {TEAM.map((member, i) => {
            const Icon = member.icon;
            const isHov = hovered === member.name;
            return (
              <FadeIn key={member.name} delay={i * 0.06}>
                <motion.div
                  onHoverStart={() => setHovered(member.name)}
                  onHoverEnd={() => setHovered(null)}
                  whileHover={{ y: -6, boxShadow: `0 20px 50px ${member.color}20` }}
                  className="glass-panel card-pad"
                  style={{ borderRadius: '18px', border: `1px solid ${isHov ? member.color + '44' : 'var(--border-color)'}`, transition: 'border-color 0.3s', position: 'relative', overflow: 'hidden' }}
                >
                  {/* Decorative gradient top */}
                  <motion.div
                    animate={{ opacity: isHov ? 1 : 0 }}
                    style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                      background: `linear-gradient(90deg, ${member.color}, transparent)`,
                    }}
                  />

                  {/* Avatar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      style={{
                        width: 56, height: 56, borderRadius: '16px', flexShrink: 0,
                        background: `linear-gradient(135deg, ${member.color}22, ${member.color}0a)`,
                        border: `1px solid ${member.color}33`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <Icon size={26} style={{ color: member.color }} />
                    </motion.div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1rem' }}>{member.name}</div>
                      <div style={{ fontSize: '0.8rem', color: member.color, fontWeight: 400, marginTop: '2px' }}>{member.role}</div>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.8rem', letterSpacing: '0.04em' }}>{member.specialty}</div>

                  <AnimatePresence>
                    {isHov && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p style={{ color: 'var(--text-secondary)', fontWeight: 300, fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1rem' }}>{member.bio}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Skills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.2rem' }}>
                    {member.skills.map(s => (
                      <span key={s} style={{
                        background: `${member.color}10`, border: `1px solid ${member.color}25`,
                        color: member.color, fontSize: '0.72rem', padding: '0.2rem 0.6rem', borderRadius: '6px',
                      }}>{s}</span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <motion.a
                      href={member.linkedin} target="_blank" rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      style={{
                        width: 30, height: 30, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: '1px solid var(--border-color)', color: 'var(--text-secondary)', textDecoration: 'none',
                      }}
                    >
                      <Linkedin size={14} />
                    </motion.a>
                    <motion.a
                      href="mailto:connect@centillionlabs.com"
                      whileHover={{ scale: 1.1 }}
                      style={{
                        width: 30, height: 30, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: '1px solid var(--border-color)', color: 'var(--text-secondary)', textDecoration: 'none',
                      }}
                    >
                      <Mail size={14} />
                    </motion.a>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Join CTA */}
      <section style={{ padding: '0 clamp(1.5rem,8vw,10rem) clamp(3rem,8vw,6rem)' }}>
        <FadeIn>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="glass-panel card-pad"
            style={{ borderRadius: '20px', maxWidth: '800px', padding: 'clamp(2rem,5vw,3.5rem)', border: '1px solid rgba(0,229,255,0.15)' }}
          >
            <div className="mono-text" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', marginBottom: '1rem' }}>// JOIN THE TEAM</div>
            <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              We're always looking for exceptional engineers.
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.8, marginBottom: '1.5rem' }}>
              If you're passionate about data, AI, and solving hard problems at enterprise scale — we'd love to hear from you.
            </p>
            <motion.a
              href="mailto:connect@centillionlabs.com"
              whileHover={{ scale: 1.04 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'var(--accent-primary)', color: '#000',
                padding: '0.8rem 1.8rem', borderRadius: '10px',
                fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none',
              }}
            >
              <Mail size={14} />
              GET IN TOUCH
            </motion.a>
          </motion.div>
        </FadeIn>
      </section>
    </PageLayout>
  );
};
