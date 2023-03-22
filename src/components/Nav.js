import React from "react";

export default function Nav() {
  return (
    <nav className="site-nav grid">
      <h1>Logo Here</h1>
      <ul>
        <li><a href="/">home</a></li>
        <li><a href="/shop">shop</a></li>
        <li><a href="/checkout">checkout</a></li>
      </ul>
    </nav>
  );
}