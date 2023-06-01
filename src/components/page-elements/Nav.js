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

  let amountItem;
  if (cartReview.quantity >= 1 && cartReview.quantity < 100) {
    amountItem = (<span className="dot">{cartReview.quantity}</span>);
  } else if ( cartReview.quantity >= 100) {
    amountItem = (<span className="dot">99+</span>)
  } else{
    amountItem = ("");
  }

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

  return (
    <nav className="navbar grid">
      <Link className="logo" to="/">
        <h1>FortBuy</h1>
      </Link>
      {error && <h1>{error}</h1>}
      {location.pathname !== '/signup' && location.pathname !== '/login' && !currentUser && <button onClick={handleLogin}>Login</button>}
      {currentUser && location.pathname !== '/update-profile' && <Link to="/update-profile">{currentUser.email}</Link>} 
      {currentUser && <button onClick={handleLogout}>logout</button>}
      <Link className="cart--link" to="/checkout">
        <img className="cart" src={Cart} alt="checkout cart"></img>{amountItem}
      </Link>
      
    </nav>
  );
}