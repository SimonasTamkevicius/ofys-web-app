"use client";

import Navbar from "@/app/components/generic/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faArrowLeft,
  faTimes,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  faSwimmer,
  faFan,
  faCar,
  faTv,
  faEye,
  faFireAlt,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

interface Property {
  slug: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  galleryImages: string[];
  amenities: string[];
}

interface PropertyPageProps {
  property: Property;
  type: "Realty" | "Rentals";
}

import type { IconProp } from "@fortawesome/fontawesome-svg-core";

const amenityIcons: Record<string, IconProp> = {
  Pool: faSwimmer,
  "Private Infinity Pool": faSwimmer,
  Barbeque: faFireAlt,
  "Ocean View": faEye,
  "Direct Beach Access": faEye,
  AC: faFan,
  "Smart TV": faTv,
  Parking: faCar,
};

export default function PropertyPage({ property, type }: PropertyPageProps) {
  const { name, description, amenities, price, galleryImages } = property;

  const galleryRef = useRef(null);
  const isGalleryInView = useInView(galleryRef, {
    once: true,
    margin: "0px 0px -100px 0px",
  });

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Blueprint modal state for top-right image
  const [blueprintModalOpen, setBlueprintModalOpen] = useState(false);

  // Prevent background scroll when either modal is open
  useEffect(() => {
    if (lightboxIndex !== null || blueprintModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, blueprintModalOpen]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      // Disable scroll
      document.body.style.overflow = "hidden";
    } else {
      // Enable scroll
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  // Open lightbox for clicked image
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  // Navigate prev image
  const prevImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (lightboxIndex - 1 + galleryImages.length) % galleryImages.length
    );
  }, [lightboxIndex, galleryImages.length]);

  // Navigate next image
  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
  }, [lightboxIndex, galleryImages.length]);

  // Keyboard navigation for lightbox (left/right/esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, nextImage, prevImage]);

  // Blueprint modal state for top-right image
  const blueprint = {
    src: property.imageUrl,
    label: "Blueprint",
    alt: "Blueprint",
  };

  useEffect(() => {
    if (!blueprintModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setBlueprintModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [blueprintModalOpen]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden items-center bg-[#F9F6F9]">
      {/* Hero Section */}
      <div className="relative h-[100vh] w-full">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("${property.imageUrl}")` }}
          aria-hidden="true"
        />

        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F9F6F9] to-transparent" />

        {/* Navbar */}
        <div className="relative z-60">
          <Navbar />
        </div>

        {/* Top action row: Back button (left) and Blueprint preview (right) */}
        <div className="absolute top-30 md:top-32 left-0 right-0 z-30 pointer-events-none">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-row justify-between items-start">
            {/* Back button */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pointer-events-auto"
            >
              <Link
                href={`${type === "Realty" ? "/realty" : "/rentals"}`}
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 backdrop-blur-sm text-[#85277F] font-semibold shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100"
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
                />
                Back
              </Link>
            </motion.div>
            {/* Blueprint preview */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pointer-events-auto"
            >
              <button
                onClick={() => setBlueprintModalOpen(true)}
                className="group focus:outline-none"
                aria-label="Expand Main Floor Blueprint"
                tabIndex={0}
              >
                <div className="relative w-28 h-28 md:w-40 md:h-32 bg-white/30 backdrop-blur-md rounded-2xl border border-white/30 shadow-xl overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:shadow-2xl cursor-pointer">
                  <img
                    src={property.imageUrl}
                    alt={blueprint.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 rounded-2xl"
                  />
                  {/* Subtle dark overlay for label readability */}
                  <div className="absolute inset-0 bg-black/20" />
                  {/* Overlay label - pill style */}
                  <div className="absolute bottom-3 px-4 py-1 rounded-full bg-black/60 text-white text-xs font-semibold shadow backdrop-blur-md border border-white/20">
                    {blueprint.label}
                  </div>
                </div>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        className="relative w-full bg-gradient-to-br from-gray-50 to-white py-20"
      >
        <div className="px-6 sm:px-10 lg:px-16">
          {/* Property Details Card */}
          <motion.div
            className="mb-16 -mt-[35vh]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100">
              {/* Property Header */}
              <div className="text-center mb-12">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
                >
                  {name}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-md md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto"
                >
                  {description}
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Amenities */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                    <span className="bg-gradient-to-r from-[#85277F] to-[#9E3A95] bg-clip-text text-transparent">
                      Amenities
                    </span>
                  </h3>
                  <ul className="space-y-4">
                    {amenities?.map((amenity: string, idx: number) => {
                      const icon = amenityIcons[amenity] || faCheck;

                      return (
                        <motion.li
                          key={idx}
                          className="flex items-center gap-4"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-[#85277F] to-[#9E3A95] text-white shadow-lg">
                            <FontAwesomeIcon
                              icon={icon}
                              className="w-3.5 h-3.5"
                            />
                          </div>
                          <span className="text-gray-700 text-md lg:text-lg font-medium">
                            {amenity}
                          </span>
                        </motion.li>
                      );
                    })}
                  </ul>
                </motion.div>

                {/* Pricing */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                    <span className="bg-gradient-to-r from-[#85277F] to-[#9E3A95] bg-clip-text text-transparent">
                      Pricing
                    </span>
                  </h3>
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-[#85277F]/10 to-[#9E3A95]/10 rounded-2xl p-6">
                      <p className="text-gray-600 text-md lg:text-lg mb-2">
                        Asking Price
                      </p>
                      <p
                        className="text-3xl font-bold"
                        style={{ color: "#85277F" }}
                      >
                        {price}
                      </p>
                    </div>
                    <p className="text-gray-600 text-md lg:text-lg">
                      Contact us for more information and availability.
                    </p>
                    {type === "Realty" ? (
                      <motion.a
                        href="/inquiries"
                        className="group/btn relative inline-flex items-center justify-center w-full h-14 px-6 rounded-xl font-semibold transition-all duration-300 cursor-pointer overflow-hidden shadow-lg hover:shadow-xl"
                        style={{
                          background:
                            "linear-gradient(135deg, #85277F, #9E3A95)",
                          color: "white",
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div
                          className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                          style={{
                            background:
                              "linear-gradient(135deg, #9E3A95, #85277F)",
                          }}
                        />
                        <span className="relative flex items-center gap-2 text-base">
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className="w-4 h-4"
                          />
                          Inquire Now
                        </span>
                      </motion.a>
                    ) : (
                      <motion.a
                        href="#"
                        className="group/btn relative inline-flex items-center justify-center w-full h-14 px-6 rounded-xl font-semibold transition-all duration-300 cursor-pointer overflow-hidden shadow-lg hover:shadow-xl"
                        style={{
                          background:
                            "linear-gradient(135deg, #85277F, #9E3A95)",
                          color: "white",
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div
                          className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                          style={{
                            background:
                              "linear-gradient(135deg, #9E3A95, #85277F)",
                          }}
                        />
                        <span className="relative flex items-center gap-2 text-base">
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className="w-4 h-4"
                          />
                          Booking
                        </span>
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </div>

              <div className="border-t border-gray-200 my-8" />

              {/* Gallery Section */}
              <div className="mb-12">
                <div className="flex flex-col items-center mb-10">
                  {/* Accent bar or icon */}
                  <div className="w-12 h-1 rounded-full bg-gradient-to-r from-[#85277F] to-[#9E3A95] mb-4" />
                  <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center leading-tight mb-3">
                    <span className="bg-gradient-to-r from-[#85277F] to-[#9E3A95] bg-clip-text text-transparent">
                      Photo Gallery
                    </span>
                  </h3>
                  <p className="text-gray-500 text-md lg:text-lg max-w-2xl text-center font-light">
                    Explore the beauty and details of this exceptional property
                    through our curated photo collection.
                  </p>
                </div>

                <div
                  ref={galleryRef}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                >
                  {galleryImages?.map((imgUrl: string, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={isGalleryInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
                      onClick={() => openLightbox(idx)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-2xl group-hover:scale-105 transition-transform duration-300 ease-in-out"
                        style={{ backgroundImage: `url("${imgUrl}")` }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-2xl" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 max-w-3xl mx-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.h3
                className="text-4xl md:text-4xl font-bold text-gray-800 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                Ready to Make This Your Home?
              </motion.h3>
              <motion.p
                className="text-gray-600 text-md lg:text-lg mb-10 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                Our team is here to help you with any questions and guide you
                through the process.
              </motion.p>
              <motion.button
                className="group/btn relative inline-flex items-center justify-center px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #85277F, #9E3A95)",
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(135deg, #9E3A95, #85277F)",
                  }}
                />
                <span className="relative flex items-center gap-2 text-base">
                  Contact Us Today
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
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Lightbox Overlay */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm px-2 animate-fadein"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-xs sm:max-w-lg md:max-w-2xl max-h-[90vh] h-auto p-0 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center shadow-2xl border border-white/20 overflow-y-auto bg-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white text-3xl sm:text-2xl p-3 sm:p-2 rounded-full bg-black/60 hover:bg-black/80 transition-colors border border-white/20 focus:outline-none shadow-lg z-10"
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            {/* Prev Button */}
            {lightboxIndex !== 0 && (
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 text-white text-3xl sm:text-4xl p-3 sm:p-4 rounded-full bg-black/60 backdrop-blur-sm shadow-lg hover:cursor-pointer hover:text-gray-300 transition-all duration-200 hover:bg-black/80 border border-white/20 z-10"
                aria-label="Previous Image"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
            )}
            {/* Next Button */}
            {lightboxIndex !== galleryImages.length - 1 && (
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 text-white text-3xl sm:text-4xl p-3 sm:p-4 rounded-full bg-black/60 backdrop-blur-sm shadow-lg hover:cursor-pointer hover:text-gray-300 transition-all duration-200 hover:bg-black/80 border border-white/20 z-10"
                aria-label="Next Image"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            )}
            {/* Image Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 z-10">
              <span className="text-sm md:text-base font-medium">
                {lightboxIndex + 1} / {galleryImages.length}
              </span>
            </div>
            {/* Image with label overlay */}
            <div className="relative w-full flex justify-center items-center">
              <img
                src={galleryImages[lightboxIndex]}
                alt={`Gallery image ${lightboxIndex + 1}`}
                className="object-contain rounded-2xl w-full h-auto max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] bg-white/10 border border-white/20 shadow-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* Blueprint Modal/Lightbox for top-right image */}
      {blueprintModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-2 animate-fadein"
          onClick={() => setBlueprintModalOpen(false)}
        >
          <div
            className="relative w-full max-w-xs sm:max-w-lg md:max-w-2xl max-h-[90vh] h-auto p-0 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center shadow-2xl border border-white/20 overflow-y-auto bg-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setBlueprintModalOpen(false)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white text-3xl sm:text-2xl p-3 sm:p-2 rounded-full bg-black/60 hover:bg-black/80 transition-colors border border-white/20 focus:outline-none shadow-lg z-10"
              aria-label="Close blueprint preview"
            >
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* Image with label overlay */}
            <div className="relative w-full flex justify-center items-center">
              <img
                src={blueprint.src}
                alt={blueprint.alt}
                className="object-contain rounded-2xl w-full h-auto max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] bg-white/10 border border-white/20 shadow-lg"
              />
              {/* Label - pill style at bottom center of image */}
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 px-3 sm:px-6 py-1 sm:py-2 rounded-full bg-black/70 text-white text-xs sm:text-sm md:text-base font-semibold shadow backdrop-blur-md border border-white/20 z-10 max-w-[90vw] truncate">
                {blueprint.label}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
