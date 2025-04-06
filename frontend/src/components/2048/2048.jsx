import React, { useState, useEffect, useRef, createContext } from 'react';
import './2048.css';
import { Link } from 'react-router-dom';

const GRID_SIZE = 4;
const WINNING_TILE = 2048;

const generateEmptyGrid = () =>
  Array(GRID_SIZE)
    .fill(null)
    .map(() => Array(GRID_SIZE).fill(0));

const getRandomTile = (grid) => {
  const emptyTiles = [];
  grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === 0) emptyTiles.push({ row: rowIndex, col: colIndex });
    });
  });

  if (emptyTiles.length === 0) return grid;

  const { row, col } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  grid[row][col] = Math.random() > 0.1 ? 2 : 4;

  return grid;
};

const moveLeft = (grid, updateScore) => {
  let scoreIncrement = 0;
  const newGrid = grid.map((row) => {
    const filteredRow = row.filter((num) => num !== 0);
    for (let i = 0; i < filteredRow.length - 1; i++) {
      if (filteredRow[i] === filteredRow[i + 1]) {
        filteredRow[i] *= 2;
        scoreIncrement += filteredRow[i];
        filteredRow[i + 1] = 0;
      }
    }
    return [
      ...filteredRow.filter((num) => num !== 0),
      ...Array(GRID_SIZE - filteredRow.length).fill(0),
    ];
  });
  updateScore(scoreIncrement);
  return newGrid;
};

const rotateGrid = (grid) =>
  grid[0].map((_, colIndex) => grid.map((row) => row[colIndex])).reverse();

const gridsAreEqual = (grid1, grid2) =>
  grid1.every((row, rowIndex) =>
    row.every((cell, colIndex) => cell === grid2[rowIndex][colIndex])
  );

const moveGrid = (grid, direction, updateScore) => {
  let newGrid = [...grid];
  if (direction === 'UP') newGrid = rotateGrid(newGrid);
  if (direction === 'DOWN') newGrid = rotateGrid(rotateGrid(rotateGrid(newGrid)));
  if (direction === 'RIGHT') newGrid = newGrid.map((row) => row.reverse());

  newGrid = moveLeft(newGrid, updateScore);

  if (direction === 'UP') newGrid = rotateGrid(rotateGrid(rotateGrid(newGrid)));
  if (direction === 'DOWN') newGrid = rotateGrid(newGrid);
  if (direction === 'RIGHT') newGrid = newGrid.map((row) => row.reverse());

  return newGrid;
};

const checkGameOver = (grid) => {
  const directions = ['LEFT', 'RIGHT', 'UP', 'DOWN'];
  return directions.every((direction) => {
    const testGrid = moveGrid(grid, direction, () => {});
    return gridsAreEqual(grid, testGrid);
  });
};

function Game() {
  const [grid, setGrid] = useState(generateEmptyGrid);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const updateScore = (increment) => {
    setScore((prevScore) => {
      const newScore = prevScore + increment;
      return Number.isNaN(newScore) ? 0 : newScore;
    });
  };

  const applyAnimations = (newGrid) => {
    const animationState = generateEmptyGrid();
    newGrid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell !== 0 && grid[rowIndex][colIndex] === 0) {
          animationState[rowIndex][colIndex] = 'new';
        }
      });
    });
    setTimeout(() => setGrid(newGrid), 150);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver || gameWon) return;

      e.preventDefault();

      let newGrid;
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') newGrid = moveGrid(grid, 'LEFT', updateScore);
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') newGrid = moveGrid(grid, 'RIGHT', updateScore);
      if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') newGrid = moveGrid(grid, 'UP', updateScore);
      if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') newGrid = moveGrid(grid, 'DOWN', updateScore);

      if (newGrid && !gridsAreEqual(grid, newGrid)) {
        const gridWithTile = getRandomTile(newGrid);
        applyAnimations(gridWithTile);

        if (gridWithTile.some((row) => row.includes(WINNING_TILE))) {
          setGameWon(true);
        } else if (checkGameOver(gridWithTile)) {
          setGameOver(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [grid, gameOver, gameWon]);

  useEffect(() => {
    const initialGrid = getRandomTile(getRandomTile(generateEmptyGrid()));
    setGrid(initialGrid);
  }, []);

  return (
    <div className="App">
      <Link to="/Games">
        <button className="restart">Exit</button>
      </Link>
      <h1 className="title">2048</h1>
      <p className="score">Score: {score}</p>
      {gameOver && <p className="game-status">Game Over! Try Again.</p>}
      {gameWon && <p className="game-status">Congratulations! You Won!</p>}
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell cell-${cell} ${cell !== 0 ? 'new-tile' : ''}`}
              >
                {cell !== 0 ? cell : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className="restart" onClick={() => window.location.reload()}>
        Restart
      </button>
    </div>
  );
}

export default Game;