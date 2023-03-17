import './HomePage.css';
import banner from "../images/fortnite-banner.jpeg";
function HomePage() {

  return (
    <div className="home-page">
      <h1>HomePage</h1>

      <section className="splash">
        <img src={banner} alt="home page splash banner" className="splash--banner"/>
        <div className="splash--right">
          <h3>Spend your parents' hard earned cash for some digital tom-foolery!</h3>
          {/* <div className="shop--button">Shop Here</div> */}
          <button className="button">shop here</button>
        </div>
      </section>
    </div>
  )
}

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
//         description: item.item.description,
//         rating: item.item.ratings,
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
// function App() {

//   const items = data.data;
//   const itemsArray = [];
//   const exampleCard =  {
//           name: items[8].item.name,
//           cost: items[8].item.cost,
//           type: items[8].item.type,
//           imageUrl: items[8].item.images.icon,
//           id: items[8].itemId,
//           description: items[8].item.description,
//           rating: items[8].item.ratings,
//         };
  
//   itemsArray.push(exampleCard);

//   const cardsArray = itemsArray.map(item => (
//     <Card key={item.id} itemObj={item}/>
//   ));

//   return (
//     <>
//       {cardsArray}
//     </>
//   );
// }

export default HomePage;
