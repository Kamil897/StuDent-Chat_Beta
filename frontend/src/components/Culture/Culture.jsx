import React, { useState } from "react";
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

  const [showShareOptions, setShowShareOptions] = useState(false);
  const [like, setLike] = useState(1752);
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  const toggleLike = () => {
   if (liked) {
      setLike(like - 1); 
   } else {
      setLike(like + 1); 
   }
   setLiked(!liked); 
};

  const toggleSave = () => setSaved(!saved);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment) {
      setComments([...comments, comment]);
      setComment('');
    }
  };

  const shareToSocialMedia = (platform) => {
     const url = encodeURIComponent(window.location.href);
     const text = encodeURIComponent(p);
     const image = encodeURIComponent(ImgSrc);

     let shareUrl = '';

     switch (platform) {
        case 'facebook':
           shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
           break;
        case 'twitter':
           shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
           break;
        case 'whatsapp':
           shareUrl = `https://wa.me/?text=${text} ${url}`;
           break;
        case 'linkedin':
           shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}&summary=${text}`;
           break;
        case 'telegram':
           shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
           break;
        default:
           return;
     }

     window.open(shareUrl, '_blank', 'width=600,height=400');
     setShowShareOptions(false);
  };


  const handleShare = () => {
     if (navigator.share) {
       navigator.share({
         title: 'Новость',
         text: 'Посмотрите эту новость!',
         url: window.location.href,
       });
     } else {
       alert('Функция "Поделиться" не поддерживается.');
     }
   };
   

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
