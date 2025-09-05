import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/AyurSutraWebsite";
import LoginPage from "./components/Pages/LoginPage";
import PatientDashboard from "./components/Pages/PatientDashboard";
import RegisterPage from "./components/Pages/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/patient-dashboard" element={<PatientDashboard />} />
      
    </Routes>
  );
}

export default App;
