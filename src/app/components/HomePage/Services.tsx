import React from "react";
import ServiceCard from "./generic/ServiceCard";

const serviceData = [
  {
    img: "/realty1.png",
    title: "Realty",
    desc: "Pellentesque id tellus sapien. Ut vulputate ipsum sit amet arcu scelerisque, quis volutpat dolor dictum. Suspendisse vitae neque sit amet quam auctor condimentum vehicula sit amet metus.",
    buttonText: "Explore Listings",
  },
  {
    img: "/rentals.png",
    title: "Rentals",
    desc: "Pellentesque id tellus sapien. Ut vulputate ipsum sit amet arcu scelerisque, quis volutpat dolor dictum. Suspendisse vitae neque sit amet quam auctor condimentum vehicula sit amet metus.",
    buttonText: "Browse Rentals",
  },
];

const Services = () => {
  return (
    <section className="relative px-4 sm:px-8 lg:px-16 py-12 bg-white mb-10">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-[#323130]">
          Explore Our Services
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 justify-between max-w-6xl">
        {serviceData.map((service, index) => {
          return (
            <ServiceCard
              key={index}
              img={service.img}
              title={service.title}
              desc={service.desc}
              buttonText={service.buttonText}
              index={index}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Services;
