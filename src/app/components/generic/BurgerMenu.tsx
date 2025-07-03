"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const lineClass =
    "absolute top-1/2 left-1/2 w-10 h-[3px] bg-current transform rounded -translate-x-1/2 -translate-y-1/2 transition-all duration-300";

  return (
    <div className="relative">
      {/* Burger Icon */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 flex items-center justify-center z-20 cursor-pointer"
      >
        {/* Top Line */}
        <motion.div
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 0 : -12,
          }}
          transition={{
            rotate: {
              duration: 0.2,
              ease: "easeInOut",
              delay: isOpen ? 0.2 : 0,
            },
            y: {
              duration: 0.2,
              ease: "easeInOut",
              delay: isOpen ? 0 : 0.2,
            },
          }}
          className="absolute"
        >
          <motion.span
            className={lineClass}
            animate={{
              backgroundColor: isOpen ? "#000" : "#FFF5EE",
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>

        {/* Middle Line */}
        <motion.span
          className={lineClass}
          animate={{
            opacity: isOpen ? 0 : 1,
            backgroundColor: isOpen ? "#000" : "#FFF5EE",
          }}
          transition={{
            opacity: {
              duration: 0.2,
              delay: isOpen ? 0 : 0.2,
            },
            backgroundColor: {
              duration: 0.2,
              delay: isOpen ? 0.2 : 0,
            },
          }}
        />

        {/* Bottom Line */}
        <motion.div
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? 0 : 12,
          }}
          transition={{
            rotate: {
              duration: 0.2,
              ease: "easeInOut",
              delay: isOpen ? 0.2 : 0,
            },
            y: {
              duration: 0.2,
              ease: "easeInOut",
              delay: isOpen ? 0 : 0.2,
            },
          }}
          className="absolute"
        >
          <motion.span
            className={lineClass}
            animate={{
              backgroundColor: isOpen ? "#000" : "#FFF5EE",
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      </motion.button>

      {/* Slide-out Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              y: "-100%",
              backgroundPosition: "0% 100%",
              opacity: 0,
            }}
            animate={{
              y: 0,
              backgroundPosition: "0% 0%",
              opacity: 1,
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
            exit={{
              y: "-100%",
              backgroundPosition: "0% 100%",
              opacity: 0,
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
            className="fixed top-0 z-10 left-0 w-full h-screen backdrop-blur-lg bg-[#F2F0EF] p-8 overflow-y-auto"
          >
            {/* Logo */}
            <motion.div
              initial={{ y: -40, opacity: 0, filter: "blur(8px)" }}
              animate={{
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                transition: { delay: 0.3, duration: 0.8 },
              }}
              className="fixed top-8 left-8 flex items-center space-x-3 px-4"
            >
              <Image
                src="/OFYSLOGO.svg"
                alt="OFYS Logo"
                width={48}
                height={48}
              />
              <p className="text-[#85277F] text-2xl font-bold">OFYS</p>
            </motion.div>

            {/* Navigation Links */}
            <ul className="mt-32 flex flex-col gap-8 px-4">
              {["Home", "Realty", "Rentals", "About", "Inquiries"].map(
                (label, i) => (
                  <motion.li
                    key={label}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      transition: { duration: 0.5, delay: 0.4 + i * 0.1 },
                    }}
                    className="w-full max-w-md"
                  >
                    <motion.a
                      href={`${
                        label === "Home" ? "/" : `/${label.toLowerCase()}`
                      }`}
                      onClick={() => setIsOpen(false)}
                      className="relative text-xl font-semibold text-[#222] hover:text-[#85277F] transition-colors duration-300"
                    >
                      {label}
                    </motion.a>
                    <div className="overflow-hidden mt-2">
                      <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: "0%" }}
                        transition={{
                          duration: 0.5,
                          ease: "easeOut",
                          delay: 0.5 + i * 0.1,
                        }}
                        className="h-[2px] bg-[#85277F]/70"
                      />
                    </div>
                  </motion.li>
                )
              )}
            </ul>

            {/* Footer Links */}
            <ul className="flex space-x-6 mt-20 px-4 text-lg text-gray-700">
              <motion.li
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.5, delay: 0.9 },
                }}
              >
                <a aria-label="Instagram" href="#">
                  <svg
                    className="text-black hover:text-[#85277F] transition duration-300"
                    fill="currentColor"
                    height="28"
                    width="28"
                    viewBox="0 0 256 256"
                  >
                    <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
                  </svg>
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.5, delay: 0.8 },
                }}
              >
                <a aria-label="Facebook" href="#">
                  <svg
                    className="text-black hover:text-[#85277F] transition duration-300"
                    fill="currentColor"
                    height="28"
                    width="28"
                    viewBox="0 0 256 256"
                  >
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path>
                  </svg>
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.5, delay: 1 },
                }}
              >
                <a aria-label="Twitter" href="#">
                  <svg
                    className="text-black hover:text-[#85277F] transition duration-300"
                    fill="currentColor"
                    height="28"
                    width="28"
                    viewBox="0 0 256 256"
                  >
                    <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path>
                  </svg>
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
