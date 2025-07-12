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
      const remainingTime = Math.max(0, 500 - elapsed);

      setFinalProgressDuration(remainingTime);
      setProgress(100); // Trigger final bar fill
      setTimeout(() => setLoading(false), remainingTime);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  // Optional: Fake slow progress to ~80% while waiting for load
  useEffect(() => {
    if (!loading || progress >= 80) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 80) {
          clearInterval(interval);
          return prev;
        }
        return prev + Math.random() * 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [loading, progress]);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center px-6"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="text-3xl md:text-4xl font-extrabold text-[#85277F] mb-8 tracking-wide"
              initial={{ opacity: 0.7, scale: 0.9 }}
              animate={{
                scale: [0.95, 1.05, 0.95],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              OFYS
            </motion.div>

            <div className="w-full max-w-sm h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-[#85277F]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{
                  ease: "linear",
                  duration: finalProgressDuration / 1000 || 0.3,
                }}
              />
            </div>

            <div className="text-sm text-gray-500 mt-4">
              Loading resources...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={loading ? "pointer-events-none" : ""}
      >
        {children}
      </motion.div>
    </>
  );
}
