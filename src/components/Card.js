import React from "react";

export default function Card({ itemObj }) {
  console.log(itemObj)
  return (
    <div className="card">
      <img
        className="card--image"
        alt="item to sell"
        src={itemObj.imageUrl}
      />
      <p className="card--name">{itemObj.name}</p>
      <p className="card--type">{itemObj.type}</p>
      <p className="card--cost">₴{itemObj.cost}</p>
    </div>
  );
};