import React, { useContext, useEffect, useState } from "react";
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

const Home = () => {
  const { feast, getFeast } = useContext(NoteContext);
  const [isScrolled, setIsScrolled] = useState(false);
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
