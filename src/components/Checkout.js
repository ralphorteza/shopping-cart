import React from "react";
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
    <>
      <button>Checkout</button>
      <section>
        {checkoutCardsArray}
      </section>
    </>
  )
}