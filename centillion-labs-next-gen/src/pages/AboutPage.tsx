import { motion } from 'framer-motion';
import { Target, Zap, Globe2, ShieldCheck, Eye, Heart } from 'lucide-react';
import { PageLayout, PageHero, FadeIn, Sec, SectionHead, StatCard, Tag, Wrap } from './PageLayout';

const VALUES = [
  { icon: ShieldCheck, title: 'Responsible AI', desc: 'We value and encapsulate ResponsibleAI and EthicalAI. Our mission is to create AI applications that enhance user experiences without displacing them.' },
  { icon: Eye, title: 'Transparency', desc: 'Our dedication to human supervision, transparency, and open communication with clients and the community remains unwavering as we advance.' },
  { icon: Globe2, title: 'Cloud-Native Experts', desc: 'Democratized AI providers committed to leveraging the power of cloud — AWS, GCP, Azure — as a catalyst to achieve optimal business outcomes.' },
  { icon: Target, title: 'Data Ontologists', desc: 'We are Data Ontologists, Data Ethicists & Architects — bringing structure, meaning, and governance to enterprise data at scale.' },
  { icon: Zap, title: 'Elite Expertise', desc: 'Collaborate with the Elite 3% of Tech Experts within 24–48 hours. Linking the finest developers worldwide with leading enterprises.' },
  { icon: Heart, title: 'Client-Centric', desc: 'We leverage collective industry expertise to excel in solving intricate challenges for our valued clients across every engagement.' },
];

const JOURNEY = [
  { num: '01', title: 'AI Ontology Company', desc: 'Founded with a clear mission: bring responsible, ethical AI and cloud-native data solutions to enterprises worldwide.' },
  { num: '02', title: 'Cloud Migration Mastery', desc: 'Amassed deep experience aiding countless clients in migrating to AWS, GCP, and Azure — turning cloud complexity into competitive advantage.' },
  { num: '03', title: 'Data Observability', desc: 'Specialist identification of code, configuration, schema, data, metadata, and technology drift across all planes.' },
  { num: '04', title: 'Generative AI Platform', desc: 'Launched our generative AI platform blending expert guidance with technical proficiency to craft impactful architectures — including Finance & Retail LMs, GMail Synthesizer, and Home Brewn models.' },
  { num: '05', title: 'Global Enterprise Clients', desc: 'Serving Taboola, SwissRe, Security Scorecard, BlockChainSentry, and EzOut — across advertising, insurance, cybersecurity, blockchain, and retail.' },
  { num: '06', title: 'Full Product Suite', desc: 'Built Plato, Claudius, and Hexacube — all production-deployed at enterprise scale.' },
];

