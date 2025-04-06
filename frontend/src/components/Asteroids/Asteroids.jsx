import { useEffect, useRef, useState } from 'react';
import styles from './asteroid.module.css'

const Doom = () => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState({
    score: 0,
    gameOver: false
  });
  
  const shipRef = useRef({
    x: 400,
    y: 300,
    angle: 0,
    velocityX: 0,
    velocityY: 0,
    size: 15,
  });

  const asteroidsRef = useRef([]);
  const bulletsRef = useRef([]);
  const keysRef = useRef({});
  const animationFrameIdRef = useRef(null);

  const TAU = Math.PI * 2;

  useEffect(() => {
    const handleKeyDown = (e) => (keysRef.current[e.key] = true);
    const handleKeyUp = (e) => (keysRef.current[e.key] = false);
    
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  
  const createAsteroid = () => {
    const size = Math.random() * 30 + 20;
    const sides = Math.floor(Math.random() * 5 + 5);
    let asteroid;

    do {
      asteroid = {
        x: Math.random() * 800,
        y: Math.random() * 600,
        velocityX: (Math.random() - 0.5) * 2,
        velocityY: (Math.random() - 0.5) * 2,
        size,
        sides,
        angle: Math.random() * TAU,
        rotationSpeed: (Math.random() - 0.5) * 0.05
      };
    } while (Math.hypot(asteroid.x - shipRef.current.x, asteroid.y - shipRef.current.y) < 
            shipRef.current.size + asteroid.size + 100);
    
    return asteroid;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 1000;
    canvas.height = 600;

    asteroidsRef.current = Array(10).fill().map(() => createAsteroid());

    const drawShip = () => {
      const { x, y, angle, size } = shipRef.current;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(size, 10);
      ctx.lineTo(-size, size / 2);
      ctx.lineTo(-size, -size / 2);
      ctx.closePath();
      ctx.strokeStyle = "white";
      ctx.stroke();
      ctx.restore();
    };

    const drawAsteroid = (asteroid) => {
      const { x, y, size, angle } = asteroid;
      const segments = 20;
      ctx.beginPath();

      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * TAU;
        const randomFactor = 0.8 + Math.random() * 0.4;
        const xOffset = Math.cos(theta + angle) * size * randomFactor;
        const yOffset = Math.sin(theta + angle) * size * randomFactor;

        if (i === 0) {
          ctx.moveTo(x + xOffset, y + yOffset);
        } else {
          ctx.lineTo(x + xOffset, y + yOffset);
        }
      }

      ctx.closePath();
      ctx.strokeStyle = "gray";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "rgba(100, 100, 100, 0.6)";
      ctx.fill();
    };

    const drawBullet = (bullet) => {
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, 2, 0, TAU);
      ctx.fillStyle = "white";
      ctx.fill();
    };

    const updateShip = () => {
      const ship = shipRef.current;
      if (keysRef.current["ArrowUp"]) {
        ship.velocityX += Math.cos(ship.angle) * 0.1;
        ship.velocityY += Math.sin(ship.angle) * 0.1;
      }
      if (keysRef.current["ArrowLeft"]) ship.angle -= 0.05;
      if (keysRef.current["ArrowRight"]) ship.angle += 0.05;

      ship.velocityX *= 0.99;
      ship.velocityY *= 0.99;

      ship.x += ship.velocityX;
      ship.y += ship.velocityY;

      if (ship.x > canvas.width) ship.x = 0;
      if (ship.x < 0) ship.x = canvas.width;
      if (ship.y > canvas.height) ship.y = 0;
      if (ship.y < 0) ship.y = canvas.height;

      if (keysRef.current[" "] && bulletsRef.current.length < 5) {
        bulletsRef.current.push({
          x: ship.x,
          y: ship.y,
          velocityX: Math.cos(ship.angle) * 5,
          velocityY: Math.sin(ship.angle) * 5,
          lifetime: 100,
        });
      }
    };

    const updateAsteroids = () => {
      asteroidsRef.current.forEach(asteroid => {
        asteroid.x += asteroid.velocityX;
        asteroid.y += asteroid.velocityY;
        asteroid.angle += asteroid.rotationSpeed;

        asteroid.x = (asteroid.x + canvas.width) % canvas.width;
        asteroid.y = (asteroid.y + canvas.height) % canvas.height;
      });
    };

    const updateBullets = () => {
      bulletsRef.current = bulletsRef.current.filter(bullet => {
        bullet.x += bullet.velocityX;
        bullet.y += bullet.velocityY;
        bullet.lifetime--;
        return bullet.lifetime > 0 && 
               bullet.x >= 0 && 
               bullet.x <= canvas.width && 
               bullet.y >= 0 && 
               bullet.y <= canvas.height;
      });
    };

    const checkCollisions = () => {
      const ship = shipRef.current;
      asteroidsRef.current.forEach(asteroid => {
        if (Math.hypot(ship.x - asteroid.x, ship.y - asteroid.y) < ship.size + asteroid.size) {
          setGameState(prev => ({ ...prev, gameOver: true }));
        }
      });

      bulletsRef.current.forEach((bullet, bulletIndex) => {
        asteroidsRef.current.forEach((asteroid, asteroidIndex) => {
          if (Math.hypot(bullet.x - asteroid.x, bullet.y - asteroid.y) < asteroid.size) {
            bulletsRef.current.splice(bulletIndex, 1);

            if (asteroid.size > 15) {
              const newSize = asteroid.size / 2;
              for (let i = 0; i < 2; i++) {
                asteroidsRef.current.push({
                  x: asteroid.x,
                  y: asteroid.y,
                  velocityX: (Math.random() - 0.5) * 2,
                  velocityY: (Math.random() - 0.5) * 2,
                  size: newSize,
                  sides: asteroid.sides,
                  angle: Math.random() * TAU,
                  rotationSpeed: (Math.random() - 0.5) * 0.05
                });
              }
            }

            asteroidsRef.current.splice(asteroidIndex, 1);
            setGameState(prev => ({ ...prev, score: prev.score + 10 }));
          }
        });
      });
    };

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (gameState.gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
        return;
      }

      drawShip();
      updateShip();
      updateAsteroids();
      updateBullets();
      checkCollisions();
      asteroidsRef.current.forEach(drawAsteroid);
      bulletsRef.current.forEach(drawBullet);

      ctx.fillStyle = "white";
      ctx.font = "20px Arial";
      ctx.textAlign = "left";

      animationFrameIdRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameIdRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [gameState.gameOver]);
  

  const resetGame = () => {
    shipRef.current = {
      x: 400,
      y: 300,
      angle: 0,
      velocityX: 0,
      velocityY: 0,
      size: 15,
    };
    asteroidsRef.current = Array(10).fill().map(() => createAsteroid());
    bulletsRef.current = [];
    setGameState({ score: 0, gameOver: false });
  };

  return (
    <div className={styles.container}>
    <div className={styles.title}>Meteors</div>
    <div className={styles.politics}>
      <div>Score: {gameState.score}</div>
      This game is not affiliated with or endorsed by Atari. All trademarks are the property of their respective owners.
    </div>
    <canvas ref={canvasRef} className={styles.canvas} />
    {gameState.gameOver && (
      <button className={styles.restartButton} onClick={resetGame}>Restart Game</button>
    )}
  </div>
  );
};

export default Doom;  