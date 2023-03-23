import './HomePage.css';
import { Link } from "react-router-dom";
import banner from "../images/fortnite-banner.jpeg";

export default function HomePage() {
  return (
    <div className="home-page grid">
      <img src={banner} alt="home page splash banner" className="splash--banner"/>
      <p className="leading">Spend your parents' hard earned cash for some digital tom-foolery!</p>
      {/* <button className="button"><Link to="/shop">Shop</Link></button> */}
      <Link className="link--shop" to="/shop">
        shop
        <button type="button"></button>
      </Link>
    </div>
  );
}
