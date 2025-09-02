import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const DoctorsDetails = ({ doctor, onClose }) => {
  const popupRef = useRef(null);
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!doctor) return null;

  const handleBookAppointment = () => {
    if (!isAuthenticated) {
      toast.info("Please Login First");
      return;
    }

    onClose();

    navigate("/#appointment", {
      state: {
        prefillDepartment: doctor.department,
        prefillDoctor: doctor.name,
        scrollToAppointment: true,
      },
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center z-50 p-2 md:p-4 backdrop-blur-sm bg-black/40">
        <motion.div
          ref={popupRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{
            duration: 0.3,
            ease: [0.17, 0.67, 0.83, 0.67],
            type: "spring",
            stiffness: 100,
          }}
          className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] p-6 relative overflow-y-auto border border-gray-200/80"
          style={{
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors z-10 bg-white rounded-full p-1.5 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            aria-label="Close"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className="flex flex-col items-center w-full h-full gap-6">
            {/* Doctor Image */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="w-36 h-36 flex-shrink-0 rounded-full overflow-hidden border-4 border-white shadow-xl relative"
              style={{
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 rounded-full border-2 border-white/30 pointer-events-none" />
            </motion.div>

            {/* Doctor Details */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full space-y-4 text-center sm:text-left"
            >
              <div>
                <h3
                  className="text-2xl font-bold mb-1 leading-tight text-gray-900"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    letterSpacing: "-0.5px",
                  }}
                >
                  {doctor.name}
                </h3>
                <p className="text-sm font-medium text-blue-600/90 tracking-wide uppercase">
                  {doctor.specialty}
                </p>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200/80 to-transparent" />

              <div className="space-y-4 text-gray-700 text-sm">
                <p className="text-gray-600 leading-relaxed">
                  {doctor.bio ||
                    doctor.description ||
                    "Dedicated to providing exceptional patient care with expertise in their field and a commitment to patient well-being."}
                </p>

                {doctor.education && (
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-gray-400 tracking-wider uppercase">
                      Education
                    </span>
                    <span className="text-gray-800 font-medium">
                      {doctor.education}
                    </span>
                  </div>
                )}

                {doctor.experience && (
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-gray-400 tracking-wider uppercase">
                      Experience
                    </span>
                    <span className="text-gray-800 font-medium">
                      {doctor.experience}
                    </span>
                  </div>
                )}

                {(doctor.contact?.email || doctor.contact?.phone) && (
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-gray-400 tracking-wider uppercase">
                      Contact
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {doctor.contact.email && (
                        <a
                          href={`mailto:${doctor.contact.email}`}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          {doctor.contact.email}
                        </a>
                      )}
                      {doctor.contact.phone && (
                        <a
                          href={`tel:${doctor.contact.phone}`}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          {doctor.contact.phone}
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <motion.div
                className="pt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={handleBookAppointment}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2"
                  style={{
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Book an Appointment
                </button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DoctorsDetails;
