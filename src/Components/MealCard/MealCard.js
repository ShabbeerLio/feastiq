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

    const handleMealClick = (mealType, mealData) => {
        const mealInfo = {
            type: mealType.charAt(0).toUpperCase() + mealType.slice(1),
            time: mealData.time,
            meal: mealData.meal,
            recipes: mealData.recipes,
            image: mealImages[mealType],
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

    // const status = localStorage.getItem(`mealStatus-${mealPlan?.type}`);
    // console.log(status,"status")

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

                            const status = localStorage.getItem(`mealStatus-${mealType.charAt(0).toUpperCase() + mealType.slice(1)}`);

                        return (
                            <div
                                className={`meal-plan-card top ${localStorage.getItem(`mealStatus-${mealType.charAt(0).toUpperCase() + mealType.slice(1)}`) === "completed"
                                    ? "completed"
                                    : localStorage.getItem(`mealStatus-${mealType.charAt(0).toUpperCase() + mealType.slice(1)}`) === "skipped"
                                        ? "skipped"
                                        : ""
                                    }`}
                                onClick={() => handleMealClick(mealType, mealData)}
                                key={`${index}-${idx}`}
                            >
                                <img src={mealImages[mealType]} alt={mealType} />
                                <h3>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h3>
                                (<span>{mealData.time}</span>)
                                <p>{mealText}</p>
                                <CookingPot />
                                <span className={`status-badge ${status}`}>{status}</span>
                            </div>
                        );
                    })
            )}
        </>
    );
};

export default MealCard;
