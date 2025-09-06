import React, { useState } from "react";
import { HeartPulse } from "lucide-react"; // ✅ therapy icon (you can change)
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

const therapists = [
  {
    id: 1,
    name: "Dr. Arjun Sharma",
    degree: "BAMS, MD (Ayurveda)",
    experience: "12 Years",
    expertise: "Respiratory & Detoxification",
    fees: "₹900",
    slots: ["10:00 AM", "12:00 PM", "3:00 PM", "5:00 PM"],
  },
  {
    id: 2,
    name: "Dr. Neha Singh",
    degree: "BAMS",
    experience: "7 Years",
    expertise: "Chronic Asthma & Skin Disorders",
    fees: "₹750",
    slots: ["9:00 AM", "1:00 PM", "4:00 PM"],
  },
];

export default function Vamana() {
  const [selectedTherapist, setSelectedTherapist] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <Header />

   {/* ✅ Therapy Title Centered with Icon */}
<section className="flex items-center justify-center px-6 mt-18 mb-6">
  <div className="flex items-center gap-3 text-green-700">
    <HeartPulse className="w-9 h-9" />
    <h1 className="text-3xl font-bold">Basti Chikitsa</h1>
  </div>
</section>

      {/* ✅ Therapist List */}
      <main className="flex-1 container mx-auto px-6 py-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {therapists.map((t) => (
            <div
              key={t.id}
              className={`rounded-2xl border shadow-md p-6 bg-white hover:shadow-lg transition transform hover:scale-105 cursor-pointer ${
                selectedTherapist?.id === t.id
                  ? "border-green-600 shadow-green-200"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedTherapist(t)}
            >
              <h3 className="text-xl font-semibold text-green-800">{t.name}</h3>
              <p className="text-sm text-gray-500">{t.degree}</p>
              <p className="text-sm">Experience: {t.experience}</p>
              <p className="text-sm">Expertise: {t.expertise}</p>
              <p className="font-semibold text-green-700 mt-2">Fees: {t.fees}</p>
              <p className="mt-2 text-sm text-gray-600">Available Slots:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {t.slots.map((slot, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm"
                  >
                    {slot}
                  </span>
                ))}
              </div>
              <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
                Schedule Therapy
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
