import React from "react";
import "./OtherPages.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "react-router-dom";
import glass from "../../Assets/glassbg.jpeg"

const Help = () => {
  const faqs = [
    {
      question: "How do I set up my meal plan?",
      answer:
        "Go to the Meal Plan section, select your goal (weight gain, loss, or maintenance), and choose from our weekly plans. The app will remind you 10 minutes before each meal.",
    },
    {
      question: "How do I track my workouts?",
      answer:
        "Head over to the Fitness section. Each exercise includes instructions, sets, and reps. Tap on any workout to see details and images of the exercise.",
    },
    {
      question: "Why am I not receiving notifications?",
      answer:
        "Make sure notifications are enabled in your device settings and that you’ve allowed the app to send reminders. If still not working, try logging out and logging in again.",
    },
    {
      question: "Can I customize my diet?",
      answer:
        "Yes! You can replace meals in your plan with alternatives by clicking the 'Customize' button in the Meal section.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can reach us via the Contact Support button at the bottom of this page or email us at support@mealfitness.com.",
    },
  ];

  return (
    <div className="Home">
      <div className="Home-main">
        <div className="glass-container liquid-glass">
          <div className="otherpage-box">
            <div className="wallet-status">
              <DotLottieReact
                className="wallet-success"
                src="https://lottie.host/082e79f3-17de-48aa-882b-7e1d41bfa1f4/zW8r4Jmjwj.lottie"
                loop
                autoplay
              />
            </div>
            <h5>Help & Support</h5>
          </div>
        </div>
        <div className="Other-pages-box">
          <div className="help-container">
            <div className="help-content">
              <p className="help-subtitle">
                Find answers to common questions about using the Meal & Fitness
                App.
              </p>

              <div className="faq-section">
                {faqs.map((faq, index) => (
                  <details key={index} className="faq-item">
                    <summary className="faq-question">{faq.question}</summary>
                    <p className="faq-answer">{faq.answer}</p>
                  </details>
                ))}
              </div>

              <div className="contact-section">
                <h5>Still need help?</h5>
                <p>Contact our support team for further assistance.</p>
                <Link to="mailto:support@" className="seven-day-buttons help">
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
