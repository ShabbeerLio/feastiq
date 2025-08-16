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
    russianTwist: poses14,
    stretching: poses15,
    bicycle: poses16,
    chin: poses12,
    step: poses17,
};

const WorkoutCard = ({ workoutPlan }) => {
    return (
        <>
            {workoutPlan?.map((exercise, index) => {
                const keyword = exercise.toLowerCase();

                // Find matching key from imageMap
                const matchedKey = Object.keys(imageMap).find((key) =>
                    keyword.includes(key)
                );

                // Use the matched image, or a default fallback
                const matchedImage = matchedKey ? imageMap[matchedKey] : poses6;

                return (
                    <div key={index} className="exercises-card">
                        <img src={matchedImage} alt={exercise} />
                        <p>{exercise}</p>
                    </div>
                );
            })}
        </>
    );
};

export default WorkoutCard;