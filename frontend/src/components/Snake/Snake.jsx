import React, { useState, useEffect, useRef, createContext } from 'react';
import styles from './Snake.module.scss';
import { useNavigate } from 'react-router-dom';

const TILE_SIZE = 20;
const ROWS = 20;
const COLS = 30;
const INITIAL_SNAKE = [
  { x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) },
  { x: Math.floor(COLS / 2) - 1, y: Math.floor(ROWS / 2) },
  { x: Math.floor(COLS / 2) - 2, y: Math.floor(ROWS / 2) },
];
const INITIAL_DIRECTION = 'e';
const GAME_DURATION = 60;

function Snake() {
  const navigate = useNavigate();
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(generateFood(INITIAL_SNAKE));
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [settings, setSettings] = useState({
    speed: 100,
    snakeColor: '#0f0',
    foodColor: '#f00',
    foodShape: 'circle',
  });
  const timerRef = useRef(null);

  useEffect(() => {
    const preventScroll = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', preventScroll);
    return () => window.removeEventListener('keydown', preventScroll);
  }, []);

  useEffect(() => {
    if (!isGameStarted) return;
    const handleKeyDown = (e) => {
      const newDirection = getDirection(e.key, direction);
      if (newDirection) setDirection(newDirection);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [direction, isGameStarted]);

  useEffect(() => {
    if (!isGameStarted) return;
    const interval = setInterval(() => moveSnake(), settings.speed);
    return () => clearInterval(interval);
  }, [direction, food, settings.speed, isGameStarted]);

  useEffect(() => {
    if (!isGameStarted) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          endGame();
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [isGameStarted]);

  const moveSnake = () => {
    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = getNextPosition(head, direction);
      if (checkCollision(newHead, prevSnake)) {
        endGame();
        return prevSnake;
      }
      const newSnake = [newHead, ...prevSnake];
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((prev) => prev + 1);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }
      return newSnake;
    });
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(generateFood(INITIAL_SNAKE));
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setIsGameOver(false);
    setIsGameStarted(false);
  };

  const openSettings = () => {
    const newSpeed = prompt('Enter snake speed (lower is faster):', settings.speed);
    const newSnakeColor = prompt('Enter snake color (e.g., #0f0):', settings.snakeColor);
    const newFoodColor = prompt('Enter food color (e.g., #f00):', settings.foodColor);
    const newFoodShape = prompt('Enter food shape (circle/square):', settings.foodShape);
    setSettings({
      speed: parseInt(newSpeed) || settings.speed,
      snakeColor: newSnakeColor || settings.snakeColor,
      foodColor: newFoodColor || settings.foodColor,
      foodShape: newFoodShape === 'square' ? 'square' : 'circle',
    });
  };

  const endGame = () => {
    setIsGameOver(true);
    setIsGameStarted(false);
    clearInterval(timerRef.current);
  };

  return (
    <div className={styles.app}>
      {!isGameStarted && !isGameOver ? (
        <div className={styles.menu}>
          <h1>Snake Game</h1>
          <button onClick={() => setIsGameStarted(true)}>Play</button>
          <button onClick={openSettings}>Settings</button>
          <button onClick={() => navigate("/Games")}>Exit</button>
        </div>
      ) : isGameOver ? (
        <div className={styles.menu}>
          <h1>Game Over</h1>
          <p>Score: {score}</p>
          <button onClick={resetGame}>Play Again</button>
          <button onClick={openSettings}>Settings</button>
          <button onClick={() => navigate("/Games")}>Exit</button>
        </div>
      ) : (
        <>
          <div className={styles.infoBar}>
            <h1 className={styles.score}>Score: {score}</h1>
            <h1 className={styles.timer}>Time Left: {timeLeft}s</h1>
            <button className={styles.menuButton} onClick={resetGame}>Menu</button>
          </div>
          <div className={styles.board} style={{ width: `${COLS * TILE_SIZE}px`, height: `${ROWS * TILE_SIZE}px` }}>
            {Array.from({ length: ROWS }).map((_, y) => (
              <div key={y} className={styles.row}>
                {Array.from({ length: COLS }).map((_, x) => (
                  <div key={x} className={styles.cell}></div>
                ))}
              </div>
            ))}
            {snake.map((segment, index) => (
              <div
                key={index}
                className={styles.snake}
                style={{
                  left: `${segment.x * TILE_SIZE}px`,
                  top: `${segment.y * TILE_SIZE}px`,
                  backgroundColor: settings.snakeColor,
                }}
              ></div>
            ))}
            <div
              className={styles.food}
              style={{
                left: `${food.x * TILE_SIZE}px`,
                top: `${food.y * TILE_SIZE}px`,
                backgroundColor: settings.foodColor,
                borderRadius: settings.foodShape === 'circle' ? '50%' : '0',
              }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
}

function generateFood(snake) {
  const availableTiles = [];
  for (let x = 0; x < COLS; x++) {
    for (let y = 0; y < ROWS; y++) {
      if (!snake.some((segment) => segment.x === x && segment.y === y)) {
        availableTiles.push({ x, y });
      }
    }
  }
  return availableTiles[Math.floor(Math.random() * availableTiles.length)];
}

function getDirection(key, currentDirection) {
  const directions = {
    ArrowUp: 'n',
    w: 'n',
    ArrowDown: 's',
    s: 's',
    ArrowLeft: 'w',
    a: 'w',
    ArrowRight: 'e',
    d: 'e',
  };
  const newDirection = directions[key];
  return newDirection && newDirection !== getOppositeDirection(currentDirection) ? newDirection : null;
}

function getOppositeDirection(direction) {
  return { n: 's', s: 'n', e: 'w', w: 'e' }[direction];
}

function getNextPosition(head, direction) {
  return {
    x: direction === 'e' ? (head.x + 1) % COLS : direction === 'w' ? (head.x - 1 + COLS) % COLS : head.x,
    y: direction === 's' ? (head.y + 1) % ROWS : direction === 'n' ? (head.y - 1 + ROWS) % ROWS : head.y,
  };
}

function checkCollision(newHead, snake) {
  return snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y);
}

export default Snake;
