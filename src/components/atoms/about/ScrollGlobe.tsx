'use client'
import { cn } from "@/lib/functions/utils";
import type { AboutSectionData, GlobeConfig } from "./about.types";
import { useScrollGlobe } from "./useScrollGlobe";
import { ProgressBar } from "./ProgressBar";
import { FloatingGlobe } from "./FloatingGlobe";
import { AboutStorySection } from "./AboutStorySection";

interface ScrollGlobeProps {
    sections: AboutSectionData[];
    globeConfig?: GlobeConfig;
    className?: string;
}

const defaultGlobeConfig: GlobeConfig = {
    positions: [
        { top: "50%", left: "90%", scale: 2 },  // Intro: Right side, balanced
        { top: "25%", left: "10%", scale: 2 },  // Approach: Top side, subtle
        { top: "50%", left: "90%", scale: 2 },  // Services: Left side, medium
        { top: "50%", left: "90%", scale: 2 },  // Details: Right side, subtle
        { top: "50%", left: "50%", scale: 2 },  // CTA: Center, large backdrop
    ]
};

export function ScrollGlobe({ sections, globeConfig = defaultGlobeConfig, className }: ScrollGlobeProps) {
    const { containerRef, sectionRefs, scrollProgress, activeSection, globeTransform } = useScrollGlobe(globeConfig);

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative w-full max-w-screen overflow-x-hidden min-h-screen text-foreground",
                className
            )}
        >
            <ProgressBar progress={scrollProgress} />
            <FloatingGlobe transform={globeTransform} dimmed={activeSection === sections.length - 1} />

            {sections.map((section, index) => (
                <AboutStorySection
                    key={section.id}
                    section={section}
                    index={index}
                    sectionRef={(el) => { sectionRefs.current[index] = el; }}
                />
            ))}
        </div>
    );
}

export default ScrollGlobe;
