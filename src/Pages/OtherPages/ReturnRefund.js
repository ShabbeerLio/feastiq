import React from "react";
import "./OtherPages.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import glass from "../../Assets/glassbg.jpeg"

const ReturnRefund = () => {

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
            <h5>Return Refund</h5>
          </div>
        </div>
        <div className="Other-pages-box">
          <p>Effective Date: 12 Sep, 2025 <br />
            Thank you for choosing FeastIQ, a product of NASHAIQ INNOVATIONS. We strive to deliver value by providing AI-powered meal plans, workout routines, and personalized health content. Please read this Refund Policy carefully before purchasing any subscription or in-app purchase. By purchasing, you agree to the terms below.
          </p>
          <p>1. No Refund / Cancellation after Confirmation
            Once a subscription plan, premium feature, or in-app purchase is confirmed and payment is completed, you are not eligible for a refund, cancellation, or credit, except in cases explicitly described below. </p>
          <p>2. Exceptions & Partial Refunds
            We may, at our discretion, grant a refund or partial refund under limited circumstances, such as:
            If the service purchased does not begin (e.g., no access has been provided) and you notify us within 3 hour of payment.</p>

          <p>If there is a technical error or product defect that prevents you from using the service properly, and our support team is unable to resolve it in a reasonable time.</p>


          <p>Requests outside these circumstances are generally non-refundable.
            3. Refund Amount and Deductions
            Any refunds granted will exclude transaction fees or payment gateway fees, which are non-recoverable.</p>

          <p>
            Refunds will be made in the same mode of payment you used, or via such method as NASHAIQ INNOVATIONS deems appropriate.
            4. How to Request a Refund
            To request a refund:
            Contact our support team at feastiq@gmail.com  within the time limit (e.g., 3 hours if service has not started).</p>


          <p>Include details of your purchase: invoice/order number, date & time, and a clear description of the issue.</p>


          <p>Our team will review your request and notify you of the decision within 3 business days.
            5. No Refund in These Cases
            Refunds will not be granted in cases such as:
            The service has already been delivered (meal plan generated, workout plan accessed, etc.).

          </p>
          <p>User provided incorrect information (e.g., wrong caloric or health data) that affected personalization.</p>


          <p>User fails to use or access the service after confirmation (i.e., change of mind).</p>


          <p>Promotional or discounted purchases are explicitly marked as non-refundable.
            6. Changes to This Policy
            NASHAIQ INNOVATIONS reserves the right to update or modify this Refund Policy at any time. All changes will be posted here with a new effective date. Continued use or purchases after changes implies your acceptance of the updated policy.</p>
        </div>
      </div>
    </div>
  );
};

export default ReturnRefund;
