import React, { useContext, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import NoteContext from "../../Context/FeastContext";

const CalorieGraph = () => {
  const { feast } = useContext(NoteContext);
  const [metric, setMetric] = useState("calories");

  // Flatten all dailyMeals from feast
  const dailyMeals = feast.flatMap((i) => i.dailyMeals);

  // Make a map for quick lookup by date (YYYY-MM-DD)
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

  // Generate last 7 days including today
  const today = new Date();
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (6 - i)); // oldest to newest
    const key = d.toISOString().split("T")[0];
    return {
      date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      calories: mealMap[key]?.calories || 0,
      protein: mealMap[key]?.protein || 0,
      carbs: mealMap[key]?.carbs || 0,
      fats: mealMap[key]?.fats || 0,
    };
  });

  // Metric colors
  const colors = {
    calories: "#ff4f4fff",
    protein: "#3ca7ffff",
    carbs: "#ffd53fff",
    fats: "#3fff5fff",
  };

  return (
    <div style={{ width: "100%", height: 400 }}>
      {/* Dropdown */}
      <div>
        <label>Select Metric:</label>
        <select value={metric} onChange={(e) => setMetric(e.target.value)}>
          <option value="calories">Calories</option>
          <option value="protein">Protein</option>
          <option value="carbs">Carbs</option>
          <option value="fats">Fats</option>
        </select>
      </div>

      <h6>Last 7 Days Overview</h6>
      <ResponsiveContainer>
        <BarChart data={last7Days}>
          <XAxis dataKey="date" />
          {/* <YAxis /> */}
          <Tooltip />
          <Bar dataKey={metric} fill={colors[metric]} radius={[25, 25, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CalorieGraph;
