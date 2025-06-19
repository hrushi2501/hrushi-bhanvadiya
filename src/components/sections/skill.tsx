"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import {
    Code2,
    Database,
    Brain,
    Globe,
    Users,
    MessageSquare,
    Lightbulb,
    TrendingUp,
    Heart,
    Award,
    GitBranch,
    Terminal,
    Coffee,
    Server,
    Cpu,
    FileCode,
    Layers,
    Clock,
    CheckCircle,
    Activity,
    Calendar,
    FolderOpen,
    Code,
    Palette,
    Settings,
    Target,
    Codesandbox
} from "lucide-react";
import { ComponentType } from "react";

interface SkillsProps {
    className?: string;
}

interface TechSkill {
    name: string;
    category: "languages" | "frontend" | "backend" | "database" | "tools" | "frameworks" | "others";
    experience: string;
    description: string;
    icon: ComponentType<{ className?: string }>;
    color: string;
    projects: string[];
    keyFeatures: string[];
}

interface SoftSkill {
    name: string;
    description: string;
    examples: string[];
    icon: ComponentType<{ className?: string }>;
    color: string;
    impact: string;
}

export default function Skills({ className }: SkillsProps) {
    const techSkills: TechSkill[] = [
        // Languages
        {
            name: "Python",
            category: "languages",
            experience: "3+ years",
            description: "Backend development, ML implementations, automation scripts",
            icon: Code,
            color: "from-blue-500 to-yellow-500",
            projects: ["ML Models", "Web APIs", "Automation Tools"],
            keyFeatures: ["Flask/Django", "NumPy/Pandas", "Machine Learning"]
        },
        {
            name: "JavaScript",
            category: "languages",
            experience: "2+ years",
            description: "Modern web development with ES6+ features",
            icon: FileCode,
            color: "from-yellow-400 to-yellow-600",
            projects: ["React Apps", "Node.js APIs", "Interactive UIs"],
            keyFeatures: ["ES6+", "Async/Await", "DOM Manipulation"]
        },
        {
            name: "TypeScript",
            category: "languages",
            experience: "2+ years",
            description: "Type-safe JavaScript for scalable applications",
            icon: Code2,
            color: "from-blue-600 to-blue-400",
            projects: ["Enterprise Apps", "Type-safe APIs", "Large Codebases"],
            keyFeatures: ["Static Typing", "Interfaces", "Generics"]
        },
        {
            name: "Java",
            category: "languages",
            experience: "2+ years",
            description: "Object-oriented programming and enterprise solutions",
            icon: Coffee,
            color: "from-red-600 to-orange-600",
            projects: ["Desktop Apps", "Data Structures", "Algorithms"],
            keyFeatures: ["OOP", "Collections", "Multithreading"]
        },
        {
            name: "C++",
            category: "languages",
            experience: "2+ years",
            description: "Systems programming and competitive coding",
            icon: Cpu,
            color: "from-blue-700 to-indigo-600",
            projects: ["System Tools", "Competitive Programming", "Performance Apps"],
            keyFeatures: ["STL", "Memory Management", "DSA"]
        },
        {
            name: "SQL",
            category: "database",
            experience: "2+ years",
            description: "Database design and complex query optimization",
            icon: Database,
            color: "from-purple-500 to-purple-700",
            projects: ["Database Design", "Analytics", "Data Migration"],
            keyFeatures: ["Complex Joins", "Stored Procedures", "Optimization"]
        },
        {
            name: "System Design",
            category: "others",
            experience: "0.5+ years",
            description: "Designing scalable, maintainable, and high-performance systems",
            icon: Server, 
            color: "from-gray-700 to-blue-700",
            projects: ["Distributed Systems", "API Gateways", "Load Balancing"],
            keyFeatures: ["Scalability", "High Availability", "Fault Tolerance"]
        },


        // Frontend & Frameworks
        {
            name: "React.js",
            category: "frontend",
            experience: "2+ years",
            description: "Modern component-based UI development",
            icon: Globe,
            color: "from-cyan-400 to-blue-500",
            projects: ["SPAs", "Component Libraries", "Interactive Dashboards"],
            keyFeatures: ["Hooks", "Context API", "Performance Optimization"]
        },
        {
            name: "Next.js",
            category: "frameworks",
            experience: "1+ years",
            description: "Full-stack React framework with SSR/SSG",
            icon: Layers,
            color: "from-gray-800 to-black",
            projects: ["Full-stack Apps", "Static Sites", "E-commerce"],
            keyFeatures: ["App Router", "API Routes", "Image Optimization"]
        },
        {
            name: "Tailwind CSS",
            category: "frontend",
            experience: "2+ years",
            description: "Utility-first CSS for rapid UI development",
            icon: Palette,
            color: "from-teal-400 to-cyan-500",
            projects: ["Design Systems", "Responsive UIs", "Custom Components"],
            keyFeatures: ["Utility Classes", "Responsive Design", "Dark Mode"]
        },

        // Backend & Tools
        {
            name: "Flask",
            category: "backend",
            experience: "1+ years",
            description: "Lightweight Python web framework for APIs",
            icon: Server,
            color: "from-green-600 to-green-400",
            projects: ["REST APIs", "Microservices", "Web Apps"],
            keyFeatures: ["Blueprint", "SQLAlchemy", "JWT Auth"]
        },
        {
            name: "MongoDB",
            category: "database",
            experience: "2+ years",
            description: "NoSQL database for flexible data modeling",
            icon: Database,
            color: "from-green-500 to-green-700",
            projects: ["Document Stores", "Real-time Apps", "Content Management"],
            keyFeatures: ["Aggregation", "Indexing", "Sharding"]
        },
        {
            name: "Git & GitHub",
            category: "tools",
            experience: "3+ years",
            description: "Version control and collaboration workflows",
            icon: GitBranch,
            color: "from-gray-700 to-gray-500",
            projects: ["Team Projects", "Open Source", "CI/CD Pipelines"],
            keyFeatures: ["Branching", "Pull Requests", "Actions"]
        },
        {
            name: "Linux",
            category: "tools",
            experience: "2+ years",
            description: "System administration and development environment",
            icon: Terminal,
            color: "from-yellow-600 to-orange-600",
            projects: ["Server Setup", "Shell Scripts", "Docker Containers"],
            keyFeatures: ["Bash Scripting", "Package Management", "Process Control"]
        },
        {
            name: "OpenAI API",
            category: "backend",
            experience: "1+ years",
            description: "AI integration and intelligent applications",
            icon: Brain,
            color: "from-purple-500 to-pink-500",
            projects: ["Chatbots", "Content Generation", "AI Assistants"],
            keyFeatures: ["GPT Integration", "Embeddings", "Function Calling"]
        }
    ];

    const softSkills: SoftSkill[] = [
        {
            name: "Problem Solving",
            description: "Breaking down complex challenges into manageable solutions through systematic analysis.",
            examples: ["Algorithm optimization", "System design", "Debug complex issues"],
            icon: Lightbulb,
            color: "from-yellow-500 to-orange-500",
            impact: "Reduced debugging time by 40% through systematic problem-solving approach"
        },
        {
            name: "Communication",
            description: "Explaining technical concepts clearly to diverse audiences with varying technical backgrounds.",
            examples: ["Technical documentation", "Team presentations", "Code explanations"],
            icon: MessageSquare,
            color: "from-green-500 to-teal-500",
            impact: "Improved team collaboration through clear technical documentation"
        },
        {
            name: "Collaboration",
            description: "Working effectively in cross-functional teams with shared goals and mutual respect.",
            examples: ["Team projects", "Code reviews", "Knowledge sharing"],
            icon: Users,
            color: "from-blue-500 to-indigo-500",
            impact: "Successfully led multiple team projects with 100% on-time delivery"
        },
        {
            name: "Leadership",
            description: "Guiding teams towards project completion and helping others grow professionally.",
            examples: ["Event organization", "Technical coordination", "Team guidance"],
            icon: Award,
            color: "from-indigo-500 to-purple-500",
            impact: "Mentored 5+ junior developers, improving their coding skills by 60%"
        },
        {
            name: "Adaptability",
            description: "Learning new technologies quickly and adapting to changing project requirements.",
            examples: ["Learning frameworks", "Technology migration", "Flexible approach"],
            icon: TrendingUp,
            color: "from-purple-500 to-pink-500",
            impact: "Successfully adapted to 3 new tech stacks within 6 months"
        },
        {
            name: "Time Management",
            description: "Prioritizing tasks effectively and managing multiple projects to meet strict deadlines.",
            examples: ["Project scheduling", "Sprint planning", "Resource allocation"],
            icon: Clock,
            color: "from-pink-500 to-red-500",
            impact: "Consistently delivered projects 15% ahead of schedule"
        }
    ];

    const categories = [
        { id: "all", label: "All Skills", icon: Code2 },
        { id: "languages", label: "Languages", icon: FileCode },
        { id: "frontend", label: "Frontend", icon: Globe },
        { id: "backend", label: "Backend", icon: Server },
        { id: "database", label: "Database", icon: Database },
        { id: "tools", label: "Tools", icon: Settings },
        { id: "frameworks", label: "Frameworks", icon: Layers },
        { id: "others", label: "Others", icon: Codesandbox }
    ];

    const filteredTechSkills = (category: string) => {
        return category === "all" ? techSkills : techSkills.filter(skill => skill.category === category);
    };

    return (
        <section id="skills" className={`py-24 ${className}`}>
            <div className="max-w-6xl mx-auto px-8">
                {/* Section Header */}
                <div className="space-y-8 mb-16">
                    <div className="space-y-4">
                        <div className="flex justify-start">
                            <Badge
                                variant="default"
                                className="bg-black dark:bg-white text-white dark:text-black px-5 py-2 text-xs font-mono rounded-full tracking-wider border-0 font-medium"
                            >
                                CAPABILITIES
                            </Badge>
                        </div>

                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-thin leading-[0.9] tracking-tighter text-left">
                            Skills
                            <br />
                            <span className="text-black/55 dark:text-white/55">& Expertise</span>
                        </h2>

                        <p className="text-lg text-black/70 dark:text-white/70 max-w-2xl leading-relaxed font-light text-left">
                            Technical proficiencies and soft skills developed through hands-on experience
                            and continuous learning across diverse domains.
                        </p>
                    </div>

                    <Separator className="bg-black/10 dark:bg-white/10" />

                    {/* Enhanced Quick Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                        <div className="text-center group">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <FolderOpen className="w-4 h-4 text-blue-500" />
                                <div className="text-2xl font-thin tracking-tight group-hover:scale-110 transition-transform duration-300">{techSkills.length}</div>
                            </div>
                            <div className="text-xs text-black/50 dark:text-white/50 font-mono">TECH SKILLS</div>
                        </div>
                        <div className="text-center group">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Calendar className="w-4 h-4 text-purple-500" />
                                <div className="text-2xl font-thin tracking-tight group-hover:scale-110 transition-transform duration-300">3+</div>
                            </div>
                            <div className="text-xs text-black/50 dark:text-white/50 font-mono">YEARS EXP</div>
                        </div>
                        <div className="text-center group">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Target className="w-4 h-4 text-red-500" />
                                <div className="text-2xl font-thin tracking-tight group-hover:scale-110 transition-transform duration-300">{softSkills.length}</div>
                            </div>
                            <div className="text-xs text-black/50 dark:text-white/50 font-mono">PROFESSIONAL COMPETENCIES</div>
                        </div>
                    </div>
                </div>

                {/* Main Skills Content */}
                <div className="space-y-16">
                    {/* Technical Skills */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-black/[0.04] dark:bg-white/[0.04]">
                                <Code2 className="w-5 h-5" />
                            </div>
                            <h3 className="text-2xl font-thin tracking-tight">Technical Stack</h3>
                            <div className="flex items-center gap-2 ml-auto">
                                <Activity className="w-4 h-4 text-green-500" />
                                <span className="text-sm text-black/60 dark:text-white/60 font-mono">ACTIVELY IMPROVING</span>
                            </div>
                        </div>

                        <Tabs defaultValue="all" className="space-y-6">
                            <TabsList className="flex w-full bg-white/60 dark:bg-black/60 backdrop-blur-sm border border-black/[0.08] dark:border-white/[0.08] rounded-2xl p-1">
                                {categories.map((category) => (
                                    <TabsTrigger
                                        key={category.id}
                                        value={category.id}
                                        className="data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-black rounded-xl font-mono text-xs transition-all duration-300 flex items-center gap-1.5 px-3 py-2 flex-1"
                                    >
                                        <category.icon className="w-3 h-3" />
                                        <span className="hidden sm:inline">{category.label}</span>
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            {categories.map((category) => (
                                <TabsContent key={category.id} value={category.id} className="mt-6">
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {filteredTechSkills(category.id).map((skill) => (
                                            <HoverCard key={skill.name} openDelay={200} closeDelay={100}>
                                                <HoverCardTrigger asChild>
                                                    <Card className="group border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-black/60 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer overflow-hidden relative">
                                                        <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}></div>

                                                        <CardHeader className="pb-2 relative z-10">
                                                            <div className="flex items-start justify-between">
                                                                <div className="flex items-center gap-3">
                                                                    <div className={`p-2 rounded-xl bg-gradient-to-r ${skill.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                                        <skill.icon className="w-4 h-4" />
                                                                    </div>
                                                                    <div>
                                                                        <h4 className="font-medium text-sm group-hover:text-black dark:group-hover:text-white transition-colors text-left">
                                                                            {skill.name}
                                                                        </h4>
                                                                        <div className="flex items-center gap-2 mt-1">
                                                                            <Badge
                                                                                variant="secondary"
                                                                                className="bg-white/60 dark:bg-black/60 border border-black/[0.08] dark:border-white/[0.08] text-black/60 dark:text-white/60 px-2 py-0.5 text-xs font-mono rounded-full capitalize"
                                                                            >
                                                                                {skill.category}
                                                                            </Badge>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="text-right">
                                                                    <div className="text-xs text-black/40 dark:text-white/40 font-mono">{skill.experience}</div>
                                                                </div>
                                                            </div>
                                                        </CardHeader>

                                                        <CardContent className="pt-0 pb-3 relative z-10">
                                                            <p className="text-xs text-black/70 dark:text-white/70 font-light leading-relaxed group-hover:text-black/80 dark:group-hover:text-white/80 transition-colors text-left mb-3">
                                                                {skill.description}
                                                            </p>

                                                            <div className="flex flex-wrap gap-1">
                                                                {skill.keyFeatures.slice(0, 3).map((feature, idx) => (
                                                                    <span
                                                                        key={idx}
                                                                        className="px-2 py-1 bg-black/[0.05] dark:bg-white/[0.05] rounded-full text-xs text-black/60 dark:text-white/60 font-mono"
                                                                    >
                                                                        {feature}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </HoverCardTrigger>

                                                <HoverCardContent className="w-96 bg-white/95 dark:bg-black/95 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] rounded-xl p-6 shadow-xl">
                                                    <div className="space-y-5">
                                                        <div className="flex items-start gap-4">
                                                            <div className={`p-3 rounded-xl bg-gradient-to-r ${skill.color} text-white shadow-lg`}>
                                                                <skill.icon className="w-6 h-6" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4 className="font-semibold text-lg text-black dark:text-white mb-1">{skill.name}</h4>
                                                                <div className="flex items-center gap-3">
                                                                    <span className="text-sm text-black/60 dark:text-white/60">{skill.experience} experience</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <Separator className="bg-black/[0.12] dark:bg-white/[0.12]" />

                                                        <div className="space-y-4">
                                                            <div>
                                                                <h5 className="text-sm font-medium text-black/80 dark:text-white/80 mb-2">Overview</h5>
                                                                <p className="text-sm text-black/70 dark:text-white/70 font-light leading-relaxed">
                                                                    {skill.description}
                                                                </p>
                                                            </div>

                                                            <div>
                                                                <h5 className="text-sm font-medium text-black/80 dark:text-white/80 mb-2 flex items-center gap-2">
                                                                    <FolderOpen className="w-4 h-4 text-blue-500" />
                                                                    Projects
                                                                </h5>
                                                                <div className="flex flex-wrap gap-1">
                                                                    {skill.projects.map((project, idx) => (
                                                                        <span key={idx} className="text-xs bg-black/[0.08] dark:bg-white/[0.08] px-2 py-1 rounded-full">
                                                                            {project}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <h5 className="text-sm font-medium text-black/80 dark:text-white/80 mb-2">Key Features</h5>
                                                                <div className="text-xs text-black/60 dark:text-white/60">
                                                                    {skill.keyFeatures.join(" • ")}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </HoverCardContent>
                                            </HoverCard>
                                        ))}
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>

                    <Separator className="bg-black/5 dark:bg-white/5" />

                    {/* Soft Skills */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-black/[0.04] dark:bg-white/[0.04]">
                                <Heart className="w-5 h-5" />
                            </div>
                            <h3 className="text-2xl font-thin tracking-tight">Soft Skills</h3>
                            <div className="flex items-center gap-2 ml-auto">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-sm text-black/60 dark:text-white/60 font-mono">PROVEN IMPACT</span>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {softSkills.map((skill) => (
                                <HoverCard key={skill.name} openDelay={200} closeDelay={100}>
                                    <HoverCardTrigger asChild>
                                        <Card className="group border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-black/60 backdrop-blur-xl rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer relative overflow-hidden">
                                            <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}></div>

                                            <CardHeader className="pb-2 relative z-10">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2.5 rounded-xl bg-gradient-to-r ${skill.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                        <skill.icon className="w-5 h-5" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-medium text-sm group-hover:text-black dark:group-hover:text-white transition-colors text-left">
                                                            {skill.name}
                                                        </h4>
                                                        <div className="text-xs text-black/50 dark:text-white/50 font-mono text-left mt-1">Core Strength</div>
                                                    </div>
                                                </div>
                                            </CardHeader>

                                            <CardContent className="pt-0 pb-3 relative z-10">
                                                <p className="text-xs text-black/70 dark:text-white/70 font-light leading-relaxed group-hover:text-black/80 dark:group-hover:text-white/80 transition-colors text-left mb-2">
                                                    {skill.description}
                                                </p>
                                                <div className="text-xs text-black/50 dark:text-white/50 italic">
                                                    {skill.impact}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </HoverCardTrigger>

                                    <HoverCardContent className="w-96 bg-white/95 dark:bg-black/95 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] rounded-xl p-6 shadow-xl">
                                        <div className="space-y-5">
                                            <div className="flex items-start gap-4">
                                                <div className={`p-3 rounded-xl bg-gradient-to-r ${skill.color} text-white shadow-lg`}>
                                                    <skill.icon className="w-6 h-6" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-lg text-black dark:text-white mb-1">{skill.name}</h4>
                                                    <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed">
                                                        {skill.description}
                                                    </p>
                                                </div>
                                            </div>

                                            <Separator className="bg-black/[0.12] dark:bg-white/[0.12]" />

                                            <div className="space-y-4">
                                                <div>
                                                    <h5 className="text-sm font-medium text-black/80 dark:text-white/80 mb-2 flex items-center gap-2">
                                                        <TrendingUp className="w-4 h-4 text-green-500" />
                                                        Impact
                                                    </h5>
                                                    <p className="text-sm text-black/70 dark:text-white/70 font-light leading-relaxed italic">
                                                        {skill.impact}
                                                    </p>
                                                </div>

                                                <div>
                                                    <h5 className="text-sm font-medium text-black/80 dark:text-white/80 mb-2">Examples</h5>
                                                    <div className="space-y-1">
                                                        {skill.examples.map((example, idx) => (
                                                            <div key={idx} className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60">
                                                                <CheckCircle className="w-3 h-3 text-green-500" />
                                                                {example}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </HoverCardContent>
                                </HoverCard>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}