import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { toast } from "sonner";
import { useUser } from "../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { endPoint } from "../api/endpoints";
import axios from "axios";
import Lottie from "lottie-react";
// import { FiRefreshCw } from "react-icons/fi";
import Heartrate from "../assets/Hospital 1.json";
import { TypeAnimation } from "react-type-animation";

const localizer = momentLocalizer(moment);

const AppointmentForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const { isAuthenticated, user } = useUser();
  const [isBooking, setIsBooking] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const selectedDepartment = watch("department");

  // Fetch doctors from database
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(endPoint.doctors);
        setDoctors(response.data.data || response.data);
        setLoadingDoctors(false);
      } catch (error) {
        toast.error("Failed to load doctors");
        setLoadingDoctors(false);
      }
    };

    fetchDoctors();
  }, []);

  const departments = Array.from(new Set(doctors.map((doc) => doc.department)));

  const doctorsByDepartment = doctors.reduce((acc, doctor) => {
    if (!acc[doctor.department]) {
      acc[doctor.department] = [];
    }
    acc[doctor.department].push(doctor.name);
    return acc;
  }, {});

  const availableTimes = [
    "09:00 AM - 11:00 PM",
    "12:00 PM - 02:00 PM",
    "03:00 PM - 05:00 PM",
    "06:00 PM - 09:00 PM",
  ];

  useEffect(() => {
    let shouldClearState = false;

    if (isAuthenticated && user) {
      setValue("name", user.name || "");
      setValue("email", user.email || "");
    }

    if (location.state) {
      const { prefillDepartment, prefillDoctor, scrollToAppointment } =
        location.state;

      if (prefillDepartment) {
        setValue("department", prefillDepartment);
        shouldClearState = true;
      }
      if (prefillDoctor) {
        setValue("doctor", prefillDoctor);
        shouldClearState = true;
      }
      if (scrollToAppointment) {
        const section = document.getElementById("appointment");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
        shouldClearState = true;
      }
      if (shouldClearState) {
        navigate(location.pathname, { replace: true, state: {} });
      }
    }
  }, [isAuthenticated, user, setValue, location.state, navigate]);

  useEffect(() => {
    setValue("doctor", "");
  }, [selectedDepartment, setValue]);

  const onSubmit = async (data) => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to book an appointment.");
      return;
    }

    setIsBooking(true);

    try {
      const response = await fetch(endPoint.appointments, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({
          ...data,
          date: new Date(data.date).toISOString(),
          status: "Pending",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to book appointment");
      }

      const result = await response.json();
      toast.success("Appointment booked successfully!");
      reset();
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error.message || "Failed to book appointment. Please try again."
      );
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <section id="appointment" className="py-16 pt-22 bg-blue-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
              Book an
            </span>{" "}
            Appointment
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Schedule your visit with our specialists. We'll confirm your
            appointment shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Appointment Form */}
          <div className=" p-6 md:p-8 h-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 h-full flex flex-col"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  {...register("name", {
                    required: "Please enter your full name",
                  })}
                  className="w-full px-4 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-transparent"
                  placeholder="Full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    {...register("email", {
                      required: "Please enter email address",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Please enter a valid email address",
                      },
                    })}
                    className="w-full px-4 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-transparent"
                    placeholder="Enter your email"
                    disabled={isAuthenticated}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    {...register("phone", {
                      required: "Please enter your phone number",
                      pattern: {
                        value: /^[0-9+\s()-]*$/,
                        message: "Please enter a valid phone number",
                      },
                    })}
                    className="w-full px-4 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-transparent"
                    placeholder="Please enter your phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Department *
                  </label>
                  <select
                    id="department"
                    name="department"
                    {...register("department", {
                      required: "Please select a Department",
                    })}
                    className="w-full px-4 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-transparent appearance-none"
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept, index) => (
                      <option key={index} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  {errors.department && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.department.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="doctor"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Doctor *
                  </label>
                  <select
                    id="doctor"
                    name="doctor"
                    {...register("doctor", {
                      required: "Please select a doctor",
                    })}
                    className="w-full px-4 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-transparent appearance-none"
                    disabled={!selectedDepartment || loadingDoctors}
                  >
                    <option value="">Select Doctor</option>
                    {selectedDepartment &&
                      doctorsByDepartment[selectedDepartment]?.map(
                        (docName, index) => (
                          <option key={index} value={docName}>
                            {docName}
                          </option>
                        )
                      )}
                  </select>
                  {loadingDoctors && (
                    <p className="text-sm text-gray-500 mt-1">
                      Loading doctors...
                    </p>
                  )}
                  {errors.doctor && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.doctor.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    {...register("date", {
                      required: "Please select a Date",
                      validate: (value) =>
                        new Date(value) >= new Date().setHours(0, 0, 0, 0) ||
                        "Please select a future date",
                    })}
                    className="w-full px-4 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-transparent"
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {errors.date && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.date.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Time *
                  </label>
                  <select
                    id="time"
                    name="time"
                    {...register("time", {
                      required: "Please select a timeslot",
                    })}
                    className="w-full px-4 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-transparent appearance-none"
                  >
                    <option value="">Select Time</option>
                    {availableTimes.map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  {errors.time && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.time.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex-grow">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Additional Notes
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  {...register("message")}
                  className="w-full px-4 py-2 border rounded-md border-gray-300 focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-transparent resize-y"
                  placeholder="Describe your symptoms or special requests..."
                ></textarea>
              </div>

              {!isAuthenticated && (
                <p className="text-red-600 text-center font-medium mt-4">
                  Please log in to book an appointment.
                </p>
              )}
              <button
                type="submit"
                className={`w-full py-3 px-6 rounded-md font-medium transition-all duration-300 shadow-sm mt-4 flex items-center justify-center
                  ${
                    isAuthenticated
                      ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }
                  ${
                    isBooking
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:from-blue-600 hover:to-teal-600"
                  }
                  `}
                disabled={!isAuthenticated || isBooking}
              >
                {isBooking ? (
                  <>
                    <span>Booking Appointment ...</span>{" "}
                    <span className="animate-spin ml-3">
                      <svg
                        className="h-5 w-5 text-white"
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
                    </span>
                  </>
                ) : (
                  "Book Appointment"
                )}
              </button>
            </form>
          </div>

          {/* Right section (Why Book With Us? / Emergency Contact) */}
          <div className="flex flex-col gap-6 h-full">
            <div className=" p-6 md:p-8  flex-grow flex flex-col items-center justify-center">
              <div className="w-104 h-104 flex items-center justify-center ">
                <Lottie
                  animationData={Heartrate}
                  loop
                  autoplay
                  className="filter drop-shadow-lg"
                />
              </div>

              <TypeAnimation
                sequence={[
                  "Fillup the form to book an appointment...",
                  2000,
                  "We will confirm your appointment...",
                  2000,
                  "You can also book an appointment by calling us...",
                  2000,
                ]}
                wrapper="span"
                cursor={false}
                repeat={Infinity}
                style={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: "#4A5568",
                  textAlign: "center",
                  marginTop: "1rem",
                }}
              />
            </div>

            
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;
