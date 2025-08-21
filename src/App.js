import {
  Route,
  Routes,
  BrowserRouter,
  useLocation,
} from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

function MainLayout() {

  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal" element={<MealDetail />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/sevendays" element={<SevenDays />} />
        <Route path="/workout-detail" element={<WorkoutDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/history" element={<History />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/term-and-conditions" element={<TermCondition />} />
        <Route path="/return-refund" element={<ReturnRefund />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
