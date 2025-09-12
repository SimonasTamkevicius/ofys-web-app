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
      className="fixed max-w-full top-0 left-0 right-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        backgroundColor: scrolled
          ? "rgba(255, 255, 255, 1)"
          : "rgba(255, 255, 255, 0.1)",
        backdropFilter: scrolled ? "none" : "blur(8px)",
        boxShadow: scrolled
          ? "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
          : "none",
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        backgroundColor: { duration: 0.3, ease: "easeInOut" },
        backdropFilter: { duration: 0.3, ease: "easeInOut" },
        boxShadow: { duration: 0.3, ease: "easeInOut" },
      }}
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
            animate={{
              color: scrolled ? "#85277F" : "#C4A3C1",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <LogoComponent className="w-12 h-12" />
          </motion.div>
          <div>
            <motion.h4
              className="text-3xl mt-1 font-bold"
              animate={{
                color: scrolled ? "#85277F" : "#C4A3C1",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              OFYS
            </motion.h4>
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
              animate={{
                opacity: 1,
                y: 0,
                color:
                  isActiveTab(label) && scrolled
                    ? "#85277F"
                    : isActiveTab(label) && !scrolled
                    ? "#FCE6F8"
                    : scrolled
                    ? "#1f2937"
                    : "#FCE6F8",
              }}
              transition={{
                duration: 0.6,
                delay: 0.3 + i * 0.1,
                color: { duration: 0.3, ease: "easeInOut" },
              }}
              className="relative font-medium group inline-block"
              whileHover={{
                color: scrolled ? "#85277F" : "#ffffff",
                transition: { duration: 0.2 },
              }}
            >
              {label}
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#D497D4] to-[#B464AF] rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: isActiveTab(label) ? "100%" : 0,
                }}
                whileHover={{
                  width: isActiveTab(label) ? "100%" : "100%",
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.a>
          ))}

          {/* Inquiries Button */}
          <motion.a
            href="/inquiries"
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: 1,
              y: 0,
              background: scrolled
                ? "linear-gradient(to right, #85277F, #9E3A95)"
                : "linear-gradient(to right, rgba(212, 151, 212, 0.3), rgba(180, 100, 175, 0.3))",
              borderColor: scrolled ? "#85277F" : "rgba(250, 223, 247, 0.2)",
            }}
            transition={{
              duration: 0.6,
              delay: 0.7,
              background: { duration: 0.3, ease: "easeInOut" },
              borderColor: { duration: 0.3, ease: "easeInOut" },
            }}
            className="group relative overflow-hidden px-6 py-3 rounded-full font-semibold text-white border"
            whileHover={{
              scale: 1.05,
              background: scrolled
                ? "linear-gradient(to right, #9E3A95, #85277F)"
                : "linear-gradient(to right, rgba(212, 151, 212, 0.5), rgba(180, 100, 175, 0.4))",
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
          >
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
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
        animate={{
          opacity: scrolled ? 0 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        style={{
          transform: "scaleX(1)",
          transformOrigin: "left",
        }}
      />
    </motion.div>
  );
};

export default Navbar;
