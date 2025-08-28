import React, { useContext, useEffect, useRef, useState } from "react";
import "./Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MealCard from "../../Components/MealCard/MealCard";
import WorkoutCard from "../../Components/WorkoutCard/WorkoutCard";
import Calories from "../../Components/Calories/Calories";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Ads from "../../Components/Ads/Ads";
import { useNavigate } from "react-router-dom";
import NoteContext from "../../Context/FeastContext";
import glass from "../../Assets/glassbg.jpeg"
import interact from "interactjs";
import Loading from "../../Components/Loading/Loading";

const Home = () => {
  const cardRef = useRef(null);
  const position = useRef({ x: 0, y: 0 });
  const { feast, getFeast } = useContext(NoteContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState("active");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getFeast();
      setTimeout(() => {
        setLoadingStatus("disactive");
      }, 2000);
      setTimeout(() => {
        setLoading(false);
      }, 2500);
    }
  }, [navigate]);

  // Parse API response
  const userDataa = feast?.map((i) => {
    try {
      const cleaned = i?.mealFitness?.replace(/```json|```/g, "").trim();
      return JSON.parse(cleaned);
    } catch (err) {
      console.error("Error parsing mealFitness", err);
      return null;
    }
  });

  // safely get API object
  const userData = userDataa && userDataa[0];
  localStorage.setItem(
    "motivationalTip",
    JSON.stringify(userData?.motivationalTip)
  );

  // console.log(userData, "userData from API");

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  // find today's meal + workout
  const todayMealPlan = userData?.mealPlan?.find((item) => item.day === today);
  const todayWorkoutPlan = userData?.workoutPlan?.find(
    (item) => item.day === today
  );

  const handleClose = () => {
    setIsScrolled(false);
  };

  const handleSevenDaysWorkout = (type) => {
    navigate("/sevendays", { state: { type: type } });
  };

  useEffect(() => {
    if (!cardRef.current) return;

    const interactable = interact(cardRef.current).draggable({
      listeners: {
        move(event) {
          position.current.x += event.dx;
          position.current.y += event.dy;

          event.target.style.transform =
            `translate(${position.current.x}px, ${position.current.y}px)`;
        },
      },
    });

    return () => {
      if (interactable) interactable.unset(); // safely remove
    };
  }, []);

  if (loading) {
    return <Loading status={loadingStatus} />
  }

  return (
    <div className="Home">
      <div className="Home-main">
        {userData && <Calories userData={userData} />}
        <div className={`home-scroll ${isScrolled ? "scrolled" : ""}`}>
          <div className="home-scroll-box">
            <h5>
              {isScrolled && <ChevronLeft onClick={handleClose} />} Today's Meal
              Plan ({todayMealPlan?.day})
            </h5>
            <div className="meal-plan-box">
              {todayMealPlan && (
                <MealCard mealPlan={[todayMealPlan]} isScrolled={isScrolled} />
              )}
            </div>
            <h6 className="seven-day-buttons" onClick={() => handleSevenDaysWorkout("meal")}>
              7 Days Meals <ChevronRight />
            </h6>

            <h5>Today's Workout Plan ({todayWorkoutPlan?.day})</h5>
            <div className="exercise-box">
              {todayWorkoutPlan && (
                <WorkoutCard workoutPlan={todayWorkoutPlan.exercises} />
              )}
            </div>
            <h6 className="seven-day-buttons" onClick={() => handleSevenDaysWorkout("workout")}>
              7 Days Workout <ChevronRight />
            </h6>
            <Ads />
            <div className="importantConsiderations-box">
              <h5>Important Considerations</h5>
              <ul>
                {userData?.importantConsiderations?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
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
    </div>
  );
};

export default Home;
