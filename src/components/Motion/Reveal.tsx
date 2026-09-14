import { HTMLMotionProps, Variants, motion, useReducedMotion } from "framer-motion";
import React from "react";

export const EASE_PREMIUM: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_PREMIUM },
  },
};

interface RevealProps
  extends Omit<HTMLMotionProps<"div">, "initial" | "whileInView" | "viewport" | "children"> {
  children?: React.ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  amount?: number;
}

/**
 * Fades + slides children into place the first time they scroll into view.
 * Falls back to a plain div when the user prefers reduced motion.
 */
export function Reveal(props: RevealProps): React.JSX.Element {
  const {
    children,
    delay = 0,
    y = 30,
    once = true,
    amount = 0.3,
    transition,
    className,
    ...rest
  } = props;
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.7, delay, ease: EASE_PREMIUM, ...transition }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
