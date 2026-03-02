import { motion } from 'framer-motion';
import { Bot, Database, Cloud, Server, Cpu, GitBranch, ShieldCheck, BarChart3 } from 'lucide-react';
import { PageLayout, PageHero, FadeIn, Sec, SectionHead, Tag, ProgressBar, Wrap } from './PageLayout';

const CAPS = [
  { icon: Bot, color: '#00e5ff', title: 'ARISTOTLEAI', sub: 'Generative AI Platform', desc: 'Seamlessly blend expert guidance & technical proficiency to craft impactful architecture use cases. GenAI Workshops & Preparedness ensure clients are equipped to embrace revolutionary capabilities.', tags: ['GMail Synthesizer', 'Finance LM', 'Retail LM', 'Vertex AI', 'Bedrock AI', 'Home Brewn LLM'] },
  { icon: Cloud, color: '#00bcd4', title: 'Cloud Migration', sub: 'AWS / GCP / Azure', desc: 'Rich experience aiding clients in migrating to all three major cloud platforms. Maximize data potential with Databricks and GCP — Data Integration, Real-time Analytics, and Warehousing.', tags: ['AWS', 'GCP', 'Azure', 'Databricks', 'Real-time Analytics'] },
  { icon: Database, color: '#26a69a', title: 'Data Observability', sub: 'Governance & Mesh', desc: 'Specialists in identifying code, config, schema, data, metadata, and tech drift. Data Mesh, Knowledge Graphs, and Synthetic Data for sustainable governance.', tags: ['Data Mesh', 'Knowledge Graphs', 'Synthetic Data', 'Observability'] },
  { icon: Server, color: '#0097a7', title: 'Terraform & IaC', sub: 'Infrastructure as Code', desc: 'IaC design and development experts — Terraform and CloudFormation. Differential Privacy, Sovereign Data Strategies, Homomorphic Encryption, and Confidential Computing.', tags: ['Terraform', 'CloudFormation', 'Homomorphic Encryption', 'Confidential Computing'] },
  { icon: Cpu, color: '#00838f', title: 'Edge AI', sub: 'Micro Models + Sensor Fusion', desc: 'Micro Models, Sensor Fusion, Continuous Delivery, Autonomous Decision-Making, and Anywhere Deployment. Intelligent inference at the edge.', tags: ['Micro Models', 'Sensor Fusion', 'Autonomous Systems', 'Edge Inference'] },
  { icon: GitBranch, color: '#007c91', title: 'Palantir', sub: 'Foundry & Workshop', desc: 'Highly experienced in Palantir Foundry, Workshop, Quiver, Contour, Repository, PySpark, and Scala — end-to-end enterprise data solutions.', tags: ['Palantir Foundry', 'Workshop', 'Quiver', 'Contour', 'PySpark'] },
  { icon: ShieldCheck, color: '#006978', title: 'Data Clean Room', sub: 'Privacy Architecture', desc: 'Centillion architects adopt Data Clean Room Architecture for all marketing needs — privacy-preserving collaboration without ever exposing raw data.', tags: ['Data Clean Room', 'Differential Privacy', 'Sovereign Data'] },
  { icon: BarChart3, color: '#00566b', title: 'Data Team as Service', sub: 'CDOs · CTOs · Engineers', desc: 'Fill talent gaps at any level — CDOs, CTOs, Data Engineers, Data Architects, Project Managers, and Business Analysts for ongoing enterprise support.', tags: ['CDO', 'CTO as a Service', 'Data Engineers', 'Data Architects'] },
];

const BARS = [
  { label: 'Generative AI & LLMs (ARISTOTLEAI)', pct: 96 },
  { label: 'Cloud Migration (AWS / GCP / Azure)', pct: 98 },
  { label: 'Data Engineering & Observability', pct: 95 },
  { label: 'Terraform & IaC', pct: 92 },
  { label: 'Palantir Foundry', pct: 88 },
  { label: 'Data Clean Room Architecture', pct: 90 },
];

const ARISTOTLE = ['GMail Synthesizer Craft', 'Finance Language Model', 'Retail Language Model', 'Home Brewn LLM Model', 'Vertex AI', 'Bedrock AI'];

const stagger = { visible: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };

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
          const Icon = c.icon;
          return (
            <motion.div
              key={c.title} variants={item}
              whileHover={{ scale: 1.02, borderColor: c.color + '66', boxShadow: `0 16px 44px ${c.color}12` }}
              className="glass-panel card-pad"
              style={{ borderRadius: '18px', border: '1px solid var(--border-color)', transition: 'border-color 0.3s, box-shadow 0.3s' }}
            >
              <motion.div
                whileHover={{ rotate: 6, scale: 1.1 }}
                style={{
                  width: 50, height: 50, borderRadius: '14px',
                  background: `linear-gradient(135deg, ${c.color}18, ${c.color}06)`,
                  border: `1px solid ${c.color}2a`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem',
                }}
              >
                <Icon size={22} style={{ color: c.color }} />
              </motion.div>
              <div className="mono-text" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: c.color, marginBottom: '0.3rem' }}>{c.sub}</div>
              <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.6rem', fontSize: '0.95rem' }}>{c.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.7, fontSize: '0.87rem', marginBottom: '1rem' }}>{c.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {c.tags.map(t => <Tag key={t} label={t} color={c.color} />)}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
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

    {/* ARISTOTLEAI toolkit */}
    <Sec>
      <SectionHead tag="// ARISTOTLEAI PLATFORM" headline="Generative AI Toolkit" centre />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(180px,100%), 1fr))', gap: '1rem' }}>
        {ARISTOTLE.map((feat, i) => (
          <FadeIn key={feat} delay={i * 0.06}>
            <motion.div
              whileHover={{ y: -5, boxShadow: '0 12px 32px rgba(0,229,255,0.12)', borderColor: 'var(--accent-primary)' }}
              className="glass-panel"
              style={{ padding: '1.5rem 1.2rem', textAlign: 'center', borderRadius: '14px', border: '1px solid rgba(0,229,255,0.12)', transition: 'border-color 0.3s' }}
            >
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-primary)', margin: '0 auto 0.9rem', boxShadow: '0 0 8px var(--accent-primary)' }} />
              <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 400, lineHeight: 1.4 }}>{feat}</div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </Sec>
  </PageLayout>
);
