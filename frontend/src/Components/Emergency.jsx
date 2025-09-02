import React, { useEffect, useRef } from "react";
import { FaAmbulance, FaPhoneAlt, FaExclamationTriangle } from "react-icons/fa";

const Emergency = () => {
  const scrollContainerRef = useRef(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || window.innerWidth >= 768) return;

    // Clone content for seamless looping
    const content = scrollContainer.innerHTML;
    scrollContainer.innerHTML = content + content;

    const scrollContent = () => {
      if (!startTimeRef.current) {
        startTimeRef.current = performance.now();
      }

      const elapsed = performance.now() - startTimeRef.current;
      // Consistent speed of 50 pixels per second
      scrollPositionRef.current = -elapsed * 0.05;

      scrollContainer.style.transform = `translateX(${scrollPositionRef.current}px)`;

      // Reset position when half the content has scrolled
      if (-scrollPositionRef.current >= scrollContainer.scrollWidth / 2) {
        scrollPositionRef.current = 0;
        startTimeRef.current = performance.now();
      }

      animationRef.current = requestAnimationFrame(scrollContent);
    };

    animationRef.current = requestAnimationFrame(scrollContent);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="mt-[70px] w-full py-2 bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Mobile - Scrolling animation */}
        <div className="md:hidden w-full overflow-hidden whitespace-nowrap">
          <div
            ref={scrollContainerRef}
            className="inline-flex items-center gap-6 py-1"
          >
            <div className="inline-flex items-center gap-2">
              <FaExclamationTriangle className="text-sm" />
              <span className="font-bold uppercase tracking-wider text-xs">
                For immediate assistance, please call us
              </span>
            </div>

            <div className="inline-flex items-center gap-2">
              <FaAmbulance className="text-sm" />
              <span className="font-medium text-xs">Ambulance:</span>
              <a href="tel:102" className="font-bold hover:underline text-xs">
                102
              </a>
            </div>

            <div className="inline-flex items-center gap-2">
              <FaPhoneAlt className="text-sm" />
              <span className="font-medium text-xs">Emergency:</span>
              <a href="tel:112" className="font-bold hover:underline text-xs">
                112
              </a>
            </div>
          </div>
        </div>

        {/* Desktop - Regular layout */}
        <div className="hidden md:flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <FaExclamationTriangle className="text-base" />
            <span className="font-bold uppercase tracking-wider text-sm">
              For immediate assistance, please call us
            </span>
          </div>

          <div className="w-px h-4 bg-white/50"></div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FaAmbulance className="text-base" />
              <span className="font-medium">Ambulance:</span>
              <a href="tel:102" className="font-bold hover:underline">
                102
              </a>
            </div>

            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-base" />
              <span className="font-medium">Emergency:</span>
              <a href="tel:112" className="font-bold hover:underline">
                112
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emergency;
