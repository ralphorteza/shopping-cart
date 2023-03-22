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

  function handleCart(e, id) {
    console.log(id);
  }

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<Shop
          handleCart={handleCart}
          items={items}
          /> }
        />
        <Route
          path="/checkout"
          element={
          <Checkout
            items={items}
            handleCart={handleCart}
          />
        }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}