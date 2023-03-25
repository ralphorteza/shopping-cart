import React from "react";
import './Card.css'
import Star from "../images/star.svg";

export default function Card({ itemObj, handleCart }) {
  return (
    <div className="card">
      <img
        className="card--image"
        alt="item to sell"
        src={itemObj.imageUrl}
      />
      <div className="card--bottom">
        {/* <p className="card--name">{itemObj.name}</p> */}
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
        {/* <p className="card--cost">₴{itemObj.cost}</p> */}
        <h3 className="card--cost">₴{itemObj.cost}</h3>
        <button className="card--add button" onClick={(e) => handleCart(e, itemObj.id)}>add</button>
      </div>
    </div>
  );
};

