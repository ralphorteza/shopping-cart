import React, { useContext, useEffect, useState } from "react";
import { useShop } from "../../contexts/ShopContext";
import { useAuth } from "../auth/AuthContext";
import { 
  updateDoc,
  getDoc,
  doc,
  serverTimestamp,
  setDoc,
  collectionGroup,
  onSnapshot,
  query,
  where
} from "@firebase/firestore";
import { db } from "../../firebase";
import { deleteDoc } from "firebase/firestore";

const CartContext = React.createContext();

export function useCart() {
  return useContext(CartContext);
}

// TODO: Implement server-side cart storage.
export function CartProvider({ children }) {

  const { currentUser } = useAuth();
  const { shopItems } = useShop();
  const [eCart, setECart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const currentUserId = currentUser ? currentUser.uid : "unknown";
  const currentUserEmail = currentUser ? currentUser.email : "unknown";

  // outputs user's cart-items if logged in. When logged out in same session,
  // it carries the items until refreshed. 
  useEffect(() => {
    const userCartRef = collectionGroup(db, "cart-items");
    const q = query( userCartRef, where("userId", "==", currentUserId));
    
    setLoading(true);
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const eCartItems = [];
      let quantity = 0;
      let subtotal = 0; 
      querySnapshot.forEach((doc) => {
        eCartItems.push(doc.data());
        const currItemQuantity = doc.data().amount;
        const currItemCost = doc.data().cost;
        const currItemSubtotal = currItemCost * currItemQuantity;
        quantity += currItemQuantity;
        subtotal += currItemSubtotal;
      });

      setECart(prev => eCartItems);
      setQuantity(prev => quantity);
      setSubtotal(prev => subtotal);
      setLoading(false);
    });

    console.log("useEffect eCart ran");
    return unsubscribe;
  }, [currentUserId]);

  // TODO: Modify to be added in firestore on sign in.
  // BUG: does not initiate at log in. only after log out
  useEffect(() => {
    
    const unsubscribe = async () => {
      console.log(`email: ${currentUserEmail}`);
      try {
        const cartRef = doc(db, "carts", currentUserId);
        await setDoc(cartRef, {
          owner: currentUserEmail,
          dateCreated: serverTimestamp(),
          dateLastModified: serverTimestamp(),
          totalQuantity: quantity,
          subtotal: subtotal
        });
      } catch(error) {
        console.log(error);
      }
    };

    console.log("second cart useEffect ran");

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
      const cartRef = doc(db, "carts", owner);
      const productRef = doc(db, "carts", owner, "cart-items", matchedItem.itemId);
      const docSnap = await getDoc(productRef);      

      if (docSnap.exists()) return;
      
      await updateDoc(cartRef,{dateLastModified: serverTimestamp()});
      await setDoc(productRef, newProduct, {merge: true});
    } catch(error) {
      console.log(error);
    }
  }

  async function addItemQuantity(itemId) {  
    try {
      const cartRef = doc(db,"carts", currentUserId);
      const productRef = doc(db, "carts", currentUserId, "cart-items", itemId);
      const docSnap = await getDoc(productRef);
      const updatedQuantity = Number(docSnap.data().amount) + 1;

      await updateDoc(cartRef, {dateLastModified: serverTimestamp()});
      await updateDoc(productRef, {amount: updatedQuantity});
    } catch(error) {
      console.log(error);
    }
  }

  async function subtractItemQuantity(itemId) {
    try {
      const cartRef = doc(db,"carts", currentUserId);
      const productRef = doc(db, "carts", currentUserId, "cart-items", itemId);
      const docSnap = await getDoc(productRef);
      const updatedQuantity = Number(docSnap.data().amount) - 1;

      if (updatedQuantity < 1) return;

      await updateDoc(cartRef, {dateLastModified: serverTimestamp()});
      await updateDoc(productRef, {amount: updatedQuantity});
    } catch(error) {
      console.log(error);
    }
  }

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

  const value = {
    eCart,
    quantity,
    subtotal,
    addItemQuantity,
    addProductToCart,
    deleteProductFromCart,
    subtractItemQuantity
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
