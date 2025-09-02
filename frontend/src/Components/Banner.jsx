import React, { useContext } from "react";
import logo from "../assets/logo.png";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import Emergency from "./Emergency";

const Banner = () => {
  const { isAdminAuthenticated } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleScrollToDepartment = () => {
    const section = document.getElementById("doctors");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToAppoinment = () => {
    const section = document.getElementById("appointment");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleViewAppointments = () => {
    navigate("/appointments");
  };

  const handleViewInquiries = () => {
    navigate("/contact-details");
  };

  const bannerContent = isAdminAuthenticated ? (
    <>
      <div className="mb-3">
        <span className="text-xs font-mono text-blue-600 tracking-widest hidden md:flex">
          ADMINISTRATOR PANEL
        </span>
      </div>

      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
          Manage Your
        </span>{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
          Medical Portal
        </span>
      </h1>

      <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
        Easily and efficiently manage all aspects of your platform, including
        user accounts, product inventories, appointment scheduling, and
        essential system configurations.
      </p>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleViewAppointments}
          className="px-5 py-2 bg-gradient-to-r from-blue-500 to-teal-600 text-white rounded-md font-medium hover:from-blue-600 hover:to-teal-700 transition-all duration-300 shadow-md shadow-blue-500/20 flex items-center gap-2 text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
              clipRule="evenodd"
            />
          </svg>
          View Appointments
        </button>

        <button
          onClick={handleViewInquiries}
          className="px-5 py-2 border border-blue-400 text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-all duration-300 shadow-md shadow-blue-500/10 flex items-center gap-2 text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          View Inquiries
        </button>
      </div>
    </>
  ) : (
    <>
      <div className="mb-3">
        <span className="text-xs font-mono text-blue-600 tracking-widest hidden md:flex">
          TRUSTED HEALTHCARE PROVIDER
        </span>
      </div>

      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
          Compassion Meets
        </span>{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
          Excellence
        </span>
      </h1>

      <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
        Providing exceptional medical care with cutting-edge technology and a
        patient-centered approach. Your health and well-being are our top
        priority.
      </p>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleScrollToDepartment}
          className="px-5 py-2 bg-gradient-to-r from-blue-500 to-teal-600 text-white rounded-md font-medium hover:from-blue-600 hover:to-teal-700 transition-all duration-300 shadow-md shadow-blue-500/20 flex items-center gap-2 text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
              clipRule="evenodd"
            />
          </svg>
          Our Services
        </button>

        <button
          onClick={handleScrollToAppoinment}
          className="px-5 py-2 border border-blue-400 text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-all duration-300 shadow-md shadow-blue-500/10 flex items-center gap-2 text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Book Appointment
        </button>
      </div>
    </>
  );

  return (
    <>
      {!isAdminAuthenticated && <Emergency />}

      <div
        id="home"
        className="w-full h-[260px] sm:h-[320px] md:h-[396px] relative overflow-hidden bg-blue-50"
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="absolute inset-0 flex items-center pl-6 md:pl-20 z-10">
          <div className="max-w-2xl px-4">{bannerContent}</div>
        </div>

        <div className="hidden md:flex absolute right-20 top-1/2 transform -translate-y-1/2 items-center gap-8">
          <div className="w-44 h-44 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 border border-blue-200 shadow-lg backdrop-blur-sm flex items-center justify-center">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 border border-blue-200 shadow-lg backdrop-blur-sm flex items-center justify-center">
              <img src={logo} alt="" className="h-25 pt-4" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="relative w-12 h-12 animate-spin-slow">
              <div className="absolute inset-0 rounded-full border-2 border-blue-400/50"></div>
              <div className="absolute inset-0 rounded-full border-2 border-blue-400/50 transform rotate-60"></div>
              <div className="absolute inset-0 rounded-full border-2 border-blue-400/50 transform rotate-120"></div>
              <div className="absolute inset-0 flex items-center justify-center text-blue-600 text-xs font-mono">
                ECG
              </div>
            </div>

            <div className="relative w-12 h-12 bg-teal-100 rounded-full border border-teal-300 flex items-center justify-center">
              <div className="text-teal-600 text-xs font-mono text-center">
                MRI
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="w-16 h-20 bg-blue-100 rounded-t-lg border border-blue-300">
              <div className="h-1/5 border-b border-blue-200 flex items-center justify-center">
                <div className="w-3 h-1 bg-blue-400 rounded-full"></div>
              </div>
              <div className="h-1/5 border-b border-blue-200 flex items-center justify-center">
                <div className="w-3 h-1 bg-blue-400 rounded-full"></div>
              </div>
              <div className="h-1/5 border-b border-blue-200 flex items-center justify-center">
                <div className="w-3 h-1 bg-blue-400 rounded-full"></div>
              </div>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-blue-600 text-xs font-mono">
              X-Ray
            </div>
          </div>
        </div>

        <div className="hidden md:flex absolute bottom-6 left-20 flex-wrap gap-2">
          {[
            "Cardiology",
            "Neurology",
            "Pediatrics",
            "Dermatology",
            "Orthopedics",
            "Radiology",
          ].map((specialty) => (
            <span
              key={specialty}
              className="px-2.5 py-1 bg-white text-blue-600 text-xs font-mono rounded-full border border-blue-200 shadow-sm"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Banner;
