import React, { createContext, useState, useContext } from 'react';

const PreLoaderContext = createContext();

export const PreLoaderProvider = ({ children }) => {
  const [hasVisited, setHasVisited] = useState(false);

  return (
    <PreLoaderContext.Provider value={{ hasVisited, setHasVisited }}>
      {children}
    </PreLoaderContext.Provider>
  );
};

export const usePreLoader = () => useContext(PreLoaderContext);
