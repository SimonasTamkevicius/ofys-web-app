"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faBuilding,
  faHelmetSafety,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Navbar from "./components/generic/Navbar";
import BlurText from "./animations/BlurText";

const contacts = [
  {
    id: "management",
    icon: "faListCheck",
    title: "OFYS Management",
    email: "Management@ofys.cr",
    description: `For property owners seeking professional, high-end management services, our Property
                  Management branch handles everything from guest coordination and maintenance to
                  revenue optimization and reporting. We specialize in short- and long-term luxury rentals.`,
  },
  {
    id: "realty",
    title: "OFYS Realty",
    email: "Realty@ofys.cr",
    description: `Our Realty branch lists and sells luxury villas, apartments, and development projects in
                  Liberia and surrounding regions. We assist both property owners looking to list and
                  clients looking to buy or invest — including pre-sales and turnkey opportunities.`,
  },
  {
    id: "construction",
    title: "OFYS Construction & Development",
    email: "Construction@ofys.com",
    description: `We offer a complete framework for land development services—from architectural
                  planning and permitting to full-scale construction. Ideal for landowners who want to build
                  residential complexes with a trusted, all-in-one team.`,
  },
];

function HomePage() {
  return (
    <div className="relative min-h-screen">
      <div className="z-50 top-0 w-full relative">
        <Navbar />
      </div>
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url("/costaricacoast.png")` }}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 z-10 bg-black opacity-40"
        aria-hidden="true"
      />
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white p-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center"></h1>

        <BlurText
          text="Welcome to OFYS"
          delay={300}
          animateBy="words"
          direction="bottom"
          className="text-5xl mb-8 font-bold"
        />
      </div>
    </div>
  );
}

export default HomePage;
