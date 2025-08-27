import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Calories from "../../Components/Calories/Calories";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import mbg4 from "../../Assets/Workout/workout.jpg";
import Ads from "../../Components/Ads/Ads";
import { FaYoutube } from "react-icons/fa";
import "./WorkoutDetail.css";
import glass from "../../Assets/glassbg.jpeg";

const WorkoutDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(true);
  const handleClose = () => setIsScrolled(false);
  const [mealplate, setMealplate] = useState(true);
  const exerciseInfo =
    state?.exerciseInfo || JSON.parse(localStorage.getItem("exerciseInfo"));

  // console.log(exerciseInfo, "exerciseInfo")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1);
    };
    window.addEventListener("scroll", handleScroll);

    setTimeout(() => setIsScrolled(false), 500);
    setTimeout(() => setMealplate(false), 1000);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSevenDaysWorkout = (type) => {
    navigate("/sevendays", { state: { type: type } });
  };

  const [mealStatus, setMealStatus] = useState(
    localStorage.getItem(`workoutStatus-${exerciseInfo?.name}`) || null
  );

  const handleComplete = () => {
    setMealStatus("completed");
    localStorage.setItem(`workoutStatus-${exerciseInfo?.name}`, "completed");
  };

  const handleSkip = () => {
    setMealStatus("skipped");
    localStorage.setItem(`workoutStatus-${exerciseInfo?.name}`, "skipped");
  };

  return (
    <div className="Home">
      <div className="Home-main workout">
        <Calories meal={exerciseInfo} mealplate={mealplate} />
        <div className={`home-scroll ${isScrolled ? "scrolled" : ""} mealtype`}>
          <h5 className="mealdetail-title">
            {isScrolled && <ChevronLeft onClick={handleClose} />}
            {""}
            Workout Details <span></span>
          </h5>
          <div className="recipie-box">
            <div className="recipie-item-card">
              <img src={mbg4} alt="" />
              <div className="mealDetail-header workout liquid-glass">
                <div className="wallet-status">
                  <DotLottieReact
                    className="wallet-success"
                    src="https://lottie.host/fe1dcf17-8aab-4cbf-bf48-390567abcc6a/ObbRNaLve1.lottie"
                    loop
                    autoplay
                  />
                </div>
                <p>{exerciseInfo.name}</p>
              </div>
              {/* <h6 onClick={() => setShowRecipe(true)}>
                                Ingredients and Steps <ChevronRight />
                                </h6> */}
            </div>
          </div>
          <div className="meal-actions">
            {mealStatus === null && (
              <>
                <button className="btn-complete" onClick={handleComplete}>
                  Completed
                </button>
                <button className="btn-skip" onClick={handleSkip}>
                  Skip
                </button>
              </>
            )}

            {mealStatus === "completed" && (
              <p className="status completed">🎉 Workout Completed!</p>
            )}

            {mealStatus === "skipped" && (
              <p className="status skipped">⏭️ Workout Skipped</p>
            )}
          </div>
          <div className="recipie-card youtube">
            <Link to="https://youtu.be/WaTZTULwmGU?si=kFaNYiydNBCJ881J">
              <FaYoutube /> How to do this Exercise <ChevronRight />
            </Link>
          </div>
          <h6
            className="seven-day-buttons meal"
            onClick={() => handleSevenDaysWorkout("workout")}
          >
            7 Days Workout <ChevronRight />
          </h6>
          <Ads />
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

export default WorkoutDetail;
