"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  // Only show after hero animations complete
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Fade out when user starts scrolling
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 20]);

  return (
    <motion.div
      className="absolute bottom-24 md:bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-none"
      style={{ opacity, y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center">
        {/* Enhanced progress track with glow effect */}
        <div className="h-20 w-0.5 bg-gray-300/20 mb-3 relative overflow-hidden rounded-full">
          <motion.div
            className="w-full h-full bg-gradient-to-t from-[#E5D9E4] to-[#C4A3C1] relative"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              delay: 1.5,
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-[#E5D9E4] opacity-20 blur-[6px] rounded-full" />
          </motion.div>
        </div>

        {/* Luxurious animated chevron with floating effect */}
        <motion.div
          className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm bg-white/10 border border-[#E5D9E4]/30"
          animate={{
            y: [0, 5, 0],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            delay: 1.7,
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="text-[#E5D9E4]"
          >
            <path
              d="M7 10L12 15L17 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* Subtle "scroll" text */}
        <motion.p
          className="text-xs tracking-widest text-[#E5D9E4]/80 mt-2 font-light uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          Scroll
        </motion.p>
      </div>
    </motion.div>
  );
};

export default ScrollIndicator;
