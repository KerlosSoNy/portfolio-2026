
"use client";
import {
    useScroll,
    useTransform,
    motion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
        offset: ["start 10%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    const watermarkY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])
    const lineScale = useTransform(scrollYProgress, [0, 0.5], [0, 1])

    const dotVariants = {
        inactive: {
            backgroundColor: "#262626",
            scale: 1,
            boxShadow: "0 0 0px 0px rgba(168,85,247,0)",
        },
        active: {
            backgroundColor: "#ffffff",
            scale: 1.15,
            boxShadow:
                "0 0 0px 4px rgba(168,85,247,0.25), 0 0 18px 4px rgba(255,255,255,0.45)",
        },
    };

    const checkVariants = {
        inactive: { opacity: 0, scale: 0.4 },
        active: { opacity: 1, scale: 1 },
    };

    const titleVariants = {
        inactive: { color: "#737373", textShadow: "0 0 0px rgba(225,224,204,0)" },
        active: { color: "#E1E0CC", textShadow: "0 0 18px rgba(225,224,204,0.35)" },
    };

    return (
        <div
            className="relative grid mx-auto max-w-[1800px] grid-cols-12 gap-x-4 px-10 py-30 "
            ref={containerRef}
        >
            <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
                variants={fadeUp}
                className="col-span-12 mt-18 flex items-center gap-4"
            >
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/50 sm:text-sm">
                    02 / Experience
                </span>
                <motion.span
                    style={{ scaleX: lineScale }}
                    className="h-px flex-1 origin-left bg-white/20"
                />
            </motion.div>
            <motion.span
                aria-hidden
                style={{ y: watermarkY }}
                className="pointer-events-none absolute top-24 md:top-0 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[23vw] font-medium leading-none tracking-tighter text-white/20 sm:text-[17vw]"
            >
                Experience
            </motion.span>
            <div
                className="max-w-7xl mt-10 mx-auto gap-10 md:gap-40 col-span-12 text-start flex flex-col md:flex-row"
            >
                <h2
                    className="font-medium leading-[1.05] tracking-[-0.03em] text-[9vw] sm:text-[7vw] md:text-[4.5vw] lg:text-[3.6vw]"
                    style={{ color: "#E1E0CC" }}
                >
                    <WordsPullUp text="Changelog from my journey" />
                </h2>
                <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                    I&apos;ve been building front-end products since 2024. Here&apos;s
                    a timeline of my journey.
                </p>
            </div>

            <div ref={ref} className="relative pb-20 mt-10 col-span-12">
                {data.map((item, index) => (
                    <motion.div
                        key={index}
                        initial="inactive"
                        whileInView="active"
                        viewport={{ once: false, margin: "-160px 0px -55% 0px" }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className="flex justify-start pt-10 md:pt-20 md:gap-10"
                    >
                        <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                            <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                                <motion.div
                                    variants={dotVariants}
                                    className="h-4 w-4 rounded-full border border-neutral-300 dark:border-neutral-700 flex items-center justify-center relative"
                                >
                                    <motion.svg
                                        variants={checkVariants}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#7c3aed"
                                        strokeWidth={3}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-2.5 w-2.5"
                                    >
                                        <polyline points="5 13 9 17 19 7" />
                                    </motion.svg>
                                </motion.div>
                            </div>
                            <motion.h3
                                variants={titleVariants}
                                className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold "
                            >
                                {item.title}
                            </motion.h3>
                        </div>

                        <div className="relative pl-20 pr-4 md:pl-4 w-full">
                            <motion.h3
                                variants={titleVariants}
                                className="md:hidden block text-2xl mb-4 text-left font-bold"
                            >
                                {item.title}
                            </motion.h3>
                            {item.content}{" "}
                        </div>
                    </motion.div>
                ))}
                <div
                    style={{
                        height: height + "px",
                    }}
                    className="absolute md:left-8 left-8 top-0 overflow-hidden w-0.5 bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-0 via-neutral-200 dark:via-neutral-700 to-transparent to-99%  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute inset-x-0 top-0  w-0.5 bg-linear-to-t from-purple-500 via-white to-transparent from-0% via-10% rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};


import React from "react";
import { fadeUp } from "@/components/shared/AboutSection";
import { WordsPullUp } from "@/components/shared/NewHero";

export function TimeLine() {
    const data = [
        {
            title: "Feb 2024 - Jan 2025",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        Front-End Developer | Dr Code
                    </p>
                    <div className="mb-8">
                        <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                            Developed and maintained production-grade web applications using React.js, Next.js, and TypeScript, increasing overall performance by 20%.
                        </p>
                        <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                            Implemented Redux for advanced state management, reducing application bugs by 25% and improving stability.
                        </p>
                        <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                            Optimized API consumption and asynchronous data handling, reducing inconsistencies by 15%.
                        </p>
                        <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                            Participated in code reviews and performance optimization initiatives within an agile development environment.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            title: "Jan 2025 - April 2026",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        Front-End Developer | Purpose
                    </p>
                    <div className="mb-8">
                        <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                            Led development of scalable front-end applications using React.js and TypeScript for e-commerce platforms and AI-powered chatbots, improving performance by 30%.
                        </p>
                        <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                            Designed reusable UI components and modular architecture to support rapid feature expansion and long-term scalability.
                        </p>
                        <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                            Contributed to UI/UX improvements that enhanced user engagement and conversion rates.
                        </p>
                        <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                            Collaborated closely with back-end teams to integrate RESTful APIs, reducing data-fetching issues by 20% and improving reliability.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            title: "June 2026 - Present",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        Front-End Developer | O-Projects
                    </p>
                    <div className="mb-8">
                        <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                            Translated complex UI/UX designs and high-fidelity wireframes into clean, responsive React.js and TypeScript interfaces, ensuring complete visual fidelity across all devices.
                        </p>
                        <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                            Partnered closely with designers, product managers, and back-end engineers to iterate on existing features, implement design amendments, and elevate overall application architecture.
                        </p>
                    </div>
                </div>
            ),
        },
    ];
    return (
        <div className="min-h-screen relative w-full">
            <Timeline data={data} />
        </div>
    );
}

