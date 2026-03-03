import { motion } from 'framer-motion';
import { Megaphone, Shield, Lock, Cpu, ShoppingCart, ArrowRight } from 'lucide-react';
import { PageLayout, PageHero, FadeIn, Sec, SectionHead, Tag } from './PageLayout';

const INDUSTRIES = [
  {
    id: 'adtech', icon: Megaphone, client: 'Taboola', img: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Taboola_logo.svg', sector: 'Advertising & Media', color: '#00e5ff',
    headline: 'Precision advertising intelligence at web scale.',
    desc: "Enabling Taboola's global native advertising network with real-time analytics pipelines, Data Clean Room architecture, and privacy-preserving collaboration for their advertising partners.",
    solutions: ['Real-time Analytics with Spark & Databricks', 'Data Clean Room (Plato)', 'Differential Privacy pipelines', 'Knowledge Graph for content signals', 'High-throughput event streaming'],
    tags: ['Real-time Analytics', 'Data Clean Room', 'Plato', 'Databricks'],
  },
  {
    id: 'insurance', icon: Shield, client: 'SwissRe', img: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Swiss_Re_logo.svg', sector: 'Insurance / Reinsurance', color: '#00bcd4',
    headline: "Cloud-scale risk intelligence for the world's largest reinsurer.",
    desc: 'Supporting SwissRe with a large-scale cloud migration to GCP, Data Mesh adoption, and Responsible AI frameworks — ensuring governance and ethical AI principles across all analytical workloads.',
    solutions: ['GCP cloud migration strategy', 'Data Mesh with Databricks accelerators', 'Responsible AI governance framework', 'FinOps for cloud cost optimization', 'Regulatory compliance & data lineage'],
    tags: ['Data Mesh', 'Responsible AI', 'FinOps', 'GCP', 'Governance'],
  },
  {
    id: 'cyber', icon: Lock, client: 'Security Scorecard', img: 'https://cdn.brandfetch.io/securityscorecard.com/w/400/h/400/logo', sector: 'Cybersecurity / Supply Chain', color: '#26a69a',
    headline: 'Post-quantum security for the connected enterprise.',
    desc: 'Delivering cutting-edge security architecture for Security Scorecard — including post-quantum cryptography, Multicloud Data Access Management, and Homomorphic Encryption to future-proof sensitive data.',
    solutions: ['Post-quantum Cryptography adoption', 'Multicloud Data Access Management', 'Homomorphic Encryption pipelines', 'Confidential Computing environments', 'Zero-trust data architecture'],
    tags: ['Post-quantum', 'Multicloud DAM', 'Homomorphic Encryption', 'Confidential Computing'],
  },
  {
    id: 'web3', icon: Cpu, client: 'BlockChainSentry', img: 'https://logo.clearbit.com/blockchainsentry.com', sector: 'Blockchain / Web3', color: '#0097a7',
    headline: 'Distributed consensus at the heart of decentralized finance.',
    desc: "Deploying Centillion's Claudius Go framework to power BlockChainSentry's distributed ledger infrastructure — using Goroutines, gRPC, etcd, and Raft for high-availability consensus and peer-to-peer communication.",
    solutions: ['Claudius Go framework deployment', 'gRPC-based peer communication', 'etcd distributed key-value store', 'Raft consensus for ledger integrity', 'Goroutines for concurrent transaction processing'],
    tags: ['Claudius', 'gRPC', 'etcd', 'Raft', 'Golang'],
  },
  {
    id: 'retail', icon: ShoppingCart, client: 'EzOut', img: 'https://logo.clearbit.com/ezout.com', sector: 'Retail / Grocery', color: '#007c91',
    headline: 'AI at the shelf — instant, intelligent, in-store.',
    desc: "EzOut's smart checkout experience is powered by Centillion's Retail Language Model, Edge AI inference, and Databricks lakehouse for real-time inventory and demand forecasting at scale.",
    solutions: ['Retail Language Model', 'Edge AI for in-store inference', 'Databricks lakehouse', 'Real-time inventory intelligence', 'Demand forecasting & replenishment AI'],
    tags: ['Retail LM', 'Edge AI', 'Databricks', 'Real-time ML'],
  },
];

