import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const AboutHP = () => {
  return (
    <section className="md:py-10 mb-20 px-4 md:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold tracking-wide text-[#323130]"
        >
          About OFYS
        </motion.h2>

        <motion.p
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-gray-600 text-base md:text-md leading-relaxed max-w-3xl"
        >
          OFYS is a leading real estate and rental company in Costa Rica,
          specializing in luxury properties. We are committed to providing
          exceptional service and helping our clients find their perfect piece
          of paradise. Our deep local knowledge and passion for this beautiful
          country drive us to deliver unparalleled experiences.
        </motion.p>

        <motion.a
          href="/about"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-row gap-2 items-center justify-center md:justify-start group cursor-pointer"
        >
          <p
            className="text-md font-semibold group-hover:underline transition"
            style={{ color: "#85277F" }}
          >
            Learn More
          </p>
          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-lg transition-transform group-hover:translate-x-1"
            style={{ color: "#85277F" }}
          />
        </motion.a>
      </div>
    </section>
  );
};

export default AboutHP;
