import "./Shop.css"
import Card from "./Card";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";

export default function Shop() {
  const collectionRef = collection(db, "items");
  const [shopItems, setShopItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const itemsArray = [];
  
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
  }, []);

  shopItems.forEach((item) => {
    itemsArray.push(
      {
        name: item.item.name,
        cost: item.item.cost,
        type: item.item.type,
        imageUrl: item.item.images.icon,
        id: item.itemId,
        description: item.item.description,
        rating: item.item.ratings,
      }
    );
  });

  const cardsArray = itemsArray.map(item => (
    <Card 
      key={item.id}
      itemObj={item}
    />
  ));
  
  return (
    <>
      <section className="container--cards grid">{cardsArray}</section>
    </>
  );
}