"use client";

import { Badge } from "@/components/ui/badge";
import { GraduationCap, Briefcase, Trophy, Calendar, MapPin } from "lucide-react";
import { ChaosContainer } from "@/components/ui/chaos-container";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface ExperienceProps {
    className?: string;
}

interface Experience {
    title: string;
    org: string;
    period: string;
    location: string;
    type: "leadership" | "education";
    description: string[];
    skills: string[];
    achievements?: string[];
}

const EXPERIENCES: Experience[] = [
    {
        title: "B.Tech. in Computer Science and Engineering",
        org: "Nirma University",
        period: "Jul 2023 – Present",
        location: "Ahmedabad, Gujarat",
        type: "education",
        description: [
            "Pursuing B.Tech. in Computer Science and Engineering",
            "CGPA: 8.72 / 10",
        ],
        skills: ["DSA", "OS", "DBMS", "Computer Networks", "AI/ML"]
    },
    {
        title: "Joint Secretary",
        org: "Computer Society of India, Nirma University",
        period: "Aug 2025 – Present",
        location: "Nirma University",
        type: "leadership",
        description: [
            "Led technical initiatives and coordinated activities involving 1200+ students and faculty members",
            "Organized large-scale hackathons, workshops, and interdisciplinary technical projects",
        ],
        skills: ["Leadership", "Event Management", "Public Speaking"],
        achievements: ["1200+ members coordinated"]
    },
    {
        title: "Core Committee Member",
        org: "CSI — Nirma University",
        period: "Aug 2024 – Jul 2025",
        location: "Nirma University",
        type: "leadership",
        description: [
            "Handled graphic design and event management for a three-day hackathon",
            "Organized CUBIX — Tech Fest",
        ],
        skills: ["Graphic Design", "Event Management", "Team Coordination"],
    },
];

const TYPE_META = {
    education: {
        icon: GraduationCap,
        accent: "bg-black/60 dark:bg-white/60",
        accentLight: "bg-black/[0.04] text-black/70 dark:bg-white/[0.04] dark:text-white/70",
        glow: "shadow-black/20 dark:shadow-white/20",
        label: "Education",
    },
    leadership: {
        icon: Briefcase,
        accent: "bg-black/60 dark:bg-white/60",
        accentLight: "bg-black/[0.04] text-black/70 dark:bg-white/[0.04] dark:text-white/70",
        glow: "shadow-black/20 dark:shadow-white/20",
        label: "Leadership",
    },
};

/**
 * Scroll-aware glowing timeline.
 * A single rAF scroll listener tracks how far each card is into the viewport.
 * The timeline line fills with a gradient and dots glow as you scroll past them.
 */
