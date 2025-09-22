import React, { useContext, useEffect, useState } from "react";
import Calories from "../../Components/Calories/Calories";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./MealDetail.css";
import {
    Check,
    ChevronDown,
    ChevronLast,
    ChevronLeft,
    ChevronRight,
    CookingPot,
    MoveRight,
    ReplaceAll,
    ShoppingBasket,
    X,
} from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import mbg4 from "../../Assets/Meal/mealbg4.jpg";
import Ads from "../../Components/Ads/Ads";
import { motion, AnimatePresence } from "framer-motion";
import glass from "../../Assets/glassbg.jpeg"
import Host from "../../Host";
import NoteContext from "../../Context/FeastContext";
import tag from "../../Assets/tag.png";


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
    const { userDetail, getUserDetails } = useContext(NoteContext);
    const API_BASE_URL = Host
    const navigate = useNavigate();
    const location = useLocation();
    const [mealInfo, setMealInfo] = useState(null);
    const [isScrolled, setIsScrolled] = useState(location.state?.isScrolled ?? false);
    const [mealplate, setMealplate] = useState(true);
    const [showRecipe, setShowRecipe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const mealdetailId = location.state?.mealId ?? false
    const mealdetailDay = location.state?.mealDay ?? false

    useEffect(() => {
        getUserDetails();
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
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            // how much user has scrolled in %
            const scrolledPercent = (scrollTop + windowHeight) / docHeight * 100;

            if (scrolledPercent >= 99) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        setTimeout(() => setIsScrolled(false), 500);
        setTimeout(() => setMealplate(false), 1000);

        window.addEventListener("scroll", handleScroll);
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

    // swap
    const [currentMeal, setCurrentMeal] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [updating, setUpdating] = useState(false);
    const [status, setStatus] = useState("")

    // console.log(mealInfo?.type, "mealInfo")
    // console.log(mealdetailId, "mealdetailId")
    // console.log(mealdetailDay, "mealdetailDay")
    let mealType = mealInfo?.type
    const mealTypeLower = mealType?.toLowerCase();

    // Step 1: Fetch alternatives
    const fetchSuggestions = async () => {
        setShowModal(true);
        setLoading(true);
        setStatus("Processing")
        if (userDetail?.subscription?.status !== "Active") {
            setStatus("")
        } else {
            try {
                const res = await fetch(`${Host}/detail/editMeal`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        detailId: mealdetailId[0],
                        day: mealdetailDay,
                        mealType: mealTypeLower
                    }),
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Failed to fetch suggestions");
                setStatus("")
                setCurrentMeal(data.currentMeal);
                setSuggestions(data.suggestions || []);
            } catch (err) {
                console.error(err);
                alert("Error fetching meal suggestions: " + err.message);
                setShowModal(false);
            } finally {
                setLoading(false);
            }
        }
    };

    // Step 2: Apply chosen meal
    const applyMeal = async (meal) => {
        if (!window.confirm(`Replace current ${mealTypeLower} with "${meal.meal}"?`)) return;

        setUpdating(true);
        try {
            const res = await fetch(`${Host}/detail/applyMealEdit`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    detailId: mealdetailId[0],
                    day: mealdetailDay,
                    mealType: mealTypeLower,
                    newMeal: meal
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to update meal");

            alert("Meal updated successfully!");
            setCurrentMeal(data.updatedMeal);
            setShowModal(false);
            setSuggestions([]);
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Error updating meal: " + err.message);
        } finally {
            setUpdating(false);
        }
    };

    const closeModal = () => {
        setShowModal(false)
        setSuggestions([])
    }

    const handleSubscribe = () => {
        navigate("/subscription");
        closeModal()
    };


    return (
        <div className="Home">
            <div className="Home-main">
                <Calories meal={mealInfo} mealplate={mealplate} />
                <div className={`home-scroll ${isScrolled ? "scrolled" : ""} mealtype`}>
                    <div className="headerfornavigate">
                        <h5 className="mealdetail-title">
                            <ChevronLeft
                                className="cursor-pointer"
                                onClick={() => navigate(-1)} // goes back to previous page
                            /> {mealInfo?.type} <span>({mealInfo?.time})</span>
                        </h5>
                        <h5>{isScrolled && <ChevronDown onClick={handleClose} />}</h5>
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
                                            <span onClick={fetchSuggestions} className="liquid-glass"><ReplaceAll />Swap</span>
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
                                                <Check />
                                                Completed
                                            </button>
                                            <button className="btn-skip" onClick={handleSkip}>
                                                <ChevronLast />
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
                                <h6
                                    style={{ marginTop: "1rem", textAlign: "center" }}
                                    className="recipie-card"
                                    onClick={() => navigate("/bmi")}
                                >
                                    BMI (Body Mass Index) <ChevronRight />
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
                                        <Link to={`https://www.youtube.com/results?search_query=${Array.isArray(mealInfo?.meal)
                                            ? mealInfo?.meal.join(", ")
                                            : mealInfo?.meal} meal recipe`}>
                                            <FaYoutube /> How to make this recipe <ChevronRight />
                                        </Link>
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
                                        <p className="status completed">🎉 Meal Completed!</p>
                                    )}

                                    {mealStatus === "skipped" && (
                                        <p className="status skipped">⏭️ Meal Skipped</p>
                                    )}
                                </div>
                                <h6 className="seven-day-buttons meal" onClick={() => handleSevenDaysWorkout("meal")}>
                                    7 Days Meals <ChevronRight />
                                </h6>
                                <h6
                                    style={{ marginTop: "1rem", textAlign: "center" }}
                                    className="recipie-card"
                                    onClick={() => navigate("/bmi")}
                                >
                                    BMI (Body Mass Index) <ChevronRight />
                                </h6>
                                <Ads />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            {/* Suggestion meals */}
            <div className={`modal-overlay ${showModal}`}>
                <div className="modal-content liquid-glass">
                    {userDetail?.subscription?.status !== "Active" ?
                        <>
                            <h4>Alternative Meals <X onClick={() => closeModal()} /></h4>
                            <div className="wallet-status">
                                <DotLottieReact
                                    className="wallet-success"
                                    src="https://lottie.host/b36b5394-5e67-4126-9cfc-a2eb90c26fbf/Aj5iGANvBx.lottie"
                                    loop
                                    autoplay
                                />
                            </div>
                            <h5 style={{ fontSize: "12px", textAlign: "center" }}>Unlock full access to meals, workouts and premium features—subscribe now and continue your journey without limits!</h5>
                            <div
                                className="sidebar-career subscription liquid-glass"
                                onClick={handleSubscribe}
                            >
                                <div className="subscription-side">
                                    <img src={tag} alt="" />
                                    <p>Get Your Subscription Plan Now! </p>
                                </div>
                                <p>
                                    <ChevronRight />
                                </p>
                            </div>
                        </>
                        :
                        <>
                            <h4>Alternative Meals <X onClick={() => closeModal()} /></h4>
                            <p>Select Your meal to swap current Meal</p>
                            {suggestions.map((meal, idx) => (
                                <div
                                    key={idx}
                                    className="meal-card suggestion home-text-card"
                                    onClick={() => applyMeal(meal)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <h4>{meal.meal} ({meal.time})</h4>
                                    <p>
                                        {meal.calories} kcal | P: {meal.protein}g | C: {meal.carbs}g | F:{" "}
                                        {meal.fats}g
                                    </p>
                                    <strong>Click to Apply</strong>
                                </div>
                            ))}
                        </>}

                    {status === "Processing" &&
                        <div className="wallet-status">
                            <DotLottieReact
                                className="wallet-success"
                                src="https://lottie.host/5066ed2e-4dbb-4c34-ac26-2bfada68301f/QJPWTrsYv7.lottie"
                                loop
                                autoplay
                            />
                            <p className="status-msg">Processing</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default MealDetail;