import { motion } from 'framer-motion';
import { Target, Zap, Globe2, ShieldCheck, Eye, Heart } from 'lucide-react';
import { PageLayout, PageHero, FadeIn, StatCard } from './PageLayout';

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Responsible AI',
    desc: 'Centillion values and encapsulates ResponsibleAI and EthicalAI. Our mission is to create AI applications that enhance user experiences, rather than displacing them.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    desc: 'Our dedication to human supervision, transparency, and open communication with our clients and the broader community remains unwavering as we advance.',
  },
  {
    icon: Globe2,
    title: 'Cloud-Native Experts',
    desc: 'Democratized AI providers, committed to leveraging the power of cloud as a catalyst to achieve optimal business outcomes across AWS, GCP, and Azure.',
  },
  {
    icon: Target,
    title: 'Data Ontologists',
    desc: 'We are Data Ontologists, Data Ethicists & Architects — bringing structure, meaning, and governance to enterprise data at scale.',
  },
  {
    icon: Zap,
    title: 'Elite Expertise',
    desc: 'Collaborate with the Elite 3% of Tech Experts within 24–48 hours. Linking the finest software developers worldwide with leading companies.',
  },
  {
    icon: Heart,
    title: 'Client-Centric',
    desc: 'We leverage collective industry expertise to excel in solving and tackling intricate challenges for our valued clients across every engagement.',
  },
];

const PILLARS = [
  {
    num: '01',
    title: 'AI Ontology Company',
    desc: 'Founded as an AI Ontology Company with a clear mission: bring responsible, ethical AI and cloud-native data solutions to enterprises worldwide.',
  },
  {
    num: '02',
    title: 'Cloud Migration Mastery',
    desc: 'Our core team has amassed a wealth of experience aiding countless clients in migrating to AWS, GCP, and Azure — turning cloud complexity into competitive advantage.',
  },
  {
    num: '03',
    title: 'Data Observability Specialists',
    desc: 'We identify code, configuration, schema, data, metadata, and technology drift across application, data, control, and infrastructure planes.',
  },
  {
    num: '04',
    title: 'ARISTOTLEAI Platform',
    desc: 'Launched ARISTOTLEAI — our generative AI platform with Workshops & Preparedness, blending expert guidance with technical proficiency to craft impactful architecture use cases.',
  },
  {
    num: '05',
    title: 'Global Enterprise Clients',
    desc: 'Serving world-class clients including Taboola, SwissRe, Security Scorecard, BlockChainSentry, and EzOut — across advertising, insurance, cybersecurity, blockchain, and retail.',
  },
  {
    num: '06',
    title: 'Full Product Suite',
    desc: 'Built a complete product suite: Plato (Data Clean Room), AristotleAI (GenAI platform), Claudius (Go-based framework), and Hexacube — all production-deployed at enterprise scale.',
  },
];

