"use client"
import { useScroll, useTransform, motion } from "motion/react"
import ReactLenis, { useLenis } from "lenis/react"
import Snap from "lenis/snap"
import { ReactNode, useEffect, useRef } from "react"
import { LetsWorkTogether } from "./shared/LetsTalk"
import AboutSection from "./shared/AboutSection"

const slides: { component: ReactNode }[] = [
    {
        component: (
            <AboutSection />
        ),
    },
    {
        component: (
            <div className="w-screen h-screen" />
        ),
    },
    {
        component: (
            <div className="w-screen h-screen" />
        ),
    },
    {
        component: (
            <div className="w-screen h-screen" />
        ),
    },
    {
        component: <LetsWorkTogether />,
    },
]

const StickyCard_001 = ({
    component,
    progress,
    range,
    targetScale,
    registerSlide,
}: {
    i: number
    component: ReactNode
    progress: any
    range: [number, number]
    targetScale: number
    registerSlide?: (el: HTMLDivElement | null) => void
}) => {
    const container = useRef<HTMLDivElement>(null)

    const scale = useTransform(progress, range, [1, targetScale])

    return (
        <div
            ref={(el) => {
                container.current = el
                registerSlide?.(el)
            }}
            className="sticky top-0 flex items-center justify-center "
        >
            <motion.div
                style={{
                    scale,
                }}
                className=" relative  flex origin-cover flex-col overflow-hidden
                  w-screen h-screen"
            >
                {component}
            </motion.div>
        </div>
    )
}

const ImagesScrollingAnimation = () => {
    const container = useRef<HTMLDivElement>(null)
    const slideRefs = useRef<(HTMLDivElement | null)[]>([])
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    })
    const lenis = useLenis()

    useEffect(() => {
        if (!lenis) return

        const snap = new Snap(lenis, { type: "proximity" })
        const removeElements = snap.addElements(
            slideRefs.current.filter((el): el is HTMLDivElement => el !== null),
            { align: "start" }
        )

        return () => {
            removeElements()
            snap.destroy()
        }
    }, [lenis])

    return (
        <ReactLenis root>
            <main
                ref={container}
                className="relative flex w-full flex-col items-center justify-center"
            >
                {slides.map((slide, i) => {
                    const targetScale = Math.max(0.3, 1 - (slides.length - i - 1) * 0.08)
                    return (
                        <StickyCard_001
                            key={`p_${i}`}
                            i={i}
                            {...slide}
                            progress={scrollYProgress}
                            range={[i * 0.3, 1]}
                            targetScale={targetScale}
                            registerSlide={(el) => {
                                slideRefs.current[i] = el
                            }}
                        />
                    )
                })}
            </main>
        </ReactLenis>
    )
}

export { ImagesScrollingAnimation, StickyCard_001 }
