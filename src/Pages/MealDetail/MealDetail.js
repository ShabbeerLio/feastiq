import React, { useEffect, useState } from "react";
import Calories from "../../Components/Calories/Calories";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./MealDetail.css";
import {
    ChevronLeft,
    ChevronRight,
    CookingPot,
    MoveRight,
    ShoppingBasket,
} from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import mbg1 from "../../Assets/Meal/mealbg1.jpg";
import mbg2 from "../../Assets/Meal/mealbg2.jpg";
import mbg3 from "../../Assets/Meal/mealbg3.jpg";
import mbg4 from "../../Assets/Meal/mealbg4.jpg";
import Ads from "../../Components/Ads/Ads";
import { motion, AnimatePresence } from "framer-motion";
import { useMeal } from "../../Context/MealContext";

const slideVariants = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } },
    exit: { x: "-100%", opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } },
};

const MealDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mealInfo, setMealInfo] = useState(null);

    useEffect(() => {
        // If coming from navigate with state
        if (location.state?.mealInfo) {
            setMealInfo(location.state.mealInfo);
            localStorage.setItem("mealInfo", JSON.stringify(location.state.mealInfo));
        } else {
            // Fallback if state is lost (like after sidebar toggle)
            const storedMeal = localStorage.getItem("mealInfo");
            if (storedMeal) {
                setMealInfo(JSON.parse(storedMeal));
            }
        }
    }, [location.state]);

    const [isScrolled, setIsScrolled] = useState(location.state?.isScrolled ?? false);
    const [mealplate, setMealplate] = useState(true);
    const [showRecipe, setShowRecipe] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 1);
        };
        window.addEventListener("scroll", handleScroll);

        setTimeout(() => setIsScrolled(false), 500);
        setTimeout(() => setMealplate(false), 1000);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClose = () => setIsScrolled(false);

    const handleSevenDays = () => {
        navigate("/sevendays");
    };

    const [mealStatus, setMealStatus] = useState(
        localStorage.getItem(`mealStatus-${mealInfo?.type}`) || null
    );

    const handleComplete = () => {
        setMealStatus("completed");
        localStorage.setItem(`mealStatus-${mealInfo?.type}`, "completed");
    };

    const handleSkip = () => {
        setMealStatus("skipped");
        localStorage.setItem(`mealStatus-${mealInfo?.type}`, "skipped");
    };

    return (
        <div className="Home">
            <div className="Home-main">
                <Calories meal={mealInfo} mealplate={mealplate} />
                <div className={`home-scroll ${isScrolled ? "scrolled" : ""} mealtype`}>
                    <h5 className="mealdetail-title">
                        {isScrolled && <ChevronLeft onClick={handleClose} />}{" "}
                        {mealInfo?.type} <span>({mealInfo?.time})</span>
                    </h5>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={showRecipe ? "recipe" : "overview"}
                            variants={slideVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.2}
                            onDragEnd={(e, { offset }) => {
                                if (offset.x > 100) setShowRecipe(false); // swipe right = go back
                                if (offset.x < -100) setShowRecipe(true); // swipe left = open recipe
                            }}
                            className="home-scroll-box"
                        >

                            {!showRecipe ? (
                                <>
                                    <div className="recipie-box">
                                        <div className="recipie-item-card">
                                            <img src={mbg4} alt="" />
                                            <div className="mealDetail-header">
                                                <div className="wallet-status">
                                                    <DotLottieReact
                                                        className="wallet-success"
                                                        src="https://lottie.host/a273f54d-867e-4ce5-af69-6818e895817d/yGIr5jkYEw.lottie"
                                                        loop
                                                        autoplay
                                                    />
                                                </div>
                                                <p>
                                                    {Array.isArray(mealInfo?.meal)
                                                        ? mealInfo?.meal.join(", ")
                                                        : mealInfo?.meal}
                                                </p>
                                            </div>
                                            <h6 onClick={() => setShowRecipe(true)}>
                                                Ingredients and Steps <ChevronRight />
                                            </h6>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="recipe-details">
                                    <h6 onClick={() => setShowRecipe(false)}>
                                        <ChevronLeft /> Back
                                    </h6>

                                    {mealInfo.recipes?.map((recipe, idx) => (
                                        <React.Fragment key={idx}>
                                            <div className="recipie-card">
                                                <h6>
                                                    <ShoppingBasket /> Ingredients
                                                </h6>
                                                <ul>
                                                    {recipe.ingredients.map((ingredient, i) => (
                                                        <li key={i}>{ingredient}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="recipie-card">
                                                <h6>
                                                    <CookingPot /> Steps
                                                </h6>
                                                <ul>
                                                    {recipe.steps.map((step, i) => (
                                                        <li key={i}>{step}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    ))}

                                    <div className="recipie-card youtube">
                                        <Link to="https://youtu.be/WaTZTULwmGU?si=kFaNYiydNBCJ881J">
                                            <FaYoutube /> How to make this recipe <ChevronRight />
                                        </Link>
                                    </div>
                                </div>
                            )}
                            <div className="meal-actions">
                                {mealStatus === null && (
                                    <>
                                        <button className="btn-complete" onClick={handleComplete}>
                                            Completed
                                        </button>
                                        <button className="btn-skip" onClick={handleSkip}>
                                            Skip
                                        </button>
                                    </>
                                )}

                                {mealStatus === "completed" && (
                                    <p className="status completed">🎉 Meal Completed!</p>
                                )}

                                {mealStatus === "skipped" && (
                                    <p className="status skipped">⏭️ Meal Skipped</p>
                                )}
                            </div>
                            <h6 className="seven-day-buttons meal" onClick={handleSevenDays}>
                                7 Days Meals <ChevronRight />
                            </h6>
                            <Ads />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default MealDetail;