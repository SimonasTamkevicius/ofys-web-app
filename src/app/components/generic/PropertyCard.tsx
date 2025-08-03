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
  bedrooms: number;
  bathrooms: number;
  sleeps: number;
  location: string;
}

const PropertyCard = ({
  slug,
  name,
  description,
  imageUrl,
  price,
  type,
  bedrooms,
  bathrooms,
  sleeps,
  location,
}: Property) => {
  return (
    <div className="space-y-12 mx-auto max-w-7xl">
      <motion.div
        key={slug}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        className="group relative flex flex-col md:flex-row shadow-xl rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm border border-white/20"
      >
        {/* Image */}
        <div className="md:w-1/2 w-full h-72 md:h-auto relative overflow-hidden">
          <Image
            alt={`${name} image`}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
            fill
            src={imageUrl}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Property specs overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex gap-3 justify-center md:justify-start">
            <div className="text-center p-2 bg-[#F9F6F9] rounded-lg w-20">
              <div className="flex items-center justify-center gap-1 text-[#85277F]">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="font-medium">{bedrooms}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Bedrooms</p>
            </div>
            <div className="text-center p-2 bg-[#F9F6F9] rounded-lg w-20">
              <div className="flex items-center justify-center gap-1 text-[#85277F]">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-medium">{bathrooms}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Bathrooms</p>
            </div>
            <div className="text-center p-2 bg-[#F9F6F9] rounded-lg w-20">
              <div className="flex items-center justify-center gap-1 text-[#85277F]">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span className="font-medium">{sleeps}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Sleeps</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="md:w-1/2 w-full p-8 md:p-12 flex flex-col justify-between gap-8 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <p className="text-sm text-[#85277F] flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
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
                {location}
              </p>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 leading-tight group-hover:text-gray-900 transition-colors duration-300">
              {name}
            </h2>
            <p className="text-gray-600 leading-relaxed text-md group-hover:text-gray-700 transition-colors duration-300">
              {description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="text-sm text-gray-500">Starting from</p>
              <p className="text-2xl font-bold text-[#85277F]">{price}</p>
            </div>
            <Link
              href={`/${type.toLowerCase()}/${slug}`}
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
                View Details
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
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
              </span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PropertyCard;
