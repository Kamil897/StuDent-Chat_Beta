import React, { useState, useEffect, useRef, createContext } from 'react';
import s from './Footer.module.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
      <footer className={s.footer}>
      <div className={s.footer_content}>
        <div className={s.logo}>
          <img src="/Sdct.png" alt="" className={s.sdct} width="200" height="200"/>
        </div>
        <nav className={s.footer_nav}>
          <div className={s.links}>
             <Link>Группы</Link>
             <Link>Новости</Link> 
             <Link>Институты</Link>
             <Link>кк</Link> 
             <br />
             <Link>ааа</Link>
             <Link>вввв</Link>
          </div>
        </nav>
      </div>
      <div className={s.footer_bottom}>
        <p>&copy; {new Date().getFullYear()} StuDenChaT. Все права защищены.</p>
      </div>
    </footer>
  );
};

export default Footer;
