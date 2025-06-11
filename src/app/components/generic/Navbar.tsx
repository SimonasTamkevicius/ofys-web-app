"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";

const Navbar = () => {
  return (
    <>
      <div className="overflow-hidden w-full">
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: "0%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-[1px] bg-white my-4"
        />
      </div>
      <motion.div animate={{ opacity: 1 }}>
        <nav className="mx-auto max-w-7xl flex items-center justify-around px-6">
          <div className="flex items-center space-x-3">
            <Image
              src="/OFYSLOGO.svg"
              alt="Main OFYS Logo"
              width={50}
              height={50}
              priority
              className="object-contain"
            />
            <div className="hidden md:block">
              <p className="text-[#85277F] font-bold text-2xl">OFYS</p>
            </div>
          </div>

          <ul className="hidden md:flex space-x-8 text-base font-medium text-white">
            {["Home", "About", "Contact"].map((label) => (
              <li key={label}>
                <a
                  href={`/${label.toLowerCase()}`}
                  className="relative transition-all duration-200 font-bold hover:text-[#85277F] after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#85277F] after:transition-all"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </motion.div>

      <div className="overflow-hidden w-full">
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: "0%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-[1px] bg-white my-4"
        />
      </div>
    </>
  );
};

export default Navbar;
