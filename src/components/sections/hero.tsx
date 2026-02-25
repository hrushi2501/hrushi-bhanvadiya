"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Mail, Code, ChevronDown, Download } from "lucide-react";
import { ChaosContainer } from "@/components/ui/chaos-container";
import { toast } from "sonner";
import { track } from "@vercel/analytics";
import { useRef, useState, useEffect, memo } from "react";

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

const TITLES = ["Hrushi Bhanvadiya", "Developer", "Problem Solver", "Engineer"];

const TypewriterTitle = memo(() => {
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const handleTyping = () => {
            const i = loopNum % TITLES.length;
            const fullText = TITLES[i];

            setText(current => isDeleting
                ? fullText.substring(0, current.length - 1)
                : fullText.substring(0, current.length + 1)
            );

            // Calculate next speed
            let nextSpeed = isDeleting ? 30 : 150;

            if (!isDeleting && text === fullText) {
                nextSpeed = 2000; // Pause at end
                setIsDeleting(true);
            } else if (isDeleting && text === "") {
                setIsDeleting(false);
                setLoopNum(l => l + 1);
                nextSpeed = 500; // Pause before next word
            }

            setTypingSpeed(nextSpeed);
        };

        const timer = setTimeout(handleTyping, typingSpeed) as unknown as number;
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed]);

    return (
        <span className="inline-flex items-center min-w-[200px]">
            {text}
            <span className="animate-typewriter-cursor ml-1 inline-block bg-black/80 dark:bg-white/80 w-1 h-[1em] align-middle"></span>
        </span>
    );
});
TypewriterTitle.displayName = "TypewriterTitle";

/* ─── Rotating interests typewriter (RESTORED) ─── */
const INTEREST_SETS = [
    "Systems Design · RAG · DSA",
    "RL · LLMs · Agentic AI",
    "Cloud Native · ML · DBMS",
    "OS · DL · Python",
];

const RotatingInterests = memo(({ startDelay = 0 }: { startDelay?: number }) => {
    const [text, setText] = useState("");
    const [showCursor, setShowCursor] = useState(false);

    useEffect(() => {
        let cancelled = false;
        const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

        async function run() {
            await sleep(startDelay);
            if (cancelled) return;
            setShowCursor(true);
            let idx = 0;

            while (!cancelled) {
                const target = INTEREST_SETS[idx % INTEREST_SETS.length];

                // Type forward
                for (let i = 1; i <= target.length; i++) {
                    if (cancelled) return;
                    setText(target.slice(0, i));
                    await sleep(40);
                }

                // Pause while fully typed
                await sleep(2500);

                // Erase backward
                for (let i = target.length - 1; i >= 0; i--) {
                    if (cancelled) return;
                    setText(target.slice(0, i));
                    await sleep(20);
                }

                await sleep(400);
                idx++;
            }
        }

        run();
        return () => { cancelled = true; };
    }, [startDelay]);

    return (
        <span className="text-black/60 dark:text-white/60 inline-flex items-center min-w-[280px]">
            {text}
            {showCursor && <span className="animate-typewriter-cursor ml-0.5 text-black dark:text-white inline-block">▎</span>}
        </span>
    );
});
RotatingInterests.displayName = "RotatingInterests";

const SOCIAL_LINKS = [
    { name: "GitHub", icon: GitHubIcon, href: "https://github.com/hrushi2501" },
    { name: "LinkedIn", icon: LinkedInIcon, href: "https://www.linkedin.com/in/hrushi-bhanvadiya-081818280/" },
    { name: "Email", icon: Mail, href: "mailto:hrushibhanvadiya@gmail.com" },
    { name: "LeetCode", icon: Code, href: "https://leetcode.com/Hrushi2501" }
] as const;

const TECHNOLOGIES = ["C++", "Python", "Next.js", "TypeScript", "React.js", "Flask", "Tailwind CSS"] as const;

