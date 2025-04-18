// import React from 'react';
// import s from './TeacherCard.module.scss';
// import { FaFlag, FaGlobeAmericas, FaGlobeEurope, FaGlobe } from "react-icons/fa";

// const TeacherCard = ({ name, languages }) => {
//   const getIcon = (langName) => {
//     switch (langName.toLowerCase()) {
//       case "русский":
//         return <FaFlag style={{ color: "#e74c3c" }} />;
//       case "английский":
//         return <FaGlobeAmericas style={{ color: "#3498db" }} />;
//       case "французский":
//         return <FaGlobeEurope style={{ color: "#9b59b6" }} />;
//       case "немецкий":
//         return <FaGlobe style={{ color: "#f1c40f" }} />;
//       default:
//         return <FaGlobe style={{ color: "#bdc3c7" }} />;
//     }
//   };

//   return (
//     <div className={s.card}>
//       <div className={s.inner}>
//         <div className={s.front}>
//           <div className={s.teacher__img__div}>
//             <img className={s.teacher__img} src="/teacher1.JPG" alt={name} />
//           </div>
//           <h3 className={s.teacher__name}>{name}</h3>
//         </div>
//         <div className={s.back}>
//           <div className={s.teacher__card__text}>
//             {languages.map((lang) => (
//               <h4 key={lang}>
//                 {getIcon(lang)} Преподаёт: <span>{lang}</span>
//               </h4>
//             ))}
//             <p className={s.card__text}>
//               Познакомьтесь с Ботиржоном Тожибоевым, 
//               руководителем отдела мероприятий и выпускником 
//               государственной школы. Сочетая в себе интересы
//               к музыке, искусству, космосу и преподаванию, 
//               Ботиржон — художник, который любит 
//               играть на фортепиано и гитаре.
//               {/* В качестве руководителя 
//               отдела мероприятий он проводил многочисленные мероприятия 
//               и полезные сессии для своих сверстников и молодежи. 
//               В 2023 году он преуспел в своем академическом пути. */}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* 
//       <div className={s.teacher__card}>
//         <div className={s.teacher__img__div}>
//           <img className={s.teacher__img} src="/teacher1.JPG" alt={name} />
//         </div>
//         <div className={s.teacher__card__text}>
//           <h3>{name}</h3>
//           {languages.map((lang) => (
//             <h4 key={lang}>
//               {getIcon(lang)} преподаёт: <span>{lang}</span>
//             </h4>
//           ))}
//           <p className={s.card__text}>
//             Познакомьтесь с Ботиржоном Тожибоевым, 
//             руководителем отдела мероприятий и выпускником 
//             государственной школы. Сочетая в себе интересы
//             к музыке, искусству, космосу и преподаванию, 
//             Ботиржон — художник, который любит 
//             играть на фортепиано и гитаре.
//           </p>
//         </div>
//       </div>
//       */}
//     </div>
//   );
// };

// export default TeacherCard;



import React, { useState } from 'react';
import s from './TeacherCard.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFlag, FaGlobeAmericas, FaGlobeEurope, FaGlobe } from "react-icons/fa";
import { FaTelegram, FaInstagram, FaLinkedin } from "react-icons/fa";

