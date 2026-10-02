import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'EVENTS', path: '/events' },
    { name: 'PROJECTS', path: '/projects' },
    { name: 'TEAM', path: '/team' }
  ];

  return (
    <>
      <nav className="nav">
        <Link to="/" className="nav-logo" style={{ textDecoration: 'none', color: 'inherit' }}>MSC KBTCOE</Link>
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
            <Link to="/" className="nav-logo" style={{ position: 'absolute', top: '2vw', left: '2vw', textDecoration: 'none', color: 'inherit' }} onClick={() => setMenuOpen(false)}>MSC KBTCOE</Link>
            <div className="nav-menu-btn" style={{ position: 'absolute', top: '2vw', right: '2vw' }} onClick={() => setMenuOpen(false)}>CLOSE</div>

            {links.map((link, i) => (
              <motion.div
                key={link.name}
                className="menu-link-wrapper"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                onClick={() => setMenuOpen(false)}
              >
                <Link to={link.path} className={`menu-link ${location.pathname === link.path ? 'active-link' : ''}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
