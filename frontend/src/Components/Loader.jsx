import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center pt-22 h-[450px] ">
      <div className="flex space-x-2">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className="w-2 h-2 bg-blue-700 rounded-full"
            style={{
              animation: `wave 1.5s infinite ${i * 0.2}s ease-in-out`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes wave {
          0%, 100% {
            transform: translateX(0);
            opacity: 1;
          }
          50% {
            transform: translateX(20px);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
