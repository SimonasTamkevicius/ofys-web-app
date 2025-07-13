"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/generic/Navbar";
import Footer from "../components/generic/Footer";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden items-center bg-[#F9F6F9]">
      {/* Background Section */}
      <div className="relative min-h-screen w-full flex-grow">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url("/contactbg1.png")` }}
          aria-hidden="true"
        />

        {/* Dark overlay for text contrast */}
        <div
          className="absolute inset-0 bg-black opacity-50"
          aria-hidden="true"
        />

        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(45deg, rgba(133, 39, 127, 0.05), rgba(255, 255, 255, 0.02), rgba(133, 39, 127, 0.05))"
          }}
          animate={{
            background: [
              "linear-gradient(45deg, rgba(133, 39, 127, 0.05), rgba(255, 255, 255, 0.02), rgba(133, 39, 127, 0.05))",
              "linear-gradient(45deg, rgba(133, 39, 127, 0.02), rgba(255, 255, 255, 0.05), rgba(133, 39, 127, 0.02))",
              "linear-gradient(45deg, rgba(133, 39, 127, 0.05), rgba(255, 255, 255, 0.02), rgba(133, 39, 127, 0.05))",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[
            { left: "15%", top: "25%", delay: 0, duration: 4.2 },
            { left: "85%", top: "35%", delay: 0.5, duration: 5.1 },
            { left: "25%", top: "75%", delay: 1.0, duration: 4.8 },
            { left: "75%", top: "85%", delay: 1.5, duration: 5.3 },
            { left: "50%", top: "40%", delay: 2.0, duration: 4.5 },
            { left: "30%", top: "60%", delay: 2.5, duration: 5.0 }
          ].map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: particle.left,
                top: particle.top,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F9F6F9] to-transparent" />

        {/* Navbar */}
        <div className="relative z-10">
          <Navbar />
        </div>

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/3 text-center px-4 max-w-4xl w-full"
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Let&apos;s Start a
            <span className="block bg-gradient-to-r from-[#E5D9E4] to-[#C4A3C1] bg-clip-text text-transparent">
              Conversation
            </span>
          </motion.h1>
          <motion.p 
            className="mt-6 text-lg sm:text-xl md:text-2xl text-white/90 drop-shadow-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Have questions about our properties? Ready to find your perfect home in Costa Rica? 
            We&apos;re here to help make your dreams a reality.
          </motion.p>
          
          
        </motion.div>
      </div>

      {/* Contact Section */}
      <motion.main
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        className="relative w-full bg-gradient-to-br from-gray-50 to-white py-20"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          {/* Quick Preview - Contact Options */}
          <motion.div
            className="mb-16 -mt-[40vh]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100">
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  How Can We Help You?
                </h3>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Choose your preferred way to connect with us. Whether you have questions about properties, 
                  want to schedule a call, or need personalized assistance, we&apos;re here to help.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Email */}
                <motion.div 
                  className="group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col items-center text-center p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105" style={{ background: "linear-gradient(to right, #F9F6F9, #F4EFF4)", border: "1px solid #E5D9E4" }}>
                    <motion.div 
                      className="p-4 text-white rounded-xl shadow-lg mb-4"
                      style={{ background: "linear-gradient(to bottom right, #85277F, #9E3A95)" }}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-semibold mb-1" style={{ color: "#85277F" }}>Email Us</p>
                      <p className="font-semibold text-gray-800 text-lg">info@ofys.com</p>
                      <p className="text-gray-500 text-sm mt-1">We&apos;ll respond within 24 hours</p>
                    </div>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div 
                  className="group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col items-center text-center p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105" style={{ background: "linear-gradient(to right, #F9F6F9, #F4EFF4)", border: "1px solid #E5D9E4" }}>
                    <motion.div 
                      className="p-4 text-white rounded-xl shadow-lg mb-4"
                      style={{ background: "linear-gradient(to bottom right, #85277F, #9E3A95)" }}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FontAwesomeIcon icon={faPhone} className="h-5 w-5" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-semibold mb-1" style={{ color: "#85277F" }}>Call Us</p>
                      <p className="font-semibold text-gray-800 text-lg">+1 (111) 111-1111</p>
                      <p className="text-gray-500 text-sm mt-1">Mon-Fri 9AM-6PM CST</p>
                    </div>
                  </div>
                </motion.div>

                {/* Location */}
                <motion.div 
                  className="group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col items-center text-center p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105" style={{ background: "linear-gradient(to right, #F9F6F9, #F4EFF4)", border: "1px solid #E5D9E4" }}>
                    <motion.div 
                      className="p-4 text-white rounded-xl shadow-lg mb-4"
                      style={{ background: "linear-gradient(to bottom right, #85277F, #9E3A95)" }}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="h-5 w-5" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-semibold mb-1" style={{ color: "#85277F" }}>Visit Us</p>
                      <p className="font-semibold text-gray-800 text-lg">San José, Costa Rica</p>
                      <p className="text-gray-500 text-sm mt-1">Pura Vida awaits you</p>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <div className="text-center">
                <p className="text-gray-600 mb-6 text-lg">
                  These are just some ways to get in touch. Scroll down to see our full contact options.
                </p>
                <motion.div
                  className="inline-flex flex-col items-center gap-2 text-[#85277F]"
                  whileHover={{ y: 2 }}
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-sm font-medium">View All Contact Options</span>
                  <motion.div
                    className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Additional Content */}
            <motion.section 
              className="flex flex-col space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div>
                <motion.h2 
                  className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Why Choose OFYS?
                </motion.h2>
                <motion.p 
                  className="text-gray-600 text-lg leading-relaxed max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  We&apos;re not just another real estate company. We&apos;re your partners in finding the perfect 
                  piece of paradise in Costa Rica, with personalized service and local expertise.
                </motion.p>
              </div>

              <div className="space-y-6">
                <motion.div 
                  className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ background: "linear-gradient(to right, #F9F6F9, #F4EFF4)", border: "1px solid #E5D9E4" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-semibold text-gray-800 mb-2">Local Expertise</h4>
                  <p className="text-gray-600 text-sm">Deep knowledge of Costa Rica&apos;s real estate market and local communities.</p>
                </motion.div>

                <motion.div 
                  className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ background: "linear-gradient(to right, #F9F6F9, #F4EFF4)", border: "1px solid #E5D9E4" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-semibold text-gray-800 mb-2">Personalized Service</h4>
                  <p className="text-gray-600 text-sm">Tailored approach to match your lifestyle and investment goals.</p>
                </motion.div>

                <motion.div 
                  className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ background: "linear-gradient(to right, #F9F6F9, #F4EFF4)", border: "1px solid #E5D9E4" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-semibold text-gray-800 mb-2">Full Support</h4>
                  <p className="text-gray-600 text-sm">From property search to closing, we&apos;re with you every step of the way.</p>
                </motion.div>
              </div>
            </motion.section>

            {/* Contact Form */}
            <motion.section 
              className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h3 className="text-3xl font-bold text-gray-800 mb-2">Send us a Message</h3>
                <p className="text-gray-600">Tell us about your dream property</p>
              </motion.div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="name" className="block font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full h-14 px-4 rounded-xl border-2 border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#85277F] focus:border-[#85277F] transition-all duration-300 hover:border-gray-300"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="email" className="block font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="w-full h-14 px-4 rounded-xl border-2 border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#85277F] focus:border-[#85277F] transition-all duration-300 hover:border-gray-300"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="subject" className="block font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What&apos;s this about?"
                    className="w-full h-14 px-4 rounded-xl border-2 border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#85277F] focus:border-[#85277F] transition-all duration-300 hover:border-gray-300"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <label htmlFor="message" className="block font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your dream property, timeline, budget, or any questions you have..."
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#85277F] focus:border-[#85277F] transition-all duration-300 hover:border-gray-300 resize-none"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                  className="flex justify-end"
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                    style={{ background: "linear-gradient(to right, #85277F, #9E3A95)" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(to right, #9E3A95, #85277F)" }}
                    />
                    <span className="relative flex items-center gap-2">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-3 h-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.div>
              </form>
            </motion.section>
          </div>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default ContactPage;
