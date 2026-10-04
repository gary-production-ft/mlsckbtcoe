import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { AnimatePresence } from 'framer-motion';

import './index.css';
import { CursorProvider } from './context/CursorContext';
import Cursor from './components/Cursor';
import Navigation from './components/Navigation';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import Projects from './pages/Projects';
import Team from './pages/Team';
import PixelSnow from './components/PixelSnow';

function App() {
  const [loading, setLoading] = useState(true);

  // Smooth scroll
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.5 });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <CursorProvider>
      <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}>
        <PixelSnow 
          color="#ffffff"
          flakeSize={0.01}
          minFlakeSize={1.25}
          pixelResolution={200}
          speed={1.25}
          density={0.3}
          direction={125}
          brightness={1}
        />
      </div>
      <Router>
        <Cursor />
        <Navigation />
        
        <AnimatePresence mode="wait">
          {loading && <Preloader onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/team" element={<Team />} />
          </Routes>
        )}
      </Router>
    </CursorProvider>
  );
}

export default App;
