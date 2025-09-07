import react from "react";
import FeastContext from "./FeastContext";
import { useState } from "react";

const ContextState = (props) => {
  const Host = process.env.REACT_APP_API_BASE_URL;
  const feastsData = [];
  const adminData = [];
  const userData = [];

  const [feast, setFeast] = useState(feastsData);
  const [adminDetail, setAdminDetail] = useState(adminData);
  const [userDetail, setUserDetail] = useState(userData);

  // Get all Feast
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
  // Get all Feast
  const getAdminDetails = async () => {
    const response = await fetch(`${Host}/admindetail/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json, "json");
    setAdminDetail(json);
  };
  // Get all Feast
  const getUserDetails = async () => {
    const response = await fetch(`${Host}/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    // console.log(json, "json");
    setUserDetail(json);
  };

  return (
    <FeastContext.Provider
      value={{
        feast,
        getFeast,

        adminDetail,
        getAdminDetails,

        userDetail,
        getUserDetails,
      }}
    >
      {props.children}
    </FeastContext.Provider>
  );
};

export default ContextState;
