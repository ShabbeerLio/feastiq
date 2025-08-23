import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import career from "../../Assets/career.png";
import profile from "../../Assets/profile.png";
import {
  ArrowRightLeft,
  BanknoteArrowUp,
  ChevronRight,
  History,
  House,
  Info,
  MessageCircleQuestionMark,
  Newspaper,
  ShieldAlert,
  ShieldCheck,
  X,
} from "lucide-react";

const Sidebar = ({ sideactive, sideRef, handleCloseSidebar }) => {
  const navigate = useNavigate();
  
  const Host = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${Host}/auth/getuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        });
        const json = await response.json();
        setUserData(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [Host, token]);

  const handleProfile = () => {
    handleCloseSidebar();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    handleCloseSidebar();
  };

  return (
    <div className={`Sidebar ${sideactive}`} ref={sideRef}>
      <div className="Sidebar-main">
        <X className="sidebar-closebnt" onClick={handleCloseSidebar} />
        <div className="sidebar-items">
          <ul>
            <li>
              <Link onClick={handleProfile} to={"/"}>
                {" "}
                <House />
                Dashboard
              </Link>
            </li>
            <li>
              <Link onClick={handleProfile} to={"/about"}>
                {" "}
                <Info />
                About Us
              </Link>
            </li>
            <li>
              <Link onClick={handleProfile} to={"/help"}>
                {" "}
                <MessageCircleQuestionMark />
                Help
              </Link>
            </li>
            <li>
              <Link onClick={handleProfile} to={"/calorie-history"}>
                {" "}
                <History />
                Calorie History
              </Link>
            </li>
            <li>
              <Link onClick={handleProfile} to={"/history"}>
                {" "}
                <ArrowRightLeft /> History
              </Link>
            </li>
            <li>
              <Link onClick={handleProfile} to={"/privacy-policy"}>
                {" "}
                <ShieldAlert />
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link onClick={handleProfile} to={"/term-and-conditions"}>
                {" "}
                <Newspaper />
                Term And Conditions
              </Link>
            </li>
            <li>
              <Link onClick={handleProfile} to={"/return-refund"}>
                {" "}
                <BanknoteArrowUp />
                Return And Refund
              </Link>
            </li>
            {/* <li>
              <Link onClick={handleProfile} to={""}>
                {" "}
                <ShieldCheck />
                Certificates
              </Link>
            </li> */}
            {/* <li>
                            <Link onClick={handleProfile} to={"/"}> <MdWorkOutline />Carrier</Link>
                        </li> */}
          </ul>
        </div>
        <div className="sidebar-bottom">
          {userData && (
            <div className="sidebar-career">
              <h5>Hii {userData?.name}!</h5>
              <Link onClick={handleProfile} to={"/profile"}>
                View Profile
              </Link>
              <img src={profile} alt="" />
            </div>
          )}

          <div className="sidebar-logout">
            <p onClick={handleLogout}>Log Out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
