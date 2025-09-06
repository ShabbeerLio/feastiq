import React, { useEffect, useState } from "react";
import "./History.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import glass from "../../Assets/glassbg.jpeg";

const History = () => {
  const [filter, setFilter] = useState("all");
  const Host = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState();
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
      } catch (error) {
        console.log("error", error);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [Host, token]);

  const subscriptions = userData?.subscriptionHistory || [];
  const invoices = userData?.invoices || [];

  if (!subscriptions) {
    return <p>loading...</p>
  }

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-11
  const currentYear = currentDate.getFullYear();

  // Format date to "06 Sep, 2025"
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Normalize date to YYYY-MM-DD
  const normalizeDate = (dateStr) => {
    if (!dateStr) return null;
    return new Date(dateStr).toISOString().split("T")[0]; // "YYYY-MM-DD"
  };

  // Filter logic (using sub.date)
  const filteredSubscriptions = subscriptions?.filter((sub) => {
    const subDate = new Date(normalizeDate(sub.date));

    switch (filter) {
      case "month":
        return (
          subDate.getMonth() === currentMonth &&
          subDate.getFullYear() === currentYear
        );
      case "3months":
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(currentMonth - 3);
        return subDate >= threeMonthsAgo;
      case "6months":
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(currentMonth - 6);
        return subDate >= sixMonthsAgo;
      case "year":
        return subDate.getFullYear() === currentYear;
      default:
        return true;
    }
  });

  // When subscription card is clicked → find invoice & open modal
  const handleOpenInvoice = (sub) => {
    const invoice = invoices.find(
      (inv) => inv.transactionId === sub.transactionId
    );
    setSelectedInvoice(invoice || null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedInvoice(null);
    setShowModal(false);
  };

  console.log(selectedInvoice,"setSelectedInvoice")

  console.warn = (message) =>
    message.includes("Buffer size mismatch") ? null : console.warn(message);

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
                  <div key={sub.id} className="subscription-item" onClick={() => handleOpenInvoice(sub)}>
                    <div className="subscription-header">
                      <h5>{sub.plan} <span>( {formatDate(sub.date)} )</span></h5>
                      <span
                        className={`status-badge ${sub.status === "Active" ? "active" : "expired"
                          }`}
                      >
                        {sub.status}
                      </span>
                    </div>
                    <div className="subscription-details">
                      <p>
                        <strong>Start Date:</strong> {formatDate(sub.startDate)}
                      </p>
                      <p>
                        <strong>End Date:</strong> {formatDate(sub.endDate)}
                      </p>
                      <p>
                        <strong>TransactionId:</strong> {sub.transactionId}
                      </p>
                      <p>
                        <strong>Payment Method:</strong> {sub.paymentMethod}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-data">
                  No subscriptions found for this filter.
                </p>
              )}
            </div>
          </div>
        </div>
        {/* --- Update Weight Modal --- */}
        <div className={`modal-overlay ${showModal}`}>
          <div className="modal-content liquid-glass">
            <h4>Invoice <span>({selectedInvoice?.invoiceNumber})</span></h4>
            <p><strong>Plan:</strong> {selectedInvoice?.plan}</p>
            <p><strong>Price:</strong> {selectedInvoice?.price}</p>
            <p><strong>Name:</strong> {selectedInvoice?.name}</p>
            <p><strong>Email:</strong> {selectedInvoice?.email}</p>
            <p><strong>Phone No.:</strong> {selectedInvoice?.phone}</p>
            <p><strong>Address:</strong> {selectedInvoice?.address + " ," + selectedInvoice?.city + " ," + selectedInvoice?.state + " (" + selectedInvoice?.pincode + ")"}</p>
            <p><strong>Transaction ID:</strong> {selectedInvoice?.transactionId}</p>
            <p><strong>Date:</strong> {formatDate(selectedInvoice?.date)}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      </div>
      <div className="liquid-glass">{/* liquid glass */}</div>
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
