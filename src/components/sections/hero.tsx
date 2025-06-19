"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Mail, Code, ChevronDown } from "lucide-react";

interface HeroProps {
    lastScrollY: number;
}
const GitHubIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
);


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Hero({ lastScrollY }: HeroProps) {
    const socialLinks = [
        {
            name: "GitHub",
            icon: GitHubIcon,
            href: "https://github.com/hrushi2501",
            description: "Open source projects and code repositories",
            username: "@hrushi2501"
        },
        {
            name: "LinkedIn",
            icon: LinkedInIcon,
            href: "https://www.linkedin.com/in/hrushi-bhanvadiya-081818280/",
            description: "Professional network and career updates",
            username: "hrushi-bhanvadiya"
        },
        {
            name: "Email",
            icon: Mail,
            href: "mailto:hrushibhanvadiya@gmail.com",
            description: "Direct communication for opportunities",
            username: "hrushibhanvadiya@gmail.com"
        },
        {
            name: "LeetCode",
            icon: Code,
            href: "https://leetcode.com/Hrushi2501",
            description: "Competitive programming solutions",
            username: "Rating: 1798"
        }
    ];

    const technologies = [
        'C++', 'Next.js', 'Python', 'MongoDB', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Java'
    ];

    return (
        <div className="relative flex flex-col min-h-screen">
            {/* Main Hero Content - Centered */}
            <main className="relative z-10 flex-1 flex items-center justify-center pt-24 pb-20">
                <div className="max-w-6xl mx-auto px-8 w-full">
                    <div className="grid lg:grid-cols-3 gap-12 items-center">
                        {/* Left Column - Main Content */}
                        <div className="lg:col-span-2 space-y-8 text-center lg:text-left">
                            <div className="space-y-6">
                                <div className="inline-block">
                                    <Badge variant="default" className="bg-black dark:bg-white text-white dark:text-black px-5 py-2 text-xs font-mono rounded-full tracking-wider border-0 font-medium">
                                        OPEN TO WORK 
                                    </Badge>
                                </div>

                                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-thin leading-[0.9] tracking-tighter">
                                    Hrushi
                                    <br />
                                    <span className="text-black/55 dark:text-white/55">Bhanvadiya</span>
                                </h1>

                                <p className="text-lg sm:text-xl text-black/70 dark:text-white/70 max-w-2xl leading-relaxed font-light mx-auto lg:mx-0">
                                    Computer Science Engineer building scalable applications
                                    and intelligent solutions with modern technologies.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-black/70 dark:text-white/70 font-mono justify-center lg:justify-start">
                                    <span>📍 Ahmedabad, Gujarat</span>
                                    <Separator 
                                        orientation="vertical" 
                                        className="hidden sm:block h-4 bg-black/20 dark:bg-white/20" 
                                    />
                                    <span>🎓 CGPA: 8.73/10</span>
                                </div>

                                <Separator className="bg-black/10 dark:bg-white/10" />

                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                                        {technologies.map((tech) => (
                                            <Badge
                                                key={tech}
                                                variant="secondary"
                                                className="bg-white/60 dark:bg-black/60 backdrop-blur-sm border border-black/[0.08] dark:border-white/[0.08] text-black/80 dark:text-white/80 hover:bg-white/80 dark:hover:bg-black/80 transition-all duration-300 px-3 py-1 rounded-full font-mono text-xs font-normal"
                                            >
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>

                                    <Separator className="bg-black/10 dark:bg-white/10" />

                                    {/* Connect With Me Section */}
                                    <div className="pt-2">
                                        <p className="text-sm text-black/50 dark:text-white/50 font-mono mb-3 tracking-wide text-center lg:text-left">
                                            CONNECT WITH ME
                                        </p>
                                        <div className="flex gap-3 justify-center lg:justify-start">
                                            {socialLinks.map((social) => (
                                                <HoverCard key={social.name} openDelay={200} closeDelay={100}>
                                                    <HoverCardTrigger asChild>
                                                        <a
                                                            href={social.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-3 rounded-full border border-black/[0.12] dark:border-white/[0.12] bg-white/60 dark:bg-black/60 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-black/80 hover:scale-105 transition-all duration-300 group"
                                                        >
                                                            <social.icon className="w-4 h-4 text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white transition-colors duration-300" />
                                                        </a>
                                                    </HoverCardTrigger>
                                                    <HoverCardContent className="w-64 bg-white/95 dark:bg-black/95 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] rounded-xl p-4 shadow-lg">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 rounded-lg bg-black/[0.04] dark:bg-white/[0.04]">
                                                                <social.icon className="w-3.5 h-3.5" />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-medium text-sm">{social.name}</h4>
                                                                <p className="text-xs text-black/50 dark:text-white/50 font-mono">{social.username}</p>
                                                            </div>
                                                        </div>
                                                        <Separator className="my-3 bg-black/[0.08] dark:bg-white/[0.08]" />
                                                        <p className="text-xs text-black/70 dark:text-white/70 font-light">{social.description}</p>
                                                    </HoverCardContent>
                                                </HoverCard>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Compact Stats & Code Block */}
                        <div className="space-y-4 flex flex-col items-center lg:items-start">
                            {/* Key Metrics - More Compact */}
                            <Card className="border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-black/60 backdrop-blur-xl rounded-2xl shadow-sm w-full max-w-sm">
                                <CardContent className="p-5">
                                    <h3 className="font-mono text-xs text-black/50 dark:text-white/50 mb-4 tracking-widest uppercase text-center">Competitive Coding</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center">
                                            <div className="text-2xl font-thin tracking-tight">1798</div>
                                            <div className="text-xs text-black/50 dark:text-white/50 font-light">LeetCode</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-thin tracking-tight">1217</div>
                                            <div className="text-xs text-black/50 dark:text-white/50 font-light">Codeforces</div>
                                        </div>
                                    </div>
                                    <Separator className="my-3 bg-black/[0.08] dark:bg-white/[0.08]" />
                                    <div className="text-xs text-black/40 dark:text-white/40 font-mono text-center">
                                        400+ Problems Solved
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Code Block - Enhanced with colors */}
                            <Card className="border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-black/60 backdrop-blur-xl rounded-2xl shadow-sm w-full max-w-sm">
                                <CardContent className="p-5">
                                    <div className="font-mono text-xs space-y-0.5 font-light">
                                        <div className="text-purple-600 dark:text-purple-400">const</div>
                                        <div className="text-blue-600 dark:text-blue-400 ml-1">developer</div> 
                                        <div className="text-black/60 dark:text-white/60 inline"> = {`{`}</div>
                                        <div className="ml-3">
                                            <span className="text-green-600 dark:text-green-400">name</span>
                                            <span className="text-black/60 dark:text-white/60">: </span>
                                            <span className="text-orange-600 dark:text-orange-400">&#34;Hrushi&#34;</span>
                                            <span className="text-black/60 dark:text-white/60">,</span>
                                        </div>
                                        <div className="ml-3">
                                            <span className="text-green-600 dark:text-green-400">role</span>
                                            <span className="text-black/60 dark:text-white/60">: </span>
                                            <span className="text-orange-600 dark:text-orange-400">&#34;DSA&#34;|&#34;WebDev&#34;|&#34;AI-ML&#34;</span>
                                            <span className="text-black/60 dark:text-white/60">,</span>
                                        </div>
                                        <div className="ml-3">
                                            <span className="text-green-600 dark:text-green-400">status</span>
                                            <span className="text-black/60 dark:text-white/60">: </span>
                                            <span className="text-orange-600 dark:text-orange-400">&#34;Available&#34;</span>
                                        </div>
                                        <div className="text-black/60 dark:text-white/60">{`}`};</div>
                                    </div>
                                    <Separator className="my-3 bg-black/[0.08] dark:bg-white/[0.08]" />
                                    <div className="text-xs text-black/40 dark:text-white/40 font-mono text-center">
                                        Ready to collaborate
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            {/* Scroll Indicator - Fixed at bottom */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 z-20">
                <p className="text-xs text-black/40 dark:text-white/40 font-mono tracking-widest uppercase">Scroll to Explore</p>
                <Button
                    onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                    variant="ghost"
                    size="sm"
                    className="rounded-full w-12 h-12 border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-black/60 backdrop-blur-xl hover:bg-white/80 dark:hover:bg-black/80 animate-bounce transition-all duration-300"
                >
                    <ChevronDown className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}