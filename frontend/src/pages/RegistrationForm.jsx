import React, { useState, useEffect, useRef, createContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import s from './Registration.module.scss';

const Registration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        hobby: '',
        education: '',
        username: '',
        password: '',
        avatar: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = (e) => {
        e.preventDefault();

        const existingUser = localStorage.getItem(formData.username);
        if (existingUser) {
            alert('Пользователь с таким именем уже существует');
            return;
        }

        localStorage.setItem(formData.username, JSON.stringify(formData));

        alert('Регистрация прошла успешно!');
        
        navigate('/login');
    };

    return (
        <div className="container__main">
                <form className={s.form} onSubmit={handleRegister}>
            {/* Аватарка */}
            <div className={s.img}>
                <label htmlFor="avatar" className={s.imageUpload}>
                <img
                    src={formData.avatar || 'profileimg.png'}
                    alt="Аватар"
                    className={s.uploadImage}
                />
                </label>
                <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        setFormData({
                        ...formData,
                        avatar: reader.result,
                        });
                    };
                    reader.readAsDataURL(file);
                    }
                }}
                />
            </div>

            {/* Имя */}
            <div className={s.flex_column}>
                <label>Имя</label>
            </div>
            <div className={s.inputForm}>
                <input
                className={s.input}
                placeholder="Введите имя"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                />
            </div>

            {/* Фамилия */}
            <div className={s.flex_column}>
                <label>Фамилия</label>
            </div>
            <div className={s.inputForm}>
                <input
                className={s.input}
                placeholder="Введите фамилию"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                />
            </div>

            {/* Хобби */}
            <div className={s.flex_column}>
                <label>Хобби</label>
            </div>
            <div className={s.inputForm}>
                <input
                className={s.input}
                placeholder="Ваше хобби"
                type="text"
                name="hobby"
                value={formData.hobby}
                onChange={handleChange}
                />
            </div>

            {/* Образование/Работа */}
            <div className={s.flex_column}>
                <label>Образование / Работа</label>
            </div>
            <div className={s.inputForm}>
                <input
                className={s.input}
                placeholder="Образование или место работы"
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                />
            </div>

            {/* Дата рождения */}
            <div className={s.flex_column}>
                <label>Дата рождения (необязательно)</label>
            </div>
            <div className={s.inputForm}>
                <input
                className={s.input}
                type="date"
                name="birth"
                value={formData.birth}
                onChange={handleChange}
                />
            </div>

            {/* Имя пользователя */}
            <div className={s.flex_column}>
                <label>Имя пользователя</label>
            </div>
            <div className={s.inputForm}>
                <input
                className={s.input}
                placeholder="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                />
            </div>

            {/* Пароль */}
            <div className={s.flex_column}>
                <label>Пароль</label>
            </div>
            <div className={s.inputForm}>
                <input
                className={s.input}
                placeholder="Введите пароль"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                />
            </div>

            {/* Кнопка отправки */}
            <button className={s.button_submit} type="submit">
                Зарегистрироваться
            </button>

            {/* Ссылка на вход */}
            <p className={s.p}>
                Уже есть аккаунт? <span className={s.span}><Link to="/login">Войти</Link></span>
            </p>
            </form>
        </div>
    );
};

export default Registration;
