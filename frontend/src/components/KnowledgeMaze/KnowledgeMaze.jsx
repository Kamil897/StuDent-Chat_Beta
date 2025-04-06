import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import s from "./KnowledgeMaze.module.scss";

const categories = {
  "География": [
      { question: "Столица Франции?", options: ["Берлин", "Мадрид", "Париж", "Рим"], answer: "Париж" },
      { question: "Какая самая высокая гора в мире?", options: ["Килиманджаро", "Эльбрус", "Эверест", "Мак-Кинли"], answer: "Эверест" },
      { question: "Как называется столица Японии?", options: ["Токио", "Сеул", "Пекин", "Бангкок"], answer: "Токио" },
      { question: "Сколько океанов на Земле?", options: ["4", "3", "7", "5"], answer: "5" },
      { question: "Какая самая длинная река в мире?", options: ["Амазонка", "Нил", "Янцзы", "Миссисипи"], answer: "Нил" },
      { question: "Какой континент самый холодный?", options: ["Азия", "Антарктида", "Европа", "Северная Америка"], answer: "Антарктида" },
      { question: "В какой стране находится Великая китайская стена?", options: ["Китай", "Япония", "Индия", "Монголия"], answer: "Китай" },
      { question: "Какой океан самый большой?", options: ["Атлантический", "Индийский", "Северный Ледовитый", "Тихий"], answer: "Тихий" }
  ],
  "Наука": [
      { question: "Какой элемент обозначается как 'O' в таблице Менделеева?", options: ["Кислород", "Золото", "Олово", "Осмий"], answer: "Кислород" },
      { question: "Какой газ люди вдыхают в основном?", options: ["Кислород", "Азот", "Углекислый газ", "Водород"], answer: "Азот" },
      { question: "Какой орган отвечает за фильтрацию крови?", options: ["Почки", "Печень", "Лёгкие", "Сердце"], answer: "Почки" },
      { question: "Сколько планет в Солнечной системе?", options: ["7", "9", "8", "11"], answer: "8" },
      { question: "Какой учёный открыл закон всемирного тяготения?", options: ["Эйнштейн", "Ньютон", "Галилей", "Коперник"], answer: "Ньютон" },
      { question: "Какая самая лёгкая химическая реакция?", options: ["Окисление", "Горение", "Фотосинтез", "Испарение"], answer: "Испарение" },
      { question: "Какая часть тела содержит наибольшее количество костей?", options: ["Рука", "Стопа", "Позвоночник", "Голова"], answer: "Стопа" },
      { question: "Какая планета самая горячая?", options: ["Марс", "Юпитер", "Венера", "Меркурий"], answer: "Венера" }
  ],
  "История": [
      { question: "Кто написал 'Война и мир'?", options: ["Достоевский", "Толстой", "Пушкин", "Чехов"], answer: "Толстой" },
      { question: "Какой год считается началом Второй мировой войны?", options: ["1914", "1939", "1941", "1945"], answer: "1939" },
      { question: "Когда произошла Французская революция?", options: ["1789", "1812", "1848", "1917"], answer: "1789" },
      { question: "Кто был первым президентом США?", options: ["Джефферсон", "Вашингтон", "Линкольн", "Рузвельт"], answer: "Вашингтон" },
      { question: "Какая страна изобрела порох?", options: ["Китай", "Греция", "Рим", "Франция"], answer: "Китай" },
      { question: "В каком году распался СССР?", options: ["1985", "1991", "2000", "1975"], answer: "1991" },
      { question: "Кто был основателем Монгольской империи?", options: ["Чингисхан", "Аттила", "Тамерлан", "Кублайхан"], answer: "Чингисхан" },
      { question: "Как называлась первая космическая собака?", options: ["Белка", "Стрелка", "Лайка", "Мухтар"], answer: "Лайка" }
  ]
};

export default function KnowledgeMaze() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [level, setLevel] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(2);
    const navigate = useNavigate();
  
    useEffect(() => {
        if (selectedCategory) {
            const shuffled = [...categories[selectedCategory]].sort(() => 0.5 - Math.random()).slice(0, 8);
            setQuestions(shuffled);
        }
    }, [selectedCategory]);
  
    const handleAnswer = (option) => {
        setSelected(option);
        if (option === questions[level].answer) {
            setTimeout(() => {
                setScore(score + 1);
                setLevel(level + 1);
                setSelected(null);
                setAttempts(2);
            }, 1000);
        } else {
            if (attempts > 1) {
                setTimeout(() => {
                    setSelected(null);
                    setAttempts(attempts - 1);
                }, 1000);
            } else {
                setTimeout(() => {
                    setLevel(level + 1);
                    setSelected(null);
                    setAttempts(2);
                }, 1000);
            }
        }
    };
  
    return (
        <div className={s.container}>
            {!selectedCategory ? (
                <div>
                    <button className={s.backButton} onClick={() => navigate('/Games')} style={{margin: "50px"}}>
                        <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024">
                            <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
                        </svg>
                        <span>Назад</span>
                    </button>

                    <h2 className={s.categoryChoose}>Выберите категорию</h2>
                    <div className={s.categoryList}>
                        {Object.keys(categories).map((category) => (
                            <button className={s.cssbuttons_io_button} key={category} onClick={() => setSelectedCategory(category)}>
                                {category}
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
                        ))}
                    </div>
                </div>
            ) : level < questions.length ? (
                <>
                    <button className={s.backButton} onClick={() => navigate('/Games')} style={{marginBottom: "50px"}}>
                        <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024">
                            <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
                        </svg>
                        <span>Назад</span>
                    </button>

                    <div className={s.card}>
                        <motion.h2 className={s.question} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            {questions[level].question}
                        </motion.h2>
                        <p className={s.attempts}>Попытки: {attempts}</p>
                        <div className={s.optionsContainer}>
                            {questions[level].options.map((option, index) => (
                                <button
                                    key={index}
                                    className={
                                        `${s.option} ${selected === option ? (option === questions[level].answer ? s.correct : s.wrong) : ''}`
                                    }
                                    onClick={() => handleAnswer(option)}
                                    disabled={selected !== null}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <div className={s.card} style={{ height: "300px" }}>
                    <h2 className={s.gameOver}>Игра завершена!</h2>
                    <p className={s.score}>Ваш счёт: {score}/{questions.length}</p>
                    <button className={s.backButton} onClick={() => navigate('/Games')}>
                        <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024">
                            <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path>
                        </svg>
                        <span>Назад</span>
                    </button>
                </div>
            )}
        </div>
    );
}