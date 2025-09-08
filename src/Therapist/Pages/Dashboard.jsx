import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import AvailableSlots from "../Components/AvailableSlots";
import OngoingTherapies from "../Components/OngoingTherapies";
import TherapyRequests from "../Components/TherapyRequests";
import RescheduleOptions from "../Components/RescheduleOptions";
import LoginPage from "@/components/Pages/LoginPage";
import LoadingPage from "@/components/Pages/LoadingPage";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [therapist, setTherapist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userType = localStorage.getItem("userType"); 
    const userId = localStorage.getItem("userId");

    if (token && userType === "therapist" && userId) {
      setIsAuthenticated(true);

      const fetchData = async () => {
        try {
          const res = await fetch(
            `https://ayusutra-backend.onrender.com/api/therapists/${userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (!res.ok) throw new Error("Failed to fetch therapist data");
          const data = await res.json();

          const normalized = {
            ...data,
            scheduleSlots: data.scheduleSlots?.map((slot) => ({
              ...slot, 
              status: slot.status.toLowerCase(),
            })) || [],
          };

          setTherapist(normalized);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, []);

  // Not logged in → force LoginPage
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  if (loading) {
    return (
      <LoadingPage/>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen justify-center items-center text-red-500 text-lg space-y-3">
        ⚠️ {error}
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex mt-16 h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-4 sm:p-6 space-y-8">
            {/* Welcome */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h1 className="text-2xl font-bold mb-2">
                    Namaste, Dr. {therapist.firstName} {therapist.lastName}! 🙏
                  </h1>
                  <p className="text-green-100">
                    {therapist.qualification} • {therapist.expertise}
                  </p>
                  <p className="text-green-100 mt-1">
                    Location: {therapist.clinicLocation}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <div className="text-3xl font-bold">+{therapist.yearsOfExperience}y</div>
                  <div className="text-green-100 text-sm">Experience</div>
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AvailableSlots slots={therapist.scheduleSlots} />
              <OngoingTherapies />
              <TherapyRequests />
              <RescheduleOptions />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;