import React, { useEffect, useState } from "react";
import "./CalorieHistory.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const CalorieHistory = () => {
  const [dailyMeals, setDailyMeal] = useState();
  const Host = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("token");

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

  console.warn = (message) =>
    message.includes("Buffer size mismatch") ? null : console.warn(message);

  return (
    <div className="Home">
      <div className="Home-main">
        <div className="glass-container">
          <div className="otherpage-box">
            <div className="wallet-status">
              <DotLottieReact
                className="wallet-success"
                src="https://lottie.host/5f7a12ee-88d4-4db0-947f-517892e40aee/jfx11DB4Ky.lottie"
                loop
                autoplay
              />
            </div>
            <h5>Calorie History</h5>
          </div>
        </div>
        <div className="Other-pages-box">
          <div className="history-card">
            <p className="history-subtitle">
              View your today's and past Calorie.
            </p>
            <div className="subscription-list">
              {dailyMeals?.length > 0 ? (
                dailyMeals
                  .sort((a, b) => new Date(b.date) - new Date(a.date)) // sort by date DESC
                  .slice(0, 7) // take only 7 latest days
                  .map((day, idx) => (
                    <div key={idx} className="subscription-item">
                      <h6 className="calorie-history-title">
                        {new Date(day.date).toLocaleDateString()}
                      </h6>
                      {/* Meals Section */}
                      <div className="subscription-details">
                        <p>
                          <strong>Calories:</strong> {day.totals?.calories || 0}{" "}
                          kcal
                        </p>
                        <p>
                          <strong>Protein:</strong> {day.totals?.protein || 0} g
                        </p>
                        <p>
                          <strong>Fats:</strong> {day.totals?.fats || 0} g
                        </p>
                        <p>
                          <strong>Carbs:</strong> {day.totals?.carbs || 0} g
                        </p>
                      </div>
                      <div className="meals-list">
                        {day.meals.map((meal, i) => (
                          <div key={i} className={`meal-item ${meal.status}`}>
                            <h6>{meal.type} </h6>
                            <p>
                              <strong>Calories:</strong> {meal.calories} kcal
                            </p>
                            <p>
                              <strong>Protein:</strong> {meal.protein} g
                            </p>
                            <p>
                              <strong>Fats:</strong> {meal.fats} g
                            </p>
                            <p>
                              <strong>Carbs:</strong> {meal.carbs} g
                            </p>
                            <div className="subscription-header">
                              <h5>{meal.plan}</h5>
                              <span
                                className={`status-badge ${
                                  meal.status === "completed"
                                    ? "active"
                                    : "expired"
                                }`}
                              >
                                {meal.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
              ) : (
                <p>No history available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalorieHistory;
