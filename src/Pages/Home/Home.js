import React, { useContext, useEffect, useRef, useState } from "react";
import "./Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MealCard from "../../Components/MealCard/MealCard";
import WorkoutCard from "../../Components/WorkoutCard/WorkoutCard";
import Calories from "../../Components/Calories/Calories";
import { ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";
import Ads from "../../Components/Ads/Ads";
import { useNavigate } from "react-router-dom";
import NoteContext from "../../Context/FeastContext";
import glass from "../../Assets/glassbg.jpeg"
import interact from "interactjs";
import Loading from "../../Components/Loading/Loading";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import expire from "../../Assets/Expire.png"

const Home = () => {
  const { feast, getFeast, userDetail, getUserDetails, } = useContext(NoteContext);
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const Host = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("token");
  const position = useRef({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState("active");
  const [showModal, setShowModal] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [newWeight, setNewWeight] = useState("");
  const [status, setStatus] = useState("");

  const endDate = new Date(userDetail?.subscription?.endDate);
  const todayTime = new Date();
  const diffInTime = endDate.getTime() - todayTime.getTime();
  const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getUserDetails();
      getFeast();
      if (diffInDays <= 2) {
        setShowAlert(true)
      }
      setTimeout(() => {
        setLoadingStatus("disactive");
      }, 2000);
      setTimeout(() => {
        setLoading(false);
      }, 2500);
    }
  }, [navigate]);

  // Parse API response
  const userDataa = feast?.map((i) => {
    try {
      const cleaned = i?.mealFitness?.replace(/```json|```/g, "").trim();
      return JSON.parse(cleaned);
    } catch (err) {
      console.error("Error parsing mealFitness", err);
      return null;
    }
  });

  // safely get API object
  const userData = userDataa && userDataa[0];
  localStorage.setItem(
    "motivationalTip",
    JSON.stringify(userData?.motivationalTip)
  );

  // console.log(userData, "userData from API");

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

  // find today's meal + workout
  const todayMealPlan = userData?.mealPlan?.find((item) => item.day === today);
  const todayWorkoutPlan = userData?.workoutPlan?.find(
    (item) => item.day === today
  );

  const handleClose = () => {
    setIsScrolled(false);
  };

  const handleSevenDaysWorkout = (type) => {
    navigate("/sevendays", { state: { type: type } });
  };

  useEffect(() => {
    if (!cardRef.current) return;

    const interactable = interact(cardRef.current).draggable({
      listeners: {
        move(event) {
          position.current.x += event.dx;
          position.current.y += event.dy;

          event.target.style.transform =
            `translate(${position.current.x}px, ${position.current.y}px)`;
        },
      },
    });

    return () => {
      if (interactable) interactable.unset(); // safely remove
    };
  }, []);

  useEffect(() => {
    if (feast && feast.length > 0) {
      const createdAt = new Date(feast[0].createdAt);
      const today = new Date();

      // difference in days
      const diffTime = today.getTime() - createdAt.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      // console.log("Account age in days:", diffDays);

      // last submission day stored in localStorage
      const lastSubmittedDay = Number(localStorage.getItem("lastSubmittedDay") || 0);

      // check if user already submitted this cycle
      const alreadySubmitted = lastSubmittedDay === diffDays;

      // open modal on 15, 16, 17 (unless submitted already)
      if (!alreadySubmitted && (diffDays % 15 === 0 || diffDays % 15 === 1 || diffDays % 15 === 2)) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    }
  }, [feast]);

  // when user successfully updates weight
  const handleUpdateWeight = async () => {
    if (!newWeight) return;
    setLoading(true);
    setStatus("Processing");

    try {
      const response = await fetch(`${Host}/auth/update-weight`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ weight: Number(newWeight) }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus("Updated successfully");
        setNewWeight("");

        // ✅ save submission day to localStorage
        const diffTime = new Date().getTime() - new Date(feast[0].createdAt).getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        localStorage.setItem("lastSubmittedDay", diffDays);

        setTimeout(() => {
          setShowModal(false);
          window.location.reload();
        }, 1200);
      } else {
        setStatus("❌ Failed to update");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading status={loadingStatus} />
  }

  const handleSubscribe = () => {
    navigate("/subscription");
  }

  return (
    <div className="Home">
      <div className="Home-main">
        {userData && <Calories userData={userData} />}
        <div className={`home-scroll ${isScrolled ? "scrolled" : ""}`}>
          <div className="home-scroll-box">
            <div className="headerfornavigate">
              <h5>
                Today's Meal Plan ({todayMealPlan?.day})

              </h5>
              <h5>{isScrolled && <ChevronDown onClick={handleClose} />}</h5>
            </div>
            <div className="meal-plan-box">
              {todayMealPlan && (
                <MealCard mealPlan={[todayMealPlan]} isScrolled={isScrolled} />
              )}
            </div>
            <h6 className="seven-day-buttons" onClick={() => handleSevenDaysWorkout("meal")}>
              7 Days Meals <ChevronRight />
            </h6>

            <h5>Today's Workout Plan ({todayWorkoutPlan?.day})</h5>
            <div className="exercise-box">
              {todayWorkoutPlan && (
                <WorkoutCard workoutPlan={todayWorkoutPlan.exercises} isScrolled={isScrolled} />
              )}
            </div>
            <h6 className="seven-day-buttons" onClick={() => handleSevenDaysWorkout("workout")}>
              7 Days Workout <ChevronRight />
            </h6>
            <h6
              style={{ marginTop: "1rem", textAlign: "center" }}
              className="recipie-card"
              onClick={() => window.location.href = "/bmi"}
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
          </div>
        </div>
        <div className="liquid-glass">
          {/* liquid glass */}
        </div>
        {/* --- Update Weight Modal --- */}
        <div className={`modal-overlay ${showModal}`}>
          <div className="modal-content liquid-glass">
            <h4>Update Your Weight</h4>
            <p>Update your weight to get the perfect results</p>
            {!status &&
              <>
                <input
                  type="number"
                  placeholder="Enter new weight"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                />
                <div className="modal-actions">
                  <button
                    onClick={() => setShowModal(false)}
                    className="close"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateWeight}
                    disabled={loading}

                  >
                    {loading ? "Processing..." : "Submit"}
                  </button>

                </div>
              </>
            }
            {status === "Processing" &&
              <>
                <div className="wallet-status">
                  <DotLottieReact
                    className="wallet-success"
                    src="https://lottie.host/5066ed2e-4dbb-4c34-ac26-2bfada68301f/QJPWTrsYv7.lottie"
                    loop
                    autoplay
                  />
                  <p className="status-msg">{status}</p>
                </div>
              </>
            }
            {status === "Updated successfully" &&
              <>
                <div className="wallet-status">
                  <DotLottieReact
                    className="wallet-success"
                    src="https://lottie.host/e63d43ae-3f25-49b2-a2e4-721b5e4ed7dd/NjKNhinvXI.lottie"
                    loop
                    autoplay
                  />
                  <p className="status-msg">{status}</p>
                </div>
              </>
            }
          </div>
        </div>
        <div className={`modal-overlay ${showAlert}`}>
          <div className="modal-content liquid-glass subscription-ending">
            <div
              className="subscription-end-alert"
            >
              <button
                onClick={() => setShowAlert(false)}
                className="close"
              >
                <X />
              </button>
              <img className="subscription-alert-image" src={expire} alt="" />
              <div className="sub-endbox">
                <p>Your Plan is expiring in {diffInDays} days</p>
                <p>Get Your Subscription Plan Now!</p>
              </div>
              <h6 className="seven-day-buttons" onClick={handleSubscribe}>
                Subscribe Now! <ChevronRight />
              </h6>
            </div>
          </div>
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

export default Home;
