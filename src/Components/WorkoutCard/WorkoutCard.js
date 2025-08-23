import React from "react";
import poses1 from "../../Assets/Poses/bench press.png";
import poses2 from "../../Assets/Poses/squats.png";
import poses3 from "../../Assets/Poses/Bent-over.png";
import poses4 from "../../Assets/Poses/overhead.png";
import poses5 from "../../Assets/Poses/bicep.png";
import poses6 from "../../Assets/Poses/Triceps.png";
import poses7 from "../../Assets/Poses/cycling.png";
import poses8 from "../../Assets/Poses/Deadlifts.png";
import poses9 from "../../Assets/Poses/Leg raises.png";
import poses10 from "../../Assets/Poses/Lunges.png";
import poses11 from "../../Assets/Poses/Plank.png";
import poses12 from "../../Assets/Poses/pullup.png";
import poses13 from "../../Assets/Poses/pushup.png";
import poses14 from "../../Assets/Poses/Russian twists.png";
import poses15 from "../../Assets/Poses/stretching.png";
import poses16 from "../../Assets/Poses/bicycle crunches.png";
import poses17 from "../../Assets/Poses/stepups.png";
import "./WorkoutCard.css";
import { useNavigate } from "react-router-dom";

const imageMap = {
  bench: poses1,
  squat: poses2,
  bent: poses3,
  overhead: poses4,
  bicep: poses5,
  tricep: poses6,
  cycling: poses7,
  deadlift: poses8,
  legraises: poses9,
  lunges: poses10,
  plank: poses11,
  pull: poses12,
  push: poses13,
  russian: poses14,
  stretching: poses15,
  bicycle: poses16,
  chin: poses12,
  step: poses17,
};

const WorkoutCard = ({ workoutPlan }) => {
  const navigate = useNavigate();

  const handleExerciseClick = (exercise) => {
    const keyword = exercise.name.toLowerCase();
    const matchedKey = Object.keys(imageMap).find((key) =>
      keyword.includes(key)
    );
    const matchedImage = matchedKey ? imageMap[matchedKey] : poses6;

    const exerciseInfo = {
      name: exercise.name,
      calories: exercise.calories,
      image: matchedImage,
    };

    navigate("/workout-detail", { state: { exerciseInfo } });
    localStorage.setItem("exerciseInfo", JSON.stringify(exerciseInfo));
  };

  return (
    <>
      {workoutPlan?.map((exercise, index) => {
        const keyword = exercise?.name?.toLowerCase() || "";

        const matchedKey = Object.keys(imageMap).find((key) =>
          keyword.includes(key)
        );
        const matchedImage = matchedKey ? imageMap[matchedKey] : poses6;

        const status = localStorage.getItem(
          `workoutStatus-${exercise.name}`
        );
        const cardClass =
          status === "completed"
            ? "exercises-card completed"
            : status === "skipped"
            ? "exercises-card skipped"
            : "exercises-card";

        return (
          <div
            key={index}
            className={cardClass}
            onClick={() => handleExerciseClick(exercise)}
          >
            <img src={matchedImage} alt={exercise.name} />
            <p>{exercise.name}</p>
            <span className={`status-badge ${status}`}>{status}</span>
          </div>
        );
      })}
    </>
  );
};

export default WorkoutCard;