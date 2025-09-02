import React, { useState, useEffect } from "react";
import axios from "axios";
import { endPoint } from "../api/endpoints";
import DoctorsDetails from "./DoctorsDetails";
import { toast } from "sonner";
import Loader from "../Components/Loader";
const Department = () => {
  const [activeDepartment, setActiveDepartment] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDoctorDetails, setShowDoctorDetails] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(endPoint.doctors);
        const doctors = response.data.data || response.data;

        const departmentGroups = [
          {
            name: "General Medicine",
            description:
              "Our General Medicine department provides comprehensive primary healthcare services for adults and families, offering preventive care, routine check-ups, and treatment for common illnesses.",
            doctors: doctors.filter((d) => d.department === "General Medicine"),
          },
          {
            name: "Cardiology",
            description:
              "The Cardiology department specializes in diagnosing and treating heart and cardiovascular conditions. Our team of cardiologists offers advanced care for arrhythmias, coronary artery disease, and more.",
            doctors: doctors.filter((d) => d.department === "Cardiology"),
          },
          {
            name: "Neurology",
            description:
              "Our Neurology department focuses on disorders of the nervous system, including the brain, spinal cord, and peripheral nerves. We treat conditions such as epilepsy, stroke, and Parkinson's disease.",
            doctors: doctors.filter((d) => d.department === "Neurology"),
          },
          {
            name: "Pediatrics",
            description:
              "The Pediatrics department is dedicated to the health and well-being of infants, children, and adolescents. Our compassionate pediatricians provide well-child visits and developmental screenings.",
            doctors: doctors.filter((d) => d.department === "Pediatrics"),
          },
          {
            name: "Orthopedics",
            description:
              "Our Orthopedics department specializes in the diagnosis and treatment of musculoskeletal conditions affecting bones, joints, muscles, ligaments, and tendons.",
            doctors: doctors.filter((d) => d.department === "Orthopedics"),
          },
          {
            name: "Dermatology",
            description:
              "The Dermatology department offers expert care for skin, hair, and nail conditions. Our dermatologists diagnose and treat acne, eczema, psoriasis, and skin cancer.",
            doctors: doctors.filter((d) => d.department === "Dermatology"),
          },
        ];

        setDepartments(departmentGroups);
        setLoading(false);
      } catch (err) {
        toast.error("Failed to load doctors. Please try again later.");
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const changeDepartment = (newIndex) => {
    if (newIndex === activeDepartment) return;
    setActiveDepartment(newIndex);
  };

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDoctorDetails(true);
  };

  if (loading)
    return  <Loader/> ;
  if (error)
    return <div className="text-center py-16 text-red-500">Error: {error}</div>;

  return (
    <section id="doctors" className="py-16 bg-blue-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
              Our Medical
            </span>{" "}
            Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive healthcare services provided by our team of
            specialists.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          <div className="lg:col-span-1 flex flex-col space-y-3 h-full">
            {departments.map((dept, index) => (
              <div
                key={index}
                className={`transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] rounded-xl p-5 cursor-pointer flex-grow flex items-center
                  ${
                    activeDepartment === index
                      ? "bg-gradient-to-r from-blue-400 to-teal-400 text-white shadow-xl"
                      : "bg-white/90 hover:bg-white text-gray-700 shadow-md hover:shadow-lg backdrop-blur-sm"
                  }`}
                onClick={() => changeDepartment(index)}
              >
                <h3 className="text-lg font-semibold text-center w-full transition-all duration-300">
                  {dept.name}  
                </h3>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 relative h-full">
            <div className="relative bg-white rounded-2xl p-8 border border-gray-100 h-full shadow-xl shadow-blue-50 overflow-hidden">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-20 bg-sky-300 blur-3xl opacity-30 rounded-full z-0" />
              <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-white/50 to-transparent opacity-30 rounded-full z-10 animate-pulse" />

              <div className="h-full flex flex-col relative z-10">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <svg
                      className="w-6 h-6 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 11c0 .5304-.2107 1.0391-.5858 1.4142C11.0391 12.7893 10.5304 13 10 13s-1.0391-.2107-1.4142-.5858C8.2107 12.0391 8 11.5304 8 11s.2107-1.0391.5858-1.4142C8.9609 9.2107 9.4696 9 10 9s1.0391.2107 1.4142.5858C11.7893 9.9609 12 10.4696 12 11z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 9h.01M12 21C6.477 21 2 16.523 2 11S6.477 1 12 1s10 4.477 10 10-4.477 10-10 10z"
                      />
                    </svg>
                    {departments[activeDepartment].name}
                  </h3>
                  <p className="text-gray-600">
                    {departments[activeDepartment].description}
                  </p>
                </div>

                {departments[activeDepartment].doctors.length > 0 ? (
                  <div className="flex-grow flex flex-wrap justify-center items-center gap-6">
                    {departments[activeDepartment].doctors.map(
                      (doctor, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col items-center text-center transition-all duration-300 hover:scale-105 cursor-pointer"
                          onClick={() => handleDoctorClick(doctor)}
                        >
                          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 transition-transform duration-300 relative">
                            <img
                              src={doctor.image}
                              alt={doctor.name}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 z-10 relative"
                              onError={(e) =>
                                (e.target.src =
                                  "https://via.placeholder.com/150")
                              }
                            />
                            <div className="absolute inset-0 bg-sky-300 blur-2xl rounded-full opacity-30 -z-10"></div>
                          </div>
                          <h4 className="font-semibold text-gray-800 flex items-center gap-1">
                            <svg
                              className="w-4 h-4 text-blue-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5.121 17.804A9 9 0 0112 3v0a9 9 0 016.879 14.804l-6.379 3.196a1 1 0 01-.879 0l-6.5-3.196z"
                              />
                            </svg>
                            {doctor.name}
                          </h4>
                          <p className="text-sm text-blue-600">
                            {doctor.specialty}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="flex-grow flex items-center justify-center">
                    <p className="text-gray-500 text-center">
                      No doctors currently available in this department.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDoctorDetails && (
        <DoctorsDetails
          doctor={selectedDoctor}
          onClose={() => setShowDoctorDetails(false)}
        />
      )}
    </section>
  );
};

export default Department;
