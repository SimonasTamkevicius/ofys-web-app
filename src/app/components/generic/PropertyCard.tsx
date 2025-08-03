"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export interface Property {
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  type: "Realty" | "Rentals";
}

const PropertyCard = ({
  slug,
  name,
  description,
  imageUrl,
  price,
  type,
}: Property) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="group relative flex flex-col md:flex-row shadow-xl rounded-3xl overflow-hidden mx-auto max-w-7xl min-h-[400px] bg-white/80 backdrop-blur-sm border border-white/20"
    >
      {/* Image */}
      <div className="md:w-1/2 w-full h-72 md:h-auto relative overflow-hidden">
        <Image
          alt={`${name} image`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          width={800}
          height={600}
          src={imageUrl}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="md:w-1/2 w-full p-8 md:p-12 flex flex-col justify-between gap-8 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-full bg-gradient-to-r from-[#85277F]/10 to-[#9E3A95]/10 border border-[#85277F]/20 group-hover:border-[#85277F]/40 transition-colors duration-300">
              <p className="text-sm text-[#85277F] uppercase tracking-widest font-semibold">
                {type}
              </p>
            </div>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 leading-tight group-hover:text-gray-900 transition-colors duration-300">
            {name}
          </h2>
          <p className="text-gray-600 leading-relaxed text-md group-hover:text-gray-700 transition-colors duration-300">
            {description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold bg-gradient-to-r from-[#85277F] to-[#9E3A95] bg-clip-text text-transparent group-hover:from-[#9E3A95] group-hover:to-[#85277F] transition-all duration-500">
              {price}
            </p>
          </div>
          <Link
            href={`${
              type === "Realty" ? `/realty/${slug}` : `/rentals/${slug}`
            }`}
            className="group/btn relative inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl"
            style={{
              background: "linear-gradient(135deg, #85277F, #9E3A95)",
              color: "white",
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, #9E3A95, #85277F)",
              }}
            />
            <span className="relative flex items-center gap-3 text-md">
              Learn More
              <FontAwesomeIcon
                icon={faArrowRight}
                className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
