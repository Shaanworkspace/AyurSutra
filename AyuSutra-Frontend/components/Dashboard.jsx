import { motion } from 'framer-motion';
import { Calendar, Users, TrendingUp, Clock, Bell, Activity } from 'lucide-react';
// import { ImageWithFallback } from './ImageWithFallback.jsx';

export function Dashboard() {
  const stats = [
    { label: "Active Patients", value: "247", icon: Users, change: "+12%" },
    { label: "Today's Appointments", value: "18", icon: Calendar, change: "+5%" },
    { label: "Treatment Success", value: "94%", icon: TrendingUp, change: "+2%" },
    { label: "Average Session", value: "45min", icon: Clock, change: "-3min" }
  ];

  const appointments = [
    {
      time: "9:00 AM",
      patient: "Priya Sharma",
      treatment: "Abhyanga",
      therapist: "Dr. Anil",
      status: "confirmed"
    },
    {
      time: "10:30 AM", 
      patient: "Rajesh Kumar",
      treatment: "Shirodhara",
      therapist: "Dr. Meera",
      status: "in-progress"
    },
    {
      time: "12:00 PM",
      patient: "Sita Devi",
      treatment: "Panchakarma",
      therapist: "Dr. Suresh",
      status: "pending"
    },
    {
      time: "2:30 PM",
      patient: "Amit Patel",
      treatment: "Udvartana",
      therapist: "Dr. Kavya",
      status: "confirmed"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-100 text-emerald-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="dashboard" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Intuitive Dashboard
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get a complete overview of your practice with real-time insights and streamlined workflow management
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              {/* Dashboard Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white">Welcome back, Dr. Sharma</h3>
                    <p className="text-emerald-100">Monday, September 1, 2025</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-3 h-3 bg-green-400 rounded-full"
                    />
                    <span className="text-white text-sm">Live</span>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-gray-50 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <stat.icon size={20} className="text-emerald-600" />
                        <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Chart Placeholder */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 h-64 flex items-center justify-center"
                >
                  <div className="text-center">
                    <Activity size={48} className="text-emerald-400 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Patient Recovery Analytics</h4>
                    <p className="text-gray-500">Interactive charts showing treatment progress and outcomes</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Appointments Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Today's Appointments */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Today's Schedule</h3>
                <Bell size={20} className="text-emerald-600" />
              </div>
              
              <div className="space-y-4">
                {appointments.map((appointment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="text-sm font-medium text-emerald-600 min-w-[60px]">
                      {appointment.time}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{appointment.patient}</div>
                      <div className="text-sm text-gray-600">{appointment.treatment}</div>
                      <div className="text-xs text-gray-500">{appointment.therapist}</div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 transition-colors"
                >
                  <div className="font-medium text-emerald-700">Add New Patient</div>
                  <div className="text-sm text-emerald-600">Register a new patient profile</div>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left p-3 rounded-xl bg-teal-50 hover:bg-teal-100 transition-colors"
                >
                  <div className="font-medium text-teal-700">Schedule Therapy</div>
                  <div className="text-sm text-teal-600">Book a new treatment session</div>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full text-left p-3 rounded-xl bg-cyan-50 hover:bg-cyan-100 transition-colors"
                >
                  <div className="font-medium text-cyan-700">View Reports</div>
                  <div className="text-sm text-cyan-600">Generate treatment analytics</div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
