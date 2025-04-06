import React, { useState, useEffect, useRef, createContext } from 'react';
import s from './FlappyBird.module.scss';
import { useNavigate } from 'react-router-dom';

const FlappyBird = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const loadImage = (img, src) => {
    return new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = src;
    });
  };

  class Pipe {
    static width = 110;
    static topPipeImg;
    static bottomPipeImg;
    width = Pipe.width;
    spacing = 250;

    static async preloadImages() {
      Pipe.topPipeImg = new Image();
      Pipe.bottomPipeImg = new Image();
      await Promise.all([
        loadImage(Pipe.topPipeImg, './top-pipe.png'),
        loadImage(Pipe.bottomPipeImg, './bottom-pipe.png'),
      ]);
    }

    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.canvasHeight = canvas.height;
      this.top = this.canvasHeight / 10 + Math.round(Math.random() * (this.canvasHeight / 3));
      this.bottom = this.top + this.spacing;
      this.x = canvas.width;
    }

    draw() {
      this.ctx.drawImage(Pipe.topPipeImg, this.x, this.top - Pipe.topPipeImg.height);
      this.ctx.drawImage(Pipe.bottomPipeImg, this.x, this.bottom);
    }

    update(speed = 3) {
      this.x -= speed;
      this.draw();
    }

    isOffscreen() {
      return this.x < -this.width;
    }
  }

  class Ground {
    static groundImg;
    width = 3300;
    height = 100;

    static async preloadImage() {
      Ground.groundImg = new Image();
      await loadImage(Ground.groundImg, './ground.png');
    }

    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.x = 0;
      this.y = canvas.height - this.height;
    }

    draw() {
      this.ctx.drawImage(Ground.groundImg, this.x, this.y);
    }

    update(speed = 3) {
      this.x -= speed;
      if (this.x <= -this.width / 2) this.x = 0;
      this.draw();
    }
  }

  class Bird {
    static birdImg;
    width = 66;
    height = 47;
    hitboxWidth = 55;
    hitboxHeight = 35;
    flapPower = 4;
    gravity = 0.15;

    static async preloadImage() {
      Bird.birdImg = new Image();
      await loadImage(Bird.birdImg, './bird.png');
    }

    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.x = canvas.width / 10;
      this.y = canvas.height / 4;
      this.velocity = 0;
    }

    draw() {
      this.ctx.drawImage(Bird.birdImg, this.x - this.width / 2, this.y - this.height / 2);
    }

    flap() {
      this.velocity = -this.flapPower;
    }

    update() {
      this.velocity += this.gravity;
      this.y += this.velocity;
      this.draw();
    }
  }

  const checkCollision = (bird, pipes, ground) => {
    return checkCeilingCollision(bird) || checkGroundCollision(bird, ground) || checkPipeCollision(bird, pipes);
  };

  const checkCeilingCollision = (bird) => {
    return bird.y - bird.hitboxHeight / 2 <= 0;
  };

  const checkGroundCollision = (bird, ground) => {
    return bird.y + bird.hitboxHeight / 2 >= ground.y;
  };

  const checkPipeCollision = (bird, pipes) => {
    return pipes.some(pipe => checkTopPipeCollision(bird, pipe) || checkBottomPipeCollision(bird, pipe));
  };

  const checkTopPipeCollision = (bird, pipe) => {
    return bird.y - bird.hitboxHeight / 2 < pipe.top &&
           bird.x - bird.hitboxWidth / 2 < pipe.x + pipe.width &&
           bird.x + bird.hitboxWidth / 2 > pipe.x;
  };

  const checkBottomPipeCollision = (bird, pipe) => {
    return bird.y + bird.hitboxHeight / 2 > pipe.bottom &&
           bird.x - bird.hitboxWidth / 2 < pipe.x + pipe.width &&
           bird.x + bird.hitboxWidth / 2 > pipe.x;
  };

  const restartGame = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const game = new Game(canvas, () => setIsGameOver(true));
      
      const restartGameLogic = async () => {
        await game.loadAssets();
        game.reset(); 
        game.start(); 
      };
  
      restartGameLogic();
    }
    setIsGameOver(false);
    setIsMenuOpen(false);
  };
  
  class Game {
    SPEED = 3;
    DISTANCE_BETWEEN_PIPES = 3.5 * Pipe.width;
    frameCount = 0;
    score = 0;
    isGameStarted = false;
  
    constructor(canvas, onGameOver) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext('2d');
      this.canvas.height = 900;
      this.canvas.width = 900 * (window.innerWidth / window.innerHeight);
      this.BG_IMG = new Image();
      this.pipes = [new Pipe(this.canvas)];
      this.ground = new Ground(this.canvas);
      this.bird = new Bird(this.canvas);
      this.onGameOver = onGameOver;
    }
  
    async loadAssets() {
      await Promise.all([
        loadImage(this.BG_IMG, './bg.png'),
        Pipe.preloadImages(),
        Ground.preloadImage(),
        Bird.preloadImage(),
      ]);
    }
  
    start() {
      this.initializeControls();
      this.intervalId = setInterval(() => this.draw(), 10);
    }
  
    stop() {
      clearInterval(this.intervalId);
      this.onGameOver();
    }
  
    reset() {
      this.frameCount = 0;
      this.score = 0;
      this.isGameStarted = false;
      this.pipes = [new Pipe(this.canvas)];
      this.ground = new Ground(this.canvas);
      this.bird = new Bird(this.canvas);
      this.clearCanvas();
    }
  
    clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  
    draw() {
      this.ctx.drawImage(this.BG_IMG, 0, 0, this.canvas.width, this.canvas.height);
  
      if (!this.isGameStarted) {
        this.ground.update(this.SPEED);
        this.bird.draw();
        this.displayScore();
        return;
      }
  
      if (this.frameCount * this.SPEED > this.DISTANCE_BETWEEN_PIPES) {
        this.pipes.push(new Pipe(this.canvas));
        this.frameCount = 0;
      }
  
      this.updatePipes();
      this.ground.update(this.SPEED);
      this.bird.update();
      this.displayScore();
  
      if (checkCollision(this.bird, this.pipes, this.ground)) this.stop();
      this.frameCount++;
    }
  
    updatePipes() {
      for (let i = 0; i < this.pipes.length; i++) {
        this.pipes[i].update(this.SPEED);
        if (this.pipes[i].isOffscreen()) {
          this.pipes.shift();
          i--;
          this.score++;
        }
      }
    }
  
    initializeControls() {
      if ('ontouchstart' in window) {
        document.addEventListener('touchstart', this.handleFlap);
      } else {
        document.addEventListener('mousedown', this.handleFlap);
      }
      document.addEventListener('keydown', this.handleFlap);
    }
  
    handleFlap = (event) => {
      if (event.type === 'keydown' && event.code !== 'Space') return;
      if (!this.isGameStarted) this.isGameStarted = true;
      this.bird.flap();
    }
  
    displayScore() {
      this.ctx.font = '60px Arial';
      this.ctx.fillStyle = 'white';
      this.ctx.textAlign = 'center';
      this.ctx.lineWidth = 8;
      this.ctx.strokeStyle = '#533846';
      this.ctx.textBaseline = 'top';
      this.ctx.strokeText(this.score, this.canvas.width / 2, 15);
      this.ctx.fillText(this.score, this.canvas.width / 2, 15);
    }
  }
  

  const goToMenu = () => {
    setIsMenuOpen(true);
    setIsGameOver(false); 
  };
  

  useEffect(() => {
    if (!isMenuOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const game = new Game(canvas, () => setIsGameOver(true));

      const loadAssetsAndStart = async () => {
        await game.loadAssets();
        game.start();
      };

      loadAssetsAndStart();
    }
  }, [isMenuOpen]); 

  return (
    <div className={s.main_section}>
      {isMenuOpen ? (
        <div className={s.menu}>
          <h2>Flappy Bird</h2>
          <button onClick={restartGame}>Играть</button>
          <button onClick={() => navigate('/Games')}>Выход</button>
        </div>
      ) : (
        <canvas ref={canvasRef} />
      )}
  
      {isGameOver && !isMenuOpen && (
        <div className={s.game_over}>
          <h2>Game Over</h2>
          <button onClick={goToMenu}>В меню</button>
          <button onClick={restartGame}>Играть снова</button>
        </div>
      )}
    </div>
  );  
};

export default FlappyBird;
