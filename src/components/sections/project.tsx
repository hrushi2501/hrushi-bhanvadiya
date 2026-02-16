"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Trophy, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { ChaosContainer } from "@/components/ui/chaos-container";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectProps {
    className?: string;
}

interface Project {
    title: string;
    description: string;
    highlights: string[];
    technologies: string[];
    links: { github?: string; live?: string };
    category: string;
    featured?: boolean;
}

const PROJECTS: Project[] = [
    {
        title: "Axon OS",
        description: "Browser-Based Portfolio Operating System with window management, virtual file system, and AI-controlled workflows.",
        highlights: [
            "AI copilot using Gemini with persistent prompt constraints and contextual UI awareness",
            "Rust backend using Axum and Tokio for real-time system metrics via WebSockets",
        ],
        technologies: ["Next.js", "Rust", "WebGPU"],
        links: { github: "#", live: "#" },
        category: "systems",
        featured: true,
    },
    {
        title: "Financial Document RAG",
        description: "Retrieval-augmented system for semantic search and question answering over large-scale financial documents.",
        highlights: [
            "FinBERT embeddings and Pinecone vector indexing with citation-grounded responses",
        ],
        technologies: ["Python", "Flask", "Pinecone", "FinBERT"],
        links: { github: "#" },
        category: "ai/ml",
        featured: true,
    },
    {
        title: "DB Index Visualizer",
        description: "Interactive visualizations for LSM Trees, Bloom Filters, and Skip Lists with real-time operation tracing.",
        highlights: [
            "Real-time operation tracing and step-by-step visualization",
        ],
        technologies: ["JavaScript", "HTML5 Canvas"],
        links: { github: "#", live: "#" },
        category: "visualization",
    },
    {
        title: "CPU Scheduling Simulator",
        description: "Simulated FCFS, SJF, SRTN, and HRRN scheduling with dynamic arrivals, preemption, and Gantt chart generation.",
        highlights: [
            "Dynamic arrivals, preemption, and Gantt chart generation",
        ],
        technologies: ["JavaScript", "Flask", "Tailwind CSS"],
        links: { github: "#" },
        category: "systems",
    },
];

const ITEMS_PER_PAGE = 4;

function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <ChaosContainer
            intensity="low"
            direction={index % 2 === 0 ? "left" : "right"}
            delay={0.1 + index * 0.08}
        >
            <Card className="group h-full border border-black/[0.06] dark:border-white/[0.06] bg-white/40 dark:bg-white/[0.02] backdrop-blur-sm rounded-2xl hover:border-black/20 dark:hover:border-white/20 hover:shadow-xl transition-all duration-500 overflow-hidden relative">
                {project.featured && (
                    <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-green-500" title="Featured" />
                )}

                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-1">
                        <Badge variant="outline" className="font-mono text-[10px] tracking-wider uppercase border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] rounded-full">
                            {project.category}
                        </Badge>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {project.links.github && (
                                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black" asChild>
                                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                                        <Github className="w-3.5 h-3.5" />
                                    </a>
                                </Button>
                            )}
                            {project.links.live && (
                                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black" asChild>
                                    <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                </Button>
                            )}
                        </div>
                    </div>
                    <CardTitle className="text-lg font-light group-hover:text-glow transition-all duration-300">{project.title}</CardTitle>
                    <CardDescription className="text-sm font-light leading-relaxed mt-1">{project.description}</CardDescription>
                </CardHeader>

                <CardContent className="pt-0 pb-4">
                    <div className="space-y-1.5 mb-3">
                        {project.highlights.map((highlight, i) => (
                            <div key={i} className="flex items-start gap-1.5">
                                <Trophy className="w-3 h-3 mt-0.5 text-yellow-600/60 dark:text-yellow-400/60 shrink-0" />
                                <p className="text-[11px] font-light leading-relaxed text-black/60 dark:text-white/60">
                                    {highlight}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                            <Badge
                                key={tech}
                                variant="secondary"
                                className="bg-black/[0.03] dark:bg-white/[0.05] border-0 text-[10px] font-mono rounded-full px-2 py-0.5"
                            >
                                {tech}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </ChaosContainer>
    );
}

export default function Projects({ className }: ProjectProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(PROJECTS.length / ITEMS_PER_PAGE);
    const startIdx = currentPage * ITEMS_PER_PAGE;
    const currentProjects = PROJECTS.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    return (
        <section id="projects" className={cn("py-16 md:py-20 relative", className)}>
            <div className="max-w-6xl mx-auto px-4 sm:px-8">
                {/* Header */}
                <ChaosContainer intensity="medium" direction="top" delay={0.1}>
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-black/[0.04] dark:bg-white/[0.04]">
                                <Layers className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-thin tracking-tight">
                                Selected Works
                            </h2>
                        </div>

                        {/* Pagination controls */}
                        {totalPages > 1 && (
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                                    disabled={currentPage === 0}
                                    className="rounded-full w-8 h-8 border-black/[0.08] dark:border-white/[0.08] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all disabled:opacity-30"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </Button>

                                <div className="flex items-center gap-1.5 px-2">
                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i)}
                                            className={cn(
                                                "w-1.5 h-1.5 rounded-full transition-all duration-300",
                                                i === currentPage
                                                    ? "bg-black dark:bg-white w-4"
                                                    : "bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40"
                                            )}
                                        />
                                    ))}
                                </div>

                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                                    disabled={currentPage === totalPages - 1}
                                    className="rounded-full w-8 h-8 border-black/[0.08] dark:border-white/[0.08] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all disabled:opacity-30"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                </ChaosContainer>

                {/* Projects Grid — paginated with animation */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPage}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="grid sm:grid-cols-2 gap-4"
                    >
                        {currentProjects.map((project, index) => (
                            <ProjectCard key={project.title} project={project} index={index} />
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Page indicator — bottom */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-6">
                        <p className="text-[11px] text-black/30 dark:text-white/30 font-mono">
                            {startIdx + 1}–{Math.min(startIdx + ITEMS_PER_PAGE, PROJECTS.length)} of {PROJECTS.length}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}