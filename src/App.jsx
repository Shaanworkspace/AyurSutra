import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/AyurSutraWebsite";
import LoginPage from "./components/Pages/LoginPage";
import RegisterPage from "./components/Pages/RegisterPage";
import AboutPage from "./components/Pages/AboutPage"; 
import PatientDashboard from "./Patient/Pages/PatientDashboard";
import ChooseDoctorPage from "./components/Pages/ChooseDocPage";
import Dashboard from "./Therapist/Pages/Dashboard";
import DoctorDashboardPage from "./Doctor/Pages/DoctorDashboardPage";
import RecordDetailPage from "./Patient/Components/RecordDetailPage";
import DoctorAppointmentPage from "./Patient/Components/DoctorAppointmentPage";
import MedicalRecordEditPage from "./Doctor/Components/MedicalRecordEditPage"; // ✅
import PatientRecordDetailPage from "./Patient/Components/PatientRecordDetailPage";
import PaymentPage from "./Patient/Components/PaymentPage";

function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/about" element={<AboutPage />} />

      {/* Dashboards */}
      <Route path="/patient-dashboard" element={<PatientDashboard />} />
      <Route path="/therapist-dashboard" element={<Dashboard />} />
      <Route path="/doctor-dashboard" element={<DoctorDashboardPage />} />

      {/* Doctor Flow */}
      <Route path="/choose-doctor" element={<ChooseDoctorPage />} />
      <Route path="/doctor-appointment" element={<DoctorAppointmentPage />} />

      {/*  Medical Records */}
      <Route path="/medical-records/:id" element={<RecordDetailPage />} />
      <Route path="/medical-records/:id/edit" element={<MedicalRecordEditPage />} />
<Route path="/patient/records/:id" element={<PatientRecordDetailPage />} />
      {/* Fallback */}
      <Route path="*" element={<LandingPage />} />

        <Route path="/payment" element={<PaymentPage />} />
    </Routes>
  );
}

export default App;