import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Check, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import Calories from "../../Components/Calories/Calories";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import mbg4 from "../../Assets/Workout/workout.jpg";
import Ads from "../../Components/Ads/Ads";
import { FaYoutube } from "react-icons/fa";
import "./WorkoutDetail.css";
import glass from "../../Assets/glassbg.jpeg";
import CompleteSkip from "../../Components/CompleteSkip/CompleteSkip";

const WorkoutDetail = () => {
  const Host = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(true);
  const handleClose = () => setIsScrolled(false);
  const [mealplate, setMealplate] = useState(true);
  const [exerciseInfo, setExerciseInfo] = useState(null);
  useEffect(() => {
    // If coming from navigate with state
    if (location.state?.exerciseInfo) {
      setExerciseInfo(location.state.exerciseInfo);
      localStorage.setItem(
        "exerciseInfo",
        JSON.stringify(location.state.exerciseInfo)
      );
    } else {
      // Fallback if state is lost (like after sidebar toggle)
      const storedMeal = localStorage.getItem("exerciseInfo");
      if (storedMeal) {
        setExerciseInfo(JSON.parse(storedMeal));
      }
    }
  }, [location.state]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1);
    };
    window.addEventListener("scroll", handleScroll);

    setTimeout(() => setIsScrolled(false), 500);
    setTimeout(() => setMealplate(false), 1000);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSevenDaysWorkout = (type) => {
    navigate("/sevendays", { state: { type: type } });
  };

  // Keep initial as null (safe default)
  const [mealStatus, setMealStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const todayDate = new Date().toISOString().split("T")[0];

  // 🔹 Save meal status into backend
  const updateStatus = async (status) => {
    if (!exerciseInfo) return;
    setLoading(true);
    try {
      const res = await fetch(`${Host}/detail/dailyMeals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          date: todayDate,
          workouts: [
            {
              type: exerciseInfo.workout,
              caloriesBurned: exerciseInfo.calories,
              duration: 30,
              status: status,
            },
          ],
        }),
      });

      if (!res.ok) throw new Error("Failed to update workout status");
      await res.json();

      setMealStatus(status); // update UI
    } catch (error) {
      console.error("Error updating Workout:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = () => updateStatus("completed");
  const handleSkip = () => updateStatus("skipped");

  const [dailyMeal, setDailyMeal] = useState();

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

  const todayPlan = dailyMeal?.find(
    (d) => new Date(d.date).toISOString().split("T")[0] === todayDate
  );

  const mealtypesData = todayPlan?.workouts?.find(
    (m) => m.type.toLowerCase() === exerciseInfo.workout.toLowerCase()
  );

  useEffect(() => {
    if (mealtypesData?.status) {
      setMealStatus(mealtypesData.status);
    }
  }, [mealtypesData]);

  return (
    <div className="Home">
      <div className="Home-main workout">
        <Calories meal={exerciseInfo} mealplate={mealplate} />
        <div className={`home-scroll ${isScrolled ? "scrolled" : ""} mealtype`}>
          <h5 className="mealdetail-title">
            {isScrolled && <ChevronLeft onClick={handleClose} />}
            {""}
            Workout Details <span></span>
          </h5>
          <div className="recipie-box">
            <div className="recipie-item-card">
              <img src={mbg4} alt="" />
              <div className="mealDetail-header workout liquid-glass">
                <div className="wallet-status">
                  <DotLottieReact
                    className="wallet-success"
                    src="https://lottie.host/fe1dcf17-8aab-4cbf-bf48-390567abcc6a/ObbRNaLve1.lottie"
                    loop
                    autoplay
                  />
                </div>
                <p>{exerciseInfo?.workout}</p>
              </div>
            </div>
          </div>
          <div className="meal-actions">
            {mealStatus === null && (
              <>
                <button className="btn-complete" onClick={handleComplete}>
                  <Check />
                  Completed
                </button>
                <button className="btn-skip" onClick={handleSkip}>
                  <ChevronLast />
                  Skip
                </button>
              </>
            )}

            {mealStatus === "completed" && (
              <p className="status completed">🎉 Workout Completed!</p>
            )}

            {mealStatus === "skipped" && (
              <p className="status skipped">⏭️ Workout Skipped</p>
            )}
          </div>
          {/* <CompleteSkip  detail={exerciseInfo} /> */}
          <div className="recipie-card youtube">
            <Link to={`https://www.youtube.com/results?search_query=${exerciseInfo?.workout.toLowerCase()} workout`}>
              <FaYoutube /> How to do this Exercise <ChevronRight />
            </Link>
          </div>
          <h6
            className="seven-day-buttons meal"
            onClick={() => handleSevenDaysWorkout("workout")}
          >
            7 Days Workout <ChevronRight />
          </h6>
          <Ads />
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

export default WorkoutDetail;
