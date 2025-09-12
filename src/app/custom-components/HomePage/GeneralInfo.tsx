import React from "react";
import ImageContainer from "./generic/ImageContainer";
import { motion } from "framer-motion";

const GeneralInfo = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-br from-[#85277F]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-tl from-[#85277F]/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full">
        <motion.div>
          <ImageContainer
            image="/costaricacoast.png"
            altText="Sunset over a luxury coastal villa"
            imageSide="left"
            subHeadText="A Lifestyle Worth Investing In"
            headText="The Gold Coast Advantage"
            paragraphText="Costa Rica's Gold Coast offers pristine beaches, a vibrant culture, and a year-round tropical climate for a lifestyle of beauty and relaxation. With a stable market and rising values, it also stands as one of the most secure and rewarding real estate investments in Central America."
            buttonText="View Ocean Villas"
          />
        </motion.div>

        <motion.div>
          <ImageContainer
            image="/rentalsbg1.png"
            altText="Tropical jungle villa with infinity pool"
            imageSide="right"
            subHeadText="Ease Meets Elegance"
            headText="Everyday Living"
            paragraphText="O.F.Y.S. properties offer refined living that balances modern luxury with everyday ease. With beaches, shops, and exclusive clubs close at hand, life here is as convenient as it is elevated."
            buttonText="Discover Jungle Retreats"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default GeneralInfo;
