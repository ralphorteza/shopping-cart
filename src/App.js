import './App.css';
import Card from './components/Card';
import data from "./data.js"

// function App() {

//   const items = data.data;
//   const itemsArray = [];

//   items.forEach( item => {
//     itemsArray.push(
//       {
//         name: item.item.name,
//         cost: item.item.cost,
//         type: item.item.type,
//         imageUrl: item.item.images.icon,
//         id: item.itemId,
//       }
//     );
//   });

//   const cardsArray = itemsArray.map(item => (
//     <Card key={item.id} itemObj={item}/>
//   ));
  
//   return (
//     <>
//       <div className="container--card">{cardsArray}</div>
//     </>
//   );
// }

function App() {

  const items = data.data;
  const itemsArray = [];

  items.forEach( item => {
    itemsArray.push(
      {
        name: item.item.name,
        cost: item.item.cost,
        type: item.item.type,
        imageUrl: item.item.images.icon,
        id: item.itemId,
      }
    );
  });

  const cardsArray = itemsArray.map(item => (
    <Card key={item.id} itemObj={item}/>
  ));
  
  return (
    <>
      <div className="container--card">{cardsArray}</div>
    </>
  );
}

export default App;
