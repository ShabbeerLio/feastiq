import React, { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import expire from "../../Assets/Expire.png";
import profile from "../../Assets/profile.png";
import glass from "../../Assets/glassbg.jpeg";
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
import tag from "../../Assets/tag.png";
import NoteContext from "../../Context/FeastContext";

const Sidebar = ({ sideactive, sideRef, handleCloseSidebar }) => {
  const { userDetail, getUserDetails } = useContext(NoteContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getUserDetails();
    }
  }, [navigate]);

  const userData = userDetail;

  const handleProfile = () => {
    handleCloseSidebar();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    handleCloseSidebar();
  };

  const handleSubscribe = () => {
    navigate("/subscription");
    handleCloseSidebar();
  };

  const endDate = new Date(userData?.subscription?.endDate);
  const today = new Date();
  const diffInTime = endDate.getTime() - today.getTime();
  const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
  // console.log(diffInDays, "diffInDays");


  return (
    <div className={`Sidebar ${sideactive} liquid-glass`} ref={sideRef}>
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
              <Link onClick={handleProfile} to={"/bmi"}>
                {" "}
                <History />
                BMI(Body Mass Index)
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
          </ul>
        </div>
        <div className="sidebar-bottom">
          {userData && (
            <div>
              <div className="sidebar-career liquid-glass">
                <h5>
                  Hii {userData?.name}!
                  {userData?.subscription?.status === "Active" &&
                    userData?.subscription?.plan !== "Free" &&
                    userData?.subscription?.plan !== "Expired" && (
                      <img src={tag} alt="" />
                    )}
                </h5>
                <Link onClick={handleProfile} to={"/profile"}>
                  View Profile
                </Link>
                <img src={profile} alt="" />
              </div>
              {(userData?.subscription?.status === "Expired" ||
                userData?.subscription?.status === "Cancelled" ||
                userData?.subscription?.status === "Free") && (
                <div
                  className="sidebar-career subscription liquid-glass"
                  onClick={handleSubscribe}
                >
                  <div className="subscription-side">
                    <img src={tag} alt="" />
                    <p>Get Your Subscription Plan Now! </p>
                  </div>
                  <p>
                    <ChevronRight />
                  </p>
                </div>
              )}
              {diffInDays <= 2 && diffInDays >= 0 && (
                <div
                  className="sidebar-career subscription liquid-glass subscription-ending"
                  onClick={handleSubscribe}
                >
                  <div className="subscription-side">
                    <img
                      className="subscription-alert-image"
                      src={expire}
                      alt=""
                    />
                    <div className="sub-endbox">
                      <p>Your Plan is expiring in {diffInDays} days</p>
                      <p>Get Your Subscription Plan Now!</p>
                    </div>
                  </div>
                  <p>
                    <ChevronRight />
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="sidebar-logout liquid-glass">
            <p onClick={handleLogout}>Log Out</p>
          </div>
          <div className="sidebar-footer">
            <Link>
              {" "}
              &copy; Copyright 2025 NASHAIQ INNOVATIONS | All Rights Reserved{" "}
            </Link>
            <Link to={"https://digitaldezire.com/"}>
              Dev.By: <strong>Digital Dezire</strong>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
