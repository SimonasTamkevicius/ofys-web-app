"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faPaperPlane,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/generic/Navbar";
import ScrollIndicator from "../components/generic/ScrollIndicator";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Blur effect that increases as you scroll
  const blurValue = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["blur(0px)", "blur(8px)"]
  );
  // Parallax down effect (text moves down slightly as you scroll)
  const yValue = useTransform(scrollYProgress, [0, 1], [0, 250]);

  const faqs = [
    {
      question: "How quickly can I expect a response to my inquiry?",
      answer:
        "Our team typically responds within 24 hours during business days. For urgent matters, we recommend calling our direct line for immediate assistance.",
    },
    {
      question: "What areas of Costa Rica do you specialize in?",
      answer:
        "We focus on luxury properties across prime locations including Guanacaste, Manuel Antonio, the Central Valley, and the Southern Pacific region.",
    },
    {
      question: "Do you offer virtual property tours?",
      answer:
        "Yes, we provide high-quality virtual tours for all our listed properties. Simply request a tour through our contact form and we'll arrange a personalized viewing.",
    },
    {
      question: "What makes OFYS different from other real estate agencies?",
      answer:
        "Our concierge-level service, exclusive off-market listings, and deep local expertise set us apart. We don't just sell properties—we curate lifestyles.",
    },
    {
      question: "Can you assist with relocation services?",
      answer:
        "Absolutely. Our premium relocation package includes everything from visa assistance to school recommendations and home setup services.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden items-center bg-[#F9F6F9]">
      {/* Hero Section */}
      <section
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden"
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
            src="/contactbg1.png"
            alt="Luxury Costa Rica Property"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <div
          className="absolute inset-0 bg-black opacity-50"
          aria-hidden="true"
        />

        {/* Gold gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/10 via-transparent to-[#85277F]/10" />

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
                Get In Touch
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
              Let&apos;s Start a
              <span className="block bg-gradient-to-r from-[#E5D9E4] to-[#C4A3C1] bg-clip-text text-transparent">
                Conversation
              </span>
            </motion.h1>
          </motion.div>
        </div>
        <ScrollIndicator />
      </section>

      {/* Contact Options Section */}
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
                Contact Options
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
              How Can We Help You?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Email Option */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-br from-[#85277F] to-[#9E3A95] text-white group-hover:rotate-6 transition-transform duration-300">
                <FontAwesomeIcon icon={faEnvelope} className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4 text-center">
                Email Us
              </h3>
              <p className="text-gray-600 text-center mb-4">
                For detailed inquiries and documentation
              </p>
              <p className="text-lg font-medium text-[#85277F] text-center hover:text-[#9E3A95] transition-colors">
                info@ofys.com
              </p>
            </motion.div>

            {/* Phone Option */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-br from-[#85277F] to-[#9E3A95] text-white group-hover:rotate-6 transition-transform duration-300">
                <FontAwesomeIcon icon={faPhone} className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4 text-center">
                Call Us
              </h3>
              <p className="text-gray-600 text-center mb-4">
                Direct access to our specialists
              </p>
              <p className="text-lg font-medium text-[#85277F] text-center hover:text-[#9E3A95] transition-colors">
                +1 (111) 111-1111
              </p>
            </motion.div>

            {/* Location Option */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-br from-[#85277F] to-[#9E3A95] text-white group-hover:rotate-6 transition-transform duration-300">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4 text-center">
                Visit Us
              </h3>
              <p className="text-gray-600 text-center mb-4">
                Experience Costa Rica firsthand
              </p>
              <p className="text-lg font-medium text-[#85277F] text-center hover:text-[#9E3A95] transition-colors">
                San José, Costa Rica
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form Section with Side Content */}
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
                Send A Message
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
              Contact Our Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fill out the form below and we&apos;ll get back to you promptly
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Form Column */}
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 h-full">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#85277F] focus:border-[#85277F] transition-all duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#85277F] focus:border-[#85277F] transition-all duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block font-medium text-gray-700 mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#85277F] focus:border-[#85277F] transition-all duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block font-medium text-gray-700 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your dream property, timeline, budget, or any questions you have..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#85277F] focus:border-[#85277F] transition-all duration-300 resize-none"
                      required
                    />
                  </div>

                  <motion.div
                    className="flex justify-center"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative overflow-hidden px-8 py-4 rounded-xl text-white font-medium transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed w-full max-w-xs"
                      style={{
                        background:
                          "linear-gradient(to right, #85277F, #9E3A95)",
                      }}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          Send Message{" "}
                          <FontAwesomeIcon
                            icon={faPaperPlane}
                            className="ml-2"
                          />
                        </span>
                      )}
                    </button>
                  </motion.div>
                </form>
              </div>
            </motion.div>

            {/* Side Content Column */}
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-[#F9F6F9] p-8 rounded-2xl shadow-lg border border-gray-100 h-full">
                {/* Replace with your business-specific image */}
                <div className="relative h-64 mb-8 rounded-xl overflow-hidden">
                  <Image
                    src="/beautifulview.png"
                    alt="Our Business Value Proposition"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">
                  Why Choose Us?
                </h3>

                <div className="space-y-4 text-gray-600 mb-6">
                  {/* Benefit 1 - Customize for your business */}
                  <p className="flex items-start">
                    <span className="w-8 h-8 bg-[#85277F] text-white rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      1
                    </span>
                    <span>
                      Tailored solutions designed for your specific needs and
                      goals
                    </span>
                  </p>

                  {/* Benefit 2 - Customize for your business */}
                  <p className="flex items-start">
                    <span className="w-8 h-8 bg-[#85277F] text-white rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      2
                    </span>
                    <span>
                      Access to exclusive offerings and industry-leading
                      expertise
                    </span>
                  </p>

                  {/* Benefit 3 - Customize for your business */}
                  <p className="flex items-start">
                    <span className="w-8 h-8 bg-[#85277F] text-white rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      3
                    </span>
                    <span>
                      Commitment to excellence and customer satisfaction at
                      every step
                    </span>
                  </p>
                </div>

                {/* Contact CTA - Update contact method as needed */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                    <FontAwesomeIcon
                      icon={faPhone} // Can change to faEnvelope or other icon
                      className="text-[#85277F] mr-2"
                    />
                    Get In Touch
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Have questions? Contact us directly at{" "}
                    <span className="text-[#85277F] font-medium">
                      +1 (555) 555-5555
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Luxury FAQ Section */}
      <section className="w-full py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-0.5 bg-[#85277F] mx-auto mb-8" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              Answers to common questions about our services and process
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="mb-4 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeFaq === index
                      ? "bg-white shadow-lg border border-gray-200"
                      : "bg-white shadow-sm border border-gray-100 hover:shadow-md"
                  }`}
                  onClick={() => toggleFaq(index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-800">
                      {faq.question}
                    </h3>
                    <FontAwesomeIcon
                      icon={activeFaq === index ? faChevronUp : faChevronDown}
                      className="text-[#85277F] ml-2"
                    />
                  </div>
                  <motion.div
                    className="overflow-hidden"
                    initial={{ height: 0 }}
                    animate={{ height: activeFaq === index ? "auto" : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="pt-4 text-gray-600">{faq.answer}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
