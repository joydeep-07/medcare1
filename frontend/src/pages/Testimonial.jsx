import React, { useState, useEffect } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion"; 
import ReviewForm from "../Components/ReviewForm";
import { endPoint } from "../api/endpoints";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(endPoint.reviews);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch testimonials");
        }

        const sortedData = data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        setTestimonials(sortedData);
      } catch (error) {
        console.error("Error fetching testimonials:", error.message);
      }
    };

    fetchTestimonials();
  }, []);

  const handleShowMore = () => setVisibleCount(testimonials.length);
  const handleShowLess = () => setVisibleCount(3);
  const displayedTestimonials = testimonials.slice(0, visibleCount);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full bg-blue-50 px-10">
      {/* Hero Section - Reusing the previous hero section for consistency */}
      <div className="relative overflow-hidden ">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-1/3 h-full "></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-4xl font-bold text-gray-900 mb-6"
            >
              Patient Experiences
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600"
            >
              Genuine stories from those who've entrusted us with their care
            </motion.p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-8xl mx-auto px-6 lg:px-8 ">
        <ReviewForm />

        <div className="mt-20 pb-10">
          {testimonials.length > 0 ? (
            <>
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                // Changed to lg:grid-cols-3 for 3 cards horizontally on large screens
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <AnimatePresence>
                  {displayedTestimonials.map((t) => (
                    <motion.div
                      key={t._id}
                      variants={item}
                      transition={{ duration: 0.4 }}
                      className="relative"
                    >
                      {/* Card Design from previous example */}
                      <div className="h-full p-8 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                        {/* The absolute positioned quote was from the first version of the card design.
                            The second version uses inline quotes. I'm keeping the absolute one
                            as it was a key design element in the 'copy the design' request.
                            If you prefer the inline quotes, you can remove this div. */}
                        <div className="absolute top-8 left-8 text-blue-400 opacity-20 text-6xl">
                          <FaQuoteLeft />
                        </div>
                        <p className="relative z-10 text-gray-700 text-lg leading-relaxed mb-6">
                          {t.reviewText}
                        </p>
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-blue-600 font-medium text-lg">
                            {t.userFullName.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <h4 className="font-medium text-gray-900">
                              {t.userFullName}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {t.userEmail}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {testimonials.length > 3 && (
                <div className="mt-12 text-center">
                  {visibleCount < testimonials.length ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleShowMore}
                      className="px-8 py-3 bg-white text-blue-600 rounded-full border border-blue-200 hover:bg-blue-50 transition-all duration-300"
                    >
                      View More Testimonials
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleShowLess}
                      className="px-8 py-3 bg-white text-blue-600 rounded-full border border-blue-200 hover:bg-blue-50 transition-all duration-300"
                    >
                      Show Less
                    </motion.button>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center ">
              <div className="max-w-2xl mx-auto   rounded-xl border border-gray-100">
                
                <h3 className="text-2xl font-medium text-gray-800 mb-4">
                  Your Voice Matters
                </h3>
                <p className="text-gray-600 mb-6">
                  We value your feedback. Be the first to share your experience
                  and help others make informed decisions about their care.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;