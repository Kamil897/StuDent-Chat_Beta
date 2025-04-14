import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Info } from 'lucide-react'; 
import s from './Games.module.scss';


const games = [
  { id: 1,
    name: 'Flappy Bird',
    description: 'Забытая игра',
    link: '/flappybird',
    image: 'https://miro.medium.com/v2/resize:fit:1400/1*MZcxSSARUkVfSeAwzQ95kw.png',
    video: 'https://www.youtube.com/embed/WN6YEU2Dg1Q' 
      },
  { id: 2, name: 'Snake', description: 'Змейка', link: '/Snake', image: '/images/snake.jpg' },
  { id: 3, name: 'Tic Tac', description: 'Крестики-Нолики', link: '/TicTacToe', image: '/images/tictac.jpg' },
  { id: 4, name: 'Тир', description: 'Убейте шайтанов', link: '/Tir', image: '/images/tir.jpg' },
  { id: 5, name: 'Лабиринт знаний', description: 'Отвечайте на школьные вопросы', link: '/KnowledgeMaze', image: '/images/maze.jpg' },
  { id: 6, name: 'Математический бой', description: 'Решайте примеры и атакуйте соперника', link: '/MathBattle', image: '/images/mathbattle.jpg' },
  { id: 2, 
    name: 'Snake', 
    description: 'Змейка', 
    link: '/Snake', 
    image: 'https://play-lh.googleusercontent.com/xIDxenYWwwKdyDF2eYzSYhKUMVejc0AhOR64mpcY4keuwXP3UeI7yN1SnIJT4tpjgc4' 
  },
  { id: 3, 
    name: 'Tic Tac', 
    description: 'Крестики-Нолики', 
    link: '/TicTacToe', 
    image: 'https://cdn.pixabay.com/photo/2013/07/12/15/56/tic-tac-toe-150614_960_720.png' 
  },
  { id: 4, 
    name: 'Тир', 
    description: 'Убейте шайтанов', 
    link: '/Tir', 
    image: 'https://storage.needpix.com/rsynced_images/archery-152912_1280.png' },
  { id: 5, 
    name: 'Лабиринт знаний', 
    description: 'Отвечайте на школьные вопросы', 
    link: '/KnowledgeMaze', 
    image: '/images/maze.jpg' },
  { id: 6, 
    name: 'Математический бой', 
    description: 'Решайте примеры и атакуйте соперника', 
    link: '/MathBattle',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj3mQCkWcLzOW-frEhIZ22Elqm6ljJMHzSgNj8hPhM3fjuZg60n7IIQc682tQmMg8umDkAalQ_SJjFrirFhqbPpsXFcsUgw2QwrXs7rQxECOP_cd2TMXOUFPpwKO6stMfeFcBCP_Mwy14-nsQwL60o-TIe_lAWYD3-s1qQ-4vmc68Omv7jkQFofX8hC/s1600/formula.jpg' },
  { id: 7, 
    name: 'Камень, ножницы, бумага', 
    description: ' 1. 2. 3....', 
    link: '/don',
    image: 'https://habrastorage.org/r/w1560/getpro/geektimes/post_images/28e/2a3/577/28e2a357753505ae9a7eb40097e93dbf.png' },
  { id: 8, 
    name: 'Space Inviders',
    description: 'ХЗ что за игра, не играл И да где моя примия босс?', 
    link: '/inviders',
    image: 'https://play-lh.googleusercontent.com/0goocG7RJZDZ41ShfBPl-h7ctwHKHjqzn4nSImyL8_RWyXqeYNKw-CdGAKhgPGZG5Es=w240-h480-rw'},
  { id: 9, 
    name: 'Ping Pong', 
    description:'play ping pong with ai', 
    link:'/pingpong',
    image: 'https://cdn6.aptoide.com/imgs/8/0/7/807f37e41bb078de90a11c67a7857032_screen.png?w=245'},
  { id: 10, 
    name: 'meteors', 
    description:'Try to survive in rain of meteors', 
    link:'/meteors'}
];

const Games = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState(null); 

  const openModal = (game) => {
    setSelectedGame(game);
  };

  const closeModal = () => {
    setSelectedGame(null);
  };


  return (
    <div className={s.container}>
      <button className={s.backButton} onClick={() => navigate('/MainPage')}>
        <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024">
          <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.46955-5.996574l-223.238073-223.238073c-7.992021-7.992021-7.992021-20.947078 0-28.939099l223.238073-223.238073c7.992021-7.992021 20.947078-7.992021 28.939099 0 7.992021 7.992021 7.992021 20.947078 0 28.939099L249.450329 475.058646l604.773963 0C865.521592 475.058646 874.690416 484.22747 874.690416 495.52477z"/>
        </svg>
        Назад
      </button>

      <div className={s.gamesGrid}>
        {games.map((game) => (
          <div key={game.id} className={s.gameCard}>
            <Link to={game.link}>
              <img src={game.image} alt={game.name} className={s.gameImage} />
            </Link>
            <div className={s.gameInfo}>
              <h3>{game.name}</h3>
              <button onClick={() => openModal(game)} className={s.infoButton}>
                <Info size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedGame && (
        <div className={s.modalOverlay} onClick={closeModal}>
          <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>{selectedGame.name}</h2>
            <p>{selectedGame.description}</p>
            <button onClick={closeModal} className={s.closeButton}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Games;
