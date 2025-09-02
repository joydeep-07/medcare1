import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Loader";
import { endPoint } from "../api/endpoints";

const Appointments = () => {
  const location = useLocation();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingStatusId, setUpdatingStatusId] = useState(null);
  const [actionType, setActionType] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(endPoint.appointments);
        setAppointments(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Handle appointment status update
  const updateAppointmentStatus = async (id, newStatus) => {
    setUpdatingStatusId(id);
    setActionType(newStatus === "Confirmed" ? "confirm" : "cancel");
    try {
      const response = await axios.patch(
        `${endPoint.appointments}/${id}/status`,
        { status: newStatus }
      );

      setAppointments((prev) =>
        prev.map((app) => (app._id === response.data._id ? response.data : app))
      );
    } catch (err) {
      console.error("Error updating appointment:", err);
      alert(`Failed to update appointment: ${err.message}`);
    } finally {
      setUpdatingStatusId(null);
      setActionType(null);
    }
  };

  const handleConfirm = (id) => updateAppointmentStatus(id, "Confirmed");
  const handleReject = (id) => updateAppointmentStatus(id, "Cancelled");

  // Filter appointments based on search term
  const filteredAppointments = appointments.filter(
    (app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Status badge color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Generate avatar color based on name
  const getAvatarColor = (name) => {
    const colors = [
      "bg-blue-100 text-blue-600",
      "bg-purple-100 text-purple-600",
      "bg-amber-100 text-amber-600",
      "bg-pink-100 text-pink-600",
      "bg-teal-100 text-teal-600",
      "bg-indigo-100 text-indigo-600",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center pt-22 h-[450px] bg-blue-50 p-6 text-center">
        <svg
          className="w-24 h-24 text-red-500 mb-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h2 className="text-3xl font-semibold text-red-600 mb-3">
          Error Occurred
        </h2>

        <p className="text-gray-600 max-w-xl mb-6">
          Something went wrong while processing your request. Please check your
          internet connection or try again after a few moments. If the problem
          persists.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      <section className="pb-4 pt-22 bg-blue-50 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500">
                Appointment
              </span>{" "}
              Management
            </h2>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto">
              Manage all scheduled medical appointments
            </p>
          </div>

          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h3 className="text-2xl font-bold text-slate-800">
                All Appointments
              </h3>
              <div className="relative w-full md:w-72">
                <input
                  type="text"
                  placeholder="Search appointments..."
                  className="w-full pl-12 pr-5 py-2 border border-gray-300 rounded-full text-lg text-gray-800 placeholder-gray-500 
               focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-600 
               transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {filteredAppointments.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  No appointments found
                </h3>
                <p className="mt-1 text-gray-500">
                  {searchTerm
                    ? "Try a different search term"
                    : "No appointments have been scheduled yet"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAppointments.map((appointment) => (
                  <div
                    key={appointment._id}
                    className="bg-white rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 ease-in-out flex flex-col"
                  >
                    <div className="p-6 flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <div
                            className={`h-10 w-10 rounded-full ${getAvatarColor(
                              appointment.name
                            )} flex items-center justify-center mr-3 text-lg font-bold`}
                          >
                            {appointment.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-slate-800">
                              {appointment.name}
                            </h3>
                            <p className="text-xs text-slate-500">
                              {appointment.email}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {appointment.status}
                        </span>
                      </div>

                      <div className="space-y-3 text-slate-700 text-sm">
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                          <span className="text-slate-600">
                            {appointment.department}
                          </span>
                        </div>

                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          <span className="text-slate-600">
                            {appointment.doctor}
                          </span>
                        </div>

                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="text-slate-600">
                            {formatDate(appointment.date)}
                          </span>
                        </div>

                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-slate-600">
                            {appointment.time}
                          </span>
                        </div>
                      </div>

                      {appointment.message && (
                        <div className="mt-4 pt-4 border-t border-slate-100">
                          <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                            Notes
                          </h4>
                          <p className="text-sm text-slate-600">
                            {appointment.message}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Conditional Rendering for Buttons/Status Label */}
                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex space-x-2 justify-center items-center">
                      {appointment.status === "Pending" ? (
                        <>
                          <button
                            onClick={() => handleConfirm(appointment._id)}
                            disabled={updatingStatusId === appointment._id}
                            className={`flex-1 py-2 px-3 rounded-md text-xs font-medium transition duration-300 ease-in-out flex items-center justify-center relative
                            ${
                              updatingStatusId === appointment._id &&
                              actionType === "confirm"
                                ? "bg-emerald-300 cursor-not-allowed"
                                : "bg-emerald-600 text-white hover:bg-emerald-700"
                            }
                          `}
                          >
                            {updatingStatusId === appointment._id &&
                            actionType === "confirm" ? (
                              <>
                                Confirming...
                                <svg
                                  className="animate-spin h-4 w-4 text-white ml-2" // Adjust size and margin here
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                              </>
                            ) : (
                              "Confirm"
                            )}
                          </button>
                          <button
                            onClick={() => handleReject(appointment._id)}
                            disabled={updatingStatusId === appointment._id}
                            className={`flex-1 py-2 px-3 rounded-md text-xs font-medium transition duration-300 ease-in-out flex items-center justify-center relative
                            ${
                              updatingStatusId === appointment._id &&
                              actionType === "cancel"
                                ? "bg-rose-300 cursor-not-allowed"
                                : "bg-rose-600 text-white hover:bg-rose-700"
                            }
                          `}
                          >
                            {updatingStatusId === appointment._id &&
                            actionType === "cancel" ? (
                              <>
                                Cancelling...
                                <svg
                                  className="animate-spin h-4 w-4 text-white ml-2" // Adjust size and margin here
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                              </>
                            ) : (
                              "Cancel"
                            )}
                          </button>
                        </>
                      ) : (
                        <div
                          className={`py-2 px-3 rounded-md text-sm font-medium w-full text-center
                          ${
                            appointment.status === "Confirmed"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-rose-100 text-rose-700"
                          }
                        `}
                        >
                          {appointment.status}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Appointments;