export default function Hero() {
    const sectionRef = useRef<HTMLDivElement>(null);

    const bentoCardClass = "relative overflow-hidden rounded-[2rem] border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.03] dark:bg-white/[0.03] backdrop-blur-xl shadow-sm hover:bg-black/[0.05] dark:hover:bg-white/[0.05] hover:border-black/[0.1] dark:hover:border-white/[0.1] transition-all duration-500 h-full w-full flex flex-col";

    return (
        <section ref={sectionRef} className="relative flex flex-col min-h-[100svh] overflow-hidden">
            <main className="relative z-10 flex-1 flex items-center pt-24 pb-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-8 w-full">
                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)] md:auto-rows-[190px]">

                        {/* 1. Main Identity (2x2) */}
                        <ChaosContainer intensity="low" delay={0.2} className="md:col-span-2 md:row-span-2 h-full">
                            <div className={bentoCardClass + " p-8 md:p-10 justify-between dark:bg-white/[0.02]"}>
                                <div>
                                    <Badge variant="default" className="bg-black/10 dark:bg-white/10 text-black dark:text-white px-3 py-1 mb-6 text-[10px] font-mono rounded-full tracking-wider border-0 flex items-center gap-2 w-fit">
                                        <div className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </div>
                                        OPEN TO WORK
                                    </Badge>
                                    <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-4">
                                        <span className="font-light text-black dark:text-white">Hrushi</span>
                                        <br />
                                        <span className="font-light text-black/70 dark:text-white/70">Bhanvadiya</span>
                                    </h1>
                                    <p className="text-black/70 dark:text-white/70 font-light max-w-sm text-sm sm:text-base">
                                        Computer Science Undergrad building stuff.
                                    </p>
                                </div>
                                <div className="mt-8">
                                    <button
                                        onClick={() => {
                                            track("Resume Download", { source: "hero_button" });
                                            toast("Downloading Resume...", { description: "Your file is opening in a new tab." });
                                            setTimeout(() => {
                                                window.open("/resume.pdf", "_blank");
                                            }, 500);
                                        }}
                                        className="inline-flex justify-center items-center gap-2 w-full sm:w-auto px-6 py-3.5 sm:px-5 sm:py-2.5 rounded-2xl sm:rounded-full text-sm sm:text-xs font-medium bg-black dark:bg-white text-white dark:text-black hover:scale-[1.03] transition-transform duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
                                    >
                                        <Download className="w-3.5 h-3.5" />
                                        Download Resume
                                        <kbd className="hidden sm:inline-flex ml-2 items-center gap-1 rounded border border-white/20 dark:border-black/20 bg-white/10 dark:bg-black/10 px-1.5 font-mono text-[10px] font-medium opacity-80">
                                            <span className="text-[9px]">⌘</span>D
                                        </kbd>
                                    </button>
                                </div>
                            </div>
                        </ChaosContainer>

                        {/* 2. Terminal Activity (2x1) */}
                        <ChaosContainer intensity="low" direction="right" delay={0.3} className="md:col-span-2 md:row-span-1 h-full">
                            <div className={bentoCardClass}>
                                <div className="bg-black/[0.04] dark:bg-white/[0.04] px-6 py-4 flex items-center gap-2 border-b border-black/[0.06] dark:border-white/[0.06]">
                                    <div className="w-3 h-3 rounded-full border-[0.5px] border-black/10 dark:border-black/50 bg-[#ff5f56]" />
                                    <div className="w-3 h-3 rounded-full border-[0.5px] border-black/10 dark:border-black/50 bg-[#ffbd2e]" />
                                    <div className="w-3 h-3 rounded-full border-[0.5px] border-black/10 dark:border-black/50 bg-[#27c93f]" />
                                    <div className="ml-2 text-[10px] font-mono text-black/60 dark:text-white/60">~/hrushi</div>
                                </div>
                                <div className="p-5 font-mono text-xs sm:text-sm text-black/80 dark:text-white/80 space-y-3 flex-1 flex flex-col justify-center">
                                    <div>
                                        <div className="flex gap-2 text-black/60 dark:text-white/60">
                                            <span>$</span>
                                            <span className="text-black/90 dark:text-white/90">whoami</span>
                                        </div>
                                        <div className="mt-1 pl-4 text-black dark:text-white font-medium min-h-[1.5rem] flex items-center">
                                            ➜ <TypewriterTitle />
                                        </div>
                                    </div>
                                    <div className="pt-2 opacity-80">
                                        <div className="flex gap-2 text-black/60 dark:text-white/60">
                                            <span>$</span>
                                            <span className="text-black/90 dark:text-white/90">ls current_focus/</span>
                                        </div>
                                        <div className="mt-1 pl-4 flex flex-wrap gap-x-3 text-black/60 dark:text-white/60 min-h-[1.5rem] items-center">
                                            ➜ <RotatingInterests startDelay={500} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ChaosContainer>

                        {/* 3. Location / Uni (1x1) */}
                        <ChaosContainer intensity="low" direction="bottom" delay={0.4} className="md:col-span-1 md:row-span-1 h-full">
                            <div className={bentoCardClass + " p-6 flex flex-col justify-center items-center text-center group"}>
                                <div className="w-10 h-10 rounded-full bg-black/[0.04] dark:bg-white/[0.04] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 opacity-70">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-sm font-medium">Ahmedabad, IN</h2>
                                <p className="text-xs text-black/70 dark:text-white/70 mt-1">Nirma University</p>
                            </div>
                        </ChaosContainer>

                        {/* 4. Coding Stats (1x1) */}
                        <ChaosContainer intensity="low" direction="bottom" delay={0.5} className="md:col-span-1 md:row-span-1 h-full">
                            <div className={bentoCardClass + " p-6 flex flex-col justify-center"}>
                                <div className="space-y-4 w-full">
                                    <div className="flex flex-col">
                                        <div className="text-3xl font-light tabular-nums">1798</div>
                                        <div className="text-[9px] text-black/60 dark:text-white/60 font-mono tracking-wider mt-0.5 uppercase">LeetCode</div>
                                    </div>
                                    <div className="w-full h-px bg-black/[0.1] dark:bg-white/[0.1]" />
                                    <div className="flex flex-col">
                                        <div className="text-3xl font-light tabular-nums">1217</div>
                                        <div className="text-[9px] text-black/60 dark:text-white/60 font-mono tracking-wider mt-0.5 uppercase">Codeforces</div>
                                    </div>
                                </div>
                            </div>
                        </ChaosContainer>

                        {/* 5. Tech Stack (1x1 on grid, maybe spanning) */}
                        <ChaosContainer intensity="low" direction="left" delay={0.6} className="md:col-span-2 lg:col-span-2 md:row-span-1 h-full">
                            <div className={bentoCardClass + " p-6 flex flex-col justify-center"}>
                                <h2 className="text-[10px] font-mono text-black/60 dark:text-white/60 mb-4 tracking-widest uppercase">Select Technologies</h2>
                                <div className="flex flex-wrap gap-2">
                                    {TECHNOLOGIES.slice(0, 7).map((tech) => (
                                        <Badge
                                            key={tech}
                                            variant="secondary"
                                            className="bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.06] dark:border-white/[0.06] text-black/70 dark:text-white/70 px-2.5 py-1 rounded-lg font-mono text-[10px] font-normal"
                                        >
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </ChaosContainer>

                        {/* 6. Socials (1x1 or 2x1) */}
                        <ChaosContainer intensity="low" direction="right" delay={0.7} className="md:col-span-1 lg:col-span-2 md:row-span-1 h-full">
                            <div className={bentoCardClass + " p-6 flex flex-col justify-center items-center lg:flex-row lg:justify-start gap-4"}>
                                <p className="text-[10px] font-mono text-black/60 dark:text-white/60 tracking-widest uppercase hidden lg:block mr-2">Connect</p>
                                <div className="flex gap-3 grid-cols-2 lg:flex lg:flex-nowrap">
                                    <TooltipProvider>
                                        {SOCIAL_LINKS.map((social) => (
                                            <Tooltip key={social.name}>
                                                <TooltipTrigger asChild>
                                                    <a
                                                        href={social.href}
                                                        aria-label={social.name}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={() => track("Social Link Click", { platform: social.name })}
                                                        className="w-12 h-12 lg:w-10 lg:h-10 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black flex items-center justify-center transition-all duration-300"
                                                    >
                                                        <social.icon className="w-4 h-4 lg:w-3.5 lg:h-3.5" />
                                                    </a>
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-white/70 dark:bg-black/70 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.06] text-black dark:text-white text-[10px] font-mono tracking-widest px-3 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.1)] transition-all duration-300">
                                                    <p>{social.name}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        ))}
                                    </TooltipProvider>
                                </div>
                            </div>
                        </ChaosContainer>

                    </div>
                </div>
            </main>

            {/* Scroll indicator - Desktop Only (replaces with NavDock on mobile) */}
            <ChaosContainer intensity="low" direction="top" delay={1.5} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden sm:flex">
                <div className="flex flex-col items-center gap-2">
                    <p className="text-[9px] text-black/60 dark:text-white/60 font-mono tracking-widest uppercase">Scroll</p>
                    <div className="w-[1px] h-8 bg-gradient-to-b from-black/50 to-transparent dark:from-white/50" />
                </div>
            </ChaosContainer>
        </section>
    );
}
