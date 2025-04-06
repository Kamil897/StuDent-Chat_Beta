import React, { useState, useEffect, useRef, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './Edit.module.scss';

const EditProfile = () => {
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

    useEffect(() => {
        const username = localStorage.getItem('loggedInUsername');
        if (!username) {
            navigate('/login');
        } else {
            const user = JSON.parse(localStorage.getItem(username));
            setFormData(user);
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveChanges = () => {
        localStorage.setItem(formData.username, JSON.stringify(formData));
        alert('Изменения сохранены!');
        navigate('/MainPage');
    };

    return (
        <div className="container__main">
            <div className={s.div}>
                <h2 className={s.h2}>Редактирование профиля</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }}>
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
                            <label htmlFor="firstName">Имя</label>
                            <input
                                className={s.input}
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName">Фамилия</label>
                            <input
                                className={s.input}
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="hobby">Хобби</label>
                            <input
                                className={s.input}
                                type="text"
                                id="hobby"
                                name="hobby"
                                value={formData.hobby}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="education">Образование/Работа</label>
                            <input
                                className={s.input}
                                type="text"
                                id="education"
                                name="education"
                                value={formData.education}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <button className={s.btn} type="submit">Сохранить изменения</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
