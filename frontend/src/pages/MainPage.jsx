import React, { useState, useEffect, useRef, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './MainPage.module.scss';

const MainPage = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const username = localStorage.getItem('loggedInUsername');
        if (!username) {
            navigate('/login'); 
        } else {
            const user = JSON.parse(localStorage.getItem(username));
            setUserData(user);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('loggedInUsername'); 
        navigate('/login'); 
    };

    return (
       <>
            {userData ? (
            
                    <div className={s.sects}>
                    <div className={s.section}>
                    <h2 >Группы</h2>
                    <h3  className={s.groups}>Группа</h3>
                    <h3  className={s.groups}>Группа</h3>
                    <h3  className={s.groups}>Группа</h3>
                    <h3  className={s.groups}>Группа</h3>

                    </div>
                    <div className={s.section_2}>
                        <div className={s.main}>
                        <img className={s.pfp} src={userData.avatar} alt="" />
                        <div className={s.info}>
                        <h2 className={s.username}>  {userData.firstName}  {userData.lastName}</h2>
                        <p><b>Имя: </b>{userData.firstName}</p>
                        <p><b>Фамилия:</b>{userData.lastName}</p>
                        <p> <b>Хобби:</b> {userData.hobby}</p>
                        <p> <b>Образование/Работа:</b> {userData.education}</p>
                        </div>



                        <div className={s.inst}>
                        
                        </div>
                        </div>
                    </div>
                    </div>
    
            ) : (
                <p>Загрузка...</p>
            )}
       </>
    );
};

export default MainPage;
