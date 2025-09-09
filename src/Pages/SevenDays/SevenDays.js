import React, { useContext, useEffect, useState } from "react";
import Calories from "../../Components/Calories/Calories";
import Ads from "../../Components/Ads/Ads";
import NoteContext from "../../Context/FeastContext";
import "./SevenDays.css";
import { useLocation, useNavigate } from "react-router-dom";
import glass from "../../Assets/glassbg.jpeg"
import meal1 from "../../Assets/Meal/breakfast.png";
import meal2 from "../../Assets/Meal/lunch.png";
import meal3 from "../../Assets/Meal/snacks.png";
import meal4 from "../../Assets/Meal/dinner.png";
import { ChevronDown, ChevronLeft } from "lucide-react";

const mealImages = {
  breakfast: meal1,
  lunch: meal2,
  snacks: meal3,
  dinner: meal4,
};

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

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
          const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
      
            // how much user has scrolled in %
            const scrolledPercent = (scrollTop + windowHeight) / docHeight * 100;
      
            if (scrolledPercent >= 99) {
              setIsScrolled(true);
            } else {
              setIsScrolled(false);
            }
          };
  
          setTimeout(() => setIsScrolled(false), 500);
      
          window.addEventListener("scroll", handleScroll);
          return () => window.removeEventListener("scroll", handleScroll);
        }, []);

  const handleClose = () => setIsScrolled(false);

  return (
    <div className="Home">
      <div className="Home-main">
        {userData && <Calories userData={userData} />}
        <div className={`home-scroll ${isScrolled ? "scrolled" : ""} mealtype`}>
          <div className="home-scroll-box">
            <div className="subscription-list">
              <div className="headerfornavigate">
                <h5 className="mealdetail-title"> <ChevronLeft
                  className="cursor-pointer"
                  onClick={() => navigate(-1)}
                /> {viewType === "meal"
                  ? "7 Days Meal Plan"
                  : "7 Days Workout Plan"}</h5>
                <h5>{isScrolled && <ChevronDown onClick={handleClose} />}</h5>
              </div>

              {viewType === "meal" ? (
                mealPlan.length > 0 ? (
                  mealPlan.map((day, idx) => (
                    <div key={idx} className="meal-plan-card top ">
                      <h4>{day.day}</h4>
                      <div className="meal-item sevendays">
                        <img src={mealImages["breakfast"]} alt={'Breakfast'} />
                        <div className="mealitem-details">
                          <strong>Breakfast:</strong> {day.breakfast.meal} (
                          {day.breakfast.calories} kcal, {day.breakfast.protein}g
                          protein)
                        </div>
                      </div>
                      <div className="meal-item sevendays">
                        <img src={mealImages["lunch"]} alt={"Lunch"} />
                        <div className="mealitem-details">
                          <strong>Lunch:</strong> {day.lunch.meal} (
                          {day.lunch.calories} kcal, {day.lunch.protein}g protein)
                        </div>
                      </div>
                      <div className="meal-item sevendays">
                        <img src={mealImages["snacks"]} alt={"Snacks"} />
                        <div className="mealitem-details">
                          <strong>Snacks:</strong> {day.snacks.meal} (
                          {day.snacks.calories} kcal, {day.snacks.protein}g
                          protein)
                        </div>
                      </div>
                      <div className="meal-item sevendays">
                        <img src={mealImages["dinner"]} alt={"Dinner"} />
                        <div className="mealitem-details">
                          <strong>Dinner:</strong> {day.dinner.meal} (
                          {day.dinner.calories} kcal, {day.dinner.protein}g
                          protein)
                        </div>
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

export default SevenDays;
