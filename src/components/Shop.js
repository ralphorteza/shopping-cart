import React from "react";
import "./Shop.css"
import Card from "./Card";
import data from "../data";

export default function Shop() {
  const items = data.data;
  const itemsArray = [];

  items.forEach( item => {
    itemsArray.push(
      {
        name: item.item.name,
        cost: item.item.cost,
        type: item.item.type,
        imageUrl: item.item.images.icon,
        id: item.itemId,
        description: item.item.description,
        rating: item.item.ratings,
      }
    );
  });

  const cardsArray = itemsArray.map(item => (
    <Card key={item.id} itemObj={item}/>
  ));
  
  return (
    <>
      <div className="container--card">{cardsArray}</div>
    </>
  );
}