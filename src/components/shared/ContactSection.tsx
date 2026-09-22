"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react"
import { useRef } from "react"
import { WordsPullUp } from "./NewHero"
import { fadeUp } from "./AboutSection"
import { ORG_EMAIL, ORG_PHONE } from "@/lib/constant/site"

const channels = [
    {
        icon: Mail,
        title: "Email",
        description: "Best for project briefs and detailed questions.",
        value: ORG_EMAIL,
        href: `mailto:${ORG_EMAIL}`,
    },
    {
        icon: Phone,
        title: "Call",
        description: "For quick chats and urgent conversations.",
        value: ORG_PHONE,
        href: `tel:${ORG_PHONE.replace(/\s/g, "")}`,
    },
    {
        icon: MapPin,
        title: "Based in",
        description: "Available for remote work, worldwide.",
        value: "Cairo, Egypt",
        href: undefined,
    },
] as const

export const ContactSection = () => {
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
                className="pointer-events-none absolute top-35 md:top-50 lg:top-34 2xl:top-25  left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[26vw] font-medium leading-none tracking-tighter text-white/20 sm:text-[18vw]"
            >
                Contact
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
                        01 / Contact
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
                        <WordsPullUp text="Have an idea? Let's make it real, together." />
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
                        Whether it&apos;s a full product, a landing page, or just an idea you
                        want to sanity-check — I&apos;d love to hear about it. Reach out and
                        let&apos;s see what we can build.
                    </p>

                    <a
                        href={`mailto:${ORG_EMAIL}`}
                        className="group inline-flex w-fit items-center gap-2 border-b border-white/30 pb-1 text-sm font-medium text-white transition-colors hover:border-white"
                    >
                        Send an email
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                </motion.div>

                <div className="col-span-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
                    {channels.map((channel, i) => {
                        const Icon = channel.icon
                        const cardClassName =
                            "group relative flex flex-col gap-3 bg-black/40 p-6 backdrop-blur-sm transition-colors duration-500 hover:bg-black/20 sm:p-8"
                        const content = (
                            <>
                                <div className="flex flex-row md:flex-col items-center md:items-start gap-3">
                                    <Icon className="h-4 w-4 text-white/40" strokeWidth={1.5} />
                                    <h3 className="text-lg font-medium sm:text-xl" style={{ color: "#E1E0CC" }}>
                                        {channel.title}
                                    </h3>
                                </div>
                                <p className="text-sm leading-relaxed text-white/50">
                                    {channel.description}
                                </p>
                                <span className="mt-1 text-sm text-white/70">{channel.value}</span>
                            </>
                        )

                        return channel.href ? (
                            <motion.a
                                key={channel.title}
                                href={channel.href}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.4 }}
                                variants={fadeUp}
                                custom={i}
                                className={cardClassName}
                            >
                                {content}
                            </motion.a>
                        ) : (
                            <motion.div
                                key={channel.title}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.4 }}
                                variants={fadeUp}
                                custom={i}
                                className={cardClassName}
                            >
                                {content}
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default ContactSection
