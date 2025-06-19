"use client";
import {
    useScroll,
    useTransform,
    motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
    title: string;
    content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 50%", "end 80%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
        <div
            className="w-full bg-transparent font-sans md:px-10"
            ref={containerRef}
        >
            <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
                {data.map((item, index) => (
                    <TimelineItem
                        key={index}
                        item={item}
                        index={index}
                        totalItems={data.length}
                        scrollYProgress={scrollYProgress}
                    />
                ))}

                {/* Minimalist Timeline Line */}
                <div
                    style={{
                        height: height + "px",
                    }}
                    className="absolute md:left-8 left-8 top-0 overflow-hidden w-[1px] bg-white/10 rounded-full"
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute inset-x-0 top-0 w-[1px] bg-white/40 rounded-full shadow-[0_0_4px_rgba(255,255,255,0.3)]"
                    />
                </div>
            </div>
        </div>
    );
};

// Separate component for each timeline item to properly use hooks
const TimelineItem = ({
    item,
    index,
    totalItems,
    scrollYProgress
}: {
    item: TimelineEntry;
    index: number;
    totalItems: number;
    scrollYProgress: import("framer-motion").MotionValue<number>;
}) => {
    // Transform for node animation based on scroll
    const nodeProgress = useTransform(
        scrollYProgress,
        [index / totalItems, (index + 0.5) / totalItems],
        [0, 1]
    );

    const nodeOpacity = useTransform(nodeProgress, [0, 1], [0.4, 1]);
    const nodeScale = useTransform(nodeProgress, [0, 1], [0.8, 1]);
    const nodeBg = useTransform(nodeProgress, [0, 1], [
        "rgba(255,255,255,0.05)",
        "rgba(255,255,255,0.15)"
    ]);

    // Content card glow effect synchronized with node
    const cardGlowOpacity = useTransform(nodeProgress, [0, 0.3, 1], [0, 0.3, 1]);
    const cardBorderGlow = useTransform(nodeProgress, [0, 1], [
        "rgba(255,255,255,0.1)",
        "rgba(255,255,255,0.4)"
    ]);

    return (
        <div className="flex justify-start pt-10 md:pt-20 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                {/* Enhanced Timeline Node with Glow */}
                <motion.div
                    className="h-10 absolute left-3 md:left-3 w-10 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 ease-out"
                    style={{
                        backgroundColor: nodeBg,
                        opacity: nodeOpacity,
                        scale: nodeScale,
                        boxShadow: useTransform(nodeProgress, [0, 1], [
                            "0 0 0px rgba(255,255,255,0)",
                            "0 0 20px rgba(255,255,255,0.4), 0 0 40px rgba(255,255,255,0.2)"
                        ])
                    }}
                >
                    <motion.div
                        className="h-3 w-3 rounded-full bg-white/60 transition-all duration-300 ease-out"
                        style={{
                            opacity: nodeOpacity,
                            boxShadow: useTransform(nodeProgress, [0, 1], [
                                "0 0 0px rgba(255,255,255,0)",
                                "0 0 10px rgba(255,255,255,0.6)"
                            ])
                        }}
                    />
                </motion.div>
                
                {/* Company Title */}
                <h3 className="hidden md:block text-xl md:pl-20 md:text-2xl font-light text-white/90 transition-colors duration-300 ease-out hover:text-white/95">
                    {item.title}
                </h3>
            </div>

            {/* Content Card with Synchronized Glow */}
            <motion.div 
                className="relative pl-20 pr-4 md:pl-4 w-full"
                style={{
                    filter: useTransform(cardGlowOpacity, [0, 1], [
                        "drop-shadow(0 0 0px rgba(255,255,255,0))",
                        "drop-shadow(0 0 8px rgba(255,255,255,0.2))"
                    ])
                }}
            >
                <h3 className="md:hidden block text-xl mb-4 text-left font-light text-white/90">
                    {item.title}
                </h3>
                
                {/* Enhanced Content with Glow Border */}
                <motion.div
                    style={{
                        borderColor: cardBorderGlow,
                        boxShadow: useTransform(cardGlowOpacity, [0, 1], [
                            "0 0 0px rgba(255,255,255,0)",
                            "0 0 16px rgba(255,255,255,0.1), inset 0 0 16px rgba(255,255,255,0.05)"
                        ])
                    }}
                    className="border rounded-lg transition-all duration-500 ease-out"
                >
                    {item.content}
                </motion.div>
            </motion.div>
        </div>
    );
};