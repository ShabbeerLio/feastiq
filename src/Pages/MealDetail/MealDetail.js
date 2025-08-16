import React, { useEffect, useState } from "react";
import Calories from "../../Components/Calories/Calories";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./MealDetail.css";
import { ChevronLeft, ChevronRight, CookingPot, ShoppingBasket, Youtube } from "lucide-react";
import { FaYoutube } from "react-icons/fa";

const MealDetail = () => {
    const { state } = useLocation();
    // console.log(state,"state")
    const { mealInfo } = state;
    // console.log(mealInfo, "mealInfo")
    const [isScrolled, setIsScrolled] = useState(state.isScrolled);
    const [mealplate, setMealplate] = useState(true)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 1);
        };
        window.addEventListener("scroll", handleScroll);
        setTimeout(() => {
            setIsScrolled(false);
        }, 500);
        setTimeout(() => {
            setMealplate(false);
        }, 1000);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClose = () => {
        setIsScrolled(false);
    };

    return (
        <div className="Home">
            <div className="Home-main">
                <Calories meal={mealInfo} mealplate={mealplate}/>
                <div className={`home-scroll ${isScrolled ? "scrolled" : ""} mealtype`}>
                    <div className="home-scroll-box">
                        <h5 className="mealdetail-title">
                            {isScrolled &&
                                <ChevronLeft
                                    onClick={handleClose} />
                            } {mealInfo.type} <span>({mealInfo.time})</span></h5>
                        <div className="mealDetail-header">
                            <p>
                                {Array.isArray(mealInfo.meal)
                                    ? mealInfo.meal.join(", ")
                                    : mealInfo.meal}
                            </p>
                        </div>
                        <div className="meal-plan-box">
                        </div>
                        <h5>Recipes</h5>
                        <div className="recipie-box">
                            {mealInfo.recipes?.map((recipe, idx) => (
                                <React.Fragment key={idx}>
                                    <div className="recipie-card">
                                        <h6> <ShoppingBasket /> Ingredients</h6>
                                        <ul>
                                            {recipe.ingredients.map((ingredient, i) => (
                                                <li key={i}>{ingredient}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="recipie-card">
                                        <h6> <CookingPot /> Steps</h6>
                                        <ul>
                                            {recipe.steps.map((step, i) => (
                                                <li key={i}>{step}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </React.Fragment>
                            ))}
                            <div className="recipie-card youtube">
                                <Link to={"https://youtu.be/WaTZTULwmGU?si=kFaNYiydNBCJ881J"}>
                                    <FaYoutube /> How to make this recipe <ChevronRight />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealDetail;
