import React, { useContext, useEffect, useState } from "react";
import { useShop } from "../../contexts/ShopContext";
import { useAuth } from "../auth/AuthContext";
import { 
  updateDoc,
  getDoc,
  getDocs,
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

export function CartProvider({ children }) {

  const { currentUser } = useAuth();
  const { shopItems } = useShop();
  const [eCart, setECart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartReview, setCartReview] = useState({
    quantity: 0,
    subtotal: 0
  })
  const currentUserId = currentUser ? currentUser.uid : "unknown";
  const currentUserEmail = currentUser ? currentUser.email : "unknown";

  useEffect(() => {
    const userCartRef = collectionGroup(db, "cart-items");
    const q = query(userCartRef, where("userId", "==", currentUserId));
    
    setLoading(true);
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const eCartItems = [];
      let _quantity = 0;
      let _subtotal = 0;
      
      querySnapshot.forEach((doc) => {
        eCartItems.push(doc.data());
        const currItemQuantity = doc.data().amount;
        const currItemCost = doc.data().cost;
        const currItemSubtotal = currItemCost * currItemQuantity;
        _quantity += currItemQuantity;
        _subtotal += currItemSubtotal;
      });
      
      setECart(prev => eCartItems);
      setLoading(prev => !prev);
      setCartReview(prev => ({
        ...prev,
        quantity: _quantity,
        subtotal: _subtotal
      }))
      console.log(`1st inner eCart useEffect ran; quantity: ${cartReview.quantity}   subtotal: ${cartReview.subtotal}`);
    });
    
    
    return () => {
      unsubscribe();
    }
  }, []);


  async function initializeCart() {    
    try {
      const cartRef = doc(db, "carts", currentUserId);
      const cartSnap = await getDoc(cartRef);
      console.log("initializeCart ran");

      if (cartSnap.exists()) {
        console.log("cart already exists!");
        return;
      }

      const dummyDocRef = doc(db, "carts", currentUserId, "cart-items", "dummyItem");
      await setDoc(dummyDocRef, {"dummyField": "n/a"});


      await setDoc(
        cartRef, 
        {
          owner: currentUserEmail,
          dateCreated: serverTimestamp(),
          dateLastModified: serverTimestamp(),
          totalQuantity: 0,
          subtotal: 0
        }
      );

    } catch(error) {
      console.log(error);
    }
  }

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
      const productRef = doc(db, "carts", owner, "cart-items", matchedItem.itemId);
      const productSnap = await getDoc(productRef);   

      if (productSnap.exists()) {
        console.log("product already exist in cart!");
        return;
      }

      await setDoc(productRef, newProduct, {merge: true});
    } catch(error) {
      console.log(error);
    }
  }

  async function addItemQuantity(itemId) {  
    try {
      const productRef = doc(db, "carts", currentUserId, "cart-items", itemId);
      const docSnap = await getDoc(productRef);
      const updatedQuantity = Number(docSnap.data().amount) + 1;
      
      await updateDoc(productRef, {amount: updatedQuantity});
    } catch(error) {
      console.log(error);
    }
  }

  async function subtractItemQuantity(itemId) {
    try {
      const productRef = doc(db, "carts", currentUserId, "cart-items", itemId);
      const docSnap = await getDoc(productRef);
      const updatedQuantity = Number(docSnap.data().amount) - 1;

      if (updatedQuantity < 1) return;

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
      const productSnap = await getDoc(productRef);
      const productQuantity = productSnap.data().amount;
      const productCost = productSnap.data().cost;
      const productSubtotal = productQuantity * productCost;

      await deleteDoc(productRef);
    } catch(error) {
      console.log(error);
    } 
  }

  const value = {
    eCart,
    cartReview,
    addItemQuantity,
    addProductToCart,
    deleteProductFromCart,
    initializeCart,
    subtractItemQuantity
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
