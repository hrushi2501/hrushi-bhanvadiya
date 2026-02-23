"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { track } from "@vercel/analytics";
import { Toaster } from "@/components/ui/sonner";
import { useTheme } from "next-themes";
import { Download, FolderGit2, Mail, Link as LinkIcon, Github, Linkedin, Moon, Sun } from "lucide-react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
    ContextMenuShortcut,
    ContextMenuSeparator,
} from "@/components/ui/context-menu";

interface GlobalInteractionProps {
    children: React.ReactNode;
}

export function GlobalInteraction({ children }: GlobalInteractionProps) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Global Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Anti-Inspect / DevTools Block
            if (
                e.key === "F12" ||
                (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") ||
                (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "j") ||
                (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "c") ||
                (e.ctrlKey && e.key.toLowerCase() === "u")
            ) {
                e.preventDefault();
                return;
            }

            if (e.ctrlKey || e.metaKey) {
                switch (e.key.toLowerCase()) {
                    case "d":
                        e.preventDefault();
                        track("Resume Download", { source: "keyboard_shortcut" });
                        toast("Downloading Resume...", {
                            description: "Your file is opening in a new tab.",
                        });
                        setTimeout(() => {
                            window.open("/resume.pdf", "_blank");
                        }, 500);
                        break;
                    case "m":
                        e.preventDefault();
                        const contactSection = document.getElementById("contact");
                        if (contactSection) {
                            contactSection.scrollIntoView({ behavior: "smooth" });
                            toast("Navigating to Contact form.", {
                                description: "Ready to hear your ideas!",
                            });
                        }
                        break;
                }
            }
        };

        const handleContextMenu = (e: MouseEvent) => {
            // Block native right-click across the entire app
            // Note: Shadcn ContextMenu overrides this for the wrapped components,
            // but for unhandled ones, this prevents the native browser context menu containing 'Inspect'.
            e.preventDefault();
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("contextmenu", handleContextMenu);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);

    const copyEmail = () => {
        track("Copy Email", { source: "context_menu" });
        navigator.clipboard.writeText("hrushibhanvadiya@gmail.com");
        toast("Email copied to clipboard!", {
            description: "hrushibhanvadiya@gmail.com is in your clipboard.",
        });
    };

    const copyPortfolioLink = () => {
        track("Copy Link", { source: "context_menu" });
        navigator.clipboard.writeText(window.location.href);
        toast("Link copied to clipboard!", {
            description: "Share this portfolio with others.",
        });
    };

    const toggleTheme = () => {
        track("Toggle Theme", { source: "context_menu" });
        setTheme(theme === "dark" ? "light" : "dark");
        toast(`Switched to ${theme === "dark" ? "light" : "dark"} mode`, {
            description: "Theme preferences updated."
        });
    };

    return (
        <ContextMenu>
            <ContextMenuTrigger className="flex min-h-screen w-full flex-col">
                {children}
            </ContextMenuTrigger>

            <ContextMenuContent className="w-64 bg-white/95 dark:bg-[#050505]/95 text-black dark:text-white border border-black/10 dark:border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-xl">
                <ContextMenuItem asChild className="focus:bg-black/5 dark:focus:bg-white/10 cursor-pointer rounded-lg px-3 py-2.5">
                    <button className="flex w-full items-center justify-between" onClick={() => {
                        track("Resume Download", { source: "context_menu" });
                        toast("Downloading Resume...", { description: "Your file is opening in a new tab." });
                        setTimeout(() => {
                            window.open("/resume.pdf", "_blank");
                        }, 500);
                    }}>
                        <span className="flex items-center gap-2"><Download className="w-4 h-4" /> Download Resume</span>
                        <ContextMenuShortcut className="text-black/50 dark:text-white/50 bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded text-[10px] ml-auto">⌘D</ContextMenuShortcut>
                    </button>
                </ContextMenuItem>

                <ContextMenuSeparator className="bg-black/5 dark:bg-white/10 my-1" />

                <ContextMenuItem asChild className="focus:bg-black/5 dark:focus:bg-white/10 cursor-pointer rounded-lg px-3 py-2.5">
                    <a href="#projects" className="flex items-center gap-2">
                        <FolderGit2 className="w-4 h-4" /> View Projects
                    </a>
                </ContextMenuItem>

                <ContextMenuItem asChild className="focus:bg-black/5 dark:focus:bg-white/10 cursor-pointer rounded-lg px-3 py-2.5">
                    <a href="#contact" className="flex items-center justify-between w-full">
                        <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> Contact Me</span>
                        <ContextMenuShortcut className="text-black/50 dark:text-white/50 bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded text-[10px]">⌘M</ContextMenuShortcut>
                    </a>
                </ContextMenuItem>

                <ContextMenuSeparator className="bg-black/5 dark:bg-white/10 my-1" />

                <ContextMenuItem onClick={copyPortfolioLink} className="focus:bg-black/5 dark:focus:bg-white/10 cursor-pointer rounded-lg px-3 py-2.5 flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" /> Copy Portfolio Link
                </ContextMenuItem>

                <ContextMenuItem onClick={copyEmail} className="focus:bg-black/5 dark:focus:bg-white/10 cursor-pointer rounded-lg px-3 py-2.5 flex items-center gap-2">
                    <Mail className="w-4 h-4" /> Copy Email Address
                </ContextMenuItem>

                <ContextMenuSeparator className="bg-black/5 dark:bg-white/10 my-1" />

                <ContextMenuItem asChild className="focus:bg-black/5 dark:focus:bg-white/10 cursor-pointer rounded-lg px-3 py-2.5">
                    <a href="https://github.com/hrushi2501" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full">
                        <span className="flex items-center gap-2"><Github className="w-4 h-4" /> GitHub Profile</span>
                    </a>
                </ContextMenuItem>

                <ContextMenuItem asChild className="focus:bg-black/5 dark:focus:bg-white/10 cursor-pointer rounded-lg px-3 py-2.5">
                    <a href="https://linkedin.com/in/hrushi-bhanvadiya-081818280/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full">
                        <span className="flex items-center gap-2"><Linkedin className="w-4 h-4" /> LinkedIn</span>
                    </a>
                </ContextMenuItem>

                <ContextMenuSeparator className="bg-black/5 dark:bg-white/10 my-1" />

                <ContextMenuItem onClick={toggleTheme} className="focus:bg-black/5 dark:focus:bg-white/10 cursor-pointer rounded-lg px-3 py-2.5 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                        {mounted && theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        Switch Theme
                    </span>
                    <span className="text-black/50 dark:text-white/40 text-[10px] ml-auto">
                        {mounted ? (theme === "dark" ? "Light" : "Dark") : "Theme"}
                    </span>
                </ContextMenuItem>
            </ContextMenuContent>

            <Toaster position="bottom-right" className="pointer-events-auto" toastOptions={{
                className: "bg-white/95 dark:bg-white/10 border border-black/10 dark:border-white/10 backdrop-blur-2xl text-black dark:text-white"
            }} />
        </ContextMenu>
    );
}
