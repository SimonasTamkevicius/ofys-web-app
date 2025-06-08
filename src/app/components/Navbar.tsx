"use client";

import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="w-full top-0 z-50 backdrop-blur-md bg-white opacity-95 shadow-sm">
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
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

        <ul className="hidden md:flex space-x-8 text-base font-medium text-[#1A1A1A]">
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
    </div>
  );
};

export default Navbar;
