import React, { useState } from "react";
// Import the endPoint object
import { endPoint } from "../api/endpoints"; // Adjust the path if endpoint.js is in a different directory
import Lottie from "lottie-react";
// import { FiRefreshCw } from "react-icons/fi";
import Heartrate from "../assets/Contact Us.json";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    message: "",
  });

  // State for managing form submission status and messages
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', 'submitting'
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus("submitting"); // Set status to submitting
    setResponseMessage(""); // Clear previous messages

    try {
      // Use endPoint.contact here
      const response = await fetch(endPoint.contact, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmissionStatus("success");
        setResponseMessage("Your message has been sent successfully!");
        setFormData({
          // Clear the form on successful submission
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          department: "",
          message: "",
        });
      } else {
        setSubmissionStatus("error");
        setResponseMessage(
          data.message || "Failed to send your message. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmissionStatus("error");
      setResponseMessage(
        "An error occurred. Please check your network and try again."
      );
    }
  };

  return (
    <section id="contact" className="py-16 bg-blue-50 pt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
              Contact Our
            </span>{" "}
            Medical Team
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Reach out to us for appointments, inquiries, or medical advice. Our
            team is available 24/7 to assist with your healthcare needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className=" rounded-xl p-6 md:p-8 ">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Send Us a Message
            </h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    // Changed classes here:
                    className="w-full px-4 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition"
                    placeholder="Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    // Changed classes here:
                    className="w-full px-4 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition"
                    placeholder="Surname"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  // Changed classes here:
                  className="w-full px-4 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition"
                  placeholder="Enter your email here"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  // Changed classes here:
                  className="w-full px-4 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition"
                  placeholder="+91 000-0000-000"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  // Changed classes here:
                  className="w-full px-4 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  placeholder="Subject"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  // Kept existing border classes for textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Describe your medical concern or inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 px-6 rounded-md font-medium hover:from-blue-600 hover:to-teal-600 transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={submissionStatus === "submitting"}
              >
                {submissionStatus === "submitting"
                  ? "Sending..."
                  : "Send Message"}
              </button>

              {/* Submission status messages */}
              {responseMessage && (
                <p
                  className={`mt-4 text-center ${
                    submissionStatus === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {responseMessage}
                </p>
              )}
            </form>
          </div>

          {/* ANIMATION */}
          <div className="space-y-6">
           

            <div className="rounded-xl h-full flex items-center justify-center p-6 md:p-8">
              <div className="w-120 h-96 flex items-center justify-center">
                <Lottie
                  animationData={Heartrate}
                  loop
                  autoplay
                  className="filter drop-shadow-lg"
                />
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
