import React, { useContext, useEffect, useState } from "react";
import "./Bmi.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import glass from "../../Assets/glassbg.jpeg";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
} from "recharts";
import Ads from "../../Components/Ads/Ads";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import calculation from "../../Assets/Bmi.png";
import NoteContext from "../../Context/FeastContext";
import { useNavigate } from "react-router-dom";

const BMIPage = () => {
    const { userDetail, getUserDetails, } = useContext(NoteContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        } else {
            getUserDetails();
        }
    }, [navigate]);

    const Host = process.env.REACT_APP_API_BASE_URL;
    const token = localStorage.getItem("token");
    
    const [userData, setUserData] = useState(null);
    const [bmiData, setBmiData] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [chartData, setChartData] = useState([]);

    // modal states
    const [showModal, setShowModal] = useState(false);
    const [newWeight, setNewWeight] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const json = await userDetail;
                setUserData(json);

                if (json.height && json.weight) {
                    calculateBMI(json.height, json.weight);
                }

                if (json.weightHistory && json.weightHistory.length > 0) {
                    const formatted = json.weightHistory.map((entry) => ({
                        date: new Date(entry.date).getTime(), // ✅ use timestamp
                        weight: entry.weight,
                    }));
                    setChartData(formatted);
                } else {
                    setChartData([{ date: new Date().getTime(), weight: json.weight }]);
                }
            } catch (error) {
                console.log("error", error);
            }
        };

        if (token) fetchUser();
    }, [Host, token]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 1);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const calculateBMI = (heightCm, weightKg) => {
        const heightM = heightCm / 100;
        const bmi = (weightKg / (heightM * heightM)).toFixed(1);

        let category = "";
        if (bmi < 18.5) category = "Underweight";
        else if (bmi >= 18.5 && bmi < 24.9) category = "Normal weight";
        else if (bmi >= 25 && bmi < 29.9) category = "Overweight";
        else category = "Obese";

        const minWeight = (18.5 * heightM * heightM).toFixed(1);
        const maxWeight = (24.9 * heightM * heightM).toFixed(1);

        setBmiData({
            bmi,
            category,
            minWeight,
            maxWeight,
            heightM: heightM.toFixed(2),
            weightKg,
        });
    };

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
                setTimeout(() => {
                    setShowModal(false);
                    window.location.reload(); // refresh chart
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

    console.warn = (message) =>
        message.includes("Buffer size mismatch") ? null : console.warn(message);

    // console.log(chartData, "chartData")
      const handleClose = () => setIsScrolled(false);

    return (
        <div className="Home">
            <div className="Home-main">
                <div className="glass-container liquid-glass">
                    <div className="otherpage-box">
                        <div className="wallet-status">
                            <DotLottieReact
                                className="wallet-success"
                                src="https://lottie.host/caa70555-c6a5-44c5-b49b-c451d277994f/ObCwD4QgNY.lottie"
                                loop
                                autoplay
                            />
                        </div>
                        <h5>BMI <span>(Body Mass Index)</span></h5>
                    </div>
                </div>

                <div className={`home-scroll bmi ${isScrolled ? "scrolled" : ""}`}>
                    <div className="home-scroll-box">
                        <div className="history-card">
                            <div className="headerfornavigate">
                        <h5 className="mealdetail-title">
                            <ChevronLeft
                                className="cursor-pointer"
                                onClick={() => navigate(-1)} // goes back to previous page
                            /> BMI Report
                        </h5>
                        <h5>{isScrolled && <ChevronDown onClick={handleClose} />}</h5>
                    </div>
                            <div className="bmi-card">
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart
                                        data={chartData}
                                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                                    >
                                        <XAxis
                                            dataKey="date"
                                            stroke="#ffffff"
                                            tick={{ fill: "#ffffff" }}
                                            tickFormatter={(ts) => {
                                                const d = new Date(ts);
                                                return `${d.getMonth() + 1}/${d.getDate()}`;
                                            }}
                                        />
                                        <YAxis
                                            stroke="#ffffff"
                                            tick={{ fill: "#ffffff" }}
                                            domain={[
                                                Number(bmiData?.minWeight),
                                                Number(bmiData?.maxWeight),
                                            ]}
                                        />
                                        <Tooltip
                                            labelFormatter={(ts) => {
                                                const d = new Date(ts);
                                                return `${d.toLocaleDateString()}`
                                            }}
                                            formatter={(value, name) => [`${value} kg`, "Weight"]}
                                        />
                                        <Legend />

                                        <Line
                                            type="monotone"
                                            dataKey="weight"
                                            stroke="#e8ff3cff"
                                            strokeWidth={3}
                                            dot={{ r: 5 }}
                                            activeDot={{ r: 8 }}
                                        />

                                        <ReferenceLine
                                            y={bmiData?.minWeight}
                                            label={`Min Ideal (${bmiData?.minWeight}kg)`}
                                            stroke="green"
                                            strokeDasharray="4 4"
                                        />
                                        <ReferenceLine
                                            y={bmiData?.maxWeight}
                                            label={`Max Ideal (${bmiData?.maxWeight}kg)`}
                                            stroke="orange"
                                            strokeDasharray="4 4"
                                            strokeWidth={2}
                                        />
                                        <ReferenceLine
                                            y={Math.max(bmiData?.weightKg, bmiData?.minWeight)}
                                            stroke="red"
                                            strokeWidth={2}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                            <h6
                                className="seven-day-buttons"
                                onClick={() => setShowModal(true)}
                            >
                                Update Weight <ChevronRight />
                            </h6>
                            <Ads />

                            {/* --- Update Weight Modal --- */}
                            <div className={`modal-overlay ${showModal}`}>
                                <div className="modal-content liquid-glass">
                                    <h4>Update Your Weight</h4>
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
                                                    src="https://lottie.host/cf5cf153-8658-460c-8b18-f94ccda10b81/t5omOi421I.lottie"
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

                            <div className="bmi-card">
                                <p>
                                    <strong>Height:</strong> {userData?.height} cm (
                                    {bmiData?.heightM} m)
                                </p>
                                <p>
                                    <strong>Weight:</strong> {chartData[0]?.weight} kg →{" "}
                                    {chartData[chartData.length - 1]?.weight} kg
                                </p>
                                <p>
                                    <strong>Goal:</strong> {userData?.goal}
                                </p>

                                <hr />

                                <h5>Your BMI: {bmiData?.bmi}</h5>
                                <div className="bmi-status" onClick={() => window.location.href = "/calorie-history"}>
                                    <p className={`bmi-category ${bmiData?.category.replace(" ", "-").toLowerCase()}`}>
                                        <strong>Current Status:</strong> {bmiData?.category === "Underweight"
                                            ? "⚠️ Underweight"
                                            : bmiData?.category === "Normal weight"
                                                ? "✅ Normal weight"
                                                : bmiData?.category === "Overweight"
                                                    ? "⚠️ Overweight"
                                                    : "❌ Obese"}
                                    </p>
                                    <span><ChevronRight /></span>

                                </div>

                            </div>

                            <div className="bmi-card">
                                <p>
                                    Ideal Weight Range: {bmiData?.minWeight} kg –{" "}
                                    {bmiData?.maxWeight} kg
                                </p>
                                {userData?.goal && (
                                    <p>
                                        Based on your goal (<strong>{userData?.goal}</strong>), you
                                        should aim to be within {bmiData?.minWeight} –{" "}
                                        {bmiData?.maxWeight} kg.
                                    </p>
                                )}
                            </div>


                            <h5>Calculation:</h5>
                            <div className="bmi-card bmi-calculation">
                                <img src={calculation} alt="" />
                                <p>BMI = Weight (kg) ÷ [Height (m) × Height (m)]</p>
                                <p>
                                    BMI = {bmiData?.weightKg} ÷ ({bmiData?.heightM} ×{" "}
                                    {bmiData?.heightM})
                                </p>
                                <p>BMI = {bmiData?.bmi}</p>
                            </div>
                            <Ads />
                        </div>
                    </div>
                </div>
            </div>
            <div className="liquid-glass"></div>
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

export default BMIPage;