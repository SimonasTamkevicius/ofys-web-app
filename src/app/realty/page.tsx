"use client";

import React from "react";
import Navbar from "../custom-components/generic/Navbar";
import { motion, useScroll, useTransform } from "framer-motion";
import PropertyCard from "../custom-components/generic/PropertyCard";
import { useRealtyData } from "../../hooks/useRealtyData";
import Link from "next/link";
import Image from "next/image";
import CTA from "../custom-components/generic/CTA";

const Page = () => {
  const { properties, loading, error } = useRealtyData();

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
  });

  const blurValue = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["blur(0px)", "blur(8px)"]
  );

  const yValue = useTransform(scrollYProgress, [0, 0.1], [0, 75]);

  // Get featured properties (up to 3)
  const featuredProperties = properties
    ? properties.filter((property) => property.featured).slice(0, 3)
    : [];

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
            backgroundImage: `url("/realtynew.png")`,
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
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-lg tracking-[0.3em] uppercase font-light mb-2 text-[#E5D9E4]">
              Luxury Residences
            </p>
            <motion.div
              className="w-16 h-px bg-[#E5D9E4]/50"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 1,
              }}
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
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-gradient-to-b from-white to-[#F9F6F9] rounded-t-3xl p-8 lg:p-10">
              <motion.div
                className="text-center mb-16 relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Decorative Elements */}
                <motion.div
                  className="flex items-center justify-center mb-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#85277F] to-transparent"></div>
                  <div className="mx-4 w-3 h-3 bg-[#85277F] rounded-full"></div>
                  <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#85277F] to-transparent"></div>
                </motion.div>

                {/* Main Title */}
                <motion.h2
                  className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Premium Investment
                  <span className="block bg-gradient-to-r from-[#85277F] to-[#9E3A95] bg-clip-text text-transparent">
                    Opportunities
                  </span>
                </motion.h2>

                {/* Description */}
                <motion.p
                  className="text-gray-600 max-w-4xl mx-auto text-lg leading-relaxed font-light"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Our Realty division offers a portfolio of luxury villas and
                  prime land holdings along Guanacaste&apos;s Gold Coast,
                  available exclusively through O.F.Y.S. Unlike traditional
                  brokerages, we focus solely on properties we own or directly
                  represent, ensuring quality, transparency, and value. Each
                  home and parcel is chosen for its location, design potential,
                  and long-term investment strength. Whether you&apos;re seeking
                  a move-in-ready villa or a development site to bring your
                  vision to life, purchasing through O.F.Y.S. means you deal
                  directly with the source—streamlining the process and
                  guaranteeing authenticity at every step.
                </motion.p>
              </motion.div>

              {/* Featured Properties Title */}
              <motion.div
                className="text-center mb-12 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <motion.h3
                  className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Featured Properties
                </motion.h3>
                <motion.div
                  className="w-12 h-px bg-gradient-to-r from-transparent via-[#85277F] to-transparent mx-auto"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                />
              </motion.div>

              {/* Property Cards */}
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#85277F]"></div>
                </div>
              ) : error ? (
                <div className="text-center py-20">
                  <p className="text-gray-600 text-lg">
                    Error loading properties. Please try again.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 mx-auto max-w-7xl">
                  {featuredProperties.length > 0 ? (
                    featuredProperties.map((property, index) => (
                      <Link key={property._id} href={`/realty/${property._id}`}>
                        <motion.div
                          className="group relative overflow-hidden rounded-2xl shadow-lg bg-white h-full flex flex-col"
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.75,
                            delay: index * 0.2,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          {/* Image with overlay */}
                          <div className="relative aspect-[8/4] overflow-hidden flex-none">
                            <Image
                              src={property.mainImage}
                              alt={property.name}
                              fill
                              className="object-cover transition-all duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                            {/* Property badge */}
                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm text-xs">
                              <span className="font-medium text-[#85277F]">
                                {property.category}
                              </span>
                            </div>
                          </div>

                          {/* Property details */}
                          <div className="p-6 flex-grow flex flex-col">
                            <div className="mb-4">
                              <h4 className="font-serif text-2xl font-semibold text-gray-900 mb-2 line-clamp-1">
                                {property.name}
                              </h4>
                              <p className="text-[#85277F] text-sm font-medium flex items-center">
                                <svg
                                  className="w-4 h-4 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                                {property.location || "Costa Rica"}
                              </p>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                              {property.description}
                            </p>

                            {/* Price and CTA */}
                            <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
                              <div>
                                <p className="text-xs text-gray-500">
                                  Starting from
                                </p>
                                <p className="text-lg font-bold text-[#85277F]">
                                  ${property.price?.toLocaleString()}
                                </p>
                              </div>

                              <motion.div
                                className="w-10 h-10 rounded-full bg-gradient-to-r from-[#85277F] to-[#9E3A95] flex items-center justify-center text-white shadow-lg"
                                whileHover={{
                                  scale: 1.05,
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                  />
                                </svg>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    ))
                  ) : (
                    <div className="text-center py-20">
                      <p className="text-gray-600 text-lg">
                        No featured properties available at the moment.
                      </p>
                    </div>
                  )}
                </div>
              )}
              {/* View All CTA */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.p
                  className="text-gray-600 mb-8 text-lg font-light max-w-2xl mx-auto leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  Discover the Gold Coast&apos;s most exclusive and luxurious
                  properties. From stunning villas to modern apartments, we
                  offer a diverse range of options for your dream home.
                </motion.p>

                <motion.div
                  className="flex flex-col items-center justify-center gap-2 text-[#85277F] mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.p
                    className="text-sm font-light tracking-wider"
                    animate={{
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  >
                    Explore our full collection below
                  </motion.p>

                  <motion.div
                    className="flex flex-col items-center"
                    animate={{
                      y: [0, 8, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <svg
                      className="w-5 h-5 text-[#85277F]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Properties Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#85277F]"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">
                Error loading properties. Please try again.
              </p>
            </div>
          ) : properties && properties.length > 0 ? (
            <div
              className="grid grid-cols-1 gap-12 my-10 px-8"
              id="all-properties"
            >
              {properties.map((property, index) => (
                <motion.div
                  key={property._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{
                    once: true,
                    margin: "-100px 0px -100px 0px",
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                    delay: Math.min(index * 0.1, 0.5),
                  }}
                >
                  <PropertyCard
                    {...property}
                    type="Realty"
                    price={`$${property.price?.toLocaleString()}`}
                    imageUrl={property.mainImage}
                    slug={property._id}
                    location={property.location || "Costa Rica"}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">
                No properties available at the moment.
              </p>
            </div>
          )}

          {/* Call to Action */}
          <CTA
            subtitle="Investment Opportunities"
            title="Ready to Invest in Premium Real Estate?"
            description="Our team of investment specialists is here to help you find the perfect property that matches your investment goals and portfolio strategy."
            buttonText="Get in Touch"
            href="/inquiries"
          />
        </div>
      </motion.section>
    </div>
  );
};

export default Page;
