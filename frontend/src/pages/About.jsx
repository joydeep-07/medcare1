import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext"; 
import {
  FaUsers,
  FaShoppingCart,
  FaCalendarAlt,
  FaChartBar,
  FaCogs,
} from "react-icons/fa"; 

const About = () => {
  const { isAdminAuthenticated } = useContext(AdminContext);

  const handlescrolltodepartment = () => { 
    const element = document.getElementById("doctors");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  const handlescrolltocontact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  const adminDashboardContent = (
    <div className="flex flex-col lg:flex-row gap-12 items-center">
     
      <div className="lg:w-1/2 relative">
        <div className="relative rounded-xl overflow-hidden shadow-xl">
          <img
            src="https://plus.unsplash.com/premium_photo-1682141140357-4283cd7aae8b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVkaWNhbCUyMGRhc2hib2FyZHxlbnwwfHwwfHx8MA%3D%3D" // A more dashboard-like image
            alt="Admin Dashboard Overview"
            className="w-full h-100 object-cover"
          />
          <div className="absolute inset-0 bg-blue-600/10"></div>
        </div>

        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg border border-blue-100 hidden md:block">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaChartBar className="h-6 w-6 text-blue-600" />{" "}
              {/* Chart icon */}
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Real-time Insights</h3>
              <p className="text-sm text-gray-600">Overview of key metrics</p>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Dashboard Content */}
      <div className="lg:w-1/2">
        <div className="mb-4">
          <span className="text-xs font-mono text-blue-600 tracking-widest">
            ADMIN PANEL OVERVIEW
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
            Welcome,
          </span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
            Administrator!
          </span>
        </h2>

        <p className="text-gray-600 mb-6 leading-relaxed">
          This dashboard provides a centralized hub to manage all aspects of
          your medical website. From here, you can oversee user accounts, manage
          product inventory, track appointments, and monitor site performance to
          ensure smooth operations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-full mt-1">
              <FaUsers className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                User Management
              </h3>
              <p className="text-sm text-gray-600">
                Oversee patient and staff accounts
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-full mt-1">
              <FaShoppingCart className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                Product Inventory
              </h3>
              <p className="text-sm text-gray-600">
                Manage MedShop products and stock
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-full mt-1">
              <FaCalendarAlt className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                Appointment Scheduling
              </h3>
              <p className="text-sm text-gray-600">
                View and manage patient appointments
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-full mt-1">
              <FaCogs className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                Site Configuration
              </h3>
              <p className="text-sm text-gray-600">
                Adjust core website settings
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-600 text-white rounded-md font-medium hover:from-blue-600 hover:to-teal-700 transition-all duration-300 shadow-md shadow-blue-500/20">
            Go to Full Dashboard
          </button>
          <button className="px-6 py-3 border border-blue-400 text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-all duration-300 shadow-md shadow-blue-500/10">
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );

  const defaultAboutContent = (
    <div className="flex flex-col lg:flex-row gap-12 items-center">
      {/* Image Section */}
      <div className="lg:w-1/2 relative">
        <div className="relative rounded-xl overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
            alt="Medical Team"
            className="w-full h-100 object-cover"
          />
          <div className="absolute inset-0 bg-blue-600/10"></div>
        </div>

        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg border border-blue-100 hidden md:block">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-800">25+ Years</h3>
              <p className="text-sm text-gray-600">Of Medical Excellence</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="lg:w-1/2">
        <div className="mb-4">
          <span className="text-xs font-mono text-blue-600 tracking-widest">
            ABOUT OUR PRACTICE
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
            Compassionate Care
          </span>{" "}
          For Every Patient
        </h2>

        <p className="text-gray-600 mb-6 leading-relaxed">
          At our medical center, we combine cutting-edge technology with a
          patient-first philosophy to deliver exceptional healthcare services.
          Our team of board-certified physicians and healthcare professionals
          are dedicated to providing personalized treatment plans tailored to
          each individual's needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-full mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                Advanced Diagnostics
              </h3>
              <p className="text-sm text-gray-600">
                State-of-the-art equipment for accurate assessments
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-full mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                Holistic Approach
              </h3>
              <p className="text-sm text-gray-600">
                Treating the whole person, not just symptoms
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-full mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                Emergency Care
              </h3>
              <p className="text-sm text-gray-600">
                24/7 emergency services with rapid response
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-full mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                Patient Education
              </h3>
              <p className="text-sm text-gray-600">
                Empowering patients through knowledge
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-600 text-white rounded-md font-medium hover:from-blue-600 hover:to-teal-700 transition-all duration-300 shadow-md shadow-blue-500/20"
          onClick={handlescrolltodepartment}
          >
            Meet Our Doctors
          </button>
          <button className="px-6 py-3 border border-blue-400 text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-all duration-300 shadow-md shadow-blue-500/10"
          onClick={handlescrolltocontact}
          >
           Contact Support
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section id="about" className="py-16 pt-22 bg-blue-50">
      <div className="container mx-auto px-4 md:px-0">
        {isAdminAuthenticated ? adminDashboardContent : defaultAboutContent}
      </div>
    </section>
  );
};

export default About;
