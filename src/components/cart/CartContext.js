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
  // const [totalQuantity, setTotalQuantity] = useState(0);
  // const [subtotal, setSubTotal] = useState(0);
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
      querySnapshot.forEach((doc) => {
        eCartItems.push(doc.data());
      });
      setECart(eCartItems);
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
          totalQuantity: 0,
          subtotal: 0
        });
      } catch(error) {
        console.log(error);
      }
    };

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
      const docSnap = await getDoc(cartRef);

      const updatedQuantity = docSnap.data().totalQuantity + newProduct.amount;
      const productRef = doc(db, "carts", owner, "cart-items", matchedItem.itemId);
      await updateDoc(
        cartRef,
        {
          dateLastModified: serverTimestamp(),
          totalQuantity: updatedQuantity
        }
        );
      await setDoc(productRef, newProduct, { merge: true });
    } catch(error) {
      console.log(error);
    }
  }

  // TODO: Add quantity of item
  async function addItemQuantity(itemId) {  
    try {
      const cartRef = doc(db,"carts", currentUserId);
      const productRef = doc(db, "carts", currentUserId, "cart-items", itemId);
      const docSnap = await getDoc(productRef);
      const updatedQuantity = Number(docSnap.data().amount) + 1;

      await updateDoc(cartRef, {lastModified: serverTimestamp()});
      await updateDoc(productRef, {amount: updatedQuantity});
    } catch(error) {
      console.log(error);
    }
  }

  // TODO: Subtract quantity item
  async function subtractItemQuantity(itemId) {
    try {
      const cartRef = doc(db,"carts", currentUserId);
      const productRef = doc(db, "carts", currentUserId, "cart-items", itemId);
      const docSnap = await getDoc(productRef);
      const updatedQuantity = Number(docSnap.data().amount) - 1;

      if (updatedQuantity < 1) return;

      await updateDoc(cartRef, {lastModified: serverTimestamp()});
      await updateDoc(productRef, {amount: updatedQuantity});
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

  const value = {
    eCart,
    addItemQuantity,
    subtractItemQuantity,
    addProductToCart,
    deleteProductFromCart
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
