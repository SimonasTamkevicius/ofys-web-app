"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CursorFollower = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const mouseX = useMotionValue(mousePos.x);
  const mouseY = useMotionValue(mousePos.y);

  const springConfig = { damping: 20, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    mouseX.set(mousePos.x);
    mouseY.set(mousePos.y);
  }, [mousePos, mouseX, mouseY]);

  return (
    <motion.svg
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      width="40"
      height="40"
      viewBox="0 0 40 40"
    >
      <polygon
        points="15,15 30,30 0,30"
        fill="none"
        stroke="#85277F"
        strokeWidth="2"
      />
      {/* Outer ring */}
      <circle
        cx="20"
        cy="20"
        r="15"
        fill="none"
        stroke="#85277F"
        strokeWidth="2"
      />
      {/* Inner dot */}
      <circle cx="20" cy="20" r="3" fill="#85277F" />
    </motion.svg>
  );
};

export default CursorFollower;
