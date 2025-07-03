import React, { forwardRef } from "react";
import { motion, MotionValue } from "framer-motion";
import Navbar from "../generic/Navbar";

interface LandingScreenProps {
  navbarBlur: MotionValue<string>;
  welcomeTextBlur: MotionValue<string>;
}

const LandingScreen = forwardRef<HTMLDivElement, LandingScreenProps>(
  ({ navbarBlur, welcomeTextBlur }, ref) => {
    return (
      <div ref={ref} className="relative h-[100vh] w-full mx-auto">
        {/* Sticky Navbar */}
        <motion.div
          style={{ filter: navbarBlur }}
          className="relative top-0 z-50 w-full"
        >
          <Navbar />
        </motion.div>

        {/* Background */}
        <div
          className="absolute inset-0 z-10 bg-cover bg-center"
          style={{ backgroundImage: `url("/costaricavilla.jpg")` }}
          aria-hidden="true"
        />
        {/* dim layer */}
        <div
          className="absolute inset-0 z-10 bg-black opacity-45"
          aria-hidden="true"
        />

        {/* Content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center">
          <motion.div
            style={{ filter: welcomeTextBlur }}
            className="flex flex-col gap-3 items-center justify-center text-center sticky top-1/5 md:top-1/2 transform -translate-y-1/5 md:-translate-y-1/2"
          >
            <motion.p
              initial={{ filter: "blur(10px)", opacity: 0, y: -35 }}
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
              className="relative text-xl text-[#FFF5EE]"
            >
              WELCOME TO
            </motion.p>
            <motion.p
              initial={{ filter: "blur(10px)", opacity: 0 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
              className="relative text-6xl md:text-7xl tracking-normal leading-snug md:leading-relaxed text-[#FFF5EE]"
            >
              The Heart of Costa Rica
            </motion.p>

            {/* Book now button */}
            <motion.div
              initial={{ filter: "blur(10px)", opacity: 0, y: 35 }}
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
            >
              <motion.a
                className="relative overflow-hidden px-6 py-3 border-1 border-[#FFF5EE] text-[#FFF5EE] font-bold bg-transparent hover:cursor-pointer rounded-full"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #85277F 50%, transparent 50%)",
                  backgroundSize: "200% 100%",
                  backgroundPosition: "0% 0%",
                }}
                whileHover={{
                  backgroundPosition: "100% 0%",
                  color: "#FFF5EE",
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
              >
                Book Now
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }
);

LandingScreen.displayName = "LandingScreen";

export default LandingScreen;
