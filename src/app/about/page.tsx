"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/generic/Navbar";
import Image from "next/image";
import Link from "next/link";
import team from "../data/team";

const primaryColor = "#85277F";

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden items-center bg-[#F9F6F9]">
      {/* Hero Section */}
      <div className="relative h-[100vh] w-full">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("/costaricacoast.jpg")` }}
          aria-hidden="true"
        />

        {/* Dark overlay for text contrast */}
        <div
          className="absolute inset-0 bg-black opacity-50"
          aria-hidden="true"
        />

        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(45deg, rgba(133, 39, 127, 0.05), rgba(255, 255, 255, 0.02), rgba(133, 39, 127, 0.05))"
          }}
          animate={{
            background: [
              "linear-gradient(45deg, rgba(133, 39, 127, 0.05), rgba(255, 255, 255, 0.02), rgba(133, 39, 127, 0.05))",
              "linear-gradient(45deg, rgba(133, 39, 127, 0.02), rgba(255, 255, 255, 0.05), rgba(133, 39, 127, 0.02))",
              "linear-gradient(45deg, rgba(133, 39, 127, 0.05), rgba(255, 255, 255, 0.02), rgba(133, 39, 127, 0.05))",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[
            { left: "10%", top: "20%", delay: 0 },
            { left: "80%", top: "30%", delay: 0.5 },
            { left: "20%", top: "70%", delay: 1 },
            { left: "70%", top: "80%", delay: 1.5 },
            { left: "50%", top: "40%", delay: 2 },
            { left: "30%", top: "60%", delay: 2.5 },
          ].map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: particle.left,
                top: particle.top,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
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

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F9F6F9] to-transparent" />

        {/* Navbar */}
        <div className="relative z-10">
          <Navbar />
        </div>

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/3 text-center px-4 max-w-4xl w-full"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Learn More
            <span className="block bg-gradient-to-r from-[#E5D9E4] to-[#C4A3C1] bg-clip-text text-transparent">
              About Us
            </span>
          </motion.h1>
          <motion.p 
            className="mt-6 text-lg sm:text-xl md:text-2xl text-white/90 drop-shadow-lg max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Our mission is to connect you with carefully curated homes and
            retreats nestled in Costa Rica's most breathtaking landscapes.
          </motion.p>
        </motion.div>
      </div>

      {/* Content Section */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        className="relative w-full bg-gradient-to-br from-gray-50 to-white py-20"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* Our Story Card */}
          <motion.div
            className="mb-16 -mt-[40vh]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                    <span className="bg-gradient-to-r from-[#85277F] to-[#9E3A95] bg-clip-text text-transparent">
                      Our Story
                    </span>
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Founded in 2010 by a team of passionate real estate
                    professionals and travel enthusiasts, Villa Escapes began with
                    a vision to redefine luxury villa rentals in Costa Rica. Over
                    the years, we have grown from a small boutique agency to a
                    leading provider of high-end properties, known for our
                    commitment to quality, integrity, and client satisfaction.
                  </p>
                </div>
                <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/costaricacoast.jpg"
                    width={600}
                    height={400}
                    alt="Costa Rica Coast"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Guiding Principles */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  <span className="bg-gradient-to-r from-[#85277F] to-[#9E3A95] bg-clip-text text-transparent">
                    Our Guiding Principles
                  </span>
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  At Villa Escapes, we are guided by a set of core values that
                  shape our approach to business and client interactions.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300"
                >
                  <div
                    className="mx-auto text-white rounded-full h-16 w-16 flex items-center justify-center mb-6 shadow-lg"
                    style={{ background: "linear-gradient(135deg, #85277F, #9E3A95)" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8"
                    >
                      <path d="M12 2L2 7v10l10 5l10-5V7L12 2zm0 13l-6-3.27V8.73L12 12l6-3.27v3.27L12 15z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Excellence
                  </h3>
                  <p className="text-gray-600">
                    We strive for excellence in every aspect of our service,
                    from property selection to customer support.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300"
                >
                  <div
                    className="mx-auto text-white rounded-full h-16 w-16 flex items-center justify-center mb-6 shadow-lg"
                    style={{ background: "linear-gradient(135deg, #85277F, #9E3A95)" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Client-Centric
                  </h3>
                  <p className="text-gray-600">
                    Our client-centric philosophy ensures that we prioritize
                    your needs and preferences, tailoring our services to meet
                    your unique requirements.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="text-center p-8 bg-gray-50 rounded-2xl hover:shadow-lg transition-all duration-300"
                >
                  <div
                    className="mx-auto text-white rounded-full h-16 w-16 flex items-center justify-center mb-6 shadow-lg"
                    style={{ background: "linear-gradient(135deg, #85277F, #9E3A95)" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8"
                    >
                      <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 0h-4V4h4v2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Integrity
                  </h3>
                  <p className="text-gray-600">
                    We operate with the highest level of integrity, ensuring
                    transparency, honesty, and ethical practices in all our
                    dealings.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  <span className="bg-gradient-to-r from-[#85277F] to-[#9E3A95] bg-clip-text text-transparent">
                    Meet the Team
                  </span>
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Our dedicated team is passionate about making your Costa Rican
                  dream a reality.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                {team.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-lg mb-4 hover:scale-105 transition-transform duration-300">
                      <Image
                        src={member.imageUrl}
                        width={192}
                        height={192}
                        alt={member.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {member.name}
                    </h3>
                    <p
                      className="font-semibold"
                      style={{ color: primaryColor }}
                    >
                      {member.role}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 max-w-2xl mx-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Let us help you find your perfect piece of paradise in Costa Rica.
              </p>
              <motion.button
                className="group/btn relative inline-flex items-center justify-center px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl overflow-hidden"
                style={{ background: "linear-gradient(135deg, #85277F, #9E3A95)" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(135deg, #9E3A95, #85277F)" }}
                />
                <span className="relative flex items-center gap-2">
                  Get in Touch
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
