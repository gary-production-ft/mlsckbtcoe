import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

const Cursor: React.FC = () => {
  const { cursorState } = useCursor();
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, []);

  return (
    <motion.div
      className={`cursor ${cursorState.active ? 'active' : ''} ${cursorState.img ? 'image-mode' : ''}`}
      animate={{ x: mousePos.x, y: mousePos.y }}
      transition={{ type: 'tween', ease: 'linear', duration: 0 }}
    >
      {!cursorState.img && cursorState.active && <span className="cursor-text">{cursorState.text}</span>}
      {cursorState.img && <img src={cursorState.img} className="cursor-img" alt="" />}
    </motion.div>
  );
};

export default Cursor;
