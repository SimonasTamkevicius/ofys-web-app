"use client";

import React from "react";
import Navbar from "../../custom-components/generic/Navbar";
import { motion } from "framer-motion";
import PropertyCard from "../../custom-components/generic/PropertyCard";
import { useRentalData } from "../../../hooks/useRentalData";
import CTA from "../../custom-components/generic/CTA";

const VillasPage = () => {
  const { rentals, loading, error } = useRentalData();

  // Use all rentals for now since category field was removed
  const villas = rentals;

  return (
    <div className="flex flex-col min-h-screen overflow-hidden items-center bg-[#F9F6F9]">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-4">
              Exclusive Villas
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Exclusive villas offering the ultimate in luxury and privacy.
              Perfect for discerning travelers seeking an exceptional
              experience.
            </p>
          </motion.div>

          {/* Properties Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading villas...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">Error: {error}</p>
            </div>
          ) : villas.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                No villas available at the moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
              {villas.map((villa, index) => (
                <motion.div
                  key={villa._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: index * 0.2,
                  }}
                >
                  <PropertyCard
                    {...villa}
                    type="Rentals"
                    price={`$${villa.pricePerNight}/night`}
                    imageUrl={villa.mainImage}
                    slug={villa._id}
                    location={villa.location || "Costa Rica"}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <section className="w-full py-10 px-8">
            <CTA
              subtitle="Ready to Book?"
              title="Start Planning Your Villa Experience"
              description="Our team is here to help you find the perfect villa for your Costa Rican adventure. Contact us for personalized recommendations and booking assistance."
              buttonText="Get in Touch"
              href="/inquiries"
            />
          </section>
        </div>
      </section>
    </div>
  );
};

export default VillasPage;
