import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";
import { FaWhatsapp, FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const handleLinkClick = (path) => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  };
  return (
    <>
      <section className="requst-quote-comp">
        <div className="common-container">
          <div className="requst-quote-bx">
            <h6>1st AI-Powered Meal & Workout Planner in a single App</h6>
            <h5>We are here to help you!</h5>
            <p>
              Give us a call or pay us a visit - We are dedicated to addressing
              all your inquiries promptly, within 24 hours on business days.
            </p>

            <div className="hero-downloads">
              <Link>
                <div className="wallet-status">
                  <DotLottieReact
                    className="wallet-success"
                    src="https://lottie.host/bbab346e-4485-40b7-aaed-a2c68a2921b9/95u1TvWlcg.lottie"
                    loop
                    autoplay
                  />
                </div>
              </Link>
            </div>
            <div className="flex-btn-bx">
              <button className="comn-btn">
                <Link to="tel:+919821861897">
                  <FaFacebook />
                </Link>
              </button>
              <button className="comn-btn">
                <Link to="https://api.whatsapp.com/send/?phone=919821861897&text=Hi%2C+this+is+a+massage+from+Digital+Dezire+Website&type=phone_number&app_absent=0">
                  <FaWhatsapp />{" "}
                </Link>
              </button>
              <button className="comn-btn">
                <Link to="https://api.whatsapp.com/send/?phone=919821861897&text=Hi%2C+this+is+a+massage+from+Digital+Dezire+Website&type=phone_number&app_absent=0">
                  <FaYoutube />{" "}
                </Link>
              </button>
              <button className="comn-btn">
                <Link to="https://api.whatsapp.com/send/?phone=919821861897&text=Hi%2C+this+is+a+massage+from+Digital+Dezire+Website&type=phone_number&app_absent=0">
                  <FaInstagram />{" "}
                </Link>
              </button>
              <button className="comn-btn">
                <i className="fa-regular fa-envelope"></i> Request a Quote
              </button>
            </div>
            <ul className="footer-links">
              <li>
                <Link onClick={handleLinkClick} to={"/about"}>About Us</Link>
              </li>
              <li>
                <Link onClick={handleLinkClick} to={"/contact-us"}>Contact Us</Link>
              </li>
              <li>
                <Link onClick={handleLinkClick} to={"/privacy-policy"}>Privacy Policy</Link>
              </li>
              <li>
                <Link onClick={handleLinkClick} to={"/term-and-conditions"}>Term And Conditions</Link>
              </li>
              <li>
                <Link onClick={handleLinkClick} to={"/return-refund"}>Return And Refund</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="footer-sec">
        <div className="common-container">
          <div className="footer-flex-bx">
            <p>© NASHA IQ Inovations 2025 | All Rights Reserved.</p>
            <p>Dev. By: Digital Dezire Web Solutions.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
