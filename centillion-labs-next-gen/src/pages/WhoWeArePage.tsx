import { motion } from 'framer-motion';
import { Bot, Database, Cloud, Server, Cpu, GitBranch, ShieldCheck, BarChart3, ShieldAlert } from 'lucide-react';
import { PageLayout, PageHero, FadeIn, Sec, SectionHead, Tag, ProgressBar } from './PageLayout';

const CAPS = [
  { icon: ShieldAlert, color: '#e84118', title: 'AI Red Teaming', sub: 'Adversarial AI Security', desc: 'Centillion Red Team works around the clock — adversarially testing LLMs, probing inference pipelines, and hardening AI systems before threats do. Secure Inference. Secure Future.', tags: ['LLM Adversarial Testing', 'Inference Security', 'Prompt Injection', 'Jailbreak Analysis', 'AI Threat Modelling'] },
  { icon: Bot, color: '#00e5ff', title: 'Generative AI Platform', sub: 'LLMs & Enterprise AI', desc: 'Seamlessly blend expert guidance & technical proficiency to craft impactful architecture use cases. GenAI Workshops & Preparedness ensure clients are equipped to embrace revolutionary capabilities.', tags: ['GMail Synthesizer', 'Finance LM', 'Retail LM', 'Vertex AI', 'Bedrock AI', 'Home Brewn LLM'] },
  { icon: Cloud, color: '#00bcd4', title: 'Cloud Migration', sub: 'AWS / GCP / Azure', desc: 'Rich experience aiding clients in migrating to all three major cloud platforms. Maximize data potential with Databricks and GCP — Data Integration, Real-time Analytics, and Warehousing.', tags: ['AWS', 'GCP', 'Azure', 'Databricks', 'Real-time Analytics'] },
  { icon: Database, color: '#26a69a', title: 'Data Observability', sub: 'Governance & Mesh', desc: 'Specialists in identifying code, config, schema, data, metadata, and tech drift. Data Mesh, Knowledge Graphs, and Synthetic Data for sustainable governance.', tags: ['Data Mesh', 'Knowledge Graphs', 'Synthetic Data', 'Observability'] },
  { icon: Server, color: '#0097a7', title: 'Terraform & IaC', sub: 'Infrastructure as Code', desc: 'IaC design and development experts — Terraform and CloudFormation. Differential Privacy, Sovereign Data Strategies, Homomorphic Encryption, and Confidential Computing.', tags: ['Terraform', 'CloudFormation', 'Homomorphic Encryption', 'Confidential Computing'] },
  { icon: Cpu, color: '#00838f', title: 'Edge AI', sub: 'Micro Models + Sensor Fusion', desc: 'Micro Models, Sensor Fusion, Continuous Delivery, Autonomous Decision-Making, and Anywhere Deployment. Intelligent inference at the edge.', tags: ['Micro Models', 'Sensor Fusion', 'Autonomous Systems', 'Edge Inference'] },
  { icon: GitBranch, color: '#007c91', title: 'Palantir', sub: 'Foundry & Workshop', desc: 'Highly experienced in Palantir Foundry, Workshop, Quiver, Contour, Repository, PySpark, and Scala — end-to-end enterprise data solutions.', tags: ['Palantir Foundry', 'Workshop', 'Quiver', 'Contour', 'PySpark'] },
  { icon: ShieldCheck, color: '#006978', title: 'Data Clean Room', sub: 'Privacy Architecture', desc: 'Centillion architects adopt Data Clean Room Architecture for all marketing needs — privacy-preserving collaboration without ever exposing raw data.', tags: ['Data Clean Room', 'Differential Privacy', 'Sovereign Data'] },
  { icon: BarChart3, color: '#00566b', title: 'Data Team as Service', sub: 'CDOs · CTOs · Engineers', desc: 'Fill talent gaps at any level — CDOs, CTOs, Data Engineers, Data Architects, Project Managers, and Business Analysts for ongoing enterprise support.', tags: ['CDO', 'CTO as a Service', 'Data Engineers', 'Data Architects'] },
];

const BARS = [
  { label: 'AI Red Teaming & Adversarial Security', pct: 99 },
  { label: 'Generative AI & LLMs', pct: 96 },
  { label: 'Cloud Migration (AWS / GCP / Azure)', pct: 98 },
  { label: 'Data Engineering & Observability', pct: 95 },
  { label: 'Terraform & IaC', pct: 92 },
  { label: 'Palantir Foundry', pct: 88 },
  { label: 'Data Clean Room Architecture', pct: 90 },
];


const stagger = { visible: { transition: { staggerChildren: 0.06 } } };
const item: any = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };

