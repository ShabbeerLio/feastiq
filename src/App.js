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
      </div>
    </ContextState>
  );
}

export default App;
