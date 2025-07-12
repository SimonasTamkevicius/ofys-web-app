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
        <motion.div 
          className="py-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <ImageContainer
            image="/costaricacoast.png"
            altText="Sunset over a luxury coastal villa"
            imageSide="left"
            subHeadText="Seaside Serenity"
            headText="Wake Up to Ocean Breezes"
            paragraphText="Experience ultimate relaxation in our oceanfront villas. Let the sound of gentle waves and panoramic views welcome you to each new day in paradise."
            buttonText="View Ocean Villas"
          />
        </motion.div>
        
        <motion.div 
          className="py-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <ImageContainer
            image="/costaricancoastv2.webp"
            altText="Tropical jungle villa with infinity pool"
            imageSide="right"
            subHeadText="Hidden Oasis"
            headText="Retreat Into Nature's Embrace"
            paragraphText="Surround yourself with lush greenery and tranquil privacy. Our jungle hideaways blend modern luxury with untouched nature, offering you a secluded escape."
            buttonText="Discover Jungle Retreats"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default GeneralInfo;
