import React, { useContext, useEffect, useState } from "react";
import "./OtherPages.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link, useNavigate } from "react-router-dom";
import glass from "../../Assets/glassbg.jpeg"
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import NoteContext from "../../Context/FeastContext";
import { X } from "lucide-react";
import Host from "../../Host";
import Ads from "../../Components/Ads/Ads";

const Help = () => {
  const { userDetail, getUserDetails } = useContext(NoteContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getUserDetails();
    }
  }, [navigate]);

  const token = localStorage.getItem("token");

  const faqs = [
    {
      question: "How do I set up my meal plan?",
      answer:
        "Go to the Meal Plan section, select your goal (weight gain, loss, or maintenance), and choose from our weekly plans. The app will remind you 10 minutes before each meal.",
    },
    {
      question: "How do I track my workouts?",
      answer:
        "Head over to the Fitness section. Each exercise includes instructions, sets, and reps. Tap on any workout to see details and images of the exercise.",
    },
    {
      question: "Why am I not receiving notifications?",
      answer:
        "Make sure notifications are enabled in your device settings and that you’ve allowed the app to send reminders. If still not working, try logging out and logging in again.",
    },
    {
      question: "Can I customize my diet?",
      answer:
        "Yes! You can replace meals in your plan with alternatives by clicking the 'Customize' button in the Meal section.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can reach us via the Contact Support button at the bottom of this page or email us at support@mealfitness.com.",
    },
  ];

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false)
  const [openBox, setOpenBox] = useState(false)
  const [querys, setQuerys] = useState("")
  const [formData, setFormData] = useState({
    name: userDetail?.name,
    email: userDetail?.email,
    number: "",
    question: "",
    description: "",
  });

  console.warn = (message) =>
    message.includes("Buffer size mismatch") ? null : console.warn(message);

  const handleContact = () => {
    setShowForm(!showForm);
    setOpenBox(!openBox);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("processing")
    try {
      const response = await fetch(`${Host}/query/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setShowForm(false);
        setLoading("success")
      }
    } catch (error) {
      console.log("Update error", error);
    }
    setTimeout(() => {
      setLoading(false)
      setOpenBox(false)
    }, 4000);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${Host}/query/my`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const json = await response.json();
        setQuerys(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [Host, token]);


  return (
    <div className="Home">
      <div className="Home-main">
        <div className="glass-container liquid-glass">
          <div className="otherpage-box">
            <div className="wallet-status">
              <DotLottieReact
                className="wallet-success"
                src="https://lottie.host/082e79f3-17de-48aa-882b-7e1d41bfa1f4/zW8r4Jmjwj.lottie"
                loop
                autoplay
              />
            </div>
            <h5>Help & Support</h5>
          </div>
        </div>
        <div className={`Other-pages-box help-support-box ${openBox}`}>
          <div className="help-container">
            <div className="help-content">
              <p className="help-subtitle">
                Find answers to common questions about using the Meal & Fitness
                App.
              </p>

              <div className="faq-section">
                {faqs.map((faq, index) => (
                  <details key={index} className="faq-item">
                    <summary className="faq-question">{faq.question}</summary>
                    <p className="faq-answer">{faq.answer}</p>
                  </details>
                ))}
              </div>

              <div className="contact-section">
                <h5>Still need help?</h5>
                <p>Contact our support team for further assistance.</p>
                <div className="help-supports">
                  <Link to={"tel:+919876543210"}><FaPhoneAlt /></Link>
                  <Link to={"https://wa.me/9876543210"}><FaWhatsapp /></Link>
                  {openBox === false ?
                    <Link onClick={handleContact}>
                      Contact Support
                    </Link> : <Link onClick={handleContact}>
                      <X />
                    </Link>
                  }
                </div>
                {showForm && (
                  <div className="support-box">
                    <h6>How can we assist you?</h6>
                    <form className="contact-form" onSubmit={handleSubmit}>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <input
                        type="tel"
                        name="number"
                        placeholder="Your Phone Number"
                        value={formData.number}
                        onChange={handleChange}
                        required
                      />
                      <select
                        name="question"
                        value={formData.question}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Question</option>
                        <option value="payment">Payment Issues</option>
                        <option value="subscription">Subscription</option>
                        <option value="account">Account Help</option>
                        <option value="other">Other</option>
                      </select>
                      <textarea
                        type="text"
                        name="description"
                        placeholder="Your Message"
                        value={formData.description}
                        onChange={handleChange}
                        required
                      />
                      <button type="submit">Submit</button>
                    </form>
                  </div>
                )}
                {loading === "processing" &&
                  <div className="support-box">
                    <div className="wallet-status">
                      <DotLottieReact
                        className="wallet-success"
                        src="https://lottie.host/5066ed2e-4dbb-4c34-ac26-2bfada68301f/QJPWTrsYv7.lottie"
                        loop
                        autoplay
                      />
                      <h6>Processing</h6>
                    </div>
                  </div>
                }
                {loading === "success" &&
                  <div className="support-box">
                    <div className="wallet-status">
                      <DotLottieReact
                        className="wallet-success"
                        src="https://lottie.host/e63d43ae-3f25-49b2-a2e4-721b5e4ed7dd/NjKNhinvXI.lottie"
                        loop
                        autoplay
                      />
                      <h6>Query Submited 🎉</h6>
                    </div>
                  </div>
                }
                {querys &&
                  <div className="query-support-box">
                    <h5>Your Queries</h5>
                    {querys.map((i) => (
                      <div className="query-support-card">
                        <h6>{i.question} <span className={`${i.status}`}>({i.status})</span></h6>
                        <p>Q :- {i.description}</p>
                        {i?.answer && <p><strong>Ans :- </strong> {i?.answer}</p>}
                        
                      </div>
                    ))}
                  </div>
                }
                <Ads/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
