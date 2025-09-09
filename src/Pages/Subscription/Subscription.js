import React, { useContext, useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import glass from "../../Assets/glassbg.jpeg";
import Ads from "../../Components/Ads/Ads";
import ai from "../../Assets/ai.png"
import "./Subscription.css"
import NoteContext from "../../Context/FeastContext";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronLeft } from "lucide-react";

const Subscription = () => {
  const { adminDetail, getAdminDetails, userDetail, getUserDetails } = useContext(NoteContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getAdminDetails();
      getUserDetails();
    }
  }, [navigate]);

  useEffect(() => {
          const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
      
            // how much user has scrolled in %
            const scrolledPercent = (scrollTop + windowHeight) / docHeight * 100;
      
            if (scrolledPercent >= 99) {
              setIsScrolled(true);
            } else {
              setIsScrolled(false);
            }
          };
  
          setTimeout(() => setIsScrolled(false), 500);
      
          window.addEventListener("scroll", handleScroll);
          return () => window.removeEventListener("scroll", handleScroll);
        }, []);

  const handleClose = () => setIsScrolled(false);

  console.warn = (message) =>
    message.includes("Buffer size mismatch") ? null : console.warn(message);

  const plans = adminDetail[0]?.plan || [];

  const lastBought = userDetail?.subscription?.plan

  return (
    <div className="Home">
      <div className="Home-main">
        <div className="glass-container liquid-glass">
          <div className="otherpage-box">
            <div className="wallet-status">
              <DotLottieReact
                className="wallet-success"
                src="https://lottie.host/18fb0fbb-7ac3-4b0b-bc21-cb4e2dfb500d/Td5yDpLMEp.lottie"
                loop
                autoplay
              />
            </div>
            <h5>Subscription</h5>
          </div>
        </div>

        <div className={`home-scroll bmi ${isScrolled ? "scrolled" : ""}`}>
          <div className="home-scroll-box">
            <div className="history-card">
              <div className="headerfornavigate subs-title">
                <h5 className="mealdetail-title">
                  <ChevronLeft
                    className="cursor-pointer"
                    onClick={() => navigate(-1)} // goes back to previous page
                  /> Subscribe To Unlock
                </h5>
                <h5>{isScrolled && <ChevronDown onClick={handleClose} />}</h5>
              </div>
              <div className="subs-title2">
                <h5>World Of Premium Benifits!</h5>
              </div>
              <div className="subs-head">
                <div className="subs-head-card">
                  <img src={ai} alt="" />
                  <p>Advance AI Where you can change you meal and workout plans.</p>
                </div>
                <div className="subs-head-card">
                  <img src={ai} alt="" />
                  <p>Advance AI Where you can change you meal and workout plans.</p>
                </div>
                <div className="subs-head-card">
                  <img src={ai} alt="" />
                  <p>Advance AI Where you can change you meal and workout plans.</p>
                </div>
              </div>
              <h5>Subscription Plans
                {/* <span>(Cancle Anytime)</span> */}
              </h5>
              {plans.map((plan) => (
                <div key={plan._id} className={`bmi-card sub-plan ${plan.plan}`}>
                  <div className="sub-plan-top">
                    <div className="sub-plan-top-left">
                      {lastBought === plan.plan && <h1 className="last-subs">Last Subscribed</h1>}
                      <h6>{plan.plan}</h6>
                      <p>{plan.description}</p>
                    </div>
                    <div className="sub-plan-top-right">
                      <h5>
                        ₹{plan.slprice}
                      </h5>
                      <del>{plan.price}</del>
                      {/* <p>+GST</p> */}
                    </div>
                  </div>

                  <h6
                    className="liquid-glass subs-btn"
                    onClick={() =>
                      navigate("/checkout", { state: { type: "subscription", data: plan } })
                    }
                  >
                    Subscribe Now!
                  </h6>
                  {plan.tag && <span className="status-badge active">{plan.tag}</span>}
                </div>
              ))}
              <Ads />
            </div>
          </div>
        </div>
      </div>
      <div className="liquid-glass"></div>
      <svg style={{ display: "none" }}>
        <filter id="displacementFilter">
          <feImage href={glass} preserveAspectRatio="none" />
          <feDisplacementMap
            in="SourceGraphic"
            scale="200"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
    </div>
  );
};

export default Subscription;
