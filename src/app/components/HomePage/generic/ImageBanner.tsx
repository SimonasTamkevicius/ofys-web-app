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
      className="relative h-[400px] md:h-[500px] overflow-hidden"
    >
      {/* Parallax background image */}
      <motion.div
        style={{ y }}
        className="absolute top-0 left-0 w-full h-[700px] bg-[url('/costaricabanner.avif')] bg-cover bg-center pointer-events-none will-change-transform"
        aria-hidden="true"
      />

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(45deg, rgba(133, 39, 127, 0.3), rgba(0, 0, 0, 0.4), rgba(133, 39, 127, 0.3))"
        }}
        animate={{
          background: [
            "linear-gradient(45deg, rgba(133, 39, 127, 0.3), rgba(0, 0, 0, 0.4), rgba(133, 39, 127, 0.3))",
            "linear-gradient(45deg, rgba(133, 39, 127, 0.2), rgba(0, 0, 0, 0.5), rgba(133, 39, 127, 0.2))",
            "linear-gradient(45deg, rgba(133, 39, 127, 0.3), rgba(0, 0, 0, 0.4), rgba(133, 39, 127, 0.3))",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden z-15 pointer-events-none">
        {[
          { left: "15%", top: "25%", delay: 0 },
          { left: "85%", top: "35%", delay: 0.5 },
          { left: "25%", top: "75%", delay: 1 },
          { left: "75%", top: "85%", delay: 1.5 },
        ].map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/40 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0.4, 0.9, 0.4],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ filter: blur }}
        className="relative z-20 h-full w-full flex items-center justify-center px-6"
      >
        <div className="text-center max-w-4xl">
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white drop-shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Make An
            <span className="block bg-gradient-to-r from-[#E5D9E4] to-[#C4A3C1] bg-clip-text text-transparent">
              Appointment Now
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl mb-10 text-white/90 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Call{" "}
            <a href="tel:+18004784251" className="font-semibold hover:text-white transition-colors">
              +1 (416) 111-1111
            </a>
            {" "}or contact us online to start your journey
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.a
              href="/inquiries"
              className="group/btn relative inline-flex items-center justify-center px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl overflow-hidden"
              style={{ background: "linear-gradient(135deg, #85277F, #9E3A95)" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(135deg, #9E3A95, #85277F)" }}
              />
              <span className="relative flex items-center gap-2 text-base">
                Contact Us
                <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ImageBanner;