const CLIENTS = [
  { name: 'Taboola', img: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Taboola_logo.svg', desc: "World's leading discovery & native advertising" },
  { name: 'SwissRe', img: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Swiss_Re_logo.svg', desc: 'Global reinsurance leader' },
  { name: 'Security Scorecard', img: 'https://cdn.brandfetch.io/securityscorecard.com/w/400/h/400/logo', desc: 'Secure your supply chain' },
  { name: 'BlockChainSentry', img: 'https://logo.clearbit.com/blockchainsentry.com', desc: 'Secure your smart contract' },
  { name: 'EzOut', img: 'https://logo.clearbit.com/ezout.com', desc: 'Revenue booster for grocers' },
];

const stagger = { visible: { transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };

export const AboutPage: React.FC = () => (
  <PageLayout>
    <PageHero
      tag="// ABOUT US"
      headline={"AI Ontology\nCompany."}
      sub="Data Ontologists, Data Ethicists & Architects. Cloud-native experts and Democratized AI providers, committed to leveraging the power of cloud as a catalyst to achieve optimal business outcomes."
    />

    {/* Stats */}
    <Sec pad="0 clamp(1.5rem,6vw,3rem) clamp(3rem,6vw,5rem)">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.5rem' }}>
        <StatCard value="Elite 3%" label="Tech Experts" delay={0} />
        <StatCard value="24–48h" label="Engagement Start" delay={0.06} />
        <StatCard value="3 Clouds" label="AWS · GCP · Azure" delay={0.12} />
        <StatCard value="Global" label="Enterprise Clients" delay={0.18} />
      </div>
    </Sec>

    {/* Mission split */}
    <Sec>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px,100%), 1fr))', gap: 'clamp(3rem,6vw,7rem)', alignItems: 'center' }}>
        <FadeIn>
          <div>
            <SectionHead tag="// MISSION" headline={"Eternal Data,\nExpansive Solutions."} />
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontWeight: 300, marginBottom: '1.2rem' }}>
              Centillion Labs is your ultimate hub for cloud services, data management, advanced analytics, and infrastructure solutions. We start your generative AI journey — and see it through to production.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontWeight: 300 }}>
              Our AI-CoE and DevOps culture fosters small, cross-functional teams that operate independently and collectively assume responsibility for enhancing end-user experiences.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { icon: Target, text: 'Develop custom solutions that harness ML and AI to address specific enterprise challenges.' },
              { icon: Zap, text: 'Empower clients to cultivate an AI-CoE and DevOps culture with cross-functional autonomous teams.' },
              { icon: Globe2, text: 'Aid clients in migrating to AWS, GCP, and Azure — turning cloud complexity into competitive advantage.' },
            ].map(({ icon: Icon, text }) => (
              <motion.div
                key={text} whileHover={{ x: 6 }}
                className="glass-panel"
                style={{ display: 'flex', gap: '1rem', padding: '1.25rem 1.5rem', borderRadius: '12px', alignItems: 'flex-start' }}
              >
                <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={17} style={{ color: 'var(--accent-primary)' }} />
                </div>
                <p style={{ color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.7, margin: 0, fontSize: '0.92rem' }}>{text}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </Sec>

    {/* Journey timeline */}
    <Sec>
      <SectionHead tag="// OUR JOURNEY" headline="Built Step by Step" />
      <div style={{ position: 'relative' }}>
        {/* vertical line */}
        <motion.div
          initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'absolute', left: '44px', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg, var(--accent-primary), transparent)', transformOrigin: 'top' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {JOURNEY.map((step, i) => (
            <FadeIn key={step.num} delay={i * 0.06} direction="left">
              <div style={{ display: 'grid', gridTemplateColumns: '88px 1fr', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', paddingRight: '1.5rem', paddingTop: '1rem', position: 'relative' }}>
                  <span className="mono-text" style={{ fontSize: '0.78rem', color: 'var(--accent-primary)', fontWeight: 600 }}>{step.num}</span>
                  <div style={{ position: 'absolute', right: '-5px', top: '50%', transform: 'translateY(-50%)', width: 9, height: 9, borderRadius: '50%', background: 'var(--accent-primary)', boxShadow: '0 0 8px var(--accent-primary)' }} />
                </div>
                <motion.div
                  whileHover={{ x: 5, boxShadow: '0 8px 28px rgba(0,229,255,0.08)' }}
                  className="glass-panel card-pad"
                  style={{ borderRadius: '14px' }}
                >
                  <h3 style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.4rem', fontSize: '0.95rem' }}>{step.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.7, fontSize: '0.87rem', margin: 0 }}>{step.desc}</p>
                </motion.div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Sec>

    {/* Values */}
    <Sec>
      <SectionHead tag="// PRINCIPLES" headline="What We Stand For" />
      <motion.div
        variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px,100%), 1fr))', gap: '1.5rem' }}
      >
        {VALUES.map((v) => {
          const Icon = v.icon;
          return (
            <motion.div
              key={v.title} variants={item}
              whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(0,229,255,0.1)' }}
              className="glass-panel card-pad"
              style={{ borderRadius: '18px' }}
            >
              <motion.div whileHover={{ rotate: 8, scale: 1.1 }} style={{
                width: 46, height: 46, borderRadius: '14px',
                background: 'rgba(0,229,255,0.07)', border: '1px solid rgba(0,229,255,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem',
              }}>
                <Icon size={20} style={{ color: 'var(--accent-primary)' }} />
              </motion.div>
              <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.6rem', fontSize: '0.95rem' }}>{v.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.7, fontSize: '0.88rem', margin: 0 }}>{v.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </Sec>

    {/* Clients */}
    <Sec pad="0 clamp(1.5rem,6vw,3rem) clamp(4rem,8vw,7rem)">
      <SectionHead tag="// TRUSTED BY" headline="Enterprise Partners" />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {CLIENTS.map((c, i) => (
          <FadeIn key={c.name} delay={i * 0.06}>
            <motion.div
              whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,229,255,0.1)' }}
              className="glass-panel card-pad"
              style={{ borderRadius: '14px', minWidth: '180px', borderTop: '2px solid var(--accent-primary)' }}
            >
              <div style={{ height: '36px', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                <img
                  src={c.img}
                  alt={c.name}
                  style={{
                    maxHeight: '100%',
                    maxWidth: '120px',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.4))'
                  }}
                />
              </div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>{c.name}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 300 }}>{c.desc}</div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </Sec>
  </PageLayout>
);
