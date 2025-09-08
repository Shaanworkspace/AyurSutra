/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Stethoscope, Heart, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../../layout/Header';
import { login } from "../../api/login";

const LoginPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState('User');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const profiles = [
        { name: 'User', icon: User },
        { name: 'Doctor', icon: Stethoscope },
        { name: 'Practitioner', icon: Heart },
    ];

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        try {
            const userData = await login({
                profile: selectedProfile.toLowerCase(),
                email,
                password,
            });

            // Save user data into storage
            localStorage.setItem("userData", JSON.stringify(userData));

            // Redirect based on profile
            if (selectedProfile === "User") {
                navigate("/patient-dashboard");
            } else if (selectedProfile === "Doctor") {
                navigate("/doctor-dashboard");
            } else {
                navigate("/therapist-dashboard");
            }

        } catch (err) {
            console.error("Login failed:", err.message);
            setError("Invalid email or password");
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
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-3xl font-bold text-gray-800 text-center mb-8"
                    >
                        Login to AyurSutra
                    </motion.h1>

                    {/* Profile Tabs */}
                    <div className="flex justify-center mb-8">
                        <div className="flex space-x-2 bg-gray-100 rounded-xl p-1">
                            {profiles.map((profile) => (
                                <motion.button
                                    key={profile.name}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedProfile(profile.name)}
                                    className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${selectedProfile === profile.name
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
                        <motion.div className="mb-6">
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
                        </motion.div>

                        <motion.div className="mb-8">
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
                        </motion.div>

                        {error && <p className="text-red-500 mb-4">{error}</p>}

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(34, 197, 94, 0.3)' }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                        >
                            <LogIn className="w-5 h-5" />
                            Login as {selectedProfile}
                        </motion.button>
                    </form>

                    <motion.div className="mt-4 text-center">
                        <a
                            href="#forgot-password"
                            className="text-green-600 hover:text-emerald-700 transition-colors text-sm"
                        >
                            Forgot Password?
                        </a>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
};

export default LoginPage;