import React, { forwardRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

interface LandingScreenProps {
  welcomeTextBlur: MotionValue<string>;
}

const LandingScreen = forwardRef<HTMLDivElement, LandingScreenProps>(
  ({ welcomeTextBlur }, ref) => {
    // Enhanced parallax with smoother movement
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 300], [0, 60], { clamp: false });

    // Floating particles configuration - fixed values to prevent hydration issues
    const particles = [
      { id: 0, size: 3, delay: 0.2, duration: 5, position: { x: 15, y: 25 } },
      { id: 1, size: 4, delay: 0.8, duration: 6, position: { x: 75, y: 35 } },
      { id: 2, size: 2, delay: 1.2, duration: 4, position: { x: 25, y: 75 } },
      { id: 3, size: 5, delay: 1.7, duration: 7, position: { x: 65, y: 85 } },
      { id: 4, size: 3, delay: 0.5, duration: 5.5, position: { x: 45, y: 15 } },
      { id: 5, size: 4, delay: 1.0, duration: 6.5, position: { x: 85, y: 65 } },
      { id: 6, size: 2, delay: 1.5, duration: 4.5, position: { x: 35, y: 45 } },
      { id: 7, size: 3, delay: 0.3, duration: 5.2, position: { x: 55, y: 55 } },
      { id: 8, size: 4, delay: 0.9, duration: 6.2, position: { x: 20, y: 60 } },
      { id: 9, size: 2, delay: 1.3, duration: 4.8, position: { x: 80, y: 20 } },
      {
        id: 10,
        size: 3,
        delay: 0.6,
        duration: 5.8,
        position: { x: 40, y: 80 },
      },
      {
        id: 11,
        size: 4,
        delay: 1.1,
        duration: 6.8,
        position: { x: 70, y: 40 },
      },
    ];

    return (
      <div ref={ref} className="relative h-screen w-full overflow-hidden">
        {/* Premium background image with subtle zoom effect */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/costaricavilla.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            scale: useTransform(scrollY, [0, 300], [1, 1.1]),
          }}
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 z-10 bg-black opacity-50"
          aria-hidden="true"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Animated shimmer overlay */}
        <motion.div
          className="absolute inset-0 z-15 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(133, 39, 127, 0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(133, 39, 127, 0.08) 100%)",
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Luxury floating particles */}
        <div className="absolute inset-0 z-15 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-white/20 backdrop-blur-sm"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.position.x}%`,
                top: `${particle.position.y}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Content with refined typography */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <motion.div
            style={{ filter: welcomeTextBlur, y }}
            className="flex flex-col items-center justify-center text-center px-6 max-w-5xl"
          >
            <motion.div
              className="flex flex-col items-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.p
                className="text-lg md:text-xl text-[#FFF5EE] tracking-[0.3em] mb-2 flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
              >
                {"WELCOME TO".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{
                      opacity: 0,
                      y: 24,
                      filter: "blur(8px)",
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 0.8,
                      y: 0,
                      filter: "blur(0px)",
                      scale: 1,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.4 + i * 0.05,
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.p>
              <motion.div
                className="w-16 h-px bg-gradient-to-r from-transparent via-[#E5D9E4] to-transparent"
                initial={{
                  scaleX: 0,
                  originX: 0.5,
                  opacity: 0,
                }}
                animate={{
                  scaleX: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.9,
                }}
              />
            </motion.div>

            {/* Main headline with luxurious typography */}
            <motion.h1
              initial={{ opacity: 0, y: 48, scale: 0.96, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{
                duration: 1.8,
                ease: [0.33, 1, 0.68, 1],
                delay: 0.8,
              }}
              className="text-5xl md:text-6xl lg:text-7xl leading-[1.15] tracking-tight text-white"
            >
              The Heart of{" "}
              <span className="block mt-4 bg-gradient-to-r from-[#E5D9E4] via-[#D8BFD5] to-[#C4A3C1] bg-clip-text text-transparent">
                Costa Rica
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mt-8 max-w-2xl text-lg md:text-xl text-[#FFF5EE]/80 font-light leading-relaxed"
            >
              Experience unparalleled luxury in our exclusive beachfront villas,
              where modern elegance meets tropical paradise.
            </motion.p>

            {/* Luxury booking button */}
            <motion.div
              initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                type: "spring",
                stiffness: 50,
                damping: 10,
                delay: 1.5,
              }}
              className="mt-12"
            >
              <motion.a
                href="#"
                className="group relative overflow-hidden px-8 py-4 rounded-full font-medium text-white"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background:
                    "linear-gradient(135deg, #85277F 0%, #9E3A95 100%)",
                  boxShadow: "0 10px 30px rgba(133, 39, 127, 0.4)",
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#9E3A95] to-[#85277F] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center gap-3 tracking-wider text-sm md:text-base">
                  RESERVE YOUR VILLA
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }
);

LandingScreen.displayName = "LandingScreen";

export default LandingScreen;
