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
      className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-white/20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        ease: "easeOut",
        delay: index * 0.2 
      }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={img}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          width={600}
          height={400}
          priority={index === 0}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300">
            {title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm">
        <p className="text-gray-600 text-lg leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">{desc}</p>
        
        <a
          href={`/${title.toLowerCase()}`}
          className="group/btn relative inline-flex items-center justify-center w-full h-14 px-6 rounded-xl font-semibold transition-all duration-300 cursor-pointer overflow-hidden shadow-lg hover:shadow-xl"
          style={{ 
            background: "linear-gradient(135deg, #85277F, #9E3A95)",
            color: "white"
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
