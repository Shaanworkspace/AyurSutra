import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  CalendarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [therapist, setTherapist] = useState(null);
  const [loading, setLoading] = useState(true);

  const menuItems = [
    { icon: HomeIcon, label: "Dashboard", active: true },
    { icon: CalendarIcon, label: "My Schedule", active: false },
    { icon: UserGroupIcon, label: "Patients", active: false },
    { icon: DocumentTextIcon, label: "Reports", active: false },
    { icon: Cog6ToothIcon, label: "Settings", active: false },
    { icon: QuestionMarkCircleIcon, label: "Help", active: false },
  ];

  const handleLogout = () => {
    // 🧹 Clear session
    localStorage.clear();
    // 🚪 Redirect to login
    navigate("/login");
  };

  // 🔥 Fetch therapist profile
  useEffect(() => {
    const fetchTherapist = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const userType = localStorage.getItem("userType");

        // Route guard: must be therapist
        if (!userId || userType !== "therapist") {
          navigate("/login");
          return;
        }

        const res = await fetch(
          `https://ayusutra-backend.onrender.com/api/therapists/${userId}`
        );
        if (!res.ok) throw new Error("Failed to fetch therapist");

        const data = await res.json();
        setTherapist(data);
      } catch (err) {
        console.error("Error fetching therapist:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTherapist();
  }, [navigate]);

  // In case data still loading
  if (loading) {
    return (
      <aside className="w-64 bg-white shadow-lg flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </aside>
    );
  }

  if (!therapist) {
    return (
      <aside className="w-64 bg-white shadow-lg flex items-center justify-center">
        <p className="text-red-500">Failed to load therapist data</p>
      </aside>
    );
  }

  // Extract initials (first & last initial)
  const initials =
    (therapist.firstName?.[0] || "") +
    (therapist.lastName?.[0] || "");

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Profile Section */}
          <div className="p-6 bg-green-50 border-b border-green-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {initials || "TH"}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  {therapist.firstName} {therapist.lastName}
                </h3>
                <p className="text-xs text-gray-600">{therapist.specialty}</p>
                {therapist.experienceYears && (
                  <p className="text-xs text-green-600 font-medium">
                    {therapist.experienceYears} years experience
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200
                    ${
                      item.active
                        ? "bg-green-100 text-green-700 border-r-2 border-green-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Stats Section */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {therapist.patientsCount || "0"}
                </div>
                <div className="text-xs text-gray-600">Total Patients</div>
              </div>
              <div className="flex justify-between mt-3 text-xs">
                <div className="text-center">
                  <div className="font-semibold text-gray-900">
                    {therapist.activePatients || "0"}
                  </div>
                  <div className="text-gray-600">Active</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">
                    {therapist.rating || "-"}
                  </div>
                  <div className="text-gray-600">Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;