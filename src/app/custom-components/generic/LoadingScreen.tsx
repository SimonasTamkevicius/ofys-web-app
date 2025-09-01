"use client";

import { useEffect, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

type LoadingScreenProps = {
  children: ReactNode;
};

export default function LoadingScreen({ children }: LoadingScreenProps) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [finalProgressDuration, setFinalProgressDuration] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, 800 - elapsed);
      setFinalProgressDuration(remainingTime);
      setProgress(100);
      setTimeout(() => setLoading(false), remainingTime);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  // Smooth progress animation
  useEffect(() => {
    if (!loading || progress >= 85) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) {
          clearInterval(interval);
          return prev;
        }
        return prev + Math.random() * 3; // Slower, smoother progression
      });
    }, 200);

    return () => clearInterval(interval);
  }, [loading, progress]);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 bg-[#F9F6F9] z-[9999] flex flex-col items-center justify-center px-6"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            }}
          >
            {/* Luxury background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#85277F]/10 blur-[80px]"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#9E3A95]/10 blur-[80px]"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </div>

            {/* Animated logo */}
            <motion.div
              className="relative z-10 text-5xl md:text-6xl font-serif font-medium mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="bg-gradient-to-r from-[#85277F] via-[#9E3A95] to-[#C4A3C1] bg-clip-text text-transparent">
                OFYS
              </span>
            </motion.div>

            {/* Luxury progress bar */}
            <div className="w-full max-w-md h-1.5 bg-white/30 rounded-full overflow-hidden shadow-inner relative z-10">
              <motion.div
                className="h-full bg-gradient-to-r from-[#85277F] to-[#9E3A95] relative"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{
                  ease: [0.16, 1, 0.3, 1],
                  duration: finalProgressDuration / 1000 || 0.5,
                }}
              >
                <motion.div
                  className="absolute right-0 top-0 h-full w-1 bg-white"
                  animate={{
                    opacity: [0, 0.8, 0],
                    x: [-10, 0, 10],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>

            {/* Animated percentage */}
            <motion.div
              className="text-sm text-[#85277F]/80 mt-6 font-light tracking-wider relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.span
                key={progress}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                {Math.round(progress)}%
              </motion.span>
              <span> LOADING</span>
            </motion.div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-[#85277F]/20"
                  style={{
                    width: `${Math.random() * 6 + 2}px`,
                    height: `${Math.random() * 6 + 2}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -100, -200],
                    x: [0, Math.random() * 40 - 20],
                    opacity: [0.3, 0.8, 0],
                    scale: [1, 1.5, 0.5],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    delay: Math.random() * 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.2,
        }}
        className={loading ? "pointer-events-none" : ""}
      >
        {children}
      </motion.div>
    </>
  );
}
