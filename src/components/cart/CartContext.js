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
  const [quantity, setQuantity] = useState(-1);
  const [subtotal, setSubtotal] = useState(0);
  const currentUserId = currentUser ? currentUser.uid : "unknown";
  const currentUserEmail = currentUser ? currentUser.email : "unknown";


  // Runs only once after current user changes.
  useEffect(() => {
    const userCartRef = collectionGroup(db, "cart-items");
    const q = query( userCartRef, where("userId", "==", currentUserId));
    
    setLoading(true);
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("1st inner eCart useEffect ran");
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
      setQuantity(_quantity);
      // console.log(_quantity);
      setSubtotal(_subtotal);
      console.log(`1st inner eCart useEffect ran. subtotal: ${subtotal}  quantity: ${quantity}`);

    });
    
    console.log(`1st eCart useEffect ran. subtotal: ${subtotal}  quantity: ${quantity}`);
    // return unsubscribe; 
    return () => {
      console.log("unsubscribed");
      unsubscribe();
    }
  }, [currentUserId]);

  // useEffect(() => {
  //   const unsubscribe = async () => {
  //     // const owner = currentUser ? currentUser.uid : "unknown";
  //     const cartRef = doc(db, "carts", currentUserId);
  //     await updateDoc(
  //       cartRef,
  //       {
  //         dateLastModified: serverTimestamp(),
  //         subtotal: subtotal,
  //         totalQuantity: quantity,
  //       }
  //     );
  //   }
  //   console.log("2nd useEffect ran");
  //   return unsubscribe;

  // }, [subtotal, quantity]);


  async function initializeCart() {    
    try {
      const cartRef = doc(db, "carts", currentUserId);
      const cartSnap = await getDoc(cartRef);
      console.log("initializeCart ran");
      // if (cartSnap.exists()) return;
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
      const cartRef = doc(db, "carts", owner);
      const productRef = doc(db, "carts", owner, "cart-items", matchedItem.itemId);
      const productSnap = await getDoc(productRef);   

      // if (productSnap.exists()) return;
      if (productSnap.exists()) {
        console.log("product already exist in cart!");
        return;
      }
      console.log("addProductToCart function ran");

      setQuantity(prev => prev + 1);
      setSubtotal(prev => prev + newProduct.cost);
      await updateDoc(
        cartRef,
        {
          dateLastModified: serverTimestamp(),
          subtotal: subtotal,
          totalQuantity: quantity
        }
      );
      console.log("cart fields updated");
      await setDoc(productRef, newProduct, {merge: true});
      console.log("new product added");
    } catch(error) {
      console.log(error);
    }
  }

  async function addItemQuantity(itemId) {  
    try {
      const cartRef = doc(db, "carts", currentUserId);
      const productRef = doc(db, "carts", currentUserId, "cart-items", itemId);
      const docSnap = await getDoc(productRef);
      const updatedQuantity = Number(docSnap.data().amount) + 1;
      
      await updateDoc(
        cartRef,
        {
          dateLastModified: serverTimestamp(),
          subtotal: subtotal,
          totalQuantity: quantity
        }
      );
      await updateDoc(productRef, {amount: docSnap.data().amount + 1});
    } catch(error) {
      console.log(error);
    }
  }

  async function subtractItemQuantity(itemId) {
    try {
      const cartRef = doc(db, "carts", currentUserId);
      const productRef = doc(db, "carts", currentUserId, "cart-items", itemId);
      const docSnap = await getDoc(productRef);
      const updatedQuantity = Number(docSnap.data().amount) - 1;

      if (updatedQuantity < 1) return;

      await updateDoc(productRef, {amount: updatedQuantity});
      await updateDoc(
        cartRef,
        {
          dateLastModified: serverTimestamp(),
          subtotal: subtotal,
          totalQuantity: quantity
        }
      );
    } catch(error) {
      console.log(error);
    }
  }

  async function deleteProductFromCart(itemId) {
    const owner = currentUser ? currentUserId : "unknown";
    const matchedItem = shopItems.find(item => item.itemId === itemId);

    try {
      const cartRef = doc(db, "carts", currentUserId);
      const productRef = doc(db, "carts", owner, "cart-items", matchedItem.itemId);
      const productSnap = await getDoc(productRef);
      const productQuantity = productSnap.data().amount;
      const productCost = productSnap.data().cost;
      const productSubtotal = productQuantity * productCost;

      await deleteDoc(productRef);
      await updateDoc(
        cartRef,
        {
          dateLastModified: serverTimestamp(),
          subtotal: subtotal,
          totalQuantity: quantity
        }
      );
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
    initializeCart,
    subtractItemQuantity
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
