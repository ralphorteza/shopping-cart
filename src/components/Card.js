import React from "react";
import './Card.css'
import Star from "../images/star.svg";

export default function Card({ itemObj }) {
  return (
    <div className="card">
      <img
        className="card--image"
        alt="item to sell"
        src={itemObj.imageUrl}
      />
      <div className="card--bottom">
        <p className="card--name">{itemObj.name}</p>
        <div className="card--rating">
          <img
          src={Star}
          alt="rating star"
          style={{ height: 20, width: 20}}
          />
          <span>{itemObj.rating.avgStars}</span>
          <span style={{color: "gray"}}>({itemObj.rating.numberVotes})</span>
          {/* <span className="card--type">{itemObj.type}</span> */}
        </div>
        <p className="card--type">{itemObj.type} <span></span></p>
        <p className="card--description">{itemObj.description}</p>
      </div>
      <p className="card--cost">₴{itemObj.cost}</p>
      {/* <div className="card--add">add</div> */}
      <button className="button">add</button>
    </div>
  );
};

