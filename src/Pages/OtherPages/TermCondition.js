import React from "react";
import "./OtherPages.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import glass from "../../Assets/glassbg.jpeg"

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
            <h5  >Terms and Conditions</h5>
          </div>
        </div>
        <div className="Other-pages-box">
          <p>
            Welcome to our fitness app! We are dedicated to helping you achieve
            your health and fitness goals through personalized meal and workout
            plans. Our team of experts has designed a user-friendly platform
            that provides you with the tools and resources you need to succeed.
          </p>
          <p>
            Whether you're looking to lose weight, build muscle, or simply
            maintain a healthy lifestyle, our app has got you covered. With a
            wide range of meal options and workout routines tailored to your
            individual needs, you'll never feel lost or overwhelmed.
          </p>
          <p>
            Join our community today and take the first step towards a
            healthier, happier you!
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum natus
            eos sint corporis laborum animi, quasi modi! Molestiae quod nobis
            libero saepe corporis aliquam praesentium aut architecto quisquam
            voluptas, eaque ullam neque sint amet quia necessitatibus? Repellat
            distinctio corporis enim, odit itaque ipsum voluptas, modi ad minima
            necessitatibus, dolore in!
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum natus
            eos sint corporis laborum animi, quasi modi! Molestiae quod nobis
            libero saepe corporis aliquam praesentium aut architecto quisquam
            voluptas, eaque ullam neque sint amet quia necessitatibus? Repellat
            distinctio corporis enim, odit itaque ipsum voluptas, modi ad minima
            necessitatibus, dolore in!
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum natus
            eos sint corporis laborum animi, quasi modi! Molestiae quod nobis
            libero saepe corporis aliquam praesentium aut architecto quisquam
            voluptas, eaque ullam neque sint amet quia necessitatibus? Repellat
            distinctio corporis enim, odit itaque ipsum voluptas, modi ad minima
            necessitatibus, dolore in!
          </p>
        </div>
      </div>
      <div className="liquid-glass">
          {/* liquid glass */}
        </div>
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
