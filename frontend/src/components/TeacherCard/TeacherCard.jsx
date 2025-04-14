import React from 'react';
import s from './TeacherCard.module.scss';
import { FaFlag, FaGlobeAmericas, FaGlobeEurope, FaGlobe } from "react-icons/fa";

const TeacherCard = ({ name, languages }) => {
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
              {/* В качестве руководителя 
              отдела мероприятий он проводил многочисленные мероприятия 
              и полезные сессии для своих сверстников и молодежи. 
              В 2023 году он преуспел в своем академическом пути. */}
            </p>
          </div>
        </div>
      </div>

      {/* 
      <div className={s.teacher__card}>
        <div className={s.teacher__img__div}>
          <img className={s.teacher__img} src="/teacher1.JPG" alt={name} />
        </div>
        <div className={s.teacher__card__text}>
          <h3>{name}</h3>
          {languages.map((lang) => (
            <h4 key={lang}>
              {getIcon(lang)} преподаёт: <span>{lang}</span>
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
        </div>
      </div>
      */}
    </div>
  );
};

export default TeacherCard;
