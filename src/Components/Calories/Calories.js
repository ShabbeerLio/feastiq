import React from "react";
import gym from "../../Assets/gym.png";
import "./Calories.css";
import UserData from "../../UserData";

const Calories = ({ meal }) => {
  const userData = UserData;

  return (
    <div className="glass-container">
      {meal ? (
        <>
          <div className="home-imag mealtype">
            <img src={meal?.image} alt={meal?.type || "Meal"} />
          </div>
          <p className="motivation">{userData?.motivationalTip}</p>
        </>
      ) : (
        <>
          {/* Calorie Breakdown */}
          <div className="home-imag">
            <img src={gym} alt="Calories" />
          </div>
          <h5 className="home-title">Calorie Breakdown</h5>
          <div className="home-text-box">
            <div className="home-text-card">
              <h2>{userData?.calorieBreakdown?.calories}</h2>
              <p>calories</p>
            </div>
            <div className="home-text-card">
              <h2>{userData?.calorieBreakdown?.protein}</h2>
              <p>protein (g)</p>
            </div>
            <div className="home-text-card">
              <h2>{userData?.calorieBreakdown?.carbs}</h2>
              <p>carbs (g)</p>
            </div>
            <div className="home-text-card">
              <h2>{userData?.calorieBreakdown?.fats}</h2>
              <p>fats (g)</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Calories;