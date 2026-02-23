"use client";

import { useRef, ReactNode, Children, isValidElement, memo, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

/*
 * Performance-first ChaosContainer
 * ─────────────────────────────────
 * Uses IntersectionObserver + CSS transitions instead of framer-motion
 * for silky-smooth entry animations with zero JS animation overhead.
 */

interface ChaosContainerProps {
  children: ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
  direction?: "random" | "left" | "right" | "top" | "bottom";
  speed?: number;
  delay?: number;
  triggerOnce?: boolean;
}

const OFFSETS: Record<string, { x: string; y: string }> = {
  low: { x: "30px", y: "20px" },
  medium: { x: "50px", y: "30px" },
  high: { x: "80px", y: "50px" },
};

function getTranslate(
  intensity: "low" | "medium" | "high",
  direction: string,
): string {
  const { x, y } = OFFSETS[intensity];
  switch (direction) {
    case "left": return `translateX(-${x})`;
    case "right": return `translateX(${x})`;
    case "top": return `translateY(-${y})`;
    case "bottom": return `translateY(${y})`;
    default: return `translateY(${y})`;
  }
}

function getDuration(intensity: "low" | "medium" | "high", speed: number): number {
  const base = intensity === "low" ? 0.4 : intensity === "medium" ? 0.5 : 0.6;
  return base / speed;
}

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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (triggerOnce) obs.disconnect();
        } else if (!triggerOnce) {
          setVisible(false);
        }
      },
      { rootMargin: "-8% 0px -8% 0px", threshold: 0.01 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [triggerOnce]);

  const duration = getDuration(intensity, speed);
  const translate = getTranslate(intensity, direction);

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : translate,
        transition: `opacity ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        willChange: visible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
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
}: StaggerGroupProps) => (
  <div className={className}>
    {Children.map(children, (child, index) => {
      if (!isValidElement(child)) return child;
      return (
        <ChaosContainer
          intensity={intensity}
          direction={direction}
          speed={speed}
          delay={index * staggerDelay}
          triggerOnce={triggerOnce}
        >
          {child}
        </ChaosContainer>
      );
    })}
  </div>
));
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
