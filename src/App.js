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
      </Routes>
    </div>
  );
}

export default App;
