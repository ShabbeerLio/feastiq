import React, { useContext, useEffect, useState } from "react";
import "./CalorieHistory.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NoteContext from "../../Context/FeastContext";
import { useNavigate } from "react-router-dom";
import CalorieGraph from "./CalorieGraph";
import glass from "../../Assets/glassbg.jpeg"
import Ads from "../../Components/Ads/Ads";
import Reaction from "../../Components/Reaction/Reaction";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

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
  const [filter, setFilter] = useState("week");
  const [isScrolled, setIsScrolled] = useState(false);

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getFeast();
    }
  }, [navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  console.warn = (message) =>
    message.includes("Buffer size mismatch") ? null : console.warn(message);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const filterMeals = (meals, filter) => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, 1);
    const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 6, 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 6); // last 7 days (today included)

    return meals.filter((day) => {
      const date = new Date(day.date);
      switch (filter) {
        case "week":
          return date >= oneWeekAgo;
        case "month":
          return date >= startOfMonth;
        case "3months":
          return date >= threeMonthsAgo;
        case "6months":
          return date >= sixMonthsAgo;
        case "year":
          return date >= startOfYear;
        default:
          return true; // "all"
      }
    });
  };

  const filteredMeals = filterMeals(dailyMeals, filter);

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

  // Define your targets
  const CALORIE_TARGET_PER_DAY = userData?.calorieBreakdown.calories;
  const WORKOUT_TARGET_PER_DAY = userData?.calorieBreakdown.calories;

  // 🔹 Calculate range (based on current filter)
  const rangeMeals = filterMeals(dailyMeals, filter);

  // 🔹 Get actual date range length (not just logged days)
  let numDays = 0;
  const today = new Date();

  switch (filter) {
    case "week":
      numDays = 7;
      break;
    case "month":
      numDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate(); // days in month
      break;
    case "3months":
      numDays = 90;
      break;
    case "6months":
      numDays = 180;
      break;
    case "year":
      numDays = 365;
      break;
    default:
      numDays = rangeMeals.length; // fallback
  }

  // Sum actual calories + workouts
  const totalCalories = rangeMeals.reduce((acc, day) => acc + (day?.totals?.calories || 0), 0);
  const totalWorkout = rangeMeals.reduce((acc, day) => {
    return acc + (day?.totals?.burned || 0);
  }, 0);

  // Targets
  const calorieTarget = CALORIE_TARGET_PER_DAY * numDays;
  const workoutTarget = WORKOUT_TARGET_PER_DAY * numDays;

  // Percentages
  const caloriePercent = calorieTarget > 0 ? Math.min(Math.round((totalCalories / calorieTarget) * 100), 100) : 0;
  const workoutPercent = workoutTarget > 0 ? Math.min(Math.round((totalWorkout / workoutTarget) * 100), 100) : 0;

  return (
    <div className="Home">
      <div className="Home-main">
        <div className="glass-container liquid-glass">
          <div className="otherpage-box">
            <div className="wallet-status">
              <Reaction meals={filteredMeals} filter={filter} />
              {/* <DotLottieReact
                className="wallet-success"
                src="https://lottie.host/5f7a12ee-88d4-4db0-947f-517892e40aee/jfx11DB4Ky.lottie"
                loop
                autoplay
              /> */}
            </div>
            <h5>Calorie History</h5>
            <div className="home-text-box">
              <div className="home-text-card">
                <div className="progress-wrapper">
                  <CircularProgressbar
                    value={caloriePercent}
                    maxValue={100}
                    text={`${caloriePercent}%`}
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
                  <h2> <span>{caloriePercent}</span>/{"100%"}</h2>
                  <p>Consumed</p>
                </div>
              </div>
              <div className="home-text-card">
                <div className="progress-wrapper">
                  <CircularProgressbar
                    value={workoutPercent}
                    maxValue={100}
                    text={`${workoutPercent}%`}
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
                  <h2><span>{workoutPercent}</span>/{"100%"}</h2>
                  <p>Burned</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`home-scroll ${isScrolled ? "scrolled" : ""}`}>
          <div className="home-scroll-box">
            <div className="history-card">
              <div className="history-subtitle calorie">
                <p> <ChevronLeft
                  className="cursor-pointer"
                  onClick={() => navigate(-1)}
                  style={{ marginRight: "10px" }}
                />
                  Your today's and past Calorie.</p>
                {showRecipe === true ?
                  <button onClick={() => setShowRecipe(false)}><ChevronLeft />View Graph</button>
                  :
                  <button onClick={() => setShowRecipe(true)}>View   List<ChevronRight /></button>
                }

              </div>
              <div className="filter-buttons">
                <button
                  className={filter === "all" ? "active" : ""}
                  onClick={() => setFilter("all")}
                >
                  All
                </button>
                <button
                  className={filter === "week" ? "active" : ""}
                  onClick={() => setFilter("week")}
                >
                  Last 7 Days
                </button>
                <button
                  className={filter === "month" ? "active" : ""}
                  onClick={() => setFilter("month")}
                >
                  This Month
                </button>
                <button
                  className={filter === "3months" ? "active" : ""}
                  onClick={() => setFilter("3months")}
                >
                  Last 3 Months
                </button>
                <button
                  className={filter === "6months" ? "active" : ""}
                  onClick={() => setFilter("6months")}
                >
                  Last 6 Months
                </button>
                <button
                  className={filter === "year" ? "active" : ""}
                  onClick={() => setFilter("year")}
                >
                  {currentYear}
                </button>
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
                      if (offset.x < -100) setShowRecipe(true);
                    }}
                    className="home-scroll-box"
                  >
                    <div className="subscription-list">
                      <CalorieGraph feast={feast} filter={filter} userData={userData} />
                    </div>
                    <h6
                      style={{ marginTop: "1rem" }}
                      className="seven-day-buttons"
                      onClick={() => navigate("/bmi")}
                    >
                      BMI (Body Mass Index) <ChevronRight />
                    </h6>
                    <Ads />
                    <div className="importantConsiderations-box">
                      <h5>Important Considerations</h5>
                      <ul>
                        {userData?.importantConsiderations?.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
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
                      {filteredMeals?.length > 0 ? (
                        filteredMeals
                          .sort((a, b) => new Date(b.date) - new Date(a.date)) // newest first
                          .map((day, idx) => (
                            <div key={idx} className="subscription-item">
                              <div
                                className="accordion-header"
                                onClick={() => toggleAccordion(idx)}
                              >
                                <h6 className="calorie-history-title">
                                  {new Date(day.date).toLocaleDateString()}
                                  <span className={`accordion-arrow ${openIndex === idx ? "open" : ""
                                    }`}><ChevronDown /></span>
                                </h6>
                                <div className="subscription-details">
                                  <p>
                                    <strong>Calories:</strong> {day.totals?.calories || 0} kcal
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
                                  <p>
                                    <strong>Burned:</strong> {day.totals?.burned || 0} g
                                  </p>
                                  <p>
                                    <strong>Net Calories:</strong> {day.totals?.netCalories || 0} g
                                  </p>
                                </div>
                              </div>

                              <div
                                className={`accordion-content ${openIndex === idx ? "open" : ""
                                  }`}
                              >
                                <div className="meals-list">
                                  {day.meals.map((meal, i) => (
                                    <div key={i} className={`meal-item ${meal.status}`}>
                                      <div className="subscription-header">
                                        <span
                                          className={`status-badge ${meal.status === "completed" ? "active" : "expired"
                                            }`}
                                        >
                                          {meal.status}
                                        </span>
                                      </div>
                                      <h6>{meal.type}</h6>
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
                                    </div>
                                  ))}
                                </div>
                                <div className="meals-list">
                                  {day.workouts?.map((workouts, i) => (
                                    <div key={i} className={`meal-item ${workouts.status}`}>
                                      <div className="subscription-header">
                                        <span
                                          className={`status-badge ${workouts.status === "completed" ? "active" : "expired"
                                            }`}
                                        >
                                          {workouts.status}
                                        </span>
                                      </div>
                                      <h6>{workouts.type}</h6>
                                      <p>
                                        <strong>Calories:</strong> {workouts.caloriesBurned} kcal
                                      </p>
                                      <p>
                                        <strong>Duration:</strong> {workouts.duration} min
                                      </p>
                                    </div>
                                  ))}
                                </div>
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
    </div>
  );
};

export default CalorieHistory;
