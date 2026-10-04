import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { projects } from '../data/mockData';

const fadeUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, margin: '-15%' },
  transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
};

const Projects: React.FC = () => {
  const { setCursorState } = useCursor();
  const [active, setActive] = useState<string | null>(null);

  return (
    <main className="inner-page">
      {/* HERO */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: 'clamp(80px, 9vw, 130px)', paddingLeft: '4vw', paddingRight: '4vw', paddingBottom: '6vw', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <motion.div {...fadeUp} className="t-meta" style={{ marginBottom: '3vw', color: 'rgba(255,255,255,0.45)' }}>
          PROJECTS — OPEN SOURCE · RESEARCH · PRODUCTS
        </motion.div>
        <motion.h1
          className="t-giant"
          style={{ lineHeight: 0.85 }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          THINGS<br />WE<br />SHIP
        </motion.h1>
      </section>

      {/* PROJECTS LIST */}
      <section style={{ padding: '8vw 0' }}>
        <motion.div {...fadeUp} className="t-meta" style={{ padding: '0 4vw', marginBottom: '4vw', color: 'rgba(255,255,255,0.45)' }}>
          [ {projects.length} PROJECTS ]
        </motion.div>
        {projects.map((proj) => (
          <motion.div
            key={proj.id}
            {...fadeUp}
            className="editorial-row"
            onMouseEnter={() => { setCursorState({ active: true, text: 'OPEN', img: proj.img }); setActive(proj.id); }}
            onMouseLeave={() => { setCursorState({ active: false, text: '', img: null }); setActive(null); }}
            style={{ display: 'grid', gridTemplateColumns: '10vw 1fr 24vw', alignItems: 'start' }}
          >
            <div className="t-medium row-id" style={{ paddingLeft: '4vw', paddingTop: '0.5vw', color: active === proj.id ? 'var(--accent)' : 'rgba(255,255,255,0.3)' }}>{proj.id}</div>
            <div>
              <div className="row-title">{proj.title}</div>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: active === proj.id ? 'auto' : 0, opacity: active === proj.id ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ paddingTop: '2vw', fontSize: 'clamp(0.85rem, 1.1vw, 1.1rem)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: '50vw' }}>
                  {proj.description}
                </div>
                <div style={{ marginTop: '1.5vw', display: 'flex', gap: '0.8vw' }}>
                  {proj.stack.map((s) => (
                    <span key={s} style={{ fontSize: '0.65rem', padding: '4px 10px', background: 'rgba(0,120,212,0.1)', border: '1px solid rgba(0,120,212,0.3)', borderRadius: '20px', color: 'var(--accent)' }}>{s}</span>
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="t-meta row-meta" style={{ paddingRight: '4vw', display: 'flex', flexDirection: 'column', gap: '1vw', alignItems: 'flex-end' }}>
              <div style={{ color: 'rgba(255,255,255,0.4)' }}>{proj.meta}</div>
              <span style={{
                fontSize: '0.6rem', padding: '4px 10px', borderRadius: '20px',
                background: proj.status === 'ACTIVE' ? 'rgba(0,200,80,0.12)' : proj.status === 'BETA' ? 'rgba(255,180,0,0.12)' : 'rgba(255,255,255,0.08)',
                border: `1px solid ${proj.status === 'ACTIVE' ? 'rgba(0,200,80,0.4)' : proj.status === 'BETA' ? 'rgba(255,180,0,0.4)' : 'rgba(255,255,255,0.15)'}`,
                color: proj.status === 'ACTIVE' ? '#00c850' : proj.status === 'BETA' ? '#ffb400' : 'rgba(255,255,255,0.5)',
              }}>{proj.status}</span>
              <a href={proj.github} className="t-meta magnetic-btn" style={{ fontSize: '0.75rem', color: 'white', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '2px', textDecoration: 'none' }}>GITHUB →</a>
            </div>
          </motion.div>
        ))}
      </section>

      {/* CONTRIBUTE */}
      <section style={{ padding: '10vw 4vw', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4vw', alignItems: 'center' }}>
        <motion.div {...fadeUp}>
          <div className="t-meta" style={{ color: 'rgba(255,255,255,0.45)', marginBottom: '2vw' }}>[ OPEN TO CONTRIBUTORS ]</div>
          <div className="t-large">BUILD<br />WITH US</div>
        </motion.div>
        <motion.div {...fadeUp} style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(0.9rem, 1.2vw, 1.3rem)', lineHeight: 1.8 }}>
          All MSC KBTCOE projects are open-source. Fork, star, and contribute on GitHub. Whether you are a beginner or a seasoned dev, there is a place for you.
          <br /><br />
          <span
            className="t-meta magnetic-btn"
            style={{ fontSize: '1rem', color: 'white', borderBottom: '1px solid white', paddingBottom: '3px', cursor: 'pointer' }}
            onMouseEnter={() => setCursorState({ active: true, text: 'GITHUB', img: null })}
            onMouseLeave={() => setCursorState({ active: false, text: '', img: null })}
          >
            VIEW ALL REPOSITORIES →
          </span>
        </motion.div>
      </section>
    </main>
  );
};

export default Projects;



