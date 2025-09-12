import React from "react";
import "./OtherPages.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import glass from "../../Assets/glassbg.jpeg";
import { Link } from "react-router-dom";

const TermCondition = () => {

   console.warn = (message) =>
    message.includes("Buffer size mismatch") ? null : console.warn(message);
   
  return (
    <div className="Home">
      <div className="Home-main">
        <div className="glass-container liquid-glass">
          <div className="otherpage-box">
            <div className="wallet-status">
              <DotLottieReact
                className="wallet-success"
                src="https://lottie.host/c08624e7-818c-42c1-9046-f1087f1e663b/EoC98Sa2yq.lottie"
                loop
                autoplay
              />
            </div>
            <h5>Terms and Conditions</h5>
          </div>
        </div>
        <div className="Other-pages-box">
          <strong>Effective Date: 11 Sep 2025</strong>
          <p>By accessing or using Feast IQ App (“a product of NASHAIQ INNOVATIONS”), you agree to these Terms & Conditions. If you do not agree, please discontinue use of the App immediately.</p>

          <strong>1. Use of the Service</strong>
          <p>Feast IQ offers AI-generated meal suggestions and workout plans tailored to your daily calorie needs, complete with ingredients, preparation steps, and YouTube video guidance. By using the App, you confirm that all information provided (e.g., age, weight, health status) is accurate and up-to-date.</p>

          <strong>2. No Medical or Professional Advice</strong>
          <p>The content, recommendations, and suggestions provided by Feast IQ are for informational and educational purposes only. They do not constitute medical, nutritional, or fitness advice. Always consult a qualified healthcare provider before making significant changes to your diet or exercise routine. Feast IQ and its affiliates assume no liability for any outcomes, injuries, or health issues resulting from use of the App. </p>

          <strong>3. Account Registration & Responsibility</strong>
          <p>To access full features, you may need to create an account. You are responsible for maintaining your account credentials securely and for all activity under your account. </p>

          <strong>4. Intellectual Property</strong>
          <p>All content, including text, design, videos, and software, is owned by Feast IQ or its licensors and is protected by intellectual property laws. Modifying, copying, or distributing any part of the App without explicit permission is prohibited. </p>

          <strong>5. Liability Limitations</strong>
          <p>Feast IQ is provided "as-is," with no warranties of any kind. Our liability for any claim arising from your use of the App is limited to the amount you paid (if any). We disclaim all liability for indirect, incidental, or consequential damages. </p>

          <strong>6. Changes to Terms</strong>
          <p>We reserve the right to update or modify these Terms at any time. Continued use of the App after changes are posted constitutes your acceptance.</p>

          <strong>7. Governing Law & Contact</strong>
          <p>These Terms are governed by the laws of Indian. For questions or concerns, please contact us at feastiq@gmail.com</p>

          <strong>8. Account deletion </strong>
          <p>
            - Submit you request to permanently remove your user information and
            associated data from our platform.
            <Link className="account-delete" style={{ color: "red" }} to="/delete-account">
              Delete Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermCondition;
