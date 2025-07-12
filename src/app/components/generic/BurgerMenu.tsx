"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface BurgerMenuProps {
  scrolled: boolean;
}

export default function BurgerMenu({ scrolled }: BurgerMenuProps) {
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
    "absolute top-1/2 left-1/2 w-10 h-[3px] transform rounded -translate-x-1/2 -translate-y-1/2 transition-all duration-300";

  return (
    <div className="relative">
      {/* Burger Icon */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 flex items-center justify-center z-100 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
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
              backgroundColor: isOpen ? "#85277F" : (scrolled ? "#85277F" : "#FFF5EE"),
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>

        {/* Middle Line */}
        <motion.span
          className={lineClass}
          animate={{
            opacity: isOpen ? 0 : 1,
            backgroundColor: isOpen ? "#85277F" : (scrolled ? "#85277F" : "#FFF5EE"),
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
              backgroundColor: isOpen ? "#85277F" : (scrolled ? "#85277F" : "#FFF5EE"),
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
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 0.4, ease: "easeOut" },
            }}
            exit={{
              y: "-100%",
              opacity: 0,
              transition: { duration: 0.4, ease: "easeIn" },
            }}
            className="fixed top-0 z-99 left-0 w-full h-screen bg-white backdrop-blur-md p-8 overflow-y-auto"
          >
            {/* Logo */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { delay: 0.2, duration: 0.5 },
              }}
              className="flex items-center space-x-3 mb-20"
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
            <ul className="space-y-8 mb-16">
              {["Home", "Realty", "Rentals", "About", "Inquiries"].map(
                (label, i) => (
                  <motion.li
                    key={label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{
                      x: 0,
                      opacity: 1,
                      transition: { delay: 0.3 + i * 0.1, duration: 0.5 },
                    }}
                  >
                    <motion.a
                      href={`${
                        label === "Home" ? "/" : `/${label.toLowerCase()}`
                      }`}
                      onClick={() => setIsOpen(false)}
                      className="text-2xl font-medium text-gray-800 hover:text-[#85277F] transition-all duration-300 relative group"
                    >
                      {label}
                      <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#85277F] to-[#9E3A95] w-0 group-hover:w-full transition-all duration-300"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                      />
                    </motion.a>
                  </motion.li>
                )
              )}
            </ul>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{
                opacity: 1,
                scaleX: 1,
                transition: { delay: 0.8, duration: 0.5 },
              }}
              className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-12"
            />

            {/* Social Links */}
            <div className="flex space-x-8">
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.9 },
                }}
                href="#"
                className="text-gray-600 hover:text-[#85277F] transition-all duration-300 hover:scale-110"
              >
                <svg
                  fill="currentColor"
                  height="28"
                  width="28"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
                </svg>
              </motion.a>
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 1.0 },
                }}
                href="#"
                className="text-gray-600 hover:text-[#85277F] transition-all duration-300 hover:scale-110"
              >
                <svg
                  fill="currentColor"
                  height="28"
                  width="28"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path>
                </svg>
              </motion.a>
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 1.1 },
                }}
                href="#"
                className="text-gray-600 hover:text-[#85277F] transition-all duration-300 hover:scale-110"
              >
                <svg
                  fill="currentColor"
                  height="28"
                  width="28"
                  viewBox="0 0 256 256"
                >
                  <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path>
                </svg>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
