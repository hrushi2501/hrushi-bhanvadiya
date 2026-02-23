"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useCallback, useRef } from "react";
import { Sun, Moon, Code2, Layers, Briefcase, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/sections/hero"), { ssr: false });
const Skills = dynamic(() => import("@/components/sections/skill"), { ssr: false });
const Projects = dynamic(() => import("@/components/sections/project"), { ssr: false });
const Experience = dynamic(() => import("@/components/sections/experience"), { ssr: false });
const Contact = dynamic(() => import("@/components/sections/contact"), { ssr: false });
const Footer = dynamic(() => import("@/components/shared/footer"), { ssr: false });
const ChatBot = dynamic(() => import("@/components/shared/chatbot"), { ssr: false });

/* ─── Lightweight scroll progress (no framer-motion) ─── */
function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(h > 0 ? window.scrollY / h : 0);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return progress;
}

/* ─── Sticky Navigation (CSS transitions only) ─── */
const NAV_ITEMS = [
  { label: "Skills", href: "skills", icon: Code2 },
  { label: "Projects", href: "projects", icon: Layers },
  { label: "Experience", href: "experience", icon: Briefcase },
  { label: "Contact", href: "contact", icon: Mail },
] as const;

function StickyNav() {
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    let raf = 0;
    const handleScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const lastY = lastScrollYRef.current;

        if (currentY <= 10) {
          setVisible(true);
        } else if (currentY < lastY) {
          setVisible(true);
        } else if (currentY > lastY + 5) {
          setVisible(false);
        }

        lastScrollYRef.current = currentY;

        // Scroll spy
        for (const item of [...NAV_ITEMS].reverse()) {
          const el = document.getElementById(item.href);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 200) {
              setActiveSection(item.href);
              break;
            }
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => { window.removeEventListener("scroll", handleScroll); cancelAnimationFrame(raf); };
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <nav
      className="fixed top-4 z-50 transition-all duration-300 ease-out"
      style={{
        left: "50%",
        opacity: visible ? 1 : 0,
        transform: `translateX(-50%) translateY(${visible ? 0 : -60}px)`,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* Desktop nav */}
      <div className="hidden sm:flex items-center gap-0.5 px-1.5 py-1 rounded-full bg-white/70 dark:bg-black/70 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.06] shadow-sm shadow-black/5 dark:shadow-black/20">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.href}
            onClick={() => scrollTo(item.href)}
            className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all duration-200 ${activeSection === item.href
              ? "bg-black dark:bg-white text-white dark:text-black"
              : "text-black/45 dark:text-white/45 hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

function MobileBottomDock() {
  const [activeSection, setActiveSection] = useState("");
  const [visible, setVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    let raf = 0;
    const handleScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const lastY = lastScrollYRef.current;

        if (currentY <= 10) {
          setVisible(true);
        } else if (currentY < lastY) {
          setVisible(true);
        } else if (currentY > lastY + 5) {
          setVisible(false);
        }

        lastScrollYRef.current = currentY;

        for (const item of [...NAV_ITEMS].reverse()) {
          const el = document.getElementById(item.href);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 300) {
              setActiveSection(item.href);
              break;
            }
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // init
    return () => { window.removeEventListener("scroll", handleScroll); cancelAnimationFrame(raf); };
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div
      className="sm:hidden fixed bottom-6 left-1/2 z-[100] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center justify-center pointer-events-none"
      style={{
        transform: `translateX(-50%) translateY(${visible ? 0 : 120}px) scale(${visible ? 1 : 0.95})`,
        opacity: visible ? 1 : 0,
      }}
    >
      <div className="flex items-center gap-1.5 px-3 py-2.5 rounded-full bg-[#fcfcfc]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-2xl border border-black/[0.1] dark:border-white/[0.1] shadow-2xl shadow-black/20 dark:shadow-black/50 pointer-events-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.href;
          return (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className={`relative flex flex-col items-center justify-center w-14 h-12 rounded-xl transition-all duration-300 active:scale-95 overflow-hidden ${isActive
                ? "text-black dark:text-white"
                : "text-black/40 dark:text-white/40 hover:text-black/60 dark:hover:text-white/60"
                }`}
            >
              {isActive && (
                <span className="absolute inset-0 bg-black/[0.04] dark:bg-white/[0.08] rounded-xl" />
              )}
              <item.icon className={`w-[22px] h-[22px] mb-1 transition-transform duration-300 ${isActive ? "-translate-y-0.5" : "translate-y-1.5"}`} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[9px] font-semibold tracking-wide transition-all duration-300 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/*
 * Constellation background — pure CSS parallax via CSS custom properties
 * A single rAF scroll listener updates one CSS variable. All parallax layers
 * use calc() with that variable — GPU-composited, zero React re-renders.
 */
function ConstellationBackground({ isMobile }: { isMobile: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) return;
    const el = containerRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        const p = h > 0 ? window.scrollY / h : 0;
        el.style.setProperty("--scroll", String(p));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // init
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [isMobile]);

  const node = "rounded-full bg-black/[0.22] dark:bg-white/[0.22]";
  const nodeRing = "rounded-full border border-black/[0.18] dark:border-white/[0.16]";
  const line = "bg-gradient-to-r from-transparent via-black/[0.15] dark:via-white/[0.14] to-transparent";
  const lineV = "bg-gradient-to-b from-transparent via-black/[0.15] dark:via-white/[0.14] to-transparent";

  // Parallax layer style generators — pure CSS driven by --scroll
  const layer = (factor: number): React.CSSProperties => ({
    transform: `translateY(calc(var(--scroll, 0) * ${factor}px))`,
    willChange: "transform",
  });

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" style={{ "--scroll": "0" } as React.CSSProperties}>
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.08] dark:opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(128,128,128,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(128,128,128,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* On mobile: only ambient glows */}
      {!isMobile && (
        <>
          {/* CLUSTER 1 — top-right */}
          <div style={layer(-100)} className="absolute inset-0">
            <div className="absolute top-[8%] right-[10%] w-[250px] h-[250px]">
              <div className={`absolute inset-0 ${nodeRing}`} />
              <div className="absolute inset-[50px] border border-dashed border-black/[0.06] dark:border-white/[0.09] rounded-full" />
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[8px] h-[8px] ${node}`} />
              <div className={`absolute top-[0%] left-[50%] -translate-x-1/2 w-[6px] h-[6px] ${node}`} />
              <div className={`absolute top-[50%] right-[0%] -translate-y-1/2 w-[5px] h-[5px] ${node}`} />
              <div className={`absolute bottom-[0%] left-[50%] -translate-x-1/2 w-[4px] h-[4px] ${node}`} />
            </div>
            <div className="absolute top-[28%] right-[22%] w-[180px] h-[1px] rotate-[35deg]">
              <div className={`w-full h-full ${line}`} />
            </div>
            <div className={`absolute top-[38%] right-[35%] w-[10px] h-[10px] ${nodeRing}`}>
              <div className={`absolute inset-[2px] ${node}`} />
            </div>
            <div className="absolute top-[39%] right-[36%] w-[120px] h-[1px] rotate-[10deg]">
              <div className={`w-full h-full ${line}`} />
            </div>
            <div className={`absolute top-[40%] right-[48%] w-[5px] h-[5px] ${node}`} />
            <div className={`absolute top-[28%] right-[15%] w-[1px] h-[150px] ${lineV}`} />
            <div className={`absolute top-[48%] right-[14.5%] w-[7px] h-[7px] ${nodeRing}`} />
            <div className="absolute top-[49%] right-[15%] w-[80px] h-[1px]">
              <div className={`w-full h-full ${line}`} />
            </div>
            <div className="absolute top-[46%] right-[20%]">
              <div className="w-[40px] h-[1px] bg-black/[0.10] dark:bg-white/[0.12]" />
              <div className="w-[1px] h-[40px] bg-black/[0.10] dark:bg-white/[0.12] absolute top-[-20px] left-[20px]" />
            </div>
          </div>

          {/* CLUSTER 2 — left side */}
          <div style={layer(-160)} className="absolute inset-0">
            <div className={`absolute top-[15%] left-[6%] w-[10px] h-[10px] ${nodeRing}`}>
              <div className={`absolute inset-[2px] ${node}`} />
            </div>
            <div className="absolute top-[16%] left-[7%] w-[200px] h-[1px] rotate-[55deg] origin-left">
              <div className={`w-full h-full ${line}`} />
            </div>
            <div className={`absolute top-[35%] left-[16%] w-[7px] h-[7px] ${node}`} />
            <div className="absolute top-[35.5%] left-[17%] w-[130px] h-[1px] rotate-[-5deg]">
              <div className={`w-full h-full ${line}`} />
            </div>
            <div className={`absolute top-[34%] left-[27%] w-[20px] h-[20px] ${nodeRing}`}>
              <div className={`absolute inset-[6px] ${node}`} />
            </div>
            <div className={`absolute top-[36%] left-[16.5%] w-[1px] h-[180px] ${lineV}`} />
            <div className={`absolute top-[58%] left-[16%] w-[6px] h-[6px] ${node}`} />
            <div className="absolute top-[58%] left-[5%] w-[100px] h-[1px]">
              <div className={`w-full h-full ${line}`} />
            </div>
            <div className={`absolute top-[57.5%] left-[4%] w-[5px] h-[5px] ${node}`} />
            <div className="absolute top-[70%] left-[8%]">
              <div className={`absolute top-0 left-[40px] w-[6px] h-[6px] ${node}`} />
              <div className={`absolute top-[50px] left-0 w-[5px] h-[5px] ${node}`} />
              <div className={`absolute top-[50px] left-[80px] w-[5px] h-[5px] ${node}`} />
              <div className="absolute top-[3px] left-[42px] w-[55px] h-[1px] rotate-[48deg] origin-left">
                <div className="w-full h-full bg-black/[0.08] dark:bg-white/[0.12]" />
              </div>
              <div className="absolute top-[3px] left-[42px] w-[55px] h-[1px] rotate-[130deg] origin-left">
                <div className="w-full h-full bg-black/[0.08] dark:bg-white/[0.12]" />
              </div>
              <div className="absolute top-[52px] left-[3px] w-[78px] h-[1px]">
                <div className="w-full h-full bg-black/[0.08] dark:bg-white/[0.12]" />
              </div>
            </div>
          </div>

          {/* CLUSTER 3 — center-bottom */}
          <div style={layer(60)} className="absolute inset-0">
            <div className="absolute top-[65%] left-[55%]">
              <div className={`w-[80px] h-[80px] ${nodeRing}`} />
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] ${node}`} />
              <div className={`absolute -top-[3px] left-1/2 -translate-x-1/2 w-[4px] h-[4px] ${node}`} />
              <div className={`absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-[4px] h-[4px] ${node}`} />
              <div className={`absolute top-1/2 -left-[3px] -translate-y-1/2 w-[4px] h-[4px] ${node}`} />
              <div className={`absolute top-1/2 -right-[3px] -translate-y-1/2 w-[4px] h-[4px] ${node}`} />
            </div>
            <div className="absolute top-[68%] left-[60%] w-[200px] h-[1px] rotate-[-8deg]">
              <div className={`w-full h-full ${line}`} />
            </div>
            <div className={`absolute top-[66%] right-[18%] w-[8px] h-[8px] ${nodeRing}`}>
              <div className={`absolute inset-[2px] ${node}`} />
            </div>
            <div className={`absolute top-[52%] left-[56%] w-[1px] h-[120px] ${lineV}`} />
            <div className={`absolute top-[50%] left-[55.5%] w-[5px] h-[5px] ${node}`} />
            <div className="absolute top-[80%] right-[8%]">
              <div className={`w-[60px] h-[60px] ${nodeRing}`} />
              <div className="absolute inset-[18px] border border-dashed border-black/[0.06] dark:border-white/[0.09] rounded-full" />
            </div>
            <div className="absolute top-[68%] right-[10%] w-[1px] h-[100px]">
              <div className={`w-full h-full ${lineV}`} />
            </div>
          </div>

          {/* CLUSTER 4 — right mid */}
          <div style={layer(-100)} className="absolute inset-0">
            <div className="absolute top-[55%] right-[5%]">
              <div className="w-[30px] h-[30px] border border-black/[0.10] dark:border-white/[0.14] rotate-45" />
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] ${node}`} />
            </div>
          </div>

          {/* FLOWING PATH — vertical spine */}
          <div style={layer(-160)} className="absolute inset-0">
            <div className="absolute top-[5%] left-[48%] w-[1px] h-[90%] bg-gradient-to-b from-transparent via-black/[0.07] dark:via-white/[0.10] to-transparent" />
            <div className={`absolute top-[12%] left-[47.5%] w-[6px] h-[6px] ${node} animate-float`} style={{ animationDelay: "0s" }} />
            <div className={`absolute top-[30%] left-[47.5%] w-[4px] h-[4px] ${node} animate-float`} style={{ animationDelay: "1s" }} />
            <div className={`absolute top-[50%] left-[47.5%] w-[5px] h-[5px] ${node} animate-float`} style={{ animationDelay: "2s" }} />
            <div className={`absolute top-[72%] left-[47.5%] w-[4px] h-[4px] ${node} animate-float`} style={{ animationDelay: "3s" }} />
            <div className={`absolute top-[90%] left-[47.5%] w-[6px] h-[6px] ${node} animate-float`} style={{ animationDelay: "4s" }} />
            <div className="absolute top-[30%] left-[48.5%] w-[80px] h-[1px]">
              <div className={`w-full h-full ${line}`} />
            </div>
            <div className="absolute top-[50%] left-[38%] w-[80px] h-[1px]">
              <div className={`w-full h-full ${line}`} />
            </div>
            <div className="absolute top-[72%] left-[49%] w-[60px] h-[1px]">
              <div className={`w-full h-full ${line}`} />
            </div>
          </div>

          {/* DOT GRIDS */}
          <div style={layer(60)} className="absolute inset-0">
            <div className="absolute top-[5%] left-[60%]">
              <div className="grid grid-cols-4 gap-3">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={`tg-${i}`} className={`w-[3px] h-[3px] ${node}`} />
                ))}
              </div>
            </div>
            <div className="absolute top-[82%] left-[5%]">
              <div className="grid grid-cols-3 gap-2.5">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={`bg-${i}`} className={`w-[3px] h-[3px] ${node}`} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* AMBIENT GLOWS */}
      <div className="absolute top-[5%] left-[0%] w-[600px] h-[600px] bg-black/[0.05] dark:bg-white/[0.04] rounded-full blur-[150px]" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-black/[0.04] dark:bg-white/[0.03] rounded-full blur-[130px]" />
      <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] bg-black/[0.04] dark:bg-white/[0.03] rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[15%] w-[400px] h-[400px] bg-black/[0.05] dark:bg-white/[0.04] rounded-full blur-[120px]" />
    </div>
  );
}

// Section divider
function SectionDivider() {
  return (
    <div className="relative py-2">
      <div className="section-divider" />
    </div>
  );
}

// Loading screen — pure CSS animation, no framer-motion
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setExiting(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (exiting) {
      const timer = setTimeout(onComplete, 600);
      return () => clearTimeout(timer);
    }
  }, [exiting, onComplete]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-3xl flex items-center justify-center transition-all duration-[600ms] ease-out"
      style={{
        opacity: exiting ? 0 : 1,
        transform: exiting ? "scale(1.05)" : "scale(1)",
      }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo with spinning ring */}
        <div className="relative">
          <div
            className="w-14 h-14 rounded-2xl bg-black dark:bg-white flex items-center justify-center relative z-10 animate-[fadeScaleIn_0.5s_ease-out_forwards] shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            <span className="text-white dark:text-black font-mono text-base font-bold tracking-tight">HB</span>
          </div>
          <div
            className="absolute -inset-2 rounded-2xl border border-dashed border-black/20 dark:border-white/20 animate-spin"
            style={{ animationDuration: "8s" }}
          />
        </div>

        <div className="text-center space-y-1.5 animate-[fadeSlideUp_0.5s_ease-out_0.3s_forwards] opacity-0">
          <p className="text-black/90 dark:text-white/90 text-sm font-light tracking-[0.3em] uppercase">
            Hrushi Bhanvadiya
          </p>
          <p className="text-black/40 dark:text-white/40 text-[10px] font-mono tracking-wider">
            Software Engineer
          </p>
        </div>

        <div className="w-36 h-[2px] bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-black/40 via-black to-black/40 dark:from-white/40 dark:via-white dark:to-white/40 rounded-full animate-[loadProgress_1.4s_cubic-bezier(0.22,1,0.36,1)_0.2s_forwards]"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isMobile = typeof window !== "undefined" && (window.innerWidth < 768 || window.matchMedia("(hover: none)").matches);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <div className="min-h-screen text-foreground transition-colors duration-500 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">

        {/* Scroll Progress — pure CSS */}
        <div
          className="fixed top-0 left-0 right-0 h-[1.5px] bg-black/80 dark:bg-white/80 z-50 origin-left"
          style={{ transform: `scaleX(${scrollProgress})` }}
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

        {/* Sticky/Mobile Navigation */}
        <StickyNav />
        <MobileBottomDock />


        {/* Main content */}
        <div className="relative z-10 animate-[fadeSlideUp_1.5s_cubic-bezier(0.22,1,0.36,1)_1.8s_both]">
          <Hero />
          <SectionDivider />
          <Skills />
          <SectionDivider />
          <Projects />
          <SectionDivider />
          <Experience />
          <SectionDivider />
          <Contact />
          <Footer />
        </div>

        {/* Chatbot */}
        <ChatBot />
      </div>
    </>
  );
}