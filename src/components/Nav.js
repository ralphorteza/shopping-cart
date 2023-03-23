import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="site-nav grid">
      <h1>Logo Here</h1>
      <ul>
        {/* <li><a href="/">home</a></li> */}
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/checkout">Checkout</Link></li>
      </ul>
    </nav>
  );
}