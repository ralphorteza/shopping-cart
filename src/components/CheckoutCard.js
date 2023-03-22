import React from "react";
import "./CheckoutCard.css"

export default function CheckoutCard({item, handleCart}) {
  // const [amount, setAmount] = React.useState(0);

  // function addAmount() {
  //   setAmount(prevAmount => prevAmount + 1);
  // }

  // function subAmount() {
  //   setAmount(prevAmount => prevAmount - 1);
  // }
  // return (
  //   <div className="checkout-card" >
  //     <img
  //       className="checkout-card--image"
  //       alt="item to sell"
  //       src={item.imageUrl} 
  //     />
  //     <p className="checkout-card--name">{item.name}</p>
  //     <button onClick={addAmount}>+</button>
  //     <h1>{amount}</h1>
  //     <button onClick={subAmount}>-</button>
  //     <button>remove item</button>
  //   </div>
  // )
    return (
    <div className="checkout-card" >
      <img
        className="checkout-card--image"
        alt="item to sell"
        src={item.imageUrl} 
      />
      <p className="checkout-card--name">{item.name}</p>
      <button>remove item</button>
    </div>
  )
}