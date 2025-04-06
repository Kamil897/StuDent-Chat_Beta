import React, { useState } from "react";
import s from "./Society.module.scss";
import FlowingMenu from '../FlowingMenu/FlowingMenu.jsx';

const newsData = [
  {
    id: 1,
    title: "Открытие новых приютов в регионах",
    content:
      "Согласно последним сообщениям, в рамках программы улучшения условий для бездомных животных в 2024 году было объявлено о создании новых приютов в каждом регионе Узбекистана. Первые такие центры уже начали свою работу в Ташкенте, Самарканде и Ферганской области. Эти приюты предоставляют временное убежище для кошек и собак, проводят их вакцинацию, стерилизацию и лечение.В Ташкенте открылся первый муниципальный приют, финансируемый из бюджета города. Здесь планируется размещение до 500 животных одновременно.",
  },
  {
    id: 2,
    title: "Волонтёрские приюты усиливают свою деятельность",
    content:
      "Частные приюты, созданные волонтёрами, продолжают активно работать: Приют «Хаёт» (Ташкент): за последний год увеличил количество спасённых животных. Волонтёры сообщили, что с начала года они нашли новых хозяев для более 200 собак и кошек. «Доброе сердце» (Самарканд): приют провёл первую благотворительную акцию, в ходе которой собрали корм и лекарства на сумму более 10 млн сумов.",
  },
  {
    id: 3,
    title: "Программа «Построй дом для друга»",
    content:
      "В конце 2024 года была запущена инициатива «Построй дом для друга», которая позволяет жителям Узбекистана участвовать в строительстве и оборудовании приютов. Люди могут вносить пожертвования, которые идут на строительство вольеров, обустройство зон для выгула и покупку медицинского оборудования.",
  },
];


const Society = ( ImgSrc, onShare ) => {
  const demoItems = [
    { link: 'https://wiut.uz/', text: 'WestMinister', image: 'https://www.gazeta.uz/media/img/2018/07/BFudA815330117401691_b.jpg' },
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
        <h1 className={s.title}>Приюты - Новости</h1>
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

export default Society;
