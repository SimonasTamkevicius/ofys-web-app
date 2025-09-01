"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LogoComponent from "./LogoComponent";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  progress: number;
  setProgress: (progress: number) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

interface LoadingProviderProps {
  children: React.ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isContentReady, setIsContentReady] = useState(false);

  useEffect(() => {
    const preloadResources = async () => {
      const imageUrls = ["/costaricacoast.jpg", "/OFYSLOGO.svg"];

      try {
        await Promise.all(
          imageUrls.map((url) => {
            return new Promise((resolve) => {
              const img = new window.Image();
              img.onload = resolve;
              img.onerror = resolve;
              img.src = url;
            });
          })
        );
      } catch (error) {
        console.log("Some resources failed to preload:", error);
      }
    };

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 8 + (prev % 3) * 2;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsContentReady(true);
            setIsLoading(false);
          }, 500);
          return 100;
        }
        return next;
      });
    }, 100);

    preloadResources();

    return () => clearInterval(interval);
  }, []);

  const particlePositions = [
    { left: "15%", top: "25%", delay: 0.3 },
    { left: "75%", top: "35%", delay: 0.8 },
    { left: "25%", top: "75%", delay: 1.2 },
    { left: "65%", top: "85%", delay: 1.7 },
    { left: "45%", top: "15%", delay: 0.5 },
    { left: "85%", top: "65%", delay: 1.0 },
    { left: "35%", top: "45%", delay: 1.5 },
    { left: "55%", top: "55%", delay: 0.2 },
  ];

  return (
    <LoadingContext.Provider
      value={{ isLoading, setIsLoading, progress, setProgress }}
    >
      <AnimatePresence mode="wait">
        {!isContentReady ? (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#F9F6F9] via-white to-[#F9F6F9]"
          >
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-[#85277F]/10 to-[#9E3A95]/10 rounded-full blur-3xl animate-pulse"></div>
              <div
                className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-[#9E3A95]/10 to-[#85277F]/10 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-[#85277F]/5 to-[#9E3A95]/5 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>

            {/* Floating particles with deterministic positions */}
            <div className="absolute inset-0 overflow-hidden">
              {particlePositions.map((particle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-[#85277F]/30 rounded-full"
                  style={{
                    left: particle.left,
                    top: particle.top,
                  }}
                  animate={{
                    y: [0, -100, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: particle.delay,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Main loading content */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Logo/Brand */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-8"
              >
                <motion.div
                  className="text-[#85277F]"
                  whileHover={{ scale: 1.05 }}
                >
                  <LogoComponent className="w-12 h-12" />
                </motion.div>
              </motion.div>

              {/* Loading text */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center mb-8"
              >
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  <span className="bg-gradient-to-r from-[#85277F] to-[#9E3A95] bg-clip-text text-transparent">
                    OFYS
                  </span>
                </h1>
                <p className="text-gray-600 text-lg">
                  Loading your Costa Rican paradise...
                </p>
              </motion.div>

              {/* Progress bar */}
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="w-80 max-w-[90vw] mb-4"
              >
                <div className="bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#85277F] to-[#9E3A95] rounded-full relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Progress percentage */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-center"
              >
                <span className="text-2xl font-bold text-[#85277F]">
                  {Math.round(progress)}%
                </span>
              </motion.div>
            </div>

            {/* Bottom decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#85277F] to-transparent rounded-full"
            />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </LoadingContext.Provider>
  );
};
