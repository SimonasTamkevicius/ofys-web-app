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
      className="flex flex-col rounded-xl shadow-lg overflow-hidden bg-white max-w-lg mx-auto hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.15,
      }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="relative">
        <Image
          src={img}
          alt={title}
          className="w-full h-64 object-cover"
          width={800}
          height={400}
        />
        <h3 className="text-2xl font-bold tracking-wide absolute bottom-0 text-white p-4">
          {title}
        </h3>
      </div>

      <div className="p-6 flex flex-col gap-4">
        <p className="text-gray-600 text-md leading-relaxed">{desc}</p>
        <button className="inline-flex w-48 border-[#85277F] border-2 bg-[#85277F] hover:bg-white items-center justify-center rounded-full h-10 px-6 hover:text-[#85277F] cursor-pointer text-white text-sm font-semibold hover:bg-opacity-90 transition-colors">
          <span>{buttonText}</span>
          <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4 ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
