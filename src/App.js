import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/auth/Signup";
import { AuthProvider } from "./components/auth/AuthContext";
import Login from "./components/auth/Login";
// import data from "./data";
// import Checkout from "./components/Checkout";
// import Footer from "./components/Footer";
// import HomePage from "./components/HomePage";
// import Nav from "./components/Nav";
// import Shop from "./components/Shop";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

// export default function App() {
  
//   const items = data.data;
//   const [cart, setCart] = React.useState(
//     () => JSON.parse(localStorage.getItem("cart")) || []
//   );
//   const subtotal = cart.reduce((prev, curr) => prev + (curr.amount * curr.cost), 0);
//   const totalQuantity = cart.reduce((prev, curr) => prev + curr.amount, 0);
  
//   React.useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);


//   function addItemToCart(id) {
//     const matchedItem = items.find(item => item.itemId === id);
//     let newItem = {
//       amount: 1,
//       id: matchedItem.itemId,
//       imageUrl: matchedItem.item.images.icon,
//       name: matchedItem.item.name,
//       cost: matchedItem.item.cost,
//     };

//     setCart(prevState => [...prevState, newItem]);
//   }


//   function removeItemFromCart(e, id) {
//     e.stopPropagation();
//     setCart(prevState => prevState.filter(item => item.id !== id));
//   }

//   function handleCart(e, id) {
//     if (cart.some(item => item.id === id) === true) {
//       addQuantity(id);
//     } else {
//       addItemToCart(id);
//     }
//   }

//   function addQuantity(id) {
//     const editItem = cart.find(item => item.id === id);

//     setCart(prevCart => {
//       return prevCart.map( item => {
//         if (item.id !== id) return item;
//         return {...item, amount: editItem.amount + 1}
//       });
//     });
//   }

//   function subQuantity(id) {
//     const editItem = cart.find(item => item.id === id);
    
//     setCart(prevCart => {
//       return prevCart.map( item => {
//         if (item.id !== id) return item;
//         if (item.id === id && item.amount < 2) {
//           return item;
//         } else{
//           return {...item, amount: editItem.amount - 1}
//         }
//       });
//     });
//   }

//   return (
//     <BrowserRouter>
//       <Nav totalQuantity={totalQuantity}/>
//       <Routes>
//         <Route path="/shopping-cart" element={<Navigate to="/" />} />
//         <Route path="/" element={<HomePage />} />
//         <Route path="/shop"
//           element={
//           <Shop
//             handleCart={handleCart}
//             items={items}
//           />}
//         />
//         <Route
//           path="/checkout"
//           element={
//             <Checkout
//               cart={cart}
//               subtotal={subtotal}
//               totalQuantity={totalQuantity}
//               handleCart={handleCart}
//               subQuantity={subQuantity}
//               addQuantity={addQuantity}
//               removeItemFromCart={removeItemFromCart}
//             />}
//         />
//       </Routes>
//       <Footer />
//     </BrowserRouter>
//   );
// }