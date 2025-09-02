import React, { useState, useEffect } from "react";
import { FiSend, FiMail } from "react-icons/fi";
import { MdDone } from "react-icons/md";
import { useUser } from "../context/UserContext";
import { toast } from "sonner";
import { endPoint } from "../api/endpoints";

const NewsLetter = () => {
  const { user, isAuthenticated } = useUser();
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      setEmail(user.email);
      checkSubscriptionStatus(user.email);
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  const checkSubscriptionStatus = async (email) => {
    try {
      const res = await fetch(endPoint.newsletterCheck(email));

      const data = await res.json();
      setIsSubscribed(data.isSubscribed);
    } catch (error) {
      console.error("Error checking subscription status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = emailRegex.test(email);
    setIsValid(valid);

    if (!valid || !isAuthenticated) return;

    try {
    const res = await fetch(endPoint.newsletterSubscribe, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Subscribed successfully!");
        setIsSubscribed(true);
      } else {
        toast.error(data.message || "Subscription failed.");
      }
    } catch (error) {
      toast.error("Server error. Please try again.");
    }
  };

  const handleUnsubscribe = async () => {
    try {
      const res = await fetch(endPoint.newsletterUnsubscribe, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Unsubscribed successfully!");
        setIsSubscribed(false);
      } else {
        toast.error(data.message || "Unsubscription failed.");
      }
    } catch (error) {
      toast.error("Server error. Please try again.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="mt-4 w-full max-w-md mx-auto px-4 sm:px-0">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-cyan-400 font-medium text-xs sm:text-sm tracking-wider uppercase">
            Join Our Exclusive Newsletter
          </h4>
        </div>

        <div className="relative group">
          <div
            className="flex items-center justify-center bg-gradient-to-br from-gray-800/90 to-gray-900/80 backdrop-blur-sm border border-gray-700 hover:border-cyan-400/30 py-5 px-6 rounded-md shadow-lg transition-all duration-300 ease-out hover:shadow-cyan-500/10 hover:scale-[1.01]"
            onClick={() => toast.error("Please login to subscribe")}
          >
            <button className="flex items-center space-x-2">
              <FiMail className="text-cyan-400 animate-pulse" />
              <p className="text-gray-200 text-xs sm:text-sm font-medium tracking-wide">
                Please <span className=" font-semibold">login</span> first to
                subscribe
              </p>
            </button>
            <div className="absolute inset-0 rounded-md overflow-hidden pointer-events-none z-[-1]">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="h-1 w-16 bg-cyan-400/30 rounded-full blur-sm group-hover:w-24 group-hover:bg-cyan-400/50 transition-all duration-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mt-4 w-full max-w-md mx-auto px-4 sm:px-0">
        <div className="flex items-center justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 w-full max-w-md mx-auto px-4 sm:px-0 font-sans">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-cyan-400 font-medium text-xs sm:text-sm tracking-wider uppercase">
          Join Our Exclusive Newsletter
        </h4>
      </div>

      {isSubscribed ? (
        <div className="space-y-2">
          <div className="flex items-center bg-gray-800 border border-gray-700 py-3 px-4 rounded-md">
            <div className="flex items-center space-x-2 text-xs sm:text-sm w-full justify-center">
              <MdDone className="text-green-400" />
              <span className="text-gray-100">Successfully Subscribed</span>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleUnsubscribe}
              className="text-xs text-gray-400 hover:text-red-400 transition-colors flex items-center"
            >
              <FiMail className="mr-[3px] mt-[2px]" />
              <span>Unsubscribe</span>
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="relative group">
          <div className="mb-4">
            <div className="flex items-center w-full bg-transparent border-b border-gray-500 transition-colors duration-300 py-3">
              <div className="flex items-center">
                <FiMail className="text-gray-400 text-lg mr-2" />
                <span className="text-sm text-gray-100">{email}</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="relative overflow-hidden group w-full rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-cyan-600 to-cyan-700 group-hover:from-cyan-400 group-hover:via-cyan-500 group-hover:to-cyan-600 transition-all duration-500"></div>
            <div className="absolute inset-0 overflow-hidden rounded-md">
              <div className="absolute top-0 left-0 h-full w-8 bg-white/30 -skew-x-12 animate-shine group-hover:animate-shine transition-all duration-700"></div>
            </div>
            <div className="relative flex items-center justify-center py-3 px-6 text-white">
              <FiSend className="text-base transform group-hover:translate-x-1 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
              <span className="text-sm font-medium tracking-wider opacity-90 group-hover:opacity-100 transition-opacity duration-300 ml-2">
                Subscribe
              </span>
            </div>
            <div className="absolute inset-0 border border-cyan-400/30 pointer-events-none group-hover:border-cyan-300/50 transition-all duration-500 rounded-md"></div>
          </button>

          {!isValid && (
            <p className="absolute -bottom-5 left-0 text-red-400 text-xs mt-1 animate-pulse">
              Please enter a valid email address
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default NewsLetter;
