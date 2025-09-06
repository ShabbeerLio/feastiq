import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/WebView/logo-1.png";
import { FaWhatsapp, FaGooglePlay } from "react-icons/fa";

const TopBar = () => {
    const navigate = useNavigate();

    const handleLinkClick = (path) => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
    navigate("/");
  };

  return (
    <section className="top-header-comp">
      <div className="common-container top-hedr-flex">
        <div className="logo-bx">
          <img onClick={handleLinkClick} src={logo} alt="" />
        </div>
        <div className="flex-btn-bx">
          <button className="comn-btn">
            <Link to="">
              <FaGooglePlay />
              Download from Playstore{" "}
            </Link>
          </button>
          <button className="comn-btn">
            <Link to="">
              <FaWhatsapp />
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
