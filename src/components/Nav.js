import React from "react";
import "./Nav.css"
import Cart from "../images/shopping-cart.svg";
import { Link } from "react-router-dom";

export default function Nav({ totalQuantity }) {

  let amountItem;
  if (totalQuantity >= 1 && totalQuantity < 100) {
    amountItem = (<span className="dot">{totalQuantity}</span>);
  } else if ( totalQuantity >= 100) {
    amountItem = ( <span className="dot">99+</span>)
  } else{
    amountItem = ("");
  }

  return (
    <nav className="navbar grid">
      <Link className="logo" to="/">
        <h1>FortBuy</h1>
      </Link>
      <ul>
        {/* <li><a href="/">home</a></li> */}
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/checkout">Checkout</Link></li>
      </ul>
      <Link className="cart--link" to="/checkout">
        <img className="cart" src={Cart} alt="checkout cart"></img>{amountItem}
      </Link>
      
    </nav>
  );
}