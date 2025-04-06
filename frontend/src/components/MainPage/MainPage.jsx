import { Link, useNavigate } from 'react-router-dom';
import s from './MainPage.module.scss';
import { useEffect, useState } from 'react';
import Dock from '../Dock/Dock.jsx';
import { VscHome } from 'react-icons/vsc';
import { IoMdExit } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { CgGames } from "react-icons/cg";
import { MdModeEditOutline } from "react-icons/md";

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


    const items = [
        { icon: <VscHome size={18} />, label: 'Домой', onClick: () => alert('Home!') , link: '/' },
        { icon: <CgGames size={18} />, label: 'Игры', onClick: () => alert('Games!') , link: '/Games' },
        { icon: <MdModeEditOutline size={18} />, label: 'Редактировать', onClick: () => alert('Edit!') , link: '/edit' },
        { icon: <IoMdExit size={18} />, label: 'Выйти с аккаунта', onClick: () => alert('Settings!') , link: '/' },
        { icon: <FiShoppingCart size={18} />, label: 'Магазин привилегий', onClick: () => alert('Shop!') , link: '/Shop' },
      ];

    return (
        <>
            {userData ? (
                <div className={s.sects}>
                    
                    <div className={s.section_2}>
                        <div className={s.main}>
                            <img className={userData.avatar ? s.pfp : s.defoltpfp} 
                                 src={userData.avatar || 'profileimg.png'} alt="profile" />
                            <div className={s.info}>
                                <h2 className={s.username}><b>{userData.firstName} {userData.lastName}</b></h2>
                                <p><b>Имя: </b>{userData.firstName}</p>
                                <p><b>Фамилия:</b>{userData.lastName}</p>
                                <p><b>Хобби:</b> {userData.hobby}</p>
                                <p><b>Образование/Работа:</b> {userData.education}</p>
                            </div>
                            <div>
                           
                            </div>


                        </div>
                    </div>
                    <Dock 
                                items={items}
                                panelHeight={68}
                                baseItemSize={50}
                                magnification={70}
                            />
                </div>
            ) : (
                <p>Загрузка...</p>
            )}
        </>
    );
};

export default MainPage;