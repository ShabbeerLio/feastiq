import React, { useState } from "react";
import "./History.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import glass from "../../Assets/glassbg.jpeg"

const History = () => {
  const [filter, setFilter] = useState("all");

  const subscriptions = [
    {
      id: 1,
      plan: "Weight Gain Plan - 3 Months",
      startDate: "2025-05-01",
      endDate: "2025-08-01",
      amount: "₹1499",
      status: "Active",
    },
    {
      id: 2,
      plan: "Weight Loss Plan - 1 Month",
      startDate: "2025-04-01",
      endDate: "2025-05-01",
      amount: "₹599",
      status: "Expired",
    },
    {
      id: 3,
      plan: "Custom Fitness + Meal Combo - 6 Months",
      startDate: "2024-10-01",
      endDate: "2025-04-01",
      amount: "₹2999",
      status: "Expired",
    },
  ];

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-11
  const currentYear = currentDate.getFullYear();

  // Filter logic
  const filteredSubscriptions = subscriptions.filter((sub) => {
    const start = new Date(sub.startDate);
    const end = new Date(sub.endDate);

    switch (filter) {
      case "month":
        return (
          (start.getMonth() === currentMonth &&
            start.getFullYear() === currentYear) ||
          (end.getMonth() === currentMonth && end.getFullYear() === currentYear)
        );
      case "3months":
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(currentMonth - 3);
        return start >= threeMonthsAgo || end >= threeMonthsAgo;
      case "6months":
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(currentMonth - 6);
        return start >= sixMonthsAgo || end >= sixMonthsAgo;
      case "year":
        return (
          start.getFullYear() === currentYear ||
          end.getFullYear() === currentYear
        );
      default:
        return true;
    }
  });

  return (
    <div className="Home">
      <div className="Home-main">
        <div className="glass-container liquid-glass">
          <div className="otherpage-box">
            <div className="wallet-status">
              <DotLottieReact
                className="wallet-success"
                src="https://lottie.host/5f7a12ee-88d4-4db0-947f-517892e40aee/jfx11DB4Ky.lottie"
                loop
                autoplay
              />
            </div>
            <h5>History</h5>
          </div>
        </div>

        <div className="Other-pages-box">
          <div className="history-card">
            <p className="history-subtitle">
              View your past and active subscriptions for meal & fitness plans.
            </p>

            {/* Filter Buttons */}
            <div className="filter-buttons">
              <button
                className={filter === "all" ? "active" : ""}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={filter === "month" ? "active" : ""}
                onClick={() => setFilter("month")}
              >
                This Month
              </button>
              <button
                className={filter === "3months" ? "active" : ""}
                onClick={() => setFilter("3months")}
              >
                Last 3 Months
              </button>
              <button
                className={filter === "6months" ? "active" : ""}
                onClick={() => setFilter("6months")}
              >
                Last 6 Months
              </button>
              <button
                className={filter === "year" ? "active" : ""}
                onClick={() => setFilter("year")}
              >
                {currentYear}
              </button>
            </div>

            {/* Subscription List */}
            <div className="subscription-list">
              {filteredSubscriptions.length > 0 ? (
                filteredSubscriptions.map((sub) => (
                  <div key={sub.id} className="subscription-item">
                    <div className="subscription-header">
                      <h5>{sub.plan}</h5>
                      <span
                        className={`status-badge ${
                          sub.status === "Active" ? "active" : "expired"
                        }`}
                      >
                        {sub.status}
                      </span>
                    </div>
                    <div className="subscription-details">
                      <p>
                        <strong>Start Date:</strong> {sub.startDate}
                      </p>
                      <p>
                        <strong>End Date:</strong> {sub.endDate}
                      </p>
                      <p>
                        <strong>Amount:</strong> {sub.amount}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-data">No subscriptions found for this filter.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="liquid-glass">
                {/* liquid glass */}
              </div>
              <svg style={{ display: "none" }}>
                <filter id="displacementFilter">
                  <feImage href={glass} preserveAspectRatio="none" />
                  <feDisplacementMap
                    in="SourceGraphic"
                    scale="200"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
              </svg>
    </div>
  );
};

export default History;