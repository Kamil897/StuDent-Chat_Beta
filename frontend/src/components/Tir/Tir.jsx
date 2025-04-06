import React, { useState, useEffect, useRef, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Tir.css';

const Tir = () => {
  const navigate = useNavigate();
  const [targets, setTargets] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const intervalRef = useRef(null);

  const targetImages = [
    'url(/6_normal.png)', 
    'url(/5_normal.png)', 
    'url(/4_normal.png)'
  ];

  const generateTargets = () => {
    const newTargets = Array.from({ length: 3 }, () => {
      return {
        id: Math.random().toString(36).substr(2, 9),
        x: `${Math.random() * 90}%`,
        y: `${Math.random() * 70}%`,
        image: targetImages[Math.floor(Math.random() * targetImages.length)],
      };
    });
    setTargets((prev) => [...prev, ...newTargets].slice(-12));
  };

  useEffect(() => {
    if (!isMenuOpen && timeLeft > 0) {
      intervalRef.current = setInterval(generateTargets, 1000);
      return () => clearInterval(intervalRef.current);
    }
  }, [isMenuOpen, timeLeft]);

  useEffect(() => {
    if (!isMenuOpen && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1200);
      return () => clearTimeout(timer);
    }
  }, [isMenuOpen, timeLeft]);

  const resetGame = () => {
    setScore(0);
    setTimeLeft(30);
    setTargets([]);
    setIsMenuOpen(false);
  };

  const handleTargetClick = (id) => {
    setTargets((prev) => prev.filter((target) => target.id !== id));
    setScore((prev) => prev + 1);
  };

  return (
    <div className="tir">
      {isMenuOpen ? (
        <div className="menu">
          <h1>Shooting Game</h1>
          <button onClick={resetGame}>Play</button>
          <button onClick={() => alert('Settings will be available soon!')}>Settings</button>
          <button onClick={() => navigate('/Games')}>Exit</button>
        </div>
      ) : (
        <>
          {timeLeft > 0 && (
            <header className="header">
              <h1>Тир</h1>
              <div className="info">
                <p>Вы набрали: {score}</p>
                <p>Время: {timeLeft}s</p>
              </div>
            </header>
          )}
          <main>
            {timeLeft === 0 ? (
              <div className="game-over">
                <h2>Игра завершена</h2>
                <p>Вы набрали: {score}</p>
                <button className="over-btn" onClick={() => setIsMenuOpen(true)}>Назад</button>
              </div>
            ) : (
              <div className="game-area">
                {targets.map((target) => (
                  <div
                    key={target.id}
                    className="target"
                    style={{
                      left: target.x,
                      top: target.y,
                      position: 'absolute',
                      backgroundImage: target.image, 
                      backgroundSize: 'cover',
                      width: '70px',
                      height: '92px',
                    }}
                    onClick={() => handleTargetClick(target.id)}
                  ></div>
                ))}
              </div>
            )}
          </main>
        </>
      )}
    </div>
  );
};

export default Tir;
