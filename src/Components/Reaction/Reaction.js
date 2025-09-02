import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const reactionMap = {
  awful:   { src: "https://lottie.host/bb80adeb-98cb-45df-b704-1837414ca552/3yYjLln0Dh.lottie", label: "Awful" },
  bad:     { src: "https://lottie.host/0e42ef7d-570d-4efd-aa1d-aa0924bd9737/C6xGWn2Gqs.lottie", label: "Bad" },
  neutral: { src: "https://lottie.host/03df9198-bada-4a6b-934c-3f82c2532b82/SQK2BBegtQ.lottie", label: "Neutral" },
  good:    { src: "https://lottie.host/da4e0743-def9-43d8-b563-297e519c89f2/e8NCx4dqfl.lottie", label: "Good" },
  excellent:{ src:"https://lottie.host/9a1655f5-2c41-4c62-bd3b-4fa359b38687/MJdg386Qs6.lottie", label: "Excellent" },
  calorie: { src: "https://lottie.host/5f7a12ee-88d4-4db0-947f-517892e40aee/jfx11DB4Ky.lottie", label: "Calorie" }, // Not Started Yet
};

// ---- helpers --------------------------------------------------------------

// local YYYY-MM-DD (avoid UTC shift)
const ymdLocal = (d) => {
  const Y = d.getFullYear();
  const M = String(d.getMonth() + 1).padStart(2, "0");
  const D = String(d.getDate()).padStart(2, "0");
  return `${Y}-${M}-${D}`;
};

// clone + set to local midnight
const atMidnight = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

// inclusive list of YYYY-MM-DD between start & end (both local-midnight)
const enumerateDays = (start, end) => {
  const out = [];
  const d = atMidnight(start);
  const e = atMidnight(end);
  while (d <= e) {
    out.push(ymdLocal(d));
    d.setDate(d.getDate() + 1);
  }
  return out;
};

// pick start date from filter; for "all", use earliest meal date
const getRange = (filter, meals) => {
  const today = atMidnight(new Date());
  const yesterday = atMidnight(new Date());
  yesterday.setDate(yesterday.getDate() - 1);

  let start;

  if (filter === "week") {
    start = atMidnight(new Date());
    start.setDate(start.getDate() - 6);
  } else if (filter === "month") {
    start = atMidnight(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  } else if (filter === "3months") {
    start = atMidnight(new Date(new Date().getFullYear(), new Date().getMonth() - 3, 1));
  } else if (filter === "6months") {
    start = atMidnight(new Date(new Date().getFullYear(), new Date().getMonth() - 6, 1));
  } else if (filter === "year") {
    start = atMidnight(new Date(new Date().getFullYear(), 0, 1));
  } else {
    // "all"
    if (!meals || meals.length === 0) return { start: yesterday, end: yesterday, days: [] };
    const earliest = meals
      .map((d) => atMidnight(new Date(d.date)))
      .sort((a, b) => a - b)[0];
    start = earliest || yesterday;
  }

  // end is yesterday (don’t penalize today)
  const end = yesterday;

  // if start is after end (e.g., first day of month is today), clamp to end
  if (start > end) start = end;

  const days = enumerateDays(start, end);
  return { start, end, days };
};

// thresholds scaled from weekly rule:
// 0 missed -> excellent
// <= 2/7 -> good
// <= 4/7 -> neutral
// <= 5/7 -> bad
// >  5/7 -> awful
const pickStatus = (missed, total) => {
  if (total === 0) return "calorie";
  if (missed === 0) return "excellent";

  const goodCutoff    = Math.floor((2 * total) / 7);
  const neutralCutoff = Math.floor((4 * total) / 7);
  const badCutoff     = Math.floor((5 * total) / 7);

  if (missed <= goodCutoff) return "good";
  if (missed <= neutralCutoff) return "neutral";
  if (missed <= badCutoff) return "bad";
  return "awful";
};

// ---- component ------------------------------------------------------------

const Reaction = ({ meals = [], filter = "week" }) => {
  // quick exit: really no data at all
  if (!Array.isArray(meals)) meals = [];

  // map by day key
  const mealMap = meals.reduce((acc, day) => {
    const key = ymdLocal(atMidnight(new Date(day.date)));
    acc[key] = day; // keep whole day; we'll inspect .meals or .totals
    return acc;
  }, {});

  const { days } = getRange(filter, meals);

  // If no days in the selected range OR none of those days have entries → Not Started Yet
  const anyInRange = days.some((d) => !!mealMap[d]);
  if (days.length === 0 || !anyInRange) {
    const { src, label } = reactionMap.calorie;
    return (
      <div className="reaction-container calorie" style={{ textAlign: "center" }}>
        <div className="react-status">
          <DotLottieReact className="wallet-success" src={src} loop autoplay />
        </div>
        <h6 style={{ margin: "5px 0" }}>{label}</h6>
        <p style={{ fontSize: "0.85rem", color: "white" }}>Not Started Yet</p>
      </div>
    );
  }

  let totalDays = days.length;
  let completedDays = 0;

  for (const key of days) {
    const dayEntry = mealMap[key];
    if (!dayEntry) continue;
    const hasAnyMeal = Array.isArray(dayEntry.meals) && dayEntry.meals.length > 0;

    const hasTotals =
      dayEntry?.totals &&
      (dayEntry.totals.calories > 0 ||
        dayEntry.totals.protein > 0 ||
        dayEntry.totals.carbs > 0 ||
        dayEntry.totals.fats > 0);

    if (hasAnyMeal || hasTotals) completedDays++;
  }

  const missedDays = totalDays - completedDays;
  const status = pickStatus(missedDays, totalDays);
  const { src, label } = reactionMap[status];

  let description = "";
  if (status === "calorie") {
    description = "Not Started Yet";
  } else if (missedDays === 0) {
    description = `Perfect! You completed all ${totalDays} day${totalDays > 1 ? "s" : ""}.`;
  } else if (missedDays === 1) {
    description = "You missed only 1 day.";
  } else {
    description = `You missed ${missedDays} days.`;
  }

  return (
    <div className={`reaction-container ${status}`} style={{ textAlign: "center" }}>
      <div className="react-status">
        <DotLottieReact className="wallet-success" src={src} loop autoplay />
      </div>
      <h6 style={{ margin: "5px 0" }}>{label}</h6>
      <p style={{ fontSize: "0.85rem", color: "white" }}>{description}</p>
    </div>
  );
};

export default Reaction;