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


/* This App component is meant for testing purposes. Comment out the function
 * below and uncomment the function above if not in use.
 */
function App() {

  const items = data.data;
  const itemsArray = [];
  const exampleCard =  {
          name: items[8].item.name,
          cost: items[8].item.cost,
          type: items[8].item.type,
          imageUrl: items[8].item.images.icon,
          id: items[8].itemId,
        };
  
  itemsArray.push(exampleCard);
  console.log(itemsArray);
  
  const cardsArray = itemsArray.map(item => (
    <Card key={item.id} itemObj={item}/>
  ));

  return (
    <>
      {cardsArray}
    </>
  );
}

export default App;
