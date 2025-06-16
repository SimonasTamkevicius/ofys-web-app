import React from "react";
import { motion } from "framer-motion";

interface ImageContainerProps {
  image: string;
  altText: string;
}

const ImageContainer = ({ image, altText }: ImageContainerProps) => {
  return (
    <div>
      <motion.div
        className="absolute bg-[#85277F] w-100 h-100"
        initial={{ x: -20, y: 20 }}
        animate={{ x: 0, y: 0 }}
        transition={{ duration: 1 }}
      />
      <motion.img
        src="/costaricacoast.png"
        alt="CR Coast"
        className="relative bg-black w-100 h-100"
        initial={{ x: 0, y: 0 }}
        animate={{ x: -20, y: 20 }}
        transition={{ duration: 1 }}
      />
    </div>
  );
};

export default ImageContainer;
