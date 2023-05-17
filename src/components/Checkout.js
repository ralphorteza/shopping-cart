import React from "react";
import "./Checkout.css"
import CheckoutCard from "./CheckoutCard";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

export default function Checkout({
  cart,
  subtotal,
  totalQuantity,
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

  const formattedSubtotal = subtotal.toLocaleString("en-US");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  function handleNoSignIn() {
    navigate("/login");
  }

  return (
    <div className="checkout">
      <section className="checkout--info grid">
        <h2 className="checkout--subtotal">subtotal: <span>₴{formattedSubtotal}</span></h2>
        <Link className="link--shop button" to="/shop">Continue Shopping</Link>
        <button 
          className="button"
          onClick={!currentUser && handleNoSignIn}
        >Checkout <span>({totalQuantity} items)</span>
        </button>
      </section>
      <section className="checkout--cards grid">
        {checkoutCardsArray}
      </section>
    </div>
  );
}