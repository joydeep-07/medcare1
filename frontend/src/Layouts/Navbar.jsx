import React, { useState, useEffect, useRef, useContext } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import { FaCartPlus, FaUserCog } from "react-icons/fa";
import { CartContext } from "../context/cartContext";
import { AdminContext } from "../context/AdminContext";
import { useUser } from "../context/UserContext";
import Dropdown from "../Components/Dropdown";
import { FiLogIn } from "react-icons/fi";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sidePanelRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  const { cartItems } = useContext(CartContext);
  const cartItemCount = cartItems.length;
  const { isAdminAuthenticated } = useContext(AdminContext);
  const { isAuthenticated } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      if (!isAdminAuthenticated) {
        const sections = ["home", "about", "contact"];
        for (let i = 0; i < sections.length; i++) {
          const section = document.getElementById(sections[i]);
          if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(sections[i]);
              break;
            }
          }
        }
      }
    };

    const handleClickOutside = (event) => {
      if (
        sidePanelRef.current &&
        !sidePanelRef.current.contains(event.target) &&
        !event.target.closest("button[aria-label='Menu']")
      ) {
        setIsMenuOpen(false);
      }

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest("button[aria-label='Mobile Menu']")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAdminAuthenticated]);

  const handleClick = (e, section) => {
    e.preventDefault();
    if (window.location.pathname === "/") {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {(isMenuOpen || isMobileMenuOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-30"
            onClick={() => {
              setIsMenuOpen(false);
              setIsMobileMenuOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      <header
        className={`fixed top-0 left-0 h-[70px] w-full z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-lg bg-white/95 border-b border-blue-300/20 shadow-md"
            : "backdrop-blur-md bg-white/90 border-b border-blue-300/10"
        }`}
      >
        <nav className="h-full w-full flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-[90px]">
          <div className="flex items-center gap-4">
            {isAdminAuthenticated ? (
              <button
                className="relative group p-2 rounded-full transition-colors duration-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
              >
                <motion.div
                  className="relative w-6 h-6 flex items-center justify-center"
                  animate={isMenuOpen ? "open" : "closed"}
                  initial={false}
                >
                  {isMenuOpen ? (
                    <FiX className="w-6 h-6 text-blue-600" />
                  ) : (
                    <FiMenu className="w-6 h-6 text-blue-600" />
                  )}
                </motion.div>
              </button>
            ) : (
              <button
                className="md:hidden relative group p-2 rounded-full transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Mobile Menu"
              >
                <motion.div
                  className="relative w-6 h-6 flex items-center justify-center"
                  animate={isMobileMenuOpen ? "open" : "closed"}
                  initial={false}
                >
                  {isMobileMenuOpen ? (
                    <FiX className="w-6 h-6 text-blue-600" />
                  ) : (
                    <FiMenu className="w-6 h-6 text-blue-600" />
                  )}
                </motion.div>
              </button>
            )}

            <div className="flex items-center space-x-2 group">
              <div className="text-2xl font-bold leading-tight relative">
                <span className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-teal-300 rounded-lg blur opacity-10 group-hover:opacity-20 transition-opacity duration-300"></span>
                <div className="flex items-center justify-center gap-1">
                  <img
                    src={logo}
                    alt="Logo"
                    className="h-8 w-8 object-contain"
                  />
                  <span className="text-xl sm:text-2xl font-bold">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                      Med
                    </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-gray-500">
                      Care
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden md:flex items-center h-full">
              <ul className="flex items-center space-x-1 h-full">
                {!isAdminAuthenticated && (
                  <>
                    {["Home", "About", "Contact"].map((item) => {
                      const section = item.toLowerCase();
                      const isActive = activeSection === section;

                      return (
                        <li
                          key={item}
                          className="h-full flex items-center mx-2 group"
                        >
                          <a
                            href={`#${section}`}
                            onClick={(e) => handleClick(e, section)}
                            className={`relative px-4 py-2 text-sm transition-all duration-300 flex items-center h-full ${
                              isActive
                                ? "text-blue-600 font-medium"
                                : "text-gray-600 hover:text-blue-500"
                            }`}
                          >
                            <span className="flex items-center gap-1.5">
                              <span
                                className={`text-teal-400 transition-all duration-300 ${
                                  isActive
                                    ? "opacity-100 scale-110"
                                    : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-110"
                                }`}
                              >
                                +
                              </span>
                              {item}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </>
                )}
              </ul>
            </div>

            {!isAuthenticated && !isAdminAuthenticated ? (
              <button
                onClick={() => navigate("/user-login")}
                className="px-3 py-1.5 sm:px-4 sm:py-2 text-white rounded-md transition-all duration-200 text-xs sm:text-sm font-medium flex items-center justify-center gap-1 sm:gap-2 hover:shadow-md"
                style={{
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                Sign In
                <FiLogIn className="text-xs sm:text-sm" />
              </button>
            ) : (
              <Dropdown />
            )}
          </div>
        </nav>
      </header>

      {/* Mobile Menu - Now opens from left */}
      <AnimatePresence>
        {isMobileMenuOpen && !isAdminAuthenticated && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", ease: "easeInOut" }}
            className="fixed top-[70px] left-0 w-64 h-[calc(100vh-70px)] bg-white shadow-lg z-40 border-r border-gray-200"
          >
            <ul className="flex flex-col p-4 space-y-4">
              {["Home", "About", "Contact"].map((item) => {
                const section = item.toLowerCase();
                const isActive = activeSection === section;

                return (
                  <li key={item}>
                    <a
                      href={`#${section}`}
                      onClick={(e) => handleClick(e, section)}
                      className={`block px-4 py-3 rounded-md transition-all duration-300 ${
                        isActive
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : "text-gray-600 hover:bg-gray-50 hover:text-blue-500"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`text-teal-400 transition-all duration-300 ${
                            isActive ? "opacity-100 scale-110" : "opacity-70"
                          }`}
                        >
                          +
                        </span>
                        {item}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar - Now opens from left */}
      {isAdminAuthenticated && (
        <Sidebar
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          sidePanelRef={sidePanelRef}
          activeSection={activeSection}
          handleClick={handleClick}
          isAdminAuthenticated={isAdminAuthenticated}
        />
      )}
    </>
  );
};

export default Navbar;
