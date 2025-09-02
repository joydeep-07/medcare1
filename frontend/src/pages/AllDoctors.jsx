import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaEdit,
  FaTrashAlt,
  FaEnvelope,
  FaPhone,
  FaEllipsisV,
} from "react-icons/fa";
import { endPoint } from "../api/endpoints";
import Loader from "../Components/Loader";
import EditDoctorForm from "../Components/EditDoctorForm";
import { toast } from "sonner";

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    specialty: "",
    bio: "",
    image: "",
    education: "",
    experience: "",
    contact: {
      email: "",
      phone: "",
    },
  });

  const API_BASE_URL = endPoint.doctors;

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_BASE_URL);
      setDoctors(response.data.data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      setError("Failed to load doctors. Please try again later.");
      toast.error("Failed to load doctors.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setDoctors(doctors.filter((doctor) => doctor._id !== id));
      toast.success("Doctor deleted successfully!");
    } catch (err) {
      console.error("Error deleting doctor:", err);
      const errorMessage =
        "Failed to delete doctor. " +
        (err.response?.data?.message || err.message);
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleEditClick = (doctor) => {
    setEditingId(doctor._id);
    setFormData({
      name: doctor.name,
      department: doctor.department,
      specialty: doctor.specialty,
      bio: doctor.bio,
      image: doctor.image,
      education: doctor.education,
      experience: doctor.experience,
      contact: {
        email: doctor.contact?.email || "",
        phone: doctor.contact?.phone || "",
      },
    });
    setOpenDropdownId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("contact.")) {
      setFormData((prevData) => ({
        ...prevData,
        contact: {
          ...prevData.contact,
          [name.split(".")[1]]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, formData);
      setDoctors(
        doctors.map((doc) => (doc._id === id ? response.data.data : doc))
      );
      setEditingId(null);
      toast.success("Doctor updated successfully!");
    } catch (err) {
      console.error("Error updating doctor:", err);
      const errorMessage =
        "Failed to update doctor. " +
        (err.response?.data?.message || err.message);
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const toggleDropdown = (id, e) => {
    e.stopPropagation(); 
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

 
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdownId(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  
  const filteredDoctors = doctors.filter((doctor) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const matchesName = doctor.name.toLowerCase().includes(lowerCaseSearchTerm);
    const matchesDepartment = doctor.department
      .toLowerCase()
      .includes(lowerCaseSearchTerm);

    return matchesName || matchesDepartment;
  });

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
    <div className="pt-24 p-6 bg-blue-50 ">
      <div className="text-center mb-4">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500">
            All Doctors
          </span>
        </h2>
        <p className="text-slate-600 text-lg max-w-3xl mx-auto">
          Manage all Doctors and their details in one place. You can view, edit,
          and delete doctor profiles
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-12 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-5 items-center">
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search doctors by name or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3.5 border border-gray-200 rounded-full bg-white shadow-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  className="h-5 w-5 text-gray-400 hover:text-gray-500 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      
      {filteredDoctors.length === 0 ? (
        <p className="text-center text-gray-700 text-lg font-medium leading-relaxed max-w-2xl mx-auto">
          <span className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-50">
            <svg
              className="w-5 h-5 mr-2 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            No physicians found matching your search criteria.
          </span>
        </p>
      ) : (
        <div className="flex flex-col items-center">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex w-[1550px] mb-6 relative"
            >
              <div className="flex-shrink-0 p-6">
                <img
                  className="w-48 h-48 rounded-full object-cover object-center border-4 border-white shadow-md"
                  src={doctor.image}
                  alt={`Dr. ${doctor.name}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/200x200?text=No+Image";
                  }}
                />
              </div>

              {editingId === doctor._id ? (
                <EditDoctorForm
                  formData={formData}
                  handleFormChange={handleFormChange}
                  handleFormSubmit={handleFormSubmit}
                  handleCancelEdit={handleCancelEdit}
                  doctorId={doctor._id}
                />
              ) : (
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                        {doctor.name}
                      </h3>
                      <p className="text-indigo-600 font-medium text-lg mb-2">
                        {doctor.department} - {doctor.specialty}
                      </p>
                    </div>
                    <div className="relative">
                      <button
                        onClick={(e) => toggleDropdown(doctor._id, e)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="More options"
                      >
                        <FaEllipsisV className="text-gray-500" />
                      </button>
                      {openDropdownId === doctor._id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                          <div className="py-1">
                            <button
                              onClick={() => handleEditClick(doctor)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <FaEdit className="mr-2" /> Edit Details
                            </button>
                            <button
                              onClick={() => handleDelete(doctor._id)}
                              className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                            >
                              <FaTrashAlt className="mr-2" /> Remove
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-700 text-base mb-4">{doctor.bio}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Education
                      </h4>
                      <p className="text-gray-600">{doctor.education}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Experience
                      </h4>
                      <p className="text-gray-600">{doctor.experience}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Contact</h4>
                    <p className="text-gray-600 flex items-center mb-1">
                      <FaEnvelope className="mr-2 text-gray-500" />
                      {doctor.contact?.email || "N/A"}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <FaPhone className="mr-2 text-gray-500" />
                      {doctor.contact?.phone || "N/A"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDoctors;
