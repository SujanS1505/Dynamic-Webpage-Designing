import { motion } from 'framer-motion';
import { Bot, Database, Cloud, Server, Cpu, GitBranch, ShieldCheck, BarChart3 } from 'lucide-react';
import { PageLayout, PageHero, FadeIn } from './PageLayout';

const CAPABILITIES = [
  {
    icon: Bot,
    title: 'ARISTOTLEAI — Generative AI Platform',
    desc: 'Seamlessly blend expert guidance & technical proficiency to craft impactful use cases for architecture development. Generative AI Workshops & Preparedness ensure our clients are well-equipped to embrace revolutionary GenAI capabilities.',
    tags: ['GMail Synthesizer', 'Finance LM', 'Retail LM', 'Vertex AI', 'Bedrock AI', 'Home Brewn LLM'],
  },
  {
    icon: Cloud,
    title: 'Cloud Migration & Advisory',
    desc: 'Our core team has amassed a wealth of experience aiding countless clients in migrating to AWS, GCP, and Azure. We maximize your data\'s potential with Databricks and Google Cloud Platform covering Data Integration, Real-time Analytics, and Warehousing.',
    tags: ['AWS', 'GCP', 'Azure', 'Databricks', 'Real-time Analytics', 'Warehousing'],
  },
  {
    icon: Database,
    title: 'Data Observability & Governance',
    desc: 'Data Observability specialists identifying code, configuration, schema, data, metadata, and technology drift in application, data, control, and infrastructure planes. Data Mesh, Knowledge Graphs, and Synthetic Data for sustainable growth.',
    tags: ['Data Mesh', 'Knowledge Graphs', 'Synthetic Data', 'Data Governance', 'Observability'],
  },
  {
    icon: Server,
    title: 'Terraform & Infrastructure as Code',
    desc: 'IaC code experts — Terraform design and development. Automate cloud resource provisioning with Terraform and CloudFormation. Includes Differential Privacy, Sovereign Data Strategies, Homomorphic Encryption, and Confidential Computing.',
    tags: ['Terraform', 'CloudFormation', 'Differential Privacy', 'Homomorphic Encryption', 'Confidential Computing'],
  },
  {
    icon: Cpu,
    title: 'Edge AI',
    desc: 'Featuring Micro Models, Sensor Fusion, Continuous Delivery, Autonomous Decision-Making, and Anywhere Deployment. Bringing intelligent inference to the edge of your infrastructure.',
    tags: ['Micro Models', 'Sensor Fusion', 'Edge Inference', 'Autonomous Systems', 'Continuous Delivery'],
  },
  {
    icon: GitBranch,
    title: 'Palantir Consultants',
    desc: 'Highly experienced in Palantir Foundry, Workshop, Quiver, Contour, Repository, PySpark, and Scala — delivering end-to-end solutions on the Palantir platform for the most complex enterprise data challenges.',
    tags: ['Palantir Foundry', 'Workshop', 'Quiver', 'Contour', 'PySpark', 'Scala'],
  },
  {
    icon: ShieldCheck,
    title: 'Data Clean Room Architecture',
    desc: 'Centillion architects adopt Data Clean Room Architecture for all marketing needs — enabling privacy-preserving collaboration without ever exposing raw data. Differential Privacy and Sovereign Data Strategies included.',
    tags: ['Data Clean Room', 'Differential Privacy', 'Sovereign Data', 'Marketing Analytics'],
  },
  {
    icon: BarChart3,
    title: 'Data Team as a Service',
    desc: 'Fill talent gaps at any level of your organization with ongoing support from our highly specialized team of data experts, including CDOs, CTOs, Data Engineers, Data Architects, Project Managers, and Business Analysts.',
    tags: ['CDO', 'CTO as a Service', 'Data Engineers', 'Data Architects', 'Business Analysts'],
  },
];

const EXPERTISE = [
  { label: 'Generative AI & LLMs (ARISTOTLEAI)', pct: 96 },
  { label: 'Cloud Migration (AWS / GCP / Azure)', pct: 98 },
  { label: 'Data Engineering & Observability', pct: 95 },
  { label: 'Terraform & IaC', pct: 92 },
  { label: 'Palantir Foundry', pct: 88 },
  { label: 'Data Clean Room Architecture', pct: 90 },
];

