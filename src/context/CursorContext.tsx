import React, { createContext, useContext, useState, useEffect } from 'react';

type CursorState = {
  active: boolean;
  text: string;
  img: string | null;
};

interface CursorContextType {
  cursorState: CursorState;
  setCursorState: React.Dispatch<React.SetStateAction<CursorState>>;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorState, setCursorState] = useState<CursorState>({ active: false, text: '', img: null });

  return (
    <CursorContext.Provider value={{ cursorState, setCursorState }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};
