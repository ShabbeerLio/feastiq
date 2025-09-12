import React from "react";
import "./OtherPages.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import glass from "../../Assets/glassbg.jpeg";

const About = () => {
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
                onError={(e) => console.error("Lottie load error:", e)}
              />
            </div>
            <h5>About Us</h5>
          </div>
        </div>
        <div className="Other-pages-box">
          <p>
            At Feast IQ, we believe healthy living should be simple, smart, and
            personalized. Our mission is to make fitness and nutrition easy to
            follow by combining the power of artificial intelligence with
            practical guidance you can use every day.
          </p>
          <p>
            Feast IQ is more than a fitness app—it’s your AI-powered lifestyle
            partner. The app creates customized meal plans and workout routines
            tailored to your daily calorie requirements, body type, and personal
            goals. From weight loss to muscle gain or overall wellness, Feast IQ
            adapts to your needs.
          </p>
          <p>
            Every meal suggestion comes with detailed information, including the
            exact ingredients, step-by-step preparation methods, and even a
            direct link to a YouTube video so you can cook with confidence. The
            same approach is applied to workouts—clear routines, guided steps,
            and video demonstrations to help you exercise safely and
            effectively, no matter your fitness level.
          </p>
          <p>
            We combine data-driven insights with real-world practicality,
            ensuring every recommendation is sustainable, enjoyable, and
            result-oriented. With progress tracking and instant AI assistance,
            Feast IQ makes staying on top of your health effortless.
          </p>
          <p>
            Our vision is simple: to make smart eating and effective workouts
            accessible for everyone.
          </p>
          <p>Your health, your plan, your Feast IQ.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
