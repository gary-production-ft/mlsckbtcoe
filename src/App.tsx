import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { AnimatePresence } from 'framer-motion';

import './index.css';
import { CursorProvider } from './context/CursorContext';
import Cursor from './components/Cursor';
import Navigation from './components/Navigation';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import GenericPage from './pages/GenericPage';

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
      <Router>
        <Cursor />
        <Navigation />
        
        <AnimatePresence mode="wait">
          {loading && <Preloader onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<GenericPage title="ABOUT US" />} />
            <Route path="/events" element={<GenericPage title="EVENTS" />} />
            <Route path="/projects" element={<GenericPage title="PROJECTS" />} />
            <Route path="/team" element={<GenericPage title="OUR TEAM" />} />
          </Routes>
        )}
      </Router>
    </CursorProvider>
  );
}

export default App;
