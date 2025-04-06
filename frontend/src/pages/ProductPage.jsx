import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import s from "./ProductPage.module.scss";

const products = [
  { id: 1, name: "Радужный", image: "/raduga.webp", description: "Яркие краски, позитив и свобода!", price: 1200 },
  { id: 2, name: "Котики", image: "/kitty.webp", description: "Мур-мур! Пушистая доза уюта.", price: 15000 },
  { id: 3, name: "Просто но богато", image: "/luxary.webp", description: "Лаконичность и элегантность.", price: 600 },
  { id: 4, name: "ОМГ", image: "/omg.webp", description: "Вау-эффект гарантирован!", price: 2000 }
];

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, spendPoints } = useUser();
  const product = products.find((p) => p.id === Number(id));
  const [isBought, setIsBought] = useState(user.purchasedItems.some((item) => item.id === product?.id));

  if (!product) return <div className={s.notFound}>Товар не найден</div>;

  const handleBuy = () => {
    if (spendPoints(product.price, product)) {
      setIsBought(true);
      alert("Покупка успешна!");
      navigate("/bought"); 
    } else {
      alert("Недостаточно баллов!");
    }
  };

  return (
    <div className={s.container}>
      <div className={s.productCard}>
        <div className={s.imageSection}>
          <img src={product.image} alt={product.name} className={s.image} />
        </div>

        <div className={s.detailsSection}>
          <h1 className={s.title}>{product.name}</h1>
          <p className={s.description}>{product.description}</p>
          <span className={s.price}>💰 {product.price} баллов</span>

          <div className={s.actions}>
            {isBought ? (
              <button className={s.disabledButton} disabled>Куплено</button>
            ) : user.points >= product.price ? (
              <button className={s.buyButton} onClick={handleBuy}>Купить</button>
            ) : (
              <button className={s.disabledButton} disabled>Недостаточно баллов</button>
            )}
            <Link to="/Shop" className={s.backButton}>Назад</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
