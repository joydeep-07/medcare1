import React, { useContext } from "react";
import { FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingBag,
  FaUserCog,
  FaSignOutAlt,
  FaCalendarAlt,
  FaSignInAlt,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaPlusSquare,
  FaUserMd,
  FaComments,
} from "react-icons/fa";
import { AdminContext } from "../context/AdminContext";
import { useUser } from "../context/UserContext";

const Sidebar = ({
  isMenuOpen,
  setIsMenuOpen,
  sidePanelRef,
  activeSection,
  handleClick,
}) => {
  const navigate = useNavigate();
  const { isAdminAuthenticated, logoutAdmin } = useContext(AdminContext);
  const { isAuthenticated, logout: logoutUser } = useUser();

  const handleAdminLogout = () => {
    logoutAdmin();
    setIsMenuOpen(false);
    navigate("/");
  };

  const handleUserLogout = () => {
    logoutUser();
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <motion.div
      ref={sidePanelRef}
      initial={{ x: -320 }}
      animate={{ x: isMenuOpen ? 0 : -320 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 left-0 w-64 h-full z-40 bg-white shadow-xl flex flex-col"
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
        <button
          onClick={() => setIsMenuOpen(false)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          aria-label="Close menu"
        >
          <FiX className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <ul className="p-4 space-y-2 flex-grow">
        {!isAdminAuthenticated && (
          <li>
            <button
              onClick={() => {
                navigate("/");
                setIsMenuOpen(false);
              }}
              className="w-full text-left flex items-center px-5 py-3 bg-white/80 backdrop-blur-md transition-all duration-300 cursor-pointer"
            >
              <span className="flex items-center gap-3 text-base font-medium text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 transition-all duration-300">
                <FaHome className="text-blue-400 hover:text-teal-500 transition-all duration-300 transform hover:scale-110" />
                Home
              </span>
            </button>
          </li>
        )}

        <li>
          {isAdminAuthenticated ? (
            <button
              onClick={() => {
                navigate("/");
                setIsMenuOpen(false);
              }}
              className="w-full text-left flex items-center px-5 py-3 bg-white/80 backdrop-blur-md transition-all duration-300 cursor-pointer "
            >
              <span className="flex items-center gap-3 text-base font-medium text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 transition-all duration-300">
                <FaUserCog className="text-blue-400 hover:text-teal-500 transition-all duration-300 transform hover:scale-110" />
                Home
              </span>
            </button>
          ) : (
            !isAuthenticated && (
              <button
                onClick={() => {
                  navigate("/admin");
                  setIsMenuOpen(false);
                }}
                className="w-full text-left flex items-center px-5 py-3 bg-white/80 backdrop-blur-md transition-all duration-300 cursor-pointer"
              >
                <span className="flex items-center gap-3 text-base font-medium text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 transition-all duration-300">
                  <FaUserCog className="text-blue-400 hover:text-teal-500 transition-all duration-300 transform hover:scale-110" />
                  Admin Login
                </span>
              </button>
            )
          )}
        </li>

        {!isAuthenticated && !isAdminAuthenticated && (
          <li>
            <button
              onClick={() => {
                navigate("/user-login");
                setIsMenuOpen(false);
              }}
              className="w-full text-left flex items-center px-5 py-3 bg-white/80 backdrop-blur-md transition-all duration-300 cursor-pointer"
            >
              <span className="flex items-center gap-3 text-base font-medium text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 transition-all duration-300">
                <FaSignInAlt className="text-blue-400 hover:text-teal-500 transition-all duration-300 transform hover:scale-110" />
                User Login
              </span>
            </button>
          </li>
        )}

        {isAdminAuthenticated && (
          <li>
            <button
              onClick={() => {
                navigate("/appointments");
                setIsMenuOpen(false);
              }}
              className="w-full text-left flex items-center px-5 py-3 bg-white/80 backdrop-blur-md transition-all duration-300 cursor-pointer"
            >
              <span className="flex items-center gap-3 text-base font-medium text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 transition-all duration-300">
                <FaCalendarAlt className="text-blue-400 hover:text-teal-500 transition-all duration-300 transform hover:scale-110" />
                Appointments
              </span>
            </button>
          </li>
        )}

        {isAdminAuthenticated && (
          <li>
            <button
              onClick={() => {
                navigate("/contact-details");
                setIsMenuOpen(false);
              }}
              className="w-full text-left flex items-center px-5 py-3 bg-white/80 backdrop-blur-md transition-all duration-300 cursor-pointer"
            >
              <span className="flex items-center gap-3 text-base font-medium text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 transition-all duration-300">
                <FaComments className="text-blue-400 hover:text-teal-500 transition-all duration-300 transform hover:scale-110" />
                Messages
              </span>
            </button>
          </li>
        )}

        {isAdminAuthenticated && (
          <li>
            <button
              onClick={() => {
                navigate("/add-doctors");
                setIsMenuOpen(false);
              }}
              className="w-full text-left flex items-center px-5 py-3 bg-white/80 backdrop-blur-md transition-all duration-300 cursor-pointer"
            >
              <span className="flex items-center gap-3 text-base font-medium text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 transition-all duration-300">
                <FaPlusSquare className="text-blue-400 hover:text-teal-500 transition-all duration-300 transform hover:scale-110" />
                Add Doctor
              </span>
            </button>
          </li>
        )}

        {isAdminAuthenticated && (
          <li>
            <button
              onClick={() => {
                navigate("/all-doctors");
                setIsMenuOpen(false);
              }}
              className="w-full text-left flex items-center px-5 py-3 bg-white/80 backdrop-blur-md transition-all duration-300 cursor-pointer"
            >
              <span className="flex items-center gap-3 text-base font-medium text-gray-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-500 transition-all duration-300">
                <FaUserMd className="text-blue-400 hover:text-teal-500 transition-all duration-300 transform hover:scale-110" />
                Doctors
              </span>
            </button>
          </li>
        )}
      </ul>

      {isAdminAuthenticated && (
        <div className="p-4 border-t border-gray-100 mt-auto">
          <button
            onClick={handleAdminLogout}
            className="w-full text-left flex items-center justify-center px-5 py-3 rounded-md bg-red-600 text-white font-medium shadow-sm transition-all duration-300 hover:shadow-lg hover:bg-red-700"
          >
            <FaSignOutAlt className="mr-3" />
            Admin Logout
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Sidebar;
