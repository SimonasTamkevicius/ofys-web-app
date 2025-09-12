import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
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
  buttonText,
}: ImageContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const y = useSpring(rawY, { stiffness: 200, damping: 20 });

  const ImageBlock = (
    <div className="relative w-full max-w-xl aspect-video md:aspect-square mx-auto">
      {/* Purple background block */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{ backgroundColor: "#85277F" }} // themePrimary
        initial={{ x: -20, y: 20, opacity: 0 }}
        whileInView={{ x: 20, y: -20, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
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
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </motion.div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 p-6 md:p-16 items-center"
    >
      {imageSide === "left" && ImageBlock}

      <motion.div
        className="flex flex-col gap-5 z-20 text-center md:text-left"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="text-lg font-semibold" style={{ color: "#85277F" }}>
          {subHeadText}
        </p>
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
            className="text-xl transition"
            style={{ color: "#85277F" }}
          />
        </div>
      </motion.div>

      {imageSide === "right" && ImageBlock}
    </div>
  );
};

export default ImageContainer;
