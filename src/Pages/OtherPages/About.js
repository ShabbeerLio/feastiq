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

          <p>At NASHAIQ INNOVATIONS, we believe healthy living should be simple, smart, and personalized. Guided by this vision, we created FeastIQ—an AI-powered health and fitness app designed to make nutrition and workouts easy to follow.</p>

          <p>FeastIQ is more than just a fitness app; it’s your intelligent lifestyle partner. Powered by advanced artificial intelligence, it builds customized meal plans and workout routines tailored to your daily calorie requirements, body type, and personal goals. Whether your aim is weight loss, muscle gain, or overall wellness, FeastIQ adapts to you.</p>

          <p>Every meal suggestion includes detailed information: ingredients, step-by-step preparation, and direct links to YouTube recipe videos so you can cook confidently. The same thoughtful design is applied to workouts—clear routines, guided instructions, and video demonstrations to help you exercise safely and effectively at any fitness level.</p>

          <p>By blending data-driven insights with practical guidance, FeastIQ makes healthy living sustainable, enjoyable, and results-focused. With progress tracking and an instant AI assistant, staying in control of your wellness becomes effortless.</p>

          <p>At NASHAIQ INNOVATIONS, our mission is to make smart eating and effective workouts accessible for everyone.</p>

          <p>Your health, your plan, your FeastIQ — powered by NASHAIQ INNOVATIONS.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
