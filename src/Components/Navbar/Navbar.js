import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { UserRound } from "lucide-react";
import bg1 from "../../Assets/Background/bg1.mp4";
import bg3 from "../../Assets/Background/bg3.mp4";
import bg2 from "../../Assets/Background/reg1.mp4";
import bg4 from "../../Assets/Background/reg2.mp4";
import bg5 from "../../Assets/Background/reg3.mp4";
import bg6 from "../../Assets/Background/reg4.mp4";
import bg7 from "../../Assets/Background/reg5.mp4";
import bg8 from "../../Assets/Background/reg6.mp4";

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

  // pick random background only if pathname is /register
  useEffect(() => {
    if (location.pathname === "/register") {
      const registerBackgrounds = [bg2, bg4, bg5, bg6, bg7, bg8];
      const randomIndex = Math.floor(
        Math.random() * registerBackgrounds.length
      );
      setRandomBg(registerBackgrounds[randomIndex]);
    }
  }, [location.pathname]);

  const currentBg =
    location.pathname === "/register"
      ? randomBg
      : location.pathname === "/workout-detail"
      ? bg1
      : bg3;

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
              <Link className="navbar-brand" onClick={handleSidebar}>
                <UserRound className="nav-name-svg" />
                {/* <img src={data?.avatar} alt="" /> */}
              </Link>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                  <Link className="nav-link" to="/feeds">
                    Feeds
                  </Link>
                  <Link className="nav-link" to="/add">
                    Add
                  </Link>
                  <Link className="nav-link" to="/search">
                    Search
                  </Link>
                  <Link className="nav-link" to="/history">
                    History
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <Sidebar
        sideactive={sideactive}
        sideRef={sideRef}
        handleCloseSidebar={handleCloseSidebar}
      />
    </div>
  );
};

export default Navbar;
