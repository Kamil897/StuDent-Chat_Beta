import React, { useState, useEffect, useRef, createContext } from 'react';
import s from './AnimatedSpan.module.scss';

const AnimatedSpan = ({ children }) => {
  const [bgPosition, setBgPosition] = useState(0);
  const intervalRef = useRef(null);

  const handleMouseEnter = () => {
    clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setBgPosition((prev) => prev + 1); 
    }, 10); 
  };

  const handleMouseLeave = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <span
      className={s.animatedSpan}
      style={{ backgroundPosition: `left ${bgPosition}px bottom` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </span>
  );
};

export default AnimatedSpan;
