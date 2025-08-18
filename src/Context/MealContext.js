// MealContext.js
import { createContext, useContext, useState } from "react";

const MealContext = createContext();

export const MealProvider = ({ children }) => {
  const [mealInfo, setMealInfo] = useState(null);
  return (
    <MealContext.Provider value={{ mealInfo, setMealInfo }}>
      {children}
    </MealContext.Provider>
  );
};

export const useMeal = () => useContext(MealContext);