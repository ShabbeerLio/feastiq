import { useNavigate } from "react-router-dom";
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
            <a href="tel:+919821861897">
              <FaGooglePlay />
              Download from Playstore{" "}
            </a>
          </button>
          <button className="comn-btn">
            <a href="https://api.whatsapp.com/send/?phone=919821861897&text=Hi%2C+this+is+a+massage+from+Digital+Dezire+Website&type=phone_number&app_absent=0">
              <FaWhatsapp />
            </a>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopBar;
