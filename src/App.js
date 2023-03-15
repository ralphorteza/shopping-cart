import './App.css';
import Card from './components/Card';
import data from "./data.js"
function App() {

  const items = data.data;
  // console.log(items[8]);

    const example = items[8];
    // const itemName = example.item.name;
    // const itemCost = example.item.cost;
    // const itemType = example.item.type;
    // const itemImageURL = example.item.images.icon;
    // const itemID = example.itemId;

    const itemObj = {
      name: example.item.name,
      cost: example.item.cost,
      type: example.item.type,
      imageUrl: example.item.images.icon,
      id: example.itemId,
    };

    // console.log(itemObj);
  
  return (
    <>
      <Card itemObj={itemObj} />
    </>
  );
}

export default App;
