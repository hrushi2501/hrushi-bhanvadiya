"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Mail, Code, ChevronDown } from "lucide-react";
import { ChaosContainer } from "@/components/ui/chaos-container";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useMemo, memo } from "react";

const GitHubIcon = memo(({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
));
GitHubIcon.displayName = "GitHubIcon";

const LinkedInIcon = memo(({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
));
LinkedInIcon.displayName = "LinkedInIcon";

const TerminalLine = memo(({ text, delay = 0, prefix = "$" }: { text: string; delay?: number; prefix?: string }) => {
    const [displayed, setDisplayed] = useState("");
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval>;
        const timeout = setTimeout(() => {
            let i = 0;
            intervalId = setInterval(() => {
                if (i < text.length) {
                    setDisplayed(text.slice(0, i + 1));
                    i++;
                } else {
                    clearInterval(intervalId);
                    setTimeout(() => setShowCursor(false), 500);
                }
            }, 35);
        }, delay);
        return () => { clearTimeout(timeout); if (intervalId) clearInterval(intervalId); };
    }, [text, delay]);

    return (
        <div className="flex items-start gap-2 text-xs">
            <span className="text-black/30 dark:text-white/30 select-none shrink-0">{prefix}</span>
            <span className="text-black/60 dark:text-white/60">
                {displayed}
                {showCursor && <span className="animate-typewriter-cursor ml-0.5 text-black dark:text-white">▎</span>}
            </span>
        </div>
    );
});
TerminalLine.displayName = "TerminalLine";

const SOCIAL_LINKS = [
    { name: "GitHub", icon: GitHubIcon, href: "https://github.com/hrushi2501" },
    { name: "LinkedIn", icon: LinkedInIcon, href: "https://www.linkedin.com/in/hrushi-bhanvadiya-081818280/" },
    { name: "Email", icon: Mail, href: "mailto:hrushibhanvadiya@gmail.com" },
    { name: "LeetCode", icon: Code, href: "https://leetcode.com/Hrushi2501" }
] as const;

const TECHNOLOGIES = ["C++", "Python", "Rust", "Next.js", "TypeScript", "React.js", "Flask", "Tailwind CSS"] as const;

