import { cn } from "@/lib/functions/utils";
import type { AboutFeature } from "./about.types";

interface AboutFeatureCardProps {
    feature: AboutFeature;
    delay: number;
}

export function AboutFeatureCard({ feature, delay }: AboutFeatureCardProps) {
    return (
        <div
            className={cn(
                "group p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5",
                "hover:border-primary/20 hover:-translate-y-1"
            )}
            style={{ animationDelay: `${delay}s` }}
        >
            <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-primary/60 mt-1.5 sm:mt-2 group-hover:bg-primary transition-colors flex-shrink-0" />
                <div className="flex-1 space-y-1.5 sm:space-y-2 min-w-0">
                    <h3 className="font-semibold text-card-foreground text-base sm:text-lg">{feature.title}</h3>
                    <p className="text-muted-foreground/80 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                </div>
            </div>
        </div>
    );
}

export default AboutFeatureCard;
