import React, { useContext, useEffect, useState } from "react";
import "./Registration.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import glass from "../../Assets/glassbg.jpeg";
import NoteContext from "../../Context/FeastContext";
import Host from "../../Host";

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
  const { userDetail, getUserDetails } = useContext(NoteContext);
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // step 0 = choose mode
  const [mode, setMode] = useState(null); // "signup" | "login" | "google"
  const [loadingStage, setLoadingStage] = useState(null);
  const [direction, setDirection] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  // Add state
  const [forgotStep, setForgotStep] = useState(0);
  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    goal: "",
    foodpreferences: "",
  });

  const API_BASE_URL = Host;

  useEffect(() => {
    const googleToken = new URLSearchParams(window.location.search).get(
      "token"
    );
    if (googleToken) {
      localStorage.setItem("token", googleToken);
      setLoadingStage("processing");

      const fetchUser = async () => {
        try {
          await getUserDetails();
          const json = await userDetail;
          setLoadingStage(null);

          if (
            json &&
            (!json.age ||
              !json.gender ||
              !json.weight ||
              !json.height ||
              !json.goal)
          ) {
            setFormData((prev) => ({
              ...prev,
              name: json.name || "",
              email: json.email || "",
            }));
            setMode("google");
            setStep(4);
          } else {
            console.log("else");
            // navigate("/");
          }
        } catch (error) {
          console.error("Google fetch user error:", error);
          setLoadingStage(null);
        }
      };

      fetchUser();
    } else if (localStorage.getItem("token")) {
      // navigate("/");
      console.log(localStorage.getItem("token"), "token");
    }
  }, [navigate]);

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

  const handleGoogleSignup = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  const handleGoogleSubmit = async (e) => {
    e.preventDefault();
    setLoadingStage("processing");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/auth/edituser`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        // then add feast details
        const response = await fetch(`${API_BASE_URL}/detail/addfeast`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
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
      } else {
        setLoadingStage(null);
        setErrorMessage(data.error || "Something went wrong");
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
      name: "goal",
      type: "select",
      options: ["Gain Weight", "Loss Weight", "Maintain Weight"],
    },
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
          <div className="glass-container liquid-glass">
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
                      src="https://lottie.host/5066ed2e-4dbb-4c34-ac26-2bfada68301f/QJPWTrsYv7.lottie"
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
                        onClick={handleGoogleSignup}
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
                              <option value="">
                                {field.name === "gender"
                                  ? "Select Gender"
                                  : "Select Goal"}
                              </option>
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
                          <>
                            <input
                              type={field.type}
                              name={field.name}
                              placeholder={field.placeholder}
                              value={formData[field.name]}
                              onChange={handleChange}
                              required
                            />

                            {/* 👇 Add forgot password link only when rendering password field */}
                            {field.name === "password" && (
                              <p
                                className="forgot-password-txt"
                                onClick={() => {
                                  setForgotStep(1); // start forgot password flow
                                  setMode("forgot");
                                  setStep(0);
                                }}
                              >
                                Forgot Password?
                              </p>
                            )}
                          </>
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

              {mode === "google" &&
                !loadingStage &&
                step >= 4 &&
                step <= signupSteps.length && (
                  <motion.div
                    key={`google-${step}`}
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
                          ? handleGoogleSubmit
                          : handleNext
                      }
                    >
                      {(() => {
                        const field = signupSteps[step - 1];

                        if (
                          ["name", "email", "password"].includes(field.name)
                        ) {
                          return (
                            <input
                              type={field.type}
                              name={field.name}
                              value={formData[field.name]}
                              readOnly
                              disabled
                            />
                          );
                        }

                        if (field.type === "select") {
                          return (
                            <select
                              name={field.name}
                              value={formData[field.name]}
                              onChange={handleChange}
                              required
                            >
                              <option value="">
                                {field.name === "gender"
                                  ? "Select Gender"
                                  : "Select Goal"}
                              </option>
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
                        <button className="back-btn" onClick={handleBack}>
                          <ChevronLeft />
                        </button>
                        <button type="submit" className="next-btn">
                          {step === signupSteps.length ? "Finish" : "Next"}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              {/* FORGOT PASSWORD FLOW */}
              {mode === "forgot" && !loadingStage && (
                <motion.div
                  key={`forgot-${forgotStep}`}
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

                  {forgotStep === 1 && (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setLoadingStage("processing");
                        try {
                          const res = await fetch(
                            `${API_BASE_URL}/auth/send-otp`,
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ email: resetEmail }),
                            }
                          );
                          const data = await res.json();
                          setLoadingStage(null);
                          if (data.success) {
                            setForgotStep(2);
                          } else {
                            setErrorMessage(data.error || "Failed to send OTP");
                          }
                        } catch {
                          setLoadingStage(null);
                          setErrorMessage("Server error");
                        }
                      }}
                    >
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        required
                      />
                      <button type="submit" className="next-btn">
                        Send OTP
                      </button>
                    </form>
                  )}

                  {forgotStep === 2 && (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setLoadingStage("processing");
                        try {
                          const res = await fetch(
                            `${API_BASE_URL}/auth/verify-reset-otp`,
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ email: resetEmail, otp }),
                            }
                          );
                          const data = await res.json();
                          setLoadingStage(null);
                          if (data.success) {
                            setForgotStep(3);
                          } else {
                            setErrorMessage(data.error || "Invalid OTP");
                          }
                        } catch {
                          setLoadingStage(null);
                          setErrorMessage("Server error");
                        }
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                      />
                      <button type="submit" className="next-btn">
                        Verify OTP
                      </button>
                    </form>
                  )}

                  {forgotStep === 3 && (
                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setLoadingStage("processing");
                        try {
                          const res = await fetch(
                            `${API_BASE_URL}/auth/reset-password`,
                            {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                email: resetEmail,
                                otp,
                                newPassword,
                              }),
                            }
                          );
                          const data = await res.json();
                          setLoadingStage(null);
                          if (data.success) {
                            setMode("login");
                            setLoadingStage("success");
                            setStep(1);
                          } else {
                            setErrorMessage(data.error || "Reset failed");
                          }
                        } catch {
                          setLoadingStage(null);
                          setErrorMessage("Server error");
                        }
                      }}
                    >
                      <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                      <button type="submit" className="next-btn">
                        Reset Password
                      </button>
                    </form>
                  )}
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
