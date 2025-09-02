import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { endPoint } from "../api/endpoints";
import { toast } from "sonner";
import {
  FaClinicMedical,
  FaHospital,
  FaStethoscope,
  FaPills,
} from "react-icons/fa";
import Lottie from "lottie-react";
import Heartrate from "../assets/Doctor.json";

const departments = [
  "General Medicine",
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
];


function DoctorsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const formRef = useRef(null);
  const [formHeight, setFormHeight] = useState("auto");

  useEffect(() => {
    const updateFormHeight = () => {
      if (formRef.current) {
        setFormHeight(formRef.current.offsetHeight);
      }
    };

    updateFormHeight();

    const resizeObserver = new ResizeObserver(() => updateFormHeight());
    if (formRef.current) {
      resizeObserver.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        resizeObserver.unobserve(formRef.current);
      }
    };
  }, [watch()]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Adding doctor...");

    try {
      if (!data.name.startsWith("Dr. ")) {
        data.name = "Dr. " + data.name.trim();
      }

      const response = await axios.post(endPoint.doctors, {
        ...data,
        contact: {
          email: data.email,
          phone: data.phone,
        },
      });

      toast.success("Doctor added successfully!", { id: toastId });
      reset();
      setImagePreview("");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add doctor. Please try again.",
        { id: toastId }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-blue-50 min-h-screen py-10 md:py-16 px-4 md:px-8 lg:px-16">
      <div
        className="hidden md:flex md:w-1/3 bg-white relative flex-col justify-between py-12 px-10 rounded-2xl shadow-xl overflow-hidden mr-8 my-10"
        style={{ height: formHeight }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        {/* Animation Centered */}
        <div className="flex flex-1 items-center justify-center z-10">
          <Lottie
            animationData={Heartrate}
            loop
            autoplay
            className="w-[96] h-[96]"
          />
        </div>

        {/* Bottom Text */}
        <div className="z-10 text-center px-4 pb-4">
          <h2 className="text-2xl font-semibold text-white mb-4 leading-tight">
            <span className="text-blue-600">Add</span> <span className="text-blue-500" >New Doctor</span>
          </h2>
          <p className="text-blue-400 text-opacity-90 text-md leading-relaxed">
            Register healthcare professionals to expand your medical network.
          </p>
        </div>
      </div>

      <div className="w-full md:w-2/3 flex flex-col items-center justify-center">
        <div
          ref={formRef}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100 w-full max-w-6xl my-10 md:my-0"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Doctors Registration
            </span>
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Doctor's Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", {
                    required: "Doctor's Name is required",
                    validate: (value) => {
                      if (!value.startsWith("Dr. "))
                        return "Name must start with 'Dr. '";
                      if (value.trim() === "Dr." || value.trim() === "Dr. ")
                        return "Please enter a valid name";
                      return true;
                    },
                  })}
                  className={`w-full outline-none px-4 py-2 border-b focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter Doctor's name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Department
                </label>
                <select
                  id="department"
                  {...register("department", {
                    required: "Department is required",
                  })}
                  className={`w-full outline-none px-4 py-2 border-b focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out ${
                    errors.department ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.department.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="specialty"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Specialty
                </label>
                <input
                  id="specialty"
                  type="text"
                  {...register("specialty", {
                    required: "Specialty is required",
                  })}
                  className={`w-full outline-none px-4 py-2 border-b focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out ${
                    errors.specialty ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter speciality"
                />
                {errors.specialty && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.specialty.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Bio
              </label>
              <textarea
                id="bio"
                {...register("bio", {
                  required: "Bio is required",
                  minLength: {
                    value: 50,
                    message: "Bio must be at least 50 characters",
                  },
                })}
                rows="4"
                className={`w-full outline-none px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out ${
                  errors.bio ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Provide a brief biography of the doctor, including their expertise and accomplishments..."
              />
              {errors.bio && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.bio.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Image URL
              </label>
              <input
                id="image"
                type="url"
                {...register("image", {
                  required: "Image URL is required",
                  pattern: {
                    value: /\.(jpeg|jpg|gif|png|webp)$/i,
                    message: "URL must point to an image file",
                  },
                  onChange: (e) => setImagePreview(e.target.value),
                })}
                className={`w-full outline-none px-4 py-2 border-b focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out ${
                  errors.image ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter image url"
              />
              {errors.image && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.image.message}
                </p>
              )}
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-40 object-contain rounded-lg border border-gray-200 shadow-sm"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/200x150?text=Image+Not+Found")
                    }
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label
                  htmlFor="education"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Education
                </label>
                <input
                  id="education"
                  type="text"
                  {...register("education", {
                    required: "Education is required",
                  })}
                  className={`w-full outline-none px-4 py-2 border-b focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out ${
                    errors.education ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter Degree and Institution "
                />
                {errors.education && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.education.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Experience
                </label>
                <input
                  id="experience"
                  type="text"
                  {...register("experience", {
                    required: "Experience is required",
                  })}
                  className={`w-full outline-none px-4 py-2 border-b focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out ${
                    errors.experience ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter Experience "
                />
                {errors.experience && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.experience.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contact Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={`w-full outline-none px-4 py-2 border-b  focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter contact email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contact Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Must be a 10-digit number",
                    },
                  })}
                  className={`w-full outline-none px-4 py-2 border-b focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter contact number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow-lg mt-8 flex items-center justify-center transform hover:-translate-y-0.5
                bg-gradient-to-r from-blue-600 to-teal-500 text-white
                hover:from-blue-700 hover:to-teal-600 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  Adding Doctor...
                </>
              ) : (
                "Add Doctor"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DoctorsForm;
