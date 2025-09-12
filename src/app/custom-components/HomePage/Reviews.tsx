"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteLeft,
  faChevronLeft,
  faChevronRight,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";

interface Review {
  _id: string;
  author: string;
  role: string;
  content: string;
  rating: number;
  featured: boolean;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        // Filter to show only featured reviews, or all if no featured ones
        const featuredReviews = data.filter(
          (review: Review) => review.featured
        );
        setReviews(
          featuredReviews.length > 0 ? featuredReviews : data.slice(0, 3)
        );
      } catch (err) {
        console.error("Error fetching reviews:", err);
        // Fallback to empty array
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextReview = useCallback(() => {
    if (reviews.length === 0) return;
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  const prevReview = () => {
    if (reviews.length === 0) return;
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Auto-advance every 8 seconds (only when not dragging and have reviews)
  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      if (!isDragging) {
        nextReview();
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [isDragging, reviews.length, nextReview]);

  const variants = {
    enter: (direction: string) => ({
      x: direction === "left" ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (direction: string) => ({
      x: direction === "left" ? -100 : 100,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    }),
  };

  // Handle touch events for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const difference = touchStartX.current - touchEndX.current;
    if (difference > 50) {
      // Swipe left
      prevReview();
    } else if (difference < -50) {
      // Swipe right
      nextReview();
    }
    setIsDragging(false);
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Handle drag gestures for desktop
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x > 50) {
      nextReview();
    } else if (info.offset.x < -50) {
      prevReview();
    }
    setIsDragging(false);
  };

  if (loading) {
    return (
      <section className="py-8 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <p className="text-lg tracking-[0.3em] uppercase font-light mb-2 text-[#85277F]">
              What Our Clients Say
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-wide text-gray-800">
              Client
              <span className="block bg-gradient-to-r from-[#85277F] to-[#9E3A95] bg-clip-text text-transparent">
                Testimonials
              </span>
            </h2>
            <p className="text-xl text-gray-600 mt-4">Loading reviews...</p>
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section className="py-8 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <p className="text-lg tracking-[0.3em] uppercase font-light mb-2 text-[#85277F]">
              What Our Clients Say
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-wide text-gray-800">
              Client
              <span className="block bg-gradient-to-r from-[#85277F] to-[#9E3A95] bg-clip-text text-transparent">
                Testimonials
              </span>
            </h2>
            <p className="text-xl text-gray-600 mt-4">
              No reviews available at the moment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <motion.div
            className="flex flex-col items-center mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-lg tracking-[0.3em] uppercase font-light mb-2 text-[#85277F]">
              What Our Clients Say
            </p>
            <motion.div
              className="w-16 h-px bg-[#85277F]/50"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.3,
              }}
              viewport={{ once: true }}
            />
          </motion.div>
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold tracking-wide text-gray-800"
          >
            Client
            <span className="block bg-gradient-to-r from-[#85277F] to-[#9E3A95] bg-clip-text text-transparent">
              Testimonials
            </span>
          </motion.h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={reviews[currentIndex]._id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="bg-white p-6 md:p-12 rounded-2xl shadow-sm border border-gray-100"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={handleDragEnd}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative">
                {/* Opening quote - top left */}
                <FontAwesomeIcon
                  icon={faQuoteLeft}
                  className="text-[#85277F]/20 text-3xl md:text-4xl absolute -top-2 left-0"
                />

                {/* Content */}
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6 md:mb-8 font-light px-8 md:px-10">
                  {reviews[currentIndex].content}
                </p>

                {/* Closing quote - bottom right */}
                <FontAwesomeIcon
                  icon={faQuoteRight}
                  className="text-[#85277F]/20 text-3xl md:text-4xl absolute -bottom-2 right-0"
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h4 className="text-xl font-medium text-gray-900">
                    {reviews[currentIndex].author}
                  </h4>
                  <p className="text-gray-500">{reviews[currentIndex].role}</p>
                </div>
                <div className="flex mt-4 md:mt-0">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < reviews[currentIndex].rating
                          ? "text-[#85277F]"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows - more visible on mobile */}
          <button
            onClick={prevReview}
            className="hidden md:flex absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 items-center justify-center rounded-full bg-white shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Previous review"
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-[#85277F]"
              size="sm"
            />
          </button>
          <button
            onClick={nextReview}
            className="hidden absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 md:flex items-center justify-center rounded-full bg-white shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Next review"
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              className="text-[#85277F]"
              size="sm"
            />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-6 md:mt-8 gap-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? "right" : "left");
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-[#85277F] w-4 md:w-6"
                  : "bg-gray-300"
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
