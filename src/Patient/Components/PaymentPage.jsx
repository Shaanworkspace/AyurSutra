/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, CheckCircle, Smartphone, Banknote } from "lucide-react";
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const doctorId = searchParams.get("doctorId");
  const patientId = searchParams.get("patientId");

  const [method, setMethod] = useState("card"); // default selected payment method
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePay = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // Fake redirect after "payment"
      setTimeout(() => navigate("/patient-dashboard"), 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-white">
      <Header />

      <main className="flex-1 container mx-auto px-6 py-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-lg border border-green-100 shadow-2xl rounded-2xl p-8 w-full max-w-lg text-center"
        >
          <h2 className="text-3xl font-extrabold text-green-700 mb-8 flex items-center justify-center gap-2">
            <CreditCard className="w-7 h-7 text-emerald-600" /> Payment Options
          </h2>

          {!success ? (
            <form onSubmit={handlePay} className="space-y-8 text-left">
              {/* Payment Method Tabs */}
              <div className="space-y-3">
                <label className="block text-gray-600 font-medium mb-1">Choose payment method:</label>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setMethod("card")}
                    className={`flex flex-col items-center gap-1 py-3 px-2 border rounded-xl transition ${
                      method === "card"
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-white border-gray-300 hover:border-green-500"
                    }`}
                  >
                    <CreditCard className="w-6 h-6" />
                    <span className="text-sm font-semibold">Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod("upi")}
                    className={`flex flex-col items-center gap-1 py-3 px-2 border rounded-xl transition ${
                      method === "upi"
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-white border-gray-300 hover:border-green-500"
                    }`}
                  >
                    <Smartphone className="w-6 h-6" />
                    <span className="text-sm font-semibold">UPI</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod("netbanking")}
                    className={`flex flex-col items-center gap-1 py-3 px-2 border rounded-xl transition ${
                      method === "netbanking"
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-white border-gray-300 hover:border-green-500"
                    }`}
                  >
                    <Banknote className="w-6 h-6" />
                    <span className="text-sm font-semibold">Net Banking</span>
                  </button>
                </div>
              </div>

              {/* Dynamic fields for each payment method */}
              {method === "card" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {method === "upi" && (
                <div className="space-y-4">
                  <label className="block text-gray-700 font-medium">UPI ID</label>
                  <input
                    type="text"
                    placeholder="username@upi"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              )}

              {method === "netbanking" && (
                <div className="space-y-4">
                  <label className="block text-gray-700 font-medium">Select Bank</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                    <option>Choose your bank</option>
                    <option>Bank of Ayurveda</option>
                    <option>National Herbal Bank</option>
                    <option>Ayushman Finance</option>
                  </select>
                </div>
              )}

              {/* Pay Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold text-lg shadow-md transition-all ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg"
                }`}
              >
                {loading ? "⏳ Processing..." : "💳 Pay Now"}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center space-y-4"
            >
              <CheckCircle className="w-14 h-14 text-green-600 mx-auto" />
              <h3 className="text-2xl font-bold text-green-700"> Payment Successful 🎉 </h3>
              <p className="text-gray-600">Redirecting you to your dashboard...</p>
            </motion.div>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}