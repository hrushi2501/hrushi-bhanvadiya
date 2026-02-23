"use client";

import { useEffect, useRef, useState } from "react";

export function ParallaxBackground() {
    const bgRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const bg = bgRef.current;
        if (!bg) return;

        const handleMove = (e: MouseEvent | Event) => {
            const clientX = e instanceof MouseEvent ? e.clientX : window.innerWidth / 2;
            const clientY = e instanceof MouseEvent ? e.clientY : window.innerHeight / 2;

            bg.style.setProperty("--mouse-abs-x", `${clientX}px`);
            bg.style.setProperty("--mouse-abs-y", `${clientY}px`);

            const percentX = clientX / window.innerWidth;
            const percentY = e instanceof MouseEvent ? e.clientY / window.innerHeight : window.scrollY / document.body.scrollHeight;

            bg.style.setProperty("--mouse-x", `${percentX}`);
            bg.style.setProperty("--mouse-y", `${percentY}`);
        };

        window.addEventListener("mousemove", handleMove);
        window.addEventListener("scroll", handleMove);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("scroll", handleMove);
        };
    }, []);

    return (
        <div ref={bgRef} className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#f8f9fa] dark:bg-[#0a0a0a] transition-colors duration-700">
            {/* 1. Dynamic Interactive Flashlight Map (follows cursor smoothly using native CSS variables) */}
            <div
                className="absolute inset-0 opacity-50 dark:opacity-40"
                style={{
                    background: `radial-gradient(circle 800px at var(--mouse-abs-x, 50vw) var(--mouse-abs-y, 50vh), rgba(0, 0, 0, 0.04), transparent 80%)`
                }}
            />
            <div
                className="absolute inset-0 hidden dark:block opacity-40"
                style={{
                    background: `radial-gradient(circle 800px at var(--mouse-abs-x, 50vw) var(--mouse-abs-y, 50vh), rgba(255, 255, 255, 0.05), transparent 80%)`
                }}
            />

            {/* 2. Abstract Grid that moves with Parallax */}
            <div
                className="absolute inset-0 opacity-[0.3] dark:opacity-[0.15]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)
                    `,
                    backgroundSize: "60px 60px",
                    transform: "translate(calc(var(--mouse-x, 0.5) * -30px), calc(var(--mouse-y, 0.5) * -30px))",
                    transition: "transform 0.1s cubic-bezier(0,0,0.2,1)"
                }}
            >
                <div className="absolute inset-0 hidden dark:block"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)
                        `,
                        backgroundSize: "60px 60px"
                    }}
                />
            </div>

            {/* 3. Sweeping Geometric Shadows */}
            <div
                className="absolute top-[20%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-black/[0.04] to-transparent blur-[100px] dark:from-white/[0.03]"
                style={{
                    transform: "translate(calc(var(--mouse-x, 0.5) * -60px), calc(var(--mouse-y, 0.5) * -60px))",
                    transition: "transform 0.8s ease-out"
                }}
            />
            <div
                className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-black/[0.05] to-transparent blur-[120px] dark:from-white/[0.04]"
                style={{
                    transform: "translate(calc(var(--mouse-x, 0.5) * 50px), calc(var(--mouse-y, 0.5) * 50px))",
                    transition: "transform 0.8s ease-out"
                }}
            />

            {/* 4. Film Grain for Cinematic Feel */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: "url('/noise.png')" }} />
        </div>
    );
}
