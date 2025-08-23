import react from "react";
import FeastContext from "./FeastContext";
import { useState } from "react";

const ContextState = (props) => {
  const Host = process.env.REACT_APP_API_BASE_URL;
  const feastsData = [];

  const [feast, setFeast] = useState(feastsData);

  // Get all gochar
  const getFeast = async () => {
    const response = await fetch(`${Host}/detail/fetchfeast`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json, "json");
    setFeast(json);
  };

  return (
    <FeastContext.Provider
      value={{
        feast,
        getFeast,
      }}
    >
      {props.children}
    </FeastContext.Provider>
  );
};

export default ContextState;
