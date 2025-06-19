"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
    Github, 
    ExternalLink, 
    Code, 
    Database, 
    Brain, 
    Vote, 
    TrendingUp,
    Users,
    Clock,
    Target,
    Zap,
    LucideIcon
} from "lucide-react";

interface ProjectProps {
    className?: string;
}

interface Project {
    id: string;
    title: string;
    category: "web" | "ai" | "blockchain" | "quant";
    description: string;
    challenge: string;
    solution: string;
    techStack: string[];
    metrics: {
        label: string;
        value: string;
    }[];
    links: {
        github?: string;
        live?: string;
        demo?: string;
    };
    status: "completed" | "in-progress" | "archived";
    collaboration?: {
        teamSize: number;
        role: string;
    };
    icon: LucideIcon;
}

export default function Projects({ className }: ProjectProps) {
    const projects: Project[] = [
        {
            id: "ai-hr-interview",
            title: "AI HR Interview System",
            category: "ai",
            description: "AI-driven interview system with GPT-based candidate evaluation and structured feedback algorithms.",
            challenge: "Traditional HR interviews lack consistency in evaluation and consume significant time resources.",
            solution: "Developed an intelligent system using OpenAI GPT for standardized candidate assessment with real-time feedback generation.",
            techStack: ["Python", "OpenAI API", "MongoDB", "Svelte", "FastAPI"],
            metrics: [
                { label: "Evaluation Time", value: "↓75%" },
                { label: "Consistency Score", value: "94%" },
                { label: "Feedback Quality", value: "A+" }
            ],
            links: {
                github: "https://github.com/hrushi2501/ai-hr-system"
            },
            status: "completed",
            collaboration: {
                teamSize: 4,
                role: "Backend Lead"
            },
            icon: Brain
        },
        {
            id: "bandwidth-simulator",
            title: "Dynamic Bandwidth Allocation Simulator",
            category: "web",
            description: "Full-featured web application simulating network bandwidth allocation with real-time visualization.",
            challenge: "Network engineers need intuitive tools to visualize and test bandwidth allocation strategies.",
            solution: "Built comprehensive simulator with packet tracer, terminal interface, and dynamic metrics visualization using modern web technologies.",
            techStack: ["React.js", "TypeScript", "Tailwind CSS", "MongoDB", "D3.js"],
            metrics: [
                { label: "Algorithm Types", value: "8+" },
                { label: "Real-time Updates", value: "60fps" },
                { label: "Network Scenarios", value: "12+" }
            ],
            links: {
                github: "https://github.com/hrushi2501/bandwidth-simulator",
                live: "https://bandwidth-sim.vercel.app"
            },
            status: "completed",
            collaboration: {
                teamSize: 2,
                role: "Full Stack Developer"
            },
            icon: Database
        },
        {
            id: "process-scheduler",
            title: "Process Scheduling Algorithms Simulator",
            category: "web",
            description: "Interactive simulator for CPU scheduling algorithms with dynamic process management and Gantt chart visualization.",
            challenge: "Students struggle to understand complex scheduling algorithms without visual representation.",
            solution: "Created web-based simulator with real-time process input, multiple algorithms, and comprehensive visualization tools.",
            techStack: ["JavaScript", "HTML", "Tailwind CSS", "Flask", "Chart.js"],
            metrics: [
                { label: "Algorithms", value: "4 Types" },
                { label: "Process Handling", value: "Dynamic" },
                { label: "Visualization", value: "Real-time" }
            ],
            links: {
                github: "https://github.com/hrushi2501/process-scheduler"
            },
            status: "completed",
            collaboration: {
                teamSize: 2,
                role: "Backend Developer and Interface Designer"
            },
            icon: Code
        },
        {
            id: "blockchain-voting",
            title: "Blockchain Voting System",
            category: "blockchain",
            description: "Decentralized voting platform ensuring transparency, immutability, and voter anonymity using blockchain technology.",
            challenge: "Traditional voting systems lack transparency and are vulnerable to manipulation and fraud.",
            solution: "Implemented smart contract-based voting system with cryptographic security and decentralized validation.",
            techStack: ["Solidity", "Web3.js", "React.js", "Ethereum", "MetaMask", "IPFS"],
            metrics: [
                { label: "Security Level", value: "256-bit" },
                { label: "Transaction Cost", value: "~$0.02" },
                { label: "Immutability", value: "100%" }
            ],
            links: {
                github: "https://github.com/hrushi2501/blockchain-voting",
                demo: "https://voting-demo.vercel.app"
            },
            status: "in-progress",
            collaboration: {
                teamSize: 1,
                role: "Blockchain Developer"
            },
            icon: Vote
        },
        {
            id: "quant-trading-bot",
            title: "Quantitative Trading Algorithm",
            category: "quant",
            description: "Algorithmic trading system using statistical arbitrage and machine learning for market prediction.",
            challenge: "Manual trading lacks speed and consistency required for modern financial markets.",
            solution: "Developed automated trading bot with risk management, backtesting engine, and real-time market analysis.",
            techStack: ["Python", "NumPy", "Pandas", "Scikit-learn", "Alpha Vantage API", "PostgreSQL"],
            metrics: [
                { label: "Sharpe Ratio", value: "1.47" },
                { label: "Max Drawdown", value: "8.2%" },
                { label: "Win Rate", value: "68%" }
            ],
            links: {
                github: "https://github.com/hrushi2501/quant-trading"
            },
            status: "in-progress",
            collaboration: {
                teamSize: 2,
                role: "Quant Developer"
            },
            icon: TrendingUp
        }
    ];

    const categories = [
        { id: "all", label: "All Projects", count: projects.length },
        { id: "web", label: "Web Apps", count: projects.filter(p => p.category === "web").length },
        { id: "ai", label: "AI/ML", count: projects.filter(p => p.category === "ai").length },
        { id: "blockchain", label: "Blockchain", count: projects.filter(p => p.category === "blockchain").length },
        { id: "quant", label: "Quantitative", count: projects.filter(p => p.category === "quant").length }
    ];

    const filteredProjects = (category: string) => {
        return category === "all" ? projects : projects.filter(p => p.category === category);
    };

    return (
        <section id="projects" className={`py-24 ${className}`}>
            <div className="max-w-6xl mx-auto px-8">
                {/* Section Header */}
                <div className="space-y-8 mb-16">
                    <div className="space-y-4">
                        <div className="inline-block">
                            <Badge 
                                variant="default" 
                                className="bg-black dark:bg-white text-white dark:text-black px-5 py-2 text-xs font-mono rounded-full tracking-wider border-0 font-medium"
                            >
                                FEATURED WORK
                            </Badge>
                        </div>
                        
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-thin leading-[0.9] tracking-tighter text-left">
                            Projects
                            <br />
                            <span className="text-black/55 dark:text-white/55">& Solutions</span>
                        </h2>
                        
                        <p className="text-lg text-black/70 dark:text-white/70 max-w-2xl leading-relaxed font-light">
                            Technical implementations solving real-world problems through
                            systematic engineering and innovative approaches.
                        </p>
                    </div>

                    <Separator className="bg-black/10 dark:bg-white/10" />

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-2xl font-thin tracking-tight">{projects.length}</div>
                            <div className="text-xs text-black/50 dark:text-white/50 font-mono">PROJECTS</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-thin tracking-tight">
                                {projects.reduce((acc, p) => acc + p.techStack.length, 0)}
                            </div>
                            <div className="text-xs text-black/50 dark:text-white/50 font-mono">TECHNOLOGIES</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-thin tracking-tight">
                                {projects.filter(p => p.collaboration).reduce((acc, p) => acc + (p.collaboration?.teamSize || 0), 0)}
                            </div>
                            <div className="text-xs text-black/50 dark:text-white/50 font-mono">TEAM MEMBERS</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-thin tracking-tight">
                                {projects.filter(p => p.status === "completed").length}
                            </div>
                            <div className="text-xs text-black/50 dark:text-white/50 font-mono">COMPLETED</div>
                        </div>
                    </div>
                </div>

                {/* Projects Tabs */}
                <Tabs defaultValue="all" className="space-y-8">
                    <TabsList className="grid w-full grid-cols-5 bg-white/60 dark:bg-black/60 backdrop-blur-sm border border-black/[0.08] dark:border-white/[0.08] rounded-2xl p-1">
                        {categories.map((category) => (
                            <TabsTrigger 
                                key={category.id}
                                value={category.id}
                                className="data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black rounded-xl font-mono text-xs transition-all duration-300"
                            >
                                {category.label}
                                <span className="ml-1 opacity-60">({category.count})</span>
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {categories.map((category) => (
                        <TabsContent key={category.id} value={category.id} className="mt-8">
                            <div className="grid lg:grid-cols-2 gap-8">
                                {filteredProjects(category.id).map((project) => (
                                    <HoverCard key={project.id} openDelay={200} closeDelay={100}>
                                        <HoverCardTrigger asChild>
                                            <Card className="group border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-black/60 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 hover:scale-[1.02] cursor-pointer">
                                                <CardHeader className="pb-4">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] group-hover:bg-black/[0.08] dark:group-hover:bg-white/[0.08] transition-colors duration-300">
                                                                <project.icon className="w-4 h-4" />
                                                            </div>
                                                            <div>
                                                                <h2 className="font-medium text-sm group-hover:text-black/90 dark:group-hover:text-white/90 transition-colors duration-300">
                                                                    {project.title}
                                                                </h2>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <Badge 
                                                                        variant="secondary" 
                                                                        className="bg-white/60 dark:bg-black/60 border border-black/[0.08] dark:border-white/[0.08] text-black/60 dark:text-white/60 px-2 py-0.5 text-xs font-mono rounded-full"
                                                                    >
                                                                        {project.status}
                                                                    </Badge>
                                                                    {project.collaboration && (
                                                                        <div className="flex items-center gap-1 text-xs text-black/50 dark:text-white/50 font-mono">
                                                                            <Users className="w-3 h-3" />
                                                                            {project.collaboration.teamSize}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            {project.links.github && (
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    asChild
                                                                    className="p-2 h-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
                                                                >
                                                                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                                                                        <Github className="w-3.5 h-3.5" />
                                                                    </a>
                                                                </Button>
                                                            )}
                                                            {(project.links.live || project.links.demo) && (
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    asChild
                                                                    className="p-2 h-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
                                                                >
                                                                    <a href={project.links.live || project.links.demo} target="_blank" rel="noopener noreferrer">
                                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                                    </a>
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </CardHeader>
                                                
                                                <CardContent className="pt-0 space-y-4">
                                                    <p className="text-sm text-black/70 dark:text-white/70 font-light leading-relaxed">
                                                        {project.description}
                                                    </p>

                                                    <Separator className="bg-black/[0.06] dark:bg-white/[0.06]" />

                                                    {/* Tech Stack */}
                                                    <div className="space-y-2">
                                                        <div className="text-xs text-black/50 dark:text-white/50 font-mono tracking-wide">
                                                            TECH STACK
                                                        </div>
                                                        <div className="flex flex-wrap gap-1.5">
                                                            {project.techStack.map((tech) => (
                                                                <Badge
                                                                    key={tech}
                                                                    variant="secondary"
                                                                    className="bg-white/60 dark:bg-black/60 border border-black/[0.06] dark:border-white/[0.06] text-black/70 dark:text-white/70 px-2 py-0.5 text-xs font-mono rounded-md font-normal"
                                                                >
                                                                    {tech}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <Separator className="bg-black/[0.06] dark:bg-white/[0.06]" />

                                                    {/* Metrics */}
                                                    <div className="grid grid-cols-3 gap-4">
                                                        {project.metrics.map((metric, index) => (
                                                            <div key={index} className="text-center">
                                                                <div className="text-sm font-thin tracking-tight">{metric.value}</div>
                                                                <div className="text-xs text-black/50 dark:text-white/50 font-mono">{metric.label}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </HoverCardTrigger>
                                        
                                        <HoverCardContent className="w-80 bg-white/95 dark:bg-black/95 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] rounded-xl p-6 shadow-xl">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 rounded-lg bg-black/[0.04] dark:bg-white/[0.04]">
                                                        <project.icon className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-sm">{project.title}</h4>
                                                        <p className="text-xs text-black/50 dark:text-white/50 font-mono">
                                                            {project.collaboration?.role || "Solo Project"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <Separator className="bg-black/[0.08] dark:bg-white/[0.08]" />

                                                <div className="space-y-3">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Target className="w-3 h-3 text-red-500" />
                                                            <span className="text-xs font-mono text-black/60 dark:text-white/60 tracking-wide">CHALLENGE</span>
                                                        </div>
                                                        <p className="text-xs text-black/70 dark:text-white/70 font-light leading-relaxed">
                                                            {project.challenge}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Zap className="w-3 h-3 text-green-500" />
                                                            <span className="text-xs font-mono text-black/60 dark:text-white/60 tracking-wide">SOLUTION</span>
                                                        </div>
                                                        <p className="text-xs text-black/70 dark:text-white/70 font-light leading-relaxed">
                                                            {project.solution}
                                                        </p>
                                                    </div>
                                                </div>

                                                {project.collaboration && (
                                                    <>
                                                        <Separator className="bg-black/[0.08] dark:bg-white/[0.08]" />
                                                        <div className="flex items-center justify-between text-xs">
                                                            <div className="flex items-center gap-2">
                                                                <Users className="w-3 h-3" />
                                                                <span className="font-mono text-black/60 dark:text-white/60">
                                                                    Team Size: {project.collaboration.teamSize}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Clock className="w-3 h-3" />
                                                                <span className="font-mono text-black/60 dark:text-white/60 capitalize">
                                                                    {project.status.replace("-", " ")}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>
                                ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>

                {/* Call to Action */}
                <div className="mt-16 text-center">
                    <Separator className="bg-black/5 dark:bg-white/5 mb-8" />
                    <div className="space-y-4">
                        <p className="text-sm text-black/50 dark:text-white/50 font-mono tracking-wide">
                            MORE PROJECTS ON
                        </p>
                        <Button
                            variant="outline"
                            asChild
                            className="border-black/[0.12] dark:border-white/[0.12] bg-white/60 dark:bg-black/60 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-black/80 rounded-full px-8 py-2 font-mono text-sm transition-all duration-300"
                        >
                            <a href="https://github.com/hrushi2501" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                <Github className="w-4 h-4" />
                                GitHub Portfolio
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}