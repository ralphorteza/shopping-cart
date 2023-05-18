import React from "react";
import "./CheckoutCard.css"

export default function CheckoutCard({
  item,
  removeItemFromCart,
  subQuantity,
  addQuantity
}) {
  return (
    <div className="checkout-card grid">
      <img
        className="checkout-card--image"
        alt="item to sell"
        src={item.imageUrl} 
      />
      <div className="checkout-card--quantity">
        <button onClick={() => subQuantity(item.id)}>-</button>
        <h3>{item.amount}</h3>
        <button onClick={() => addQuantity(item.id)}>+</button>
      </div>
      <div className="checkout-card--content">
        <p className="checkout-card--name">{item.name}</p>
        <p>₴{item.cost}</p>
      </div>
      <button className="checkout-card--delete" onClick={(e) => removeItemFromCart(e, item.id)}>remove item</button>
    </div>
  );
}