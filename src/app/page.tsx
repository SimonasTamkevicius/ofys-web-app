"use client";

import React, { useRef } from "react";

import { useScroll, useTransform } from "framer-motion";
import LandingScreen from "./components/HomePage/LandingScreen";
import GeneralInfo from "./components/HomePage/GeneralInfo";
import ImageBanner from "./components/HomePage/generic/ImageBanner";
import Services from "./components/HomePage/Services";
import AboutHP from "./components/HomePage/AboutHP";

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
    <div className="flex flex-col min-h-screen">
      {/* Landing page section */}
      <div className="min-h-[100vh] flex relative">
        <LandingScreen
          ref={landingScreenRef}
          navbarBlur={navbarBlur}
          welcomeTextBlur={welcomeTextBlur}
        />
      </div>
      <div className="min-h-[100vh] flex relative">
        <GeneralInfo />
      </div>
      <div>
        <ImageBanner />
      </div>
      <div className="relative">
        <Services />
      </div>
      <div className="relative">
        <AboutHP />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default HomePage;
