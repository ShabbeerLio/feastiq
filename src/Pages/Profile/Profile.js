import React, { useEffect, useState } from "react";
import "./Profile.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Profile = () => {
  const Host = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("token");
  const [processing, setProcessing] = useState("");
  const [userData, setUserData] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${Host}/auth/getuser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const json = await response.json();
        setUserData(json);
        // Pre-fill form with data
        setFormData({
          name: json.name || "",
          email: json.email || "",
          age: json.age || "",
          gender: json.gender || "",
          weight: json.weight || "",
          height: json.height || "",
        });
      } catch (error) {
        console.log("error", error);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [Host, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing("Updating");
    try {
      const response = await fetch(`${Host}/auth/edituser`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        // alert("Profile updated successfully!");
        setUserData(result);
        setTimeout(() => {
          setProcessing("Updated");
        }, 2000);
        setTimeout(() => {
          setProcessing("");
        }, 3000);
      } else {
        console.log(result.error, "error");
        // alert(result.error || "Failed to update profile");
      }
    } catch (error) {
      console.log("Update error", error);
      // alert("Something went wrong!");
    }
  };

  console.warn = (message) =>
    message.includes("Buffer size mismatch") ? null : console.warn(message);

  return (
    <div className="Home">
      <div className="Home-main">
        <div className="glass-container">
          <div className="otherpage-box">
            <div className="wallet-status">
              <DotLottieReact
                className="wallet-success"
                src="https://lottie.host/c08624e7-818c-42c1-9046-f1087f1e663b/EoC98Sa2yq.lottie"
                loop
                autoplay
              />
            </div>
            <h5>Profile</h5>
          </div>
        </div>
        <div className="Other-pages-box">
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Age"
                />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="Weight"
                />
              </div>

              <div className="form-group">
                <label>Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="Height"
                />
              </div>
            </div>

            <button type="submit" className="seven-day-buttons help">
              {processing === "Updating"
                ? "Updating"
                : processing === "Updated"
                ? "Updated Successfully"
                : "Save Changes"}
              {/* Save Changes */}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
