"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Navbar from "../custom-components/generic/Navbar";
import ScrollIndicator from "../custom-components/generic/ScrollIndicator";
import CTA from "../custom-components/generic/CTA";

// Carousel Component
const SlideshowSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const slides = [
    {
      title: "Design & Architecture",
      blurb:
        "Tailored architectural and design solutions that blend innovation with Guanacaste's natural beauty.",
      writeup:
        "We collaborate with top architects and designers to create bespoke projects that maximize ocean views, natural ventilation, and modern functionality. Every drawing and technical plan is carefully prepared to meet both aesthetic goals and structural requirements, ensuring harmony between vision and execution.",
      icon: "🖊️",
      image: "/luxuryvillawithpool.png",
    },
    {
      title: "Engineering & Compliance",
      blurb:
        "Expert engineering with strict adherence to local codes and standards.",
      writeup:
        "From civil and structural engineering to electrical and plumbing networks, our specialists integrate robust systems designed for longevity and efficiency. Each phase is carefully aligned with Costa Rican building codes and area-specific regulations, ensuring safety, sustainability, and legal compliance across every municipality.",
      icon: "⚡",
      image: "/constructionmanagement.png",
    },
    {
      title: "Interior Design & Finishes",
      blurb:
        "Curated interiors and premium finishes tailored to your lifestyle.",
      writeup:
        "Our interior design team guides you through the selection of large finishing materials, color palettes, and custom layouts, while sourcing high-quality furniture and fixtures. Every detail—down to textures, lighting, and flow—is chosen to complement your lifestyle and elevate your living environment.",
      icon: "🏡",
      image: "/interiordesign.png",
    },
    {
      title: "A True Turnkey Solution",
      blurb: "One team, one process, one result: a move-in-ready masterpiece.",
      writeup:
        "From the first sketch to the final piece of furniture, we deliver a complete solution. Our end-to-end service allows clients to step into a fully realized property, ready for immediate enjoyment or rental. The result: timeless homes built with care, precision, and a commitment to excellence that reflects the best of Costa Rica's Gold Coast.",
      icon: "🔑",
      image: "/costaricavilla.jpg",
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 15000); // Change slide every 15 seconds

    return () => clearInterval(interval);
  }, [slides.length, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <motion.div
      className="relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-2xl"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
    >
      {/* Background Images */}
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{
            opacity: currentSlide === index ? 1 : 0,
            scale: currentSlide === index ? 1 : 1.1,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* Enhanced Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
        </motion.div>
      ))}

      {/* Navigation Arrows - Hidden on mobile, visible on larger screens */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 top-1/2 transform z-10 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full items-center justify-center transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 top-1/2 transform z-10 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full items-center justify-center transition-all duration-300 group"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Content with enhanced readability */}
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center px-4 sm:px-6 md:px-8 lg:px-12 max-w-4xl">
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 flex items-center justify-center px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: currentSlide === index ? 1 : 0,
                y: currentSlide === index ? 0 : 30,
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="text-center w-full">
                {/* Icon */}
                <motion.div
                  className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 drop-shadow-2xl"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{
                    scale: currentSlide === index ? 1 : 0,
                    rotate: currentSlide === index ? 0 : -180,
                  }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {slide.icon}
                </motion.div>

                {/* Title with enhanced readability */}
                <motion.h3
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-2 sm:mb-3 text-white drop-shadow-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: currentSlide === index ? 1 : 0,
                    y: currentSlide === index ? 0 : 20,
                  }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {slide.title}
                </motion.h3>

                {/* Blurb with enhanced readability */}
                <motion.p
                  className="text-sm sm:text-base md:text-lg lg:text-xl font-light mb-3 sm:mb-4 text-white drop-shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: currentSlide === index ? 1 : 0,
                    y: currentSlide === index ? 0 : 20,
                  }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  {slide.blurb}
                </motion.p>

                {/* Writeup with enhanced readability */}
                <motion.p
                  className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-white/90 drop-shadow-lg max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: currentSlide === index ? 1 : 0,
                    y: currentSlide === index ? 0 : 20,
                  }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                >
                  {slide.writeup}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 cursor-pointer ${
              currentSlide === index
                ? "bg-white scale-125 shadow-lg"
                : "bg-white/50 hover:bg-white/75 hover:scale-110"
            }`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-black/30 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1 sm:py-2 text-white text-xs sm:text-sm font-medium">
        {currentSlide + 1} / {slides.length}
      </div>

      {/* Progress Bar */}
      {isAutoPlaying && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-white/30"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 15, ease: "linear" }}
          key={currentSlide} // Reset animation on slide change
        />
      )}
    </motion.div>
  );
};

const ConstructionManagementPage = () => {
  const services = [
    {
      title: "Design & Planning",
      description:
        "Comprehensive design solutions from concept to completion, tailored to your vision and site requirements.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path d="M12 2L2 7v10l10 5l10-5V7L12 2zm0 13l-6-3.27V8.73L12 12l6-3.27v3.27L12 15z" />
        </svg>
      ),
    },
    {
      title: "Architectural Drawings",
      description:
        "Professional architectural plans that blend aesthetics with functionality while complying with local regulations.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
          <path d="M7 12h2v5H7zm4-7h2v12h-2zm4 4h2v8h-2z" />
        </svg>
      ),
    },
    {
      title: "Engineering Solutions",
      description:
        "Structural, electrical, and mechanical engineering services to ensure safety and durability.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
          <path d="M7 12h2v5H7zm4-7h2v12h-2zm4 4h2v8h-2z" />
        </svg>
      ),
    },
    {
      title: "Permit Acquisition",
      description:
        "Expert handling of all permit applications and compliance with Costa Rican municipal bylaws.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
        </svg>
      ),
    },
    {
      title: "Interior Design",
      description:
        "Custom interior design solutions that reflect your personal style and enhance functionality.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm0 2.8L18 10v8h-2v-6h-4v6H6v-8l6-4.2z" />
        </svg>
      ),
    },
    {
      title: "Turnkey Solutions",
      description:
        "Complete project delivery from initial concept to final handover, all under one roof.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path d="M12 2L4 7v10l8 5l8-5V7L12 2zm0 14.5L6 12v-4l6 3.5l6-3.5v4l-6 4.5z" />
        </svg>
      ),
    },
  ];
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  const maxScrollReached = useMotionValue(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest > maxScrollReached.get()) {
        maxScrollReached.set(latest);
      }
    });
  }, [scrollYProgress, maxScrollReached]);

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const blurValue = useTransform(
    heroScroll,
    [0, 0.5],
    ["blur(0px)", "blur(8px)"]
  );

  const yValue = useTransform(heroScroll, [0, 1], [0, 250]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden items-center bg-[#F9F6F9]">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Background image with parallax */}
        <motion.div
          initial={{ scale: 1.3 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            scale: useTransform(heroScroll, [0, 1], [1.1, 1.3], {
              clamp: true,
            }),
          }}
        >
          <Image
            src="/costaricanconstruction.png"
            alt="Construction site"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <div
          className="absolute inset-0 bg-black opacity-50"
          aria-hidden="true"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Navbar */}
        <div className="relative z-10">
          <Navbar />
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center mb-30">
          <motion.div
            className="text-center px-4 max-w-4xl w-full"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              filter: blurValue,
              y: yValue,
            }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="flex flex-col items-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-lg tracking-[0.3em] uppercase font-light mb-2 text-[#E5D9E4]">
                Development Solutions
              </p>
              <motion.div
                className="w-16 h-px bg-[#E5D9E4]/50"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.4,
                }}
              />
            </motion.div>
            <motion.h1
              className="text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              Construction
              <span className="block bg-gradient-to-r from-[#E5D9E4] to-[#C4A3C1] bg-clip-text text-transparent">
                Management
              </span>
            </motion.h1>
          </motion.div>
        </div>
        <ScrollIndicator />
      </section>

      {/* Services Section */}
      <section className="w-full py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 p-8 md:p-20 items-center">
          {/* Text content */}
          <motion.div
            className="flex flex-col gap-6 order-2 md:order-1"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          >
            <motion.div
              className="flex flex-col md:items-start"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col items-center">
                <p className="text-lg tracking-[0.3em] uppercase font-light mb-2 text-[#85277F]">
                  Our Services
                </p>
                <motion.div
                  className="w-16 h-px bg-[#85277F]/50"
                  initial={{ scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.4,
                  }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-serif font-medium leading-tight text-gray-900">
              From Vision to Reality
            </h2>

            <p className="text-gray-600 text-md leading-relaxed font-light mt-4 mb-8">
              Our Construction & Development division provides a complete
              framework to bring your dream project to life. We manage every
              stage of the process, beginning with custom design, architectural
              drawings, and detailed engineering plans. From electrical and
              plumbing systems to structural execution, each element is overseen
              with precision and compliance to Costa Rican municipal bylaws and
              regional regulations. Our team’s deep local knowledge ensures all
              permitting and approval processes are handled efficiently and
              correctly, giving you peace of mind.
            </p>

            <ul className="space-y-3 text-gray-600">
              {services.slice(0, 3).map((service, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  viewport={{ once: true }}
                >
                  <svg
                    className="h-5 w-5 text-[#85277F] mr-2 mt-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{service.title}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Image with parallax effect */}
          <motion.div
            className="relative w-full aspect-square md:aspect-[5/4] mx-auto order-1 md:order-2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{ backgroundColor: "#85277F" }}
              initial={{ x: 15, y: 15, opacity: 0, rotate: 1 }}
              whileInView={{ x: -15, y: -15, opacity: 0.8, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />

            <motion.div
              className="absolute inset-0 border border-white/15 rounded-2xl pointer-events-none"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            />

            <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-lg group">
              <Image
                src="/constructionmanagement.png"
                alt="Construction blueprint"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className=" px-8 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-[#85277F] mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Auto-Rotating Services Slideshow */}
      <section className="w-full py-12 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex flex-col items-center">
              <span className="text-lg tracking-widest uppercase text-[#85277F] font-light mb-3">
                Our Expertise
              </span>
              <motion.div
                className="h-0.5 w-16 bg-[#85277F]/60 mb-8"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 max-w-3xl mx-auto">
              Comprehensive Construction Solutions
            </h2>
          </motion.div>

          {/* Slideshow Component */}
          <SlideshowSection />
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 px-8">
        <CTA
          subtitle="Your future awaits"
          title="Ready to Build Your Vision?"
          description="Contact us today to discuss your construction project in Costa
              Rica"
          buttonText="Start Your Project"
          href="/inquiries"
        />
      </section>
    </div>
  );
};

export default ConstructionManagementPage;
