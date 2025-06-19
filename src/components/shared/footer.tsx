"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
    ArrowUp,
    Heart,
    Code,
    Coffee
} from "lucide-react";

interface FooterProps {
    className?: string;
}

// Custom icons matching your contact component
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

const TwitterIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
);

export default function Footer({ className }: FooterProps) {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: "GitHub",
            url: "https://github.com/hrushi2501",
            icon: GitHubIcon,
            color: "hover:text-gray-700 dark:hover:text-gray-300"
        },
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/hrushi-bhanvadiya-081818280/",
            icon: LinkedInIcon,
            color: "hover:text-blue-600"
        },
            {
                name: "Twitter",
                url: "https://twitter.com/hrushi2501",
                icon: TwitterIcon,
                color: "hover:text-blue-400"
        },
        {
            name: "Instagram",
            url: "https://www.instagram.com/hrushi2501/",
            icon: InstagramIcon,
            color: "hover:text-pink-500"
        }
    ];

    const navigationLinks = [
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Experience", href: "#experience" },
        { name: "Contact", href: "#contact" }
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className={`relative py-16 ${className}`}>
            {/* Background with subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/[0.02] to-transparent dark:from-white/[0.02]" />
            
            <div className="relative max-w-6xl mx-auto px-8">
                {/* Main Footer Content */}
                <div className="grid lg:grid-cols-3 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-black dark:bg-white flex items-center justify-center">
                                    <Code className="w-4 h-4 text-white dark:text-black" />
                                </div>
                                <h3 className="text-xl font-medium text-black dark:text-white">
                                    Hrushi Bhanvadiya
                                </h3>
                            </div>
                            
                            <p className="text-sm text-black/60 dark:text-white/60 font-light leading-relaxed max-w-sm">
                                Crafting digital experiences with passion and precision. 
                                Always exploring new technologies and pushing creative boundaries.
                            </p>

                            <div className="flex items-center gap-2 text-xs text-black/50 dark:text-white/50">
                                <span>Made with</span>
                                <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                                <span>and lots of</span>
                                <Coffee className="w-3 h-3" />
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="lg:col-span-1 space-y-6">
                        <h4 className="text-sm font-medium text-black/80 dark:text-white/80 uppercase tracking-wider">
                            Navigation
                        </h4>
                        <nav className="space-y-3">
                            {navigationLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="block text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors duration-300 font-light"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Contact & Social */}
                    <div className="lg:col-span-1 space-y-6">
                        <h3 className="text-sm font-medium text-black/80 dark:text-white/80 uppercase tracking-wider">
                            Connect
                        </h3>
                        
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-3">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-2 rounded-lg border border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-black/60 backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:shadow-sm ${social.color}`}
                                        title={social.name}
                                    >
                                        <social.icon className="w-4 h-4 text-black/60 dark:text-white/60 transition-colors duration-300" />
                                    </a>
                                ))}
                            </div>

                            <div className="space-y-2">
                                <p className="text-xs text-black/50 dark:text-white/50 font-light">
                                    Actively Seeking Opportunities
                                </p>
                                <Badge
                                    variant="outline"
                                    className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs px-2 py-1"
                                >
                                    Open To Work
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Separator */}
                <Separator className="bg-black/10 dark:bg-white/10 mb-8" />

                {/* Bottom Section */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-black/50 dark:text-white/50">
                        <span>© {currentYear} Hrushi Bhanvadiya. All rights reserved.</span>
                        <div className="hidden sm:block w-1 h-1 rounded-full bg-black/20 dark:bg-white/20" />
                        <div className="flex items-center gap-4">
                            <a href="/privacy" className="hover:text-black dark:hover:text-white transition-colors">
                                Privacy Policy
                            </a>
                            <a href="/terms" className="hover:text-black dark:hover:text-white transition-colors">
                                Terms of Service
                            </a>
                        </div>
                    </div>

                    {/* Back to top button */}
                    <Button
                        onClick={scrollToTop}
                        variant="outline"
                        size="sm"
                        className="border-black/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-black/60 backdrop-blur-xl hover:bg-black/[0.04] dark:hover:bg-white/[0.04] hover:scale-105 transition-all duration-300 group"
                    >
                        <span className="text-xs font-medium mr-2">Back to top</span>
                        <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform duration-300" />
                    </Button>
                </div>
            </div>
        </footer>
    );
}