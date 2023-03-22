import React from "react";
import CheckoutCard from "./CheckoutCard";

export default function Checkout({items, handleCart}) {
  // const itemsArray = [];

  // items.forEach( item => {
  //   itemsArray.push(
  //     {
  //       name: item.item.name,
  //       cost: item.item.cost,
  //       type: item.item.type,
  //       imageUrl: item.item.images.icon,
  //       id: item.itemId,
  //       description: item.item.description,
  //       rating: item.item.ratings,
  //     }
  //   );
  // });

  // const cardsArray = itemsArray.map(item => (
  //   <Card 
  //     key={item.id}
  //     itemObj={item}
  //     handleCart={handleCart}
  //   />
  // ));

  const itemsArray = [];
  const exampleCheckoutCard = {
        name: items[4].item.name,
        cost: items[4].item.cost,
        type: items[4].item.type,
        imageUrl: items[4].item.images.icon,
        id: items[4].itemId,
        description: items[4].item.description,
        rating: items[4].item.ratings,
  }
  itemsArray.push(exampleCheckoutCard)
  
  const checkoutCardsArray = itemsArray.map(item => (
    <CheckoutCard
      key={item.id}
      item={item}
      handleCart={handleCart}
    />
  ))

  return (
    <>
      <section>
        {checkoutCardsArray}
      </section>
    </>
  )
}