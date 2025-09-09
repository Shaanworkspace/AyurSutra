/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    Stethoscope,
    Calendar,
    FileText,
    Edit3,
    Save,
    X,
    CheckCircle,
    Clock,
    AlertCircle,
    Phone,
    Mail,
    MapPin
} from "lucide-react";
import Header from "../../layout/Header";
// import LoadingPage from "@/components/Pages/LoadingPage";
import { getRecordById, updateRecord } from "../../api/medicalRecordApi";
import { LoadingPage } from "@/components/Pages/LoadingPage";

// Move EditableField outside to prevent re-renders
const EditableField = ({
    label,
    value,
    field,
    editingField,
    formValue,
    onEdit,
    setFormValue,
    saveEdit,
    cancelEdit,
    type = "text",
    options = [],
    icon: Icon
}) => {
    const isEditing = editingField === field;

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed': return 'bg-green-100 text-green-800 border-green-200';
            case 'ongoing': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "—";
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <motion.div
            layout
            className="group relative bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg p-6"
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    {Icon && (
                        <div className="p-2 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
                            <Icon className="w-5 h-5 text-emerald-600" />
                        </div>
                    )}
                    <h3 className="font-semibold text-gray-900">{label}</h3>
                </div>

                <AnimatePresence mode="wait">
                    {!isEditing ? (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={() => onEdit(field, value)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-emerald-600"
                        >
                            <Edit3 className="w-4 h-4" />
                        </motion.button>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="flex gap-2"
                        >
                            <button
                                onClick={saveEdit}
                                className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors"
                            >
                                <Save className="w-4 h-4" />
                            </button>
                            <button
                                onClick={cancelEdit}
                                className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
                {isEditing ? (
                    <motion.div
                        key="editing"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {type === "textarea" ? (
                            <textarea
                                value={formValue}
                                onChange={(e) => setFormValue(e.target.value)}
                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                                rows="4"
                                placeholder={`Enter ${label.toLowerCase()}...`}
                            />
                        ) : type === "date" ? (
                            <input
                                type="date"
                                value={formValue || ""}
                                onChange={(e) => setFormValue(e.target.value)}
                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                            />
                        ) : type === "select" ? (
                            <select
                                value={formValue}
                                onChange={(e) => setFormValue(e.target.value)}
                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
                            >
                                {options.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type="text"
                                value={formValue}
                                onChange={(e) => setFormValue(e.target.value)}
                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                                placeholder={`Enter ${label.toLowerCase()}...`}
                            />
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="display"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {field === 'status' && value ? (
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(value)}`}>
                                {value}
                            </span>
                        ) : field === 'startDate' || field === 'endDate' ? (
                            <p className="text-gray-700 text-lg">{formatDate(value)}</p>
                        ) : (
                            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                                {value || <span className="text-gray-400 italic">No data available</span>}
                            </p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const RecordDetailPage = () => {
    const { id } = useParams();
    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editingField, setEditingField] = useState(null);
    const [formValue, setFormValue] = useState("");
    const [message, setMessage] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getRecordById(id);
                setRecord(data);
            } catch (err) {
                console.error("Fetch record error", err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id]);

    const handleEdit = (field, value) => {
        setEditingField(field);
        setFormValue(value ?? "");
        setMessage(null);
    };

    const cancelEdit = () => {
        setEditingField(null);
        setFormValue("");
    };

    const saveEdit = async () => {
        try {
            const payload = { [editingField]: formValue };
            const updated = await updateRecord(record.id, payload);
            setRecord(updated);
            setMessage({
                type: 'success',
                text: `${editingField} updated successfully! ✅`
            });
            setEditingField(null);

            // Clear message after 3 seconds
            setTimeout(() => setMessage(null), 3000);
        } catch (err) {
            console.error("Update failed", err);
            setMessage({
                type: 'error',
                text: "Failed to save changes. Please try again. ❌"
            });
            setTimeout(() => setMessage(null), 3000);
        }
    };

    //   if (loading) return <LoadingPage />;
    if (!record) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center p-8 bg-white rounded-2xl shadow-xl border border-gray-100"
                >
                    <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Record Not Found</h2>
                    <p className="text-gray-600">The medical record you're looking for doesn't exist.</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50">
            <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

            {/* Success/Error Message */}
            <AnimatePresence>
                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
                    >
                        <div className={`px-6 py-3 rounded-2xl shadow-lg border ${message.type === 'success'
                                ? 'bg-green-50 border-green-200 text-green-800'
                                : 'bg-red-50 border-red-200 text-red-800'
                            }`}>
                            <div className="flex items-center gap-2">
                                {message.type === 'success' ? (
                                    <CheckCircle className="w-5 h-5" />
                                ) : (
                                    <AlertCircle className="w-5 h-5" />
                                )}
                                <span className="font-medium">{message.text}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="max-w-7xl mx-auto pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
                        Medical Record
                    </h1>
                    <p className="text-xl text-gray-600">Record ID: #{record.id}</p>
                </motion.div>

                {/* Patient & Doctor Info Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Patient Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-8"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
                                <User className="w-8 h-8 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Patient Information</h2>
                                <p className="text-gray-600">Personal details</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <User className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        {record.patient?.firstName} {record.patient?.lastName}
                                    </p>
                                    <p className="text-sm text-gray-600">Age: {record.patient?.age}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-gray-900">{record.patient?.email}</p>
                                    <p className="text-sm text-gray-600">Email address</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Doctor Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-8"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl">
                                <Stethoscope className="w-8 h-8 text-emerald-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Doctor Information</h2>
                                <p className="text-gray-600">Attending physician</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Stethoscope className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        Dr. {record.doctor?.firstName} {record.doctor?.lastName}
                                    </p>
                                    <p className="text-sm text-gray-600">Attending physician</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-gray-900">{record.doctor?.email}</p>
                                    <p className="text-sm text-gray-600">Professional email</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Medical Details Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Medical Details</h2>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <EditableField
                            label="Symptoms"
                            value={record.symptoms}
                            field="symptoms"
                            editingField={editingField}
                            formValue={formValue}
                            onEdit={handleEdit}
                            setFormValue={setFormValue}
                            saveEdit={saveEdit}
                            cancelEdit={cancelEdit}
                            type="textarea"
                            icon={AlertCircle}
                        />

                        <EditableField
                            label="Diagnosis"
                            value={record.diagnosis}
                            field="diagnosis"
                            editingField={editingField}
                            formValue={formValue}
                            onEdit={handleEdit}
                            setFormValue={setFormValue}
                            saveEdit={saveEdit}
                            cancelEdit={cancelEdit}
                            type="textarea"
                            icon={FileText}
                        />

                        <EditableField
                            label="Prescribed Treatment"
                            value={record.prescribedTreatment}
                            field="prescribedTreatment"
                            editingField={editingField}
                            formValue={formValue}
                            onEdit={handleEdit}
                            setFormValue={setFormValue}
                            saveEdit={saveEdit}
                            cancelEdit={cancelEdit}
                            type="textarea"
                            icon={Stethoscope}
                        />

                        <EditableField
                            label="Doctor Notes"
                            value={record.doctorNotes}
                            field="doctorNotes"
                            editingField={editingField}
                            formValue={formValue}
                            onEdit={handleEdit}
                            setFormValue={setFormValue}
                            saveEdit={saveEdit}
                            cancelEdit={cancelEdit}
                            type="textarea"
                            icon={FileText}
                        />

                        <EditableField
                            label="Status"
                            value={record.status}
                            field="status"
                            editingField={editingField}
                            formValue={formValue}
                            onEdit={handleEdit}
                            setFormValue={setFormValue}
                            saveEdit={saveEdit}
                            cancelEdit={cancelEdit}
                            type="select"
                            options={["Pending", "Ongoing", "Completed", "Cancelled"]}
                            icon={Clock}
                        />

                        <EditableField
                            label="Start Date"
                            value={record.startDate}
                            field="startDate"
                            editingField={editingField}
                            formValue={formValue}
                            onEdit={handleEdit}
                            setFormValue={setFormValue}
                            saveEdit={saveEdit}
                            cancelEdit={cancelEdit}
                            type="date"
                            icon={Calendar}
                        />
                    </div>

                    {/* Full width field */}
                    <div className="mt-6">
                        <EditableField
                            label="End Date"
                            value={record.endDate}
                            field="endDate"
                            editingField={editingField}
                            formValue={formValue}
                            onEdit={handleEdit}
                            setFormValue={setFormValue}
                            saveEdit={saveEdit}
                            cancelEdit={cancelEdit}
                            type="date"
                            icon={Calendar}
                        />
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default RecordDetailPage;