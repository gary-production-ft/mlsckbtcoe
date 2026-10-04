import React from 'react';
import { motion } from 'framer-motion';
import { stats, partners } from '../data/mockData';

const fadeUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, margin: '-15%' },
  transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
};

const About: React.FC = () => {
  return (
    <main className="inner-page">
      {/* HERO */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', paddingTop: 'clamp(80px, 9vw, 130px)', paddingLeft: '4vw', paddingRight: '4vw', paddingBottom: '6vw', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <motion.div {...fadeUp} className="t-meta" style={{ marginBottom: '3vw', color: 'rgba(255,255,255,0.45)' }}>
          ABOUT US — MICROSOFT LEARN STUDENT COMMUNITY
        </motion.div>
        <motion.h1
          className="t-giant"
          style={{ lineHeight: 0.85 }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          WE ARE<br />MSC<br />KBTCOE
        </motion.h1>
      </section>

      {/* MISSION */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4vw', padding: '12vw 4vw', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <motion.div {...fadeUp}>
          <div className="t-meta" style={{ marginBottom: '3vw', color: 'rgba(255,255,255,0.45)' }}>[ OUR MISSION ]</div>
          <div style={{ fontSize: 'clamp(1.4rem, 2.5vw, 3rem)', fontWeight: 300, lineHeight: 1.4, color: 'rgba(255,255,255,0.85)' }}>
            To empower every student at KBTCOE with the skills, network, and confidence to build technology that matters — starting from day one.
          </div>
        </motion.div>
        <motion.div {...fadeUp} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '2vw' }}>
          <div style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.2rem)', fontWeight: 400, lineHeight: 1.8, color: 'rgba(255,255,255,0.55)' }}>
            Microsoft Learn Student Community (MSC) at Karmaveer Bhaurao Patil College of Engineering, Nashik is an official Microsoft-recognized student chapter. We bridge the gap between classroom learning and real-world technology through workshops, hackathons, and industry collaborations.
          </div>
          <div style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.2rem)', fontWeight: 400, lineHeight: 1.8, color: 'rgba(255,255,255,0.55)' }}>
            Our community is built on three pillars: <strong style={{ color: 'white' }}>Learn</strong>, <strong style={{ color: 'white' }}>Build</strong>, and <strong style={{ color: 'white' }}>Connect</strong>.
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <section style={{ padding: '10vw 4vw', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <motion.div {...fadeUp} className="t-meta" style={{ marginBottom: '6vw', color: 'rgba(255,255,255,0.45)' }}>[ BY THE NUMBERS ]</motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4vw' }}>
          {stats.map((s, i) => (
            <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }}>
              <div className="t-giant" style={{ color: 'var(--accent)' }}>{s.value}</div>
              <div className="t-meta" style={{ marginTop: '1.5vw', color: 'rgba(255,255,255,0.45)' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PILLARS */}
      <section style={{ padding: '10vw 4vw', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <motion.div {...fadeUp} className="t-meta" style={{ marginBottom: '6vw', color: 'rgba(255,255,255,0.45)' }}>[ WHAT WE DO ]</motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3vw' }}>
          {[
            { icon: '◈', title: 'LEARN', body: 'Curated workshops, bootcamps and learning paths aligned with Microsoft, GitHub, and industry certifications.' },
            { icon: '◉', title: 'BUILD', body: 'Real projects that solve real problems. We ship code, design products, and contribute to open source.' },
            { icon: '◎', title: 'CONNECT', body: 'A thriving network of students, alumni, mentors and Microsoft industry professionals.' },
          ].map((p, i) => (
            <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.12 }}
              style={{ padding: '3vw', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '2vw', color: 'var(--accent)' }}>{p.icon}</div>
              <div className="t-medium" style={{ marginBottom: '1.5vw' }}>{p.title}</div>
              <div style={{ fontSize: 'clamp(0.85rem, 1.1vw, 1.1rem)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>{p.body}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PARTNERS */}
      <section style={{ padding: '10vw 4vw' }}>
        <motion.div {...fadeUp} className="t-meta" style={{ marginBottom: '6vw', color: 'rgba(255,255,255,0.45)' }}>[ ECOSYSTEM PARTNERS ]</motion.div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3vw', alignItems: 'center' }}>
          {partners.map((p, i) => (
            <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              style={{ fontSize: 'clamp(1.5rem, 3vw, 4rem)', fontWeight: 800, color: 'rgba(255,255,255,0.12)', letterSpacing: '-0.03em' }}>
              {p}
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default About;



