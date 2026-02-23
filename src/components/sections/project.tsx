"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Trophy, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { ChaosContainer } from "@/components/ui/chaos-container";
import { cn } from "@/lib/utils";
import { track } from "@vercel/analytics";
import { motion, AnimatePresence } from "framer-motion";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

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
        links: { github: "https://github.com/hrushi2501/axon-webos", live: "#" },
        category: "systems",
        featured: true,
    },
    {
        title: "FinGuide",
        description: "Neurodivergent-first fintech web application with cognitive-adaptive UI, AI-powered budgeting, and task management tools.",
        highlights: [
            "Three Adaptive UI modes (Default, Simplify, Visual) adjusting to stress detection",
            "AI Financial Assistant powered by Google Gemini and Visual Budget Forecasting",
            "Accessibility-first design prioritizing ADHD, dyslexia, and anxiety"
        ],
        technologies: ["React", "TypeScript", "Node.js", "Tailwind", "Gemini AI"],
        links: { github: "https://github.com/hrushi2501/neuroguide" },
        category: "fintech",
        featured: true,
    },
    {
        title: "Financial Document RAG",
        description: "Retrieval-augmented system for semantic search and question answering over large-scale financial documents.",
        highlights: [
            "FinBERT embeddings and Pinecone vector indexing with citation-grounded responses",
        ],
        technologies: ["Python", "Flask", "Pinecone", "FinBERT"],
        links: { github: "https://github.com/hrushi2501/rag-financial" },
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
        links: { github: "https://github.com/hrushi2501/daa-project", live: "#" },
        category: "visualization",
    },
    {
        title: "CPU Scheduling Simulator",
        description: "Simulated FCFS, SJF, SRTN, and HRRN scheduling with dynamic arrivals, preemption, and Gantt chart generation.",
        highlights: [
            "Dynamic arrivals, preemption, and Gantt chart generation",
        ],
        technologies: ["JavaScript", "Flask", "Tailwind CSS"],
        links: { github: "https://github.com/hrushi2501/Scheduler-OS" },
        category: "systems",
    },
    {
        title: "Clinical AI",
        description: "Context-aware medical query application leveraging RAG to ground responses in verified medical documents.",
        highlights: [
            "Retrieval-Augmented Generation (RAG) implementation",
            "Side-by-side document viewing and citation verification"
        ],
        technologies: ["JavaScript", "Python", "CSS", "HTML"],
        links: { github: "https://github.com/hardattmangrola/PromptToPrototype" },
        category: "ai/ml",
    },
    {
        title: "Internship Scraper & Matcher",
        description: "Automated scraper that extracts software engineering internships from LinkedIn and Glassdoor, matching them against resume preferences.",
        highlights: [
            "Automated data extraction from multiple job boards",
            "Resume-based preference filtering and matching algorithm"
        ],
        technologies: ["Python", "Web Scraping", "Data Processing"],
        links: {},
        category: "automation",
    },
    {
        title: "LAPD Crime Analysis DAV",
        description: "Data analysis and visualization platform for Los Angeles Police Department crime statistics.",
        highlights: [
            "Interactive crime data visualization",
            "Data processing and statistical analysis pipeline"
        ],
        technologies: ["HTML", "JavaScript", "Python"],
        links: { github: "https://github.com/hrushi2501/LAPD-crime-analysis-DAV", live: "https://lapd-crime-analysis-dav.vercel.app/" },
        category: "data analysis",
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
            <Card className={`group h-full border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-black/[0.1] backdrop-blur-md rounded-2xl hover:border-black/20 dark:hover:border-white/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-500 overflow-hidden relative ${project.featured ? "border-l-[3px] border-l-black dark:border-l-white" : ""}`}>
                {project.featured && (
                    <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-black dark:bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] dark:shadow-[0_0_10px_rgba(255,255,255,0.5)]" title="Featured" />
                )}

                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-1">
                        <Badge variant="outline" className="font-mono text-[10px] tracking-wider uppercase border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] rounded-full">
                            {project.category}
                        </Badge>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {project.links.github && (
                                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black" asChild>
                                    <a href={project.links.github} onClick={() => track("Project Link", { title: project.title, type: "github" })} aria-label={`View ${project.title} on GitHub`} target="_blank" rel="noopener noreferrer">
                                        <Github className="w-3.5 h-3.5" />
                                    </a>
                                </Button>
                            )}
                            {project.links.live && (
                                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black" asChild>
                                    <a href={project.links.live} onClick={() => track("Project Link", { title: project.title, type: "live" })} aria-label={`View ${project.title} live demo`} target="_blank" rel="noopener noreferrer">
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
                                <Trophy className="w-3 h-3 mt-0.5 text-black/60 dark:text-white/60 shrink-0" />
                                <p className="text-[11px] font-light leading-relaxed text-black/70 dark:text-white/80">
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
                            <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
                                Selected Works
                            </h2>
                        </div>

                        {/* Pagination controls - Desktop Only */}
                        {totalPages > 1 && (
                            <Pagination className="hidden sm:flex justify-end w-auto m-0">
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={(e) => { e.preventDefault(); setCurrentPage(p => { const next = Math.max(0, p - 1); track("Projects Pagination", { direction: "prev", page: next }); return next; }); }}
                                            className={currentPage === 0 ? "pointer-events-none opacity-30 select-none" : "cursor-pointer"}
                                        />
                                    </PaginationItem>

                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <PaginationItem key={i} className="hidden sm:inline-block">
                                            <PaginationLink
                                                href="#"
                                                isActive={currentPage === i}
                                                onClick={(e) => { e.preventDefault(); track("Projects Pagination", { page: i }); setCurrentPage(i); }}
                                                className="cursor-pointer"
                                            >
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}

                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={(e) => { e.preventDefault(); setCurrentPage(p => { const next = Math.min(totalPages - 1, p + 1); track("Projects Pagination", { direction: "next", page: next }); return next; }); }}
                                            className={currentPage === totalPages - 1 ? "pointer-events-none opacity-30 select-none" : "cursor-pointer"}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
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
                        <p className="text-[11px] text-black/60 dark:text-white/60 font-mono">
                            {startIdx + 1}–{Math.min(startIdx + ITEMS_PER_PAGE, PROJECTS.length)} of {PROJECTS.length}
                        </p>
                    </div>
                )}

                {/* Pagination controls - Mobile Only (Huge tap targets) */}
                {totalPages > 1 && (
                    <ChaosContainer intensity="low" direction="top" delay={0.2} className="mt-8 flex sm:hidden justify-center items-center w-full">
                        <Pagination>
                            <PaginationContent className="gap-4">
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); setCurrentPage(p => { const next = Math.max(0, p - 1); track("Projects Pagination", { direction: "prev", page: next }); return next; }); }}
                                        className={cn("h-12 w-12 rounded-2xl flex items-center justify-center bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.1] dark:border-white/[0.1]", currentPage === 0 ? "pointer-events-none opacity-30 select-none" : "cursor-pointer active:scale-95")}
                                    />
                                </PaginationItem>
                                <PaginationItem>
                                    <div className="text-xs font-mono font-medium tracking-widest text-black/50 dark:text-white/50 px-4">
                                        {currentPage + 1} / {totalPages}
                                    </div>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); setCurrentPage(p => { const next = Math.min(totalPages - 1, p + 1); track("Projects Pagination", { direction: "next", page: next }); return next; }); }}
                                        className={cn("h-12 w-12 rounded-2xl flex items-center justify-center bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.1] dark:border-white/[0.1]", currentPage === totalPages - 1 ? "pointer-events-none opacity-30 select-none" : "cursor-pointer active:scale-95")}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </ChaosContainer>
                )}
            </div>
        </section>
    );
}