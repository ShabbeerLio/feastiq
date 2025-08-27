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
import mbg4 from "../../Assets/Meal/mealbg4.jpg";
import Ads from "../../Components/Ads/Ads";
import { motion, AnimatePresence } from "framer-motion";
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

const MealDetail = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
    const navigate = useNavigate();
    const location = useLocation();
    const [mealInfo, setMealInfo] = useState(null);
    const [isScrolled, setIsScrolled] = useState(location.state?.isScrolled ?? false);
    const [mealplate, setMealplate] = useState(true);
    const [showRecipe, setShowRecipe] = useState(false);
    const [loading, setLoading] = useState(false);

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

    const handleSevenDaysWorkout = (type) => {
        navigate("/sevendays", { state: { type: type } });
    };

    // Keep initial as null (safe default)
    const [mealStatus, setMealStatus] = useState(null);

    const todayDate = new Date().toISOString().split("T")[0];

    // 🔹 Save meal status into backend
    const updateMealStatus = async (status) => {
        if (!mealInfo) return;
        setLoading(true);
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`${API_BASE_URL}/detail/dailyMeals`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
                body: JSON.stringify({
                    date: todayDate,
                    meals: [
                        {
                            type: mealInfo.type,
                            meal: Array.isArray(mealInfo.meal) ? mealInfo.meal : [mealInfo.meal],
                            calories: mealInfo.calories,
                            protein: mealInfo.protein,
                            fats: mealInfo.fats,
                            carbs: mealInfo.carbs,
                            status: status,
                        },
                    ],
                }),
            });

            if (!res.ok) throw new Error("Failed to update meal");
            await res.json();

            setMealStatus(status); // update UI
        } catch (error) {
            console.error("Error updating meal:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleComplete = () => updateMealStatus("completed");
    const handleSkip = () => updateMealStatus("skipped");

    const [dailyMeal, setDailyMeal] = useState();
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

    const todayPlan = dailyMeal?.find(
        (d) => new Date(d.date).toISOString().split("T")[0] === todayDate
    );

    const mealtypesData = todayPlan?.meals?.find(
        (m) => m.type.toLowerCase() === mealInfo.type.toLowerCase()
    );

    useEffect(() => {
        if (mealtypesData?.status) {
            setMealStatus(mealtypesData.status);
        }
    }, [mealtypesData]);

    return (
        <div className="Home">
            <div className="Home-main">
                <Calories meal={mealInfo} mealplate={mealplate} />
                <div className={`home-scroll ${isScrolled ? "scrolled" : ""} mealtype`}>
                    <h5 className="mealdetail-title">
                        {isScrolled && <ChevronLeft onClick={handleClose} />}{""}
                        {mealInfo?.type} <span>({mealInfo?.time})</span>
                    </h5>
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
                                <div className="recipie-box">
                                    <div className="recipie-item-card">
                                        <img src={mbg4} alt="" />
                                        <div className="mealDetail-header liquid-glass">
                                            <div className="wallet-status">
                                                <DotLottieReact
                                                    className="wallet-success"
                                                    src="https://lottie.host/9559aa7b-040c-4db3-9a34-c3e3e17b6a94/GTap7dduXF.lottie"
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
                                        <h6 className="liquid-glass" onClick={() => setShowRecipe(true)}>
                                            Ingredients and Steps <ChevronRight />
                                        </h6>
                                    </div>
                                </div>
                                {/* ✅ Meal Actions */}
                                <div className="meal-actions">
                                    {mealStatus === null && !loading && (
                                        <>
                                            <button className="btn-complete" onClick={handleComplete}>
                                                Completed
                                            </button>
                                            <button className="btn-skip" onClick={handleSkip}>
                                                Skip
                                            </button>
                                        </>
                                    )}

                                    {loading && <p className="status">⏳ Updating...</p>}

                                    {mealStatus === "completed" && (
                                        <p className="status completed">🎉 Meal Completed!</p>
                                    )}
                                    {mealStatus === "skipped" && (
                                        <p className="status skipped">⏭️ Meal Skipped</p>
                                    )}
                                </div>
                                <h6 className="seven-day-buttons meal" onClick={() => handleSevenDaysWorkout("meal")}>
                                    7 Days Meals <ChevronRight />
                                </h6>
                                <Ads />
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
                                <h6 className="seven-day-buttons meal" onClick={() => handleSevenDaysWorkout("meal")}>
                                    7 Days Meals <ChevronRight />
                                </h6>
                                <Ads />
                            </motion.div>
                        )}
                    </AnimatePresence>
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

export default MealDetail;