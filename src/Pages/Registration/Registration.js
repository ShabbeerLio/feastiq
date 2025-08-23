import React, { useState } from "react";
import "./Registration.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Animation variants for slide effect
const slideVariants = {
  initial: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    position: "absolute",
  }),
  animate: {
    x: 0,
    opacity: 1,
    position: "relative",
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  exit: (direction) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    position: "absolute",
    transition: { duration: 0.4, ease: "easeInOut" },
  }),
};

const Registration = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();

  const [step, setStep] = useState(0); // step 0 = choose mode
  const [mode, setMode] = useState(null); // "signup" | "login" | "google"
  const [loadingStage, setLoadingStage] = useState(null);
  const [direction, setDirection] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    foodpreferences: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    setDirection(1); // forward
    setStep(step + 1);
  };

  const handleBack = (e) => {
    e.preventDefault();
    if (step > 1) {
      setDirection(-1); // backward
      setStep(step - 1);
    } else {
      setMode(null);
      setStep(0);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    setLoadingStage("processing");
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.authToken); // save JWT
        setLoadingStage("success");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setLoadingStage(null);
        setErrorMessage(data.error || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setLoadingStage(null);
      setErrorMessage("Server error. Please try again later.");
    }

    setTimeout(() => {
      setErrorMessage("");
    }, 2000);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoadingStage("processing");
    try {
      const res = await fetch(`${API_BASE_URL}/auth/createuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("token", data.authToken);
        try {
          const response = await fetch(`${API_BASE_URL}/detail/addfeast`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": data.authToken,
            },
            body: JSON.stringify(formData),
          });

          const json = await response.json();
          if (json) {
            setLoadingStage("success");
            setTimeout(() => {
              navigate("/");
            }, 2000);
          }
        } catch (error) {
          setLoadingStage(null);
          setErrorMessage("Server Error");
        }
      } else {
        setLoadingStage(null);
        setErrorMessage(data.error || "Invalid email or password");
      }
    } catch (err) {
      setLoadingStage(null);
      setErrorMessage("Server Error");
    }
  };

  // Signup fields
  const signupSteps = [
    { name: "name", type: "text", placeholder: "Name" },
    { name: "email", type: "email", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
    { name: "age", type: "number", placeholder: "Age" },
    { name: "gender", type: "select", options: ["Male", "Female", "Other"] },
    { name: "weight", type: "number", placeholder: "Weight (kg)" },
    { name: "height", type: "number", placeholder: "Height (cm)" },
    {
      name: "foodpreferences",
      type: "textarea",
      placeholder: "Food Preferences (Optional)",
    },
  ];

  // Login fields
  const loginSteps = [
    { name: "email", type: "email", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" },
  ];

  // Progress bar %
  const getProgress = () => {
    if (mode === "signup") return (step / signupSteps.length) * 100;
    if (mode === "login") return (step / loginSteps.length) * 100;
    return 0;
  };

  console.warn = (message) =>
    message.includes("Buffer size mismatch") ? null : console.warn(message);

  return (
    <div className="Home">
      <div className="Home-main">
        <div className="registration">
          <div className="glass-container">
            {/* ✅ Progress bar */}
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${getProgress()}%` }}
              ></div>
            </div>
            <h5 className="title">
              {mode === "signup"
                ? "Tell us about yourself!"
                : mode === "login"
                ? "Login"
                : ""}
            </h5>

            <AnimatePresence mode="wait" custom={direction}>
              {/* LOADER */}
              {loadingStage === "processing" && (
                <motion.div
                  key="processing"
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={direction}
                >
                  <div className="wallet-status">
                    <DotLottieReact
                      className="wallet-success"
                      src="https://lottie.host/cf5cf153-8658-460c-8b18-f94ccda10b81/t5omOi421I.lottie"
                      loop
                      autoplay
                    />
                    {mode === "login" ? (
                      <h6>Processing your plan...</h6>
                    ) : (
                      <h6>Generating your plan...</h6>
                    )}
                  </div>
                </motion.div>
              )}
              {loadingStage === "success" && (
                <motion.div
                  key="success"
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={direction}
                >
                  <div className="wallet-status">
                    <DotLottieReact
                      className="wallet-success"
                      src="https://lottie.host/e63d43ae-3f25-49b2-a2e4-721b5e4ed7dd/NjKNhinvXI.lottie"
                      loop
                      autoplay
                    />
                    <h6>Plan Ready! 🎉</h6>
                  </div>
                </motion.div>
              )}
              {!mode && !loadingStage && (
                <motion.div
                  key="welcome"
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={direction}
                >
                  {/* STEP 0 - CHOOSE OPTION */}
                  {!mode && !loadingStage && (
                    <div className="option-buttons">
                      <div className="wallet-status">
                        <DotLottieReact
                          className="wallet-success"
                          src="https://lottie.host/76fb5a61-8402-44c0-b4fc-0281d70c7c23/XZFr5NlbY5.lottie"
                          loop
                          autoplay
                        />
                      </div>

                      <button
                        className="login-btn"
                        onClick={() => {
                          setMode("login");
                          setStep(1);
                        }}
                      >
                        Sign In
                      </button>
                      <button
                        className="next-btn"
                        onClick={() => {
                          setMode("signup");
                          setStep(1);
                        }}
                      >
                        Sign Up
                      </button>
                      <span className="reg-divider">OR</span>
                      <button
                        className="google-btn"
                        onClick={() => alert("Google Sign-In clicked!")}
                      >
                        <FaGoogle /> Continue with Google
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {/* SIGNUP FLOW */}
              {mode === "signup" &&
                !loadingStage &&
                step > 0 &&
                step <= signupSteps.length && (
                  <motion.div
                    key={`login-${step}`}
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    custom={direction}
                  >
                    <div className="wallet-status">
                      <DotLottieReact
                        className="wallet-success"
                        src="https://lottie.host/5faaa157-8ba4-4153-b916-ada3298d2050/GhpWsulDTM.lottie"
                        loop
                        autoplay
                      />
                    </div>
                    <form
                      onSubmit={
                        step === signupSteps.length
                          ? handleGenerate
                          : handleNext
                      }
                    >
                      {(() => {
                        const field = signupSteps[step - 1];
                        if (field.type === "select") {
                          return (
                            <select
                              name={field.name}
                              value={formData[field.name]}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Select Gender</option>
                              {field.options.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          );
                        }
                        if (field.type === "textarea") {
                          return (
                            <textarea
                              name={field.name}
                              placeholder={field.placeholder}
                              value={formData[field.name]}
                              onChange={handleChange}
                            />
                          );
                        }
                        return (
                          <input
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formData[field.name]}
                            onChange={handleChange}
                            required={field.name !== "foodpreferences"}
                          />
                        );
                      })()}

                      <div className="btn-row">
                        {/* ✅ Back button */}
                        <button className="back-btn" onClick={handleBack}>
                          <ChevronLeft />
                        </button>
                        <button type="submit" className="next-btn">
                          {step === signupSteps.length
                            ? "Generate Plan"
                            : "Next"}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

              {/* LOGIN FLOW */}
              {mode === "login" &&
                !loadingStage &&
                step > 0 &&
                step <= loginSteps.length && (
                  <motion.div
                    key={`login-${step}`}
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    custom={direction}
                  >
                    <div className="wallet-status">
                      <DotLottieReact
                        className="wallet-success"
                        src="https://lottie.host/94365f78-8594-4797-99db-f6e95b588594/iOOiX68NQb.lottie"
                        loop
                        autoplay
                      />
                    </div>
                    <form
                      onSubmit={
                        step === loginSteps.length
                          ? handleLoginSubmit
                          : handleNext
                      }
                    >
                      {(() => {
                        const field = loginSteps[step - 1];
                        return (
                          <input
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formData[field.name]}
                            onChange={handleChange}
                            required
                          />
                        );
                      })()}

                      <div className="btn-row">
                        {/* ✅ Back button */}
                        <button className="back-btn" onClick={handleBack}>
                          <ChevronLeft />
                        </button>
                        {errorMessage && (
                          <p
                            style={{
                              color: "red",
                              fontSize: "14px",
                              margin: "0",
                            }}
                          >
                            {errorMessage}
                          </p>
                        )}
                        <button type="submit" className="next-btn">
                          {step === loginSteps.length ? "Sign In" : "Next"}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
