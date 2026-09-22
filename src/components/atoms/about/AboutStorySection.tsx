import { cn } from "@/lib/functions/utils";
import type { AboutSectionData } from "./about.types";
import { AboutFeatureCard } from "./AboutFeatureCard";
import { AboutActionButton } from "./AboutActionButton";
import { AboutDetailsGrid } from "./AboutDetailsGrid";
import { AboutCvEmbed } from "./AboutCvEmbed";

interface AboutStorySectionProps {
    section: AboutSectionData;
    index: number;
    sectionRef: (el: HTMLDivElement | null) => void;
}

export function AboutStorySection({ section, index, sectionRef }: AboutStorySectionProps) {
    return (
        <section
            ref={sectionRef}
            className={cn(
                "relative  md:min-h-screen bg-transparent flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 z-20 py-20 sm:py-16 lg:py-20",
                "w-full max-w-full overflow-hidden",
                section.align === 'center' && "items-center text-center",
                section.align === 'right' && "items-end text-right",
                index === 0 && "justify-end items-end min-h-screen",
                section.align !== 'center' && section.align !== 'right' && "items-start text-left"
            )}
        >
            <div className={cn(
                "w-full max-w-[98%] sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-7xl will-change-transform transition-all duration-700",
                "opacity-100 translate-y-0",
            )}>
                <h1 className={cn(
                    "font-bold mb-6 sm:mb-8 leading-[1.1] tracking-tight",
                    index === 0
                        ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl"
                        : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl"
                )}>
                    {section.subtitle ? (
                        <div className="space-y-1 sm:space-y-2">
                            <div className="bg-linear-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                                {section.title}
                            </div>
                            <div className="text-muted-foreground/90 text-[0.6em] sm:text-[0.7em] font-medium tracking-wider">
                                {section.subtitle}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-linear-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
                            {section.title}
                        </div>
                    )}
                </h1>

                <div className={cn(
                    "text-muted-foreground/80 leading-relaxed mb-8 sm:mb-10 text-base sm:text-lg lg:text-xl font-light",
                    section.align === 'center' ? "max-w-full mx-auto text-center" : "max-w-full"
                )}>
                    <p className="mb-3 sm:mb-4">{section.description}</p>
                    {/* {index === 0 && (
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground/60 mt-4 sm:mt-6">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                                <span>Interactive Experience</span>
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <div className="w-1 h-1 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.5s' }} />
                                <span>Scroll to Explore</span>
                            </div>
                        </div>
                    )} */}
                </div>

                {section.features && (
                    <div className="grid gap-3 sm:gap-4 mb-8 sm:mb-10">
                        {section.features.map((feature, featureIndex) => (
                            <AboutFeatureCard key={feature.title} feature={feature} delay={featureIndex * 0.1} />
                        ))}
                    </div>
                )}

                {section.details && <AboutDetailsGrid details={section.details} />}

                {section.cvEmbedUrl && <AboutCvEmbed embedUrl={section.cvEmbedUrl} />}

                {section.actions && (
                    <div className={cn(
                        "flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4",
                        section.align === 'center' && "justify-center",
                        section.align === 'right' && "justify-end",
                        (!section.align || section.align === 'left') && "justify-start"
                    )}>
                        {section.actions.map((action, actionIndex) => (
                            <AboutActionButton key={action.label} action={action} delay={actionIndex * 0.1 + 0.2} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default AboutStorySection;
