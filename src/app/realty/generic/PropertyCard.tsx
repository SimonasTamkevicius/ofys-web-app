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
}

const PropertyCard = ({
  slug,
  name,
  description,
  imageUrl,
  price,
}: Property) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row shadow-2xl rounded-3xl overflow-hidden max-w-6xl bg-white mx-auto min-h-[400px]"
    >
      {/* Image */}
      <div className="md:w-1/2 w-full h-72 md:h-auto">
        <Image
          alt={`${name} image`}
          className="w-full h-full object-cover"
          width={800}
          height={600}
          src={imageUrl}
        />
      </div>

      {/* Content */}
      <div className="md:w-1/2 w-full p-8 md:p-12 flex flex-col justify-between gap-8">
        <div className="space-y-4">
          <h4 className="text-sm text-[#85277F] uppercase tracking-widest"></h4>
          <h2 className="text-xl md:text-4xl font-bold text-gray-800 leading-tight">
            {name}
          </h2>
          <p className="text-gray-600 leading-relaxed text-base md:text-lg">
            {description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-2xl font-bold text-[#85277F]">{price}</p>
          <Link
            href={`/realty/${slug}`}
            className="inline-flex items-center justify-center px-6 h-11 rounded-full text-white font-medium bg-[#85277F] border-2 border-[#85277F] hover:bg-white hover:text-[#85277F] transition-colors duration-300"
          >
            <span>Learn More</span>
            <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
