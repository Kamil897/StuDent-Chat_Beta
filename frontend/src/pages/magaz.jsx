import React, { useState } from "react";
import Shop from "../components/Shop/Shop";
import { useUser } from "../Context/UserContext";
import s from "./Magaz.module.scss";
import { Link } from "react-router-dom";

const products = [
  { 
    id: 1, name: "Радужный", description: "Яркие краски, позитив и свобода!", image: "/raduga.webp", price: 1200 
  },
  { 
    id: 3, name: "Просто но богато", image: "/luxary.webp", description: "Лаконичность и элегантность.", price: 600 
  },
  { 
    id: 4, name: "ОМГ", description: "Вау-эффект гарантирован!", image: "/omg.webp", price: 2000 
  },
  { 
    id: 2, name: "Котики", description: "Мур-мур! С этой привилегией вы получаете пушистую дозу уюта.", image: "/kitty.webp", price: 15000 
  }
];

const Magaz = () => {
  const { user, spendPoints } = useUser();
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [filter, setFilter] = useState("all"); // "all", "affordable", "unaffordable"

  const handleBuy = (product) => {
    if (spendPoints(product.price)) {
      setPurchasedItems((prevItems) => [...prevItems, product]);
    } else {
      alert("Недостаточно средств!");
    }
  };

  // Filter logic
  const filteredProducts = products.filter(product => {
    if (filter === "affordable") return user.points >= product.price;
    if (filter === "unaffordable") return user.points < product.price;
    return true;
  });

  return (
    <div className={s.container}>
      <header className={s.header}>
        <h1 className={s.title}>Магазин привилегий</h1>
        <span className={s.balance}>💰 {user.points} баллов</span>
        <Link className={s.boughtLink} to={'/bought'}>Куплено</Link>
      </header>

      <div className={s.filters}>
        <button 
          className={filter === "all" ? s.active : ""} 
          onClick={() => setFilter("all")}
        >
          Все
        </button>
        <button 
          className={filter === "affordable" ? s.active : ""} 
          onClick={() => setFilter("affordable")}
        >
          Я могу купить
        </button>
        <button 
          className={filter === "unaffordable" ? s.active : ""} 
          onClick={() => setFilter("unaffordable")}
        >
          Я не могу купить
        </button>
      </div>

      <div className={s.productGrid}>
        {filteredProducts.map((product) => (
          <Shop key={product.id} prefix={product} onBuy={() => handleBuy(product)} />
        ))}
      </div>
    </div>
  );
};

export default Magaz;
  