import React from 'react';
import s from './TeacherCard.module.scss';

const TeacherCard = ({ name, languages }) => {
  return (
    <div className={s.teacher__card}>
      <div className={s.teacher__img__div}>
        <img className={s.teacher__img} src="/teacher1.JPG" alt={name} />
        <div className={s.teacher__btn__div}>
          <h1 className={s.teacher__btn}>Написать</h1>
        </div>
      </div>
      <div className={s.teacher__card__text}>
        <h3>{name}</h3>
        <h4>Преподаёт: {languages.join(', ')}</h4>
        <p className={s.card__text}>
          Познакомьтесь с Ботиржоном Тожибоевым, 
          руководителем отдела мероприятий и выпускником 
          государственной школы. Сочетая в себе интересы
          к музыке, искусству, космосу и преподаванию, 
          Ботиржон — художник, который любит 
          играть на фортепиано и гитаре. В качестве руководителя 
          отдела мероприятий он проводил многочисленные мероприятия 
          и полезные сессии для своих сверстников и молодежи. 
          В 2023 году он преуспел в своем академическом пути.
        </p>
      </div>
    </div>
  );
};

export default TeacherCard;
