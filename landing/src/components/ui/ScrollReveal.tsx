"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Distance in px to translate up from. Default 24. */
  y?: number;
};

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function ScrollReveal({ children, delay = 0, className, y = 24 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.2, 0, 0, 1],
      }}
      className={className}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
