import React from "react";
import gym from "../../Assets/gym.png";
import "./Calories.css";
import UserData from "../../UserData";

const Calories = ({meal }) => {
    const userData = UserData;
//   console.log(meal, "meal in Calories component");
  return (
    <div className="glass-container">
      {meal ? (
        <>
          <div className="home-imag mealtype">
            <img src={meal?.image} alt="" />
          </div>
          <p className="motivation">
            {userData?.motivationalTip}
          </p>
          {/* <h5 className="home-title">{meal?.type}</h5> */}
        </>
      ) : (
        <>
          <div className="home-imag">
            <img src={gym} alt="" />
          </div>
          <h5 className="home-title">Calorie Breakdown</h5>
          <div className="home-text-box">
            <div className="home-text-card">
              <h2>2800 </h2>
              <p>calories</p>
            </div>
            <div className="home-text-card">
              <h2>175 </h2>
              <p>protein</p>
            </div>
            <div className="home-text-card">
              <h2>350 </h2>
              <p>carbs</p>
            </div>
            <div className="home-text-card">
              <h2>87.5 </h2>
              <p>fats</p>
            </div>
          </div>
          <p className="motivation">
            {userData.motivationalTip}
          </p>
        </>
      )}
    </div>
  );
};

export default Calories;
