import s from './HomeHero.module.scss'
import Slider from '../Slider/Slider.jsx';
import React, { useState, useEffect, useRef, createContext } from 'react';
import Clouds from "../Clouds/Clouds.jsx";
import AnimatedSpan from '../AnimatedSpan/AnimatedSpan.jsx'
import { motion } from 'framer-motion';
import SpotlightCard from '../SpotlightCard/SpotlightCard.jsx';
// import FlowingMenu from '../FlowingMenu/FlowingMenu.jsx';
import TiltedCard from '../TiltedCard/TiltedCard.jsx';
import Tabs from '../Tabs/Tabs.jsx';
import TextCursor from '../TextCursor/TextCursor.jsx';

const HomeHero = () => {
  const tooltipRef = useRef(null);
    const [showNav, setShowNav] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const triggerHeight = 200;
        if (window.scrollY > triggerHeight) {
          setShowNav(true);
        } else {
          setShowNav(false);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    const [activeSection, setActiveSection] = useState("");
        
    // const demoItems = [
    //   { link: '#', text: 'Mojave', image: 'https://picsum.photos/600/400?random=1' },
    //   { link: '#', text: 'Sonoma', image: 'https://picsum.photos/600/400?random=2' },
    //   { link: '#', text: 'Monterey', image: 'https://picsum.photos/600/400?random=3' },
    //   { link: '#', text: 'Sequoia', image: 'https://picsum.photos/600/400?random=4' }
    // ];

    useEffect(() => {
      const handleScroll = () => {
        const sections = document.querySelectorAll("section[id]");
        const navHeight = document.querySelector(".nav_nav")?.offsetHeight || 0;
    
        let currentSection = "";
    
        sections.forEach((section) => {
          const top = section.offsetTop - navHeight - 180;
          const bottom = top + section.offsetHeight;
          const scrollY = window.scrollY;
    
          if (scrollY >= top && scrollY <= bottom) {
            currentSection = section.id;
          }
        });

        setActiveSection(currentSection);
      };
    
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    const handleClick = (e, id) => {
      e.preventDefault();
      const section = document.getElementById(id);
      const navHeight = document.querySelector(".nav_nav")?.offsetHeight || 0;
    
      if (section) {
        window.scrollTo({
          top: section.offsetTop - navHeight - 180,
          behavior: "smooth",
        });
      }
    };

    useEffect(() => {
      const handleMouseMove = (event) => {
        const tooltip = tooltipRef.current;
        if (!tooltip) return;
  
        const tooltipRect = tooltip.getBoundingClientRect();
        const positionX = ((event.clientX - tooltipRect.left) / tooltipRect.width) * 100;
        const positionY = ((event.clientY - tooltipRect.top) / tooltipRect.height) * 100;
  
        tooltip.style.setProperty("--position-x", `${positionX}%`);
        tooltip.style.setProperty("--position-y", `${positionY}%`);
      };
  
      const tooltip = tooltipRef.current;
      if (tooltip) {
        tooltip.addEventListener("mousemove", handleMouseMove);
      }
  
      return () => {
        if (tooltip) {
          tooltip.removeEventListener("mousemove", handleMouseMove);
        }
      };
    }, []);
  return (
    <>

      <section className={s.welcome_section}>
        {/* <Clouds /> */}
        <h1>Student Chat</h1>
        <h3>место помощи - кому?</h3>
        <TextCursor
  text="студентам!"
  delay={0.01}
  spacing={200}
  followMouseDirection={true}
  randomFloat={true}
  exitDuration={0.3}
  removalInterval={40}
  maxPoints={10}
/>
      </section>
      

      <section className={s.active} id="section-О нас">
                <div className={s.home_wrapper}>
                    <h2 className={s.home_title}>О нас</h2>
                    <p className={s.home_text}>Мы создали эту платформу для тех, кто стремится к знаниям,
                        уверенности и новым достижениям. Здесь вы найдёте всё, что нужно для учебы, общения 
                        и поддержки на пути к поступлению в колледжи, университеты и другие учебные заведения. 
                        Наш проект — это место, где мечты превращаются в планы, а планы — в реальность!
                    </p>
                </div>
<div className="home_img">
  <img src="/hi.svg" alt="" />
</div>
      </section>
      {/* <div className="line"></div> */}

      <section className={s.services} id="section-Наши преимущество">
        <h1 style={{ textAlign: "center", color: "#fff", fontSize: "42px", marginBottom: "60px", paddingTop: "40px"}}>Как вы можете помочь</h1>
            {/* <Slider /> */}
            <Tabs/>
      </section>
      {/* <div className="line"></div> */}

      <div className={s.spotlight__cards}>
        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
        <h2 className={s.item_title}>Общение и взаимопомощь</h2>
                            <p className={s.item_text}>Мы не просто платформа для информации — мы место,
                                где каждый может делиться своим опытом и вдохновляться историей других.</p>
        </SpotlightCard>
                <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                <h2 className={s.item_title}>Гибкость в обучении</h2>
                            <p className={s.item_text}>Вы сами выбираете, как учиться: участвовать в онлайн-занятиях,
                                проходить тесты или смотреть записи уроков.</p>
        </SpotlightCard>
                <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                <h2 className={s.item_title}>Развитие навыков</h2>
                            <p className={s.item_text}>Помимо поступления, мы помогаем развивать навыки, которые пригодятся в учёбе и жизни: 
                                умение работать в команде, 
                                выступать публично, решать проблемы и управлять своим временем.</p>
        </SpotlightCard>
      </div>
      

      <section className={s.our_users}>
            <h1 className={s.our_users_title} id="section-Почему выбирают нас">Почему выбирают нас?</h1>
            <div className={s.content_our}>
                <div className={s.item}>
                    <img className={s.item_img} src="/chart.png" alt="График" />
                    <h2 className={s.item_text_desc}>Доступность 24/7</h2>
                    <p className={s.item_text_decor}>Мы всегда на связи! Вы можете задавать вопросы
                    , получать поддержку и находить ответы тогда, когда это вам удобно.</p>
                </div>
                <div className={s.item}>
                    <img className={s.item_img} src="/laptop.png" alt="Ноутбук" />
                    <h2 className={s.item_text_desc}>Лучшие наставники</h2>
                    <p className={s.item_text_decor}>Опытные специалисты помогут разобраться в сложных темах,
                    составить учебный план и даже подготовить вас к важным экзаменам.</p>
                </div>
                <div className={s.item}>
                    <img className={s.item_img} src="/house.png" alt="" />
                    <h2 className={s.item_text_desc}>Безопасное и доброжелательное пространство</h2>
                    <p className={s.item_text_decor}>Мы следим за тем, чтобы общение на платформе было комфортным.
                    Здесь вы можете быть собой, делиться идеями и мнениями без страха быть осуждённым.</p>
                </div>
            </div>
      </section>
{/* 
      <div style={{ height: '600px', position: 'relative' }}>
        <FlowingMenu items={demoItems} />
      </div> */}
    </>
  )
}
export default HomeHero;
