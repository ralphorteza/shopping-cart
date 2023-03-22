import React from "react";
import CheckoutCard from "./CheckoutCard";

export default function Checkout({cart, handleCart}) {
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

//   const exampleCheckoutCard = {
//         name: items[4].item.name,
//         cost: items[4].item.cost,
//         type: items[4].item.type,
//         imageUrl: items[4].item.images.icon,
//         id: items[4].itemId,
//         description: items[4].item.description,
//         rating: items[4].item.ratings,
//   }

//   const exampleCheckoutCard2 = {
//     name: items[3].item.name,
//     cost: items[3].item.cost,
//     type: items[3].item.type,
//     imageUrl: items[3].item.images.icon,
//     id: items[3].itemId,
//     description: items[3].item.description,
//     rating: items[3].item.ratings,
// }
//   itemsArray.push(exampleCheckoutCard)
//   itemsArray.push(exampleCheckoutCard2)
  
  // const checkoutCardsArray = itemsArray.map(item => (
  //   <CheckoutCard
  //     key={item.id}
  //     item={item}
  //     handleCart={handleCart}
  //   />
  // ))

  const checkoutCardsArray = cart.map(item => (
    <CheckoutCard
      key={item.id}
      item={item}
      handleCart={handleCart}
    />
  ));

  console.log(checkoutCardsArray);

  return (
    <>
      <section>
        {checkoutCardsArray}
      </section>
    </>
  )
}