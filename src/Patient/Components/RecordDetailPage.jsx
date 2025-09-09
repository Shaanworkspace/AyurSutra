/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Stethoscope,
  HeartPulse,
  ChevronDown,
} from "lucide-react";
import Header from "../../layout/Header";
import {
  getRecordById,
  updateRecord,
  getTherapies,
} from "../../api/medicalRecordApi";

const RecordDetailPage = () => {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [therapies, setTherapies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rec = await getRecordById(id);
        setRecord(rec);
        const th = await getTherapies();
        setTherapies(th);
      } catch (err) {
        console.error("Error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTherapy = (therapy) => {
    const exists = record.requiredTherapy?.some((t) => t.id === therapy.id);
    const updatedList = exists
      ? record.requiredTherapy.filter((t) => t.id !== therapy.id)
      : [...(record.requiredTherapy || []), { id: therapy.id }];
    setRecord((prev) => ({
      ...prev,
      requiredTherapy: updatedList,
      needTherapy: updatedList.length > 0,
    }));
  };

  const saveTherapies = async () => {
    try {
      setSaving(true);
      const updated = await updateRecord(record.id, record);
      setRecord(updated);
      setMessage({
        type: "success",
        text: "Therapies updated successfully ✅",
      });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to save therapies ❌" });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!record)
    return (
      <div className="p-6 text-red-500">❌ Record not found</div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
      <Header />
      <main className="max-w-5xl mx-auto pt-24 pb-12 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 mb-6"
        >
          Medical Record #{record.id}
        </motion.h1>

        {/* Alert */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-6 p-3 rounded-lg font-medium ${
                message.type === "success"
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                  : "bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Patient Info */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="font-semibold text-gray-900 flex gap-2 items-center">
            <User className="w-5 h-5 text-blue-600" /> Patient Info
          </h2>
          <p>
            {record.patient?.firstName} {record.patient?.lastName} (Age{" "}
            {record.patient?.age})
          </p>
          <p className="text-sm text-gray-500">{record.patient?.email}</p>
        </div>

        {/* Doctor Info */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="font-semibold text-gray-900 flex gap-2 items-center">
            <Stethoscope className="w-5 h-5 text-emerald-600" /> Doctor Info
          </h2>
          <p>
            Dr. {record.doctor?.firstName} {record.doctor?.lastName}
          </p>
          <p className="text-sm text-gray-500">{record.doctor?.email}</p>
        </div>

        {/* Symptoms */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="font-semibold mb-2">Symptoms</h2>
          <p>{record.symptoms}</p>
        </div>

        {/* Therapy Dropdown */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="font-semibold mb-3 flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-pink-500" /> Required Therapies
          </h2>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setOpenDropdown(!openDropdown)}
              className="w-full flex justify-between items-center border rounded-lg px-4 py-2 bg-white hover:border-emerald-500"
            >
              <span className="text-gray-700">
                {record.requiredTherapy && record.requiredTherapy.length > 0
                  ? record.requiredTherapy
                      .map((t) => {
                        const th = therapies.find((th) => th.id === t.id);
                        return th ? th.name : "Unknown";
                      })
                      .join(", ")
                  : "Select therapies"}
              </span>
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </button>

            <AnimatePresence>
              {openDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-10"
                >
                  {therapies.map((th) => {
                    const checked = record.requiredTherapy?.some(
                      (t) => t.id === th.id
                    );
                    return (
                      <label
                        key={th.id}
                        className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                          checked ? "bg-emerald-50" : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleTherapy(th)}
                          className="form-checkbox text-emerald-600"
                        />
                        <span>{th.name}</span>
                      </label>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={saveTherapies}
            disabled={saving}
            className="mt-4 px-5 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition"
          >
            {saving ? "Saving..." : "Save Therapies"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default RecordDetailPage;