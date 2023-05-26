import React from "react";
import './Card.css'
import Star from "../../images/star.svg";
import { useCart } from "../cart/CartContext";
import { useAuth } from "../auth/AuthContext";

export default function Card({ itemObj }) {
  const { currentUser } = useAuth();
  const { addProductToCart, initializeCart } = useCart();

  // TODO: clicking add multiple times to add quantity
  function handleAddButton(e, itemId) {
    e.stopPropagation();
    // console.log(currentUser);
    // if (currentUser !== null) initializeCart();
    initializeCart();
    addProductToCart(itemId);
  }

  return (
    <div className="card">
      <img
        className="card--image"
        alt="item to sell"
        src={itemObj.imageUrl}
      />
      <div className="card--bottom">
        <h2 className="card--name">{itemObj.name}</h2>
        <div className="card--rating">
          <img
          src={Star}
          alt="rating star"
          style={{ height: 20, width: 20}}
          />
          <span>{itemObj.rating.avgStars}</span>
          <span style={{color: "gray"}}>({itemObj.rating.numberVotes})</span>
        </div>
        <p className="card--type">{itemObj.type} <span></span></p>
        <p className="card--description">{itemObj.description}</p>
      </div>
        <h3 className="card--cost">₴{itemObj.cost}</h3>
      <button className="card--add button" onClick={(e) => handleAddButton(e, itemObj.id)}>add</button>
    </div>
  );
};

