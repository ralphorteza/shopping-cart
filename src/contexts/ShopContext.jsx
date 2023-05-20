import React, { useContext, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
const ShopContext = React.createContext();

export function useShop() {
  return useContext(ShopContext);
}

export function ShopProvider({ children }) {
  const collectionRef = collection(db, "items");
  const [shopItems, setShopItems] = useState([]);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setShopItems(items);
      setLoading(false);
    });
    console.log("Shop useEffect ran");
    return () => {
      unsubscribe();
    }
    // eslint-disable-next-line
  }, []);

  console.log(shopItems);
  const value = {
    shopItems
  }

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}
