import React, { useContext, useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import glass from "../../Assets/glassbg.jpeg";
import { useLocation, useNavigate } from "react-router-dom";
import Ads from "../../Components/Ads/Ads";
import "./Checkout.css"
import NoteContext from "../../Context/FeastContext";
import { ChevronRight, PartyPopper, X } from "lucide-react";

const Checkout = () => {
  const { userDetail, getUserDetails, } = useContext(NoteContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getUserDetails();
    }
  }, [navigate]);

  const [isScrolled, setIsScrolled] = useState(false);
  const Host = process.env.REACT_APP_API_BASE_URL;
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState();
  const location = useLocation();
  const [coupons, setCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [voucherMessage, setVoucherMessage] = useState("")
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
  });

  const checkoutData = location.state; // { type, data }
  const { type, data } = checkoutData || {};

  // Find base price
  const getBasePrice = () => {
    switch (type) {
      case "subscription":
        return data.slprice;
      case "product":
        return data.price;
      default:
        return 0;
    }
  };
  const basePrice = getBasePrice();

  // Fetch Coupons
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch(`${Host}/coupons`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const json = await response.json();
        setCoupons(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    if (token) fetchCoupons();
  }, [Host, token]);

  // Redirect if no checkout data
  useEffect(() => {
    if (!checkoutData?.data) {
      navigate("/", { replace: true });
    }
    if (userDetail?.subscription?.plan === "Free") {
      setTimeout(() => {
        setShowAlert(true)
      }, 1000);
    }
  }, [checkoutData, navigate]);

  // Scroll effect
  useEffect(() => {
            const handleScroll = () => {
              const scrollTop = window.scrollY;
              const windowHeight = window.innerHeight;
              const docHeight = document.documentElement.scrollHeight;
        
              // how much user has scrolled in %
              const scrolledPercent = (scrollTop + windowHeight) / docHeight * 100;
        
              if (scrolledPercent >= 99) {
                setIsScrolled(true);
              } else {
                setIsScrolled(false);
              }
            };
    
            setTimeout(() => setIsScrolled(false), 500);
        
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
          }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const json = await userDetail;
        setUserData(json);
        // Pre-fill form with data
        if (json?.invoices && json.invoices.length > 0) {
          const invoices = json?.invoices;
          const lastInvoice = invoices && invoices.length > 0 ? invoices[invoices.length - 1] : null;
          setBillingDetails({
            name: lastInvoice.name || "",
            email: lastInvoice.email || "",
            phone: lastInvoice.phone || "",
            address: lastInvoice.address || "",
            pincode: lastInvoice.pincode || "",
            city: lastInvoice.city || "",
            state: lastInvoice.state || "",
          });
        }
        else {
          setBillingDetails({
            name: json.name || "",
            email: json.email || "",
          });
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [Host, token]);

  // Apply coupon
  const handleApplyCoupon = () => {
    if (!couponCode) {
      setErrorMessage("Please enter a coupon code");
      return;
    }

    const foundCoupon = coupons.find(
      (c) =>
        c.code.toLowerCase() === couponCode.toLowerCase() &&
        c.status === "enable" &&
        c.type === type
    );

    if (foundCoupon) {
      setAppliedCoupon(foundCoupon);
      setErrorMessage("");
      const newPrice = basePrice - (basePrice * foundCoupon.discount) / 100;
      setDiscountedPrice(newPrice.toFixed(2));
    } else {
      setErrorMessage("Invalid or expired coupon");
    }
  };

  // Remove coupon
  const handleRemoveCoupon = () => {
    setVoucherMessage("")
    setAppliedCoupon(null);
    setDiscountedPrice(null);
    setCouponCode("");
    setErrorMessage("");
  };

  // Final Subscribe
  const handleSubscribe = async () => {
    try {
      if (voucherMessage) {
        const finalPrice = discountedPrice || basePrice;
        const transactionId = "TXN" + Date.now()

        const response = await fetch(`${Host}/subscription/assign`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify({
            plan: data.plan,
            paymentMethod: "online", // you can update based on user selection
            transactionId: transactionId,
            couponCode: appliedCoupon?.code || null,
          }),
        });

        const result = await response.json();
        if (result.success) {
          await handleInvoice(finalPrice, transactionId);
        }
      }
      else{
        setStatus("Error");
        setTimeout(() => {
          navigate("/")
        }, 4000);
      }
    } catch (error) {
      setStatus("Error");
      setTimeout(() => {
          navigate("/")
        }, 4000);
      console.log("Subscribe error", error);
    }
  };

  // Invoice API
  const handleInvoice = async (finalPrice, transactionId) => {
    console.log(billingDetails, "billingDetails")
    try {
      let response2 = await fetch(`${Host}/invoice/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          type,
          transactionId,
          plan: data.plan,
          price: finalPrice,
          ...billingDetails,
        }),
      });

      let data2 = await response2.json();
      if (data2.success) {
        setStatus("successful");
        setTimeout(() => {
          setStatus("")
          setShowModal(false)
        }, 3000);
        setTimeout(() => {
          navigate("/")
        }, 4000);
      }
    } catch (error) {
      console.log("Invoice error", error);
    }
  };

  // Billing form submit
  const handleBillingSubmit = (e) => {
    e.preventDefault();
    setShowModal(true)
    setStatus("Processing");
    if (!billingDetails.name || !billingDetails.email) {
      alert("Please fill required fields");
      return;
    }
    handleSubscribe();
  };

  const handleCollectVoucher = () => {
    setShowAlert(false)
    if (coupons.length > 0) {
      const firstCoupon = coupons[0];
      setCouponCode(firstCoupon.code);
      setVoucherMessage("Conratulations! You are our 1st 100 users")

      // apply it directly
      if (firstCoupon.status === "enable" && firstCoupon.type === type) {
        setAppliedCoupon(firstCoupon);
        setErrorMessage("");
        const newPrice = basePrice - (basePrice * firstCoupon.discount) / 100;
        setDiscountedPrice(newPrice.toFixed(2));
      } else {
        setErrorMessage("Voucher not valid for this checkout");
      }
    } else {
      setErrorMessage("No vouchers available");
    }
  };

  if (!checkoutData?.data) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>Redirecting...</p>
    );
  }
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
                src="https://lottie.host/bbdd9a0a-c63a-4840-8f54-faa5e4f3b614/iPzo4oioVV.lottie"
                loop
                autoplay
              />
            </div>
            <h5>Checkout</h5>
          </div>
        </div>

        <div className={`home-scroll bmi ${isScrolled ? "scrolled" : ""}`}>
          <div className="home-scroll-box">
            <div className="history-card">
              <h5>Checkout - {type.charAt(0).toUpperCase() + type.slice(1)}</h5>

              {/* Subscription */}
              {type === "subscription" && (
                <div key={data._id} className={`bmi-card sub-plan ${data.plan}`}>
                  <div className="sub-plan-top">
                    <div className="sub-plan-top-left">
                      <h6>{data.plan}</h6>
                      <p>{data.description}</p>
                    </div>
                    <div className="sub-plan-top-right">
                      <h5>
                        ₹{discountedPrice || data.slprice}{" "}
                        {discountedPrice && <del>{data.slprice}</del>}
                      </h5>
                      <p>+GST</p>
                    </div>
                  </div>
                  {voucherMessage &&
                    <div className="voucher-message">
                      <p><PartyPopper />{voucherMessage}</p>
                    </div>
                  }


                </div>
              )}

              {/* Product */}
              {/* {type === "product" && (
                <div className="bmi-card">
                  <h6>{data.name}</h6>
                  <p>{data.description}</p>
                  <h5>
                    ₹{discountedPrice || data.price}{" "}
                    {discountedPrice && <del>{data.price}</del>}
                  </h5>
                </div>
              )} */}

              {/* Coupon Input (only show if no coupon applied) */}
              {!appliedCoupon && (
                <div className="bmi-card">
                  <div className="coupon-box">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button onClick={handleApplyCoupon}>Apply</button>
                  </div>
                  {errorMessage && <p className="coupon-error">{errorMessage}</p>}
                </div>
              )}

              {/* Summary Box */}
              <div className="bmi-card checkout-total-box">
                <p>Total: <span> ₹{basePrice}</span></p>
                {appliedCoupon && (
                  <>
                    <p>
                      Coupon: <span>
                        <button onClick={handleRemoveCoupon}>Remove</button>
                        <b>{appliedCoupon.code}</b>{" "}
                      </span>
                    </p>
                    <p>Discount: <span>-₹{((basePrice * appliedCoupon.discount) / 100).toFixed(2)}</span></p>
                  </>
                )}
                <h5>Subtotal: <span>₹{discountedPrice || basePrice}</span> </h5>
              </div>

              {/* Step 1: Proceed */}
              {!showBillingForm && (
                <h6
                  className="seven-day-buttons"
                  onClick={() => setShowBillingForm(true)}
                >
                  Proceed to Payment
                </h6>
              )}
              {/* Step 2: Billing Form */}
              {showBillingForm && (
                <form className="bmi-card billing-form" onSubmit={handleBillingSubmit}>
                  <h6>Billing Details</h6>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={billingDetails.name}
                    onChange={(e) =>
                      setBillingDetails({
                        ...billingDetails,
                        name: e.target.value,
                      })
                    }
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={billingDetails.email}
                    onChange={(e) =>
                      setBillingDetails({
                        ...billingDetails,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                  <input
                    type="number"
                    placeholder="Phone"
                    value={billingDetails.phone}
                    onChange={(e) =>
                      setBillingDetails({
                        ...billingDetails,
                        phone: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={billingDetails.address}
                    onChange={(e) =>
                      setBillingDetails({
                        ...billingDetails,
                        address: e.target.value,
                      })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Pincode"
                    value={billingDetails.pincode}
                    onChange={(e) =>
                      setBillingDetails({
                        ...billingDetails,
                        pincode: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={billingDetails.city}
                    onChange={(e) =>
                      setBillingDetails({
                        ...billingDetails,
                        city: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={billingDetails.state}
                    onChange={(e) =>
                      setBillingDetails({
                        ...billingDetails,
                        state: e.target.value,
                      })
                    }
                  />
                  <button type="submit" className="seven-day-buttons">
                    Confirm & Subscribe
                  </button>
                </form>
              )}
              {/* --- Update Weight Modal --- */}
              <div className={`modal-overlay ${showModal}`}>
                <div className="modal-content liquid-glass">
                  {status === "Processing" &&
                    <>
                      <div className="wallet-status">
                        <DotLottieReact
                          className="wallet-success"
                          src="https://lottie.host/5066ed2e-4dbb-4c34-ac26-2bfada68301f/QJPWTrsYv7.lottie"
                          loop
                          autoplay
                        />
                        <p className="status-msg">{status}</p>
                      </div>
                    </>
                  }
                  {status === "successful" &&
                    <>
                      <div className="wallet-status">
                        <DotLottieReact
                          className="wallet-success"
                          src="https://lottie.host/e63d43ae-3f25-49b2-a2e4-721b5e4ed7dd/NjKNhinvXI.lottie"
                          loop
                          autoplay
                        />
                        <p className="status-msg">{status}</p>
                      </div>
                    </>
                  }
                  {status === "Error" &&
                    <>
                      <div className="wallet-status">
                        <DotLottieReact
                          className="wallet-success"
                          src="https://lottie.host/dd6421fc-909f-4cd9-a504-52b0e952886c/QsiJljc2b3.lottie"
                          loop
                          autoplay
                        />
                        <p className="status-msg">Server Not responding, Please tyr again later.</p>
                      </div>
                    </>
                  }
                </div>
              </div>
              <Ads />
            </div>
          </div>
        </div>
        <div className={`modal-overlay ${showAlert}`}>
          <div className="modal-content liquid-glass">
            <div
              className="subscription-end-alert voucher-box"
            >
              <div className="wallet-status voucher">
                <h1 className="status-msg">Congratulations</h1>
                <p className="status-msg">You are our 1st 1000 user</p>
              </div>
              <div className="wallet-status">
                <DotLottieReact
                  className="wallet-success Congratulations"
                  src="https://lottie.host/968f1433-70b9-42ce-a73a-fe52464b9c5e/uv81rsKJ3r.lottie"
                  loop
                  autoplay
                />
              </div>
              <h6 className="seven-day-buttons" onClick={() => handleCollectVoucher()}>
                Collect Voucher<ChevronRight />
              </h6>
            </div>
          </div>
        </div>
      </div>

      <div className="liquid-glass"></div>
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

export default Checkout;