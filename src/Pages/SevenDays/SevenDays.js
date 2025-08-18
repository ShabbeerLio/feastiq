import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Calories from "../../Components/Calories/Calories";
import Ads from "../../Components/Ads/Ads";

const SevenDays = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
  };

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="Home">
      <div className="Home-main">
        <Calories />
        <div className={`home-scroll ${isScrolled ? "scrolled" : ""} mealtype`}>
          <div className="home-scroll-box">
            <div className="meal-all-box">
              <h5>7 Days Meal Plan</h5>
              <Slider {...settings} className="banner-slider">
                <div className="meal-plan-item">
                  <div className="meal-plan-card">
                    <p>
                      <span>Monday</span>
                    </p>
                    <p>
                      <span>Breakfast</span>: Oatmeal with fruits
                    </p>
                    <p>
                      <span>Lunch</span>: Grilled chicken salad
                    </p>
                    <p>
                      <span>snacks</span>: Dry fruits and fruits
                    </p>
                    <p>
                      <span>Dinner</span>: Baked salmon with veggies
                    </p>
                  </div>
                </div>
                <div className="meal-plan-item">
                  <div className="meal-plan-card">
                    <p>
                      <span>Tuesday</span>
                    </p>
                    <p>
                      <span>Breakfast</span>: Oatmeal with fruits
                    </p>
                    <p>
                      <span>Lunch</span>: Grilled chicken salad
                    </p>
                    <p>
                      <span>snacks</span>: Dry fruits and fruits
                    </p>
                    <p>
                      <span>Dinner</span>: Baked salmon with veggies
                    </p>
                  </div>
                </div>
                <div className="meal-plan-item">
                  <div className="meal-plan-card">
                    <p>
                      <span>Wednesday</span>
                    </p>
                    <p>
                      <span>Breakfast</span>: Oatmeal with fruits
                    </p>
                    <p>
                      <span>Lunch</span>: Grilled chicken salad
                    </p>
                    <p>
                      <span>snacks</span>: Dry fruits and fruits
                    </p>
                    <p>
                      <span>Dinner</span>: Baked salmon with veggies
                    </p>
                  </div>
                </div>
                <div className="meal-plan-item">
                  <div className="meal-plan-card">
                    <p>
                      <span>Thursday</span>
                    </p>
                    <p>
                      <span>Breakfast</span>: Oatmeal with fruits
                    </p>
                    <p>
                      <span>Lunch</span>: Grilled chicken salad
                    </p>
                    <p>
                      <span>snacks</span>: Dry fruits and fruits
                    </p>
                    <p>
                      <span>Dinner</span>: Baked salmon with veggies
                    </p>
                  </div>
                </div>
                <div className="meal-plan-item">
                  <div className="meal-plan-card">
                    <p>
                      <span>Friday</span>
                    </p>
                    <p>
                      <span>Breakfast</span>: Oatmeal with fruits
                    </p>
                    <p>
                      <span>Lunch</span>: Grilled chicken salad
                    </p>
                    <p>
                      <span>snacks</span>: Dry fruits and fruits
                    </p>
                    <p>
                      <span>Dinner</span>: Baked salmon with veggies
                    </p>
                  </div>
                </div>
              </Slider>
              <Ads/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SevenDays;
