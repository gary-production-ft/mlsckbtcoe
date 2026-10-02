import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import './index.css';

const events = [
  { id: '01', title: 'GITHUB WORKSHOP', meta: 'OCT 2026 / WORKSHOP', img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80' },
  { id: '02', title: 'AI WORKSHOP', meta: 'OCT 2026 / AI', img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80' },
  { id: '03', title: 'HACKATHON', meta: 'NOV 2026 / EVENT', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80' },
];

const projects = [
  { id: '02', title: 'CYBER DEFENDER', meta: 'SECURITY / PYTHON', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80' },
];

const people = [
  { role: 'PRESIDENT', name: 'ALEX MERCER', img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80' },
  { role: 'TECH LEAD', name: 'SARAH CHEN', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80' },
  { role: 'EVENT LEAD', name: 'MARCUS JOHNSON', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80' },
];

function App() {
  const [cursorState, setCursorState] = useState<{ active: boolean, text: string, img: string | null }>({ active: false, text: '', img: null });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);

  // Smooth scroll
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.5 });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);

    const updateMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', updateMouse);
    
    return () => { lenis.destroy(); window.removeEventListener('mousemove', updateMouse); };
  }, []);

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
    <>
      {/* Custom Cursor */}
      <motion.div 
        className={`cursor ${cursorState.active ? 'active' : ''} ${cursorState.img ? 'image-mode' : ''}`}
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      >
        {!cursorState.img && cursorState.active && <span className="cursor-text">{cursorState.text}</span>}
        {cursorState.img && <img src={cursorState.img} className="cursor-img" alt="" />}
      </motion.div>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-logo">MLSC KBTCOE</div>
        <div className="nav-menu-btn" onClick={() => setMenuOpen(true)}>MENU</div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="menu-overlay"
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="nav-logo" style={{ position: 'absolute', top: '2vw', left: '2vw' }}>MLSC KBTCOE</div>
            <div className="nav-menu-btn" style={{ position: 'absolute', top: '2vw', right: '2vw' }} onClick={() => setMenuOpen(false)}>CLOSE</div>
            
            {['ABOUT', 'EVENTS', 'PROJECTS', 'COMMUNITY', 'TEAM'].map((item, i) => (
              <motion.div 
                key={item} 
                className="menu-link"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* SCENE 01: HERO TYPOGRAPHY */}
        <div ref={heroRef} className="scene sticky-container" style={{ height: '200vh' }}>
          <div className="sticky-content">
            <motion.div style={{ opacity: heroOpacity, display: 'flex', flexDirection: 'column', padding: '0 4vw' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="t-meta" style={{ width: '30%', textAlign: 'left' }}>MICROSOFT LEARN<br/>STUDENT COMMUNITY</div>
              </div>
              
              <motion.div className="t-giant" style={{ x: mlscX }}>MLSC</motion.div>
              
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
        <div ref={imageRevealRef} className="scene" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div 
            style={{ width: imgWidth, height: '70vh', position: 'relative' }} 
            className="ph-img"
          >
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80" alt="Community" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
              <div className="t-large" style={{ color: 'white', textShadow: '0 10px 30px rgba(0,0,0,0.5)', whiteSpace: 'nowrap' }}>THIS IS MLSC</div>
            </div>
          </motion.div>
        </div>

        {/* SCENE 04: COMMUNITY NUMBERS */}
        <div ref={statsRef} className="scene sticky-container">
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
              <div className="t-medium" style={{ width: '10vw', paddingLeft: '4vw' }}>{ev.id}</div>
              <div className="row-title" style={{ flex: 1 }}>
                {ev.title.split(' ').map((w, i) => <React.Fragment key={i}>{w}<br/></React.Fragment>)}
              </div>
              <div className="t-meta" style={{ width: '20vw', paddingRight: '4vw' }}>
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
              <div className="t-medium" style={{ width: '10vw', paddingLeft: '4vw' }}>{proj.id}</div>
              <div className="row-title" style={{ flex: 1 }}>{proj.title}</div>
              <div className="t-meta" style={{ width: '20vw', paddingRight: '4vw', textAlign: 'right' }}>
                {proj.meta}
              </div>
            </div>
          ))}
        </div>

        {/* SCENE 07: HORIZONTAL SCROLL (TECHNOLOGY) */}
        <div ref={techRef} className="scene sticky-container" style={{ height: '300vh' }}>
          <div className="sticky-content">
            <motion.div 
              style={{ x: techX, display: 'flex', whiteSpace: 'nowrap', gap: '8vw', paddingLeft: '4vw' }}
              className="t-large"
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
          <div className="t-large" style={{ marginBottom: '8vw' }}>THE<br/>PEOPLE<br/>BEHIND<br/>MLSC</div>
          {people.map((p, i) => (
            <div 
              key={i} 
              className="person-row"
              onMouseEnter={() => setCursorState({ active: true, text: 'VIEW', img: p.img })}
              onMouseLeave={() => setCursorState({ active: false, text: '', img: null })}
            >
              <div className="t-meta">{p.role}</div>
              <div className="person-name">{p.name}</div>
            </div>
          ))}
        </div>

        {/* SCENE 09: SOCIAL IMAGES */}
        <div className="scene social-grid">
          <div className="ph-img" style={{ gridColumn: '1 / 6', height: '60vh' }}>
            <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800" className="social-img" alt=""/>
          </div>
          <div className="ph-img" style={{ gridColumn: '8 / 13', height: '40vh', marginTop: '20vh' }}>
             <img src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800" className="social-img" alt=""/>
          </div>
          <div className="ph-img" style={{ gridColumn: '3 / 9', height: '80vh', marginTop: '10vh' }}>
             <img src="https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=800" className="social-img" alt=""/>
          </div>
        </div>

        {/* SCENE 10: CTA */}
        <div className="scene" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 4vw' }}>
          <div className="t-giant" style={{ lineHeight: 0.8 }}>READY</div>
          <div className="t-giant" style={{ lineHeight: 0.8, marginLeft: '10vw' }}>TO</div>
          <div className="t-giant" style={{ lineHeight: 0.8 }}>BUILD?</div>
          
          <div style={{ marginTop: '10vw', display: 'flex', justifyContent: 'flex-end' }}>
            <div 
              className="t-meta" 
              style={{ fontSize: '1.5rem', cursor: 'pointer', borderBottom: '2px solid white', paddingBottom: '0.5vw' }}
              onMouseEnter={() => setCursorState({ active: true, text: 'JOIN', img: null })}
              onMouseLeave={() => setCursorState({ active: false, text: '', img: null })}
            >
              JOIN MLSC →
            </div>
          </div>
        </div>

      </main>
    </>
  );
}

export default App;
