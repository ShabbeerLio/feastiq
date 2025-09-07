import React from "react";
import "./OtherPages.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import glass from "../../Assets/glassbg.jpeg";
import { Link } from "react-router-dom";

const TermCondition = () => {
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
          <strong>1. Acceptance of Terms</strong>
          <p>
            - By using FeastIQ, you agree to these terms, our
            <Link to="/privacy-policy">Privacy Policy</Link>, and
            <Link to="/return-refund">Return & Refund Policy</Link>.
          </p>

          <p>
            - We reserve the right to update or modify these terms at any time
            without prior notice.
          </p>

          <p>
            - Continued use of our services after any modifications constitutes
            your acceptance of the updated terms.
          </p>

          <strong>2. Eligibility</strong>

          <p>- You must be at least 18 years old to use our services.</p>

          <p>
            - If you are accessing our services on behalf of an organization,
            you confirm that you have the authority to bind the entity to these
            terms.
          </p>

          <strong>3. Use of Services</strong>

          <p>
            - Our services, including Meal & fitness based reports and
            predictions, are for informational and entertainment purposes only.
            They should not be considered a substitute for professional advice
            (legal, medical, financial, etc.).
          </p>

          <p>
            - You agree not to misuse our platform, engage in fraudulent
            activities, or disrupt our services in any way.
          </p>
          <p>
            - Any unauthorized reproduction, distribution, or modification of
            content from FeastIQ is strictly prohibited.
          </p>

          <strong>4. Account Registration</strong>
          <p>
            - To access certain features, you may need to register an account.
          </p>

          <p>
            - You are responsible for maintaining the confidentiality of your
            account credentials.
          </p>

          <p>
            - Any activity under your account will be your responsibility.
            Notify us immediately if you suspect unauthorized use.
          </p>

          <strong>5. Payments & Subscriptions</strong>
          <p>
            - Any payments made for our services are non-refundable, except as
            outlined in our{" "}
            <Link to="/return-refund">Return & Refund Policy</Link>.
          </p>

          <p>
            - We use third-party payment gateways, and we are not responsible
            for any transaction failures or security breaches that occur outside
            our platform.
          </p>

          <p>
            - Prices for services may change at our discretion. Continued use
            after price changes signifies acceptance.
          </p>

          <strong>6. Intellectual Property Rights</strong>
          <p>
            - All content, trademarks, logos, and materials on our platform are
            the property of FeastIQ.
          </p>

          <p>
            - Users may not copy, reproduce, sell, or exploit any content from
            our platform without explicit permission.
          </p>

          <strong>7. Limitation of Liability</strong>
          <p>
            - We do not guarantee the accuracy or reliability of Meal & Fitness
            predictions or reports.
          </p>

          <p>
            - FeastIQ shall not be liable for any direct, indirect, incidental,
            or consequential damages arising from the use of our services.
          </p>

          <p>- Your reliance on our services is solely at your own risk.</p>

          <strong>8. Privacy Policy</strong>
          <p>
            - Your use of our services is also governed by our
            <Link to="/privacy-policy"> Privacy Policy</Link>.
          </p>

          <p>
            - We implement reasonable security measures to protect user data but
            do not guarantee absolute security.
          </p>

          <strong>9. Termination of Services</strong>
          <p>
            - We reserve the right to suspend or terminate your access to our
            services at our discretion, especially in cases of policy violations
            or misuse.
          </p>

          <p>
            - Upon termination, any outstanding obligations or liabilities
            remain enforceable.
          </p>

          <strong>10. Governing Law & Dispute Resolution</strong>
          <p>- These terms shall be governed by the laws of India.</p>

          <p>
            - Any disputes shall be resolved through arbitration or legal
            proceedings.
          </p>

          <p>- Your reliance on our services is solely at your own risk.</p>

          <strong>11. Contact Us</strong>
          <p>- These terms shall be governed by the laws of India.</p>

          <p>
            For any questions regarding these terms, please contact us at:
            feastiq@gmail.com
          </p>

          <p>
            By using our services, you acknowledge that you have read,
            understood, and agreed to these
            <Link to="/term-and-conditions"> Terms & Conditions.</Link>
          </p>
          <strong>12. Account deletion </strong>
          <p>
            - Submit you request to permanently remove your user information and
            associated data from our platform.
            <Link style={{ color: "red" }} to="/delete-account">
              Delete Account
            </Link>
          </p>
        </div>
      </div>
      <div className="liquid-glass">{/* liquid glass */}</div>
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

export default TermCondition;
