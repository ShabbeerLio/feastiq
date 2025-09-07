import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DeleteReq.css";
import NoteContext from "../../Context/FeastContext";

const DeleteReq = () => {
  const { userDetail, getUserDetails } = useContext(NoteContext);
  const navigate = useNavigate();
  const Host = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("token");
  const [email, setEmail] = useState("");
  const [loadingStage, setLoadingStage] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getUserDetails();
    }
  }, [navigate, token]);

  useEffect(() => {
    if (userDetail?.email) {
      setEmail(userDetail.email);
    }
  }, [userDetail]);

  const handleDeleteRequest = async (e) => {
    e.preventDefault();
    setLoadingStage("processing");

    try {
      const response = await fetch(`${Host}/auth/request-delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send delete request");
      }

      // ✅ Success
      setLoadingStage("success");
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      console.error("Error:", error);
      setLoadingStage(error.message); // pass error text
      if (error.message === "Delete request already submitted.") {
        setTimeout(() => navigate("/"), 3000);
      }
      setTimeout(() => setLoadingStage(""), 3000);
    }
  };

  console.warn = (message) =>
    message.includes("Buffer size mismatch") ? null : console.warn(message);

  return (
    <div className="Home">
      <div className="Home-main">
        <div className="DeleteReq">
          <div className="glass-container liquid-glass delete-account">
            {!loadingStage && (
              <>
                <div className="wallet-status">
                  <DotLottieReact
                    className="wallet-success"
                    src="https://lottie.host/41cc7029-c110-4137-89bd-354e38dbc933/fCDUEHgOxK.lottie"
                    loop
                    autoplay
                  />
                </div>
                <h5 className="title">Delete Account</h5>
                <p>
                  Deleting your account is permanent and cannot be undone.
                  Please confirm your email to proceed.
                </p>
                <form>
                  <input
                    type="email"
                    placeholder="Enter your account email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <button
                    className="delete-btn"
                    type="button"
                    onClick={handleDeleteRequest}
                  >
                    Request Account Deletion
                  </button>
                </form>
              </>
            )}

            {loadingStage === "processing" && (
              <div className="wallet-status">
                <DotLottieReact
                  className="wallet-success"
                  src="https://lottie.host/5066ed2e-4dbb-4c34-ac26-2bfada68301f/QJPWTrsYv7.lottie"
                  loop
                  autoplay
                />
                <h6>Processing your request...</h6>
              </div>
            )}

            {loadingStage === "success" && (
              <div className="wallet-status">
                <DotLottieReact
                  className="wallet-success"
                  src="https://lottie.host/e63d43ae-3f25-49b2-a2e4-721b5e4ed7dd/NjKNhinvXI.lottie"
                  loop
                  autoplay
                />
                <h6>Account deletion request sent ✅</h6>
              </div>
            )}

            {loadingStage === "Delete request already submitted." && (
              <div className="wallet-status">
                <DotLottieReact
                  className="wallet-success"
                  src="https://lottie.host/dda05599-0a01-4e69-9af9-cabe273a3b7e/DHnKWfgumK.lottie"
                  loop
                  autoplay
                />
                <h6 className="text-red-600">❌ {loadingStage}</h6>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteReq;
