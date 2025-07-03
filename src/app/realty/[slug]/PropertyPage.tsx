"use client";

import Navbar from "@/app/components/generic/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Property {
  slug: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  galleryImages: string[];
  amenities: string[];
}

export default function PropertyPage({ property }: { property: Property }) {
  const { name, description, amenities, price, galleryImages } = property;

  const galleryRef = useRef(null);
  const isGalleryInView = useInView(galleryRef, {
    once: true,
    margin: "0px 0px -100px 0px",
  });

  return (
    <div className="relative group @container">
      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-20">
        <Navbar />
      </div>

      {/* Back button with slide-in */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute z-10"
      >
        <Link
          href="/realty"
          className="absolute top-110 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white bg-opacity-90 text-[#85277F] font-semibold shadow-md hover:bg-opacity-100 hover:shadow-lg transition"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
          Back
        </Link>
      </motion.div>

      {/* Hero section */}
      <div className="relative min-h-[500px] md:min-h-[500px]">
        <div
          className="bg-cover bg-center flex flex-col justify-end overflow-hidden min-h-[500px] md:min-h-[500px]"
          style={{
            backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 35%), url("${property.imageUrl}")`,
          }}
        ></div>
        <div
          className="absolute inset-0 bg-black opacity-35"
          aria-hidden="true"
        />
      </div>

      <div className="p-6 md:p-8">
        {/* Heading & Description */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="tracking-tight text-3xl font-bold leading-tight pb-2"
        >
          {name}
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-600 leading-relaxed text-base md:text-lg pb-6"
        >
          {description}
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Amenities */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold leading-tight pb-3 border-b border-gray mb-3">
              Amenities
            </h3>
            <ul className="space-y-3">
              {amenities?.map((amenity: string, idx: number) => (
                <li key={idx} className="flex items-center gap-x-3">
                  <div className="flex items-center justify-center size-5 rounded border-2 border-[#85277F] bg-[#85277F] text-white">
                    <svg
                      className="block"
                      fill="currentColor"
                      height="14"
                      viewBox="0 0 256 256"
                      width="14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                  </div>
                  <span className="text-gray-600 leading-normal text-base">
                    {amenity}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Pricing */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col space-y-3"
          >
            <h3 className="text-xl font-semibold leading-tight pb-3 border-b border-gray mb-3">
              Pricing
            </h3>
            <p className="text-gray-600 leading-normal text-base">
              Asking price:{" "}
              <strong className="font-semibold text-lg tracking-wide">
                {price}
              </strong>
            </p>
            <p className="text-gray-600 leading-normal text-base">
              Contact us for more information and availability.
            </p>
            <div>
              <a
                href={`/inquiries`}
                className="inline-flex items-center justify-center px-4 h-11 rounded-full text-white font-medium bg-[#85277F] border-2 border-[#85277F] hover:bg-white hover:text-[#85277F] transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 m-2" />
                <span>Inquire Now</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Gallery */}
        <h3 className="text-xl font-semibold pb-3 border-b border-gray mb-6">
          Photo Gallery
        </h3>
        <div
          ref={galleryRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 mb-10"
        >
          {galleryImages?.map((imgUrl: string, idx: number) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={isGalleryInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-lg shadow-md"
            >
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg group-hover:scale-105 transition-transform duration-300 ease-in-out"
                style={{ backgroundImage: `url("${imgUrl}")` }}
              ></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
}
