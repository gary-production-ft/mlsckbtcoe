import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { people } from '../data/mockData';

const fadeUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, margin: '-15%' },
  transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
};

const Team: React.FC = () => {
  const { setCursorState } = useCursor();

  return (
    <main className="inner-page">
      {/* HERO */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: 'clamp(80px, 9vw, 130px)', paddingLeft: '4vw', paddingRight: '4vw', paddingBottom: '6vw', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <motion.div {...fadeUp} className="t-meta" style={{ marginBottom: '3vw', color: 'rgba(255,255,255,0.45)' }}>
          OUR TEAM — THE PEOPLE BEHIND MSC KBTCOE
        </motion.div>
        <motion.h1
          className="t-giant"
          style={{ lineHeight: 0.85 }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          MEET<br />THE<br />TEAM
        </motion.h1>
      </section>

      {/* TEAM GRID */}
      <section style={{ padding: '10vw 4vw', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <motion.div {...fadeUp} className="t-meta" style={{ marginBottom: '6vw', color: 'rgba(255,255,255,0.45)' }}>
          [ CORE LEADERSHIP — 2026 ]
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3vw' }}>
          {people.map((p, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              onMouseEnter={() => setCursorState({ active: true, text: 'VIEW', img: p.img })}
              onMouseLeave={() => setCursorState({ active: false, text: '', img: null })}
              style={{ cursor: 'pointer' }}
            >
              {/* Photo */}
              <div className="ph-img" style={{ height: '28vw', marginBottom: '2vw', borderRadius: '6px', overflow: 'hidden', maxHeight: '360px' }}>
                <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(30%)', transition: 'filter 0.4s ease, transform 0.6s ease' }}
                  onMouseOver={e => { (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(0%)'; (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; }}
                  onMouseOut={e => { (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(30%)'; (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }}
                />
              </div>
              {/* Info */}
              <div className="t-meta" style={{ color: 'var(--accent)', marginBottom: '0.5vw' }}>{p.role}</div>
              <div style={{ fontSize: 'clamp(1.2rem, 2.2vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '1vw' }}>{p.name}</div>
              <div style={{ fontSize: 'clamp(0.8rem, 1vw, 1rem)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{p.bio}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* JOIN CTA */}
      <section style={{ padding: '10vw 4vw', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '4vw' }}>
        <motion.div {...fadeUp} className="t-meta" style={{ color: 'rgba(255,255,255,0.45)' }}>[ JOIN THE MOVEMENT ]</motion.div>
        <motion.div {...fadeUp} className="t-large" style={{ maxWidth: '70vw' }}>
          WANT TO BE PART OF OUR TEAM?
        </motion.div>
        <motion.div {...fadeUp} style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.2rem)', color: 'rgba(255,255,255,0.5)', maxWidth: '40vw', lineHeight: 1.8 }}>
          We are always looking for passionate students who want to learn, build and lead. Whether you are a developer, designer, or communicator — there is a role for you.
        </motion.div>
        <motion.div
          {...fadeUp}
          className="t-meta magnetic-btn"
          style={{ fontSize: '1.2rem', cursor: 'pointer', borderBottom: '1px solid white', paddingBottom: '0.5vw' }}
          onMouseEnter={() => setCursorState({ active: true, text: 'APPLY', img: null })}
          onMouseLeave={() => setCursorState({ active: false, text: '', img: null })}
        >
          APPLY TO JOIN →
        </motion.div>
      </section>
    </main>
  );
};

export default Team;



