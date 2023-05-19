import React from "react";
import "./CheckoutCard.css"
import { useCart } from "../cart/CartContext";

export default function CheckoutCard({ item }) {

  const { addItemQuantity, subtractItemQuantity, removeItemFromCart} = useCart();
  function handleSubQuantityButton(e, itemId) {
    e.stopPropagation();
    return subtractItemQuantity(itemId);
  }

  function handleAddQuantityButton(e, itemId) {
    e.stopPropagation();
    return addItemQuantity(itemId);
  }

  function handleRemoveItemButton(e, itemId) {
    e.stopPropagation();
    return removeItemFromCart(itemId);
  }

  return (
    <div className="checkout-card grid">
      <img
        className="checkout-card--image"
        alt="item to sell"
        src={item.imageUrl} 
      />
      <div className="checkout-card--quantity">
        <button onClick={(e) => handleSubQuantityButton(e, item.id)}>-</button>
        <h3>{item.amount}</h3>
        <button onClick={(e) => handleAddQuantityButton(e, item.id)}>+</button>
      </div>
      <div className="checkout-card--content">
        <p className="checkout-card--name">{item.name}</p>
        <p>₴{item.cost}</p>
      </div>
      <button className="checkout-card--delete" onClick={(e) => handleRemoveItemButton(e, item.id)}>remove item</button>
    </div>
  );
}