const TeacherCard = ({ name, languages }) => {
  const [showModal, setShowModal] = useState(false);

  const getIcon = (langName) => {
    switch (langName.toLowerCase()) {
      case "русский":
        return <FaFlag style={{ color: "#e74c3c" }} />;
      case "английский":
        return <FaGlobeAmericas style={{ color: "#3498db" }} />;
      case "французский":
        return <FaGlobeEurope style={{ color: "#9b59b6" }} />;
      case "немецкий":
        return <FaGlobe style={{ color: "#f1c40f" }} />;
      default:
        return <FaGlobe style={{ color: "#bdc3c7" }} />;
    }
  };

  return (
    <div className={s.card}>
      <div className={s.inner}>
        <div className={s.front}>
          <div className={s.teacher__img__div}>
            <img className={s.teacher__img} src="/teacher1.JPG" alt={name} />
          </div>
          <h3 className={s.teacher__name}>{name}</h3>
        </div>

        <div className={s.back}>
          <div className={s.teacher__card__text}>
            {languages.map((lang) => (
              <h4 key={lang}>
                {getIcon(lang)} Преподаёт: <span>{lang}</span>
              </h4>
            ))}
            <p className={s.card__text}>
              Познакомьтесь с Ботиржоном Тожибоевым, 
              руководителем отдела мероприятий и выпускником 
              государственной школы. Сочетая в себе интересы
              к музыке, искусству, космосу и преподаванию, 
              Ботиржон — художник, который любит 
              играть на фортепиано и гитаре.
            </p>

            <button className={s.socialsBtn} onClick={() => setShowModal(true)}>
              Контакты
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className={s.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={s.modal}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2>Социальные сети</h2>
              <div className={s.socialIcons}>
                <a href="#" target="_blank" rel="noopener noreferrer"><FaTelegram /></a>
                <a href="#" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                <a href="#" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              </div>
              <button className={s.closeBtn} onClick={() => setShowModal(false)}>
                Закрыть
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeacherCard;


// 2 ВАРИАНТ

// import React, { useState } from 'react';
// import s from './TeacherCard.module.scss';
// import { FaFlag, FaGlobeAmericas, FaGlobeEurope, FaGlobe, FaTelegram, FaInstagram, FaYoutube } from "react-icons/fa";
// import { motion, AnimatePresence } from 'framer-motion';

// const TeacherCard = ({ name, languages }) => {
//   const [showSocials, setShowSocials] = useState(false);

//   const getIcon = (langName) => {
//     switch (langName.toLowerCase()) {
//       case "русский":
//         return <FaFlag style={{ color: "#e74c3c" }} />;
//       case "английский":
//         return <FaGlobeAmericas style={{ color: "#3498db" }} />;
//       case "французский":
//         return <FaGlobeEurope style={{ color: "#9b59b6" }} />;
//       case "немецкий":
//         return <FaGlobe style={{ color: "#f1c40f" }} />;
//       default:
//         return <FaGlobe style={{ color: "#bdc3c7" }} />;
//     }
//   };

//   return (
//     <div className={s.card}>
//       <div className={s.inner}>
//         <div className={s.front}>
//           <div className={s.teacher__img__div}>
//             <img className={s.teacher__img} src="/teacher1.JPG" alt={name} />
//           </div>
//           <h3 className={s.teacher__name}>{name}</h3>
//           <button onClick={() => setShowSocials(true)} className={s.socialsBtn}>
//             Соц. сети
//           </button>
//           <div className={s.teacher__card__text}>
//             {languages.map((lang) => (
//               <h4 key={lang}>
//                 {getIcon(lang)} Преподаёт: <span>{lang}</span>
//               </h4>
//             ))}
//             <p className={s.card__text}>
//               Познакомьтесь с Ботиржоном Тожибоевым, 
//               руководителем отдела мероприятий и выпускником 
//               государственной школы. Сочетая в себе интересы
//               к музыке, искусству, космосу и преподаванию, 
//               Ботиржон — художник, который любит 
//               играть на фортепиано и гитаре.
//             </p>
//           </div>
//           <AnimatePresence>
//             {showSocials && (
//               <motion.div
//                 className={s.modalOverlay}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 onClick={() => setShowSocials(false)}
//               >
//                 <motion.div
//                   className={s.modal}
//                   initial={{ y: -20, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   exit={{ y: 20, opacity: 0 }}
//                   transition={{ type: "spring", stiffness: 60 }}
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   <h2>Свяжитесь с учителем</h2>
//                   <div className={s.socialIcons}>
//                     <a href="https://t.me/username" target="_blank" rel="noreferrer">
//                       <FaTelegram />
//                     </a>
//                     <a href="https://instagram.com/username" target="_blank" rel="noreferrer">
//                       <FaInstagram />
//                     </a>
//                     <a href="https://youtube.com/@username" target="_blank" rel="noreferrer">
//                       <FaYoutube />
//                     </a>
//                   </div>
//                   <button onClick={() => setShowSocials(false)} className={s.closeBtn}>
//                     Закрыть
//                   </button>
//                 </motion.div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         <div className={s.back}>
//           <div className={s.teacher__card__text}>
//             {languages.map((lang) => (
//               <h4 key={lang}>
//                 {getIcon(lang)} Преподаёт: <span>{lang}</span>
//               </h4>
//             ))}
//             <p className={s.card__text}>
//               Познакомьтесь с Ботиржоном Тожибоевым, 
//               руководителем отдела мероприятий и выпускником 
//               государственной школы. Сочетая в себе интересы
//               к музыке, искусству, космосу и преподаванию, 
//               Ботиржон — художник, который любит 
//               играть на фортепиано и гитаре.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherCard;