export default function Hero() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });
    const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -80]);

    const scrollToSkills = useMemo(() => () => {
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
    }, []);

    return (
        <section ref={sectionRef} className="relative flex flex-col min-h-[100svh] overflow-hidden">
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{ y: backgroundY }}
            >
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-black/[0.015] dark:bg-white/[0.015] rounded-full blur-[80px]" />
                <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-black/[0.01] dark:bg-white/[0.01] rounded-full blur-[80px]" />
            </motion.div>

            <main className="relative z-10 flex-1 flex items-center pt-16 pb-24 sm:pt-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-8 w-full">
                    {/* Two-column layout: left = identity, right = terminal+stats */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-16">

                        {/* LEFT — Main identity content */}
                        <div className="space-y-6 flex-1 min-w-0 text-center lg:text-left">
                            {/* Status */}
                            <ChaosContainer intensity="low" direction="top" delay={0.2}>
                                <div className="flex justify-center lg:justify-start">
                                    <Badge variant="default" className="bg-black dark:bg-white text-white dark:text-black px-4 py-1.5 text-[11px] font-mono rounded-full tracking-wider border-0 font-medium">
                                        OPEN TO WORK
                                    </Badge>
                                </div>
                            </ChaosContainer>

                            {/* Name */}
                            <ChaosContainer intensity="medium" direction="top" delay={0.3}>
                                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extralight leading-[1.05] tracking-tight">
                                    Hrushi
                                    <br />
                                    <span className="text-black/40 dark:text-white/40">Bhanvadiya</span>
                                </h1>
                            </ChaosContainer>

                            {/* Tagline */}
                            <ChaosContainer intensity="low" delay={0.5}>
                                <div className="space-y-1 mx-auto lg:mx-0 max-w-md">
                                    <p className="text-base sm:text-lg text-black/70 dark:text-white/70 font-light">
                                        Undergrad at <span className="text-black dark:text-white font-normal">Nirma University</span>.
                                    </p>
                                    <p className="text-sm text-black/40 dark:text-white/40 font-light">
                                        Building systems, breaking problems, shipping code.
                                    </p>
                                </div>
                            </ChaosContainer>

                            {/* Metadata */}
                            <ChaosContainer intensity="low" direction="left" delay={0.6}>
                                <div className="flex flex-wrap items-center gap-3 text-xs text-black/40 dark:text-white/40 font-mono justify-center lg:justify-start">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        <span>Ahmedabad, Gujarat</span>
                                    </div>
                                    <span className="text-black/15 dark:text-white/15">·</span>
                                    <span>Nirma University</span>
                                    <span className="text-black/15 dark:text-white/15">·</span>
                                    <span>CGPA 8.72 / 10</span>
                                </div>
                            </ChaosContainer>

                            <Separator className="bg-black/[0.06] dark:bg-white/[0.06]" />

                            {/* Tech pills */}
                            <ChaosContainer intensity="low" delay={0.7}>
                                <div className="flex flex-wrap gap-1.5 justify-center lg:justify-start">
                                    {TECHNOLOGIES.map((tech) => (
                                        <Badge
                                            key={tech}
                                            variant="secondary"
                                            className="bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] text-black/60 dark:text-white/60 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 px-2.5 py-1 rounded-lg font-mono text-[11px] font-normal cursor-default active:scale-95"
                                        >
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </ChaosContainer>

                            {/* Social row */}
                            <ChaosContainer intensity="low" delay={0.8}>
                                <div className="flex gap-2 justify-center lg:justify-start">
                                    {SOCIAL_LINKS.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2.5 rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.02] hover:bg-black dark:hover:bg-white hover:border-black dark:hover:border-white group transition-all duration-300 active:scale-95"
                                            title={social.name}
                                        >
                                            <social.icon className="w-4 h-4 text-black/50 dark:text-white/50 group-hover:text-white dark:group-hover:text-black transition-colors duration-300" />
                                        </a>
                                    ))}
                                </div>
                            </ChaosContainer>
                        </div>

                        {/* RIGHT — Terminal + Stats, side by side on desktop */}
                        <div className="w-full lg:w-[320px] shrink-0 space-y-3">
                            <ChaosContainer intensity="low" direction="right" delay={0.5}>
                                <Card className="border border-black/[0.06] dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.02] backdrop-blur-sm rounded-2xl">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-1.5 mb-3">
                                            <div className="w-2 h-2 rounded-full bg-red-400/50" />
                                            <div className="w-2 h-2 rounded-full bg-yellow-400/50" />
                                            <div className="w-2 h-2 rounded-full bg-green-400/50" />
                                            <span className="ml-1.5 text-[9px] font-mono text-black/25 dark:text-white/25">~/hrushi</span>
                                        </div>
                                        <div className="font-mono space-y-1.5">
                                            <TerminalLine text="whoami" delay={2000} />
                                            <TerminalLine text="  Hrushi Bhanvadiya" delay={2600} prefix="→" />
                                            <TerminalLine text="cat interests.txt" delay={3300} />
                                            <TerminalLine text="  Systems · RAG · WebGPU" delay={3900} prefix="→" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </ChaosContainer>

                            <ChaosContainer intensity="low" direction="right" delay={0.7}>
                                <Card className="border border-black/[0.06] dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.02] backdrop-blur-sm rounded-2xl">
                                    <CardContent className="p-4">
                                        <p className="text-[9px] font-mono text-black/30 dark:text-white/30 uppercase tracking-widest mb-3 text-center">Competitive Coding</p>
                                        <div className="grid grid-cols-2 gap-4 text-center">
                                            <div>
                                                <div className="text-2xl font-extralight tracking-tight">1798</div>
                                                <div className="text-[10px] text-black/40 dark:text-white/40 font-mono mt-0.5">LeetCode</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-extralight tracking-tight">1217</div>
                                                <div className="text-[10px] text-black/40 dark:text-white/40 font-mono mt-0.5">Codeforces</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </ChaosContainer>
                        </div>
                    </div>
                </div>
            </main>

            {/* Scroll indicator */}
            <ChaosContainer intensity="low" direction="top" delay={1.5} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
                <div className="flex flex-col items-center gap-2">
                    <p className="text-[10px] text-black/25 dark:text-white/25 font-mono tracking-widest uppercase">Scroll</p>
                    <Button
                        onClick={scrollToSkills}
                        variant="ghost"
                        size="sm"
                        className="rounded-full w-10 h-10 border border-black/[0.06] dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.02] backdrop-blur-sm animate-bounce active:scale-90"
                    >
                        <ChevronDown className="w-4 h-4" />
                    </Button>
                </div>
            </ChaosContainer>
        </section>
    );
}
