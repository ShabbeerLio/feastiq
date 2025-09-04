import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import MealDetail from "./Pages/MealDetail/MealDetail";
import Registration from "./Pages/Registration/Registration";
import SevenDays from "./Pages/SevenDays/SevenDays";
import WorkoutDetail from "./Pages/WorkoutDetail/WorkoutDetail";
import About from "./Pages/OtherPages/About";
import ReturnRefund from "./Pages/OtherPages/ReturnRefund";
import TermCondition from "./Pages/OtherPages/TermCondition";
import PrivacyPolicy from "./Pages/OtherPages/PrivacyPolicy";
import History from "./Pages/History/History";
import Help from "./Pages/OtherPages/Help";
import Profile from "./Pages/Profile/Profile";
import ContextState from "./Context/ContextState";
import CalorieHistory from "./Pages/CalorieHistory/CalorieHistory";
import BMIPage from "./Pages/Bmi/Bmi";
import WebView from "./WebView/WebView/WebView";
import WPrivacyPolicy from "./WebView/OtherPages/WPrivacyPolicy";
import WTermCondition from "./WebView/OtherPages/WTermCondition";
import WReturnRefund from "./WebView/OtherPages/WReturnRefund";
import WAbout from "./WebView/OtherPages/WAbout";
import WContact from "./WebView/OtherPages/WContact";
import Footer from "./WebView/Footer/Footer";
import TopBar from "./WebView/TopBar/TopBar";

// ✅ simple function to detect if mobile
const isMobile = /Mobi|Android/i.test(navigator.userAgent);

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

function MainLayout() {
  return (
    <ContextState>
      <div className="app-container">
        {isMobile ? (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/meal" element={<MealDetail />} />
              <Route path="/login" element={<Registration />} />
              <Route path="/sevendays" element={<SevenDays />} />
              <Route path="/workout-detail" element={<WorkoutDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/help" element={<Help />} />
              <Route path="/history" element={<History />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/term-and-conditions" element={<TermCondition />} />
              <Route path="/return-refund" element={<ReturnRefund />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/calorie-history" element={<CalorieHistory />} />
              <Route path="/bmi" element={<BMIPage />} />
            </Routes>
          </>
        ) : (
          <div className="webview">
            <TopBar />
            <Routes>
              <Route path="/" element={<WebView />} />
              <Route path="/privacy-policy" element={<WPrivacyPolicy />} />
              <Route path="/term-and-conditions" element={<WTermCondition />} />
              <Route path="/return-refund" element={<WReturnRefund />} />
              <Route path="/about" element={<WAbout />} />
              <Route path="/contact-us" element={<WContact />} />
            </Routes>
            <Footer />
          </div>
        )}
      </div>
    </ContextState>
  );
}

export default App;
