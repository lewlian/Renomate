"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type Props = {
  /** Final value to count up to. */
  value: number;
  /** Prefix string (e.g. "~"). */
  prefix?: string;
  /** Suffix string (e.g. "%"). */
  suffix?: string;
  /** Duration in ms. Default 1200. */
  duration?: number;
  /** Delay before counter begins, in ms. */
  delay?: number;
  className?: string;
};

/**
 * Counts up from 0 to `value` when scrolled into view.
 * Fires once per page load.
 */
export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  duration = 1200,
  delay = 0,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let cancelled = false;
    const start = performance.now() + delay;
    const end = start + duration;

    const tick = (now: number) => {
      if (cancelled) return;
      if (now < start) {
        requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(1, (now - start) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(value * eased);
      if (now < end) requestAnimationFrame(tick);
      else setDisplayValue(value);
    };

    requestAnimationFrame(tick);
    return () => {
      cancelled = true;
    };
  }, [isInView, value, duration, delay]);

  // Format: if value has decimals or is < 10 keep one decimal; else round
  const formatted = Number.isInteger(value)
    ? Math.round(displayValue).toLocaleString()
    : displayValue.toFixed(1);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
