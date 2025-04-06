import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useUser } from "../Context/UserContext";
import s from "./BoughtPage.module.scss";
import { FaShoppingBag } from "react-icons/fa";

const Bought = () => {
  const { user, removePurchasedItem, addProductToShop } = useUser();
  const [sellingItem, setSellingItem] = useState(null);
  const [sellPrice, setSellPrice] = useState("");
  const navigate = useNavigate();

  const handleSell = (item) => {
    setSellingItem(item);
  };

  const confirmSell = () => {
    if (sellPrice && sellingItem) {
      addProductToShop({ ...sellingItem, price: Number(sellPrice) }); // Преобразуем цену в число
      removePurchasedItem(sellingItem.id); // Удаляем товар из списка купленных
      setSellingItem(null);
      setSellPrice("");
    }
  };
  

  return (
    <div className={s.container}>
      <header className={s.header}>
        <h1 className={s.title}><FaShoppingBag /> Мои покупки</h1>
        <span className={s.balance}>💰 {user.points} баллов</span>
        <button className={s.backButton} onClick={() => navigate('/Shop')}>
          <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
          <span>Назад</span>
        </button>
      </header>

      <div className={s.productGrid}>
        {user?.purchasedItems?.length > 0 ? (
          user.purchasedItems.map((item) => (
            <div key={item.id} className={s.purchasedItem}>
              <img src={item.image} alt={item.name} className={s.itemImage} />
              <h3 className={s.h}>{item.name}</h3>
              <p className={s.h}>{item.description}</p>
              <span className={s.price}>💰 {item.price} €</span>
              <div className={s.actions}>
                <button
                  className={s.removeButton}
                  onClick={() => removePurchasedItem(item.id)}
                >
                  ❌ Удалить
                </button>
                
              </div>
            </div>
          ))
        ) : (
          <p style={{color: "black", fontSize: "40px"}}>Вы еще ничего не купили.</p>
        )}
      </div>


    </div>
  );
};

export default Bought;