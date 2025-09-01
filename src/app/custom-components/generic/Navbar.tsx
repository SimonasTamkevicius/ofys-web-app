"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import LogoComponent from "./LogoComponent";
import BurgerMenu from "./BurgerMenu";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper function to check if a tab is active
  const isActiveTab = (label: string) => {
    if (label === "Home") return pathname === "/";
    if (label === "Construction Management")
      return pathname === "/construction";
    if (label === "Realty") return pathname === "/realty";
    if (label === "Rentals") return pathname === "/rentals";
    if (label === "About") return pathname === "/about";
    return false;
  };

  return (
    <motion.div
      className={`fixed max-w-full top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white shadow-lg" : "bg-white/10 backdrop-blur-sm"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ minHeight: "80px" }}
    >
      <nav className="max-w-full mx-auto flex items-center justify-between px-6 sm:px-8 lg:px-16 py-4 h-20">
        {/* Logo */}
        <motion.a
          href="/"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center space-x-3 group"
        >
          <motion.div
            className={`transition-colors duration-300 ${
              scrolled ? "text-[#85277F]" : "text-[#C4A3C1]"
            }`}
          >
            <LogoComponent className="w-12 h-12" />
          </motion.div>
          <div>
            <h4
              className={`text-3xl mt-1 font-bold transition-colors duration-300 ${
                scrolled ? "text-[#85277F]" : "text-[#C4A3C1]"
              }`}
            >
              OFYS
            </h4>
          </div>
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {[
            "Home",
            "Realty",
            "Rentals",
            "Construction Management",
            "About",
          ].map((label, i) => (
            <motion.a
              key={label}
              href={`${
                label === "Home"
                  ? "/"
                  : label === "Construction Management"
                  ? "/construction"
                  : `/${label.toLowerCase()}`
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className={`relative font-medium transition-all duration-300 group inline-block ${
                scrolled
                  ? "text-gray-800 hover:text-[#85277F]"
                  : "text-[#FCE6F8] hover:text-white"
              } ${isActiveTab(label) ? "text-[#85277F] font-semibold" : ""}`}
            >
              {label}
              <div
                className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-500 ease-out bg-gradient-to-r from-[#D497D4] to-[#B464AF] rounded-full ${
                  isActiveTab(label) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </motion.a>
          ))}

          {/* Inquiries Button */}
          <motion.a
            href="/inquiries"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className={`group relative overflow-hidden px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              scrolled
                ? "bg-gradient-to-r from-[#85277F] to-[#9E3A95] border border-[#85277F] text-white"
                : "bg-gradient-to-r from-[#D497D4]/30 to-[#B464AF]/30 text-white border border-[#FADFF7]/20"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                scrolled
                  ? "bg-gradient-to-r from-[#9E3A95] to-[#85277F]"
                  : "bg-gradient-to-r from-[#D497D4]/50 to-[#B464AF]/40"
              }`}
            />
            <span className="relative">Inquiries</span>
          </motion.a>
        </div>

        {/* Mobile Burger Menu */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:hidden flex items-center"
        >
          <BurgerMenu scrolled={scrolled} />
        </motion.div>
      </nav>

      {/* Animated bottom border */}
      <div
        className={`h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent transition-opacity duration-500 ${
          scrolled ? "opacity-0" : "opacity-100"
        }`}
        style={{
          transform: "scaleX(1)",
          transformOrigin: "left",
        }}
      />
    </motion.div>
  );
};

export default Navbar;
