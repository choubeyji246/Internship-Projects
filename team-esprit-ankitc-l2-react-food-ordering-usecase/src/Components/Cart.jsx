import React, { useContext } from "react";

import { CartContext } from "../store/CartContext";
import Button from "./AtomComponents/Button";
import Modal from "./Modal";

const Cart = ({ openCart, closeCart, totalPrice, handleCheckoutOpen }) => {
  const cartCtx = useContext(CartContext);

  return (
    <>
      {openCart && (
        <Modal onClose={closeCart}>
          <h1>Your Cart</h1>
          {cartCtx.items.map((item) => (
            <div className="cart-content" key={item.id}>
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <p className="total">Quantity: {item.quantity}</p>
              <p className="cart-item-actions">
                <Button onClick={() => cartCtx.addItem(item)}>+</Button>
                <span>{item.quantity}</span>
                <Button onClick={() => cartCtx.removeItem(item.id)}>-</Button>
              </p>
            </div>
          ))}

          <h2>Total Price: ${totalPrice.toFixed(2)}</h2>

          <Button onClick={handleCheckoutOpen}>Checkout</Button>
        </Modal>
      )}
    </>
  );
};

export default Cart;
