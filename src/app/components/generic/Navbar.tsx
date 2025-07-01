"use client";

import React from "react";
import { motion } from "motion/react";
import LogoComponent from "./LogoComponent";
import BurgerMenu from "./BurgerMenu";

const Navbar = () => {
  return (
    <div className=" text-white w-full z-50 ">
      {/* Horizontal line animation */}
      <div className="overflow-hidden w-full">
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: "0%" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-[1px] bg-[#FFF5EE] my-4"
        />
      </div>
      <motion.div>
        <nav className="mx-auto flex items-center justify-between md:justify-around px-8">
          {/* Logo div */}
          <motion.a
            href="/"
            initial={{ opacity: 0, x: -35 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.6, delay: 0.5 },
            }}
            className="flex items-center space-x-3"
          >
            <div className="text-[#FFF5EE]">
              <LogoComponent className="w-13 h-13" />
            </div>
            <div>
              <p className="text-[#FFF5EE] text-2xl">OFYS</p>
            </div>
          </motion.a>

          {/* Burger menu for mobile */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.6, delay: 0.5 },
            }}
            className="relative md:hidden flex items-center mr-5"
          >
            <BurgerMenu />
          </motion.div>
          {/* Navigation links */}
          <ul className="hidden md:flex space-x-10 text-base font-bold text-white justify-center items-center">
            {["Home", "Realty", "Rentals", "About"].map((label, i) => (
              <motion.li
                key={label}
                initial={{ x: 35, opacity: 0 }}
                animate={{
                  x: 0,
                  opacity: 1,
                  transition: { duration: 0.6, delay: 0.5 + i * 0.1 },
                }}
              >
                <a
                  href={`${label === "Home" ? "/" : `/${label.toLowerCase()}`}`}
                  className="relative text-md after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-white after:transition-all"
                >
                  {label}
                </a>
              </motion.li>
            ))}

            {/* Inquiries button */}
            <motion.li>
              <motion.a
                href="/inquiries"
                initial={{ x: 35, opacity: 0 }}
                animate={{
                  x: 0,
                  opacity: 1,
                  transition: { duration: 0.6, delay: 0.8 },
                }}
                style={{
                  backgroundImage:
                    "linear-gradient(to left, #85277F 50%, transparent 50%)",
                  backgroundSize: "200% 200%",
                  backgroundPosition: "0% 0%",

                  border: "1px solid white",
                }}
                whileHover={{
                  backgroundPosition: "-100% 0%",
                  color: "#fff",
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="relative px-4 py-2 text-white font-bold overflow-hidden inline-block rounded-lg"
              >
                Inquiries
              </motion.a>
            </motion.li>
          </ul>
        </nav>
      </motion.div>

      {/* Horizontal line animation */}
      <div className="overflow-hidden w-full">
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: "0%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-[1px] bg-[#FFF5EE] my-4"
        />
      </div>
    </div>
  );
};

export default Navbar;