export default function Experience({ className }: ExperienceProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const timelineFillRef = useRef<HTMLDivElement>(null);
    const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeDots, setActiveDots] = useState<boolean[]>(new Array(EXPERIENCES.length).fill(false));

    useEffect(() => {
        const section = sectionRef.current;
        const timeline = timelineRef.current;
        const fillEl = timelineFillRef.current;
        if (!section || !timeline || !fillEl) return;

        // 1. Efficient Scroll Listener for the Glowing Line
        let raf = 0;
        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const tRect = timeline.getBoundingClientRect();
                const viewMid = window.innerHeight * 0.6;

                const fill = Math.min(
                    tRect.height,
                    Math.max(0, viewMid - tRect.top)
                );

                // Directly mutate DOM to bypass React Render phase for 60fps
                fillEl.style.height = `${fill}px`;
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        // 2. Intersection Observer for Dots
        const obs = new IntersectionObserver((entries) => {
            setActiveDots(prev => {
                const next = [...prev];
                entries.forEach(entry => {
                    const idx = Number(entry.target.getAttribute("data-index"));
                    if (!isNaN(idx)) {
                        next[idx] = entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight * 0.6;
                    }
                });
                return next;
            });
        }, { rootMargin: "-40% 0px -40% 0px", threshold: 0 });

        dotRefs.current.forEach(dot => {
            if (dot) obs.observe(dot);
        });

        return () => {
            window.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(raf);
            obs.disconnect();
        };
    }, []);

    return (
        <section id="experience" ref={sectionRef} className={cn("py-16 md:py-24 relative", className)}>
            <div className="max-w-3xl mx-auto px-4 sm:px-8">
                {/* Header */}
                <ChaosContainer intensity="medium" direction="top" delay={0.1}>
                    <div className="text-center mb-14">
                        <p className="text-xs font-mono text-black/40 dark:text-white/40 uppercase tracking-[0.2em] mb-3">
                            Journey
                        </p>
                        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                            Experience & Education
                        </h2>
                    </div>
                </ChaosContainer>

                {/* Timeline + Cards */}
                <div className="relative">
                    {/* Timeline track (background) */}
                    <div
                        ref={timelineRef}
                        className="absolute left-[20px] sm:left-[28px] top-0 bottom-0 w-[2px] bg-black/[0.04] dark:bg-white/[0.04] rounded-full"
                    />

                    {/* Timeline fill (glowing, scroll-aware) */}
                    <div
                        ref={timelineFillRef}
                        className="absolute left-[20px] sm:left-[28px] top-0 w-[2px] rounded-full transition-none ease-out"
                        style={{
                            background: "linear-gradient(to bottom, transparent, currentColor)", // Monochrome fading line
                            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                            color: "var(--foreground)"
                        }}
                    />

                    {/* Experience entries */}
                    <div className="space-y-6 sm:space-y-8">
                        {EXPERIENCES.map((exp, index) => {
                            const meta = TYPE_META[exp.type];
                            const Icon = meta.icon;
                            const isActive = activeDots[index];

                            return (
                                <ChaosContainer key={index} intensity="low" direction="bottom" delay={0.1 + index * 0.1}>
                                    <div className="relative pl-12 sm:pl-16">
                                        <div
                                            ref={(el) => { dotRefs.current[index] = el; }}
                                            data-index={index}
                                            className="absolute left-[11px] sm:left-[19px] top-6 z-10 transition-all duration-500"
                                        >
                                            <div className={cn(
                                                "w-5 h-5 rounded-full border-[2px] border-background flex items-center justify-center transition-all duration-500 bg-[#f8f9fa] dark:bg-[#0a0a0a]",
                                                isActive
                                                    ? "shadow-[0_0_15px] border-black dark:border-white shadow-black/20 dark:shadow-white/20"
                                                    : "border-black/20 dark:border-white/20"
                                            )}>
                                                <div className={cn(
                                                    "w-1.5 h-1.5 rounded-full transition-all duration-500",
                                                    isActive ? "bg-black dark:bg-white scale-100" : "bg-transparent scale-0"
                                                )} />
                                            </div>
                                        </div>

                                        {/* Card */}
                                        <div className={cn(
                                            "group p-5 sm:p-6 rounded-2xl border transition-all duration-500",
                                            isActive
                                                ? "border-black/[0.10] dark:border-white/[0.10] bg-white/60 dark:bg-white/[0.03] shadow-lg shadow-black/[0.04] dark:shadow-white/[0.02]"
                                                : "border-black/[0.06] dark:border-white/[0.06] bg-white/30 dark:bg-white/[0.01]"
                                        )}>
                                            {/* Top row — type badge + period */}
                                            <div className="flex items-center justify-between mb-3">
                                                <span className={cn(
                                                    "inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full transition-all duration-500",
                                                    meta.accentLight,
                                                    isActive ? "opacity-100" : "opacity-60"
                                                )}>
                                                    <Icon className="w-3 h-3" />
                                                    {meta.label}
                                                </span>
                                                <span className="flex items-center gap-1 text-[11px] font-mono text-black/60 dark:text-white/60">
                                                    <Calendar className="w-3 h-3" />
                                                    {exp.period}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 className={cn(
                                                "text-lg sm:text-xl font-medium tracking-tight leading-snug mb-1 transition-all duration-500",
                                                isActive ? "text-foreground" : "text-foreground/70"
                                            )}>
                                                {exp.title}
                                            </h3>

                                            {/* Org + location */}
                                            <div className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60 mb-3">
                                                <span className="font-medium text-black/80 dark:text-white/80">{exp.org}</span>
                                                <span className="text-black/40 dark:text-white/40">•</span>
                                                <span className="flex items-center gap-0.5 text-xs">
                                                    <MapPin className="w-3 h-3" />
                                                    {exp.location}
                                                </span>
                                            </div>

                                            {/* Description */}
                                            <ul className="space-y-1.5 mb-3">
                                                {exp.description.map((desc, i) => (
                                                    <li key={i} className="text-sm font-light text-black/60 dark:text-white/60 flex items-start gap-2">
                                                        <span className="block w-1 h-1 bg-black/20 dark:bg-white/20 rounded-full mt-[7px] shrink-0" />
                                                        {desc}
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Skills + achievements */}
                                            <div className="flex flex-wrap items-center gap-1.5">
                                                {exp.skills.map((skill) => (
                                                    <Badge
                                                        key={skill}
                                                        variant="secondary"
                                                        className="text-[10px] font-mono bg-black/[0.04] dark:bg-white/[0.05] border-0 rounded-full px-2.5 py-0.5"
                                                    >
                                                        {skill}
                                                    </Badge>
                                                ))}
                                                {exp.achievements?.map((ach, i) => (
                                                    <span key={i} className="text-[10px] font-medium text-black/60 dark:text-white/60 flex items-center gap-1 ml-1">
                                                        <Trophy className="w-3 h-3 opacity-60" />
                                                        {ach}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </ChaosContainer>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}