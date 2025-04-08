import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import s from './Login.module.scss'

    const Login = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const navigate = useNavigate();

        const handleUsernameChange = (e) => {
            setUsername(e.target.value);
        };

        const handlePasswordChange = (e) => {
            setPassword(e.target.value);
        };

        const handleLogin = (e) => {
            e.preventDefault();

            const userData = JSON.parse(localStorage.getItem(username));

            if (!userData) {
                alert('Пользователь не найден');
                return;
            }

            if (userData.password !== password) {
                alert('Неверный пароль');
                return;
            }
            
            alert('Вход успешен!');
            localStorage.setItem('loggedInUsername', username);

            navigate('/MainPage'); 
        };

        return (
        <div className="container__main">

                <div className={s.formWrapper}>
                    <h2 className={s.title}>Вход</h2>
                        <form onSubmit={handleLogin} className={s.form}>
                            {/* Username */}
                            <div className={s.flexColumn}>
                            <label htmlFor="username">Имя пользователя</label>
                            </div>
                            <div className={s.inputForm}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
                                <path d="M16 16a6 6 0 1 0 -6-6 6 6 0 0 0 6 6zm0 2c-4 0-12 2-12 6v2h24v-2c0-4-8-6-12-6z" />
                            </svg>
                            <input
                                className={s.input}
                                type="text"
                                id="username"
                                placeholder="Введите имя пользователя"
                                value={username}
                                onChange={handleUsernameChange}
                                required
                            />
                            </div>

                            {/* Password */}
                            <div className={s.flexColumn}>
                            <label htmlFor="password">Пароль</label>
                            </div>
                            <div className={s.inputForm}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="-64 0 512 512">
                                <path d="M336 512H48c-26.4 0-48-21.6-48-48V240c0-26.4 21.6-48 48-48h288c26.4 0 48 21.6 48 48v224c0 26.4-21.6 48-48 48zM48 224c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16h288c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16z" />
                                <path d="M304 224c-8.8 0-16-7.2-16-16v-80c0-52.9-43.1-96-96-96s-96 43.1-96 96v80c0 8.8-7.2 16-16 16s-16-7.2-16-16v-80c0-70.6 57.4-128 128-128s128 57.4 128 128v80c0 8.8-7.2 16-16 16z" />
                            </svg>
                            <input
                                className={s.input}
                                type="password"
                                id="password"
                                placeholder="Введите пароль"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                            </div>

                            {/* Submit */}
                            <button className={s.button} type="submit">
                            Войти
                            </button>

                            {/* Registration link */}
                            <p className={s.text}>
                            Еще нет аккаунта?{' '}
                            <Link className={s.link} to="/register">
                                Регистрация
                            </Link>
                            </p>
                        </form>
                </div>
            </div>

        );
    };

    export default Login;
