"use client";

import React, { useState } from "react";
import Navbar from "@/app/custom-components/generic/Navbar";
import { motion, useScroll, useTransform } from "framer-motion";
import PropertyCard from "@/app/custom-components/generic/PropertyCard";
import { useRentalData } from "@/hooks/useRentalData";
import Link from "next/link";
import Image from "next/image";
import CTA from "@/app/custom-components/generic/CTA";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const RentalsPage = () => {
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
  });

  const blurValue = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["blur(0px)", "blur(8px)"]
  );

  const yValue = useTransform(scrollYProgress, [0, 0.1], [0, 75]);

  const { rentals, loading, error } = useRentalData();

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<string>("all");

  // Filter properties based on search and filter criteria
  const filteredVillaProperties =
    rentals?.filter((property) => {
      // Only show villas in the main grid
      if (property.category !== "Villa") return false;

      const matchesSearch =
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesPrice = (() => {
        if (priceRange === "all") return true;
        const price = property.pricePerNight;
        switch (priceRange) {
          case "under-200":
            return price < 200;
          case "200-500":
            return price >= 200 && price < 500;
          case "500-1000":
            return price >= 500 && price < 1000;
          case "over-1000":
            return price >= 1000;
          default:
            return true;
        }
      })();

      return matchesSearch && matchesPrice;
    }) || [];

  // Get all properties for the main grid - only villas
  const villaProperties = filteredVillaProperties;

  // Get apartment and casita properties for category cards
  const apartmentProperty = rentals?.find(
    (property) => property.category === "Apartment"
  );
  const casitaProperty = rentals?.find(
    (property) => property.category === "Casita"
  );

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
            backgroundImage: `url("/rentalsbg2.png")`,
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
              Exclusive Retreats
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
            Explore Stunning
            <span className="block bg-gradient-to-r from-[#E5D9E4] to-[#C4A3C1] bg-clip-text text-transparent">
              Rentals
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
          {/* Quick Preview - Featured Rentals */}
          <motion.div
            className="-mt-[50vh]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-gradient-to-b from-white to-[#F9F6F9] rounded-t-3xl p-8 lg:p-10">
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
                  {/* Villas Category Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.75,
                      delay: 0.2,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <button
                      onClick={() => {
                        const element =
                          document.getElementById("all-properties");
                        if (element) {
                          const yOffset = -100;
                          const y =
                            element.getBoundingClientRect().top +
                            window.pageYOffset +
                            yOffset;
                          window.scrollTo({ top: y, behavior: "smooth" });
                        }
                      }}
                      className="group relative overflow-hidden rounded-2xl shadow-lg bg-white h-full flex flex-col w-full text-left"
                    >
                      {/* Image with overlay */}
                      <div className="relative aspect-[8/4] overflow-hidden flex-none">
                        <Image
                          src="/luxuryvillawithpool.png"
                          alt="Villas"
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                        {/* Category badge */}
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm text-xs">
                          <span className="font-medium text-[#85277F]">
                            Villas
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-grow flex flex-col">
                        <div className="mb-4">
                          <h4 className="font-serif text-2xl font-semibold text-gray-900 mb-2 line-clamp-1">
                            Exclusive Villas
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
                            Costa Rica
                          </p>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                          Discover our collection of luxury villas offering the
                          ultimate in privacy and comfort.
                        </p>

                        <div className="flex justify-center items-center pt-4 border-t border-gray-100 mt-auto">
                          <motion.div
                            className="w-10 h-10 rounded-full bg-gradient-to-r from-[#85277F] to-[#9E3A95] flex items-center justify-center text-white shadow-lg"
                            whileHover={{
                              scale: 1.05,
                              cursor: "pointer",
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
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                              />
                            </svg>
                          </motion.div>
                        </div>
                      </div>
                    </button>
                  </motion.div>

                  {/* Apartments Category Card */}
                  {apartmentProperty ? (
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.75,
                        delay: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={`/rentals/${apartmentProperty._id}`}
                        className="group relative overflow-hidden rounded-2xl shadow-lg bg-white h-full flex flex-col w-full"
                      >
                        {/* Image with overlay */}
                        <div className="relative aspect-[8/4] overflow-hidden flex-none">
                          <Image
                            src={apartmentProperty.mainImage}
                            alt={apartmentProperty.name}
                            fill
                            className="object-cover transition-all duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                          {/* Category badge */}
                          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm text-xs">
                            <span className="font-medium text-[#85277F]">
                              Apartments
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-grow flex flex-col">
                          <div className="mb-4">
                            <h4 className="font-serif text-2xl font-semibold text-gray-900 mb-2 line-clamp-1">
                              {apartmentProperty.name}
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
                              {apartmentProperty.location}
                            </p>
                          </div>

                          <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                            {apartmentProperty.description}
                          </p>

                          <div className="flex justify-center items-center pt-4 border-t border-gray-100 mt-auto">
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
                      </Link>
                    </motion.div>
                  ) : null}

                  {/* Casitas Category Card */}
                  {casitaProperty ? (
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.75,
                        delay: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={`/rentals/${casitaProperty._id}`}
                        className="group relative overflow-hidden rounded-2xl shadow-lg bg-white h-full flex flex-col w-full"
                      >
                        {/* Image with overlay */}
                        <div className="relative aspect-[8/4] overflow-hidden flex-none">
                          <Image
                            src={casitaProperty.mainImage}
                            alt={casitaProperty.name}
                            fill
                            className="object-cover transition-all duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                          {/* Category badge */}
                          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm text-xs">
                            <span className="font-medium text-[#85277F]">
                              Casitas
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-grow flex flex-col">
                          <div className="mb-4">
                            <h4 className="font-serif text-2xl font-semibold text-gray-900 mb-2 line-clamp-1">
                              {casitaProperty.name}
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
                              {casitaProperty.location}
                            </p>
                          </div>

                          <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                            {casitaProperty.description}
                          </p>

                          <div className="flex justify-center items-center pt-4 border-t border-gray-100 mt-auto">
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
                      </Link>
                    </motion.div>
                  ) : null}
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
                  Explore our complete collection of{" "}
                  {villaProperties?.length || 0}+ luxury villa rentals across
                  Costa Rica&apos;s most desirable locations.
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

          {/* Search and Filter Bar */}
          <motion.div
            className="max-w-6xl mx-auto px-4 md:px-8 pt-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Search Input */}
                <div className="relative flex-1 w-full lg:w-auto">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="h-4 w-4 text-gray-400"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Search rentals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#85277F]/20 focus:border-[#85277F] transition-all duration-300 bg-gray-50 focus:bg-white"
                  />
                </div>

                {/* Price Range Filter */}
                <div className="relative w-full lg:w-auto">
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full lg:w-48 pl-4 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#85277F]/20 focus:border-[#85277F] transition-all duration-300 bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                  >
                    <option value="all">All Prices</option>
                    <option value="under-200">Under $200/night</option>
                    <option value="200-500">$200 - $500/night</option>
                    <option value="500-1000">$500 - $1000/night</option>
                    <option value="over-1000">Over $1000/night</option>
                  </select>
                </div>

                {/* Results Count */}
                <div className="text-sm text-gray-600 font-medium whitespace-nowrap">
                  {villaProperties.length}{" "}
                  {villaProperties.length === 1 ? "rental" : "rentals"} found
                </div>
              </div>
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
          ) : villaProperties && villaProperties.length > 0 ? (
            <div
              className="grid grid-cols-1 gap-12 my-10 px-8"
              id="all-properties"
            >
              {villaProperties.map((property, index) => (
                <motion.div
                  key={property._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                    delay: Math.min(index * 0.05, 0.2),
                  }}
                >
                  <PropertyCard
                    {...property}
                    type="Rentals"
                    price={`$${property.pricePerNight}/night`}
                    imageUrl={property.mainImage}
                    slug={property._id}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">
                {searchTerm || priceRange !== "all"
                  ? "No rentals match your search criteria. Try adjusting your filters."
                  : "No properties available at the moment."}
              </p>
            </div>
          )}

          {/* Call to Action */}
          <div className="px-8">
            <CTA
              subtitle="Luxury Awaits"
              title="Ready to Book Your Dream Rental?"
              description="Our team of rental experts is here to help you find the perfect
                  accommodation that matches your vacation style and preferences."
              buttonText="Get in Touch"
              href="/inquiries"
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default RentalsPage;
