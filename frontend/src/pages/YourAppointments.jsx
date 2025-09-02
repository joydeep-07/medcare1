import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Loader";
import { endPoint } from "../api/endpoints";
import { toast, Toaster } from "sonner";
import { useUser } from "../context/UserContext"; // Your UserContext

// Import icons from react-icons
import {
  FiAlertTriangle,
  FiSearch,
  FiBook,
  FiUser,
  FiCalendar,
  FiClock,
  FiFileText,
} from "react-icons/fi";

const YourAppointments = () => {
  // Destructure isLoading from useUser hook
  const { user, isAuthenticated, isLoading: isUserContextLoading } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true); // This loading state is for fetching appointments
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingStatusId, setUpdatingStatusId] = useState(null);
  const [actionType, setActionType] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      // Only proceed if the user context has finished loading AND the user is authenticated
      if (!isUserContextLoading) {
        // Check the isLoading state from the context
        try {
          // Set component-specific loading state for appointment fetching
          setLoading(true);
          const token = localStorage.getItem("userToken");

          // Now, if isAuthenticated is false here, it means the context has genuinely
          // determined the user is not authenticated after checking localStorage.
          if (!token || !isAuthenticated) {
            throw new Error("Please log in to view appointments");
          }

          const response = await axios.get(endPoint.appointments, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data && Array.isArray(response.data)) {
            // Filter appointments by user email on client side if backend doesn't
            const userAppointments = response.data.filter(
              (app) => app.email === user.email
            );
            setAppointments(userAppointments);
          } else {
            throw new Error("Invalid data format received");
          }
        } catch (err) {
          setError(err.response?.data?.message || err.message);
          console.error("Error fetching appointments:", err);
          if (err.response?.status === 401) {
            toast.error("Session expired. Please log in again.");
            // If you have a logout function in useUser, call it here
            // logout(); // Assuming you've destructured logout from useUser as well
          } else {
            toast.error(
              err.response?.data?.message || "Failed to fetch appointments"
            );
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAppointments();
    // Add isUserContextLoading to the dependency array.
    // The effect will re-run when the context finishes its loading process.
  }, [user, isAuthenticated, isUserContextLoading]);

  // --- Render Logic ---

  // Show a loader while the UserContext is still determining the auth status
  if (isUserContextLoading) {
    return <Loader />;
  }

  // If UserContext has finished loading AND isAuthenticated is false, show login prompt
  // This ensures we don't show the login prompt while the context is still checking
  if (!isAuthenticated && !isUserContextLoading) {
    return (
      <div className="flex flex-col justify-center items-center pt-22 h-[450px] bg-gradient-to-br from-gray-50 to-gray-100 p-6 text-center rounded-xl">
        <FiAlertTriangle className="w-24 h-24 text-red-500 mb-6" />
        <h2 className="text-3xl font-semibold text-red-600 mb-3">
          Authentication Required
        </h2>
        <p className="text-xl text-gray-700 max-w-2xl mb-3">
          You need to be logged in to view your appointments.
        </p>
        <button
          onClick={() => navigate("/user-login")}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-md transition-all duration-300"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // Show component's own loader if fetching appointments after successful auth check
  if (loading) {
    return <Loader />;
  }

  // The rest of your existing component JSX
  const updateAppointmentStatus = async (id, newStatus) => {
    setUpdatingStatusId(id);
    setActionType(newStatus === "Confirmed" ? "confirm" : "cancel");
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.patch(
        `${endPoint.appointments}/${id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments((prev) =>
        prev.map((app) => (app._id === response.data._id ? response.data : app))
      );
      toast.success(`Appointment ${newStatus.toLowerCase()} successfully!`);
    } catch (err) {
      console.error("Error updating appointment:", err);
      toast.error(
        err.response?.data?.message ||
          `Failed to update appointment: ${err.message}`
      );
    } finally {
      setUpdatingStatusId(null);
      setActionType(null);
    }
  };

  const handleReject = (id) => updateAppointmentStatus(id, "Cancelled");
  const handleReschedule = () =>
    toast.info("Reschedule functionality coming soon!");

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-emerald-100/80 text-emerald-800 border-emerald-200";
      case "Pending":
        return "bg-amber-100/80 text-amber-800 border-amber-200";
      case "Cancelled":
        return "bg-rose-100/80 text-rose-800 border-rose-200";
      default:
        return "bg-gray-100/80 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

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

  const filteredAppointments = appointments.filter(
    (app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="pb-12 pt-25 bg-blue-50 min-h-screen">
      <Toaster position="top-right" richColors />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Your
            </span>{" "}
            Appointments
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Manage all your scheduled medical appointments
          </p>
        </div>

        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Your Appointments
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {filteredAppointments.length} appointment
                  {filteredAppointments.length !== 1 ? "s" : ""} found
                </p>
              </div>
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="Search by name, email or doctor..."
                  className="w-full pl-10 pr-5 py-2.5 border border-gray-200 rounded-lg text-base text-gray-800 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500
                  transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {filteredAppointments.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-gray-200 rounded-lg m-6 bg-gray-50/50">
              <FiBook className="mx-auto h-14 w-14 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No appointments found
              </h3>
              <p className="mt-1 text-gray-500">
                {searchTerm
                  ? "Try adjusting your search query"
                  : "You don't have any appointments scheduled yet"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-400 ">
              {filteredAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-shrink-0">
                      <div
                        className={`h-12 w-12 rounded-full ${getAvatarColor(
                          appointment.name
                        )} flex items-center justify-center text-xl font-bold shadow-inner`}
                      >
                        {appointment.name.charAt(0)}
                      </div>
                    </div>

                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {appointment.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {appointment.email}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide border ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {appointment.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-700 text-sm">
                        <div className="flex items-start">
                          <FiBook className="w-5 h-5 text-gray-400 mr-2.5 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">
                              Department
                            </p>
                            <p className="text-gray-800 font-medium">
                              {appointment.department}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <FiUser className="w-5 h-5 text-gray-400 mr-2.5 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">
                              Doctor
                            </p>
                            <p className="text-gray-800 font-medium">
                              {appointment.doctor}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <FiCalendar className="w-5 h-5 text-gray-400 mr-2.5 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">
                              Date
                            </p>
                            <p className="text-gray-800 font-medium">
                              {formatDate(appointment.date)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <FiClock className="w-5 h-5 text-gray-400 mr-2.5 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">
                              Time
                            </p>
                            <p className="text-gray-800 font-medium">
                              {appointment.time}
                            </p>
                          </div>
                        </div>
                      </div>

                      {appointment.message && (
                        <div className="mt-6 pt-4 border-t border-gray-100">
                          <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                            Patient Notes
                          </h4>
                          <p className="text-sm text-gray-700 bg-gray-50/50 p-3 rounded-lg">
                            {appointment.message}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 justify-end">
                    {appointment.status === "Pending" ? (
                      <>
                        {/* <button
                          onClick={handleReschedule}
                          className="px-4 py-2 rounded-lg text-sm font-medium transition duration-300 ease-in-out flex items-center justify-center
                          bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400
                          shadow-sm hover:shadow-md"
                        >
                          Reschedule
                        </button> */}
                        <button
                          onClick={() => handleReject(appointment._id)}
                          disabled={updatingStatusId === appointment._id}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-300 ease-in-out flex items-center justify-center
                            ${
                              updatingStatusId === appointment._id &&
                              actionType === "cancel"
                                ? "bg-rose-300 cursor-not-allowed"
                                : "bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:shadow-md"
                            }
                          `}
                        >
                          {updatingStatusId === appointment._id &&
                          actionType === "cancel" ? (
                            <>
                              <svg
                                className="animate-spin h-4 w-4 text-white mr-2"
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
                              Cancelling...
                            </>
                          ) : (
                            "Cancel Appointment"
                          )}
                        </button>
                      </>
                    ) : (
                      <div
                        className={`px-4 py-2 rounded-lg text-sm font-medium text-center w-full sm:w-auto
                          ${
                            appointment.status === "Confirmed"
                              ? "bg-emerald-100/80 text-emerald-800 border border-emerald-200"
                              : "bg-rose-100/80 text-rose-800 border border-rose-200"
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
  );
};

export default YourAppointments;
