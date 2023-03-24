import React from "react";
import "./Checkout.css"
import CheckoutCard from "./CheckoutCard";

export default function Checkout({
  cart,
  removeItemFromCart,
  subQuantity,
  addQuantity,
}) {
  const checkoutCardsArray = cart.map(item => (
    <CheckoutCard
      key={item.id}
      item={item}
      subQuantity={subQuantity}
      addQuantity={addQuantity}
      removeItemFromCart={removeItemFromCart}
    />
  ));

  return (
    <div className="checkout">
      <section className="checkout--info grid">
        <h3 className="checkout--subtotal">SubTotal: ₴34,444</h3>
        <button className="button">Checkout</button>
      </section>
      <section className="checkout--cards grid">
        {checkoutCardsArray}
      </section>
    </div>
  );
}