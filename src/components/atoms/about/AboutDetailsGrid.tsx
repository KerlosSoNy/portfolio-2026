import type { AboutDetail } from "./about.types";

interface AboutDetailsGridProps {
    details: AboutDetail[];
}

export function AboutDetailsGrid({ details }: AboutDetailsGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10">
            {details.map((detail) => (
                <div
                    key={detail.label}
                    className="p-4 sm:p-5 rounded-lg sm:rounded-xl border bg-card/50 backdrop-blur-sm"
                >
                    <div className="text-muted-foreground/60 text-xs sm:text-sm uppercase tracking-wider mb-1">
                        {detail.label}
                    </div>
                    <div className="text-card-foreground text-base sm:text-lg font-medium">
                        {detail.value}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AboutDetailsGrid;
