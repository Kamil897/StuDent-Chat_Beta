import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Info, Play, Filter, Search } from 'lucide-react'; 
import s from './Games.module.scss';

const games = [
  { 
    id: 1,
    name: 'Flappy Bird',
    description: 'Fly through obstacles in this challenging arcade game. Test your reflexes and timing as you navigate the bird through a series of pipes.',
    link: '/flappybird',
    image: 'https://miro.medium.com/v2/resize:fit:1400/1*MZcxSSARUkVfSeAwzQ95kw.png',
    video: 'https://www.youtube.com/embed/WN6YEU2Dg1Q',
    category: 'Arcade'
  },
  { 
    id: 2, 
    name: 'Snake', 
    description: 'The classic Snake game reimagined. Eat food, grow longer, and avoid running into yourself or the walls!', 
    link: '/Snake', 
    image: 'https://play-lh.googleusercontent.com/xIDxenYWwwKdyDF2eYzSYhKUMVejc0AhOR64mpcY4keuwXP3UeI7yN1SnIJT4tpjgc4',
    category: 'Classic'
  },
  { 
    id: 3, 
    name: 'Tic Tac', 
    description: 'Challenge your friends or play against the computer in this timeless game of X and O.', 
    link: '/TicTacToe', 
    image: 'https://cdn.pixabay.com/photo/2013/07/12/15/56/tic-tac-toe-150614_960_720.png',
    category: 'Board'
  },
  { 
    id: 4, 
    name: 'Тир', 
    description: 'Test your aim and reflexes in this fast-paced shooter game. How many targets can you hit?', 
    link: '/Tir', 
    image: 'https://storage.needpix.com/rsynced_images/archery-152912_1280.png',
    category: 'Action'
  },
  { 
    id: 5, 
    name: 'Лабиринт знаний', 
    description: 'Navigate through a maze while answering educational questions. Learn while you play!', 
    link: '/KnowledgeMaze', 
    image: '/images/maze.jpg',
    category: 'Educational'
  },
  { 
    id: 6, 
    name: 'Математический бой', 
    description: 'Solve math problems quickly to attack your opponent. The faster you solve, the stronger your attack!', 
    link: '/MathBattle',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj3mQCkWcLzOW-frEhIZ22Elqm6ljJMHzSgNj8hPhM3fjuZg60n7IIQc682tQmMg8umDkAalQ_SJjFrirFhqbPpsXFcsUgw2QwrXs7rQxECOP_cd2TMXOUFPpwKO6stMfeFcBCP_Mwy14-nsQwL60o-TIe_lAWYD3-s1qQ-4vmc68Omv7jkQFofX8hC/s1600/formula.jpg',
    category: 'Educational'
  },
  { 
    id: 7, 
    name: 'Камень, ножницы, бумага', 
    description: 'The classic game of chance and strategy. Can you outsmart your opponent?', 
    link: '/don',
    image: 'https://habrastorage.org/r/w1560/getpro/geektimes/post_images/28e/2a3/577/28e2a357753505ae9a7eb40097e93dbf.png',
    category: 'Classic'
  },
  { 
    id: 8, 
    name: 'Space Invaders',
    description: 'Defend Earth from alien invaders in this retro-style shooter.', 
    link: '/inviders',
    image: 'https://play-lh.googleusercontent.com/0goocG7RJZDZ41ShfBPl-h7ctwHKHjqzn4nSImyL8_RWyXqeYNKw-CdGAKhgPGZG5Es=w240-h480-rw',
    category: 'Arcade'
  },
  { 
    id: 9, 
    name: 'Ping Pong', 
    description: 'Test your reflexes in this fast-paced table tennis simulation against an AI opponent.', 
    link: '/pingpong',
    image: 'https://cdn6.aptoide.com/imgs/8/0/7/807f37e41bb078de90a11c67a7857032_screen.png?w=245',
    category: 'Sports'
  },
  { 
    id: 10, 
    name: 'Meteors', 
    description: 'Navigate your spaceship through a dangerous meteor shower. How long can you survive?', 
    link: '/meteors',
    image: '/images/meteors.jpg',
    category: 'Action'
  }
];

const categories = ['All', ...new Set(games.map(game => game.category))];

const Games = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const openModal = (game) => {
    setSelectedGame(game);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedGame(null);
    document.body.style.overflow = 'auto';
  };

  const filteredGames = selectedCategory === 'All' 
    ? games 
    : games.filter(game => game.category === selectedCategory);

  const playGame = (link) => {
    closeModal();
    navigate(link);
  };

  return (
    <div className={s.container}>
      <button className={s.backButton} onClick={() => navigate('/MainPage')}>
        <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024">
          <path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.46955-5.996574l-223.238073-223.238073c-7.992021-7.992021-7.992021-20.947078 0-28.939099l223.238073-223.238073c7.992021-7.992021 20.947078-7.992021 28.939099 0 7.992021 7.992021 7.992021 20.947078 0 28.939099L249.450329 475.058646l604.773963 0C865.521592 475.058646 874.690416 484.22747 874.690416 495.52477z"/>
        </svg>
        Назад
      </button>
      
      <div className={s.filterSection}>
        {categories.map(category => (
          <button 
            key={category} 
            className={`${s.filterButton} ${selectedCategory === category ? s.active : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={s.gamesGrid}>
        {isLoading ? (

          Array(8).fill().map((_, index) => (
            <div key={`skeleton-${index}`} className={s.skeletonCard}></div>
          ))
        ) : filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <div key={game.id} className={s.gameCard}>
              <div className={s.gameImageWrapper}>
                <Link to={game.link}>
                  <img src={game.image} alt={game.name} className={s.gameImage} />
                  {game.video && (
                    <iframe 
                      src={game.video} 
                      title={`${game.name} preview`}
                      className={s.videoPreview}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                </Link>
                {game.category && <div className={s.categoryTag}>{game.category}</div>}
              </div>
              <div className={s.gameInfo}>
                <h3>{game.name}</h3>
                <button onClick={() => openModal(game)} className={s.infoButton}>
                  <Info size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={s.noGamesFound}>
            <Search size={48} />
            <p>No games found in this category</p>
          </div>
        )}
      </div>

      {selectedGame && (
        <div className={s.modalOverlay} onClick={closeModal}>
          <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={s.modalHeader}>
              <h2>{selectedGame.name}</h2>
            </div>
            <p>{selectedGame.description}</p>
            <button onClick={closeModal} className={s.closeButton}></button>
            <button 
              onClick={() => playGame(selectedGame.link)} 
              className={s.playButton}
            >
              <Play size={18} />
              Play Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Games;