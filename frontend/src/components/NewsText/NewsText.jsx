import React, { useState } from 'react';
import s from './NewsText.module.scss';

const NewsText = ({
   p, 
   ImgSrc,
   onShare 


   
}) => {
  
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
   <div className={s.news}>
      <div className={s.newstext}>
         <p>{p}</p> <br /><br />
         

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

     <div className={s.newslogo}>
      <img src={ImgSrc} alt="" />
     </div>


   </div>

   </>
  )
}

export default NewsText
