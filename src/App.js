import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/auth/Signup";
import { AuthProvider } from "./components/auth/AuthContext";
import { ShopProvider } from "./contexts/ShopContext";
import { CartProvider } from "./components/cart/CartContext";
import { useAuth } from "./components/auth/AuthContext";
import Login from "./components/auth/Login";
import Checkout from "./components/page-elements/Checkout";
import Footer from "./components/page-elements/Footer";
import HomePage from "./components/page-elements/HomePage";
import Nav from "./components/page-elements/Nav";
import Shop from "./components/page-elements/Shop";
import UpdateProfile from "./components/auth/UpdateProfile";
import ForgotPassword from "./components/auth/ForgotPassword";

export default function App() {
  function RequiredAuth({ children, redirectTo }) {
    const { currentUser } = useAuth();
    return currentUser ? children : <Navigate to={redirectTo} />;
  }

  function NoAuth({ children, redirectTo }) {
    const { currentUser } = useAuth();
    return !currentUser ? children : <Navigate to={redirectTo} />;
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <ShopProvider>
          <CartProvider>
          <Nav />
          <Routes>
            <Route path="/shopping-cart" element={<Navigate to="/" />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={
              <NoAuth redirectTo={"/shopping-cart"}>
                <Signup />
              </NoAuth>
              }
            />
            <Route path="/login" element={
                <NoAuth redirectTo={"/shopping-cart"}>
                  <Login />
                </NoAuth>
              }
            />
            <Route path="/update-profile" element={
                <RequiredAuth redirectTo={"/login"}>
                  <UpdateProfile />
                </RequiredAuth>
              }
            />
            <Route path="/forgot-password" element={
                <NoAuth redirectTo={"/update-profile"}>
                  <ForgotPassword />
                </NoAuth>
              }
            />
            <Route path="/shop" element={<Shop />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <Footer />
          </CartProvider>
        </ShopProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}