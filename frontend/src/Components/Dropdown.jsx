import React, { useState, useEffect, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut, FiUser } from "react-icons/fi";
import { FaUserShield } from "react-icons/fa";
import { PiBookOpenUserLight } from "react-icons/pi";
import { AdminContext } from "../context/AdminContext"; 
import { useUser } from "../context/UserContext";

const Dropdown = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);

  const userDropdownRef = useRef(null);
  const adminDropdownRef = useRef(null);
  const navigate = useNavigate();

  const { isAdminAuthenticated, logoutAdmin } = useContext(AdminContext);
  const { user, isAuthenticated, logout } = useUser();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target) &&
        !event.target.closest("button[aria-label='User menu']")
      ) {
        setIsUserDropdownOpen(false);
      }
      if (
        adminDropdownRef.current &&
        !adminDropdownRef.current.contains(event.target) &&
        !event.target.closest("button[aria-label='Admin menu']")
      ) {
        setIsAdminDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserDropdownOpen(false);
    navigate("/");
  };

  const handleAdminLogout = () => {
    logoutAdmin();
    setIsAdminDropdownOpen(false);
    navigate("/");
  };

  const userDropdownHeader = (
    <>
      <p className="text-sm font-semibold text-gray-800 truncate flex items-center">
        {user?.name || "Welcome"}
      </p>
      <p className="text-xs text-gray-500 font-medium truncate mt-1 flex items-center">
        <span>{user?.email || "User Account"}</span>
      </p>
    </>
  );

  const userDropdownItems = [
    {
      label: "Your Appointments",
      icon: PiBookOpenUserLight,
      onClick: () => navigate("your-appointments"),
    },
    { label: "Sign Out", icon: FiLogOut, onClick: handleLogout },
  ];

  const adminDropdownHeader = (
    <>
      <p className="text-sm font-semibold text-gray-800 flex items-center">
        <FaUserShield className="mr-2 text-indigo-500" />
        Welcome Admin
      </p>
      <p className="text-xs text-gray-500 font-medium mt-1">
        Administrator Dashboard
      </p>
    </>
  );

  const adminDropdownItems = [
   
    { label: "Sign Out", icon: FiLogOut, onClick: handleAdminLogout },
  ];


  const renderDropdown = (
    isOpen,
    onClose,
    dropdownRef,
    headerContent,
    dropdownItems,
    direction
  ) => {
    const isUser = direction === "user";
    const bgColorClass = isUser ? "bg-blue-100" : "bg-indigo-100";
    const textColorClass = isUser ? "text-blue-600" : "text-indigo-600";
    const hoverBgClass = isUser ? "hover:bg-blue-50" : "hover:bg-indigo-50";
    const hoverTextColorClass = isUser
      ? "hover:text-blue-600"
      : "hover:text-indigo-600";
    const iconColorClass = isUser
      ? "group-hover:text-blue-500"
      : "group-hover:text-indigo-500";
    const borderColorClass = isUser ? "border-blue-100" : "border-indigo-100";

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl py-0 z-50 border ${borderColorClass} backdrop-blur-sm bg-opacity-95`}
            ref={dropdownRef}
          >
            <div className="px-4 py-3 border-b border-gray-100">
              {headerContent}
            </div>
            <div className="py-1">
              {dropdownItems.map((item, index) =>
                "to" in item ? (
                  <Link
                    key={index}
                    to={item.to}
                    onClick={() => {
                      item.onClick && item.onClick();
                      onClose();
                    }}
                    className={`flex items-center w-full px-4 py-3 text-sm text-gray-600 ${hoverBgClass} ${hoverTextColorClass} transition-all duration-200 group`}
                  >
                    {item.icon &&
                      React.createElement(item.icon, {
                        className: `mr-3 text-gray-400 ${iconColorClass} transition-colors duration-200`,
                      })}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ) : (
                  <button
                    key={index}
                    onClick={() => {
                      item.onClick && item.onClick();
                      onClose();
                    }}
                    className={`flex items-center w-full px-4 py-3 text-sm text-gray-600 ${hoverBgClass} ${hoverTextColorClass} transition-all duration-200 group`}
                  >
                    {item.icon &&
                      React.createElement(item.icon, {
                        className: `mr-3 text-gray-400 ${iconColorClass} transition-colors duration-200`,
                      })}
                    <span className="font-medium">{item.label}</span>
                  </button>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <>
      {/* Admin Dropdown */}
      {isAdminAuthenticated && (
        <div className="relative">
          <button
            onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
            className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 hover:bg-indigo-200 transition-colors duration-200 focus:outline-none"
            aria-label="Admin menu"
          >
            <FaUserShield className="w-5 h-5" />
          </button>
          {renderDropdown(
            isAdminDropdownOpen,
            () => setIsAdminDropdownOpen(false),
            adminDropdownRef,
            adminDropdownHeader,
            adminDropdownItems,
            "admin"
          )}
        </div>
      )}

      {/* User Dropdown */}
      {isAuthenticated && !isAdminAuthenticated && (
        <div className="relative">
          <button
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors duration-200 focus:outline-none"
            aria-label="User menu"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="User"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <FiUser className="w-5 h-5" />
            )}
          </button>
          {renderDropdown(
            isUserDropdownOpen,
            () => setIsUserDropdownOpen(false),
            userDropdownRef,
            userDropdownHeader,
            userDropdownItems,
            "user"
          )}
        </div>
      )}
    </>
  );
};

export default Dropdown;
