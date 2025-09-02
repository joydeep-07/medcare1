import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { useUser } from "../context/UserContext";
import { endPoint } from "../api/endpoints";
import { toast } from "sonner";

const ReviewForm = () => {
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isAuthenticated } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please log in first to submit a review.");
      return;
    }

    if (!review.trim()) {
      toast.error("Review cannot be empty. Please write something!");
      return;
    }

    setIsSubmitting(true);

    try {
        const backendUrl = endPoint.reviews;

      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewText: review,
          userFullName: user.fullname,
          userEmail: user.email,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error("Failed to submit review:", responseData);
        toast.error(
          responseData.message || "Failed to submit review. Please try again."
        );
      } else {
        console.log("Review submitted successfully:", responseData);
        toast.success("Thanks for your review!");
        setReview("");
      }
    } catch (error) {
      console.error("Error during review submission:", error);
      toast.error(
        "An unexpected error occurred. Please check your internet connection."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form className="flex mt-6" onSubmit={handleSubmit}>
        <input
          type="text"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="text-gray-800 bg-white border border-gray-300 rounded-l-full px-6 py-3 w-4xl shadow-sm focus:outline-none focus:ring-sky-700 focus:border-blue-500"
          placeholder="Leave your review here..."
          disabled={isSubmitting}
        />

        <button
          type="submit"
          className="flex items-center gap-2 text-white bg-sky-500 hover:bg-sky-600 transition-colors px-6 py-3 rounded-r-full shadow-sm"
          disabled={isSubmitting}
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
              Sending...
            </>
          ) : (
            <>
              <FiSend className="text-xl" />
              <span className="hidden sm:inline">Send</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
