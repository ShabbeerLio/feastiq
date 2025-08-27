import React, { useContext, useEffect, useState } from "react";
import "./CalorieHistory.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NoteContext from "../../Context/FeastContext";
import { useNavigate } from "react-router-dom";
import CalorieGraph from "./CalorieGraph";
import glass from "../../Assets/glassbg.jpeg"

const overviewVariants = {
  initial: { x: "-100%", opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } },
  exit: { x: "-100%", opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } } // close left
};

const recipeVariants = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } },
  exit: { x: "100%", opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } } // close right
};

const CalorieHistory = () => {
  const { feast, getFeast } = useContext(NoteContext);
  const navigate = useNavigate();
  const dailyMeals = feast.flatMap((i) => i.dailyMeals);
  const [showRecipe, setShowRecipe] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getFeast();
    }
  }, [navigate]);

  console.warn = (message) =>
    message.includes("Buffer size mismatch") ? null : console.warn(message);

  // console.log(feast,"feast")

  const [metric, setMetric] = useState("calories");
  const [weeklyData, setWeeklyData] = useState();

  return (
    <div className="Home">
      <div className="Home-main">
        <div className="glass-container liquid-glass">
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
            <div className="history-subtitle calorie">
              <p>Your today's and past Calorie.</p>
              {showRecipe === true ?
                <button onClick={() => setShowRecipe(false)}><ChevronLeft />View Graph</button>
                :
                <button onClick={() => setShowRecipe(true)}>View   List<ChevronRight /></button>
              }

            </div>
            <AnimatePresence mode="wait">
              {!showRecipe ? (
                <motion.div
                  key="overview"
                  variants={overviewVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset }) => {
                    if (offset.x < -100) setShowRecipe(true); // swipe left → open recipe
                  }}
                  className="home-scroll-box"
                >
                  <div className="subscription-list">
                    <CalorieGraph/>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="recipe"
                  variants={recipeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset }) => {
                    if (offset.x > 100) setShowRecipe(false); // swipe right → back to overview
                  }}
                  className="home-scroll-box"
                >
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
                                      className={`status-badge ${meal.status === "completed"
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="liquid-glass">
                {/* liquid glass */}
              </div>
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

export default CalorieHistory;
