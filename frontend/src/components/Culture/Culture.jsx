import React from "react";
import s from "../Society/Society.module.scss";
import FlowingMenu from '../FlowingMenu/FlowingMenu.jsx';

const newsData = [
    {
        id: 1,
        title: "Возрождение традиционных ремесел",
        content: "В ноябре 2024 года в Ташкенте прошла первая национальная конференция, посвящённая проблемам бездомных животных. На мероприятии обсуждались:Создание стандартов для приютов. Разработка программ стерилизации. Введение законодательства, которое обяжет всех владельцев регистрировать своих домашних питомцев. На конференции участвовали представители частных приютов, государственных органов и международные эксперты.",
    }, 
    {
        id: 2,
        title: "Сборы в помощь приютам через социальные сети",
        content: "Волонтёрские группы в социальных сетях, такие как «Мушуккент» и «SOS Animals Uzbekistan», организовали кампании по сбору средств для нужд приютов. За последние месяцы удалось собрать деньги на: Закупку кормов и вакцин для приютов в Ташкенте и Бухаре. Лечение животных с тяжёлыми травмами.",
    },
    {
        id: 3,
        title: "Акции по пристройству животных",
        content: "Приюты регулярно проводят акции, чтобы найти новых хозяев для животных: В Ташкенте была организована выставка животных, где более 50 собак и кошек нашли свой новый дом. Приюты Самарканда и Ферганы запустили кампанию «Возьми друга домой», которая проводится ежемесячно.",
    }
];

const Culture = () => {
  const demoItems = [
    { link: 'https://inha.uz/ru/glavnaya/', text: 'INHA', image: 'https://inha.uz/wp-content/uploads/2021/01/The_panoramic_view_of_IUT-1536x612.jpg' },
  ];

  return (
    <>
      <div className={s.newsPage}>
        <h1 className={s.title}>Приют - Защита животных</h1>
        <div className={s.newsList}>
          {newsData.map((news) => (
            <div key={news.id} className={s.newsItem}>
              <h2 className={s.newsTitle}>{news.title}</h2>
              <p className={s.newsContent}>{news.content}</p>
              <div className={s.likes}>
                <button onClick={toggleLike} className={s.like}>
                    <img
                    src={liked ? 'like_icon.svg' :  'empty_like_icon.svg'}
                    alt="like icon"
                    />
                </button>
                <h1>{like}</h1>
            
                <button className={s.podelis} onClick={toggleSave}>
                    {saved ? '✅ Сохранено' : '⭐ Сохранить'}
                </button>
                
                <button className={s.podelis} onClick={handleShare}>
                    🔗 Поделиться
                </button>
            
                {showShareOptions && (
                  <div className={s.shareOptions}>
                    <button onClick={() => shareToSocialMedia('facebook')}></button>
                    <button onClick={() => shareToSocialMedia('twitter')}></button>
                    <button onClick={() => shareToSocialMedia('whatsapp')}></button>
                    <button onClick={() => shareToSocialMedia('linkedin')}></button>
                    <button onClick={() => shareToSocialMedia('telegram')}></button>
                  </div>
                )}
              </div>

              <form onSubmit={handleCommentSubmit}>
                <input
                  type="text"
                  placeholder="Оставить комментарий"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button type="submit">Отправить</button>
              </form>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: '180px', position: 'relative', marginTop: '50px'}}>
          <FlowingMenu items={demoItems} />
      </div>
    </>
  );
};

export default Culture;
