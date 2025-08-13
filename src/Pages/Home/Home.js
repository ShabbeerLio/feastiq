import React, { useEffect, useState } from "react";
import "./Home.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MealCard from "../../Components/MealCard/MealCard";
import WorkoutCard from "../../Components/WorkoutCard/WorkoutCard";
import Calories from "../../Components/Calories/Calories";
import { ChevronLeft } from "lucide-react";
import UserData from "../../UserData";

const Home = () => {

  const userData = UserData;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
  };
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  // console.log(today)
  const todayMealPlan = userData.mealPlan.find(item => item.day === today);
  const todayWorkoutPlan = userData.workoutPlan.find(item => item.day === today);
  const handleClose = () => {
    setIsScrolled(false);
  }
  return (
    <div className="Home">
      <div className="Home-main">

        <Calories userData={userData}/>
        <div className={`home-scroll ${isScrolled ? "scrolled" : ""}`}>
          <div className="home-scroll-box">
            {/* <div className="meal-plan-box"> */}
            <h5>
              {isScrolled && <ChevronLeft
                onClick={handleClose} />}
              Today's Meal Plan ({todayMealPlan?.day})
            </h5>
            <div className="meal-plan-box">
              <MealCard mealPlan={[todayMealPlan]} isScrolled={isScrolled} />
            </div>
            <h5>Today's Workout Plan (Monday)</h5>
            <div className="exercise-box">
              <WorkoutCard workoutPlan={todayWorkoutPlan.exercises} />
            </div>
            <div className="meal-all-box">
              <h5>7 Days Meal Plan</h5>
              <Slider {...settings} className="banner-slider">
                <div className="meal-plan-item">
                  <div className="meal-plan-card">
                    <p><span>Monday</span></p>
                    <p><span>Breakfast</span>: Oatmeal with fruits</p>
                    <p><span>Lunch</span>: Grilled chicken salad</p>
                    <p><span>snacks</span>: Dry fruits and fruits</p>
                    <p><span>Dinner</span>: Baked salmon with veggies</p>
                  </div>
                </div>
                <div className="meal-plan-item">
                  <div className="meal-plan-card">
                    <p><span>Tuesday</span></p>
                    <p><span>Breakfast</span>: Oatmeal with fruits</p>
                    <p><span>Lunch</span>: Grilled chicken salad</p>
                    <p><span>snacks</span>: Dry fruits and fruits</p>
                    <p><span>Dinner</span>: Baked salmon with veggies</p>
                  </div>
                </div>
                <div className="meal-plan-item">
                  <div className="meal-plan-card">
                    <p><span>Wednesday</span></p>
                    <p><span>Breakfast</span>: Oatmeal with fruits</p>
                    <p><span>Lunch</span>: Grilled chicken salad</p>
                    <p><span>snacks</span>: Dry fruits and fruits</p>
                    <p><span>Dinner</span>: Baked salmon with veggies</p>
                  </div>
                </div>
                <div className="meal-plan-item">
                  <div className="meal-plan-card">
                    <p><span>Thursday</span></p>
                    <p><span>Breakfast</span>: Oatmeal with fruits</p>
                    <p><span>Lunch</span>: Grilled chicken salad</p>
                    <p><span>snacks</span>: Dry fruits and fruits</p>
                    <p><span>Dinner</span>: Baked salmon with veggies</p>
                  </div>
                </div>
                <div className="meal-plan-item">
                  <div className="meal-plan-card">
                    <p><span>Friday</span></p>
                    <p><span>Breakfast</span>: Oatmeal with fruits</p>
                    <p><span>Lunch</span>: Grilled chicken salad</p>
                    <p><span>snacks</span>: Dry fruits and fruits</p>
                    <p><span>Dinner</span>: Baked salmon with veggies</p>
                  </div>
                </div>
              </Slider >
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;