import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import Calories from "../../Components/Calories/Calories";
import Ads from "../../Components/Ads/Ads";
import NoteContext from "../../Context/FeastContext";
import "./SevenDays.css";
import { useLocation, useNavigate } from "react-router-dom";

const SevenDays = () => {
  const { feast, getFeast } = useContext(NoteContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getFeast();
    }
  }, [navigate]);

  // figure out what to show (meal or workout)
  const viewType = location.state?.type || "meal"; // default "meal"

  // Parse JSON safely
  const userDataa = feast?.map((i) => {
    try {
      const cleaned = i?.mealFitness?.replace(/```json|```/g, "").trim();
      return JSON.parse(cleaned);
    } catch (err) {
      console.error("Error parsing mealFitness", err);
      return null;
    }
  });

  const userData = userDataa && userDataa[0];

  const mealPlan = userData?.mealPlan || [];
  const workoutPlan = userData?.workoutPlan || [];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
  };

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="Home">
      <div className="Home-main">
        {userData && <Calories userData={userData} />}
        <div className={`home-scroll ${isScrolled ? "scrolled" : ""} mealtype`}>
          <div className="home-scroll-box">
            {/* <div className="meal-all-box">
              <h5>7 Days Meal Plan</h5>
              <Slider {...settings} className="banner-slider">
                
              </Slider>
              <Ads/>
            </div> */}

            <div className="subscription-list">
              <h5>
                {viewType === "meal"
                  ? "7 Days Meal Plan"
                  : "7 Days Workout Plan"}
              </h5>

              {viewType === "meal" ? (
                mealPlan.length > 0 ? (
                  mealPlan.map((day, idx) => (
                    <div key={idx} className="meal-plan-card top ">
                      <h4>{day.day}</h4>
                      <div className="meal-item">
                        <strong>Breakfast:</strong> {day.breakfast.meal} (
                        {day.breakfast.calories} kcal, {day.breakfast.protein}g
                        protein)
                      </div>
                      <div className="meal-item">
                        <strong>Lunch:</strong> {day.lunch.meal} (
                        {day.lunch.calories} kcal, {day.lunch.protein}g protein)
                      </div>
                      <div className="meal-item">
                        <strong>Dinner:</strong> {day.dinner.meal} (
                        {day.dinner.calories} kcal, {day.dinner.protein}g
                        protein)
                      </div>
                      <div className="meal-item">
                        <strong>Snacks:</strong> {day.snacks.meal} (
                        {day.snacks.calories} kcal, {day.snacks.protein}g
                        protein)
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No meal plan data available.</p>
                )
              ) : workoutPlan.length > 0 ? (
                workoutPlan.map((day, idx) => (
                  <div key={idx} className="meal-plan-card top ">
                    <h4>{day.day}</h4>
                    <ul>
                      {day.exercises.map((exercise, i) => (
                        <li key={i}>
                          <strong>{exercise.name}</strong> – {exercise.sets}{" "}
                          sets × {exercise.reps} reps
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p>No workout plan data available.</p>
              )}
              <Ads />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SevenDays;
