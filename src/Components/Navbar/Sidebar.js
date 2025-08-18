import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import { Link, useNavigate } from 'react-router-dom';
import career from "../../Assets/career.png"
import { ArrowRightLeft, BanknoteArrowUp, ChevronRight, Info, MessageCircleQuestionMark, Newspaper, ShieldAlert, ShieldCheck, X } from 'lucide-react';

const Sidebar = ({ sideactive, sideRef, handleCloseSidebar }) => {
    const navigate = useNavigate();

    // const [userData, setUserData] = useState();
    // useEffect(() => {
    //     const authUser = JSON.parse(localStorage.getItem("authUser"));
    //     if (!authUser) {
    //         navigate("/login");
    //     } else {
    //         const findUser = CombinedFeedData.find((i) => i.id === authUser.id);
    //         setUserData(findUser);
    //     }
    // })
    // console.log(userData,"userData")
    const handleProfile = () => {
        handleCloseSidebar()
    };

    const handleLogout = () => {
        localStorage.removeItem("authUser");
        navigate("/register");
    };

    return (
        <div className={`Sidebar ${sideactive}`} ref={sideRef}>
            <div className='Sidebar-main'>
                <X className='sidebar-closebnt' onClick={handleCloseSidebar} />
                {/* <div className="sidebar-top">
                    <Link to={"/profile"} onClick={handleProfile}>
                        <div className="SearchCard" >
                            <div className="SearchCard-left">
                                <img src={userData?.avatar} alt={userData?.username} />
                            </div>
                            <div className="SearchCard-right">
                                <h6>{userData?.username} {userData?.type === "institute" ? (
                                      <span className="verified">Verified</span>
                                ) : (
                                    <span>({userData?.type})</span>
                                )} </h6>
                                <p>{userData?.location}</p>
                            </div>
                            <div className="sidebar-profile-visit">
                                <ChevronRight />
                            </div>
                        </div>
                    </Link>
                </div> */}
                <div className="sidebar-items">
                    <ul>
                        <li>
                            <Link onClick={handleProfile} to={"/about"}> <Info />About Us</Link>
                        </li>
                        <li>
                            <Link onClick={handleProfile} to={"/help"}> <MessageCircleQuestionMark />Help</Link>
                        </li>
                        <li>
                            <Link onClick={handleProfile} to={"/history"}> <ArrowRightLeft /> History</Link>
                        </li>
                        <li>
                            <Link onClick={handleProfile} to={"/privacy-policy"}> <ShieldAlert />Privacy Policy</Link>
                        </li>
                        <li>
                            <Link onClick={handleProfile} to={"/term-and-conditions"}> <Newspaper />Term And Conditions</Link>
                        </li>
                        <li>
                            <Link onClick={handleProfile} to={"/return-refund"}> <BanknoteArrowUp />Return And Refund</Link>
                        </li>
                        <li>
                            <Link onClick={handleProfile} to={""}> <ShieldCheck />Certificates</Link>
                        </li>
                        {/* <li>
                            <Link onClick={handleProfile} to={"/"}> <MdWorkOutline />Carrier</Link>
                        </li> */}
                    </ul>
                </div>
                <div className="sidebar-bottom">
                    <div className="sidebar-career">
                        <h5>Join Our Team!</h5>
                        <p>Become a Member</p>
                        <Link onClick={handleProfile} to={"/career"}>Career</Link>
                        <img src={career} alt="" />
                    </div>
                    <div className="sidebar-logout">
                        <p onClick={handleLogout}>Log Out</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
