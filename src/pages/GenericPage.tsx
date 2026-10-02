import React from 'react';
import { useCursor } from '../context/CursorContext';

const GenericPage: React.FC<{ title: string }> = ({ title }) => {
  const { setCursorState } = useCursor();

  return (
    <div
      className="scene"
      style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4vw' }}
      onMouseEnter={() => setCursorState({ active: true, text: 'SCROLL', img: null })}
      onMouseLeave={() => setCursorState({ active: false, text: '', img: null })}
    >
      <div className="t-giant" style={{ textAlign: 'center' }}>
        {title}
      </div>
    </div>
  );
};

export default GenericPage;
