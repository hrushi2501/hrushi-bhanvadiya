"use client";

import { Badge } from "@/components/ui/badge";
import { Building2, Trophy } from "lucide-react";
import { ChaosContainer } from "@/components/ui/chaos-container";
import { cn } from "@/lib/utils";

interface ExperienceProps {
    className?: string;
}

interface Experience {
    title: string;
    company: string;
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
        company: "Nirma University",
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
        company: "Computer Society of India, Nirma University",
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
];

const TYPE_COLORS: Record<string, string> = {
    education: "bg-blue-500",
    leadership: "bg-purple-500",
};

export default function Experience({ className }: ExperienceProps) {
    return (
        <section id="experience" className={cn("py-16 md:py-20 relative", className)}>
            <div className="max-w-6xl mx-auto px-4 sm:px-8">
                {/* Header */}
                <ChaosContainer intensity="medium" direction="top" delay={0.1}>
                    <div className="flex items-center gap-3 mb-10">
                        <div className="p-2 rounded-lg bg-black/[0.04] dark:bg-white/[0.04]">
                            <Building2 className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-thin tracking-tight">
                            Experience & Education
                        </h2>
                    </div>
                </ChaosContainer>

                {/* Timeline List */}
                <div className="relative pl-6 sm:pl-8 border-l border-black/[0.08] dark:border-white/[0.08]">
                    {EXPERIENCES.map((exp, index) => (
                        <ChaosContainer key={index} intensity="low" direction="left" delay={0.1 + index * 0.08}>
                            <div className="relative mb-8 last:mb-0 group">
                                {/* Timeline dot */}
                                <div className="absolute -left-[calc(1.5rem+4.5px)] sm:-left-[calc(2rem+4.5px)] top-1.5 flex items-center justify-center">
                                    <div className={cn(
                                        "w-[9px] h-[9px] rounded-full ring-[3px] ring-white dark:ring-[#1a1a1a] transition-transform duration-300 group-hover:scale-150",
                                        TYPE_COLORS[exp.type] || "bg-black dark:bg-white"
                                    )} />
                                </div>

                                {/* Content */}
                                <div className="space-y-1.5">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                                        <h3 className="text-base sm:text-lg font-medium group-hover:text-glow transition-all duration-300">{exp.title}</h3>
                                        <span className="text-xs font-mono text-black/40 dark:text-white/40 sm:ml-auto whitespace-nowrap">{exp.period}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60">
                                        <span className="font-medium">{exp.company}</span>
                                        <span className="text-black/25 dark:text-white/25">•</span>
                                        <span className="text-black/40 dark:text-white/40">{exp.location}</span>
                                    </div>

                                    <ul className="space-y-1 pt-1">
                                        {exp.description.map((desc, i) => (
                                            <li key={i} className="text-sm font-light text-black/65 dark:text-white/65 flex items-start gap-2">
                                                <span className="block w-1 h-1 bg-black/20 dark:bg-white/20 rounded-full mt-2 shrink-0" />
                                                {desc}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                                        {exp.skills.map((skill) => (
                                            <Badge
                                                key={skill}
                                                variant="secondary"
                                                className="text-[10px] font-mono bg-black/[0.03] dark:bg-white/[0.05] border-0 rounded-full px-2 py-0.5"
                                            >
                                                {skill}
                                            </Badge>
                                        ))}
                                        {exp.achievements?.map((ach, i) => (
                                            <span key={i} className="text-[10px] font-medium text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
                                                <Trophy className="w-3 h-3" />
                                                {ach}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </ChaosContainer>
                    ))}
                </div>
            </div>
        </section>
    );
}