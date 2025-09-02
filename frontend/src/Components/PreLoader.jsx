import React from "react";
import Lottie from "lottie-react";
import Heartrate from "../assets/preloader.json";

const PreLoader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <Lottie
        animationData={Heartrate}
        loop
        autoplay
        className="w-[388px] h-[288px]" // around 288px, looks better than w-170
      />
      <p className="mt-6 text-lg font-medium text-gray-700 tracking-wide">
        Preparing your experience...
      </p>
    </div>
  );
};

export default PreLoader;
