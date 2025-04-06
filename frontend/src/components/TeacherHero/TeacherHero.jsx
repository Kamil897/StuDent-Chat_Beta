import React, { useState } from "react";
import s from "./TeacherHero.module.scss";
import TeacherCard from "../TeacherCard/TeacherCard";

const TeacherHero = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("Все");

  const languages = [
    { id: "all", name: "Все" },
    { id: "russian", name: "Русский" },
    { id: "english", name: "Английский" },
    { id: "german", name: "Немецкий" },
    { id: "french", name: "Французский" },
  ];

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
          {languages.map((language) => (
            <button
              key={language.id}
              className={`${s.languageButton} ${
                selectedLanguage === language.name ? s.active : ""
              }`}
              onClick={() => setSelectedLanguage(language.name)}
            >
              {language.name}
            </button>
          ))}
        </div>

        {/* Карточки преподавателей */}
        <div className={s.teacherCards}>
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map((teacher) => (
              <TeacherCard key={teacher.id} name={teacher.name} languages={teacher.teaches} />
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
