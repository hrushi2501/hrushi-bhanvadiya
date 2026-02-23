"use client";

import { ChaosContainer } from "@/components/ui/chaos-container";
import {
    Code2,
    Brain,
    Globe,
    Terminal,
    Lightbulb,
    MessageSquare,
    Users,
    Award,
    TrendingUp,
    Clock
} from "lucide-react";
import { ComponentType } from "react";
import { Badge } from "@/components/ui/badge";

interface SkillsProps {
    className?: string;
}

interface SkillGroup {
    label: string;
    icon: ComponentType<{ className?: string }>;
    items: string[];
    gradient: string;     // gradient for the accent stripe on hover
    dotColor: string;     // category dot color
}

const TECH_GROUPS: SkillGroup[] = [
    {
        label: "Languages",
        icon: Code2,
        items: ["C", "C++", "Java", "Python", "SQL"],
        gradient: "from-black/20 to-transparent dark:from-white/20 dark:to-transparent",
        dotColor: "bg-black/40 dark:bg-white/40",
    },
    {
        label: "Web Technologies",
        icon: Globe,
        items: ["HTML", "CSS", "JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS"],
        gradient: "from-black/20 to-transparent dark:from-white/20 dark:to-transparent",
        dotColor: "bg-black/40 dark:bg-white/40",
    },
    {
        label: "AI / ML",
        icon: Brain,
        items: ["RAG", "Embeddings", "Vector Search", "NLP"],
        gradient: "from-black/20 to-transparent dark:from-white/20 dark:to-transparent",
        dotColor: "bg-black/40 dark:bg-white/40",
    },
    {
        label: "Systems & Tools",
        icon: Terminal,
        items: ["Rust", "Git", "GitHub", "Linux", "Flask", "WebSockets"],
        gradient: "from-black/20 to-transparent dark:from-white/20 dark:to-transparent",
        dotColor: "bg-black/40 dark:bg-white/40",
    },
];

const SOFT_SKILLS = [
    { name: "Problem Solving", icon: Lightbulb },
    { name: "Communication", icon: MessageSquare },
    { name: "Collaboration", icon: Users },
    { name: "Leadership", icon: Award },
    { name: "Adaptability", icon: TrendingUp },
    { name: "Time Management", icon: Clock },
];

export default function Skills({ className }: SkillsProps) {
    return (
        <section id="skills" className={`py-16 md:py-24 ${className}`}>
            <div className="max-w-3xl mx-auto px-4 sm:px-8">
                {/* Header */}
                <ChaosContainer intensity="medium" direction="top" delay={0.1}>
                    <div className="text-center mb-16">
                        <p className="text-xs font-mono text-black/40 dark:text-white/40 uppercase tracking-[0.2em] mb-3">
                            Toolkit
                        </p>
                        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                            Technical Stack
                        </h2>
                        <div className="flex items-center justify-center gap-1.5 mt-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-black/60 dark:bg-white/60 animate-pulse" />
                            <span className="text-[10px] text-black/40 dark:text-white/40 font-mono uppercase tracking-wider">Always Improving</span>
                        </div>
                    </div>
                </ChaosContainer>

                {/* Skill categories — each is a section with flowing skill tiles */}
                <div className="space-y-10">
                    {TECH_GROUPS.map((group, gi) => (
                        <ChaosContainer
                            key={group.label}
                            intensity="low"
                            direction={gi % 2 === 0 ? "left" : "right"}
                            delay={0.08 + gi * 0.06}
                        >
                            <div>
                                {/* Category header — inline with a thin line */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-1.5 h-1.5 rounded-full ${group.dotColor}`} />
                                    <group.icon className="w-3.5 h-3.5 text-black/40 dark:text-white/40" />
                                    <span className="text-[11px] font-mono text-black/40 dark:text-white/40 uppercase tracking-[0.15em]">
                                        {group.label}
                                    </span>
                                    <div className="flex-1 h-px bg-black/[0.06] dark:bg-white/[0.06]" />
                                </div>

                                {/* Skill tiles — rendered as custom-styled Shadcn Badges */}
                                <div className="flex flex-wrap gap-2">
                                    {group.items.map((skill) => (
                                        <Badge
                                            key={skill}
                                            variant="secondary"
                                            className="group/card relative overflow-hidden rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-md px-4 py-2 cursor-default hover:border-black/[0.15] dark:hover:border-white/[0.15] hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/[0.04] dark:hover:shadow-white/[0.04] transition-all duration-300 text-sm font-medium tracking-tight text-black/75 dark:text-white/75 hover:text-black dark:hover:text-white"
                                        >
                                            {/* Accent stripe — appears on hover */}
                                            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${group.gradient} opacity-0 group-hover/card:opacity-100 transition-opacity duration-300`} />
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </ChaosContainer>
                    ))}

                    {/* Soft skills — different visual treatment */}
                    <ChaosContainer intensity="low" direction="bottom" delay={0.4}>
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-black/40 dark:bg-white/40" />
                                <Brain className="w-3.5 h-3.5 text-black/40 dark:text-white/40" />
                                <span className="text-[11px] font-mono text-black/40 dark:text-white/40 uppercase tracking-[0.15em]">
                                    Soft Skills
                                </span>
                                <div className="flex-1 h-px bg-black/[0.06] dark:bg-white/[0.06]" />
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {SOFT_SKILLS.map((skill) => (
                                    <div
                                        key={skill.name}
                                        className="group/soft flex items-center gap-2 px-4 py-2.5 rounded-full border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-md cursor-default hover:border-black/[0.15] dark:hover:border-white/[0.15] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                                    >
                                        <skill.icon className="w-3.5 h-3.5 opacity-50 group-hover/soft:opacity-100 transition-opacity duration-300" />
                                        <span className="text-sm font-medium tracking-tight">{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ChaosContainer>
                </div>
            </div>
        </section>
    );
}