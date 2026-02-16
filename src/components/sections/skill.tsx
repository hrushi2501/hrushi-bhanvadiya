"use client";

import { Badge } from "@/components/ui/badge";
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

interface SkillsProps {
    className?: string;
}

interface SkillGroup {
    label: string;
    icon: ComponentType<{ className?: string }>;
    items: string[];
}

const TECH_GROUPS: SkillGroup[] = [
    {
        label: "Languages",
        icon: Code2,
        items: ["C", "C++", "Java", "Python", "SQL"]
    },
    {
        label: "Web Technologies",
        icon: Globe,
        items: ["HTML", "CSS", "JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS"]
    },
    {
        label: "AI / ML",
        icon: Brain,
        items: ["Retrieval-Augmented Generation", "Embeddings", "Vector Search", "Natural Language Processing"]
    },
    {
        label: "Systems & Tools",
        icon: Terminal,
        items: ["Rust", "Git", "GitHub", "Linux", "Flask", "WebSockets"]
    }
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
        <section id="skills" className={`py-16 md:py-20 ${className}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-8">
                {/* Header */}
                <ChaosContainer intensity="medium" direction="top" delay={0.1}>
                    <div className="flex items-center gap-3 mb-10">
                        <div className="p-2 rounded-lg bg-black/[0.04] dark:bg-white/[0.04]">
                            <Code2 className="w-5 h-5" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-thin tracking-tight">
                            Technical Stack
                        </h2>
                        <div className="ml-auto flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs text-black/50 dark:text-white/50 font-mono hidden sm:inline">IMPROVING</span>
                        </div>
                    </div>
                </ChaosContainer>

                {/* Tech Groups */}
                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                    {TECH_GROUPS.map((group, gi) => (
                        <ChaosContainer key={group.label} intensity="low" direction="bottom" delay={0.1 + gi * 0.08}>
                            <div className="p-4 rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.02] backdrop-blur-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <group.icon className="w-4 h-4 text-black/50 dark:text-white/50" />
                                    <span className="text-xs font-mono text-black/50 dark:text-white/50 uppercase tracking-wider">{group.label}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {group.items.map((skill) => (
                                        <Badge
                                            key={skill}
                                            variant="secondary"
                                            className="bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] rounded-lg px-3 py-1.5 text-xs font-normal hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 cursor-default active:scale-95"
                                        >
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </ChaosContainer>
                    ))}
                </div>

                {/* Soft Skills */}
                <ChaosContainer intensity="low" direction="bottom" delay={0.4}>
                    <div className="p-4 rounded-2xl border border-black/[0.06] dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.02] backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-3">
                            <Brain className="w-4 h-4 text-black/50 dark:text-white/50" />
                            <span className="text-xs font-mono text-black/50 dark:text-white/50 uppercase tracking-wider">Soft Skills</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {SOFT_SKILLS.map((skill) => (
                                <Badge
                                    key={skill.name}
                                    variant="secondary"
                                    className="bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] rounded-lg px-3 py-1.5 text-xs font-normal hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 cursor-default flex items-center gap-1.5 active:scale-95"
                                >
                                    <skill.icon className="w-3 h-3" />
                                    {skill.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </ChaosContainer>
            </div>
        </section>
    );
}