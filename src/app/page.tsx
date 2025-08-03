"use client";

import React, { useRef } from "react";

import { useScroll, useTransform } from "framer-motion";
import Navbar from "./components/generic/Navbar";
import LandingScreen from "./components/HomePage/LandingScreen";
import GeneralInfo from "./components/HomePage/GeneralInfo";
import ImageBanner from "./components/HomePage/generic/ImageBanner";
import Services from "./components/HomePage/Services";
import AboutHP from "./components/HomePage/AboutHP";
import Reviews from "./components/HomePage/Reviews";

function HomePage() {
  const landingScreenRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: landingScreenRef,
    offset: ["end end", "end start"],
  });

  const welcomeTextBlur = useTransform(
    scrollYProgress,
    [0.1, 0.7],
    ["blur(0px)", "blur(8px)"]
  );

  return (
    // <LoadingScreen>
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Landing page section */}
      <div className="min-h-[100vh] flex relative">
        <LandingScreen
          ref={landingScreenRef}
          welcomeTextBlur={welcomeTextBlur}
        />
      </div>

      {/* General Info - Default background */}
      <div className="flex relative bg-[#F9F6F9]">
        <GeneralInfo />
      </div>

      {/* Image Banner - White background */}
      <div className="bg-white">
        <ImageBanner />
      </div>

      {/* Services - Default background */}
      <div className="relative bg-[#F9F6F9]">
        <Services />
      </div>

      {/* About - White background */}
      <div className="relative bg-white">
        <AboutHP />
      </div>

      <div className="flex relative">
        <Reviews />
      </div>
    </div>
    // </LoadingScreen>
  );
}

export default HomePage;
