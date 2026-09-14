import { cn } from "@/services/utils";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

/**
 * Tracks how far a fixed-size frame has travelled through the viewport and
 * returns a vertical offset that drifts from +distance to -distance, giving
 * the classic "background pans slower than the page" parallax feel.
 */
export function useParallaxY(distance = 30) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return { ref, y };
}

interface ParallaxImageProps {
  children: React.ReactNode;
  distance?: number;
  className?: string;
}

/**
 * Wraps a `fill`-mode <Image /> so it can pan gently as the frame scrolls
 * through the viewport, while staying clipped to the frame's own shape
 * (rectangle, circle, ...) supplied via `className`.
 */
export function ParallaxImage(props: ParallaxImageProps): React.JSX.Element {
  const { children, distance = 28, className } = props;
  const shouldReduceMotion = useReducedMotion();
  const { ref, y } = useParallaxY(distance);

  return (
    <div ref={ref} className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.div
        className="absolute -inset-[10%]"
        style={shouldReduceMotion ? undefined : { y }}
      >
        {children}
      </motion.div>
    </div>
  );
}
