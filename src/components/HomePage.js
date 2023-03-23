import './HomePage.css';
import { Link } from "react-router-dom";
import banner from "../images/fortnite-banner.jpeg";

export default function HomePage() {
  return (
    <div className="home-page">
      <h1>HomePage</h1>

      <section className="splash">
        <img src={banner} alt="home page splash banner" className="splash--banner"/>
        <div className="splash--right">
          <h3>Spend your parents' hard earned cash for some digital tom-foolery!</h3>
          <button className="button"><Link to="/shop">Shop</Link></button>
        </div>
      </section>
    </div>
  );
}
