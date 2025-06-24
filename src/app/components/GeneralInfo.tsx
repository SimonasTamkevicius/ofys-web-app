import React from "react";
import ImageContainer from "./generic/ImageContainer";
import { ImageCarousel } from "./generic/Carousel";

const GeneralInfo = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <ImageContainer
        image="/costaricacoast.png"
        altText="Sunset over a luxury coastal villa"
        imageSide="left"
        subHeadText="Seaside Serenity"
        headText="Wake Up to Ocean Breezes"
        paragraphText="Experience ultimate relaxation in our oceanfront villas. Let the sound of gentle waves and panoramic views welcome you to each new day in paradise."
        buttonText="View Ocean Villas"
      />
      <ImageContainer
        image="/costaricancoastv2.webp"
        altText="Tropical jungle villa with infinity pool"
        imageSide="right"
        subHeadText="Hidden Oasis"
        headText="Retreat Into Nature’s Embrace"
        paragraphText="Surround yourself with lush greenery and tranquil privacy. Our jungle hideaways blend modern luxury with untouched nature, offering you a secluded escape."
        buttonText="Discover Jungle Retreats"
      />
      <ImageCarousel />
    </div>
  );
};

export default GeneralInfo;
