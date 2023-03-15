import './App.css';
import Card from './components/Card';
import data from "./data.js"
function App() {

  const items = data.data;
  // console.log(items[8]);

    const example = items[8];
    const itemName = example.item.name;
    const itemCost = example.item.cost;
    const itemType = example.item.type;
    const itemImageURL = example.item.images.icon;
    const itemID = example.itemId;

    const itemObj = {
      name: itemName,
      cost: itemCost,
      type: itemType,
      imageURL: itemImageURL,
      id: itemID,
    };

    console.log(itemObj);
  
  return (
    <>
    </>
  );
}

export default App;
