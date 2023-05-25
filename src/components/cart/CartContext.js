import React, { useContext, useEffect, useState } from "react";
import { useShop } from "../../contexts/ShopContext";
import { useAuth } from "../auth/AuthContext";
import { getDoc, doc, serverTimestamp, setDoc, collection, collectionGroup, onSnapshot, query, where } from "@firebase/firestore";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { deleteDoc } from "firebase/firestore";

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
        cost: matchedItem.item.cost,
        createdAt: serverTimestamp(),
        lastUpdate: serverTimestamp(),
      };
      
      setCart(prevCart => [...prevCart, newItem]);
    }
  
  // function addItemQuantity(itemId) {
  //   const editItem = cart.find(item => item.id === itemId);
    
  //   setCart(prevCart => {
  //     return prevCart.map( item => {
  //       if (item.id !== itemId) return item;
  //       return {...item, amount: editItem.amount + 1}
  //     });
  //   });
  // }
  
  function removeItemFromCart(itemId) {
    setCart(prevState => prevState.filter(item => item.id !== itemId));
  }
  
  // function subtractItemQuantity(itemId) {
  //   const editItem = cart.find(item => item.id === itemId);
    
  //   setCart(prevCart => {
  //     return prevCart.map(item => {
  //       if (item.id !== itemId) return item;
  //       if (item.id === itemId && item.amount < 2) {
  //         return item;
  //       } else{
  //         return {...item, amount: editItem.amount - 1}
  //       }
  //     });
  //   });
  // }
  
  // server-side implmentations
  const [eCart, setECart] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentUserId = currentUser ? currentUser.uid : null;
  // console.log(carts);
  
  // outputs user's cart-items if logged in. When logged out in same session,
  // it carries the items until refreshed. 
  useEffect(() => {
    const userCartRef = collectionGroup(db, "cart-items");
    const q = query( userCartRef, where("userId", "==", currentUserId));
    
    setLoading(true);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const eCartItems = [];
      querySnapshot.forEach((doc) => {
        eCartItems.push(doc.data());
      });
      setECart(eCartItems);
      console.log(`ecartItems: ${eCartItems}`);
      setLoading(false);
    });
    console.log("useEffect eCart ran");
    return unsubscribe;
  }, [currentUserId]);

  // TODO: Add to user's cart inside database.
  async function addProductToCart(itemId) {
    const owner = currentUser ? currentUser.uid : "unknown";
    const ownerEmail = currentUser ? currentUser.email : "unknown";
    const matchedItem = shopItems.find(item => item.itemId === itemId);

    const newProduct = {
      userId: owner,
      email: ownerEmail,
      amount: 1,
      id: matchedItem.itemId,
      imageUrl: matchedItem.item.images.icon,
      name: matchedItem.item.name,
      cost: matchedItem.item.cost
    };

    try {
      // const productRef = doc(collection(db, "carts", owner, "cart-items"));
      const productRef = doc(db, "carts", owner, "cart-items", matchedItem.itemId);
      await setDoc(productRef, newProduct, { merge: true });
    } catch(error) {
      console.log(error);
    }
  }

  // TODO: Add quantity of item
  async function addItemQuantity(itemId) {  
    try {
      const productRef = doc(db, "carts", currentUserId, "cart-items", itemId);
      const docSnap = await getDoc(productRef);
      const updatedQuantity = Number(docSnap.data().amount) + 1;

      const updatedProduct = {
        userId: docSnap.data().userId,
        email: docSnap.data().email,
        amount: updatedQuantity,
        id: docSnap.data().id,
        imageUrl: docSnap.data().imageUrl,
        name: docSnap.data().name,
        cost: docSnap.data().cost
      };

      await setDoc(productRef, updatedProduct, { merge: true });
    } catch(error) {
      console.log(error);
    }
  }

  // TODO: Subtract quantity item
  async function subtractItemQuantity(itemId) {
    try {
      const productRef = doc(db, "carts", currentUserId, "cart-items", itemId);
      const docSnap = await getDoc(productRef);
      const updatedQuantity = Number(docSnap.data().amount) - 1;

      if (updatedQuantity < 1) return;

      const updatedProduct = {
        userId: docSnap.data().userId,
        email: docSnap.data().email,
        amount: updatedQuantity,
        id: docSnap.data().id,
        imageUrl: docSnap.data().imageUrl,
        name: docSnap.data().name,
        cost: docSnap.data().cost
      };

      await setDoc(productRef, updatedProduct, { merge: true });
    } catch(error) {
      console.log(error);
    }
  }

  // TODO: Remove item from user's cart inside database.
  async function deleteProductFromCart(itemId) {
    const owner = currentUser ? currentUserId : "unknown";
    const matchedItem = shopItems.find(item => item.itemId === itemId);

    try {
      const productRef = doc(db, "carts", owner, "cart-items", matchedItem.itemId);
      await deleteDoc(productRef);
    } catch(error) {
      console.log(error);
    }
  }

  // TODO: Get subtotal and total items
  
  console.log(eCart);

  const value = {
    cart,
    subtotal,
    totalQuantity,
    addItemToCart,
    addItemQuantity,
    removeItemFromCart,
    subtractItemQuantity,
    addProductToCart,
    eCart,
    deleteProductFromCart
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
