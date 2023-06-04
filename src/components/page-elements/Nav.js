import React, { useState } from "react";
import "./Nav.css"
import Cart from "../../images/shopping-cart.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useCart } from "../cart/CartContext";

export default function Nav() {
  const { currentUser, logout } = useAuth();
  const { cartReview } = useCart();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogout() {
    setError('');

    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  function handleLogin() {
    navigate('/login');
  }

  const loginButton = (
    location.pathname !== '/signup' &&
    location.pathname !== '/login' &&
    !currentUser && 
    <button
      className="login button"
      onClick={handleLogin}
    >
      Login
    </button>
  );

  const logoutButton = (
    <button
      className="logout button"
      onClick={handleLogout}
    >
      logout
    </button>
  );

  const profileLink = (
    currentUser &&
    location.pathname !== '/update-profile' && 
    <Link
      className="account--link"
      to="/update-profile"
    >
      {currentUser.email}
    </Link>
  );

  let amountItem;
  if (cartReview.quantity >= 1 && cartReview.quantity < 100) {
    amountItem = (<span className="dot">{cartReview.quantity}</span>);
  } else if ( cartReview.quantity >= 100) {
    amountItem = (<span className="dot">99+</span>)
  } else{
    amountItem = ("");
  }

  return (
    <nav className="navbar grid">
      <Link className="logo" to="/">
        <h1>FortBuy</h1>
      </Link>
      {error && <h1>{error}</h1>}
      {profileLink}
      {loginButton}
      {currentUser && logoutButton}
      <Link className="cart--link" to="/checkout">
        <img className="cart" src={Cart} alt="checkout cart"></img>{amountItem}
        {/* <img className="cart" src={Cart} alt="checkout cart"></img> */}
      </Link>
      
    </nav>
  );
}