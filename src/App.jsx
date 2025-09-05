import {  Routes, Route } from "react-router-dom";
import LandingPage from "../pages/AyurSutraWebsite";
import LoginPage from "./components/Pages/LoginPage";
import PatientDashboard from "./components/Pages/PatientDashboard";
import RegisterPage from "./components/Pages/RegisterPage";
import AboutPage from "./components/Pages/AboutPage"; 

import ChooseDocPage from "./components/Pages/ChooseDocPage";

import Vamana from "./components/Pages/Vamana";
import Virechana from "./components/Pages/Virechana";
import Basti from "./components/Pages/Basti";
import Nasya from "./components/Pages/Nasya";
import Raktamokshana from "./components/Pages/Raktamokshana";

import DoctorAppointment from "./components/Pages/DoctorAppointment";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/patient-dashboard" element={<PatientDashboard />} />
      <Route path="/about" element={<AboutPage/>} />
      <Route path="/choose-doctor" element={<ChooseDocPage />} />
      <Route path="/vamana" element={<Vamana />} />
      <Route path="/virechana" element={<Virechana />} />
      <Route path="/basti" element={<Basti />} />
      <Route path="/nasya" element={<Nasya />} />
      <Route path="/raktamokshana" element={<Raktamokshana />} />
      <Route path="/DoctorAppointment" element={<DoctorAppointment />} />
      
    </Routes>
  );
}

export default App;
