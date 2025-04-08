import React, { useState } from "react";
import s from "../Society/Society.module.scss";
import FlowingMenu from '../FlowingMenu/FlowingMenu.jsx';

const newsData = [
    {
        id: 1,
        title: "Общественная проблема бездомных животных",
        content:
        "В Узбекистане бездомные животные, в основном кошки и собаки, представляют собой одну из острых социальных и экологических проблем. В крупных городах, таких как Ташкент, Самарканд и Фергана, можно увидеть множество бродячих животных. Они сталкиваются с голодом, холодом, болезнями, а иногда и с жестоким обращением. Причинами такой ситуации являются: Отказ от домашних животных. Многие владельцы оставляют своих питомцев на улице, если те становятся обузой. Быстрое размножение. Отсутствие контроля за размножением животных приводит к увеличению их численности. Недостаток приютов. В большинстве регионов нет системных центров, которые бы могли приютить, вылечить и найти хозяев для животных.",
    },
    {
        id: 2,
        title: "Приюты для животных: текущая ситуация",
        content:
          "Приюты для животных в Узбекистане находятся на стадии становления. Пока их немного, и большинство из них организовано на добровольной основе. Вот основные особенности работы приютов: Частные приюты и инициативы. Частные приюты стали основным местом, где бездомные животные получают временное убежище. Наиболее известные приюты в стране: «Хаёт» (Ташкент): один из первых приютов, созданный волонтёрами. Здесь содержатся десятки кошек и собак, которым обеспечивают уход, лечение и помощь в пристройстве. «Доброе сердце»: организация, занимающаяся спасением животных из сложных ситуаций, таких как травмы или отравления. Местные инициативы. В регионах есть небольшие частные приюты, которые работают за счёт пожертвований и усилий местных волонтёров.",
    },
    {
        id: 3,
        title: "Проблемы, с которыми сталкиваются приюты",
        content:
          "Несмотря на положительные инициативы, приюты в Узбекистане сталкиваются с рядом трудностей: Недостаток финансирования. Частные приюты в основном зависят от пожертвований, которых часто не хватает для удовлетворения всех нужд животных. Малое количество мест. Большинство приютов может принять только ограниченное число животных. Это приводит к тому, что многим животным не удаётся получить помощь. Отсутствие государственной поддержки. Хотя власти начинают уделять внимание этой проблеме, пока приюты не получают систематической финансовой или материальной помощи. Бюрократия. Оформление документов для открытия приюта или проведения благотворительных акций может быть сложным и долгим процессом.",
    },
];

const Tech = () => {
  const demoItems = [
    { link: 'https://uzb.mgimo.ru/contacts', text: 'MGIMO', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvLpGgo5KSTAxe95PLSdASTX3TWpYPWWehYw&s' },
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
        <h1 className={s.title}>Приюты - Проблемы</h1>
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

export default Tech;
