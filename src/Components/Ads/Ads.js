import bnimg from "../../Assets/Ads/ads.jpg";
import "./Ads.css";

const Ads = () => {
  return (
    <>
      <div className="Ads">
        <div className="Ads-main">
          <div className="Ads-image">
            <img src={bnimg} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Ads;
