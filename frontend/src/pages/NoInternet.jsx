import React from "react";
import Lottie from "lottie-react";
import { FiRefreshCw } from "react-icons/fi";
import Heartrate from "../assets/No Internet Connection.json";

const NoInternet = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-red-100 text-center px-4">
      {/* Animation */}
      <div className="w-64 h-64 flex items-center justify-center mb-6">
        <Lottie
          animationData={Heartrate}
          loop
          autoplay
          className="filter drop-shadow-lg"
        />
      </div>

      {/* Text */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        No Internet Connection
      </h1>
      <p className="text-gray-600 max-w-md mb-6">
        It seems you are offline. Please check your Wi-Fi or mobile data
        connection and try again.
      </p>

      {/* Reload Button */}
      <button
        onClick={handleReload}
        className="flex tracking-tight font-medium items-center gap-2 px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all duration-200"
      >
        <FiRefreshCw size={18} />
        Reload Page
      </button>
    </div>
  );
};

export default NoInternet;





