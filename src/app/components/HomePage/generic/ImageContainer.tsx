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

        {/* <motion.div 
          className="flex flex-row gap-2 items-center justify-center md:justify-start group cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.a
            href={`/${buttonText.toLowerCase().replace(/\s+/g, '-')}`}
            className="group/btn relative inline-flex items-center justify-center px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl overflow-hidden"
            style={{ background: "linear-gradient(to right, #85277F, #9E3A95)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(to right, #9E3A95, #85277F)" }}
            />
            <span className="relative flex items-center gap-2">
              {buttonText}
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-lg transition-transform group-hover/btn:translate-x-1"
              />
            </span>
          </motion.a>
        </motion.div> */}
      </motion.div>
    </div>
  );
};

export default ImageContainer;
