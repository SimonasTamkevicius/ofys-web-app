"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Navbar from "../components/generic/Navbar";
import ScrollIndicator from "../components/generic/ScrollIndicator";
import CTA from "../components/generic/CTA";

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

  const step1 = useTransform(maxScrollReached, [0, 0.2], [0, 1]);
  const step2 = useTransform(maxScrollReached, [0.2, 0.4], [0, 1]);
  const step3 = useTransform(maxScrollReached, [0.4, 0.6], [0, 1]);
  const step4 = useTransform(maxScrollReached, [0.6, 0.8], [0, 1]);
  const step5 = useTransform(maxScrollReached, [0.8, 1], [0, 1]);

  const step1Y = useTransform(step1, [0, 1], [10, 0]);
  const step1X = useTransform(step1, [0, 1], [-50, 0]);
  const step1BubbleY = useTransform(step1, [0, 1], [20, 0]);

  const step2Y = useTransform(step2, [0, 1], [10, 0]);
  const step2X = useTransform(step2, [0, 1], [50, 0]);
  const step2BubbleY = useTransform(step2, [0, 1], [20, 0]);

  const step3Y = useTransform(step3, [0, 1], [10, 0]);
  const step3X = useTransform(step3, [0, 1], [-50, 0]);
  const step3BubbleY = useTransform(step3, [0, 1], [20, 0]);

  const step4Y = useTransform(step4, [0, 1], [10, 0]);
  const step4X = useTransform(step4, [0, 1], [50, 0]);
  const step4BubbleY = useTransform(step4, [0, 1], [20, 0]);

  const step5Y = useTransform(step5, [0, 1], [10, 0]);
  const step5X = useTransform(step5, [0, 1], [-50, 0]);
  const step5BubbleY = useTransform(step5, [0, 1], [20, 0]);

  const steps = [
    {
      title: "Consultation & Planning",
      description:
        "We begin with understanding your vision, budget, and requirements to create a customized plan.",
      icon: "1",
      animation: step1,
      yTransform: step1Y,
      xTransform: step1X,
      bubbleYTransform: step1BubbleY,
      isEven: true,
    },
    {
      title: "Design & Engineering",
      description:
        "Our architects and engineers create detailed plans that meet local regulations and your specifications.",
      icon: "2",
      animation: step2,
      yTransform: step2Y,
      xTransform: step2X,
      bubbleYTransform: step2BubbleY,
      isEven: false,
    },
    {
      title: "Permits & Approvals",
      description:
        "We handle all paperwork and municipal approvals, navigating Costa Rican regulations efficiently.",
      icon: "3",
      animation: step3,
      yTransform: step3Y,
      xTransform: step3X,
      bubbleYTransform: step3BubbleY,
      isEven: true,
    },
    {
      title: "Construction",
      description:
        "Our skilled team executes the project with quality craftsmanship and attention to detail.",
      icon: "4",
      animation: step4,
      yTransform: step4Y,
      xTransform: step4X,
      bubbleYTransform: step4BubbleY,
      isEven: false,
    },
    {
      title: "Finishing & Handover",
      description:
        "Final touches, quality checks, and a complete handover of your finished property.",
      icon: "5",
      animation: step5,
      yTransform: step5Y,
      xTransform: step5X,
      bubbleYTransform: step5BubbleY,
      isEven: true,
    },
  ];

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
                  className="w-16 h-px bg-[#85277F]/50 mb-6"
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
              Comprehensive Construction Solutions
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed font-light mt-4 mb-8">
              From initial design to final finishes, we handle every aspect of
              your project with precision and care.
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

      {/* Process Timeline Section */}
      <section
        ref={timelineRef}
        className="w-full bg-white py-10 px-8 md:px-20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-lg tracking-[0.3em] uppercase font-light mb-2 text-[#85277F]">
                Our Process
              </p>
              <motion.div
                className="w-16 h-px bg-[#85277F]/50 mb-6"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.4,
                }}
                viewport={{ once: true }}
              />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-4">
              A Streamlined Approach
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our proven methodology ensures your project&apos;s success from
              conception to completion
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 transform -translate-x-1/2 bg-gray-200 overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#85277F] to-[#9E3A95] origin-top"
                style={{ scaleY: maxScrollReached }}
              />
            </div>

            {/* Timeline items */}
            <div className="space-y-8 md:space-y-0">
              {steps.map((step, index) => {
                return (
                  <div
                    key={step.title}
                    className={`relative flex flex-col md:flex-row ${
                      step.isEven ? "md:flex-row" : "md:flex-row-reverse"
                    } items-center mb-6 md:mb-8`}
                  >
                    <motion.div
                      className="md:hidden flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-lg mx-auto mb-3"
                      style={{
                        background: "linear-gradient(135deg, #85277F, #9E3A95)",
                        opacity: step.animation,
                        scale: step.animation,
                        y: step.yTransform,
                      }}
                    >
                      {step.icon}
                    </motion.div>
                    {/* Content */}
                    <motion.div
                      className={`w-full md:w-1/2 p-4 ${
                        step.isEven
                          ? "md:pr-8 md:text-right"
                          : "md:pl-8 md:text-left"
                      }`}
                      style={{
                        opacity: step.animation,
                        x: step.xTransform,
                      }}
                    >
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base">
                        {step.description}
                      </p>
                    </motion.div>

                    {/* Bubble */}
                    <motion.div
                      className="hidden md:flex items-center justify-center w-16 h-16 rounded-full text-white font-bold text-xl mx-auto my-4"
                      style={{
                        background: "linear-gradient(135deg, #85277F, #9E3A95)",
                        scale: step.animation,
                        y: step.bubbleYTransform,
                      }}
                    >
                      {step.icon}
                    </motion.div>

                    {/* Empty space */}
                    <div
                      className={`hidden md:block md:w-1/2 p-4 ${
                        step.isEven ? "md:pl-8" : "md:pr-8"
                      }`}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
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
