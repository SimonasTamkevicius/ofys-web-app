"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
// import LogoComponent from "./LogoComponent";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  progress: number;
  setProgress: (progress: number) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
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
      const imageUrls = [
        "/costaricavilla.jpg",
        "/costaricacoast.jpg",
        "/OFYSLOGO.svg",
        "/bannerimage.png.webp",
      ];

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
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F9F6F9]"
          >
            {/* Luxury background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#85277F]/10 blur-[80px] animate-pulse"></div>
              <div
                className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#9E3A95]/10 blur-[80px] animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>

            {/* Animated logo */}
            <div className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-serif font-medium mb-8 sm:mb-12">
              <span className="bg-gradient-to-r from-[#85277F] via-[#9E3A95] to-[#C4A3C1] bg-clip-text text-transparent">
                OFYS
              </span>
            </div>

            {/* Luxury progress bar */}
            <div className="w-3/4 sm:w-2/3 md:w-1/2 lg:max-w-md h-1.5 bg-white/30 rounded-full overflow-hidden shadow-inner relative z-10 mb-6">
              <div
                className="h-full bg-gradient-to-r from-[#85277F] to-[#9E3A95] transition-all duration-500 ease-out"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            {/* Loading text */}
            <div className="text-xs sm:text-sm text-[#85277F]/80 font-light tracking-wider relative z-10">
              <span>{Math.round(progress)}% LOADING</span>
            </div>

            {/* Floating particles - Safari optimized */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[
                { left: "15%", top: "25%", size: 4, delay: 0.3, duration: 12 },
                { left: "75%", top: "35%", size: 6, delay: 0.8, duration: 15 },
                { left: "25%", top: "75%", size: 3, delay: 1.2, duration: 18 },
                { left: "65%", top: "85%", size: 5, delay: 1.7, duration: 14 },
                { left: "45%", top: "15%", size: 4, delay: 0.5, duration: 16 },
                { left: "85%", top: "65%", size: 3, delay: 1.0, duration: 13 },
                { left: "35%", top: "45%", size: 5, delay: 1.5, duration: 17 },
                { left: "55%", top: "55%", size: 4, delay: 0.2, duration: 11 },
              ].map((particle, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-[#85277F]/20 animate-bounce"
                  style={{
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    left: particle.left,
                    top: particle.top,
                    animationDelay: `${particle.delay}s`,
                    animationDuration: `${particle.duration}s`,
                    willChange: "transform, opacity",
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                  }}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </LoadingContext.Provider>
  );
};
