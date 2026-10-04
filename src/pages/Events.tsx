import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { events } from '../data/mockData';

const fadeUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, margin: '-15%' },
  transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
};

const Events: React.FC = () => {
  const { setCursorState } = useCursor();
  const [active, setActive] = useState<string | null>(null);

  return (
    <main className="inner-page">
      {/* HERO */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: 'clamp(80px, 9vw, 130px)', paddingLeft: '4vw', paddingRight: '4vw', paddingBottom: '6vw', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <motion.div {...fadeUp} className="t-meta" style={{ marginBottom: '3vw', color: 'rgba(255,255,255,0.45)' }}>
          EVENTS — WORKSHOPS · HACKATHONS · SUMMITS
        </motion.div>
        <motion.h1
          className="t-giant"
          style={{ lineHeight: 0.85 }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          LIVE<br />SESSIONS &<br />EVENTS
        </motion.h1>
      </section>

      {/* EVENTS LIST */}
      <section style={{ padding: '8vw 0' }}>
        <motion.div {...fadeUp} className="t-meta" style={{ padding: '0 4vw', marginBottom: '4vw', color: 'rgba(255,255,255,0.45)' }}>
          [ {events.length} EVENTS ]
        </motion.div>
        {events.map((ev) => (
          <motion.div
            key={ev.id}
            {...fadeUp}
            className="editorial-row"
            onMouseEnter={() => { setCursorState({ active: true, text: 'VIEW', img: ev.img }); setActive(ev.id); }}
            onMouseLeave={() => { setCursorState({ active: false, text: '', img: null }); setActive(null); }}
            style={{ display: 'grid', gridTemplateColumns: '10vw 1fr 24vw', alignItems: 'start' }}
          >
            <div className="t-medium row-id" style={{ paddingLeft: '4vw', paddingTop: '0.5vw', color: active === ev.id ? 'var(--accent)' : 'rgba(255,255,255,0.3)' }}>{ev.id}</div>
            <div>
              <div className="row-title">{ev.title}</div>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: active === ev.id ? 'auto' : 0, opacity: active === ev.id ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ paddingTop: '2vw', fontSize: 'clamp(0.85rem, 1.1vw, 1.1rem)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: '50vw' }}>
                  {ev.description}
                </div>
              </motion.div>
            </div>
            <div className="t-meta row-meta" style={{ paddingRight: '4vw', display: 'flex', flexDirection: 'column', gap: '0.8vw', alignItems: 'flex-end' }}>
              <div>{ev.date}</div>
              <div style={{ color: 'rgba(255,255,255,0.4)' }}>{ev.location}</div>
              <div style={{ display: 'flex', gap: '0.6vw', flexWrap: 'wrap', justifyContent: 'flex-end', marginTop: '0.5vw' }}>
                {ev.tags.map((tag) => (
                  <span key={tag} style={{ fontSize: '0.6rem', padding: '3px 8px', border: '1px solid rgba(0,120,212,0.5)', borderRadius: '20px', color: 'var(--accent)' }}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <section style={{ padding: '10vw 4vw', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <motion.div {...fadeUp}>
          <div className="t-meta" style={{ color: 'rgba(255,255,255,0.45)', marginBottom: '2vw' }}>WANT TO HOST AN EVENT?</div>
          <div className="t-large">LET'S<br />COLLABORATE</div>
        </motion.div>
        <motion.div {...fadeUp}
          className="t-meta magnetic-btn"
          style={{ fontSize: '1.2rem', cursor: 'pointer', borderBottom: '1px solid white', paddingBottom: '0.5vw' }}
          onMouseEnter={() => setCursorState({ active: true, text: 'PROPOSE', img: null })}
          onMouseLeave={() => setCursorState({ active: false, text: '', img: null })}
        >
          PROPOSE AN EVENT →
        </motion.div>
      </section>
    </main>
  );
};

export default Events;



