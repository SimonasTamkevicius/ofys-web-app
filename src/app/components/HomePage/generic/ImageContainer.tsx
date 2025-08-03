import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

interface ImageContainerProps {
  image: string;
  altText: string;
  imageSide: "left" | "right";
  subHeadText: string;
  headText: string;
  paragraphText: string;
  buttonText?: string;
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
  const y = useSpring(rawY, {
    stiffness: 150,
    damping: 20,
    mass: 0.5,
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);

  // Image Block Component
  const ImageBlock = (
    <div className="relative w-full aspect-square md:aspect-[5/4] mx-auto">
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{ backgroundColor: "#85277F" }}
        initial={{
          x: imageSide === "left" ? -15 : 15,
          y: 15,
          opacity: 0,
          rotate: imageSide === "left" ? -1 : 1,
        }}
        whileInView={{
          x: imageSide === "left" ? 15 : -15,
          y: -15,
          opacity: 0.8,
          rotate: 0,
        }}
        viewport={{ once: true, margin: "0px 0px -50px 0px" }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      <motion.div
        className="absolute inset-0 border border-white/15 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
      />

      <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-lg z-10 group">
        <motion.div style={{ y, scale }} className="w-full h-full">
          <Image
            src={image}
            alt={altText}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

        <div className="absolute inset-0 shadow-[inset_0_0_30px_10px_rgba(0,0,0,0.2)] rounded-2xl" />
      </div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 p-8 md:p-20 items-center"
    >
      {/* Image placement */}
      <div
        className={`${
          imageSide === "left" ? "md:order-1" : "md:order-2"
        } order-1`}
      >
        {ImageBlock}
      </div>

      {/* Text content */}
      <motion.div
        className={`flex flex-col gap-6 z-20 ${
          imageSide === "left" ? "md:order-2" : "md:order-1"
        } order-2`}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
        }}
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      >
        {/* Subheader */}
        <motion.div
          className="flex flex-col items-center md:items-start"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center">
            <p className="text-lg md:text-xl tracking-[0.3em] uppercase font-light mb-2 text-[#85277F]">
              {subHeadText}
            </p>
            <motion.div
              className="w-16 h-px bg-[#85277F]/50 mb-6"
              initial={{
                scaleX: 0,
                opacity: 0,
                originX: 0,
              }}
              whileInView={{
                scaleX: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              }}
              viewport={{ once: true }}
            />
          </div>
        </motion.div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight text-gray-900">
          {headText}
        </h2>

        <p className="text-gray-600 text-lg lg:text-xl leading-relaxed font-light mt-4 mb-8">
          {paragraphText}
        </p>
      </motion.div>
    </div>
  );
};

export default ImageContainer;
