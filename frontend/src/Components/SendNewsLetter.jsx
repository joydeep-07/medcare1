import React, { useContext, useState, useRef, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";
import { FiSend, FiImage, FiLock } from "react-icons/fi";
import { motion } from "framer-motion";
import { endPoint } from "../api/endpoints";
import { toast } from "sonner";
const SendNewsLetter = () => {
  const { isAdminAuthenticated } = useContext(AdminContext);
  const [imageUrl, setImageUrl] = useState("");
  const [heading, setHeading] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef(null);
  const imageUrlRef = useRef(null);
  const headingRef = useRef(null);
  const previewRef = useRef(null);
  const [previewHeight, setPreviewHeight] = useState(0);
  const [textareaWidth, setTextareaWidth] = useState("100%");

  // Calculate dimensions
  useEffect(() => {
    const calculateDimensions = () => {
      if (imageUrlRef.current && headingRef.current && previewRef.current) {
        // Calculate preview height
        const imageUrlHeight = imageUrlRef.current.offsetHeight;
        const headingHeight = headingRef.current.offsetHeight;
        const gapHeight = 24; // 1.5rem gap (6 * 4px)
        setPreviewHeight(imageUrlHeight + headingHeight + gapHeight);

        // Calculate textarea width
        const imageUrlWidth = imageUrlRef.current.offsetWidth;
        const previewWidth = previewRef.current.offsetWidth;
        const gapWidth = 24; // 1.5rem gap (6 * 4px)
        setTextareaWidth(`${imageUrlWidth + previewWidth + gapWidth}px`);
      }
    };

    calculateDimensions();
    window.addEventListener("resize", calculateDimensions);

    return () => window.removeEventListener("resize", calculateDimensions);
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [body]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(endPoint.newsletterSend, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl, heading, body }),
      });

      const data = await res.json();

      if (res.ok) {
        // alert(data.message || "Newsletter sent successfully!");
        toast.success(data.message || "Newsletter sent successfully!");
      } else {
        // alert(data.message || "Failed to send newsletter.");
        toast.error(data.message || "Failed to send newsletter.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while sending the newsletter.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const adminContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <div className="mb-6">
        <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-blue-600 bg-blue-100 rounded-full">
          ADMIN DASHBOARD
        </span>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
          Craft Your Newsletter
        </span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main content row */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column - Form inputs */}
          <div className="lg:w-1/2 space-y-6">
            <div className="space-y-1" ref={imageUrlRef}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
              />
            </div>

            <div className="space-y-1" ref={headingRef}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Newsletter Heading
              </label>
              <input
                type="text"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                placeholder="Exciting Updates Inside!"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
              />
            </div>
          </div>

          {/* Right column - Image preview */}
          <div className="lg:w-1/2" ref={previewRef}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image Preview
            </label>
            <div
              className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-gray-50 flex items-center justify-center"
              style={{ height: `${previewHeight}px` }}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-full flex flex-col items-center justify-center p-6 text-gray-400">
                        <FiImage class="h-12 w-12 mb-3" />
                        <p class="text-center">Couldn't load image from URL</p>
                        <p class="text-sm mt-2 text-center">Please check the image link</p>
                      </div>
                    `;
                  }}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-gray-400">
                  <FiImage className="h-12 w-12 mb-3" />
                  <p className="text-center">Image preview will appear here</p>
                  <p className="text-sm mt-2 text-center">
                    Enter an image URL above
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Textarea section */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Newsletter Content
          </label>
          <textarea
            ref={textareaRef}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your engaging content here..."
            className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm resize-none overflow-hidden"
            rows={5}
            style={{
              minHeight: "200px",
              width: textareaWidth,
              maxWidth: "100%",
            }}
          />
        </div>

        {/* Submit button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`relative overflow-hidden px-8 py-3 rounded-xl font-medium text-white shadow-lg transition-all duration-300 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 hover:shadow-xl"
            }`}
          >
            {isSubmitting ? (
              <svg
                className="animate-spin h-5 w-5 text-white mx-auto"
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
            ) : (
              <span className="flex items-center justify-center gap-2">
                <FiSend className="h-5 w-5" />
                Send Newsletter
              </span>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );

  const fallbackContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-center py-24"
    >
      <div className="inline-flex items-center justify-center p-4 bg-gray-100 rounded-full mb-6">
        <FiLock className="h-8 w-8 text-gray-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-3">
        Admin Access Required
      </h2>
      <p className="text-gray-600 max-w-md mx-auto">
        You need administrator privileges to access the newsletter dashboard.
      </p>
    </motion.div>
  );

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-8xl">
        {isAdminAuthenticated ? adminContent : fallbackContent}
      </div>
    </section>
  );
};

export default SendNewsLetter;
