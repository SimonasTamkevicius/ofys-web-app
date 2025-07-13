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
  buttonText: string;
}

const ImageContainer = ({
  image,
  altText,
  imageSide,
  subHeadText,
  headText,
  paragraphText,
  buttonText
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
        className="absolute inset-0 rounded-3xl"
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
      <motion.div className="absolute inset-0 overflow-hidden rounded-3xl shadow-2xl z-10">
        <motion.div
          style={{ y, scale: 1.25 }}
          transition={{ y: { type: "tween", ease: "easeInOut" } }}
          className="w-full h-full"
        >
          <Image
            src={image}
            alt={altText}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </motion.div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 p-6 md:p-16 items-center"
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
      flex flex-col gap-6 z-20 text-center md:text-left 
      ${imageSide === "left" ? "md:order-2" : "md:order-1"} 
      order-2
    `}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h4
          className="text-lg md:text-xl font-semibold tracking-wide"
          style={{ color: "#85277F" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {subHeadText}
        </motion.h4>

        <motion.h2
          className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-wide text-gray-800 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {headText}
        </motion.h2>

        <motion.p
          className="text-gray-600 text-lg md:text-xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {paragraphText}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ImageContainer;
