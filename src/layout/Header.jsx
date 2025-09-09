import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // 🔑 logged in user info
  const authToken = localStorage.getItem("authToken");
  const userType = localStorage.getItem("userType");      // "doctor" | "patient" | "therapist"
  const userName = localStorage.getItem("userName") || "";

  // ✅ Role-based dashboards
  let dashboardPath = "/login";
  if (userType === "patient") {
    dashboardPath = "/patient-dashboard";
  } else if (userType === "doctor") {
    dashboardPath = "/doctor-dashboard";
  } else if (userType === "therapist") {
    dashboardPath = "/therapist-dashboard";
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg shadow-md"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-extrabold text-emerald-700 hover:text-emerald-900 transition-colors"
        >
          <Leaf className="w-7 h-7 text-emerald-600" />
          <span className="text-xl">AyurSutra</span>
        </Link>

        {/* -------- Desktop Navigation -------- */}
        <div className="hidden md:flex items-center space-x-6">
          {!authToken ? (
            <>
              <Link
                to="/about"
                className="text-gray-700 hover:text-emerald-600 transition-colors"
              >
                About
              </Link>
              <Link
                to="/features"
                className="text-gray-700 hover:text-emerald-600 transition-colors"
              >
                Features
              </Link>
              <Link
                to="/login"
                className="text-gray-700 hover:text-emerald-600 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-700 hover:text-emerald-600 transition-colors"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to={dashboardPath}
                className="text-gray-700 hover:text-emerald-600 font-semibold transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/features"
                className="text-gray-700 hover:text-emerald-600 transition-colors"
              >
                Features
              </Link>
              
              <button
                onClick={handleLogout}
                className="ml-4 bg-red-500 text-white px-4 py-1.5 rounded-lg font-medium hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* -------- Mobile Menu Icon -------- */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-700"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* -------- Mobile Drawer -------- */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 p-6 flex flex-col"
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between mb-8">
                <Link
                  to="/"
                  className="text-xl font-extrabold text-emerald-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  AyurSutra
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <div className="flex flex-col gap-4">
                {!authToken ? (
                  <>
                    <Link
                      to="/about"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-700 hover:text-emerald-600"
                    >
                      About
                    </Link>
                    <Link
                      to="/features"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-700 hover:text-emerald-600"
                    >
                      Features
                    </Link>
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-700 hover:text-emerald-600"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-700 hover:text-emerald-600"
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to={dashboardPath}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-700 hover:text-emerald-600 font-semibold"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/features"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-700 hover:text-emerald-600"
                    >
                      Features
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="text-red-600 hover:text-red-800 font-semibold text-left"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;