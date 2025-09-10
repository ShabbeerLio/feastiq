import React, { useEffect, useState } from "react";
import meal1 from "../../Assets/Meal/breakfast.png";
import meal2 from "../../Assets/Meal/lunch.png";
import meal3 from "../../Assets/Meal/snacks.png";
import meal4 from "../../Assets/Meal/dinner.png";
import { CookingPot } from "lucide-react";
import "./MealCard.css";
import { useNavigate } from "react-router-dom";
import Host from "../../Host";

const mealImages = {
  breakfast: meal1,
  lunch: meal2,
  snacks: meal3,
  dinner: meal4,
};

const MealCard = ({ mealPlan, isScrolled, userData }) => {
  const navigate = useNavigate();

  const handleMealClick = (mealType, mealData) => {
    const mealInfo = {
      type: mealType.charAt(0).toUpperCase() + mealType.slice(1),
      time: mealData.time,
      meal: mealData.meal,
      recipes: mealData.recipes,
      image: mealImages[mealType],
      protein: mealData.protein,
      fats: mealData.fats,
      carbs: mealData.carbs,
      calories: mealData.calories,
    };
    // console.log(mealInfo, "meal info clicked");
    navigate("/meal", {
      state: {
        mealInfo: mealInfo,
        isScrolled: isScrolled,
      },
    });
    localStorage.setItem("mealInfo", JSON.stringify(mealInfo));
  };

  const [dailyMeal, setDailyMeal] = useState();
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

  //   console.log(dailyMeal,"dailyMeal")
  const todayDate = new Date().toISOString().split("T")[0];
  //   console.log(todayDate,"todayDate")
  const todayPlan = dailyMeal?.find(
    (d) => new Date(d.date).toISOString().split("T")[0] === todayDate
  );

  return (
    <div className="meal-plan-box">
      {mealPlan.map((dayPlan, index) =>
        Object.keys(dayPlan)
          .filter((key) => key !== "day") // skip the "day" property
          .map((mealType, idx) => {
            const mealData = dayPlan[mealType];
            const mealText = Array.isArray(mealData.meal)
              ? mealData.meal.join(", ")
              : mealData.meal;

            const backendMealStatus = todayPlan?.meals?.find(
              (m) =>
                m.type.toLowerCase() ===
                mealType.charAt(0).toLowerCase() + mealType.slice(1)
            )?.status;

            const status = backendMealStatus;

            return (
              <div
                className={`meal-plan-card top ${(() => {
                  if (status === "completed") return "completed";
                  if (status === "skipped") return "skipped";
                  return "";
                })()}`}
                onClick={() => handleMealClick(mealType, mealData)}
                key={`${index}-${idx}`}
              >
                <img src={mealImages[mealType]} alt={mealType} />
                <h3>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h3>(
                <span>{mealData.time}</span>)<p>{mealText}</p>
                {/* <div className="nutrition-info">
                  <p>Calories: {mealData.calories} kcal</p>
                  <p>Protein: {mealData.protein} g</p>
                  <p>Fats: {mealData.fats} g</p>
                  <p>Carbs: {mealData.carbs} g</p>
                </div> */}
                <CookingPot />
                <span className={`status-badge ${status}`}>{status}</span>
              </div>
            );
          })
      )}
    </div>
  );
};

export default MealCard;
