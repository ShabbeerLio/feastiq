import React, { useState } from "react";
import "./Profile.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Profile = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Updated:", formData);
    alert("Profile updated successfully!");
  };

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

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
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
                <option value="male">Male</option>
                <option value="female">Female</option>
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
            Save Changes
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
