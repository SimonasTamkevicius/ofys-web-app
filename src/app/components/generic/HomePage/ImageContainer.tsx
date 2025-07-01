import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface ImageContainerProps {
  image: string;
  altText: string;
  imageSide: "left" | "right";
  subHeadText: string;
  headText: string;
  paragraphText: string;
  buttonText: string;
}

const ImageContainer = ({
  image,
  altText,
  imageSide,
  subHeadText,
  headText,
  paragraphText,
  buttonText,
}: ImageContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const y = useSpring(rawY, { stiffness: 200, damping: 20 });

  const ImageBlock = (
    <div className="relative w-full max-w-xl aspect-video md:aspect-square mx-auto">
      {/* Purple background block */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        style={{ backgroundColor: "#85277F" }}
        initial={{
          x: imageSide === "left" ? -20 : 20,
          y: 20,
          opacity: 0,
        }}
        whileInView={{
          x: imageSide === "left" ? 20 : -20,
          y: -20,
          opacity: 1,
        }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />

      {/* Image block */}
      <motion.div className="absolute inset-0 overflow-hidden rounded-xl shadow-2xl z-10">
        <motion.img
          src={image}
          alt={altText}
          style={{ y, scale: 1.25 }}
          transition={{ y: { type: "tween", ease: "easeInOut" } }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </motion.div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 p-6 md:p-16 items-center"
    >
      {/* Image always first on small screens, conditionally placed on md+ screens */}
      <div
        className={`
      ${imageSide === "left" ? "md:order-1" : "md:order-2"} 
      order-1
    `}
      >
        {ImageBlock}
      </div>

      {/* Text always second on small screens, conditionally placed on md+ screens */}
      <motion.div
        className={`
      flex flex-col gap-5 z-20 text-center md:text-left 
      ${imageSide === "left" ? "md:order-2" : "md:order-1"} 
      order-2
    `}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h4 className="text-lg font-semibold" style={{ color: "#85277F" }}>
          {subHeadText}
        </h4>
        <h2 className="text-3xl md:text-5xl font-bold tracking-wide text-[#323130]">
          {headText}
        </h2>
        <p className="text-[#323130]">{paragraphText}</p>
        <div className="flex flex-row gap-2 items-center justify-center md:justify-start group cursor-pointer">
          <p
            className="text-md font-semibold group-hover:underline transition"
            style={{ color: "#85277F" }}
          >
            {buttonText}
          </p>
          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-lg transition-transform group-hover:translate-x-1"
            style={{ color: "#85277F" }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ImageContainer;
