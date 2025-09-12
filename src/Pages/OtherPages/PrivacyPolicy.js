import React from "react";
import "./OtherPages.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import glass from "../../Assets/glassbg.jpeg"
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
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
            <h5>Privacy Policy</h5>
          </div>
        </div>
        <div className="Other-pages-box">
          <p>Privacy Policy
            Effective Date: 13 Sep, 2025
            </p>
            <p>
            <strong>Feast IQ</strong> (“we”, “our”, “us”), a product of <strong>NASHAIQ INNOVATIONS</strong>, values your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains what information we collect, how we use it, how we protect it, and your rights regarding that information. </p>

          <strong>1. What Personal Information We Collect</strong>

          <p>When you use <strong>Feast IQ</strong>, we may collect:
            Registration Data: Name, email address, password, age, gender, height, weight, health status (if you choose to provide), fitness goals, dietary preferences (e.g., vegetarian, vegan, keto), and other profile information required to personalize your experience.</p>


          <p> Usage Data: Information about how you use the app — meals viewed or selected, workouts completed, time spent using the app, and features accessed.</p>


          <p>Health & Fitness Data: Your daily calorie requirement, body metrics (e.g., weight, height), workout history, food preferences—all to generate accurate suggestions.</p>


          <p>Content Data: Data from video views (YouTube links), recipes/instruction videos you access, and ingredients or cooking steps you view/save.</p>


          <p>Device & Log Data: IP address, device type/model, operating system, app version, crash logs, and other diagnostic data.</p>


          <p>Cookies & Tracking Technologies: To improve user experience, for analytics and app performance improvements.</p>

          <strong>2. How We Use Your Information</strong>
          We use the information we collect to:
          Provide, maintain, and improve <strong>Feast IQ</strong>s services.


          <p>Personalize meal and workout plans based on your goals, preferences, and health metrics.</p>


          <p>Provide recipe instructions and video guides relevant to you.</p>


          <p>Monitor and analyze usage and trends to enhance features.</p>


          <p>Communicate with you—e.g., push notifications, email updates, customer support.</p>


          <p>Ensure security and prevent abuse or misuse of the service.</p>

          <strong>  3. Data Sharing & Disclosure</strong>
          <p>We do not sell or rent your personal data to third parties.</p>


          <p>We may share data with service providers who assist us with essential functions (e.g. video streaming, analytics, hosting) under strict confidentiality.</p>


          <p>We may disclose information when required by law or in response to valid legal requests.</p>


          <p>Aggregated or anonymized data (that cannot reasonably identify you) may be used for research or analytics.</p>

          <strong>4. Security</strong>
          <p>We adopt industry-standard security measures to protect your personal data from unauthorized access, loss, misuse, or alteration. However, no system is completely secure; therefore, while we strive to protect your information, we can’t guarantee absolute security.</p>
          <strong>5. Your Rights & Choices</strong>
          <p>Access & Correction: You can access or update your profile, fitness data, or preferences anytime via the app settings.</p>


          <p>Account Deletion: You may request deletion of your account and associated personal data by contacting us at feastiq@gmail.com, or you can request from <Link to={"/term-and-conditions"}>Terms & Conditions</Link> page. Once deleted, we will remove your profile and related data from our systems, except as required by law.</p>


          <p> Opt-out of Communications: You can opt out of non-essential communications (e.g., marketing or promotional messages).</p>


          <p> Privacy Preferences: You can control cookies/tracking settings where applicable.</p>
          <strong> 6. Third-Party Links & Content</strong>
          <p>Our app may include links to third-party services (e.g., YouTube videos, recipe sites). We are not responsible for the privacy practices of those external services. Please review their privacy policies separately.</p>

          <strong>7. Changes to This Privacy Policy</strong>
          <p>We may update this Privacy Policy from time to time. When we do, we will post the changes here with a new effective date. Your continued use of <strong>Feast IQ’</strong> after changes are posted indicates your acceptance of the updated policy.</p>
          <strong> 8. Contact Us</strong>
          <p>If you have any questions or concerns about this Privacy Policy or about how we manage your personal data, please contact us at:
            Email: feastiq@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
