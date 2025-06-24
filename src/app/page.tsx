"use client";

import React, { useRef } from "react";

import { useScroll, useTransform } from "framer-motion";
import LandingScreen from "./components/LandingScreen";
import GeneralInfo from "./components/GeneralInfo";
import ImageCar

function HomePage() {
  const landingScreenRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: landingScreenRef,
    offset: ["end end", "end start"],
  });

  const navbarBlur = useTransform(
    scrollYProgress,
    [0, 0.25],
    ["blur(0px)", "blur(5px)"]
  );

  const welcomeTextBlur = useTransform(
    scrollYProgress,
    [0.1, 0.7],
    ["blur(0px)", "blur(8px)"]
  );

  return (
    <div>
      {/* Landing page section */}
      <div className="h-[100vh]">
        <LandingScreen
          ref={landingScreenRef}
          navbarBlur={navbarBlur}
          welcomeTextBlur={welcomeTextBlur}
        />
      </div>
      <div className="h-[100vh]">
        <GeneralInfo />
      </div>
      <div className="h-[100vh]">
        <ImageCarousel />
      </div>
    </div>
  );
}

export default HomePage;
