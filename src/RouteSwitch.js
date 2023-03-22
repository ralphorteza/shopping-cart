import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import data from "./data";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import Nav from "./components/Nav";
import Shop from "./components/Shop"

export default function RouteSwitch() {
  
  const items = data.data;
  const [cart, setCart] = React.useState([]);

  function addItemToCart(id) {
    const matchedItem = items.find(item => item.itemId === id);
    // console.log(matchedItem); 

    let newItem = {
      amount: 1,
      id: matchedItem.itemId,
      imageUrl: matchedItem.item.images.icon,
      name: matchedItem.item.name,
    }

    setCart(prevState => [...prevState, newItem]);
  }

  // function editCart(id) {
  //   setCart(prevCart => {
  //     return prevCart.map( item => {
  //       if (item.id !== id) return item;
  //       return {...item, [amount]: }
  //     })
  //   })
  // }

  function handleCart(e, id) {
    if (cart.some(item => item.id === id) === true) {
      console.log("Item is already inside the cart!");
    } else {
      addItemToCart(id);
    }
  }

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop"
          element={
          <Shop
            handleCart={handleCart}
            items={items}
          />}
        />
        <Route
          path="/checkout"
          element={
          <Checkout
            cart={cart}
            handleCart={handleCart}
          />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}