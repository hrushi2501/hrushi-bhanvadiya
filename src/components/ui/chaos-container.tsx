"use client";

import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { useRef, ReactNode, useMemo, Children, isValidElement, memo } from "react";
import { cn } from "@/lib/utils";

// Deterministic pseudo-random based on seed — avoids hydration mismatches
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

interface ChaosContainerProps {
  children: ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
  direction?: "random" | "left" | "right" | "top" | "bottom";
  speed?: number;
  delay?: number;
  triggerOnce?: boolean;
}

const INTENSITY_CONFIG = {
  low: { x: 50, y: 50, rotate: 5, scale: 0.95, opacity: 0 },
  medium: { x: 100, y: 100, rotate: 15, scale: 0.9, opacity: 0 },
  high: { x: 200, y: 200, rotate: 45, scale: 0.8, opacity: 0 },
} as const;

export const ChaosContainer = memo(({
  children,
  className,
  intensity = "medium",
  direction = "random",
  speed = 1,
  delay = 0,
  triggerOnce = false,
}: ChaosContainerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: triggerOnce, margin: "-10% 0px -10% 0px" });

  const { x, y, rotate, scale, opacity } = INTENSITY_CONFIG[intensity];

  // Stable initial state — computed once per component instance
  const initialState = useMemo(() => {
    let initialX = 0;
    let initialY = 0;

    switch (direction) {
      case "left": initialX = -x; break;
      case "right": initialX = x; break;
      case "top": initialY = -y; break;
      case "bottom": initialY = y; break;
      case "random":
      default: {
        const seed = x + y + rotate + scale;
        initialX = seededRandom(seed) * 2 * x - x;
        initialY = seededRandom(seed + 1) * 2 * y - y;
        break;
      }
    }

    return {
      x: initialX,
      y: initialY,
      rotate: direction === "random" ? seededRandom(x + y) * 2 * rotate - rotate : 0,
      scale,
      opacity,
    };
  }, [direction, x, y, rotate, scale, opacity]);

  const animateState = useMemo(() => ({
    x: 0, y: 0, rotate: 0, scale: 1, opacity: 1,
  }), []);

  const transition = useMemo(() => ({
    duration: 0.8 * speed,
    type: "spring" as const,
    damping: 20,
    stiffness: 100,
    mass: 0.8,
    delay,
  }), [speed, delay]);

  return (
    <motion.div
      ref={ref}
      className={cn("will-change-transform", className)}
      initial={initialState}
      animate={isInView ? animateState : initialState}
      transition={transition}
    >
      {children}
    </motion.div>
  );
});
ChaosContainer.displayName = "ChaosContainer";

// Wrapper that auto-staggers children with ChaosContainer animations
interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  intensity?: "low" | "medium" | "high";
  direction?: "random" | "left" | "right" | "top" | "bottom";
  speed?: number;
  triggerOnce?: boolean;
}

export const StaggerGroup = memo(({
  children,
  className,
  staggerDelay = 0.1,
  intensity = "medium",
  direction = "random",
  speed = 1,
  triggerOnce = false,
}: StaggerGroupProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: triggerOnce, margin: "-5% 0px -5% 0px" });

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;

        return (
          <ChaosContainer
            intensity={intensity}
            direction={direction}
            speed={speed}
            delay={isInView ? index * staggerDelay : 0}
            triggerOnce={triggerOnce}
          >
            {child}
          </ChaosContainer>
        );
      })}
    </div>
  );
});
StaggerGroup.displayName = "StaggerGroup";

// Chapter badge for narrative sections
export const ChapterBadge = memo(({
  number,
  title,
  className,
}: {
  number: string;
  title: string;
  className?: string;
}) => (
  <ChaosContainer intensity="medium" direction="top" delay={0}>
    <div className={cn("inline-flex items-center gap-3 font-mono text-xs tracking-widest uppercase", className)}>
      <span className="text-black/30 dark:text-white/30">{number}</span>
      <span className="w-8 h-[1px] bg-black/20 dark:bg-white/20" />
      <span className="text-black/50 dark:text-white/50">{title}</span>
    </div>
  </ChaosContainer>
));
ChapterBadge.displayName = "ChapterBadge";

// Section divider for narrative transitions
export const SectionDivider = memo(({ className }: { className?: string }) => (
  <div className={cn("relative h-32 md:h-48 overflow-hidden", className)}>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-black/10 dark:via-white/10 to-transparent" />
    </div>
  </div>
));
SectionDivider.displayName = "SectionDivider";

export const LaserLine = memo(({
  direction = "vertical",
  color = "bg-primary",
  className
}: {
  direction?: "vertical" | "horizontal",
  color?: string,
  className?: string
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scaleVal = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      ref={ref}
      className={cn(
        "absolute z-0",
        direction === "vertical" ? "w-[1px] h-full left-1/2 -translate-x-1/2" : "h-[1px] w-full top-1/2 -translate-y-1/2",
        color,
        className
      )}
      style={{
        scaleY: direction === "vertical" ? scaleVal : 1,
        scaleX: direction === "horizontal" ? scaleVal : 1,
        originY: 0,
        originX: 0,
      }}
    >
      <div className={cn(
        "absolute inset-0 blur-[2px]",
        color
      )} />
    </motion.div>
  );
});
LaserLine.displayName = "LaserLine";
