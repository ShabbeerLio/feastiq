import { Check, ChevronLast } from "lucide-react";
import React, { useEffect, useState } from "react";
import Host from "../../Host";

const CompleteSkip = ({ detail }) => {
//   console.log(detail, "detail");
  const API_BASE_URL = Host;
  // Keep initial as null (safe default)
  const [mealStatus, setMealStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const todayDate = new Date().toISOString().split("T")[0];

  // 🔹 Save meal status into backend
  const updateStatus = async (status) => {
    if (!detail) return;
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
          workouts: [
            {
              type: detail.workout,
              caloriesBurned: detail.calories,
              duration: 30,
              status: status,
            },
          ],
        }),
      });

      if (!res.ok) throw new Error("Failed to update workout status");
      await res.json();

      setMealStatus(status); // update UI
    } catch (error) {
      console.error("Error updating Workout:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = () => updateStatus("completed");
  const handleSkip = () => updateStatus("skipped");

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

  const mealtypesData = todayPlan?.workout?.find(
    (m) => m.type.toLowerCase() === detail.type.toLowerCase()
  );

  useEffect(() => {
    if (mealtypesData?.status) {
      setMealStatus(mealtypesData.status);
    }
  }, [mealtypesData]);

  return (
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
        <p className="status completed">🎉 Workout Completed!</p>
      )}

      {mealStatus === "skipped" && (
        <p className="status skipped">⏭️ Workout Skipped</p>
      )}
    </div>
  );
};

export default CompleteSkip;
