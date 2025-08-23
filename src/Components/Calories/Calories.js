import React, { useEffect, useState } from "react";
import gym from "../../Assets/gym.png";
import "./Calories.css";
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Calories = ({meal, mealplate ,userData}) => {

  // Animated states
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);

  useEffect(() => {
    // Helper function for smooth increment
    const animateValue = (target, setter, duration = 700) => {
      let start = 0;
      const increment = target / (duration / 16); // 60fps approx
      const interval = setInterval(() => {
        start += increment;
        if (start >= target) {
          setter(target);
          clearInterval(interval);
        } else {
          setter(Math.floor(start));
        }
      }, 16);
    };

    animateValue(userData?.calorieBreakdown?.calories || 0, setCalories);
    animateValue(userData?.calorieBreakdown?.protein || 0, setProtein);
    animateValue(userData?.calorieBreakdown?.carbs || 0, setCarbs);
    animateValue(userData?.calorieBreakdown?.fats || 0, setFats);
  }, [userData]);

  const motivationalTip = localStorage.getItem("motivationalTip")

  return (
    <div className="glass-container">
      {meal ? (
        <>
          <div
            className={`home-imag mealtype ${mealplate ? "mealplate" : ""}`}
          >
            <img src={meal?.image} alt={meal?.type || "Meal"} />
          </div>
          <p className="motivation">{motivationalTip}</p>
        </>
      ) : (
        <>
          {/* Calorie Breakdown */}
          <div className="progress-wrapper">
            <CircularProgressbar
              value={calories}
              maxValue={30000}
              strokeWidth={16}
              styles={buildStyles({
                textSize: "12px",
                pathColor: "#8cff00ff",
                textColor: "#b0ff98ff",
                trailColor: "#deffb5ff",
              })}
            />
          </div>

          <h5 className="home-title">Calorie Breakdown</h5>
          <div className="home-text-box">
            <div className="home-text-card">
              <div className="progress-wrapper">
                <CircularProgressbar
                  value={calories}
                  maxValue={30000}
                  strokeWidth={20}
                  styles={buildStyles({
                    textSize: "12px",
                    pathColor: "#1f90edff",
                    textColor: "#71b6efff",
                    trailColor: "#d9e5ef",
                  })}
                />
              </div>
              <div className="home-text-card-item ">
                <h2>{calories}</h2>
                <p>calories</p>
              </div>
            </div>
            <div className="home-text-card">
              <div className="progress-wrapper">
                <CircularProgressbar
                  value={protein}
                  maxValue={30000}
                  strokeWidth={20}
                  styles={buildStyles({
                    textSize: "12px",
                    pathColor: "#1f90edff",
                    textColor: "#71b6efff",
                    trailColor: "#d9e5ef",
                  })}
                />
              </div>
              <div className="home-text-card-item">
                <h2>{protein}</h2>
                <p>protein (g)</p>
              </div>
            </div>
            <div className="home-text-card">
              <div className="progress-wrapper">
                <CircularProgressbar
                  value={carbs}
                  maxValue={30000}
                  strokeWidth={20}
                  styles={buildStyles({
                    textSize: "12px",
                    pathColor: "#1f90edff",
                    textColor: "#71b6efff",
                    trailColor: "#d9e5ef",
                  })}
                />
              </div>
              <div className="home-text-card-item">
                <h2>{carbs}</h2>
                <p>carbs (g)</p>
              </div>
            </div>
            <div className="home-text-card">
              <div className="progress-wrapper">
                <CircularProgressbar
                  value={fats}
                  maxValue={30000}
                  strokeWidth={20}
                  styles={buildStyles({
                    textSize: "12px",
                    pathColor: "#1f90edff",
                    textColor: "#71b6efff",
                    trailColor: "#d9e5ef",
                  })}
                />
              </div>
              <div className="home-text-card-item">
                <h2>{fats}</h2>
                <p>fats (g)</p>
              </div>
            </div>
          </div>
            <p className="motivation">{motivationalTip}</p>
        </>
      )}
    </div>
  );
};

export default Calories;