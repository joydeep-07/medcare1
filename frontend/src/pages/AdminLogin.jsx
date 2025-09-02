import React, { useState, useContext } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaExclamationCircle,
  FaLock,
  FaEnvelope,
  FaStethoscope,
  FaPills,
  FaHospital,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { toast } from "sonner";
import Lottie from "lottie-react";
import Heartrate from "../assets/Admin_laptop.json";

const AdminLogin = () => {
  const [password, setPassword] = useState("paul");
  const [email, setEmail] = useState("admin@gmail.com");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { loginAdmin } = useContext(AdminContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "paul" && email === "admin@gmail.com") {
      loginAdmin();
      navigate("/");
      setError("");
    } else {
      setError("Incorrect credentials. Please try again.");
      setPassword("");
    }
  };

  return (
    <div className="pt-18 min-h-screen flex items-center justify-center bg-blue-100 font-sans">
      <div className="w-full max-w-6xl flex bg-white rounded-2xl shadow-2xl overflow-hidden h-[600px]">
        {/* Left Side - Banner */}
        <div className="w-2/3 bg-white relative flex flex-col justify-between py-12 px-12 overflow-hidden">
          

        

          {/* Animation Centered */}
          <div className="flex flex-1 items-center justify-center">
            <Lottie
              animationData={Heartrate}
              loop
              autoplay
              className="w-80 h-80"
            />
          </div>

          {/* Bottom Texts */}
          <div className="z-10 px-2 pb-4">
            <h2 className="text-3xl font-semibold text-white mb-4 leading-tight">
              <span className="text-blue-600">Secure</span> Medical
              <br />
              <span className="text-blue-500">Administration</span> Portal
            </h2>
            <p className="text-blue-400 text-opacity-90 text-base leading-relaxed">
              Manage patient records, appointments, and medical staff with our
              HIPAA-compliant platform designed for healthcare professionals.
            </p>
          </div>
        </div>

        {/* Right Side (Login Form) */}
        <div className="w-1/2 p-12 bg-white flex flex-col justify-center relative">
          {/* Backdrop pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2IiBoZWlnaHQ9IjYiPgo8cmVjdCB3aWR0aD0iNiIgaGVpZ2h0PSI2IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMNiA2WiIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZT0iI2VlZSI+PC9wYXRoPgo8cGF0aCBkPSJNNiAwTDAgNloiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2U9IiNlZWUiPjwvcGF0aD4KPC9zdmc+')] opacity-10"></div>

          <div className="z-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Admin Login
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              Enter your credentials to access the dashboard
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300 transition"
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300 transition"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                  <FaExclamationCircle className="mr-2 flex-shrink-0" />
                  {error}
                </div>
              )}

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <button
                    disabled
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
