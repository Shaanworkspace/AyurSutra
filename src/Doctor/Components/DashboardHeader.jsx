import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Mail, Users, Calendar } from 'lucide-react';

const StatCard = ({ icon: Icon, value, label, color }) => (
    <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
            <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
        </div>
    </motion.div>
);

const DashboardHeader = ({ doctorName, records }) => {
    const stats = useMemo(() => {
        const pendingCount = records.filter(r => r.status === 'Pending Review').length;
        return [
            { value: pendingCount, label: "New Requests", icon: Mail, color: "bg-amber-500" },
            { value: records.length, label: "Total Patients", icon: Users, color: "bg-emerald-500" },
            { value: '08', label: "Appointments Today", icon: Calendar, color: "bg-teal-500" },
        ];
    }, [records]);

    const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };

    return (
        <>
            <motion.div variants={itemVariants}>
                <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900">Namaste, Dr. {doctorName}!</h1>

            </motion.div>
            
            <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
                {stats.map((stat, i) => (
                    <StatCard key={stat.label} {...stat} delay={i * 0.1} />
                ))}
            </motion.div>
        </>
    );
};

export default DashboardHeader;