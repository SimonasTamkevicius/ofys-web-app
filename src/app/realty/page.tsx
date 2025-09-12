"use client";

import React, { useState } from "react";
import Navbar from "../custom-components/generic/Navbar";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRealtyData } from "../../hooks/useRealtyData";
import Link from "next/link";
import Image from "next/image";
import CTA from "../custom-components/generic/CTA";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faCheck,
  faTimes,
  faSearch,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

const Page = () => {
  const { properties, loading, error } = useRealtyData();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "Realty",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
  });

  const blurValue = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["blur(0px)", "blur(8px)"]
  );

  const yValue = useTransform(scrollYProgress, [0, 0.1], [0, 75]);

  // Filter properties based on search and filter criteria
  const filteredProperties =
    properties?.filter((property) => {
      const matchesSearch =
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || property.category === selectedCategory;

      return matchesSearch && matchesCategory;
    }) || [];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          subject: `Realty Inquiry from ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message:
            "Thank you! Your realty inquiry has been received. Our team will contact you soon to discuss your property needs.",
        });
        setFormData({
          name: "",
          email: "",
          category: "Realty",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to send inquiry. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <div className="bg-gradient-to-b from-white to-[#F9F6F9] rounded-t-3xl p-6 md:p-8 lg:p-10">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Text Content Column */}
                  <motion.div
                    className="text-center lg:text-left lg:col-span-2 pr-0 lg:pr-8"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    {/* Main Title */}
                    <motion.h2
                      className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
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
                      className="text-gray-600 text-base lg:text-lg leading-relaxed font-light"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      Our Realty division offers a portfolio of luxury villas
                      and prime land holdings along Guanacaste&apos;s Gold
                      Coast, available exclusively through O.F.Y.S. Unlike
                      traditional brokerages, we focus solely on properties we
                      own or directly represent, ensuring quality, transparency,
                      and value. Each home and parcel is chosen for its
                      location, design potential, and long-term investment
                      strength. Whether you&apos;re seeking a move-in-ready
                      villa or a development site to bring your vision to life,
                      purchasing through O.F.Y.S. means you deal directly with
                      the source—streamlining the process and guaranteeing
                      authenticity at every step.
                    </motion.p>
                  </motion.div>
                  {/* Form Column */}
                  <motion.div
                    className="w-full lg:col-span-1 flex justify-center lg:justify-start"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-full max-w-md lg:max-w-none w-full">
                      <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                          <label
                            htmlFor="name"
                            className="block font-medium text-gray-700 mb-1"
                          >
                            Full Name *
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#85277F] focus:border-[#85277F] transition-all duration-300"
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block font-medium text-gray-700 mb-1"
                          >
                            Email Address *
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#85277F] focus:border-[#85277F] transition-all duration-300"
                            required
                          />
                        </div>

                        {/* Hidden category field - always Realty for this page */}
                        <input
                          type="hidden"
                          name="category"
                          value={formData.category}
                        />

                        <div>
                          <label
                            htmlFor="subject"
                            className="block font-medium text-gray-700 mb-1"
                          >
                            Subject *
                          </label>
                          <input
                            id="subject"
                            name="subject"
                            type="text"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="What's this about?"
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#85277F] focus:border-[#85277F] transition-all duration-300"
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="message"
                            className="block font-medium text-gray-700 mb-1"
                          >
                            Message *
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Tell us about your dream property, timeline, budget, or any questions you have..."
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#85277F] focus:border-[#85277F] transition-all duration-300 resize-none"
                            required
                          />
                        </div>

                        {/* Success/Error Message */}
                        {submitStatus.type && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`p-4 rounded-lg border shadow-sm ${
                              submitStatus.type === "success"
                                ? "bg-green-50 border-green-200 text-green-800"
                                : "bg-red-50 border-red-200 text-red-800"
                            }`}
                          >
                            <div className="flex items-start">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 ${
                                  submitStatus.type === "success"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              >
                                <FontAwesomeIcon
                                  icon={
                                    submitStatus.type === "success"
                                      ? faCheck
                                      : faTimes
                                  }
                                  className="w-3.5 h-3.5 text-white"
                                />
                              </div>
                              <p className="text-sm font-medium leading-relaxed">
                                {submitStatus.message}
                              </p>
                            </div>
                          </motion.div>
                        )}

                        <motion.div
                          className="flex justify-center"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="relative overflow-hidden px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed w-full max-w-xs"
                            style={{
                              background:
                                "linear-gradient(to right, #85277F, #9E3A95)",
                            }}
                          >
                            {isSubmitting ? (
                              <span className="flex items-center justify-center">
                                <motion.div
                                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                                  animate={{ rotate: 360 }}
                                  transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "linear",
                                  }}
                                />
                                Sending...
                              </span>
                            ) : (
                              <span className="flex items-center justify-center">
                                Send Message{" "}
                                <FontAwesomeIcon
                                  icon={faPaperPlane}
                                  className="ml-2"
                                />
                              </span>
                            )}
                          </button>
                        </motion.div>
                      </form>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Properties Section Title */}
          <motion.div
            className="text-center mb-16 pt-8 px-4 md:px-8 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex flex-col items-center mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-lg tracking-[0.3em] uppercase font-light mb-2 text-[#85277F]">
                Exclusive Collection
              </p>
              <motion.div
                className="w-16 h-px bg-[#85277F]/50"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.4,
                }}
                viewport={{ once: true }}
              />
            </motion.div>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Our Premium
              <span className="block bg-gradient-to-r from-[#85277F] to-[#9E3A95] bg-clip-text text-transparent">
                Property Portfolio
              </span>
            </motion.h2>
            <motion.p
              className="text-gray-600 text-lg leading-relaxed font-light max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Discover our curated selection of luxury properties along Costa
              Rica&apos;s Gold Coast. Each property has been carefully selected
              for its exceptional location, design, and investment potential.
            </motion.p>
          </motion.div>

          {/* Search and Filter Bar */}
          <motion.div
            className="max-w-5xl mx-auto px-4 md:px-8 mb-8"
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
                    placeholder="Search properties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#85277F]/20 focus:border-[#85277F] transition-all duration-300 bg-gray-50 focus:bg-white"
                  />
                </div>

                {/* Category Filter */}
                <div className="relative w-full lg:w-auto">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon
                      icon={faFilter}
                      className="h-4 w-4 text-gray-400"
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full lg:w-40 pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#85277F]/20 focus:border-[#85277F] transition-all duration-300 bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                  >
                    <option value="all">All Types</option>
                    <option value="Villa">Villa</option>
                    <option value="Casita">Casita</option>
                  </select>
                </div>

                {/* Results Count */}
                <div className="text-sm text-gray-600 font-medium whitespace-nowrap">
                  {filteredProperties.length}{" "}
                  {filteredProperties.length === 1 ? "property" : "properties"}{" "}
                  found
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
          ) : filteredProperties && filteredProperties.length > 0 ? (
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10 px-4 md:px-8">
                {filteredProperties.map((property, index) => (
                  <Link key={property._id} href={`/realty/${property._id}`}>
                    <motion.div
                      className="group relative overflow-hidden rounded-2xl shadow-lg bg-white h-full flex flex-col"
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
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">
                {searchTerm || selectedCategory !== "all"
                  ? "No properties match your search criteria. Try adjusting your filters."
                  : "No properties available at the moment."}
              </p>
            </div>
          )}

          {/* Call to Action */}
          <div className="px-4 md:px-8 py-12 max-w-6xl mx-auto">
            <CTA
              subtitle="Investment Opportunities"
              title="Ready to Invest in Premium Real Estate?"
              description="Our team of investment specialists is here to help you find the perfect property that matches your investment goals and portfolio strategy."
              buttonText="Get in Touch"
              href="/inquiries"
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Page;
