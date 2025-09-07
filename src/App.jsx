import {  Routes, Route } from "react-router-dom";
import LandingPage from "../pages/AyurSutraWebsite";
import LoginPage from "./components/Pages/LoginPage";
import RegisterPage from "./components/Pages/RegisterPage";
import AboutPage from "./components/Pages/AboutPage"; 
import PatientDashboard from "./Patient/Pages/PatientDashboard";
import ChooseDoctorPage from "./components/Pages/ChooseDocPage"
import Dashboard from "./Therapist/Pages/Dashboard";
import DoctorDashboardPage from './Doctor/Pages/DoctorDashboardPage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/patient-dashboard" element={<PatientDashboard />} />
      <Route path="/about" element={<AboutPage/>} />
      <Route path="/choose-doctor" element={<ChooseDoctorPage />} />
      <Route path="/therapist-dashboard" element={<Dashboard />} />
      <Route path="/doctor-dashboard" element={<DoctorDashboardPage />} />
      
      


    </Routes>
  );
}

export default App;
