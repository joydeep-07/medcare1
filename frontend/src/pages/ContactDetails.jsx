import React, { useState, useEffect } from "react";
import {
  FiSend,
  FiClock,
  FiMail,
  FiPhone,
  FiMapPin,
  FiLoader,
} from "react-icons/fi";
import { toast } from "sonner";
import Loader from "../Components/Loader"; 


import { endPoint } from "../api/endpoints";
const ContactDetail = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(null); 
  const [replies, setReplies] = useState(() => {
    if (typeof window !== "undefined") {
      const savedReplies = localStorage.getItem("contactReplies");
      return savedReplies ? JSON.parse(savedReplies) : {};
    }
    return {};
  });

  useEffect(() => {
    const fetchContacts = async () => {
      try {
       
        const response = await fetch(endPoint.contacts);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setContacts(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching contacts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("contactReplies", JSON.stringify(replies));
    }
  }, [replies]);

  const handleReplySubmit = async (contactId, contactEmail) => {
    if (!replyText.trim()) {
      toast.warning("Please enter your reply message");
      return;
    }

    setSendingReply(contactId); 

    try {
      
      const response = await fetch(endPoint.contactReply, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: contactEmail, replyText: replyText }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send reply. Status: ${response.status}`);
      }

      const newReply = {
        text: replyText,
        date: new Date().toISOString(),
        from: "Medical Team",
      };

      setReplies((prevReplies) => ({
        ...prevReplies,
        [contactId]: [...(prevReplies[contactId] || []), newReply],
      }));

      setReplyText("");
      toast.success("Reply sent successfully");
    } catch (err) {
      console.error("Error sending reply:", err);
      toast.error(`Failed to send reply: ${err.message}`);
    } finally {
      setSendingReply(null);
    }
  };

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

  if (contacts.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[450px] bg-blue-50 rounded-lg p-6">
        <svg
          className="w-20 h-20 text-blue-400 mb-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h3 className="text-2xl font-medium text-gray-700 mb-2">
          No Patient Messages
        </h3>
        <p className="text-gray-500 text-center max-w-md">
          You currently have no contact inquiries from patients. <br />
          New messages will appear here when received.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 py-12 pt-22 px-4 sm:px-6 lg:px-15">
      <div className="mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500">
              Patient's Inquiries
            </span>
          </h2>
          <p className="text-slate-600 text-lg max-w-3xl mx-auto">
            Manage all patient inquiries and send replies.
          </p>
        </div>

        <div className="space-y-8">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="relative bg-white shadow-xl rounded-lg overflow-hidden"
            >
              {/* REPLIED Badge */}
              {(replies[contact._id] || []).length > 0 && (
                <div className="absolute top-5 right-5 bg-green-500 text-white text-sm font-semibold px-4 py-1 rounded-full shadow">
                  Replied
                </div>
              )}

              <div className="p-6 sm:p-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center text-white font-bold">
                          {contact.firstName.charAt(0)}
                          {contact.lastName.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {contact.firstName} {contact.lastName}
                        </h3>
                        <p className="text-blue-600">
                          {contact.department
                            ? contact.department.charAt(0).toUpperCase() +
                              contact.department.slice(1)
                            : "General Inquiry"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center">
                        <FiMail className="text-blue-500 mr-2" />
                        <a
                          href={`mailto:${contact.email}`}
                          className="text-gray-700 hover:text-blue-600 truncate"
                          title={contact.email}
                        >
                          {contact.email}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <FiPhone className="text-blue-500 mr-2" />
                        <a
                          href={`tel:${
                            contact.phone
                              ? contact.phone.replace(/[^\d+]/g, "")
                              : ""
                          }`}
                          className="text-gray-700 hover:text-blue-600"
                        >
                          {contact.phone || "N/A"}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <FiClock className="text-blue-500 mr-2" />
                        <span className="text-gray-700">
                          {new Date(
                            contact.date || new Date()
                          ).toLocaleString()}
                        </span>
                      </div>
                      {/* <div className="flex items-center">
                        <FiMapPin className="text-blue-500 mr-2" />
                        <span className="text-gray-700">Kolkata, India</span>
                      </div> */}
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg mb-6">
                      <h4 className="text-sm font-medium text-blue-800 mb-2">
                        Patient Message
                      </h4>
                      <p className="text-gray-800 whitespace-pre-line">
                        {contact.message}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Replies section */}
                {(replies[contact._id] || []).length > 0 && (
                  <div className="pt-1 mb-4">
                    <h4 className="text-sm font-medium text-blue-700 mb-2">
                      Conversation History:
                    </h4>
                    <div className="space-y-4 max-h-48 overflow-y-auto pr-2">
                      {replies[contact._id].map((reply, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg ${
                            reply.from === "Medical Team"
                              ? "bg-blue-50 text-blue-800"
                              : "bg-gray-50 text-gray-800"
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="font-medium">{reply.from}</div>
                            <div className="text-xs text-gray-500">
                              {new Date(reply.date).toLocaleString()}
                            </div>
                          </div>
                          <p className="mt-1 text-sm">{reply.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reply input */}
                <div className="mt-6 flex">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-0.8 focus:ring-sky-500 focus:border-blue-500 outline-none transition"
                    disabled={sendingReply === contact._id} // Disable input while sending
                  />
                  <button
                    onClick={() =>
                      handleReplySubmit(contact._id, contact.email)
                    }
                    className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 rounded-r-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300 flex items-center justify-center"
                    disabled={sendingReply === contact._id} // Disable button while sending
                  >
                    {sendingReply === contact._id ? (
                      <FiLoader className="animate-spin mr-2" /> // Changed to FiLoader
                    ) : (
                      <FiSend className="mr-2" />
                    )}
                    {sendingReply === contact._id ? "Sending..." : "Send"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;
