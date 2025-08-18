import React from "react";
import gym from "../../Assets/gym.png";
import "./Calories.css";
import UserData from "../../UserData";
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Calories = ({ meal, mealplate }) => {
  const userData = UserData;

  return (
    <div className="glass-container">
      {meal ? (
        <>
          <div
            className={`home-imag mealtype ${mealplate ? "mealplate" : ""}`}
          >
            <img src={meal?.image} alt={meal?.type || "Meal"} />
          </div>
          <p className="motivation">{userData?.motivationalTip}</p>
        </>
      ) : (
        <>
          {/* Calorie Breakdown */}
          <div className="progress-wrapper">
            <CircularProgressbar
              value={userData?.calorieBreakdown?.calories}
              maxValue={30000} // You can set based on user target calories
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
                  value={userData?.calorieBreakdown?.calories}
                  maxValue={30000} // You can set based on user target calories
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
                <h2>{userData?.calorieBreakdown?.calories}</h2>
                <p>calories</p>
              </div>
            </div>
            <div className="home-text-card">
              <div className="progress-wrapper">
                <CircularProgressbar
                  value={userData?.calorieBreakdown?.protein}
                  maxValue={30000} // You can set based on user target calories
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
                <h2>{userData?.calorieBreakdown?.protein}</h2>
                <p>protein (g)</p>
              </div>
            </div>
            <div className="home-text-card">
              <div className="progress-wrapper">
                <CircularProgressbar
                  value={userData?.calorieBreakdown?.carbs}
                  maxValue={30000} // You can set based on user target calories
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
                <h2>{userData?.calorieBreakdown?.carbs}</h2>
                <p>carbs (g)</p>
              </div>
            </div>
            <div className="home-text-card">
              <div className="progress-wrapper">
                <CircularProgressbar
                  value={userData?.calorieBreakdown?.fats}
                  maxValue={30000} // You can set based on user target calories
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
                <h2>{userData?.calorieBreakdown?.fats}</h2>
                <p>fats (g)</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Calories;
