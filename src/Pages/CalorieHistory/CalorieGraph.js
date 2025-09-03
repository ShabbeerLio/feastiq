import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const CalorieGraph = ({ feast, filter, userData }) => {
  const [metric, setMetric] = useState("all");
  const dailyMeals = feast.flatMap((i) => i.dailyMeals);

  // Build map for lookup
  const mealMap = dailyMeals.reduce((acc, day) => {
    const key = new Date(day.date).toISOString().split("T")[0];
    acc[key] = {
      calories: day.totals?.calories || 0,
      protein: day.totals?.protein || 0,
      carbs: day.totals?.carbs || 0,
      fats: day.totals?.fats || 0,
    };
    return acc;
  }, {});

  const today = new Date();
  let startDate;

  // Set start date based on filter
  switch (filter) {
    case "week":
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 6);
      break;
    case "month":
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      break;
    case "3months":
      startDate = new Date(today.getFullYear(), today.getMonth() - 3, 1);
      break;
    case "6months":
      startDate = new Date(today.getFullYear(), today.getMonth() - 6, 1);
      break;
    case "year":
      startDate = new Date(today.getFullYear(), 0, 1);
      break;
    case "all":
    default:
      const allDates = Object.keys(mealMap).map((d) => new Date(d));
      startDate = allDates.length > 0 ? new Date(Math.min(...allDates)) : today;
      break;
  }

  // Generate full date range
  const chartData = [];
  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    const key = d.toISOString().split("T")[0];
    chartData.push({
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      calories: mealMap[key]?.calories || 0,
      protein: mealMap[key]?.protein || 0,
      carbs: mealMap[key]?.carbs || 0,
      fats: mealMap[key]?.fats || 0,
    });
  }

  const colors = {
    calories: "#ff4f4fff",
    protein: "#3ca7ffff",
    carbs: "#ffd53fff",
    fats: "#3fff5fff",
  };

  // Extract target values from userData
  const targets = userData?.calorieBreakdown || {};
  const yDomain =
    metric !== "all"
      ? [0, Math.max(...chartData.map((d) => d[metric]), targets[metric] || 0)]
      : undefined;

  return (
    <div>
      <div className="form-group">
        <label>Select Metric:</label>
        <select value={metric} onChange={(e) => setMetric(e.target.value)}>
          <option value="all">All Metrics</option>
          <option value="calories">Calories</option>
          <option value="protein">Protein</option>
          <option value="carbs">Carbs</option>
          <option value="fats">Fats</option>
        </select>
      </div>

      <h6>
        {filter === "all"
          ? "All Data"
          : filter === "week"
          ? "Last 7 Days"
          : filter === "month"
          ? "This Month"
          : filter === "3months"
          ? "Last 3 Months"
          : filter === "6months"
          ? "Last 6 Months"
          : `${today.getFullYear()}`}
      </h6>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <XAxis dataKey="date" />
          {metric !== "all" && <YAxis domain={yDomain} />}
          <Tooltip />
          <Legend />
          {/* 🔴 Target line (from userData) */}
          {metric !== "all" && targets[metric] && (
            <ReferenceLine
              y={targets[metric]}
              stroke="red"
              strokeDasharray="3 3"
              label={`${metric} target: ${targets[metric]}`}
            />
          )}
          {metric === "all" ? (
            <>
              <Bar
                dataKey="calories"
                fill={colors.calories}
                radius={[25, 25, 0, 0]}
              />
              <Bar
                dataKey="protein"
                fill={colors.protein}
                radius={[25, 25, 0, 0]}
              />
              <Bar
                dataKey="carbs"
                fill={colors.carbs}
                radius={[25, 25, 0, 0]}
              />
              <Bar dataKey="fats" fill={colors.fats} radius={[25, 25, 0, 0]} />
            </>
          ) : (
            <Bar
              dataKey={metric}
              fill={colors[metric]}
              radius={[25, 25, 0, 0]}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CalorieGraph;
