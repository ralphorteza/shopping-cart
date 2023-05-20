import React, { useContext, useEffect, useState } from "react";
import { useShop } from "../../contexts/ShopContext";
import { useAuth } from "../auth/AuthContext";
import { QuerySnapshot, collection, collectionGroup, onSnapshot, query, where } from "@firebase/firestore";
import { db } from "../../firebase";

const CartContext = React.createContext();

export function useCart() {
  return useContext(CartContext);
}

// TODO: Implement server-side cart storage.
export function CartProvider({ children }) {

  const { currentUser } = useAuth();
  const { shopItems } = useShop();
  const [cart, setCart] = useState(
    () => JSON.parse(localStorage.getItem("cart")) || []
    );
    
    const subtotal = cart.reduce((prev, curr) => prev + (curr.amount * curr.cost), 0);
    const totalQuantity = cart.reduce((prev, curr) => prev + curr.amount, 0);
    
    useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log("cart json stringify ran");
    }, [cart]);
    
    function addItemToCart(itemId) {
      const matchedItem = shopItems.find(item => item.itemId === itemId);
      let newItem = {
        amount: 1,
        id: matchedItem.itemId,
        imageUrl: matchedItem.item.images.icon,
        name: matchedItem.item.name,
        cost: matchedItem.item.cost
      };
      
      setCart(prevCart => [...prevCart, newItem]);
    }
  
  function addItemQuantity(itemId) {
    const editItem = cart.find(item => item.id === itemId);
    
    setCart(prevCart => {
      return prevCart.map( item => {
        if (item.id !== itemId) return item;
        return {...item, amount: editItem.amount + 1}
      });
    });
  }
  
  function removeItemFromCart(itemId) {
    setCart(prevState => prevState.filter(item => item.id !== itemId));
  }
  
  function subtractItemQuantity(itemId) {
    const editItem = cart.find(item => item.id === itemId);
    
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id !== itemId) return item;
        if (item.id === itemId && item.amount < 2) {
          return item;
        } else{
          return {...item, amount: editItem.amount - 1}
        }
      });
    });
  }
  
  const value = {
    cart,
    subtotal,
    totalQuantity,
    addItemToCart,
    addItemQuantity,
    removeItemFromCart,
    subtractItemQuantity
  };
  
  // server-side implmentations
  const [eCart, setECart] = useState([]);
  const [loading, setLoading] = useState(false);
  const userCartRef = collectionGroup(db, "cart-items");
  const currentUserId = currentUser ? currentUser.uid : null;
  // console.log(carts);
  

  useEffect(() => {
    const q = query( userCartRef, where("userId", "==", currentUserId));
    
    setLoading(true);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const eCartItems = [];
      querySnapshot.forEach((doc) => {
        eCartItems.push(doc.data());
      });
      setECart(eCartItems);
      setLoading(false);
    });
    console.log("useEffect eCart ran");
    return unsubscribe;
  }, []);
  
  console.log(eCart);
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
