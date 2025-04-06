import React, { useState, useEffect, useRef, createContext } from 'react';
import s from './NotFoundPage.module.scss';  

const NotFoundPage = () => {
  return (
    <div className={s.body}>
      <div className={s.head}>
        <div className={s.meta}></div>
        <div className={s.meta}></div>
        <div className={s.meta}></div>
      </div>
      <div className={s.m}>
      </div>
    </div>
  );
};

export default NotFoundPage;