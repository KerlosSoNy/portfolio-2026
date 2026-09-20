"use client"

import { motion, useScroll, useTransform, type Variants } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useRef } from "react"
import { WordsPullUp } from "./NewHero"

const stats = [
    { value: "5+", label: "Years of experience" },
    { value: "40+", label: "Projects delivered" },
    { value: "20+", label: "Happy clients" },
    { value: "8", label: "Awards & nominations" },
]

const services = [
    { title: "Design", description: "Interfaces and visual systems built around clarity and motion." },
    { title: "Development", description: "Performant, accessible web experiences from prototype to production." },
    { title: "Motion", description: "Storytelling through animation, transitions and interactive detail." },
]

const fadeUp: Variants = {
    hidden: { y: 40, opacity: 0 },
    show: (i: number = 0) => ({
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
    }),
}

export const AboutSection = () => {
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
            className="relative w-full h-fit font-en! z-10 overflow-hidden bg-transparent text-white flex items-center justify-center sm:py-32 md:py-40 py-10 3xl:py-30"
        >
            <motion.span
                aria-hidden
                style={{ y: watermarkY }}
                className="pointer-events-none absolute top-20 md:top-[7vw] 3xl:top-8 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[28vw] font-medium leading-none tracking-tighter text-white/[0.04] sm:text-[22vw]"
            >
                About
            </motion.span>

            <div className="relative grid max-w-[1800px] grid-cols-12 gap-x-4 gap-y-14 px-4 py-30 sm:px-6 md:px-10">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.6 }}
                    variants={fadeUp}
                    className="col-span-12 mt-18 flex items-center gap-4"
                >
                    <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/50 sm:text-sm">
                        01 / About
                    </span>
                    <motion.span
                        style={{ scaleX: lineScale }}
                        className="h-px flex-1 origin-left bg-white/20"
                    />
                </motion.div>

                <div className="col-span-12 lg:col-span-8">
                    <h2
                        className="font-medium leading-[1.05] tracking-[-0.03em] text-[9vw] sm:text-[7vw] md:text-[4.5vw] lg:text-[3.6vw]"
                        style={{ color: "#E1E0CC" }}
                    >
                        <WordsPullUp text="Blending visual storytelling with modern engineering to build experiences people remember." />
                    </h2>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={fadeUp}
                    custom={1}
                    className="col-span-12 flex flex-col justify-between gap-8 lg:col-span-4"
                >
                    <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                        I&apos;m Kerlos Magdy — a multidisciplinary creator working across design,
                        development and motion. I partner with brands and studios to turn ideas
                        into interfaces and films that feel alive.
                    </p>

                    <a
                        href="https://cal.com/kerlos-magdy-yaumvr/15min"
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex w-fit items-center gap-2 border-b border-white/30 pb-1 text-sm font-medium text-white transition-colors hover:border-white"
                    >
                        Let&apos;s work together
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                </motion.div>

                <div className="col-span-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 sm:gap-8 md:grid-cols-4">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.6 }}
                            variants={fadeUp}
                            custom={i}
                            className="flex flex-col gap-2"
                        >
                            <span
                                className="text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl"
                                style={{ color: "#E1E0CC" }}
                            >
                                {stat.value}
                            </span>
                            <span className="text-[12px] uppercase tracking-widest text-white/50 sm:text-sm">
                                {stat.label}
                            </span>
                        </motion.div>
                    ))}
                </div>

                <div className="col-span-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
                    {services.map((service, i) => (
                        <motion.div
                            key={service.title}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.4 }}
                            variants={fadeUp}
                            custom={i}
                            className="group relative flex flex-col gap-3 bg-black/40 p-6 backdrop-blur-sm transition-colors duration-500 hover:bg-black/20 sm:p-8"
                        >
                            <div className="flex flex-row md:flex-col items-center md:items-start gap-3">
                                <span className="text-xs text-white/40">0{i + 1}</span>
                                <h3 className="text-lg font-medium sm:text-xl" style={{ color: "#E1E0CC" }}>
                                    {service.title}
                                </h3>
                            </div>
                            <p className="text-sm leading-relaxed text-white/50">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default AboutSection