export const AboutPage: React.FC = () => {
  return (
    <PageLayout>
      <PageHero
        tag="// ABOUT US"
        headline={"AI Ontology\nCompany."}
        sub="Data Ontologists, Data Ethicists & Architects. Cloud-native experts and Democratized AI providers, committed to leveraging the power of cloud as a catalyst to achieve optimal business outcomes."
      />

      {/* Stats */}
      <section style={{ padding: '0 clamp(1.5rem,8vw,10rem) clamp(2rem,6vw,5rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.5rem', maxWidth: '900px' }}>
          <StatCard value="Elite 3%" label="Tech Experts" delay={0} />
          <StatCard value="24–48h" label="Engagement Start" delay={0.05} />
          <StatCard value="3 Clouds" label="AWS · GCP · Azure" delay={0.1} />
          <StatCard value="Global" label="Enterprise Clients" delay={0.15} />
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: 'clamp(3rem,8vw,7rem) clamp(1.5rem,8vw,10rem)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px,100%), 1fr))',
          gap: 'clamp(2rem,6vw,6rem)',
          alignItems: 'center',
          maxWidth: '1200px',
        }}>
          <FadeIn>
            <div>
              <div className="mono-text" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', marginBottom: '1rem' }}>// MISSION</div>
              <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,3rem)', fontWeight: 200, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
                Eternal Data,<br />Expansive Solutions.
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontWeight: 300, fontSize: '1.05rem', marginBottom: '1.2rem' }}>
                Centillion Labs is your ultimate hub for cloud services, data management, advanced analytics, and infrastructure solutions. We start your generative AI journey — and see it through to production.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, fontWeight: 300, fontSize: '1.05rem' }}>
                Our AI-CoE and DevOps culture fosters small, cross-functional teams that operate independently and collectively assume responsibility for enhancing end-user experiences.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: Target, text: 'Develop custom solutions that harness the capabilities of ML and AI to address specific enterprise challenges.' },
                { icon: Zap, text: 'Empower clients to cultivate an AI-CoE and DevOps culture with cross-functional autonomous teams.' },
                { icon: Globe2, text: 'Aid clients in migrating to AWS, GCP, and Azure — turning cloud complexity into competitive advantage.' },
              ].map(({ icon: Icon, text }) => (
                <motion.div
                  key={text}
                  whileHover={{ x: 6 }}
                  className="glass-panel"
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.2rem 1.5rem', borderRadius: '12px' }}
                >
                  <Icon size={18} style={{ color: 'var(--accent-primary)', flexShrink: 0, marginTop: '2px' }} />
                  <p style={{ color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.7, margin: 0 }}>{text}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Journey */}
      <section style={{ padding: 'clamp(2rem,6vw,5rem) clamp(1.5rem,8vw,10rem)' }}>
        <FadeIn>
          <div className="mono-text" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', marginBottom: '1rem' }}>// OUR JOURNEY</div>
          <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.5rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '3rem' }}>Built Step by Step</h2>
        </FadeIn>
        <div style={{ position: 'relative', maxWidth: '800px' }}>
          <motion.div
            initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute', left: '52px', top: 0, bottom: 0, width: '1px',
              background: 'linear-gradient(180deg, var(--accent-primary), transparent)',
              transformOrigin: 'top',
            }}
          />
          {PILLARS.map((item, i) => (
            <FadeIn key={item.num} delay={i * 0.07}>
              <div style={{ display: 'grid', gridTemplateColumns: '52px auto', gap: '2rem', marginBottom: '2rem', alignItems: 'flex-start' }}>
                <div style={{ textAlign: 'right', paddingRight: '1.5rem', position: 'relative' }}>
                  <span className="mono-text" style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 600 }}>{item.num}</span>
                  <div style={{
                    position: 'absolute', right: '-5px', top: '50%', transform: 'translateY(-50%)',
                    width: 9, height: 9, borderRadius: '50%',
                    background: 'var(--accent-primary)', boxShadow: '0 0 8px var(--accent-primary)',
                  }} />
                </div>
                <motion.div whileHover={{ x: 4 }} className="glass-panel card-pad" style={{ borderRadius: '12px' }}>
                  <h3 style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.4rem', fontSize: '1rem' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.7, fontSize: '0.9rem', margin: 0 }}>{item.desc}</p>
                </motion.div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: 'clamp(2rem,6vw,5rem) clamp(1.5rem,8vw,10rem)' }}>
        <FadeIn>
          <div className="mono-text" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', marginBottom: '1rem' }}>// PRINCIPLES</div>
          <h2 style={{ fontSize: 'clamp(1.8rem,3.5vw,2.5rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '3rem' }}>What We Stand For</h2>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px,100%), 1fr))', gap: '1.5rem' }}>
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <FadeIn key={v.title} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,229,255,0.1)' }}
                  className="glass-panel card-pad"
                  style={{ borderRadius: '16px', height: '100%' }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: '12px',
                    background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.2rem',
                  }}>
                    <Icon size={20} style={{ color: 'var(--accent-primary)' }} />
                  </div>
                  <h3 style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.6rem', fontSize: '1rem' }}>{v.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.7, fontSize: '0.9rem', margin: 0 }}>{v.desc}</p>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Clients */}
      <section style={{ padding: '0 clamp(1.5rem,8vw,10rem) clamp(3rem,8vw,6rem)' }}>
        <FadeIn>
          <div className="mono-text" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--accent-primary)', marginBottom: '2rem' }}>// TRUSTED BY</div>
        </FadeIn>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {[
            { name: 'Taboola', desc: "World's leading discovery & native advertising platform" },
            { name: 'SwissRe', desc: 'Global reinsurance leader' },
            { name: 'Security Scorecard', desc: 'Secure your supply chain' },
            { name: 'BlockChainSentry', desc: 'Secure your smart contract' },
            { name: 'EzOut', desc: 'Boosts revenue & profit margins for grocers' },
          ].map((c, i) => (
            <FadeIn key={c.name} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,229,255,0.1)' }}
                className="glass-panel card-pad"
                style={{ borderRadius: '14px', minWidth: '200px' }}
              >
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>{c.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 300 }}>{c.desc}</div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};
