import React from "react";
import "./Nav.css"
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="navbar grid">
      <h1>FortBuy</h1>
      <ul>
        {/* <li><a href="/">home</a></li> */}
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/checkout">Checkout</Link></li>
      </ul>
    </nav>
  );
}