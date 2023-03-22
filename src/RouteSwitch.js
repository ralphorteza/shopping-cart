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
  const [cart, setCart] = React.useState(
    () => JSON.parse(localStorage.getItem("cart")) || []
  );

  React.useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));

  }, [cart]);

  function addItemToCart(id) {
    const matchedItem = items.find(item => item.itemId === id);
    let newItem = {
      amount: 1,
      id: matchedItem.itemId,
      imageUrl: matchedItem.item.images.icon,
      name: matchedItem.item.name,
    };

    setCart(prevState => [...prevState, newItem]);
  }

  function removeItemFromCart(e, id) {
    e.stopPropagation();
    setCart(prevState => prevState.filter(item => item.id !== id));
  }

  function handleCart(e, id) {
    if (cart.some(item => item.id === id) === true) {
      addQuantity(id);
    } else {
      addItemToCart(id);
    }
  }

  function addQuantity(id) {
    const editItem = cart.find(item => item.id === id);

    setCart(prevCart => {
      return prevCart.map( item => {
        if (item.id !== id) return item;
        return {...item, amount: editItem.amount + 1}
      });
    });
  }

  function subQuantity(id) {
    const editItem = cart.find(item => item.id === id);
    
    setCart(prevCart => {
      return prevCart.map( item => {
        if (item.id !== id) return item;
        return {...item, amount: editItem.amount - 1}
      });
    });
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
            subQuantity={subQuantity}
            addQuantity={addQuantity}
            removeItemFromCart={removeItemFromCart}
          />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}