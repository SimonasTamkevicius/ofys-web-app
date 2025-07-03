"use client";

import React from "react";
import Navbar from "../components/generic/Navbar";
import { motion } from "framer-motion";
import PropertyCard from "./generic/PropertyCard";
import properties from "../data/properties";

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-gray-50">
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
          className="absolute inset-0 bg-black opacity-40"
          aria-hidden="true"
        />

        {/* Navbar */}
        <div className="relative">
          <Navbar />
        </div>

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/3 text-center px-4"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#FFF5EE]">
            Find Your Future Home
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-[#f5f5f5] max-w-2xl mx-auto leading-relaxed">
            Discover carefully selected properties across Costa Rica&#39;s most
            scenic landscapes.
          </p>
        </motion.div>
      </div>

      {/* Sliding White Section */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        className="-mt-[40vh] relative bg-white rounded-t-3xl shadow-2xl px-6 md:px-16 py-8"
      >
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Available Properties
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-20">
          {properties.map((property) => (
            <motion.div
              key={property.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <PropertyCard {...property} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* <Footer /> */}
    </div>
  );
};

export default Page;
