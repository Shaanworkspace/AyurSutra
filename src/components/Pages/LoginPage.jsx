/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Stethoscope, Heart, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../../layout/Header';

const LoginPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState('User');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const profiles = [
    { name: 'User', icon: User },
    { name: 'Doctor', icon: Stethoscope },
    { name: 'Practitioner', icon: Heart },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ which endpoint based on profile
      let endpoint = "";
      let userType = "";

      if (selectedProfile === "User") {
        endpoint = "https://ayusutra-backend.onrender.com/api/patients";
        userType = "user";
      } else if (selectedProfile === "Doctor") {
        endpoint = "https://ayusutra-backend.onrender.com/api/doctors";
        userType = "doctor";
      } else {
        endpoint = "https://ayusutra-backend.onrender.com/api/therapists";
        userType = "therapist";
      }

      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Failed to fetch " + userType + " data");

      const list = await res.json();

      const match = list.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && password === "1234"
      );

      if (match) {
        // Save session info
        localStorage.setItem("authToken", "dummy-auth");
        localStorage.setItem("userType", userType);
        localStorage.setItem("userId", match.id);
        localStorage.setItem("userName", match.firstName);

        // Redirect based on profile
        if (userType === "user") {
          navigate("/patient-dashboard");
        } else if (userType === "doctor") {
          navigate("/doctor-dashboard");
        } else {
          navigate("/therapist-dashboard");
        }
      } else {
        setError("❌ Invalid email or password. Please retry.");
      }
    } catch (err) {
      setError("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-green-100"
        >
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Login to AyurSutra
          </h1>

          {/* Profile Selection Tabs */}
          <div className="flex justify-center mb-8">
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
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-gray-600 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={`Enter ${selectedProfile.toLowerCase()} email`}
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-green-500 transition-colors"
                required
              />
            </div>

            <div className="mb-8">
              <label className="block text-gray-600 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-green-500 transition-colors"
                required
                minLength={2}
              />
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <LogIn className="w-5 h-5" />
              {loading ? "Logging in..." : `Login as ${selectedProfile}`}
            </motion.button>
          </form>
        </motion.div>
      </section>
    </div>
  );
};

export default LoginPage;