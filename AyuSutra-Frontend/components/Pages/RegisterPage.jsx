import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Stethoscope, Heart, UserPlus } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Header from '../Header';

const RegisterPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialProfile = queryParams.get('profile')?.toLowerCase();
  const validProfiles = ['user', 'doctor', 'therapist'];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(
    validProfiles.includes(initialProfile) ? initialProfile.charAt(0).toUpperCase() + initialProfile.slice(1) : 'User'
  );
  const [userForm, setUserForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [doctorForm, setDoctorForm] = useState({ name: '', email: '', password: '', license: '', specialization: '' });
  const [therapistForm, setTherapistForm] = useState({ name: '', email: '', password: '', certification: '', experience: '' });

  const profiles = [
    { name: 'User', icon: User },
    { name: 'Doctor', icon: Stethoscope },
    { name: 'Therapist', icon: Heart },
  ];

  const handleRegister = (e, profile) => {
    e.preventDefault();
    const formData = profile === 'User' ? userForm : profile === 'Doctor' ? doctorForm : therapistForm;
    console.log(`Registering as ${profile} with data:`, formData);
    // Reset form after submission
    if (profile === 'User') setUserForm({ name: '', email: '', password: '', phone: '' });
    else if (profile === 'Doctor') setDoctorForm({ name: '', email: '', password: '', license: '', specialization: '' });
    else setTherapistForm({ name: '', email: '', password: '', certification: '', experience: '' });
  };

  const updateForm = (profile, field, value) => {
    if (profile === 'User') {
      setUserForm((prev) => ({ ...prev, [field]: value }));
    } else if (profile === 'Doctor') {
      setDoctorForm((prev) => ({ ...prev, [field]: value }));
    } else {
      setTherapistForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Header */}
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Register Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-green-100"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl font-bold text-gray-800 text-center mb-8"
          >
            Register as {selectedProfile}
          </motion.h1>

          {/* Profile Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mb-8"
          >
            <div className="flex space-x-2 bg-gray-100 rounded-xl p-1">
              {profiles.map((profile) => (
                <motion.button
                  key={profile.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedProfile(profile.name)}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                    selectedProfile === profile.name
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                      : 'text-gray-600 hover:bg-green-50'
                  }`}
                >
                  <profile.icon className="w-5 h-5" />
                  {profile.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Registration Forms */}
          {profiles.map((profile) => (
            <motion.div
              key={profile.name}
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: selectedProfile === profile.name ? 1 : 0,
                height: selectedProfile === profile.name ? 'auto' : 0,
                display: selectedProfile === profile.name ? 'block' : 'none',
              }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <form onSubmit={(e) => handleRegister(e, profile.name)}>
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mb-6"
                >
                  <label className="block text-gray-600 font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={
                      profile.name === 'User'
                        ? userForm.name
                        : profile.name === 'Doctor'
                        ? doctorForm.name
                        : therapistForm.name
                    }
                    onChange={(e) => updateForm(profile.name, 'name', e.target.value)}
                    placeholder="Enter full name"
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-green-500 transition-colors"
                    required
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mb-6"
                >
                  <label className="block text-gray-600 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={
                      profile.name === 'User'
                        ? userForm.email
                        : profile.name === 'Doctor'
                        ? doctorForm.email
                        : therapistForm.email
                    }
                    onChange={(e) => updateForm(profile.name, 'email', e.target.value)}
                    placeholder={`Enter ${profile.name.toLowerCase()} email`}
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-green-500 transition-colors"
                    required
                  />
                </motion.div>

                {/* Password Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mb-6"
                >
                  <label className="block text-gray-600 font-medium mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={
                      profile.name === 'User'
                        ? userForm.password
                        : profile.name === 'Doctor'
                        ? doctorForm.password
                        : therapistForm.password
                    }
                    onChange={(e) => updateForm(profile.name, 'password', e.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-green-500 transition-colors"
                    required
                    minLength={6}
                  />
                </motion.div>

                {/* Profile-Specific Fields */}
                {profile.name === 'User' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mb-6"
                  >
                    <label className="block text-gray-600 font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={userForm.phone}
                      onChange={(e) => updateForm(profile.name, 'phone', e.target.value)}
                      placeholder="Enter phone number"
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-green-500 transition-colors"
                      required
                      pattern="[0-9]{10}"
                    />
                  </motion.div>
                )}

                {profile.name === 'Doctor' && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      className="mb-6"
                    >
                      <label className="block text-gray-600 font-medium mb-2">
                        Medical License Number
                      </label>
                      <input
                        type="text"
                        value={doctorForm.license}
                        onChange={(e) => updateForm(profile.name, 'license', e.target.value)}
                        placeholder="Enter medical license number"
                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-green-500 transition-colors"
                        required
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="mb-6"
                    >
                      <label className="block text-gray-600 font-medium mb-2">
                        Specialization
                      </label>
                      <input
                        type="text"
                        value={doctorForm.specialization}
                        onChange={(e) => updateForm(profile.name, 'specialization', e.target.value)}
                        placeholder="Enter specialization (e.g., Ayurveda, General Medicine)"
                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-green-500 transition-colors"
                        required
                      />
                    </motion.div>
                  </>
                )}

                {profile.name === 'Therapist' && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      className="mb-6"
                    >
                      <label className="block text-gray-600 font-medium mb-2">
                        Certification Details
                      </label>
                      <input
                        type="text"
                        value={therapistForm.certification}
                        onChange={(e) => updateForm(profile.name, 'certification', e.target.value)}
                        placeholder="Enter certification details"
                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-green-500 transition-colors"
                        required
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="mb-6"
                    >
                      <label className="block text-gray-600 font-medium mb-2">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        value={therapistForm.experience}
                        onChange={(e) => updateForm(profile.name, 'experience', e.target.value)}
                        placeholder="Enter years of experience"
                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-green-500 transition-colors"
                        required
                        min="0"
                      />
                    </motion.div>
                  </>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(34, 197, 94, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-5 h-5" />
                  Register as {profile.name}
                </motion.button>
              </form>

              {/* Login Link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="mt-4 text-center"
              >
                <a
                  href="/login"
                  className="text-green-600 hover:text-emerald-700 transition-colors text-sm"
                >
                  Already have an account? Login
                </a>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default RegisterPage;