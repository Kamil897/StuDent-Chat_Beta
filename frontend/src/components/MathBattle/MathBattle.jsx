import { useState, useEffect } from "react";
import s from "./MathBattle.module.scss";
import { useNavigate } from "react-router-dom";

export default function MathBattle() {
    const [difficulty, setDifficulty] = useState(null);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [playerHealth, setPlayerHealth] = useState(100);
    const [botHealth, setBotHealth] = useState(100);
    const [message, setMessage] = useState("");
    const [startTime, setStartTime] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
        if (difficulty) generateQuestion();
    }, [difficulty]);
  
    const generateQuestion = () => {
        let num1, num2, operations;
        
        if (difficulty === "5 класс") {
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            operations = ['+', '-', '*'];
        } else if (difficulty === "8 класс") {
            num1 = Math.floor(Math.random() * 50) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            operations = ['+', '-', '*', '/'];
        } else if (difficulty === "11 класс") {
            num1 = Math.floor(Math.random() * 100) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            operations = ['+', '-', '*', '/', '^'];
        }
        
        const operation = operations[Math.floor(Math.random() * operations.length)];
        let formattedQuestion;
        
        if (operation === '/') {
            formattedQuestion = `${num1 * num2} / ${num1}`;
        } else if (operation === '^') {
            formattedQuestion = `${num1} ** 2`;
        } else {
            formattedQuestion = `${num1} ${operation} ${num2}`;
        }
        
        setQuestion(formattedQuestion);
        setStartTime(Date.now());
    };
  
    const handleSubmit = () => {
        if (playerHealth === 0 || botHealth === 0) return;
        
        let correctAnswer;
        if (question.includes('**')) {
            correctAnswer = Math.pow(parseInt(question.split(' ')[0]), 2);
        } else {
            correctAnswer = eval(question);
        }
        
        const timeTaken = (Date.now() - startTime) / 1000;
        let damage = 10;
    
        if (parseInt(answer) === correctAnswer) {
            if (timeTaken < 3) damage = 20;
            setBotHealth((prev) => Math.max(0, prev - damage));
            setMessage(`Ты попал! Нанесено ${damage} урона.`);
        } else {
            setPlayerHealth((prev) => Math.max(0, prev - 25));
            setMessage("Промах! Бот атакует тебя на 25 урона.");
        }
    
        setAnswer("");
        generateQuestion();
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          handleSubmit();
        }
    };
  
    return (
        <div className={s.container}>
            {!difficulty ? (
                <div className={s.difficultySelection}>
                    <button className={s.backButton} onClick={() => navigate('/Games')}>
                        <span>Назад</span>
                    </button>
                    
                    <h2>Выбери уровень сложности</h2>
                    <button className={s.cssbuttons_io_button} onClick={() => setDifficulty("5 класс")}>
                      5 класс
                      <div className={s.cssicon}>
                          <svg
                          height="24"
                          width="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          >
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <path
                              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                              fill="currentColor"
                          ></path>
                          </svg>
                      </div>
                    </button>
                    <button className={s.cssbuttons_io_button} onClick={() => setDifficulty("8 класс")}>
                      8 класс
                      <div className={s.cssicon}>
                          <svg
                          height="24"
                          width="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          >
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <path
                              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                              fill="currentColor"
                          ></path>
                          </svg>
                      </div>
                    </button>
                    <button className={s.cssbuttons_io_button} onClick={() => setDifficulty("11 класс")}>
                      11 класс
                      <div className={s.cssicon}>
                          <svg
                          height="24"
                          width="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          >
                          <path d="M0 0h24v24H0z" fill="none"></path>
                          <path
                              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                              fill="currentColor"
                          ></path>
                          </svg>
                      </div>
                    </button>                
              </div>
            ) : (
                <>
                    {(playerHealth === 0 || botHealth === 0) && (
                        <div className={s.gameOverScreen}>
                            <h2 className={s.gameOver}>{playerHealth === 0 ? "Ты проиграл!" : "Ты победил!"}</h2>
                            <button className={s.backButton} onClick={() => navigate('/Games')}>
                                <span>Назад</span>
                            </button>
                        </div>
                    )}
        
                    <h1>Математический бой</h1>
                    <p>Реши пример как можно быстрее!</p>
                    <p className={s.health}>Твое здоровье: {playerHealth} | Здоровье бота: {botHealth}</p>
                    <h2 className={s.question}>{question} = ?</h2>
                    <input 
                        type="number" 
                        value={answer} 
                        onChange={(e) => setAnswer(e.target.value)} 
                        onKeyDown={handleKeyDown}
                        className={s.input}
                        disabled={playerHealth === 0 || botHealth === 0}
                    />
                    <button 
                        onClick={handleSubmit} 
                        className={s.button}
                        disabled={playerHealth === 0 || botHealth === 0}
                    >
                        Атаковать
                    </button>
                    <p className={s.message}>{message}</p>
                </>
            )}
        </div>
    );
}