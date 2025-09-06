import "./WebView.css"
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { ChevronDown, CircleCheckBig, MoveRight } from 'lucide-react'
import { useEffect } from "react";

const WebView = () => {
    console.warn = (message) =>
        message.includes("Buffer size mismatch") ? null : console.warn(message);

    useEffect(() => {
        const faqBx = document.querySelectorAll(".faq-bx");

        faqBx.forEach((item, index) => {
            item.addEventListener("click", () => {
                faqBx.forEach((bx) => bx.classList.remove("faqactive"));
                item.classList.add("faqactive");
            });
        });

        // ✅ Cleanup listeners on unmount
        return () => {
            faqBx.forEach((item) => {
                item.replaceWith(item.cloneNode(true)); // removes attached listeners
            });
        };
    }, []);

    return (
        <>
            <main className="main">
                <section className="hero-comp">
                    <div className="common-container">

                        <div className="hero-grid">
                            <div className="hero-info-bx">
                                <h1>FeastIQ: <span>AI-powered</span> app for personalized<span> meals, workouts</span> and progress <span> tracking.</span></h1>
                                <p>FeastIQ makes healthy living simple and effective by combining <b>meal planning</b> and <b>fitness</b> into one <b>intelligent app.</b></p>
                                <div className="hero-downloads">
                                    <Link><div className="wallet-status">
                                        <DotLottieReact
                                            className="wallet-success"
                                            src="https://lottie.host/bbab346e-4485-40b7-aaed-a2c68a2921b9/95u1TvWlcg.lottie"
                                            loop
                                            autoplay
                                        />
                                    </div></Link>
                                </div>
                            </div>

                            <div className="right-hero-form-bx">
                                <h6>Do you have any Query</h6>
                                <form action="#">

                                    <div className="h-inpt-bx">
                                        <input type="text" name="name" id="name" placeholder="Name" />
                                    </div>

                                    <div className="h-inpt-bx">
                                        <input type="email" name="emailbx" id="emailbx" placeholder="Email" />
                                    </div>


                                    <div className="h-inpt-bx">
                                        <input type="text" name="number" id="number" placeholder="Number" />
                                    </div>
                                    <textarea type="text" name="description" id="description" placeholder="Your Query" />

                                    <button type="submit" className="form-submt-btn">Submit Your Query</button>

                                </form>
                            </div>

                        </div>

                    </div>
                </section>
            </main>

            <section className="slider-text-sec">
                <div className="slider-back-bx">
                    <div className="slider-text-comp">
                        <p> AI-Generated Meal Plans <span>AI-Generated Workouts</span> Calorie & Nutrition Tracking  <span>AI-powered </span>
                            FeastIQ <span>Smart Reminders</span> 7-Day & Long-Term History <span>BMI & Progress Analysis</span>
                            FeastIQ <span>Smart Reminders</span> 7-Day & Long-Term History <span>BMI & Progress Analysis</span>
                            AI-Generated Meal Plans <span>AI-Generated Workouts</span> Calorie & Nutrition Tracking  <span>AI-powered </span>
                        </p>
                    </div>
                </div>
            </section>

            <section className="serv-comp">
                <div className="common-container">

                    <div className="comn-heading">
                        <h3>Our <span>Service</span> </h3>
                    </div>

                    <div className="serv-grid-main">

                        <div className="serv-box">
                            <h5>AI-Generated Meal Plans</h5>
                            <p>Healthy diet suggestions based on your goals and food choices.</p>

                            <a href="#" className="read-more-btn-bx">

                                <div className="arrow-bx">
                                    <FaLongArrowAltRight />
                                </div>

                                <button>
                                    Read more
                                </button>

                            </a>


                            <div className="serv-img-bx">
                                <div className="wallet-status">
                                    <DotLottieReact
                                        className="wallet-success"
                                        src="https://lottie.host/bd46aacd-11ff-4b51-8f9f-93c0347de779/lV2sBz3Zib.lottie"
                                        loop
                                        autoplay
                                    />
                                </div>

                            </div>
                        </div>


                        <div className="serv-box">
                            <h5>AI-Generated Workouts </h5>
                            <p>Customized exercise routines for home or gym.</p>

                            <a href="#" className="read-more-btn-bx">

                                <div className="arrow-bx">
                                    <FaLongArrowAltRight />
                                </div>

                                <button>
                                    Read more
                                </button>

                            </a>


                            <div className="serv-img-bx">
                                <div className="wallet-status">
                                    <DotLottieReact
                                        className="wallet-success"
                                        src="https://lottie.host/f605fcdc-982e-4e16-8d4e-acd6084186ee/zPlwddzsXj.lottie"
                                        loop
                                        autoplay
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="serv-box">
                            <h5>Calorie & Nutrition Tracking </h5>
                            <p>Stay on top of what you eat daily.</p>

                            <a href="#" className="read-more-btn-bx">

                                <div className="arrow-bx">
                                    <FaLongArrowAltRight />
                                </div>

                                <button>
                                    Read more
                                </button>

                            </a>


                            <div className="serv-img-bx">
                                <div className="wallet-status">
                                    <DotLottieReact
                                        className="wallet-success"
                                        src="https://lottie.host/aeedfbee-ede8-4794-8db4-c8260741c2a4/fUF9MMSlT4.lottie"
                                        loop
                                        autoplay
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="serv-box">
                            <h5>BMI & Progress Analysis </h5>
                            <p> Understand your body and track improvements.</p>

                            <a href="#" className="read-more-btn-bx">

                                <div className="arrow-bx">
                                    <FaLongArrowAltRight />
                                </div>

                                <button>
                                    Read more
                                </button>

                            </a>


                            <div className="serv-img-bx">
                                <div className="wallet-status">
                                    <DotLottieReact
                                        className="wallet-success"
                                        src="https://lottie.host/caa70555-c6a5-44c5-b49b-c451d277994f/ObCwD4QgNY.lottie"
                                        loop
                                        autoplay
                                    />
                                </div>
                            </div>
                        </div>


                        <div className="serv-box">
                            <h5>7-Day & Long-Term History </h5>
                            <p>Review your meal and workout patterns over time.</p>

                            <a href="#" className="read-more-btn-bx">

                                <div className="arrow-bx">
                                    <FaLongArrowAltRight />
                                </div>

                                <button>
                                    Read more
                                </button>

                            </a>


                            <div className="serv-img-bx">
                                <div className="wallet-status">
                                    <DotLottieReact
                                        className="wallet-success"
                                        src="https://lottie.host/5f7a12ee-88d4-4db0-947f-517892e40aee/jfx11DB4Ky.lottie"
                                        loop
                                        autoplay
                                    />
                                </div>
                            </div>
                        </div>



                        <div className="serv-box">
                            <h5>Smart Reminders </h5>
                            <p>Stay consistent with meals and exercises.</p>

                            <a href="#" className="read-more-btn-bx">

                                <div className="arrow-bx">
                                    <FaLongArrowAltRight />
                                </div>

                                <button>
                                    Read more
                                </button>

                            </a>


                            <div className="serv-img-bx">
                                <div className="wallet-status">
                                    <DotLottieReact
                                        className="wallet-success"
                                        src="https://lottie.host/73cb3825-d699-4de8-888e-cb221baae174/vEW9auWP7z.lottie"
                                        loop
                                        autoplay
                                    />
                                </div>
                            </div>
                        </div>

                    </div>

                    <a href="https://digitaldezire.com/" target="_blank"></a>

                </div>
            </section>

            <section className="choose-us-comp">
                <div className="common-container">

                    <div className="choose-us-grid">

                        <div className="left-chooseus-img">
                            <div className="wallet-status">
                                <DotLottieReact
                                    className="wallet-success"
                                    src="https://lottie.host/c08624e7-818c-42c1-9046-f1087f1e663b/EoC98Sa2yq.lottie"
                                    loop
                                    autoplay
                                    onError={(e) => console.error("Lottie load error:", e)}
                                />
                            </div>
                        </div>

                        <div className="right-choose-us-info">
                            <h3>Why <span>Choose Us ?</span> </h3>
                            <p><CircleCheckBig /> All-in-One Solution – No need for separate apps. FeastIQ combines meal planning + workout routines + tracking in one place. </p>
                            <p><CircleCheckBig /> AI-Powered Personalization – Your age, weight, fitness goals, and food preferences are used to create custom plans that actually fit your lifestyle. </p>
                            <p><CircleCheckBig /> Science-Backed Guidance – Nutrition and workouts are built on proven fitness principles, ensuring safe and effective results. </p>
                            <p><CircleCheckBig /> Flexible & Adaptive – Plans adjust as you progress, keeping your journey dynamic and motivating. </p>
                            <p><CircleCheckBig /> Track & Stay Consistent – Easy-to-use calorie tracker, BMI calculator, and history logs help you stay on track. </p>
                            <p><CircleCheckBig /> For Everyone – Whether you’re a beginner, athlete, or someone simply wanting to stay healthy, FeastIQ adapts to your needs.</p>
                            <p>FeastIQ combines AI-powered meal planning and personalized workouts into one app, helping you eat smarter, train better, and stay consistent with your health goals—simple, adaptive, and effective.</p>

                            <a href="#">
                                <button className="form-submt-btn">Start The Journey <MoveRight /></button>
                            </a>

                        </div>

                    </div>

                </div>
            </section>

            <section className="faq-comp choose-us-comp">
                <div className="common-container">

                    <div className="comn-heading comn-heading2">
                        <h6>FAQ</h6>
                        <h4>Frequently <span>Asked Question</span> </h4>
                    </div>

                    <div className="faq-main">

                        <div className="faq-bx ">
                            <div className="faq-title-btn-bx">
                                <h5>What Are The Advantages Of Using Digital Marketing Services For My Company?
                                </h5>
                                <div className="arrow-btn">
                                    <ChevronDown />
                                </div>
                            </div>
                            <p>Usage of digital marketing services for your company brings forth a multitude of advantages,
                                including heightened online visibility, precise targeting of your audience, cost-effectiveness,
                                measurable results through real-time analytics, global reach, enhanced customer engagement,
                                adaptability to market changes, effective brand building and reputation management, increased
                                conversion rates, and the opportunity for innovative and creative campaigns.</p>
                        </div>

                        <div className="faq-bx ">
                            <div className="faq-title-btn-bx">
                                <h5>Which Tools And Technologies Will You Employ To Create The Website For My Business?
                                </h5>
                                <div className="arrow-btn">
                                    <ChevronDown />
                                </div>
                            </div>
                            <p>The tools and technologies employed to create your business website will depend on specific
                                requirements, but a comprehensive approach would likely involve using platforms like Core PHP,
                                Laravel, React, Node.js, CRM, and so forth to provide quality products to our clients.
                                Additionally, front-end technologies like HTML, CSS, and JavaScript will be utilized to ensure
                                an engaging and responsive user interface. For dynamic functionalities, server-side scripting
                                languages such as PHP may be employed, ensuring a robust and reliable online presence for your
                                business.</p>
                        </div>


                        <div className="faq-bx ">
                            <div className="faq-title-btn-bx">
                                <h5>What Distinguishes Digital Advertising From Digital Marketing?
                                </h5>
                                <div className="arrow-btn">
                                    <ChevronDown />
                                </div>
                            </div>
                            <p>Digital marketing encompasses a broader range of online strategies, including organic efforts
                                like content marketing, SEO, and social media engagement, aimed at building a brand's online
                                presence and fostering customer relationships. On the other hand, digital advertising
                                specifically centers around paid promotional activities such as display ads, pay-per-click (PPC)
                                campaigns, and social media advertising to directly reach and target audiences.</p>
                        </div>

                        <div className="faq-bx ">
                            <div className="faq-title-btn-bx">
                                <h5>What Areas Does Digital Dezire Provide Services In?
                                </h5>
                                <div className="arrow-btn">
                                    <ChevronDown />
                                </div>
                            </div>
                            <p>Digital Dezire currently operates in Gurgaon majorly. However, we have also catered to global
                                clients in the past. We are also willing to provide our services beyond geographical borders, so
                                feel free to reach out to us from anywhere in the world. Our commitment to being the best in the
                                business is one of our core values, which makes us a leading digital marketing company in
                                Gurgaon, Delhi NCR, Noida, and beyond.</p>
                        </div>

                        <div className="faq-bx ">
                            <div className="faq-title-btn-bx">
                                <h5>How Much Does It Cost To Avail Digital Marketing Services From Digital Dezire?
                                </h5>
                                <div className="arrow-btn">
                                    <ChevronDown />
                                </div>
                            </div>
                            <p>The final cost quotation of digital marketing services varies depending on the current
                                requirements and goals of each client. As a renowned digital marketing company in Gurgaon, we
                                assure you that we provide the very best services within your budget. Contact us today to get
                                the exact quotation for the service you wish to avail.
                            </p>
                        </div>

                    </div>

                </div>
            </section>
        </>
    )
}

export default WebView
