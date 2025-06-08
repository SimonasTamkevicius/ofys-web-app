"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faBuilding,
  faHelmetSafety,
} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Navbar from "./components/Navbar";

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
        <h1 className="text-6xl font-bold text-center z-10">Welcome to OFYS</h1>
        <p className="text-lg md:text-xl text-center mt-4 z-10 opacity-80">
          Optimal Framework for Your Success
        </p>
        <div className="relative z-20 mt-5 w-full">
          <div className="bg-[#F5EBF3] border-l-4 border-[#792373] text-[#792373] p-6 rounded-xl shadow-lg max-w-3xl mx-auto flex items-center gap-4">
            <FontAwesomeIcon
              icon={faHelmetSafety}
              className="text-[#792373] text-4xl"
            />
            <div>
              <h3 className="text-2xl font-bold mb-1">
                Website Under Construction
              </h3>
              <p className="text-lg">
                We&apos;re working hard to finish the development of this site.
                Stay tuned!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 w-full px-4 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-8 max-w-7xl mx-auto">
          {contacts.map((contact, index) => {
            const icon =
              index === 0
                ? faListCheck
                : index === 1
                ? faBuilding
                : faHelmetSafety;

            return (
              <div
                key={contact.id}
                className="flex flex-col justify-between bg-[#F3F3F3] border border-[#E0E0E0] opacity-95 rounded-2xl p-6 shadow-md text-center w-full"
              >
                <FontAwesomeIcon
                  icon={icon}
                  className="text-[#85277F] text-3xl mb-4"
                />

                <h2 className="text-[#1A1A1A] text-2xl font-semibold">
                  {contact.title}
                </h2>
                <p className="text-[#999] my-4">{contact.description}</p>
                <div className="flex items-center justify-center mt-4">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-[#85277F] text-2xl"
                    />
                  </div>
                  <span className="text-[#85277F] ml-3 font-bold">
                    {contact.email}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
