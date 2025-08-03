"use client";

import React from "react";
import { motion } from "framer-motion";
import ServiceCard from "./generic/ServiceCard";

const serviceData = [
  {
    img: "/realty1.png",
    title: "Realty",
    desc: "Discover your dream home in Costa Rica's most breathtaking locations. From beachfront villas to mountain retreats, we offer carefully curated properties that combine luxury with natural beauty.",
    buttonText: "Explore Listings",
  },
  {
    img: "/rentals.png",
    title: "Rentals",
    desc: "Experience the perfect vacation with our handpicked rental properties. Whether you're looking for a short-term getaway or an extended stay, we have the perfect accommodation for you.",
    buttonText: "Browse Rentals",
  },
  {
    img: "/rentals.png",
    title: "Construction Management",
    desc: "Transform your vision into reality with our expert construction management services. We handle everything from planning to execution, ensuring your project is completed on time and within budget.",
    buttonText: "Learn More",
  },
];

const Services = () => {
  return (
    <section className="relative py-8 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        >
          <motion.div
            className="flex flex-col items-center mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-lg tracking-[0.3em] uppercase font-light mb-2 text-[#85277F]">
              Exclusive Offerings
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
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-gray-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            Discover Our
            <span className="block mt-2 bg-gradient-to-r from-[#85277F] via-[#9E3A95] to-[#C4A3C1] bg-clip-text text-transparent">
              Luxury Services
            </span>
          </motion.h2>

          <motion.p
            className="text-gray-600 text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            From premium real estate to exquisite vacation rentals, we provide
            unparalleled services to actualize your Costa Rican paradise.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {serviceData.map((service, index) => (
            <motion.div
              key={index}
              className="h-full" // Ensure motion div takes full height
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            >
              <div className="h-full">
                {" "}
                {/* Additional wrapper for consistent height */}
                <ServiceCard
                  img={service.img}
                  title={service.title}
                  desc={service.desc}
                  buttonText={service.buttonText}
                  index={index}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
