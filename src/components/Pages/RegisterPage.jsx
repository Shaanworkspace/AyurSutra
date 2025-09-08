/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Stethoscope, Heart, UserPlus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../layout/Header";
import {
  registerUser,
  registerDoctor,
  registerTherapist,
} from "../../api/register";

// Move InputField outside the component to prevent re-creation on every render
const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = true,
}) => (
  <div className="mb-5">
    <label className="block text-gray-700 mb-2 font-medium">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm 
                 focus:ring-2 focus:ring-green-500 focus:border-green-500 
                 outline-none transition"
    />
  </div>
);

const RegisterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const initialProfile = queryParams.get("profile")?.toLowerCase();
  const validProfiles = ["user", "doctor", "therapist"];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(
    validProfiles.includes(initialProfile)
      ? initialProfile.charAt(0).toUpperCase() + initialProfile.slice(1)
      : "User"
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form States
  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
  });

  const [doctorForm, setDoctorForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    joinedDate: "",
  });

  const [therapistForm, setTherapistForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    qualification: "",
    yearsOfExperience: "",
    expertise: "",
    languagesSpoken: "",
    clinicLocation: "",
    bio: "",
  });

  const profiles = [
    { name: "User", icon: User },
    { name: "Doctor", icon: Stethoscope },
    { name: "Therapist", icon: Heart },
  ];

  const updateForm = (profile, field, value) => {
    if (profile === "User")
      setUserForm((prev) => ({ ...prev, [field]: value }));
    else if (profile === "Doctor")
      setDoctorForm((prev) => ({ ...prev, [field]: value }));
    else setTherapistForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async (e, profile) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      let response;
      if (profile === "User") response = await registerUser(userForm);
      else if (profile === "Doctor") response = await registerDoctor(doctorForm);
      else response = await registerTherapist(therapistForm);

      setSuccess(`${profile} registered successfully! 🎉`);
      console.log("Registration Response:", response);
      // redirect to login
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-white">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl w-full bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-green-100 p-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center mb-8"
          >
            Create {selectedProfile} Account
          </motion.h1>

          {/* Profile Selection Tabs */}
          <div className="flex justify-center mb-10">
            <div className="flex space-x-3 bg-gray-100 rounded-2xl p-1">
              {profiles.map((profile) => (
                <motion.button
                  key={profile.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedProfile(profile.name)}
                  className={`px-5 py-2 rounded-xl font-medium flex items-center gap-2 transition ${
                    selectedProfile === profile.name
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                      : "text-gray-600 hover:bg-green-50"
                  }`}
                >
                  <profile.icon className="w-5 h-5" />
                  {profile.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Forms */}
          <div className="space-y-6">
            {selectedProfile === "User" && (
              <form onSubmit={(e) => handleRegister(e, "User")}>
                <InputField
                  label="First Name"
                  value={userForm.firstName}
                  onChange={(val) => updateForm("User", "firstName", val)}
                  placeholder="Enter first name"
                />
                <InputField
                  label="Last Name"
                  value={userForm.lastName}
                  onChange={(val) => updateForm("User", "lastName", val)}
                  placeholder="Enter last name"
                />
                <InputField
                  type="number"
                  label="Age"
                  value={userForm.age}
                  onChange={(val) => updateForm("User", "age", val)}
                  placeholder="Enter age"
                />
                <InputField
                  type="email"
                  label="Email"
                  value={userForm.email}
                  onChange={(val) => updateForm("User", "email", val)}
                  placeholder="Enter email"
                />
                <InputField
                  type="password"
                  label="Password"
                  value={userForm.password}
                  onChange={(val) => updateForm("User", "password", val)}
                  placeholder="Enter password"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl shadow-lg font-semibold text-lg"
                >
                  <UserPlus className="w-5 h-5 inline mr-1" /> Register User
                </motion.button>
              </form>
            )}

            {selectedProfile === "Doctor" && (
              <form onSubmit={(e) => handleRegister(e, "Doctor")}>
                <InputField
                  label="First Name"
                  value={doctorForm.firstName}
                  onChange={(val) => updateForm("Doctor", "firstName", val)}
                  placeholder="Enter first name"
                />
                <InputField
                  label="Last Name"
                  value={doctorForm.lastName}
                  onChange={(val) => updateForm("Doctor", "lastName", val)}
                  placeholder="Enter last name"
                />
                <InputField
                  type="email"
                  label="Email"
                  value={doctorForm.email}
                  onChange={(val) => updateForm("Doctor", "email", val)}
                  placeholder="Enter email"
                />
                <InputField
                  label="Phone Number"
                  value={doctorForm.phoneNumber}
                  onChange={(val) => updateForm("Doctor", "phoneNumber", val)}
                  placeholder="Enter phone number"
                />
                <InputField
                  type="date"
                  label="Joined Date"
                  value={doctorForm.joinedDate}
                  onChange={(val) => updateForm("Doctor", "joinedDate", val)}
                  placeholder="Choose date"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl shadow-lg font-semibold text-lg"
                >
                  <UserPlus className="w-5 h-5 inline mr-1" /> Register Doctor
                </motion.button>
              </form>
            )}

            {selectedProfile === "Therapist" && (
              <form onSubmit={(e) => handleRegister(e, "Therapist")}>
                <InputField
                  label="First Name"
                  value={therapistForm.firstName}
                  onChange={(val) => updateForm("Therapist", "firstName", val)}
                  placeholder="Enter first name"
                />
                <InputField
                  label="Last Name"
                  value={therapistForm.lastName}
                  onChange={(val) => updateForm("Therapist", "lastName", val)}
                  placeholder="Enter last name"
                />
                <InputField
                  type="email"
                  label="Email"
                  value={therapistForm.email}
                  onChange={(val) => updateForm("Therapist", "email", val)}
                  placeholder="Enter email"
                />
                <InputField
                  type="password"
                  label="Password"
                  value={therapistForm.password}
                  onChange={(val) => updateForm("Therapist", "password", val)}
                  placeholder="Enter password"
                />
                <InputField
                  label="Phone Number"
                  value={therapistForm.phoneNumber}
                  onChange={(val) => updateForm("Therapist", "phoneNumber", val)}
                  placeholder="Enter phone number"
                />
                <InputField
                  label="Qualification"
                  value={therapistForm.qualification}
                  onChange={(val) => updateForm("Therapist", "qualification", val)}
                  placeholder="MD Ayurveda, etc."
                />
                <InputField
                  type="number"
                  label="Years of Experience"
                  value={therapistForm.yearsOfExperience}
                  onChange={(val) =>
                    updateForm("Therapist", "yearsOfExperience", val)
                  }
                  placeholder="e.g. 10"
                />
                <InputField
                  label="Expertise"
                  value={therapistForm.expertise}
                  onChange={(val) => updateForm("Therapist", "expertise", val)}
                  placeholder="Marma Therapy, Panchakarma, etc."
                />
                <InputField
                  label="Languages Spoken"
                  value={therapistForm.languagesSpoken}
                  onChange={(val) =>
                    updateForm("Therapist", "languagesSpoken", val)
                  }
                  placeholder="English, Hindi"
                />
                <InputField
                  label="Clinic Location"
                  value={therapistForm.clinicLocation}
                  onChange={(val) =>
                    updateForm("Therapist", "clinicLocation", val)
                  }
                  placeholder="Mumbai Ayurvedic Center"
                />
                <div className="mb-5">
                  <label className="block text-gray-700 mb-2 font-medium">
                    Bio
                  </label>
                  <textarea
                    value={therapistForm.bio}
                    onChange={(e) =>
                      updateForm("Therapist", "bio", e.target.value)
                    }
                    placeholder="Short professional bio"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl shadow-lg font-semibold text-lg"
                >
                  <UserPlus className="w-5 h-5 inline mr-1" /> Register
                  Therapist
                </motion.button>
              </form>
            )}
          </div>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          {success && (
            <p className="text-green-600 text-center mt-4 font-medium">
              {success}
            </p>
          )}

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-green-600 font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default RegisterPage;