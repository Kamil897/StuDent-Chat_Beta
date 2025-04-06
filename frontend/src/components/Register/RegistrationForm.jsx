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
        avatar: '',
        birth: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = (e) => {
        e.preventDefault();

        const existingUser = localStorage.getItem(formData.username);
        if (existingUser) {
            alert('Пользователь с таким именем уже существует');
            return;
        }
        
        let calculatedAge = null;

        if (formData.birth) {
            const birthDateObj = new Date(formData.birth);
            const today = new Date();
            calculatedAge = today.getFullYear() - birthDateObj.getFullYear();
            const monthDiff = today.getMonth() - birthDateObj.getMonth();

            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
                calculatedAge--;
            }
        }

        const userData = {
            ...formData,
            age: calculatedAge,
        };

        localStorage.setItem(formData.username, JSON.stringify(userData));

        alert('Регистрация прошла успешно!');
        navigate('/login');
    };

    return (
        <div className="container__main">
            <div className={s.div}>
                <h2 className={s.h2}>Регистрация</h2>
                <form onSubmit={handleRegister}>
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
                            className={s.hiddenInput}
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
                    <div className={s.form}>
                        <div>
                            <label htmlFor="firstName">
                                <p>Имя</p>
                                <input
                                    className={s.input}
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        <div>
                            <label htmlFor="lastName">
                                <p>Фамилия</p>
                                <input
                                    className={s.input}
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        <div>
                            <label htmlFor="hobby">
                                <p>Хобби</p>
                                <input
                                    className={s.input}
                                    type="text"
                                    id="hobby"
                                    name="hobby"
                                    value={formData.hobby}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        <div>
                            <label htmlFor="education">
                                <p>Образование/Работа</p>
                                <input
                                    className={s.input}
                                    type="text"
                                    id="education"
                                    name="education"
                                    value={formData.education}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        <div>
                            <label htmlFor="birth">
                                <p>Дата рождения: (Не обязательно)</p>
                                <input
                                    className={s.input}
                                    type="date"
                                    id="birth"
                                    name="birth"
                                    value={formData.birth}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        <div>
                            <label htmlFor="username">
                                <p>Имя пользователя</p>
                                <input
                                    className={s.input}
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        <div>
                            <label htmlFor="password">
                                <p>Пароль</p>
                                <input
                                    className={s.input}
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>
                    </div>
                    <Link className={s.link} to={'/login'}>
                        Уже есть аккаунт? Войти
                    </Link>
                    <button className={s.btn} type="submit">
                        Зарегистрироваться
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Registration;
