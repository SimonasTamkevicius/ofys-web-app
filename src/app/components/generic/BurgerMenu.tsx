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
        className="relative w-10 h-10 flex items-center justify-center z-50 cursor-pointer"
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
            className="fixed top-0 left-0 w-full h-screen backdrop-blur-lg bg-[#F2F0EF] p-8 overflow-y-auto"
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
                className="h-12 w-12"
              />
              <p className="text-[#85277F] text-2xl font-bold">OFYS</p>
            </motion.div>

            {/* Navigation Links */}
            <ul className="mt-32 flex flex-col gap-8 px-4">
              {["Home", "About", "Rentals", "Contact"].map((label, i) => (
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
                    href={`/${label.toLowerCase()}`}
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
              ))}
            </ul>

            {/* Footer Links */}
            <ul className="flex space-x-6 mt-20 px-4 text-lg text-gray-700">
              <motion.li
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.5, delay: 0.8 },
                }}
              >
                <a
                  href="https://facebook.com/ofys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#85277F] transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                  >
                    <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.333v21.333C0 23.403.597 24 1.325 24H12v-9.294H9.294v-3.622H12V8.414c0-2.671 1.63-4.129 4.004-4.129 1.138 0 2.117.085 2.401.123v2.785h-1.645c-1.29 0-1.539.614-1.539 1.515v1.987h3.082l-.402 3.622h-2.68V24h5.256c.727 0 1.324-.597 1.324-1.333V1.333C24 .597 23.403 0 22.675 0z" />
                  </svg>
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.5, delay: 0.9 },
                }}
              >
                <a
                  href="https://instagram.com/ofys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#85277F] transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
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
                <a
                  href="https://twitter.com/ofys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#85277F] transition-colors duration-300"
                  aria-label="Twitter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14.86A4.48 4.48 0 0 0 22.4.36a9.07 9.07 0 0 1-2.88 1.1 4.48 4.48 0 0 0-7.64 4.09 12.71 12.71 0 0 1-9.23-4.67 4.48 4.48 0 0 0 1.38 6A4.42 4.42 0 0 1 2 9v.05a4.48 4.48 0 0 0 3.6 4.4 4.48 4.48 0 0 1-2 .07 4.48 4.48 0 0 0 4.19 3.12A9 9 0 0 1 1 19.54a12.68 12.68 0 0 0 6.88 2.01c8.25 0 12.77-6.83 12.77-12.75 0-.2 0-.42-.02-.62A9.18 9.18 0 0 0 23 3z" />
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
