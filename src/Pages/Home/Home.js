import React, { useEffect, useState } from "react";
import "./Home.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MealCard from "../../Components/MealCard/MealCard";
import WorkoutCard from "../../Components/WorkoutCard/WorkoutCard";
import Calories from "../../Components/Calories/Calories";
import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react";
import UserData from "../../UserData";
import Ads from "../../Components/Ads/Ads";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const userData = UserData;
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  // console.log(today)
  const todayMealPlan = userData.mealPlan.find(item => item.day === today);
  const todayWorkoutPlan = userData.workoutPlan.find(item => item.day === today);
  const handleClose = () => {
    setIsScrolled(false);
  }
   const handleSevenDays = () => {
        navigate("/sevendays");
    };
  return (
    <div className="Home">
      <div className="Home-main">

        <Calories userData={userData}/>
        <div className={`home-scroll ${isScrolled ? "scrolled" : ""}`}>
          <div className="home-scroll-box">
            {/* <div className="meal-plan-box"> */}
            <h5>{isScrolled && <ChevronLeft onClick={handleClose}/>} Today's Meal Plan ({todayMealPlan?.day})</h5>
            <div className="meal-plan-box">
              <MealCard mealPlan={[todayMealPlan]} isScrolled={isScrolled} />
            </div>
              <h6 className="seven-day-buttons" onClick={handleSevenDays}>7 Days Meals <ChevronRight /></h6>
            <h5>Today's Workout Plan ({todayMealPlan?.day})</h5>
            <div className="exercise-box">
              <WorkoutCard workoutPlan={todayWorkoutPlan.exercises} />
            </div>
              <h6 className="seven-day-buttons" onClick={handleSevenDays}>7 Days Workout <ChevronRight /></h6>
            <Ads/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;