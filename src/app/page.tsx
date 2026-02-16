"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/sections/hero"), { ssr: false });
const Skills = dynamic(() => import("@/components/sections/skill"), { ssr: false });
const Projects = dynamic(() => import("@/components/sections/project"), { ssr: false });
const Experience = dynamic(() => import("@/components/sections/experience"), { ssr: false });
const Contact = dynamic(() => import("@/components/sections/contact"), { ssr: false });
const Footer = dynamic(() => import("@/components/shared/footer"), { ssr: false });
const ChatBot = dynamic(() => import("@/components/shared/chatbot"), { ssr: false });

/*
 * Flowing constellation background
 * — Nodes connected by lines, orbital paths, flowing curves
 * — Everything feels intentional and interconnected
 */
function ConstellationBackground() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const r1 = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const r2 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const s1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 0.95]);

  // Shared node style
  const node = "rounded-full bg-black/[0.08] dark:bg-white/[0.12]";
  const nodeRing = "rounded-full border border-black/[0.06] dark:border-white/[0.09]";
  const line = "bg-gradient-to-r from-transparent via-black/[0.06] dark:via-white/[0.08] to-transparent";
  const lineV = "bg-gradient-to-b from-transparent via-black/[0.06] dark:via-white/[0.08] to-transparent";

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(128,128,128,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(128,128,128,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* ===== CONSTELLATION CLUSTER 1 — top-right network ===== */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        {/* Central orbit */}
        <div className="absolute top-[8%] right-[10%] w-[250px] h-[250px]">
          <div className={`absolute inset-0 ${nodeRing}`} />
          <div className={`absolute inset-[50px] border border-dashed border-black/[0.04] dark:border-white/[0.06] rounded-full`} />
          {/* Center node */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[8px] h-[8px] ${node}`} />
          {/* Orbiting nodes */}
          <div className={`absolute top-[0%] left-[50%] -translate-x-1/2 w-[6px] h-[6px] ${node}`} />
          <div className={`absolute top-[50%] right-[0%] -translate-y-1/2 w-[5px] h-[5px] ${node}`} />
          <div className={`absolute bottom-[0%] left-[50%] -translate-x-1/2 w-[4px] h-[4px] ${node}`} />
        </div>

        {/* Branch line going down-left from orbit → to node */}
        <div className="absolute top-[28%] right-[22%] w-[180px] h-[1px] rotate-[35deg]" >
          <div className={`w-full h-full ${line}`} />
        </div>
        {/* Target node of that branch */}
        <div className={`absolute top-[38%] right-[35%] w-[10px] h-[10px] ${nodeRing}`}>
          <div className={`absolute inset-[2px] ${node}`} />
        </div>

        {/* Another branch from that node going further left */}
        <div className="absolute top-[39%] right-[36%] w-[120px] h-[1px] rotate-[10deg]" >
          <div className={`w-full h-full ${line}`} />
        </div>
        {/* Endpoint node */}
        <div className={`absolute top-[40%] right-[48%] w-[5px] h-[5px] ${node}`} />

        {/* Vertical branch going down from cluster */}
        <div className={`absolute top-[28%] right-[15%] w-[1px] h-[150px] ${lineV}`} />
        {/* Node at bottom of vertical */}
        <div className={`absolute top-[48%] right-[14.5%] w-[7px] h-[7px] ${nodeRing}`} />

        {/* Connect to cross */}
        <div className="absolute top-[49%] right-[15%] w-[80px] h-[1px] rotate-[0deg]">
          <div className={`w-full h-full ${line}`} />
        </div>
        <div className="absolute top-[46%] right-[20%]">
          <div className="w-[40px] h-[1px] bg-black/[0.06] dark:bg-white/[0.08]" />
          <div className="w-[1px] h-[40px] bg-black/[0.06] dark:bg-white/[0.08] absolute top-[-20px] left-[20px]" />
        </div>
      </motion.div>

      {/* ===== CONSTELLATION CLUSTER 2 — left side flowing path ===== */}
      <motion.div style={{ y: y2 }} className="absolute inset-0">
        {/* Starting node — top left */}
        <div className={`absolute top-[15%] left-[6%] w-[10px] h-[10px] ${nodeRing}`}>
          <div className={`absolute inset-[2px] ${node}`} />
        </div>

        {/* Flowing diagonal line down-right */}
        <div className="absolute top-[16%] left-[7%] w-[200px] h-[1px] rotate-[55deg] origin-left">
          <div className={`w-full h-full ${line}`} />
        </div>

        {/* Mid node */}
        <div className={`absolute top-[35%] left-[16%] w-[7px] h-[7px] ${node}`} />

        {/* Branch right */}
        <div className="absolute top-[35.5%] left-[17%] w-[130px] h-[1px] rotate-[-5deg]">
          <div className={`w-full h-full ${line}`} />
        </div>
        {/* Node with ring */}
        <div className={`absolute top-[34%] left-[27%] w-[20px] h-[20px] ${nodeRing}`}>
          <div className={`absolute inset-[6px] ${node}`} />
        </div>

        {/* Continue path downward */}
        <div className={`absolute top-[36%] left-[16.5%] w-[1px] h-[180px] ${lineV}`} />

        {/* Lower node */}
        <div className={`absolute top-[58%] left-[16%] w-[6px] h-[6px] ${node}`} />

        {/* Branch from lower node to left */}
        <div className="absolute top-[58%] left-[5%] w-[100px] h-[1px]">
          <div className={`w-full h-full ${line}`} />
        </div>
        {/* Terminal node on edge */}
        <div className={`absolute top-[57.5%] left-[4%] w-[5px] h-[5px] ${node}`} />

        {/* Triangle formed by 3 connected nodes */}
        <div className="absolute top-[70%] left-[8%]">
          {/* Node A */}
          <div className={`absolute top-0 left-[40px] w-[6px] h-[6px] ${node}`} />
          {/* Node B */}
          <div className={`absolute top-[50px] left-0 w-[5px] h-[5px] ${node}`} />
          {/* Node C */}
          <div className={`absolute top-[50px] left-[80px] w-[5px] h-[5px] ${node}`} />
          {/* Lines AB, AC, BC */}
          <div className="absolute top-[3px] left-[42px] w-[55px] h-[1px] rotate-[48deg] origin-left">
            <div className={`w-full h-full bg-black/[0.05] dark:bg-white/[0.07]`} />
          </div>
          <div className="absolute top-[3px] left-[42px] w-[55px] h-[1px] rotate-[130deg] origin-left">
            <div className={`w-full h-full bg-black/[0.05] dark:bg-white/[0.07]`} />
          </div>
          <div className="absolute top-[52px] left-[3px] w-[78px] h-[1px]">
            <div className={`w-full h-full bg-black/[0.05] dark:bg-white/[0.07]`} />
          </div>
        </div>
      </motion.div>

      {/* ===== CONSTELLATION CLUSTER 3 — center-bottom, rotating hub ===== */}
      <motion.div style={{ y: y3 }} className="absolute inset-0">
        {/* Rotating hub */}
        <motion.div style={{ rotate: r1 }} className="absolute top-[65%] left-[55%]">
          <div className={`w-[80px] h-[80px] ${nodeRing}`} />
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] ${node}`} />
          {/* 4 spoke nodes */}
          <div className={`absolute -top-[3px] left-1/2 -translate-x-1/2 w-[4px] h-[4px] ${node}`} />
          <div className={`absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-[4px] h-[4px] ${node}`} />
          <div className={`absolute top-1/2 -left-[3px] -translate-y-1/2 w-[4px] h-[4px] ${node}`} />
          <div className={`absolute top-1/2 -right-[3px] -translate-y-1/2 w-[4px] h-[4px] ${node}`} />
        </motion.div>

        {/* Line from hub to right */}
        <div className="absolute top-[68%] left-[60%] w-[200px] h-[1px] rotate-[-8deg]">
          <div className={`w-full h-full ${line}`} />
        </div>
        {/* End node right */}
        <div className={`absolute top-[66%] right-[18%] w-[8px] h-[8px] ${nodeRing}`}>
          <div className={`absolute inset-[2px] ${node}`} />
        </div>

        {/* Line from hub upward-left */}
        <div className={`absolute top-[52%] left-[56%] w-[1px] h-[120px] ${lineV}`} />
        {/* Node up */}
        <div className={`absolute top-[50%] left-[55.5%] w-[5px] h-[5px] ${node}`} />

        {/* Scaling connected ring — bottom right */}
        <motion.div style={{ scale: s1 }} className="absolute top-[80%] right-[8%]">
          <div className={`w-[60px] h-[60px] ${nodeRing}`} />
          <div className={`absolute inset-[18px] border border-dashed border-black/[0.04] dark:border-white/[0.06] rounded-full`} />
        </motion.div>
        {/* Line connecting to it */}
        <div className="absolute top-[68%] right-[10%] w-[1px] h-[100px]">
          <div className={`w-full h-full ${lineV}`} />
        </div>
      </motion.div>

      {/* ===== CONSTELLATION CLUSTER 4 — right mid, counter-rotating ===== */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        <motion.div style={{ rotate: r2 }} className="absolute top-[55%] right-[5%]">
          <div className="w-[30px] h-[30px] border border-black/[0.06] dark:border-white/[0.08] rotate-45" />
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] ${node}`} />
        </motion.div>
      </motion.div>

      {/* ===== FLOWING PATH — connecting top to bottom ===== */}
      <motion.div style={{ y: y2 }} className="absolute inset-0">
        {/* Vertical spine — the main flow */}
        <div className={`absolute top-[5%] left-[48%] w-[1px] h-[90%] bg-gradient-to-b from-transparent via-black/[0.04] dark:via-white/[0.06] to-transparent`} />

        {/* Nodes along the spine */}
        <div className={`absolute top-[12%] left-[47.5%] w-[6px] h-[6px] ${node} animate-float`} style={{ animationDelay: "0s" }} />
        <div className={`absolute top-[30%] left-[47.5%] w-[4px] h-[4px] ${node} animate-float`} style={{ animationDelay: "1s" }} />
        <div className={`absolute top-[50%] left-[47.5%] w-[5px] h-[5px] ${node} animate-float`} style={{ animationDelay: "2s" }} />
        <div className={`absolute top-[72%] left-[47.5%] w-[4px] h-[4px] ${node} animate-float`} style={{ animationDelay: "3s" }} />
        <div className={`absolute top-[90%] left-[47.5%] w-[6px] h-[6px] ${node} animate-float`} style={{ animationDelay: "4s" }} />

        {/* Horizontal branches from spine — like a tree */}
        <div className="absolute top-[30%] left-[48.5%] w-[80px] h-[1px]">
          <div className={`w-full h-full ${line}`} />
        </div>
        <div className="absolute top-[50%] left-[38%] w-[80px] h-[1px]">
          <div className={`w-full h-full ${line}`} />
        </div>
        <div className="absolute top-[72%] left-[49%] w-[60px] h-[1px]">
          <div className={`w-full h-full ${line}`} />
        </div>
      </motion.div>

      {/* ===== DOT GRID CLUSTERS — feel like data/network points ===== */}
      <motion.div style={{ y: y3 }} className="absolute inset-0">
        {/* Grid cluster — top center-right */}
        <div className="absolute top-[5%] left-[60%]">
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={`tg-${i}`} className={`w-[3px] h-[3px] ${node}`} />
            ))}
          </div>
        </div>

        {/* Grid cluster — bottom left */}
        <div className="absolute top-[82%] left-[5%]">
          <div className="grid grid-cols-3 gap-2.5">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={`bg-${i}`} className={`w-[3px] h-[3px] ${node}`} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* ===== AMBIENT GLOWS ===== */}
      <div className="absolute top-[5%] left-[0%] w-[600px] h-[600px] bg-blue-500/[0.02] dark:bg-blue-400/[0.035] rounded-full blur-[150px]" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-violet-500/[0.015] dark:bg-violet-400/[0.03] rounded-full blur-[130px]" />
      <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] bg-emerald-500/[0.015] dark:bg-emerald-400/[0.025] rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[15%] w-[400px] h-[400px] bg-amber-500/[0.015] dark:bg-amber-400/[0.025] rounded-full blur-[120px]" />
    </div>
  );
}

// Loading screen
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-12 h-12 rounded-xl bg-white flex items-center justify-center"
        >
          <span className="text-black font-mono text-lg font-bold">H</span>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <p className="text-white/90 text-sm font-light tracking-[0.3em] uppercase">
            Hrushi Bhanvadiya
          </p>
        </motion.div>

        <motion.div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className="min-h-screen bg-background text-foreground transition-colors duration-500 overflow-x-hidden selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">

        {/* Scroll Progress */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[1.5px] bg-black/80 dark:bg-white/80 z-50 origin-left"
          style={{ scaleX }}
        />

        {/* Theme Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full w-9 h-9 border-black/[0.06] dark:border-white/[0.06] bg-white/70 dark:bg-black/70 backdrop-blur-md hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 active:scale-90"
          >
            <Sun className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>

        {/* Constellation background */}
        <ConstellationBackground />

        {/* Main content — centered */}
        <div className="relative z-10">
          <Hero />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
          <Footer />
        </div>

        {/* Chatbot — floating, doesn't affect layout */}
        <ChatBot />
      </div>
    </>
  );
}