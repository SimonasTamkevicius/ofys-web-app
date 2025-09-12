"use client";

import Navbar from "@/app/custom-components/generic/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faTimes,
  faChevronLeft,
  faChevronRight,
  faArrowRight,
  faFileAlt,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
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
import { faBed, faBath, faUserGroup } from "@fortawesome/free-solid-svg-icons";

interface Property {
  _id?: string;
  slug?: string;
  name: string;
  description: string;
  price?: string;
  pricePerNight?: number;
  pricePerWeek?: number;
  pricePerMonth?: number;
  imageUrl?: string;
  mainImage?: string;
  galleryImages?: string[];
  gallery?: string[];
  amenities: Array<{ name: string; icon?: string }> | string[];
  bedrooms: number;
  bathrooms: number;
  sleeps: number;
  location?: string;
}

interface PropertyPageProps {
  property: Property;
  type: "Realty" | "Rentals";
}

import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import CTA from "./CTA";

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
  const {
    name,
    description,
    amenities,
    price,
    pricePerNight,
    // pricePerWeek,
    // pricePerMonth,
    galleryImages,
    gallery,
    mainImage,
    imageUrl,
  } = property;

  // Handle different data structures and format price
  const formatPrice = (price: string | number | undefined) => {
    if (!price) return "";

    const numericPrice = typeof price === "string" ? parseFloat(price) : price;
    if (isNaN(numericPrice)) return "";

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericPrice);
  };

  const propertyPrice =
    type === "Realty"
      ? formatPrice(price)
      : pricePerNight
      ? `$${pricePerNight}/night`
      : "";
  // const propertyLocation = property.location || "Costa Rica";
  const propertyGallery = galleryImages || gallery || [];
  const propertyMainImage = mainImage || imageUrl || "";

  // Handle amenities - could be array of strings or array of objects
  const amenityNames = Array.isArray(amenities)
    ? amenities.map((amenity) =>
        typeof amenity === "string" ? amenity : amenity.name
      )
    : [];
  const galleryRef = useRef(null);
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
  const nextImage = useCallback(
    () => setLightboxIndex((prev) => (prev! + 1) % propertyGallery.length),
    [propertyGallery.length]
  );
  const prevImage = useCallback(
    () =>
      setLightboxIndex(
        (prev) => (prev! - 1 + propertyGallery.length) % propertyGallery.length
      ),
    [propertyGallery.length]
  );

  // Touch gesture support for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
  };

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
    src: propertyMainImage,
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
            style={{ backgroundImage: `url("${propertyMainImage}")` }}
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
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={`/${type.toLowerCase()}`}
                className="flex items-center gap-2 px-3 py-3 bg-[#85277F]/30 backdrop-blur-sm rounded-full text-white font-medium shadow-sm hover:bg-[#85277F]/50 transition-all cursor-pointer min-w-[44px] min-h-[44px] justify-center"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
                <span>Back</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <button
                onClick={() => setBlueprintModalOpen(true)}
                className="w-32 h-32 bg-white/90 backdrop-blur-sm rounded-xl border border-white/30 shadow-sm hover:shadow-md transition-all overflow-hidden cursor-pointer"
              >
                <Image
                  src={propertyMainImage}
                  alt="Blueprint preview"
                  className="w-full h-full object-cover"
                  width={128}
                  height={128}
                  style={{ objectFit: "cover" }}
                />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Enhanced property title overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-6 md:pb-10 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-7xl mx-auto"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-white mb-3 md:mb-4 drop-shadow-lg leading-tight">
              {name}
            </h1>
            <div className="w-12 md:w-16 h-0.5 bg-white/70 mb-4 md:mb-6"></div>
            <p className="text-white/90 font-light max-w-6xl text-sm md:text-lg leading-relaxed drop-shadow-md">
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
        className="relative w-full bg-white px-4 md:px-8"
      >
        <div className="max-w-7xl mx-auto py-6 md:py-8">
          {/* Amenities & Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-24">
            {/* Property Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-50"
            >
              <div className="flex flex-col h-full">
                <h3 className="text-2xl font-serif font-medium text-gray-900 mb-6 pb-4 border-b border-gray-100">
                  Property Features
                </h3>

                {/* Key Specs */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-3 bg-[#F9F6F9] rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-[#85277F]">
                      <FontAwesomeIcon icon={faBed} className="w-4 h-4" />
                      <span className="font-medium">{property.bedrooms}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Bedrooms</p>
                  </div>

                  <div className="text-center p-3 bg-[#F9F6F9] rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-[#85277F]">
                      <FontAwesomeIcon icon={faBath} className="w-4 h-4" />
                      <span className="font-medium">{property.bathrooms}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Bathrooms</p>
                  </div>

                  <div className="text-center p-3 bg-[#F9F6F9] rounded-lg">
                    <div className="flex items-center justify-center gap-2 text-[#85277F]">
                      <FontAwesomeIcon icon={faUserGroup} className="w-4 h-4" />
                      <span className="font-medium">{property.sleeps}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Sleeps</p>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-4">
                    Amenities
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {amenityNames?.map((amenity, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-[#F9F6F9] transition-colors"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-5 h-5 flex items-center justify-center text-[#85277F] bg-[#85277F]/10 rounded-full">
                          <FontAwesomeIcon
                            icon={amenityIcons[amenity] || faCheck}
                            className="w-3 h-3"
                          />
                        </div>
                        <span className="text-gray-700 text-sm">{amenity}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Pricing & Inquiry */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl mt-8"
            >
              <div className="flex flex-col h-full">
                <h3 className="text-2xl font-serif font-medium text-gray-900 mb-6 pb-4 border-b border-gray-100">
                  Pricing & Availability
                </h3>

                <div className="flex-grow space-y-6">
                  {/* Price Highlight Card */}
                  <div className="relative p-6 bg-gradient-to-br from-[#F9F6F9] to-white rounded-xl border border-[#85277F]/20 overflow-hidden">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          {type === "Rentals"
                            ? "Nightly Rate From"
                            : "Starting from"}
                        </p>
                        <p className="text-3xl font-bold bg-gradient-to-r from-[#85277F] to-[#9E3A95] bg-clip-text text-transparent">
                          {propertyPrice}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {type === "Rentals"
                            ? "Minimum stay may apply"
                            : "Plus taxes & fees"}
                        </p>
                      </div>

                      {type === "Rentals" && (
                        <div className="flex flex-col items-end">
                          <div className="bg-[#85277F]/10 px-3 py-1 rounded-full mb-2">
                            <p className="text-xs font-medium text-[#85277F]">
                              Weekly: ${4900}
                            </p>
                          </div>
                          <div className="bg-[#85277F]/10 px-3 py-1 rounded-full">
                            <p className="text-xs font-medium text-[#85277F]">
                              Monthly: ${19600}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom-aligned elements */}
                  <div className="space-y-4">
                    {/* CTA Button */}
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                        duration: 0.5,
                      }}
                    >
                      <Link
                        href="/inquiries"
                        className="group relative flex items-center justify-center w-full px-6 py-4 rounded-xl font-medium overflow-hidden shadow-md hover:shadow-lg transition-all"
                      >
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-[#85277F] to-[#9E3A95]"
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-[#9E3A95] to-[#85277F] opacity-0 group-hover:opacity-100"
                          transition={{ duration: 0.4 }}
                        />
                        <span className="relative z-10 flex items-center gap-3 text-white">
                          <FontAwesomeIcon
                            icon={
                              type === "Realty" ? faFileAlt : faCalendarCheck
                            }
                            className="w-4 h-4 transition-transform group-hover:scale-110"
                          />
                          <span className="font-medium tracking-wide">
                            {type === "Realty" ? "Inquire" : "Book"}
                          </span>
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1"
                          />
                        </span>
                        <span className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-white/30 transition-opacity duration-300" />
                      </Link>
                    </motion.div>

                    {/* Additional Info */}
                    <p className="text-xs text-center text-gray-400">
                      {type === "Realty"
                        ? "Prices subject to change without notice"
                        : "Rates vary by season and availability"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Gallery Section */}
          <div ref={galleryRef} className="mb-16">
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h3
                className="text-4xl font-serif font-medium text-gray-900 mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                Property Gallery
              </motion.h3>

              <motion.div
                className="w-16 h-0.5 bg-gradient-to-r from-[#85277F]/20 via-[#85277F] to-[#85277F]/20 mx-auto mb-6"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />

              <motion.p
                className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                Discover the exquisite details and breathtaking spaces of this
                luxury property
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
              {propertyGallery?.map((imgUrl, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                  className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer shadow-lg"
                  onClick={() => openLightbox(idx)}
                >
                  <Image
                    src={imgUrl}
                    alt={`Property gallery image ${idx + 1}`}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Overlay effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 border-4 border-white/0 group-hover:border-white/20 transition-all duration-500" />

                  {/* Hover indicator */}
                  <motion.div
                    className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                  >
                    <svg
                      className="w-4 h-4 text-[#85277F]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-800">
                      View
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <CTA
            subtitle={`${
              type === "Realty"
                ? "This could be yours"
                : "Questions about this rental?"
            }`}
            title={`${
              type === "Realty"
                ? "Interested in This Property?"
                : "Book Your Stay"
            }`}
            description={`${
              type === "Realty"
                ? "Contact us to schedule a viewing or for more information"
                : "Reach out to book your stay or ask any questions"
            }`}
            buttonText="Get in Touch"
            href="/inquiries"
          />
        </div>
      </motion.section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop with blur and dimming */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-lg"
            onClick={closeLightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />

          {/* Lightbox container */}
          <div className="relative z-10 max-w-6xl w-full max-h-[90vh]">
            {/* Close button */}
            <motion.button
              onClick={closeLightbox}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white p-3 sm:p-4 hover:text-[#E5D9E4] transition-colors z-20 bg-black/40 rounded-full cursor-pointer backdrop-blur-sm min-w-[44px] min-h-[44px] flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close lightbox"
            >
              <FontAwesomeIcon
                icon={faTimes}
                size="lg"
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
            </motion.button>

            {/* Navigation arrows */}
            <div className="flex justify-between items-center absolute top-1/2 w-full -translate-y-1/2 px-2 sm:px-4 pointer-events-none">
              <motion.button
                onClick={prevImage}
                className="text-white p-3 sm:p-4 bg-black/40 rounded-full hover:bg-[#85277F] transition-all backdrop-blur-sm min-w-[48px] min-h-[48px] flex items-center justify-center pointer-events-auto cursor-pointer"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(133, 39, 127, 0.8)",
                }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous image"
              >
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  size="lg"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
              </motion.button>
              <motion.button
                onClick={nextImage}
                className="text-white p-3 sm:p-4 bg-black/40 rounded-full hover:bg-[#85277F] transition-all backdrop-blur-sm min-w-[48px] min-h-[48px] flex items-center justify-center pointer-events-auto cursor-pointer"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(133, 39, 127, 0.8)",
                }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next image"
              >
                <FontAwesomeIcon
                  icon={faChevronRight}
                  size="lg"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
              </motion.button>
            </div>

            {/* Image with enhanced animations */}
            <motion.div
              className="w-full h-full flex items-center justify-center overflow-hidden rounded-lg"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              key={lightboxIndex}
            >
              <motion.img
                key={lightboxIndex}
                src={propertyGallery[lightboxIndex]}
                alt={`Gallery image ${lightboxIndex + 1}`}
                className="w-full h-auto max-w-full max-h-[80vh] object-contain"
                style={{
                  borderRadius: "0.5rem",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              />
            </motion.div>

            {/* Optional: Thumbnail strip */}
            <div className="flex justify-center mt-2 sm:mt-4 space-x-1 sm:space-x-2 overflow-x-auto py-2 px-2">
              {propertyGallery.map((img, idx) => (
                <motion.div
                  key={idx}
                  className={`w-12 h-12 sm:w-16 sm:h-16 rounded-md overflow-hidden cursor-pointer border-2 flex-shrink-0 ${
                    idx === lightboxIndex
                      ? "border-[#85277F]"
                      : "border-transparent"
                  }`}
                  onClick={() => setLightboxIndex(idx)}
                  whileHover={{ scale: 1.05 }}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Blueprint Modal */}
      {blueprintModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-hidden"
          style={{ height: "100vh", width: "100vw" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop with blur and dimming */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-lg"
            style={{ height: "100vh", width: "100vw" }}
            onClick={() => setBlueprintModalOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />

          {/* Lightbox container */}
          <div className="relative z-10 max-w-6xl w-full max-h-[90vh]">
            {/* Close button */}
            <motion.button
              onClick={() => setBlueprintModalOpen(false)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white p-3 sm:p-4 hover:text-[#E5D9E4] transition-colors z-20 bg-black/40 rounded-full cursor-pointer backdrop-blur-sm min-w-[44px] min-h-[44px] flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close blueprint modal"
            >
              <FontAwesomeIcon
                icon={faTimes}
                size="lg"
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
            </motion.button>

            {/* Blueprint image with enhanced animations */}
            <motion.div
              className="w-full h-full flex items-center justify-center overflow-hidden rounded-lg"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.img
                src={blueprint.src}
                alt={blueprint.alt}
                className="w-full h-auto max-w-full max-h-[80vh] object-contain"
                style={{
                  borderRadius: "0.5rem",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
