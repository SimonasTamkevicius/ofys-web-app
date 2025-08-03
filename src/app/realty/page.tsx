"use client";

import React, { useRef } from "react";
import Navbar from "../components/generic/Navbar";
import { motion, useScroll, useTransform } from "framer-motion";
import PropertyCard from "../components/generic/PropertyCard";
import properties from "../data/properties";
import Link from "next/link";
import Image from "next/image";
import CTA from "../components/generic/CTA";

const Page = () => {
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
  });

  const blurValue = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["blur(0px)", "blur(8px)"]
  );

  const yValue = useTransform(scrollYProgress, [0, 0.1], [0, 75]);
  return (
    <div className="flex flex-col min-h-screen overflow-hidden items-center bg-[#F9F6F9]">
      {/* Hero Section */}
      <div className="relative h-[100vh] w-full">
        {/* Background image */}
        <motion.div
          initial={{ scale: 1.3 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url("/costaricacoast.jpg")`,
            scale: useTransform(scrollYProgress, [0, 0.3], [1.1, 1.3], {
              clamp: true,
            }),
          }}
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
            background:
              "linear-gradient(45deg, rgba(133, 39, 127, 0.05), rgba(255, 255, 255, 0.02), rgba(133, 39, 127, 0.05))",
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

        {/* Navbar */}
        <div className="relative z-10">
          <Navbar />
        </div>

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: -80, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          style={{
            filter: blurValue,
            y: yValue,
          }}
          className="absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/3 text-center px-4 max-w-4xl w-full"
        >
          <motion.div
            className="flex flex-col items-center mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-lg tracking-[0.3em] uppercase font-light mb-2 text-[#E5D9E4]">
              Luxury Residences
            </p>
            <motion.div
              className="w-16 h-px bg-[#E5D9E4]/50"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 1,
              }}
              viewport={{ once: true }}
            />
          </motion.div>
          <motion.h1
            className="text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl mb-6 leading-18"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Find Your
            <span className="block bg-gradient-to-r from-[#E5D9E4] to-[#C4A3C1] bg-clip-text text-transparent">
              Dream Home
            </span>
          </motion.h1>
        </motion.div>
      </div>

      {/* Properties Section */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        className="relative w-full bg-gradient-to-br from-gray-50 to-white py-20"
      >
        <div>
          {/* Quick Preview - Featured Properties */}
          <motion.div
            className="-mt-[50vh]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="bg-white rounded-3xl p-8 lg:p-16">
              <div className="text-center mb-8">
                <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                  Featured Properties
                </h3>
                <p className="text-gray-600 text-md max-w-2xl mx-auto">
                  Discover our handpicked selection of premium properties. Each
                  one offers the perfect blend of luxury, comfort, and Costa
                  Rica&apos;s natural beauty.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mx-auto max-w-7xl">
                {properties.slice(0, 3).map((property, index) => (
                  <Link key={property.slug} href={`/realty/${property.slug}`}>
                    <motion.div
                      className="bg-gray-50 rounded-2xl p-6 cursor-pointer group shadow-lg flex flex-col justify-between min-h-[420px]"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div>
                        <div className="aspect-video bg-gray-200 rounded-xl mb-4 overflow-hidden">
                          <Image
                            src={property.imageUrl}
                            alt={property.name}
                            width={400}
                            height={250}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        <h4 className="font-semibold text-gray-800 mb-2 text-2xl">
                          {property.name}
                        </h4>

                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {property.description}
                        </p>
                      </div>

                      <p
                        className="text-lg font-bold"
                        style={{ color: "#85277F" }}
                      >
                        {property.price}
                      </p>
                    </motion.div>
                  </Link>
                ))}
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-6 text-md">
                  These are just a preview of what we offer. Scroll down to
                  explore our complete collection.
                </p>
                <motion.div
                  className="inline-flex flex-col items-center gap-2 text-[#85277F]"
                  whileHover={{ y: 2 }}
                  animate={{ y: [0, 4, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span className="text-sm font-medium">
                    View All Properties
                  </span>
                  <motion.div
                    className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 gap-12 mb-20 px-8">
            {properties.map((property, index) => (
              <motion.div
                key={property.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: index * 0.2,
                }}
              >
                <PropertyCard {...property} type="Realty" />
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <CTA
            subtitle="Experience Luxury"
            title="Ready to Find Your Dream Home?"
            description="Our team of real estate experts is here to help you find the
                perfect property that matches your lifestyle and investment
                goals."
            buttonText="Get in Touch"
            href="/inquiries"
          />
        </div>
      </motion.section>
    </div>
  );
};

export default Page;
