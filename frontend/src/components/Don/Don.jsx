import React, { useState } from "react";
import s from "./DonDon.module.css";
import { useNavigate } from 'react-router-dom';

const choices = [
  { name: "Rock", image: '/rock.png' },
  { name: "Paper", image: '/paper.png' },
  { name: "Scissors", image: '/scissors.png' },
];

const getResult = (playerChoice, computerChoice) => {
  if (playerChoice === computerChoice) return "It's a Tie!";
  if (
    (playerChoice === "Rock" && computerChoice === "Scissors") ||
    (playerChoice === "Paper" && computerChoice === "Rock") ||
    (playerChoice === "Scissors" && computerChoice === "Paper")
  ) {
    return "You Win!";
  }
  return "Computer Wins!";
};

const Don = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState({
    playerChoice: null,
    computerChoice: null,
    result: "",
    wins: 0,
    ties: 0,
    losses: 0,
  });

  const handlePlayerChoice = (choice) => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    const gameResult = getResult(choice.name, randomChoice.name);

    setGameState((prevState) => ({
      ...prevState,
      playerChoice: choice,
      computerChoice: randomChoice,
      result: gameResult,
      wins: gameResult === "You Win!" ? prevState.wins + 1 : prevState.wins,
      ties: gameResult === "It's a Tie!" ? prevState.ties + 1 : prevState.ties,
      losses: gameResult === "Computer Wins!" ? prevState.losses + 1 : prevState.losses,
    }));
  };

  const { playerChoice, computerChoice, result, wins, ties, losses } = gameState;

  return (
    <div className={s.game}>
      <button className={s.backButton} onClick={() => navigate('/Games')}>
        <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
        <span>Назад</span>
      </button>

      <h1>Rock, Paper, Scissors</h1>

      <div className={s.scoreboard}>
        <ScoreboardItem label="Wins" value={wins} />
        <ScoreboardItem label="Ties" value={ties} />
        <ScoreboardItem label="Losses" value={losses} />
      </div>

      {playerChoice && (
        <div className={s.result}>
          <ChoiceDisplay title="Computer's choice" choice={computerChoice} />
          <ChoiceDisplay title="Your choice" choice={playerChoice} />
          <h2 className={s.resultText}>{result}</h2>
          <h2 className={s.resultText}>Choose one more time</h2>
        </div>
      )}

      <div className={s.choices}>
        {choices.map((choice) => (
          <button
            key={choice.name}
            onClick={() => handlePlayerChoice(choice)}
            className={s.choiceButton}
            aria-label={`Select ${choice.name}`}
          >
            <img
              src={choice.image}
              alt={choice.name}
              className={s.choiceImage}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

const ScoreboardItem = ({ label, value }) => (
  <p className={s.scoreItem}>
    {label}: <span>{value}</span>
  </p>
);

const ChoiceDisplay = ({ title, choice }) => (
  <div className={s.choiceDisplay}>
    <p>{title}: {choice.name}</p>
    <img
      src={choice.image}
      alt={choice.name}
      className={s.resultImage}
    />
  </div>
);

export default Don;
