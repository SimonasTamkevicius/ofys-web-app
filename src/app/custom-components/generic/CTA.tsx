import React from "react";
import { motion } from "motion/react";

interface CTAProps {
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

const CTA = ({ subtitle, title, description, buttonText, href }: CTAProps) => {
  return (
    <motion.div
      className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
    >
      <div className="text-center">
        <motion.div
          className="flex flex-col items-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-lg tracking-[0.3em] uppercase font-light mb-2 text-[#85277F]">
            {subtitle}
          </p>
          <motion.div
            className="w-16 h-px bg-[#85277F]/50"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.4,
            }}
            viewport={{ once: true }}
          />
        </motion.div>
        <h3 className="text-4xl font-serif font-bold text-gray-800 mb-4">
          {title}
        </h3>
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">{description}</p>

        <motion.a
          href={href}
          className="group/btn relative inline-flex items-center justify-center px-6 py-3 rounded-xl text-white font-semibold cursor-pointer shadow-lg overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #85277F, #9E3A95)",
          }}
          whileTap={{ scale: 0.98 }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
            style={{
              background: "linear-gradient(135deg, #9E3A95, #85277F)",
            }}
          />
          <span className="relative flex items-center gap-2 text-base">
            {buttonText}
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </motion.a>
      </div>
    </motion.div>
  );
};

export default CTA;
