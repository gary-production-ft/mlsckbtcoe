import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { events, projects, people } from '../data/mockData';

const Home: React.FC = () => {
  const { setCursorState } = useCursor();

  // Scroll references
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const mlscX = useTransform(heroProgress, [0, 1], ["0vw", "-100vw"]);
  const kbtcoeX = useTransform(heroProgress, [0, 1], ["0vw", "100vw"]);
  const heroOpacity = useTransform(heroProgress, [0.5, 1], [1, 0]);

  const imageRevealRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: imgProgress } = useScroll({ target: imageRevealRef, offset: ["start end", "center center"] });
  const imgWidth = useTransform(imgProgress, [0, 1], ["20vw", "100vw"]);

  const statsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: statsProgress } = useScroll({ target: statsRef, offset: ["start start", "end end"] });
  const stat1Y = useTransform(statsProgress, [0, 0.33], ["0%", "-100%"]);
  const stat1Opacity = useTransform(statsProgress, [0, 0.33], [1, 0]);

  const techRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: techProgress } = useScroll({ target: techRef, offset: ["start start", "end end"] });
  const techX = useTransform(techProgress, [0, 1], ["0%", "-50%"]);

  return (
    <main>
      {/* SCENE 01: HERO TYPOGRAPHY */}
      <div ref={heroRef} className="scene sticky-container" style={{ height: '200vh' }}>
        <div className="sticky-content">
          <motion.div style={{ opacity: heroOpacity, display: 'flex', flexDirection: 'column', padding: '0 4vw' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="t-meta" style={{ width: '30%', textAlign: 'left', marginTop: '20vh' }}>MICROSOFT LEARN<br />STUDENT COMMUNITY</div>
            </div>

            <motion.div className="t-giant" style={{ x: mlscX }}>MSC</motion.div>

            <motion.div className="t-giant" style={{ x: kbtcoeX, textAlign: 'right', marginTop: '-5vw' }}>KBTCOE</motion.div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4vw' }}>
              <div className="t-meta">SCROLL →</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* SCENE 02: MANIFESTO */}
      <div className="scene" style={{ padding: '15vw 4vw' }}>
        {['WE LEARN', 'WE BUILD', 'WE CONNECT', 'WE LEAD'].map((word, i) => (
          <motion.div
            key={i}
            className="t-large"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-20%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            style={{ textAlign: i % 2 !== 0 ? 'right' : 'left' }}
          >
            {word}
          </motion.div>
        ))}
      </div>

      {/* SCENE 03: IMAGE REVEAL */}
      <div ref={imageRevealRef} className="scene image-reveal-scene" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          style={{ width: imgWidth, height: '70vh', position: 'relative' }}
          className="ph-img"
        >
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80" alt="Community" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
            <div className="t-large" style={{ color: 'white', textShadow: '0 10px 30px rgba(0,0,0,0.5)', whiteSpace: 'nowrap' }}>THIS IS MSC</div>
          </div>
        </motion.div>
      </div>

      {/* SCENE 04: COMMUNITY NUMBERS */}
      <div ref={statsRef} className="scene sticky-container stats-scene">
        <div className="sticky-content" style={{ padding: '0 4vw' }}>
          {/* Stat 1 */}
          <motion.div style={{ y: stat1Y, opacity: stat1Opacity, position: 'absolute', top: '50%', left: '4vw', transform: 'translateY(-50%)' }}>
            <div className="t-giant">500+</div>
            <div className="t-meta" style={{ marginTop: '2vw' }}>STUDENTS LEARNING TOGETHER</div>
          </motion.div>

          {/* Stat 2 */}
          <motion.div style={{ y: useTransform(statsProgress, [0.33, 0.66, 0.99], ["100%", "0%", "-100%"]), opacity: useTransform(statsProgress, [0.33, 0.66, 0.99], [0, 1, 0]), position: 'absolute', top: '50%', right: '4vw', transform: 'translateY(-50%)', textAlign: 'right' }}>
            <div className="t-giant">30+</div>
            <div className="t-meta" style={{ marginTop: '2vw' }}>TECHNICAL EVENTS</div>
          </motion.div>
        </div>
      </div>

      {/* SCENE 05: EVENTS */}
      <div className="scene" style={{ padding: '10vw 0' }}>
        <div className="t-meta" style={{ padding: '0 4vw', marginBottom: '6vw' }}>[ OUR EVENTS ]</div>
        {events.map((ev) => (
          <div
            key={ev.id}
            className="editorial-row"
            onMouseEnter={() => setCursorState({ active: true, text: 'VIEW', img: ev.img })}
            onMouseLeave={() => setCursorState({ active: false, text: '', img: null })}
          >
            <div className="t-medium row-id" style={{ width: '10vw', paddingLeft: '4vw' }}>{ev.id}</div>
            <div className="row-title" style={{ flex: 1 }}>
              {ev.title.split(' ').map((w, i) => <React.Fragment key={i}>{w}<br /></React.Fragment>)}
            </div>
            <div className="t-meta row-meta" style={{ width: '20vw', paddingRight: '4vw' }}>
              {ev.meta.split(' / ').map((m, i) => <div key={i}>{m}</div>)}
            </div>
          </div>
        ))}
      </div>

      {/* SCENE 06: PROJECTS */}
      <div className="scene" style={{ padding: '10vw 0' }}>
        <div className="t-meta" style={{ padding: '0 4vw', marginBottom: '6vw' }}>[ PROJECTS ]</div>
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="editorial-row"
            onMouseEnter={() => setCursorState({ active: true, text: 'OPEN', img: proj.img })}
            onMouseLeave={() => setCursorState({ active: false, text: '', img: null })}
          >
            <div className="t-medium row-id" style={{ width: '10vw', paddingLeft: '4vw' }}>{proj.id}</div>
            <div className="row-title" style={{ flex: 1 }}>{proj.title}</div>
            <div className="t-meta row-meta" style={{ width: '20vw', paddingRight: '4vw', textAlign: 'right' }}>
              {proj.meta}
            </div>
          </div>
        ))}
      </div>

      {/* SCENE 07: HORIZONTAL SCROLL (TECHNOLOGY) */}
      <div ref={techRef} className="scene sticky-container tech-scene" style={{ height: '300vh' }}>
        <div className="sticky-content">
          <motion.div
            style={{ x: techX, display: 'flex', whiteSpace: 'nowrap', gap: '8vw', paddingLeft: '4vw' }}
            className="t-large tech-scroll"
          >
            <span>AZURE</span>
            <span>GITHUB</span>
            <span>AI</span>
            <span>CLOUD</span>
            <span>PYTHON</span>
            <span>FLUTTER</span>
            <span>REACT</span>
          </motion.div>
        </div>
      </div>

      {/* SCENE 08: PEOPLE */}
      <div className="scene" style={{ padding: '10vw 4vw' }}>
        <div className="t-large" style={{ marginBottom: '8vw' }}>THE<br />PEOPLE<br />BEHIND<br />MSC</div>
        {people.map((p, i) => (
          <div
            key={i}
            className="person-row"
            onMouseEnter={() => setCursorState({ active: true, text: 'VIEW', img: p.img })}
            onMouseLeave={() => setCursorState({ active: false, text: '', img: null })}
          >
            <div className="t-meta person-role">{p.role}</div>
            <div className="person-name">{p.name}</div>
          </div>
        ))}
      </div>

      {/* SCENE 09: SOCIAL IMAGES */}
      <div className="scene social-grid">
        <div className="ph-img social-item-1" style={{ gridColumn: '1 / 6', height: '60vh' }}>
          <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800" className="social-img" alt="" />
        </div>
        <div className="ph-img social-item-2" style={{ gridColumn: '8 / 13', height: '40vh', marginTop: '20vh' }}>
          <img src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800" className="social-img" alt="" />
        </div>
        <div className="ph-img social-item-3" style={{ gridColumn: '3 / 9', height: '80vh', marginTop: '10vh' }}>
          <img src="https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=800" className="social-img" alt="" />
        </div>
      </div>

      {/* SCENE 10: CTA */}
      <div className="scene cta-scene" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 4vw' }}>
        <div className="t-giant" style={{ lineHeight: 0.8 }}>READY</div>
        <div className="t-giant cta-to" style={{ lineHeight: 0.8, marginLeft: '10vw' }}>TO</div>
        <div className="t-giant" style={{ lineHeight: 0.8 }}>BUILD?</div>

        <div style={{ marginTop: '10vw', display: 'flex', justifyContent: 'flex-end' }}>
          <div
            className="t-meta magnetic-btn"
            style={{ fontSize: '1.5rem', cursor: 'pointer', borderBottom: '2px solid white', paddingBottom: '0.5vw' }}
            onMouseEnter={() => setCursorState({ active: true, text: 'JOIN', img: null })}
            onMouseLeave={() => setCursorState({ active: false, text: '', img: null })}
          >
            JOIN MSC →
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
