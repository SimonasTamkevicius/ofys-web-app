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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [blueprintModalOpen, setBlueprintModalOpen] = useState(false);

  // Prevent background scroll when modals are open
  useEffect(() => {
    if (lightboxIndex !== null || blueprintModalOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, blueprintModalOpen]);

  // Lightbox controls
  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = useCallback(() => {
    setLightboxIndex(
      (prev) => (prev! - 1 + galleryImages.length) % galleryImages.length
    );
  }, [galleryImages.length]);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev! + 1) % galleryImages.length);
  }, [galleryImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") prevImage();
      else if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevImage, nextImage]);

  const blueprint = {
    src: property.imageUrl,
    label: "Blueprint",
    alt: "Blueprint",
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-[#FAF9F7]">
      {/* Hero Section */}
      <div className="relative h-screen w-full">
        {/* Background image with enhanced overlay */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${property.imageUrl}")` }}
          />
          {/* Improved text contrast overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Navbar */}
        <div className="relative z-20">
          <Navbar />
        </div>

        {/* Top action buttons */}
        <div className="absolute top-28 left-0 right-0 z-10 px-6">
          <div className="max-w-7xl mx-auto flex justify-between">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href={`/${type.toLowerCase()}`}
                className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-[#85277F] font-medium shadow-sm hover:shadow-md transition-all"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
                Back
              </Link>
            </motion.div>

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button
                onClick={() => setBlueprintModalOpen(true)}
                className="w-32 h-32 bg-white/90 backdrop-blur-sm rounded-xl border border-white/30 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                <img
                  src={property.imageUrl}
                  alt="Blueprint preview"
                  className="w-full h-full object-cover"
                />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Enhanced property title overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-10 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-7xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-white mb-4 drop-shadow-lg">
              {name}
            </h1>
            <div className="w-16 h-0.5 bg-white/70 mb-6"></div>
            <p className="text-white/90 font-light max-w-2xl text-lg leading-relaxed drop-shadow-md">
              {description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full bg-white px-8"
      >
        <div className="max-w-7xl mx-auto py-8">
          {/* Amenities & Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-serif font-medium text-gray-900 mb-6">
                Amenities
              </h3>
              <ul className="space-y-3">
                {amenities?.map((amenity, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-5 h-5 flex items-center justify-center text-[#85277F]">
                      <FontAwesomeIcon
                        icon={amenityIcons[amenity] || faCheck}
                        className="w-4 h-4"
                      />
                    </div>
                    <span className="text-gray-700">{amenity}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Pricing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-serif font-medium text-gray-900 mb-6">
                Pricing
              </h3>
              <div className="space-y-6">
                <div className="p-6 border border-gray-100 rounded-xl">
                  <p className="text-gray-500 mb-1">Asking Price</p>
                  <p className="text-3xl font-medium text-[#85277F]">{price}</p>
                </div>
                <motion.a
                  href="/inquiries"
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#85277F] text-white rounded-lg transition-all hover:bg-[#9E3A95]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  {type === "Realty" ? "Inquire Now" : "Book Now"}
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Gallery Section */}
          <div ref={galleryRef} className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-serif font-medium text-gray-900 mb-3">
                Gallery
              </h3>
              <div className="w-12 h-0.5 bg-[#85277F] mx-auto mb-4"></div>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Explore the beauty of this property through our curated
                collection
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {galleryImages?.map((imgUrl, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.1,
                    ease: "backOut",
                  }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer"
                  onClick={() => openLightbox(idx)}
                  whileHover={{ scale: 1.03 }}
                >
                  <motion.div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url("${imgUrl}")` }}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            className="text-center"
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
              <h3 className="text-4xl font-bold text-gray-800 mb-4">
                Interested in this property?
              </h3>
              <p className="text-gray-600 text-md mb-8 max-w-2xl mx-auto">
                Our team is available to answer any questions and schedule
                viewings
              </p>
              <motion.a
                href="/inquiries"
                className="group relative inline-flex items-center justify-center px-6 py-3 rounded-xl text-white font-semibold cursor-pointer shadow-lg overflow-hidden"
                style={{
                  background: "linear-gradient(to right, #85277F, #9E3A95)",
                }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(to right, #9E3A95, #85277F)",
                  }}
                />
                <span className="relative flex items-center gap-2">
                  Get in Touch
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
      </motion.section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white p-2"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>

            <div className="flex justify-between items-center absolute top-1/2 w-full -translate-y-1/2">
              <button
                onClick={prevImage}
                className="text-white p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                onClick={nextImage}
                className="text-white p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>

            <motion.img
              key={lightboxIndex}
              src={galleryImages[lightboxIndex]}
              alt={`Gallery image ${lightboxIndex + 1}`}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            <div className="text-center text-white mt-4">
              {lightboxIndex + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}

      {/* Blueprint Modal */}
      {blueprintModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setBlueprintModalOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setBlueprintModalOpen(false)}
              className="absolute -top-12 right-0 text-white p-2"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>

            <img
              src={blueprint.src}
              alt={blueprint.alt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
