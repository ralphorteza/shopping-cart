import React from "react";
import "./Checkout.css"
import CheckoutCard from "./CheckoutCard";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useCart } from "../cart/CartContext";

export default function Checkout() {
  const { eCart, cartReview } = useCart();

  const checkoutCardsArray = eCart.map(item => (
    <CheckoutCard
      key={item.id}
      item={item}
    />
  ));

  // const formattedSubtotal = subtotal.toLocaleString("en-US");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  function handleNoSignIn() {
    navigate("/login");
  }

  return (
    <div className="checkout">
      <section className="checkout--info grid">
        {/* <h2 className="checkout--subtotal">subtotal: <span>₴{formattedSubtotal}</span></h2> */}
        <h2 className="checkout--subtotal">subtotal: <span>₴{cartReview.subtotal}</span></h2>
        <Link className="link--shop button" to="/shop">Continue Shopping</Link>
        <button 
          className="button"
          onClick={!currentUser ? handleNoSignIn : null}
        >
          Checkout<span> ({cartReview.quantity} items)</span>
          {/* Checkout<span> (n items)</span> */}
        </button>
      </section>
      <section className="checkout--cards grid">
        {checkoutCardsArray}
      </section>
    </div>
  );
}