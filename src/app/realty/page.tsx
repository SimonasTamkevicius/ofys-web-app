"use client";

import React from "react";
import Navbar from "../components/generic/Navbar";
import { motion } from "framer-motion";
import PropertyCard from "../components/generic/PropertyCard";
import properties from "../data/properties";
import Link from "next/link";

const Page = () => {
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
            Find Your
            <span className="block bg-gradient-to-r from-[#E5D9E4] to-[#C4A3C1] bg-clip-text text-transparent">
              Dream Home
            </span>
          </motion.h1>
          <motion.p 
            className="mt-6 text-lg sm:text-xl md:text-2xl text-white/90 drop-shadow-lg max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Discover carefully selected properties across Costa Rica's most
            scenic landscapes. From beachfront villas to mountain retreats, 
            find your perfect piece of paradise.
          </motion.p>
          
        </motion.div>
      </div>

      {/* Properties Section */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        className="relative w-full bg-gradient-to-br from-gray-50 to-white py-20"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

          {/* Quick Preview - Featured Properties */}
          <motion.div
            className="mb-16 -mt-[40vh]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100">
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Featured Properties
                </h3>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Discover our handpicked selection of premium properties. Each one offers the perfect blend of 
                  luxury, comfort, and Costa Rica's natural beauty.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {properties.slice(0, 3).map((property, index) => (
                  <Link key={property.slug} href={`/realty/${property.slug}`}>
                    <motion.div
                      className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="aspect-video bg-gray-200 rounded-xl mb-4 overflow-hidden">
                        <img 
                          src={property.imageUrl} 
                          alt={property.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2">{property.name}</h4>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{property.description}</p>
                      <p className="text-lg font-bold" style={{ color: "#85277F" }}>{property.price}</p>
                    </motion.div>
                  </Link>
                ))}
              </div>
              
              <div className="text-center">
                <p className="text-gray-600 mb-6 text-lg">
                  These are just a preview of what we offer. Scroll down to explore our complete collection.
                </p>
                <motion.div
                  className="inline-flex flex-col items-center gap-2 text-[#85277F]"
                  whileHover={{ y: 2 }}
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-sm font-medium">View All Properties</span>
                  <motion.div
                    className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 gap-12 mb-20">
            {properties.map((property, index) => (
              <motion.div
                key={property.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  ease: "easeOut",
                  delay: index * 0.2 
                }}
              >
                <PropertyCard {...property} type="Realty" />
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center py-12"
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
                Ready to Find Your Dream Home?
              </h3>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Our team of real estate experts is here to help you find the perfect property 
                that matches your lifestyle and investment goals.
              </p>
              <motion.button
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl overflow-hidden"
                style={{ background: "linear-gradient(to right, #85277F, #9E3A95)" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to right, #9E3A95, #85277F)" }}
                />
                <span className="relative flex items-center gap-2">
                  Get in Touch
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

export default Page;
