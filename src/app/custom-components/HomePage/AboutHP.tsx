import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const AboutHP = () => {
  return (
    <section className="relative py-20 mb-5 px-4 md:px-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-[#85277F]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-tl from-[#85277F]/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
        <div className="flex flex-col items-center mb-4">
          <p className="text-lg tracking-[0.3em] uppercase font-light mb-2 text-[#85277F]">
            Get to know us
          </p>
          <motion.div
            className="w-16 h-px bg-[#85277F]/50"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.3,
            }}
            viewport={{ once: true }}
          />
        </div>
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold tracking-wide text-gray-800"
        >
          About
          <span className="block bg-gradient-to-r from-[#85277F] to-[#9E3A95] bg-clip-text text-transparent">
            OFYS
          </span>
        </motion.h2>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-gray-600 text-md lg:text-lg leading-relaxed max-w-3xl"
        >
          OFYS is a leading real estate and rental company in Costa Rica,
          specializing in luxury properties. We are committed to providing
          exceptional service and helping our clients find their perfect piece
          of paradise. Our deep local knowledge and passion for this beautiful
          country drive us to deliver unparalleled experiences.
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <a
            href="/about"
            className="group relative inline-flex items-center justify-center px-6 py-3 rounded-xl text-white font-semibold cursor-pointer shadow-lg overflow-hidden"
            style={{
              background: "linear-gradient(to right, #85277F, #9E3A95)",
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{
                background: "linear-gradient(to right, #9E3A95, #85277F)",
              }}
            />
            <span className="relative flex items-center gap-2">
              Learn More
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-lg transition-transform duration-200 group-hover:translate-x-1"
              />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHP;
