import React from "react";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import NewsLetter from "../Components/NewsLetter";

const Footer = () => {
  return (
    <>
      <section id="contact" className="z-50">
        <footer className="bg-[#0f172a] text-gray-300 pt-12 pb-8 border-t border-[#1e293b]">
          {/* Newsletter - Top on mobile, normal position on desktop */}
          <div className="block md:hidden px-4 sm:px-6 lg:px-8 mb-8">
            <NewsLetter />
          </div>

          <div className="max-w-7xl px-4 mx-auto  sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {/* Brand Section */}
            <div className="space-y-4">
              <h2 className="text-white text-xl sm:text-2xl font-bold tracking-widest">
                MEDCARE
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Your trusted partner for easy and efficient medical appointment
                booking.
              </p>
            </div>

            {/* Services Section */}
            <div>
              <h4 className="text-cyan-400 font-semibold mb-3 sm:mb-4 text-sm sm:text-base tracking-wide">
                SERVICES
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                {[
                  "Book Appointments",
                  "Find Doctors",
                  "Specialties",
                  "Patient Portal",
                  "Contact Support",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-white hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h4 className="text-cyan-400 font-semibold mb-3 sm:mb-4 text-sm sm:text-base tracking-wide">
                CONTACT
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <li className="flex flex-wrap">
                  <span className="text-gray-400 mr-1">Email:</span>
                  <a
                    href="mailto:joydeeprnp8821@gmail.com"
                    className="text-white hover:text-cyan-300 transition-colors duration-300"
                  >
                    joydeeprnp8821@gmail.com
                  </a>
                </li>
                <li className="flex flex-wrap">
                  <span className="text-gray-400 mr-1">Phone:</span>
                  <a
                    href="tel:9635172639"
                    className="text-white hover:text-cyan-300 transition-colors duration-300"
                  >
                    9635172639
                  </a>
                </li>
                <li className="flex flex-wrap">
                  <span className="text-gray-400 mr-1">Location:</span>
                  <span className="text-white hover:text-cyan-300 transition-colors duration-300">
                    Asansol, India
                  </span>
                </li>
              </ul>
            </div>

            {/* Socials & Newsletter Section */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h4 className="text-cyan-400 font-semibold mb-3 sm:mb-4 text-sm sm:text-base tracking-wide">
                  SOCIALS
                </h4>
                <div className="flex space-x-4 text-lg sm:text-xl">
                  {[
                    {
                      icon: <FaGithub />,
                      url: "https://github.com/joydeep-07",
                      label: "GitHub",
                    },
                    {
                      icon: <FaLinkedin />,
                      url: "https://www.linkedin.com/in/joydeep-paul-06b37926a",
                      label: "LinkedIn",
                    },
                    {
                      icon: <FaFacebook />,
                      url: "https://www.facebook.com/joydeep.paul.568089",
                      label: "Facebook",
                    },
                    {
                      icon: <FaInstagram />,
                      url: "https://www.instagram.com/mr.paul_16",
                      label: "Instagram",
                    },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-cyan-400 transition-colors duration-300"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Newsletter - Hidden on mobile, shown here on desktop */}
              <div className="hidden md:block mt-2 sm:mt-0">
                <NewsLetter />
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="mt-8 sm:mt-12 text-center text-xs sm:text-sm text-gray-500 border-t border-[#1e293b] pt-6 px-4">
            © {new Date().getFullYear()} MedCare. All rights reserved.
          </div>
        </footer>
      </section>
    </>
  );
};

export default Footer;
