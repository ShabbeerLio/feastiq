import React, { useEffect, useState } from "react";
import gym from "../../Assets/gym.png";
import "./Calories.css";
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Calories = ({ meal, mealplate, userData }) => {
  const Host = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("token");
  const [dailyMeals, setDailyMeal] = useState();
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

  const [mealCalories, setMealCalories] = useState(0);
  const [mealProtein, setMealProtein] = useState(0);
  const [mealCarbs, setMealCarbs] = useState(0);
  const [mealFats, setMealFats] = useState(0);

  useEffect(() => {
    if (meal) {
      const animateValue = (target, setter, duration = 700) => {
        let start = 0;
        const increment = target / (duration / 16);
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

      animateValue(meal.calories || 0, setMealCalories);
      animateValue(meal.protein || 0, setMealProtein);
      animateValue(meal.carbs || 0, setMealCarbs);
      animateValue(meal.fats || 0, setMealFats);
    }
  }, [meal]);

  const motivationalTip = localStorage.getItem("motivationalTip")


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${Host}/detail/dailyMeals`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const json = await response.json();
        setDailyMeal(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [Host, token]);


  //   console.log(dailyMeal,"dailyMeal")
  const todayDate = new Date().toISOString().split("T")[0];
  //   console.log(todayDate,"todayDate")
  const todayPlan = dailyMeals?.find(
    (d) => new Date(d.date).toISOString().split("T")[0] === todayDate
  );

  const targetCalories = calories + protein + carbs + fats;
  const toatalPlannedCalories = todayPlan?.totals?.calories + todayPlan?.totals?.protein + todayPlan?.totals?.carbs + todayPlan?.totals?.fats;
  const percentage = targetCalories ? (toatalPlannedCalories / targetCalories) * 100 : 0;
  // console.log(percentage, "percentage")

  return (
    <div className="glass-container liquid-glass">
      {meal ? (
        <div className="thebox">
          <div
            className={`home-imag mealtype ${mealplate ? "mealplate" : ""}`}
          >
            <img src={meal?.image} alt={meal?.type || "Meal"} />
          </div>
          <div className="home-text-box">
            <div className="home-text-card">
              <div className="progress-wrapper">
                <CircularProgressbar
                  value={mealCalories}
                  maxValue={meal?.calories}
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
                <h2>{mealCalories}</h2>
                <p>calories</p>
              </div>
            </div>
            <div className="home-text-card">
              <div className="progress-wrapper">
                <CircularProgressbar
                  value={mealProtein}
                  maxValue={meal?.protein}
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
                <h2>{mealProtein}</h2>
                <p>protein (g)</p>
              </div>
            </div>
            <div className="home-text-card">
              <div className="progress-wrapper">
                <CircularProgressbar
                  value={mealCarbs}
                  maxValue={meal?.carbs}
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
                <h2>{mealCarbs}</h2>
                <p>carbs (g)</p>
              </div>
            </div>
            <div className="home-text-card">
              <div className="progress-wrapper">
                <CircularProgressbar
                  value={mealFats}
                  maxValue={meal?.fats}
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
                <h2>{mealFats}</h2>
                <p>fats (g)</p>
              </div>
            </div>
          </div>
          <p className="motivation">{motivationalTip}</p>
        </div>
      ) : (
        <div className="thebox">
          {/* Calorie Breakdown */}
          <div className="progress-wrapper">
            <CircularProgressbar
              value={percentage || 0}
              text={percentage ? `${Math.round(percentage)}%` : "0%"}
              maxValue={100}
              strokeWidth={18}
              styles={buildStyles({
                textSize: "16px",
                textWeight: "700",
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
                  value={todayPlan?.totals?.calories || 0}
                  maxValue={calories}
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
                <h2> <span>{todayPlan?.totals?.calories || 0}</span>/{calories}</h2>
                <p>calories</p>
              </div>
            </div>
            <div className="home-text-card">
              <div className="progress-wrapper">
                <CircularProgressbar
                  value={todayPlan?.totals?.protein || 0}
                  maxValue={protein}
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
                <h2><span>{todayPlan?.totals?.protein || 0}</span>/{protein}</h2>
                <p>protein (g)</p>
              </div>
            </div>
            <div className="home-text-card">
              <div className="progress-wrapper">
                <CircularProgressbar
                  value={todayPlan?.totals?.carbs || 0}
                  maxValue={carbs}
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
                <h2><span>{todayPlan?.totals?.carbs || 0}</span>/{carbs}</h2>
                <p>carbs (g)</p>
              </div>
            </div>
            <div className="home-text-card">
              <div className="progress-wrapper">
                <CircularProgressbar
                  value={todayPlan?.totals?.fats || 0}
                  maxValue={fats}
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
                <h2><span>{todayPlan?.totals?.fats || 0}</span>/{fats}</h2>
                <p>fats (g)</p>
              </div>
            </div>
          </div>
          <p className="motivation">{motivationalTip}</p>
        </div>
      )}
    </div>
  );
};

export default Calories;