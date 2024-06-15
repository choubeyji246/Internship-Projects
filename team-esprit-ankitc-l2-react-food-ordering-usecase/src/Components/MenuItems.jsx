import React, { useContext } from "react";

import { CartContext } from "../store/CartContext";
import Button from "./AtomComponents/Button";

const MenuItems = ({ item }) => {
  const cartCtx = useContext(CartContext);

  const handleAddItem = () => {
    cartCtx.addItem(item);
  };

  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${item.image}`} alt={item.name} />
        <div>
          <h3>{item.name}</h3>
          <p className="meal-item-price">${item.price}</p>
          <p className="meal-item-description">{item.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddItem}>Add To Cart</Button>
        </p>
      </article>
    </li>
  );
};

export default MenuItems;
