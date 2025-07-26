import React, { forwardRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

interface LandingScreenProps {
  welcomeTextBlur: MotionValue<string>;
}

const LandingScreen = forwardRef<HTMLDivElement, LandingScreenProps>(
  ({ welcomeTextBlur }, ref) => {
    // Parallax effect
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 275], [0, 85]);
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
            style={{ filter: welcomeTextBlur, y }}
            className="flex flex-col gap-2 items-center justify-center text-center max-w-4xl px-4"
          >
            <motion.p
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.1, ease: "easeInOut", delay: 0.4 }}
              className="relative text-xl md:text-2xl text-[#FFF5EE] tracking-wider mb-4"
            >
              WELCOME TO
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 36, scale: 0.96, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.7, ease: [0.4, 0, 0.2, 1], delay: 0.7 }}
              className="relative text-5xl sm:text-5xl md:text-6xl lg:text-7xl leading-16 md:leading-22 tracking-wide text-white drop-shadow-2xl"
            >
              THE HEART OF
              <span className="block bg-gradient-to-r from-[#E5D9E4] to-[#C4A3C1] bg-clip-text text-transparent">
                COSTA RICA
              </span>
            </motion.h1>

            {/* Book now button */}
            <motion.div
              initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                type: "spring",
                stiffness: 32,
                damping: 8,
                delay: 1.5,
              }}
              className="flex justify-center"
            >
              <a
                href=""
                className="group mt-4 justify-center relative overflow-hidden px-6 py-3 rounded-full font-semibold transition-all duration-300 bg-gradient-to-r from-[#85277F] to-[#9E3A95] border border-[#85277F] text-white"
              >
                <motion.div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#9E3A95] to-[#85277F]
              }`}
                />
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
