import './HomePage.css';
import { Link } from "react-router-dom";
import banner from "../../images/fortnite-banner.jpeg"

export default function HomePage() {
  return (
    <div className="home-page grid">
      <img src={banner} alt="home page splash banner" className="splash--banner"/>
      <p className="leading">Spend your parents' hard earned cash for some digital tom-foolery!</p>
      <Link className="link--shop" to="/shop">
        shop
      </Link>
    </div>
  );
}
