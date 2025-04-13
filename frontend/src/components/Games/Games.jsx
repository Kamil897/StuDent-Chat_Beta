// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import s from './Games.module.scss';
// import { Link } from 'react-router-dom';

// const games = [
//   { id: 1, name: 'Flappy Bird', description: 'Забытая игра', link: '/flappybird' },
//   { id: 2, name: 'Snake', description: 'Змейка', link: '/Snake' },
//   { id: 3, name: 'Tic Tac', description: 'Крестики-Нолики', link: '/TicTacToe' },
//   { id: 4, name: 'Тир', description: 'Убейте шайтанов', link: '/Tir' },
//   { id: 5, name: 'Лабиринт знаний', description: 'Отвечайте на школные вопросы', link: '/KnowledgeMaze' },
//   { id: 6, name: 'Математический бой', description: 'Решайте примеры и атакуйте соперника', link: "/MathBattle" },
//   { id: 7, name: 'Packman', description: 'Скоро в игре.', link: null },
//   { id: 8, name: 'Doom', description: 'Скоро в игре.', link: null },
//   { id: 9, name: 'Ping Pong', description:'play ping pong with ai', link:'/pingpong'},
//   { id: 10, name: 'meteors', description:'Try to survive in rain of meteors', link:'/meteors'}
// ];

//   const Games = () => {
//     const navigate = useNavigate();

//     return (
//       <div className={s.container}>
//         <button className={s.backButton} onClick={() => navigate('/MainPage')}>
//           <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
//           <span>Назад</span>
//         </button>
        
//         <h1 className={s.title}>Игры</h1>
//         <div className={s.gamesGrid}>
//           {games.map((game) => (
//             <div key={game.id} className={s.gameCard}>
//               <h2 className={s.gameTitle}>{game.name}</h2>
//               <p className={s.gameDescription}>{game.description}</p>
//               {game.link ? (
//                 <Link to={game.link} className={s.playLink}>
//                   <button className={s.playButton}>Играть</button>
//                 </Link>
//               ) : (
//                 <button className={s.disabledButton} disabled>Скоро</button>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   export default Games;




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
