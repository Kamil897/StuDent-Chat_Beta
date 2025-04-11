import React, { useState } from "react";
import s from "./TeacherHero.module.scss";
import TeacherCard from "../TeacherCard/TeacherCard";
import { FaFlag, FaGlobeAmericas, FaGlobeEurope, FaGlobe } from "react-icons/fa";

const TeacherHero = ({ langName }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("Все");

  const languages = [
    { id: "all", name: "Все" },
    { id: "russian", name: "Русский" },
    { id: "english", name: "Английский" },
    { id: "german", name: "Немецкий" },
    { id: "french", name: "Французский" },
  ];

  const getIcon = (langName) => {
    switch (langName.toLowerCase()) {
      case "русский":
        return <FaFlag />;
      case "английский":
        return <FaGlobeAmericas />;
      case "французский":
        return <FaGlobeEurope />;
      case "немецкий":
        return <FaGlobe />;
      default:
        return <FaGlobe />;
    }
  };
  

  const teachers = [
    { id: 1, name: "Иван Иванов", teaches: ["Русский"] },
    { id: 2, name: "John Smith", teaches: ["Английский"] },
    { id: 3, name: "Hans Müller", teaches: ["Немецкий"] },
    { id: 4, name: "Jean Dupont", teaches: ["Французский"] },
    { id: 5, name: "Анна Петрова", teaches: ["Русский", "Английский"] },
    { id: 6, name: "Emma Johnson", teaches: ["Английский", "Французский"] },
  ];

  const filteredTeachers =
    selectedLanguage === "Все"
      ? teachers
      : teachers.filter((teacher) => teacher.teaches.includes(selectedLanguage));

  return (
    <section className={s.teacher}>
      <div className={s.container}>
        {/* Фильтр-кнопки */}
        <div className={s.filter}>
        {languages.map((lang) => (
            <button
              key={lang.id}
              className={`${s.languageButton} ${
                selectedLanguage === lang.name ? s.active : ""
              }`}
              onClick={() => setSelectedLanguage(lang.name)}
            >
              {getIcon(lang.name)} {lang.name}
            </button>
          ))}
        </div>

        {/* Карточки преподавателей */}
        <div className={s.teacherCards}>
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map((teacher) => (
              <div key={teacher.id} className={s.fadeIn}>
                <TeacherCard name={teacher.name} languages={teacher.teaches} />
              </div>
            ))
          ) : (
            <p className={s.noResults}>Учителей с таким языком нет...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TeacherHero;
