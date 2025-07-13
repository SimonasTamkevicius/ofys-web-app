import React, { forwardRef } from "react";
import { motion, MotionValue } from "framer-motion";

interface LandingScreenProps {
  welcomeTextBlur: MotionValue<string>;
}

const LandingScreen = forwardRef<HTMLDivElement, LandingScreenProps>(
  ({ welcomeTextBlur }, ref) => {
    return (
      <div ref={ref} className="relative h-[100vh] w-full mx-auto">
        {/* Background */}
        <div
          className="absolute inset-0 z-10 bg-cover bg-center"
          style={{ backgroundImage: `url("/costaricavilla.jpg")` }}
          aria-hidden="true"
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0 z-10 bg-black opacity-50"
          aria-hidden="true"
        />

        {/* Static gradient overlay */}
        <div
          className="absolute inset-0 z-15"
          style={{
            background:
              "linear-gradient(45deg, rgba(133, 39, 127, 0.05), rgba(255, 255, 255, 0.02), rgba(133, 39, 127, 0.05))",
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center">
          <motion.div
            style={{ filter: welcomeTextBlur }}
            className="flex flex-col gap-2 items-center justify-center text-center max-w-4xl px-4"
          >
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
              className="relative text-xl md:text-2xl text-[#FFF5EE] font-semibold tracking-wider"
            >
              WELCOME TO
            </motion.p>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
              className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-normal leading-snug font-bold text-white drop-shadow-2xl"
            >
              The Heart of
              <span className="block bg-gradient-to-r from-[#E5D9E4] to-[#C4A3C1] bg-clip-text text-transparent">
                Costa Rica
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.9 }}
              className="relative text-lg md:text-xl text-white/90 drop-shadow-lg max-w-2xl leading-relaxed"
            >
              Discover luxury properties and unforgettable experiences in one of
              the world&apos;s most beautiful destinations.
            </motion.p>

            {/* Book now button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 1.1 }}
              className="mt-4 flex justify-center"
            >
              <a
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full text-white font-semibold transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl overflow-hidden border border-white/20 hover:scale-105"
                style={{
                  background: "linear-gradient(to right, #85277F, #9E3A95)",
                }}
              >
                <span className="relative flex items-center gap-2">
                  Book Now
                  <svg
                    className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }
);

LandingScreen.displayName = "LandingScreen";

export default LandingScreen;
