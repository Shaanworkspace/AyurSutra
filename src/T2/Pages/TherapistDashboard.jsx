import Sidebar from "../DashboardSections/Sidebar";
import Header from "../DashboardSections/Header";
import AvailableSlots from "../DashboardSections/AvailableSlots";
import OngoingTherapies from "../DashboardSections/OngoingTherapies";
import PatientRequests from "../DashboardSections/PatientRequests";
import RescheduleRequests from "../DashboardSections/RescheduleRequests";
import { useState } from "react";

function App() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen bg-gray-50">
      {/* This overlay blocks the main content on mobile 
        when the sidebar is open.
      */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Component */}
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden md:pl-64">
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AvailableSlots />
              <OngoingTherapies />
              <PatientRequests />
              <RescheduleRequests />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;