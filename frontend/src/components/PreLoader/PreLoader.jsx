import React, { useState, useEffect } from 'react';
import s from './PreLoader.module.scss';

const PreLoader = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');

    if (!hasVisited) {
      setIsVisible(true);
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, []);

  useEffect(() => {
    document.body.classList.add("no-scroll");

    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.classList.remove("no-scroll");
      }, 5000); // Увеличил время загрузки до 5 секунд

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={s.loadingContainer}>
      <div className={s.wrapper}>
        <div className={s.circle}></div>
        <div className={s.circle}></div>
        <div className={s.circle}></div>
        <div className={s.shadow}></div>
        <div className={s.shadow}></div>
        <div className={s.shadow}></div>
      </div>
    </div>
  );
};

export default PreLoader;
