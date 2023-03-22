import React from "react";
import "./CheckoutCard.css"

export default function CheckoutCard({
  item,
  removeItemFromCart,
  subQuantity,
  addQuantity
}) {
  return (
    <div className="checkout-card" >
      <img
        className="checkout-card--image"
        alt="item to sell"
        src={item.imageUrl} 
      />
      <p className="checkout-card--name">{item.name}</p>
      <button onClick={() => addQuantity(item.id)}>+</button>
      <h3>{item.amount}</h3>
      <button onClick={() => subQuantity(item.id)}>-</button>
      <button onClick={(e) => removeItemFromCart(e, item.id)}>remove item</button>
    </div>
  );
}