"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Navbar from "../components/generic/Navbar";
import team from "../data/team";
import ScrollIndicator from "../components/generic/ScrollIndicator";
import CTA from "../components/generic/CTA";

const AboutPage = () => {
  const componentRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: componentRef,
    offset: ["start start", "end start"],
  });

  // Blur effect that increases as you scroll
  const blurValue = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["blur(0px)", "blur(8px)"]
  );

  const yValue = useTransform(scrollYProgress, [0, 1], [0, 250]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden items-center bg-[#F9F6F9]">
      {/* Enhanced Hero Section */}
      <section
        className="relative h-screen w-full overflow-hidden"
        ref={componentRef}
      >
        {/* Background image with parallax effect */}
        <motion.div
          initial={{ scale: 1.3 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{
            scale: useTransform(scrollYProgress, [0, 1], [1.1, 1.3], {
              clamp: true,
            }),
          }}
          className="absolute inset-0"
        >
          <Image
            src="/about.png"
            alt="Costa Rica Coast"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <div
          className="absolute inset-0 bg-black opacity-30"
          aria-hidden="true"
        />

        {/* Sophisticated overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Navbar */}
        <div className="relative z-10">
          <Navbar />
        </div>

        {/* Hero Content with refined typography */}
        <div className="absolute inset-0 flex items-center justify-center mb-30">
          <motion.div
            className="text-center px-4 max-w-4xl w-full"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              filter: blurValue,
              y: yValue,
            }}
          >
            <motion.div
              className="flex flex-col items-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-lg tracking-[0.3em] uppercase font-light mb-2 text-[#E5D9E4]">
                Who We Are
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
              className="text-5xl lg:text-6xl font-serif font-bold text-white drop-shadow-2xl mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              Learn More
              <span className="block bg-gradient-to-r from-[#E5D9E4] to-[#C4A3C1] bg-clip-text text-transparent">
                About Us
              </span>
            </motion.h1>
          </motion.div>
        </div>
        <ScrollIndicator />
      </section>

      {/* Our Story Section */}
      <section className="w-full py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          {/* Header with decorative element */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex flex-col items-center">
              <span className="text-lg tracking-widest uppercase text-[#85277F] font-light mb-3">
                Our Essence
              </span>
              <motion.div
                className="h-0.5 w-16 bg-[#85277F]/60 mb-8"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 max-w-2xl mx-auto">
              Redefining Luxury Living in Costa Rica
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image block - now with overlapping elements */}
            <motion.div
              className="relative h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            >
              <div className="absolute inset-0 flex items-end lg:items-center">
                {/* Main Image */}
                <motion.div
                  className="relative w-full lg:w-3/4 h-3/4 lg:h-full rounded-xl overflow-hidden shadow-lg"
                  initial={{ x: -20, y: -20 }}
                  whileInView={{ x: 0, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Image
                    src="/luxuryvillawithpool.png"
                    alt="Luxury villa with infinity pool"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </motion.div>

                {/* Overlapping Secondary Image */}
                <motion.div
                  className="absolute right-0 bottom-0 w-2/3 sm:w-1/2 lg:w-[45%] h-1/2 sm:h-[55%] lg:h-2/3 rounded-xl overflow-hidden shadow-md border border-white/20 bg-gray-100"
                  initial={{ x: 40, y: 40, opacity: 0 }}
                  whileInView={{ x: 0, y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Image
                    src="/interiordesign.png"
                    alt="Luxury interior design"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 40vw, 25vw"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Content block - restructured with stats */}
            <motion.div
              className="flex flex-col gap-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                Since our founding in 2010, OFYS has transformed Costa
                Rica&apos;s luxury real estate landscape through unparalleled
                service and curated properties that harmonize with the natural
                beauty of the region. Since our founding in 2010, OFYS has
                transformed Costa Rica&apos;s luxury real estate landscape
                through unparalleled service and curated properties that
                harmonize with the natural beauty of the region.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full bg-white py-20 px-8 md:px-20">
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
                Our Values
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
              Guiding Principles
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The foundation of everything we do at OFYS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Excellence",
                description:
                  "We strive for excellence in every aspect of our service, from property selection to customer support.",
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
                title: "Client-Centric",
                description:
                  "Our philosophy prioritizes your needs, tailoring services to your unique requirements.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                ),
              },
              {
                title: "Integrity",
                description:
                  "We operate with transparency, honesty, and ethical practices in all dealings.",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8"
                  >
                    <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 0h-4V4h4v2z" />
                  </svg>
                ),
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-br from-[#85277F] to-[#9E3A95] text-white">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4 text-center">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-20 px-8 md:px-20">
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
                Our Experts
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
              Meet the Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate professionals behind OFYS
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden shadow-lg mb-6 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-1">
                  {member.name}
                </h3>
                <p className="text-[#85277F] font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 px-8">
        <CTA
          subtitle="Get Started"
          title="Ready to Begin Your Journey"
          description="Let us help you discover your perfect property in Costa Rica."
          buttonText="Contact Our Team"
          href="/inquiries"
        />
      </section>
    </div>
  );
};

export default AboutPage;
