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
];

const Services = () => {
  return (
    <section className="relative py-24 px-4 sm:px-8 lg:px-16">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#85277F]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-[#85277F]/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl sm:text-6xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Explore Our
            <span className="block bg-gradient-to-r from-[#85277F] to-[#9E3A95] bg-clip-text text-transparent">
              Services
            </span>
          </motion.h2>
          <motion.p
            className="text-gray-600 text-xl leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            From luxury real estate to unforgettable vacation rentals, we offer
            comprehensive services to make your Costa Rican dreams a reality.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
          {serviceData.map((service, index) => (
            <ServiceCard
              key={index}
              img={service.img}
              title={service.title}
              desc={service.desc}
              buttonText={service.buttonText}
              index={index}
            />
          ))}
        </div>

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
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Our team of experts is here to help you find the perfect property
              or plan your dream vacation.
            </p>
            <motion.a
              href="/inquiries"
              className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl overflow-hidden"
              style={{
                background: "linear-gradient(to right, #85277F, #9E3A95)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(to right, #9E3A95, #85277F)",
                }}
              />
              <span className="relative flex items-center gap-2">
                Contact Us Today
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
