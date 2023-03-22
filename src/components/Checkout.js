import React from "react";
import CheckoutCard from "./CheckoutCard";

export default function Checkout({cart, handleCart, removeItemFromCart}) {
  const checkoutCardsArray = cart.map(item => (
    <CheckoutCard
      key={item.id}
      item={item}
      handleCart={handleCart}
      removeItemFromCart={removeItemFromCart}
    />
  ));

  return (
    <>
      <section>
        {checkoutCardsArray}
      </section>
    </>
  )
}