export const WhoWeArePage: React.FC = () => (
  <PageLayout>
    <PageHero
      tag="// WHO WE ARE"
      headline={"Visionaries.\nTechnology\nLeaders.\nDevoted\nArchitects."}
      sub="Advocates of Open Source. We leverage collective industry expertise to solve intricate challenges — from cloud migration to responsible generative AI."
    />

    {/* Capabilities grid */}
    <Sec>
      <SectionHead tag="// CORE CAPABILITIES" headline="Data-Driven Excellence" sub="Everything we do chains back to one outcome: enterprise data transformed into lasting value." />
      <motion.div
        variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(290px,100%), 1fr))', gap: '1.5rem' }}
      >
        {CAPS.map((c) => {
          const isRed = c.color === '#e84118';
          const accent = isRed ? '#e84118' : 'var(--text-secondary)';
          return (
            <motion.div
              key={c.title} variants={item}
              whileHover={{ scale: 1.02, boxShadow: isRed ? `0 16px 44px rgba(232,65,24,0.1)` : '0 16px 44px rgba(0,0,0,0.06)' }}
              className="glass-panel card-pad"
              style={{ borderRadius: '18px', border: '1px solid var(--border-color)', transition: 'box-shadow 0.3s' }}
            >
              <div className="mono-text" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: accent, marginBottom: '0.3rem' }}>{c.sub}</div>
              <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.6rem', fontSize: '0.95rem' }}>{c.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.7, fontSize: '0.87rem', marginBottom: '1rem' }}>{c.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {c.tags.map(t => <Tag key={t} label={t} color={accent} />)}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Sec>

    {/* ── Red Team spotlight ─────────────────────────────────── */}
    <Sec>
      {/* Red Team statement banner */}
      <FadeIn>
        <div style={{
          padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, rgba(232,65,24,0.07) 0%, rgba(176,24,0,0.04) 100%)',
          border: '1px solid rgba(232,65,24,0.22)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            style={{ width: 10, height: 10, borderRadius: '50%', background: '#e84118', boxShadow: '0 0 12px #e84118', flexShrink: 0 }}
          />
          <div style={{ flex: 1, minWidth: '220px' }}>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.2em', color: '#e84118', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Centillion Red Team · Signature Capability</p>
            <p style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.55, margin: 0 }}>
              City Sleeps. Centillion Red Team Doesn't. — Adversarially testing LLMs, probing inference pipelines, and hardening AI systems before threats do.
              <span style={{ color: '#e84118', fontWeight: 400 }}> Secure Inference. Secure Future.</span>
            </p>
          </div>
        </div>
      </FadeIn>
    </Sec>

    {/* ── AI Strike Force spotlight ───────────────────────────── */}
    <Sec>
      {/* AI Strike Force statement banner */}
      <FadeIn delay={0.1}>
        <div style={{
          padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, rgba(0,229,255,0.07) 0%, rgba(0,188,212,0.04) 100%)',
          border: '1px solid rgba(0,229,255,0.22)',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
          marginBottom: '1rem'
        }}>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: 0.5 }}
            style={{ width: 10, height: 10, borderRadius: '50%', background: '#00e5ff', boxShadow: '0 0 12px #00e5ff', flexShrink: 0 }}
          />
          <div style={{ flex: 1, minWidth: '220px' }}>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.2em', color: '#00e5ff', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Centillion AI Formidable Strike Force</p>
            <p style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.55, margin: 0, marginBottom: '0.5rem' }}>
              <span style={{ color: '#00e5ff', fontWeight: 500 }}>Disrupting Industries with Artificial Intelligence.</span> In an era where artificial intelligence (AI) is reshaping industries, establishing an AI strike force has become a strategic imperative for companies aiming to stay ahead of the curve.
            </p>
            <p style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)', fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
              When partnered with Centillion we build AI teams and help companies with innovation.
            </p>
          </div>
        </div>
      </FadeIn>
    </Sec>

    {/* Responsible AI + bars */}
    <Sec>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px,100%), 1fr))', gap: 'clamp(3rem,6vw,7rem)', alignItems: 'center' }}>
        <FadeIn>
          <div>
            <SectionHead tag="// RESPONSIBLE AI" headline={"Harness the Potential\nof Generative AI."} sub="Centillion values and encapsulates ResponsibleAI and EthicalAI. Our mission is to create AI applications that enhance user experiences, rather than displacing them. As we advance, our dedication to human supervision, transparency, and open communication remains unwavering." />
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div>
            {BARS.map((b, i) => <ProgressBar key={b.label} label={b.label} pct={b.pct} delay={i * 0.09} />)}
          </div>
        </FadeIn>
      </div>
    </Sec>
  </PageLayout>
);
