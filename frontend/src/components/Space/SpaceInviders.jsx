import { useRef, useEffect, useState } from 'react';
import s from './Space.module.css';
import { useNavigate } from 'react-router-dom';

const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 20;
const ENEMY_WIDTH = 30;
const ENEMY_HEIGHT = 20;
const BULLET_WIDTH = 4;
const BULLET_HEIGHT = 10;

function Invider() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('playing');

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let keys = {};
    let bullets = [];
    let enemies = [];
    let animationId;
    let enemyDX = 1.5;

    const player = {
      x: canvas.width / 2 - PLAYER_WIDTH / 2,
      y: canvas.height - 60,
      w: PLAYER_WIDTH,
      h: PLAYER_HEIGHT,
      speed: 6,
    };

    const rows = 4;
    const cols = Math.floor(canvas.width / 60);
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        enemies.push({
          x: 30 + col * 60,
          y: 40 + row * 40,
          w: ENEMY_WIDTH,
          h: ENEMY_HEIGHT,
          alive: true,
        });
      }
    }

    const handleKeys = () => {
      if (keys['ArrowLeft']) player.x -= player.speed;
      if (keys['ArrowRight']) player.x += player.speed;
      player.x = Math.max(0, Math.min(canvas.width - player.w, player.x));
    };

    const updateBullets = () => {
      bullets = bullets.filter(b => b.y > 0 && !b.hit);
      bullets.forEach(b => {
        b.y -= 8;
        enemies.forEach(e => {
          if (
            e.alive &&
            b.x < e.x + e.w &&
            b.x + b.w > e.x &&
            b.y < e.y + e.h &&
            b.y + b.h > e.y
          ) {
            e.alive = false;
            b.hit = true;
          }
        });
      });
    };

    const moveEnemies = () => {
      let hitEdge = false;
      enemies.forEach(e => {
        if (!e.alive) return;
        e.x += enemyDX;
        if (e.x <= 0 || e.x + e.w >= canvas.width) hitEdge = true;
        if (e.y + e.h >= player.y) {
          cancelAnimationFrame(animationId);
          setGameState('lose');
        }
      });
      if (hitEdge) {
        enemyDX *= -1;
        enemies.forEach(e => (e.y += 10));
      }
    };

    const checkWin = () => {
      const allDead = enemies.every(e => !e.alive);
      if (allDead) {
        cancelAnimationFrame(animationId);
        setGameState('win');
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff99';
      ctx.fillRect(player.x, player.y, player.w, player.h);

      ctx.fillStyle = 'white';
      bullets.forEach(b => ctx.fillRect(b.x, b.y, b.w, b.h));

      ctx.fillStyle = '#ff2e63';
      enemies.forEach(e => {
        if (e.alive) ctx.fillRect(e.x, e.y, e.w, e.h);
      });
    };

    const gameLoop = () => {
      handleKeys();
      moveEnemies();
      updateBullets();
      draw();
      checkWin();
      animationId = requestAnimationFrame(gameLoop);
    };

    const keyDown = e => {
      keys[e.key] = true;
      if (e.key === ' ') {
        bullets.push({
          x: player.x + player.w / 2 - BULLET_WIDTH / 2,
          y: player.y,
          w: BULLET_WIDTH,
          h: BULLET_HEIGHT,
        });
      }
    };

    const keyUp = e => {
      keys[e.key] = false;
    };

    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    gameLoop();

    return () => {
      window.removeEventListener('keydown', keyDown);
      window.removeEventListener('keyup', keyUp);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const restartGame = () => {
    window.location.reload();
  };

  const simulateKey = (key, pressed = true) => {
    const event = new KeyboardEvent(pressed ? 'keydown' : 'keyup', { key });
    window.dispatchEvent(event);
  };

  return (
    <div className={s.wrapper}>
      {gameState !== 'playing' && (
        <div className={s.overlay}>
          <h1 className={s.title}>
            {gameState === 'win' ? 'You Win! 🎉' : 'Game Over 💀'}
          </h1>
          <button className={s.backButton} onClick={() => navigate('/Games')}>
            ← Назад
          </button>
          <button onClick={restartGame} className={s.button}>
            Restart
          </button>
        </div>
      )}

      <canvas ref={canvasRef} className={s.canvas} />

      <div className={s.controls}>
        <button
          onTouchStart={() => simulateKey('ArrowLeft', true)}
          onTouchEnd={() => simulateKey('ArrowLeft', false)}
        >
          ◀️
        </button>
        <button
          onTouchStart={() => simulateKey(' ')}
          className={s.fire}
        >
          🔥
        </button>
        <button
          onTouchStart={() => simulateKey('ArrowRight', true)}
          onTouchEnd={() => simulateKey('ArrowRight', false)}
        >
          ▶️
        </button>
      </div>
    </div>
  );
}

export default Invider;
