"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ImageBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const blur = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]
  );

  return (
    <div
      ref={containerRef}
      className="relative h-[500px] md:h-[500px] overflow-hidden"
    >
      {/* Parallax background image */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[500px] bg-[url('/costaricabanner.avif')] bg-cover bg-center pointer-events-none will-change-transform"
        aria-hidden="true"
      />

      {/* Luxury overlay */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        style={{
          background:
            "linear-gradient(45deg, rgba(133, 39, 127, 0.15) 0%, rgba(0, 0, 0, 0.35) 100%)",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

      {/* Content */}
      <motion.div
        style={{ filter: blur }}
        className="relative z-20 h-full w-full flex items-center justify-center px-6"
      >
        <div className="text-center max-w-4xl">
          {/* Subheader with animated underline */}
          <motion.div
            className="flex flex-col items-center mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-lg md:text-xl tracking-[0.3em] uppercase font-light mb-2 text-[#E5D9E4]">
              Luxury Experience
            </p>
            <motion.div
              className="w-16 h-px bg-[#E5D9E4]/50 mb-6"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.3,
              }}
              viewport={{ once: true }}
            />
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium mb-6 text-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <span className="block text-white drop-shadow-lg">Make An</span>
            <span className="block mt-4 bg-gradient-to-r from-[#E5D9E4] to-[#C4A3C1] bg-clip-text text-transparent">
              Appointment Now
            </span>
          </motion.h2>

          <motion.p
            className="text-xl mb-10 text-white/90 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            Call{" "}
            <a
              href="tel:+18004784251"
              className="font-medium hover:text-[#E5D9E4] transition-colors duration-300"
            >
              +1 (416) 111-1111
            </a>{" "}
            or contact us online to begin your journey
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.a
              href="/inquiries"
              className="group/btn relative inline-flex items-center justify-center px-6 py-3 rounded-xl text-white font-semibold cursor-pointer shadow-lg overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #85277F, #9E3A95)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(135deg, #9E3A95, #85277F)",
                }}
              />
              <span className="relative flex items-center gap-2 text-base">
                Contact Us
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
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
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ImageBanner;
