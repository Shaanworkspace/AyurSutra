/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "../../layout/Header";
import Sidebar from "../Components/Sidebar";
import DashboardHeader from "../Components/DashboardHeader";
import PatientRequestList from "../Components/PatientRequestList";
import PatientDetailView from "../Components/PatientDetailView";
import PatientHistory from "../Components/PatientHistory";
import PrescriptionModal from "../Components/PrescriptionModal";
import HistoryDetailModal from "../Components/HistoryDetailModal";
import { LoadingPage } from "@/components/Pages/LoadingPage";

const DoctorDashboardPage = () => {
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isPrescriptionOpen, setIsPrescriptionOpen] = useState(false);
  const [viewingHistoryRecord, setViewingHistoryRecord] = useState(null);
  const [formMode, setFormMode] = useState("create");

  const initialFormState = {
    diagnosis: "",
    prescribedTreatment: "",
    therapyName: "None",
    noOfDays: 0,
    startDate: "",
    doctorNotes: "",
  };
  const [prescriptionForm, setPrescriptionForm] = useState(initialFormState);

  const navigate = useNavigate();

  // 🔥 Fetch doctor data dynamically using logged-in doctor's ID
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const storedId = localStorage.getItem("userId");
        const storedType = localStorage.getItem("userType");

        // 🛑 Route guard: only allow logged-in doctors
        if (!storedId || storedType !== "doctor") {
          navigate("/login");
          return;
        }

        const res = await fetch(
          `https://ayusutra-backend.onrender.com/api/doctors/${storedId}`
        );
        if (!res.ok) throw new Error("Network error");

        const data = await res.json();
        setDoctorData(data);

        // auto-select first pending request
        const firstPending = data.medicalRecords.find(
          (r) => r.status === "Pending Review"
        );
        setSelectedRequest(firstPending || null);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [navigate]);

  // ✅ Always declare hooks before conditional returns
  const pendingRequests = useMemo(
    () =>
      doctorData?.medicalRecords.filter(
        (r) => r.status === "Pending Review"
      ) || [],
    [doctorData]
  );

  const completedRequests = useMemo(
    () =>
      doctorData?.medicalRecords.filter((r) => r.status === "Completed") || [],
    [doctorData]
  );

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (recordToEdit) => {
    setFormMode("edit");
    setPrescriptionForm({
      diagnosis: recordToEdit.diagnosis || "",
      prescribedTreatment: recordToEdit.prescribedTreatment || "",
      therapyName: recordToEdit.therapyName || "None",
      noOfDays: recordToEdit.noOfDays || 0,
      startDate: recordToEdit.startDate || "",
      doctorNotes: recordToEdit.doctorNotes || "",
    });
    setSelectedRequest(recordToEdit);
    setIsPrescriptionOpen(true);
  };

  const handleFollowUpClick = (historyRecord) => {
    setFormMode("create");
    setViewingHistoryRecord(null);

    const newFollowUpRequest = {
      id: Date.now(),
      symptoms: `Follow-up for: ${historyRecord.diagnosis}`,
      patientId: historyRecord.patientId,
      patientName: historyRecord.patientName,
      patientAge: historyRecord.patientAge,
      patientGender: historyRecord.patientGender,
      createdDate: new Date().toISOString(),
      status: "Pending Review",
      attachments: [],
    };

    const updatedRecords = [newFollowUpRequest, ...(doctorData?.medicalRecords || [])];

    setDoctorData((prev) => ({ ...prev, medicalRecords: updatedRecords }));
    setSelectedRequest(newFollowUpRequest);
    setPrescriptionForm({
      diagnosis: historyRecord.diagnosis || "",
      prescribedTreatment: historyRecord.prescribedTreatment || "",
      therapyName: historyRecord.therapyName || "None",
      noOfDays: historyRecord.noOfDays || 0,
      startDate: "",
      doctorNotes: `Follow-up on ${new Date().toLocaleDateString()}.\nPrevious Notes: ${
        historyRecord.doctorNotes || ""
      }`,
    });
    setIsPrescriptionOpen(true);
  };

  const handleSubmitPrescription = (e) => {
    e.preventDefault();
    let updatedRecords;

    if (formMode === "edit") {
      const updatedRecord = {
        ...selectedRequest,
        ...prescriptionForm,
        status: "Completed",
      };
      updatedRecords = doctorData.medicalRecords.map((r) =>
        r.id === selectedRequest.id ? updatedRecord : r
      );
      setSelectedRequest(updatedRecord);
    } else {
      const newRecord = {
        ...selectedRequest,
        ...prescriptionForm,
        status: "Completed",
      };
      updatedRecords = doctorData.medicalRecords.map((r) =>
        r.id === selectedRequest.id ? newRecord : r
      );
      setSelectedRequest(newRecord);
    }

    setDoctorData((prev) => ({ ...prev, medicalRecords: updatedRecords }));
    setIsPrescriptionOpen(false);
    setPrescriptionForm(initialFormState);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  // 🔍 Render states
  if (loading) {
    return (
      <LoadingPage/>
    );
  }

  if (!doctorData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-red-600">Failed to load doctor data.</p>
      </div>
    );
  }

  // ✅ Main Render
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      <div className="fixed inset-x-0 top-0 z-40">
        <Header />
      </div>

      <div className="flex pt-16">
        <Sidebar doctor={doctorData} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto"
          >
            <DashboardHeader
              doctorName={doctorData.firstName}
              records={doctorData.medicalRecords}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <PatientRequestList
                requests={pendingRequests}
                selectedRequest={selectedRequest}
                onSelectRequest={setSelectedRequest}
              />
              <PatientDetailView
                request={selectedRequest}
                onWritePrescription={() => {
                  setFormMode("create");
                  setPrescriptionForm(initialFormState);
                  setIsPrescriptionOpen(true);
                }}
                onEditPrescription={handleEditClick}
              />
            </div>

            <PatientHistory
              historyRecords={completedRequests}
              onViewHistory={setViewingHistoryRecord}
            />
          </motion.div>
        </main>
      </div>

      <PrescriptionModal
        isOpen={isPrescriptionOpen}
        onClose={() => setIsPrescriptionOpen(false)}
        onSubmit={handleSubmitPrescription}
        request={selectedRequest}
        formData={prescriptionForm}
        onFormChange={handleFormChange}
        mode={formMode}
      />

      <HistoryDetailModal
        record={viewingHistoryRecord}
        onClose={() => setViewingHistoryRecord(null)}
        onFollowUp={handleFollowUpClick}
      />
    </div>
  );
};

export default DoctorDashboardPage;