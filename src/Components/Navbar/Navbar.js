import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import {
  UserRound,
} from "lucide-react";
import bg1 from "../../Assets/Background/backdrop.jpeg";
import bg3 from "../../Assets/Background/bg2.jpg";

const Navbar = () => {
  const location = useLocation();
  const sideRef = useRef(null);
  const [sideactive, setSideactive] = useState("");

  const handleSidebar = () => {
    setSideactive("active");
  };
  const handleCloseSidebar = () => {
    setSideactive("");
  };

  const currentBg = location.pathname === "/register" ? bg3 : bg1;

  return (
    <div>
      <div className="navbar">
        <div className="navbar-main">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid nav-name">
              <img className="backdrop" src={currentBg} alt="" />
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
