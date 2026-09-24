"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useTransform, useScroll } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { fadeUp } from "./AboutSection"
import { WordsPullUp } from "./NewHero"
import { projects } from "@/lib/constant/projects"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

export const ProjectsSection = () => {
    const sectionRef = useRef<HTMLElement>(null)
    const innerRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const progressRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"],
    })
    const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

    useGSAP(
        () => {
            const track = trackRef.current
            const section = sectionRef.current
            const inner = innerRef.current
            const progress = progressRef.current
            if (!track || !section || !inner) return

            const getDistance = () => track.scrollWidth - window.innerWidth

            const setSectionHeight = () => {
                section.style.height = `${window.innerHeight + getDistance()}px`
            }
            setSectionHeight()

            // `position: sticky`/GSAP's pin-spacer both misbehave here because
            // an ancestor sets overflow-x, which makes that ancestor a scroll
            // container and breaks sticky/pin positioning for descendants.
            // Pin the inner wrapper manually with fixed/absolute instead.
            const applyPinState = (self: ScrollTrigger) => {
                if (self.progress <= 0 && !self.isActive) {
                    Object.assign(inner.style, {
                        position: "",
                        top: "",
                        bottom: "",
                        left: "",
                        width: "",
                    })
                } else if (self.progress >= 1 && !self.isActive) {
                    Object.assign(inner.style, {
                        position: "absolute",
                        top: "auto",
                        bottom: "0px",
                        left: "0px",
                        width: "100%",
                    })
                } else {
                    Object.assign(inner.style, {
                        position: "fixed",
                        top: "0px",
                        bottom: "auto",
                        left: "0px",
                        width: "100%",
                    })
                }
            }

            const tween = gsap.to(track, {
                x: () => -getDistance(),
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${getDistance()}`,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    onRefresh: setSectionHeight,
                    onUpdate: (self) => {
                        applyPinState(self)
                        if (progress) {
                            progress.style.transform = `scaleX(${self.progress})`
                        }
                    },
                    onEnter: applyPinState,
                    onLeave: applyPinState,
                    onEnterBack: applyPinState,
                    onLeaveBack: applyPinState,
                },
            })

            return () => {
                tween.scrollTrigger?.kill()
                tween.kill()
                Object.assign(inner.style, {
                    position: "",
                    top: "",
                    bottom: "",
                    left: "",
                    width: "",
                })
            }
        },
        { scope: sectionRef }
    )

    return (
        <section
            ref={sectionRef}
            className="relative z-20 w-full bg-transparent font-en! text-white"
        >
            <div ref={innerRef} className="h-screen w-full overflow-hidden">
                <motion.span
                    aria-hidden
                    className="pointer-events-none absolute top-45 md:-top-34 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[26vw] font-medium leading-none tracking-tighter text-white/20 sm:text-[18vw]"
                >
                    Projects
                </motion.span>

                <div className="relative z-10 flex h-full flex-col justify-center gap-10 py-16">
                    <div className="grid max-w-[1800px] w-full mx-auto grid-cols-12 gap-x-4 px-4 sm:px-6 md:px-10">
                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.6 }}
                            variants={fadeUp}
                            className="col-span-12 flex items-center gap-4"
                        >
                            <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/50 sm:text-sm">
                                03 / Selected Work
                            </span>
                            <motion.span
                                style={{ scaleX: lineScale }}
                                className="h-px flex-1 origin-left bg-white/20"
                            />
                        </motion.div>

                        <div className="col-span-12 mt-8">
                            <h2
                                className="font-medium leading-[1.05] tracking-[-0.03em] text-[9vw] sm:text-[7vw] md:text-[4.5vw] lg:text-[3.6vw]"
                                style={{ color: "#E1E0CC" }}
                            >
                                <WordsPullUp text="Projects worth scrolling for" />
                            </h2>
                        </div>
                    </div>

                    <div
                        ref={trackRef}
                        className="flex w-max items-stretch gap-6 pl-4 pr-[10vw] sm:pl-6 md:pl-10"
                    >
                        {projects.map((project, i) => (
                            <Link
                                key={project.title}
                                href={project.href}
                                target="_blank"
                                className={`
                                    w-75 md:w-125 h-50 md:h-88
                                    group relative  flex shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 p-6 transition-transform duration-500 hover:-translate-y-1 
                                     sm:p-4 
                                     ${project.image ? "bg-main/10 backdrop-blur-3xl! " : `bg-linear-to-br ${project.gradient}`
                                    }`}
                            >
                                <div className="inset-0 w-full h-full absolute backdrop-blur-[1px] bg-black/30 z-2" />
                                {project.image && (
                                    <>
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            sizes="(min-width: 1024px) 26vw, (min-width: 768px) 32vw, (min-width: 640px) 46vw, 78vw"
                                            className="object-fill relative  transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </>
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
                        ))}
                    </div>

                    <div className="mx-auto h-px w-[calc(100%-2rem)] max-w-[1800px] bg-white/10 sm:w-[calc(100%-3rem)] md:w-[calc(100%-5rem)]">
                        <div
                            ref={progressRef}
                            className="h-px w-full origin-left scale-x-0 bg-white/60"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProjectsSection
