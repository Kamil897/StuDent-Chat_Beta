import React, { useState, useEffect, useRef, createContext } from 'react';
import s from "./Slider.module.scss";

const Slider = () => {
  const slides = [
    {
      id: 1,
      title: "Стать волонтером",
      content:
        "Свяжитесь с любым из приютов, чтобы узнать, как вы можете внести свой вклад. Они всегда нуждаются в людях, готовых помочь. ",
        image: '/Colleg.JPG',
    },
    {
      id: 2,
      title: "Сделать пожертвование",
      content:
        "Финансовая поддержка помогает приютам обеспечивать корм, медикаменты и жилье для животных",
        image: '/Comit.JPG',
    },
    {
      id: 3,
      title: "Принять животное в семью",
      content:
        "Посетите любой из выше указанных приютов и найдите себе верного друга среди их подопечных.",
        image: '/learn.jpg',
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={s.slider}>
        <h2  className={s.slider__title}>Как вы можете помочь</h2>
        <button className={`${s.slider__button} ${s.slider__button__prev}`} onClick={prevSlide}>
        &#10094;
      </button>
      <div className={s.slider__content}>
        <h2>{slides[currentIndex].title}</h2>
        <p>{slides[currentIndex].content}</p>
      </div>
      <button className={`${s.slider__button} ${s.slider__button__next}`} onClick={nextSlide}>
        &#10095;
      </button>
      <div className={s.slider__dots}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`slider__dot ${
              index === currentIndex ? "slider__dot--active" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
