"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  /** Max pixels the button moves toward the cursor. Default 4. */
  strength?: number;
};

/**
 * Subtly translates toward the cursor when it's within proximity.
 * No effect if user prefers reduced motion. Renders <a> if href, else <button>.
 */
export function MagneticButton({ children, href, onClick, className, strength = 4 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 22, stiffness: 240 });
  const springY = useSpring(y, { damping: 22, stiffness: 240 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Inner = (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, display: "inline-block" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className="inline-block">
        {Inner}
      </a>
    );
  }
  return (
    <button onClick={onClick} type="button" className="inline-block">
      {Inner}
    </button>
  );
}
