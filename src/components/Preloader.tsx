import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); // Wait a bit after hitting 100%
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="preloader"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: 'fixed',
        top: 0, left: 0, width: '100vw', height: '100vh',
        backgroundColor: 'var(--bg)', zIndex: 100000,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        color: 'var(--fg)'
      }}
    >
      <div className="t-large" style={{ overflow: 'hidden' }}>
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {progress > 100 ? 100 : progress}%
        </motion.div>
      </div>
      <div className="t-meta" style={{ marginTop: '2vw' }}>LOADING MSC EXPERIENCE</div>
    </motion.div>
  );
};

export default Preloader;
