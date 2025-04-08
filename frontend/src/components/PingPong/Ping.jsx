import React, { useRef, useEffect, useState } from "react";
import styles from "./Ping.module.css";

const PongNeon = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const gameStateRef = useRef({
    ballX: 0,
    ballY: 0,
    ballSpeedX: 4,
    ballSpeedY: 4,
    paddleY: 0,
    aiPaddleY: 0,
    playerScore: 0,
    aiScore: 0,
    upPressed: false,
    downPressed: false
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });

    const state = gameStateRef.current;

    const paddleHeight = isMobile ? 70 : 100;
    const paddleWidth = isMobile ? 8 : 10;
    const ballRadius = isMobile ? 8 : 10;
    const paddleSpeed = isMobile ? 5 : 6;
    const winningScore = 5;

    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;

      const heightAdjustment = isMobile ? 80 : 0;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight - heightAdjustment;

      state.ballX = canvas.width / 2;
      state.ballY = canvas.height / 2;
      state.paddleY = (canvas.height - paddleHeight) / 2;
      state.aiPaddleY = (canvas.height - paddleHeight) / 2;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const resetBall = () => {
      if (state.playerScore >= winningScore || state.aiScore >= winningScore) {
        setIsRunning(false);
        state.playerScore = 0;
        state.aiScore = 0;
        return;
      }
      state.ballX = canvas.width / 2;
      state.ballY = canvas.height / 2;
      state.ballSpeedX = -state.ballSpeedX;
      state.ballSpeedY = Math.random() * 6 - 3;
    };

    let cachedBgGradient = null;
    let gridPattern = null;

    const createPatterns = () => {
      cachedBgGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        50,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width
      );
      cachedBgGradient.addColorStop(0, "#181818");
      cachedBgGradient.addColorStop(1, "#000");

      const patternCanvas = document.createElement("canvas");
      const patternSize = isMobile ? 30 : 40;
      patternCanvas.width = patternSize;
      patternCanvas.height = patternSize;
      const patternCtx = patternCanvas.getContext("2d");

      patternCtx.strokeStyle = "rgba(0, 255, 255, 0.2)";
      patternCtx.beginPath();
      patternCtx.moveTo(0, 0);
      patternCtx.lineTo(0, patternSize);
      patternCtx.moveTo(0, 0);
      patternCtx.lineTo(patternSize, 0);
      patternCtx.stroke();

      gridPattern = ctx.createPattern(patternCanvas, "repeat");
    };

    createPatterns();

    const draw = () => {
      ctx.fillStyle = cachedBgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = gridPattern;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0ff";
      for (let i = 0; i < canvas.height; i += isMobile ? 15 : 20) {
        ctx.fillRect(canvas.width / 2 - 1, i, 2, isMobile ? 7 : 10);
      }

      ctx.shadowBlur = isMobile ? 10 : 15;
      ctx.shadowColor = "#0ff";
      ctx.fillStyle = "#0ff";
      ctx.beginPath();
      ctx.arc(state.ballX, state.ballY, ballRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#f00";
      ctx.shadowColor = "#f00";
      ctx.fillRect(0, state.paddleY, paddleWidth, paddleHeight);

      ctx.fillStyle = "#f0f";
      ctx.shadowColor = "#f0f";
      ctx.fillRect(
        canvas.width - paddleWidth,
        state.aiPaddleY,
        paddleWidth,
        paddleHeight
      );
      ctx.shadowBlur = 0;

      ctx.font = isMobile ? "24px sans-serif" : "30px sans-serif";
      ctx.fillStyle = "#fff";
      ctx.fillText(state.playerScore, canvas.width / 4, 50);
      ctx.fillText(state.aiScore, (canvas.width * 3) / 4, 50);
    };

    const gameLoop = (timestamp) => {
      if (!isRunning) return;

      if (previousTimeRef.current === undefined) {
        previousTimeRef.current = timestamp;
      }

      const elapsed = timestamp - previousTimeRef.current;
      if (elapsed > 16) {
        previousTimeRef.current = timestamp;

        updateGameState();
        draw();
      }

      requestRef.current = requestAnimationFrame(gameLoop);
    };

    const updateGameState = () => {
      state.ballX += state.ballSpeedX;
      state.ballY += state.ballSpeedY;

      if (state.ballY + ballRadius > canvas.height || state.ballY - ballRadius < 0) {
        state.ballSpeedY = -state.ballSpeedY;
      }

      if (state.ballX - ballRadius < paddleWidth) {
        if (state.ballY > state.paddleY && state.ballY < state.paddleY + paddleHeight) {
          state.ballSpeedX = -state.ballSpeedX;
          let deltaY = state.ballY - (state.paddleY + paddleHeight / 2);
          state.ballSpeedY = deltaY * 0.35;
        } else {
          state.aiScore++;
          resetBall();
        }
      } else if (state.ballX + ballRadius > canvas.width - paddleWidth) {
        if (state.ballY > state.aiPaddleY && state.ballY < state.aiPaddleY + paddleHeight) {
          state.ballSpeedX = -state.ballSpeedX;
          let deltaY = state.ballY - (state.aiPaddleY + paddleHeight / 2);
          state.ballSpeedY = deltaY * 0.35;
        } else {
          state.playerScore++;
          resetBall();
        }
      }

      const paddleCenter = state.aiPaddleY + paddleHeight / 2;
      if (paddleCenter < state.ballY - 15) {
        state.aiPaddleY += paddleSpeed * (isMobile ? 0.7 : 0.8);
      } else if (paddleCenter > state.ballY + 15) {
        state.aiPaddleY -= paddleSpeed * (isMobile ? 0.7 : 0.8);
      }

      if (state.aiPaddleY < 0) state.aiPaddleY = 0;
      if (state.aiPaddleY > canvas.height - paddleHeight) state.aiPaddleY = canvas.height - paddleHeight;

      if (state.upPressed && state.paddleY > 0) {
        state.paddleY -= paddleSpeed;
      }
      if (state.downPressed && state.paddleY < canvas.height - paddleHeight) {
        state.paddleY += paddleSpeed;
      }
    };

    const keyDownHandler = (e) => {
      if (e.key === "ArrowUp" || e.key === "w") {
        state.upPressed = true;
      } else if (e.key === "ArrowDown" || e.key === "s") {
        state.downPressed = true;
      }
    };

    const keyUpHandler = (e) => {
      if (e.key === "ArrowUp" || e.key === "w") {
        state.upPressed = false;
      } else if (e.key === "ArrowDown" || e.key === "s") {
        state.downPressed = false;
      }
    };

    if (!isRunning) {
      state.ballX = canvas.width / 2;
      state.ballY = canvas.height / 2;
      state.paddleY = (canvas.height - paddleHeight) / 2;
      state.aiPaddleY = (canvas.height - paddleHeight) / 2;
      draw();
    }

    if (isRunning) {
      requestRef.current = requestAnimationFrame(gameLoop);
    } else {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    }

    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isRunning, isMobile]);

  const handleButtonDown = (direction) => {
    gameStateRef.current[direction + "Pressed"] = true;
    return false;
  };

  const handleButtonUp = (direction) => {
    gameStateRef.current[direction + "Pressed"] = false;
  };

  return (
    <div className={styles["pong-container"]} ref={containerRef}>
      <video autoPlay muted loop playsInline className={styles.backgroundVideo}>
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {isMobile && isRunning && (
        <div className={styles["control-buttons"]}>
          <button
            className={styles["control-button"] + " " + styles["control-button-up"]}
            onTouchStart={() => handleButtonDown("up")}
            onTouchEnd={() => handleButtonUp("up")}
          >
            UP
          </button>
        </div>
      )}
      <canvas ref={canvasRef} />
      {isMobile && isRunning && (
        <div className={styles["control-buttons"]}>
          <button
            className={styles["control-button"] + " " + styles["control-button-down"]}
            onTouchStart={() => handleButtonDown("down")}
            onTouchEnd={() => handleButtonUp("down")}
          >
            
          </button>
        </div>
      )}
      {!isRunning && (
        <button
          className={styles["start-button"]}
          onClick={() => {
            setIsRunning(true);
            const state = gameStateRef.current;
            state.playerScore = 0;
            state.aiScore = 0;
          }}
        >
          {isMobile ? "Tap to Start" : "Start Game"}
        </button>
      )}
    </div>
  );
};

export default PongNeon;
