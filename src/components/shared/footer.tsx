"use client";

import { ArrowUp } from "lucide-react";

interface FooterProps {
    className?: string;
}

const NAV_LINKS = [
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
];

const CONNECT_LINKS = [
    { label: "GitHub", href: "https://github.com/hrushi2501" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/hrushi-bhanvadiya-081818280/" },
    { label: "LeetCode", href: "https://leetcode.com/Hrushi2501" },
    { label: "Codeforces", href: "https://codeforces.com/profile/Hrushi2501" },
    { label: "Email", href: "mailto:hrushibhanvadiya@gmail.com" },
];

const PROJECT_LINKS = [
    { label: "Axon OS", href: "#projects" },
    { label: "Financial RAG", href: "#projects" },
    { label: "DB Index Visualizer", href: "#projects" },
    { label: "CPU Scheduler", href: "#projects" },
];

const ABOUT_LINKS = [
    { label: "Resume", href: "#" },
    { label: "Nirma University", href: "https://nirmauni.ac.in" },
    { label: "CSI Chapter", href: "#experience" },
];

export default function Footer({ className }: FooterProps) {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollTo = (href: string) => {
        if (href.startsWith("#")) {
            const el = document.getElementById(href.slice(1));
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
                return;
            }
        }
        window.open(href, "_blank");
    };

    return (
        <footer className={`relative ${className}`}>
            {/* Separator */}
            <div className="max-w-6xl mx-auto px-4 sm:px-8">
                <div className="h-[1px] bg-black/[0.06] dark:bg-white/[0.06]" />
            </div>

            {/* Link columns — Apple style */}
            <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6">
                    {/* Navigate */}
                    <div>
                        <h4 className="text-[11px] font-medium uppercase tracking-[0.15em] text-black/80 dark:text-white/80 mb-4">Navigate</h4>
                        <ul className="space-y-2.5">
                            {NAV_LINKS.map((link) => (
                                <li key={link.label}>
                                    <button
                                        onClick={() => scrollTo(link.href)}
                                        className="text-[13px] text-black/45 dark:text-white/45 hover:text-black dark:hover:text-white transition-colors duration-200"
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="text-[11px] font-medium uppercase tracking-[0.15em] text-black/80 dark:text-white/80 mb-4">Connect</h4>
                        <ul className="space-y-2.5">
                            {CONNECT_LINKS.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[13px] text-black/45 dark:text-white/45 hover:text-black dark:hover:text-white transition-colors duration-200"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Projects */}
                    <div>
                        <h4 className="text-[11px] font-medium uppercase tracking-[0.15em] text-black/80 dark:text-white/80 mb-4">Projects</h4>
                        <ul className="space-y-2.5">
                            {PROJECT_LINKS.map((link) => (
                                <li key={link.label}>
                                    <button
                                        onClick={() => scrollTo(link.href)}
                                        className="text-[13px] text-black/45 dark:text-white/45 hover:text-black dark:hover:text-white transition-colors duration-200 text-left"
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* About */}
                    <div>
                        <h4 className="text-[11px] font-medium uppercase tracking-[0.15em] text-black/80 dark:text-white/80 mb-4">About</h4>
                        <ul className="space-y-2.5">
                            {ABOUT_LINKS.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        target={link.href.startsWith("http") ? "_blank" : undefined}
                                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        onClick={(e) => {
                                            if (link.href.startsWith("#")) {
                                                e.preventDefault();
                                                scrollTo(link.href);
                                            }
                                        }}
                                        className="text-[13px] text-black/45 dark:text-white/45 hover:text-black dark:hover:text-white transition-colors duration-200"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="max-w-6xl mx-auto px-4 sm:px-8">
                <div className="h-[1px] bg-black/[0.06] dark:bg-white/[0.06]" />
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5">
                    <p className="text-[12px] text-black/35 dark:text-white/35">
                        Copyright © {currentYear} Hrushi Bhanvadiya. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4 text-[12px] text-black/35 dark:text-white/35">
                        <span>Ahmedabad, India</span>
                        <span className="text-black/10 dark:text-white/10">|</span>
                        <button
                            onClick={scrollToTop}
                            className="flex items-center gap-1.5 hover:text-black dark:hover:text-white transition-colors duration-200 group"
                        >
                            Back to top
                            <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform duration-200" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}