export const WhoWeArePage: React.FC = () => {
  return (
    <PageLayout>
      <PageHero
        tag="// WHO WE ARE"
        headline={"Visionaries.\nTechnology\nLeaders.\nDevoted\nArchitects."}
        sub="Advocates of Open Source. We leverage collective industry expertise to excel in solving intricate challenges for our valued clients — from cloud migration to responsible generative AI."
      />

      {/* Capabilities */}
      <section style={{ padding: '0 clamp(1.5rem,8vw,10rem) clamp(2rem,6vw,5rem)' }}>
        <FadeIn>
          <div className="mono-text" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', marginBottom: '1rem' }}>// CORE CAPABILITIES</div>
          <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.5rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '3rem' }}>Data-Driven Excellence with Centillion</h2>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px,100%), 1fr))', gap: '1.5rem' }}>
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <FadeIn key={cap.title} delay={i * 0.06}>
                <motion.div
                  whileHover={{ scale: 1.02, borderColor: 'var(--accent-primary)' }}
                  className="glass-panel card-pad"
                  style={{ borderRadius: '16px', border: '1px solid var(--border-color)', transition: 'border-color 0.3s', height: '100%' }}
                >
                  <motion.div
                    whileHover={{ rotate: 5 }}
                    style={{
                      width: 48, height: 48, borderRadius: '14px',
                      background: 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,150,136,0.08))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '1.2rem', border: '1px solid rgba(0,229,255,0.2)',
                    }}
                  >
                    <Icon size={22} style={{ color: 'var(--accent-primary)' }} />
                  </motion.div>
                  <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.6rem', fontSize: '0.95rem' }}>{cap.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.7, fontSize: '0.88rem', marginBottom: '1rem' }}>{cap.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {cap.tags.map(t => (
                      <span key={t} style={{
                        background: 'rgba(0,229,255,0.07)', border: '1px solid rgba(0,229,255,0.18)',
                        color: 'var(--accent-primary)', fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '6px',
                      }}>{t}</span>
                    ))}
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Responsible AI + depth bars */}
      <section style={{ padding: 'clamp(3rem,8vw,7rem) clamp(1.5rem,8vw,10rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px,100%), 1fr))', gap: 'clamp(2rem,6vw,8rem)', alignItems: 'center', maxWidth: '1200px' }}>
          <FadeIn>
            <div>
              <div className="mono-text" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', marginBottom: '1rem' }}>// RESPONSIBLE AI</div>
              <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)', fontWeight: 200, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: '1rem' }}>
                Harness the Potential<br />of Generative AI.
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300, marginBottom: '1rem' }}>
                Centillion values and encapsulates ResponsibleAI and EthicalAI. Our mission is to create AI applications that enhance user experiences, rather than displacing them.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontWeight: 300 }}>
                As we advance, our dedication to human supervision, transparency, and open communication with our clients and the broader community remains unwavering.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              {EXPERTISE.map((e, i) => (
                <div key={e.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 300 }}>{e.label}</span>
                    <span className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--accent-primary)' }}>{e.pct}%</span>
                  </div>
                  <div style={{ height: '4px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${e.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent-primary), #00bcd4)', borderRadius: '4px' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ARISTOTLEAI features */}
      <section style={{ padding: '0 clamp(1.5rem,8vw,10rem) clamp(3rem,8vw,6rem)' }}>
        <FadeIn>
          <div className="mono-text" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', marginBottom: '1rem' }}>// ARISTOTLEAI PLATFORM</div>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '2rem' }}>Generative AI Toolkit</h2>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px,1fr))', gap: '1rem', maxWidth: '900px' }}>
          {['GMail Synthesizer Craft', 'Finance Language Model', 'Retail Language Model', 'Home Brewn LLM Model', 'Vertex AI', 'Bedrock AI'].map((feature, i) => (
            <FadeIn key={feature} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,229,255,0.12)' }}
                className="glass-panel"
                style={{ padding: '1.2rem 1rem', textAlign: 'center', borderRadius: '12px', border: '1px solid rgba(0,229,255,0.15)' }}
              >
                <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 400, lineHeight: 1.4 }}>{feature}</div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};
