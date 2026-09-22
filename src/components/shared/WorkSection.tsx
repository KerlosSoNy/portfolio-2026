"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { fadeUp } from "./AboutSection"
import { WordsPullUp } from "./NewHero"
import { projects } from "@/lib/constant/projects"

export const WorkSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    })
    const watermarkY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])
    const lineScale = useTransform(scrollYProgress, [0, 0.5], [0, 1])

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-fit font-en! z-10 overflow-hidden bg-transparent text-white sm:pt-32 md:pt-t0 pt-10 3xl:pt-50"
        >
            <motion.span
                aria-hidden
                style={{ y: watermarkY }}
                className="pointer-events-none absolute top-35 md:top-50 lg:top-36 2xl:top-25  left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[26vw] font-medium leading-none tracking-tighter text-white/20 sm:text-[18vw]"
            >
                Work
            </motion.span>

            <div className="relative mx-auto flex max-w-[1800px] flex-col gap-14 px-4 py-30 sm:px-6 md:px-10">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.6 }}
                    variants={fadeUp}
                    className="mt-18 flex items-center gap-4"
                >
                    <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/50 sm:text-sm">
                        01 / Full Archive
                    </span>
                    <motion.span
                        style={{ scaleX: lineScale }}
                        className="h-px flex-1 origin-left bg-white/20"
                    />
                </motion.div>

                <h2
                    className="max-w-4xl font-medium leading-[1.05] tracking-[-0.03em] text-[9vw] sm:text-[7vw] md:text-[4.5vw] lg:text-[3.6vw]"
                    style={{ color: "#E1E0CC" }}
                >
                    <WordsPullUp text="Every project, from first pixel to launch." />
                </h2>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={fadeUp}
                            custom={i % 3}
                        >
                            <Link
                                href={project.href}
                                target="_blank"
                                className={`group relative flex h-72 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 p-6 transition-transform duration-500 hover:-translate-y-1 ${project.image ? "bg-main/10 backdrop-blur-3xl!" : `bg-linear-to-br ${project.gradient}`
                                    }`}
                            >
                                <div className="absolute inset-0 z-2 h-full w-full bg-black/30 backdrop-blur-[1px]" />
                                {project.image && (
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                                        className="relative object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                )}

                                <div className="relative z-10 flex items-center justify-between">
                                    <span className="text-xs text-white">0{i + 1}</span>
                                    <span className="text-xs uppercase tracking-[0.2em] text-white">
                                        {project.year}
                                    </span>
                                </div>

                                <div className="relative z-10 flex flex-col gap-1">
                                    <span className="text-xs uppercase tracking-widest text-white">
                                        {project.category}
                                    </span>
                                    <h3
                                        className="text-2xl font-medium leading-tight sm:text-3xl"
                                        style={{ color: "#E1E0CC" }}
                                    >
                                        {project.title}
                                    </h3>
                                    <span className="inline-flex w-fit items-center gap-2 border-b border-white/30 pb-1 text-sm font-medium text-white transition-colors group-hover:border-white">
                                        View project
                                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WorkSection
