"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ImageBanner = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const blur = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]
  );

  return (
    <div
      ref={ref}
      className="relative h-[300px] md:h-[400px] overflow-hidden my-10 md:my-15"
    >
      {/* Parallax background image */}
      <motion.div
        style={{ y }}
        className="absolute top-0 left-0 w-full h-[700px] bg-[url('/costaricabanner.avif')] bg-cover bg-center pointer-events-none will-change-transform"
        aria-hidden="true"
      />

      {/* Dimming overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10 pointer-events-none" />

      {/* Content */}
      <motion.div
        style={{ filter: blur }}
        className="relative z-20 h-full w-full flex items-center justify-center px-6"
      >
        <div className="text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5 text-white drop-shadow-lg">
            Make An Appointment Now
          </h2>
          <p className="text-md md:text-lg mb-8 text-white/90">
            Call{" "}
            <a href="tel:+18004784251" className="font-semibold">
              +1 (416) 111-1111
            </a>
          </p>
          <motion.button
            className="relative overflow-hidden px-4 py-2 border-1 border-[#FFF5EE] text-[#FFF5EE] font-bold bg-transparent hover:cursor-pointer rounded-lg"
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
            Contact Us
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ImageBanner;
