import React, { useState } from "react";
import { Stethoscope } from "lucide-react";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";
import { useNavigate } from "react-router-dom";

const doctors = [
  {
    id: 1,
    name: "Dr. Arjun Sharma",
    specialization: "Panchakarma - Vamana",
    hospital: "Ayur Sutra Wellness Center",
    experience: "8 Years",
    expertise: "Detoxification & Respiratory Therapies",
    fees: "₹800",
  },
  {
    id: 2,
    name: "Dr. Meera Nair",
    specialization: "Panchakarma - Virechana",
    hospital: "Ayur Sutra Clinic",
    experience: "5 Years",
    expertise: "Digestive & Liver Therapies",
    fees: "₹600",
  },
  {
    id: 3,
    name: "Dr. Kavita Joshi",
    specialization: "Panchakarma - Basti",
    hospital: "Kerala Ayurveda Center",
    experience: "10 Years",
    expertise: "Joint Pain & Gut Health",
    fees: "₹1000",
  },
  {
    id: 4,
    name: "Dr. Rohan Kapoor",
    specialization: "Panchakarma - Nasya",
    hospital: "Ayur Health Clinic",
    experience: "7 Years",
    expertise: "Neurological & ENT Therapies",
    fees: "₹750",
  },
];

export default function ChooseDoctorPage() {
    const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      {/* ✅ Header */}
      <Header className="bg-gradient-to-r from-green-700 to-green-600 text-white py-6 shadow-md sticky top-0 z-10"/>

      {/* ✅ Doctors List */}
      <main className="flex-1 container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-green-700 mb-6 flex items-center justify-center gap-2 text-center">
  <Stethoscope className="w-8 h-8" /> Choose Your Doctor
</h2>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className={`rounded-2xl border shadow-md p-6 bg-white transition transform hover:scale-105 hover:shadow-lg cursor-pointer ${
                selectedDoctor?.id === doc.id
                  ? "border-green-600 shadow-green-200"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedDoctor(doc)}
            >
              <h3 className="text-xl font-semibold text-green-800">{doc.name}</h3>
              <p className="text-gray-700">{doc.specialization}</p>
              <p className="text-sm text-gray-500">{doc.hospital}</p>
              <p className="text-sm">Experience: {doc.experience}</p>
              <p className="text-sm">Expertise: {doc.expertise}</p>
              <p className="font-semibold text-green-700 mt-2">Fees: {doc.fees}</p>
              <button 
              onClick={() => {
                navigate("/DoctorAppointment" )}              }
              className="w-full mt-3 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg">
                Select Doctor
              </button>
            </div>
          ))}
        </div>

        </main>
      {/* ✅ Footer */}
      <Footer className="bg-gradient-to-r from-green-700 to-green-600 text-white py-6 mt-10"/>
    </div>
  );
}
