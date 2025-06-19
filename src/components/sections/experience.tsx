"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Timeline } from "@/components/ui/timeline";
import {  
    Calendar, 
    Award,
    Building,
    Briefcase,
    TrendingUp,
    Code,
    ExternalLink,
} from "lucide-react";

interface ExperienceProps {
    className?: string;
}

interface Experience {
    id: string;
    role: string;
    organization: string;
    type: "leadership" | "volunteer" | "academic";
    duration: string;
    status: "completed" | "ongoing";
    description: string;
    responsibilities: string[];
    skills: string[];
    metrics: {
        label: string;
        value: string;
    }[];
    achievements?: string[];
    icon: typeof Award;
}

export default function Experience({ className }: ExperienceProps) {
    const experiences: Experience[] = [
        {
            id: "hacknuthon-core",
            role: "Core Committee Member",
            organization: "HackNUthon 6.0 (CSI)",
            type: "leadership",
            duration: "29-31 March 2025",
            status: "completed",
            description: "Responsible for graphic design and event operations for a three-day hackathon competition.",
            responsibilities: [
                "Design hackathon branding and participant materials",
                "Coordinate with sponsors and technical partners",
                "Manage participant experience and engagement activities",
                "Handle real-time event logistics and troubleshooting"
            ],
            skills: ["Event Management", "Graphic Design", "Stakeholder Management", "Problem Solving"],
            metrics: [
                { label: "Duration", value: "72hrs" },
                { label: "Expected Participants", value: "1200+" },
                { label: "Sponsors", value: "10+" }
            ],
            achievements: [
                "Promoted from Executive to Core Committee role",
                "Designed complete visual identity system",
                "Coordinated multi-day logistics for 600+ participants"
            ],
            icon: Code
        },
        {
            id: "cubix-exec",
            role: "Executive Committee Member",
            organization: "CUBIX'25 Technical Fest (CSI)",
            type: "leadership",
            duration: "January 2025",
            status: "completed",
            description: "Led graphic design and event organization for Nirma University's technical festival.",
            responsibilities: [
                "Led visual identity and branding for technical fest",
                "Coordinated teams for event execution",
                "Designed promotional materials and digital assets",
                "Managed stakeholder communication and vendor relations"
            ],
            skills: ["Leadership", "Graphic Design", "Event Management", "Team Coordination"],
            metrics: [
                { label: "Team Size", value: "4+" },
                { label: "Participants", value: "200+" },
                { label: "Events Coordinated", value: "6+" }
            ],
            achievements: [
                "Created unified design system for all fest communications",
                "Reduced event setup time by 40% through improved logistics",
                "Successfully executed large-scale technical festival"
            ],
            icon: Award
        },
        {
            id: "raman-volunteer",
            role: "Event Management & Graphic Design Specialist",
            organization: "RAMAN-2024 International Conference",
            type: "volunteer",
            duration: "29-30 March 2024",
            status: "completed",
            description: "Managed event operations and design requirements for international nanotechnology conference.",
            responsibilities: [
                "Created conference materials and signage systems",
                "Coordinated international delegate hospitality",
                "Managed registration and information desks",
                "Supported technical session logistics"
            ],
            skills: ["International Relations", "Graphic Design", "Event Operations", "Communication"],
            metrics: [
                { label: "Delegates", value: "300+" },
                { label: "Countries", value: "4+" },
                { label: "Sessions", value: "2+" }
            ],
            achievements: [
                "Managed international delegate experience",
                "Created conference wayfinding system"
            ],
            icon: Building
        }
    ];

    const categories = [
        { id: "all", label: "All Experience", count: experiences.length },
        { id: "leadership", label: "Leadership", count: experiences.filter(e => e.type === "leadership").length },
        { id: "volunteer", label: "Volunteer", count: experiences.filter(e => e.type === "volunteer").length },
        { id: "academic", label: "Academic", count: experiences.filter(e => e.type === "academic").length }
    ];

    const filteredExperiences = (category: string) => {
        return category === "all" ? experiences : experiences.filter(e => e.type === category);
    };

    const handleProfileClick = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    // Convert experiences to timeline format
    const createTimelineData = (experiences: Experience[]) => {
        return experiences.map((experience) => ({
            title: experience.organization,
            content: (
                <HoverCard openDelay={200} closeDelay={100}>
                    <HoverCardTrigger asChild>
                        <div className="group cursor-pointer p-6 bg-white/40 dark:bg-black/40 backdrop-blur-sm rounded-xl border border-black/[0.08] dark:border-white/[0.08] hover:border-black/[0.15] dark:hover:border-white/[0.15] transition-all duration-300 hover:bg-white/60 dark:hover:bg-black/60 space-y-4">
                            {/* Header with minimal info */}
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3 flex-1">
                                    <div className="p-2 rounded-lg bg-black/[0.06] dark:bg-white/[0.06] group-hover:bg-black/[0.12] dark:group-hover:bg-white/[0.12] transition-colors duration-300">
                                        <experience.icon className="w-4 h-4 text-black/70 dark:text-white/70" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-base text-black/90 dark:text-white/90 group-hover:text-black dark:group-hover:text-white transition-colors duration-300 text-left mb-1">
                                            {experience.role}
                                        </h3>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <Badge 
                                                variant="secondary" 
                                                className={`px-2 py-1 text-xs font-mono rounded-full border text-left ${
                                                    experience.status === "ongoing" 
                                                        ? "bg-black/[0.08] dark:bg-white/[0.08] border-black/[0.12] dark:border-white/[0.12] text-black/80 dark:text-white/80"
                                                        : "bg-black/[0.06] dark:bg-white/[0.06] border-black/[0.10] dark:border-white/[0.10] text-black/70 dark:text-white/70"
                                                }`}
                                            >
                                                {experience.status}
                                            </Badge>
                                            <Badge
                                                variant="outline"
                                                className="capitalize border-black/[0.12] dark:border-white/[0.12] text-black/60 dark:text-white/60 font-mono text-xs bg-white/60 dark:bg-black/60"
                                            >
                                                {experience.type}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-black/50 dark:text-white/50 font-mono ml-4">
                                    <Calendar className="w-3 h-3" />
                                    {experience.duration}
                                </div>
                            </div>

                            {/* Brief description */}
                            <p className="text-sm text-black/70 dark:text-white/70 font-light leading-relaxed text-left line-clamp-2">
                                {experience.description}
                            </p>

                            {/* Key skills preview */}
                            <div className="flex flex-wrap gap-1.5">
                                {experience.skills.slice(0, 3).map((skill) => (
                                    <Badge
                                        key={skill}
                                        variant="secondary"
                                        className="bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] text-black/60 dark:text-white/60 px-2 py-0.5 text-xs font-mono rounded-md font-normal"
                                    >
                                        {skill}
                                    </Badge>
                                ))}
                                {experience.skills.length > 3 && (
                                    <Badge
                                        variant="secondary"
                                        className="bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] text-black/50 dark:text-white/50 px-2 py-0.5 text-xs font-mono rounded-md font-normal"
                                    >
                                        +{experience.skills.length - 3}
                                    </Badge>
                                )}
                            </div>

                            {/* Hover indicator */}
                            <div className="flex items-center justify-center pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="text-xs text-black/40 dark:text-white/40 font-mono flex items-center gap-1">
                                    <span>Hover for details</span>
                                    <ExternalLink className="w-3 h-3" />
                                </div>
                            </div>
                        </div>
                    </HoverCardTrigger>

                    <HoverCardContent className="w-140 bg-white/95 dark:bg-black/95 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] rounded-xl p-6 shadow-2xl">
                        <div className="space-y-5">
                            {/* Header */}
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-black/[0.06] dark:bg-white/[0.06]">
                                    <experience.icon className="w-5 h-5 text-black/70 dark:text-white/70" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-base text-black/90 dark:text-white/90">{experience.role}</h4>
                                    <p className="text-sm text-black/60 dark:text-white/60 font-mono">
                                        {experience.organization}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="flex items-center gap-1 text-xs text-black/50 dark:text-white/50 font-mono">
                                            <Calendar className="w-3 h-3" />
                                            {experience.duration}
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/20"></div>
                                        <Badge 
                                            variant="secondary" 
                                            className={`px-2 py-0.5 text-xs font-mono rounded-full border ${
                                                experience.status === "ongoing" 
                                                    ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
                                                    : "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
                                            }`}
                                        >
                                            {experience.status}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            <Separator className="bg-black/[0.08] dark:bg-white/[0.08]" />

                            {/* Description */}
                            <div>
                                <p className="text-sm text-black/70 dark:text-white/70 font-light leading-relaxed text-left">
                                    {experience.description}
                                </p>
                            </div>

                            {/* Metrics */}
                            <div className="grid grid-cols-3 gap-4 p-3 bg-black/[0.02] dark:bg-white/[0.02] rounded-lg border border-black/[0.04] dark:border-white/[0.04]">
                                {experience.metrics.map((metric, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-lg font-mono font-bold text-black/80 dark:text-white/80">{metric.value}</div>
                                        <div className="text-xs text-black/50 dark:text-white/50 font-mono uppercase tracking-wide">{metric.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Skills */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Code className="w-4 h-4 text-black/60 dark:text-white/60" />
                                    <span className="text-sm font-medium text-black/80 dark:text-white/80">Skills & Technologies</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {experience.skills.map((skill) => (
                                        <Badge
                                            key={skill}
                                            variant="secondary"
                                            className="bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] text-black/70 dark:text-white/70 px-2 py-1 text-xs font-mono rounded-md font-normal"
                                        >
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Responsibilities */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Briefcase className="w-4 h-4 text-black/60 dark:text-white/60" />
                                    <span className="text-sm font-medium text-black/80 dark:text-white/80">Key Responsibilities</span>
                                </div>
                                <ul className="space-y-2 text-left">
                                    {experience.responsibilities.slice(0, 4).map((resp, index) => (
                                        <li key={index} className="text-sm text-black/70 dark:text-white/70 font-light leading-relaxed flex items-start gap-2">
                                            <div className="w-1 h-1 rounded-full bg-black/30 dark:bg-white/30 mt-2 flex-shrink-0"></div>
                                            {resp}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Achievements */}
                            {experience.achievements && (
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                                        <span className="text-sm font-medium text-black/80 dark:text-white/80">Key Achievements</span>
                                    </div>
                                    <ul className="space-y-2 text-left">
                                        {experience.achievements.map((achievement, index) => (
                                            <li key={index} className="text-sm text-black/70 dark:text-white/70 font-light leading-relaxed flex items-start gap-2">
                                                <div className="w-1 h-1 rounded-full bg-green-500 dark:bg-green-400 mt-2 flex-shrink-0"></div>
                                                {achievement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </HoverCardContent>
                </HoverCard>
            )
        }));
    };

    const getTimelineDataForCategory = (category: string) => {
        const filtered = filteredExperiences(category);
        // Sort by most recent first (2025 -> 2024)
        const sorted = filtered.sort((a, b) => {
            // Extract year from duration string for sorting
            const yearA = parseInt(a.duration.match(/\d{4}/)?.[0] || '0');
            const yearB = parseInt(b.duration.match(/\d{4}/)?.[0] || '0');
            return yearB - yearA;
        });
        return createTimelineData(sorted);
    };

    return (
        <section id="experience" className={`py-24 ${className}`}>
            <div className="max-w-6xl mx-auto px-8">
                {/* Section Header */}
                <div className="space-y-8 mb-16">
                    <div className="space-y-4">
                        <div className="flex justify-start">
                            <Badge 
                                variant="default" 
                                className="bg-black dark:bg-white text-white dark:text-black px-5 py-2 text-xs font-mono rounded-full tracking-wider border-0 font-medium"
                            >
                                PROFESSIONAL JOURNEY
                            </Badge>
                        </div>
                        
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-thin leading-[0.9] tracking-tighter text-left">
                            Experience
                            <br />
                            <span className="text-black/55 dark:text-white/55">& Leadership</span>
                        </h2>
                        
                        <div className="flex justify-start">
                            <p className="text-lg text-black/70 dark:text-white/70 max-w-2xl leading-relaxed font-light text-left">
                                Leadership roles and collaborative experiences demonstrating
                                organizational skills, technical execution, and team coordination.
                            </p>
                        </div>
                    </div>

                    <Separator className="bg-black/10 dark:bg-white/10" />

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-2xl font-thin tracking-tight">{experiences.length}</div>
                            <div className="text-xs text-black/50 dark:text-white/50 font-mono">POSITIONS</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-thin tracking-tight">
                                {experiences.filter(e => e.type === "leadership").length}
                            </div>
                            <div className="text-xs text-black/50 dark:text-white/50 font-mono">LEADERSHIP</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-thin tracking-tight">1600+</div>
                            <div className="text-xs text-black/50 dark:text-white/50 font-mono">PEOPLE IMPACTED</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-thin tracking-tight">
                                {experiences.filter(e => e.status === "ongoing").length}
                            </div>
                            <div className="text-xs text-black/50 dark:text-white/50 font-mono">ACTIVE ROLES</div>
                        </div>
                    </div>
                </div>

                {/* Timeline Experience */}
                <div className="mb-16">
                    <Tabs defaultValue="all" className="space-y-8">
                        <TabsList className="grid w-full grid-cols-4 bg-white/60 dark:bg-black/60 backdrop-blur-sm border border-black/[0.08] dark:border-white/[0.08] rounded-2xl p-1">
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
                                <div className="bg-transparent">
                                    <Timeline data={getTimelineDataForCategory(category.id)} />
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>

                {/* Competitive Programming Section */}
                <div className="space-y-6 mb-16">
                    <div className="space-y-2 text-left">
                        <h3 className="font-medium text-lg">Competitive Programming</h3>
                        <p className="text-xs text-black/50 dark:text-white/50 font-mono">
                            CODING PLATFORMS & ACHIEVEMENTS
                        </p>
                    </div>

                    {/* Competitive Programming Profiles */}
                    <Card className="border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-black/60 backdrop-blur-xl rounded-2xl shadow-sm">
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <h4 className="font-medium text-sm">Platform Rankings</h4>
                                <ExternalLink className="w-3 h-3 text-black/40 dark:text-white/40" />
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div 
                                    onClick={() => handleProfileClick('https://leetcode.com/u/Hrushi2501/')}
                                    className="group cursor-pointer flex justify-between items-center p-4 rounded-xl bg-white/80 dark:bg-black/80 border border-black/[0.08] dark:border-white/[0.08] hover:border-black/[0.12] dark:hover:border-white/[0.12] transition-all duration-300 hover:shadow-md hover:scale-[1.02] transform"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] group-hover:bg-black/[0.08] dark:group-hover:bg-white/[0.08] transition-colors duration-300">
                                            <Code className="w-4 h-4 text-black/60 dark:text-white/60" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-mono font-medium text-black/80 dark:text-white/80">LeetCode</span>
                                            <div className="flex items-center gap-1 mt-0.5">
                                                <ExternalLink className="w-3 h-3 text-black/40 dark:text-white/40 group-hover:text-black/60 dark:group-hover:text-white/60 transition-colors duration-300" />
                                                <span className="text-xs text-black/50 dark:text-white/50 font-mono">View Profile</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-mono font-bold text-black/80 dark:text-white/80">1798</div>
                                        <div className="text-xs text-black/50 dark:text-white/50 font-mono">Rating</div>
                                    </div>
                                </div>
                                
                                <div 
                                    onClick={() => handleProfileClick('https://codeforces.com/profile/Hrushi2501')}
                                    className="group cursor-pointer flex justify-between items-center p-4 rounded-xl bg-white/80 dark:bg-black/80 border border-black/[0.08] dark:border-white/[0.08] hover:border-black/[0.12] dark:hover:border-white/[0.12] transition-all duration-300 hover:shadow-md hover:scale-[1.02] transform"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] group-hover:bg-black/[0.08] dark:group-hover:bg-white/[0.08] transition-colors duration-300">
                                            <Award className="w-4 h-4 text-black/60 dark:text-white/60" />
                                        </div>
                                        <div>
                                            <span className="text-sm font-mono font-medium text-black/80 dark:text-white/80">Codeforces</span>
                                            <div className="flex items-center gap-1 mt-0.5">
                                                <ExternalLink className="w-3 h-3 text-black/40 dark:text-white/40 group-hover:text-black/60 dark:group-hover:text-white/60 transition-colors duration-300" />
                                                <span className="text-xs text-black/50 dark:text-white/50 font-mono">View Profile</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-mono font-bold text-black/80 dark:text-white/80">1217</div>
                                        <div className="text-xs text-black/60 dark:text-white/60 font-mono font-semibold">Pupil</div>
                                    </div>
                                </div>
                            </div>
                            
                            <Separator className="bg-black/[0.06] dark:bg-white/[0.06]" />
                            
                            <div className="text-center">
                                <div className="text-xs text-black/50 dark:text-white/50 font-mono mb-2">
                                    PROBLEM SOLVING STREAK
                                </div>
                                <div className="text-lg font-thin tracking-tight">30 Days</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Call to Action */}
                <div className="text-center space-y-4">
                    <Separator className="bg-black/10 dark:bg-white/10" />
                    <div className="pt-8">
                        <h3 className="text-lg font-medium mb-2">Ready to collaborate?</h3>
                        <p className="text-sm text-black/60 dark:text-white/60 font-mono">
                            Let&apos;s discuss how my leadership experience can contribute to your next project
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}