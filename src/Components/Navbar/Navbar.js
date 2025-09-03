import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { UserRound, History } from "lucide-react";
import bg1 from "../../Assets/Background/bg1.mp4";
import bg3 from "../../Assets/Background/bg3.mp4";
import bg2 from "../../Assets/Background/reg1.mp4";
import bg4 from "../../Assets/Background/reg2.mp4";
import bg5 from "../../Assets/Background/reg3.mp4";
import bg6 from "../../Assets/Background/reg4.mp4";
import bg7 from "../../Assets/Background/reg5.mp4";
import bg8 from "../../Assets/Background/reg6.mp4";
import { BsSpeedometer2 } from "react-icons/bs";

const Navbar = () => {
  const location = useLocation();
  const sideRef = useRef(null);
  const [sideactive, setSideactive] = useState("");
  const [randomBg, setRandomBg] = useState(bg2);

  const handleSidebar = () => {
    setSideactive("active");
  };
  const handleCloseSidebar = () => {
    setSideactive("");
  };

  // pick random background for /login and also fallback for others
useEffect(() => {
  const registerBackgrounds = [bg2, bg4, bg5, bg6, bg7, bg8];

  if (location.pathname === "/login") {
    const randomIndex = Math.floor(Math.random() * registerBackgrounds.length);
    setRandomBg(registerBackgrounds[randomIndex]);
  } else if (location.pathname !== "/workout-detail") {
    // give other routes random bg as well
    const randomIndex = Math.floor(Math.random() * registerBackgrounds.length);
    setRandomBg(registerBackgrounds[randomIndex]);
  }
}, [location.pathname]);

// set current background
const currentBg =
  location.pathname === "/login"
    ? randomBg
    : location.pathname === "/workout-detail"
    ? bg1
    : randomBg; // fallback if not set

  useEffect(() => {
    if (sideactive === "active") {
      // disable scroll
      document.body.style.overflow = "hidden";
    } else {
      // enable scroll back
      document.body.style.overflow = "auto";
    }

    // cleanup to ensure scroll is restored if component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sideactive]);


  return (
    <div>
      <div className="navbar">
        <div className="navbar-main">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid nav-name">
              <video
                className="backdrop"
                src={currentBg}
                autoPlay
                loop
                muted
                playsInline
              />
              {location.pathname !== "/login" && (
                <Link className="navbar-brand" onClick={handleSidebar}>
                  <UserRound className="nav-name-svg liquid-glass" />
                </Link>
              )}
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Dashboard
                  </Link>
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                  <Link className="nav-link" to="/help">
                    Help
                  </Link>
                  <Link className="nav-link" to="/history">
                    History
                  </Link>
                  <Link className="nav-link" to="/privacy-policy">
                    Privacy Policy
                  </Link>
                  <Link className="nav-link" to="/term-and-conditions">
                    Term And Conditions
                  </Link>
                  <Link className="nav-link" to="/return-refund">
                    Return Refund
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      {location.pathname !== "/login" && (
        <div className="profile">
          <div className="bmi-meter">
            <Link className="liquid-glass" to={"/bmi"}> 
            <BsSpeedometer2 />
            </Link>
          </div>
          <div className="caloirie-history ">
            <Link className="liquid-glass" to={"/calorie-history"}>
              <History />
              <p>Calorie</p>
            </Link>
          </div>
        </div>
      )}
      <Sidebar
        sideactive={sideactive}
        sideRef={sideRef}
        handleCloseSidebar={handleCloseSidebar}
      />
    </div>
  );
};

export default Navbar;
