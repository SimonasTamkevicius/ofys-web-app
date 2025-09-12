"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Image from "next/image";

interface ServiceCardProps {
  index: number;
  img: string;
  title: string;
  desc: string;
  buttonText: string;
}

const ServiceCard = ({
  index,
  img,
  title,
  desc,
  buttonText,
}: ServiceCardProps) => {
  return (
    <motion.div
      className="group relative h-full flex flex-col bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden border border-white/30"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
    >
      {/* Image Container */}
      <div className="relative h-64 flex-shrink-0 overflow-hidden">
        <Image
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          width={600}
          height={400}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            {title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-sm flex flex-col">
        <p className="text-gray-600 text-lg leading-relaxed mb-8 font-light flex-1">
          {desc}
        </p>

        <a
          href={`${
            title === "Construction Management"
              ? "/construction"
              : `/${title.toLowerCase()}`
          }`}
          className="group/btn relative inline-flex items-center justify-center w-full h-14 px-6 rounded-xl font-semibold cursor-pointer overflow-hidden shadow-lg"
          style={{
            background: "linear-gradient(135deg, #85277F, #9E3A95)",
            color: "white",
          }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
            style={{ background: "linear-gradient(135deg, #9E3A95, #85277F)" }}
          />
          <span className="relative flex items-center gap-2 text-base">
            {buttonText}
            <FontAwesomeIcon
              icon={faArrowRight}
              className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
            />
          </span>
        </a>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