const container = { visible: { transition: { staggerChildren: 0.09 } } };
const item = { hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };

export const IndustriesPage: React.FC = () => (
  <PageLayout>
    <PageHero
      tag="// VERTICALS"
      headline={"Industries\nWe Serve."}
      sub="Centillion Labs extends bespoke AI and data engineering capabilities across five high-growth verticals — building production-grade platforms that power mission-critical enterprise decisions."
    />

    {/* Industry cards */}
    <Sec>
      <SectionHead tag="// CLIENT VERTICALS" headline="Five Industries. Real Results." sub="Each engagement is a reference architecture — a blueprint that compounds value over time." />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {INDUSTRIES.map((ind, i) => {
          const Icon = ind.icon;
          return (
            <FadeIn key={ind.id} delay={i * 0.07} direction={i % 2 === 0 ? 'left' : 'right'}>
              <motion.div whileHover={{ y: -4, boxShadow: `0 20px 50px ${ind.color}14` }} className="glass-panel" style={{ borderRadius: '20px', overflow: 'hidden', border: `1px solid ${ind.color}1a` }}>

                {/* Header bar */}
                <div style={{ padding: '2rem 2.5rem 1.5rem', borderBottom: `1px solid ${ind.color}1a`, display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <div style={{ width: 52, height: 52, borderRadius: '14px', background: `linear-gradient(135deg, ${ind.color}24, ${ind.color}06)`, border: `1px solid ${ind.color}2a`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={24} style={{ color: ind.color }} />
                  </div>
                  <div>
                    <div className="mono-text" style={{ fontSize: '0.66rem', letterSpacing: '0.18em', color: ind.color, marginBottom: '0.6rem' }}>CLIENT</div>
                    {ind.img && (
                      <div style={{ height: '24px', marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start' }}>
                        <img src={ind.img} alt={ind.client} style={{ maxHeight: '100%', maxWidth: '120px', objectFit: 'contain', filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.4))' }} />
                      </div>
                    )}
                    <div style={{ fontSize: '1.5rem', fontWeight: 300, color: 'var(--text-primary)', marginBottom: '0.1rem' }}>{ind.client}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 300 }}>{ind.sector}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <h3 style={{ fontWeight: 300, fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{ind.headline}</h3>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: '1.5rem 2.5rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px,100%), 1fr))', gap: '2rem' }}>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontWeight: 300, fontSize: '0.9rem' }}>{ind.desc}</p>

                  <div>
                    <div className="mono-text" style={{ fontSize: '0.66rem', letterSpacing: '0.16em', color: ind.color, marginBottom: '1rem' }}>WHAT WE BUILT</div>
                    <motion.ul variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {ind.solutions.map(sol => (
                        <motion.li key={sol} variants={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.88rem', fontWeight: 300 }}>
                          <ArrowRight size={13} style={{ color: ind.color, flexShrink: 0, marginTop: '3px' }} />{sol}
                        </motion.li>
                      ))}
                    </motion.ul>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                      {ind.tags.map(t => <Tag key={t} label={t} color={ind.color} />)}
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          );
        })}
      </div>
    </Sec>

    {/* CTA */}
    <Sec>
      <FadeIn>
        <motion.div whileHover={{ boxShadow: '0 24px 60px rgba(0,229,255,0.1)' }} className="glass-panel card-pad" style={{ maxWidth: '560px', margin: '0 auto', borderRadius: '22px', textAlign: 'center', borderTop: '2px solid var(--accent-primary)' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 200, color: 'var(--text-primary)', marginBottom: '1rem' }}>Your Industry. Our Expertise.</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem', fontWeight: 300 }}>Ready to see what a bespoke AI and data platform looks like for your sector?</p>
          <motion.a href="mailto:connect@centillionlabs.com" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent-primary)', color: '#000', padding: '0.9rem 2rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none', letterSpacing: '0.06em' }}>
            START THE CONVERSATION →
          </motion.a>
        </motion.div>
      </FadeIn>
    </Sec>
  </PageLayout>
);
