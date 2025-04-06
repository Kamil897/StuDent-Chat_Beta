import React, { useState, useEffect, useRef, createContext } from 'react';
import styles from './TicTacToe.module.scss';
import { Link } from 'react-router-dom';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isVsComputer, setIsVsComputer] = useState(true);
  const [playerSymbol, setPlayerSymbol] = useState('X');
  const [showSelection, setShowSelection] = useState(true);
  const [gameState, setGameState] = useState(null);

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const getBestMove = (squares, computerSymbol) => {
    const playerSymbol = computerSymbol === 'X' ? 'O' : 'X';

    const isWinningMove = (symbol) => {
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
          const tempBoard = squares.slice();
          tempBoard[i] = symbol;
          if (checkWinner(tempBoard) === symbol) return i;
        }
      }
      return null;
    };

    const winningMove = isWinningMove(computerSymbol);
    if (winningMove !== null) return winningMove;

    const blockingMove = isWinningMove(playerSymbol);
    if (blockingMove !== null) return blockingMove;

    const center = 4;
    if (squares[center] === null) return center;

    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter((index) => squares[index] === null);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    const availableMoves = squares
      .map((square, index) => (square === null ? index : null))
      .filter((index) => index !== null);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  const computerMove = (squares) => {
    const computerSymbol = playerSymbol === 'X' ? 'O' : 'X';
    const move = getBestMove(squares, computerSymbol);
    if (move !== null) {
      setTimeout(() => {
        squares[move] = computerSymbol;
        setBoard(squares);
        const gameWinner = checkWinner(squares);
        if (gameWinner) {
          setWinner(gameWinner);
          setGameState(gameWinner === playerSymbol ? 'win' : 'lose');
        } else if (!squares.includes(null)) {
          setGameState('draw');
        } else {
          setIsXNext(true);
        }
      }, 500);
    }
  };

  const handleClick = (index) => {
    if (board[index] || winner || !isXNext) return;

    const newBoard = board.slice();
    newBoard[index] = playerSymbol;
    setBoard(newBoard);
    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameState('win');
    } else if (isVsComputer) {
      setIsXNext(false);
      computerMove(newBoard);
    } else {
      setIsXNext(!isXNext);
    }
  };

  const renderSquare = (index) => {
    return (
      <div
        className={`${styles.square} ${board[index] ? styles.occupied : ''}`}
        onClick={() => handleClick(index)}
      >
        {board[index] && (
          <div className={`${styles.symbol} ${board[index] === 'X' ? styles.x : styles.o}`}>
            {board[index]}
          </div>
        )}
      </div>
    );
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setGameState(null);
  };

  const selectSymbol = (symbol) => {
    setPlayerSymbol(symbol);
    setShowSelection(false);
  };

  return (
    <div className={styles['tic-tac-toe']}>
      {showSelection ? (
        <div className={styles.SelectionMenu}>
          <h1>Кого ты выберешь?</h1>
          <div className={styles.symbolButtons}>
            <button onClick={() => selectSymbol('X')} className={styles.symbolButton}>X</button>
            <p>Или</p>
            <button onClick={() => selectSymbol('O')} className={styles.symbolButton}>O</button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles['turn-indicator']}>
              <div className={styles['turn-message']}>
                {isXNext
                  ? `Ход ${playerSymbol === 'X' ? 'игрока X' : 'игрока O'}`
                  : 'Ход компьютера'}
              </div>
            
          </div>
          <div className={styles.board}>
            {Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className={styles['square-container']}>
                {renderSquare(index)}
              </div>
            ))}
          </div>
          {gameState && (
            <div className={`${styles.menu} ${styles.centeredMenu} ${styles.visible}`}>
              <div className={styles['menu-header']}>
                {gameState === 'win' && <h2 className={styles['menu-title']}>Поздравляем, победа!</h2>}
                {gameState === 'lose' && <h2 className={styles['menu-title']}>Вы проиграли</h2>}
                {gameState === 'draw' && <h2 className={styles['menu-title']}>Ничья</h2>}
              </div>
              <button className={styles['menu-button']} onClick={resetGame}>
                Играть снова
              </button>
              <button
                className={styles['menu-button']}
                onClick={() => setShowSelection(true)}
              >
                Изменить выбор
              </button>
              <Link to="/Games">
                <button className={styles['menu-button']}>Выйти в меню игр</button>
              </Link>
            </div>
          )}
          {!gameState && (
            <button className={styles['reset-button']} onClick={resetGame}>
              Переиграть
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default TicTacToe;
