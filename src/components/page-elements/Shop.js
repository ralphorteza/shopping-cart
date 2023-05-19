import "./Shop.css"
import Card from "./Card";
import { useShop } from "../../contexts/ShopContext";

export default function Shop() {
  const { shopItems } = useShop();
  const itemsArray = [];

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