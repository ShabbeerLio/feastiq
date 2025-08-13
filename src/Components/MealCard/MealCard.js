import React from "react";
import meal1 from "../../Assets/Meal/breakfast.png";
import meal2 from "../../Assets/Meal/lunch.png";
import meal3 from "../../Assets/Meal/snacks.png";
import meal4 from "../../Assets/Meal/dinner.png";
import { CookingPot } from "lucide-react";
import "./MealCard.css";
import { useNavigate } from "react-router-dom";

const mealImages = {
    breakfast: meal1,
    lunch: meal2,
    snacks: meal3,
    dinner: meal4,
};

const MealCard = ({ mealPlan, isScrolled }) => {
    const navigate = useNavigate();

    // console.log(mealPlan,"mealPlan")

    const handleMealClick = (mealType, mealData) => {
        const mealInfo = {
            type: mealType.charAt(0).toUpperCase() + mealType.slice(1),
            time: mealData.time,
            meal: mealData.meal,
            recipes: mealData.recipes,
            image: mealImages[mealType],
        };
        // console.log(mealInfo, "meal info clicked");
        navigate("/meal", { state: { mealInfo ,isScrolled} });
    };

    return (
        <>
            {mealPlan.map((dayPlan, index) =>
                Object.keys(dayPlan)
                    .filter((key) => key !== "day") // skip the "day" property
                    .map((mealType, idx) => {
                        const mealData = dayPlan[mealType];
                        const mealText = Array.isArray(mealData.meal)
                            ? mealData.meal.join(", ")
                            : mealData.meal;

                        return (
                            <div
                                className="meal-plan-card top"
                                onClick={() => handleMealClick(mealType, mealData)}
                                key={`${index}-${idx}`}
                            >
                                <img src={mealImages[mealType]} alt={mealType} />
                                <h3>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h3>
                                (<span>{mealData.time}</span>)
                                <p>{mealText}</p>
                                <CookingPot />
                            </div>
                        );
                    })
            )}
        </>
    );
};

export default MealCard;
